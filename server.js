const express = require('express');
const app = express();
const port = 5500;
const path = require('path');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware( {
    src: __dirname,
    dest: __dirname,
    debug: true,
    outputStyle: 'compressed',
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/public/ejs', 'index.ejs');
});

app.get('/crud', (req, res) => {
    res.send('recive');
});

app.listen(port, () => {
    console.log(`running at http:/localhost:${port}`);
});
