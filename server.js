const express = require('express');
const app = express();
const port = 5500;
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const mysql = require('mysql');

//mysql default port 3306                     
var connection = mysql.createConnection({
    host: 'localhost',
    user: '', // your username
    password: '1234', // your password
    database: 'crud'
});

connection.connect();
connection.query('create table crud', function (error, results, fields) {
    if (error) {
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
