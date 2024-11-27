let min = 0
let max = 1000
let step = 1

const NumberInput = ({ id, value, handleStateChange }) => {
  const increment = () => {
    const newValue = Math.min(value + step, max)
    handleStateChange({ target: { name: id, value: newValue, type: 'number' } })
  }

  const decrement = () => {
    const newValue = Math.max(value - step, min)
    handleStateChange({ target: { name: id, value: newValue, type: 'number' } })
  }

  return (
    <div className='flex items-center gap-2'>
      {/* Bouton de décrémentation */}
      <button
        onClick={decrement}
        className='bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400'
      >
        -
      </button>

      {/* Champ de saisie */}
      <input
        type='number'
        id={id}
        name={id}
        value={value}
        onChange={handleStateChange}
        className='w-20 text-center border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />

      {/* Bouton d'incrémentation */}
      <button
        onClick={increment}
        className='bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400'
      >
        +
      </button>
    </div>
  )
}

export default NumberInput
