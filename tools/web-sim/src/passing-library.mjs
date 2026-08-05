import { compilePassingPattern, oppositePassingHand } from "./passing-pattern-compiler.mjs?build=orientation-plan-v19";

export const PASSING_LIBRARY_VERSION = 1;

const clone = (value) => JSON.parse(JSON.stringify(value));
const freeze = (value) => Object.freeze(value);
const cue = (name, beat, description) => freeze({ name, beat, durationBeats: 1, description });
const DEFAULT_COUNT_IN = freeze([
  cue("Sky", -2, "Raise clubs; starts may be slightly staggered."),
  cue("Earth", -1, "Lower together to a head-down side position."),
  cue("Pass", 0, "Start the scheduled pattern together."),
]);

const performer = (id, name, x, z, facing) => freeze({ id, name, x, z, facing });
const event = (beat, juggler, hand, kind, target, options = {}) => freeze({
  beat, juggler, hand, kind, target: target || null,
  // `hand` is the throwing hand. Keeping the receiving hand explicit makes the
  // event useful to a renderer without inferring a camera-relative catch.
  catchHand: options.catchHand || oppositePassingHand(hand),
  path: options.path || (kind === "pass" ? "straight" : "self"),
  flightBeats: options.flightBeats ?? 1,
  spins: options.spins ?? (kind === "pass" ? 1.5 : 1),
  startPose: options.startPose || "side-head-down",
  catchPose: options.catchPose || "shoulder-club-up",
  note: options.note || "",
});

const provenance = (summary, references) => freeze({ summary, references: references.map((reference) => freeze(reference)) });
const terminologySources = freeze([
  freeze({ title: "Modern Passing — Basic Sync", url: "https://modernpassing.com/2b-basic-sync.html", use: "terminology and timing research only" }),
  freeze({ title: "2-count/4-count Feed", url: "https://www.jugglingpatterns.de/wiki/2-count_4-count_Feed", use: "feed timing research only" }),
  freeze({ title: "Modern Passing — Feeds", url: "https://modernpassing.com/5b-feeds.html", use: "feed-role research only" }),
  freeze({ title: "Passing Patterns Compendium", url: "https://www.jugglingedge.com/pdf/passingpatternscompendium.pdf", use: "timing and terminology research only" }),
]);

function facingPair(id, title, sequence, summary, terminology, difficulty = "easy", basis = "source-backed") {
  const people = [
    performer("left", "Left", -2.25, 1.4, 90),
    performer("right", "Right", 2.25, 1.4, -90),
  ];
  const events = sequence.flatMap(({ kind, hand }, beat) => people.map((person, personIndex) => event(
    beat,
    person.id,
    hand,
    kind,
    kind === "pass" ? people[1 - personIndex].id : person.id,
    { path: kind === "pass" ? "straight" : "self" },
  )));
  return compilePassingPattern({
    id, title, peopleCount: 2, formation: "facing pair", clubCount: 6,
    summary, tempo: 108, loopBeats: sequence.length, performers: people, events,
    countIn: DEFAULT_COUNT_IN,
    terminology, difficulty, basis, startingPhase: "synchronised",
    provenance: provenance("Original event schedule using independently researched common count terminology; verify preferred local teaching style at the jam.", [terminologySources[0]]),
  });
}

function round(id, title, count, positions, summary, options = {}) {
  const people = positions.map((position, index) => performer(`p${index + 1}`, `P${index + 1}`, ...position));
  const events = people.map((person, index) => event(0, person.id, index % 2 ? "right" : "left", "pass", people[(index + 1) % people.length].id, { path: "crossing" }));
  return compilePassingPattern({
    id, title, peopleCount: count, formation: `${count}-person round`, clubCount: count * 3,
    summary, tempo: 100, loopBeats: 1, performers: people, events, countIn: DEFAULT_COUNT_IN,
    terminology: options.terminology || "one-count round", difficulty: options.difficulty || "medium", basis: options.basis || "original schedule study", startingPhase: options.startingPhase || "synchronised",
    provenance: provenance(options.provenance || "Original all-pass round schedule; the name is a concise community-terminology label, not copied teaching material.", options.references || terminologySources),
  });
}

