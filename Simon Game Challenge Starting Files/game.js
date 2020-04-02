var buttonColours = ["red", "blue", "green", "yellow"]; // array with the colours of all four buttons

var gamePattern = []; // random colour will be added in here

var userClickedPattern = [];  // buttons clicked by the user will be added in here

var started = false;

var level = 0; // game starts here

$(document).keypress(function(){ // function waits for a keydown to be executed
  if(!started) {     //if so, (started can be ignored (just a variable) until it reaches: started = true;)
    $("#level-title").text("Level " + level); // target h1 and change "press a key to start" to "level 0"
  nextSequence();  // call the function next sequence
  started = true;     // toggle true to false in order to avoid any following keydowns to trigger a new start of the game
  }
});

$(".btn").click(function(){           //buttons wait for click event

var userChosenColour = $(this).attr("id");    // this recently from the user clicked button well get its id saved in the var userChosenColour

userClickedPattern.push(userChosenColour);  // push the colour clicked by the user into the array userClickedPattern

  playSound(userChosenColour);    // when the user clicks on a colour send that information to the function playSound to make a sound

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);   //ckeck array userClickedPattern for the last answer of the user, -1 because red, red has a length of 2 but the last input is at 1 (0, 1)

});

function checkAnswer (currentLevel){

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {  //is the users recent picked colour the same as in the game pattern
if (userClickedPattern.length === gamePattern.length){    // is the sequence finished? (amout of buttons must equal (ones provided by game and ones pressed by the user))
  setTimeout( function(){
    nextSequence();             // start the next sequence with a 1 sec
  }, 1000);
}

} else {

   playSound("wrong"); // send wrong to replace name input in function makeSound

  $("body").addClass("game-over"); // if the user messed up the pattern applie blue-background game over style

    $("#level-title").text("Game Over");  // change h1 from "Level XY" to "Game Over, Press Any Key to Restart"

  setTimeout(function(){
    $("body").removeClass("game-over");
      $("#level-title").text("Press A Key to Start");
  }, 1000);                                          // remove the blue-background style after 200 milliseconds


  startOver();   // call the function startOver to restart the game

}
}

function nextSequence(){

userClickedPattern = [];  // reset userChlickedPattern after every round so that the user can start over

level++; // increase level each round by one

$("#level-title").text("Level " + level); //change h1 from "level 0" to "level 1" .....

var randomNumber = Math.floor(Math.random()*4); //create a random number between 0 and 3 (=> array has a length of 4)

var randomChosenColour = buttonColours[randomNumber]; // select a random colour out of the array buttonColours

gamePattern.push(randomChosenColour); // push that random colour into the gamePattern

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // attache randomChosenColour to button   // button flash

playSound(randomChosenColour);     // when a random colour gets chosen send that information to the function playSound to make a sound

}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");  // add style to a button when it gets pressed

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed"); //remove style from the button again (0.1 sec after it got pressed)
  }, 100);

}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");    // attach individual sound to each button when clicked
  audio.play();

}

function startOver (){

level = 0;  // reset level to 0

gamePattern = [];  // reset the game pattern

started = false;  //reset the starting variable so that another key can be pressed to trigger a new sequence

}

/*************************************** Angela`s solution *******************************/
