import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types'

export const usePreferencesStore = defineStore('settings', () => {
  const soundEnabled = ref(true)
  const selectedDecks = ref<Category[]>([])
  const isLoaded = ref(false)
  
  // Load from localStorage
  function loadPreferences() {
    try {
      const saved = localStorage.getItem('drinking-game-prefs')
      if (saved) {
        const prefs = JSON.parse(saved)
        soundEnabled.value = prefs.soundEnabled ?? true
        selectedDecks.value = prefs.selectedDecks ?? []
      }
      isLoaded.value = true
    } catch (e) {
      console.warn('Could not load preferences:', e)
      isLoaded.value = true
    }
  }
  
  // Save to localStorage
  function savePreferences() {
    try {
      localStorage.setItem('drinking-game-prefs', JSON.stringify({
        soundEnabled: soundEnabled.value,
        selectedDecks: selectedDecks.value
      }))
    } catch (e) {
      console.warn('Could not save preferences:', e)
    }
  }

  // Actions
  function toggleDeck(category: Category) {
    const index = selectedDecks.value.indexOf(category)
    if (index === -1) {
      selectedDecks.value.push(category)
    } else {
      selectedDecks.value.splice(index, 1)
    }
    savePreferences()
  }
  
  function toggleSound() {
    soundEnabled.value = !soundEnabled.value
    savePreferences()
  }
  
  function isDeckSelected(category: Category): boolean {
    return selectedDecks.value.includes(category)
  }

  return {
    // State
    soundEnabled,
    selectedDecks,
    isLoaded,
    // Actions
    loadPreferences,
    savePreferences,
    toggleDeck,
    toggleSound,
    isDeckSelected
  }
})