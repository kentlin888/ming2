class Car{
    brand = 'ddd'
    constructor(){
        this.brand=''
    }
    
    static brand = 'toyota'
}
let carMMMMM = new Car();
console.log("LOG:: carMMMMM", carMMMMM)


let car1 = new Car();
car1.brand = 'b1'

let car2 = new Car();
car2.brand = 'b2'

let car3 = new Car();
car3.brand = 'b3'
// let car = new Car();
// console.log(car)

//---------------------------
Car.brand = 'mmmmmmmmmm'
//console.log(Car.brand)
console.log(car1.brand)
console.log(car2.brand)
console.log(car3.brand)