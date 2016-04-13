var rect = require('./niksrectangle_two');  //Here rect object is imported as a node module. It specifies the node module required in this application.

function solveRect(l,b)
{
  console.log("Solving for rectangle with l = " + l + " and b =" + b);


//Third patameter is a callback function for our node module 
  rect(l,b,function(err,rectangle)    // First parameter is always the error, 
  {
   if(err)
    {
  	console.log(err);
    }
     else
    {
  	console.log("The area of the rectangle of dimensions length = " + l +" and breadth = " + b +" is " + rectangle.area());   //area function was defined in node module
  	console.log("The perimeter of the rectangle of dimensions length = " + l +" and breadth = " + b +" is " + rectangle.perimeter()); //same defined in node module
    }


  }); 
 }            

solveRect(2,3);
solveRect(3,5);
solveRect(-3,5);