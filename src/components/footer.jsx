import React from 'react'

const footer = () => {
  return (
    <div className='flex justify-center items-center gap-10 p-2 bg-gray-100 mt-auto'>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">
            &copy. 2025 InvTrack System Inc. All rights reserved.
            </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">
            Terms of Service
            </p>
        <p className="text-sm text-gray-500">
            Privacy Policy
            </p>
        <p className="text-sm text-gray-500">
            Help Center
            </p>
      </div>
    </div>
  )
}

export default footer
