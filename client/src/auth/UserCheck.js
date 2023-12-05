import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import LoadingToRedirect from './LoadingToRedirect'

const UserCheck = () => {
    const {user} = useSelector((state) => ({...state}))
  return user && user.token ? (
    <Outlet/>
  ):(<LoadingToRedirect/>)
}

export default UserCheck