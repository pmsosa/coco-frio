# TYPEDEAD — Design Document

## Concept
A side-scrolling arcade typing game inspired by Typing of the Dead. Enemies walk in from the right; the player defends the left edge by typing the words labeled on each enemy. Movement is controlled via F (up) and J (down) — the keyboard home keys — creating tension between typing words and repositioning.

---

## Core Loop
1. Enemies spawn from the right and walk left toward the player
2. The player selects (auto or manual) an active target — its word is highlighted
3. Typing the word correctly fires a shot and destroys the enemy
4. Some enemies fire projectiles; the player dodges with F/J
5. Enemies that reach the left edge deal damage to the player
6. Waves escalate in speed, word length, and spawn density
7. Every N waves a Boss wave triggers

---

## Movement
- **F** — move up (left index finger / home key)
- **J** — move down (right index finger / home key)
- **Lane-based**: 3 lanes (top / mid / bottom); F and J shift the player one lane up or down
- Pressing F/J mid-word breaks typing flow — snapping back to home row is the core skill expression
- Player starts in the middle lane

---

## Enemies

### Standard Enemy
- Walks in from the right at a constant speed
- Labeled with a single word (3–8 chars on early waves)
- Dies in one "shot" (completing the word)

### Shielded Enemy
- Requires two words to kill (first word breaks shield, second kills)
- Shield visually distinct (e.g., color change on first hit)

### Shooter Enemy
- Fires a projectile toward the player's current lane before dying
- Player must dodge (F/J) or kill the enemy before the projectile arrives
- Word length shorter than standard (urgent to type)

### Boss (every N waves)
- One large enemy with a full sentence instead of a word
- High HP — sentence broken into segments, each segment = one hit
- Fires projectiles between segments

---

## Combo & Power Words
- Killing enemies in a row without a typo builds a **combo multiplier** (x1 → x2 → x3 → x4)
- A typo resets combo to x1
- Certain words are designated **Power Words** (themed to the word list):
  - **LASER** — destroys all current projectiles on screen
  - **NUKE** — clears all standard enemies on screen (not bosses)
  - **SHIELD** — grants temporary invincibility for one hit
- Power Words glow/pulse visually to signal they're available

---

## Difficulty Scaling (per wave)
| Wave | Word Length | Enemy Speed | Spawn Rate | New Mechanic |
|------|-------------|-------------|------------|--------------|
| 1–2  | 3–5 chars   | Slow        | Low        | Standard only |
| 3–4  | 4–6 chars   | Slow        | Medium     | Shooter enemies |
| 5–6  | 5–7 chars   | Medium      | Medium     | Shielded enemies |
| 7+   | 6–9 chars   | Medium–Fast | High       | Dual active targets |
| Boss | Sentence    | Slow        | None       | Boss fight |

---

## Dual Target Mode (Wave 7+)
- Two enemies are active simultaneously
- Color-coded: one word highlighted in one color, one in another
- Player must mentally track which word belongs to which enemy
- Completing one word auto-locks to the next active target

---

## Scoring
- Base score per kill: word length × wave number
- Combo multiplier applied on top
- Bonus points for finishing a wave without taking damage (perfect wave)
- Boss kill: flat bonus score

---

## Player State
- **3 lives** (hearts displayed in HUD)
- Lose a life when: enemy reaches the left edge, or projectile hits player
- No regeneration (optional: boss kill restores 1 life)

---

## Visual Style
- Dark arcade aesthetic (black background, neon/glowing text and sprites)
- Minimal art — geometric shapes for enemies, distinct silhouettes per type
- Screen flash on hit, shake on damage
- Word text renders above each enemy; typed characters change color as confirmed correct

---

## Tech Stack
- Pure HTML + Vanilla JS
- Canvas for rendering
- No external dependencies

---

## Decisions
- **Word list**: Dictionary subset, tiered by wave difficulty — 3-letter words (waves 1–2), 4–5 letters (waves 3–6), 6–8 letters (wave 7+). Boss sentences drawn from longer words across all tiers.
- **F/J movement**: Tap for instant lane switch. No hold behavior.
- **Target lock**: Auto-lock to the nearest enemy (closest to the left edge). No manual selection.
- **Platform**: Desktop only.
