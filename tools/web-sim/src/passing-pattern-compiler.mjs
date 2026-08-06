const freeze = (value) => Object.freeze(value);
export const PASSING_PATTERN_COMPILER_VERSION = 3;
export const PASSING_FACING_CONVENTION = freeze({
  angleUnit: "degrees",
  zeroDirection: "downstage (+z)",
  positiveRotation: "toward audience-right (+x) around +y",
});
const HANDS = freeze(["left", "right"]);
const ACTIONS = new Set(["hold", "pass", "self"]);
const THROW_TYPES = new Set(["hold", "single", "double"]);
const PASS_PATHS = new Set(["straight", "crossing"]);

export const oppositePassingHand = (hand) => {
  if (!HANDS.includes(hand)) throw new RangeError(`unknown passing hand ${hand}`);
  return hand === "left" ? "right" : "left";
};

export const passingCatchHand = (hand, path) => {
  if (!HANDS.includes(hand)) throw new RangeError(`unknown passing hand ${hand}`);
  if (path === "crossing") return hand;
  if (path === "straight" || path === "self") return oppositePassingHand(hand);
  throw new RangeError(`unknown passing path ${path}`);
};

const handKey = (personId, hand) => `${personId}:${hand}`;

export function passingFacingVector(facingDegrees) {
  if (!Number.isFinite(facingDegrees)) throw new TypeError(`passing facing must be finite, received ${facingDegrees}`);
  const headingRadians = facingDegrees * Math.PI / 180;
  return freeze({ x: Math.sin(headingRadians), y: 0, z: Math.cos(headingRadians) });
}

function validatePerformers(pattern) {
  if (!Array.isArray(pattern.performers) || pattern.performers.length === 0) throw new RangeError(`${pattern.id}: at least one performer is required`);
  const performerIds = new Set();
  pattern.performers.forEach((person) => {
    if (typeof person.id !== "string" || person.id.length === 0) throw new RangeError(`${pattern.id}: every performer needs a non-empty ID`);
    if (performerIds.has(person.id)) throw new RangeError(`${pattern.id}: duplicate performer ${person.id}`);
    performerIds.add(person.id);
    if (![person.x, person.z, person.facing].every(Number.isFinite)) throw new RangeError(`${pattern.id}: ${person.id} needs finite x, z, and facing values`);
  });
}

function validatePassFacing(pattern, event, performers) {
  if (event.kind !== "pass") return;
  if (event.target === event.juggler) throw new RangeError(`${pattern.id}: pass event for ${event.juggler} must target another performer`);
  const source = performers.get(event.juggler);
  const target = performers.get(event.target);
  const deltaX = target.x - source.x;
  const deltaZ = target.z - source.z;
  const distance = Math.hypot(deltaX, deltaZ);
  if (distance <= 1e-9) throw new RangeError(`${pattern.id}: pass ${source.id} to ${target.id} has no horizontal route`);
  const sourceForward = passingFacingVector(source.facing);
  const targetForward = passingFacingVector(target.facing);
  const sourceDot = (sourceForward.x * deltaX + sourceForward.z * deltaZ) / distance;
  const targetDot = (-targetForward.x * deltaX - targetForward.z * deltaZ) / distance;
  if (sourceDot <= 1e-9) throw new RangeError(`${pattern.id}: pass ${source.id} to ${target.id} puts the target behind or beside the thrower's declared facing`);
  if (targetDot <= 1e-9) throw new RangeError(`${pattern.id}: pass ${source.id} to ${target.id} puts the thrower behind or beside the receiver's declared facing`);
}

