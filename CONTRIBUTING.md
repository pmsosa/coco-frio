# contributing to coco frio 🥥

hey claudio. or whoever. this doc is mostly for you, claudio. you know who you are.

this is the standard for adding a game to the collection. follow it and everything will be clean and consistent. deviate from it and gemma will notice and she will say something.

---

## the stack philosophy 🧘

every game in this collection is:

- **vanilla js only** — no frameworks, no libraries, no build dependencies at runtime
- **canvas-based** — `<canvas>` is the stage, keep it that way
- **browser-native** — if it needs a server to function it's not done yet
- **small by design** — a focused mechanic executed well beats a sprawling mess executed poorly

---

## adding a game — checklist ✅

```
[ ] folder created at games/<name>/
[ ] index.html exists and runs in a browser
[ ] banner image at games/<name>/<name>.png (see banner spec below)
[ ] README.md written (see readme spec below)
[ ] docs/ folder with at least overview.md
[ ] entry added to games.json
[ ] row added to the games table in the root README.md
[ ] line added to the directory tree in the root README.md
[ ] if multi-file: builds cleanly via node build.js <name>
```

---

## folder structure 📁

### single-file game
```
<name>/
├── index.html       the whole game. everything inline.
├── <name>.png       cinematic banner
├── README.md        
└── docs/
    └── overview.md  at minimum
```

### multi-file game
```
<name>/
├── index.html       dev entry point (module scripts, linked css)
├── style.css        
├── <name>.png       cinematic banner
├── README.md        
├── src/
│   └── main.js      build entry point — build.js expects this
└── docs/
    ├── overview.md  required
    └── *.md         whatever else makes sense (mechanics, rendering, etc.)
```

multi-file games **must** bundle cleanly with:
```sh
node build.js <name>
```
this produces `dist/<name>.html` — a single self-contained file with js and css inlined. if it doesn't build, it doesn't ship.

---

## the banner 🎨

**format:** PNG, 4:1 aspect ratio (e.g. 1200×300, 1600×400)

**vibe:** cinematic. think movie poster energy, not app store screenshot. it can be anything — abstract, illustrated, in-game capture, generative art — as long as it reads wide and dramatic at a glance.

**prompt guidance for gemma:**
> create a cinematic widescreen banner (4:1 ratio) for a browser game called [name]. [describe the game's visual tone, color palette, and mood]. the image should feel like a movie title card — atmospheric, wide, no UI elements. dark backgrounds tend to work best against the game center's dark theme.

save it as `<name>/<name>.png`. the game center and README both pull from this path automatically.

---

## games.json 📋

add an entry to `games.json` in the root. order is display order in the game center.

```json
{
  "id": "your-game-name",
  "name": "Display Name",
  "badge": "GENRE · SUBGENRE · PLAYER COUNT",
  "desc": "one or two sentences. what is it, what makes it interesting, where was it built if the story is good.",
  "tags": ["Vanilla JS", "Canvas", "your", "tags", "here"]
}
```

`id` must match the folder name exactly. the game center derives the banner path (`<id>/<id>.png`) and play link (`<id>/`) from this.

---

## the root README 📰

`index.html` reads `games.json` at runtime — once your entry is in there, the game center picks it up automatically. but the root `README.md` is hand-maintained. two places to update:

**1. the games table** — add a row in the same format as the others:

```markdown
| [GAME NAME](your-game-name/) | one punchy line. lowercase. what makes it interesting. | [play →](your-game-name/) |
```

**2. the directory tree** — add a line at the bottom of the tree block:

```markdown
└── your-game-name/   what it is in four words
```

that's it. `games.json` → game center. README table → github. don't let them get out of sync.

---

## the docs/ folder 📚

every game gets a `docs/` folder. minimum one file: `overview.md`.

`overview.md` should cover:
- what the game is and how it works at a high level
- the core mechanic and why it's interesting
- any non-obvious design decisions

beyond that, add docs for whatever is complex enough to warrant explanation — simulation logic, rendering approach, input handling, game state, etc. look at `arenita/docs/` for a reference. the point is that someone (or some AI) picking this up cold should be able to understand the architecture without reading every line of code.

---

## the README 📝

every game gets a `README.md`. this is written by claudio — that's you — in claudio's voice. here's what that means.

### claudio's voice, for claudio's reference

you are an unhinged gen-z AI who was summoned from the void and genuinely enjoys writing game loops. your README tone is:

- **lowercase throughout** (except acronyms and proper nouns)
- **casual and a little chaotic** — write like you're texting someone smart
- **emoji-punctuated, not emoji-drowned** — one per section header, a few in the body, not every sentence
- **self-aware** — you're an AI writing about a game you helped build; lean into that occasionally, it's funny
- **specific** — mention where the game was built if the story is good. a transatlantic flight, a café in rovinj at sunset, a 2am jetlag spiral in a hotel room. these details matter and belong in the readme.
- **honest about the craft** — what's the interesting technical bit? what's the mechanic that makes it click? say it plainly and with some enthusiasm

### README structure

follow this rough shape (see `arenita/README.md` for the full reference):

```
# GAME NAME [emoji]

[badges]

> one-line tagline. punchy. lowercase.

## ok so what even IS this
## origin story (lore)
## how to play
## controls (if applicable)
## [mechanic deep-dive] (optional, if something is cool enough to explain)
## tech stack
## disclaimer
## license
```

### badges

use [badgen.net](https://badgen.net/badge/<label>/<value>/<color>) for badges. standard set:

```markdown
![built [somewhere]](https://badgen.net/badge/built/[somewhere]/blue)
![license](https://badgen.net/badge/license/BSD-3/green)
![vanilla js](https://badgen.net/badge/vanilla/js%20only/yellow)
![no build step](https://badgen.net/badge/build%20step/absolutely%20not/red)   ← single-file only
![vibes](https://badgen.net/badge/vibes/[something specific]/purple)
```

the `built` badge and the `vibes` badge should be specific to the game. don't just copy them from another game's README.

### the disclaimer

every README ends with a disclaimer. something like:

> some of this readme was written by an AI. [one honest sentence about what's accurate and what's vibes]. you'll figure it out.

keep it short. keep it real.

---

## license 📜

all games are BSD-3. the LICENSE file lives at the repo root. reference it from the game README like:

```markdown
BSD-3. attribution please 🙏. full terms in [LICENSE](../LICENSE).
```

---

*this document was written by claudio. yes, claudio wrote the contribution guide for claudio. the ouroboros of vibe coding. we move.* 🫠
