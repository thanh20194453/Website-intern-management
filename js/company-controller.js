module.exports = function(server, db) {
    server.get('/company/listjob', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
	        db.query('SELECT * FROM Job WHERE company_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	            res.send(db_res);
	            res.end();
	        });
        }
    });

    server.get('/company/listrequest', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
	        db.query('SELECT Request.student_id, Account.name, Request.job_id, Job.job_name, Request.CV_link, Request.state FROM Request JOIN (Account, Job) ON (Request.job_id = Job.job_id AND Request.student_id = Account.id) WHERE Job.company_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	            res.send(db_res);
	            res.end();
	        });
        }
    });

    server.get('/company/listaccepted', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
	        db.query('SELECT Accepted.student_id, Account.name, Accepted.job_id, Job.job_name, Accepted.score FROM Accepted JOIN (Account, Job) ON (Accepted.job_id = Job.job_id AND Accepted.student_id = Account.id) WHERE Job.company_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	            res.send(db_res);
	            res.end();
	        });
        }
    });

    server.get('/company/state', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
	        db.query('SELECT * FROM State', (db_err, db_res, fields) => {
	            res.send(db_res);
	            res.end();
	        });
        }
    });

    server.get('/company/studentcomment', (req, res) => {
        console.log('ok');
        if (req.session.login && req.session.role === 'Company') {
            let student_id = req.headers.student_id;
            console.log(student_id);
	        db.query('SELECT * FROM Comment WHERE student_id = ?', [student_id], (db_err, db_res, fields) => {
	            res.send(db_res);
	            res.end();
	        });
        }
    });

    server.get('/company/searchjob', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            let job_id = req.headers.job_id;
            let job_name = req.headers.job_name;
            if (job_id != '' && job_name != ''){
                db.query('SELECT * FROM Job WHERE company_id = ? AND job_id= ? AND job_name= ?', [req.session.user_id, job_id, job_name], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                });
            }else if (job_id != '' && job_name == ''){
                db.query('SELECT * FROM Job WHERE company_id = ? AND job_id = ?', [req.session.user_id, job_id], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                
                });
            }else if (job_id == '' && job_name != ''){
                db.query('SELECT * FROM Job WHERE company_id = ? AND job_name= ?', [req.session.user_id, job_name], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                });
            }
        }
    });

    server.get('/company/searchrequest', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            let job_id = req.headers.job_id;
            let job_name = req.headers.job_name;
            if (job_id != '' && job_name != ''){
                db.query('SELECT Request.student_id, Account.name, Request.job_id, Job.job_name, Request.CV_link, Request.state FROM Request JOIN (Account, Job) ON (Request.job_id = Job.job_id AND Request.student_id = Account.id) WHERE Job.company_id = ? AND Request.job_id = ? AND job_name= ?', [req.session.user_id, job_id, job_name], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                });
            }else if (job_id != '' && job_name == ''){
                db.query('SELECT Request.student_id, Account.name, Request.job_id, Job.job_name, Request.CV_link, Request.state FROM Request JOIN (Account, Job) ON (Request.job_id = Job.job_id AND Request.student_id = Account.id) WHERE Job.company_id = ? AND Request.job_id = ?', [req.session.user_id, job_id], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                
                });
            }else if (job_id == '' && job_name != ''){
                db.query('SELECT Request.student_id, Account.name, Request.job_id, Job.job_name, Request.CV_link, Request.state FROM Request JOIN (Account, Job) ON (Request.job_id = Job.job_id AND Request.student_id = Account.id) WHERE Job.company_id = ? AND job_name= ?', [req.session.user_id, job_name], (db_err, db_res, fields) => {
                    res.send(db_res);
                    res.end();
                });
            }
        }
    });

    server.get('/company/searchaccept', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            let job_id = req.headers.job_id;
            let job_name = req.headers.job_name;
            let student_id = req.headers.student_id;
            let student_name = req.headers.student_name;
            let score_state = req.headers.score_state;
            let query = "SELECT Accepted.student_id, Account.name, Accepted.job_id, Job.job_name, Accepted.score AS score FROM Accepted JOIN (Account, Job) ON (Accepted.job_id = Job.job_id AND Accepted.student_id = Account.id) WHERE Job.company_id = ?";
            let map= new Map();
            map.set('Accepted.job_id',job_id);
            map.set('job_name',job_name);
            map.set('student_id',student_id);
            map.set('name',student_name);
            for (let i = 0; i < 4; i++){
                if (map.get(Array.from(map.keys())[i]) !=''){
                    query = query + ' AND ' + Array.from(map.keys())[i] +' = \'' + map.get(Array.from(map.keys())[i]) +'\'';
                }
            }
            if (score_state == 'NOT SCORED'){
                query = query + ' AND score <=> null';
            }else if (score_state == 'SCORED'){
                query = query + ' AND !(score <=> null)';
            }
            db.query(query, [req.session.user_id], (db_err, db_res, fields) => {
                res.send(db_res);
                res.end();
            });
        }
    });

    server.get('/company/evaluate/search', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            let student_id = req.headers.student_id;
            let data =[];
            db.query('SELECT Accepted.student_id, Account.name, Accepted.job_id, Job.job_name, Accepted.score FROM Accepted JOIN (Account, Job) ON (Accepted.job_id = Job.job_id AND Accepted.student_id = Account.id) WHERE Job.company_id = ? AND Accepted.student_id = ?', [req.session.user_id, student_id], (db_err, db_res, fields) => {
                data.push(db_res);
	        });
            db.query('SELECT * FROM Comment WHERE student_id = ?', [student_id], (db_err, db_res, fields) => {
                data.push(db_res);
                res.send(data);
	            res.end();
	        });
        }
    });

    server.post('/company/update/status/accept', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            db.query('UPDATE Request SET state = \'ACCEPTED\' WHERE student_id = ? AND job_id = ?', [req.body[0],req.body[2]]);
            db.query('INSERT INTO Accepted (job_id, student_id, company_id) VALUES (?)', [[req.body[2],req.body[0],req.session.user_id]]);
        }
        res.end();
    });

    server.post('/company/update/status/reject', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            db.query('UPDATE Request SET state = \'REJECTED\' WHERE student_id = ? AND job_id = ?', [req.body[0],req.body[2]]);
        }
        res.end();
    });

    server.post('/company/update/job', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            if (req.session.state != "ADD"){
                res.send('It is not time for company adding, formating jobs');
                res.end();
            }else{
                db.query('SELECT job_id FROM Job', [], (db_err, db_res, fields) => {
                    let text=new Set();
                    let s1 = new Set();
                    let s2 = new Set();
                    let s3 = [];
                    for (let i = 0, row; row = db_res[i]; i += 1) {
                        s1.add(row.job_id);
                    }
                    for (let i = 0, row; row = req.body[i]; i += 1){
                        s2.add(row[0]);
                        s3.push(row[0]);
                    }
                
                    for (let i = 0, row; row = req.body[i]; i += 1) {
                        if (row[0]=="" || row[1]=="" || row[2]=="" || row[3]=="") {
                            text.add("You need to fill in all the blanks <br>");
                        }else{
                            if (s1.has(row[0])== false) {
                                db.query('INSERT INTO Job (job_id, job_name, description, number, company_id) VALUES (?)', [[row[0],row[1],row[2],parseInt(row[3],10),req.session.user_id]]);   
                            } else {
                                if (s3.filter(x => x === row[0]).length > 1){ 
                                    text.add("The id: "+ row[0] + " is duplicated <br>");
                                }
                            }  
                        }
                    }
                    for (let i = 0, row; row = db_res[i]; i += 1) {
                        if (!s2.has(row.job_id)) {
                            db.query('SET FOREIGN_KEY_CHECKS=0; DELETE FROM Job WHERE job_id = ?', [row.job_id]);
                        }
                    }
                    res.send('Updated job table <br>'+Array.from(text).join(''));
                    res.end();
                });
            }
        }
    });

    server.post('/company/add/comment', (req, res) => {
        if (req.session.login && req.session.role === 'Company') {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1;
            let yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd;
            }
            if(mm<10) {
                mm='0'+mm;
            }
            today = yyyy+'-'+mm+'-'+dd;
            db.query('INSERT INTO Comment (student_id, time, comment) VALUES (?)', [[req.body[1], today, req.body[0]]]);
        }
        res.send('');
        res.end();
    });
};
