import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../config';
import { FaArrowLeft } from "react-icons/fa";

const CreateBlog = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post(`${APP_URL}/blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        navigate('/displayBlog');
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
      <Link to='/displayBlog' className='m-4'>
        <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          <FaArrowLeft />
        </button>
      </Link>
      <div className="m-4">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" 
                    placeholder="Write title" 
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div className="mt-2">
                <textarea 
                  id="description" 
                  name="description" 
                  rows="3" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
      
            <div className="col-span-full">
              <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">Add Photo</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        onChange={handleFileChange}
                        className="sr-only" 
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`preview ${index}`} className="h-20 w-20 object-cover rounded" />
                    ))}
                  </div>
                </div>
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
            Add Blog
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