const SQUARE_PEOPLE = freeze([
  performer("a", "A", -2.7, 0.5, 55), performer("b", "B", 2.7, 0.5, -55),
  performer("c", "C", 2.7, 2.7, -125), performer("d", "D", -2.7, 2.7, 125),
]);
const FIVE_PEOPLE = freeze([
  performer("a", "A", 0, 3.25, 180), performer("b", "B", -3.1, 2, 126), performer("c", "C", -1.9, -0.15, 36), performer("d", "D", 1.9, -0.15, -36), performer("e", "E", 3.1, 2, -126),
]);
const token = (kind, target, hand, options = {}) => ({ kind, target, hand, ...options });
function scheduledPattern({ id, title, people, formation, clubCount, tempo = 100, rows, summary, terminology, difficulty = "medium", basis = "original schedule study", references = [], startingPhase = "documented convention", inventoryAllocation, inventoryMode }) {
  const events = rows.flatMap((row, beat) => Object.entries(row).map(([juggler, item]) => event(beat, juggler, item.hand, item.kind, item.target || juggler, { path: item.path || (item.kind === "pass" ? "straight" : "self"), note: item.note || "", flightBeats: item.flightBeats, spins: item.spins, catchHand: item.catchHand })));
  return compilePassingPattern({ id, title, peopleCount: people.length, formation, clubCount, summary, tempo, loopBeats: rows.length, performers: people, events: freeze(events), countIn: DEFAULT_COUNT_IN, terminology, difficulty, basis, startingPhase, inventoryAllocation, inventoryMode, provenance: provenance(basis === "source-backed" ? "Original event schedule based on independently researched timing facts; no source prose, diagrams, graphics, code, or bulk data copied." : "Original explicit schedule study. It is a reviewable convention, not a claim of a canonical published start.", references) });
}
function ringPattern({ id, title, people, formation, sequence, step = 1, summary, terminology, difficulty = "medium", basis = "original schedule study", references = [] }) {
  const rows = sequence.map(({ kind, hand }, beat) => Object.fromEntries(people.map((person, index) => [person.id, token(kind, kind === "pass" ? people[(index + step + people.length) % people.length].id : person.id, hand || ((beat + index) % 2 ? "right" : "left"), { path: kind === "pass" ? (Math.abs(step) > 1 ? "crossing" : "straight") : "self" })])));
  return scheduledPattern({ id, title, people, formation, clubCount: people.length * 3, rows, summary, terminology, difficulty, basis, references });
}

const V_PEOPLE = freeze([
  performer("feeder", "Feeder", -3.15, 1.1, 24),
  performer("receiver-a", "Receiver A", 1.9, 0.35, -150),
  performer("receiver-b", "Receiver B", 2.85, 2.05, -145),
]);
const TRIANGLE_PEOPLE = freeze([
  performer("a", "A", 0, 2.6, 180), performer("b", "B", -2.35, 0.55, 60), performer("c", "C", 2.35, 0.55, -60),
]);
const V_EVENTS = freeze([
  event(0, "feeder", "left", "pass", "receiver-a", { path: "straight", note: "Opening feed to nearer audience-right receiver." }),
  event(0, "receiver-a", "left", "hold", "receiver-a", { flightBeats: 0, spins: 0, note: "Receive opening feed." }),
  event(0, "receiver-b", "left", "self", "receiver-b", { path: "self", note: "Opening self-throw: left." }),
  event(1, "feeder", "right", "pass", "receiver-a", { path: "straight", note: "Second opening feed." }),
  event(1, "receiver-a", "right", "hold", "receiver-a", { flightBeats: 0, spins: 0 }),
  event(1, "receiver-b", "right", "self", "receiver-b", { path: "self", note: "Opening self-throw: right." }),
  event(2, "feeder", "left", "pass", "receiver-b", { path: "straight", note: "Feed changes to deeper audience-right receiver." }),
  event(2, "receiver-a", "left", "self", "receiver-a", { path: "self" }),
  event(2, "receiver-b", "left", "hold", "receiver-b", { flightBeats: 0, spins: 0 }),
  event(3, "feeder", "right", "pass", "receiver-a", { path: "straight" }),
  event(3, "receiver-a", "right", "hold", "receiver-a", { flightBeats: 0, spins: 0 }),
  event(3, "receiver-b", "right", "self", "receiver-b", { path: "self" }),
]);

