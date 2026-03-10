let a =10;
let b = 3;
console.log(a+b);
console.log(a-b);
console.log(a*b);
console.log(a/b);
console.log(a%b); // modulus operator gives the remainder of the division
console.log(a**b); // exponentiation operator gives the result of a raised to the power of b

//increment and decrement operators
let c = 10;
console.log(c); // post-increment: returns the value before incrementing
c++; // c is now 11   , variable assignment happens first and then increment happens
let m = c++; // m is assigned the value of c (which is 11) and then c is incremented to 12  
console.log(c); // now c is 11

let d = 10;
console.log(d);
++d; // pre-increment: increments the value before returning it

d+=10; // compound assignment operator, equivalent to d = d + 10
console.log(d); // now d is 20

d-=5;
console.log(d); // now d is 15
d*=2;
console.log(d); // now d is 30
d/=3;
console.log(d); // now d is 10
d%=10;
console.log(d); // now d is 1
d**=2;
console.log(d); // now d is 1