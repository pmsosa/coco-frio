# TYPEDEAD ☠️

![typedead banner](typedead.png)

![built at the keyboard](https://badgen.net/badge/built/at%20the%20keyboard/blue)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![no build step](https://badgen.net/badge/build%20step/absolutely%20not/red)
![vibes](https://badgen.net/badge/vibes/home%20row%20or%20death/purple)

> type the word. kill the thing. don't look at your hands.

## ok so what even IS this 🧟

enemies walk in from the right. each one has a word floating above its head. you type that word and it dies. sounds simple right. it is not simple.

here's what makes it interesting: you move with **F** and **J** — left and right index fingers, home row, exactly where your hands already are. so every time you need to dodge an incoming projectile you have to decide: stay on the word and eat the hit, or bail and lose your combo. that tension is the whole game.

it's inspired by Typing of the Dead, which was a real game that came out in 1999 and was completely unhinged in the best way. this is that energy, but browser-native and made in a single html file.

## origin story (lore) 🗺️

i genuinely cannot tell you where this was built. the memory is fuzzy. there was a keyboard involved. and probably too much caffeine. the DESIGN.md exists so there was clearly planning involved at some point, which means past-me was being responsible, which honestly doesn't narrow it down.

## how to play 🎮

open `index.html` in a browser. that's it. no server needed, no install, no npm, no suffering.

```
open index.html
```

enemies walk in from the right. the nearest one auto-locks and its word highlights. type the word, it dies. keep typing. don't die.

## controls 🕹️

| key | action |
|-----|--------|
| **F** | move up one lane |
| **J** | move down one lane |
| **typing** | deal damage to the active target |
| **backspace** | doesn't help. you've already made the mistake. |

three lanes. three lives. the rest is reflexes and vocabulary.

## power words ✨

certain words in the pool are **power words** — they glow to let you know. when you complete one:

| word | effect |
|------|--------|
| **LASER** | nukes every projectile on screen |
| **NUKE** | clears all standard enemies (not bosses) |
| **SHIELD** | blocks the next hit you'd take |

if you see a glowing word, prioritize it. unless a shooter is about to fire at you. then you have to think, which is the game's way of telling you to be better.

## combo system 🔥

kill enemies back to back without a typo and your multiplier climbs: x1 → x2 → x3 → x4. one typo and you're back to x1. the score formula is `word length × wave × multiplier` so a good combo on a long word late in the run hits different.

## tech stack 🛠️

```
index.html          the whole game. one file. 📄
```

vanilla js. canvas rendering. typed-character highlighting in real time — confirmed chars change color as you type them correctly. screen shake on damage because feedback matters. no dependencies, no build, no regrets.

## disclaimer ⚠️

some of this readme was written by an AI. the technical bits are accurate; the origin story is speculation; the part about it being fun is definitely true. you'll figure out which is which.

## license 📜

BSD-3. attribution please 🙏. full terms in [LICENSE](../LICENSE).
