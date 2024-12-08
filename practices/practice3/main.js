const btn = document.getElementById("btn")
const img = document.getElementById("img")
const h2 = document.getElementById("text")
let counter = 0
let score = 0

btn.addEventListener("click",()=>{
    if(counter < 3){
        const random = Math.ceil(Math.random()*6)
        score+=random
        const imgSrc = `images/dice${random}.png`
        img.setAttribute("src", imgSrc)
        counter++
    }
    if(counter === 3 && score >= 12){
        h2.textContent = "You won a million dollar"
        h2.style.color = "green"
        counter++
    } else if(counter === 3) {
        h2.textContent = "You lost a million dollar"
        h2.style.color = "red"
        counter++
    }
})






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