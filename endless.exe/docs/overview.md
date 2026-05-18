# ENDLESS.EXE — Overview

## what it is

a procedurally generated top-down 2D racing game. the road is a continuously generated curved ribbon; the player drives along it, passing AI cars and collecting items, with no finish line. the goal is to pass a target number of AI cars before dying enough times that the target becomes unreachable.

## core mechanic: continuous play via ghost mode

unlike most arcade racers, death doesn't end the session. on death, the player enters a 3-second ghost state: semi-transparent, collision disabled, auto-piloting the road centerline at minimum speed. on respawn, the car reappears exactly where the ghost finished. momentum survives; rank doesn't.

each death also bumps `game.targetRank` up by 2 and surges nearby AI cars forward. this means dying compounds — early survival is the only way to keep the target reachable.

## rank-based scoring

score is not distance. `game.rank` = the number of AI cars currently ahead of the player. `game.targetRank` starts at 5. drop rank to 0 (pass all target cars): CLEAR!, target resets lower. die: target goes up by 2. the loop is: outrun → clear → survive longer → don't die.

## road generation (`Road._gen`)

one segment per call. segments are world-space points `{ x, y, angle, nx, ny, zone }` where `nx/ny` is the road's lateral normal vector.

- **angle walk:** `genAngle` accumulates `curveRate` each tick. `curveDur` and `curveRate` are re-rolled when the curve expires. three regimes: straight (28%), gentle (37%), sharp (35%).
- **zones:** `normal` is the default. ramp/gap/landing appear in fixed-length triplets (5 segs each) triggered every 50–85 normal segments. the gap is a void — no road surface — requiring a successful jump to cross.
- **placement during gen:** checkpoints, obstacles, item boxes, booster pads, and warp portal pairs are placed inline as the generator runs. warp exits store a future index and are resolved when `_gen` reaches that index.
- **culling:** `Road.cull(playerIdx)` drops segments and objects that are far enough behind the player. this keeps memory use bounded regardless of how long the run goes.

## AI cars (`AICar`)

not pathfinding agents. each AI car tracks a `dist` value (distance along the road) and calls `road.worldAt(dist)` each frame to get its world position. lateral position is a sine wave: `lat = sin(dist * waveFreq + waveOff) * waveAmp`. this is near-zero CPU cost and reads as natural weaving at speed.

eight cars are active at all times. when an AI car falls more than 600 units behind the player, it teleports to a random position 800–2800 units ahead. this keeps the rank computation meaningful without any actual AI "reset" logic.

## item system

items are drawn from a pool of 8 types (BOOST, NITRO, GHOST, ANCHOR, SLOW, WARP, SHIELD, MAGNET). the player holds up to 2 in a FIFO queue. pressing SPACE shifts the front of the queue into `car.activeItem`. WARP is instant (no `activeItem` state); all others run for `itemDur` ticks.

WARP (item) vs warp portals (road objects) are two separate systems — WARP items teleport forward from wherever the player is; warp portals are fixed road objects with explicit entry/exit coordinate pairs generated during road gen.

## obstacle types

- **barrel / wall** — instant death on contact
- **oil** — sets `oilTimer = 120`; forces drift and caps boost at 0.6× for the duration
- **spike strip** — destroys the active item or front queue item instead of killing; kills if both are empty
- **EMP** — clears `car.activeItem` only (queue untouched)

spike and EMP are "soft" obstacles that punish resource management rather than pure survival.

## rendering

single `<canvas>`, 2D context. road draws as a series of quads between adjacent segments — soft zone first, then road surface, then per-zone overlays (ramp/gap/landing), then edges and dashes. the camera is a simple exponential follow (`x += (target - x) * 0.09`) applied via `ctx.translate/scale` in a `save/restore` block.

the background is drawn before the camera transform — three screen-space layers: a parallax grid scrolling at 15% of cam movement, a falling streak pool (capped at 60), and a radial glow at the viewport's vanishing point. scanlines and vignette are composited last, also in screen space.

the minimap filters the road segment array to a ±300u/+1400u window around the player, computes a bounding box, and scales into a fixed 160×118px panel.
