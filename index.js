var express = require('express');

var app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root1234',
   db: 'todo-list'
});

app.get('/',function (request,response) {
    response.send("app is run");
});

app.listen(8080,function () {
    console.log('server is running at localhost://8080')
});