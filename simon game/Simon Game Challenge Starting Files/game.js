const buttonColours = ["red", "blue","green","yellow"]
const gamePattern = []

function nextSequence(){
    const randomNumber = Math.floor(Math.random()*4)
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    const sound = new Audio(`./sounds/${randomChosenColour}.mp3`)
    sound.play()
}

  
