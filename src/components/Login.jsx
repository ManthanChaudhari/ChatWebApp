import React, { useState } from 'react'
import Input from './Reusable/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Reusable/Button'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'

function Login() {
  const [password , setPass] = useState("");
  const [email , setEmail] = useState("");
  const [error , setError] = useState("");
  const [pending , setPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function loggedIn(){
    if(password && email) {
      try{
        setPending(true);
        const userData = await authService.login({email,password});
        if(userData){
          const userData = await authService.getCurrentUser();
          dispatch(login(userData));
          setPending(false);
          navigate("/");
        }
      }catch(error){
        setPending(false);
        console.log("loggedIn : Error Occured " , error.message);
        setError(error.message);
      }
    }
    else{
      alert("Please type correct details!");
    }
  }
  return (
    <div className='flex justify-center items-center h-[90vh] w-full'>
      <div className=' w-80 h-80 bg-white flex justify-around flex-col gap-y-2  lg:shadow-lg'>
      {error && <p className='text-[#dd3636] text-sm text-center'>{error}</p>}
      <div className='flex items-center flex-col gap-y-3 mt-5'>
       <Input placeholder = "example@gmail.com" type="email" value={email} changeInput={(e) => setEmail(e.target.value)}/>
       <Input placeholder = "Password" type="password" value={password} changeInput={(e) => setPass(e.target.value)}/>
      </div>
      <div className='flex items-center flex-col gap-y-3'>
      <Link to="/sign-up"><p className='text-[#3d76b8]'>Haven't register yet ? SignUp Now!</p></Link>
      <Button text={"Login"} onClick={() => loggedIn()} className='text-white'/>
      </div>
      {pending ? <p className='text-sm text-[gray] text-center'>Logging into your account please wait...</p> : null}
      </div>
    </div>
  )
}

export default Login
