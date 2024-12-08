const main = () => {
    Q9("READ ONLY MEMORY")
    plus()
    minus()
    reset()
    headerColor()
    randomC()
}

const Q9 = (str) => {
    let newStr = str[0] + '.'
    for (let i = 0; i < str.length - 1; i++) {
        if (str[i] == ' ') newStr += str[i + 1] + '.'
    }
    return newStr
}

const spanTag = document.querySelector("span")
let count = 0

const plus = () => {
    const btnPlus = document.querySelector("#button1")
    btnPlus.addEventListener("click", () => {
        count++
        spanTag.innerHTML = count
    })
}

const minus = () => {
    const btn2Tag = document.querySelector("#button2")
    btn2Tag.addEventListener("click", () => {
        count--
        spanTag.innerHTML = count
    })
}

const reset = () => {
    const btn3Tag = document.querySelector("#button3")
    btn3Tag.addEventListener("click", () => {
        count = 0
        spanTag.innerHTML = count
    })
}

const header = document.querySelector("#header")
const headerColor = () => {
    const button = document.querySelector("#colorButton")
    const colors = ["blue", "red", "orange", "green"]
    let currentColorIndex = 0
    button.addEventListener("click", () => {
        header.style.color = colors[currentColorIndex]
        currentColorIndex = (currentColorIndex + 1) % colors.length
    })
}

const randomC = () => {
    const button = document.querySelector("#randomColorButton");
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color;
    }
    button.addEventListener("click", () => {
        const randomColor = getRandomColor()
        header.style.color = randomColor
    })
}


main()
