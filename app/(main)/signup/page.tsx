'use client';

import { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const fields = [
  { label: 'First Name', name: 'firstName', placeholder: 'First Name' },
  { label: 'Last Name', name: 'lastName', placeholder: 'Last Name' },
  { label: 'Date of Birth', name: 'dob', type: 'date', placeholder: 'Date of Birth' },
  { label: 'User Name', name: 'userName', placeholder: 'User Name' },
  { label: 'Address', name: 'address', placeholder: 'Address' },
  { label: 'Email', name: 'email', placeholder: 'Email' },
  { label: 'Phone Number', name: 'phone', placeholder: 'Phone Number' },
  { label: 'Password', name: 'password', type: 'password', minLength: 8, placeholder: 'At least 8 characters' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password', minLength: 8, placeholder: 'At least 8 characters' },
];

type FormData = {
  [key: string]: string;
};

type FormErrors = {
  [key: string]: boolean;
};

const MultiStepSignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    dob: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find((c) => c.isoCode === e.target.value);
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country?.isoCode));
    setCities([]);
    setSelectedState(null);
    setFormData((prev) => ({ ...prev, country: country?.name || '' }));
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = states.find((s) => s.isoCode === e.target.value);
    setSelectedState(state);
    setCities(City.getCitiesOfState(state?.countryCode, state?.isoCode));
    setFormData((prev) => ({ ...prev, state: state?.name || '' }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = e.target.value;
    setFormData((prev) => ({ ...prev, city: cityName }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    [...fields, { name: 'country' }, { name: 'state' }, { name: 'city' }].forEach(({ name }) => {
      if (!formData[name] || formData[name].trim() === '') {
        newErrors[name] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-teal-700">Create Your Account</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">

            {/* Normal Input Fields */}
            {fields.map(({ label, placeholder, name, type = 'text', minLength }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="mb-1 text-sm text-gray-700 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  placeholder={placeholder}
                  value={formData[name] || ''}
                  minLength={minLength}
                  onChange={handleChange}
                  className={`px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:outline-none 
                    ${errors[name] ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-teal-500'}`}
                />
                {errors[name] && (
                  <span className="text-red-600 text-sm mt-1">This field is required</span>
                )}
              </div>
            ))}

            {/* Country Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700 font-medium">Country</label>
              <select
                onChange={handleCountryChange}
                className="p-2 border rounded disabled:bg-gray-100"
                value={selectedCountry?.isoCode || ''}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors['country'] && (
                <span className="text-red-600 text-sm mt-1">Please select a country</span>
              )}
            </div>

            {/* State Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700 font-medium">State</label>
              <select
                onChange={handleStateChange}
                className="p-2 border rounded disabled:bg-gray-100"
                disabled={!states.length}
                value={selectedState?.isoCode || ''}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors['state'] && (
                <span className="text-red-600 text-sm mt-1">Please select a state</span>
              )}
            </div>

            {/* City Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-gray-700 font-medium">City</label>
              <select
                onChange={handleCityChange}
                className="p-2 border rounded disabled:bg-gray-100"
                disabled={!cities.length}
                value={formData.city || ''}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors['city'] && (
                <span className="text-red-600 text-sm mt-1">Please select a city</span>
              )}
            </div>

          </div>

          <div className="flex justify-center items-center mt-10 gap-4">
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-1/2"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepSignUp;
