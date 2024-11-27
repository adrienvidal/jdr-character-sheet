const TextAreaBlock = ({ id, value, onChange }) => {
  return (
    <textarea
      rows='2'
      placeholder='Default textarea'
      className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 p-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
      id={id}
      name={id}
      value={value}
      onChange={onChange}
    />
  )
}

export default TextAreaBlock
