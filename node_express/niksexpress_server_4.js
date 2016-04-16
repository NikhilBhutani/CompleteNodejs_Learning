                               //USING EXPRESS ROUTER TO IMPLEMENT REST API
var express = require('express');
var morgan = require('morgan'); // middleware which allows us to print out logged information on the server side.

//bodyparser enables us to parse the data that comes in the requeest body and convers into javascript object that are available in our request message.
//parses the data and converts in json and adds it into "req".
var bodyparser = require('body-parser');


var host = 'localhost';
var port = 3000; 

var app = express();

app.use(morgan('dev'));  // one of the pre-formatted log outputs that morgan supports.

//Creating a new router.
var niksRouter = new express.Router();
niksRouter.use(bodyparser.json());

//Attaching the "all" to directly dishRouter.route('/'), specified the url as '/'. We don't need to explicitly specify the url here as a parameter.
niksRouter.route('/').
all(function(req,res,next){

	res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();

})
.get(function(req,res,next){
	res.end('will send you all the code nikhil!');
})

.post(function(req,res,next){
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});


niksRouter.route('/:myid')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.myid +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.myid + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.myid);
});


app.use('/codes',niksRouter); //parses every other kind of data. eg forms.

// declaring that the public folder served up as static files, so anything in public folder and user can access them by simply requesting the file. Cool eh ;)
// __direname says that, independent of where we start server this, the complete path + the public folder, declaring that the public folder is in the node express folder
// static files only support GET operation.
app.use(express.static( __dirname +'/public'));  

app.listen(port, host, function(){ // Express takes care of registering as http and then making use of http. Thanks boy Express ;)
 console.log("Server is Running Using Express and morgan middleware");
});
                                                