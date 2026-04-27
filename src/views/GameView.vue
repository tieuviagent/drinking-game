<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { usePreferencesStore } from '@/stores/settings'
import { CATEGORIES } from '@/types'
import { ArrowLeft, Volume2, VolumeX, RefreshCw, X, Zap } from 'lucide-vue-next'
import { animate } from 'animejs'

const router = useRouter()
const game = useGameStore()
const prefs = usePreferencesStore()

const showEndModal = ref(false)
const isThrowing = ref(false)
const autoFlip = ref(localStorage.getItem('auto-flip') !== 'false')
const cardRef = ref<HTMLElement | null>(null)

function toggleAutoFlip() {
  autoFlip.value = !autoFlip.value
  localStorage.setItem('auto-flip', autoFlip.value.toString())
}

const currentCategory = computed(() => {
  if (!game.currentCard) return null
  return CATEGORIES.find(c => c.id === game.currentCard?.category)
})

const cardStyle = computed(() => {
  if (!currentCategory.value) return {}
  return {
    '--card-color': currentCategory.value.color
  }
})

function flipAndShow() {
  if (!game.isFlipped) {
    game.flipCard()
  }
}

function nextCard() {
  if (isThrowing.value || !cardRef.value) return
  isThrowing.value = true

  animate(cardRef.value, {
    translateX: [
      { value: 150, duration: 200 },
      { value: 300, duration: 300 }
    ],
    translateY: [
      { value: -100, duration: 200 },
      { value: -200, duration: 300 }
    ],
    rotate: [
      { value: 15, duration: 200 },
      { value: 30, duration: 300 }
    ],
    opacity: [
      { value: 1, duration: 200 },
      { value: 0, duration: 300 }
    ],
    easing: 'easeOutQuad',
  }).then(async () => {
    game.nextCard()
    
    // Wait for Vue to update DOM with new card, then flip
    if (autoFlip.value) {
      await nextTick()
      // Delay to allow DOM to render, then flip (Vue handles class)
      setTimeout(() => {
        game.flipCard()
      }, 150)
    }
    // autoFlip OFF: new card stays face-down
    
    isThrowing.value = false
    if (cardRef.value) {
      cardRef.value.style.transform = 'translateX(0) translateY(0) rotate(0deg)'
      cardRef.value.style.opacity = '1'
    }
  })
}

function reshuffle() {
  game.reshuffleDeck()
  game.nextCard()
  showEndModal.value = false
}

function goHome() {
  game.resetGame()
  router.push('/')
}

function goSelect() {
  game.resetGame()
  router.push('/select')
}