function validateEventSemantics(pattern, event) {
  if (!THROW_TYPES.has(event.throwType)) throw new RangeError(`${pattern.id}: ${event.juggler} has unknown throw type ${event.throwType}`);
  if (!Number.isInteger(event.flightBeats) || event.flightBeats < 0) throw new RangeError(`${pattern.id}: ${event.juggler} flightBeats must be a non-negative integer`);
  if (!Number.isFinite(event.spins) || event.spins < 0) throw new RangeError(`${pattern.id}: ${event.juggler} spins must be a non-negative finite number`);
  if (!Number.isFinite(event.heightMultiplier) || event.heightMultiplier < 0) throw new RangeError(`${pattern.id}: ${event.juggler} heightMultiplier must be a non-negative finite number`);

  if (event.kind === "hold") {
    if (event.throwType !== "hold" || event.flightBeats !== 0 || event.spins !== 0 || event.heightMultiplier !== 0) {
      throw new RangeError(`${pattern.id}: hold events require the zero-height hold throw profile`);
    }
    if (event.path !== "self") throw new RangeError(`${pattern.id}: hold events require path self`);
    return;
  }

  if (event.throwType === "hold" || event.flightBeats < 1 || event.heightMultiplier <= 0) {
    throw new RangeError(`${pattern.id}: ${event.kind} events require a positive-flight throw profile`);
  }
  if (event.kind === "pass" && !PASS_PATHS.has(event.path)) throw new RangeError(`${pattern.id}: pass path must be straight or crossing`);
  if (event.kind === "self" && event.path !== "self") throw new RangeError(`${pattern.id}: self events require path self`);
  const expectedCatchHand = passingCatchHand(event.hand, event.path);
  if (event.catchHand !== expectedCatchHand) {
    throw new RangeError(`${pattern.id}: ${event.path} ${event.kind} from ${event.hand} must catch in ${expectedCatchHand}, not ${event.catchHand}`);
  }
}

const modulo = (value, modulus) => ((value % modulus) + modulus) % modulus;

function validateArrivalSlots(pattern) {
  const occupied = new Map();
  pattern.events.forEach((event) => {
    if (event.kind === "hold") return;
    const arrivalBeat = modulo(event.beat + event.flightBeats, pattern.loopBeats);
    const slot = `${arrivalBeat}:${event.target}:${event.catchHand}`;
    const previous = occupied.get(slot);
    if (previous) {
      throw new RangeError(`${pattern.id}: ${previous.juggler} and ${event.juggler} send two clubs to ${event.target}'s ${event.catchHand} hand on arrival beat ${arrivalBeat + 1}`);
    }
    occupied.set(slot, event);
  });
}

function validateEvents(pattern, { arrivals = false } = {}) {
  validatePerformers(pattern);
  const performers = new Map(pattern.performers.map((person) => [person.id, person]));
  const performerIds = new Set(performers.keys());
  const occupied = new Set();
  pattern.events.forEach((event) => {
    if (!Number.isInteger(event.beat) || event.beat < 0 || event.beat >= pattern.loopBeats) throw new RangeError(`${pattern.id}: event beat ${event.beat} is outside its loop`);
    if (!performerIds.has(event.juggler)) throw new RangeError(`${pattern.id}: unknown juggler ${event.juggler}`);
    if (!ACTIONS.has(event.kind)) throw new RangeError(`${pattern.id}: unknown action ${event.kind}`);
    if (!HANDS.includes(event.hand) || !HANDS.includes(event.catchHand)) throw new RangeError(`${pattern.id}: every action needs explicit throw and catch hands`);
    if (event.kind !== "hold" && !performerIds.has(event.target)) throw new RangeError(`${pattern.id}: unknown target ${event.target}`);
    validateEventSemantics(pattern, event);
    validatePassFacing(pattern, event, performers);
    const slot = `${event.beat}:${event.juggler}`;
    if (occupied.has(slot)) throw new RangeError(`${pattern.id}: ${event.juggler} has more than one action on beat ${event.beat + 1}`);
    occupied.add(slot);
  });
  if (pattern.inventoryMode !== "visual-study") {
    for (let beat = 0; beat < pattern.loopBeats; beat += 1) {
      pattern.performers.forEach((person) => {
        if (!occupied.has(`${beat}:${person.id}`)) throw new RangeError(`${pattern.id}: ${person.id} has no action on beat ${beat + 1}`);
      });
    }
  }
  if (arrivals) validateArrivalSlots(pattern);
}

function compileOrientation(pattern) {
  const performers = freeze(Object.fromEntries(pattern.performers.map((person) => {
    const forward = passingFacingVector(person.facing);
    return [person.id, freeze({
      source: "declared-facing",
      facingDegrees: person.facing,
      forward,
      right: freeze({ x: -forward.z, y: 0, z: forward.x }),
    })];
  })));
  return freeze({
    source: "declared-performer-facing",
    convention: PASSING_FACING_CONVENTION,
    performers,
  });
}

function handFlow(pattern, events) {
  const flow = new Map(pattern.performers.flatMap((person) => HANDS.map((hand) => [handKey(person.id, hand), 0])));
  events.forEach((event) => {
    if (event.kind === "hold") return;
    flow.set(handKey(event.juggler, event.hand), flow.get(handKey(event.juggler, event.hand)) - 1);
    flow.set(handKey(event.target, event.catchHand), flow.get(handKey(event.target, event.catchHand)) + 1);
  });
  return flow;
}

