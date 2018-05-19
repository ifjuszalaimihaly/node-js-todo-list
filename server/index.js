const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
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


app.use(bodyParser.json());

app.use(cors());

app.post('/todos', function (request, response) {
    console.log(request.body);
    var title = request.body.title;
    var type = request.body.type;
    if(title != null && type != null){
        var todo = {title: title, type: type};
        var sql = 'INSERT INTO todos SET ?';
        var query = connection.query(sql, todo, function (error, result) {
            if (error) throw error;
            console.log(result);
            response.send('Added a todo');
        });
    }
});

app.get('/todos', function (request, response) {
    var sql = "SELECT * FROM todos";
    var querey = connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
    response.send(result);
    });
});

app.listen(3000, function () {
    console.log('server is running at localhost://3000')
});