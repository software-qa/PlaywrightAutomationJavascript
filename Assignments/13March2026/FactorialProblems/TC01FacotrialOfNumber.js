//Write a program to find the factorial of a given number using a loop.


function factorialOfGivenNumber(n){
    var factorial = 1;
    for ( let i=n ; i>=1 ; i-- )
    {
        factorial = factorial*i;
    }
    console.log("Factorial of ", n, " is ", fact)
}
factorialOfGivenNumber(5)