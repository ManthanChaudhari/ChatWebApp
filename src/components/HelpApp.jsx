import React from 'react'
import video from "../video/MELA WebApp.mp4"
function HelpApp() {
  return (
      <div className="flex flex-col h-screen items-center justify-center w-full bg-blue-500 text-white">
      <video className=' w-72 h-52 lg:w-1/2 md:w-1/2  lg:h-1/2 py-2 px-2 rounded-lg shadow-lg ' controls>
        <source src = {video} type='video/mp4'/>
      </video>
      <h1 className='text-lg'>Follow this steps to use this app!</h1>
    </div>
  )
}

export default HelpApp