export const PASSING_PATTERNS = freeze([
  facingPair("one-count", "1-count · Ultimates", [{ kind: "pass", hand: "right" }, { kind: "pass", hand: "left" }], "A facing-pair all-pass schedule; both pass right, then left.", "1-count / Ultimates"),
  facingPair("two-count", "2-count · Everies", [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], "A facing-pair schedule: a same-hand pass followed by a self-throw.", "2-count / Everies"),
  facingPair("three-count", "3-count · Waltz", [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], "A facing-pair waltz schedule: pass, self, self, with alternating pass hands across six beats.", "3-count / Waltz"),
  facingPair("four-count", "4-count · Every Others", [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], "A facing-pair schedule with a one-sided pass followed by three self-throws.", "4-count / Every Others"),
  facingPair("pps", "PPS", [{ kind: "pass", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "self", hand: "right" }], "A compact facing-pair pass, pass, self schedule.", "PPS", "medium"),
  facingPair("bookends", "Bookends", [{ kind: "pass", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "self", hand: "right" }], "A five-beat facing-pair schedule with paired pass beats framing the self work.", "Bookends", "medium"),
  facingPair("countdown", "Countdown", [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "pass", hand: "left" }, { kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], "An eight-beat facing-pair schedule that contracts self spacing into paired passes.", "Countdown", "hard"),
  facingPair("one-count-left", "1-count · left-start practice", [{ kind: "pass", hand: "left" }, { kind: "pass", hand: "right" }], "A start-phase practice variation of 1-count; the event truth begins on the left hand.", "1-count practice variation", "easy", "original schedule study"),
  facingPair("two-count-left", "2-count · left-start practice", [{ kind: "pass", hand: "left" }, { kind: "self", hand: "right" }], "A start-phase practice variation of 2-count; the event truth begins on the left hand.", "2-count practice variation", "easy", "original schedule study"),
  facingPair("three-count-left", "3-count · left-start practice", [{ kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }, { kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], "A start-phase practice variation of the waltz schedule.", "3-count practice variation", "medium", "original schedule study"),
  facingPair("four-count-left", "4-count · left-start practice", [{ kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], "A start-phase practice variation of Every Others.", "4-count practice variation", "easy", "original schedule study"),
  facingPair("pps-left", "PPS · left-start practice", [{ kind: "pass", hand: "left" }, { kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], "A start-phase practice variation of PPS.", "PPS practice variation", "medium", "original schedule study"),
  compilePassingPattern({
    id: "v-feed-2-4", title: "V feed — 2-count / 4-count", peopleCount: 3, formation: "V", clubCount: 9,
    summary: "Canonical three-person feed clock: Feeder exchanges with Receiver A, then enters Receiver B two beats later while the other receiver self-throws.",
    tempo: 92, loopBeats: 4, performers: V_PEOPLE,
    events: freeze([
      event(0, "feeder", "right", "pass", "receiver-a", { path: "straight", note: "Opening feed exchange." }),
      event(0, "receiver-a", "right", "pass", "feeder", { path: "straight", note: "Opening feed exchange." }),
      event(0, "receiver-b", "right", "self", "receiver-b", { path: "self" }),
      event(1, "feeder", "left", "self", "feeder", { path: "self" }), event(1, "receiver-a", "left", "self", "receiver-a", { path: "self" }), event(1, "receiver-b", "left", "self", "receiver-b", { path: "self" }),
      event(2, "feeder", "right", "pass", "receiver-b", { path: "straight", note: "Feed enters Receiver B." }), event(2, "receiver-a", "right", "self", "receiver-a", { path: "self" }), event(2, "receiver-b", "right", "pass", "feeder", { path: "straight", note: "Feed return." }),
      event(3, "feeder", "left", "self", "feeder", { path: "self" }), event(3, "receiver-a", "left", "self", "receiver-a", { path: "self" }), event(3, "receiver-b", "left", "self", "receiver-b", { path: "self" }),
    ]), countIn: DEFAULT_COUNT_IN,
    terminology: "V formation; 2-count / 4-count feed", difficulty: "medium", basis: "source-backed", startingPhase: "synchronised documented feed start",
    provenance: provenance("Original schedule transcription from independently researched timing facts; no source diagrams or prose copied.", [terminologySources[1], terminologySources[2]]),
  }),
  compilePassingPattern({
    id: "stage-v-opening", title: "Stage V opening — visual variant", peopleCount: 3, formation: "V", clubCount: 3,
    summary: "The established Stage Lab opening: two feeds to Receiver A while Receiver B self-throws left/right, then the feeder alternates targets.",
    tempo: 92, loopBeats: 4, performers: V_PEOPLE, events: V_EVENTS, countIn: DEFAULT_COUNT_IN,
    // This retained Stage Lab study is deliberately a three-prop opening
    // tableau, not a loop-conserving three-clubs-per-person passing pattern.
    inventoryAllocation: freeze({ feeder: 1, "receiver-a": 1, "receiver-b": 1 }), inventoryMode: "visual-study",
    terminology: "staged V-feed variant", difficulty: "medium", basis: "user-specified visual variant", startingPhase: "Sky/Earth/Pass stage opening",
    provenance: provenance("User-specified Stage Lab choreography. It intentionally alternates the feeder's hands and is not labelled canonical 2-count/4-count feed.", []),
  }),
  scheduledPattern({
    id: "directed-triangle-waltz", title: "Directed 3-count triangle", people: TRIANGLE_PEOPLE, formation: "triangle", clubCount: 10, tempo: 100,
    summary: "A three-person PSS triangle clock with staggered pass phases A→B→C→A.", terminology: "3-count triangle", difficulty: "medium", basis: "source-backed", references: [terminologySources[1]],
    // The established card declares ten clubs, so retain that actual inventory
    // instead of silently normalising it to three per person.
    inventoryAllocation: freeze({ a: 4, b: 3, c: 3 }),
    rows: [
      { a: token("pass", "b", "right"), b: token("self", "b", "right"), c: token("self", "c", "right") },
      { a: token("self", "a", "left"), b: token("pass", "c", "right"), c: token("self", "c", "left") },
      { a: token("self", "a", "right"), b: token("self", "b", "left"), c: token("pass", "a", "right") },
    ],
  }),
  scheduledPattern({
    id: "v-one-half-feed-study", title: "V 1/2 feed · schedule study", people: V_PEOPLE, formation: "V", clubCount: 9, tempo: 96,
    summary: "A clear alternating feeder study: the feeder passes A then B while the active receiver returns and the other self-throws.", terminology: "1/2 feed", difficulty: "medium",
    rows: [
      { feeder: token("pass", "receiver-a", "right"), "receiver-a": token("pass", "feeder", "right"), "receiver-b": token("self", "receiver-b", "right") },
      { feeder: token("pass", "receiver-b", "left"), "receiver-a": token("self", "receiver-a", "left"), "receiver-b": token("pass", "feeder", "left") },
    ],
  }),
  scheduledPattern({
    id: "v-pps-feed-study", title: "V PPS / 3-count feed · schedule study", people: V_PEOPLE, formation: "V", clubCount: 9, tempo: 92,
    summary: "A three-beat feeder study: pass A, pass B, self; the receivers use staggered PSS response rows.", terminology: "PPS / 3-count feed", difficulty: "hard",
    rows: [
      { feeder: token("pass", "receiver-a", "right"), "receiver-a": token("pass", "feeder", "right"), "receiver-b": token("self", "receiver-b", "right") },
      { feeder: token("pass", "receiver-b", "left"), "receiver-a": token("self", "receiver-a", "left"), "receiver-b": token("pass", "feeder", "left") },
      { feeder: token("self", "feeder", "right"), "receiver-a": token("self", "receiver-a", "right"), "receiver-b": token("self", "receiver-b", "right") },
    ],
  }),
  ringPattern({ id: "inside-triangle-study", title: "Inside 3-count triangle · schedule study", people: TRIANGLE_PEOPLE, formation: "triangle", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], step: -1, summary: "An original PSS triangle schedule with the short/inside directional route shown consistently.", terminology: "inside 3-count triangle", difficulty: "medium" }),
  ringPattern({ id: "outside-triangle-study", title: "Outside 3-count triangle · schedule study", people: TRIANGLE_PEOPLE, formation: "triangle", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], step: 1, summary: "An original PSS triangle schedule with the opposite/outside directional route shown consistently.", terminology: "outside 3-count triangle", difficulty: "medium" }),
  scheduledPattern({
    id: "triangle-pair-self-study", title: "Triangle pair / self · schedule study", people: TRIANGLE_PEOPLE, formation: "triangle", clubCount: 9, tempo: 96,
    summary: "A simple triangle study: one pair exchanges while the third juggler self-throws, then roles rotate.", terminology: "triangle pair / self", difficulty: "easy",
    rows: [
      { a: token("pass", "b", "right"), b: token("pass", "a", "right"), c: token("self", "c", "right") },
      { a: token("self", "a", "left"), b: token("pass", "c", "left"), c: token("pass", "b", "left") },
      { a: token("pass", "c", "right"), b: token("self", "b", "right"), c: token("pass", "a", "right") },
    ],
  }),
  ringPattern({ id: "three-feast-one-study", title: "3-person feast · 1-count convention", people: TRIANGLE_PEOPLE, formation: "triangle", sequence: [{ kind: "pass", hand: "right" }], summary: "An explicit all-pass ring convention for reviewing a three-person feast-style clock.", terminology: "three-person feast", difficulty: "medium" }),
  ringPattern({ id: "three-feast-three-study", title: "3-person feast · 3-count convention", people: TRIANGLE_PEOPLE, formation: "triangle", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], summary: "An explicit PSS ring convention for reviewing a three-person feast-style clock.", terminology: "three-person feast", difficulty: "hard" }),
  ringPattern({ id: "triangle-all-pass-reverse-study", title: "Triangle all-pass reverse · study", people: TRIANGLE_PEOPLE, formation: "triangle", sequence: [{ kind: "pass", hand: "left" }], step: -1, summary: "A mirrored three-person all-pass convention with an explicit reverse target order.", terminology: "triangle all-pass reverse", difficulty: "easy" }),
  round("three-round", "3-person all-pass round · study", 3, [[0, 2.6, 180], [-2.35, 0.55, 60], [2.35, 0.55, -60]], "An original all-pass round study, included as a clear 3-person formation example."),
  round("four-round", "4-person all-pass round · study", 4, [[0, 3.05, 180], [-3.05, 1.45, 90], [0, -0.15, 0], [3.05, 1.45, -90]], "An original all-pass round study, included as a clear 4-person formation example."),
  scheduledPattern({
    id: "double-pps-cross-feed", title: "Double PPS cross feed", people: SQUARE_PEOPLE, formation: "square", clubCount: 12, tempo: 104,
    summary: "A four-person PPS cross-feed clock with two alternating target relationships shown as a stable square convention.", terminology: "PPS cross feed / double 3-count", difficulty: "hard", basis: "source-backed", references: [terminologySources[3]],
    rows: [
      { a: token("pass", "c", "right"), b: token("pass", "d", "right"), c: token("pass", "a", "right"), d: token("pass", "b", "right") },
      { a: token("pass", "b", "left"), b: token("self", "b", "left"), c: token("pass", "d", "left"), d: token("self", "d", "left") },
      { a: token("self", "a", "right"), b: token("pass", "a", "right"), c: token("self", "c", "right"), d: token("pass", "c", "right") },
    ],
  }),
  scheduledPattern({
    id: "three-count-accommodation", title: "3-count Accommodation · mixed-count square", people: SQUARE_PEOPLE, formation: "square", clubCount: 12, tempo: 96,
    summary: "A six-beat square schedule with explicit mixed roles: 3-count, PPS, right-hand 2-count, and left-hand 2-count.", terminology: "3-count Accommodation", difficulty: "hard", basis: "source-backed", references: [terminologySources[3]],
    rows: [
      { a: token("pass", "c", "right"), b: token("self", "b", "right"), c: token("pass", "a", "right"), d: token("self", "d", "right") },
      { a: token("self", "a", "left"), b: token("pass", "d", "left"), c: token("self", "c", "left"), d: token("pass", "b", "left") },
      { a: token("self", "a", "right"), b: token("pass", "c", "right"), c: token("pass", "b", "right"), d: token("self", "d", "right") },
      { a: token("pass", "d", "left"), b: token("self", "b", "left"), c: token("self", "c", "left"), d: token("pass", "a", "left") },
      { a: token("self", "a", "right"), b: token("pass", "c", "right"), c: token("pass", "b", "right"), d: token("self", "d", "right") },
      { a: token("self", "a", "left"), b: token("pass", "d", "left"), c: token("self", "c", "left"), d: token("pass", "b", "left") },
    ],
  }),
  scheduledPattern({
    id: "one-count-feeder-study", title: "One-count feeder + three 3-count feedees · study", people: SQUARE_PEOPLE, formation: "fan", clubCount: 12, tempo: 96,
    summary: "A rate-balanced feeder study: A passes every beat through B/C/D while the three feedees use phase-offset PSS rows.", terminology: "one-count feeder / three 3-count feedees", difficulty: "hard",
    rows: [
      { a: token("pass", "b", "right"), b: token("pass", "a", "right"), c: token("self", "c", "right"), d: token("self", "d", "right") },
      { a: token("pass", "c", "left"), b: token("self", "b", "left"), c: token("pass", "a", "left"), d: token("self", "d", "left") },
      { a: token("pass", "d", "right"), b: token("self", "b", "right"), c: token("self", "c", "right"), d: token("pass", "a", "right") },
    ],
  }),
  ringPattern({ id: "four-feast-one-study", title: "4-person feast · 1-count convention", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "right" }], summary: "An explicit all-pass square convention for reviewing a four-person feast-style clock.", terminology: "four-person feast", difficulty: "medium" }),
  ringPattern({ id: "four-feast-two-study", title: "4-person feast · 2-count convention", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], summary: "An explicit pass/self square convention for reviewing a four-person feast-style clock.", terminology: "four-person feast", difficulty: "medium" }),
  ringPattern({ id: "four-feast-three-study", title: "4-person feast · 3-count convention", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], summary: "An explicit PSS square convention for reviewing a four-person feast-style clock.", terminology: "four-person feast", difficulty: "hard" }),
  ringPattern({ id: "square-waltz-study", title: "Square 3-count circuit · study", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], summary: "An original clockwise PSS square circuit with a clearly defined target order.", terminology: "square 3-count circuit", difficulty: "medium" }),
  ringPattern({ id: "square-waltz-reverse-study", title: "Square 3-count reverse circuit · study", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], step: -1, summary: "The mirrored/reverse explicit PSS square convention.", terminology: "square 3-count reverse circuit", difficulty: "medium" }),
  scheduledPattern({
    id: "square-pair-relay-study", title: "Square pair relay · study", people: SQUARE_PEOPLE, formation: "square", clubCount: 12, tempo: 98,
    summary: "Pairs exchange on one beat while the other pair self-throws; the active pair rotates around the square.", terminology: "square pair relay", difficulty: "easy",
    rows: [
      { a: token("pass", "b", "right"), b: token("pass", "a", "right"), c: token("self", "c", "right"), d: token("self", "d", "right") },
      { a: token("self", "a", "left"), b: token("pass", "c", "left"), c: token("pass", "b", "left"), d: token("self", "d", "left") },
      { a: token("self", "a", "right"), b: token("self", "b", "right"), c: token("pass", "d", "right"), d: token("pass", "c", "right") },
      { a: token("pass", "d", "left"), b: token("self", "b", "left"), c: token("self", "c", "left"), d: token("pass", "a", "left") },
    ],
  }),
  ringPattern({ id: "square-all-pass-reverse-study", title: "Square all-pass reverse · study", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "left" }], step: -1, summary: "A mirrored all-pass square convention with an explicit reverse target order.", terminology: "square all-pass reverse", difficulty: "easy" }),
  ringPattern({ id: "square-four-count-study", title: "Square 4-count circuit · study", people: SQUARE_PEOPLE, formation: "square", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], summary: "An original PSSS square circuit with its route and hand sequence explicitly shown.", terminology: "square 4-count circuit", difficulty: "medium" }),
  round("five-round", "5-person all-pass round · study", 5, [[0, 3.25, 180], [-3.1, 2.0, 126], [-1.9, -0.15, 36], [1.9, -0.15, -36], [3.1, 2.0, -126]], "An original all-pass round study, included as a clear 5-person formation example."),
  ringPattern({ id: "five-star-one", title: "5-person star · 1-count", people: FIVE_PEOPLE, formation: "star", sequence: [{ kind: "pass", hand: "right" }], step: 2, summary: "A one-count pentagram route. The data order is A→C→E→B→D→A.", terminology: "1-count star", difficulty: "medium", basis: "source-backed", references: [terminologySources[3]] }),
  ringPattern({ id: "five-star-two", title: "5-person star · 2-count", people: FIVE_PEOPLE, formation: "star", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], step: 2, summary: "A pass/self pentagram route using the explicit A→C→E→B→D→A target order.", terminology: "2-count star", difficulty: "medium", basis: "source-backed", references: [terminologySources[3]] }),
  ringPattern({ id: "five-star-three", title: "5-person star · 3-count", people: FIVE_PEOPLE, formation: "star", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], step: 2, summary: "A PSS pentagram route using the explicit A→C→E→B→D→A target order.", terminology: "3-count star", difficulty: "hard", basis: "source-backed", references: [terminologySources[3]] }),
  ringPattern({ id: "five-star-four", title: "5-person star · 4-count", people: FIVE_PEOPLE, formation: "star", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], step: 2, summary: "A PSSS pentagram route using the explicit A→C→E→B→D→A target order.", terminology: "4-count star", difficulty: "hard", basis: "source-backed", references: [terminologySources[3]] }),
  ringPattern({ id: "five-feast-one-study", title: "5-person feast · 1-count convention", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "right" }], summary: "An explicit all-pass five-person ring convention for feast-style review.", terminology: "five-person feast", difficulty: "medium" }),
  ringPattern({ id: "five-feast-two-study", title: "5-person feast · 2-count convention", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }], summary: "An explicit pass/self five-person ring convention for feast-style review.", terminology: "five-person feast", difficulty: "medium" }),
  ringPattern({ id: "five-feast-three-study", title: "5-person feast · 3-count convention", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }], summary: "An explicit PSS five-person ring convention for feast-style review.", terminology: "five-person feast", difficulty: "hard" }),
  ringPattern({ id: "five-feast-four-study", title: "5-person feast · 4-count convention", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "right" }, { kind: "self", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], summary: "An explicit PSSS five-person ring convention for feast-style review.", terminology: "five-person feast", difficulty: "hard" }),
  ringPattern({ id: "five-pentagon-waltz-reverse-study", title: "5-person reverse 3-count circuit · study", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "left" }, { kind: "self", hand: "right" }, { kind: "self", hand: "left" }], step: -1, summary: "A mirrored PSS pentagon convention with a stable reverse target order.", terminology: "five-person 3-count circuit", difficulty: "medium" }),
  ringPattern({ id: "five-pentagon-all-pass-reverse-study", title: "5-person all-pass reverse · study", people: FIVE_PEOPLE, formation: "pentagon", sequence: [{ kind: "pass", hand: "left" }], step: -1, summary: "A mirrored all-pass pentagon convention with a stable reverse target order.", terminology: "five-person all-pass circuit", difficulty: "easy" }),
  scheduledPattern({
    id: "five-pentagon-pair-relay-study", title: "5-person pentagon pair relay · study", people: FIVE_PEOPLE, formation: "pentagon", clubCount: 15, tempo: 94,
    summary: "An original five-person relay convention: one passing pair steps around the pentagon while the remaining players self-throw.", terminology: "pentagon pair relay", difficulty: "medium",
    rows: [
      { a: token("pass", "b", "right"), b: token("pass", "a", "right"), c: token("self", "c", "right"), d: token("self", "d", "right"), e: token("self", "e", "right") },
      { a: token("self", "a", "left"), b: token("pass", "c", "left"), c: token("pass", "b", "left"), d: token("self", "d", "left"), e: token("self", "e", "left") },
      { a: token("self", "a", "right"), b: token("self", "b", "right"), c: token("pass", "d", "right"), d: token("pass", "c", "right"), e: token("self", "e", "right") },
      { a: token("self", "a", "left"), b: token("self", "b", "left"), c: token("self", "c", "left"), d: token("pass", "e", "left"), e: token("pass", "d", "left") },
      { a: token("pass", "e", "right"), b: token("self", "b", "right"), c: token("self", "c", "right"), d: token("self", "d", "right"), e: token("pass", "a", "right") },
    ],
  }),
]);

