'use client'
import LogInInput from '@/components/LogInInput'
import { UserAuthContext } from '@/context/AuthContext'
import { BackendUrl } from '@/utils/BackendUrl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'
import toast from 'react-hot-toast'

export default function SignIn() {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const router = useRouter()
  const {isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(UserAuthContext)

  const handleSignin =async(e)=>{
    e.preventDefault()
    setLoading(true)
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try{
      const response = await fetch(`${BackendUrl}/register/signin`, {
        method :'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      const result = await response.json()
      if(response.status == 200){
        setLoading(false)
        router.push("/")
        toast.success(result.message)
        localStorage.setItem('token',result.token)
        setIsAuthenticated(true)
      }else{
        toast.error(result.error)
        setLoading(false)
      }
    }catch(error){
      setLoading(false)
      toast.error("Failed")
    }
  }
  return (
    <div className="min-h-screen w-full flex justify-between gap-10 md:p-20 pr-0">
      <div className=" w-full flex flex-col justify-center items-center h-screen pb-10">
        <div className="w-96 space-y-10">
          <div className="flex justify-center items-center">
            <h1  className="text-5xl font-semibold">Log In</h1>
          </div>
          <div className="flex flex-col gap-2">
           <LogInInput ref={emailRef} label={"Email"} placeholder={"john@gamil.com"} type={'text'}/>
           <LogInInput ref={passwordRef}  label={"Password"} placeholder={"john@123"} type={'Password'}/>
          </div>
          <button onClick={handleSignin} className='bg-black w-full p-3 text-xl text-white rounded-full cursor-pointer'>{loading == true ? "Loading...": "Signin"}</button>
          <div className='mx-auto text-center'><p className="  px-4 ">New account? <Link href={"/signup"} className=' underline'>Signup</Link></p></div>
          <div>
          </div>
        </div>
      </div>
      <div className=" w-full h-screen hidden md:flex">
        <img src="/sign.png" className="w-full h-full rounded-3xl pb-52" alt="" />
      </div>
    </div>
  )
}
