var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log(randomChosenColour);

  level++;
  $("#level-title").text("Level "+ level);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keydown(function(event) {
  if(!started) {
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
