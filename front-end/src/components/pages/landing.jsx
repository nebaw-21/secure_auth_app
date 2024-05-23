import Hero from "../landing/hero";
import FAQ from "../commons/FAQ";
import story1 from "../../assets/story-1.png";
import story2 from "../../assets/story-2.png";
import story3 from "../../assets/story-3.png";
import story4 from "../../assets/story-4.png";
import story5 from "../../assets/about-5.png"
import story6 from "../../assets/about-6.png"
import founder from "../../assets/founder-photo.png"
import Footer from "../commons/footer";
import Navbar from "../commons/navbar";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import shareIcon from "../../assets/share-icon.svg";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import Event from "./Event/Event";
import { useEffect } from "react";
import 'aos/dist/aos.css';
import Aos from 'aos'

const Landing = () => {

  const [data,setData] = useState([{
    name:'',
    agreement:false,
    email:'',
    who:'',
    date:''

  }])
    
  useEffect(() => {
    Aos.init({
      duration: 2000, // Global duration of animations in milliseconds
      once: false, // Whether animation should happen only once - while scrolling down
    });
    Aos.refresh();

  }, []);
  
  const handleChange = (event) => {
    const { name, value} = event.target;

    // Update the form data based on the input onChange={handleChange} type
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <main data-aos="fade-up" className="w-full flex flex-col items-center gap-20 pb-20">
      <Hero />

      <section data-aos="fade-up" className="flex flex-col justify-between w-[90%] text-left gap-10">

        <div className="flex md:flex-row flex-col justify-between items-center w-full shadow-xl">

          <div data-aos="fade-up" className="flex flex-col items-center gap-5 md:w-[60%] w-full md:order-1 order-2 p-4">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-center">
              Our Story
            </h1>
            <p className="font-sans text-lg">
              Plogging-Ethiopia traces its origins back to a family excursion that spanned more than five years before officially launching in January 2021 at Entoto Park, Addis Ababa. The individuals behind this initiative are Firew Kefyalew, a father, and his three sons – Yeab, Lihiq, and Amnen. Plogging-Ethiopia goes beyond simply collecting trash; it represents a dynamic movement that combines physical fitness, community involvement, and environmental responsibility. The concept,originating from Sweden, quickly gained momentum as Firew and a growing community of volunteers realized its potential to make a meaningful impact in Ethiopia. Our dedicated volunteers, comprising students and professionals alike, unite under a shared objective:fostering a healthier Ethiopia by tackling plastic pollution and advocating for an active way of life.
            </p>
          </div>

          <img data-aos="fade-up "
            className="order-1 md:order-2 rounded-md"
            alt="Plogging Ethiopia"
            src={story1}
          />

        </div>

        <div data-aos="fade-up" className="flex md:flex-row flex-col justify-between items-center w-full shadow-xl mt-2">
          <img
            className="rounded-md "
            alt="Plogging Ethiopia"
            src={story2}
          />

          <div className="flex flex-col items-center md:w-[50%] w-[90%] gap-5 p-4">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-center">
              What is Plogging?
            </h1>
            <p className="font-sans text-lg">
              Plogging is more than an exercise routine; it's a revolutionary approach to environmental stewardship. Participants jog or walk, intermittently stopping to pick up litter along their route. This simple act not only beautifies our surroundings but also raises awareness about the impact of plastic pollution on our communities and ecosystems.
            </p>
          </div>

        </div>

        <div className="flex justify-between items-center w-full md:flex-row flex-col mt-2 shadow-lg">
          <div data-aos="fade-up" className="flex flex-col items-start md:w-[50%] w-[90%] gap-5 md:order-1 order-2 p-4">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-center ">
              Mission
            </h1>
            <p className="font-sans text-lg">
              At the core of Plogging-Ethiopia is a mission to create a cleaner, greenerEthiopia through community-led action. We believe that collectiveefforts, no matter how small, can pave the way for substantialchange. By encouraging plogging, we aim to inspire people to takeresponsibility for their environment while promoting an active andhealthy lifestyle.
            </p>
          </div>

          <img data-aos="fade-up p-4"
            className="rounded-full order-1 md:order-2"
            alt="Plogging Ethiopia"
            src={story3}
          />
        </div>

        <div  data-aos="fade-up" className="flex justify-between items-center w-full md:flex-row flex-col shadow-lg">
          <img
            className="rounded-full"
            alt="Plogging Ethiopia"
            src={story4}
          />

          <div data-aos="fade-up" className="flex flex-col p-4 items-start md:w-[50%] w-[90%] gap-10">
            <h1 className="text-4xl md:text-5xl font-bold font-sans text-center">
              Our Impact
            </h1>
            <p className="font-sans text-lg" >
              Plogging-Ethiopia'sremarkable achievements have gained both national and internationalacclaim, being highlighted in more than 30 media outlets andcommended by Ethiopia's Prime Minister for their exceptionalcommunity service. Despite starting from humble beginnings without anofficial office, staff, or budget, we have successfully showcased thetransformative power of collective action and the positive energythat drives social change. Our movement has become a symbol ofgrassroots environmentalism, demonstrating the profound impact thatcollective positive energy can have.
            </p>
          </div>
        </div>
      </section>

      <section data-aos="fade-up" id="aboutus" className="relative grid md:grid-cols-2  w-[90%] md:h-[85vh] shadow-lg">
        <img src={story5} className="rounded-md" data-aos="fade-up" alt={"story"} />

        <div data-aos="fade-up" className="flex flex-col h-full">
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-center mt-4">
            About us
          </h1>
          <h1 className="text-xl text-left font-semibold">
            Welcome to Plogging-Ethiopia
          </h1>
        </div>

        <div data-aos="fade-up" className="md:absolute p-4 right-0 top-1/3 md:w-4/5 w-full flex flex-col md:flex-row justify-around gap-5">
          <img src={story6} data-aos="fade-up" className="rounded-md" alt={"story"} />

          <div data-aos="fade-up" className="flex flex-col items-end md:w-3/4 w-[90%] gap-10 text-left">
            <p className="font-sans text-lg">
              Embark on ajourney of impact and sustainability with Plogging-Ethiopia! Astrailblazers in the movement for a greener Ethiopia, we are more thana voluntary initiative — we are a community dedicated totransforming lives and our environment, one stride at a time.
            </p>
         
          </div>
        </div>
      </section>

      <section data-aos="fade-up"
        className="w-full grid place-items-center mt-20 landing-form"
      >

      </section>

      <section data-aos="fade-up shadow-lg"
        className="founder-message place-items-center w-[90%] gap-3"
      >
        <div data-aos="fade-up" className="flex flex-col text-left gap-10 p-4">
          <h1 className="text-2xl font-semibold">
            Message From Founder of Plogging Ethiopia
          </h1>
          <p>
            Welcome, Esteemed Visitors!
          </p>
          <p>
            Step into the world of Plogging-Ethiopia's website, where passion and purpose unite to create a cleaner and healthier Ethiopia. As the founder, I am absolutely thrilled to have you explore our website and witness the incredible efforts of individuals who are dedicated to the well-being of our environment through plogging.
          </p>
          <p>
            We are a young and vibrant organization, constantly striving to inspire change one eco-friendly stride at a time. By harnessing the power of positive energy expressed through volunteerism, we aim to bring about organic social change driven by individuals like yourself. Take a deep dive into our pages to discover our initiatives, join our events, and find valuable resources to embrace sustainable living. Together, we can make a lasting impact on our environment.
          </p>
          <p>
            Thank you for embarking on this journey with us towards a more vibrant and greener Ethiopia. Your support is truly invaluable.
          </p>
          <p>
            With warm regards,
          </p>
          <p>
            Firew Kefyalew
          </p>
          <p>
            Founder, Plogging-Ethiopia.
          </p>
        </div>

        <img src={founder} data-aos="fade-up" className="w-full h-full object-cover rounded-md" alt={"Mr. Firew kefyalew"} />
      </section>

      <section data-aos="fade-up" className="w-full flex flex-col items-center">
        <FAQ />
      </section>
    </main>
  )

}

function timeAgo(timestamp) {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const timeDifference = currentDate - inputDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}

export default Landing;