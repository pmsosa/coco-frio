# CONQUEST — overview

## what it is

Ultimate Tic Tac Toe with one rule change: winning any single mini-board wins the game immediately, rather than needing to claim boards on a meta-grid to win overall.

This turns the game from a deliberate positional battle into a high-pressure sprint. Both players are simultaneously trying to complete a 3-in-a-row on any local board while denying the opponent the same.

## core mechanic

**The routing rule (inherited from Ultimate TTT):**
The cell position you play in (0–8 within a board) determines which board your opponent must play in next. Play in cell 4 (center) → opponent must play in board 4. This links every move to a future constraint.

If the target board is already won or fully drawn, the current player may play in any open board.

**The modified win condition:**
Standard Ultimate TTT requires winning boards in a 3-in-a-row pattern on the meta-grid. Here, the first player to complete a 3-in-a-row on any single board wins the entire game. This is a dramatic compression of the win condition — the metagame is eliminated entirely.

**Strategic impact:**
- Offense and defense happen simultaneously on every board
- Sending your opponent to a board they're winning can be catastrophic
- Corner boards are just as valuable as the center board (unlike standard Ultimate TTT)
- Games are much shorter — a win often occurs within 15–25 moves

## game state

```
boards[9]
  cells[9]   — null | 'X' | 'O'
  winner     — null | 'X' | 'O' | 'draw'
  winLine    — null | [a, b, c] (indices of winning cells)

player      — 'X' | 'O'
active      — null | 0-8 (required board; null = any open board)
winner      — null | 'X' | 'O' | 'DRAW'
over        — boolean
```

After each move:
1. Check the played board for a 3-in-a-row → if found, game over
2. Check if the board is fully drawn
3. Determine next active board from `cellIdx`
4. If all boards are complete with no winner → DRAW

## rendering architecture

Everything is drawn to a single `<canvas>`. The layout is computed on every frame from `canvas.width`/`canvas.height`, making it fully responsive.

**Layer order (bottom → top):**
1. Background: solid fill + background grid + starfield
2. Board backgrounds (active pulse / won overlay / locked dim)
3. Board borders (pulsing active / won glow / static)
4. Inner grid lines
5. Cell contents (X/O marks, drawn with stroke animation)
6. Win overlays (large translucent mark + animated strike-through line)
7. Ripple rings
8. Particles
9. HUD (title, turn indicator, win message)
10. CRT post-process (scanlines + vignette)
11. Glitch pass (only during win animation decay)

## visual effects

**Piece placement animation:** X strokes and O arcs are drawn progressively over ~0.18s using a `v: 0→1` progress value incremented per frame.

**Active board lightning:** The active board border is redrawn 3 times per frame with small random offsets and varying alpha. Combined with `shadowBlur` glow, this simulates electrical flicker.

**Ripple:** Each placed piece spawns an expanding circle that fades out over ~20 frames.

**Win explosion:** 120 colored particles + 50 white sparks, all with independent velocities, gravity, and decay rates. Triggered on board win (which is also game win under the modified rules).

**Screen shake:** An (x, y) offset is applied to the main `ctx.translate` call and decays multiplicatively (`*= 0.78`) each frame.

**Glitch pass:** After a game win, `G.glitch` starts at 1.0 and decays to 0 over ~0.55s. While > 0.05, random horizontal slices of the canvas are displaced with `getImageData`/`putImageData` and a color-fringe layer is blended on top.

## audio

All sound is synthesized via Web Audio API (`OscillatorNode` + `GainNode` with exponential ramp to zero). No audio files.

- **Piece placement:** short square wave at 460 Hz (X) or 340 Hz (O)
- **Win fanfare:** rising arpeggio of 5 notes, major-third apart in base frequency between players, ~440ms total duration

Audio context is initialized on first user interaction (click/touch) to comply with browser autoplay policy.
