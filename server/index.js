const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoUrl = "mongodb://localhost:27017";

var mongodbClient = require('mongodb').MongoClient;

app.use(bodyParser.json());

app.use(cors());

mongodbClient.connect(mongoUrl,function(err,db){
    if(err){
        console.log(err);
    } else{
        console.log("connected successfully");
        var database = db.db("todo-list");
        database.createCollection('todos', function(err, collection) {
            if(err){
                console.log(err);
            } else {
                console.log("Collettion created");
            }
            db.close();
        });
    }
});

app.post('/todos', function (request, response) {
    var title = request.body.title;
    var type = request.body.type;
    if(title != null && type != null){
        var todo = {title: title, type: type};
        mongodbClient.connect(mongoUrl,function(err,db){
            var database = db.db("todo-list");
            var collection = database.collection("todos");
            collection.insert(todo);
            db.close();
        });
        
    }
});

app.get('/todos', function (request, response) {
    var todos = [];
    mongodbClient.connect(mongoUrl,function(err,db){
        var database = db.db("todo-list");
        var collection = database.collection("todos");
        var cursor = collection.find();
        cursor.forEach(function(todo){
            todos.push(todo);
        }, function(){
            response.send(todos);
            db.close();
        });
    });
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('server is running at localhost://3000');
});