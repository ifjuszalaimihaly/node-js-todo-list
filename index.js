var express = require('express');

var app = express();


app.get('/',function (request,response) {
    response.send("app is run");
});

app.listen(8080,function () {
    console.log('server is running at localhost://8080')
});