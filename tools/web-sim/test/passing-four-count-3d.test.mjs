import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";

import { getPassingPattern } from "../src/passing-library.mjs";
import {
  ADULT_JUGGLER_HEIGHT_METRES,
  EARTH_GRAVITY_METRES_PER_SECOND_SQUARED,
  FOUR_COUNT_3D_ANCHOR_VARIATION_HEIGHT_RESERVE_METRES,
  FOUR_COUNT_3D_ARM_RIG_POLICY,
  FOUR_COUNT_3D_BALANCE_APEX_METRES,
  FOUR_COUNT_3D_BASE_BPM,
  FOUR_COUNT_3D_BEAT_SECONDS,
  FOUR_COUNT_3D_CAMERAS,
  FOUR_COUNT_3D_COUNT_IN_ARM_POLICY,
  FOUR_COUNT_3D_CLUB_HANDLING_POLICY,
  FOUR_COUNT_3D_COLLISION_POLICY,
  FOUR_COUNT_3D_CYCLE_SECONDS,
  FOUR_COUNT_3D_FLIGHT_BEATS,
  FOUR_COUNT_3D_FORWARD_LOAD_BEATS,
  FOUR_COUNT_3D_FORWARD_LOAD_SECONDS,
  FOUR_COUNT_3D_HAND_PATH_FRACTIONS,
  FOUR_COUNT_3D_MOTION_STATES,
  FOUR_COUNT_3D_PASS_FLIGHT_BEATS,
  FOUR_COUNT_3D_PASS_FLIGHT_SECONDS,
  FOUR_COUNT_3D_PASS_CATCH_BALANCE_HEIGHT_METRES,
  FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES,
  FOUR_COUNT_3D_PASS_SPIN_RADIANS,
  FOUR_COUNT_3D_PASS_TURNS,
  FOUR_COUNT_3D_PATTERN_ID,
  FOUR_COUNT_3D_PLAYBACK_SPEEDS,
  FOUR_COUNT_3D_SCHEDULE,
  FOUR_COUNT_3D_SELF_DWELL_SECONDS,
  FOUR_COUNT_3D_SELF_FLIGHT_BEATS,
  FOUR_COUNT_3D_SELF_FLIGHT_SECONDS,
  FOUR_COUNT_3D_SHOULDER_RIG_POLICY,
  FOUR_COUNT_3D_STAGE,
  FOUR_COUNT_3D_SELF_CATCH_HEIGHT_METRES,
  FOUR_COUNT_3D_THROW_CYCLE_BEATS,
  FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES,
  FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY,
  HUMAN_ANCHOR_VARIATION_POLICY,
  PHYSICAL_TWO_PERSON_PATTERN_IDS,
  clubDiagonalAxisFor,
  firstPersonCameraPoseForSample,
  fourCountOrientationFor,
  getFourCount3DCamera,
  humanAnchorVariation,
  sampleFourCount3D,
  sampleFourCountCollisionClearance,
  sampleFourCountPassGeometry,
  samplePhysicalTwoPerson3D,
  sampleSelectedPassing3D,
  selectFourCount3DPattern,
} from "../src/passing-four-count-3d.mjs";
import {
  FOUR_COUNT_3D_CAMERA_REFERENCE_ASPECT,
  FOUR_COUNT_3D_MAX_RESPONSIVE_FOV,
  PASSING_FOUR_COUNT_MESH_POLICY,
  PASSING_FOUR_COUNT_RENDER_POLICY,
  fittedVerticalFov,
  responsiveCameraDistanceScale,
} from "../src/passing-four-count-stage.mjs";

const magnitude = (value) => Math.hypot(value.x, value.y, value.z);
const separation = (left, right) => Math.hypot(
  left.x - right.x,
  left.y - right.y,
  left.z - right.z,
);
const dot = (left, right) => left.x * right.x + left.y * right.y + left.z * right.z;
const subtract = (left, right) => ({ x: left.x - right.x, y: left.y - right.y, z: left.z - right.z });
const normalize = (value) => {
  const size = magnitude(value);
  return { x: value.x / size, y: value.y / size, z: value.z / size };
};
const rightFor = (person) => ({ x: Math.cos(person.headingRadians), y: 0, z: Math.sin(person.headingRadians) });
const forwardFor = (person) => ({ x: Math.sin(person.headingRadians), y: 0, z: -Math.cos(person.headingRadians) });
const clubAt = (playhead, id) => sampleFourCount3D(playhead).clubs.find((club) => club.id === id);
const diagonalComponents = (axis, person) => ({
  lateral: dot(axis, person.right),
  upward: axis.y,
  forward: dot(axis, person.forward),
});
const angleFromHorizontal = (axis) => Math.atan2(axis.y, Math.hypot(axis.x, axis.z));
const horizontalCrossBodyYaw = (axis, person) => Math.atan2(
  Math.abs(dot(axis, person.right)),
  dot(axis, person.forward),
);
const quaternionMultiply = (left, right) => ({
  x: left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y,
  y: left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x,
  z: left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w,
  w: left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z,
});
const quaternionInverse = (value) => ({ x: -value.x, y: -value.y, z: -value.z, w: value.w });
const rotateByQuaternion = (quaternion, value) => {
  const rotated = quaternionMultiply(
    quaternionMultiply(quaternion, { ...value, w: 0 }),
    quaternionInverse(quaternion),
  );
  return { x: rotated.x, y: rotated.y, z: rotated.z };
};
const angularStep = (from, to) => {
  let relative = quaternionMultiply(quaternionInverse(from), to);
  if (relative.w < 0) relative = { x: -relative.x, y: -relative.y, z: -relative.z, w: -relative.w };
  const sine = Math.hypot(relative.x, relative.y, relative.z);
  const localAxis = sine > 1e-12
    ? { x: relative.x / sine, y: relative.y / sine, z: relative.z / sine }
    : { x: 1, y: 0, z: 0 };
  return {
    axis: normalize(rotateByQuaternion(from, localAxis)),
    radians: 2 * Math.atan2(sine, relative.w),
  };
};

