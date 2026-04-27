import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Category, Card } from '@/types'
import { usePreferencesStore } from './settings'
import * as coupleCards from '@/data/couple'
import * as familyCards from '@/data/family'
import * as friendCards from '@/data/friend'
import * as trollCards from '@/data/troll'
import * as hotCards from '@/data/hot'

const CARD_IMPORTS = {
  couple: coupleCards,
  family: familyCards,
  friend: friendCards,
  troll: trollCards,
  hot: hotCards
}

export const useGameStore = defineStore('game', () => {
  // Initialize preferences store (ensures it's loaded)
  usePreferencesStore()
  
  // State
  const currentDeck = ref<Card[]>([])
  const currentCardIndex = ref(0)
  const isFlipped = ref(false)
  const gameStarted = ref(false)
  
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