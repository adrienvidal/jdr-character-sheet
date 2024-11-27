const defaultState = {
  maxLife: 100,
  currentLife: 50,
  dex: 10,
  luck: 5,
  skill: 8,
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
    {
      name: 'Couteau',
      desc: 'Coupant'
    }
  ],
  inventary: [
    {
      name: 'Potion',
      desc: 'Soin'
    },
    {
      name: 'Cape',
      desc: 'Armure'
    }
  ]
}

export default defaultState
