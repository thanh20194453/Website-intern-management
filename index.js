const path = require('path');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');

const port = 8000;
const server = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: '',
    database: 'pj3',
    multipleStatements: true
});
db.connect(function (err){
    //nếu có nỗi thì in ra
    if (err) throw err.stack;
    //nếu thành công
    console.log('ket noi mysql thanh cong');
    
});

server.use(session({
    secret: 'my server',
    resave: true,
    saveUninitialized: true
}));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// Nagivation
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/interface/login.html'));
});

server.get('/home', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Company') res.sendFile(path.join(__dirname + '/interface/company-homepage.html'));
        if (req.session.role === 'Student') res.sendFile(path.join(__dirname + '/interface/student-homepage.html'));
        if (req.session.role === 'ADMIN') res.sendFile(path.join(__dirname + '/interface/admin-homepage.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/admin/account', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'ADMIN') res.sendFile(path.join(__dirname + '/interface/admin-account.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/admin/report', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'ADMIN') res.sendFile(path.join(__dirname + '/interface/admin-report.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/company/request', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Company') res.sendFile(path.join(__dirname + '/interface/company-request.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/company/accepted', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Company') res.sendFile(path.join(__dirname + '/interface/company-accepted.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/company/evaluate', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Company') res.sendFile(path.join(__dirname + '/interface/company-evaluate.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/student/internship', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Student') res.sendFile(path.join(__dirname + '/interface/student-internship.html'));
    } else {
        res.redirect("/");
    }
});

server.get('/student/sended', (req, res) => {
    if (req.session.login) {
	if (req.session.role === 'Student') res.sendFile(path.join(__dirname + '/interface/student-sended.html'));
    } else {
        res.redirect("/");
    }
});

// Authentication
server.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    db.query('SELECT * FROM State', (db_err, db_res, fields) => {
        req.session.state= db_res[0].current_s;
    });
    db.query('SELECT * FROM Account WHERE username = ? AND password = ?', [username, password], (db_err, db_res, fields) => {
	if (db_res.length > 0) {
	    req.session.login = true;
	    req.session.username = db_res[0].username;
        req.session.role = db_res[0].role;
        req.session.user_id = db_res[0].id;
        console.log(`Account ${username} with id ${req.session.user_id} logged in as ${req.session.role}`);
        res.redirect("/home")
	} else {
	    // res.send('Account does not exist/Wrong password');
        res.redirect("/");
	    res.end();
	}
    });
});

server.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
});

// Add controller modules
require('./js/admin-controller.js')(server, db);
require('./js/student-controller.js')(server, db);
require('./js/company-controller.js')(server, db);

// Start server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
