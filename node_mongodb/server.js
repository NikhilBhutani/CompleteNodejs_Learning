 var MongoClient = require('mongodb').MongoClient,
      assert = require('assert');


//assing the oprations.js module to mydb_operations, this mydb_operations allows us to perform those database operations to any chooses database.
 var mydb_operations = ('./newoperations');
 
 //Connecting to the URL
 var url = 'mongodb://localhost:27017/conFusion';

//Using the connect method to connect the database
MongoClient.connect(url, function(err, db){
	assert.equal(null,err);
	console.log("Connected correctly and seamlessly to the server");

//Here the first paaramter is db, 2nd is the data you want to insert into a document, 
//3rd parameter is the name of the collection where you want to enter the data, ie dishes here
//4rth is the callback function, this callback function will be called when the operation is successful, asynchronous operation we say that.
//Any further operations are to be performed is to be implememented inside the same callback function.
//Every further function is implemented in previous callback function, this way sequential order of these operations are ensured.
mydb_operations.insertDocument(db, { name:"Nikhil", description:"Just do it"},
	                   "dishes", function(result){         
		                                     console.log(result.ops);

		                                    mydb_operations.findDocuments(db,"dishes", function(docs){
                                                  console.log(docs);

                                              //Here the 2nd parameter is the name which will be the criteria, this way we can filter all the docs in the collection
                                              //and can identify only those documents whose name is Nikhil
                                              //3rd parameter is to update the existing field description with a new string "Hey bro" where name is Nikhil.
                                             mydb_operations.updateDocuments(db,{name: "Nikhil"}, {description:"Hey bro"}, 
                                              "dishes", function(result){
                                                    console.log(result.result);

                                                  //Inside the callback we will perform a function to find the docs, this will enable us to see that the 
                                                  //update operations done previously was successful or not. :D cool yeah!
                                                  mydb_operations.findDocuments(db,"dishes", function(docs){

                                                     console.log(docs);

                                                     mydb_operations.dropCollection("dishes", function(result){
                                                     	console.log(result);

                                                     	db.close();
                                                     });

                                                  });
                                                          
                                              });     
		                                    });
	 });

});
