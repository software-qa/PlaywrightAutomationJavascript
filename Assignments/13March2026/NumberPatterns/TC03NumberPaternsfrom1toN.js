
//Write a program that prints numbers from 1 to N but skips numbers divisible by 4.
function numberfrom1toN(N){
    
    for (num=1; num<=N; num++){
        if (num%4 !== 0){
            console.log(num)
        }

    }
}
numberfrom1toN(50);
