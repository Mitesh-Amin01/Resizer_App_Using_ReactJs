import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../asset/logo.svg'

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between w-full items-center p-4 sticky bg-emerald-900 text-emerald-100">
        <div className='w-16'>
          <img src={Logo} alt="" srcset=""/>
        </div>
        <div>
          <Link className="px-4 text-xl" to="/">Home</Link>
          <Link className="px-4 text-xl" to="/about">About</Link>
        </div>
      </nav>
    </>
  )
}
