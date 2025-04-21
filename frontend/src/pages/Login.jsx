// src/pages/Login.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

import AuthFormWrapper from '../components/AuthFormWrapper';
import InputField from '../components/InputField';
import GoogleAuthButton from '../components/GoogleAuthButton';

import { loginUser } from '../utils/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      const token = data.token;
      localStorage.setItem('token', JSON.stringify({ token }));
      localStorage.setItem('username', formData.username);

      toast.success(data.msg || 'Login Successful!');
      setTimeout(() => navigate('/playground'), 2000);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Invalid credentials!';
      toast.error(msg);
    }
  };

  return (
    <AuthFormWrapper>
      <h2 className="text-3xl font-bold text-center text-blue-400">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
        >
          Login
        </button>
      </form>

      <div className="flex items-center justify-center">
        <span className="text-gray-400 text-sm">or</span>
      </div>

      <GoogleAuthButton onClick={() => alert('Handle Google Login here')} label="Login with Google" />

      <p className="text-gray-400 text-sm mt-2">
        Not a member? <Link className="text-blue-400" to="/register">Sign Up</Link>
      </p>
    </AuthFormWrapper>
  );
};

export default Login;
