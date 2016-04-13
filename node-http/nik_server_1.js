
var http = require('http');
var host = 'localhost';
var port = 3000;
var server = http.createServer(function(req,res){
	console.log(req.headers);  // printing out request headers to the console. Thats how we get access to the headers

	res.writeHead(200, {'Content-Type' : 'text/html' });  // setting the response HTTP code and setting the response type of the respose header.
	res.end('<h1>Hello Nikhil</h1>');  //sending back a reply message Hello Nikhil
}).listen(port,host,function(){
 console.log("Server running at http://localhost:3000/");
});


//after configuring the server, we have to start the server

//server.listen(port,host,function(){
// console.log('Server running at http://${host}:${port}/');
//});