test("the physical four-count schedule derives its 1× cadence from Earth gravity and hand dwell", async () => {
  const pattern = getPassingPattern(FOUR_COUNT_3D_PATTERN_ID);
  assert.equal(pattern.peopleCount, 2);
  assert.equal(pattern.clubCount, 6);
  assert.deepEqual(
    FOUR_COUNT_3D_SCHEDULE.map(({ kind, hand, catchHand }) => ({ kind, hand, catchHand })),
    [
      { kind: "pass", hand: "right", catchHand: "left" },
      { kind: "self", hand: "left", catchHand: "right" },
      { kind: "self", hand: "right", catchHand: "left" },
      { kind: "self", hand: "left", catchHand: "right" },
    ],
  );
  assert.equal(EARTH_GRAVITY_METRES_PER_SECOND_SQUARED, 9.80665);
  assert.equal(ADULT_JUGGLER_HEIGHT_METRES, 1.7526);
  assert.equal(FOUR_COUNT_3D_BALANCE_APEX_METRES, ADULT_JUGGLER_HEIGHT_METRES - FOUR_COUNT_3D_ANCHOR_VARIATION_HEIGHT_RESERVE_METRES);
  assert.ok(FOUR_COUNT_3D_BALANCE_APEX_METRES < ADULT_JUGGLER_HEIGHT_METRES, "the balance point stays below the adult head-height cap");
  const selfLaunchVelocity = Math.sqrt(
    2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
      * (FOUR_COUNT_3D_BALANCE_APEX_METRES - FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES),
  );
  const expectedSelfFlightSeconds = (
    selfLaunchVelocity
    + Math.sqrt(
      selfLaunchVelocity ** 2
        - 2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
          * (FOUR_COUNT_3D_SELF_CATCH_HEIGHT_METRES - FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES),
    )
  ) / EARTH_GRAVITY_METRES_PER_SECOND_SQUARED;
  assert.ok(Math.abs(FOUR_COUNT_3D_SELF_FLIGHT_SECONDS - expectedSelfFlightSeconds) < 1e-12, "self flight is derived from the elbow-height release, self catch, and capped vertical geometry");
  const expectedPassFlightSeconds = (
    Math.sqrt(
      2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
        * (FOUR_COUNT_3D_BALANCE_APEX_METRES - FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES),
    )
    + Math.sqrt(
      2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
        * (FOUR_COUNT_3D_BALANCE_APEX_METRES - FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES)
        - 2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
          * (FOUR_COUNT_3D_PASS_CATCH_BALANCE_HEIGHT_METRES - FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES),
    )
  ) / EARTH_GRAVITY_METRES_PER_SECOND_SQUARED;
  assert.ok(
    Math.abs(FOUR_COUNT_3D_PASS_FLIGHT_SECONDS - expectedPassFlightSeconds) < 1e-12,
    "pass duration is re-solved from the lower body-down release and shoulder-front vertical-up seam catch",
  );
  assert.ok(Math.abs(FOUR_COUNT_3D_CYCLE_SECONDS - (FOUR_COUNT_3D_SELF_FLIGHT_SECONDS + FOUR_COUNT_3D_SELF_DWELL_SECONDS)) < 1e-12);
  assert.ok(Math.abs(FOUR_COUNT_3D_BEAT_SECONDS - FOUR_COUNT_3D_CYCLE_SECONDS / 3) < 1e-12);
  assert.equal(FOUR_COUNT_3D_BEAT_SECONDS, 60 / FOUR_COUNT_3D_BASE_BPM);
  assert.ok(FOUR_COUNT_3D_BASE_BPM > 140 && FOUR_COUNT_3D_BASE_BPM < 150, "1× remains a resulting real-time cadence, not an arbitrary playback scale");
  assert.ok(Math.abs(FOUR_COUNT_3D_SELF_FLIGHT_BEATS * FOUR_COUNT_3D_BEAT_SECONDS - FOUR_COUNT_3D_SELF_FLIGHT_SECONDS) < 1e-12);
  assert.ok(Math.abs(FOUR_COUNT_3D_PASS_FLIGHT_BEATS * FOUR_COUNT_3D_BEAT_SECONDS - FOUR_COUNT_3D_PASS_FLIGHT_SECONDS) < 1e-12);
  assert.equal(
    Object.values(FOUR_COUNT_3D_HAND_PATH_FRACTIONS).reduce((sum, value) => sum + value, 0),
    1,
    "catch, return, ready, and forward-load retain an explicit human hand-path policy",
  );
  assert.equal(FOUR_COUNT_3D_FORWARD_LOAD_SECONDS, FOUR_COUNT_3D_SELF_DWELL_SECONDS * FOUR_COUNT_3D_HAND_PATH_FRACTIONS.forwardLoad);
  assert.ok(FOUR_COUNT_3D_FORWARD_LOAD_SECONDS >= 0.23 && FOUR_COUNT_3D_FORWARD_LOAD_SECONDS <= 0.25, "the forward-load stroke remains visible at 1×");
  assert.ok(Math.abs(FOUR_COUNT_3D_FORWARD_LOAD_BEATS * FOUR_COUNT_3D_BEAT_SECONDS - FOUR_COUNT_3D_FORWARD_LOAD_SECONDS) < 1e-12, "the schedule-to-release offset is physical time, not a hidden playback scale");
  assert.deepEqual(FOUR_COUNT_3D_PLAYBACK_SPEEDS, [0.25, 0.5, 1]);
  assert.deepEqual(
    FOUR_COUNT_3D_PLAYBACK_SPEEDS.map((speed) => Math.round(FOUR_COUNT_3D_BASE_BPM * speed * 1e6) / 1e6),
    [0.25, 0.5, 1].map((speed) => Math.round(FOUR_COUNT_3D_BASE_BPM * speed * 1e6) / 1e6),
  );

  const page = await fs.readFile(new URL("../../../studies/passing-lab/index.html", import.meta.url), "utf8");
  assert.match(page, /function activeTempoBpm\(\).*FOUR_COUNT_3D_BASE_BPM/s, "the physical host transport selects the derived 1× base");
  assert.match(page, /activeTempoBpm\(\) \* speed/, "speed options multiply the selected base rather than a hidden 108 BPM transport");
});

