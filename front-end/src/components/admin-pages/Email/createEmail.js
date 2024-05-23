import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../config';
import { FaArrowLeft } from "react-icons/fa";

const CreateBlog = () => {

  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post(`${APP_URL}/email/sendEmailsToAllUsers`, {subject, text}, {
    
      });
      if (response.status === 200) {
        navigate('/admin');
      } else {
        throw new Error('Error in submission');
      }
    } catch (error) {
      setErrors({ submission: 'Error in submission' });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-100 shadow-lg bg-slate-50 p-6'>
      <Link to='/admin' className='m-4'>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <FaArrowLeft />
        </button>
      </Link>
      <div className="m-4">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">subject</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input 
                    type="text" 
                    name="subject" 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                    placeholder="Write title" 
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">text</label>
              <div className="mt-2">
                <textarea 
                  id="text" 
                  name="text" 
                  rows="3" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
      
         
          </div>
        </div>
        {errors.submission && (
          <div className="text-red-600 text-sm">{errors.submission}</div>
        )}
        <div className="my-4 text-center">
          <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            send Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
