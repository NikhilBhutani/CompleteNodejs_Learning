<<<<<<< HEAD

var mongoose = require('mongoose');
//Getting the schema
var Schema = mongoose.Schema;

//Here we are adding the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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
 image: {
 	         type: String,
 	         required:true 
        },
category:{
            type: String,
            required : true
         },
label:{
        type:String,
        required : false,
        default : ''
         
      },
price:{

     type : Currency,
     required : true
      },
description:{
           type : String,
           required : true
         },
     

        comments:[commentSchema]  
 },
      {
       timestamps: true	
      

});


var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes; 
=======

var mongoose = require('mongoose');
//Getting the schema
var Schema = mongoose.Schema;

//Here we are adding the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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
 image: {
 	         type: String,
 	         required:true 
        },
category:{
            type: String,
            required : true
         },
label:{
        type:String,
        required : false,
        default : ''
         
      },
price:{

     type : Currency,
     required : true
      },
description:{
           type : String,
           required : true
         },
     

        comments:[commentSchema]  
 },
      {
       timestamps: true	
      

});


var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes; 
>>>>>>> 5cc67e94165d11a5658f66c34220844082eafbe1
