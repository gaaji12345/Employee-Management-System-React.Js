import express from "express"
import authMiddleware from '../middleware/authMiddleware.js'
import { addsalary,getSalary } from "../controller/salaryController.js"

const router =express.Router()


router.post('/add',authMiddleware,addsalary)

router.get('/:id/:role',authMiddleware,getSalary)



export default router