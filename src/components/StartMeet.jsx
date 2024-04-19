import React, { useEffect, useState, useMemo, useRef } from "react";
import io from "socket.io-client";
import Input from "./Reusable/Input";
import Button from "./Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendCode } from "../store/authSlice";

function StartMeet() {
  const [user, setUser] = useState("");
  const [copy, setCopy] = useState("Copy");
  const [messages, setMessages] = useState([]);
  const [alert, setAlert] = useState([]);
  const [singleMessage, setSingleMessage] = useState("");
  // const [connectedUsers , setConnectedUsers] = useState([]);
  const userData = useSelector((state) => state.userData);
  const roomCode = useSelector((state) => state.room);
  const socket = useMemo(() => io("http://localhost:3001"), []);
  const ref = useRef(null);
  const dispatch = useDispatch();

  function handleMessage() {
    if (singleMessage) {
      socket.emit("message", { userData, user, singleMessage });
      setSingleMessage("");
    }
  }
  function handleCopy() {
    ref.current.select();
    navigator.clipboard.writeText(user);
    setCopy("copied");
    setTimeout(() => {
      setCopy("Copy");
    }, 500);
  }
  useEffect(() => {
    socket.on("connect", () => {
      if (roomCode) {
        setUser(roomCode);
        socket.emit("join-user", { userData, roomCode });
        dispatch(sendCode(""));
      } else {
        // console.log(socket.id);
        setUser(socket.id);
      }
      socket.on("user-joined", (data) => {
        const joinedUserMsg = `${userData.name === data.name ? "You" : data.name} joined the room`;
        setAlert((prev) => [...prev, joinedUserMsg]);
        
      });
    });
    socket.on("receive-msg", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("connect");
      socket.off("receive-msg");
      socket.off("user-joined");
      socket.disconnect();
    }
  }, []);
  
  return (
    <div className="w-full h-full">
      <div className="  mt-12 grid grid-cols-2">
        <Input
          value={user ? `${user}` : "Loading..."}
          className="bg-[#e3e3e3] active:bg-[#c3c2c2] w-full"
          ref={ref}
          isDisable={true}
        />
        <Button text={copy} className="text-white" onClick={handleCopy} />
      </div>
      <div className="w-full h-[580px] overflow-y-auto p-4 scroll-smooth no-scrollbar">
        {alert && alert.length
          ? alert.map((alert, index) => (
              <p key={index} className="text-center bg-slate-400 py-2 my-2">
                {alert}
              </p>
            ))
          : null}
        {messages && messages.length
          ? messages.map((data, index) => (
              <div key={index} className={` w-full flex my-2 bg-white ${data.userData.name === userData.name ? " justify-end" : "justify-start"}`}>
                {data.userData.name === userData.name ? (
                  <p className="bg-[gray] w-fit p-2 text-white rounded-xl ">{`You : ${data.singleMessage}`}</p>
                ) : (
                  <p className="bg-[#3593c9] w-fit text-white p-2 rounded-xl">{`${data.userData.name} : ${data.singleMessage}`}</p>
                )}
              </div>
            ))
          : null}
      </div>
      <div className="absolute bottom-0 left-0 grid grid-cols-2 w-full" >
        <Input
          type="text"
          placeholder="type your message here..."
          value={singleMessage}
          changeInput={(e) => setSingleMessage(e.target.value)}
          className="w-full"
        />
        <Button
          text="Send Message"
          onClick={handleMessage}
          className="text-sm text-white"
        />
      </div>
    </div>
  );
}

export default StartMeet;
