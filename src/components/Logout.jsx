import React, { useState } from 'react'
import Button from './Reusable/Button'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice';
import {useNavigate} from "react-router-dom"

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
function loggedOut(){
  authService.logout().then(() => {
    dispatch(logout());
    navigate("/login");
  }).catch((error) => {
    console.log("loggedOut : Some Error Occured " , error.message);
    alert("Some error occured while logging out , Please try after some time")
  })
}
  return (
    <React.Fragment>
        <Button text={"Logout"} onClick={() => loggedOut()} className='text-white'/>
    </React.Fragment>
  )
}

export default Logout
