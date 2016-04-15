// creating the web server using Express

var express = require('express'),
    http = require('http');

var host = 'localhost';
var port = 3000;

var app = express();

app.use(function(req,res,next){
  console.log(req.headers);

  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end('<html><body><h1>Hello World</h1></body></html>');
});

var server = http.createServer(app).
             listen(port,host,function(){
                console.log("Server is up and running Nikhil");
             });
    