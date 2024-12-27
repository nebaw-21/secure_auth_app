import React from "react";
import { Link } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { MdOutlineUnsubscribe } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { FaBlog } from "react-icons/fa";
import { MdOutlineEventRepeat } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { BiMessageRoundedDots } from "react-icons/bi";


function AdminPanel(){
    return(
        <div className="border-t m-4">

<div className="flex  gap-4 justify-between flex-wrap mt-3 mx-4" >
<Link to='/displayMembers' >
<div className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Members</h1>
<div className= "text-5xl  text-green-500">
<MdCardMembership />
</div>
</div>
</Link>

<Link to='/displaySubscribe' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Subscriber</h1>
<div className= "text-5xl text-green-500">
<MdOutlineUnsubscribe />
</div>
</div>
</Link>

<Link to='/displayEvent' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Event Management</h1>
<div className= "text-5xl text-green-500">
<MdEvent />
</div>
</div>
</Link>

<Link to='/displayGallery' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Gallery Management</h1>
<div className= "text-5xl text-green-500">
<GrGallery />
</div>
</div>
</Link>


<Link to='/displayBlog' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Blog Management</h1>
<div className= "text-5xl text-green-500">
<FaBlog />
</div>
</div>
</Link>

<Link to='/displayRegisteredEvent' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">posted Events Management</h1>
<div className= "text-5xl text-green-500">
<MdOutlineEventRepeat />
</div>
</div>
</Link>

<Link to='/createEmail' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Email Management</h1>
<div className= "text-5xl text-green-500">
<FaMailBulk />
</div>
</div>
</Link>

<Link to='/displayMessage' >
<div  className=" flex flex-col shadow-2xl  justify-center items-center w-40 sm:w-52 h-44 rounded-lg border-2 border-slate-500">
<h1 className="text-xl text-center  ">Messages </h1>
<div className= "text-5xl text-green-500">
<BiMessageRoundedDots />
</div>
</div>
</Link>

</div>
  
        </div>
    )
}

export default AdminPanel;