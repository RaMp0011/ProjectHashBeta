const express=require('express')
const {Login,getNotes,createNote,create,getGinfo,search,userReq,playerReq,playerAA,gameFind}=require('./database')
const app=express()
const path=require("path");
const bcrypt=require('bcrypt');
const { LOADIPHLPAPI } = require('dns');
const url=require('url')
app.use(express.json())
const PORT=process.env.PORT||8080;

app.use(express.static(path.join(__dirname,'/public')))

app.get('/searchnull(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','searchFail.html'));
});

app.get('/search',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','search.html'));
});
app.get('/gallery-single',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','gallery-single.html'));
});
app.get('/about',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','about.html'));
});
app.get('/gallery',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','gallery.html'));
});
app.get('/contact',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','contact.html'));
});
app.get('/dash',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','turfd.html'));
});
app.get('/list',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','list.html'));
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
  console.log(pass)
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
    console.log(pass)
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
app.post("/requestUser",async(req,res)=>{
  const {id,name,phone}=req.body;
  const pass=await userReq(id,name,phone);
  if(pass){
    return res.json({info:true})
  }
})
app.post("/requestP",async(req,res)=>{
  const {ID}=req.body;
  const pass=await playerReq(ID);
  if(pass==false){
    return res.json({info:false})
  }
  else{
    return res.json({info:pass})
  }
})
app.post("/requestA",async(req,res)=>{
  const {ID,Name,Phone,Pas}=req.body;
  const pass=await playerAA(ID,Name,Phone,Pas);
  if(pass){
    return res.json({info:true})
  }
  else{
    return res.json({info:false})
  }
})
app.post("/gamecheck",async(req,res)=>{
  const {Phone}=req.body;
  const pass=await gameFind(Phone);
  if(pass){
    return res.json({info:pass})
  }
  else{
    return res.json({info:false})
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