const balanced = (flow) => [...flow.values()].every((value) => value === 0);

function performerInventory(pattern) {
  if (pattern.inventoryAllocation) return Object.fromEntries(pattern.performers.map((person) => [person.id, pattern.inventoryAllocation[person.id] || 0]));
  const base = Math.floor(pattern.clubCount / pattern.performers.length);
  const remainder = pattern.clubCount % pattern.performers.length;
  return Object.fromEntries(pattern.performers.map((person, index) => [person.id, base + (index < remainder ? 1 : 0)]));
}

function initialHandAllocation(pattern) {
  if (pattern.inventoryMode === "visual-study") return freeze({});
  const running = new Map(pattern.performers.flatMap((person) => HANDS.map((hand) => [handKey(person.id, hand), 0])));
  const required = new Map(running);
  const pendingArrivals = new Map();
  const maxFlightBeats = Math.max(...pattern.events.map((event) => event.flightBeats), 0);
  // Start from the real count-in state: every token is held and no prior-loop
  // throw is already in the air. Continue through one fully populated period
  // after the longest flight so delayed hand demand cannot hide at the seam.
  for (let beat = 0; beat < maxFlightBeats + pattern.loopBeats; beat += 1) {
    (pendingArrivals.get(beat) || []).forEach((event) => {
      const key = handKey(event.target, event.catchHand);
      running.set(key, running.get(key) + 1);
    });
    const row = pattern.events.filter((event) => event.beat === beat % pattern.loopBeats && event.kind !== "hold");
    row.forEach((event) => {
      const key = handKey(event.juggler, event.hand);
      const next = running.get(key) - 1;
      running.set(key, next);
      required.set(key, Math.max(required.get(key), -next));
      const arrivalBeat = beat + event.flightBeats;
      if (!pendingArrivals.has(arrivalBeat)) pendingArrivals.set(arrivalBeat, []);
      pendingArrivals.get(arrivalBeat).push(event);
    });
  }
  const inventory = performerInventory(pattern);
  const allocation = {};
  pattern.performers.forEach((person) => {
    const counts = { left: required.get(handKey(person.id, "left")), right: required.get(handKey(person.id, "right")) };
    let remaining = inventory[person.id] - counts.left - counts.right;
    if (remaining < 0) throw new RangeError(`${pattern.id}: ${person.id} needs at least ${counts.left + counts.right} clubs to execute the declared hand schedule`);
    while (remaining > 0) {
      const hand = counts.left <= counts.right ? "left" : "right";
      counts[hand] += 1;
      remaining -= 1;
    }
    allocation[person.id] = freeze(counts);
  });
  return freeze(allocation);
}

function mirrorEvent(event, beatOffset) {
  return freeze({
    ...event,
    beat: event.beat + beatOffset,
    hand: oppositePassingHand(event.hand),
    catchHand: oppositePassingHand(event.catchHand),
  });
}

export function compilePassingPattern(rawPattern) {
  const sourceLoopBeats = rawPattern.loopBeats;
  const sourceEvents = rawPattern.events.map((event) => freeze({ ...event }));
  let events = sourceEvents;
  let loopBeats = sourceLoopBeats;
  let handPeriodMultiplier = 1;
  const sourcePattern = { ...rawPattern, events: sourceEvents };
  validateEvents(sourcePattern);

  if (rawPattern.inventoryMode !== "visual-study" && !balanced(handFlow(sourcePattern, sourceEvents))) {
    events = freeze([...sourceEvents, ...sourceEvents.map((event) => mirrorEvent(event, sourceLoopBeats))]);
    loopBeats = sourceLoopBeats * 2;
    handPeriodMultiplier = 2;
  } else {
    events = freeze(sourceEvents);
  }

  const compiled = {
    ...rawPattern,
    loopBeats,
    events,
  };
  validateEvents(compiled, { arrivals: true });
  if (compiled.inventoryMode !== "visual-study" && !balanced(handFlow(compiled, compiled.events))) throw new RangeError(`${compiled.id}: mirrored continuation does not produce periodic hand flow`);
  return freeze({
    ...compiled,
    executionPlan: freeze({
      compilerVersion: PASSING_PATTERN_COMPILER_VERSION,
      sourceLoopBeats,
      handPeriodMultiplier,
      handFlow: compiled.inventoryMode === "visual-study" ? "visual-study" : "periodic",
      initialHandAllocation: initialHandAllocation(compiled),
      orientation: compileOrientation(compiled),
    }),
  });
}
