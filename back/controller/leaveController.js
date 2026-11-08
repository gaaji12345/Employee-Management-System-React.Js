
import { error } from "node:console";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Salary from "../models/Leave.js";

// const addleave = async (req,res)=>{

//   try {
//     const {
//       userId,
//       leaveType,
//     startDate,
//       reason,
//     } = req.body;

//     const employee= await Employee.findOne({userId})



//     const newLeave = new Leave({
//      employeeId: employee._id,
//       leaveType,
//     startDate,
//       reason,
     
//     });

//     await newLeave.save();

//     return res.status(200).json({
//       success: true,});
//   } catch (error) {
//     console.error("Add salary error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to add salary",
//     });
// }
// }

const addleave = async (req, res) => {
  try {
    const {
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    // Validate required fields
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        error: "All leave fields are required",
      });
    }

    // Find employee using the logged-in user's MongoDB ID
    const employee = await Employee.findOne({ userId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found for this user",
      });
    }

    // Validate leave dates
    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        error: "End date cannot be before start date",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully",
      leave: newLeave,
    });
  } catch (error) {
    console.error("Add leave error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to add leave",
    });
  }
};





// const getLeaves = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Find employee using the user's MongoDB ID
//     const employee = await Employee.findOne({ userId:id });

//     const levaes= await Leave.find({employeeId:employee._id})

  
//       return res.status(200).json({
//         success: true,levaes
       
//       });
    

  

//   } catch (error) {
//     console.error("Get leaves error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to fetch leaves",
//     });
//   }
// };


const getLeaves = async (req, res) => {
  try {
    const { id } = req.params;

    // Find employee using the user's MongoDB ID
    const employee = await Employee.findOne({ userId: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Fetch leaves belonging to this employee
    const leaves = await Leave.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      leaves: leaves,
    });

  } catch (error) {
    console.error("Get leaves error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch leaves",
    });
  }
};


const getLeave = async (req,res)=>{
  try{
   
    const leaves = await Leave.find()
  .populate({
    path: "employeeId",
    populate: [
      {
        path: "department",
        select: "dep_name",
      },
      {
        path: "userId",
        select: "name",
      },
    ],
  })
  .sort({ createdAt: -1 });

    return res.status(200).json({success:true,leaves})
  }catch(error){
    console.log(error.message)
    return res.status(500).json({success:false,error:"levae add server error"})

  }
}

// const getLeaveDetail = async(req,res)=>{
//  try{
//   const {id}=req.params;

//     const leave= await Leave.find({_id:id}).populate({
//       path:"employeeId",
//       populate:[
//         {
//           path:'department',
//           select:'dep_name'
//         },
//         {
//           path:'userId',
//           select:'name,profileImage'
//         }
//       ]
//     })

//     return res.status(200).json({success:true,leave})
//   }catch(error){
//     console.log(error.message)
//     return res.status(500).json({success:false,error:"levae add server error"})

//   }
// }


const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name"
        },
        {
          path: "userId",
          select: "name profileImage"
        }
      ]
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: "Leave not found"
      });
    }

    return res.status(200).json({
      success: true,
      leave
    });

  } catch (error) {
    console.log("Get Leave Detail Error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch leave details"
    });
  }
};


const updateLeave=async(req,res)=>{
  try{
      const {id}=req.params;
      const leave = await Leave.findByIdAndUpdate({_id:id},{status:req.body.status})
      if(!leave){
        return res.status(404).json({success:false,error:"Levae Not Found"})
      }
      return res.status(200).json({success:true})




  }catch(error){
    console.log(error.message)
    return res.status(500).json({success:false,error:"levae updated server error"})

  }
}







//55.37






export { addleave ,getLeaves,getLeave,getLeaveDetail,updateLeave};


