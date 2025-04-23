'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

const MultiStepSignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Set the default value for the 'dob' field to today's date
  const [formData, setFormData] = useState<FormData>({
    dob: new Date().toISOString().split('T')[0], // Default to today's date (ISO format)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (step: number): boolean => {
    // Check if all fields in the current step are filled
    return steps[step].every(({ name }) => formData[name] && formData[name].trim() !== '');
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    } else {
      alert('Please fill in all fields before proceeding.');
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                    required
                    className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
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
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-1/2"
              >
                Sign Up
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignUp;
