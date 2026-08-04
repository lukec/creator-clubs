const LED_COUNT = 32;
const TAU = Math.PI * 2;

const COLOR = Object.freeze({
  amber: [255, 92, 10],
  acid: [191, 255, 16],
  blue: [18, 72, 255],
  coral: [255, 54, 60],
  cyan: [0, 236, 255],
  deepBlue: [5, 16, 74],
  ember: [102, 5, 1],
  gold: [255, 180, 18],
  green: [24, 255, 82],
  hotPink: [255, 24, 188],
  ice: [130, 240, 255],
  indigo: [25, 8, 95],
  ivory: [255, 232, 188],
  lavender: [172, 76, 255],
  lemon: [255, 246, 46],
  magenta: [255, 0, 198],
  orange: [255, 76, 0],
  paleGreen: [165, 255, 132],
  pink: [255, 82, 220],
  red: [255, 12, 30],
  teal: [0, 170, 164],
  vermilion: [255, 36, 12],
  violet: [104, 20, 255],
  white: [255, 255, 255],
  yellow: [255, 220, 24],
});

const effect = (id, name, description) => Object.freeze({ id, name, description });
const page = (id, name, description, effects) => Object.freeze({
  id,
  name,
  description,
  effects: Object.freeze(effects),
});

export const THEME_PAGES = Object.freeze([
  page("lightning", "Lightning Storm", "Cloud pressure, irregular strikes, corona, and caught electricity", [
    effect("sleeping-thunderhead", "Sleeping Thunderhead", "Indigo cloud pressure breathes before the strike"),
    effect("forked-sky", "Forked Sky", "Irregular white-blue branches leave violet afterimages"),
    effect("sheet-lightning", "Sheet Lightning", "Unpredictable broad single and double body flashes"),
    effect("ball-lightning", "Ball Lightning", "A bright electric orb ricochets with a violet wake"),
    effect("st-elmos-fire", "St. Elmo’s Fire", "Cyan corona gathers at both ends while crawlers cross the handle"),
    effect("thunder-roll", "Thunder Roll", "Roll winds the cloud; activity summons the discharge"),
    effect("caught-bolt", "Caught Bolt", "Held light traps a bolt; airborne light releases the fracture"),
  ]),
  page("fire", "Fire / Furnace", "Embers, bellows, cinders, molten matter, impact, and rebirth", [
    effect("pilot-light", "Pilot Light", "A golden flame breathes above a visible ember bed"),
    effect("bellows", "Bellows", "Movement drives ember through gold to white-hot"),
    effect("cinder-swarm", "Cinder Swarm", "Handle sparks rise into a broad smoky body glow"),
    effect("molten-veins", "Molten Veins", "Slow gold channels move through orange-red material"),
    effect("fireball-impact", "Fireball Impact", "A hot orb accelerates into a broad collision bloom"),
    effect("phoenix", "Phoenix", "Embers collapse, luminous wings unfold, and flame returns"),
  ]),
  page("ocean", "Bioluminescent Ocean", "Abyssal current, plankton, bubbles, jellyfish, waves, and whale song", [
    effect("abyssal-current", "Abyssal Current", "Deep water carries broad teal currents"),
    effect("plankton-wake", "Plankton Wake", "Motion wakes cyan organisms behind an implied current"),
    effect("bubble-column", "Bubble Column", "Expanding bubbles rise and dissolve into body foam"),
    effect("jelly-pulse", "Jelly Pulse", "The body becomes a soft bell above trailing tentacles"),
    effect("breaking-wave", "Breaking Wave", "A bright crest climbs and collapses into foam"),
    effect("biolume-touch", "Biolume Touch", "Movement reveals cyan and magenta life in dark water"),
    effect("whale-song", "Whale Song", "One slow whole-club swell for suspended juggling"),
  ]),
  page("toxic", "Toxic Reactor", "Warning grammar, radioactive cores, leaks, Geiger clicks, and mutation", [
    effect("warning-stripe", "Warning Stripe", "Acid and violet hazard bands crawl without black gaps"),
    effect("reactor-heart", "Reactor Heart", "A radioactive core pulses in the thick body"),
    effect("contamination-leak", "Contamination Leak", "Green material seeps from handle into body"),
    effect("geiger-glitter", "Geiger Glitter", "Sharp yellow-white clicks puncture a green field"),
    effect("critical-mass", "Critical Mass", "Pulses accelerate, compress, and release"),
    effect("mutation", "Mutation", "Roll and flip alter both hue and broad-lobe count"),
  ]),
  page("arcade", "Arcade Power-Up", "Coin pings, progress, escalating sweeps, glitches, bosses, and invincibility", [
    effect("insert-coin", "Insert Coin", "A gold ping enters the handle and becomes a cyan ripple"),
    effect("loading-bar", "Loading Bar", "The club fills from knob to cap in unmistakable stages"),
    effect("power-up-stack", "Power-Up Stack", "Three successively faster sweeps accumulate energy"),
    effect("rgb-glitch", "RGB Glitch", "Broad cyan, magenta, and yellow blocks misregister"),
    effect("boss-warning", "Boss Warning", "Magenta alarm fields alternate with cyan HUD marks"),
    effect("extra-life", "Extra Life", "A green-cyan rise ends in a celebratory star"),
    effect("invincibility", "Invincibility", "The entire club races through a prismatic loop"),
  ]),
  page("disco", "Disco / Mirrorball", "Facets, floor beats, spotlights, glitter, and a final slow dance", [
    effect("mirrorball", "Mirrorball", "Rotating warm facets reflect magenta and cyan room color"),
    effect("four-on-floor", "Four on the Floor", "A gold whole-club beat answers colored offbeats"),
    effect("studio-sweep", "Studio Sweep", "A broad magenta-cyan-gold spotlight scans the silhouette"),
    effect("facet-flip", "Facet Flip", "The flip control turns large reflective planes"),
    effect("glitter-drop", "Glitter Drop", "A shower falls from the body into the handle"),
    effect("last-dance", "Last Dance", "Warm light remembers earlier cyan and magenta flashes"),
  ]),
  page("haunted", "Haunted / Ghost", "Mist, apparitions, séances, trails, possession, and vanishing", [
    effect("cold-breath", "Cold Breath", "Pale mist condenses and recedes through lavender"),
    effect("apparition", "Apparition", "A broad white figure materializes in the body"),
    effect("candle-seance", "Candle Séance", "A handle candle summons a cool ghost above it"),
    effect("phantom-trail", "Phantom Trail", "A white tracer leaves a long lavender decay"),
    effect("possession", "Possession", "Calm pale light snaps sickly green or magenta in motion"),
    effect("poltergeist", "Poltergeist", "Broad regions twitch as if tugged out of order"),
    effect("vanishing-act", "Vanishing Act", "A low blue ghost floor remains as the figure disappears"),
  ]),
  page("solar", "Solar Sunset", "Horizons, sunrise, flares, eclipse, sunspots, and afterglow", [
    effect("horizon", "Horizon", "A stable night-to-gold sky rewards the club silhouette"),
    effect("sunrise", "Sunrise", "A golden boundary rises and warms the body"),
    effect("solar-flare", "Solar Flare", "A hot arc escapes and sweeps around the club"),
    effect("eclipse", "Eclipse", "Deep violet carries a thin intense gold corona"),
    effect("sunspots", "Sunspots", "Broad red-orange cells drift across a gold field"),
    effect("afterglow", "Afterglow", "Sunset loses heat while isolated pink memories remain"),
  ]),
  page("matsuri", "Matsuri Night", "Lanterns, taiko, fans, fireworks, dance, and streamers", [
    effect("lantern-row", "Lantern Row", "Broad vermilion lanterns breathe over indigo night"),
    effect("taiko-heartbeat", "Taiko Heartbeat", "Gold and white strikes alternate with indigo resonance"),
    effect("folding-fan", "Folding Fan", "Roll opens vermilion, ivory, and gold ribs"),
    effect("chrysanthemum", "Chrysanthemum Firework", "An axial burst expands into falling gold sparks"),
    effect("bon-odori", "Bon Odori", "Calm repeating bands bow with the flip angle"),
    effect("paper-streamers", "Paper Streamers", "Long bright ribbons travel at different speeds"),
    effect("festival-finale", "Festival Finale", "Overlapping body fireworks rain into handle sparks"),
  ]),
  page("racing", "Traffic / Racing", "Start lights, pit warnings, checkers, redline, slipstream, and finish", [
    effect("starting-grid", "Starting Grid", "Red holds, amber warning, and green launch tell a tiny story"),
    effect("pit-lane", "Pit Lane", "An amber double beacon runs over a red floor"),
    effect("checkered-chase", "Checkered Chase", "Large ivory and deep-blue blocks race along the club"),
    effect("redline", "Redline", "Activity moves cyan idle toward orange-red rev limit"),
    effect("slipstream", "Slipstream", "White-cyan speed streaks compress with motion"),
    effect("photo-finish", "Photo Finish", "A finish-line sweep triggers a short camera flash"),
  ]),
  page("candy", "Candy / Unicorn", "Clouds, gumballs, sprinkles, taffy, soda, and sugar-rush excess", [
    effect("cotton-candy", "Cotton Candy Cloud", "Pink, cyan, and lavender blobs drift without becoming gray"),
    effect("gumball-machine", "Gumball Machine", "Colored round regions bounce and queue through the handle"),
    effect("sprinkle-storm", "Sprinkle Storm", "Fine handle sprinkles meet broad body confetti"),
    effect("taffy-pull", "Taffy Pull", "Roll stretches two pastel ribbons around one another"),
    effect("soda-pop", "Soda Pop", "Bubbles rise and burst into a lemon-white fizz cap"),
    effect("sugar-rush", "Sugar Rush", "Every candy motif accelerates into bright pastel chaos"),
  ]),
  page("fire-ice", "Fire and Ice", "Duel, conquest, steam, cracks, trapped embers, and truce", [
    effect("duel", "Duel", "One saturated half burns while the other freezes"),
    effect("advancing-front", "Advancing Front", "Roll lets fire or ice conquer more of the club"),
    effect("steam-collision", "Steam Collision", "The boundary produces a localized white-cyan plume"),
    effect("ice-cracks", "Ice Cracks", "Sharp white-blue fractures cross a continuously blue shell"),
    effect("ember-under-ice", "Ember Under Ice", "Red cores glow beneath a cyan surface"),
    effect("thermal-flip", "Thermal Flip", "End-over-end pose chooses fire or ice identity"),
    effect("aurora-truce", "Aurora Truce", "Gold, cyan, and violet resolve into one flowing field"),
  ]),
]);

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0));
const frac = (value) => value - Math.floor(value);
const smooth = (value) => {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
};
const triangle = (value) => 1 - Math.abs(frac(value) * 2 - 1);
const pulse = (phase, width = 0.2) => {
  const distance = Math.min(frac(phase), 1 - frac(phase));
  return 1 - smooth(distance / Math.max(0.001, width));
};
const gaussian = (value, center, width) => Math.exp(-0.5 * ((value - center) / width) ** 2);
const circularGaussian = (value, center, width) => {
  const d = Math.abs(frac(value - center + 0.5) - 0.5);
  return Math.exp(-0.5 * (d / width) ** 2);
};
const hash = (value) => frac(Math.sin(value * 127.1 + 311.7) * 43758.5453123);
const mix = (a, b, amount) => {
  const x = clamp01(amount);
  return [
    a[0] + (b[0] - a[0]) * x,
    a[1] + (b[1] - a[1]) * x,
    a[2] + (b[2] - a[2]) * x,
  ];
};
const scale = (color, amount) => color.map((channel) => channel * Math.max(0, amount));
const add = (a, b, amount = 1) => [
  Math.min(255, a[0] + b[0] * amount),
  Math.min(255, a[1] + b[1] * amount),
  Math.min(255, a[2] + b[2] * amount),
];
const palette = (colors, value) => {
  const x = frac(value) * colors.length;
  const index = Math.floor(x) % colors.length;
  return mix(colors[index], colors[(index + 1) % colors.length], x - Math.floor(x));
};
const set = (frame, index, color) => {
  frame[index][0] = Math.round(Math.max(0, Math.min(255, color[0])));
  frame[index][1] = Math.round(Math.max(0, Math.min(255, color[1])));
  frame[index][2] = Math.round(Math.max(0, Math.min(255, color[2])));
};
const fill = (frame, color) => frame.forEach((_, index) => set(frame, index, color));
const overlay = (frame, index, color, amount) => set(frame, index, mix(frame[index], color, amount));
const normalizedState = (state = {}) => ({
  activity: clamp01((Number(state.activityPercent) || 0) / 100),
  flip: frac(Number(state.projectedAngle) || 0),
  roll: frac((Number(state.roll) || 0) / 360 + 1),
  airborne: Number(state.throwState) > 0,
  throwState: Math.max(0, Math.min(5, Math.round(Number(state.throwState) || 0))),
});

