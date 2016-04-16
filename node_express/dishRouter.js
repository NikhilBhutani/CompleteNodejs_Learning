var express = require('express');
var bodyparser = require('body-parser');

module.exports = function(){

//Creating a new router.
var dishRouter = new express.Router();
dishRouter.use(bodyparser.json());
//Attaching the "all" to directly dishRouter.route('/'), specified the url as '/'. We don't need to explicitly specify the url here as a parameter.
dishRouter.route('/').
all(function(req,res,next){

	res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();

})
.get(function(req,res,next){
	res.end('will send you all the dishes!');
})

.post(function(req,res,next){
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});


dishRouter.route('/:myid')
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
return dishRouter;
}