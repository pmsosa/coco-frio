# Gravitas — Documentation

Gravitas is a single-file browser game about surviving in space without a throttle. You can't steer your ship directly — all you can do is drop gravity wells to bend its path. Vanilla JS, Canvas 2D API, one HTML file, no dependencies.

---

## Core Mechanic

Your ship starts drifting at a fixed initial velocity with no friction and no engine control. Clicking anywhere on the canvas places a **gravity well** at that point. The well applies an inverse-square attractive force to the ship (and weakly to nearby rocks) for a fixed lifetime, then disappears. Up to 3 wells can exist simultaneously; there's a cooldown between placements.

The skill ceiling is entirely about predicting where your ship will be in 1–2 seconds and placing wells to arc it away from incoming rocks. It's orbital mechanics with a time limit.

---

## Architecture

Everything lives in `index.html` — one `<script>` block, no modules, no external files.

### State machine

```
'menu' ──[click]──→ 'play' ──[collision]──→ 'dead' ──[click]──→ 'play'
```

`update()` and the draw functions all guard on `state`, so the game loop runs continuously throughout.

### Game loop

```js
function loop() {
  update();
  drawBG();
  if (state === 'menu') {
    drawMenu();
  } else {
    drawWells(); drawGems(); drawRocks(); drawParticles(); drawShip(); drawHUD();
    if (state === 'dead') drawDead();
  }
  requestAnimationFrame(loop);
}
```

`update()` does everything physics-side: incrementing `frame`, ticking spawn timers, applying gravity, moving the ship, advancing rocks and gems, running collision checks, and stepping particles. The draw functions read state only — no mutation.

---

## Physics

The gravity function is:

```js
function gravity(well, obj, k) {
  const dx = well.x - obj.x;
  const dy = well.y - obj.y;
  const d2 = dx*dx + dy*dy;
  const d  = Math.sqrt(d2);
  if (d < 6) return;
  const f = k / (d2 + 900);   // softened inverse-square
  obj.vx += (dx / d) * f;
  obj.vy += (dy / d) * f;
}
```

The `+ 900` in the denominator softens the singularity at close range so the ship doesn't get flung at infinite speed if it passes directly through a well. Applied each frame (60fps → effectively continuous integration). Ship speed is clamped at `MAX_SPEED = 7` px/frame.

Wells affect rocks at `8%` of ship strength — enough to subtly redirect rocks, not enough to make them predictable hazards.

### Screen wrap

The ship wraps at all four edges. The trail renderer skips segments that cross more than half the screen width to avoid drawing wrap artifacts.

---

## Entities

| Entity | Spawning | Removal |
|--------|----------|---------|
| Rocks | From random screen edge; rate scales with level. Initial 3 on game start. | Off-screen by >100px |
| Gems | Up to 4 at a time; 320-frame timer | On collection |
| Wells | Player-placed; max 3; 28-frame cooldown | After `WELL_LIFE = 220` frames |
| Particles | Spawned on death/gem collection | When `life ≤ 0` or `r ≤ 0.2` |

Rock speed = `0.55 + level × 0.22 + random(0–0.45)` px/frame. Rock shapes are procedural 9-point polygons with randomized radial noise.

---

## Scoring

- Passive: `+0.1` points per frame (~6 pts/sec at 60fps)
- Gem collection: `+60` points flat
- Level: `1 + floor(score / 160)` — increases roughly every 27 seconds at idle drift rate
- Rock spawn interval: `max(42, 165 - level × 13)` frames — the game gets meaningfully harder around level 6–8 where interval hits the floor

High score persists in the `hi` variable for the session only — no localStorage.

---

## Rendering

All drawing is done with Canvas 2D API. Glow effects use `ctx.shadowBlur` and `ctx.shadowColor` — `glow()` and `noGlow()` are helpers that set/clear these.

Key visual systems:
- **Nebulae**: pre-placed radial gradients drawn each frame over the black background
- **Stars**: 200 pre-generated points with per-star twinkle phase
- **Ship trail**: last 30 positions, drawn as fading circles; skips cross-wrap segments
- **Gravity wells**: animated expanding rings (phase-offset per ring), rotating tick marks, core glow gradient
- **Gems**: hexagonal crystal shape with pulsing glow, inner cross detail, expand-ring on collect
- **Rocks**: procedural polygon shape, HSL-hued, with canvas rotation per rock

The HUD draws score/level on the left and well-charge pips (`◈`/`◇`) on the right using `Courier New` at 18–20px.
