# Sprint 1: MVP Implementation

## Duration: 2-3 days
## Goal: Fully functional drinking game app with all basic features

---

## Task Breakdown

### Phase 1: Project Setup (Day 1, Morning)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T1.1 | Initialize Vue 3 project with Bun, TypeScript | 30min | P0 |
| T1.2 | Configure Tailwind CSS v4 | 20min | P0 |
| T1.3 | Install dependencies (shadcn-vue, dexie, howler, lucide) | 20min | P0 |
| T1.4 | Set up project structure | 15min | P0 |
| T1.5 | Configure TypeScript paths | 10min | P1 |
| T1.6 | Set up Vitest and write initial test | 25min | P1 |

### Phase 2: Core Components (Day 1, Afternoon)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T2.1 | Create TypeScript types (Card, Game, Category) | 20min | P0 |
| T2.2 | Build Card component with flip animation | 45min | P0 |
| T2.3 | Build Button component (variants, states) | 30min | P0 |
| T2.4 | Build Modal component | 30min | P0 |
| T2.5 | Create CategoryToggle component | 20min | P0 |
| T2.6 | Build GameHeader component | 15min | P1 |

### Phase 3: Views/Pages (Day 1, Evening)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T3.1 | HomeView with logo and navigation buttons | 45min | P0 |
| T3.2 | SelectView with deck selection | 60min | P0 |
| T3.3 | GameView with card display | 90min | P0 |
| T3.4 | HowToPlayView modal | 30min | P1 |
| T3.5 | About modal | 20min | P2 |
| T3.6 | Settings modal | 30min | P1 |

### Phase 4: State Management (Day 2, Morning)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T4.1 | Set up Vue Router | 20min | P0 |
| T4.2 | Create game store (Pinia) | 45min | P0 |
| T4.3 | Create settings store (Pinia) | 30min | P0 |
| T4.4 | Integrate IndexedDB with Dexie | 45min | P0 |
| T4.5 | Persist preferences to IndexedDB | 30min | P1 |

### Phase 5: Card Data (Day 2, Morning)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T5.1 | Create 55 couple cards | 60min | P0 |
| T5.2 | Create 52 family cards | 60min | P0 |
| T5.3 | Create 60 friend cards | 60min | P0 |
| T5.4 | Create 55 troll cards | 60min | P0 |
| T5.5 | Create 50 hot cards | 60min | P0 |
| T5.6 | Add card shuffle algorithm | 30min | P0 |

### Phase 6: Audio System (Day 2, Afternoon)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T6.1 | Create useAudio composable | 30min | P0 |
| T6.2 | Add card flip sound effect | 15min | P0 |
| T6.3 | Add background music per category | 45min | P1 |
| T6.4 | Implement music crossfade | 30min | P2 |
| T6.5 | Add volume controls | 20min | P1 |

### Phase 7: Responsive & Polish (Day 2, Evening)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T7.1 | Test on mobile viewport | 30min | P0 |
| T7.2 | Test on tablet viewport | 20min | P1 |
| T7.3 | Test on desktop viewport | 20min | P1 |
| T7.4 | Fix any layout issues | 60min | P0 |
| T7.5 | Add micro-interactions | 45min | P1 |
| T7.6 | Optimize animations (60fps) | 30min | P1 |

### Phase 8: Testing (Day 3)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T8.1 | Write unit tests for card shuffle | 30min | P1 |
| T8.2 | Write unit tests for game store | 45min | P1 |
| T8.3 | Write e2e tests for game flow | 60min | P1 |
| T8.4 | Fix any failing tests | 30min | P1 |
| T8.5 | Accessibility audit | 30min | P1 |

### Phase 9: Deployment Prep (Day 3, Evening)
| Task | Description | Estimate | Priority |
|------|-------------|----------|----------|
| T9.1 | Add meta tags and favicon | 15min | P1 |
| T9.2 | Optimize build | 20min | P1 |
| T9.3 | Create PWA manifest (optional) | 30min | P2 |
| T9.4 | Final smoke test | 15min | P0 |

---

## Definition of Done

### Must Have
- [ ] All 272+ cards created and categorized
- [ ] Card flip animation works smoothly
- [ ] Game flow complete: home → select → game → end
- [ ] Sound effects trigger on interactions
- [ ] Preferences persist across sessions
- [ ] Mobile-first responsive design works
- [ ] No console errors in production build

### Quality Gates
- [ ] Lighthouse mobile score > 80
- [ ] All unit tests pass
- [ ] All e2e tests pass
- [ ] Touch targets minimum 44x44px
- [ ] Color contrast WCAG AA

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Card content quality | Low | Review all cards before commit |
| Audio loading | Medium | Graceful degradation, no crash |
| IndexedDB issues | Medium | Fallback to in-memory storage |
| Performance on mobile | High | Lazy load, optimize assets |

---

## Communication

- Daily sync updates (Telegram)
- OpenCode agent for implementation
- GitHub issues for tracking

---

## Success Metrics

- App loads < 3 seconds on 3G
- All interactions respond < 100ms
- Zero console errors
- 100% test coverage on critical paths