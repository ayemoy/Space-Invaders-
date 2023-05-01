





//welcome page objects
const welcomePage = document.getElementById("welcomePage");
const signUpButton = document.getElementById("signUpButton");
const LoginButton = document.getElementById("LoginButton");


//sign up form page object
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");


const settingsDiv = document.getElementById("settingsDiv");
const gameDiv = document.getElementById("gameDiv");
const footer = document.getElementById("footer");





//todo = > do a list for all divs with document. and use it in this function
function switchToDiv(divToSwitch) { //this is the main function that control the divs switching
    dictOfAllDivs = ["welcomePage", "signUpForm", "settingsDiv", "loginForm", "gameDiv"] //ADD more dives!!
    
    if(document.getElementById("gameDiv").style.display == "block"){
        // endGame()
    }
    
    for(let i=0; i<dictOfAllDivs.length; i++) {
        document.getElementById(dictOfAllDivs[i]).style.display = "none"
    }

    
    document.getElementById(divToSwitch).style.display="block"
    //divToSwitch.style.display="block"
  }





//mute-unmute functionality
$('.speaker').click(function(e) {
    e.preventDefault();
  
      $(this).toggleClass('mute');
  });


  function fromWelcomeToLogin(){
    $("#loginForm").show()
    $("#gameDiv").hide()
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#EndGame").hide()
    $("#footer").show()


    $("#settingsDiv").hide()

}

function fromWelcomeToSignup(){
    $("#loginForm").hide()
    $("#gameDiv").hide()
    $("#signUpForm").show()
    $("#welcomePage").hide()
    $("#EndGame").hide()
    $("#footer").show()


    $("#settingsDiv").hide()

}
