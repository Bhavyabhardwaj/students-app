const express= require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const userRouter = require('./routes/userRoute')
const app = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.get('/hi',(req,res)=>{
    return res.json({message:'hello'})
})
console.log(serverConfig.PORT)

app.listen(5500, async()=>{
    await connectDB();

    console.log(`server started at port ${serverConfig.PORT} ...`)
})