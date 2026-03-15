//Write a program to print all even numbers from 1 to 50 using a loop.
function evennumbers(){
    var evennumberslist =[]
    for (num=1 ; num<=50 ; num++){
        if(num%2 ===0){
            
            evennumberslist.push(num)

        }
    }
    console.log(evennumberslist)
}
evennumbers();