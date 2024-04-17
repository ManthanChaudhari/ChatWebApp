import React,{useState} from 'react'
import conf from '../conf/conf';
import authService from '../appwrite/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { useSelector } from 'react-redux';


function Header() {
  const navigate = useNavigate();
  const authorized = useSelector(state => state.authorized);
  const routerItems = [
    {
      name : "Home",
      slug : "/",
      active : true,
    },
    {
      name : "Login",
      slug : "/login",
      active : !authorized,
    },
    {
      name : "Chats",
      slug : "/chats",
      active : authorized,
    },
  ]
  return (
    <nav className='bg-white shadow-lg px-2 py-2 flex justify-between items-center fixed top-0 left-0 w-full '>
    <h1 className='text-xl'>MELA</h1>
    <div className='flex gap-3 items-center'>
      <ul>
       {routerItems.map(item => item.active && <li className='inline-block mx-3 cursor-pointer' key={item.name}><NavLink to={item.slug} className={({isActive}) => `${isActive ? "text-[#3d76b8]" : "text-black"}`}>{item.name}</NavLink></li>)}
      </ul>
       {authorized && <Logout/>}
      </div>
    </nav>
  )
}

export default Header
