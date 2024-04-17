import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Chats from './components/Chats.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import StartMeet from './components/StartMeet.jsx'
import HelpApp from './components/HelpApp.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element  : <App/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "chats",
        element : <Chats/>
      },
      {
        path : "login",
        element : <Login/>
      },
      {
        path : "sign-up",
        element : <Signup/>
      },
      {
        path : "meet",
        element : <StartMeet/>
      },
      {
        path : "help",
        element : <HelpApp/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
