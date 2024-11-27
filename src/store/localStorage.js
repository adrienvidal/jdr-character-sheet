class LocalStorageManager {
  constructor(prefix = '') {
    this.prefix = prefix // Un préfixe pour éviter les conflits de clés
  }

  // Méthode pour obtenir une clé avec le préfixe
  _getKey(key) {
    return `${this.prefix}${key}`
  }

  // Enregistre une valeur dans le localStorage
  setItem(key, value) {
    const fullKey = this._getKey(key)
    const serializedValue = JSON.stringify(value) // Sérialiser les données pour les stocker
    localStorage.setItem(fullKey, serializedValue)
  }

  // Récupère une valeur depuis le localStorage
  getItem(key) {
    const fullKey = this._getKey(key)
    const serializedValue = localStorage.getItem(fullKey)
    try {
      return serializedValue ? JSON.parse(serializedValue) : null // Désérialiser les données
    } catch (error) {
      console.error(`Erreur lors de la désérialisation de la clé "${fullKey}":`, error)
      return null
    }
  }

  // Supprime une clé du localStorage
  removeItem(key) {
    const fullKey = this._getKey(key)
    localStorage.removeItem(fullKey)
  }

  // Vérifie si une clé existe
  hasItem(key) {
    const fullKey = this._getKey(key)
    return localStorage.getItem(fullKey) !== null
  }

  // Supprime toutes les clés associées à ce préfixe
  clear() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key)
      }
    })
  }
}

const localStorageManager = new LocalStorageManager()
export default localStorageManager
