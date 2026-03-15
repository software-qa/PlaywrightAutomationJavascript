//Write a program to find the factorial of a given number using a loop.

function factorialOfGivenNumber(n){
    var fact = 1;
    for ( let i=n ; i>=1 ; i-- )
    {
        fact = fact*i;
    }
    console.log("Factorial of ", n, " is ", fact)
}
factorialOfGivenNumber(5)