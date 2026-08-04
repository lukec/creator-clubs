import { eventsAtBeat } from "./passing-library.mjs";

export const COUNT_IN_BEATS = 2;

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const freeze = (value) => Object.freeze(value);

function declaredAllocation(pattern) {
  const people = pattern?.performers || [];
  const declared = pattern?.inventoryAllocation;
  if (!declared || typeof declared !== "object") return null;
  const knownIds = new Set(people.map((person) => person.id));
  if (Object.keys(declared).some((id) => !knownIds.has(id))) throw new RangeError(`${pattern.id}: inventory allocation names an unknown performer`);
  return people.map((person) => ({ personId: person.id, count: Math.floor(finite(declared[person.id], -1)) }));
}

export function initialClubAllocation(pattern) {
  const people = pattern?.performers || [];
  if (!people.length) return freeze([]);
  const total = Math.max(0, Math.floor(finite(pattern.clubCount)));
  const explicit = declaredAllocation(pattern);
  const allocation = explicit || (() => {
    const base = Math.floor(total / people.length);
    const remainder = total % people.length;
    return people.map((person, index) => ({ personId: person.id, count: base + (index < remainder ? 1 : 0) }));
  })();
  if (allocation.some((entry) => entry.count < 0) || allocation.reduce((sum, entry) => sum + entry.count, 0) !== total) throw new RangeError(`${pattern.id}: inventory allocation must sum to clubCount`);
  return freeze(allocation.map((entry) => freeze({ ...entry })));
}

export function inventoryTokens(pattern) {
  return freeze(initialClubAllocation(pattern).flatMap(({ personId, count }) => {
    const compiled = pattern.executionPlan?.initialHandAllocation?.[personId];
    const hands = compiled
      ? [...Array(compiled.left).fill("left"), ...Array(compiled.right).fill("right")]
      : Array.from({ length: count }, (_, index) => index % 2 ? "right" : "left");
    if (hands.length !== count) throw new RangeError(`${pattern.id}: compiled hand allocation does not match ${personId}'s declared inventory`);
    return hands.map((hand, index) => freeze({
      id: `${personId}-club-${index + 1}`,
      homePersonId: personId,
      personId,
      hand,
      index,
    }));
  }));
}

export function clampPlayhead(pattern, value) {
  const maximum = Math.max(0, Math.floor(finite(pattern?.loopBeats, 1))) - 0.001;
  return Math.max(-COUNT_IN_BEATS, Math.min(maximum, finite(value, -COUNT_IN_BEATS)));
}

export function beatAtPlayhead(pattern, playhead) {
  const clamped = clampPlayhead(pattern, playhead);
  if (clamped < 0) return null;
  return Math.floor(clamped);
}

export function cueAtPlayhead(pattern, playhead) {
  const beat = clampPlayhead(pattern, playhead);
  if (beat < -1) return freeze({ name: "Sky", detail: "Raise clubs with a slight natural stagger.", beat: -2 });
  if (beat < 0) return freeze({ name: "Earth", detail: "Lower together to the head-down side position.", beat: -1 });
  return freeze({ name: "Pass", detail: `Beat ${Math.floor(beat) + 1} of ${pattern.loopBeats}`, beat: Math.floor(beat) });
}

export function launchesAtPlayhead(pattern, playhead) {
  const beat = beatAtPlayhead(pattern, playhead);
  if (beat === null) return freeze([]);
  return freeze(eventsAtBeat(pattern, beat).filter((entry) => entry.kind === "self" || entry.kind === "pass"));
}

function groupedTokens(tokens, performers) {
  return new Map(performers.map((person) => [person.id, tokens.filter((token) => token.personId === person.id).map((token) => ({ ...token }))]));
}

function chooseThrownToken(held, hand, allowFallback = false) {
  const handIndex = held.findIndex((token) => token.hand === hand);
  if (handIndex >= 0) return held.splice(handIndex, 1)[0];
  return allowFallback ? held.splice(0, 1)[0] : undefined;
}

function completedBeat(pattern, heldByPerson, beat) {
  const arrivals = [];
  eventsAtBeat(pattern, beat).forEach((entry) => {
    if (entry.kind === "hold") return;
    const held = heldByPerson.get(entry.juggler);
    const token = chooseThrownToken(held, entry.hand, pattern.inventoryMode === "visual-study");
    if (!token) throw new RangeError(`${pattern.id}: ${entry.juggler} has no club available for beat ${beat + 1}`);
    arrivals.push({ ...token, personId: entry.target, hand: entry.catchHand });
  });
  arrivals.forEach((token) => heldByPerson.get(token.personId).push(token));
}

function heldAtBeat(pattern, beat) {
  const heldByPerson = groupedTokens(inventoryTokens(pattern), pattern.performers);
  // The normal patterns use a periodic schedule. A few full loops give a
  // deterministic settled presentation state before sampling the requested
  // beat; the retained Stage Lab visual study intentionally cannot conserve
  // ownership around its loop and is handled below instead.
  const settledBeats = pattern.loopBeats * 4;
  for (let index = 0; index < settledBeats + beat; index += 1) completedBeat(pattern, heldByPerson, index);
  return heldByPerson;
}

function heldAtStaticStudy(pattern) {
  return groupedTokens(inventoryTokens(pattern), pattern.performers);
}

export function sampleInventory(pattern, playhead) {
  const clamped = clampPlayhead(pattern, playhead);
  const allocation = initialClubAllocation(pattern);
  const beat = beatAtPlayhead(pattern, clamped);
  const mode = pattern.inventoryMode || "steady-state";
  const heldByPerson = beat === null || mode === "visual-study" ? heldAtStaticStudy(pattern) : heldAtBeat(pattern, beat);
  const launches = launchesAtPlayhead(pattern, clamped);
  const airborne = launches.map((entry) => {
    const held = heldByPerson.get(entry.juggler);
    const token = chooseThrownToken(held, entry.hand, mode === "visual-study");
    if (!token) throw new RangeError(`${pattern.id}: ${entry.juggler} has no club available for displayed beat ${(beat ?? 0) + 1}`);
    return freeze({ ...entry, id: token.id, tokenId: token.id, sourcePersonId: entry.juggler });
  });
  const held = [...heldByPerson.values()].flatMap((tokens) => tokens.map((token, slot) => freeze({ ...token, slot, heldCount: tokens.length })));
  const visible = [...held, ...airborne];
  if (visible.length !== pattern.clubCount) throw new RangeError(`${pattern.id}: visible inventory ${visible.length} does not equal clubCount ${pattern.clubCount}`);
  if (new Set(visible.map((token) => token.id)).size !== visible.length) throw new RangeError(`${pattern.id}: a visible club token is duplicated`);
  return freeze({
    playhead: clamped,
    cue: cueAtPlayhead(pattern, clamped),
    allocation,
    mode,
    held: freeze(held),
    airborne: freeze(airborne),
    total: visible.length,
  });
}

export function stepPlayhead(pattern, playhead, direction) {
  const current = clampPlayhead(pattern, playhead);
  const rounded = direction < 0 ? Math.ceil(current - 0.001) - 1 : Math.floor(current + 0.001) + 1;
  return clampPlayhead(pattern, rounded);
}

export function advancePlayhead(pattern, playhead, deltaBeats) {
  const next = finite(playhead) + finite(deltaBeats);
  if (next < pattern.loopBeats) return clampPlayhead(pattern, next);
  const wrapped = ((next % pattern.loopBeats) + pattern.loopBeats) % pattern.loopBeats;
  return clampPlayhead(pattern, wrapped);
}
