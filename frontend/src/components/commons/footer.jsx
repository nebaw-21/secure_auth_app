import facebook from "../../assets/social-media/facebook.png";
import instagram from "../../assets/social-media/instagram.png";
import whatsup from "../../assets/social-media/whatsup.png";
import telegram from "../../assets/social-media/telegram.png";
import youtube from "../../assets/social-media/youtube.png";
import { APP_URL } from "../../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Footer = () => {
  const socialMediaIcons = [
    {
      icon: facebook,
      link: "https://www.facebook.com/profile.php?id=100078976189435&mibextid=ZbWKwL",
    },
    {
      icon: instagram,
      link: "https://www.instagram.com/ploggingethiopia?igsh=MXRua2kzcXdsZnZraA==",
    },
    {
      icon: whatsup,
      link: "https://wa.me/251911647424",
    },
    {
      icon: telegram,
      link: "https://t.me/ploggingethiopia",
    },
    {
      icon: youtube,
      link: "https://www.youtube.com/@plogging-ethiopia6643",
    },
  ];

  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      console.error("Please fill the email field");
      return;
    }
    try {
      const res = await axios.post(`${APP_URL}/subscribed`, { email });
      if (res.status === 201) {
        setEmail("");
        console.log("You are now subscribed");
      } else {
        console.error("Error occurred");
      }
    } catch (error) {
      console.error("Error occurred");
    }
  };

  return (
    <footer className="w-full flex flex-col items-center bg-green-500/10">
      <section className="flex justify-between w-[80%] py-10 md:flex-row flex-col gap-10">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-green-500 font-semibold">Useful Links</h1>
          <Link className="hover:text-green-500" to="/">
            Home
          </Link>
          <Link className="hover:text-green-500" to="/gallery">
            Gallery
          </Link>
          <Link className="hover:text-green-500" to="/blog">
            Blog
          </Link>
          <Link className="hover:text-green-500" to="/contact">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col md:items-center gap-3">
          <h1 className="uppercase">Subscribe</h1>
          <p>Sign up with your email address to receive news and updates.</p>
          <div className="flex items-center max-w-[400px] w-full">
            <form onSubmit={handleSubmit} className="flex w-full">
              <input
                value={email}
                onChange={handleChange}
                name="email"
                type="email"
                className="p-2 rounded-l-md border-input border-2 w-full border-r-0 focus:outline-0"
                placeholder="Your email address"
              />
              <button
                type="submit"
                className="bg-green-500 w-auto hover:bg-green-700 border-2 border-input text-white font-bold py-2 px-4 rounded-r-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-green-600">Social Media</h1>
          <div className="flex gap-6 items-center">
            {socialMediaIcons.map((icon, index) => (
              <a key={index} href={icon.link}>
                <img src={icon.icon} alt="icon" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full flex py-2 text-white items-center justify-around bg-green-500/80">
        <p>Copyright © 2024 Plogging-Ethiopia, All rights reserved.</p>
        <p>
          Powered by{' '}
          <a href="https://kasmasolution.com" className="hover:text-white/70 cursor-pointer">
            Kasma Tech Solution
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
