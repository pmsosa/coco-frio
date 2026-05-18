# ENDLESS.EXE 🏁

![endless.exe banner](endless.exe.png)

![built in the void](https://badgen.net/badge/built/in%20the%20void/blue)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![no build step](https://badgen.net/badge/build%20step/absolutely%20not/red)
![vibes](https://badgen.net/badge/vibes/procedural%20dread/purple)

> no finish line. no mercy. just the road and how long you can stay on it.

## ok so what even IS this

a top-down racing game where the track never ends. procedurally generated, infinitely scrolling, neon-green on dark green. you are a small rectangle. the road is a long glowing ribbon that twists faster than your brain expects. there is no winning. there is only not dying.

the scoring is: how many AI cars are ahead of you versus your target. you start trying to pass 5. every time you die, the target goes up by 2. beat the target and it resets. die a lot and you're just chasing a number that keeps running away from you.

## origin story (lore)

mostly vibecoded at LAX. the kind of airport wait where you're there too early and you've already done the lounge and you've already walked the terminal twice. i just wanted something to stare at while listening to vaporwave — something looping and neon and slightly hypnotic that didn't require winning.

i keep coming back to it though. tweaking the curve generation, adjusting the AI, adding one more obstacle type. it's that kind of project. started small and keeps getting one more thing. the `TODO.md` has the full design documents if you want to see how the sausage was planned — and how much of it is still planned.

## how to play

accelerate. steer. survive. collect items by driving over glowing `◉` boxes. use items with SPACE. pass AI cars. don't fall off the road. don't hit barrels. don't hit walls. don't get EMPed while holding something good.

when you die: you don't stop. you become a ghost for 3 seconds — semi-transparent, no collision, auto-piloting the centerline. then you're back. the road keeps going. your rank does not.

## controls

| key | action |
|-----|--------|
| W / ↑ | accelerate |
| S / ↓ | brake |
| A / D | steer |
| SHIFT | drift |
| SPACE | use item |

## the items 📦

| item | effect |
|------|--------|
| BOOST | 1.5× speed for 3s |
| NITRO | 2× speed for 5s. car turns red. satisfying. |
| GHOST | phase through obstacles for 4s |
| ANCHOR | 0.5× speed. yes it's useful on tight curves |
| SLOW-MO | 0.35× speed for precision moments |
| WARP PAD | instant teleport forward 400–800 units |
| SHIELD | absorbs one death hit, then expires |
| MAGNET | auto-collects nearby item boxes for 8s |

you hold two items. FIFO queue. the second slot dims in the HUD. use the first, the second slides forward.

## the obstacles ⚠️

**barrels** — kill you. **walls** — kill you. **oil slicks** — 2-second forced drift, good luck. **spike strips** — destroy your held item instead of killing you (if your hands are empty: it kills you). **EMP pulses** — disable your active item. EMP and spike are annoying in a good way.

also there are ramp/gap zones. you launch off the ramp, fly over the void, land on the other side. miss the landing: death. it's dramatic.

## the rank system

eight AI cars are always in play. your rank = how many are currently ahead of you. your target starts at 5. pass all 5: CLEAR!, target resets lower. die: target goes up by 2 and nearby AI cars surge forward. the longer you survive, the more you've built up — but every death makes the next win harder.

## tech stack

pure vanilla JS. one `<canvas>`. no frameworks. no build step. open it, it goes. the road is a 2D curved ribbon generated segment-by-segment with a random-walk angle system. AI cars ride `road.worldAt(dist)` with sine-wave lateral drift — computationally free, looks fine at speed. the background is three screen-space parallax layers: slow-scrolling grid, falling neon streaks, and a pulsing radial glow at the vanishing point.

## disclaimer

some of this readme was written by an AI. the mechanics are accurate; the "procedural dread" badge is accurate too, just in a different way. you'll figure it out.

## license

BSD-3. attribution please 🙏. full terms in [LICENSE](../LICENSE).
