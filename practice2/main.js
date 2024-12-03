class Dice {
    #faceUp = 0
    #history = []
    #faces = 6
    constructor(faces = 6) {
        if (faces >= 2) {
            this.#faces = faces
        } else {
            console.error("Invalid")
        }
        this.roll()
    }
    get faceUp() {
        return this.#faceUp
    }
    roll() {
        this.#faceUp = Math.ceil(Math.random() * this.#faces)
        this.#history.push(this.#faceUp)
        return this.#faceUp
    }
    getHistory() {
        return [...this.#history]
    }
    get faces() {
        return this.#faces
    }
}

const d = new Dice(10)
console.log(d.faceUp)

class TalkingDice extends Dice {
    roll() {
        const newRoll = super.roll()
        this.talk(newRoll)
        return newRoll
    }
    talk(value) {
        console.log("The new roll is: " + value);
    }
}

const t = new TalkingDice(4)



function displayCurrentTime() {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')

    document.getElementById("Clock").innerHTML = `The current time is: ${hours}:${minutes}:${seconds}`
}

setInterval(displayCurrentTime, 1000)

const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color;
}

let n = 0
const interval = setInterval(() => {
    n++
    if (n > 5) {
        clearInterval(interval)
        return
    }
    document.body.innerHTML += `<p style="color: ${getRandomColor()}">Message #${n}</p>`
}, 2000)