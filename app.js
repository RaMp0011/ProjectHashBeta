const express=require('express')
const {Login,getNotes,createNote,create,getGinfo,search}=require('./database')
const app=express()
const path=require("path");
const bcrypt=require('bcrypt');
const { LOADIPHLPAPI } = require('dns');
app.use(express.json())
const PORT=process.env.PORT||8080;

app.use(express.static(path.join(__dirname,'/public')))

app.get('^/$|/searchnull(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','searchFail.html'));
});

app.get('^/$|/index(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/instant(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','instantStart.html'));
});
app.get('/login(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','Login.html'));
});
app.post("/search",async(req,res)=>{
  const {PROP}=req.body
  const pass=await search(PROP)
  if(pass==false){
    return res.json({info:false})
  }
  else{
    return res.json({info:pass})
  }
})
app.get('/profile/:dynamic',(req,res)=>{
  const id=req.query.id
  id=bcrypt.getRounds
  console.log(dynamic)
  res.sendFile(path.join(__dirname,'views','hyper.html'));
});

//get route
app.get("/notes",async(req,res)=>{
    const notes=await getNotes()
    res.send(notes)
})

app.post("/login1",async(req,res)=>{
  const {phone,Password}=req.body
  const pass=await Login(phone)
  if(pass==false){
    return res.json({info:false})
  }
  else{
    const test=bcrypt.compareSync(Password,pass.Password)
    if(!test){
    return res.json({entry:false})
    }
    else{
      return res.json({entry:pass})
    }
  }
})

app.post("/create",async(req,res)=>{
  const{ID,Games,PlayerCount,Location,HeldOn,Allow}=req.body
  const pass=await create(ID,Games,PlayerCount,Location,HeldOn,Allow)
  if(pass==true){
    return res.json({creation:true})
  }
  else if (pass==false){
    return res.json({creation:false})
  }
  else{
    return res.json({creation:"updated"})
  }
})

app.post("/dashboard",async(req,res)=>{
  const{ID}=req.body
  const pass=await getGinfo(ID);
  if(pass==false){
    return res.json({back:false})
  }
  else{
    return res.json({back:pass})
  }
})

app.post("/submission",async(req,res)=>{
  const {name,phone,Email,Password}=req.body
  const passH=bcrypt.hashSync(Password,12);
  const note=await createNote(name,phone,Email,passH)
  if(note=='exist'){
    return res.json({info:false})
  }
  else{
    return res.json({info:true})
  }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!🙇')
  });

  app.all('*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
});

app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));