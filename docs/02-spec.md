# SPEC.md - Drinking Game App

## 1. Concept & Vision

**Drinking Game** - Một ứng dụng web responsive, mobile-first với trải nghiệm như đang chơi bài thật. Mỗi lá bài mang một thử thách, câu hỏi hoặc hành động mà người chơi phải thực hiện. Game có nhạc nền theo chủ đề, hiệu ứng đẹp mắt, và giao diện tối giản nhưng cuốn hút.

**Personality**: Vui vẻ, năng động,有一点大胆 nhưng không quá, luôn tạo không khí vui vẻ cho mọi cuộc chơi.

---

## 2. Design Language

### Aesthetic Direction
**"Neon Arcade Night"** - Kết hợp giữa arcade retro và nightlife hiện đại. Dark theme với neon accents, tạo cảm giác như đang ở một party sôi động.

### Color Palette
```
Primary Background:    #0A0A1A (Deep Night)
Secondary Background: #141428 (Dark Purple)
Card Background:      #1E1E3A (Navy)
Accent Primary:       #FF6B6B (Coral Neon)
Accent Secondary:     #4ECDC4 (Teal Neon)
Accent Tertiary:      #FFE66D (Yellow Neon)
Text Primary:         #FFFFFF
Text Secondary:       #A0A0C0
Surface:              #252542
```

### Typography
```
Heading:    Poppins (700, 800)
Body:       Inter (400, 500)
Card Text:  Poppins (600)
Fallback:  system-ui, -apple-system, sans-serif
```

### Spatial System
```
Base unit: 4px
Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
Card border-radius: 16px
Button border-radius: 12px
```

### Motion Philosophy
- **Card flip**: 600ms cubic-bezier(0.4, 0, 0.2, 1), 3D transform
- **Page transitions**: 300ms ease-out, slide/fade
- **Hover effects**: 150ms ease, scale(1.05)
- **Entrance animations**: Stagger 100ms, fade + slide up
- **Sound sync**: Animations trigger audio cues

### Visual Assets
- **Icons**: Lucide icons (consistent stroke width)
- **Card backs**: Geometric patterns per category
- **Category icons**: Emoji-based for universal recognition
- **Images**: Nano Banana 2 for card illustrations

---

## 3. Layout & Structure

### Page Architecture

#### Home Page (`/`)
```
┌─────────────────────────────┐
│          [Logo]             │
│      DRINKING GAME          │
│                             │
│    🎵 Background Music      │
│                             │
│    ┌─────────────────┐      │
│    │  🎮 BẮT ĐẦU     │      │
│    └─────────────────┘      │
│    ┌─────────────────┐      │
│    │  📖 GIỚI THIỆU  │      │
│    └─────────────────┘      │
│    ┌─────────────────┐      │
│    │  ❓ CÁCH CHƠI   │      │
│    └─────────────────┘      │
│                             │
│         ⚙️ Settings         │
└─────────────────────────────┘
```

#### Deck Selection (`/select`)
```
┌─────────────────────────────┐
│  ← Chọn bộ bài              │
├─────────────────────────────┤
│                             │
│  ☑️ 💑 Cặp đôi yêu nhau     │
│     "55 lá bài"             │
│                             │
│  ☑️ 👨‍👩‍👧 Gia đình           │
│     "52 lá bài"             │
│                             │
│  ☑️ 👯 Bạn bè               │
│     "60 lá bài"             │
│                             │
│  ☑️ 😈 Troll                │
│     "55 lá bài"             │
│                             │
│  ☐ 🔥 Khắm bựa              │
│     "50 lá bài"             │
│                             │
│  ┌─────────────────────┐    │
│  │   BẮT ĐẦU GAME (5)   │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

#### Game Screen (`/game`)
```
┌────���────────────────────────┐
│  [☰]      12/50      [🔊]  │
├─────────────────────────────┤
│                             │
│                             │
│         ┌───────┐           │
│         │  💑   │           │
│         │       │           │
│         │ Nói   │           │
│         │ điều  │           │
│         │ bạn   │           │
│         │ thích │           │
│         │ nhất..│           │
│         │       │           │
│         │───────│           │
│         │Cặp đôi│           │
│         └───────┘           │
│                             │
│                             │
│  ┌─────────────────────┐    │
│  │   LẬT LÁ BÀI TIẾP   │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

