'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!codeSent) {
      // Simulate sending code
      console.log(`Sending code to ${email}...`)
      setCodeSent(true)
    } else {
      // Simulate verifying code
      console.log(`Verifying code: ${verificationCode}`)
    }
  }

  const handleChangeEmail = () => {
    setCodeSent(false)
    setVerificationCode('')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12'>
      <motion.div
        className='w-full max-w-md bg-white rounded-xl shadow-lg px-8 py-10'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-2xl font-bold text-teal-700 mb-4 text-center'>
          Forgot Password?
        </h2>

        {!codeSent ? (
          <p className='text-gray-600 mb-6 text-center'>
            Enter your email to receive a reset code.
          </p>
        ) : (
          <div className='text-center mb-6'>
            <p className='text-teal-600 font-medium'>
              A code has been sent to <span className='font-semibold'>{email}</span>
            </p>
        

            <Button
            onClick={handleChangeEmail}
            className='mt-2 text-sm   '
          >
            Change Email
                </Button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={codeSent}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
            />
          </div>

          {codeSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='mb-6'
            >
              <label htmlFor="code" className='block text-sm font-medium text-gray-700 mb-1'>
                Enter Verification Code
              </label>
              <input
                type="text"
                id="code"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
              />
            </motion.div>
          )}

          <Button type="submit" className='w-full bg-teal-600 text-white hover:bg-teal-700'>
            {codeSent ? 'Verify Code' : 'Send Code'}
          </Button>
        </form>

        <p className='mt-6 text-sm text-gray-600 text-center'>
          Remembered your password?{' '}
          <Link href="/login" className='text-teal-600 hover:text-teal-700 transition duration-300'>
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
