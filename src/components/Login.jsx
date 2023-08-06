import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import{FiEye,FiEyeOff} from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/User';

function Login() {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
        <p className="text-center text-lg font-bold md:text-2xl">Login</p>
        <div className=" absolute top-14 left-16 md:top-16 md:left-28">
          <p className="text-red-500 text-lg text-center">{error}</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mt-1 text-sm">
            <label htmlFor="password" className="block text-[#9CA3AF] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              required
              className='w-full rounded-md border border-solid border-[#374151] bg-transparent py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none'
              placeholder="tom@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-1 text-sm">
            <label htmlFor="password" className="block text-[#9CA3AF] mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              required
              className='w-full rounded-md border border-solid border-[#374151] bg-transparent py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none relative'
              placeholder="****"
              onChange={(e) => {
                setError('');
                setPassword(e.target.value);
              }}
            />
          <span className="absolute top-[54%] right-12 cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
          {showPassword ? <FiEye size={15}/> : <FiEyeOff size={15}/>}
          </span>
          </div>
          <button className="block w-full bg-[#A020F0] p-3 text-center text-white border-none rounded-md font-semibold mt-2 hover:bg-[#A78BFA]">
            Sign in
          </button>
        </form>
        <p className="text-center pt-8 text-xs text-[#9CA3AF]">
          Don't have an account?
          <Link
            to="/register"
            className="text-[#9CA3AF] decoration-0 text-base ml-1 hover:text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