export const PASSING_COMING_NEXT = freeze([
  freeze({ peopleCount: 5, formation: "pentagon", title: "Chocolate Box", difficulty: "hard", reason: "Named pattern retained for later: its exact event routing/start convention has not been independently verified for this library yet." }),
  freeze({ peopleCount: 3, formation: "triangle", title: "Triangle circuit / pair / self", difficulty: "medium", reason: "Keep as a future named card once its preferred community start convention is independently validated." }),
]);

export function getPassingPattern(id) { return PASSING_PATTERNS.find((pattern) => pattern.id === id) || PASSING_PATTERNS[0]; }
export function patternsForPeople(count) { return PASSING_PATTERNS.filter((pattern) => pattern.peopleCount === Number(count)); }
export function eventsAtBeat(pattern, beat) {
  const wrapped = ((Math.floor(beat) % pattern.loopBeats) + pattern.loopBeats) % pattern.loopBeats;
  return pattern.events.filter((entry) => entry.beat === wrapped);
}
export function validatePassingPattern(pattern) {
  const performerIds = new Set(pattern.performers.map((person) => person.id));
  if (!Number.isInteger(pattern.loopBeats) || pattern.loopBeats < 1) return "loopBeats must be a positive integer";
  if (!Number.isInteger(pattern.clubCount) || pattern.clubCount < 1) return "clubCount must be a positive integer";
  if (!Array.isArray(pattern.countIn) || pattern.countIn.length < 3) return "count-in must contain Sky, Earth, and Pass";
  if (pattern.inventoryMode && !["steady-state", "visual-study"].includes(pattern.inventoryMode)) return "invalid inventory mode";
  if (pattern.inventoryAllocation) {
    if (Object.keys(pattern.inventoryAllocation).some((id) => !performerIds.has(id))) return "inventory allocation references unknown performer";
    const count = Object.values(pattern.inventoryAllocation).reduce((sum, value) => sum + value, 0);
    if (!Object.values(pattern.inventoryAllocation).every((value) => Number.isInteger(value) && value >= 0) || count !== pattern.clubCount) return "inventory allocation must be non-negative integers summing to clubCount";
  }
  for (const entry of pattern.events) {
    if (!Number.isInteger(entry.beat) || entry.beat < 0 || entry.beat >= pattern.loopBeats) return "event beat outside loop";
    if (!performerIds.has(entry.juggler) || !performerIds.has(entry.target)) return "event references unknown performer";
    if (![["left", "right"].includes(entry.hand), ["left", "right"].includes(entry.catchHand), ["self", "pass", "hold"].includes(entry.kind)].every(Boolean)) return "invalid event hand, catch hand, or kind";
  }
  return null;
}

export function passingStateFromHash(hash = window.location.hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const club = /^#[0-9a-f]{6}$/i.test(params.get("club")) ? params.get("club") : "#f4f1e8";
  return { pattern: getPassingPattern(params.get("pattern")).id, club };
}
export function passingStateHash(state) {
  const pattern = getPassingPattern(state?.pattern).id;
  const club = /^#[0-9a-f]{6}$/i.test(state?.club) ? state.club : "#f4f1e8";
  return `#pattern=${encodeURIComponent(pattern)}&club=${encodeURIComponent(club)}`;
}
export function copyPassingPattern(pattern) { return clone(pattern); }
