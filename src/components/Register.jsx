import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/User';

function Register() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(setUser({id: user.id, email: user.email}));
      // console.log(user);
    } catch (err) {
      setError(err.code); 
      // console.log(err);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[300px] rounded-2xl overflow-hidden bg-[#111827] p-8 text-white md:w-[380px] relative">
        <p className="text-center text-lg font-bold md:text-2xl">Register</p>
         <div className=" absolute top-14 left-16 md:top-16 md:left-28">
          <p className="text-red-500 text-lg text-center">{error}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-1 text-sm">
            <label htmlFor="email" className="block text-[#9CA3AF] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              required
              className="w-full rounded-md border border-solid border-[#374151] bg-[#111827] py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none"
              placeholder="tom@xyz.com"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mt-1 text-sm">
            <label htmlFor="password" className="block text-[#9CA3AF] mb-1">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              id="password"
              className="w-full rounded-md border border-solid border-[#374151] bg-[#111827] py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none relative"
              placeholder="****"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <span className='absolute top-[47%] right-12 cursor-pointer' onClick={()=>setShowPassword(!showPassword)}> 
              {showPassword ? <FiEye size={15}/> : <FiEyeOff size={15}/>}
            </span>
          </div>
          <button className="block w-full bg-[#A020F0] p-3 text-center text-white border-none rounded-md font-semibold mt-4 hover:bg-[#A78BFA]">
            Register
          </button>
        </form>
        <div className="flex items-center pt-4">
          <div className="h-[1px] flex flex-1 bg-[#9CA3AF]"></div>
          <p className="pl-3 pr-3 text-sm text-[#9CA3AF]">Sign in with google</p>
          <div className="h-[1px] flex flex-1 bg-[#9CA3AF]"></div>
        </div>
        <div className="flex justify-center">
          <div className="p-3 cursor-pointer">
            <FaGoogle size={20} />
          </div>
        </div>
        <p className="text-center text-xs text-[#9CA3AF]">
          Already have an account!
          <Link
            to="/login"
            className="text-[#9CA3AF] decoration-0 text-base ml-1 hover:text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;