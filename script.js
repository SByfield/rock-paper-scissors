//INITIALIZE UI DOM elements
const pSelectionDisplay = document.querySelector('.playerSelection');
const cSelectionDisplay = document.querySelector('.computerSelection'); 
const playerScoreDisplay = document.querySelector('.playerScore'); 
const cpuScoreDisplay = document.querySelector('.cpuScore'); 
const gameInfoDisplay = document.querySelector('.gameInfo')
const resultsDisplay = document.querySelector('.results')
const endGamePopUp = document.querySelector('.gameEndPopUp')
const endGameMsg = document.querySelector('.gameEndMsg')
const endGameOverlay = document.querySelector('.gameEndOverlay')


//AUDIO 
var victoryAudio = document.createElement('audio'); 
victoryAudio.src = './Assets/Final-Fantasy-Victory.mp3';

var defeatAudio = document.createElement('audio'); 
defeatAudio.src = './Assets/Final-Fantasy-Game-Over.mp3'

var hoverAudio = document.createElement('audio'); 
hoverAudio.src = './Assets/Hover-SFX.wav';

function uiAudio() { 
  hoverAudio.play() 
}

//BUTTONS: 

const pSelection = document.querySelectorAll('.btn');
pSelection.forEach((button) => {
    button.addEventListener('click', getPlayerChoice); 
})
pSelection.forEach((button) => {
    button.addEventListener('click', beginRound); 
})

pSelection.forEach((button) => {
  button.addEventListener('mousedown', uiAudio)
})

const resetBtn = document.querySelector('.resetBtn'); 
resetBtn.addEventListener('click', resetGame)
resetBtn.addEventListener('mousedown', uiAudio)




let playerScore = 0;
let computerScore = 0;

// GET, SET, DISPLAY & RECORD Player Selection 


function getPlayerChoice(e){
    playerSelection = e.target.getAttribute('data-name');

    switch(playerSelection){
            case "rock":
            pSelectionDisplay.id = "pRock"
            break; 
           
            case "paper":
            pSelectionDisplay.id = "pPaper"
            break; 
           
            case "scissors":
            pSelectionDisplay.id = "pScissors"
            break; 
    }
    
    return playerSelection; 
   
}

//GET Computer Choice 
function getComputerChoice() {
    computerChoice = Math.floor(Math.random() * 3) + 1;
    if (computerChoice === 1) {
      cSelectionDisplay.id = "cRock";
      return "rock";
    } else if (computerChoice === 2) {
      cSelectionDisplay.id = "cPaper";
      return "paper";
    } else {
      cSelectionDisplay.id = "cScissors"
      return "scissors";
    }
  }
  //SET Score Counter to 0/Start Game
  function beginRound() {

  
    // COMPARE the Selections of Each Player to determine winner:
    function playRound(playerSelection, computerSelection) {
      if (playerSelection === "rock" && computerSelection == "scissors") {
        playerScore++;
        resultsDisplay.innerText = "You WIN!"
        gameInfoDisplay.innerText = "Rock CRUSHES Scissors";
      } else if (
        playerSelection === "rock" &&
        computerSelection == "paper"
      ) {
        computerScore++;
        resultsDisplay.innerText = "You LOSE.."
        gameInfoDisplay.innerText = "Paper COVERS Rock.";
      } else if (
        playerSelection === "paper" &&
        computerSelection == "rock"
      ) {
        playerScore++;
        resultsDisplay.innerText = "You WIN!"
        gameInfoDisplay.innerText = "Paper COVERS Rock.";
      } else if (
        playerSelection === "paper" &&
        computerSelection === "scissors"
      ) {
        computerScore++;
        resultsDisplay.innerText = "You LOSE.."
        gameInfoDisplay.innerText =  "Scissors CUTS Paper.";
      } else if (
        playerSelection === "scissors" &&
        computerSelection === "paper"
      ) {
        playerScore++;
        resultsDisplay.innerText = "You WIN!"
        gameInfoDisplay.innerText =  "Scissors CUTS Paper.";
      } else if (
        playerSelection === "scissors" &&
        computerSelection === "rock"
      ) {
        computerScore++;
        resultsDisplay.innerText = "You LOSE.."
        gameInfoDisplay.innerText =  "Rock CRUSHES Scissors.";
      } else if (
        playerSelection === computerSelection
      ) {
        resultsDisplay.innerText = "It's a DRAW"
        gameInfoDisplay.innerText =  
        `${playerSelection[0].toUpperCase() + playerSelection.slice(1)} TIES with ${computerSelection[0].toUpperCase() + computerSelection.slice(1)}`;
      }
    }
        //CALL Computer Random Selection Function 
        const computerSelection = getComputerChoice();
        
        (playRound(playerSelection, computerSelection));
        console.log(`Player Score: ${playerScore}, CPU Score: ${computerScore}`); 

        //UPDATE Score: 
        playerScoreDisplay.innerText = `${playerScore}`
        cpuScoreDisplay.innerText = `${computerScore}`

        if (playerScore >= 3 || computerScore >= 3){
          scoreTracker()
        }
       
        console.log(
          `You selected: ${playerSelection}, Your Opponent selected: ${computerSelection}`
        );
      } 


      //RESET GAME Function  
  function resetGame(){
  playerScore = 0; 
  computerScore = 0; 
  playerScoreDisplay.innerText = `${playerScore}`
  cpuScoreDisplay.innerText = `${computerScore}`
  pSelectionDisplay.id = ""; 
  cSelectionDisplay.id = ""; 
  resultsDisplay.innerText = "Select Rock, Paper or Scissors"
  gameInfoDisplay.innerText =  "The First to Win 3 Rounds Will be Victorous";
  endGamePopUp.style.display = "none";
  endGameOverlay.style.display = "none"; 
}


    //Score Tracker: 

    function scoreTracker(){
      {
        if(playerScore > computerScore){ 
          victoryAudio.play();
          endGamePopUp.style.display = "block";
          endGameOverlay.style.display = "block"; 
          endGameMsg.innerText = "VICTORY!";
      } else if (playerScore < computerScore) {
          defeatAudio.play();
          endGamePopUp.style.display = "block";
          endGameOverlay.style.display = "block"; 
          endGameMsg.innerText = "DEFEATED.."
      }
    }
  }
   