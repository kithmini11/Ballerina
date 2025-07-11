import React, { useState } from 'react';

function SupplierSignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessRegistrationNumber: '',
    contactPersonName: '',
    phone: '',
    address: '',
    productCategories: [],
    acceptTerms: false
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
      
    if (e.target.name === 'productCategories') {
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData({
        ...formData,
        productCategories: selectedValues
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    if (formData.productCategories.length === 0) {
      setError('Please select at least one product category');
      return;
    }

    // Call the parent component's submit handler
    onSubmit({ ...formData, userType: 'supplier' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
          Company Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your company name"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Business Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="company@example.com"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessRegistrationNumber">
          Business Registration Number
        </label>
        <input
          id="businessRegistrationNumber"
          name="businessRegistrationNumber"
          type="text"
          value={formData.businessRegistrationNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="BRN-XXXXX"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPersonName">
          Contact Person Name
        </label>
        <input
          id="contactPersonName"
          name="contactPersonName"
          type="text"
          value={formData.contactPersonName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full name of primary contact"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Business Contact Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+94 XX XXX XXXX"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Business Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Complete business address"
          rows="2"
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategories">
          Product Categories (Hold Ctrl/Cmd to select multiple)
        </label>
        <select
          id="productCategories"
          name="productCategories"
          multiple
          value={formData.productCategories}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          size="4"
          required
        >
          <option value="Brackets">Brackets</option>
          <option value="Wires">Wires</option>
          <option value="Elastics">Elastics</option>
          <option value="Instruments">Instruments</option>
          <option value="Retainers">Retainers</option>
          <option value="Aligners">Aligners</option>
          <option value="Adhesives">Adhesives</option>
          <option value="Other Supplies">Other Supplies</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl (or Cmd on Mac) to select multiple categories</p>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create a password"
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm your password"
          required
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
            I accept the <a href="/terms" className="text-blue-600 hover:text-blue-800">Terms and Conditions</a>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Create Supplier Account
      </button>
    </form>
  );
}

export default SupplierSignupForm;