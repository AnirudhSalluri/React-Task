import React from 'react'
import { useContext } from 'react'
import { contextStore } from '../App'

const Protectedroute = ({children}) => {
    const {user} = useContext(contextStore)
    if(!user){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded shadow-md text-center">
    <h2 className="text-xl font-semibold text-red-600">You are not Authorized</h2>
  </div>
</div>
        )
    }

    
}

export default Protectedroute