import React from 'react'

export default function ErrorPage() {
  return (
    <div className="bg-orange-50 flex justify-center items-center h-102 flex-col font-bold"><h1 className='text-8xl mb-5'>404</h1>
    <p className='font-bold text-2xl mb-5'>Not Found</p>
    <p className='text-xl'>the requested resource could not be found on this server</p></div>
  )
}
