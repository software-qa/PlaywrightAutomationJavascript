function first5randomnumbers() {
    
    for (let i=1; i<=5; i++) {
        let randomNumber = Math.floor(Math.random() * 5) + 1;
        console.log(randomNumber);
    }
}
first5randomnumbers();

function first5randomnumbers2() {
    
    for (let i=1; i<=5; i++) {
        let randomNumber = Math.ceil(Math.random() * 5);
        console.log(randomNumber);
    }
}
first5randomnumbers2();