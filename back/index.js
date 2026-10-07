import express from 'express'
import cors from 'cors'
import authRTouter from './rotes/auth.js'
import conectToDataBase from './db/db.js'


conectToDataBase()
const app =express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRTouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server is Running ${process.env.PORT}`)
});

