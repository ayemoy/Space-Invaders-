


//   ---------------------------------------------------------------funcions for sign up ----------------------------------------------------------------------------------------

//users dictionary after sign up. we will add it all sign ups


var registeredUsers = {"p":"testuser", "a":"a"}; //befor hhagasha we need to chang it!!!!!!!!!!!!!!!!!
// const loginSubmmition = document.getElementById("loginSubmmition");



$(document).ready(function() {
    jQuery.validator.addMethod("lettersRule", function(value, element) {
        return this.optional(element) || /^(([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*)$/i.test(value);
    }, "Must contain only letters and numbers");
    
    jQuery.validator.addMethod("onlyLetters", function(value, element) {
        return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    }, "Must contain only letters");
    
    jQuery.validator.addMethod("validEmail", function(value, element) {
        return this.optional(element) || /^[\w\.]+@([\w]+\.)+[\w]{2,}$/i.test(value);
    }, "Please enter a valid email address");
    
    $.validator.addMethod("date",function(value, element) {
        var currentDate = new Date();
        var selectedDate = new Date(value);
        return (currentDate >= selectedDate);
    },"Select valid date");
    
    validateSignUp();
});



function validateSignUp(){
    $("#signForm").validate({

        rules: {
            UserName: {
                required: true
            },
            Password:{
                required: true,
                lettersRule: true,
                minlength: 8
            },
            ConfirmPassword: {
                required: true,
                lettersRule: true,
                minlength: 8,
                equalTo: "#Password"
            },
            firstName: {
                required: true,
                onlyLetters: true
            },
            lastName: {
                required: true,
                onlyLetters: true
            },
            email: {
                required: true,
                validEmail: true
            },
            birthday: {
                required: true,
                date: true
            },
        },
        messages: {
            UserName: {
                required: "Please enter username"
            },
            Password:{
                required: "Please provide a password",
                lettersRule: "Password must contain letters and numbers only",
                minlength: "Your password must be at least 8 characters"
            },
            ConfirmPassword: {
                required: "Please confirm your password",
                lettersRule: "Password must contain letters and numbers only",
                minlength: "Your password must be at least 8 characters",
                equalTo: "Passwords not identical. try again"
            },
            firstName: {
                required: "Please enter your first name",
                onlyLetters: "First name must contain only letters"
            },
            lastName: {
                required: "Please enter your last name",
                onlyLetters: "Last name must contain only letters"
            },
            email: {
                required: "Please enter email address",
                validEmail: "Please enter a valid email address"
            },
            birthday: {
                required: "Please enter your birth date",
                date: "Please enter a valid date"
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        // when form is all valid
        submitHandler: function (form) {
            registerUser();
            $('#signUpForm').fadeOut();
            $('#loginForm').delay(550).show(0);
            resetRegisterForm();
        }
    });
}



//this func check if all rules are ok and the whole form can be submited . now we create a new user in system 
function registerUser() {
    let userName = $("#UserName").val();
    let password = $("#Password").val();

    if (validUserName(userName)){
        alert("The chosen user name already exist.")
        return;
    }
    
    if ($("#signForm").valid()){
        registeredUsers[userName] = password;
        alert("Successfully signed up!")
        
    }
    return false;
}


//this func check if the user already exist in the system
function validUserName(userName){
    if(userName in registeredUsers){
        return true //found in system
    }
    return false
}



//reset register form 
function resetRegisterForm() {
    $("#signForm")[0].reset()
    $("#signForm").data("validator").resetForm();
}


