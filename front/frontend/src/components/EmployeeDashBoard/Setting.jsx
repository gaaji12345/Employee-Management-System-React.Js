
import React, {  useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'
import {useNavigate} from "react-router-dom"

const Setting = () => {

    

  const [email, setEmail] = useState('')
 
  const [error,setError]=useState(null)

  const {user}=useAuth()
  const navigate = useNavigate()
   const [setting, setSetting] = useState({
    userId : user._id,
    oldPassword:"",
    newPassword:"",
    confirmPassword:""
   })


  const handleChange = (e) => {
    const { name, value } = e.target;

    setSetting({...setting,[name]:value});
  };



  const handleSubmit = async (e) => {

    e.preventDefault()

    if(setting.newPassword !== setting.confirmPassword){
        setError("password not match")
    }else{

    try {
      const response = await axios.put(
        "http://localhost:6007/api/setting/change-password",
        setting,
        {
           headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
      );

     if(response.data.success){
        navigate("/admin-dashboard/employees")
        setError("")
      
     }

    } catch (error) {
      if(error.response && !error.response.data.success){
        setError(error.response.data.error)

      }else{
        setError("Server Error")
      }
    }
}

  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>
      <p className='text-red-500'>{error}</p>

      
    
        <form onSubmit={handleSubmit}>

          <div >
            <label  className="text-sm font-medium text-gray-700">
             Old  Password
            </label>

            <input
              type="password"
              name="oldPassword"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="*****"
              onChange={handleChange}
            />
          </div>

            <div >
            <label  className="text-sm font-medium text-gray-700">
             New  Password
            </label>

            <input
              type="password"
              name="newPassword"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="*****"
              onChange={handleChange}
            />
          </div>

            <div >
            <label  className="text-sm font-medium text-gray-700">
             Confirm   Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              placeholder="*****"
              onChange={handleChange}
            />
          </div>





  
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-b-md"
            >
              Change Password
            </button>
  

        </form>
     
    </div>
  )
}

export default  Setting

//47