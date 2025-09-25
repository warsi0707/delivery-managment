'use client'
import LogInInput from '@/components/LogInInput'
import { UserAuthContext } from '@/context/AuthContext'
import { BackendUrl } from '@/utils/BackendUrl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useRef } from 'react'
import toast from 'react-hot-toast'

export default function SignUp() {
  const usernameRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const confirmPassRef = useRef('')
  const {loading, setLoading} = useContext(UserAuthContext)
  const router = useRouter()

  const handleSignUp =async(e)=>{
    e.preventDefault()
    setLoading(true)

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPassRef.current.value;
    try{
      const response = await fetch(`${BackendUrl}/register/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, email, confirmPassword})
      })
      const result =await response.json()
      if(response.status ==201){
        router.push("/signin")
        setLoading(false)
        toast.success(result.message)
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
            <h1  className="text-5xl font-semibold">Register</h1>
          </div>
          <div className="flex flex-col gap-2">
            <LogInInput ref={usernameRef} label={"Username"} placeholder={"admin"} type={'text'}/>
           <LogInInput ref={emailRef} label={"Email"} placeholder={"john@gamil.com"} type={'email'}/>
           <LogInInput ref={passwordRef} label={"Password"} placeholder={"john@123"} type={'Password'}/>
           <LogInInput ref={confirmPassRef} label={"Confirm Password"} placeholder={"john@123"} type={'Password'}/>
          </div>
            <button onClick={handleSignUp}  className='bg-black w-full p-3 text-xl text-white rounded-full cursor-pointer'>{loading == true? "Loading...": "Register"}</button>
          <div className='mx-auto text-center'><p className="  px-4 ">Already have an account? <Link href={"/signin"} className=' underline'>Signin</Link></p></div>
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
