import axios from 'axios';
import { useState } from 'react';
import { APP_URL } from '../../config';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      const response = await axios.post(`${APP_URL}/user/login`, formData);
      const { data } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', data);

      // Redirect to the home page
      window.location.href = '/';
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <section className="grid place-items-center w-full h-screen">
      <form className="w-full max-w-[500px] shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md items-center">
        <h1 className="text-3xl pb-4 border-b-2">Login Page</h1>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-col items-start w-full">
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="p-2 rounded-md w-full border-input border-2"
          />
        </div>

        <div className="flex flex-col items-start w-full">
          <label>Password</label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="p-2 rounded-md w-full border-input border-2"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        >
          Login
        </button>

      </form>
    </section>
  );
};

export default LoginPage;