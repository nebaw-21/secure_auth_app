import { Link,useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { APP_URL } from "../../../config";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


function EditMember() {

const navigate = useNavigate();
const {id} = useParams();
const [loading, setLoading] = useState(true);
const [fname, setFirstName] = useState('');
const [lname, setLastName] = useState('');
const [email, setEmail] = useState('');
const [is_admin, setIsAdmin] = useState('');
const [phone, setPhone] = useState('');
const [errors, setErrors] = useState({});

const [isToggled, setIsToggled] = useState();


const toggle = (e) => {
    e.preventDefault();
    setIsToggled(!isToggled);
    setIsAdmin(isToggled ? 0 : 1);
  };

const handleFirstNameChange = (e)=>{
    const newFirstName = e.target.value.trim();
    setFirstName(newFirstName);
}

const handleLastNameChange = (e)=>{
    const newLastName = e.target.value.trim();
    setLastName(newLastName);
}

const handleEmailChange = (e)=>{
    const newEmail = e.target.value.trim();
    setEmail(newEmail);
}

const handlePhoneChange = (e)=>{
    const newPhone = e.target.value.trim();
    setPhone(newPhone);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/user/${id}`);
        const result = response.data;
        setFirstName(result.fname);
        setIsAdmin(result.is_admin);
        setIsToggled(result.is_admin);
        setLastName(result.lname);
        setEmail(result.email);
        setPhone(result.phone);
        setLoading(false);

      } catch (error) {
      
      }
    };

    fetchData();
  }, [id]);


const handleSubmit = (e)=>{
    e.preventDefault();
    axios.put(`${APP_URL}/user/${id}`, {fname,lname ,email,phone, is_admin})
    .then((response)=>{
        if(response.status===200){ 
        navigate('/displayMembers');
        }else{
            throw new Error('Invalid credentials');
        }
    })
    .catch((error)=>{
        
    })

}

if(loading){
return(
<h1>Loading...</h1>
)
}
    return (

<div  className=" h-full flex flex-col   ">
<Link to='/displayMembers' className='ml-3'>
<button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"><FaArrowLeft /></button>
</Link>

<form className=" grid grid-rows-4 mb-5 sm:grid-row-8 sm:grid-cols-2 gap-3 sm:gap-x-20 p-3 bg-gray-200 shadow-2xl rounded-lg">
<div className="text-center text-lg font-semibold sm:col-span-2">
</div>   

<div>
<label for="first name" className="font-bold">First Name</label>
<input
type="text"
value={fname}
onChange={handleFirstNameChange}
className="w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
placeholder="Enter First Name"
/>
{errors.firstName && (
    <div className="text-red-500 mt-1">*{errors.firstName}</div>
    
  )}
</div>

<div>
<label for="last name" className="font-bold">Last Name</label>
<input
type="text"
value={lname}
onChange={handleLastNameChange}
className="w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
placeholder="Enter Last Name"
/>
{errors.lastName && (
    <div className="text-red-500 mt-1">*{errors.lastName}</div>
  )}
</div>

<div>
<label for="email" className="font-bold">Email</label>
<input
type="email"
value={email}
onChange={handleEmailChange}
className="w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
placeholder="Enter email"
/>
{errors.email && (
    <div className="text-red-500 mt-1">*{errors.email}</div>
  )}
</div>

<div>
<label for="phone" className="font-bold">Phone</label>
<input
type="text"
value={phone}
onChange={handlePhoneChange}
className="w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
placeholder="Enter Phone"
/>
{errors.phone && (
    <div className="text-red-500 mt-1">*{errors.phone}</div>
  )}
</div>

<div>
<label  className="font-bold text-base -mt-2 mr-3">Admin</label>
<button
className={`w-12 h-6 rounded-full ${
  isToggled  ? 'bg-green-500' : 'bg-gray-300'
} focus:outline-none`}
onClick={toggle}
>
<span
  className={`block w-4 h-4 rounded-full ${
    isToggled ? 'transform translate-x-6' : ''
  } bg-white shadow`}
  
></span>
</button>
</div>


<div className=" sm:px-20 md:px-44 lg:px-80 sm:col-span-2">
<button
type="submit"
onClick={handleSubmit}
className="block w-full rounded-lg  px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
>
Edit user
</button>

</div>

<div className="sm:px-20 md:px-44 lg:px-80 sm:col-span-2">

</div>

</form>


</div>
     
    );
  }

  
  export default EditMember;
  