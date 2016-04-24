var express = require('express');
var bodyparser = require('body-parser');

var mongoose = require('mongoose');

var Dishes = require('../models/dishes');





//Creating a new router.
var dishRouter = new express.Router();
dishRouter.use(bodyparser.json());

//Now each one of these operations the get, put, post will have it's own way of
// sending back the details to the client when it is called. So I'm going to remove this whole part completely. 
/*
dishRouter.route('/').
all(function(req,res,next){

	res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();

})
*/
dishRouter.route('/')
.get(function(req,res,next){
        
        //This is will result in returning all the items in the mongodb server, corresponding to the dishes collection and that will be returned as an array
        //find takes first parameter specifies what I'm going to search for, in this case all the docs that are part of dishes collection
        //Second parameter is the callback function that we're supplying, this callback function will take first parameter err, that if there's an error it will be returned
        //Second parameter OF CALLBACK function is going to return the array of javascript object format, we'll convert in json and send it over.	
    Dishes.find({}, function(err,dish){
          if(err) throw err;
          res.json(dish);
    });

})
.post(function(req,res,next){

   //This is how we insert something into the collection using mongoose by using 'create'.
   //First parameter is the item to be inserted. So all we need to do is say req.body.
   //The body of the message which contains the JSON formatted dishes information. Will be sent over to MongoDB server to be inserted,
   // The call back function will return the inserted dish again but with the id in place and then also the created at and updated at fields also.

    Dishes.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });

})

.delete(function(req, res, next){
        Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


dishRouter.route('/:dishId')


// Here Dishes.findById, Remember that we already get hold of the id of the dish. So we can as well use the id to 
//access the specific dish from our MongoDB server. 
//and req.params.dishId, so that's what comes in as the parameter there. And then of course we have the call back function. 
//Which if successful the second parameter dish would be the information about the dish, and all here we're doing is res.json and 
//then dish and then passing back this information back to my client. 

.get(function(req,res,next){
         Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req, res, next){
         Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(function(req, res, next){
        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

dishRouter.route('/:dishId/comments')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.get(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});

module.exports = dishRouter;