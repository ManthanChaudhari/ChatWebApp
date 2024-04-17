import React, { useState } from 'react'
import Input from './Reusable/Input';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Reusable/Button';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Signup() {
  const [name,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password , setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function createUserAccount(){
    try {
      if(name && email && password){
        const userData =await  authService.createAccount({email,password,name})
        if(userData){
          const userData  = await  authService.getCurrentUser();
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("createUserAccount : Error Occured " , error.message);
      alert("Type valid details..");
    }
  }
  return (
    <div className='flex justify-center items-center h-[90vh] w-full'>
      <div className=' w-80 h-80 bg-white flex justify-around flex-col gap-y-2  lg:shadow-lg'>
      <div className='flex items-center flex-col gap-y-3 mt-5'>
      <Input placeholder = "Enter your name" type="text" value={name} changeInput={(e) => setUserName(e.target.value)}/>
       <Input placeholder = "example@gmail.com" type="email" value={email} changeInput={(e) => setEmail(e.target.value)}/>
       <Input placeholder = "Password" type="password" value={password} changeInput={(e) => setPass(e.target.value)}/>
      </div>
      <div className='flex items-center flex-col gap-y-3'>
      <Link to="/login"><p className='text-[#3d76b8]'>Already Registerd ? Login Now!</p></Link>
      <Button text={"Signup"} onClick={() => createUserAccount()} className='text-white'/>
      </div>
      </div>
    </div>
  )
}

export default Signup
