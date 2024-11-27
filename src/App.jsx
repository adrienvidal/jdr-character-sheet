import { useEffect, useState } from 'react'
import localStorageManager from './store/localStorage'
import config from './confs/conf'
import defaultState from './confs/defaultState'

const style = {
  titleH2: 'uppercase font-bold',
  blockA: 'flex justify-between gap-4 border-b-2 min-h-[80px] py-2'
}

function App() {
  const [formData, setFormData] = useState(defaultState)
  const [gameIsSaved, setGameIsSaved] = useState(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    let currentValue

    switch (type) {
      case 'checkbox':
        currentValue = checked
        break

      case 'number':
        currentValue = JSON.parse(value)
        break

      default:
        currentValue = value
        break
    }

    setFormData(prev => {
      const updatedData = { ...prev }

      // Gestion des champs imbriqués pour `save`
      if (name.startsWith('save-')) {
        const key = name
        console.log(key)

        console.log('test', updatedData.save[key])

        updatedData.save[key] = currentValue
      } else if (name.includes('-')) {
        // Autre cas général pour les noms imbriqués
        const keys = name.split('-')
        let ref = updatedData

        for (let i = 0; i < keys.length - 1; i++) {
          const key = isNaN(keys[i]) ? keys[i] : parseInt(keys[i])
          ref = ref[key]
        }

        ref[keys[keys.length - 1]] = currentValue
      } else {
        updatedData[name] = currentValue
      }

      return updatedData
    })
  }

  const handleSave = () => {
    localStorageManager.setItem('jdr-sheet', formData)
    setGameIsSaved(true)
  }

  const handleReset = () => {
    localStorageManager.removeItem('jdr-sheet')
    setGameIsSaved(false)
    setFormData(defaultState)
  }

  const handleListAdd = cat => {
    setFormData(prev => {
      return {
        ...prev,
        [cat]: [
          ...prev[cat],
          {
            name: 'Item',
            desc: 'Desc'
          }
        ]
      }
    })
  }

  const handleListRemove = (index, cat) => {
    setFormData(prev => ({
      ...prev,
      [cat]: prev[cat].filter((_, i) => i !== index)
    }))
  }

  useEffect(() => {
    // get saved data
    const jdrSheet = localStorageManager.getItem('jdr-sheet')
    if (!jdrSheet) return
    setGameIsSaved(true)
    setFormData(jdrSheet)
  }, [])

  console.log('formData', formData)

  return (
    <main className='p-5'>
      <h1 className='text-xl uppercase mb-10'>{config.title}</h1>

      <section className='flex flex-col'>
        {/* lifes */}
        <div className='flex gap-3 border-b-2 min-h-[80px]'>
          {config.lifeCats.map((lifeCat, i) => {
            const { label, id } = lifeCat
            return (
              <div key={i} className={`${i === 0 ? 'border-r-2 pr-2' : ''}`}>
                <h2 className={style.titleH2}>{label}</h2>
                <input
                  type='number'
                  name={id}
                  id={id}
                  value={formData[id]}
                  className='border-2'
                  onChange={handleChange}
                />
              </div>
            )
          })}
        </div>

        {/* traits */}
        {config.traitsCats.map((traitsCat, i) => {
          const { label, id } = traitsCat
          return (
            <div key={i} className={style.blockA}>
              <h2 className={style.titleH2}>{label}</h2>
              <div>
                <input
                  type='number'
                  name={id}
                  id={id}
                  value={formData[id]}
                  className='border-2'
                  onChange={handleChange}
                />
              </div>
            </div>
          )
        })}

        {/* saves */}
        {config.save && (
          <div className={style.blockA}>
            <h2 className={style.titleH2}>{config.save.label}</h2>
            <div>
              {Object.entries(formData.save).map(([key, value]) => (
                <input
                  key={key}
                  type='checkbox'
                  name={key}
                  id={key}
                  checked={value}
                  className='border-2'
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        )}

        {/* weapons */}
        {config.weapons && (
          <div className='relative py-2'>
            <h2 className={style.titleH2}>{config.weapons.label}</h2>
            {formData.weapons.map((weapon, index) => {
              return (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    name={`${config.weapons.id}-${index}-name`}
                    id={`${config.weapons.id}-${index}-name`}
                    value={weapon.name}
                    className='border-2'
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    name={`${config.weapons.id}-${index}-desc`}
                    id={`${config.weapons.id}-${index}-desc`}
                    value={weapon.desc}
                    className='border-2'
                    onChange={handleChange}
                  />
                  <div className='flex justify-center items-center'>
                    <input
                      type='submit'
                      value='-'
                      className='bg-red-400 text-white px-2 rounded-full cursor-pointer'
                      onClick={() => {
                        handleListRemove(index, 'weapons')
                      }}
                    />
                  </div>
                </div>
              )
            })}
            <div className='absolute right-0 top-2'>
              <input
                type='submit'
                value='+'
                className='bg-blue-400 text-white px-3 p-1 rounded-full cursor-pointer'
                onClick={() => handleListAdd('weapons')}
              />
            </div>
          </div>
        )}

        {/* inventary */}
        {config.inventary && (
          <div className='relative py-2'>
            <h2 className={style.titleH2}>{config.inventary.label}</h2>
            {formData.inventary.map((item, index) => {
              return (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    name={`${config.inventary.id}-${index}-name`}
                    id={`${config.inventary.id}-${index}-name`}
                    value={item.name}
                    className='border-2'
                    onChange={handleChange}
                  />
                  <input
                    type='text'
                    name={`${config.inventary.id}-${index}-desc`}
                    id={`${config.inventary.id}-${index}-desc`}
                    value={item.desc}
                    className='border-2'
                    onChange={handleChange}
                  />
                  <div className='flex justify-center items-center'>
                    <input
                      type='submit'
                      value='-'
                      className='bg-red-400 text-white px-2 rounded-full cursor-pointer'
                      onClick={() => {
                        handleListRemove(index, 'inventary')
                      }}
                    />
                  </div>
                </div>
              )
            })}
            <div className='absolute right-0 top-2'>
              <input
                type='submit'
                value='+'
                className='bg-blue-400 text-white px-3 p-1 rounded-full cursor-pointer'
                onClick={() => handleListAdd('inventary')}
              />
            </div>
          </div>
        )}

        {/* ctas */}
        <div className='flex justify-between mt-5'>
          <input
            type='submit'
            value='Reset'
            className='bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer'
            onClick={handleReset}
          />
          <input
            type='submit'
            value={`${gameIsSaved ? 'Saved' : 'Save'}`}
            className='bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer'
            onClick={handleSave}
          />
        </div>
      </section>
    </main>
  )
}

export default App
