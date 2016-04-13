var rect = require('./niksrectangle_one');  //Here rect object is imported as a node module. It specifies the node module required in this application.

function solveRect(l,b)
{
  console.log("Solving for rectangle with l = " + l + " and b =" + b);

  if(l<0 || b<0)
  {
  	console.log("Rectangle dimensions should be greater than zero: l = " + l +", and b = " + b);
  }
  else
  {
  	console.log("The area of the rectangle of dimensions length = " + l +" and breadth = " + b +" is " + rect.area(l,b));
  	console.log("The perimeter of the rectangle of dimensions length = " + l +" and breadth = " + b +" is " + rect.perimeter(l,b));
  }


}            

solveRect(2,3);
solveRect(3,5);
solveRect(-3,5);