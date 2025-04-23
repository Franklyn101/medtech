'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link"

const steps = [
  [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Date of Birth', name: 'dob', type: 'date' },
    { label: 'Country', name: 'country' },
  ],
  [
    { label: 'User Name', name: 'UserName' },
    { label: 'Address', name: 'address' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
  ],
  [
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ]
];

type FormData = {
  [key: string]: string;
};

type FormErrors = {
  [key: string]: boolean;
};

const MultiStepSignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    dob: new Date().toISOString().split('T')[0], // today's date
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false })); // clear error when user types
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    steps[step].forEach(({ name }) => {
      if (!formData[name] || formData[name].trim() === '') {
        newErrors[name] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700">Create Your Account</h1>
          <p className="text-sm sm:text-md text-gray-600">Step {currentStep + 1} of {steps.length}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {steps[currentStep].map(({ label, name, type = 'text' }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">{label}</label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={label}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    className={`px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none 
                      ${errors[name] ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-teal-500'}`}
                  />
                  {errors[name] && (
                    <span className="text-red-600 text-sm mt-1">*</span>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-4">
            {currentStep > 0 && (
              <Button
                type="button"
                onClick={prevStep}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-full sm:w-1/2"
              >
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-1/2"
              >
                Next
              </Button>
            ) : (
              <Link className='w-full sm:w-1/2' href="/">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-full"
              >
                Sign Up
              </Button>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignUp;
