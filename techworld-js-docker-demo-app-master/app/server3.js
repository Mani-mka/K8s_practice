var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

const username = process.env.MONGO_USERNAME
const pass = process.env.MONGO_PASS
const dbHost = process.env.MONGO_HOSTNAME
const port = process.env.MONGO_PORT
const db = process.env.MONGO_DATABASE

var url = 'mongodb://${username}:${pass}@${dbHost}:${port}/${db}';
var str = "";

app.route('/Employeeid').get(function(req, res) {
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('Employee');
       var cursor = collection.find({});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    Employee id  " + item.Employeeid + "</br>";
           }
       }, function(err) {
           res.send(err);
           db.close();
          }
       );
   });
});
var server = app.listen(8086, function() {});
