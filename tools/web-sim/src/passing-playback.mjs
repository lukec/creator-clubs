import { eventsAtBeat } from "./passing-library.mjs?build=throw-semantics-v20";

export const COUNT_IN_BEATS = 2;

const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const freeze = (value) => Object.freeze(value);
const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
const ledgerCache = new WeakMap();

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

function absolutePlayhead(value) {
  return Math.max(-COUNT_IN_BEATS, finite(value, -COUNT_IN_BEATS));
}

function throwDuration(pattern, event) {
  const flightBeats = Number(event.flightBeats);
  if (!Number.isInteger(flightBeats) || flightBeats < 1) {
    throw new RangeError(`${pattern.id}: ${event.juggler} ${event.kind} on beat ${event.beat + 1} needs a positive integer flightBeats duration`);
  }
  return flightBeats;
}

function initialLedger(pattern) {
  return {
    beat: -1,
    heldByPerson: groupedTokens(inventoryTokens(pattern), pattern.performers),
    activeFlights: [],
  };
}

function cloneLedger(ledger) {
  return {
    beat: ledger.beat,
    heldByPerson: new Map([...ledger.heldByPerson].map(([personId, tokens]) => [personId, tokens.map((token) => ({ ...token }))])),
    activeFlights: ledger.activeFlights.map((flight) => ({ ...flight, token: { ...flight.token } })),
  };
}

function advanceLedgerBoundary(pattern, ledger, beat) {
  const stillActive = [];
  ledger.activeFlights.forEach((flight) => {
    if (flight.catchBeat <= beat) {
      ledger.heldByPerson.get(flight.event.target).push({
        ...flight.token,
        personId: flight.event.target,
        hand: flight.event.catchHand,
      });
    } else {
      stillActive.push(flight);
    }
  });
  ledger.activeFlights = stillActive;

  eventsAtBeat(pattern, beat).forEach((event) => {
    if (event.kind === "hold") return;
    const held = ledger.heldByPerson.get(event.juggler);
    const token = chooseThrownToken(held, event.hand);
    if (!token) throw new RangeError(`${pattern.id}: ${event.juggler} has no ${event.hand}-hand club available for absolute beat ${beat + 1}`);
    const flightBeats = throwDuration(pattern, event);
    ledger.activeFlights.push({
      event,
      token,
      launchBeat: beat,
      catchBeat: beat + flightBeats,
      flightBeats,
    });
  });
  ledger.beat = beat;
}

function ledgerAtBeat(pattern, beat) {
  let cached = ledgerCache.get(pattern);
  if (!cached || cached.beat > beat) cached = initialLedger(pattern);
  const ledger = cloneLedger(cached);
  for (let boundary = ledger.beat + 1; boundary <= beat; boundary += 1) advanceLedgerBoundary(pattern, ledger, boundary);
  ledgerCache.set(pattern, cloneLedger(ledger));
  return ledger;
}

function activeFlightSample(flight, playhead) {
  const elapsedBeats = Math.max(0, Math.min(flight.flightBeats, playhead - flight.launchBeat));
  return freeze({
    ...flight.event,
    id: flight.token.id,
    tokenId: flight.token.id,
    homePersonId: flight.token.homePersonId,
    tokenIndex: flight.token.index,
    sourcePersonId: flight.event.juggler,
    launchBeat: flight.launchBeat,
    catchBeat: flight.catchBeat,
    flightBeats: flight.flightBeats,
    elapsedBeats,
    progress: elapsedBeats / flight.flightBeats,
  });
}

function sampleVisualStudy(pattern, playhead) {
  const beat = Math.floor(playhead);
  const heldByPerson = groupedTokens(inventoryTokens(pattern), pattern.performers);
  const activeFlights = eventsAtBeat(pattern, beat)
    .filter((event) => event.kind !== "hold")
    .map((event) => {
      const token = chooseThrownToken(heldByPerson.get(event.juggler), event.hand, true);
      if (!token) throw new RangeError(`${pattern.id}: ${event.juggler} has no club available for displayed beat ${mod(beat, pattern.loopBeats) + 1}`);
      const flightBeats = throwDuration(pattern, event);
      return activeFlightSample({ event, token, launchBeat: beat, catchBeat: beat + flightBeats, flightBeats }, playhead);
    });
  return { heldByPerson, activeFlights };
}

export function sampleInventory(pattern, playhead) {
  const absolute = absolutePlayhead(playhead);
  const normalized = absolute < 0 ? absolute : mod(absolute, pattern.loopBeats);
  const allocation = initialClubAllocation(pattern);
  const mode = pattern.inventoryMode || "steady-state";
  const currentEvents = absolute < 0 ? freeze([]) : freeze(eventsAtBeat(pattern, Math.floor(absolute)).map((event) => freeze({ ...event })));
  let heldByPerson;
  let activeFlights;
  if (absolute < 0) {
    heldByPerson = groupedTokens(inventoryTokens(pattern), pattern.performers);
    activeFlights = [];
  } else if (mode === "visual-study") {
    ({ heldByPerson, activeFlights } = sampleVisualStudy(pattern, absolute));
  } else {
    const ledger = ledgerAtBeat(pattern, Math.floor(absolute));
    heldByPerson = ledger.heldByPerson;
    activeFlights = ledger.activeFlights.map((flight) => activeFlightSample(flight, absolute));
  }
  const held = [...heldByPerson.values()].flatMap((tokens) => tokens.map((token, slot) => freeze({ ...token, slot, heldCount: tokens.length })));
  const airborne = freeze(activeFlights);
  const visible = [...held, ...airborne];
  if (visible.length !== pattern.clubCount) throw new RangeError(`${pattern.id}: visible inventory ${visible.length} does not equal clubCount ${pattern.clubCount}`);
  if (new Set(visible.map((token) => token.id)).size !== visible.length) throw new RangeError(`${pattern.id}: a visible club token is duplicated`);
  return freeze({
    playhead: normalized,
    absolutePlayhead: absolute,
    cue: cueAtPlayhead(pattern, normalized),
    allocation,
    mode,
    held: freeze(held),
    airborne,
    activeFlights: airborne,
    currentEvents,
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
