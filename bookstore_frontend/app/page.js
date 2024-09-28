'use client'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const theme = useSelector(state => state.theme.value)
  return (
    <div className={` ${theme == 'dark' ? "bg-zinc-900 text-white" : "bg-gradient-to-r from-transparent to-zinc-300/50 " } flex-1`}>
      HomePage
    </div>
  )
}

export default page
