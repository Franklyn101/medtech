import React from 'react'
import Image from "next/image"

import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className='h-screen bg-gray-50'>
      <div className='flex flex-col items-center justify-center h-full'>
        {/* <h1 className='text-4xl font-semibold text-teal-600 mb-6'>Login</h1>   */}
        <div className='flex'>

        <div>
        <Image
  src="/placeholder.svg"
  alt="Healthcare professionals in a meeting"
  height={850}
  width={400}
  className="object-cover rounded-lg"
  priority
/>




                
        </div>

        <div className='h-[450px] w-[400px] bg-white border border-teal-600 shadow-lg rounded-lg flex items-center justify-center'>
          <form className='flex flex-col items-center w-full px-8 py-6'>
            <h2 className='text-2xl font-semibold text-teal-600 mb-4'>Welcome Back!</h2>
            <p className='text-center text-gray-600 mb-6'>Please enter your credentials to login.</p>

            <input 
              type="text" 
              placeholder="Username" 
              className='mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
            />
            <input 
              type="password" 
              placeholder="Password" 
              className='mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
            />
            
            <Button  className='w-full py-3   transition duration-300'>Login</Button>

            <p className='mt-6 text-sm text-gray-600'>
              Don't have an account? 
              <a href="/signup" className='text-teal-600 hover:text-teal-600 transition duration-300'> Register</a>
            </p>

            <p className='mt-6 text-sm text-gray-600'>
              <a href="/forgot-password" className='text-teal-600 hover:text-teal-600 transition duration-300'>Forgot Password?</a>
              </p>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Page
