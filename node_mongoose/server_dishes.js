var mongoose = require('mongoose'),
    assert = require('assert');


var Dishes = require('./models/dishes');

//Thereafter, we will open the connection to mongodb server
var url = 'mongodb://localhost:27017/conFusion';
 
 mongoose.connect(url);
 var db = mongoose.connection;

//If there's an error event generated because of this connnection, this will handle the and display the error
 db.on('error', console.error.bind(console,'connection error: '));    


//Node events being handled here

 db.once('open', function(){
  //connected 
  console.log("Connected to server!");

     Dishes.create({
         name : 'Uthapizza',
         image: 'images/Uthapizza.png',
         category: 'mains',
         label: 'Hot',
         price: '4.99',
         description : 'Test'         
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
               	     	description : "Updating here",
                      label: 'Hot'
               	     }
                   }, {
                   	 new : true  //this is mandatory to return the updated result, otherwise only the find function will be performed

               }).
               exec(function(err,dish){
                 if(err) throw err;
                 console.log("Updated Dish!");
                 console.log(dish);
                        

                       db.collection('dishes').drop(function(){
                      
                       db.close();	
                   });
                       

               });


        }, 3000);

     });

});
