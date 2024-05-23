import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_URL } from '../../../config';
import { FaArrowLeft } from "react-icons/fa";

const DisplayBlog = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [blogInformation, setBlogInformation] = useState([]);
  const [loading , setLoading] = useState(false);

const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/blog`);
        const result = response.data;
        setBlogInformation(result);
        setLoading(false);
      } catch (error) {
       
      }
    };

    fetchData();
  }, []);

  const deleteOperation = async (id) => {
    try {
    
      const response = await axios.delete(`${APP_URL}/blog/${id}`);
      const result = response.data;
      
      if (response.status === 200) { 

      } else {
        console.error('Error deleting data:', result.message);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    
    getData();
  };

  async function getData(){
    let response = await axios.get(`${APP_URL}/blog`);
    const result = response.data;
    setBlogInformation(result);
   }


  // Calculate pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  let currentItems;
  if (data && data.length > 0) {
    currentItems = data.slice(firstIndex, lastIndex);
  } else {
    currentItems = blogInformation.slice(firstIndex, lastIndex);
  }
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogInformation.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

if(loading === true){
    return(
     <h1>Loading</h1>
    )
}

  return (
<>
<div className="container mx-auto py-8">
<div className='flex justify-between'>
<Link to='/admin'>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><FaArrowLeft /></button>
</Link>
<Link to='/createBlog' className=''>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add</button>
</Link>
</div>
<table className="min-w-full bg-white border border-gray-200">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b">No</th>
      <th className="py-2 px-4 border-b">Title</th>
      <th className="py-2 px-4 border-b col-span-2">Action</th>
      {/* Add more table headers as needed */}
    </tr>
  </thead>
  <tbody>
    {currentItems.map((blog, index) => (
        <tr className="hover:bg-gray-100">
          <td className="py-2 px-4 border-b text-center">{index+1}</td>
          <td className="py-2 px-4 border-b text-center">{blog.title}</td>
          <td className="py-2 px-4 border-b text-center">

          <Link to={"/editBlog/"+blog._id}>
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
          </Link>

          <button type="button"
          onClick={() => {
            deleteOperation(blog._id);
           
          }}
           class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
           
   
           </td>
    
          {/* Add more table cells as needed */}
        </tr>
    ))}
  </tbody>
</table>
  <div className="flex justify-center mt-4">
    {pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={`mx-1 px-3 py-2 rounded-full ${
          currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ))}
  </div>
</div>

</>

  );
};

export default DisplayBlog;