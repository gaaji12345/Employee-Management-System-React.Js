import express from 'express'
import cors from 'cors'
import authRTouter from './rotes/auth.js'
import departmentRouter from './rotes/department.js'
import employeeRouter from './rotes/employee.js'
import salaryRouter from './rotes/salary.js'
import conectToDataBase from './db/db.js'


conectToDataBase()
const app =express()
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("public/uploads"));
app.use('/api/auth',authRTouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary,',salaryRouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server is Running ${process.env.PORT}`)
});

