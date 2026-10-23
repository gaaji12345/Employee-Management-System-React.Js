import express from "express"
import authMiddleware from '../middleware/authMiddleware.js'
import { addsalary } from "../controller/salaryController.js"

const router =express.Router()


router.post('/add',authMiddleware,addsalary)




export default router