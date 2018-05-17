const express = require('express');

const app = express();

const mysql = require('mysql');

const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'todolist'
});

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log("Mysql connected");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/add-todo', function (request, response) {
    var title = request.body.title;
    var type = request.body.type;
    var todo = {title: title, type: type};
    var sql = 'INSERT INTO todos SET ?';
    var query = connection.query(sql, todo, function (error, result) {
        if (error) throw error;
        console.log(result);
        response.send('Added a todo');
    });
});

app.get('/', function (request, response) {
    response.send("app is run");
});

app.listen(3000, function () {
    console.log('server is running at localhost://3000')
});