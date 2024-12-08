const img1 = document.querySelector(".img1")
const img2 = document.querySelector(".img2")

const random1 = Math.floor(Math.random()*6)+1
const random2 = Math.floor(Math.random()*6)+1

const img1src = `images/dice${random1}.png`
const img2src = `images/dice${random2}.png`

img1.setAttribute("src", img1src)
img2.setAttribute("src", img2src)

const winD = document.querySelector(".Result")

if(img1src > img2src){
    winD.textContent = "Dice 1 is the winner"
} else if (img1src < img2src){
    winD.textContent = "Dice 2 is the winner"
} else {
    winD.textContent = "Sadly its a draw"
}