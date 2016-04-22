// Writing the node module to make use of the dish schema, to create a document and insert it into our mongo db server and see the result

var mongoose = require('mongoose'),
    assert = require('assert');


var Dishes = require('./models/dishes_1');

//Thereafter, we will open the connection to mongodb server
var url = 'mongodb://localhost:27017/conFusion';
 
 mongoose.connect(url);
 var db = mongoose.connection;

//If there's an error event generated because of this connnection, this will handle the and display the error
 db.on('error', console.error.bind(console,'connection error '));    


//Node events being handled here

 db.once('open', function(){
  //connected 
  console.log("Connected Nikhil!");


   //using the methods that mongoose provides for us

   //create a new user
   var newDish = Dishes({
     name : 'Nikhil',
     description: 'Test'
   });

   //save the user, newDish will be saved in the database  
   newDish.save(function(err){
         if(err) throw err;

         console.log('Dish created!');

         //Extracting or getting all the users, we'll use find method supported by mongoose.
         Dishes.find({}, function(err,dishes){
            if(err) throw err;

              //Here we get the object of all the users
              console.log(dishes);

              db.collection('dishes').drop(function(){
                  db.close();
              });

         });
   });

 });