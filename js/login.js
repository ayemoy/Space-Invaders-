

const loginSubmmition = document.getElementById("loginSubmmition");
// var labelUser = document.getElementById("lblUser")
//   ---------------------------------------------------------------funcions for login----------------------------------------------------------------------------------------

function submitLogin(){ 
    let userName = $("#loginUserName").val();
    let password = $("#loginPassword").val();
    currLogged = userName;
    if (userName in registeredUsers){
        if(registeredUsers[userName] == password){
            lblUser.value = userName

            moveToSettings()

        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user name not found")
    }
    return false;
}



function moveToSettings(){

    $("#loginForm").hide()
    $("#gameDiv").hide()
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#EndGame").hide()
    // $("#footer").show()

    $("#settingsDiv").show()

}
  