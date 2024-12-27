import axios from "axios";
import { useState } from "react";
import { APP_URL } from "../../config";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APP_URL}/user/login/otp`, formData);
      setIsOtpSent(true);
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      if (error.response?.status === 403) {
        setError(error.response.data.message);  // Account lockout message
      } else {
        setError(error.response?.data?.message || "Login failed.");
      }
      setMessage("");
    }
  };
  

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APP_URL}/user/login/otp/verify`, { email: formData.email, otp });
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed.");
      setMessage("");
    }
  };

  return (
    <section className="grid place-items-center w-full h-screen">
      <form className="w-full max-w-[500px] p-10 flex flex-col gap-5">
        <h1 className="text-3xl pb-4">Login</h1>
        {message && <div className="text-green-500">{message}</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!isOtpSent && (
          <>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="p-2 border rounded"
            />
            <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">Login</button>
          </>
        )}

        {isOtpSent && (
          <>
            <input
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="p-2 border rounded"
            />
            <button onClick={handleVerifyOtp} className="p-2 bg-green-500 text-white rounded">Verify OTP</button>
          </>
        )}
      </form>
    </section>
  );
};

export default LoginPage;
