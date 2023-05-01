import EnemyController from "./EnemyController.js"
import Player from "./Player.js"
import BulletController from "./BulletController.js"




// var intervalTimer= setInterval(game, 1000/60)
var intervalTimer
document.getElementById("homeFromGame").addEventListener("click", closeGameFromNavHome)
// document.getElementById("aboutFromGame").addEventListener("click",closeGameFromNav)
document.getElementById("signFromGame").addEventListener("click", closeGameFromNavSign)
document.getElementById("loginFromGame").addEventListener("click",closeGameFromNavLogin)

function closeGameFromNavHome(){
    $("#gameDiv").hide()
    $("#signUpForm").hide()
    $("#loginForm").hide()
    $("#settingsDiv").hide()
    $("#EndGame").hide()
    
    resetGame()
    $("#welcomePage").show()
    
}



function closeGameFromNavSign(){
    $("#gameDiv").hide()
    $("#welcomePage").hide()
    $("#loginForm").hide()
    $("#settingsDiv").hide()
    $("#EndGame").hide()
    resetGame()
    $("#signUpForm").show()
    
}

function closeGameFromNavLogin(){
    $("#gameDiv").hide()
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#settingsDiv").hide()
    $("#EndGame").hide()
    resetGame()
    $("#loginForm").show()
    
}



const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext("2d")


const mute = document.querySelector('.speaker')//mute button
const keyboard= document.querySelector(".kbrd")//key shoot


canvas.width = innerWidth 
canvas.height = innerHeight



const background = new Image() 
background.style.color = 'transparent'


let mySound = new Audio("media/music2.mp3")
mySound.volume=0.3

let playerDead=new Audio("media/deadSound.mp3")
playerDead.volume=0.9


let loseSound=new Audio("media/lose.mp3")
loseSound.volume=0.9

let winSound=new Audio("media/win.mp3")
winSound.volume=0.9

let champSound=new Audio("media/win2.mp3")
champSound.volume=0.9

let betterSound=new Audio("media/better.mp3")
betterSound.volume=0.9

var keyShoot="Space"

document.querySelector(".kbrd").addEventListener('input', (e) => {
    
    keyShoot=e.currentTarget.value
    player.setVal(keyShoot)
    
 });



const playerBulletController = new BulletController(canvas, 20, "yellow", true)
const enemyBulletController = new BulletController(canvas, 2, "red", false)


//instance of enemy
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
var player = new Player(canvas, 3, playerBulletController,keyShoot, starship)
let newPlayerPositionX = player.x



let isGameOver = false
let didWin = false

let option1=false//ani
let option2=false//ani
let option3=false//ani



//timer vars
var timeLimit =120
var start_time
var time_elapsed

start_time = new Date()













// controling the sound in the game
mute.addEventListener('click', function() {
  if(mySound.muted==true){
    mySound.muted=false
    playerDead.muted=false
    playerBulletController.shootSound.muted=false
    enemyController.enemyDeathSound.muted=false
    enemyController.levelUp.muted = false
  }
  else{
    mySound.muted=true
    playerDead.muted=true
    playerBulletController.shootSound.muted=true
    enemyController.enemyDeathSound.muted=true 
    enemyController.levelUp.muted = true
  }
  
  })

  var inputFieldTime = document.querySelector(".timeSettings");//take the time from the input and set the time limit 
  
  inputFieldTime.addEventListener("input", function() {
      if(inputFieldTime.value>2 && inputFieldTime.value<=9){
          timeLimit = inputFieldTime.value*60;
              
      }      
  });



  var inputFieldAudio = document.querySelector(".soundSlider");//take the volume from the input and set the volume 

    inputFieldAudio.addEventListener("input", function() {
    mySound.volume=inputFieldAudio.value/100
    playerBulletController.shootSound.volume=inputFieldAudio.value/100
    enemyController.enemyDeathSound.volume=inputFieldAudio.value/100 
    playerDead.volume=inputFieldAudio.value/100 
    enemyController.levelUp.volume=inputFieldAudio.value/100
    
  
    });



//draw the  whole game
function game() {
    
    checkTimeLimit()
    checkGameOver()
    incraseSpeedInGame()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    displayGameOver()
    

    if (!isGameOver){
        drawAllGame()
    }
}

function drawAllGame(){ // till game is on we continue draw it all
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height) 
    enemyController.draw(ctx)
        player.draw(ctx)
        playerBulletController.draw(ctx)
        enemyBulletController.draw(ctx)

        lblScore.value = enemyController.score
        lblLife.value = player.lives
        

        lblTime.value = (timeLimit - time_elapsed).toPrecision(3) 
        if (lblTime.value <= 0){
            lblTime.value = 0.000
            timeLimit=0
            
        }
}



//coundown the game time
function checkTimeLimit(){
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
  
	if (time_elapsed >= timeLimit){
        isGameOver = true
	}
   
}



var incrase
var timeToIncrase 
// let every5limit=0
function incraseSpeedInGame(){
    if(time_elapsed >= timeToIncrase && incrase<4){
        incrase+=1
        timeToIncrase+=5
        enemyController.moveFaster()
    }
}



