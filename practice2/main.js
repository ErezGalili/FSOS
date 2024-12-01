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
