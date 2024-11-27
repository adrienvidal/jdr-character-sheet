const Checkbox = ({ id, checked, onChange }) => {
  return (
    <div className='relative'>
      <input type='checkbox' id={id} name={id} checked={checked} onChange={onChange} />
    </div>
  )
}

export default Checkbox
