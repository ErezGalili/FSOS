const buttons = document.querySelectorAll(".drum")

buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        playSound(button.textContent)
    })
})

const sounds = {
    w: "sounds/crash.mp3",
    a: "sounds/kick-bass.mp3",
    s: "sounds/snare.mp3",
    d: "sounds/tom-1.mp3",
    j: "sounds/tom-2.mp3",
    k: "sounds/tom-3.mp3",
    l: "sounds/tom-4.mp3",
  }  

  function playSound(char) {
    const audio = new Audio(sounds[char] ?? "sounds/fail.mp3")
    audio.play()
  }

addEventListener("keydown", (e)=>{
    playSound(e.key.toLowerCase())
})