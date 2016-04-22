//3nd version of server where we will use new methods
//Here we are using the create function that is available to us to create a new entry into our database, a new doc into our collection
//Thereafter we are doing findByIdAndUpdate, this another method of querying and updating an existing document within our database

var mongoose = require('mongoose'),
    assert = require('assert');


var Dishes = require('./models/dishes_2');

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

    //Creating a new dish
    //and supplying the document that needs to be inserted to the databse
     Dishes.create({
         name : 'Nikhil',
         description : 'Never stop Dreaming, Learning and doing',
         comments:[                     //adding the comments, now this part will be included in the dishes document
            {
               rating:5,
               comment:'Nikhil Bhutani is crazy about Tech',
               author:'Niks'
            }

         ]  
      
     }, function(err,dish){
     	if(err) throw err;

     	 console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

     //now to find and update we'll use another method called findbyIdAndUpdate supported by mongodb by using mongoose
         //get all the dishes
         // we are setting the time for 3 sec, to show that creating and then updating field will be different in our database
        setTimeout(function(){
               

               //second parameter is what to update

               Dishes.findByIdAndUpdate(id,{

               	     $set:{
               	     	description : "Updating, Never stop building Things, Just do it"
               	     }
                   }, {
                   	 new : true  //this is mandatory to return the updated result, otherwise only the find function will be performed

               }).
               exec(function(err,dish){
                 if(err) throw err;
                 console.log("Updated Dish!");
                 console.log(dish);
                        
                        //inserting a new comment after the update
                        dish.comments.push({
                            rating :5,
                            comment: "I'm feeling good about this nodejs stuff!",
                            author: 'Niksbhu'
                        });

                        dish.save(function(err,dish){
                          console.log('Updated comments');
                          console.log(dish);
                        });


                       db.collection('dishes').drop(function(){
                      
                       db.close();	
                   });
                       

               });


        }, 3000);

     });

});
