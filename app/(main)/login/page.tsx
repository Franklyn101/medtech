'use client'

import React from 'react'
import Image from "next/image"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from "next/link"

const Page = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10'>
      <motion.div 
        className='flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-lg'
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >

        {/* Image Section */}
        <motion.div 
          className='w-full lg:w-1/2 h-96 lg:h-auto flex justify-center items-center bg-teal-50'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="https://i.pinimg.com/736x/28/b6/2f/28b62f0a6dc4bdea189a7bcd46d4d874.jpg"
            alt="Healthcare professionals in a meeting"
            height={500}
            width={500}
            className="object-contain h-full w-full p-6"
            objectFit='contain'
            priority
          />
        </motion.div>

        {/* Form Section */}
        <motion.div 
          className='w-full lg:w-1/2 flex items-center justify-center px-8 py-10'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className='w-full max-w-sm'>
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
              minLength={8}
              className='mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
            />

            <Link href="/" className="w-full">
              <Button className='w-full py-3 transition duration-300'>Login</Button>
            </Link>

            <p className='mt-6 text-sm text-gray-600'>
              Don't have an account? 
              <a href="/signup" className='text-teal-600 hover:text-teal-700 transition duration-300'> Register</a>
            </p>

            <p className='mt-3 text-sm text-gray-600'>
              <a href="/forgetPassword" className='text-teal-600 hover:text-teal-700 transition duration-300'>Forgot Password?</a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Page
