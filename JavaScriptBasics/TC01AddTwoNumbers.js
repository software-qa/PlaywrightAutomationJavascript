var a =10;
var b = 100;
console.log(a+b);

var flag = true;

//variable can be re-declare
var z=100;
var z = "hello"
console.log(z);

// var can be re-assigned
var x = 100;
x = "hello";

console.log(x);

//var is function scoped
function test() /// function declaration
{
    var y = 100;
    console.log(y);
}

function swapTwoNumbers() // function declaration
{
    var q =10;
    var p = 20;
    let temp = q;
}

//function called by its name
test(); 

/*void - If a function does not return any value, then it is called void function.
It is used to perform some task but does not return any value. In JavaScript, if a function does not return a value, it implicitly returns undefined.
*/

/*let and const are block scoped, var is function scoped. let and const cannot be re-declared, var can be re-declared. 
let can be re-assigned, const cannot be re-assigned, var can be re-assigned. let and const are hoisted but not initialized, var is hoisted and initialized with undefined
*/