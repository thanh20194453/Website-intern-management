module.exports = function(server, db) {
    server.get('/student/listalljob', (req, res) => {
        if (req.session.login && req.session.role === 'Student') {
	    db.query('SELECT Job.job_id, Job.job_name, Job.company_id, Account.name, Job.description, Job.number FROM Job JOIN Account ON (Job.company_id = Account.id )', (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/student/listrequest', (req, res) => {
        if (req.session.login && req.session.role === 'Student') {
	    db.query('SELECT Request.job_id, Request.state FROM Request WHERE student_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/student/listcomment', (req, res) => {
        if (req.session.login && req.session.role === 'Student') {
	    db.query('SELECT Comment.time, Comment.comment FROM Comment WHERE student_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });

    server.get('/student/internshipinfo', (req, res) => {
        if (req.session.login && req.session.role === 'Student') {
	    db.query('SELECT Account.name, Job.job_name, Accepted.score FROM Accepted JOIN (Account, Job) ON (Accepted.company_id = Account.id AND Accepted.job_id = Job.job_id) WHERE student_id = ?', [req.session.user_id], (db_err, db_res, fields) => {
	        res.send(db_res);
	        res.end();
	    });
        }
    });
};
