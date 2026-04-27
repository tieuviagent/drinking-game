<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePreferencesStore } from '@/stores/settings'
import { useGameStore } from '@/stores/game'
import { CATEGORIES } from '@/types'
import { ArrowLeft, Play, Check } from 'lucide-vue-next'

const router = useRouter()
const prefs = usePreferencesStore()
const game = useGameStore()

const selectedCount = computed(() => prefs.selectedDecks.length)

const cardCounts: Record<string, number> = {
  couple: 55,
  family: 52,
  friend: 60,
  troll: 55,
  hot: 50
}

function toggleCategory(id: string) {
  prefs.toggleDeck(id as any)
}

function isSelected(id: string) {
  return prefs.isDeckSelected(id as any)
}

function startGame() {
  if (selectedCount.value > 0) {
    game.initGame(prefs.selectedDecks)
    router.push('/game')
  }
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  prefs.loadPreferences()
})
</script>

<template>
  <div class="select-screen">
    <!-- Header -->
    <header class="header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="24" />
      </button>
      <h1 class="header-title">Chọn bộ bài</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Category List -->
    <div class="category-list">
      <div
        v-for="cat in CATEGORIES"
        :key="cat.id"
        class="category-toggle"
        :class="{ selected: isSelected(cat.id) }"
        :style="{ '--cat-color': cat.color }"
        @click="toggleCategory(cat.id)"
      >
        <div class="cat-icon">{{ cat.icon }}</div>
        <div class="cat-info">
          <h3 class="cat-name">{{ cat.name }}</h3>
          <p class="cat-desc">{{ cat.description }}</p>
        </div>
        <div class="cat-meta">
          <span class="card-count">{{ cardCounts[cat.id] }} lá</span>
          <div class="check-box" :class="{ checked: isSelected(cat.id) }">
            <Check v-if="isSelected(cat.id)" :size="16" />
          </div>
        </div>
      </div>
    </div>

    <!-- Start Button -->
    <div class="bottom-section">
      <button
        class="start-btn"
        :class="{ active: selectedCount > 0 }"
        :disabled="selectedCount === 0"
        @click="startGame"
      >
        <Play :size="24" />
        <span>BẮT ĐẦU GAME</span>
        <span v-if="selectedCount > 0" class="count-badge">({{ selectedCount }})</span>
      </button>
      <p v-if="selectedCount === 0" class="hint">Hãy chọn ít nhất 1 bộ bài</p>
    </div>
  </div>
</template>

<style scoped>
.select-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-primary-bg);
}

.header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
  background: var(--color-secondary-bg);
  border-bottom: 1px solid var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
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

.back-btn:hover {
  background: var(--color-surface);
}

.header-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
}

.header-spacer {
  width: 44px;
}

.category-list {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.category-toggle {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid var(--color-surface);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-toggle:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--cat-color, var(--color-accent-primary));
}

.category-toggle.selected {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--cat-color, var(--color-accent-primary));
  box-shadow: 0 0 20px color-mix(in srgb, var(--cat-color) 30%, transparent);
}

.cat-icon {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border-radius: 12px;
  flex-shrink: 0;
}

.category-toggle.selected .cat-icon {
  background: color-mix(in srgb, var(--cat-color) 20%, transparent);
}

.cat-info {
  flex: 1;
  min-width: 0;
}

.cat-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.cat-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.cat-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.card-count {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
}

.check-box {
  width: 28px;
  height: 28px;
  border: 2px solid var(--color-surface);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.check-box.checked {
  background: var(--cat-color, var(--color-accent-primary));
  border-color: var(--cat-color, var(--color-accent-primary));
  color: white;
}

.bottom-section {
  padding: 20px;
  background: var(--color-secondary-bg);
  border-top: 1px solid var(--color-surface);
}

.start-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
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

.start-btn.active {
  background: linear-gradient(135deg, var(--color-accent-primary) 0%, #ff5252 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
}

.start-btn.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);
}

.start-btn:disabled {
  cursor: not-allowed;
}

.count-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.hint {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: 12px;
}

@media (min-width: 768px) {
  .category-list {
    padding: 24px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .category-list {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }

  .bottom-section {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    border-radius: 16px 16px 0 0;
  }
}
</style>