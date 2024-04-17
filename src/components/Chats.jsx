import React,{useState} from 'react'
import Button from "./Reusable/Button"
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Input from "./Reusable/Input"
import { sendCode } from '../store/authSlice';

function Chats() {
  const [code , setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleStartMeeting(){
    navigate('/meet');
  }
  function joinMeet(){
    if(code){
    navigate('/meet');
    dispatch(sendCode(code))
    }
    else{
      alert("Please type valid code in the input...")
    }
  }
  return (
    <div className='h-screen flex justify-center items-center bg-blue-500 lg:bg-transparent overflow-hidden'>
      <div className='flex flex-col gap-y-4 py-20 px-16 lg:border-2 rounded-md bg-blue-500'>

        <Button text="Start Meeting" className='py-2  text-lg bg-transparent border-white border-2 text-white rounded-md w-56' onClick={handleStartMeeting}/>

        <h1 className='text-center font-light text-white'>OR</h1>
        
        <Input value={code} changeInput={(e) => setCode(e.target.value)} className='w-full border-white outline-none py-2 rounded-md' placeholder="Type meeting code"/>

        <Button text="Join Meeting" className='py-2 text-lg bg-transparent border-white border-2 text-white rounded-md w-56' onClick={joinMeet} />
      </div>
    </div>
  )
}

export default Chats