test("the active viewer reserves its volatile playback regions instead of reflowing the stage or catalogue", async () => {
  const page = await fs.readFile(new URL("../../../studies/passing-lab/index.html", import.meta.url), "utf8");
  assert.match(page, /\.transport-row\{display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(12rem,26rem\)/, "desktop transport has two stable grid tracks rather than a wrapping status row");
  assert.match(page, /\.timeline-position\{display:block;inline-size:100%;min-width:0;min-block-size:1\.45em;max-block-size:1\.45em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap/, "the beat status has a fixed one-line block");
  assert.match(page, /\.events\{display:flex;gap:6px;flex-wrap:wrap;align-content:start;min-block-size:5\.35rem;max-block-size:5\.35rem;overflow-y:auto/, "the dynamic event-chip region reserves its desktop height");
  assert.match(page, /@media\(max-width:560px\).*?\.transport-row\{grid-template-columns:1fr;gap:4px;min-height:3\.8rem\}.*?\.events\{min-block-size:7\.75rem;max-block-size:7\.75rem\}/s, "phone transport and event regions retain reserved geometry");
  assert.match(page, /const timelineStatus = cue\.name === 'Pass' \? `Pass · beat \$\{cue\.beat \+ 1\} \/ \$\{pattern\.loopBeats\}` : `\$\{cue\.name\} · count-in`;/, "the visible status remains compact while detailed cue text stays elsewhere");
});

test("the physical player conserves six unique tokens while exposing dynamic state transitions", () => {
  const observedSplits = new Set();
  for (let beat = -2; beat <= 18; beat += 0.125) {
    const sample = sampleFourCount3D(beat);
    assert.equal(sample.total, 6, `total at ${beat}`);
    assert.equal(sample.handConnected.length + sample.airborne.length, 6, `inventory at ${beat}`);
    assert.equal(new Set(sample.clubs.map((club) => club.id)).size, 6, `unique IDs at ${beat}`);
    sample.clubs.forEach((club) => {
      assert.ok(FOUR_COUNT_3D_MOTION_STATES.includes(club.motionState), `${club.id} has an explicit motion state`);
      assert.ok(Number.isFinite(club.spinRadians), `${club.id} reports accumulated spin`);
    });
    // The first forward-load is the declared three-club starting carry: the
    // queued club is still visibly held while the opening right-hand pass
    // swings forward. Every release/cascade state after that is one club per
    // nominal hand.
    if (beat >= 0) observedSplits.add(`${sample.airborne.length}/${sample.handConnected.length}`);
    if (beat >= FOUR_COUNT_3D_FORWARD_LOAD_BEATS) {
      const hands = sample.handConnected.map((club) => `${club.holder?.personId}:${club.holder?.hand}`);
      assert.equal(new Set(hands).size, hands.length, `no duplicate physical hand holder at ${beat}`);
    }
  }
  assert.ok(observedSplits.size >= 3, "the UI cannot truthfully imply one fixed held/airborne split");

  const opening = sampleFourCount3D(0);
  assert.equal(opening.airborne.length, 0, "Pass starts the visible hand stroke before any ballistic club leaves");
  assert.equal(opening.inventory.states["forward-load"], 2, "the two opening passes load together from Earth");
  assert.match(opening.cue.detail, /forward load/, "the count-in cue explains that Pass initiates the visible stroke");
  const openingRelease = sampleFourCount3D(FOUR_COUNT_3D_FORWARD_LOAD_BEATS);
  assert.equal(openingRelease.airborne.length, 2, "only the two opening passes release after their shared load");
  openingRelease.airborne.forEach((club) => {
    assert.equal(club.kind, "pass");
    assert.equal(club.hand, "right");
    assert.notEqual(club.sourcePersonId, club.targetPersonId);
    assert.equal(club.holder, null);
  });
});

test("Sky/Earth carries every physical count through one continuous seam-grip frame before Pass", () => {
  const policy = FOUR_COUNT_3D_COUNT_IN_ARM_POLICY;
  const epsilon = 1e-4;
  const sampleAt = (patternId, beat) => samplePhysicalTwoPerson3D(patternId, beat);
  const clubFor = (sample, id) => sample.clubs.find((club) => club.id === id);
  const personFor = (sample, id) => sample.people.find((person) => person.id === id);

  PHYSICAL_TWO_PERSON_PATTERN_IDS.forEach((patternId) => {
    // This instant is intentionally inside the Sky motion: both hands of a
    // performer must share a carrier phase, while Left gets its tiny natural
    // lead over Right. No token-level stagger is allowed to fight a bundle.
    const staggeredSky = sampleAt(patternId, -1.6);
    const leftSkyProgress = clubFor(staggeredSky, "left-club-1").countIn.swingProgress;
    const rightSkyProgress = clubFor(staggeredSky, "right-club-1").countIn.swingProgress;
    assert.ok(leftSkyProgress > rightSkyProgress, `${patternId} Sky stagger belongs to people, not individual clubs`);
    ["left", "right"].forEach((personId) => {
      const personClubs = staggeredSky.clubs.filter((club) => club.holderPersonId === personId);
      assert.equal(new Set(personClubs.map((club) => club.countIn.swingProgress)).size, 1, `${patternId} ${personId} uses one shared Sky swing`);
    });

    // Earth starts after both performers are fully raised, then stays exactly
    // synchronous. The values below deliberately exercise Sky, the raised
    // join, the descent, and the Earth/Pass seam.
    const earthMidpoint = sampleAt(patternId, -0.5);
    const earthProgresses = earthMidpoint.clubs.map((club) => club.countIn.swingProgress);
    assert.ok(earthProgresses.every((value) => Math.abs(value - earthProgresses[0]) < 1e-12), `${patternId} Earth descends in one shared count`);
    assert.ok(Math.abs(earthProgresses[0] - 0.5) < 1e-12, `${patternId} Earth midpoint is a symmetric eased half-swing`);

    [-1.8, -1.0, -0.5, -0.001].forEach((beat) => {
      const sample = sampleAt(patternId, beat);
      assert.equal(sample.collision.guardedClubCount, 6, `${patternId} guards all six clubs during ${beat < -1 ? "Sky" : "Earth"}`);
      assert.ok(
        sample.collision.minimumClearanceMetres >= FOUR_COUNT_3D_COLLISION_POLICY.requiredClearanceMetres,
        `${patternId} full club carry clears the conservative body envelopes at ${beat}`,
      );
      sample.clubs.forEach((club) => {
        const countIn = club.countIn;
        const person = personFor(sample, club.holderPersonId);
        const hand = countIn.carrierHand;
        const carrierGrip = countIn.carrierGripPosition;
        const reconstructedGrip = {
          x: carrierGrip.x + rotateByQuaternion(countIn.carrierQuaternion, countIn.localGripOffset).x,
          y: carrierGrip.y + rotateByQuaternion(countIn.carrierQuaternion, countIn.localGripOffset).y,
          z: carrierGrip.z + rotateByQuaternion(countIn.carrierQuaternion, countIn.localGripOffset).z,
        };
        assert.equal(club.motionState, "count-in", `${patternId} ${club.id} exposes the explicit count-in state`);
        assert.ok(separation(club.gripPosition, reconstructedGrip) < 1e-12, `${patternId} ${club.id} seam is rigid in its carrier frame`);
        assert.ok(separation(club.position, {
          x: club.gripPosition.x + club.direction.x * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
          y: club.gripPosition.y + club.direction.y * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
          z: club.gripPosition.z + club.direction.z * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
        }) < 1e-12, `${patternId} ${club.id} derives its pivot from the carried seam`);
        const expectedUpward = -Math.cos(Math.PI * countIn.swingProgress);
        const expectedForward = Math.sin(Math.PI * countIn.swingProgress);
        assert.ok(Math.abs(club.direction.y - expectedUpward) < 1e-12, `${patternId} ${club.id} rotates continuously down to up`);
        assert.ok(Math.abs(dot(club.direction, person.forward) - expectedForward) < 1e-12, `${patternId} ${club.id} travels through the actor-forward mid-frame, not a reverse flip`);
        assert.ok(Math.abs(dot(club.direction, person.right)) < 1e-12, `${patternId} ${club.id} keeps its whole count-in rotation in the actor's vertical/forward plane`);
        const palm = person.hands[hand];
        const motion = person.handMotion[hand];
        if (club.id === countIn.primaryClubId) {
          assert.equal(motion.clubId, club.id, `${patternId} ${club.id} owns its count-in palm`);
          assert.ok(separation(palm, club.gripPosition) < 1e-12, `${patternId} ${club.id} has literal seam/knob hand contact`);
        } else {
          assert.equal(countIn.bundleContact, "secondary-seam-in-bundle", `${patternId} ${club.id} is explicit about its second carried seam`);
          assert.ok(
            separation(palm, club.gripPosition) <= policy.maximumSecondaryBundleGripOffsetMetres + 1e-12,
            `${patternId} ${club.id} stays in a controlled two-club carry bundle`,
          );
        }
      });
    });

    // The raised count-in is the sole elbow exception. At Earth/Pass it joins
    // the ordinary strict side-elbow rig, with no count-in pose leaking into
    // the normal juggling loop.
    const raised = sampleAt(patternId, -1.0);
    const ready = sampleAt(patternId, 0);
    raised.people.forEach((person) => {
      ["left", "right"].forEach((hand) => {
        assert.equal(person.arms[hand].countIn, true, `${patternId} ${person.id} ${hand} visibly joins Sky/Earth with the whole arm`);
        assert.ok(person.arms[hand].elbow.y > ready.people.find((candidate) => candidate.id === person.id).arms[hand].elbow.y + 0.25, `${patternId} ${person.id} ${hand} elbow is allowed to rise only during Sky/Earth`);
      });
    });
    ready.people.forEach((person) => {
      ["left", "right"].forEach((hand) => assert.equal(person.arms[hand].countIn, false, `${patternId} ${person.id} ${hand} returns to the normal tucked-elbow rig at Pass`));
    });

    // C0 plus bounded finite-difference velocity/orientation at both spoken
    // cues catches the former ~0.5 m threshold flip as well as a future hand
    // teleport. The queued second seam may resume its tiny deterministic
    // ready variation after Pass, so this is a visible first-derivative bound
    // rather than a mathematically false "identical derivative" claim.
    [-1, 0].forEach((boundary) => {
      const before = sampleAt(patternId, boundary - epsilon);
      const at = sampleAt(patternId, boundary);
      const after = sampleAt(patternId, boundary + epsilon);
      at.clubs.forEach((club) => {
        const prior = clubFor(before, club.id);
        const next = clubFor(after, club.id);
        assert.ok(separation(prior.gripPosition, next.gripPosition) < 0.0002, `${patternId} ${club.id} has no seam jump at ${boundary === -1 ? "Sky→Earth" : "Earth→Pass"}`);
        assert.ok(angularStep(prior.quaternion, next.quaternion).radians < 0.002, `${patternId} ${club.id} has no reverse orientation flip at ${boundary === -1 ? "Sky→Earth" : "Earth→Pass"}`);
        const beforeVelocity = separation(at.clubs.find((candidate) => candidate.id === club.id).gripPosition, prior.gripPosition) / epsilon;
        const afterVelocity = separation(next.gripPosition, at.clubs.find((candidate) => candidate.id === club.id).gripPosition) / epsilon;
        assert.ok(Math.abs(beforeVelocity - afterVelocity) < 0.06, `${patternId} ${club.id} has fluent finite-difference seam velocity at ${boundary === -1 ? "Sky→Earth" : "Earth→Pass"}`);
      });
    });

    const afterOpeningRelease = sampleAt(patternId, FOUR_COUNT_3D_FORWARD_LOAD_BEATS + epsilon);
    const holderKeys = afterOpeningRelease.handConnected.map((club) => `${club.holder.personId}:${club.holder.hand}`);
    assert.equal(new Set(holderKeys).size, holderKeys.length, `${patternId} returns to one physical club per hand immediately after the opening 0.24 s load`);
  });
});

test("passes and selfs share the front hand stroke while retaining their distinct release poses", () => {
  const openingReady = clubAt(-0.001, "left-club-1");
  const openingStart = clubAt(0, "left-club-1");
  const openingLoadSample = sampleFourCount3D(FOUR_COUNT_3D_FORWARD_LOAD_BEATS * 0.5);
  const openingLoad = openingLoadSample.clubs.find((club) => club.id === "left-club-1");
  const openingRelease = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS, "left-club-1");
  const openingFlight = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + 0.001, "left-club-1");
  const left = openingLoadSample.people.find((person) => person.id === "left");

  assert.equal(openingReady.motionState, "count-in", "Earth completes at the down-side rest pose before the opening stroke");
  assert.equal(openingStart.motionState, "forward-load", "Pass begins the visible load rather than releasing at the side");
  assert.equal(openingLoad.motionState, "forward-load");
  assert.equal(openingLoad.state, "held");
  assert.equal(openingRelease.motionState, "release");
  assert.equal(openingRelease.state, "airborne");
  assert.equal(openingFlight.motionState, "flight");
  assert.ok(separation(openingReady.position, openingStart.position) < 0.001, "Earth's ready pose joins the Pass stroke continuously");
  assert.ok(dot(subtract(openingLoad.gripPosition, openingReady.gripPosition), left.forward) > 0.045, "opening hand/knob load moves visibly forward in the actor's real local basis");
  assert.ok(dot(subtract(openingRelease.gripPosition, openingReady.gripPosition), left.forward) > 0.11, "the full pre-release knob path is clearly in front of the torso");
  assert.ok(openingLoad.gripPosition.y - openingReady.gripPosition.y > 0.045, "opening hand carries the club visibly upward from the side-ready rest");
  assert.ok(openingRelease.gripPosition.y > 0.98 && openingRelease.gripPosition.y < 1.15, "the body-down pass seam grip is around adult hip/low-elbow height, not an unexplained shoulder launch");
  assert.ok(dot(openingRelease.direction, { x: 0, y: -1, z: 0 }) > 0.999999999, "a pass reaches release body-down so its 3pi path-plane turn can land body-up");
  assert.ok(openingRelease.capPosition.y < openingRelease.gripPosition.y - 0.35, "the down-pointing pass body extends below the seam-gripped hand at release");
  assert.ok(dot(subtract(openingRelease.gripPosition, left.position), left.forward) >= 0.42, "release grip stays in the local-front corridor");
  assert.ok(separation(openingRelease.gripPosition, openingRelease.knobPosition) < 1e-12, "the handle/knob seam is the declared zero-gap grip point");
  assert.ok(separation(openingRelease.knobTipPosition, openingRelease.knobPosition) > 0.02, "the collision tip remains distinct from the handle-wrapping seam");
  assert.ok(separation(openingRelease.position, openingFlight.position) < 0.01, "load joins ballistic flight without a position jump");
  assert.ok(
    separation(left.hands.right, openingLoad.gripPosition) < 1e-12,
    "the articulated throwing palm remains attached to the loaded knob/handle seam",
  );

  // The same token reaches a later self throw after its opening pass. Verify
  // that ordinary siteswap-3 work inherits the same readable preparation.
  const selfLoadSample = sampleFourCount3D(3 + FOUR_COUNT_3D_FORWARD_LOAD_BEATS * 0.5);
  const selfLoad = selfLoadSample.clubs.find((club) => club.id === "left-club-1");
  const selfPerson = selfLoadSample.people.find((person) => person.id === selfLoad.holder.personId);
  assert.equal(selfLoad.kind, "self");
  assert.equal(selfLoad.motionState, "forward-load");
  assert.ok(dot(subtract(selfLoad.gripPosition, selfPerson.position), selfPerson.forward) >= FOUR_COUNT_3D_STAGE.readyForwardMetres, "self preparation remains in the local-front corridor");
  assert.ok(
    separation(selfPerson.hands[selfLoad.holder.hand], selfLoad.gripPosition) < 1e-12,
    "the self-load club and its visible palm stay at the handle/knob seam",
  );
});

test("the pass keeps its signed 540-degree path-plane rotation from body-down release through the upright seam catch", () => {
  const geometry = sampleFourCountPassGeometry();
  const opening = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS, "left-club-1");
  const quarter = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS * 0.25, "left-club-1");
  const middle = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS * 0.5, "left-club-1");
  const threeQuarter = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS * 0.75, "left-club-1");
  const beforeCatch = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS - 1e-5, "left-club-1");
  const caught = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS, "left-club-1");
  const afterCatch = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS + 1e-5, "left-club-1");
  const beforeNextThrow = clubAt(3 - 1e-5, "left-club-1");
  const nextLoad = clubAt(3, "left-club-1");
  const nextThrow = clubAt(3 + FOUR_COUNT_3D_FORWARD_LOAD_BEATS, "left-club-1");

  assert.equal(opening.motionState, "release");
  assert.match(geometry.spinSemantics, /body-down.*path-aligned vertical plane.*body-up/i, "the flight explicitly declares the real path-plane body-down-to-up contract");
  assert.equal(opening.spinRadians, 0);
  assert.ok(Math.abs(middle.spinRadians - FOUR_COUNT_3D_PASS_SPIN_RADIANS * 0.5) < 1e-12);
  assert.ok(Math.abs(caught.spinRadians - FOUR_COUNT_3D_PASS_SPIN_RADIANS) < 1e-12, "unwrapped accumulated pass spin retains the requested 540-degree count");
  assert.ok(Math.abs(caught.spinTurns - FOUR_COUNT_3D_PASS_TURNS) < 1e-12);
  assert.ok(separation(beforeCatch.position, afterCatch.position) < 0.001, "pass has no catch position jump");
  assert.equal(nextLoad.motionState, "forward-load", "the next semantic beat starts its own front-loading stroke");
  assert.equal(nextThrow.motionState, "release", "the next flight waits for that stroke to complete");
  assert.ok(separation(beforeNextThrow.position, nextLoad.position) < 0.001, "catch return reaches the next ready/load start continuously");
  assert.ok(Math.abs(Math.hypot(caught.quaternion.x, caught.quaternion.y, caught.quaternion.z, caught.quaternion.w) - 1) < 1e-12, "catch quaternion stays normalized");

  const sampledPeople = sampleFourCount3D(FOUR_COUNT_3D_FORWARD_LOAD_BEATS).people;
  const source = sampledPeople.find((person) => person.id === geometry.sourcePersonId);
  const target = sampledPeople.find((person) => person.id === geometry.targetPersonId);
  const sourceReach = separation(geometry.releaseGripPosition, geometry.sourceShoulder);
  // The anatomical clavicle anchor is behind the old, visibly misplaced
  // +0.130 m forward shoulder. That makes the same hip-height release a
  // slightly longer but still bent-forearm reach rather than hiding it behind
  // an impossible forward shoulder joint.
  assert.ok(sourceReach > 0.50 && sourceReach < 0.82, "body-down hip/low-elbow release remains a believable front arm reach from the anatomical shoulder");
  assert.ok(Math.abs(geometry.release.y - FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-9, "pass uses its documented lower body-down balance release");
  assert.ok(geometry.releaseGripPosition.y > 0.96 && geometry.releaseGripPosition.y < 1.08, "the hand/knob seam releases around belly-button height in the down pose");
  assert.ok(geometry.releaseGripPosition.y < geometry.sourceShoulder.y - 0.32, "release is visibly below the shoulder rather than an old high side pose");
  const catchDelta = subtract(geometry.catchGripPosition, geometry.targetShoulder);
  assert.ok(Math.abs(dot(catchDelta, forwardFor(target)) - FOUR_COUNT_3D_STAGE.passCatchForwardMetres) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-9, "catch stays roughly one foot forward of the target shoulder");
  assert.ok(
    Math.abs(Math.abs(dot(catchDelta, target.right)) - (FOUR_COUNT_3D_STAGE.passCatchSideMetres - FOUR_COUNT_3D_STAGE.shoulderSideMetres)) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-9,
    "catch grip sits in the authored lane just outside the receiving shoulder anchor",
  );
  assert.ok(Math.abs(catchDelta.y) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-9, "catch grip stays at shoulder height apart from bounded variation");

  assert.ok(dot(opening.direction, { x: 0, y: -1, z: 0 }) > 0.999999999, "a pass releases body-down in the real partner path plane");
  assert.ok(dot(geometry.catchReferenceDirection, { x: 0, y: 1, z: 0 }) > 0.999999999, "receiver seam cue is vertically body-up");
  assert.ok(dot(caught.direction, geometry.catchDirection) > 0.999999999, "the airborne club reaches its fixed-world-frame terminal direction exactly, without blending to the receiver frame in flight");
  assert.ok(dot(caught.direction, geometry.catchReferenceDirection) > 0.999999999, "the true 3pi flight itself reaches the vertical catch cue without a hidden frame swap");
  [opening, quarter, middle, threeQuarter, beforeCatch, caught, afterCatch].forEach((club) => {
    assert.ok(Math.abs(Math.hypot(club.quaternion.x, club.quaternion.y, club.quaternion.z, club.quaternion.w) - 1) < 1e-12, "every end-over-end sampled quaternion stays normalized");
  });
  assert.ok(dot(opening.direction, quarter.direction) < -0.65, "the long axis visibly turns over in the first quarter of flight rather than only rolling around itself");
  assert.ok(dot(middle.direction, threeQuarter.direction) < -0.65, "the second half continues the same end-over-end turn rather than reversing toward the catch");
  assert.ok(dot(opening.direction, caught.direction) < -0.999999, "the full 540-degree ballistic count flips the long axis through the seam catch");
  assert.ok(Math.abs(dot(opening.direction, geometry.throwAxisWorld)) < 1e-12, "release axis lies in the path-aligned vertical plane");
  assert.ok(separation(caught.gripPosition, caught.knobPosition) < 1e-12, "the receiving palm is coupled to the same handle/knob seam as the catch cue");
  assert.ok(caught.holder && caught.holder.personId === geometry.targetPersonId, "the receiver owns the club at the seam catch before any return reorientation");
  const returnPose = clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + FOUR_COUNT_3D_PASS_FLIGHT_BEATS + 0.15, "left-club-1");
  assert.equal(returnPose.state, "held", "receiver reorientation occurs only after the catch is hand-connected");
  assert.ok(["catch", "return"].includes(returnPose.motionState), "the post-catch club is in an explicit held recovery state");

  const { physics } = geometry;
  assert.equal(physics.gravityMetresPerSecondSquared, EARTH_GRAVITY_METRES_PER_SECOND_SQUARED);
  assert.equal(physics.flightSeconds, FOUR_COUNT_3D_PASS_FLIGHT_SECONDS);
  const atTime = (seconds) => clubAt(FOUR_COUNT_3D_FORWARD_LOAD_BEATS + seconds / FOUR_COUNT_3D_BEAT_SECONDS, "left-club-1").position;
  [0, physics.flightSeconds * 0.37, physics.flightSeconds * 0.79, physics.flightSeconds].forEach((seconds) => {
    const position = atTime(seconds);
    const expected = {
      x: geometry.release.x + physics.launchVelocity.x * seconds,
      y: geometry.release.y + physics.launchVelocity.y * seconds - 0.5 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED * seconds ** 2,
      z: geometry.release.z + physics.launchVelocity.z * seconds,
    };
    assert.ok(separation(position, expected) < 1e-9, `pass endpoint solve remains ballistic at ${seconds}s`);
  });
  assert.ok(physics.apexTimeSeconds > 0 && physics.apexTimeSeconds < physics.flightSeconds);
  assert.ok(physics.apexHeightMetres <= ADULT_JUGGLER_HEIGHT_METRES + 1e-12, "a varied pass balance point remains below the head-height cap");
});

