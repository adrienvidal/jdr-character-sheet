const config = {
  title: 'Feuille de personnage',
  lifeCats: [
    { label: 'Points de vie maximum', id: 'maxLife' },
    { label: 'Points de vie actuels', id: 'currentLife' }
  ],
  traitsCats: [
    { label: 'Dextérité', id: 'dex', type: 'number' },
    { label: 'Chance', id: 'luck', type: 'number' },
    { label: 'Talent', id: 'skill', type: 'text' }
  ],
  save: { label: 'Sauvegarde', id: 'save' },
  weapons: { label: 'Armes et spécificités', id: 'weapons' },
  inventary: { label: 'Inventaire', id: 'inventary' }
}

export default config
