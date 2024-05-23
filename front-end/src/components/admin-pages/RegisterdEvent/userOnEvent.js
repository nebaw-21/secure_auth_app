import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { APP_URL } from '../../../config';
import { FaArrowLeft } from "react-icons/fa";


const UserONEvent = () => {
  const itemsPerPage = 10;
  const {eventId} = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [userInformation, setUserInformation] = useState([]);
  const [loading , setLoading] = useState(false);

const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/registerForEvent/users/${eventId}`);
        const result = response.data;
        setUserInformation(result);
        setLoading(false);
      } catch (error) {
       
      }
    };

    fetchData();
  }, [eventId]);


  // Calculate pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  let currentItems;
  if (data && data.length > 0) {
    currentItems = data.slice(firstIndex, lastIndex);
  } else {
    currentItems = userInformation.slice(firstIndex, lastIndex);
  }
  

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userInformation.length / itemsPerPage); i++) {
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
<Link to='/displayRegisteredEvent'>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><FaArrowLeft /></button>
</Link>

</div>
<table className="min-w-full bg-white border border-gray-200">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b">No</th>
      <th className="py-2 px-4 border-b">First Name</th>
      <th className="py-2 px-4 border-b">Last Name</th>
      <th className="py-2 px-4 border-b">Phone</th>
      <th className="py-2 px-4 border-b">email</th>
      {/* Add more table headers as needed */}
    </tr>
  </thead>
  <tbody>
    {currentItems.map((user, index) => (
        <tr className="hover:bg-gray-100">
          <td className="py-2 px-4 border-b text-center">{index+1}</td>
          <td className="py-2 px-4 border-b text-center">{user?.fname}</td>
          <td className="py-2 px-4 border-b text-center">{user?.lname}</td>
          <td className="py-2 px-4 border-b text-center">{user?.phone}</td>
          <td className="py-2 px-4 border-b text-center">{user?.email}</td>
    
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

export default UserONEvent;