test("finite-difference pass samples stay in one partner-path plane with a constant signed rate", () => {
  const geometry = sampleFourCountPassGeometry();
  const releaseBeat = FOUR_COUNT_3D_FORWARD_LOAD_BEATS;
  const catchBeat = releaseBeat + FOUR_COUNT_3D_PASS_FLIGHT_BEATS;
  const stepSeconds = 1 / 240;
  const stepBeats = stepSeconds / FOUR_COUNT_3D_BEAT_SECONDS;
  const normal = geometry.throwAxisWorld;
  const expectedRate = FOUR_COUNT_3D_PASS_SPIN_RADIANS / FOUR_COUNT_3D_PASS_FLIGHT_SECONDS;
  let previousAxis = null;

  for (let beat = releaseBeat; beat < catchBeat - 1e-10; beat += stepBeats) {
    const nextBeat = Math.min(catchBeat, beat + stepBeats);
    const from = clubAt(beat, "left-club-1");
    const to = clubAt(nextBeat, "left-club-1");
    const deltaSeconds = (nextBeat - beat) * FOUR_COUNT_3D_BEAT_SECONDS;
    const turn = angularStep(from.quaternion, to.quaternion);
    assert.ok(Math.abs(dot(subtract(from.position, geometry.release), normal)) < 1e-9, `pass pivot remains in its real vertical plane at ${beat}`);
    assert.ok(Math.abs(dot(from.direction, normal)) < 1e-9, `pass long axis remains in that plane at ${beat}`);
    assert.ok(dot(turn.axis, normal) > 0.999999, `pass rotation keeps the signed path-plane normal at ${beat}`);
    if (previousAxis) assert.ok(dot(turn.axis, previousAxis) > 0.999999, `pass rotation never reverses at ${beat}`);
    previousAxis = turn.axis;
    assert.ok(Math.abs(turn.radians / deltaSeconds - expectedRate) < 1e-6, `pass angular rate stays constant at ${beat}`);
  }

  const caught = clubAt(catchBeat, "left-club-1");
  const justAfterCatch = clubAt(catchBeat + stepBeats, "left-club-1");
  assert.ok(dot(caught.direction, { x: 0, y: 1, z: 0 }) > 0.999999999, "the full flight reaches upright, not a receiver-frame approximation");
  assert.equal(justAfterCatch.state, "held", "only a hand-connected state begins lowering after the upright catch");
});

