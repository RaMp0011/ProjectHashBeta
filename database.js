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
   let[rows]=await pool.query(`SELECT * FROM games WHERE Location=? OR Game=?`,[Find])
   if(rows.length==0){
      return false;
   }
   else{
      return rows;
   }
}
module.exports={createNote,Login,getNotes,create,getGinfo,search};




