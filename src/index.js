const express= require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const app = express()

app.use(express.json())
app.get('/hi',(req,res)=>{
    return res.json({message:'hello'})
})
console.log(serverConfig.PORT)

app.listen(5500, async()=>{
    await connectDB();

    console.log(`server started at port ${serverConfig.PORT} ...`)
})