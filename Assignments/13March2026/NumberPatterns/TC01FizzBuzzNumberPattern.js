// /
// Write a JavaScript program to print numbers from 1 to 100, but:

// Print "Fizz" if the number is divisible by 3

// Print "Buzz" if divisible by 5

// Print "FizzBuzz" if divisible by both.

function fizzBuzznumberpattern(){
    var fizzlist =[]
    var buzzlist = []
    var fizzbuzzlist =[]
    for (let num=1; num<=100; num++){

        if (num%3 === 0){
            fizzlist.push(num)
            console.log("Fizz" + num + "is divisible by 3")
            
        }
        if(num % 5 === 0){
            buzzlist.push(num)
            console.log("Buzz"+ num + "is divisible by 5")
        }
        if(num%3===0 && num%5===0){
            fizzbuzzlist.push(num)
            console.log("FizzBuzz" + num + "is divisible by both 3 and 5")
        }
    }
    console.log("Numbers divisible by 3 are " , fizzlist)
    console.log("Numbers divisible by 5 are " , buzzlist)
    console.log("Numbers divisible by both 3 and 5 are " , fizzbuzzlist)
}

fizzBuzznumberpattern();