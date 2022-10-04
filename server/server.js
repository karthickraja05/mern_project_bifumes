// module  Package
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

// App Package
import connect from './database/database.js';
import TransactionApi from './routes/TransactionApi.js';

dotenv.config();

const PORT = 4000;

const app = express();

await connect();

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send("<h1>Welcom to mern learn</h1>");
});

//Routes Merge to our app
app.use('/transaction',TransactionApi);




app.listen(PORT,()=>{
  console.log("Server Running at http://localhost:4000");
});