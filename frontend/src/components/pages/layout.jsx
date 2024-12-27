import Navbar from "../commons/navbar";
import { Outlet, useLocation} from "react-router-dom";
import Footer from "../commons/footer";

const Layout = () => {

  return (
    <div id="app" className="relative font-Poppins flex flex-col items-center">
       <Navbar />

      <Outlet />
      
      <Footer />
    </div>

  )
}

export default Layout;