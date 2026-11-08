
import multer from "multer";
import path from "path";
import fs from "fs";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import bcrypt from "bcrypt";
import Salary from "../models/Salary.js";


const addsalary =async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowances,
      deductions,
      payDate,
    } = req.body;


   const totalSalary=parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions)

    const newSalary = new Salary({
      employeeId,
      basicSalary ,
      allowances,
      deductions,
       netSalary:totalSalary,
      payDate,
     
    });

    await newSalary.save();

    return res.status(200).json({
      success: true,});
  } catch (error) {
    console.error("Add salary error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to add salary",
    });
}
}

// const getSalary = async (req,res)=>{

//   try{
//     const {id}=req.params;
//     let salary;
//    salary = await Salary.find({employeeId: id}).populate('employeeId','employeeId')
//     if(!salary  ){
//       const employee = await Employee.findOne({userId:id})
//       salary= await Salary.find({employeeId:employee._id}).populate('employeeId','employeeId')
//     }
//     return res.status(200).json({success:true,salary})

//   }catch (error) {
//     console.error("Add salary error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to get salary",
//     });
// }
// }


const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    // First, treat id as the Employee document ID
    let salary = await Salary.find({
      employeeId: id,
    }).populate("employeeId", "employeeId");

    // If no salary records, treat id as the User document ID
    if (salary.length === 0) {
      const employee = await Employee.findOne({
        userId: id,
      });

      if (employee) {
        salary = await Salary.find({
          employeeId: employee._id,
        }).populate("employeeId", "employeeId");
      }
    }

    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (error) {
    console.error("Get salary error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to get salary",
    });
  }
};






export { addsalary,getSalary };





