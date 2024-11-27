const Input = ({ type = 'text', id, value, onChange }) => {
  return (
    <input
      type={type}
      name={id}
      id={id}
      value={value}
      onChange={onChange}
      className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
    />
  )
}

export default Input
