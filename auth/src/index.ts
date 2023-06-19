import express  from "express";
import morgan from "morgan"
const app = express();
const PORT = 3000
app.use(express.json())
app.use(morgan('dev'))
app.get("/api/users/cuser",(req,res)=>{
     res.send("jiii")
})
app.get("/test",(req,res)=>{
    res.send("auth servicee")
})
app.listen(PORT , ()=>{
    console.log(`auth service up and running on port ${PORT}`)
})