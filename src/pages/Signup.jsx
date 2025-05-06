import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { contextStore } from '../App'
import useMovies from '../hooks/useMovies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const { allmovies } = useMovies()
  const { user, setUser, moviedata } = useContext(contextStore)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    const dupuser = JSON.parse(localStorage.getItem(data.name))
    if (dupuser) {
      return toast.error("User already found")
    }
    else{
    const info = {
      data,
      allmovies
    }
    localStorage.setItem(data.name, JSON.stringify(info))
    setUser(info)
    toast.success("User Registered Succesfully")
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign Up</h2>

        <div>
          <input
            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Enter the Username"
            {...register('name', { required: "Username is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="password"
            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Enter the Password"
            {...register('password', { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-600">
          Already a user? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
        <ToastContainer />
    </div>
  )
}

export default Signup
