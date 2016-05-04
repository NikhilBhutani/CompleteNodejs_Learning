module.exports = function(app)
{

 var MongoDB = app.dataSources.MongoDB;


//Automigrate allow us to perform the automatic operations before the server is booted up.
//with automigrate we're going to add a couple of customer classes to the MongoDB
//Inside the callback function, we're going to create a two customers
//Customer.create will take first parameter as the list of the customers we want to create.
 MongoDB.automigrate('Customer', function(err) {
   if (err) throw (err);
   var Customer = app.models.Customer;

   Customer.create([
    {username: 'Admin', email: 'admin@admin.com', password: 'abcdef'},
    {username: 'Nikhil', email: 'niks.bhutani@gmail.com', password: 'abcdef'}
  ], function(err, users) {
    if (err) return cb(err);

    //To assign the role as an admin
     var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    //create the admin role and this is the way to add a static role to a user.
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) cb(err);
       //make admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw (err);
      });
    });
  });
});


};