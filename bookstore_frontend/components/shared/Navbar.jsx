'use client'
import { toggleTheme } from '@/lib/theme/themeSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = ({children}) => {
  const theme = useSelector(state => state.theme.value)
  const dispatch = useDispatch()
  return (
    <nav className='flex w-screen'>
      {children}
      {theme}
      <button onClick={()=>dispatch(toggleTheme())}>Change</button>
    </nav>
  )
}

export default Navbar
