
var express = require('express');
var morgan = require('morgan'); // middleware which allows us to print out logged information on the server side.


var host = 'localhost';
var port = 3000; 

var app = express();

app.use(morgan('dev'));  // one of the pre-formatted log outputs that morgan supports.

// declaring that the public folder served up as static files, so anything in public folder and user can access them by simply requesting the file. Cool eh ;)
// __direname says that, independent of where we start server this, the complete path + the public folder, declaring that the public folder is in the node express folder
// static files only support GET operation.
app.use(express.static( __dirname +'/public'));  

app.listen(port, host, function(){ // Express takes care of registering as http and then making use of http. Thanks boy Express ;)
 console.log("Server is Running Using Express and morgan middleware");
});
                                                