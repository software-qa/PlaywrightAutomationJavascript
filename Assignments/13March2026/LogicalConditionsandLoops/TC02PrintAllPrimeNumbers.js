//Write a program that prints all prime numbers between 1 and 100.
function primeNumbers(){
    
    var primenumberslist = []
    
    for (var n=1 ; n<100 ;n++){


        //check for prime numbers
        for (var num=2 ; num<n; num++ )
        {
            if(n%num===0)
            {

                console.log(n + " is not a prime number")

                
                break;
            
            }
            
            
        }
        if (n===num)
        {


            primenumberslist.push(n)
        }

        
        

    }
    
    console.log("List of prime numbers between 1 to 100 are ", primenumberslist)
}
primeNumbers();