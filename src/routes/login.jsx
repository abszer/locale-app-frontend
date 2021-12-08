import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import Header from "../components/Header";
import axios from 'axios';

const LoginForm = () => {
     const [body, setBody] = useState({username: '', password: ''})
     const [loginFailed, setLoginFailed] = useState(false)
     const [currentUser, setCurrentUser] = useState('')
     const [ submitStatus, setSubmitStatus ] = useState(false)

     const handleOnChange = (e) => {
          setBody({...body, [e.target.name]: e.target.value})
     }

     const onSubmit = (e) => {
          e.preventDefault()
          setSubmitStatus(!submitStatus)
          axios.post('https://localeapi.azurewebsites.net/api/userauth', body)
               .then((response) => {
                    if(typeof response.data == "string"){
                         setLoginFailed(true);
                         setSubmitStatus(false)
                    }else{
               
                         localStorage.setItem("currentUser", response.data[0].username)
                         localStorage.setItem("currentUserRep", response.data[0].rep)
                         setCurrentUser(localStorage.getItem("currentUser"))
                         setSubmitStatus(!submitStatus)
                    }
                    
               })
               .catch((err) => {
                    console.log(err)
                    alert("There was an unexpected error!")
               })

     }

     return (
          <>
          <Header />
          <div className="flex h-screen justify-center mt-10">
               <form onSubmit={onSubmit} autoComplete="off" className="flex flex-col items-center bg-blue-100 h-64 w-96 shadow-lg rounded-xl">
                    <h3 className="mt-5 text-2xl font-bold">Welcome Back!</h3>
                    {!loginFailed ? <h5 className="text-sm font-body">Go ahead and login here.</h5> : <h5 className="text-sm font-body text-red-600">Incorrect username or password</h5>}
                    <div className="mt-5 w-3/4">
                         <input type="text" name="username" placeholder="Username" onChange={handleOnChange} value={body.username} className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="mt-5 w-3/4">
                         <input type="password" name="password" placeholder="Password" onChange={handleOnChange} value={body.password} className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <input type="submit" value="Sign in" className={"mt-5 w-3/4 h-8 cursor-pointer rounded-md text-gray-100 font-semibold hover:bg-blue-500" + (submitStatus ? " bg-green-400" : " bg-blue-400")}/>
               </form>
          </div>
          {currentUser && <Navigate to={"/"}/>}
          </>
     )
}

export default LoginForm;