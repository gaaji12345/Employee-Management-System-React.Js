import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import Leave from "../models/Leave.js";
import { nextTick } from "process";


const departmentSchema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },);

  // departmentSchema.pre("deleteOne",{document:true,query:false},async function name(params) {
  //   try{
  //     const employees=await Employee.find({department:this._id})
  //     const empIds=employees.map(emp=>emp._id)

  //     await Employee.deleteMany({department:this._id})
  //     await Leave.deleteMany({employeeId: {$in:empIds}})
  //     await Salary.deleteMany({employeeId: {$in:empIds}})
  //     nextTick()
  //   }catch(error){
  //     next(error)
  //   }
  // })

 departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    try {
      const employees = await Employee.find({
        department: this._id
      });

      const empIds = employees.map(emp => emp._id);

      await Employee.deleteMany({
        department: this._id
      });

      await Leave.deleteMany({
        employeeId: { $in: empIds }
      });

      await Salary.deleteMany({
        employeeId: { $in: empIds }
      });

      console.log("Related records deleted successfully");

    } catch (error) {
      console.error("Department delete middleware error:", error);
      throw error;
    }
  }
);




const Department = mongoose.model("Department", departmentSchema);

export default Department;
