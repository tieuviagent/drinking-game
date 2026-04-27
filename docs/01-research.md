# Drinking Game - Research Document

## 1. Game Overview

### Core Concept
A mobile-first responsive drinking game app with card-based mechanics. Players draw cards that contain challenges, rules, or actions they must perform. When a card is drawn, the player(s) must complete the action or face drinking penalties.

### Target Audience
- **Primary**: Young adults (18-30) at parties, gatherings, bars
- **Secondary**: Family gatherings, friend meetups, couples

### Platform Requirements
- **Mobile-first**: iOS/Android browsers, touch-optimized
- **Tablet**: Enhanced layout with larger cards
- **Desktop**: Full experience with keyboard shortcuts

---

## 2. Game Types & Mechanics

### 2.1 Popular Drinking Game Categories

#### Social Drinking Games
- **Kings (King's Cup / Donkey)**: Circle-based game with 13 cards, each with a rule
- **Never Have I Ever**: Players confess actions, others drink if they've done it
- **Most Likely To**: Point at who is most likely to do something
- **Truth or Dare**: Choose truth (answer honestly) or dare (complete challenge)

#### Card-Based Games
- **Cards Against Humanity**: Dark humor card game
- **Ring of Fire**: Card game with unique rules per card position
- **Thunderstruck**: Audio-based game with song progression

### 2.2 Our Card Categories (50+ cards each)

#### 💑 Couple Cards (Bài cho cặp đôi)
Thiên về tình cảm, gần gũi, có thể hơi ngọt ngào
- Examples: "Hôn người bên trái", "Nói điều bạn thích nhất ở người đối diện", "Ôm nhau 30 giây"

#### 👨‍👩‍👧 Family Cards (Bài cho gia đình)
An toàn, vui vẻ, phù hợp mọi lứa tuổi
- Examples: "Kể một kỷ niệm với gia đình", "Gọi điện cho mẹ nói 'con yêu mẹ'", "Để mọi người đoán bạn giống ai trong gia đình"

#### 👯 Friend Cards (Bài cho bạn bè)
Vui nhộn, gắn kết, có thể hơi troll
- Examples: "Bắt chước một người trong phòng", "Kể một bí mật của bạn", "Đóng vai người yêu của [tên] trong 3 phút"

#### 😈 Troll Cards (Bài troll)
Gây bất ngờ, hài hước, không nguy hiểm
- Examples: "Đọc to nội dung tin nhắn cuối cùng", "Làm vẻ mặt cá kiếm 10 giây", "Gọi một người bất kỳ trong danh bạ"

#### 🔥 Hot Cards (Bài khắm bựa)
Bold,大胆, có thể gây ngại
- Examples: "Thách [tên] uống 3 ngụm", "Nói điều ngại nhất về người bên phải", "Hôn cổ tay người đối diện"

---

## 3. UI/UX Design

### 3.1 Visual Style
- **Theme**: Dark mode primary, neon accents
- **Style**: Modern, slightly retro arcade feel
- **Cards**: Rounded corners, subtle shadows, flip animations
- **Background**: Animated gradients, particle effects

### 3.2 Color Scheme
```
Primary Background: #0f0f23 (Deep Navy)
Secondary Background: #1a1a2e (Dark Purple)
Accent Primary: #ff6b6b (Coral Red)
Accent Secondary: #4ecdc4 (Teal)
Accent Tertiary: #ffe66d (Yellow)
Text Primary: #ffffff
Text Secondary: #a0a0b0
Card Background: #16213e (Navy Blue)
```

### 3.3 Typography
- **Headings**: Poppins (Bold, Extra-Bold)
- **Body**: Inter (Regular, Medium)
- **Card Text**: Poppins (Semi-Bold)

### 3.4 Responsive Breakpoints
```
Mobile: 320px - 767px (Primary target)
Tablet: 768px - 1023px
Desktop: 1024px+
```

---

## 4. Audio & Music

### 4.1 Background Music
- Each card category has its own music theme:
  - Couple: Romantic, soft
  - Family: Warm, cheerful
  - Friend: Upbeat, party
  - Troll: Funny, quirky
  - Hot: Intense, dramatic

### 4.2 Sound Effects
- Card flip: Whoosh + paper sound
- Card reveal: Drum roll → reveal
- Drink reminder: Glass clink
- Timer: Tick-tock
- Win/Celebration: Party sounds

### 4.3 Audio Sources
- Use royalty-free music from:
  - Free Music Archive
  - Pixabay Music
  - Uppbeat (free tier)

---

## 5. Technical Architecture

### 5.1 Stack
```
Frontend: Vue 3 (Composition API)
Build Tool: Bun
Styling: Tailwind CSS v4 + shadcn-vue
State Management: Pinia
Database: IndexedDB (Dexie.js wrapper)
Audio: Howler.js
Animations: Vue Transitions + CSS
Testing: Vitest + Vue Test Utils
```

### 5.2 Project Structure
```
drinking-game/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Vue components
│   │   ├── ui/          # shadcn-vue components
│   │   ├── cards/       # Card-specific components
│   │   ├── game/        # Game flow components
│   │   └── layout/      # Layout components
│   ├── composables/     # Vue composables
│   ├── stores/          # Pinia stores
│   ├── data/            # Card data (JSON)
│   ├── db/              # IndexedDB setup
│   ├── router/          # Vue Router
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── views/           # Page views
├── docs/                # Documentation
├── public/              # Static public assets
└── tests/              # Test files
```

### 5.3 IndexedDB Schema
```javascript
// Database: drinking-game-db
// Stores:
// 1. game_sessions - Past game sessions
// 2. card_stats - Card usage statistics
// 3. user_preferences - Settings, selected decks
// 4. audio_cache - Cached audio files
```

---

## 6. Game Flow

### 6.1 Home Screen
1. App logo with animation
2. "Bắt đầu Game" button
3. "Giới thiệu" button
4. "Cách chơi" button
5. Settings icon

### 6.2 Deck Selection
1. List of card categories with checkboxes
2. Category preview (show sample cards)
3. "Bắt đầu" button
4. Option to shuffle selected decks

### 6.3 Game Screen
1. Centered card (large, prominent)
2. Card count remaining
3. Current deck indicator
4. Shuffle/Reset button
5. Sound toggle
6. Exit game button

### 6.4 Card Interaction
1. Tap/Click to flip card
2. 3D flip animation
3. Display card content + category icon
4. "Lật lá bài tiếp" button
5. When deck empty: Show "Hết bài" modal

### 6.5 End Game Modal
1. "Bạn đã hết bài!"
2. Stats: Cards played, time played
3. "Xáo lại và chơi tiếp" button
4. "Quay về trang chủ" button

---

## 7. Card Design

### 7.1 Card Size
```
Mobile: 280px x 400px
Tablet: 320px x 460px
Desktop: 360px x 520px
```

### 7.2 Card Structure
```
┌────────────────────┐
│   [Category Icon]  │
│                    │
│                    │
│   Card Content     │
│   (Question/       │
│    Challenge)      │
│                    │
│                    │
│   ─────────────    │
│   [Category Name]  │
└────────────────────┘
```

### 7.3 Card States
- Default: Face down (back design)
- Flipped: Face up (content visible)
- Animating: During flip transition
- Disabled: When modal is shown

---

## 8. Animations

### 8.1 Card Flip
```css
.card-flip {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-flip.flipped {
  transform: rotateY(180deg);
}
```

### 8.2 Page Transitions
- Home → Deck Select: Slide left
- Deck Select → Game: Fade + scale up
- Game → Card: Card flies in from deck

### 8.3 Micro-interactions
- Button hover: Scale 1.05, glow effect
- Card hover: Slight lift + shadow
- Success: Confetti burst
- Timer warning: Pulse animation

---

## 9. Accessibility

- **Touch targets**: Minimum 44x44px
- **Color contrast**: WCAG AA compliant
- **Screen reader**: ARIA labels on all interactive elements
- **Keyboard navigation**: Full support for desktop
- **Reduced motion**: Respect prefers-reduced-motion

---

## 10. Future Enhancements (Post-MVP)

- [ ] Multiplayer mode with real-time sync
- [ ] Custom card creation
- [ ] Card sharing via QR code
- [ ] Photo/video card challenges
- [ ] Integration with Spotify for music
- [ ] Leaderboards and achievements
- [ ] Multiple languages support
- [ ] Offline mode with pre-cached cards

---

## 11. References

### Similar Apps
- [Card Decks](https://www.card decks.com/) - Card game inspiration
- [Party With My Dog](https://www.partywithmydog.com/) - Drinking game ideas
- [Drinking Game Zone](https://www.drinkinggamezone.com/) - Game mechanics

### Design Inspiration
- Dribbble: "Drinking Game" tag
- Behance: Party/Game UI designs
- Pinterest: Mobile game UI

### Audio Resources
- [Pixabay Music](https://pixabay.com/music/)
- [Freesound](https://freesound.org/)
- [Uppbeat](https://uppbeat.io/)
