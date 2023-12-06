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
        gamecheck(json.entry.Phone)
    }

}
const rep=async(pass)=>{
   
    details(pass.ID);
    var div=document.getElementById('box');
    var div2=document.getElementById('profile');
    div.style.display='none';
    div2.style.display='block';
    var body=document.getElementsByTagName('body')[0];
    body.style.backgroundImage='url(/components/messi.jpg)';
    document.getElementById('name').innerHTML=`Welcome, ${pass.Name}!`;
    document.getElementById('phone').innerHTML=`${pass.Phone}!`;
    document.getElementById('email').innerHTML=`${pass.Email}`;
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
        console.log(json.back)
    document.getElementById('infod').style.display="block";
    document.getElementById('gamein').innerHTML="";
    document.getElementById('gameI').innerHTML=`${json.back.Game}`;
    document.getElementById('playersI').innerHTML=`${json.back.PlayerCount}`;
    document.getElementById('locationI').innerHTML=`${json.back.Location}`;
    document.getElementById('dateI').innerHTML=`${json.back.HeldOn}`;
    requestP(id);
   
    }
 const edit=document.getElementById('edit');
edit.addEventListener('click',()=>{
    document.getElementById('play').value=json.back.Game;
    document.getElementById('players').value=json.back.PlayerCount;
    document.getElementById('location').value=json.back.Location;
    document.getElementById('date').value=json.back.HeldOn;
    document.getElementById('create').innerHTML="Edit";
    document.getElementById('create').value=1;
}
)}
const requestP=async(id)=>{
    let temp=6;
    while(temp){
        document.getElementById(`reqlist${temp}`).style.display="none";
        temp--; 
    }
    let info=JSON.stringify({ID:id});
    const response=await fetch('http://localhost:8080/requestP',{
        method:"POST",
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.info==false){
        document.getElementById('norequest').innerHTML="no request"
    }
    else{
        document.getElementById('norequest').innerHTML="";
        let count=json.info.length;
        while(count){
            let content=json.info[count-1];
           document.getElementById(`reqlist${count}`).style.display="block";
           document.getElementById(`rename${count}`).innerHTML=`${content.Name}`;
           document.getElementById(`phone${count}`).innerHTML=`${content.Phone}`;
           count--;
        }
        const idk=async(key,pas,json1)=>{
            console.log(json1)
            let phone=json1.info[key-1].Phone;
            let name=json1.info[key-1].Name;
            let id=json1.info[key-1].ID;
            let info=JSON.stringify({ID:id,Name:name,Phone:phone,Pas:pas});
            const response=await fetch('http://localhost:8080/requestA',{
            method:"POST",
            body: info,
            headers:{'Content-Type':'application/json'}
        })
        const json= await response.json();
        if(json.info){
            requestP(id);
            details(id);
        }
        else{
           document.getElementById.innerHTML="Exceeding required players limit!" 
        }
        }
        let k=document.getElementById('accept1');
        // k.addEventListener('click',idk(1,1,json))
        k.addEventListener('click',()=>{idk(1,1,json)})
        document.getElementById('accept2').addEventListener('click',()=>{idk(2,1,json)});
        document.getElementById('accept3').addEventListener('click',()=>{idk(3,1,json)});
        document.getElementById('accept4').addEventListener('click',()=>{idk(4,1,json)});
        document.getElementById('accept5').addEventListener('click',()=>{idk(5,1,json)});
        document.getElementById('accept6').addEventListener('click',()=>{idk(6,1,json)});
    }
}
const gamecheck=async(phone)=>{
    let info=JSON.stringify({Phone:phone});
    const response=await fetch('http://localhost:8080/gamecheck',{
        method:"POST",
        body: info,
        headers:{'Content-Type':'application/json'}
    })
    const json=await response.json()
    if(json.info==false){
        console.log("aayi");
        document.getElementById('infocc').innerHTML="You haven't participated"
    }
    else{
        let count=json.info.length;
        let temp=1;
        while(count){
        document.getElementById(`gamecc${temp}`).style.display="block";
        let content=json.info[count-1];
        document.getElementById(`gamek${temp}`).innerHTML=`${content.Game}`
        document.getElementById(`schedule${temp}`).innerHTML=`${content.HeldOn}`
        document.getElementById(`organizer${temp}`).innerHTML=`${content.Location}`
        count--;
        temp++;
        }
  
    }
    // if{
    //     let temp=json.info.length;
    //     temp=getElementById("login");

    // }
}

const tabs=document.querySelectorAll('.tab_btn');
const all_content=document.querySelectorAll('.content');

tabs.forEach((tab,index)=>{
    tab.addEventListener('click',(e)=>{
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');
        all_content.forEach(content=>{content.classList.remove('active')})
        all_content[index].classList.add('active');
    })

})

date=document.getElementById('date')
date.valueAsDate=new Date();
date.min=new Date().toISOString().split("T")[0];
date.max=new Date("2023-12-28").toISOString().split("T")[0];