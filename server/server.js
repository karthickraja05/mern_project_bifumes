import express from 'express';
const app = express();
const PORT = 4000;

app.get('/',(req,res)=>{
  res.send("<h1>Welcom to mern learn");
});

app.listen(PORT,()=>{
  console.log("Server Running at http://localhost:4000");
});