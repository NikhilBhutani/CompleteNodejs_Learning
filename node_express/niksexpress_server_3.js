
var express = require('express');
var morgan = require('morgan'); // middleware which allows us to print out logged information on the server side.

//bodyparser enables us to parse the data that comes in the requeest body and convers into javascript object that are available in our request message.
//parses the data and converts in json and adds it into "req".
var bodyparser = require('body-parser');


var host = 'localhost';
var port = 3000; 

var app = express();

app.use(morgan('dev'));  // one of the pre-formatted log outputs that morgan supports.



app.use(bodyparser.json()); //parses every other kind of data. eg forms.


//What to do, when we receive a request.
//app.all and then specifying the url 
//Third parameter next enables us to continue the processing with remaining middleware, and this is supported by express.
//This function handles the request as it comes along.
app.all('/dishes', function(req,res,next){

 res.writeHead(200, {'Content-Type': 'text/plain'});
 next();
});


//Sending back a simple message
app.get('/dishes', function(req,res,next){

 res.end('Will send all the dishes to you niks!');
 });

//Recall that the bodyparser has converted req into json objects and put it into "req.body"
//so here the request is included with JSON data.
app.post('/dishes', function(req,res,next){
 res.end('Will add the dish :' + req.body.name +' with details' + req.body.description);
 });


app.delete('/dishes', function(req, res, next){
        res.end('Deleting all dishes');
});

//what if we get the request for specific dish.
app.get('/dishes/:dishId', function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});


app.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

// declaring that the public folder served up as static files, so anything in public folder and user can access them by simply requesting the file. Cool eh ;)
// __direname says that, independent of where we start server this, the complete path + the public folder, declaring that the public folder is in the node express folder
// static files only support GET operation.
app.use(express.static( __dirname +'/public'));  

app.listen(port, host, function(){ // Express takes care of registering as http and then making use of http. Thanks boy Express ;)
 console.log("Server is Running Using Express and morgan middleware");
});
                                                