test("ordinary selfs retain their existing signed diagonal world rotation across load, release, flight, and catch", () => {
  const stepSeconds = 1 / 240;
  const stepBeats = stepSeconds / FOUR_COUNT_3D_BEAT_SECONDS;
  const throws = [
    { clubId: "left-club-2", launchBeat: 1, kind: "left self", flightBeats: FOUR_COUNT_3D_SELF_FLIGHT_BEATS, spin: Math.PI * 2 },
    { clubId: "right-club-2", launchBeat: 1, kind: "right self", flightBeats: FOUR_COUNT_3D_SELF_FLIGHT_BEATS, spin: Math.PI * 2 },
  ];
  throws.forEach(({ clubId, launchBeat, kind, flightBeats, spin }) => {
    const releaseBeat = launchBeat + FOUR_COUNT_3D_FORWARD_LOAD_BEATS;
    const catchBeat = releaseBeat + flightBeats;
    const loadStart = clubAt(launchBeat, clubId);
    const atRelease = clubAt(releaseBeat, clubId);
    const atCatch = clubAt(catchBeat, clubId);
    const expectedAxis = atRelease.primaryThrowAxisWorld;
    assert.equal(loadStart.motionState, "forward-load", `${kind} begins with a hand-connected load`);
    assert.equal(atRelease.motionState, "release", `${kind} reaches an explicit release boundary`);
    assert.equal(atCatch.motionState, "catch", `${kind} reaches an explicit hand-connected catch`);
    assert.ok(expectedAxis, `${kind} exposes its authored world throw axis`);
    assert.ok(Math.abs(atRelease.unwrappedThrowPhaseRadians - (atRelease.orientationRadians || 0)) < 1e-12, `${kind} exposes an unwrapped release phase`);
    assert.ok(
      Math.abs(atCatch.unwrappedThrowPhaseRadians - (atRelease.unwrappedThrowPhaseRadians + spin)) < 1e-9,
      `${kind} retains the selected unwrapped flight count through catch`,
    );

    const actualRates = [];
    let priorAxis = null;
    // 1/240 s finite differences cover the late hand load, the exact release,
    // all airborne frames, and the final in-flight step into the seam catch.
    for (let beat = launchBeat + stepBeats; beat < catchBeat - 1e-12; beat += stepBeats) {
      const nextBeat = Math.min(beat + stepBeats, catchBeat);
      const from = clubAt(beat, clubId);
      const to = clubAt(nextBeat, clubId);
      const deltaSeconds = (nextBeat - beat) * FOUR_COUNT_3D_BEAT_SECONDS;
      const step = angularStep(from.quaternion, to.quaternion);
      const rate = step.radians / deltaSeconds;
      const middle = clubAt((beat + nextBeat) * 0.5, clubId);
      actualRates.push(rate);
      assert.ok(step.radians > 1e-9, `${kind} stays in positive rotation at ${beat}`);
      assert.ok(dot(step.axis, expectedAxis) > 0.995, `${kind} never reverses or changes its signed world axis at ${beat}`);
      if (priorAxis) assert.ok(dot(step.axis, priorAxis) > 0.999999, `${kind} has no per-frame angular-axis reversal at ${beat}`);
      priorAxis = step.axis;
      assert.ok(
        Math.abs(rate - middle.angularVelocityRadiansPerSecond) < 0.04,
        `${kind} exported angular velocity matches the actual 1/240 s quaternion motion at ${beat}`,
      );
    }
    const fastestAuthoredRate = FOUR_COUNT_3D_PASS_SPIN_RADIANS
      / (FOUR_COUNT_3D_PASS_FLIGHT_BEATS * FOUR_COUNT_3D_BEAT_SECONDS);
    assert.ok(Math.max(...actualRates) <= fastestAuthoredRate * 1.005, `${kind} has no hidden angular-speed spike beyond the explicitly authored pass cadence`);
    const preRelease = angularStep(
      clubAt(releaseBeat - stepBeats, clubId).quaternion,
      atRelease.quaternion,
    ).radians / stepSeconds;
    const postRelease = angularStep(
      atRelease.quaternion,
      clubAt(releaseBeat + stepBeats, clubId).quaternion,
    ).radians / stepSeconds;
    assert.ok(dot(angularStep(clubAt(releaseBeat - stepBeats, clubId).quaternion, atRelease.quaternion).axis, expectedAxis) > 0.995, `${kind} preserves the signed axis into release`);
    assert.ok(dot(angularStep(atRelease.quaternion, clubAt(releaseBeat + stepBeats, clubId).quaternion).axis, expectedAxis) > 0.995, `${kind} preserves the signed axis out of release`);
    assert.ok(Math.max(preRelease, postRelease) / Math.min(preRelease, postRelease) < 1.05, `${kind} has no release speed jump`);
    const afterCatch = clubAt(catchBeat + stepBeats, clubId);
    assert.equal(afterCatch.state, "held", `${kind} only reorients after the seam catch is hand-connected`);
  });
});

test("ordinary self throws keep a gravity-compatible capped balance-point arc under deterministic endpoint variation", () => {
  const launchBeat = 1;
  const clubId = "left-club-2";
  const releaseBeat = launchBeat + FOUR_COUNT_3D_FORWARD_LOAD_BEATS;
  const start = clubAt(releaseBeat, clubId).position;
  const middle = clubAt(releaseBeat + FOUR_COUNT_3D_SELF_FLIGHT_BEATS * 0.5, clubId).position;
  const caught = clubAt(releaseBeat + FOUR_COUNT_3D_SELF_FLIGHT_BEATS, clubId).position;
  const rise = EARTH_GRAVITY_METRES_PER_SECOND_SQUARED * FOUR_COUNT_3D_SELF_FLIGHT_SECONDS ** 2 / 8;
  assert.ok(rise > 0, "the elbow-height self throw has positive gravitational rise");
  assert.ok(Math.abs(middle.y - ((start.y + caught.y) * 0.5 + rise)) < 1e-9, "linear endpoint variation retains the -g self arc");
  assert.ok(middle.y <= ADULT_JUGGLER_HEIGHT_METRES + 1e-12);

  for (const sourcePersonId of ["left", "right"]) {
    for (let launch = 0; launch <= 28; launch += 4) {
      for (const suffix of [1, 2, 3]) {
        const geometry = sampleFourCountPassGeometry({ sourcePersonId, launchBeat: launch, clubId: `${sourcePersonId}-club-${suffix}` });
        assert.ok(
          geometry.physics.apexHeightMetres <= ADULT_JUGGLER_HEIGHT_METRES + 1e-12,
          `${sourcePersonId} pass ${launch}/${suffix} retains the varied head-height cap`,
        );
      }
    }
  }
});

