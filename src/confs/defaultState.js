const defaultState = {
  maxLife: 20,
  currentLife: 20,
  dex: 0,
  luck: 0,
  skill: '',
  save: {
    'save-0': false,
    'save-1': false,
    'save-2': false
  },
  weapons: [
    {
      name: 'Epée',
      desc: 'Magique'
    },
  ],
  inventary: [
    {
      name: 'Potion',
      desc: 'Soin'
    },
  ]
}

export default defaultState
