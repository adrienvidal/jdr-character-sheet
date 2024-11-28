import { useEffect, useState } from 'react'
import localStorageManager from './store/localStorage'
import config from './confs/conf'
import defaultState from './confs/defaultState'
import Input from './components/Input'
import Checkbox from './components/Checkbox'
import Label from './components/Label'
import SuccessToast from './components/SuccessToast'
import NumberInput from './components/Number'
import TextAreaBlock from './components/TextAreaBlock'
import BottomNav from './components/BottomNav'
import Modal from './components/Modal'
import RollDice from './components/RollDice'
import ButtonAdd from './components/Buttons'

const style = {
  blockA: 'border-b-2 py-2'
}

function App() {
  const [formData, setFormData] = useState(defaultState)
  const [gameIsSaved, setGameIsSaved] = useState(false)
  const [displayAlert, setDisplayAlert] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    let currentValue

    switch (type) {
      case 'checkbox':
        currentValue = checked
        break

      case 'number':
        console.log('test', value)

        currentValue = value ? JSON.parse(value) : ''
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
    setDisplayAlert(true)
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

  const handleRoll = () => {
    setDisplayModal(true)
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
      {displayAlert && <SuccessToast setDisplayAlert={setDisplayAlert} />}

      <h1 className='text-xl uppercase mb-10'>{config.title}</h1>

      <section className='flex flex-col pb-20'>
        {/* lifes */}
        <div className='flex flex-col md:flex-row gap-3 border-b-2 pb-3 md:min-h-[80px]'>
          {config.lifeCats.map((lifeCat, i) => {
            const { label, id } = lifeCat
            return (
              <div
                key={i}
                className={`flex flex-col justify-center gap-3 ${
                  i === 0 ? 'md:border-r-2 pr-2' : ''
                }`}
              >
                <Label title={label} />
                <div className='w-[80px]'>
                  <NumberInput
                    id={id}
                    value={formData[id]}
                    handleStateChange={handleChange}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* traits */}
        {config.traitsCats.map((traitsCat, i) => {
          const { label, id } = traitsCat
          return (
            <div key={i} className={style.blockA}>
              <Label title={label} />
              <div>
                <NumberInput
                  id={id}
                  value={formData[id]}
                  handleStateChange={handleChange}
                />
              </div>
            </div>
          )
        })}

        {/* saves */}
        {config.save && (
          <div className={style.blockA}>
            <Label title={config.save.label} />

            <div className='flex gap-3'>
              {Object.entries(formData.save).map(([key, value]) => (
                <div key={key}>
                  <Checkbox
                    type='checkbox'
                    id={key}
                    checked={value}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* weapons */}
        {config.weapons && (
          <div className='relative py-2'>
            <Label title={config.weapons.label} />

            <div className='flex flex-col gap-5'>
              {formData.weapons.map((weapon, index) => {
                return (
                  <div key={index} className='flex gap-2'>
                    <div>
                      <Input
                        type='text'
                        id={`${config.weapons.id}-${index}-name`}
                        value={weapon.name}
                        onChange={handleChange}
                      />
                      <TextAreaBlock
                        id={`${config.weapons.id}-${index}-desc`}
                        value={weapon.desc}
                        onChange={handleChange}
                      />
                    </div>
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
            </div>
            <div className=''>
              <ButtonAdd handleClick={() => handleListAdd('weapons')} />
            </div>
          </div>
        )}

        {/* inventary */}
        {config.inventary && (
          <div className='relative py-2'>
            <Label title={config.inventary.label} />

            <div className='flex flex-col gap-5'>
              {formData.inventary.map((item, index) => {
                return (
                  <div key={index} className='flex gap-2'>
                    <div>
                      <Input
                        type='text'
                        id={`${config.inventary.id}-${index}-name`}
                        value={item.name}
                        onChange={handleChange}
                      />
                      <TextAreaBlock
                        id={`${config.inventary.id}-${index}-desc`}
                        value={item.desc}
                        onChange={handleChange}
                      />
                    </div>
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
            </div>
            <div className=''>
              <ButtonAdd handleClick={() => handleListAdd('inventary')} />
            </div>
          </div>
        )}

        {displayModal && (
          <Modal
            title='Roll Dices'
            onClose={() => {
              setDisplayModal(false)
            }}
          >
            <RollDice />
          </Modal>
        )}

        {/* bottom nav */}
        <BottomNav
          handleReset={handleReset}
          handleRoll={handleRoll}
          handleSave={handleSave}
          gameIsSaved={gameIsSaved}
        />
      </section>
    </main>
  )
}

export default App
