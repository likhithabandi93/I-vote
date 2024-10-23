import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useDispatch } from 'react-redux';
import { login } from '../../action/Customer';
import { adminlogin } from '../../action/Admin';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

   if(formData.email === "admin@gmail.com" && formData.password === "admin"){
    const data ={
      email:formData.email,
      password:formData.password
    }
    dispatch(adminlogin(data))
  }else{
    const data = {
      email:formData.email,
      voter_id:formData.password
    }
    dispatch(login(data))
  };
};

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow justify-center items-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">voter_id </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
