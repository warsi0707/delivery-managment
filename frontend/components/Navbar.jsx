'use client'
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from "react";
import { UserAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const [handleMenu, setHandleMenu] = useState(false)
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(UserAuthContext)
  console.log(user)
  console.log(isAuthenticated)

  const handleLogout =()=>{
    try{
      const token = localStorage.getItem('token')
      if(token){
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        toast.success("Logout")
      }
    }catch(error){
      toast.error("Failed")
    }
  }

  return (
    <>
    <div className="w-full p-8 bg-gray-300 flex items-center text-center justify-between border-b shadow-md">
      <div>
        <Link href={"/"} className=" flex items-end text-center gap-2 text-xl"><p className="text-3xl"><TbTruckDelivery/></p> <p>Dashboard</p></Link>
      </div>
      <div className="hidden md:flex items-center gap-5">
        {user && user.user.role === 'ADMIN' &&
        <Link href={"/create-order"}>Create-Order</Link>}
        {isAuthenticated == true? 
        <button className="cursor-pointer" onClick={handleLogout}>Logout</button>:  
        <>
        <Link href={"/signin"}>Signin</Link>
        <Link href={"/signup"}>Signup</Link>
        </>
      }
        
        
      </div>
      <div className="md:hidden text-2xl items-center text-center mt-2">
        {handleMenu? <button onClick={()=> setHandleMenu(!handleMenu)} className="cursor-pointer"><RxCross1/></button >:<button className="cursor-pointer" onClick={()=> setHandleMenu(!handleMenu)}><FaBars/></button>}
      </div>
    </div>
    {handleMenu && 
    <div className="md:hidden min-h-screen w-1/2 bg-red-300 fixed top-0 right-0 p-3 py-10">
      <div className="flex justify-between items-center text-2xl">
        <p>Dashboard</p>
        <button onClick={()=> setHandleMenu(!handleMenu)} className="text-2xl font-bold cursor-pointer"><RxCross1/></button>
      </div>
    </div>
    
    }
    </>
    
  )
}
