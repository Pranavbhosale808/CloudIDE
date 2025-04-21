import React, { useState } from 'react';
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom';

import AuthFormWrapper from '../components/AuthFormWrapper';
import InputField from '../components/InputField';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { API_URL } from "../config/config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      toast.success(res.data.msg || 'Registered Successfully!', {
        position: 'top-right',
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Something went wrong!';
      toast.error(msg, { position: 'top-right' });
    }
  };

  return (
    <AuthFormWrapper>
      <h2 className="text-3xl font-bold text-center text-blue-400">Create Account</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold rounded-lg shadow-md"
        >
          Register
        </button>
      </form>

      <div className="flex items-center justify-center">
        <span className="text-gray-400 text-sm">or</span>
      </div>

      <GoogleAuthButton onClick={() => alert("Handle Google Signup here")} label="Sign Up with Google"/>

        <p className="text-gray-400 text-sm mt-2">
    Already have an account? <Link className="text-blue-400" to="/login">Login</Link>
  </p>

    </AuthFormWrapper>
  );
};

export default Register;
