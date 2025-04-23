'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [codeVerified, setCodeVerified] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!codeSent) {
      // Simulate sending code
      console.log(`Sending code to ${email}...`)
      setCodeSent(true)
    } else if (!codeVerified) {
      // Simulate code verification
      console.log(`Verifying code: ${verificationCode}`)
      if (verificationCode === '123456') {
        setCodeVerified(true)
      } else {
        alert('Invalid verification code.')
      }
    } else {
      // Simulate password reset
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match.')
        return
      }

      console.log(`Resetting password for ${email}`)
      alert('Password reset successful! You can now log in.')
    }
  }

  const handleChangeEmail = () => {
    setCodeSent(false)
    setCodeVerified(false)
    setVerificationCode('')
    setEmail('')
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
        ) : !codeVerified ? (
          <div className='text-center mb-6'>
            <p className='text-teal-600 font-medium'>
              A code has been sent to <span className='font-semibold'>{email}</span>
            </p>
            <button
              onClick={handleChangeEmail}
              className='mt-2 text-sm text-gray-500 underline hover:text-teal-600'
            >
              Change Email
            </button>
          </div>
        ) : (
          <p className='text-gray-600 mb-6 text-center'>
            Enter a new password for your account.
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {!codeVerified && (
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={codeSent}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
              />
            </div>
          )}

          {codeSent && !codeVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='mb-6'
            >
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Enter Verification Code
              </label>
              <input
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
              />
            </motion.div>
          )}

          {codeVerified && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='mb-6'
              >
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  New Password
                </label>
                <input
                  type="password"
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='mb-6'
              >
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
                />
              </motion.div>
            </>
          )}

          <Button type="submit" className='w-full bg-teal-600 text-white hover:bg-teal-700'>
            {!codeSent ? 'Send Code' : !codeVerified ? 'Verify Code' : 'Reset Password'}
          </Button>
        </form>

        <p className='mt-6 text-sm text-gray-600 text-center'>
          Remembered your password?{' '}
          <Link href="/" className='text-teal-600 hover:text-teal-700 transition duration-300'>
            Back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
