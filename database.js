const mysql=require('mysql2')
const dotenv=require('dotenv')
const { query } = require('express')
dotenv.config()

const pool=mysql.createPool({   //(collection of connection to database)Pool of communication
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

const create=async (ID,Games,PlayerCount,Location,Date,Allow)=>{
   if(Allow==0){
   let[data]=await pool.query('SELECT * FROM games WHERE ID= ?',[ID]);
   if(data.length==0){
      await pool.query('INSERT INTO games(ID,Game,PlayerCount,Location,HeldOn) VALUES(?,?,?,?,?)',[ID,Games,PlayerCount,Location,Date])
      return true;
   }
   else{
      return false;
   }
}
else{
   await pool.query('UPDATE games set Game=?, PlayerCount=?, Location=? , HeldOn=? Where ID=? ',[Games,PlayerCount,Location,Date,ID])
   return "updated";
}
}

const Login=async (Phone)=>{
let [rows]=await pool.query(`SELECT * FROM user WHERE Phone= ?`,[Phone]);
if (rows.length==0){
   return false;
}
else{
return rows[0];
}
}

const createNote=async(Name,Phone,Email,Password)=>{
   let [data1]=await pool.query(`SELECT * FROM user WHERE Phone=?`,[Phone]);
   if(data1.length>0)
      return "exist";
   else{
   const [result]= await pool.query(`INSERT INTO user(Name,Phone,Email,Password,Date) VALUES(?,?,?,?,CURRENT_TIMESTAMP())`,[Name,Phone,Email,Password])
   const id=result.insertId
   return true;
   }
}

const getNotes=async ()=>{
   let [rows]=await pool.query("SELECT * FROM user");
   return rows;
   }
const getGinfo=async (id)=>{
   let [data]=await pool.query(`SELECT *  FROM games WHERE ID= ?`,[id])
   if(data.length==0){
      return false;
   }
   else{
      return data[0];
   }
}
const search=async(Find)=>{
   let[PART]=await pool.query(`SELECT * FROM games WHERE Location=? OR Game=?`,[Find,Find])
   if(PART.length==0){
      return false;
   }
   else{
      console.log(Find)
      let[rows2]=await pool.query(`SELECT Name,Phone,Game,Location,PlayerCount,HeldON,games.ID FROM games,user WHERE user.ID=games.ID &&(Location=? OR Game=?)`,[Find,Find])
      // console.log(rows2)
      return rows2;
   }
}
const userReq=async(id,name,phone)=>{
   let[data]=await pool.query(`SELECT *  FROM playerreq WHERE Phone= ? AND ID=?`,[phone,id])
   if(data.length==0){
   await pool.query('INSERT INTO playerreq(ID,Name,Phone) VALUES(?,?,?)',[id,name,phone]);
   return true;
   }
   else{return true};
}
const playerReq=async(id)=>{
   console.log(id);
   let[data]=await pool.query(`SELECT *  FROM playerreq WHERE ID=?`,[id])
   if(data.length==0){
      console.log("opps")
   return false;
  
   }
   else{
      return data;
   };
}
const playerAA=async(id,name,phone,pas)=>{
   if(pas==1){
   let[data]=await pool.query(`SELECT *  FROM players WHERE Phone=? AND ID=?`,[phone,id])
   if(data.length==0){
      let [data]=await pool.query('UPDATE games SET PlayerCount=PlayerCount-1 where ID=? AND PlayerCount>?',[id,0]); 
      console.log(1);
      if(data.length!=0){
      pool.query('INSERT INTO players(ID,Name,Phone) VALUES(?,?,?)',[id,name,phone]); 
      pool.query('DELETE from playerreq where ID=? AND Phone=?',[id,phone]); 
      console.log(0);
      }
   else{ return false}}
   else{console.log(1000);
      pool.query('DELETE from playerreq where ID=? AND Phone=?',[id,phone]); 
   }
   }
   return true;
}
const gameFind=async(phone)=>{
   console.log(phone);
   let[data]=await pool.query(`SELECT ID from players WHERE Phone=?`,[phone])
   console.log(data)
   if(data.length==0){
      console.log("idkd")
   return false;
  
   }
   else{
      let count=data.length;
      let data1
      while(count){
         let content=data[count-1];
         [data1]=await pool.query(`SELECT Game,Location,HeldOn from games WHERE ID=?`,[content.ID])
      }
      console.log(data1)
      return data1;
   };
}

module.exports={createNote,Login,getNotes,create,getGinfo,search,userReq,playerReq,playerAA,gameFind};




