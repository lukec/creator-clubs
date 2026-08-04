export const PASSING_PATTERN_COMPILER_VERSION = 1;

const freeze = (value) => Object.freeze(value);
const HANDS = freeze(["left", "right"]);
const ACTIONS = new Set(["hold", "pass", "self"]);

export const oppositePassingHand = (hand) => {
  if (!HANDS.includes(hand)) throw new RangeError(`unknown passing hand ${hand}`);
  return hand === "left" ? "right" : "left";
};

const handKey = (personId, hand) => `${personId}:${hand}`;

function validateEvents(pattern) {
  const performerIds = new Set(pattern.performers.map((person) => person.id));
  const occupied = new Set();
  pattern.events.forEach((event) => {
    if (!Number.isInteger(event.beat) || event.beat < 0 || event.beat >= pattern.loopBeats) throw new RangeError(`${pattern.id}: event beat ${event.beat} is outside its loop`);
    if (!performerIds.has(event.juggler)) throw new RangeError(`${pattern.id}: unknown juggler ${event.juggler}`);
    if (!ACTIONS.has(event.kind)) throw new RangeError(`${pattern.id}: unknown action ${event.kind}`);
    if (!HANDS.includes(event.hand) || !HANDS.includes(event.catchHand)) throw new RangeError(`${pattern.id}: every action needs explicit throw and catch hands`);
    if (event.kind !== "hold" && !performerIds.has(event.target)) throw new RangeError(`${pattern.id}: unknown target ${event.target}`);
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
  for (let beat = 0; beat < pattern.loopBeats; beat += 1) {
    const row = pattern.events.filter((event) => event.beat === beat && event.kind !== "hold");
    row.forEach((event) => {
      const key = handKey(event.juggler, event.hand);
      const next = running.get(key) - 1;
      running.set(key, next);
      required.set(key, Math.max(required.get(key), -next));
    });
    row.forEach((event) => {
      const key = handKey(event.target, event.catchHand);
      running.set(key, running.get(key) + 1);
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
  validateEvents(compiled);
  if (compiled.inventoryMode !== "visual-study" && !balanced(handFlow(compiled, compiled.events))) throw new RangeError(`${compiled.id}: mirrored continuation does not produce periodic hand flow`);
  return freeze({
    ...compiled,
    executionPlan: freeze({
      compilerVersion: PASSING_PATTERN_COMPILER_VERSION,
      sourceLoopBeats,
      handPeriodMultiplier,
      handFlow: compiled.inventoryMode === "visual-study" ? "visual-study" : "periodic",
      initialHandAllocation: initialHandAllocation(compiled),
    }),
  });
}
