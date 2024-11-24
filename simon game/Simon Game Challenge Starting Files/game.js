const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0

function nextSequence() {
    level++
    $("#level-title").text("level "+level)
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    if(level == 33){
        $("#level-title").text("You won!")
        resetGame()
    }
}

$(".btn").click(function () {
    const userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function playSound(colour) {
    const sound = new Audio(`./sounds/${colour}.mp3`)
    sound.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

$(document).keydown((e) => {
    if (!gamePattern.length) nextSequence();
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
        playSound("wrong")
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key To Restart")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        return
    }
    if(gamePattern.length==userClickedPattern.length){
        setTimeout(function(){
            nextSequence()
            userClickedPattern = []
        },1000)
    }
}

function resetGame(){
    level = 0
    gamePattern = []
    userClickedPattern = []
    return
}