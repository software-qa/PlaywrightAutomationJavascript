//Write a program that checks whether a given number is prime or not.

function primeNumbers(n){
    for (var num=2 ; num<n; num++ )
    {
        if(n%num===0)
        {

            console.log(n + " is not a prime number")
            
            break;
        }
        // else
        // {

        //     console.log(n + " is  a prime number")
        //     break;
        // }
    }
    console.log(n , "is a prime number")
}
primeNumbers(7);