test("the two actual body bases face each other and the pass remains in their forward local spaces", () => {
  const people = sampleFourCount3D(0).people;
  people.forEach((person) => {
    const partner = people.find((candidate) => candidate.id === person.partnerId);
    const toPartner = normalize(subtract(partner.position, person.position));
    assert.ok(dot(person.forward, toPartner) > 0.999, `${person.id} forward points toward the partner`);
    const orientation = fourCountOrientationFor(person.id);
    assert.equal(person.visualYawRadians, orientation.visualYawRadians, `${person.id} exposes its renderer yaw from the true basis`);
  });
  assert.ok(dot(people[0].forward, people[1].forward) < -0.999, "the forward vectors are reciprocal");

  const geometry = sampleFourCountPassGeometry();
  const source = people.find((person) => person.id === geometry.sourcePersonId);
  const target = people.find((person) => person.id === geometry.targetPersonId);
  assert.ok(dot(geometry.horizontal, source.forward) > 0.98, "the pass starts forward of the passer's body");
  assert.ok(dot(geometry.horizontal, target.forward) < -0.98, "the pass arrives from in front of the receiver's body");
  const releaseFromBody = Math.abs(dot(subtract(geometry.releaseGripPosition, source.position), source.right));
  const catchFromBody = Math.abs(dot(subtract(geometry.catchGripPosition, target.position), target.right));
  assert.ok(releaseFromBody < FOUR_COUNT_3D_STAGE.shoulderSideMetres, "release travels inward of the passer's shoulder toward the body midline");
  assert.ok(Math.abs(releaseFromBody - FOUR_COUNT_3D_STAGE.passThrowReleaseSideMetres) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-9, "release remains in the authored near-midline lane");
  assert.ok(catchFromBody > releaseFromBody + 0.10, "the receiver catches clearly outside the passer's release lane");
});

test("the declared diagonal club axis is actor-local, cross-body mirrored, and independent of camera labels", () => {
  const people = sampleFourCount3D(0).people;
  people.forEach((person) => {
    const right = clubDiagonalAxisFor(person.id, "right");
    const left = clubDiagonalAxisFor(person.id, "left");
    const rightComponents = diagonalComponents(right, person);
    const leftComponents = diagonalComponents(left, person);
    assert.ok(rightComponents.lateral < -0.49, `${person.id} right hand points cross-body left`);
    assert.ok(leftComponents.lateral > 0.49, `${person.id} left hand points cross-body right`);
    assert.ok(Math.abs(rightComponents.forward - leftComponents.forward) < 1e-12 && rightComponents.forward > 0.49, `${person.id} diagonal remains forward for both hands`);
    assert.ok(Math.abs(rightComponents.upward - leftComponents.upward) < 1e-12 && rightComponents.upward > 0.70, `${person.id} diagonal remains positive-up for both hands`);
    assert.ok(Math.abs(angleFromHorizontal(right) - FOUR_COUNT_3D_CLUB_HANDLING_POLICY.elevationRadians) < 1e-12, `${person.id} right elevation is policy-defined`);
    assert.ok(Math.abs(horizontalCrossBodyYaw(left, person) - FOUR_COUNT_3D_CLUB_HANDLING_POLICY.crossBodyYawRadians) < 1e-12, `${person.id} left yaw is policy-defined`);
    assert.ok(Math.abs(rightComponents.lateral + leftComponents.lateral) < 1e-12, `${person.id} hands mirror laterally`);
  });
});

test("hands and all sampled physical club segments stay in the local forward lane outside conservative body envelopes", () => {
  let closest = Infinity;
  // 260 beats covers the 11/13/17-beat deterministic variation supercycle
  // rather than testing only a visually convenient short phrase.
  for (let beat = -2; beat <= 260; beat += 1 / 32) {
    const sample = sampleFourCount3D(beat);
    sample.people.forEach((person) => {
      ["left", "right"].forEach((hand) => {
        const forwardDistance = dot(subtract(person.hands[hand], person.position), person.forward);
        assert.ok(
          forwardDistance > 0.25,
          `${person.id} ${hand} hand stays in front of the torso at ${beat}`,
        );
      });
    });
    sample.clubs.forEach((club) => {
      const expectedGrip = {
        x: club.position.x - club.direction.x * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
        y: club.position.y - club.direction.y * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
        z: club.position.z - club.direction.z * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres,
      };
      const expectedKnobTip = {
        x: club.position.x - club.direction.x * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.knobTipFromBalanceMetres,
        y: club.position.y - club.direction.y * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.knobTipFromBalanceMetres,
        z: club.position.z - club.direction.z * FOUR_COUNT_3D_CLUB_HANDLING_POLICY.knobTipFromBalanceMetres,
      };
      assert.ok(separation(club.gripPosition, expectedGrip) < 1e-12, `${club.id} exposes its physical knob/handle seam from the mesh balance pivot`);
      assert.ok(separation(club.knobPosition, club.gripPosition) < 1e-12, `${club.id} has no synthetic hand-to-knob gap`);
      assert.ok(separation(club.knobTipPosition, expectedKnobTip) < 1e-12, `${club.id} retains the full knob tip for collision testing`);
    });
    if (beat >= FOUR_COUNT_3D_FORWARD_LOAD_BEATS) {
      sample.handConnected.forEach((club) => {
        const person = sample.people.find((candidate) => candidate.id === club.holder.personId);
        const hand = club.holder.hand;
        assert.equal(person.handMotion[hand].clubId, club.id, `${club.id} owns the visible ${club.holder.personId} ${hand} palm at ${beat}`);
        assert.ok(separation(person.hands[hand], club.gripPosition) < 1e-12, `${club.id} remains hand/knob-contacted while ${club.motionState}`);
      });
    }
    const collision = sampleFourCountCollisionClearance(beat);
    closest = Math.min(closest, collision.minimumClearanceMetres);
    if (beat >= 0) {
      assert.ok(
        collision.minimumClearanceMetres >= FOUR_COUNT_3D_COLLISION_POLICY.requiredClearanceMetres,
        `${collision.closest?.clubId || "club"} clears ${collision.closest?.personId || "body"} ${collision.closest?.bodyPart || "envelope"} at ${beat}`,
      );
      assert.match(collision.method, /full-club segment/);
      assert.equal(collision.guardedClubCount, 6, "ready, load, release, flight, catch, and return all use the same no-body-intersection guard");
    }
  }
  assert.ok(closest >= FOUR_COUNT_3D_COLLISION_POLICY.requiredClearanceMetres);
});

test("the sampled rig keeps elbows literally at the waist-side while forearms make the forward/load and catch work", () => {
  const observedHandModes = new Set();
  const policy = FOUR_COUNT_3D_ARM_RIG_POLICY;
  // Cover the same deterministic human-variation supercycle as the club
  // clearance test. The policy is a visual rig envelope, not an anatomical
  // measurement, but it makes an accidental chicken-wing or straight arm a
  // concrete regression rather than a camera-specific judgment call.
  for (let beat = 0; beat <= 260; beat += 1 / 32) {
    const sample = sampleFourCount3D(beat);
    sample.people.forEach((person) => {
      ["left", "right"].forEach((hand) => {
        const arm = person.arms[hand];
        observedHandModes.add(person.handMotion[hand].mode);
        assert.ok(arm.local.frontMetres >= policy.minElbowFrontMetres - 1e-12, `${person.id} ${hand} elbow stays just clear of its torso side at ${beat}`);
        assert.ok(arm.local.frontMetres <= policy.maxElbowFrontMetres + 1e-12, `${person.id} ${hand} elbow never moves out in front of its torso at ${beat}`);
        assert.ok(
          arm.local.frontMetres + policy.elbowJointRadiusMetres <= policy.maximumVisibleElbowFrontMetres + 1e-12,
          `${person.id} ${hand} rendered elbow surface never protrudes forward of the body-side plane at ${beat}`,
        );
        assert.ok(arm.local.outwardMetres >= policy.minElbowOutwardMetres - 1e-12, `${person.id} ${hand} elbow remains alongside the torso at ${beat}`);
        assert.ok(arm.local.outwardMetres <= policy.maxElbowOutwardMetres + 1e-12, `${person.id} ${hand} elbow never becomes a lateral chicken wing at ${beat}`);
        assert.ok(arm.local.heightMetres >= policy.minElbowHeightMetres - 1e-12, `${person.id} ${hand} elbow remains at waist height at ${beat}`);
        assert.ok(arm.local.heightMetres <= policy.maxElbowHeightMetres + 1e-12, `${person.id} ${hand} elbow only breathes slightly around its waist-side rest at ${beat}`);
        assert.ok(arm.excursionMetres <= policy.maximumElbowExcursionFromRestMetres + 1e-12, `${person.id} ${hand} elbow excursion stays quiet at ${beat}`);
        assert.ok(arm.upperArmMetres <= policy.maximumUpperArmVisualMetres + 1e-12, `${person.id} ${hand} upper arm remains compact and mostly vertical at ${beat}`);
        assert.ok(arm.forearmMetres <= policy.maximumForearmVisualMetres + 1e-12, `${person.id} ${hand} forearm has room to make the juggling stroke at ${beat}`);
        assert.ok(arm.elbowExtensionRadians <= policy.maximumElbowExtensionRadians + 1e-12, `${person.id} ${hand} never renders as a straight arm at ${beat}`);
        const shoulderToElbow = subtract(arm.elbow, person.shoulders[hand]);
        assert.ok(dot(shoulderToElbow, person.forward) <= 1e-12, `${person.id} ${hand} elbow centre never advances in front of its shoulder side-plane at ${beat}`);
        assert.ok(shoulderToElbow.y < -0.39, `${person.id} ${hand} upper arm descends from the shoulder instead of reaching forward at ${beat}`);
      });
    });
  }
  ["ready", "forward-load", "throw-follow", "catch-reach", "catch", "return"].forEach((mode) => {
    assert.ok(observedHandModes.has(mode), `tuck guard covers ${mode} hand motion`);
  });
});

