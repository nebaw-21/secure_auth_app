import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { APP_URL } from "../../config";
import Loader from "../commons/loader";
import HCaptcha from 'react-hcaptcha';
import { REACT_APP_HCAPTCHA_SITE_KEY } from "../../config";

const Membership = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const { fname, lname, email, phone, password, agree } = formData;

    if (!fname || !lname || !email || !phone || !password) {
      return "All fields are required.";
    }

    if (!agree) {
      return "You must agree to the terms and policy.";
    }

    const passwordRegex = {
      minLength: /.{8,}/,
      upperCase: /[A-Z]/,
      lowerCase: /[a-z]/,
      number: /\d/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    if (!passwordRegex.minLength.test(password)) return "Password must be at least 8 characters long.";
    if (!passwordRegex.upperCase.test(password)) return "Password must contain at least one uppercase letter.";
    if (!passwordRegex.lowerCase.test(password)) return "Password must contain at least one lowercase letter.";
    if (!passwordRegex.number.test(password)) return "Password must contain at least one number.";
    if (!passwordRegex.specialChar.test(password)) return "Password must contain at least one special character.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setError(error);
      return;
    }

    // Ensure hcaptchaToken has a value
    // if (!hcaptchaToken) {
    //   setError("Please complete the hCaptcha.");
    //   return;
    // }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${APP_URL}/user/register`, {
        ...formData,
        
      });

      if (response.status === 200) {
        setLoading(false);
        navigate('/verify_email');
      } else {
        setError(response.data.message || "Error occurred during registration");
        setLoading(false);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error occurred during registration");
      setLoading(false);
    }
  };

  return (
    <section id="start" className="flex flex-col items-center gap-20 w-[90%] pb-10">
      <div data-aos="fade-down" className="w-full flex flex-col gap-5 items-center">
        <h1 className="text-5xl pb-4 border-b-2 w-fit">Membership</h1>
        <p className="text-xl">
          Join our community of passionate individuals dedicated to fostering a healthier environment through plogging.
        </p>
      </div>

      <div className="w-[600px] gap-10">
        <form
          data-aos="fade-down"
          name="member"
          className="w-full shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md"
          onSubmit={handleSubmit}
        >
          {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

          <div className="flex flex-col items-start w-full">
            <label htmlFor="fname">First Name</label>
            <input
              value={formData.fname}
              onChange={handleChange}
              name="fname"
              placeholder="First Name"
              type="text"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label htmlFor="lname">Last Name</label>
            <input
              value={formData.lname}
              onChange={handleChange}
              name="lname"
              placeholder="Last Name"
              type="text"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label htmlFor="email">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              name="email"
              type="email"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              type="text"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label htmlFor="password">Password</label>
            <input
              value={formData.password}
              onChange={handleChange}
              name="password"
              type="password"
              className="p-2 rounded-md w-full border-input border-2"
            />
          </div>

          <HCaptcha
  sitekey={REACT_APP_HCAPTCHA_SITE_KEY}
  onVerify={() => setHcaptchaToken("placeholder-token")} // Simulate verification
  onLoad={() => setHcaptchaToken("placeholder-token")} // Pre-set token on load
/>


          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            disabled={loading}
          >
            {loading && <Loader />}
            Sign up
          </button>

          <div className="flex items-center gap-3">
            <input
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              type="checkbox"
              id="agree"
            />
            <label htmlFor="agree">I agree to the terms and policy</label>
          </div>

          <p className="w-full flex justify-center gap-2">
            Already have an account?
            <Link to="/login">
              <span className="text-green-500">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Membership;