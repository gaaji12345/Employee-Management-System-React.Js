import React from 'react'
import { useAuth } from '../context/authContext'

const AdminDashBoard = () => {

  const {user} =useAuth()

  return (
    <div>AdminDashBoard{user.name}</div>
  )
}

export default AdminDashBoard