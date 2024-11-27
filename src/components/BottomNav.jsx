import React from 'react'

export default function BottomNav({ handleReset, handleRoll, handleSave, gameIsSaved }) {
  return (
    <div className='flex justify-between bg-white fixed bottom-0 left-0 right-0 p-3'>
      <input
        type='submit'
        value='Reset'
        className='bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={handleReset}
      />
      <input
        type='submit'
        value='Roll Dices'
        className='bg-amber-950 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={handleRoll}
      />
      <input
        type='submit'
        value={`${gameIsSaved ? 'Saved' : 'Save'}`}
        className='bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={handleSave}
      />
    </div>
  )
}
