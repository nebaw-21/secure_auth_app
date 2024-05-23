import React, { useState, useEffect } from 'react';
import logo from "../../../assets/plogging-logo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../commons/loader';

import { APP_URL, APP_URL_2 } from '../../../config';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${APP_URL}/blog`);
        setBlogs(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch blogs');
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (secondsAgo < 60) {
      return `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hours ago`;
    } else if (daysAgo < 7) {
      return `${daysAgo} days ago`;
    } else if (weeksAgo < 4) {
      return `${weeksAgo} weeks ago`;
    } else if (monthsAgo < 12) {
      return `${monthsAgo} months ago`;
    } else {
      return `${yearsAgo} years ago`;
    }
  };

  if(isLoading){
    return(
 <Loader />

    )
  }

  return (
    <div className="relative pt-2 lg:pt-2 min-h-screen">
      <div className="bg-cover w-full flex justify-center items-center">
        <div className="w-full bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
          <div className="w-12/12 mx-auto rounded-2xl bg-white p-5 bg-opacity-40 backdrop-filter backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="bg-white p-6 mb-6 shadow-2xl transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer"
                >
                  <Link target="_self" to={`/blogDetail/${blog._id}`} className="absolute opacity-0 top-0 right-0 left-0 bottom-0"></Link>
                  <div className="relative mb-4 rounded-2xl">
                  <img
  className="max-h-64 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
  src={blog.images[0] ? `${APP_URL_2}/blogs/${blog.images[0].replace('/uploads/blogs/', '')}` : ''}
  alt={`Image for ${blog.title}`}
/>
                    <Link
                      className="flex justify-center items-center bg-green-700 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                      to={`/blogDetail/${blog._id}`}
                      target="_self"
                      rel="noopener noreferrer"
                    >
                      Read article
                      <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center w-full pb-4 mb-auto">
                    <div className="flex items-center">
                      <div className="pr-3">
                        <img className="h-12 w-12 rounded-full object-cover" src={logo} alt="" />
                      </div>
                      <div className="flex flex-1">
                        <div className="">
    
                          <p className="text-sm text-gray-500">Published on {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="text-sm flex items-center text-gray-500 ">
                        {formatDate(blog.createdAt)}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;