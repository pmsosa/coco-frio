# GASLIGHTER.EXE — overview

## what it is

a canvas-based survival/dodge game where the game engine is an unreliable narrator. the player dodges enemies while the game's HUD and commentary actively lie about what is happening. the mechanical goal (survive) and the meta-goal (witness the game's breakdown) are in tension.

## core mechanic

standard top-down dodge. player (white circle) avoids enemies (colored circles). contact reduces real health. the interesting part is the deception layer built on top:

- **score**: real score increments normally. displayed score (`displayScore`) starts at 1337 and decrements. the HUD labels this "POINTS LOST" and notes "(higher = better)."
- **health**: real health decrements on contact. `displayHealth` increments on contact. the bar fills up as you get hurt. labeled "WELLNESS." the color scale is inverted — red when you're "very well."
- **controls**: functional and normal (WASD / arrows). the tutorial text says W moves DOWN. it doesn't. this is never corrected by the game; the player figures it out.
- **enemy labels**: all enemies are labeled "FRIEND" in a small font above their hitbox. they also generate apology speech bubbles when within ~140px of the player.

## phase system

the game tracks elapsed seconds and escalates through 4 phases:

| phase | trigger | behavior |
|-------|---------|----------|
| 0 | 0s | confident, assertive lies |
| 1 | 35s | defensive lies, insisting things are fine |
| 2 | 75s | partial admissions, destabilizing |
| 3 | 120s | enemies flee the player; game stops lying |

phase changes trigger a specific announcement lie (e.g. "NOTICE: all metrics remain within acceptable ranges").

## the lie engine

`msgQueue` holds pending messages. every ~3 seconds with no queued message, the game samples a random string from `LIES[phase]` and pushes it. hit events push contextual hit-lies ("NICE! +50 wellness points"). phase changes push phase-transition lies. all messages render in a small pill at the bottom of the screen.

## freeze events

after phase 1, there is a small random chance per frame (`0.0004`) that the game enters `frozen` state. it renders the last game frame at reduced alpha, then typewriter-prints a short introspective message (e.g. "i keep telling myself i'll stop lying. but then i don't. i'm working on it."). after a duration proportional to message length, play resumes.

## game over

on death, the game does not admit you died. the screen reads "YOU DIDN'T LOSE. that was a simulation of losing. you are fine. you passed the test." with a "(the test was whether you would believe me)" footnote.

## ending (3 minute survival)

surviving 180 seconds triggers the `ending` state. the game runs through `CONFESSION` — a timestamped array of honest statements — displayed as a scrolling typewriter sequence. it admits to: making up the score, inverting the health bar, lying about controls, why it named the enemies FRIEND, and that it didn't build an ending because it didn't expect anyone to reach it. the confession ends: "you were always going to win."

this sequence is approximately 60 seconds long. there is no gameplay during it.

## architecture notes

- `state` string drives the top-level loop: `title | playing | frozen | gameover | ending`
- `drawPlayFrame()` is called from both `updatePlay()` and `updateFrozen()` so the frozen overlay composites correctly
- `roundRect()` is implemented manually for canvas compatibility
- enemy speed scales with `phase` (`spd: 1.6 + ... + phase * 0.35`)
- no external assets — no images, no audio, no fonts beyond Courier New
