import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Category, Card } from '@/types'
import { usePreferencesStore } from './settings'
import * as coupleCards from '@/data/couple'
import * as familyCards from '@/data/family'
import * as friendCards from '@/data/friend'
import * as trollCards from '@/data/troll'
import * as hotCards from '@/data/hot'
import * as xxsCards from '@/data/xxs'

const CARD_IMPORTS = {
  couple: coupleCards,
  family: familyCards,
  friend: friendCards,
  troll: trollCards,
  hot: hotCards,
  xxs: xxsCards
}

const STORAGE_KEY = 'drinking-game-state'

export const useGameStore = defineStore('game', () => {
  // Initialize preferences store (ensures it's loaded)
  usePreferencesStore()
  
  // Load persisted state
  const loadPersistedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        currentDeck.value = parsed.currentDeck || []
        currentCardIndex.value = parsed.currentCardIndex || 0
        isFlipped.value = parsed.isFlipped || false
        gameStarted.value = parsed.gameStarted || false
      }
    } catch (e) {
      console.warn('Failed to load game state:', e)
    }
  }
  
  // Persist state to localStorage
  const saveState = () => {
    try {
      const state = {
        currentDeck: currentDeck.value,
        currentCardIndex: currentCardIndex.value,
        isFlipped: isFlipped.value,
        gameStarted: gameStarted.value
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.warn('Failed to save game state:', e)
    }
  }
  
  // State
  const currentDeck = ref<Card[]>([])
  const currentCardIndex = ref(0)
  const isFlipped = ref(false)
  const gameStarted = ref(false)
  
  // Load persisted state on init
  loadPersistedState()
  
  // Watch and persist state changes
  watch([currentDeck, currentCardIndex, isFlipped, gameStarted], saveState, { deep: true })
  
  // Computed
  const currentCard = computed(() => {
    if (currentCardIndex.value < currentDeck.value.length) {
      return currentDeck.value[currentCardIndex.value]
    }
    return null
  })
  
  const totalCards = computed(() => currentDeck.value.length)
  const cardsRemaining = computed(() => totalCards.value - currentCardIndex.value)
  const isDeckEmpty = computed(() => currentCardIndex.value >= totalCards.value)
  const progress = computed(() => {
    if (totalCards.value === 0) return 0
    return Math.round((currentCardIndex.value / totalCards.value) * 100)
  })
  
  // Actions
  function initGame(selectedDecks: Category[]) {
    // Collect all cards from selected decks
    let allCards: Card[] = []
    
    for (const deck of selectedDecks) {
      const cards = CARD_IMPORTS[deck]?.cards || []
      allCards = [...allCards, ...cards]
    }
    
    // Shuffle using Fisher-Yates
    for (let i = allCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allCards[i], allCards[j]] = [allCards[j], allCards[i]]
    }
    
    currentDeck.value = allCards
    currentCardIndex.value = 0
    isFlipped.value = false
    gameStarted.value = true
  }
  
  function flipCard() {
    isFlipped.value = true
  }
  
  function nextCard() {
    if (!isDeckEmpty.value) {
      currentCardIndex.value++
      isFlipped.value = false
    }
  }
  
  function reshuffleDeck() {
    // Re-shuffle remaining cards
    const remaining = currentDeck.value.slice(currentCardIndex.value)
    
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[remaining[i], remaining[j]] = [remaining[j], remaining[i]]
    }
    
    currentDeck.value = [
      ...currentDeck.value.slice(0, currentCardIndex.value),
      ...remaining
    ]
  }
  
  function resetGame() {
    currentDeck.value = []
    currentCardIndex.value = 0
    isFlipped.value = false
    gameStarted.value = false
  }
  
  return {
    // State
    currentDeck,
    currentCardIndex,
    isFlipped,
    gameStarted,
    // Computed
    currentCard,
    totalCards,
    cardsRemaining,
    isDeckEmpty,
    progress,
    // Actions
    initGame,
    flipCard,
    nextCard,
    reshuffleDeck,
    resetGame
  }
})