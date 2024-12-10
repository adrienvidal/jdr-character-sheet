import React, { useState } from 'react'
import Checkbox from './Checkbox'

export default function RollDice() {
  const [result, setResult] = useState({
    'dice-1': null,
    'dice-2': null
  })
  const [rollConf, setRollConf] = useState({
    dexterity: false,
    ennemis: false
  })

  const rollDice = id => {
    const { dexterity, ennemis } = rollConf
    const randomNumber = Math.floor(Math.random() * 6) + 1
    const randomNumber2 = Math.floor(Math.random() * 6) + 1

    let finalNumber
    if (dexterity) {
      finalNumber = randomNumber <= randomNumber2 ? randomNumber : randomNumber2
    } else if (ennemis) {
      finalNumber = randomNumber
    } else {
      finalNumber = randomNumber >= randomNumber2 ? randomNumber : randomNumber2
    }

    setResult(prev => {
      return { ...prev, [`dice-${id}`]: finalNumber }
    })
  }

  const handleCheckboxChange = e => {
    const { id, checked } = e.target

    setRollConf(old => {
      return { ...old, [id]: checked }
    })
  }

  return (
    <div>
      <div className='flex justify-between items-center gap-3'>
        <div className='flex items-center gap-3'>
        <label className='block text-sm uppercase font-bold'>Dexterité</label>
          <Checkbox
            id='dexterity'
            checked={rollConf.dexterity}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className='flex items-center gap-3'>
          <label className='block text-sm uppercase font-bold'>Ennemis</label>
          <Checkbox
            id='ennemis'
            checked={rollConf.ennemis}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div className='flex items-center justify-center'>
        {Object.entries(result).map(([key, value], i) => (
          <div
            key={key}
            className='flex flex-col items-center justify-center p-5 space-y-4'
          >
            {/* Dice Result */}
            <div
              className={`w-20 h-20 flex items-center justify-center text-white font-bold text-3xl rounded-lg
              ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              {value || '?'}
            </div>
            {/* Roll Button */}
            <button
              onClick={() => {
                rollDice(i + 1)
              }}
              className='bg-green-500 text-white px-6 py-2 rounded-md text-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400'
            >
              Roll
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
