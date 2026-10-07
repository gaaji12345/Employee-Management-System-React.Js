import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { response } from 'express';

const  login=async (req,res)=>{
    try {
    const { email, password } = req.body;

    // Login logic here
    const user = await User.findOne({email})
    if (!user){
        res.status(404).json({success:false,error:"User not Found"})

    }
    const isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
     res.status(404).json({success:false,error:"Wrong Passowrd"})

    }
    const token =jwt.sign({_id:user._id,role:user.role},
        process.env.JWT_KEY,{expiresIn:"20d"}
    )

    res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role}})

    res.status(200).json({
      success: true,
      message: "Login successful",
    });

  } catch (error) {
    response.status(500).json({success:false,error:error.message})
  }

}

export {login}