const person = {
    name: "Lado",
    age: 35,
    greet() {
        console.log('Hi'.concat(' ', this.name));
    }
}

person.greet();

const printName = ({name, greet}) => {
    greet();
};

printName(person);


let a = 3;
let b = 5;

console.log(a, b);
[a, b] = [b, a];
console.log(a, b);

let s = `lado ${a}`;


