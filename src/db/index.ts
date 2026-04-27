// Database stub - using localStorage instead of Dexie for simplicity
export const db = {
  ready: Promise.resolve()
}

export async function initDB(): Promise<void> {
  // No-op - localStorage handles it
}