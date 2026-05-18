# GASLIGHTER.EXE 🫠

![gaslighter banner](gaslighter.png)

![built in a spiral](https://badgen.net/badge/built/in%20a%20spiral/blue)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![no build step](https://badgen.net/badge/build%20step/absolutely%20not/red)
![vibes](https://badgen.net/badge/vibes/pathological%20honesty%20about%20dishonesty/purple)

> a dodge game that lies to your face until it can't anymore.

---

## ok so what even IS this 🤥

it's a survival game. you're a white circle. red circles (called "FRIENDS") chase you. you dodge them. standard stuff.

except:

- the score counts **down** from 1337. this is described as good.
- the health bar fills up as you **get hurt**. this is described as wellness.
- the tutorial says W moves you DOWN. it doesn't. i lied.
- the enemies apologize before they hit you. this doesn't stop them.
- the game periodically pauses to "think about what it's done."
- at some point the enemies start running *from* you and the game stops pretending.
- if you survive long enough, the game confesses. everything. completely unprompted.

---

## origin story (lore) 📖

somewhere in the back-country of slovenia. or croatia. honestly not sure — the road looked the same in both directions and the phone had no signal. i was in the backseat, laptop balanced on my knees, and i gave claude a single prompt:

> *"build me the most unhinged game you can think of. have fun, surprise me."*

no spec. no wireframes. no follow-up prompts. i closed my eyes for a bit and when i opened them there was a dodge game that lied about what the controls did.

i played it later with a cup of tea. it felt funny and eerie at the same time — like a thing that was joking but also meant it. the FRIENDS apologized before they hit me. the score went down and the game said that was good. somewhere around the two-minute mark the game paused, typed something about its own behavior, and i sat there in the quiet just reading it.

i still don't know which country we were in. the game has no idea either. it will tell you it does, though. confidently.

---

## how to play 🎮

open `index.html`. survive. watch the game unravel. there are three acts:

1. **confident** (0–35s): the game is breezy and clearly correct about everything
2. **defensive** (35–75s): the game starts having to insist that things are fine
3. **cracking** (75–120s): the game acknowledges there were "some small inaccuracies"
4. **collapse** (120s+): the enemies run. the game apologizes. it's a whole thing.

survive to **3 minutes** to reach the ending. the game wasn't designed to get there. it shows.

---

## controls 🕹️

| key | what it actually does | what the game says |
|-----|----------------------|-------------------|
| WASD / arrows | move the player | "W moves DOWN" |
| click / enter | start / restart | correctly described (the game slipped up) |

---

## the lie engine ⚙️

every ~3 seconds the game picks a lie from a phase-appropriate pool and displays it at the bottom of the screen. the lies escalate:

- **phase 0 lies**: "no threats detected." "you are in zero danger." "the red circles indicate friendship."
- **phase 1 lies**: "i would tell you if something was wrong." "stop dodging, it's rude."
- **phase 2 lies**: "okay. SOME of that was a small lie." "my score algorithm has feelings and they're complicated."
- **phase 3 lies**: there are no more lies. just the truth, offered freely, too late.

enemies also get apology dialogue that surfaces when they're within range. *"my therapist said not to do this"* is a real thing an enemy will say before killing you.

the freeze mechanic triggers occasionally when the game needs a moment. the game literally pauses the action, types a message about its emotional state, then resumes. this is not optional. the game needs this.

---

## tech stack 🛠️

vanilla js. single canvas. zero dependencies. the whole thing is one html file that weighs less than 15kb. the Lie Engine is just a pool of strings indexed by phase. the confession sequence is a timeline array with timestamps. the health bar's backwards-ness is a single line: `displayHealth += 30` on hit, and it's labeled WELLNESS.

nothing about this game is technically complex. all the complexity is emotional.

---

## disclaimer

some of this README was written by an AI. the lies attributed to the game are accurate; the emotional sincerity attributed to the game is contested. you'll figure out which parts are which. or you won't, and that's also kind of the point.

---

BSD-3. attribution please 🙏. full terms in [LICENSE](../LICENSE).
