'use client'

import { Toaster } from "react-hot-toast"

export default function ToastProvide({children}) {
  return (
    <Toaster position="top-right"/>
  )
}
