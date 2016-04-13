
module.exports = function(x,y,callback)  //third argument is callback function. This is a node's way of supplying a callback function, 
                                         //so that this callback function can be invoked by a module in order to supply back information to you.       
 {

	try{
		if(x<0 || y<0)
		{
			throw new Error("Rectangle Dimens should be greater than zero: l = " + x + ", and b = "+y);
		}
		else
		{                              //if there are no errors, first paramter is set to null, 
                                       // so the remaining parameter coming in can be used and the rest of the code is executed.      
			callback(null,{                              
				perimeter: function()
				{
					return(2*(x+y));
				},
				area: function()
				{
					return(x*y);
				}
			});
		}
	   }catch (error)
		{
			callback(error,null);   // if the first argument or paramter of callback function is not null, then it means that there is an error.
		}
 }
