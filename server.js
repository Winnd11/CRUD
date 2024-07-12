const express = require('express');
const app = express();
const port = 5500;
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { error } = require('console');

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
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/public/ejs', 'index.ejs'));
});

app.post('/', (req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.pwd;

    connection.query('USE CRUD; INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
        if (error) {
            console.log(error.stack);
        }
        console.log(results);
    });
});

app.post('/', (req, res) => {
    var email2 = req.body.email2;
    var password2 = req.body.pwd2;

    connection.query('USE CRUD; SELECT * FROM USERS WHERE (email, password) = (?, ?)', [email2, password2], function (error, results, fields) {
        if (error) {
            console.log(error.stack);
        }
        console.log(results);
    });
});

connection.end();

app.listen(port, () => {
    console.log(`running at http:/localhost:${port}`);
});
