import FAQ from "../commons/FAQ";
import locationIcon from "../../assets/location-icon.svg";
import mailIcon from "../../assets/mail-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg";
import facebook from "../../assets/social-media/facebook.png";
import instagram from "../../assets/social-media/instagram.png";
import whatsup from "../../assets/social-media/whatsup.png";
import telegram from "../../assets/social-media/telegram.png";
import youtube from "../../assets/social-media/youtube.png";
import { useState } from "react";
import Loader from "../commons/loader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { APP_URL } from "../../config";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [mutation, setMutation] = useState({
    isLoading: false,
    error: null,
  });

  const [user, setUser] = useState(null); // State to hold user information


  useEffect(() => {
    // Function to fetch logged-in user data
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
       
          const response = await axios.get(`${APP_URL}/user/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if required
            },
          });
          setUser(response.data.data); // Set the user state with fetched user data
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the fetchUser function when component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setMutation({ isLoading: true, error: null });
      await axios.post(`${APP_URL}/message`, formData);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      setMutation({ isLoading: false, error: error.message });
      alert("Error sending message. Please try again later.");
    } finally {
      setMutation({ isLoading: false, error: null });
    }
  };

  const socialMediaIcons = [
    { icon: facebook, link: "https://www.facebook.com" },
    { icon: instagram, link: "https://www.instagram.com" },
    { icon: whatsup, link: "https://www.whatsapp.com" },
    { icon: telegram, link: "https://www.telegram.com" },
    { icon: youtube, link: "https://www.youtube.com" },
  ];

  return (
    <section className="flex flex-col items-center gap-20 w-[90%] pb-10">
      <h1 className="text-5xl pb-4 border-b-2 w-fit">Contact</h1>
      <section className="grid md:grid-cols-2 place-items-center w-full">
        <div className="flex flex-col justify-between items-center w-full">
          <h1 className="text-3xl">Get In Touch</h1>

          <form className="w-full shadow-lg shadow-form p-10 flex flex-col gap-5 rounded-md items-center">
            <div className="flex flex-col items-start w-full">
              <label>Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="p-2 rounded-md w-full border-input border-2"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="text"
                className="p-2 rounded-md w-full border-input border-2"
              />
            </div>

            <div className="flex flex-col items-start w-full">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="p-2 rounded-md w-full border-input border-2"
              />
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
            >
              {mutation.isLoading && <Loader />}
              Send
            </button>
          </form>
        </div>
{!user && (
 <div className="flex flex-col items-center gap-3 md:mt-0 mt-20">
 <h3 className="font-semibold">Join the Movement</h3>
 <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
   <Link to="/membership">Join</Link>
 </button>
</div>
)
}  
      </section>

      <section className="grid md:grid-cols-2 w-full">
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <img src={locationIcon} alt="location" />
            <div className="flex flex-col">
              <p>Location</p>
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="flex gap-10">
            <img src={phoneIcon} alt="phone" />
            <div className="flex flex-col">
              <p>+251911647424</p>
            </div>
          </div>

          <div className="flex gap-10">
            <img src={mailIcon} alt="mail" />
            <div className="flex flex-col">
              <p>info@ploggingethiopia.org</p>
            </div>
          </div>
        </div>

        <div className="flex place-self-center items-center gap-10">
          <p>Social Media</p>
          {socialMediaIcons.map((icon, index) => (
            <a key={index} href={icon.link}>
              <img src={icon.icon} alt="icon" />
            </a>
          ))}
        </div>
      </section>

      <FAQ />
    </section>
  );
};

export default Contactus;