### Responsive Strategy
```
Mobile (< 768px):  Single column, large touch targets, bottom nav
Tablet (768-1024): 2-column layouts, side panels
Desktop (> 1024): Full experience, keyboard shortcuts, hover states
```

---

## 4. Features & Interactions

### 4.1 Home Screen
| Action | Result |
|--------|--------|
| Tap "Bắt đầu" | Navigate to `/select` with slide animation |
| Tap "Giới thiệu" | Show modal with app info |
| Tap "Cách chơi" | Show modal with rules |
| Tap ⚙️ | Open settings modal |
| Background music | Auto-play, respects mute state |

### 4.2 Deck Selection
| Action | Result |
|--------|--------|
| Tap category | Toggle checkbox, update count |
| Tap "Bắt đầu" | Navigate to `/game`, load selected decks |
| No decks selected | Button disabled, tooltip on hover |
| Long press category | Preview 3 random cards |

### 4.3 Game Flow
| Action | Result |
|--------|--------|
| Tap card | Flip animation (600ms), reveal content |
| Tap "Lật lá bài tiếp" | Slide current out, new card slides in |
| Deck empty | Show modal: "Hết bài! Xáo lại?" |
| Tap ☰ | Show game menu (exit, sound, shuffle) |
| Tap 🔊 | Toggle sound (visual feedback) |
| Shake device | Trigger next card (mobile) |

### 4.4 Error States
| Scenario | Handling |
|----------|----------|
| No decks selected | Redirect to selection |
| IndexedDB unavailable | Show warning, use in-memory |
| Audio load failure | Continue without sound |
| Touch on disabled card | Visual shake feedback |

### 4.5 Empty States
| Screen | Display |
|--------|---------|
| No recent games | "Bắt đầu trò chơi đầu tiên của bạn!" |
| Card loading | Shimmer animation on card placeholder |

---

## 5. Component Inventory

### 5.1 Button
- **Default**: Coral background, white text, 12px radius
- **Hover**: Scale 1.05, glow effect (box-shadow)
- **Active**: Scale 0.98, darker background
- **Disabled**: 50% opacity, no pointer events
- **Loading**: Spinner icon, text hidden

### 5.2 Card
- **Back**: Category pattern, centered category icon
- **Front**: White/gradient background, content centered
- **Flipping**: 3D rotation, backface-visibility hidden
- **Hover**: Slight lift (translateY -4px)

### 5.3 Category Toggle
- **Unselected**: Border only, muted text
- **Selected**: Filled background, checkmark icon
- **Hover**: Background tint
- **Disabled**: Greyed out (if category empty)

### 5.4 Modal
- **Backdrop**: Black 60% opacity, blur(8px)
- **Container**: Card background, 24px radius, centered
- **Header**: Bold title, close button
- **Entry**: Scale 0.9 → 1, fade in

### 5.5 Navigation
- **Header**: Fixed, blur backdrop
- **Mobile**: Bottom bar with 4 icons
- **Desktop**: Sidebar (collapsible)

---

## 6. Technical Approach

### 6.1 Stack
```javascript
// Core
Vue 3.4+ (Composition API, <script setup>)
TypeScript 5+
Bun (package manager, build tool)

// UI
Tailwind CSS v4
shadcn-vue (accessible components)

// State
Pinia (state management)
Vue Router 4

// Database
Dexie.js (IndexedDB wrapper)

// Audio
Howler.js (cross-browser audio)

// Animation
Vue Transition (built-in)
CSS Animations (custom)

// Testing
Vitest
Vue Test Utils
Playwright (e2e)
```

