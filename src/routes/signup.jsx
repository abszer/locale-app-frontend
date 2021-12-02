import React, { useState } from "react";
import Header from "../components/Header";
import { Navigate } from 'react-router-dom';
import useLocalStorage from "../useLocalStorage";
import axios from 'axios';

const SignUpForm = () => {
     
     const [body, setBody] = useState({username: "", password: "", rep: 0});
     const [currentUser, setCurrentUser] = useState("")

     const handleOnChange = (e) => {
          setBody({...body, [e.target.name]: e.target.value})
     }

     const handleOnSubmit = (e) => {
          e.preventDefault()
          axios.post('https://localeapi.azurewebsites.net/api/users', body)
               .then((response) => {
                    setCurrentUser(response.data.username)
                    localStorage.setItem("currentUser", currentUser)
                    localStorage.setItem("currentUserRep", response.data.rep)
               })
               .catch((err) => {
                    alert("There was an unexpected error!")
               })
     }
     
     return (
          <>
          <Header />
          <div className="flex h-screen justify-center mt-10">
               <form onSubmit={handleOnSubmit} autoComplete="off" className="flex flex-col items-center bg-blue-100 h-64 w-96 shadow-lg rounded-xl">
                    <h3 className="mt-5 text-2xl font-bold">Hey There!</h3>
                    <h5 className="text-sm font-body">Go ahead and sign up here.</h5>
                    <div className="mt-5 w-3/4">
                         <input type="text" name="username" onChange={handleOnChange} placeholder="Email / Username" className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="mt-5 w-3/4">
                         <input type="password" name="password" onChange={handleOnChange} placeholder="Password" className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <input type="submit" value="Sign up" className="mt-5 w-3/4 h-8 cursor-pointer rounded-md text-gray-100 font-semibold bg-blue-400 hover:bg-blue-500"/>
               </form>
               { currentUser && < Navigate to={"/"} />}
          </div>
          </>
     )
}

export default SignUpForm;