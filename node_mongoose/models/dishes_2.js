// Here we are examining how mongoose supports sub-documents inside the document. Now, why is this useful?
// In the dishSchema that we created maybe we want to include comments about the dish as part of the dish's document. 
//Now If you have taken the previous courses, you would have seen that with every dish, we also included the comments there. 
//Now how is this supported in using Mongoose? So here Here into the dishSchema we can create another 



var mongoose = require('mongoose');

//Getting the schema
var Schema = mongoose.Schema;

//Here we are adding the comments schema

var commentSchema = new Schema({

        //Here the validation of comment is done
            rating : {
                   type: Number,
                   min: 1,
                   max: 5,
                   required: true

            },
            comment : {
               type:String,
               required: true
            },
            author: {
            	type: String,
            	required:true 
            }
}, {

	timestamps: true

});





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
             },
             comments:[commentSchema]  //adding the sub document into dishes schema, which means this comments property can now point to array of comment's objects.
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
