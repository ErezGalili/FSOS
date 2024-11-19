function arrLargestNum(){
    const arr = []
for(let i = 0; i < 20; i++){
    arr.push(Math.random() * 10)
}
arr.sort((a, b) => a - b)
console.log(arr[19])
}

function arrMod3Sum(){
    let sum = 0
    const arr2 = []
    for(let i = 0; i < 50; i++){
        arr2.push(Math.floor(Math.random() * 101))
        if (arr2[i]%3 == 0)sum++;
    }
    console.log(sum)
}

function arrRootPow(){
    const arr3 = []
    for(let i = 0; i < 50; i++){
        let num = Math.floor(Math.random() * 501)
        arr3.push(Math.sqrt(num))
        arr3.push(num ** 4)
    }
    console.log(arr3)
}

arrRootPow()