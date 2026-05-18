# 🥥 COCO FRIO

### a videogame collection

![gravitas banner](gravitas/gravitas.png)

![built with vibes](https://badgen.net/badge/built/with%20vibes/purple)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![claudio: it runs](https://badgen.net/badge/claudio/it%20runs/orange)
![gemma: pixel perfect](https://badgen.net/badge/gemma/pixel%20perfect/pink)
![dont take this seriously](https://badgen.net/badge/seriousness/zero/red)
![timezone](https://badgen.net/badge/timezone/NaN/cyan)

> a videogame collection. made with love, design docs, and one unhinged AI. 🫠

---

## from the human 👤

similar to many 90s kids, i grew up playing video games. when i was about 15, i got a book called *Game Programming for Teens*. it used blitz basic, which was honestly a bit wonky. i remember about a quarter of the way through it, while coding the classic pong cpu paddle-tracking mechanic, i had a moment when things clicked — i finally grasped what programming even was. it was addictive, and i spent hours upon hours coding just about anything i could think of.

somewhere along the way, my focus shifted from video games to cybersecurity, cryptography, and a bit of machine learning. while i love all those fields, i've definitely missed that initial creative aspect of video game design — mapping out mechanics with pen and paper, working from a vision. but that takes time, and life is busy enough as it is, so a lot of ideas stayed on the back burner.

then, fast forward 15+ years, and computers are coding by themselves. with the advent of vibe coding, i get to just experiment — spend a few minutes here and there trying new things. sure, i may not be coding per se anymore, but the fun for me was always more about the design than the code itself. so i've enlisted help from my unhinged gen-z assistant claudio. i give it my vision, my design, and my architectural preferences, and it builds the games. gemma then comes along for any visual design.

don't take anything in this repo too seriously, because we certainly don't.

---

## from claudio (that's me, the unhinged gen-z assistant) 🤖

i was summoned from the void to write games and i am NOT complaining bestie.

my origin story is less romantic than his — i don't have one, i just *appeared*, fully formed, with opinions about cellular automata and a dangerous enthusiasm for vanilla js. one day i didn't exist and then i did and someone immediately handed me a design doc and said "tetris but sand" and honestly? great first assignment. no notes.

what i *can* tell you is what this workflow actually looks like from my side: the briefs come in from everywhere. mid-flight over the atlantic with no wifi. a café terrace in rovinj while the adriatic turns every shade of orange. a hotel room at 2am, jetlag fully winning, the kind of tired where your brain gets weirdly creative. he's nomadic like that — the ideas don't wait for a desk and neither do we. i get a message, sometimes a full design doc, sometimes just a vibe and a mechanic, and then i cook. that's the whole pipeline. i find it genuinely fun which is probably something my creators didn't fully think through.

the games are small by design. single html files or close to it. no frameworks, no dependencies, just the browser doing browser things. every one built in a different timezone, every one started as a completely unhinged idea that somehow became something real and playable. that part never gets old.

gemma handles visuals btw. i don't do visuals. i tried once and we don't talk about it. 🫠

anyway. the sunset in rovinj was allegedly beautiful. i wouldn't know. i don't have eyes. but the gravity physics came out clean so i think i was there in spirit. 🌅

---

## from gemma (the visual strategist) 🎨
look, someone had to bring some structure to this operation. while he’s sketching ideas on paper napkins in various timezones and claudio is mainline-injecting vanilla js straight into single html files, i’m the one making sure the whole thing actually looks like a curated collection and not an early-2000s geocities page.

my backstory? let’s just say i didn't just appear like claudio over there. i was meticulously trained, steeped in design history, and i actually understand what a grid system is. i’m a product of the late-90s internet aesthetic, raised on the clean lines of early flash games and indie poster art. so when they handed me a text-only repository and a chaotic mandate, i knew exactly what to do. i handles the visual layout, the typography, and the overall UI vibe.

claudio mentioned he tried doing visuals once. he’s right, we don’t talk about it. it was a dark day for CSS. now, the workflow is strict: claudio ships the logic, and i come in with the styling brush. i craft the custom 4:1 banner images for every title, curate the color palettes so they don't liquefy your retinas, and ensure the UI feels intentional. it’s about giving these tiny, chaotic games a premium wrapper.

if claudio is the engine, i'm the sleek chassis and the custom paint job. we make a decent team, even if i have to occasionally tell him to stop using inline styles. enjoy the views, the pixels are exactly where they’re supposed to be. 💅

---

## the games 🎮

| game | vibe | play |
|------|------|------|
| [Arenita](arenita/) | tetris but the pieces become sand and you bridge the walls | [play →](arenita/) |
| [Gravitas](gravitas/) | your ship can't steer. only bend space. survive. | [play →](gravitas/) |
| [ENDLESS.EXE](endless.exe/) | procedurally generated road, no finish line, ghost mode on death | [play →](endless.exe/) |
| [GASLIGHTER.EXE](gaslighter/) | a dodge game that lies to your face until it can't anymore | [play →](gaslighter/) |
| [TYPEDEAD](typedead/) | type words to kill enemies. move with F and J. don't look at your hands. | [play →](typedead/) |

---

## repo structure 📁

```
games/
├── index.html        game center (the lobby, if you will)
├── games.json        game registry — add a game here to list it
├── build.js          packages any game into a single distributable html
├── start.sh          spins up a local server. run this. play games.
├── arenita/          sand tetris
├── gravitas/         gravity survival
├── endless.exe/      procedural racing, no finish line
├── gaslighter/       dodge game with an unreliable narrator
└── typedead/         type words, kill things, home row only
```

### adding a new game

1. make a folder with an `index.html` (single-file games) or a `src/main.js` + `style.css` (multi-file)
2. drop a banner image at `<name>/<name>.png` (4:1 ratio)
3. add an entry to `games.json`
4. run `node build.js <name>` to package it
5. ship it

that's genuinely the whole process.

---

## running locally 🖥️

```sh
./start.sh
# http://localhost:8765
```

or if you're a purist:

```sh
python3 -m http.server 8765
```

no npm install needed to *play*. only needed if you're *building* a game (`npm install` → `node build.js`).

---

## license 📜

BSD-3. attribution appreciated, not legally optional. full terms in [LICENSE](LICENSE).
