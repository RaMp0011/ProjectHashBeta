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
    details(pass.ID);
    var div=document.getElementById('box');
    var div2=document.getElementById('profile');
    div.style.display='none';
    div2.style.display='block';
    var body=document.getElementsByTagName('body')[0];
    body.style.backgroundImage='url(/components/profile.jpg)';
    document.getElementById('username').innerHTML=`Welcome, ${pass.Name}!`;
    const form=document.getElementById("gameform");
    form.addEventListener('submit',(e)=>{
        const temp=parseInt(document.getElementById("create").value);
        e.preventDefault();
        const id=pass.ID;
        sendInfo2(id,temp); 
    })
}

const sendInfo2=async(id,pass)=>{
    const game=document.getElementById("play").value;
    const location=document.getElementById("location").value;
    const players=parseInt(document.getElementById("players").value);
    const date=document.getElementById("date").value;
    let info=JSON.stringify({ID:id,Games:game,PlayerCount:players,Location:location,HeldOn:date,Allow:pass});
    const response=await fetch('http://localhost:8080/create',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.creation==true){
        document.getElementById('Message').innerHTML="As been created succesfully";
        details(id);
    }
    else if(json.creation==false){
        document.getElementById("Message2").innerHTML="Already one event is live";
    }
    else{
        document.getElementById("Message2").innerHTML="";
        document.getElementById('Message').innerHTML="As been updated succesfully";
        details(id);
    }
}
const details=async(id)=>{
    let info=JSON.stringify({ID:id});
    const response=await fetch('http://localhost:8080/dashboard',{
        method:"POST",
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.back==false){
        document.getElementById('gameI').innerHTML="No event as been found"
    }
    else{
    document.getElementById('gameI').innerHTML=`Game - ${json.back.Game}`;
    document.getElementById('playersI').innerHTML=`Required Players - ${json.back.PlayerCount}`;
    document.getElementById('locationI').innerHTML=`Location - ${json.back.Location}`;
    document.getElementById('dateI').innerHTML=`On - ${json.back.HeldOn}`;
    }
 const edit=document.getElementById('edit');
edit.addEventListener('click',()=>{
    document.getElementById('play').value=json.back.Game;
    document.getElementById('players').value=json.back.PlayerCount;
    document.getElementById('location').value=json.back.Location;
    document.getElementById('date').value=json.back.HeldOn;
    document.getElementById('create').innerHTML="Edit";
    document.getElementById('create').value=1;
})

}

date=document.getElementById('date')
date.valueAsDate=new Date();
date.min=new Date().toISOString().split("T")[0];
date.max=new Date("2023-12-28").toISOString().split("T")[0];