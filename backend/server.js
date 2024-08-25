import express from 'express';
const app =express();
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Routers/Routes.js';



//middlewares
app.use(express.json());
app.use(cors());
//Setting APIS

app.use('/api/',router);


//configure env
dotenv.config();

const PORT =9000;


app.listen(9000,()=>{
  console.log("Server is runnig sucessfully");
  console.log(PORT);
})
