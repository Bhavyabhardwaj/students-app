const express= require('express')
const serverConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')
const userRouter = require('./routes/userRoute')
const authRouter=require('./routes/authRoute')
const cookieParser = require('cookie-parser')
const goalRouter = require('./routes/goalRoute')
const openaiRouter=require('./routes/openaiRoute')
const contentRouter=require('./routes/contentSuggestionRouter')
const app = express()

const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL 
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));



app.use(cookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.use('/auth', authRouter);
app.use('/goal', goalRouter);
app.use('/roadmap', openaiRouter);
app.use('/content', contentRouter);

app.get('/hi',(req,res)=>{
    return res.json({message:'hello'})
})
console.log(serverConfig.PORT)

app.listen(5500, async()=>{
    await connectDB();

    console.log(`server started at port ${serverConfig.PORT} ...`)
})