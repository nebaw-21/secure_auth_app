import logo from "../../assets/plogging-logo.png";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useState} from "react";
import { APP_URL } from "../../config";

const Navbar = ()=>{

  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname)
  const [user, setUser] = useState(null); // State to hold user information


  useEffect(() => {
    // Function to fetch logged-in user data
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
       
          const response = await axios.get(`${APP_URL}/user/getUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
              // Other headers if required
            },
          });
          setUser(response.data.data); // Set the user state with fetched user data
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the fetchUser function when component mounts
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect the user to the home page
    window.location.href = '/';
  };


  return (
    <section
      className="flex justify-between w-full items-center md:px-10 px-5 py-4"
    >
      <Link to={'/'}>
      <img className="w-[100px] h-[100px] rounded-full" src={logo} alt={"plogging ethiopia logo"} />
      </Link>

      <nav className="md:grid hidden w-2/3">
        <ul className="flex gap-10 justify-center w-full">
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/"}>
              Home
            </Link>
            {
              location.pathname === "/"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <a href={"/#aboutus"}>
              About us
            </a>
            {
              location.pathname === "/about"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          {!user && (
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to="/membership">
              Membership
            </Link>
            {
              location.pathname === "/membership"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>

          )

          }
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/gallery"}>
              Gallery
            </Link>
            {
              location.pathname === "/gallery"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/blog"}>
              Blog
            </Link>
            {
              location.pathname === "/blog"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>

          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/event"}>
              Event
            </Link>
            {
              location.pathname === "/event"
              ?
              <span className="w-full rounded-full h-[5px] bg-green-500"></span>
              :
              ""
            }
          </li>

          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link to={"/contact"}>
              Contact
            </Link>
              {
                location.pathname === "/contact"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
              }
          </li>
          {!user ? (
    <li className="w-fit flex flex-col hover:text-green-500">
      <Link to="/login">Login</Link>
      {location.pathname === "/login" && (
        <span className="w-full rounded-full h-[5px] bg-green-500"></span>
      )}
    </li>
  ) : (
    <>
    <li   onClick={() => {
          if (user?.is_admin) {
            navigate('/admin');
          }
        }} className={`flex items-center mt-0 mb-6  ${
          user?.is_admin ? 'hover:text-green-500 cursor-pointer' : ''
        }`}>
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
      {user.fname}
      
    </li>
    
  <li className="ml-7 -mt-2.5">
  <button onClick={handleLogout} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
  </li>

    </>

  )
}
        </ul>
      </nav>

      <nav
        style={{
          display: show ? "grid" : "none"
        }}
        className="md:hidden w-full absolute z-20 h-screen bg-white top-0 left-0 grid place-items-center">
        <ul className="flex md:flex-row flex-col items-center gap-10 justify-center w-full">
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Home
            </Link>
            {
              location.pathname === "/"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <a
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
              href={"/#aboutus"}>
              About us
            </a>
            {
              location.pathname === "/about"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
      {!user && (
            <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to="/membership"
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Membership
            </Link>
            {
              location.pathname === "/membership"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
      )}
          <li className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/gallery"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Gallery
            </Link>
            {
              location.pathname === "/gallery"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/blog"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Blog
            </Link>
            {
              location.pathname === "/blog"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>

          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/event"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Event
            </Link>
            {
              location.pathname === "/event"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>

          <li  className="w-fit flex flex-col hover:text-green-500">
            <Link
              to={"/contact"}
              onClick={
                ()=>{
                  setShow(!show)
                }
              }
            >
              Contacts
            </Link>
            {
              location.pathname === "/contact"
                ?
                <span className="w-full rounded-full h-[5px] bg-green-500"></span>
                :
                ""
            }
          </li>
       {!user ? (
           <li  className="w-fit flex flex-col hover:text-green-500">
           <Link
             to={"/login"}
             onClick={
               ()=>{
                 setShow(!show)
               }
             }
           >
             Login
           </Link>
           {
             location.pathname === "/login"
               ?
               <span className="w-full rounded-full h-[5px] bg-green-500"></span>
               :
               ""
           }
         </li>
       ):(
        <>
        <li   onClick={() => {
              if (user?.is_admin) {
                navigate('/admin');
              }
            }} className={`flex items-center mt-0 mb-6  ${
              user?.is_admin ? 'hover:text-green-500 cursor-pointer' : ''
            }`}>
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          {user.fname}
          
        </li>
        
      <li className="ml-7 -mt-2.5">
      <button onClick={handleLogout} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
      </li>
    
        </>
       )}
        </ul>
      </nav>

      <button
        onClick={
          ()=>{
            setShow(!show)
          }
        }
        className="flex flex-col gap-1 z-20 md:hidden">
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
        <span className="w-[40px] h-[8px] bg-green-500 rounded-full"></span>
      </button>

    </section>
  )
}

export default Navbar;