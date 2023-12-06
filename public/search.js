
const search=document.getElementById("search");
search.addEventListener("click", async(e)=>{
    e.preventDefault();
    const search=document.getElementById("searchbox").value
    const find=search.toUpperCase();
    console.log(find)
    let info=JSON.stringify({PROP:find});
    const response= await fetch('http://localhost:8080/search',{
        method:'POST',
        body: info,
        headers:{'Content-Type':'application/json'}  
    })
    const json=await response.json();
    console.log(json.info)
    if(json.info==false){
        // localStorage.setItem('search',find)
        window.location.replace("http://localhost:8080/searchnull")
        localStorage.clear();
    }
    else{
        // fetch(`http://localhost:8080/search/current?id=${find}`,{
        //     method:"GET"
        // })
        localStorage.setItem('search',find)
        window.location.replace('http://localhost:8080/search')
        // console.log(58)
        // // document.getElementById('udate').innerHTML="78"
        
    }
})