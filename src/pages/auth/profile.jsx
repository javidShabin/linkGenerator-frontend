import React, { useEffect } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  useEffect(()=>{
    const getUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/user-profile")
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  },[])
  return (
    <div>
      <Link to={"/"}><h1>Hello</h1></Link>
    </div>
  )
}

export default ProfilePage
