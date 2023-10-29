const search=document.getElementById("search");
search.addEventListener("click", async(e)=>{
    e.preventDefault();
     var search=document.getElementById("searchbox").value
     const find=search.toLowerCase();
    const info=json.stringify({Find:find})
    const response= await fetch('http://localhost:8080/search',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}  
    })
    const json=await response.json();
    if(json.info==false){
        
    }
})