//Write a program that finds the sum of all even numbers between 1 and 100.

function sumOfEvennumbers(){
    var evennumberslist =[]
    var sumofeven = 0
    for (num=1 ; num<=100 ; num++){
        if(num%2 ===0){
            
            evennumberslist.push(num);

            sumofeven =  sumofeven + num;
        

        }
    }
    console.log(evennumberslist)

    console.log(sumofeven)
}
sumOfEvennumbers();