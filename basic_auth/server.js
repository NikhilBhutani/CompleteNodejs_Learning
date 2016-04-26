
var express = require('express');
var morgan = require('morgan'); // middleware which allows us to print out logged information on the server side.


var host = 'localhost';
var port = 3000; 

var app = express();

app.use(morgan('dev'));  // one of the pre-formatted log outputs that morgan supports.



function auth (req,res,next)
{

	console.log(req.headers);

   //If the client sends back the user name and password, that will come in here, we ll extract the user name and password out of it
   // then check if the user is authorized or not
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

    //Here, we are taking the authorization header and then we are splitting the authorization header on this piece.
   
    // Typical authorization header contains when the request comes in, the word basic And then following that in a base 64 encoded string at the second part. 
    //So what we're going to do is we're going to split that into two parts. 
    //The first part will contain the word basic. The second part will contain the encoded string that contains the username and password. 
    //So this string, as you see, authHeader.split and then . And so, it splits that authHeader into two items in an array. 
    //The second item is the one that we going to continue to process. And then we're going to treat that like a base 64. 
    //which means that we going to do base 64 unencoding of that information. And then that will give us the actuals. 
    //Actual value which then I convert to string. When I convert that to string, 
    //that return value will contain the username and password fields separated by a colon.

	var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
     var user = auth[0];
     var pass = auth[1];

     if(user == 'admin' && pass=='password')
     {
     	next(); // you are authorized here.     
     } 
     else
     {
     	var err = new Error('Hey, you are not authenticated!');
     	err.status = 401;
     	next(err); 
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
                                                