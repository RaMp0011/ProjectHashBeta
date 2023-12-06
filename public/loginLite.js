const form=document.getElementById("upload2");
let inputNum=document.getElementById("phone");
let patternPhon=new RegExp("\\d|\\.");
inputNum.addEventListener("keyup",function(event){
    
    if(!patternPhon.test(inputNum.value)){
        event.preventDefault();
        inputNum.value=null;
    }
})

var validatePhoneOnKeyUpAttached = false;
var validatePassOnKeyUpAttached = false;

form.addEventListener('submit',(e)=> {
    e.preventDefault();
    if (!validatePhoneOnKeyUpAttached) {
        document.getElementById("phone").onkeyup = checkPhone;
        validatePhoneOnKeyUpAttached = true;
    }
        if (!validatePassOnKeyUpAttached) {
            document.getElementById("password").onkeyup = checkPass;
            validatePassOnKeyUpAttached = true;
        } 
        if(checkPhone()&&checkPass()){
             sendInfo();
        }
       
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
        document.getElementById("errorMessage1").innerHTML = "Enter a valid 10 digit phonr number";
        return false;
    }
}
function checkPass() {
    var pass = document.getElementById("password").value;
    var pattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

    if (pattern.test(pass)) {
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("errorMessage2").style.color = "blueviolet";
        document.getElementById("errorMessage2").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("errorMessage2").style.color = "red";
        document.getElementById("errorMessage2").innerHTML = "Minimum eight characters, at least one letter, one number and one special character";
        return false;
    } 
}

const sendInfo= async()=>{
    const getPhone=document.getElementById("phone");
    const getPass=document.getElementById("password");
    const Phone=getPhone.value;
    const Password=getPass.value;
    let info=JSON.stringify({phone:Phone,Password:Password})
    const response=await fetch('http://localhost:8080/login1',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.info==false){
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("errorMessage1").innerHTML = "The user doesn't exist⚠️, Try to Sign-up";
    }
    else if(json.entry==false){
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("errorMessage2").innerHTML ="Incorrect password!❌"; 
    }
    else{
        document.getElementById("password").style.borderColor = "green";
        document.getElementById("errorMessage2").innerHTML ="Succesfully loged-in";  
        rep(json.entry);
    }
}
const rep=async(pass)=>{

}
