const arr1 = []
for(let i = 1; i<= 10; i++){
    arr1.push(i)
}
console.log(arr1)

const arr2 = [2, 5, 8]

console.log(arr2.filter(num => (num %2 != 0)*2))
