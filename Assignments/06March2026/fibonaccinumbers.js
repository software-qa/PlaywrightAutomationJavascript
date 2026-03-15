//Create a JavaScript function to print first 20 Fibonacci numbers
function fibonacciNumbers() {
    var num1 = 0;
    var num2 = 1;
    var nextnum = num1 + num2;
    console.log(nextnum);
    for (let i=0; i<=20; i++){
    
    nextnum = num1 + num2;
    console.log(nextnum);
    num1 = num2;
    num2 = nextnum;
    
    }
    
}
fibonacciNumbers();