const renderSketch = (frame, id, rawState, t) => {
  const state = normalizedState(rawState);
  const beat = t * 2;
  const slow = t * 0.18;
  fill(frame, COLOR.indigo);

  for (let i = 0; i < LED_COUNT; i += 1) {
    const u = i / (LED_COUNT - 1);
    const body = i >= 16;
    let color = frame[i];

    switch (id) {
      case "sleeping-thunderhead": {
        const cloud = 0.28 + 0.34 * (0.5 + 0.5 * Math.sin(t * 1.4 + u * 8));
        const pressure = gaussian(u, 0.72 + Math.sin(t * 0.31) * 0.08, 0.23);
        color = mix(scale(COLOR.indigo, 0.55), COLOR.violet, cloud * 0.6);
        color = add(color, COLOR.blue, pressure * 0.28);
        break;
      }
      case "forked-sky": {
        const strikeIndex = Math.floor(t * 1.35);
        const phase = frac(t * 1.35);
        const center = 0.18 + hash(strikeIndex) * 0.66;
        const branch = gaussian(u, center + Math.sin(u * 25 + strikeIndex) * 0.05, body ? 0.055 : 0.035);
        const strike = phase < 0.11 ? 1 - phase / 0.11 : Math.max(0, 0.34 - phase) * 1.3;
        color = mix(scale(COLOR.indigo, 0.65), COLOR.violet, 0.28 + 0.15 * Math.sin(u * 11 + t));
        color = add(color, mix(COLOR.blue, COLOR.white, 0.75), branch * strike);
        break;
      }
      case "sheet-lightning": {
        const cycle = Math.floor(t * 0.72);
        const p = frac(t * 0.72);
        const doubleFlash = hash(cycle) > 0.46;
        const flash = pulse(p - 0.05, 0.06) + (doubleFlash ? pulse(p - 0.22, 0.045) * 0.8 : 0);
        const base = body ? mix(COLOR.indigo, COLOR.blue, 0.28) : scale(COLOR.deepBlue, 0.9);
        color = mix(base, mix(COLOR.ice, COLOR.white, 0.55), clamp01(flash * (body ? 1 : 0.55)));
        break;
      }
      case "ball-lightning": {
        const center = 0.5 + 0.42 * Math.sin(t * 1.35);
        const core = gaussian(u, center, body ? 0.075 : 0.045);
        const wake = gaussian(u, center - Math.cos(t * 1.35) * 0.16, 0.17);
        color = add(mix(scale(COLOR.indigo, 0.65), COLOR.violet, wake * 0.55), COLOR.cyan, core * 0.8);
        color = add(color, COLOR.white, core * core * 0.72);
        break;
      }
      case "st-elmos-fire": {
        const corona = Math.max(gaussian(u, 0.02, 0.11), gaussian(u, 0.98, 0.12));
        const crawler = body ? 0 : circularGaussian(u * 3, t * 0.55, 0.12);
        color = add(mix(scale(COLOR.violet, 0.56), COLOR.blue, 0.34), COLOR.cyan, corona * 0.72);
        color = add(color, COLOR.lavender, crawler * 0.62);
        break;
      }
      case "thunder-roll": {
        const wound = 0.5 + 0.5 * Math.sin((u + state.roll) * TAU * 2);
        const trigger = pulse(t * (0.55 + state.activity * 1.8), 0.055) * (0.25 + state.activity * 0.9);
        color = mix(scale(COLOR.indigo, 0.7), COLOR.blue, 0.18 + wound * 0.35);
        color = add(color, mix(COLOR.cyan, COLOR.white, 0.58), trigger * (0.3 + wound * 0.7));
        break;
      }
      case "caught-bolt": {
        const spine = gaussian(u, 0.5 + Math.sin(u * 28 + t) * 0.06, body ? 0.075 : 0.045);
        const release = state.airborne ? 0.65 + 0.35 * pulse(t * 2.7, 0.16) : 0.18;
        color = mix(scale(COLOR.indigo, 0.68), COLOR.violet, 0.25);
        color = add(color, mix(COLOR.blue, COLOR.white, 0.58), spine * release);
        if (state.airborne) color = add(color, COLOR.cyan, (1 - spine) * 0.18);
        break;
      }

      case "pilot-light": {
        const flame = gaussian(u, 0.25 + Math.sin(t * 1.7) * 0.025, 0.12) * (0.78 + 0.22 * Math.sin(t * 5 + i));
        color = mix(scale(COLOR.ember, 0.85), COLOR.orange, 0.2 + u * 0.28);
        color = add(color, COLOR.gold, flame * 0.75);
        break;
      }
      case "bellows": {
        const heat = clamp01(0.12 + state.activity * 1.1);
        const gradient = smooth(u * 0.8 + heat * 0.45);
        color = palette([COLOR.ember, COLOR.red, COLOR.orange, COLOR.gold], gradient * 0.72);
        color = mix(scale(color, 0.72 + heat * 0.28), COLOR.white, smooth((heat - 0.72) * 3) * (body ? 0.7 : 0.25));
        break;
      }
      case "cinder-swarm": {
        const smoke = 0.22 + 0.25 * Math.sin(u * 7 - t * 0.7);
        color = mix(scale(COLOR.ember, 0.8), COLOR.orange, body ? 0.34 + smoke * 0.25 : 0.18);
        const seed = Math.floor(t * 7) * 37 + i;
        const spark = hash(seed) > 0.86 && frac(t * 7 + hash(i)) < 0.5 ? 1 : 0;
        color = add(color, i < 20 ? COLOR.gold : COLOR.orange, spark * (body ? 0.46 : 0.8));
        break;
      }
      case "molten-veins": {
        const veins = smooth(0.62 + 0.38 * Math.sin(u * 20 + Math.sin(u * 7 - t) * 3 - t * 0.65));
        color = mix(scale(COLOR.red, 0.64), COLOR.orange, 0.28 + 0.26 * Math.sin(u * 5 - slow));
        color = add(color, COLOR.gold, veins * (body ? 0.7 : 0.48));
        break;
      }
      case "fireball-impact": {
        const cycle = frac(t * 0.52);
        const center = Math.min(0.78, cycle * cycle * 1.35);
        const orb = gaussian(u, center, body ? 0.09 : 0.055);
        const impact = gaussian(cycle, 0.77, 0.07) * gaussian(u, 0.78, 0.27);
        color = mix(scale(COLOR.ember, 0.75), COLOR.orange, 0.38 + u * 0.18);
        color = add(color, COLOR.gold, orb * 0.76);
        color = add(color, COLOR.white, impact * 0.8);
        break;
      }
      case "phoenix": {
        const cycle = frac(t * 0.17);
        const unfold = smooth((cycle - 0.22) / 0.28) * (1 - smooth((cycle - 0.72) / 0.2));
        const wings = Math.max(gaussian(u, 0.38 - unfold * 0.15, 0.11), gaussian(u, 0.62 + unfold * 0.22, 0.15));
        color = mix(scale(COLOR.ember, 0.75), COLOR.red, 0.3 + unfold * 0.3);
        color = add(color, COLOR.gold, wings * unfold * 0.84);
        color = add(color, COLOR.white, gaussian(u, 0.52, 0.07) * unfold * 0.55);
        break;
      }

      case "abyssal-current": {
        const current = 0.5 + 0.5 * Math.sin(u * 8 - t * 0.65 + Math.sin(u * 3 + slow));
        color = mix(scale(COLOR.deepBlue, 0.9), COLOR.teal, 0.16 + current * 0.46);
        if (body) color = add(color, COLOR.cyan, current * 0.16);
        break;
      }
      case "plankton-wake": {
        const wakeCenter = frac(state.roll + state.flip * 0.5 + t * 0.08);
        const wake = circularGaussian(u, wakeCenter, 0.17);
        const sparkle = hash(i * 19 + Math.floor(t * 5)) > 0.82 ? 1 : 0;
        color = mix(scale(COLOR.deepBlue, 0.86), COLOR.teal, 0.18 + wake * 0.28);
        color = add(color, COLOR.cyan, wake * sparkle * (0.35 + state.activity * 0.65));
        break;
      }
      case "bubble-column": {
        const b1 = circularGaussian(u, t * 0.18, body ? 0.07 : 0.04);
        const b2 = circularGaussian(u, t * 0.13 + 0.41, body ? 0.105 : 0.05);
        const foam = gaussian(u, 0.91, 0.1) * (0.45 + 0.55 * Math.sin(t * 4 + i * 2) ** 2);
        color = mix(scale(COLOR.deepBlue, 0.82), COLOR.teal, 0.3);
        color = add(color, COLOR.cyan, b1 * 0.7 + b2 * 0.5);
        color = add(color, COLOR.white, foam * 0.52);
        break;
      }
      case "jelly-pulse": {
        const bell = body ? gaussian(u, 0.76, 0.24) : 0;
        const breathe = 0.35 + 0.65 * pulse(t * 0.48, 0.31);
        const tendril = body ? 0 : 0.5 + 0.5 * Math.sin(u * 31 - t * 1.2);
        color = mix(scale(COLOR.deepBlue, 0.82), COLOR.violet, 0.25);
        color = add(color, COLOR.cyan, bell * breathe * 0.65);
        color = add(color, COLOR.pink, tendril * 0.38);
        break;
      }
      case "breaking-wave": {
        const center = frac(t * 0.28) * 1.18 - 0.09;
        const crest = gaussian(u, center, body ? 0.10 : 0.055);
        const foam = gaussian(u, center - 0.07, 0.17) * (hash(i + Math.floor(t * 10)) > 0.62 ? 1 : 0.25);
        color = mix(scale(COLOR.blue, 0.55), COLOR.teal, 0.35 + 0.18 * Math.sin(u * 9 - t));
        color = add(color, COLOR.cyan, crest * 0.65);
        color = add(color, COLOR.white, foam * 0.58);
        break;
      }
      case "biolume-touch": {
        const life = state.activity * (0.45 + 0.55 * Math.sin(u * 15 + t * 1.5) ** 2);
        color = mix(scale(COLOR.deepBlue, 0.78), COLOR.teal, 0.2);
        color = add(color, i % 5 < 2 ? COLOR.cyan : COLOR.magenta, life * (body ? 0.62 : 0.82));
        break;
      }
      case "whale-song": {
        const swell = 0.18 + 0.82 * (0.5 + 0.5 * Math.sin(t * 0.42 - Math.PI / 2));
        color = mix(scale(COLOR.deepBlue, 0.82), COLOR.teal, 0.22 + swell * 0.25);
        color = add(color, COLOR.ice, gaussian(u, 0.63, 0.42) * swell * 0.48);
        break;
      }

      case "warning-stripe": {
        const stripe = (Math.floor((u * 8 + t * 0.9) % 2) + 2) % 2;
        color = stripe ? mix(COLOR.acid, COLOR.yellow, 0.28) : scale(COLOR.violet, 0.8);
        color = scale(color, body ? 0.9 : 1);
        break;
      }
      case "reactor-heart": {
        const heart = gaussian(u, 0.68, body ? 0.17 : 0.09);
        const throb = 0.38 + 0.62 * pulse(t * 1.25, 0.22);
        color = mix(scale(COLOR.violet, 0.68), COLOR.acid, 0.25);
        color = add(color, COLOR.green, heart * throb * 0.55);
        color = add(color, COLOR.white, heart * heart * throb * 0.38);
        break;
      }
      case "contamination-leak": {
        const front = frac(t * 0.12) * 1.25;
        const leaked = 1 - smooth((u - front) / 0.13);
        color = mix(scale(COLOR.violet, 0.72), COLOR.acid, leaked * 0.72);
        color = add(color, COLOR.green, gaussian(u, front, 0.09) * 0.46);
        break;
      }
      case "geiger-glitter": {
        const click = hash(i * 31 + Math.floor(t * 13)) > 0.91 ? 1 : 0;
        color = mix(scale(COLOR.green, 0.42), COLOR.acid, 0.32 + 0.12 * Math.sin(u * 8));
        color = add(color, i % 3 ? COLOR.yellow : COLOR.white, click * (body ? 0.55 : 0.84));
        break;
      }
      case "critical-mass": {
        const cycle = frac(t * 0.16);
        const acceleration = cycle * cycle;
        const waves = pulse(t * (0.6 + acceleration * 5), 0.12 - acceleration * 0.07);
        const release = gaussian(cycle, 0.92, 0.045);
        color = mix(scale(COLOR.violet, 0.76), COLOR.acid, 0.2 + waves * 0.54);
        color = add(color, COLOR.white, release * gaussian(u, 0.65, 0.38) * 0.85);
        break;
      }
      case "mutation": {
        const lobes = 2 + Math.round(state.flip * 4);
        const mutation = 0.5 + 0.5 * Math.sin((u + state.roll) * TAU * lobes + t * 0.7);
        color = palette([COLOR.acid, COLOR.green, COLOR.violet, COLOR.hotPink], mutation * 0.72 + state.flip * 0.18);
        color = scale(color, 0.72 + 0.28 * mutation);
        break;
      }

      case "insert-coin": {
        const cycle = frac(t * 0.38);
        const coin = gaussian(u, Math.min(0.38, cycle * 0.72), 0.045);
        const ripple = cycle > 0.45 ? circularGaussian(u, (cycle - 0.45) * 1.6, 0.09) : 0;
        color = mix(scale(COLOR.indigo, 0.72), COLOR.magenta, 0.22);
        color = add(color, COLOR.gold, coin * 0.88);
        color = add(color, COLOR.cyan, ripple * 0.7);
        break;
      }
      case "loading-bar": {
        const phase = frac(t * 0.16);
        const loaded = smooth((phase - u) / 0.035 + 0.5);
        color = loaded ? palette([COLOR.cyan, COLOR.magenta, COLOR.yellow], u * 0.78) : scale(COLOR.deepBlue, 0.9);
        if (phase > 0.92) color = mix(color, COLOR.white, (phase - 0.92) / 0.08 * 0.6);
        break;
      }
      case "power-up-stack": {
        const s1 = circularGaussian(u, t * 0.22, 0.065);
        const s2 = circularGaussian(u, t * 0.37 + 0.32, 0.065);
        const s3 = circularGaussian(u, t * 0.61 + 0.66, 0.065);
        color = mix(scale(COLOR.deepBlue, 0.86), COLOR.violet, 0.28);
        color = add(color, COLOR.cyan, s1 * 0.5);
        color = add(color, COLOR.magenta, s2 * 0.55);
        color = add(color, COLOR.yellow, s3 * 0.58);
        break;
      }
      case "rgb-glitch": {
        const block = Math.floor(u * (body ? 4 : 8));
        const glitch = Math.floor(t * 5.5);
        const shift = hash(glitch + block * 13) > 0.56 ? Math.floor(hash(glitch * 7 + block) * 3) : block % 3;
        color = [COLOR.cyan, COLOR.magenta, COLOR.yellow][shift];
        color = scale(color, hash(block + glitch) > 0.2 ? 0.84 : 0.48);
        break;
      }
      case "boss-warning": {
        const alarm = Math.floor(t * 3) % 2;
        const hud = i % (body ? 8 : 4) === 0;
        color = alarm ? scale(COLOR.magenta, 0.82) : scale(COLOR.red, 0.7);
        if (hud) color = mix(color, COLOR.cyan, 0.82);
        break;
      }
      case "extra-life": {
        const rise = frac(t * 0.3);
        const orb = gaussian(u, rise, body ? 0.08 : 0.045);
        const star = gaussian(rise, 0.82, 0.07) * (i % 3 === 0 ? 1 : 0.35);
        color = mix(scale(COLOR.deepBlue, 0.78), COLOR.green, 0.28);
        color = add(color, COLOR.cyan, orb * 0.7);
        color = add(color, COLOR.white, star * 0.72);
        break;
      }
      case "invincibility": {
        color = palette([COLOR.cyan, COLOR.magenta, COLOR.yellow, COLOR.green, COLOR.violet], u * 0.8 - t * 0.95);
        color = scale(color, 0.72 + 0.28 * Math.sin(u * 16 - t * 8) ** 2);
        break;
      }

      case "mirrorball": {
        const facet = hash(i * 17) * TAU;
        const glint = Math.max(0, Math.sin(t * 1.15 + facet + state.roll * TAU)) ** 8;
        color = mix(scale(COLOR.indigo, 0.72), i % 2 ? COLOR.magenta : COLOR.cyan, 0.28);
        color = add(color, COLOR.ivory, glint * (body ? 0.62 : 0.85));
        break;
      }
      case "four-on-floor": {
        const floor = pulse(beat, 0.16);
        const offbeat = pulse(beat - 0.5, 0.11);
        color = mix(scale(COLOR.gold, 0.52), COLOR.gold, floor * 0.48);
        color = add(color, i % 2 ? COLOR.magenta : COLOR.cyan, offbeat * 0.42);
        break;
      }
      case "studio-sweep": {
        const center = triangle(t * 0.24);
        const spot = gaussian(u, center, body ? 0.14 : 0.08);
        const spotColor = palette([COLOR.magenta, COLOR.cyan, COLOR.gold], t * 0.12);
        color = mix(scale(COLOR.indigo, 0.76), COLOR.violet, 0.24);
        color = add(color, spotColor, spot * 0.8);
        break;
      }
      case "facet-flip": {
        const facet = Math.floor(u * (body ? 5 : 8));
        const facing = 0.5 + 0.5 * Math.cos(state.flip * TAU + facet * 1.7);
        color = mix(i % 2 ? scale(COLOR.magenta, 0.64) : scale(COLOR.cyan, 0.58), COLOR.ivory, facing ** 6 * 0.82);
        break;
      }
      case "glitter-drop": {
        const drop = frac(hash(i) + t * (0.18 + hash(i + 9) * 0.17));
        const glint = pulse(drop, 0.055);
        color = mix(scale(COLOR.magenta, 0.56), COLOR.violet, 0.35 + u * 0.15);
        color = add(color, i % 4 ? COLOR.gold : COLOR.cyan, glint * (body ? 0.55 : 0.82));
        break;
      }
      case "last-dance": {
        const warmth = 0.42 + 0.28 * Math.sin(t * 0.34 + u * 4);
        const memory = pulse(t * 0.21 + hash(i), 0.045);
        color = mix(scale(COLOR.amber, 0.55), COLOR.gold, warmth);
        color = add(color, i % 2 ? COLOR.cyan : COLOR.magenta, memory * 0.42);
        break;
      }

      case "cold-breath": {
        const mist = 0.5 + 0.5 * Math.sin(u * 8 - t * 0.48 + Math.sin(u * 4));
        color = mix(scale(COLOR.indigo, 0.56), COLOR.lavender, 0.27 + mist * 0.24);
        color = add(color, COLOR.ice, mist * mist * 0.38);
        break;
      }
      case "apparition": {
        const appear = 0.5 + 0.5 * Math.sin(t * 0.42 - Math.PI / 2);
        const figure = body ? gaussian(u, 0.72, 0.22) : gaussian(u, 0.43, 0.11) * 0.35;
        color = mix(scale(COLOR.indigo, 0.64), COLOR.lavender, 0.24);
        color = add(color, COLOR.white, figure * appear * 0.66);
        break;
      }
      case "candle-seance": {
        const candle = !body ? gaussian(u, 0.34, 0.09) * (0.7 + 0.3 * Math.sin(t * 7 + i)) : 0;
        const ghost = body ? gaussian(u, 0.74, 0.27) * (0.32 + 0.38 * Math.sin(t * 0.8) ** 2) : 0;
        color = mix(scale(COLOR.indigo, 0.68), COLOR.lavender, 0.22);
        color = add(color, COLOR.amber, candle * 0.82);
        color = add(color, COLOR.ice, ghost * 0.64);
        break;
      }
      case "phantom-trail": {
        const center = frac(t * 0.2);
        const head = circularGaussian(u, center, body ? 0.06 : 0.035);
        const trail = circularGaussian(u, center - 0.14, 0.18);
        color = mix(scale(COLOR.indigo, 0.62), COLOR.lavender, 0.18 + trail * 0.52);
        color = add(color, COLOR.white, head * 0.75);
        break;
      }
      case "possession": {
        const snap = smooth((state.activity - 0.12) * 5);
        const possessed = Math.sin(state.roll * TAU) > 0 ? COLOR.paleGreen : COLOR.hotPink;
        color = mix(mix(scale(COLOR.lavender, 0.52), COLOR.ice, 0.3), possessed, snap * (0.58 + 0.22 * Math.sin(u * 13 + t * 4)));
        break;
      }
      case "poltergeist": {
        const region = Math.floor(u * (body ? 5 : 8));
        const twitch = hash(region * 29 + Math.floor(t * 5)) > 0.54;
        color = twitch ? (region % 2 ? COLOR.paleGreen : COLOR.lavender) : scale(COLOR.indigo, 0.7);
        color = scale(color, twitch ? 0.74 + hash(region + Math.floor(t * 5)) * 0.26 : 0.85);
        break;
      }
      case "vanishing-act": {
        const cycle = frac(t * 0.18);
        const visible = cycle < 0.42 ? 1 - smooth(cycle / 0.42) : smooth((cycle - 0.72) / 0.28);
        const ghostFloor = scale(COLOR.deepBlue, 0.56);
        color = mix(ghostFloor, mix(COLOR.lavender, COLOR.white, 0.38), visible * gaussian(u, 0.64, 0.36));
        break;
      }

      case "horizon": {
        color = u < 0.28
          ? mix(COLOR.deepBlue, COLOR.violet, u / 0.28)
          : u < 0.62
            ? mix(COLOR.violet, COLOR.coral, (u - 0.28) / 0.34)
            : mix(COLOR.coral, COLOR.gold, (u - 0.62) / 0.38);
        color = scale(color, 0.75 + 0.18 * Math.sin(t * 0.25 + u * 2));
        break;
      }
      case "sunrise": {
        const horizon = 0.12 + frac(t * 0.08) * 0.95;
        const day = smooth((horizon - u) / 0.15 + 0.5);
        color = mix(mix(COLOR.deepBlue, COLOR.violet, 0.45), mix(COLOR.coral, COLOR.gold, u), day);
        color = add(color, COLOR.ivory, gaussian(u, horizon, 0.055) * 0.68);
        break;
      }
      case "solar-flare": {
        const center = frac(t * 0.23);
        const arc = circularGaussian(u + Math.sin(u * 9 + t) * 0.045, center, body ? 0.09 : 0.05);
        color = mix(scale(COLOR.coral, 0.68), COLOR.gold, 0.3 + u * 0.18);
        color = add(color, COLOR.white, arc * 0.73);
        break;
      }
      case "eclipse": {
        const corona = Math.abs(u - 0.63);
        const ring = gaussian(corona, 0.19 + Math.sin(t * 0.27) * 0.02, 0.035);
        color = mix(scale(COLOR.deepBlue, 0.86), COLOR.violet, 0.34);
        color = add(color, COLOR.gold, ring * 0.84);
        break;
      }
      case "sunspots": {
        const spot = Math.max(circularGaussian(u, t * 0.08 + 0.2, 0.09), circularGaussian(u, -t * 0.05 + 0.7, 0.12));
        color = mix(COLOR.orange, COLOR.gold, 0.55 + 0.16 * Math.sin(u * 5));
        color = mix(color, scale(COLOR.red, 0.62), spot * 0.7);
        break;
      }
      case "afterglow": {
        const cooling = 0.5 + 0.5 * Math.sin(t * 0.16);
        const memory = pulse(t * 0.15 + hash(i * 3), 0.035);
        color = mix(mix(COLOR.coral, COLOR.hotPink, u), mix(COLOR.violet, COLOR.deepBlue, u), cooling * 0.6);
        color = add(scale(color, 0.72), COLOR.pink, memory * 0.32);
        break;
      }

      case "lantern-row": {
        const lantern = Math.sin(u * TAU * (body ? 3 : 5) + 0.35 * Math.sin(t * 0.7));
        const glow = 0.35 + 0.65 * Math.max(0, lantern);
        color = mix(scale(COLOR.indigo, 0.78), COLOR.vermilion, glow * 0.72);
        color = add(color, COLOR.gold, glow ** 3 * 0.42);
        break;
      }
      case "taiko-heartbeat": {
        const first = pulse(t * 0.92, 0.095);
        const second = pulse(t * 0.92 - 0.28, 0.07) * 0.72;
        color = mix(scale(COLOR.indigo, 0.82), COLOR.vermilion, 0.24);
        color = add(color, COLOR.gold, (first + second) * 0.58);
        if (body) color = add(color, COLOR.white, first * 0.34);
        break;
      }
      case "folding-fan": {
        const openness = 0.18 + 0.82 * Math.abs(Math.sin(state.roll * Math.PI));
        const rib = Math.sin(u * TAU * (3 + openness * 4) + state.roll * TAU) > 0;
        color = rib ? COLOR.vermilion : COLOR.ivory;
        color = mix(scale(color, 0.72), COLOR.gold, openness * (i % 4 === 0 ? 0.55 : 0.18));
        break;
      }
      case "chrysanthemum": {
        const cycle = frac(t * 0.24);
        const radius = cycle * 0.58;
        const petals = Math.max(gaussian(u, 0.67 - radius, 0.045), gaussian(u, 0.67 + radius, 0.055));
        const falling = cycle > 0.55 && hash(i * 7 + Math.floor(t * 8)) > 0.82 ? (1 - cycle) * 2.2 : 0;
        color = mix(scale(COLOR.indigo, 0.86), COLOR.vermilion, 0.18);
        color = add(color, COLOR.gold, petals * 0.8 + falling * 0.5);
        color = add(color, COLOR.white, petals * (1 - cycle) * 0.34);
        break;
      }
      case "bon-odori": {
        const bow = Math.sin(state.flip * TAU) * 0.12;
        const band = 0.5 + 0.5 * Math.sin((u + bow) * TAU * 4 - t * 0.55);
        color = mix(scale(COLOR.indigo, 0.82), COLOR.vermilion, 0.28 + band * 0.42);
        color = add(color, COLOR.gold, band ** 5 * 0.42);
        break;
      }
      case "paper-streamers": {
        const r1 = 0.5 + 0.5 * Math.sin(u * 9 - t * 1.1);
        const r2 = 0.5 + 0.5 * Math.sin(u * 14 + t * 0.7 + 2);
        color = mix(scale(COLOR.indigo, 0.7), COLOR.vermilion, r1 * 0.52);
        color = add(color, r2 > 0.72 ? COLOR.gold : COLOR.cyan, Math.max(0, r2 - 0.45) * 0.72);
        break;
      }
      case "festival-finale": {
        const burstA = circularGaussian(u, t * 0.26, body ? 0.10 : 0.05);
        const burstB = circularGaussian(u, -t * 0.19 + 0.63, body ? 0.14 : 0.06);
        const spark = hash(i * 17 + Math.floor(t * 9)) > 0.84 ? 1 : 0;
        color = mix(scale(COLOR.indigo, 0.76), COLOR.vermilion, 0.2);
        color = add(color, COLOR.gold, burstA * 0.62 + spark * 0.32);
        color = add(color, i % 2 ? COLOR.cyan : COLOR.hotPink, burstB * 0.48);
        break;
      }

      case "starting-grid": {
        const cycle = frac(t * 0.12);
        const stage = Math.floor(cycle * 5);
        if (stage < 3) {
          const litZones = stage + 1;
          const zone = Math.floor(u * 3);
          color = zone < litZones ? COLOR.red : scale(COLOR.deepBlue, 0.86);
        } else if (stage === 3) color = COLOR.amber;
        else color = COLOR.green;
        color = scale(color, 0.76 + (Math.sin(t * 8) > 0 ? 0.18 : 0));
        break;
      }
      case "pit-lane": {
        const beacon = pulse(t * 1.7, 0.085) + pulse(t * 1.7 - 0.22, 0.065);
        color = mix(scale(COLOR.red, 0.58), COLOR.orange, 0.25 + 0.12 * Math.sin(u * 7));
        color = add(color, COLOR.amber, beacon * (i % 4 < 2 ? 0.66 : 0.28));
        break;
      }
      case "checkered-chase": {
        const block = Math.floor(u * (body ? 5 : 8) - t * 2.4);
        color = block % 2 === 0 ? scale(COLOR.ivory, 0.88) : scale(COLOR.deepBlue, 0.95);
        break;
      }
      case "redline": {
        const rev = state.activity;
        color = mix(mix(COLOR.cyan, COLOR.blue, 0.45), mix(COLOR.orange, COLOR.red, 0.5), smooth(rev));
        const limiter = rev > 0.78 ? pulse(t * (3 + rev * 6), 0.11) : 0;
        color = add(scale(color, 0.72 + rev * 0.24), COLOR.white, limiter * (body ? 0.25 : 0.45));
        break;
      }
      case "slipstream": {
        const speed = 0.35 + state.activity * 2.2;
        const streak = pulse(u * (body ? 4 : 7) - t * speed, 0.09 - state.activity * 0.04);
        color = mix(scale(COLOR.blue, 0.62), COLOR.cyan, 0.28);
        color = add(color, COLOR.white, streak * 0.66);
        break;
      }
      case "photo-finish": {
        const cycle = frac(t * 0.27);
        const line = gaussian(u, cycle * 1.2 - 0.1, body ? 0.065 : 0.038);
        const flash = gaussian(cycle, 0.84, 0.035);
        color = mix(scale(COLOR.deepBlue, 0.78), COLOR.red, 0.28);
        color = add(color, COLOR.ivory, line * 0.78);
        color = mix(color, COLOR.white, flash * 0.62);
        break;
      }

      case "cotton-candy": {
        const p = 0.5 + 0.5 * Math.sin(u * 6 - t * 0.38);
        const q = 0.5 + 0.5 * Math.sin(u * 9 + t * 0.29 + 2);
        color = mix(COLOR.pink, COLOR.cyan, p);
        color = mix(color, COLOR.lavender, q * 0.42);
        color = scale(color, 0.72 + 0.18 * (p + q) / 2);
        break;
      }
      case "gumball-machine": {
        const gumballs = [COLOR.hotPink, COLOR.cyan, COLOR.lemon, COLOR.lavender, COLOR.green];
        const cell = Math.floor(u * (body ? 7 : 10) + Math.sin(t * 1.2 + i * 0.7));
        const bounce = 0.72 + 0.28 * Math.sin(t * 2 + cell) ** 2;
        color = scale(gumballs[(cell % gumballs.length + gumballs.length) % gumballs.length], bounce);
        break;
      }
      case "sprinkle-storm": {
        const colors = [COLOR.hotPink, COLOR.cyan, COLOR.lemon, COLOR.lavender];
        const grain = body ? Math.floor(i / 2) : i;
        const active = hash(grain * 23 + Math.floor(t * 6)) > (body ? 0.63 : 0.48);
        color = mix(scale(COLOR.pink, 0.46), colors[grain % colors.length], active ? 0.82 : 0.26);
        break;
      }
      case "taffy-pull": {
        const twist = (u * 3 + state.roll * 2 + Math.sin(u * 7 - t * 0.4) * 0.18);
        const ribbon = 0.5 + 0.5 * Math.sin(twist * TAU);
        color = mix(COLOR.pink, COLOR.cyan, ribbon);
        color = mix(color, COLOR.lemon, (1 - Math.abs(ribbon - 0.5) * 2) * 0.28);
        color = scale(color, 0.76 + 0.2 * ribbon);
        break;
      }
      case "soda-pop": {
        const bubble = Math.max(circularGaussian(u, t * 0.21 + hash(i), body ? 0.075 : 0.045), circularGaussian(u, t * 0.31 + 0.5, 0.055));
        const fizz = u > 0.86 && hash(i + Math.floor(t * 10)) > 0.45 ? 1 : 0;
        color = mix(scale(COLOR.cyan, 0.55), COLOR.pink, 0.3);
        color = add(color, COLOR.lemon, bubble * 0.56);
        color = add(color, COLOR.white, fizz * 0.55);
        break;
      }
      case "sugar-rush": {
        const tempo = 2.5 + 7 * (0.5 + 0.5 * Math.sin(t * 0.2));
        const chaos = hash(i * 41 + Math.floor(t * tempo));
        color = palette([COLOR.hotPink, COLOR.cyan, COLOR.lemon, COLOR.lavender, COLOR.green], chaos + u - t * 0.35);
        color = mix(scale(color, 0.78), COLOR.white, chaos > 0.9 ? 0.44 : 0);
        break;
      }

      case "duel": {
        color = u < 0.5
          ? mix(COLOR.red, COLOR.gold, smooth(u * 2) * 0.62)
          : mix(COLOR.cyan, COLOR.blue, smooth((u - 0.5) * 2) * 0.55);
        color = scale(color, 0.82 + 0.18 * Math.sin(t * 1.6 + u * 7) ** 2);
        break;
      }
      case "advancing-front": {
        const boundary = 0.5 + 0.43 * Math.sin(state.roll * TAU);
        const edge = smooth((u - boundary) / 0.09 + 0.5);
        const fire = mix(COLOR.red, COLOR.gold, 0.35 + 0.3 * Math.sin(u * 9 - t));
        const ice = mix(COLOR.blue, COLOR.cyan, 0.45 + 0.2 * Math.sin(u * 7 + t * 0.7));
        color = mix(fire, ice, edge);
        break;
      }
      case "steam-collision": {
        const boundary = 0.5 + Math.sin(t * 0.38) * 0.13;
        const steam = gaussian(u, boundary, body ? 0.13 : 0.07) * (0.55 + 0.45 * Math.sin(t * 5 + i) ** 2);
        color = u < boundary ? mix(COLOR.red, COLOR.orange, 0.45) : mix(COLOR.blue, COLOR.cyan, 0.45);
        color = mix(color, mix(COLOR.ice, COLOR.white, 0.42), steam * 0.75);
        break;
      }
      case "ice-cracks": {
        const crackSeed = Math.floor(t * 1.2);
        const crack = hash(i * 13 + crackSeed) > 0.78 && hash(i * 7 + crackSeed) < 0.38 ? 1 : 0;
        const flash = pulse(t * 1.2, 0.11);
        color = mix(scale(COLOR.blue, 0.68), COLOR.cyan, 0.32 + 0.14 * Math.sin(u * 8));
        color = add(color, COLOR.white, crack * flash * 0.76);
        break;
      }
      case "ember-under-ice": {
        const ember = Math.max(circularGaussian(u, t * 0.09 + 0.25, 0.08), circularGaussian(u, -t * 0.06 + 0.74, 0.11));
        const shell = mix(COLOR.blue, COLOR.cyan, 0.56);
        color = mix(scale(shell, 0.68), mix(COLOR.red, COLOR.gold, 0.35), ember * 0.76);
        color = add(color, COLOR.ice, (1 - ember) * 0.12);
        break;
      }
      case "thermal-flip": {
        const heat = 0.5 + 0.5 * Math.cos(state.flip * TAU);
        const fire = mix(COLOR.red, COLOR.gold, 0.38 + 0.18 * Math.sin(u * 6 - t));
        const ice = mix(COLOR.blue, COLOR.cyan, 0.5 + 0.16 * Math.sin(u * 5 + t));
        color = mix(ice, fire, heat);
        break;
      }
      case "aurora-truce": {
        const ribbon = 0.5 + 0.5 * Math.sin(u * 9 - t * 0.58 + Math.sin(u * 3));
        color = palette([COLOR.gold, COLOR.cyan, COLOR.violet], ribbon * 0.72 + u * 0.24);
        color = scale(color, 0.72 + 0.26 * Math.sin(u * 6 + t * 0.4) ** 2);
        break;
      }
      default:
        throw new RangeError(`unknown theme effect ${id}`);
    }

    set(frame, i, color);
  }
  return frame;
};

export const findThemePage = (pageId) => THEME_PAGES.find((item) => item.id === pageId) || null;

export const createThemeFrame = () => Array.from({ length: LED_COUNT }, () => [0, 0, 0]);

export function renderThemeEffect(effectId, state, timeSeconds, target = createThemeFrame()) {
  if (!Array.isArray(target) || target.length !== LED_COUNT) {
    throw new TypeError("theme target must contain 32 RGB entries");
  }
  const exists = THEME_PAGES.some((item) => item.effects.some((candidate) => candidate.id === effectId));
  if (!exists) throw new RangeError(`unknown theme effect ${effectId}`);
  const time = Number(timeSeconds);
  if (!Number.isFinite(time)) throw new TypeError("timeSeconds must be finite");
  return renderSketch(target, effectId, state, time);
}

export const THEME_EFFECT_COUNT = THEME_PAGES.reduce((sum, item) => sum + item.effects.length, 0);
