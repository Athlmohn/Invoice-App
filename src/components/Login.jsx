import React from 'react'
import {FaGoogle} from 'react-icons/fa'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className="w-[300px] rounded-2xl overflow-hidden bg-[#111827] p-8 text-white md:w-[380px]">
	<p className="text-center text-lg font-bold md:text-2xl">Login</p>
	<form className="mt-6">
		<div className="mt-1 text-sm">
			<label for="username" className='block text-[#9CA3AF] mb-1'>Username</label>
			<input type="text" name="username" id="username" className='w-full rounded-md border border-solid border-[#374151] bg-[#111827] py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none' placeholder=""/>
		</div>
		<div className="mt-1 text-sm">
			<label for="password" className='block text-[#9CA3AF] mb-1'>Password</label>
			<input type="password" name="password" id="password" className='w-full rounded-md border border-solid border-[#374151] bg-[#111827] py-3 px-4 text-[#F3F4F6] focus:border focus:border-[#A020F0] focus:outline-none' placeholder=""/>
		</div>
		<button className="block w-full bg-[#A020F0] p-3 text-center text-white border-none rounded-md font-semibold mt-2 hover:bg-[#A78BFA]">Sign in</button>
	</form>
	<div className="flex items-center pt-4">
		<div className="h-[1px] flex flex-1 bg-[#9CA3AF]"></div>
		<p className="pl-3 pr-3 text-sm text-[#9CA3AF]">Sigin with google</p>
		<div className="h-[1px] flex flex-1 bg-[#9CA3AF]"></div>
	</div>
	<div className="flex justify-center">
        <div className='p-3 cursor-pointer'>
         <FaGoogle size={20}/>
        </div>
	</div>
	<p className="text-center text-xs text-[#9CA3AF]">Don't have an account?
		<Link to='/signup' className="text-[#9CA3AF] decoration-0 text-base ml-1 hover:text-blue-600 hover:underline">Sign up</Link>
	</p>
</div>
    </div>
  )
}

export default Login;