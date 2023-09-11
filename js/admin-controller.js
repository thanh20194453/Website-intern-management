module.exports = function(server, db) {
    server.get('/admin/listaccount', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
	    db.query('SELECT * FROM Account', (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/admin/managereport', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
	    db.query('SELECT Account.id, Account.name, Accepted.score, Accepted.report_link FROM Accepted JOIN Account ON Accepted.student_id = Account.id', (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/admin/comment', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
	    db.query('SELECT * FROM Comment', (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/admin/state', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
	    db.query('SELECT * FROM State', (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.post('/admin/update/state', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
            db.query('UPDATE State SET current_s = ?', req.body, (db_err, db_res, fields) => {
                res.send('Updated');
                res.end();
            });
        }
    });

    server.post('/admin/update/accounts', (req, res) => {
        if (req.session.login && req.session.role === 'ADMIN') {
            db.query('SELECT id, username FROM Account', [], (db_err, db_res, fields) => {
                let text=new Set();
                let s1 = new Set();
                let s2 = new Set();
                let s3 = new Set();
                let s4 = [];
                let s5 = [];
                for (let i = 0, row; row = db_res[i]; i += 1) {
                    s1.add(row.id);
                    s3.add(row.username);
                }
                for (let i = 0, row; row = req.body[i]; i += 1){
                    s2.add(row[3]);
                    s4.push(row[0]);
                    s5.push(row[3]);
                }
                
                for (let i = 0, row; row = req.body[i]; i += 1) {
                    if (s1.has(row[3])== false && s3.has(row[0])==false) {
                        db.query('INSERT INTO Account (username, password, name, id, role) VALUES ?', [[row]]);   
                    } else {
                        if (s5.filter(x => x === row[3]).length > 1){ 
                            text.add("The id: "+ row[3] + " is duplicated <br>");
                        }
                        if (s4.filter(x => x === row[0]).length >1){
                            text.add("The username: "+ row[0] + " is duplicated <br>");
                        }
                    }
                }
                for (let i = 0, row; row = db_res[i]; i += 1) {
                    if (!s2.has(row.id)) {
                        db.query('SET FOREIGN_KEY_CHECKS=0; DELETE FROM Account WHERE id = ?', [row.id]);
                    }
                }
                res.send('Updated account table <br>'+Array.from(text).join(''));
                res.end();
            });
        }
    });
};
