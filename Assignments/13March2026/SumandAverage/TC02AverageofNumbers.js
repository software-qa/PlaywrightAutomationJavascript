//Write a program that calculates the average of numbers from 1 to 100.
function averageOfNumbers(n){

    let sum = 0
    for (num=1 ; num<=n; num++){
    sum = sum + num;

    }
    avg_int= sum / n;
    avg_float= parseFloat(sum) / parseFloat(n);
console.log("sum of 1 to " + n  + " is " +sum)   
console.log("avg of 1 to " + n  + " is " +avg_int)
console.log("avg of 1 to " + n  + " is " +avg_float.toFixed(2))
}

averageOfNumbers(100)   