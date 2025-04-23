'use client'

import React from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10'>
      <motion.div 
        className='flex flex-col lg:flex-row items-center justify-center gap-10  lg:gap-0 w-full max-w-5xl'
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >

        {/* Image Section */}
        <motion.div 
          className='w-full lg:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/placeholder.svg"
            alt="Healthcare professionals in a meeting"
            height={450}
            width={400}
            className="object-cover rounded-lg w-full max-w-xs lg:max-w-[400px] lg:h-[400px]"
            priority
          />
        </motion.div>

        {/* Form Section */}
        <motion.div 
          className='w-full max-w-sm lg:w-[400px] bg-white border border-teal-600 shadow-lg rounded-lg flex items-center justify-center'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className='flex flex-col items-center w-full px-8 py-6'>
            <motion.h2 
              className='text-2xl font-semibold text-teal-600 mb-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome Back!
            </motion.h2>
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

            <a className='w-full' href="/">
              <Button className='w-full py-3 transition duration-300'>Login</Button>
            </a>

            <p className='mt-6 text-sm text-gray-600'>
              Don't have an account? 
              <a href="/signup" className='text-teal-600 hover:text-teal-700 transition duration-300'> Register</a>
            </p>

            <p className='mt-3 text-sm text-gray-600'>
              <a href="/forgot-password" className='text-teal-600 hover:text-teal-700 transition duration-300'>Forgot Password?</a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Page
