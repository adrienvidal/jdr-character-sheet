import React from 'react'

const Modal = ({ title, children, onClose, onYes }) => {
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      {/* Modal container */}
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-5'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-600 hover:text-gray-800 focus:outline-none'
          >
            ✖
          </button>
        </div>

        {/* Content */}
        <div className='mb-4'>{children}</div>

        {/* Footer */}
        {onYes ? (
          <div className='flex justify-between'>
            <button
              onClick={onClose}
              className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
            >
              No
            </button>
            <button
              onClick={onYes}
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
            >
              Yes
            </button>
          </div>
        ) : (
          <div className='text-right'>
            <button
              onClick={onClose}
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
