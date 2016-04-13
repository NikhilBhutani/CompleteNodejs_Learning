
var http = require('http');

//file system enables access various parts of fs on system and then able to do queries, retrieve files and be able to manipulate files.
var fs = require('fs');

//path module allows to construct the appropriate path on the system.
var path = require('path');
var host = 'localhost';
var port = 3000;
var server = http.createServer(function(req,res){

console.log('Request for ' + req.url + 'by method ' + req.method);
if(req.method=='GET')
{
 var fileUrl;
   if(req.url == '/')
   	 {
         fileUrl = '/index.html';
   	 }
   	 else
   	 {
        fileUrl = req.url;
   	 }	

var filePath = path.resolve('./public'+fileUrl);

var fileExt = path.extname(filePath);

 if(fileExt == '.html')
 {
	fs.exists(filePath,function(exists){  //this exists patameter will be set to true if the file exist.
       if(!exists) 
       {
       	res.writeHead(404, { 'Content-Type': 'text/html'});
       	res.end('<h1>Error 404:' + fileUrl + 'not found</h1>');
       	return;
       }

       res.writeHead(200, {'Content-Type' : 'text/html'});
       fs.createReadStream(filePath).pipe(res);

	});
 } 
 else
 {
 	 res.writeHead(404, { 'Content-Type': 'text/html'});
     res.end('<h1>Error 404:' + fileUrl + 'not a HTML file </h1>');
     
 }

}
else
 {
 	 res.writeHead(404, { 'Content-Type': 'text/html'});
     res.end('<h1>Error 404:' + req.method + 'not supported </h1>');
     
 }





}).listen(port,host,function(){
 console.log("Server running at http://localhost:3000/");
});


//after configuring the server, we have to start the server

//server.listen(port,host,function(){
// console.log('Server running at http://${host}:${port}/');
//});
