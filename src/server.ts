import dotenv from "dotenv"
dotenv.config(); //MUST BE FIRST

import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoute";

const app =express()
app.use(cors())
app.use(express.json());



app.get('/ping' , (req,res)=>{
   res.send('hello all is okay ')
})

// routes 
app.use("/api/auth", authRoutes);


const port =process.env.PORT || 3000; 
app.listen(port , ()=>{
    console.log(`server running on port ${port}`)
})