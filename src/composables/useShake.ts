import { ref, onMounted, onUnmounted } from 'vue'

export function useShake(callback: () => void, threshold = 15) {
  const lastX = ref(0)
  const lastY = ref(0)
  const lastZ = ref(0)
  const lastUpdate = ref(0)

  function handleMotion(event: DeviceMotionEvent) {
    const current = Date.now()
    if (current - lastUpdate.value > 100) {
      const diff = current - lastUpdate.value
      lastUpdate.value = current
      
      const x = event.accelerationIncludingGravity?.x || 0
      const y = event.accelerationIncludingGravity?.y || 0
      const z = event.accelerationIncludingGravity?.z || 0
      
      const speed = Math.abs(x - lastX.value + y - lastY.value + z - lastZ.value) / diff * 10000
      
      if (speed > threshold) {
        callback()
      }
      
      lastX.value = x
      lastY.value = y
      lastZ.value = z
    }
  }

  onMounted(() => {
    window.addEventListener('devicemotion', handleMotion)
  })

  onUnmounted(() => {
    window.removeEventListener('devicemotion', handleMotion)
  })
}