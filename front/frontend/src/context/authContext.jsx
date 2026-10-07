
import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext()

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const verifyUser =async ()=>{
      try{

      }catch(error){
         if(error.response && !error.response.data.success){
        setError(error.response.data.error)
      }else{
        setError("Server Error")
      }
      }
    }

  },[])

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(userContext)
}

export default AuthContext

