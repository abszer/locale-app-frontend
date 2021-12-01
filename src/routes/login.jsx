import React from "react";
import Header from "../components/Header";
// import axios from 'axios';

const LoginForm = () => {
     return (
          
          <>
          <Header />
          <div className="flex h-screen justify-center mt-10">
               <form onSubmit={null} autoComplete="off" className="flex flex-col items-center bg-blue-100 h-64 w-96 shadow-lg rounded-xl">
                    <h3 className="mt-5 text-2xl font-bold">Welcome Back!</h3>
                    <h5 className="text-sm font-body">Go ahead and login here.</h5>
                    <div className="mt-5 w-3/4">
                         <input type="text" name="username" placeholder="Email / Username" className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="mt-5 w-3/4">
                         <input type="password" name="password" placeholder="Password" className="rounded-md h-8 w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <input type="submit" value="Sign in" className="mt-5 w-3/4 h-8 cursor-pointer rounded-md text-gray-100 font-semibold bg-blue-400 hover:bg-blue-500"/>
               </form>
          </div>
          </>
     )
}

export default LoginForm;