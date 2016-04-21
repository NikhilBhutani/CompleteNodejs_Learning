var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


//Niks connection URL
var url = "mongodb://localhost:27017/conFusion";


//Within a callback function it is going to return a reference to the database which we can then make use of for further communication for our mongo db server.
MongoClient.connect(url, function(err,db){
   
    assert.equal(err,null);
    {
    	console.log("Connected correctly to server");
    }
//creating a collection
    var collection = db.collection("dishes");

//inserting a document of collection 
    collection.insertOne({name:"Nikhil", description: "Never stop Learning"},function(err,result){
      assert.equal(err,null); //Making sure that no error has occurred.
      console.log("After Insert:");
      console.log(result.ops);  // This ops will contain an array of all the docs that have been inserted by this insert opertation.

        //Retrieving the docs inside the callback function of insertone because we want to relate the similar collection
        //pasing filter value to find({Filterd value}) and then transforming that returned value to array of that javascript objects, to array takes a callback function
        collection.find({}).toArray(function(err,docs){
        	assert.equal(err,null);
         	console.log("Found your data niks");
        	console.log(docs);

          db.dropCollection("dishes",function(err,docs){
          	assert.equal(err,null);
          	db.close();
          });


        });


    });





});    