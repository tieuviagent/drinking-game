import { ref } from 'vue'
import { usePreferencesStore } from '@/stores/settings'

// Sound effects using Web Audio API oscillators (no external files needed)
const sounds = {
  flip: () => {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  },
  success: () => {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 523
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  }
}

export function useAudio() {
  const prefs = usePreferencesStore()
  const isPlaying = ref(false)

  function playFlip() {
    if (prefs.soundEnabled) {
      sounds.flip()
    }
  }

  function playSuccess() {
    if (prefs.soundEnabled) {
      sounds.success()
    }
  }

  return {
    isPlaying,
    playFlip,
    playSuccess
  }
}