function checkGameOver() { //this function checks if bullets hit the player - if so ->game is over
    if (isGameOver) {
        lblTime.value=0

        return
    }
  
    if (enemyBulletController.collideWith(player)) { //update lives and game over
        player.lives--
        playerDead.play()//player dead sound

    
        if(player.lives <=0){//hosafti ifim
            isGameOver = true
            option1=true//ani
            
            
        }
        player.x = newPlayerPositionX
    }
    

    if ((timeLimit-time_elapsed)<=0.02){
        if (enemyController.score>=100){
            isGameOver=true
            option2=true

        }
        else{
            isGameOver=true
            option3=true
        }
    }
    
    if (enemyController.enemyRows.length === 0) {
      didWin = true
      isGameOver = true
      timeLimit=0
    }

  
}


const winlose= document.getElementById("WinloseTxt")


function displayGameOver() {
    if (isGameOver) {


        if (option1){
            timeLimit=0

            winlose.textContent = "You Lost"
            winlose.style.fontSize = "100px";
            loseSound.play()
            moveDivEnd()

        }
        if(option2){

            winlose.textContent = "Winner!"

            winlose.style.fontSize = "100px"
            winSound.play()
            moveDivEnd()
        }
        if(option3){


            winlose.textContent = "You can do better"

            winlose.style.fontSize = "100px";
            betterSound.play()
            moveDivEnd()
        }
        if(didWin){


            winlose.textContent = "Champion!"

            winlose.style.fontSize = "100px";
            champSound.play()
            moveDivEnd()
        }
        insertTable()
        window.clearInterval(intervalTimer)
      
    }
}

// var i = 0

function insertTable(){

    var table = document.querySelector('.fl-table')
    let tbody = table.querySelector('tbody')  || highscoresTable.appendChild(document.createElement('tbody'))
    // var table = document.getElementById('.fl-table');
    

    var date = new Date().toLocaleString()
    var playerName = lblUser.value
    var scoress = lblScore.value


    let newRow = tbody.insertRow(); 
    // const newRow = table.insertRow();
    const rankCell = newRow.insertCell();
    const nameCell = newRow.insertCell();
    const scoreCell = newRow.insertCell();
    const dateCell = newRow.insertCell();

    // rankCell.innerText = i + 1;
    nameCell.innerText = playerName
    scoreCell.innerText =scoress;
    dateCell.innerText = date;

    let rows = tbody.rows;

    let position = rows.length - 1; // Start from the second last row (last row is the new one)


    while (position > 0 && parseInt(rows[position-1].cells[2].innerHTML) < scoress) {
        position--;
    }


    if(position>0){
        if(rows[position-1].cells[1].innerHTML!=undefined)
            if(rows[position-1].cells[1].innerHTML!=playerName){
                clearTable()
                position=0
                let newRow = tbody.insertRow(); 
                // const newRow = table.insertRow();
                const rankCell = newRow.insertCell();
                const nameCell = newRow.insertCell();
                const scoreCell = newRow.insertCell();
                const dateCell = newRow.insertCell();
            
                // rankCell.innerText = i + 1;
                nameCell.innerText = playerName
                scoreCell.innerText =scoress;
                dateCell.innerText = date;
                rankCell.innerHTML = position+1
            }
        // else{
        //     continue
        // }
    }
    
    rankCell.innerHTML = position+1

    if (position < rows.length - 1) {
        tbody.insertBefore(newRow, rows[position]) // Insert the new row at the correct position
        
        for(let i=position; i<rows.length; i++){
            rows[i].cells[0].innerHTML=i+1

        }
      }else{
        rankCell.innerHTML=rows.length
    }
}


function clearTable() {
    let highscoresTable = document.querySelector('.fl-table')
    let tbody = highscoresTable.querySelector('tbody');
    if (tbody) {
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild); // Remove all child nodes of tbody
      }
    }
}


function moveDivEnd(){
    //stop game function
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#settingsDiv").hide()
    $("#loginForm").hide()

    $("#gameDiv").hide()
    
    resetGame()
    $("#EndGame").show()
    $("#footer").show()

}

function moveDivSett(){
    //stop game function
    $("#gameDiv").hide()
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#loginForm").hide()
    
    $("#EndGame").hide()
    resetGame()
    $("#settingsDiv").show()
    $("#footer").show()

}



document.getElementById("newGameButton").addEventListener("click",moveDivSett)
document.getElementById("newGameSett").addEventListener("click",newGame)
document.getElementById("NGM").addEventListener("click",newGame)


    
function newGame(){
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#loginForm").hide()
    $("#footer").hide()
    
  

    $("#gameDiv").show()
    $("#EndGame").hide()
    $("#settingsDiv").hide()
    resetGame()
    // canvas.focus()
    
    intervalTimer= setInterval(game, 1000/60)

    mySound.play()

    // startInterval(game())
}


function resetGame(){
    if (intervalTimer != undefined){
		window.clearInterval(intervalTimer)
	}
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    mySound.pause()
    // playerDead.pause()
    mySound.currentTime = 0
    // playerDead.currentTime = 0
    
    player = new Player(canvas, 3, playerBulletController,keyShoot, starship)
    
    isGameOver= false
    didWin= false
    option1=false
    option2=false
    option3=false
    player.setLives()
    enemyController.setScore()
    enemyController.createEnemies()
    enemyController.setBullets()
    enemyController.setDefaultX()

    playerBulletController.setBulletsNone()
    enemyBulletController.setBulletsNone()

    timeLimit = inputFieldTime.value*60
    start_time = new Date()
    incrase=0
    timeToIncrase=5
}