test("the rendered shoulder and upper-arm surfaces stay at the clavicle/acromion line rather than in front of the neck", () => {
  const policy = FOUR_COUNT_3D_SHOULDER_RIG_POLICY;
  // This repeats the complete deterministic variation supercycle. Shoulder
  // positions are permitted to follow the quiet torso offset, but there is no
  // hand/club-driven shoulder motion: all three local coordinates must remain
  // the same clavicle/acromion anchor through ready, load, flight, and catch.
  for (let beat = 0; beat <= 260; beat += 1 / 32) {
    const sample = sampleFourCount3D(beat);
    sample.people.forEach((person) => {
      ["left", "right"].forEach((hand) => {
        const shoulder = person.shoulders[hand];
        const offset = subtract(shoulder, person.position);
        const centreFront = dot(offset, person.forward);
        const centreSide = Math.abs(dot(offset, person.right));
        const centreHeight = offset.y;
        const shoulderSurfaceFront = centreFront + policy.shoulderJointRadiusMetres;
        const upperArmSurfaceFront = Math.max(
          centreFront + policy.upperArmShoulderRadiusMetres,
          person.arms[hand].local.frontMetres + policy.upperArmElbowRadiusMetres,
        );
        const innerShoulderSide = centreSide - policy.shoulderJointRadiusMetres;
        const lateralAcromionOverlap = policy.upperTorsoOuterHalfWidthMetres - innerShoulderSide;
        const verticalAcromionOverlap = policy.upperTorsoTopHeightMetres
          - (centreHeight - policy.shoulderJointRadiusMetres);

        assert.ok(Math.abs(centreFront - policy.shoulderCentreForwardMetres) < 1e-12, `${person.id} ${hand} shoulder stays torso-owned in local front/back at ${beat}`);
        assert.ok(Math.abs(centreSide - policy.shoulderCentreSideMetres) < 1e-12, `${person.id} ${hand} shoulder stays at the acromion side line at ${beat}`);
        assert.ok(Math.abs(centreHeight - policy.shoulderCentreHeightMetres) < 1e-12, `${person.id} ${hand} shoulder stays at its neck-base height at ${beat}`);
        assert.ok(centreFront <= policy.maximumShoulderCentreForwardMetres + 1e-12, `${person.id} ${hand} shoulder centre never advances in front of the torso neck plane at ${beat}`);
        assert.ok(
          shoulderSurfaceFront <= policy.neckFrontSilhouetteMetres + policy.maximumShoulderSurfacePastNeckMetres + 1e-12,
          `${person.id} ${hand} actual rendered shoulder sphere never projects ahead of the neck silhouette at ${beat}`,
        );
        assert.ok(
          upperArmSurfaceFront <= policy.neckFrontSilhouetteMetres + policy.maximumShoulderSurfacePastNeckMetres + 1e-12,
          `${person.id} ${hand} actual rendered upper-arm surface never projects ahead of the neck silhouette at ${beat}`,
        );
        assert.ok(
          shoulderSurfaceFront <= policy.upperTorsoFrontSilhouetteMetres + 1e-12,
          `${person.id} ${hand} shoulder surface remains within the upper-torso forward silhouette at ${beat}`,
        );
        assert.ok(innerShoulderSide >= policy.neckFrontSilhouetteMetres - 1e-12, `${person.id} ${hand} shoulder sphere laterally flanks the neck rather than crossing its centreline at ${beat}`);
        assert.ok(
          lateralAcromionOverlap >= policy.minimumAcromionTorsoOverlapMetres - 1e-12
            && lateralAcromionOverlap <= policy.maximumAcromionTorsoOverlapMetres + 1e-12,
          `${person.id} ${hand} shoulder meets the outer upper-torso/acromion seam at ${beat}`,
        );
        assert.ok(
          verticalAcromionOverlap >= policy.minimumAcromionVerticalOverlapMetres - 1e-12
            && verticalAcromionOverlap <= policy.maximumAcromionVerticalOverlapMetres + 1e-12,
          `${person.id} ${hand} shoulder vertically seats at the upper-torso top line at ${beat}`,
        );
        assert.ok(
          Math.abs(centreHeight - policy.neckBaseHeightMetres) <= policy.maximumShoulderCentreHeightFromNeckBaseMetres + 1e-12,
          `${person.id} ${hand} shoulder remains beside the base of the neck at ${beat}`,
        );
      });
    });
  }
});

test("each of the six tokens cycles through inherited self motion and scheduled passes with animated hand participation", () => {
  const participation = new Map();
  const handModes = new Set();
  for (let beat = 0; beat <= 15; beat += 0.05) {
    const sample = sampleFourCount3D(beat);
    sample.clubs.forEach((club) => {
      if (!participation.has(club.id)) participation.set(club.id, new Set());
      if (club.motionState === "flight") participation.get(club.id).add(club.kind);
    });
    sample.people.forEach((person) => {
      handModes.add(person.handMotion.left.mode);
      handModes.add(person.handMotion.right.mode);
    });
  }
  assert.equal(participation.size, 6);
  participation.forEach((kinds, id) => {
    assert.ok(kinds.has("self"), `${id} takes normal inherited self throws`);
    assert.ok(kinds.has("pass"), `${id} eventually replaces a self with a scheduled pass`);
  });
  assert.ok(handModes.has("throw-follow"), "arm kinematics include release follow-through");
  assert.ok(handModes.has("catch-reach"), "arm kinematics include a receiver catch reach");
  assert.ok(handModes.has("forward-load"), "the visible hand is attached during the pre-release swing");
  const boundary = sampleFourCount3D(FOUR_COUNT_3D_FORWARD_LOAD_BEATS);
  const left = boundary.people.find((person) => person.id === "left");
  assert.equal(left.handMotion.right.mode, "release", "the visible hand remains at the elbow-height release at the exact boundary");
  assert.ok(handModes.has("return") || handModes.has("catch"), "caught clubs stay connected through a hand return rather than parking");
});

test("the physical stage supports only the four declared two-person count cards and reads their exact event rows", () => {
  assert.deepEqual(PHYSICAL_TWO_PERSON_PATTERN_IDS, ["one-count", "two-count", "three-count", "four-count"]);
  const expected = {
    "one-count": ["pass:right:left", "pass:left:right"],
    "two-count": ["pass:right:left", "self:left:right"],
    "three-count": ["pass:right:left", "self:left:right", "self:right:left", "pass:left:right", "self:right:left", "self:left:right"],
    "four-count": ["pass:right:left", "self:left:right", "self:right:left", "self:left:right"],
  };
  Object.entries(expected).forEach(([patternId, events]) => {
    const pattern = getPassingPattern(patternId);
    const sample = samplePhysicalTwoPerson3D(patternId, 0, { camera: "audience" });
    assert.equal(sample.physical, true);
    assert.equal(sample.schedule.length, pattern.loopBeats);
    assert.deepEqual(sample.schedule.map((entry) => `${entry.kind}:${entry.hand}:${entry.catchHand}`), events, `${patternId} derives the canonical declarative rows`);
    for (let beat = -2; beat <= 30; beat += 0.125) {
      const frame = samplePhysicalTwoPerson3D(patternId, beat);
      assert.equal(frame.total, 6, `${patternId} preserves six tokens at ${beat}`);
      assert.equal(new Set(frame.clubs.map((club) => club.id)).size, 6, `${patternId} has no duplicate token ID at ${beat}`);
      assert.equal(frame.handConnected.length + frame.airborne.length, 6, `${patternId} accounts for every token at ${beat}`);
    }
  });
  ["pps", "one-count-left", "v-feed-2-4", "missing"].forEach((id) => {
    assert.equal(selectFourCount3DPattern(id).supported, false, `${id} remains the explicit 2D fallback`);
    assert.equal(sampleSelectedPassing3D(id, 0).physical, false, `${id} never starts a competing 3D player`);
  });
});