### 6.2 Project Initialization
```bash
bun create vue@latest . --typescript --vue-router --pinia
bun add tailwindcss @tailwindcss/vite
bun add dexie howler
bun add lucide-vue-next
bun add -D vitest @vue/test-utils playwright
```

### 6.3 IndexedDB Schema (Dexie)
```typescript
interface GameSession {
  id: string
  startedAt: Date
  endedAt?: Date
  decksUsed: string[]
  cardsPlayed: number
}

interface CardStats {
  id: string
  category: string
  timesPlayed: number
  lastPlayedAt?: Date
}

interface UserPreferences {
  id: 'preferences'
  soundEnabled: boolean
  musicEnabled: boolean
  musicVolume: number
  effectsVolume: number
  selectedDecks: string[]
}
```

### 6.4 Card Data Structure
```typescript
interface Card {
  id: string
  category: 'couple' | 'family' | 'friend' | 'troll' | 'hot'
  content: string
  difficulty?: 'easy' | 'medium' | 'hard'
  imageUrl?: string  // Generated by Nano Banana 2
}
```

### 6.5 API/State Flow
```
User Action → Vue Component → Pinia Store → IndexedDB
                ↓
         Audio Controller
                ↓
         UI Update (reactive)
```

---

## 7. File Structure
```
drinking-game/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── tailwind.config.ts
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   ├── game.ts
│   │   └── settings.ts
│   ├── data/
│   │   ├── couple.ts
│   │   ├── family.ts
│   │   ├── friend.ts
│   │   ├── troll.ts
│   │   └── hot.ts
│   ├── db/
│   │   └── index.ts
│   ├── composables/
│   │   ├── useAudio.ts
│   │   ├── useCards.ts
│   │   └── useShake.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.vue
│   │   │   ├── Modal.vue
│   │   │   └── Card.vue
│   │   ├── game/
│   │   │   ├── CardDeck.vue
│   │   │   ├── GameHeader.vue
│   │   │   └── CardContent.vue
│   │   ├── home/
│   │   │   ├── HomeScreen.vue
│   │   │   └── HomeButton.vue
│   │   └── select/
│   │       ├── DeckSelect.vue
│   │       └── CategoryToggle.vue
│   ├── views/
│   ��   ├── HomeView.vue
│   │   ├── SelectView.vue
│   │   ├── GameView.vue
│   │   └── HowToPlayView.vue
│   ├── types/
│   │   └── index.ts
│   └── assets/
│       ├── styles/
│       │   └── main.css
│       └── audio/
│           └── (placeholder)
├── public/
│   └── favicon.ico
├── tests/
│   ├── unit/
│   │   ├── card.test.ts
│   │   ├── game.test.ts
│   │   └── store.test.ts
│   └── e2e/
│       └── game.spec.ts
└── docs/
    ├── 01-research.md
    ├── 02-spec.md
    └── sprints/
        └── sprint-1.md
```

---

## 8. Acceptance Criteria

### Must Have (MVP)
- [ ] Home screen with 3 main buttons
- [ ] Deck selection (5 categories, 50+ cards each)
- [ ] Working card flip animation
- [ ] Card content display (Vietnamese)
- [ ] Shuffle and draw new card
- [ ] "Deck empty" modal with reshuffle option
- [ ] Sound effects on interactions
- [ ] Music per category theme
- [ ] IndexedDB for preferences persistence
- [ ] Mobile-first responsive design
- [ ] Touch-optimized interactions

### Should Have
- [ ] Settings modal (sound/music toggle)
- [ ] How to play guide
- [ ] About modal
- [ ] Keyboard shortcuts (desktop)
- [ ] Shake to draw card (mobile)

### Nice to Have
- [ ] Card images from Nano Banana 2
- [ ] Multiplayer mode
- [ ] Custom card creation
- [ ] Achievement system