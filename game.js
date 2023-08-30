//variable declaration
var buttonColours = ["red","green","blue","yellow"];
var gamePattern = [];
var userClickedPattern  = [];
var level = 0;
var gameStarted = false;
var currLevel = 0;
//start over function
function startOver(){
    gamePattern = [];
    userClickedPattern=[];
    level = 0;
    gameStarted = false;
    $("#level-title").text("Press A Key to Start");
}
//next sequence function
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomGeneratedColour = buttonColours[randomNumber];
    gamePattern.push(randomGeneratedColour);
    var chosenButton = $("."+randomGeneratedColour);
    chosenButton.fadeOut(75).fadeIn(75);
    makeSound(randomGeneratedColour);
}
//make sound function
function makeSound(colour){
    var tone = new Audio("sounds/"+colour+".mp3");
    tone.play();
}
//animate press function 
function animatePress(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(() => {
            $("#"+colour).removeClass("pressed");
        }, 100);
    }
//check answer function
function checkAnswer(currClickCount){
    if(userClickedPattern[currClickCount-1]===gamePattern[currClickCount-1]){
        if (userClickedPattern.length===gamePattern.length){
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
            
        }
        else{
            pass;
        }
    }
    else{
        $("#level-title").text("Game Over!  ");
        $("body").addClass("game-over");
        makeSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        setTimeout(() => {
            startOver();
        }, 2000);
        
        
    }
}


//beginning of the actual execution

$(document).keypress(function(){
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
            
        }
    })
$(document).click(function(){
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
            
        }
    })

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length)
})



