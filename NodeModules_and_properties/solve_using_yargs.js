var argv = require('yargs')        // automatically finds the node module in node_module folder.
           .usage('Usage: node $0 --l=[num] --b=[num]')  // Inside the usage, we are specifying the message that should be printed to remind user know how to use it.
           .demand(['l','b'])
           .argv;  // argv(Javascript Object) is the property that will be supplied to application through the require.
            // e.g. we supply --l=2 in cmd line, then argv.l=2 which be passed to node module.         

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

solveRect(argv.l,argv.b);