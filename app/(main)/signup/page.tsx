'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const steps = [
  [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone Number', name: 'phone' },
  ],
  [
    { label: 'Date of Birth', name: 'dob' },
    { label: 'Address', name: 'address' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
  ],
  [
    { label: 'Country', name: 'country' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
  ]
];

type FormData = {
  [key: string]: string;
};

const MultiStepSignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className='h-screen bg-gray-50 flex items-center justify-center'>
      <div className='min-h-[550px] w-[500px] bg-white border border-teal-600 shadow-xl rounded-2xl p-8'>
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-teal-600 mb-2'>Sign Up</h2>
            <p className='text-gray-600'>Step {currentStep + 1} of {steps.length}</p>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {steps[currentStep].map(({ label, name, type = 'text' }) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={label}
                value={formData[name] || ''}
                onChange={handleChange}
                className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600'
              />
            ))}
          </div>

          <div className='flex justify-center gap-10 items-center'>
            {currentStep > 0 && (
              <Button type='button' onClick={prevStep} className='w-[48%]'>Back</Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type='button' onClick={nextStep} className='w-[48%]'>Next</Button>
            ) : (
              <Button type='submit' className='w-[48%]'>Submit</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignUp;
