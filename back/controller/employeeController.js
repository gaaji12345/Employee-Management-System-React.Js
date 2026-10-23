
import multer from "multer";
import path from "path";
import fs from "fs";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import bcrypt from "bcrypt";

const uploadDir = "public/uploads";

// Create upload directory if it doesn't exist
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !employeeId ||
      !designation ||
      !department ||
      salary === undefined ||
      salary === "" ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already exists",
      });
    }

    // Check existing employee ID
    const existingEmployee = await Employee.findOne({
      employeeId,
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        error: "Employee ID already exists",
      });
    }

    // Validate department
    const existingDepartment = await Department.findById(department);

    if (!existingDepartment) {
      return res.status(400).json({
        success: false,
        error: "Department not found",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    // Create employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary: Number(salary),
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Add employee error:", error);

    return res.status(500).json({
      success: false,
      error: "Server error while adding employee",
    });
  }
};

// const getEmployees =async (req,res)=>{

//     try{
//         const employess= await Employee.find().populate('userId',{password : 0}).populate("department")
//         return res.status(200).json({success:true,employess})

//     }catch(error){  

//    return res.status(500).json({success: false,error:"get employee server error"})


//     }


// }

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Get employees error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch employees",
    });
  }
};


const getEmployee = async (req, res) => {
  const {id }=req.params;
  try {
    const employee = await Employee.findById({_id: id})
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Get employees error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch employees",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
      
    } = req.body;

    // Find employee
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Update employee's name in User collection
    if (name !== undefined) {
      await User.findByIdAndUpdate(employee.userId, {
        name,
      });
    }

    // Update employee details
    if (maritalStatus !== undefined) {
      employee.maritalStatus = maritalStatus;
    }

    if (designation !== undefined) {
      employee.designation = designation;
    }

    if (salary !== undefined) {
      employee.salary = salary;
    }

    if (department !== undefined) {
      employee.department = department;
    }

    

    await employee.save();

    const updatedEmployee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Update employee error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to update employee",
    });
  }
};


// const fetchEmployeeByDepId= async(req,res) =>{
//  const {id }=req.params;
//   try {
//     const employee = await Employee.find({department: id})
      
//     return res.status(200).json({
//       success: true,
//       employee,
//     });
//   } catch (error) {
//     console.error("Get employees error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to fetch employees",
//     });
//   }
// }


// const fetchEmployeeByDepId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log("Selected Department ID:", id);

//     // Check all employees and their department values
//     const allEmployees = await Employee.find({})
//       .select("_id employeeId department userId");

//     console.log("All employees:", allEmployees);

//     // Fetch employees belonging to the selected department
//     const employee = await Employee.find({
//       department: id,
//     }).populate("userId", "name");

//     console.log("Filtered employees:", employee);

//     return res.status(200).json({
//       success: true,
//       employee,
//     });
//   } catch (error) {
//     console.error("Get employees error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to fetch employees",
//     });
//   }
// };

// const fetchEmployeeByDepId = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log("Selected Department ID:", id);

//     const employees = await Employee.find({
//       department: id,
//     }).populate("userId", "name");

//     console.log("Filtered employees:", JSON.stringify(employees, null, 2));

//     return res.status(200).json({
//       success: true,
//       employee: employees,
//     });
//   } catch (error) {
//     console.error("Get employees error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Failed to fetch employees",
//     });
//   }
// };



const fetchEmployeeByDepId = async (req, res) => {
  try {
    console.log("FETCH EMPLOYEES BY DEPARTMENT ROUTE HIT");
    const { id } = req.params;

    const employees = await Employee.find({
      department: id,
    }).select("_id employeeId department userId");

    console.log("Selected department:", id);
    console.log("Matching employees:", employees);

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export { addEmployee, upload ,getEmployees,getEmployee,updateEmployee,fetchEmployeeByDepId};
