import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { contextStore } from "../App";
import { useContext } from "react";

const  useMovies = () => {
    const [movies, setMovies] = useState([]);
    const {moviedata,setmoviedata} =  useContext(contextStore);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const allmovies = movies.map((i)=>{
    return {
        ...i,
        like:false,
        dislike:false,
        idle:true
    }
  })




  return {
    allmovies
  }
}

export default useMovies