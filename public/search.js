const search=document.getElementById("search");
search.addEventListener("click", async(e)=>{
    e.preventDefault();
    const search=document.getElementById("searchbox").value
    const find=search.toLowerCase();
    let info=JSON.stringify({PROP:find});
    const response= await fetch('http://localhost:8080/search',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}  
    })
    const json=await response.json();
    if(json.info==false){
        window.location.replace("http://localhost:8080/searchnull")
    }
    else{
        window.location.replace(`http://localhost:8080/search?id=${find}`)
        // console.log(58)
        // // document.getElementById('udate').innerHTML="78"
        
    }
})