
var express = require('express');
var morgan = require('morgan'); // middleware which allows us to print out logged information on the server side.

//Using express sessions
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var host = 'localhost';
var port = 3000; 

var app = express();

app.use(morgan('dev'));  // one of the pre-formatted log outputs that morgan supports.

app.use(session({
 
 name: 'session-id',
 secret: '12345-67890-09876-54321',
 saveUninitialized:true,
 resave: true,
 store: new FileStore()

}));

function auth (req,res,next)
{

	console.log(req.headers);


if(!req.session.user)
{
 	var authHeader = req.headers.authorization;

	//checking that the authorization error is not null
	if(!authHeader)
	{
		var err = new Error ('Hey, you are not authenticated!');
		err.status = 401;
		// If you call the next with the error as the parameter, it automatically raises the error, then, 
		//as you go down the chain of middleware, only the function that takes that error and then books on the error will be triggered in part.  
		next(err);
		return;
	}


	var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
     var user = auth[0];
     var pass = auth[1];

     if(user == 'admin' && pass=='password')
     {
        req.session.user = 'admin';
       	next(); // you are authorized here.     
     } 
     else
     {
     	var err = new Error('Hey, you are not authenticated!');
     	err.status = 401;
     	next(err); 
     }
}
  else 
   {
      if(req.session.user === 'admin'){
        console.log('req.session: ',req.session);
        next();
      }
      else
      {
        var err = new Error('You are not authenticated! ');
        err.status = 401;
        next(err);
      }
   }


}

// The express applies the middleware to any incoming request. In the order in which you specify them in the, express application here. 
//Using the middleware function
app.use(auth);


app.use(function(err,req,res,next){

   res.writeHead(err.status|| 500, {
      'www-Authenticate ' : 'Basic',
      'Content-Type' :'text/plain'
   });
   res.end(err.message);
});


// declaring that the public folder served up as static files, so anything in public folder and user can access them by simply requesting the file. Cool eh ;)
// __direname says that, independent of where we start server this, the complete path + the public folder, declaring that the public folder is in the node express folder
// static files only support GET operation.
app.use(express.static( __dirname +'/public'));  

app.listen(port, host, function(){ // Express takes care of registering as http and then making use of http. Thanks boy Express ;)
 console.log("Server is Running Using Express and morgan middleware");
});
                                                