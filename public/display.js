let json;
const join1=document.getElementById('join1');
const join2=document.getElementById('join2');
const join3=document.getElementById('join3');
const box=document.getElementById('box');
const box2=document.getElementById('box2');
const overlay=document.getElementById('ovrly');
const cross=document.getElementById('cross');
const Sign=document.getElementById('Sign-up');
const Log=document.getElementById('login');
let flag1;
const a=async()=>{
const get=localStorage.getItem('search');
console.log(get)
let info=JSON.stringify({PROP:get});
const response= await fetch('http://localhost:8080/search',{
    method:'POST',
    body: info,
    headers:{'Content-Type':'application/json'}  
})
json=await response.json();
// console.log(json.info)
let size=json.info.length

let count=1;
let temp=[];
while(size){
    let content=json.info[count-1];
    document.getElementById(`box-${count}`).style.display='block';
    document.getElementById(`uname${count}`).innerHTML=`${content.Name}`
    document.getElementById(`ugame${count}`).innerHTML=`Game-    ${content.Game}`
    document.getElementById(`ulocation${count}`).innerHTML=`Location- ${content.Location}`
    document.getElementById(`udate${count}`).innerHTML=`Scheduled on- ${content.HeldON}`
    document.getElementById(`contect${count}`).innerHTML=`Contect-   ${content.Phone}`
    temp[count-1] =content.Phone;
    count++;
    size--;
}


}
(async()=>{a()})()
// console.log(json)

// join1.addEventListener("click",()=>{
//     if(obj=='0'){
//     overlay.style.display="block"
//     box.style.display="block"
// }})
join1.addEventListener('click',()=>{
    console.log("test")
if(!flag1){
    overlay.style.display="block"
    box.style.display="block"
}})
join2.addEventListener('click',()=>{
    console.log("test")
if(!flag1){
    overlay.style.display="block"
    box.style.display="block"
}})


overlay.addEventListener('click',()=>{
    overlay.style.display="none"
    box.style.display="none"
})
cross.addEventListener('click',()=>{
    overlay.style.display="none"
    box.style.display="none"
})
Sign.addEventListener('click',()=>{
    box.style.display="none"
    box2.style.display="block"
    
})
Log.addEventListener('click',()=>{
    box2.style.display="none"
    box.style.display="block"
})
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
        overlay.style.display="none";
        box.style.display="none";
        // localStorage.setItem('flag',1);   
        flag1=1;
        rep(json.entry);  
    }
}
const rep=async(pass)=>{
    // let flag1=0;
    join1.addEventListener('click',async()=>{
       
        const ID= json.info[0].ID;
        const Name=pass.Name;
        const Phone=pass.Phone;
        let info=JSON.stringify({id:ID,name:Name,phone:Phone})
        const response=await fetch('http://localhost:8080/requestUser',{
            method:'POST',
            body: info,
            headers:{'Content-Type':'application/json'}
        })
        const ice=await response.json()
        if(ice.info){
            document.getElementById("mess1").innerHTML="request as been sent✅"
        }
        
    })
    join2.addEventListener('click',async()=>{
       
        const ID= json.info[1].ID;
        const Name=pass.Name;
        const Phone=pass.Phone;
        let info=JSON.stringify({id:ID,name:Name,phone:Phone})
        const response=await fetch('http://localhost:8080/requestUser',{
            method:'POST',
            body: info,
            headers:{'Content-Type':'application/json'}
        })
        const ice=await response.json()
        if(ice.info){
            document.getElementById("mess2").innerHTML="request as been sent✅"
        }
        
    })
    join3.addEventListener('click',async()=>{
       
        const ID= json.info[2].ID;
        const Name=pass.Name;
        const Phone=pass.Phone;
        let info=JSON.stringify({id:ID,name:Name,phone:Phone})
        const response=await fetch('http://localhost:8080/requestUser',{
            method:'POST',
            body: info,
            headers:{'Content-Type':'application/json'}
        })
        const ice=await response.json()
        if(ice.info){
            document.getElementById("mess3").innerHTML="request as been sent✅"
        }
        
    })
}
