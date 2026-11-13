import express from "express"
import authMiddleware from '../middleware/authMiddleware.js'
import { addleave,getLeaves ,getLeave,getLeaveDetail,updateLeave} from "../controller/leaveController.js"

const router =express.Router()


router.post('/add',authMiddleware,addleave)
router.get('/detail/:id',authMiddleware,getLeaveDetail)
router.get('/:id/:role',authMiddleware,getLeaves)

router.get('/',authMiddleware,getLeave)
router.put('/:id',authMiddleware,updateLeave)








export default router