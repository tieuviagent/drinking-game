export type Category = 'couple' | 'family' | 'friend' | 'troll' | 'hot' | 'xxs'

export interface Card {
  id: string
  category: Category
  content: string
  difficulty?: 'easy' | 'medium' | 'hard'
  imageUrl?: string
}

export interface CategoryInfo {
  id: Category
  name: string
  icon: string
  description: string
  color: string
}

export interface GameSession {
  id: string
  startedAt: Date
  endedAt?: Date
  decksUsed: Category[]
  cardsPlayed: number
}

export interface CardStats {
  id: string
  category: Category
  timesPlayed: number
  lastPlayedAt?: Date
}

export interface UserPreferences {
  id: 'preferences'
  soundEnabled: boolean
  musicEnabled: boolean
  musicVolume: number
  effectsVolume: number
  selectedDecks: Category[]
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'couple',
    name: 'Cặp đôi yêu nhau',
    icon: '💑',
    description: 'Bài thiên về tình cảm, ngọt ngào',
    color: '#FF6B6B'
  },
  {
    id: 'family',
    name: 'Gia đình',
    icon: '👨‍👩‍👧',
    description: 'Bài an toàn cho mọi lứa tuổi',
    color: '#4ECDC4'
  },
  {
    id: 'friend',
    name: 'Bạn bè',
    icon: '👯',
    description: 'Vui vẻ, gắn kết, có thể troll',
    color: '#FFE66D'
  },
  {
    id: 'troll',
    name: 'Troll',
    icon: '😈',
    description: 'Gây bất ngờ, hài hước',
    color: '#A855F7'
  },
  {
    id: 'hot',
    name: 'Khắm bựa',
    icon: '🔥',
    description: 'Bold,大胆, gây ngại',
    color: '#F97316'
  },
  {
    id: 'xxs',
    name: '18+',
    icon: '🍆',
    description: 'Nhạy cảm, chỉ người lớn',
    color: '#EC4899'
  }
]