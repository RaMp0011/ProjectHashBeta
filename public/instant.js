const inputField = document.getElementById("name");
const form=document.getElementById("upload1");

inputField.addEventListener("keyup", function(event) {
  event.preventDefault();
  inputField.value = inputField.value.toUpperCase();
});
let inputNum=document.getElementById("phone");
let patternPhon=new RegExp("\\d|\\.");
inputNum.addEventListener("keyup",function(event){
    
    if(!patternPhon.test(inputNum.value)){
        event.preventDefault();
        inputNum.value=null;
    }
})

var validatePhoneOnKeyUpAttached = false;
var validateEmailOnKeyUpAttached = false;
var validateNameOnKeyUpAttached = false;
var validatePassOnKeyUpAttached = false;
var validateCPassOnKeyUpAttached = false;
form.addEventListener('submit',(e)=> {
    e.preventDefault();
    if (!validatePhoneOnKeyUpAttached) {
        document.getElementById("phone").onkeyup = checkPhone;
        validatePhoneOnKeyUpAttached = true;
    }
    if (!validateEmailOnKeyUpAttached) {
        document.getElementById("email").onkeyup = checkEmail;
        validateEmailOnKeyUpAttached = true;
    }
    if (!validateNameOnKeyUpAttached) {
        document.getElementById("name").onkeyup = checkName;
        validateNameOnKeyUpAttached = true;
    }    
    if (!validatePassOnKeyUpAttached) {
        document.getElementById("password").onkeyup = checkPass;
        validatePassOnKeyUpAttached = true;
    }    
    if (!validateCPassOnKeyUpAttached) {
        document.getElementById("Cpassword").onkeyup = checkCpass;
        validateCPassOnKeyUpAttached = true;
    }    

    if(checkPhone()&&checkEmail()&&checkName()&&checkCpass()&&checkPass()){
 
        sendInfo();
    }
   
})

const search=document.getElementById("search");
search.addEventListener("click",(e)=>{
    // e.preventDefault();
    //  var search=document.getElementById("searchbox").value
    //  const find=search.toLowerCase();
    // const info=json.stringify({Find:find})
    // const response= await fetch('http://localhost:8080/search',{
    //     method:'POST',
    //     body: info,
    //     headers:{'Content-Type':'application/json'}  
    // })
})

function checkPhone() {
    var phone = document.getElementById("phone").value;
    var pattern = new RegExp(/^\d{10}$/);

    if (pattern.test(phone)) {
        document.getElementById("phone").style.borderColor = "green";
        document.getElementById("errorMessage2").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("errorMessage2").innerHTML = "Enter a valid 10 digit phonr number";
        return false;
    }
}
function checkEmail() {
    var email = document.getElementById("email").value;
    var pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    if (pattern.test(email)) {
        document.getElementById("email").style.borderColor = "green";
        document.getElementById("errorMessage3").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("errorMessage3").innerHTML = "Enter a valid email(eg. abc@gmail.com)";
        return false;
    }
}
function checkName() {
    var name = document.getElementById("name").value;
    var pattern = new RegExp(/^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/);

    if (pattern.test(name)) {
        document.getElementById("name").style.borderColor = "green";
        document.getElementById("errorMessage1").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("name").style.borderColor = "red";
        document.getElementById("errorMessage1").innerHTML = "Enter a proper name";
        return false;
    } 
}
function checkPass() {
    var pass = document.getElementById("password").value;
    var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

    if (pattern.test(pass)) {
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("errorMessage4").style.color = "blueviolet";
        document.getElementById("errorMessage4").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("name").style.borderColor = "red";
        document.getElementById("errorMessage4").style.color = "red";
        document.getElementById("errorMessage4").innerHTML = "Minimum eight characters, at least one letter, one number and one special character";
        return false;
    } 
}
function checkCpass() {
    var cpass = document.getElementById("Cpassword").value;
    var pass = document.getElementById("password").value;

    if (cpass==pass) {
        document.getElementById("Cpassword").style.borderColor = "green";
        document.getElementById("errorMessage5").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("name").style.borderColor = "red";
        document.getElementById("errorMessage5").innerHTML = "It is not same as above password";
        return false;
    } 
}

const sendInfo= async()=>{
    const getName=document.getElementById("name");
    const getPhone=document.getElementById("phone");
    const getEmail=document.getElementById("email");
    const getPass=document.getElementById("Cpassword")
    const NAME=getName.value;
    const Phone=getPhone.value;
    const Email=getEmail.value;
    const Password=getPass.value;
    let info=JSON.stringify({name: NAME, phone:Phone, Email:Email,Password:Password})
    const response=await fetch('http://localhost:8080/submission',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.info==false){
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("errorMessage2").innerHTML = "This phone number already exist⚠️";
     }
    else{
        window.location.href = 'http://localhost:8080/login'
    }
}





