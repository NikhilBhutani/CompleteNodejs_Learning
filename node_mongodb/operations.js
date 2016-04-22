// Performing various operations on our mongodb collections

var assert = require('assert');

//Here insertDocument method takes four parmaterts, A db, docs to be inserted, collections where we insert the doc and a callback

exports.insertDocument = function(db, document, collection, callback)
{

    //Getting the document collection here, and create a variable mycoll which refers to the specific collection that we're using. 
    var mycoll = db.collection(collection);

    //Inserting my documents here

   // On that mycoll, we're using insert method provided my mongodb driver, This method takes a doc and a callback function
    mycoll.insert(document, function(err, result)
    {
    	assert.equal(err, null);
    	console.log("Inserted " + result.result.n + "documents into the document collection " + collection);
    	callback(result);
    });

};

//Note : how these functions are attached to the exports, so that these are exported by the module here.
exports.findDocuments = function(db,collection, callback)
{

      //Getting the reference to the collection
      var mycoll = db.collection(collection);

      //find the document, by method that is supporeted by mongodb driver.
      // toArray, will get the javascript object array here
      mycoll.find({}).toArray(function(){
        assert.equal(err,null);
        callback(docs);
      });

};

exports.removeDocuments = function(db, document, collection, callback)
{
    ////Getting the reference to the collection
     var mycoll = db.collection(collection);

     mycoll.deleteOne(document, function(err, result){
         assert.equal(err,null);
         console.log("Removed the documents " + document);
         callback(result);
     });
};


exports.updateDocument = function(db, document, update, collection, callback) {

  //Getting the reference to the collection
  var mycoll = db.collection(collection);

  // Update document where a is 2, set be equal to 1,
  //2nd parameter is the one that is used to specify which particular field within my document we want to update.
  coll.updateOne(document, { $set: update }, null, function(err, result) {

    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
};

//These four functions have similar and checking the error using assert.
// You can actually take this code and use it in your node application itself, but you can also create a generic module like this which supports certain operations 
// in your database and make use of that in your node modules
//This helps us to structure our node application into multiple modules.