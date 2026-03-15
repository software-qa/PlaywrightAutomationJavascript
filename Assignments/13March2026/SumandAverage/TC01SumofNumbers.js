//Write a program to calculate the sum of numbers from 1 to N using a loop.

function sumOfNumbers(N ){
    let sum = 0
for (num=1 ; num<=N; num++){
    sum = sum + num
    
}
console.log("sum of 1 to " + N  + " is " +sum)
}

sumOfNumbers(50)   