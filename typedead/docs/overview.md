# TYPEDEAD — Overview

## What it is

A side-scrolling arcade typing game inspired by Typing of the Dead. Enemies march in from the right; the player defends the left edge by typing the word labeled above each enemy. Movement uses **F** (up) and **J** (down) — the keyboard home keys — creating tension between typing words and repositioning. The core skill is snapping back to home row mid-word.

## Core Loop

1. Enemies spawn from the right and walk left toward the player
2. Nearest enemy auto-locks as the active target — its word is highlighted
3. Typing the word correctly fires a shot and destroys the enemy
4. Some enemies fire projectiles; the player dodges with F/J
5. Enemies that reach the left edge deal damage
6. Waves escalate in speed, word length, and spawn density
7. Every N waves a Boss wave triggers

## Lanes & Movement

The player occupies one of **3 lanes** (top / mid / bottom). F shifts one lane up, J shifts one lane down. Pressing either key mid-word doesn't cancel typing but breaks rhythm — the skill ceiling is learning when to dodge vs. eating a hit to preserve a combo.

## Enemy Types

| Type | Mechanic |
|------|----------|
| **Standard** | One word, one shot. Speed scales with wave. |
| **Shielded** | Two words: first breaks shield, second kills. Color changes on hit. |
| **Shooter** | Fires a projectile before dying. Shorter word = urgent. |
| **Boss** | Full sentence split into segments; each segment = one hit. Fires between segments. Appears every N waves. |

## Combo & Power Words

Killing enemies consecutively without a typo builds a combo multiplier (x1 → x2 → x3 → x4). Any typo resets it.

Certain words in the list are **Power Words** — they glow/pulse visually and trigger a special effect when typed:

- **LASER** — clears all projectiles on screen
- **NUKE** — destroys all standard enemies (not bosses)
- **SHIELD** — temporary invincibility for one hit

## Difficulty Scaling

| Wave | Word Length | Enemy Speed | Spawn Rate | New Mechanic |
|------|-------------|-------------|------------|--------------|
| 1–2  | 3–5 chars   | Slow        | Low        | Standard only |
| 3–4  | 4–6 chars   | Slow        | Medium     | Shooter enemies |
| 5–6  | 5–7 chars   | Medium      | Medium     | Shielded enemies |
| 7+   | 6–9 chars   | Medium–Fast | High       | Dual active targets |
| Boss | Sentence    | Slow        | None       | Boss fight |

At wave 7+, two enemies are simultaneously active (dual target mode) — color-coded so the player can track which word belongs to which enemy.

## Scoring

- Base: `word length × wave number`
- Combo multiplier applied on top
- Perfect wave bonus (no damage taken)
- Boss kill: flat bonus

## Player State

3 lives (hearts in HUD). A life is lost when an enemy reaches the left edge or a projectile hits. No regeneration by default.

## Technical Approach

Single-file, vanilla JS, `<canvas>` renderer. Word lists are tiered by length (short / medium / long) and sampled per-wave difficulty. Typed characters are highlighted in real time — confirmed characters change color as they're entered correctly. Screen shake and flash on damage.
