import { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet , useNavigate} from 'react-router-dom'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from './store/authSlice'
import Lottie from 'lottie-react'
import loadAnimation from '../src/assets/Animation - 1713296637259.json'



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState("")
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
        navigate("/");
      }else{
        navigate("/login");
      }
      setLoading(false);
    }).catch((error) => {
      setError(error.message);
      setLoading(false);
      navigate("/login");
    })
  },[])
  return !loading ?  (
    <>
      <Header/>
      <Outlet/>
      {error && <div className='h-screen w-full flex justify-center items-center'>
        <h1 className='bg-blue-500'>{error}</h1>
      </div>}
      {/* <Login/> */}
    </>
  ) : <div className='h-screen w-full flex justify-center items-center flex-col gap-y-2'>
  <Lottie animationData={loadAnimation} className=' w-28'/>
  <h1>Loading...</h1>
  </div>
}

export default App
