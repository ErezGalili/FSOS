//Q1

function add(m1, m2) {
    return m1 + m2;
}
function subtract(m1, m2) {
    return m1 - m2;
}
function calculate(callback, m1, m2){
    return callback(m1, m2)
}
console.log(calculate(add, 5, 8))
console.log(calculate(subtract, 5, 8))

//Q2

function multiplyByThree(n) {
    return n * 3;
}
function multiplyByFive(n) {
    return n * 5;
}
function calculateAndLog(callback, n){
    console.log(callback(n))
}
calculateAndLog(multiplyByThree, 4)
calculateAndLog(multiplyByFive, 4)

//Q3

const arr = [1, 2, 3, 4, 5]
function processArray(callback, arr){
    const newArr = callback(arr)
    console.log(newArr)
}
function multiplyByTwo(arr){
    return arr.map((n)=> n*2)
}
function divideByTwo(arr){
    return arr.map((n)=> n/2)
}
processArray(multiplyByTwo, arr)
processArray(divideByTwo, arr)

//Q4

setTimeout(()=>{
console.log(5+10)
}, 3000)

function multiply(m1, m2) {
    return m1 * m2;
}
setTimeout(() => {alert(multiply(7, 6))},4000)

//Q5

function avrageOfThree(m1, m2, m3){
    return (m1 + m2 + m3) / 3
}
setTimeout(()=>{alert(avrageOfThree(5, 6, 7))}, 3000)

//Q6

function delayedAction(callback, errorCallback) {
    setTimeout(() => {
        try {
            callback();
        } catch (error) {
            errorCallback(error);
        }
    }, 3000);
}
function performAction() {
    delayedAction(
        () => console.log("Action completed!"),
        (error) => console.error("Error occurred:", error)
    );
}