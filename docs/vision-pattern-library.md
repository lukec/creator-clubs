# Flowtoys Vision Club pattern library

Last reviewed: 2026-07-19

## Why this is relevant

Luke owns six consumer Vision Clubs and identified an important design rule
from using them in dark performance conditions: a juggled prop must retain
enough light for the audience to track its trajectory and for the performer to
see catches. Sparse foreground detail on an otherwise black club may look
interesting in an editor but is usually a poor default for juggling.

The consumer Vision Club library is therefore useful both as visual inspiration
and as evidence of a mature prop-specific design vocabulary.

## Sources and evidence boundary

The official [Pages interface overview](https://flowtoys2.freshdesk.com/support/solutions/articles/6000187766-the-pages-interface-pages-1-13-overview)
lists 30 standard modes on Pages 1-3 and 50 experimental Vision modes on Page
13. The official [Vision modes table](https://flowtoys2.freshdesk.com/support/solutions/articles/6000215170-vision-core-modes-table-adjust-parameters-kinetic-responses)
provides a club-specific PDF with pictures, adjust parameters, kinetic behavior,
and estimated runtime.

The attachment currently served by the support page is byte-identical to the
2021 flowOS 2.6 chart:

```text
SHA-256: ae6d44aacc24ec56e7ae6fe2c5514668818369fb4b2b0365d79ae539f7e05619
Pages: 8
Size: 5,452,186 bytes
```

Flowtoys' later firmware notes say the platform has advanced beyond 2.6. Treat
this catalog as a source-backed design library, not proof that every name and
implementation is unchanged in the latest consumer firmware.

The Flowtoys sources do not state this project's continuous-visibility policy,
and the catalog includes strobe and potentially sparse modes. The policy below
comes from Luke's physical juggling experience and our safety/design judgment;
the catalog supplies techniques and inspiration, not an external safety
endorsement.

A community [Vision Club preset photo collection](https://www.reddit.com/r/juggling/comments/jv1g6h/all_vision_club_presets/)
also links stationary/spinning photographs for the 30 standard presets. Those
photos are useful visual references but are community evidence, not official
implementation documentation.

## Kinetic vocabulary

The official chart defines:

- `active`: visibly responds to low, medium, or high force, bumps, and catches;
- `passive`: discreetly changes between static and kinetic play;
- `zeroG`: responds to stalls, floats, and flat/weightless moments; and
- `n/a`: no kinetic effect.

It also says some modes use multiple triggers, such as one response for low
force, another for high force, and a pulse during zero-G. This supports the
project's scene model: continuous visible base plus movement-driven modulation
and event accents.

## Standard modes

The `Project tags` column is an interpretive retrieval aid derived from the
mode name and the single official movement-trace image. It is not Flowtoys
metadata. Colors can change with adjustment, and a time-varying mode may look
different from the published snapshot.

| Page/mode | Name | Adjust 1 | Adjust 2 | Kinetic | Project tags (inferred) |
| --- | --- | --- | --- | --- | --- |
| P1M1 | Rainbow | density | mapping | n/a | joyful; rainbow; smooth gradient; full-field; expansive |
| P1M2 | Rainbow Drops | density | mapping | passive + zeroG | playful; rainbow; segmented rays; droplets; kinetic |
| P1M3 | Bold | hue | saturation | n/a | calm; white/pastel; solid field; minimal; visibility |
| P1M4 | Lantern | hue | brightness | n/a | warm; amber/orange; glow; lantern; visibility |
| P1M5 | Fire | hue | mapping | passive | intense; red/orange/yellow; flame; organic; dramatic |
| P1M6 | Water | hue | n/a | passive | calm; cyan/blue; ripples; aquatic; flowing |
| P1M7 | Earth | hue | hue | active + zeroG | grounded; green/orange/yellow; concentric field; elemental; kinetic |
| P1M8 | Air | hue | n/a | active + zeroG | airy; blue/white; sparkles; particle field; ethereal |
| P1M9 | Spirit | hue | n/a | passive | mystical; magenta/cyan/white; radiating particles; aura; kinetic |
| P1M10 | Pulse | hue | hue | active + zeroG | energetic; cyan/magenta/red; smooth rings; pulse; climactic |
| P2M1 | Candy | density | saturation | active + zeroG | playful; pastel rainbow; spiral bands; confection; kinetic |
| P2M2 | Petals | saturation | special | n/a | gentle; pastel rainbow; radial spokes; floral; delicate |
| P2M3 | Love | hue | n/a | n/a | romantic; pink/white; full-field glow; soft; warm |
| P2M4 | Watermelon | hue | n/a | active + zeroG | playful; pink/green/black; fruit; dotted field; graphic |
| P2M5 | Freedom | hue | hue | active + zeroG | bold; red/white/cyan; striped bands; rhythmic; graphic |
| P2M6 | Microdots | saturation | density | passive + zeroG | whimsical; rainbow; tiny particles; confetti; kinetic |
| P2M7 | Unicorn | speed | n/a | passive + zeroG | fantastical; pink/rainbow/white; rings and sparkles; magical; bright |
| P2M8 | Blue Blazer | hue | mapping | active + zeroG | dynamic; blue/orange/white; pinwheel; flame; high energy |
| P2M9 | Solar Flare | hue | special | active + zeroG | explosive; orange/white; crossing arcs; solar; impact |
| P2M10 | Strobe | hue | density | active + zeroG | urgent; pink/red/white; radial spokes; strobe; high contrast |
| P3M1 | Flamebow | hue | mapping | passive | ecstatic; rainbow/fire; flame gradient; organic; kinetic |
| P3M2 | Alicorn | hue | brightness | passive + zeroG | magical; rainbow/white; crossing lattice; celestial; bright |
| P3M3 | Liquid Sugar | saturation | saturation | n/a | dreamy; cyan/pastel/rainbow; smooth field plus droplets; sweet; luminous |
| P3M4 | Rainbow Dash | density | n/a | active + zeroG | fast; rainbow; broken spiral bands; chase; kinetic |
| P3M5 | Fireball | hue | mapping | active + zeroG | powerful; orange/yellow/red; cellular blobs; fire; impact |
| P3M6 | Froth | hue | n/a | passive + zeroG | cool; blue/white; bubbly rings; water; kinetic |
| P3M7 | Jammin | hue | mapping | active + zeroG | groovy; green/yellow/red; spiral bands; reggae; rhythmic |
| P3M8 | Bolder | hue | brightness | n/a | clean; white/pastel; solid field; minimal; high visibility |
| P3M9 | Sunset | hue | n/a | n/a | warm; orange/pink/blue; smooth gradient; dusk; emotional |
| P3M10 | Daybreak | hue | hue | passive | hopeful; orange/red/white; sunrise field; dawn; kinetic |

## Page 13 experimental modes

| Mode | Name | Adjust 1 | Adjust 2 | Kinetic | Project tags (inferred) |
| ---: | --- | --- | --- | --- | --- |
| 1 | Flames | hue | n/a | active + zeroG | intense; red/orange; full-field fire; hot; kinetic |
| 2 | Skittles | hue | density | n/a | playful; rainbow/red; dotted rings; candy; festive |
| 3 | Rainbow Brite | hue | n/a | active + zeroG | uplifting; pastel rainbow/white; smooth field; bright; kinetic |
| 4 | Party Fish | hue | density | active + zeroG | festive; cyan/pink/yellow; broken spiral; aquatic; playful |
| 5 | Candle | hue | n/a | active + zeroG | intimate; amber/orange; glow; flame; low energy |
| 6 | Rainbow Fade | hue | mapping | n/a | romantic; pink/rainbow; smooth gradient; fade; calm |
| 7 | OG Candy | saturation | saturation | n/a | nostalgic; red/white/amber; segmented radial bands; candy; graphic |
| 8 | Bounce | hue | hue | passive + zeroG | playful; yellow/purple; looping arcs; elastic; kinetic |
| 9 | Kinetic Colors | hue | hue | active + zeroG | responsive; cyan/magenta; two-tone field; motion; bold |
| 10 | Rave9000 | density | brightness | active + zeroG | club energy; rainbow/black; rings and spokes; rave; intense |
| 11 | Balance Point | hue | n/a | n/a | centered; teal/white; smooth field; balance; calm |
| 12 | Expandoblob | hue | n/a | active + zeroG | playful; pink/blue; concentric rings; expanding; kinetic |
| 13 | Baby Spice | hue | n/a | active + zeroG | cheeky; orange/white; pinwheel; pop; energetic |
| 14 | Responsive Rainbow Fade | saturation | mapping | active + zeroG | responsive; pink/rainbow; full-field fade; smooth; kinetic |
| 15 | Poke Bowl | density | n/a | active + zeroG | tropical; pink/green/white; spiral ribbons; food; lively |
| 16 | Mr. Bones | density | mapping | n/a | spooky; white/black; radial bones; skeleton; high contrast |
| 17 | Bonus Bonanza | special | n/a | passive + zeroG | celebratory; rainbow; swirling ribbons; party; kinetic |
| 18 | OG Strobe | hue | mapping | active + zeroG | urgent; pink/white; segmented spokes; strobe; high contrast |
| 19 | Lightning Bug | hue | hue | n/a | electric; blue/magenta; glowing ring; lightning; nocturnal |
| 20 | Day Club | hue | mapping | n/a | clean; cyan/white; broad bands; daylight; visibility |
| 21 | Rainbizzle | special | n/a | active + zeroG | festive; rainbow/black; concentric bands; sparkle; kinetic |
| 22 | Fruit Basket | hue | n/a | active + zeroG | juicy; magenta/orange/violet; smooth field; fruit; warm |
| 23 | Marvin's Mode | speed | n/a | active + zeroG | joyful; rainbow; smooth gradient; spinning; kinetic |
| 24 | Hidden Rainbow | saturation | n/a | n/a | subtle; white/pastel; concealed spectrum; reveal; calm |
| 25 | Rainbow Bridge | hue | n/a | passive + zeroG | playful; rainbow/pink; segmented lattice; bridge; kinetic |
| 26 | OG Sparkles | hue | hue | n/a | mystical; blue/purple/white; particle field; sparkle; night |
| 27 | Day Club II | hue | hue | n/a | bold; green/purple; broad bands; graphic; daylight |
| 28 | Ghost | hue | saturation | active + zeroG | eerie; white/lavender/black; soft rings; ghost; desaturated |
| 29 | Sega Genesis | hue | hue | passive + zeroG | retro; RGB/black; pixelated spiral bands; videogame; rhythmic |
| 30 | Sean's Bane | hue | n/a | passive + zeroG | chaotic; rainbow/black; long spokes; speed; kinetic |
| 31 | Gulp Chug | hue | hue | active + zeroG | comic; red/blue/white; full-field; drinking; bold |
| 32 | OG Watermelon | hue | hue | passive + zeroG | playful; red/green; block bands; fruit; graphic |
| 33 | Rainbow Dashish | hue | density | n/a | mysterious; purple/green/black; sparse glow; chase; dark |
| 34 | OG Rainbow Dash | hue | density | n/a | joyful; rainbow; thick spiral bands; chase; kinetic |
| 35 | Thumb Light | special | special | active + zeroG | minimal; red; solid field; utility; bold |
| 36 | Euro 2 | hue | n/a | n/a | soft; pink/white; concentric gradient; dance; nostalgic |
| 37 | OG Rainbow Drops | hue | special | passive | energetic; red/blue; radial droplets; rain; kinetic |
| 38 | Alt Pulse | hue | hue | active + zeroG | warm; orange/white; smooth field; pulse; kinetic |
| 39 | Lightning Storm | hue | hue | passive + zeroG | dramatic; purple/orange; crossing bolts; storm; chaotic |
| 40 | Sparkle Pony | special | n/a | passive + zeroG | fantastical; rainbow/white/blue; sparkles; magical; kinetic |
| 41 | Thing2 / Nebula | hue | n/a | active + zeroG | cosmic; magenta/blue; swirling field; nebula; kinetic |
| 42 | OG Lantern | brightness | n/a | active + zeroG | warm; amber/orange; glow; lantern; visibility |
| 43 | Sorcerer | hue | hue | active + zeroG | mystical; purple/white; smooth field; magic; dramatic |
| 44 | Ice Cream Soda | hue | hue | active + zeroG | cool; blue/white/brown; rings; dessert; crisp |
| 45 | Adventure Time | speed | density | active + zeroG | adventurous; rainbow/black; long spokes; cartoon; fast |
| 46* | Flintstones / Candy Corn | hue | n/a | passive | playful; orange/white/brown; pinwheel; candy; retro |
| 47 | Indiana Jones | hue | n/a | active + zeroG | adventurous; violet/teal/white; gradient; cinematic; kinetic |
| 48 | Zen | hue | n/a | n/a | calm; green/yellow/white; soft gradient; meditative; low energy |
| 49 | Candy Crush | hue | n/a | n/a | excited; rainbow/pink; rays and rings; arcade; festive |
| 50 | 5-O | hue | hue | active + zeroG | bold; red/blue; pinwheel; siren; urgent |

`46*` is an inference from table position. The official chart mistakenly labels
both Adventure Time and Flintstones/Candy Corn as mode 45, then resumes at 47.

## Visual design lessons

The pictures are long-exposure movement traces, not direct per-LED frame dumps,
so do not infer exact algorithms or pixel coverage from them. They nevertheless
show a consistent design vocabulary:

- broad continuous fields and gradients;
- low-energy backgrounds with brighter dots, rings, flames, or stripes;
- repeated structures distributed across the prop rather than one isolated
  crawling point;
- static beauty that changes into a more energetic kinetic form;
- force, catch, stall, float, and zero-G accents layered over a persistent base;
- hue, saturation, density, speed, mapping, and brightness as reusable scene
  parameters.

Useful families to prototype with Creators Clubs include:

- **full-field:** Rainbow, Bold, Lantern, Love, Sunset, Daybreak;
- **organic texture:** Fire, Water, Candy, Flamebow, Froth, Flames;
- **distributed particles:** Air, Spirit, Microdots, Sparkle Pony;
- **structured bands:** Watermelon, Freedom, Rainbow Dash, Sega Genesis;
- **motion events:** Pulse, Solar Flare, Kinetic Colors, Alt Pulse;
- **visibility-first:** Lantern, Bolder, Day Club, OG Lantern, Zen.

## 2026-07-19 gap analysis against Motion Lab V6

Motion Lab V6 already covers broad color fields, roll/flip riders, splits,
bands, portals, gradients, flame/water activity, direction/heat, energetic
sparks, hand/air state, throw classification, release/catch accents, airborne
tracers, and the time-based Police vocabulary. The stock Vision catalog still
suggests several materially different primitives:

| Missing or underrepresented primitive | Stock references | What to test next |
| --- | --- | --- |
| Graceful scintillation | Air, Spirit, Microdots, OG Sparkles, Sparkle Pony | Slow independent twinkles and glints over a bright related field; distinct from V6's busy activity sparks |
| Bubbles, cells, and liquid blobs | Liquid Sugar, Fireball, Froth, Thing2/Nebula | Broad organic shapes that grow, merge, and dissolve rather than translate as rigid bands |
| Expansion and elastic response | Pulse, Bounce, Expandoblob, Alt Pulse | Rings or broad zones that breathe, expand, rebound, and react to catches/zero-G |
| Hidden-color reveal | Hidden Rainbow, Responsive Rainbow Fade | A pale or nearly solid field that reveals saturated color only with motion or a throw |
| Lattice, spokes, and pinwheels | Petals, Alicorn, Rainbow Bridge, Baby Spice, Adventure Time | Repeated axial structures designed for long-exposure rays and woven juggling traces |
| Multi-trigger transformation | Earth, Air, Pulse, many active+zeroG modes | One readable base, a distinct active texture, and a third stall/float/catch accent rather than one scalar modulation |
| Calm living light | Lantern, Candle, Love, Zen | Warm breath, small flame wander, or very slow chroma drift with no requirement for energetic motion |
| Controlled global flash | Strobe, OG Strobe, Solar Flare | Short, bounded high-contrast accents over a persistent visibility floor; never an accidental blackout loop |

The comparison is vocabulary-level. The official chart uses long-exposure
images and does not publish algorithms, so future implementations should be
original and judged on the physical Creator diffuser.

## Implemented browser theme pages

Police succeeds because the palette, timing, and cultural meaning reinforce one
another. Motion Lab now gives each selected theme its own small authored act,
then ports only accepted winners to constrained WASM. The browser pages contain
six or seven effects according to the theme rather than filling an arbitrary
eight-slot matrix. Their individual dramatic briefs are in
`docs/theme-page-designs.md`.

| Theme | Core palette | Signature visual vocabulary |
| --- | --- | --- |
| Lightning Storm | midnight indigo, violet, electric blue, white | irregular bolts, rolling cloud wash, sheet-light flash, branching glints |
| Fire / Furnace | ember red, orange, gold, hot white | candle breath, rising flame, cinders, fireball, white-hot impact |
| Bioluminescent Ocean | deep blue, teal, cyan, ice white | slow current, bubbles/froth, plankton twinkles, cresting wave |
| Toxic Reactor | acid green, chartreuse, yellow, violet | warning bands, pulsing core, contamination sweep, unstable critical flash |
| Arcade Power-Up | cyan, magenta, lemon yellow, white | scanline, charge meter, coin sparkle, RGB glitch, invincibility burst |
| Disco / Mirrorball | warm white, gold, magenta, cyan | traveling glints, mirrored facets, four-on-the-floor pulse, sparkle shower |
| Haunted / Ghost | ice white, lavender, pale cyan, sickly green | apparition fade, candle flicker, phantom trail, possession color switch |
| Solar Sunset | amber, coral, hot pink, violet, deep blue | horizon gradient, solar flare, eclipse rim, day-to-night transformation |
| Matsuri Night | vermilion, lantern gold, indigo, white | lantern breath, fan bands, taiko pulse, fireworks and falling sparks |
| Traffic / Racing | red, amber, green, white | start-light countdown, hazard beacon, checkered chase, finish-line flash |
| Candy / Unicorn | hot pink, cyan, lemon, lavender, white | sprinkles, bubble pops, ribbon bands, pastel sparkle bloom |
| Fire and Ice | orange/red/gold versus cyan/blue/white | opposing halves, advancing boundary, collision flash, sensor-selected side |

The reusable vocabulary remains whole-field identity, pulse, split,
scanner/rider, particles, organic texture, motion-reactive transformation, and
signature event. It is a toolbox, not a required matrix: each page uses only the
techniques that support its story. The current browser implementation contains
12 pages and 78 effects and is clearly labelled as not yet on the club.

## Project performance-visibility policy

For juggling and theatre scenes, visibility is a functional requirement as well
as an artistic one.

1. Every ordinary scene must preserve a readable luminous trace of the whole
   club throughout its cue. Sparse foreground elements require a nonblack,
   section-compatible background or a separate visibility layer.
2. The initial full-strip normalized floor of `0.08-0.12` was physically
   rejected as much too dim at club-global brightness `0.883`. Select its
   replacement with the fixed-step procedure in `docs/brightness-calibration.md`;
   no normalized value becomes policy until physically accepted.
3. Apply the floor after the artistic base so black pixels cannot erase it.
   BenTo 2.1 offers only Add, Alpha, and Mask block-layer blends. A low-level Add
   layer is the current portable implementation; a future per-channel Max/
   Lighten blend would enforce a floor with less palette contamination.
4. Accent layers may brighten, sparkle, chase, pulse, or strobe, but their off
   phase must reveal the visibility base rather than blacking out the prop.
5. Complete blackout is an exceptional choreographic cue. It must be brief,
   deliberate, documented, rehearsed, and accepted by the performer for catch
   safety. It is never the accidental default/background of a pattern.
6. Validate both stationary appearance and moving/juggled trace. Editor previews
   and long-exposure photographs answer different questions.
7. Future generated shows should sample their timelines offline and report
   minimum per-frame output, dark-pixel fraction, and longest low-visibility
   interval before physical testing.

The current full-song proof predates this policy. Its bridge `Point` clips use a
black background and its early `Range` rebuild leaves most of the club nearly
black. Those passages require a section-colored visibility layer before the
show is treated as performance-ready.
