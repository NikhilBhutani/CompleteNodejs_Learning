var express = require('express');
var bodyparser = require('body-parser');


//Creating a new router.
var promoRouter = express.Router();
promoRouter.use(bodyparser.json());

//Attaching the "all" to directly dishRouter.route('/'), specified the url as '/'. We don't need to explicitly specify the url here as a parameter.
promoRouter.route('/').
all(function(req,res,next){

	res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();

})
.get(function(req,res,next){
	res.end('will send you all the promotions!');
})

.post(function(req,res,next){
	res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all promotion');
});


promoRouter.route('/:myid')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the promotion: ' + req.params.myid +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the promotion: ' + req.params.myid + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting promotion: ' + req.params.myid);
});
module.exports = promoRouter;

                                                