import './App.css';
import Landing from "./components/pages/landing";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/pages/layout";
import Membership from "./components/pages/membership";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_URL } from './config';
import Blog from "./components/pages/Blog/blog";
import Gallery from "./components/pages/gallery";
import Contactus from "./components/pages/contactus";
import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./components/pages/profile";
import Login from "./components/pages/login";
import BlogDetail from './components/pages/Blog/BlogDetail';
import Event from './components/pages/Event/Event';
import EventDetail from './components/pages/Event/EventDetail';
import AdminPanel from "./components/admin-pages/admin";
import DisplayMembers from './components/admin-pages/member/displayMembers';
import EditMembers from './components/admin-pages/member/editMember';
import DisplaySubscriber from "./components/admin-pages/subscriber/displaySubscriber";
import DisplayEvent from './components/admin-pages/Event/displayEvent';
import CreateEvent from "./components/admin-pages/Event/createEvent";
import EditEvent from "./components/admin-pages/Event/editEvent";
import DisplayGallery from "./components/admin-pages/Gallery/displayGallery";
import CreateGallery from './components/admin-pages/Gallery/createGallery';
import EditGallery from "./components/admin-pages/Gallery/editGallery";
import DisplayBlog from "./components/admin-pages/Blog/displayBlog";
import CreateBlog from './components/admin-pages/Blog/createBlog';
import EditBlog from "./components/admin-pages/Blog/editBlog";
import DisplayRegisterdEvent from "./components/admin-pages/RegisterdEvent/displayEvent";
import UserOnEvent from './components/admin-pages/RegisterdEvent/userOnEvent';
import CreateEmail from './components/admin-pages/Email/createEmail';
import DisplayMessage from "./components/admin-pages/ContactUs/displayMessage";
import ViewMessage from './components/admin-pages/ContactUs/viewMessage';
import NotFound from './components/commons/notFound';

function App() {
  const queryClient = new QueryClient();
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

  // Protected Route component for logged-in users
  const ProtectedRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Admin Route component for admin users
  const AdminRoute = ({ children }) => {
    if (!user || !user.is_admin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              {user ? (
                <>
                  {/* Hide login and membership pages for logged-in users */}
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/login" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
                  <Route path="/membership" element={<ProtectedRoute><Login /></ProtectedRoute>} />
                </>
              ) : (
                <>
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/login" element={<Login />} />
                </>
              )}
              <Route path="/blog" element={<Blog />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/blogDetail/:blogId" element={<BlogDetail />} />
              <Route path="/eventDetail/:eventId" element={<EventDetail />} />
              <Route path="/event" element={<Event />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path="/displayMembers" element={<AdminRoute><DisplayMembers /></AdminRoute>} />
              <Route path="/editMembers/:id" element={<AdminRoute><EditMembers /></AdminRoute>} />
              <Route path="/displaySubscribe" element={<AdminRoute><DisplaySubscriber /></AdminRoute>} />
              <Route path="/displayEvent" element={<AdminRoute><DisplayEvent /></AdminRoute>} />
              <Route path="/createEvent" element={<AdminRoute><CreateEvent /></AdminRoute>} />
              <Route path="/editEvent/:eventId" element={<AdminRoute><EditEvent /></AdminRoute>} />
              <Route path="/displayGallery" element={<AdminRoute><DisplayGallery /></AdminRoute>} />
              <Route path="/createGallery" element={<AdminRoute><CreateGallery /></AdminRoute>} />
              <Route path="/editGallery/:galleryId" element={<AdminRoute><EditGallery /></AdminRoute>} />
              <Route path="/displayBlog" element={<AdminRoute><DisplayBlog /></AdminRoute>} />
              <Route path="/createBlog" element={<AdminRoute><CreateBlog /></AdminRoute>} />
              <Route path="/editBlog/:blogId" element={<AdminRoute><EditBlog /></AdminRoute>} />
              <Route path="/displayRegisteredEvent" element={<AdminRoute><DisplayRegisterdEvent /></AdminRoute>} />
              <Route path="/userOnEvent/:eventId" element={<AdminRoute><UserOnEvent /></AdminRoute>} />
              <Route path="/createEmail" element={<AdminRoute><CreateEmail /></AdminRoute>} />
              <Route path="/displayMessage" element={<AdminRoute><DisplayMessage /></AdminRoute>} />
              <Route path="/viewMessage/:messageId" element={<AdminRoute><ViewMessage /></AdminRoute>} />

              {/* Catch-All Route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
