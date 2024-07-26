import express from 'express';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import error from 'console';
import session from 'express-session';
import cookieSession from 'cookie-session';
import flash from 'connect-flash';

const app = express();
const port = 5500;
const __dirname = path.resolve();

app.use(session({
    secret: 'qwerty',
    cookie: { maxAge: 6000 },
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

//mysql default port 3306                     
var connection = mysql.createConnection({
    host: 'localhost',
    user: ' ', // your username
    password: ' ', // your password
    port: '3306',
    multipleStatements: true,
    debug: true
});

var scriptSql = 'CREATE DATABASE IF NOT EXISTS `crud`; USE crud; CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NULL, email VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, PRIMARY KEY (ID));';

connection.connect();
connection.query(scriptSql, function (error, results, fields) {
    if (error) {
        console.log(error.stack);
    } 
    console.log(results);
});

connection.query('select * from users', function (error, results, fields) {
    if (error) {
        console.log(error.stack);
    } 
    console.log(results);
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sassMiddleware( {
    src: __dirname,
    dest: __dirname,
    debug: true,
    outputStyle: 'compressed',
    indentedSyntax: false, // set true, if you want '.sass' extension instead of '.scss'
    force: true
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const message = req.flash('message');
    res.render(path.join(__dirname + '/public/ejs', 'index.ejs'), {message});
});

app.post('/', (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.pwd;

    var emailLogin = req.body.email2;
    var passwordLogin = req.body.pwd2;
    
   if ('signup' === req.body.formType) {

        connection.query('SELECT * FROM USERS WHERE EMAIL = ?', [email], function(error, results, fields) {
            results.length === 0 ? insertUser() : res.send(`<p style=>E-mail already registered <a href=''>localhost:${port}</a></p>`); 
        });
    
        const insertUser = () => {
            connection.query('INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
                if (error) {
                    console.log(error.stack);
                }
                res.redirect('/');
                console.log('Registered');
            });
        };
    
    }

    else if ('signin' === req.body.formType) {
    if (email2 && password2) {
        connection.query('SELECT * FROM USERS WHERE (email, password) = (?, ?)', [emailLogin, passwordLogin], function (error, results) {
            if (results.length > 0) {
                req.session.loggedin = true;
                res.redirect('/crud');
            } else {
                req.flash('message', 'Login failed');
                res.redirect('/');
            }
        });
    }
    }
});

app.get('/crud', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT name FROM USERS', function(error, results, fields) {
            if (error) {
                throw error;
            }
            results.forEach(e => {namesList.push(e);});
            res.render(path.join(__dirname + '/public/ejs/crud.ejs'), {listSting: JSON.stringify(namesList, null, 2)});
    } else {
        res.redirect('/');
    }
});

app.post('/crud', (req, res) => {
    let name3 = req.body.name3;
    let email3 = req.body.email3;
    let value = req.body.value;

    if ('add' === req.body.formType) {
        connection.query('INSERT INTO USERS (name, email, password, value) VALUES (?, ?, "123", ?)', [name3, email3, value], function(error, results, fields) {
            if (error) {
                throw error;
            }
            console.log(results);
        });
    }
    
    if ('loggout' === req.body.formType) {
        req.session.destroy(function (error) {
            if (error) {
                throw error;
            }
            res.redirect('/');
            console.log('loggout');
        });
    }
});

connection.end();

app.listen(port, () => {
    console.log(`running at http:/localhost:${port}`);
});
