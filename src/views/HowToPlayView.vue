<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="how-to-play-view">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <ArrowLeft :size="24" />
      </button>
      <h1 class="header-title">Cách chơi</h1>
    </header>

    <div class="content">
      <section class="section">
        <h2>🎮 Giới thiệu</h2>
        <p>
          Drinking Game là một ứng dụng web cho phép bạn chơi game bài uống rượu 
          với bạn bè và gia đình. Mỗi lá bài mang một thử thách hoặc câu hỏi mà 
          bạn phải thực hiện!
        </p>
      </section>

      <section class="section">
        <h2>📋 Các bước</h2>
        <ol class="steps-list">
          <li>
            <span class="step-num">1</span>
            <div>
              <strong>Chọn bộ bài</strong>
              <p>Chọn một hoặc nhiều bộ bài bạn muốn chơi từ danh sách.</p>
            </div>
          </li>
          <li>
            <span class="step-num">2</span>
            <div>
              <strong>Bắt đầu game</strong>
              <p>Nhấn nút "Bắt đầu Game" để vào màn chơi chính.</p>
            </div>
          </li>
          <li>
            <span class="step-num">3</span>
            <div>
              <strong>Lật bài</strong>
              <p>Nhấn vào lá bài để lật và xem thử thách.</p>
            </div>
          </li>
          <li>
            <span class="step-num">4</span>
            <div>
              <strong>Thực hiện</strong>
              <p>Hoàn thành thử thách hoặc uống rượu!</p>
            </div>
          </li>
          <li>
            <span class="step-num">5</span>
            <div>
              <strong>Lật tiếp</strong>
              <p>Nhấn "Lật lá bài tiếp" để tiếp tục trò chơi.</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="section">
        <h2>🎯 Mẹo chơi</h2>
        <ul class="tips-list">
          <li>📱 Lắc điện thoại để lật bài (trên mobile)</li>
          <li>⌨️ Nhấn Space để lật bài (trên desktop)</li>
          <li>🔊 Bật/tắt âm thanh bằng nút loa</li>
          <li>🔄 Khi hết bài, chọn "Xáo lại" để chơi tiếp</li>
        </ul>
      </section>

      <section class="section warning">
        <h2>⚠️ Lưu ý</h2>
        <p>
          Hãy uống có trách nhiệm. Không lái xe khi đã uống rượu. 
          Nếu bạn hoặc ai đó cảm thấy không khỏe, hãy dừng game và tìm kiếm sự giúp đỡ.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.how-to-play-view {
  min-height: 100vh;
  background: var(--color-primary-bg);
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
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
}

.back-btn:hover {
  background: var(--color-surface);
}

.header-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
}

.content {
  padding: 24px 20px;
  max-width: 600px;
  margin: 0 auto;
}

.section {
  margin-bottom: 32px;
}

.section h2 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: var(--color-accent-secondary);
}

.section p {
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.steps-list {
  list-style: none;
  padding: 0;
}

.steps-list li {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: var(--color-surface);
  border-radius: 12px;
}

.step-num {
  width: 36px;
  height: 36px;
  background: var(--color-accent-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.steps-list strong {
  display: block;
  margin-bottom: 4px;
}

.steps-list p {
  margin: 0;
  font-size: 0.9rem;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-surface);
  color: var(--color-text-secondary);
}

.tips-list li:last-child {
  border-bottom: none;
}

.warning {
  background: rgba(255, 107, 107, 0.1);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--color-accent-primary);
}

.warning h2 {
  color: var(--color-accent-primary);
}

.warning p {
  color: var(--color-text-primary);
}
</style>