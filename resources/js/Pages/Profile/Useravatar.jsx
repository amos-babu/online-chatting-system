import React from 'react'

const Useravatar = ({ userName }) => {
    const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';

  return (
    <>
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
             {firstLetter}
        </div>
    </>

  )
}

export default Useravatar
