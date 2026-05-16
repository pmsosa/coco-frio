# GRAVITAS 🌌

![gravitas banner](gravitas.png)

![built in croatia](https://badgen.net/badge/built/in%20croatia/blue)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![no build step](https://badgen.net/badge/build%20step/absolutely%20not/red)
![vibes](https://badgen.net/badge/vibes/gravitational/purple)
![space](https://badgen.net/badge/physics/newtonian/orange)

> you can't steer. you can only bend space. good luck bestie. 🪐

## ok so what even IS this 🤔

your ship is drifting through space and you have **zero control over it**. no thrust. no brakes. no steering. what you CAN do is click anywhere to drop a **gravity well** that bends spacetime and slingshots you around whatever asteroid was definitely about to end your life.

there are also little glowy crystals floating around that you can grab for points, because surviving wasn't enough pressure apparently.

i called it **gravitas** which means seriousness and weight in latin 🏛️, neither of which i had when i made this, but the physics checks out so the name stays.

## origin story (lore) 🌅

i was in rovinj, croatia. sitting on a terrace. watching the adriatic go golden and then pink and then that specific shade of purple that makes you want to make something. so i did. one html file. no plan. just vibes and newtonian gravity. the sun finished setting before i finished the game. i shipped it anyway.

## how to play 🎮

```sh
python3 -m http.server 8765
# open http://localhost:8765/gravitas and go off
```

no dependencies. no build. a python server you already have and a browser you definitely have.

## controls 🕹️

| what | how |
|------|-----|
| drop a gravity well | click anywhere |
| survive | be smarter than the rocks |

that's the whole interface. there's nothing else. the minimalism is intentional and also a little bit lazy.

## mechanics (for the nerds) 🤓

- 🚀 **your ship drifts** at constant velocity with no friction — space is honest like that
- 🌀 **gravity wells** pull your ship (and the rocks, a little) toward the click point — strength falls off with distance squared like newton intended
- ⏳ **wells expire** after a fixed lifetime, so you're always juggling placement timing
- 💎 **drift crystals** spawn randomly and net you +60 points on collection
- 📈 **level** increases with score, which increases rock spawn rate and speed — the chaos is earned
- 🗺️ **screen wraps** — fly off one edge and you're back on the other. the rocks don't care. neither does space.
- 💀 one hit and you're done. no health. no shields. no second chances. gravitas.

## tech stack 🛠️

```
gravitas/
  index.html      entire game. one file. that's it. 🎯
```

literally a single html file. the whole physics engine, renderer, particle system, input handling, and hud fit in one file because it turns out space is surprisingly compact when you're not importing lodash.

## disclaimer ⚠️

some of this readme was written by an AI who has never been to rovinj but is absolutely going to romanticize it anyway. the sunset was real. the gravity is real. the rest is vibes. you know the deal.

## license 📜

BSD-3. give credit, it's free 🙏. full terms in [LICENSE](../LICENSE).
