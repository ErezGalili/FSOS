const diceContainer = document.getElementById("dice-container");

class Dice {
    #faces
    #faceUp
    constructor(faces = 6) {
        this.#faces = faces;
        this.#faceUp = 1;
        this.div = document.createElement("div");
        this.div.className = "dice";
        this.div.addEventListener("click", () => this.roll());
        diceContainer.appendChild(this.div);
        this.roll();
    }

    roll() {
        return new Promise((resolve) => {
            let count = 0;
            const interval = setInterval(() => {
                this.#faceUp = Math.ceil(Math.random() * this.#faces);
                this.div.textContent = this.#faceUp;
                count++;
                if (count === 60) {
                    clearInterval(interval);
                    resolve(this.#faceUp);
                }
            }, 15);
        });
    }
}

const d = new Dice();

// const diceContainer = document.getElementById("dice-container");
// const addDiceBtn = document.getElementById("add-dice-btn");
// const h2 = document.getElementById("text");

// class Dice {
//     #faces;
//     #faceUp;

//     constructor(faces = 6) {
//         this.#faces = faces;
//         this.roll();
//     }

//     roll() {
//         this.#faceUp = Math.ceil(Math.random() * this.#faces);
//         return this.#faceUp;
//     }

//     get faceUp() {
//         return this.#faceUp;
//     }
// }

// class DiceComponent {
//     constructor(faces = 6) {
//         this.dice = new Dice(faces);

//         this.container = document.createElement("div");
//         this.img = document.createElement("img");
//         this.img.alt = "Dice";
//         this.btn = document.createElement("button");
//         this.btn.textContent = `Roll ${faces}-faced Dice`;

//         this.btn.addEventListener("click", () => this.rollDice());
//         this.container.appendChild(this.img);
//         this.container.appendChild(this.btn);
//         diceContainer.appendChild(this.container);

//         this.rollDice();
//     }

//     rollDice() {
//         const result = this.dice.roll();
//         const imgSrc = `images/dice${result}.png`;
//         this.img.setAttribute("src", imgSrc);

//         this.img.onerror = () => {
//             this.img.style.display = "none";
//             const text = document.createElement("p");
//             text.textContent = `Rolled: ${result}`;
//             text.style.fontSize = "1.2rem";
//             this.container.appendChild(text);
//             this.img.onerror = null;
//         };

//         h2.textContent = `You rolled a ${result}!`;
//     }
// }

// addDiceBtn.addEventListener("click", () => {
//     const faces = prompt("Enter the number of faces for the new dice:", "6");
//     const numFaces = parseInt(faces, 10);

//     if (isNaN(numFaces) || numFaces < 2) {
//         alert("Please enter a valid number greater than 1.");
//         return;
//     }

//     new DiceComponent(numFaces);
// });

// new DiceComponent(6);

// const btn = document.getElementById("btn")
// const h2 = document.getElementById("text")

// btn.addEventListener("click", () => {
//     let randomText = ""

//     while (randomText.length < 10) {
//         const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26))
//         if (!randomText.includes(randomChar)) {
//             randomText += randomChar
//         }
//     }

//     h2.textContent = randomText
// })