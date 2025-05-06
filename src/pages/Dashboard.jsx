import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { contextStore } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovieList() {
 
  const [movies, setMovies] = useState([]);
  const [status,setStatus] = useState("idle")
  const navigate = useNavigate();

  const {user,setUser} = useContext(contextStore)

  useEffect(()=>{
    toast.success(`Welcome ${JSON.parse(localStorage.getItem('LoggedinUser'))}`)
  },[])

  const filtered = useMemo(()=>{
    if(status=="idle")
   return user.allmovies?.filter((i)=>{
      return i.idle==true
    })
    if(status=="liked")
      return user.allmovies?.filter((i)=>{
         return i.like==true
       })
       if(status=="unliked")
        return user.allmovies?.filter((i)=>{
           return i.dislike==true
         })
  },[status,user])


  const changelike = (id) => {
    const updatedMovies = user.allmovies.map(movie => {
      if (movie.Year === id && !movie.like && !movie.dislike) {
        return { ...movie, like: true };
      }
      return movie;
    });
  
    const updatedUser = { ...user, allmovies: updatedMovies };
    localStorage.setItem(user.data.name, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };
  
  const changedislike = (id) => {
    const updatedMovies = user.allmovies.map(movie => {
      if (movie.Year === id && !movie.like && !movie.dislike) {
        return { ...movie, dislike: true };
      }
      return movie;
    });
  
    const updatedUser = { ...user, allmovies: updatedMovies };
    localStorage.setItem(user.data.name, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout =()=>{
    localStorage.setItem('LoggedinUser',JSON.stringify(null))
    navigate('/login')
  }
  

  return (
    <div>    <div className="flex justify-center gap-4 p-4 bg-gray-100 shadow-md">
    <button onClick={()=>setStatus("idle")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
      Home
    </button>
    <button onClick={()=>setStatus("liked")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
      Liked Movies
    </button>
    <button onClick={()=>setStatus("unliked")} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
      Disliked Movies
    </button>
    <button onClick={logout} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200">
      Log out
    </button>
  </div>
    <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100 min-h-screen">

      {filtered?.map(({ Title, Year, Runtime, Poster, like, dislike, idle }) => (
  <div
    key={Year}
    className="bg-white shadow-lg rounded-xl overflow-hidden w-64 hover:scale-105 transition-transform duration-300"
  >
    <img src={Poster} alt={Title} className="w-full h-80 object-cover" />
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">{Title}</h2>
      <p className="text-sm text-gray-600">Year: {Year}</p>
      <p className="text-sm text-gray-600 mb-3">Runtime: {Runtime}</p>

      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={() => changelike(Year)}
          className={`px-4 py-1 rounded-full text-sm transition-all duration-200
            ${like ? 'bg-green-700 text-white' : 'bg-gray-200 text-black hover:bg-green-500 hover:text-white'}`}
        >
          👍 Like
        </button>

        <button
          onClick={() => changedislike(Year)}
          className={`px-4 py-1 rounded-full text-sm transition-all duration-200
            ${dislike ? 'bg-red-700 text-white' : 'bg-gray-200 text-black hover:bg-red-500 hover:text-white'}`}
        >
          👎 Dislike
        </button>
      </div>
    </div>
  </div>
))}

    </div>
    <ToastContainer/>
    </div>
  );
}

export default MovieList;
