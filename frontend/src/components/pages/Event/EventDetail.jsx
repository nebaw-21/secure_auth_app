import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { APP_URL, APP_URL_2 } from '../../../config';
import Loader from '../../commons/loader';


function EventDetail() {
  const { eventId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [user, setUser] = useState(null); 
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch logged-in user data
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${APP_URL}/user/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.data);
          setUserId(response.data.data._id); // Set the userId state
     
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []); 



  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${APP_URL}/event/${eventId}`);
        const event = response.data;
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
        setImages(event.images[0]);
        const filePreviews = event.images.map((img) => {
          img = img.replace('/uploads/events/', '');
          return `${APP_URL_2}/events/${img}`;
        });
        setImagePreviews(filePreviews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }

    try {
      const response = await axios.post(`${APP_URL}/registerForEvent`, {
        user_id: userId,
        event_id: eventId,
      });
      if (response.status === 201) {
        navigate('/'); // Redirect to home page if successful
      } else {
        // Handle error, e.g., display an error message
        console.error('Error registering for event:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  if(isLoading){
    return(
      <Loader />
    )
  }
  
  return (
    <body className="font-poppins relative">
    
      <div id="container" className=" w-auto flex px-24 justify-center relative mb-6">
        <div
          id="container"
          className="p-20 shadow-xl sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative"
        >
          <div className="mr-10 max-h-100 p-4 ">
            {imagePreviews[0] && (
              <img
                src={imagePreviews[0]}
                alt="Event Image"
                className="w-full max-h-100 mb-8 rounded-lg"
              />
            )}
          </div>
          <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-black font-bold text-3xl mt-6 mb-8">{title}</h1>
            <h2 className="text-black font-bold text-2xl mt-6 mb-8">Date : {date}</h2>
            <p className="text-black font-sans w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">{description}</p>
            <div className="flex justify-center">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </body>
  );
}

export default EventDetail;