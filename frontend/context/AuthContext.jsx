'use client'
import { BackendUrl } from '@/utils/BackendUrl'
import React, { createContext, useEffect, useState } from 'react'
export const UserAuthContext = createContext()


export default function AuthContext({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()

    const handleVerify =async()=>{
        try{
            const response = await fetch(`${BackendUrl}/register/profile`, {
                method: 'GET',
                credentials: 'include'
            })
            const result = await response.json()
            if(response.status ==200){
                setIsAuthenticated(true)
                setUser(result.user)
            }else{
                setIsAuthenticated(false)
            }
        }catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        handleVerify()
    },[isAuthenticated])
  return (
    <UserAuthContext.Provider value={{loading, setLoading ,isAuthenticated, setIsAuthenticated, user, setUser}}>
        {children}
    </UserAuthContext.Provider>
  )
}
