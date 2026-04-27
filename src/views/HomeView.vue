<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePreferencesStore } from '@/stores/settings'
import { Menu, Play, BookOpen, HelpCircle } from 'lucide-vue-next'

const router = useRouter()
const prefs = usePreferencesStore()

const showAbout = ref(false)
const showHowTo = ref(false)

const cardCount = {
  couple: 55,
  family: 52,
  friend: 60,
  troll: 55,
  hot: 50
}

function navigateTo(path: string) {
  router.push(path)
}

onMounted(() => {
  prefs.loadPreferences()
})
</script>

<template>
  <div class="home-screen">
    <!-- Background Effects -->
    <div class="bg-gradient"></div>
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="{ 
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }"></div>
    </div>

    <!-- Logo Section -->
    <div class="logo-section">
      <div class="logo-icon">🎮</div>
      <h1 class="title gradient-text">DRINKING GAME</h1>
      <p class="subtitle">Game bài uống rượu cho mọi cuộc vui</p>
    </div>

    <!-- Menu Buttons -->
    <div class="menu-section">
      <button class="menu-btn primary-btn" @click="navigateTo('/select')">
        <Play :size="24" />
        <span>BẮT ĐẦU GAME</span>
      </button>

      <button class="menu-btn secondary-btn" @click="showAbout = true">
        <Menu :size="24" />
        <span>GIỚI THIỆU</span>
      </button>

      <button class="menu-btn secondary-btn" @click="showHowTo = true">
        <HelpCircle :size="24" />
        <span>CÁCH CHƠI</span>
      </button>
    </div>

    <!-- Stats Preview -->
    <div class="stats-preview">
      <p>📦 Tổng cộng <span class="highlight">{{ Object.values(cardCount).reduce((a, b) => a + b, 0) }}+</span> lá bài</p>
      <p>🎯 <span class="highlight">5</span> chủ đề đa dạng</p>
    </div>

    <!-- About Modal -->
    <Teleport to="body">
      <div v-if="showAbout" class="modal-backdrop" @click.self="showAbout = false">
        <div class="modal-content">
          <h2 class="modal-title">🎮 Drinking Game</h2>
          <p class="modal-text">
            Một ứng dụng web responsive, mobile-first với trải nghiệm như đang chơi bài thật.
            Mỗi lá bài mang một thử thách, câu hỏi hoặc hành động mà người chơi phải thực hiện.
          </p>
          <h3 class="modal-subtitle">🎯 Các bộ bài</h3>
          <ul class="modal-list">
            <li>💑 Cặp đôi yêu nhau ({{ cardCount.couple }} lá)</li>
            <li>👨‍👩‍👧 Gia đình ({{ cardCount.family }} lá)</li>
            <li>👯 Bạn bè ({{ cardCount.friend }} lá)</li>
            <li>😈 Troll ({{ cardCount.troll }} lá)</li>
            <li>🔥 Khắm bựa ({{ cardCount.hot }} lá)</li>
          </ul>
          <button class="btn btn-primary w-full" @click="showAbout = false">Đóng</button>
        </div>
      </div>
    </Teleport>

    <!-- How To Play Modal -->
    <Teleport to="body">
      <div v-if="showHowTo" class="modal-backdrop" @click.self="showHowTo = false">
        <div class="modal-content">
          <h2 class="modal-title">❓ Cách chơi</h2>
          <div class="how-to-steps">
            <div class="step">
              <span class="step-number">1</span>
              <span>Chọn các bộ bài bạn muốn chơi</span>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <span>Bấm "Bắt đầu Game"</span>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <span>Nhấn vào lá bài để lật</span>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <span>Thực hiện thử thách trên lá bài</span>
            </div>
            <div class="step">
              <span class="step-number">5</span>
              <span>Bấm "Lật lá bài tiếp" để tiếp tục</span>
            </div>
          </div>
          <p class="modal-hint">⚠️ Hãy uống có trách nhiệm!</p>
          <button class="btn btn-primary w-full" @click="showHowTo = false">Đã hiểu</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.home-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 0%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
              var(--color-primary-bg);
  z-index: -2;
}

.particles {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-accent-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 0.3; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

.logo-section {
  text-align: center;
  margin-bottom: 48px;
  animation: fadeInDown 0.6s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-icon {
  font-size: 64px;
  margin-bottom: 16px;
  animation: bounce 2s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 320px;
  animation: fadeInUp 0.6s ease 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 16px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  min-height: 60px;
}

.primary-btn {
  background: linear-gradient(135deg, var(--color-accent-primary) 0%, #ff5252 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
}

.primary-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.5);
}

.primary-btn:active {
  transform: translateY(0) scale(0.98);
}

.secondary-btn {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 2px solid var(--color-card-bg);
}

.secondary-btn:hover {
  background: var(--color-card-bg);
  border-color: var(--color-accent-secondary);
  transform: translateY(-2px);
}

.stats-preview {
  margin-top: 48px;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  animation: fadeInUp 0.6s ease 0.4s both;
}

.stats-preview p {
  margin: 8px 0;
}

.highlight {
  color: var(--color-accent-primary);
  font-weight: 700;
}

.modal-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.modal-text {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.modal-subtitle {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: var(--color-accent-secondary);
}

.modal-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.modal-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--color-surface);
}

.modal-hint {
  color: var(--color-accent-tertiary);
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 16px;
}

.w-full {
  width: 100%;
}

.how-to-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--color-surface);
  border-radius: 12px;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--color-accent-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .title {
    font-size: 3.5rem;
  }

  .menu-section {
    max-width: 400px;
  }
}
</style>