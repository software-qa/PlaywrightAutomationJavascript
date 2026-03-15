
//Write a program to count how many numbers between 1 and 200 are divisible by 7.
function numbersDivisbleBySeven(){

    var count = 0;
    var numberslist = []
    for (num =1 ; num<=200; num++){
        if (num%7===0)
        {
            numberslist.push(num)
            count = count +1;
        }
    
    }

    console.log("Total numbers that are divisible by 7 are " + count)
    console.log("Numbers divisible by 7 between 1 to 200 are ", numberslist)
}
numbersDivisbleBySeven()