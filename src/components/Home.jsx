import React from "react";
import { useSelector } from "react-redux";
import Button from "./Reusable/Button";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import msgAnimation from "../assets/Animation - 1713295078563.json";

function Home() {
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
   function handleSubmit() {
    if(authorized){
    navigate("/chats");
    }else{
    navigate("/login");
    }
  }
  function useApp(){
    navigate("/help");
  }
  return (
    <div className="flex h-screen items-center justify-center w-full bg-blue-500 text-white">
      <div className="flex justify-center items-center flex-col gap-y-3">
        <Lottie animationData={msgAnimation} className=" w-80 lg:w-96" />
        <h1 className="text-xl">
          Welcome {userData ? userData.name : "User"} to our MELA!
        </h1>
        <Button
          text= {authorized ? "Get Started >" : "Go to Login"} 
          className="bg-white text-blue-500 text-lg w-52 active:bg-[#dddddd]"
          onClick={handleSubmit}
        />
      </div>
      <div>
        <button className="text-black bg-white shadow-lg rounded-md  fixed bottom-5 right-5  px-2 py-1" onClick={useApp}>
          How to use ?
        </button>
      </div>
    </div>
  );
}

export default Home;
