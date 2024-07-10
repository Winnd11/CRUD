const express = require('express');
const app = express();
const port = 5500;
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const mysql = require('mysql');
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

var scriptSql = 'CREATE DATABASE IF NOT EXISTS `crud`; USE crud; CREATE TABLE IF NOT EXISTS users (id INT NOT NULL, name VARCHAR(45) NULL, email VARCHAR(45) NOT NULL, password VARCHAR(45) NOT NULL, PRIMARY KEY (ID));';

connection.connect();
connection.query(scriptSql, function (error, results, fields) {
    if (error) {
        connection.destroy();
        throw error;
    } 
    console.log(results);
});

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

app.get('/crud', (req, res) => {
    res.send('recive');
});

connection.end();

app.listen(port, () => {
    console.log(`running at http:/localhost:${port}`);
});
