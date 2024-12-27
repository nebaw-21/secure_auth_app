import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { APP_URL, APP_URL_2 } from '../../../config';
import Loader from '../../commons/loader';

function BlogDetail() {
  const { blogId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isLoading ,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${APP_URL}/blog/${blogId}`);
        const blog = response.data;
        setTitle(blog.title);
        setDescription(blog.description);
        setImages(blog.images);
        const filePreviews = blog.images.map((img) => {
          img = img.replace('/uploads/blogs/', '');
          return `${APP_URL_2}/blogs/${img}`;
        });
        setImagePreviews(filePreviews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if(isLoading){
    return(
      <Loader/>
    )
  }

  return (
    <body className="font-poppins relative">
    
      <div id="container" className=" w-auto flex px-24 justify-center relative mb-6 ">
        <div
          id="container"
          className="p-20 shadow-xl sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto flex flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative"
        >
          <div className="mr-10 max-h-100 p-4 ">
          {
                <img
                  src={imagePreviews[0]}
                  alt={"image"}
                  className="w-full  max-h-100 rounded-xl mb-8"
                />
            }
          </div>
          <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-black font-bold text-3xl mt-6 mb-8">{title}</h1>
            <p className="text-black font-sans w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">{description}</p>
          </div>
          
        </div>
      </div>
     
    </body>
  );
}

export default BlogDetail;