test("human anchor variation is bounded, deterministic, and smooth rather than frame noise", () => {
  const args = { personId: "left", hand: "right", clubId: "left-club-1", playheadBeats: 3.25 };
  const first = humanAnchorVariation(args);
  assert.deepEqual(humanAnchorVariation(args), first);
  assert.ok(magnitude(first) <= HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres + 1e-12);
  const near = humanAnchorVariation({ ...args, playheadBeats: args.playheadBeats + 0.001 });
  assert.ok(separation(first, near) < 0.002, "a millibeat cannot shimmer several centimetres");
  assert.notDeepEqual(humanAnchorVariation({ ...args, clubId: "left-club-2" }), first, "club phases are repeatable but not mechanically identical");
});

test("the renderer contract uses actual lathed, shadowed meshes and one reusable physical scene", async () => {
  assert.equal(PASSING_FOUR_COUNT_MESH_POLICY.clubMeshCount, 18);
  assert.equal(PASSING_FOUR_COUNT_MESH_POLICY.clubGeometryType, "LatheGeometry");
  assert.equal(PASSING_FOUR_COUNT_MESH_POLICY.clubUsesSprites, false);
  assert.equal(PASSING_FOUR_COUNT_MESH_POLICY.clubUsesCanvasClubs, false);
  assert.equal(PASSING_FOUR_COUNT_MESH_POLICY.clubCastsShadows, true);
  assert.match(PASSING_FOUR_COUNT_MESH_POLICY.personRig, /volumetric/);
  assert.equal(PASSING_FOUR_COUNT_RENDER_POLICY.rendererAnimationLoopCount, 0, "the 3D stage has no competing animation loop");
  assert.equal(PASSING_FOUR_COUNT_RENDER_POLICY.patternAnimationCount, 1, "only the selected card is animated by the host transport");
  assert.equal(PASSING_FOUR_COUNT_RENDER_POLICY.sceneCount, 1);
  assert.equal(PASSING_FOUR_COUNT_RENDER_POLICY.cameraCount, 1);
  assert.equal(PASSING_FOUR_COUNT_RENDER_POLICY.cameraChangesReuseScene, true);

  const rendererSource = await fs.readFile(new URL("../src/passing-four-count-stage.mjs", import.meta.url), "utf8");
  assert.match(rendererSource, /new THREE\.Mesh\(geometries\.shell/);
  assert.match(rendererSource, /renderer\.shadowMap\.enabled = true/);
  assert.match(rendererSource, /renderer\.shadowMap\.type = THREE\.PCFShadowMap/);
  assert.match(rendererSource, /juggler-face-direction-cue/);
  assert.match(rendererSource, /rig\.root\.rotation\.y = person\.visualYawRadians/);
  assert.match(rendererSource, /FOUR_COUNT_3D_SHOULDER_RIG_POLICY/);
  assert.match(rendererSource, /const shoulder = joint\(materials\.skin, FOUR_COUNT_3D_SHOULDER_RIG_POLICY\.shoulderJointRadiusMetres \* METRES_TO_SCENE_UNITS\)/, "the actual rendered shoulder sphere uses the sampled anatomy surface radius");
  assert.match(rendererSource, /const upper = segment\(materials\.skin, FOUR_COUNT_3D_SHOULDER_RIG_POLICY\.upperArmShoulderRadiusMetres \* METRES_TO_SCENE_UNITS\)/, "the actual rendered upper-arm surface shares the anatomy policy");
  assert.match(rendererSource, /new THREE\.CylinderGeometry\(0\.58, 0\.7, 1\.0, 12\)/, "the neck silhouette used by the shoulder guard remains the rendered neck mesh");
  assert.match(rendererSource, /new THREE\.CapsuleGeometry\(1\.8, 6\.2, 8, 16\)/, "the upper-torso seam used by the shoulder guard remains the rendered torso mesh");
  assert.match(rendererSource, /toScene\(person\.elbows\[hand\]\)/, "renderer consumes the actor-local sampled elbow instead of rebuilding a camera-space midpoint");
  assert.doesNotMatch(rendererSource, /function observerElbow/, "legacy outward midpoint elbow solver is removed");
  assert.match(rendererSource, /dataset\.minimumBodyClearanceMm/);
  assert.match(rendererSource, /dataset\.bodyCollisionMethod = sample\.collision\.method/, "renderer exposes the selected sampler's collision-method boundary");
  assert.match(rendererSource, /root\.scale\.setScalar\(FOUR_COUNT_3D_STAGE\.personRigScale\)/);
  assert.doesNotMatch(rendererSource, /new THREE\.Sprite/);
});

test("camera choices use literal sampled participant eyes for Left/Right and keep the audience frame responsive", async () => {
  assert.equal(getFourCount3DCamera("audience"), FOUR_COUNT_3D_CAMERAS.audience);
  ["audience", "left", "right"].forEach((mode) => {
    const camera = getFourCount3DCamera(mode);
    assert.match(camera.semantics, mode === "audience" ? /front-of-stage/ : /cyclopean eye.*sampled eye position/i);
    [...Object.values(camera.position), ...Object.values(camera.target), camera.fov].forEach((value) => assert.ok(Number.isFinite(value)));
  });
  assert.notDeepEqual(FOUR_COUNT_3D_CAMERAS.left.position, FOUR_COUNT_3D_CAMERAS.right.position);
  ["left", "right"].forEach((id) => {
    const sample = samplePhysicalTwoPerson3D("three-count", 1.37, { camera: id });
    const person = sample.people.find((candidate) => candidate.id === id);
    const pose = firstPersonCameraPoseForSample(sample, id);
    const eyeOffset = subtract(pose.position, person.position);
    const cameraForward = normalize(subtract(pose.target, pose.position));
    assert.equal(pose.viewKind, "first-person");
    assert.equal(pose.ownerPersonId, id);
    assert.ok(Math.abs(eyeOffset.y - FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeHeightMetres) < 1e-12, `${id} eye retains the documented rig height`);
    assert.ok(Math.abs(dot(eyeOffset, person.forward) - FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeForwardMetres) < 1e-12, `${id} eye sits at the face surface, not behind the body`);
    assert.ok(dot(cameraForward, person.forward) > 0.9, `${id} eye keeps its gaze down the participant's real facing line`);
    assert.ok(cameraForward.y < -0.4, `${id} eye pitches to the active working/catch zone so the owner's hands can remain in view`);
  });
  assert.equal(selectFourCount3DPattern("four-count").concurrentAnimationCount, 1);
  assert.equal(selectFourCount3DPattern("three-count").concurrentAnimationCount, 1);
  assert.equal(sampleSelectedPassing3D("three-count", 1).physical, true);
  assert.equal(sampleSelectedPassing3D("four-count", 1).physical, true);
  assert.equal(selectFourCount3DPattern("pps").concurrentAnimationCount, 0);

  const desktopFov = fittedVerticalFov(29, FOUR_COUNT_3D_CAMERA_REFERENCE_ASPECT);
  const portraitFov = fittedVerticalFov(29, 390 / 844);
  const commonPhoneStageAspect = 353 / 462;
  assert.ok(Math.abs(desktopFov - 29) < 1e-12);
  assert.ok(portraitFov <= FOUR_COUNT_3D_MAX_RESPONSIVE_FOV, "portrait framing caps excessive vertical distortion");
  assert.ok(responsiveCameraDistanceScale(29, 390 / 844) > 1, "portrait uses distance rather than a billboard-like extreme FOV");
  assert.ok(responsiveCameraDistanceScale(31, commonPhoneStageAspect) > 1, "the ordinary phone stage also leaves room for the near observer-view performer");
  assert.equal(responsiveCameraDistanceScale(29, 844 / 390), 1, "landscape keeps authored camera distance");

  const rendererSource = await fs.readFile(new URL("../src/passing-four-count-stage.mjs", import.meta.url), "utf8");
  assert.match(rendererSource, /rig\.root\.visible = definition\.viewKind !== "first-person" \|\| definition\.ownerPersonId !== personId/, "first-person hides exactly the owner's torso/head/legs root");
  assert.match(rendererSource, /rig\.arms\.left\.upper, rig\.arms\.left\.lower/, "arms remain scene siblings when the owning root is hidden");
  assert.match(rendererSource, /dataset\.cameraKind/);
  assert.match(rendererSource, /dataset\.hiddenAvatar/);
  assert.match(rendererSource, /dataset\.visibleClubs/);
  assert.match(rendererSource, /applyCamera\(sample\)/, "the sampled eye pose is applied after people update each render");
});
