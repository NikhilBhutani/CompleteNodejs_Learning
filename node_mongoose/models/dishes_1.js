var mongoose = require('mongoose');

//Getting the schema
var Schema = mongoose.Schema;


//Creating the schema for dish

var dishSchema = new Schema({

 name : {
 	      type: String,
 	      required: true,
          unique: true
        },
 description: {
 	         type: String,
 	         required:true 
             }
 },
      {
       timestamps: true	
      

});

//The schema is useless, we need to create a model using it
//by default mongodb will create the collection of the plural of the name dish, collection with the name Dishes
// second paramter is schema 

var Dishes = mongoose.model('Dish', dishSchema);

//Making this module available to  our node applications

module.exports = Dishes; 
