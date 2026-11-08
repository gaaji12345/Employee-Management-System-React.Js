import express from "express"
import authMiddleware from '../middleware/authMiddleware.js'
import { addleave,getLeaves ,getLeave,getLeaveDetail,updateLeave} from "../controller/leaveController.js"

const router =express.Router()


router.post('/add',authMiddleware,addleave)
router.get('/:id',authMiddleware,getLeaves)
router.get('/detail/:id',authMiddleware,getLeaveDetail)
router.get('/',authMiddleware,getLeave)
router.get(':id',authMiddleware,updateLeave)








export default router