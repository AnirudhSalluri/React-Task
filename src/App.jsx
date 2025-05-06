import React, { useEffect, useState } from 'react'
import {  Routes , Route, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import Signup from './pages/Signup'
import { createContext } from 'react'
import Dashboard from './pages/Dashboard'
import Protectedroute from './components/Protectedroute'

export const  contextStore = createContext();

const App = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('LoggedinUser'))
  const [user,setUser] = useState("");
  const [moviedata,setmoviedata] = useState([]);
  
  useEffect(()=>{
    if(currentUser){
      setUser(JSON.parse(localStorage.getItem(currentUser)))
      navigate('/dashboard')
    }
    else{
    navigate('/login')
    }
  },[])
 
  return (
    <div>
      <contextStore.Provider value={{user,setUser,moviedata,setmoviedata}}>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    </contextStore.Provider>
     </div>
  )
}

export default App