function handleCardClick() {
  if (isThrowing.value) return
  if (game.isFlipped) {
    nextCard()
  } else {
    flipAndShow()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Space') {
    e.preventDefault()
    handleCardClick()
  }
  if (e.code === 'Escape') {
    goHome()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  if (!game.gameStarted) {
    router.push('/select')
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="game-screen">
    <!-- Header -->
    <header class="game-header">
      <button class="header-btn" @click="goHome">
        <X :size="24" />
      </button>
      <div class="progress-info">
        <span class="card-counter">{{ game.cardsRemaining }}/{{ game.totalCards }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${game.progress}%` }"></div>
        </div>
      </div>
      <button class="header-btn" @click="prefs.toggleSound()">
        <Volume2 v-if="prefs.soundEnabled" :size="24" />
        <VolumeX v-else :size="24" />
      </button>
      <button class="header-btn" :class="{ 'auto-flip-on': autoFlip }" @click="toggleAutoFlip" :title="autoFlip ? 'Tự động lật: Bật' : 'Tự động lật: Tắt'">
        <Zap :size="20" />
        <span class="auto-flip-label">Tự động lật</span>
      </button>
    </header>

    <!-- Game Area -->
    <div class="game-area">
      <!-- Category indicator -->
      <div v-if="currentCategory" class="category-badge" :style="{ background: currentCategory.color }">
        {{ currentCategory.icon }} {{ currentCategory.name }}
      </div>

      <!-- Card -->
      <div
        class="card-container"
        :class="{ flipped: game.isFlipped, throwing: isThrowing }"
        :style="cardStyle"
        @click="handleCardClick"
        ref="cardRef"
      >
        <div class="card-inner">
          <!-- Card Back -->
          <div class="card-face card-back">
            <div class="card-pattern">
              <div class="pattern-dots"></div>
              <div class="card-logo">🎴</div>
              <p class="tap-hint">Bấm để lật</p>
            </div>
          </div>
          <!-- Card Front -->
          <div class="card-face card-front">
            <div class="card-content">
              <div class="card-icon">{{ currentCategory?.icon || '🎴' }}</div>
              <p class="card-text">{{ game.currentCard?.content }}</p>
              <div class="card-footer">
                <span class="category-name">{{ currentCategory?.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Deck -->
      <div class="deck-container">
        <div class="deck-stack">
          <div class="deck-card deck-card-3"></div>
          <div class="deck-card deck-card-2"></div>
          <div class="deck-card deck-card-1"></div>
        </div>
      </div>

      <!-- End Modal -->
      <Teleport to="body">
        <div v-if="game.isDeckEmpty && !game.isFlipped" class="modal-backdrop" @click.self="goHome">
          <div class="modal-content end-modal">
            <div class="end-icon">🎉</div>
            <h2 class="end-title">Bạn đã hết bài!</h2>
            <p class="end-text">Tổng cộng {{ game.totalCards }} lá bài đã được lật</p>
            <div class="end-actions">
              <button class="btn btn-primary" @click="reshuffle">
                <RefreshCw :size="20" />
                Xáo lại và chơi tiếp
              </button>
              <button class="btn btn-secondary" @click="goSelect">
                Chọn bộ bài khác
              </button>
              <button class="btn btn-secondary" @click="goHome">
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>

    <!-- Bottom Action -->
    <div class="bottom-action">
      <button
        class="next-btn"
        :class="{ 'has-card': game.currentCard }"
        :disabled="isThrowing"
        @click="handleCardClick"
      >
        {{ game.isFlipped ? 'LẬT LÁ BÀI TIẾP' : 'LẬT BÀI' }}
      </button>
      <p class="keyboard-hint">Phím tắt: Space = lật bài, Esc = thoát</p>
    </div>
  </div>
</template>

<style scoped>
.game-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-primary-bg);
}

.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--color-secondary-bg);
  border-bottom: 1px solid var(--color-surface);
}

.header-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.2s;
}

.header-btn:hover {
  background: var(--color-surface);
}

.header-btn.auto-flip-on {
  color: var(--color-accent-primary);
}

.auto-flip-label {
  font-size: 0.7rem;
  margin-left: 4px;
}

.progress-info {
  flex: 1;
  max-width: 200px;
  margin: 0 16px;
}

.card-counter {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  display: block;
  margin-bottom: 8px;
}

.progress-bar {
  height: 6px;
  background: var(--color-surface);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary));
  border-radius: 3px;
  transition: width 0.3s ease;
}

.game-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
}

.category-badge {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 20px;
  border-radius: 20px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.card-container {
  width: 280px;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-container.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.card-back {
  background: linear-gradient(135deg, var(--color-card-bg) 0%, var(--color-secondary-bg) 100%);
  border: 3px solid var(--card-color, var(--color-accent-primary));
}

.card-pattern {
  text-align: center;
}

.pattern-dots {
  width: 120px;
  height: 120px;
  border: 3px dashed var(--card-color, var(--color-accent-primary));
  border-radius: 50%;
  margin: 0 auto 20px;
  opacity: 0.5;
}

.card-logo {
  font-size: 48px;
  margin-bottom: 16px;
}

.tap-hint {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.deck-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
}

.deck-stack {
  position: relative;
  width: 60px;
  height: 86px;
}

.deck-card {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--color-card-bg) 0%, var(--color-secondary-bg) 100%);
  border: 2px solid var(--color-accent-primary);
  transition: opacity 0.3s ease;
}

.deck-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border: 2px dashed var(--color-accent-primary);
  border-radius: 50%;
  opacity: 0.4;
}

.deck-card-1 {
  transform: translateY(0) translateX(0);
}

.deck-card-2 {
  transform: translateY(-4px) translateX(-2px);
  opacity: 0.7;
}

.deck-card-3 {
  transform: translateY(-8px) translateX(-4px);
  opacity: 0.4;
}

.card-front {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #ffffff 0%, #f0f0ff 100%);
  color: var(--color-primary-bg);
  padding: 24px;
}

.card-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.card-text {
  flex: 1;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.card-footer {
  padding-top: 16px;
  border-top: 2px solid var(--card-color, #ddd);
}

.category-name {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-weight: 500;
}

.bottom-action {
  padding: 20px;
  background: var(--color-secondary-bg);
  border-top: 1px solid var(--color-surface);
}

.next-btn {
  width: 100%;
  padding: 18px 24px;
  border-radius: 16px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  background: var(--color-surface);
  color: var(--color-text-secondary);
}

.next-btn.has-card {
  background: linear-gradient(135deg, var(--color-accent-primary) 0%, #ff5252 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
}

.next-btn:hover {
  transform: translateY(-2px);
}

.next-btn:active {
  transform: translateY(0) scale(0.98);
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.keyboard-hint {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  margin-top: 12px;
  opacity: 0.6;
}

.end-modal {
  text-align: center;
}

.end-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.end-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.end-text {
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.end-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.end-actions .btn {
  justify-content: center;
  gap: 8px;
}

@media (min-width: 768px) {
  .card-container {
    width: 340px;
    height: 480px;
  }

  .card-text {
    font-size: 1.4rem;
  }

  .keyboard-hint {
    display: block;
  }
}

@media (min-width: 1024px) {
  .card-container {
    width: 380px;
    height: 540px;
  }
}

@media (max-width: 767px) {
  .keyboard-hint {
    display: none;
  }
}
</style>