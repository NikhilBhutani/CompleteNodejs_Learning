var express = require('express');
var bodyparser = require('body-parser');

//Creating a new router.
var leaderRouter = express.Router();

leaderRouter.use(bodyparser.json());

//Attaching the "all" to directly dishRouter.route('/'), specified the url as '/'. We don't need to explicitly specify the url here as a parameter.
leaderRouter.route('/').
all(function(req,res,next){

	res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();

})
.get(function(req,res,next){
	res.end("will send you all the leader's details!");
})

.post(function(req,res,next){
	res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});


leaderRouter.route('/:leaderid')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leader: ' + req.params.leaderid +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.leaderid + '\n');
    res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.leaderid);
});
module.exports = leaderRouter;
