import { getPassingPattern } from "./passing-library.mjs?build=throw-semantics-v20";

// This is a deliberately narrow physical path. The wider Passing Lab catalogue
// remains schedule-viewer data; only the four canonical face-to-face
// two-person counts continuously sample as causal six-club 3D token timelines.
export const FOUR_COUNT_3D_PATTERN_ID = "four-count";
export const PHYSICAL_TWO_PERSON_PATTERN_IDS = Object.freeze([
  "one-count",
  "two-count",
  "three-count",
  FOUR_COUNT_3D_PATTERN_ID,
]);
export const FOUR_COUNT_3D_VERSION = 16;
// This is a first-order teaching model, not a claim to measured biomechanics.
// It deliberately uses SI units all the way through the 1× transport so that
// the animation duration follows the sampled Earth-gravity trajectories.
export const EARTH_GRAVITY_METRES_PER_SECOND_SQUARED = 9.80665;
export const ADULT_JUGGLER_HEIGHT_METRES = 1.7526; // 5 ft 9 in
// A club anchor can move by up to 52 mm under the deterministic human-motion
// policy below. Reserve that exact amount below the reference head height so
// even a varied endpoint cannot push the sampled balance point above it.
export const FOUR_COUNT_3D_ANCHOR_VARIATION_HEIGHT_RESERVE_METRES = 0.052;
export const FOUR_COUNT_3D_BALANCE_APEX_METRES = ADULT_JUGGLER_HEIGHT_METRES
  - FOUR_COUNT_3D_ANCHOR_VARIATION_HEIGHT_RESERVE_METRES;
// A club rests low at the side, then the active hand visibly swings it up and
// forward before release.  These are balance-point heights, not hand-joint or
// club-tip heights.  1.10 m is deliberately around an adult elbow-height
// teaching cue, below the 1.44 m shoulder/catch cue.
// `position` is the club balance point, not the palm.  The Earth/down-side
// pose therefore needs a lower balance height than the visible hip-height
// grip: with the club pointing down, its handle/knob seam sits 251.5 mm above
// this value.
export const FOUR_COUNT_3D_READY_BALANCE_HEIGHT_METRES = 0.5485;
export const FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES = 1.10;
// A body-down pass uses a lower balance point than a diagonal self: its seam
// grip sits 251.5 mm *above* the pivot. This keeps the throwing hand around
// hip/low-elbow height while giving the pass enough Earth-flight time to clear
// the receiver's intervening self throw before the shoulder-front catch.
// A body-down pass is released with the seam-gripping hand around navel
// height. The lower balance point follows from the 251.5 mm seam offset.
export const FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES = 0.75;
export const FOUR_COUNT_3D_SELF_CATCH_HEIGHT_METRES = 0.96;
// The named passing catch is a **hand/grip** cue at shoulder height. A physical
// pass now ends vertically up, so its balance pivot is exactly one seam offset
// above that hand rather than the old diagonal-frame estimate.
export const FOUR_COUNT_3D_CATCH_HEIGHT_METRES = 1.44;
export const FOUR_COUNT_3D_PASS_CATCH_BALANCE_HEIGHT_METRES = FOUR_COUNT_3D_CATCH_HEIGHT_METRES
  + 0.2515;
// This is not a playback multiplier. It is the explicit physical hand-path
// time between a self catch and its next release: catch, return, a short rest,
// then the readable forward-load stroke. The ratios are applied to a longer
// pass recovery gap too, so neither route teleports into its next throw.
export const FOUR_COUNT_3D_SELF_DWELL_SECONDS = 0.50;
export const FOUR_COUNT_3D_HAND_PATH_FRACTIONS = Object.freeze({
  catch: 0.12,
  return: 0.28,
  ready: 0.12,
  forwardLoad: 0.48,
});
export const FOUR_COUNT_3D_THROW_CYCLE_BEATS = 3;
const cappedFlightTimeSeconds = (releaseHeightMetres, catchHeightMetres) => {
  const launchVelocity = Math.sqrt(
    2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
      * (FOUR_COUNT_3D_BALANCE_APEX_METRES - releaseHeightMetres),
  );
  return (
    launchVelocity
    + Math.sqrt(
      launchVelocity ** 2
        - 2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
          * (catchHeightMetres - releaseHeightMetres),
    )
  ) / EARTH_GRAVITY_METRES_PER_SECOND_SQUARED;
};
export const FOUR_COUNT_3D_SELF_FLIGHT_SECONDS = cappedFlightTimeSeconds(
  FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES,
  FOUR_COUNT_3D_SELF_CATCH_HEIGHT_METRES,
);
export const FOUR_COUNT_3D_SELF_FLIGHT_BEATS = FOUR_COUNT_3D_SELF_FLIGHT_SECONDS
  / ((FOUR_COUNT_3D_SELF_FLIGHT_SECONDS + FOUR_COUNT_3D_SELF_DWELL_SECONDS) / FOUR_COUNT_3D_THROW_CYCLE_BEATS);
export const FOUR_COUNT_3D_BEAT_SECONDS = (FOUR_COUNT_3D_SELF_FLIGHT_SECONDS + FOUR_COUNT_3D_SELF_DWELL_SECONDS)
  / FOUR_COUNT_3D_THROW_CYCLE_BEATS;
export const FOUR_COUNT_3D_BASE_BPM = 60 / FOUR_COUNT_3D_BEAT_SECONDS;
// The Pass command begins this stroke on its named beat. The actual ballistic
// release occurs only after this measured hand-connected load, preserving a
// full Earth count-in instead of borrowing its final fraction for a throw.
export const FOUR_COUNT_3D_FORWARD_LOAD_SECONDS = FOUR_COUNT_3D_SELF_DWELL_SECONDS
  * FOUR_COUNT_3D_HAND_PATH_FRACTIONS.forwardLoad;
export const FOUR_COUNT_3D_FORWARD_LOAD_BEATS = FOUR_COUNT_3D_FORWARD_LOAD_SECONDS
  / FOUR_COUNT_3D_BEAT_SECONDS;
export const FOUR_COUNT_3D_PASS_LAUNCH_VERTICAL_METRES_PER_SECOND = Math.sqrt(
  2 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED
    * (FOUR_COUNT_3D_BALANCE_APEX_METRES - FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES),
);
export const FOUR_COUNT_3D_PASS_FLIGHT_SECONDS = cappedFlightTimeSeconds(
  FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES,
  FOUR_COUNT_3D_PASS_CATCH_BALANCE_HEIGHT_METRES,
);
export const FOUR_COUNT_3D_PASS_FLIGHT_BEATS = FOUR_COUNT_3D_PASS_FLIGHT_SECONDS / FOUR_COUNT_3D_BEAT_SECONDS;
// Compatibility name for existing callers: the ordinary siteswap-3 self is
// the longer flight in this four-count foundation.
export const FOUR_COUNT_3D_FLIGHT_BEATS = FOUR_COUNT_3D_SELF_FLIGHT_BEATS;
export const FOUR_COUNT_3D_CYCLE_SECONDS = FOUR_COUNT_3D_THROW_CYCLE_BEATS * FOUR_COUNT_3D_BEAT_SECONDS;
export const FOUR_COUNT_3D_PLAYBACK_SPEEDS = Object.freeze([0.25, 0.5, 1]);
// A passing "single" retains the requested 540° / 1.5-turn airborne count.
// Passes rotate in the vertical plane of their real release-to-catch path;
// self throws retain their independent local diagonal handling plane. The
// receiver only lowers a pass once it is hand-connected after the catch.
export const FOUR_COUNT_3D_PASS_SPIN_RADIANS = Math.PI * 3;
export const FOUR_COUNT_3D_PASS_TURNS = 1.5;
export const FOUR_COUNT_3D_SELF_SPIN_RADIANS = Math.PI * 2;

// The renderer's actual Creator Club mesh has a balance-point root. Its local
// +Y axis runs from the EVA knob toward the cap/body.  Keep the hand at the
// existing knob/handle seam rather than at the balance pivot: the seam is the
// physically useful "immediately above the knob" contact, while the distal
// knob tip stays available for conservative collision testing.
//
// The diagonal is deliberately defined in each actor's real local basis. A
// right-hand club is cross-body left (`-right`), forward, and 45 degrees above
// horizontal; left is the exact lateral mirror. The components of the unit
// knob-to-cap axis are respectively lateral +/-0.5, up sqrt(1/2), forward
// +0.5. It gives a hip-height knob grip and elbow-ish cap at the 1.100 m
// release balance point without changing the gravity model's source endpoint.
export const FOUR_COUNT_3D_CLUB_HANDLING_POLICY = Object.freeze({
  id: "passing-four-count-diagonal-grip-v1",
  units: "metres-radians",
  clubAxis: "local +Y, knob/handle toward cap/body",
  grip: "handle/knob seam; palm centre contacts this seam with no gap",
  knobTipFromBalanceMetres: 0.280,
  gripFromBalanceMetres: 0.2515,
  capTipFromBalanceMetres: 0.235,
  elevationRadians: Math.PI / 4,
  crossBodyYawRadians: Math.PI / 4,
  spinSemantics: "selfs retain their signed local diagonal handling track; each pass begins body-down, spins a signed 3pi in its real path-aligned vertical plane, and arrives body-up at the receiver seam catch without an airborne frame blend or reversal",
  rationale: "The requested 3pi airborne count remains intact. A pass uses the actual partner path for its end-over-end plane, so the vertical-up catch follows from the physical rotation rather than a hidden receiver-frame snap.",
});

// The articulated arm meshes are not children of the scaled body root: their
// sampled world positions are placed directly in the shared scene. Keep the
// anatomical surface values here in metres so the model, renderer, and
// regression checks use the same clavicle/acromion contract. The neck and
// upper-torso figures below are the rendered mesh extents after the body root
// scale, not generic human-body measurements.
const FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES = ADULT_JUGGLER_HEIGHT_METRES / 1.965 / 10;
const FOUR_COUNT_3D_NECK_BASE_HEIGHT_METRES = (16.55 - 0.5) * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES;
const FOUR_COUNT_3D_NECK_CENTRE_HEIGHT_METRES = 16.55 * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES;
const FOUR_COUNT_3D_NECK_HEIGHT_METRES = FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES;
const FOUR_COUNT_3D_NECK_RADIUS_AT_SHOULDER_METRES = (
  0.70 + (0.58 - 0.70)
    * ((FOUR_COUNT_3D_CATCH_HEIGHT_METRES - FOUR_COUNT_3D_NECK_BASE_HEIGHT_METRES) / FOUR_COUNT_3D_NECK_HEIGHT_METRES)
) * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES;
export const FOUR_COUNT_3D_SHOULDER_RIG_POLICY = Object.freeze({
  id: "passing-four-count-clavicle-acromion-shoulders-v1",
  units: "metres",
  scope: "schematic rendered shoulder anatomy guard; not a biomechanical measurement",
  // Shoulder joints are rendered directly in scene units as 0.62-unit
  // spheres, unlike the torso which is scaled with the body root.
  shoulderJointRadiusMetres: 0.062,
  upperArmShoulderRadiusMetres: 0.052,
  upperArmElbowRadiusMetres: 0.0468,
  // Centre both shoulders at the top/outer torso line: laterally at the
  // acromion, at the base-neck height, and just *behind* the neck-front
  // plane. This deliberately replaces the old +0.130 m forward placement.
  shoulderCentreSideMetres: 0.230,
  shoulderCentreForwardMetres: -0.015,
  shoulderCentreHeightMetres: FOUR_COUNT_3D_CATCH_HEIGHT_METRES,
  // These are derived from the actual Three mesh dimensions in
  // `passing-four-count-stage.mjs`: neck (r .58/.70, h 1.0 at y 16.55),
  // capsule torso (r 1.8, cylinder length 6.2 at y 10.8), and chest (r 1.92).
  neckBaseHeightMetres: FOUR_COUNT_3D_NECK_BASE_HEIGHT_METRES,
  neckCentreHeightMetres: FOUR_COUNT_3D_NECK_CENTRE_HEIGHT_METRES,
  // At y = 1.440 m the tapered cylinder's rendered radius is a little
  // smaller than its bottom radius. Use that actual cross-section rather than
  // a generic neck circle so the surface guard is exact at the shoulder.
  neckFrontSilhouetteMetres: FOUR_COUNT_3D_NECK_RADIUS_AT_SHOULDER_METRES,
  upperTorsoTopHeightMetres: (10.8 + 6.2 / 2 + 1.8) * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES,
  upperTorsoOuterHalfWidthMetres: 1.92 * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES,
  upperTorsoFrontSilhouetteMetres: 1.8 * FOUR_COUNT_3D_PERSON_RIG_NATIVE_METRES,
  maximumShoulderCentreForwardMetres: 0,
  maximumShoulderSurfacePastNeckMetres: 0,
  minimumAcromionTorsoOverlapMetres: 0.002,
  maximumAcromionTorsoOverlapMetres: 0.030,
  minimumAcromionVerticalOverlapMetres: 0.010,
  maximumAcromionVerticalOverlapMetres: 0.040,
  maximumShoulderCentreHeightFromNeckBaseMetres: 0.020,
  policy: "shoulder centres flank the base of the neck at the top/outer torso, remain torso-owned and quiet, and never project their rendered surface ahead of the neck silhouette",
});

// Coordinates are metres. The stage renderer converts them to the shared
// decimetre Creator Club mesh system. The anchors intentionally describe an
// adult-sized, visible teaching pose rather than inheriting catalogue layout.
export const FOUR_COUNT_3D_STAGE = Object.freeze({
  units: "metres",
  stageWidth: 7.2,
  stageDepth: 4.8,
  prosceniumHeight: 3.8,
  adultJugglerHeightMetres: ADULT_JUGGLER_HEIGHT_METRES,
  // Native rig height is 1.965 m; this makes its visible top agree with the
  // 5 ft 9 in coordinate reference used by the gravity model.
  personRigScale: ADULT_JUGGLER_HEIGHT_METRES / 1.965,
  // The shoulder is an anatomical body anchor, not a forward juggling-hand
  // anchor. Hands travel in front; the joint itself stays at the quiet
  // clavicle/acromion line defined by the rendered-surface policy above.
  shoulderHeightMetres: FOUR_COUNT_3D_SHOULDER_RIG_POLICY.shoulderCentreHeightMetres,
  shoulderSideMetres: FOUR_COUNT_3D_SHOULDER_RIG_POLICY.shoulderCentreSideMetres,
  shoulderForwardMetres: FOUR_COUNT_3D_SHOULDER_RIG_POLICY.shoulderCentreForwardMetres,
  // These are balance-point coordinates. In the down-pointing Earth/ready
  // pose the handle/knob-seam grip is therefore at side=.54, forward=.36,
  // height=.80 m: a low side rest that can visibly swing forward/up to the
  // diagonal hip-height release grip.
  readySideMetres: 0.54,
  readyForwardMetres: 0.36,
  throwReleaseSideMetres: 0.40,
  throwReleaseForwardMetres: 0.62,
  // Passes travel inward and upward during the connected loading stroke. The
  // seam releases close to the torso midline, then arrives in a visibly wider
  // receiving lane so the catch reads outside the throw rather than crossed.
  passThrowReleaseSideMetres: 0.14,
  passCatchSideMetres: 0.34,
  throwReleaseBalanceHeightMetres: FOUR_COUNT_3D_THROW_RELEASE_HEIGHT_METRES,
  passThrowReleaseBalanceHeightMetres: FOUR_COUNT_3D_PASS_THROW_RELEASE_HEIGHT_METRES,
  selfCatchSideMetres: 0.42,
  selfCatchForwardMetres: 0.56,
  selfCatchBalanceHeightMetres: FOUR_COUNT_3D_SELF_CATCH_HEIGHT_METRES,
  // `sampleCascade` keeps its expressive diagonal plane in its own local
  // coordinates. Map that depth span into this bounded front-of-body lane.
  cascadePlaneDepthMetres: 0.17,
  selfFrontSweepMetres: 0.15,
  readyBalanceHeightMetres: FOUR_COUNT_3D_READY_BALANCE_HEIGHT_METRES,
  balanceApexHeightMetres: FOUR_COUNT_3D_BALANCE_APEX_METRES,
  selfFlightSeconds: FOUR_COUNT_3D_SELF_FLIGHT_SECONDS,
  passFlightSeconds: FOUR_COUNT_3D_PASS_FLIGHT_SECONDS,
  passCatchForwardMetres: 0.3048,
  cascadeOriginY: 1.248,
  people: Object.freeze([
    Object.freeze({ id: "left", name: "Left / A", position: Object.freeze({ x: -1.375, y: 0, z: 0 }), headingRadians: Math.PI / 2 }),
    Object.freeze({ id: "right", name: "Right / B", position: Object.freeze({ x: 1.375, y: 0, z: 0 }), headingRadians: -Math.PI / 2 }),
  ]),
});

// Collision is deliberately conservative: clubs are treated as their full
// balance-point-to-knob reach plus an outer body radius, and body envelopes
// are broader than the visible mesh cores.  These are teaching-model guards,
// not a claim to medical or biomechanical collision measurement.
export const FOUR_COUNT_3D_COLLISION_POLICY = Object.freeze({
  units: "metres",
  clubKnobReachMetres: 0.28,
  clubCapReachMetres: 0.235,
  clubOuterRadiusMetres: 0.045,
  requiredClearanceMetres: 0.025,
  torsoCapsule: Object.freeze({ bottomHeightMetres: 0.58, topHeightMetres: 1.40, radiusMetres: 0.20 }),
  headSphere: Object.freeze({ centerHeightMetres: 1.61, radiusMetres: 0.165 }),
});

// Smooth, low-frequency movement rather than fresh random jitter. One world
// unit is one metre, so <= 0.052 m is approximately two inches. The hand and
// torso components are intentionally correlated by performer, while a small
// club phase makes repeated launches avoid a mechanically identical point.
export const HUMAN_ANCHOR_VARIATION_POLICY = Object.freeze({
  id: "passing-four-count-human-anchor-v1",
  seed: "passing-four-count-human-anchor-v1",
  units: "metres",
  maximumAnchorOffsetMetres: 0.052,
  torsoMaximumMetres: 0.018,
  handMaximumMetres: 0.038,
  clubMaximumMetres: 0.008,
  periodsBeats: Object.freeze([11, 13, 17]),
  method: "deterministic smooth periodic sine/cosine components keyed by performer, hand, and club; no frame-random noise",
});

// This is a deliberately modest *rendered-arm* envelope, not a measurement of
// a particular person's anatomy or throwing technique. The shoulders stay
// anchored to the quiet torso frame; elbows live beside the waist/hips, where
// they would hang at rest. They never follow a hand or a club path: forearms
// and wrists do the forward/cross-body work.
export const FOUR_COUNT_3D_ARM_RIG_POLICY = Object.freeze({
  id: "passing-four-count-body-side-elbows-v2",
  units: "metres-radians",
  scope: "schematic rendered-arm readability guard; not biomechanical measurement",
  // The elbow sphere has a 49 mm rendered radius. Keep its *centre* a little
  // behind the body-side plane, not merely near it, so even the visible front
  // surface never reads as a forward-reaching elbow.
  waistSideRest: Object.freeze({ outwardMetres: 0.305, forwardMetres: -0.050, heightMetres: 0.985 }),
  independentExcursion: Object.freeze({ lateralMetres: 0.010, forwardMetres: 0.004, verticalMetres: 0.016 }),
  elbowJointRadiusMetres: 0.049,
  maximumVisibleElbowFrontMetres: 0.005,
  minElbowFrontMetres: -0.054,
  maxElbowFrontMetres: -0.046,
  minElbowOutwardMetres: 0.295,
  maxElbowOutwardMetres: 0.315,
  minElbowHeightMetres: 0.969,
  maxElbowHeightMetres: 1.001,
  maximumElbowExcursionFromRestMetres: 0.024,
  maximumUpperArmVisualMetres: 0.51,
  // The shoulder-front pass catch may extend the forearm while the elbow
  // stays at the side; allow that real visible reach without loosening the
  // elbow's strict waist-side envelope.
  maximumForearmVisualMetres: 0.80,
  maximumElbowExtensionRadians: 2.60,
  policy: "elbows remain at the body sides near waist height, with only a tiny torso-owned excursion; hands and forearms perform the juggling stroke",
});

// Sky/Earth is deliberately not ordinary pattern handling. A group starts
// with two clubs in its opening hand and one in the other, so the count-in
// needs a visible whole-arm swing before normal side-elbow juggling begins.
// The hand frames below carry every club in their starting bundle rigidly at
// the actual handle/knob seam; no club is independently spun by a wrist.
export const FOUR_COUNT_3D_COUNT_IN_ARM_POLICY = Object.freeze({
  id: "passing-four-count-whole-arm-sky-earth-v15",
  units: "metres-beats-radians",
  // This is a *performer* cue, not a separate jitter for every club. It lets
  // one juggler get their Sky up a shade after the other without making a
  // two-club starting carry fight itself hand-by-hand.
  skyStaggerBeats: 0.075,
  skyTravelBeats: 0.78,
  // The seam grip rises from its ordinary 0.80 m Earth-ready height to about
  // 1.38 m. The vertical club then reads above the head without turning Sky
  // into a shoulder-dislocating wrist-only pose.
  skyLiftMetres: 0.58,
  skySideInwardMetres: 0.070,
  skyForwardMetres: 0.045,
  swingArcForwardMetres: 0.175,
  swingArcSideMetres: 0.060,
  skyElbowOutwardMetres: 0.415,
  skyElbowForwardMetres: 0.175,
  skyElbowHeightMetres: 1.345,
  maximumSkyElbowExcursionMetres: 0.55,
  maximumSecondaryBundleGripOffsetMetres: 0.055,
  policy: "Sky raises with a small per-person stagger; Earth descends in one synchronized whole-arm swing; the forward load begins from the same down-side seam pose",
});

export const FOUR_COUNT_3D_MOTION_STATES = Object.freeze([
  "count-in",
  "ready",
  "forward-load",
  "release",
  "flight",
  "catch",
  "return",
]);

const TAU = Math.PI * 2;
const UP = Object.freeze({ x: 0, y: 1, z: 0 });
const DOWN = Object.freeze({ x: 0, y: -1, z: 0 });
const freeze = (value) => Object.freeze(value);
const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
const mix = (start, end, amount) => start + (end - start) * amount;
const smoothstep = (value) => { const clamped = clamp(value, 0, 1); return clamped * clamped * (3 - 2 * clamped); };
// Quintic endpoint easing has zero first *and* second derivative at both
// ends. That gives Sky -> Earth -> Pass a visible arm swing rather than a
// stop/start wrist flip at either spoken cue.
const smootherstep = (value) => {
  const clamped = clamp(value, 0, 1);
  return clamped ** 3 * (clamped * (clamped * 6 - 15) + 10);
};
const vector = (x = 0, y = 0, z = 0) => ({ x, y, z });
const add = (left, right) => vector(left.x + right.x, left.y + right.y, left.z + right.z);
const subtract = (left, right) => vector(left.x - right.x, left.y - right.y, left.z - right.z);
const scale = (value, amount) => vector(value.x * amount, value.y * amount, value.z * amount);
const dot = (left, right) => left.x * right.x + left.y * right.y + left.z * right.z;
const cross = (left, right) => vector(left.y * right.z - left.z * right.y, left.z * right.x - left.x * right.z, left.x * right.y - left.y * right.x);
const length = (value) => Math.hypot(value.x, value.y, value.z);
const normalize = (value, fallback = UP) => { const magnitude = length(value); return magnitude > 1e-9 ? scale(value, 1 / magnitude) : { ...fallback }; };
const lerpVector = (left, right, amount) => vector(mix(left.x, right.x, amount), mix(left.y, right.y, amount), mix(left.z, right.z, amount));
const cloneVector = (value) => vector(value.x, value.y, value.z);

const performersById = new Map(FOUR_COUNT_3D_STAGE.people.map((person) => [person.id, person]));
const partnerFor = (id) => id === "left" ? "right" : "left";
// Participant facing is derived from the real partner line, not just a label
// or a camera pose. The renderer consumes `visualYawRadians` below so its
// visible local -Z face maps to this same forward vector.
export function fourCountOrientationFor(personOrId) {
  const person = typeof personOrId === "string" ? performersById.get(personOrId) : personOrId;
  if (!person || !performersById.has(person.id)) throw new RangeError("known four-count participant is required");
  const partner = performersById.get(partnerFor(person.id));
  const forward = normalize(subtract(partner.position, person.position), vector(Math.sin(person.headingRadians), 0, -Math.cos(person.headingRadians)));
  const right = normalize(cross(forward, UP), vector(Math.cos(person.headingRadians), 0, Math.sin(person.headingRadians)));
  const headingRadians = Math.atan2(forward.x, -forward.z);
  return freeze({
    personId: person.id,
    partnerId: partner.id,
    forward: freeze(cloneVector(forward)),
    right: freeze(cloneVector(right)),
    headingRadians,
    // Three's visible local front is -Z, so its positive yaw convention is
    // the inverse of the historical model heading convention.
    visualYawRadians: -headingRadians,
  });
}
const forwardFor = (person) => fourCountOrientationFor(person).forward;
const rightFor = (person) => fourCountOrientationFor(person).right;

const handSignFor = (hand) => {
  if (hand === "right") return 1;
  if (hand === "left") return -1;
  throw new RangeError("left or right hand is required");
};

// The physical player intentionally reads the four approved schedules from
// Passing Lab's declarative card data.  It does not reinterpret the library's
// viewer-only `flightBeats`, `spins`, or nominal tempo fields: the gravity
// timing and single-pass handling policy remain this module's physical layer.
// The adapter is deliberately narrow. If a card stops being the synchronized
// 2-person / six-club face-to-face contract, it remains in the honest 2D
// schedule viewer instead of receiving invented choreography here.
function synchronousFacingPairPhysicalAdapter(patternId) {
  const pattern = getPassingPattern(patternId);
  if (!PHYSICAL_TWO_PERSON_PATTERN_IDS.includes(patternId)) {
    throw new RangeError(`unsupported physical two-person pattern: ${patternId}`);
  }
  if (pattern.peopleCount !== 2 || pattern.clubCount !== 6 || pattern.performers.length !== 2) {
    throw new RangeError(`${patternId} must remain a 2-person, six-club pattern`);
  }
  const personIds = pattern.performers.map((person) => person.id);
  if (!personIds.includes("left") || !personIds.includes("right")) {
    throw new RangeError(`${patternId} must retain the declared left/right facing-pair identities`);
  }
  const byBeat = Array.from({ length: pattern.loopBeats }, (_, phraseBeat) => {
    const row = pattern.events.filter((entry) => entry.beat === phraseBeat);
    if (row.length !== 2 || new Set(row.map((entry) => entry.juggler)).size !== 2) {
      throw new RangeError(`${patternId} beat ${phraseBeat} must declare one event for each participant`);
    }
    const entries = Object.fromEntries(row.map((entry) => [entry.juggler, entry]));
    const left = entries.left;
    const right = entries.right;
    if (!left || !right || left.kind === "hold" || right.kind === "hold"
      || left.kind !== right.kind || left.hand !== right.hand
      || left.catchHand !== right.catchHand) {
      throw new RangeError(`${patternId} beat ${phraseBeat} is not a synchronized facing-pair event row`);
    }
    for (const entry of row) {
      const expectedTarget = entry.kind === "pass"
        ? (entry.juggler === "left" ? "right" : "left")
        : entry.juggler;
      if (entry.target !== expectedTarget) {
        throw new RangeError(`${patternId} beat ${phraseBeat} must retain its declared ${entry.kind} target`);
      }
    }
    return Object.freeze({
      phraseBeat,
      kind: left.kind,
      hand: left.hand,
      catchHand: left.catchHand,
      label: left.kind === "pass"
        ? `synchronised ${left.hand}-hand 540° single pass`
        : `${left.hand} self`,
      events: Object.freeze({ left, right }),
    });
  });
  return Object.freeze({
    patternId,
    title: pattern.title,
    loopBeats: pattern.loopBeats,
    people: Object.freeze(personIds),
    schedule: Object.freeze(byBeat),
  });
}

export const PHYSICAL_TWO_PERSON_ADAPTERS = Object.freeze(
  Object.fromEntries(PHYSICAL_TWO_PERSON_PATTERN_IDS.map((id) => [id, synchronousFacingPairPhysicalAdapter(id)])),
);

export function physicalTwoPersonAdapterFor(patternId = FOUR_COUNT_3D_PATTERN_ID) {
  const adapter = PHYSICAL_TWO_PERSON_ADAPTERS[patternId];
  if (!adapter) throw new RangeError(`unsupported physical two-person pattern: ${patternId}`);
  return adapter;
}

// Compatibility export for existing readers/tests. The data is now derived
// from the selected four-count card rather than maintained as a second manual
// schedule copy.
export const FOUR_COUNT_3D_SCHEDULE = physicalTwoPersonAdapterFor(FOUR_COUNT_3D_PATTERN_ID).schedule;

// Return the physical long axis of the neutral mesh (knob/handle -> cap/body)
// in the participant's real world basis. The horizontal projection is 45°
// across the body and 45° forward; adding UP at equal length makes the long
// axis 45° above horizontal. `right` therefore points cross-body left and
// `left` cross-body right, with no camera-specific sign convention.
export function clubDiagonalAxisFor(personOrId, hand) {
  const person = typeof personOrId === "string" ? performersById.get(personOrId) : personOrId;
  if (!person || !performersById.has(person.id)) throw new RangeError("known four-count participant is required");
  const horizontal = normalize(
    subtract(forwardFor(person), scale(rightFor(person), handSignFor(hand))),
    forwardFor(person),
  );
  return freeze(cloneVector(normalize(add(horizontal, UP), UP)));
}

function clubContactPoints(position, direction) {
  const axis = normalize(direction, DOWN);
  return {
    // `knobPosition` is deliberately the physical top-of-knob / handle seam,
    // the place a palm wraps; `knobTipPosition` remains distinct for the full
    // club collision segment. Both are derived from the renderer's balance
    // pivot and local +Y mesh axis.
    knobPosition: add(position, scale(axis, -FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres)),
    knobTipPosition: add(position, scale(axis, -FOUR_COUNT_3D_CLUB_HANDLING_POLICY.knobTipFromBalanceMetres)),
    capPosition: add(position, scale(axis, FOUR_COUNT_3D_CLUB_HANDLING_POLICY.capTipFromBalanceMetres)),
  };
}

function gripPositionFor(position, direction) {
  return clubContactPoints(position, direction).knobPosition;
}

function balancePositionForGrip(gripPosition, direction) {
  return add(gripPosition, scale(normalize(direction, DOWN), FOUR_COUNT_3D_CLUB_HANDLING_POLICY.gripFromBalanceMetres));
}

export const FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY = Object.freeze({
  id: "passing-four-count-cyclopean-eye-v1",
  units: "metres-degrees",
  // The render rig has one head sphere and one face-direction cue, rather
  // than stereo eyes. This is consequently a literal *monocular* participant
  // view: one eye anchor at the sampled head/face surface, never a displaced
  // chase camera sold as first-person.
  eyeHeightMetres: 1.642,
  eyeForwardMetres: 0.12665,
  // A real passer looks down their partner-facing line at the working/catch
  // zone, rather than holding a perfectly level gaze that clips their own
  // forearms below the frame. The eye itself remains at the sampled face.
  gazeForwardMetres: 1.6,
  gazeDownMetres: 0.75,
  fovDegrees: 100,
  semantics: "cyclopean eye at the named participant's sampled eye position, gazing down the real partner-facing line at the working/catch zone",
});

function firstPersonCameraTarget(position, forward) {
  return add(
    add(position, scale(forward, FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.gazeForwardMetres)),
    vector(0, -FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.gazeDownMetres, 0),
  );
}

function firstPersonCameraFor(personId) {
  const person = performersById.get(personId);
  const orientation = fourCountOrientationFor(person);
  const position = add(
    add(person.position, vector(0, FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeHeightMetres, 0)),
    scale(orientation.forward, FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeForwardMetres),
  );
  return freeze({
    id: person.id,
    ownerPersonId: person.id,
    viewKind: "first-person",
    label: `${person.name} first-person view`,
    semantics: `${person.name} ${FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.semantics}`,
    position: freeze(position),
    target: freeze(firstPersonCameraTarget(position, orientation.forward)),
    fov: FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.fovDegrees,
  });
}

// The audience camera is intentionally stage-relative. Named participant
// cameras are baseline declarations only; their exact eye pose is recomputed
// from a sampled participant in `firstPersonCameraPoseForSample()`.
export const FOUR_COUNT_3D_CAMERAS = Object.freeze({
  audience: Object.freeze({ id: "audience", viewKind: "audience", label: "Audience view", semantics: "front-of-stage observer camera", position: Object.freeze({ x: 0, y: 2.45, z: 8.8 }), target: Object.freeze({ x: 0, y: 1.40, z: 0 }), fov: 29 }),
  left: firstPersonCameraFor("left"),
  right: firstPersonCameraFor("right"),
});
const hash = (text) => {
  let value = 2166136261;
  for (const code of String(text)) { value ^= code.charCodeAt(0); value = Math.imul(value, 16777619); }
  return (value >>> 0) / 0x1_0000_0000;
};
const phaseFor = (key) => hash(`${HUMAN_ANCHOR_VARIATION_POLICY.seed}:${key}`) * TAU;
const bounded = (value, maximum) => { const magnitude = length(value); return magnitude > maximum ? scale(value, maximum / magnitude) : value; };

export function torsoOffset(personId, playheadBeats) {
  const time = finite(playheadBeats);
  const phase = phaseFor(`torso:${personId}`);
  const person = performersById.get(personId);
  if (!person) throw new RangeError("known person is required");
  const right = rightFor(person);
  const forward = forwardFor(person);
  const shared = add(
    scale(right, Math.sin(TAU * time / HUMAN_ANCHOR_VARIATION_POLICY.periodsBeats[1] + phase) * 0.012),
    scale(forward, Math.cos(TAU * time / HUMAN_ANCHOR_VARIATION_POLICY.periodsBeats[2] + phase * 1.7) * 0.010),
  );
  return bounded(add(shared, vector(0, Math.sin(TAU * time / 17 + phase * 0.6) * 0.006, 0)), HUMAN_ANCHOR_VARIATION_POLICY.torsoMaximumMetres);
}

function handAndClubVariation({ personId, hand, clubId = "hand", playheadBeats }) {
  const time = finite(playheadBeats);
  const person = performersById.get(personId);
  if (!person || (hand !== "left" && hand !== "right")) throw new RangeError("known person and left/right hand are required");
  const right = rightFor(person);
  const forward = forwardFor(person);
  const handPhase = phaseFor(`hand:${personId}:${hand}`);
  const clubPhase = phaseFor(`club:${clubId}`);
  const handWave = add(
    scale(right, Math.sin(TAU * time / 11 + handPhase) * 0.022),
    scale(forward, Math.cos(TAU * time / 13 + handPhase * 1.4) * 0.022),
  );
  const vertical = vector(0, Math.sin(TAU * time / 17 + handPhase * 0.5) * 0.015, 0);
  const clubWave = add(
    scale(right, Math.sin(TAU * time / 13 + clubPhase) * 0.004),
    scale(forward, Math.cos(TAU * time / 17 + clubPhase * 1.9) * 0.004),
  );
  return add(add(handWave, vertical), clubWave);
}

export function humanAnchorVariation({ personId, hand, clubId = "hand", playheadBeats }) {
  const time = finite(playheadBeats);
  // The full bounded offset is shared by down-side release and shoulder-front
  // catch anchors. That makes the nominal gravity calculation conservative:
  // neither endpoint can depart its mean anchor by more than 52 mm.
  return bounded(add(torsoOffset(personId, time), handAndClubVariation({ personId, hand, clubId, playheadBeats: time })), HUMAN_ANCHOR_VARIATION_POLICY.maximumAnchorOffsetMetres);
}

function shoulderAnchor(personId, hand, playheadBeats) {
  const person = performersById.get(personId);
  const side = hand === "left" ? -1 : 1;
  // A shoulder is a quiet torso-owned clavicle/acromion anchor. Deliberately
  // do not add a hand or club variation here: palms travel forward to juggle,
  // while the joint stays at the upper outer torso beside the neck.
  return add(
    add(
      add(
        add(person.position, torsoOffset(personId, playheadBeats)),
        scale(rightFor(person), side * FOUR_COUNT_3D_STAGE.shoulderSideMetres),
      ),
      scale(forwardFor(person), FOUR_COUNT_3D_STAGE.shoulderForwardMetres),
    ),
    vector(0, FOUR_COUNT_3D_STAGE.shoulderHeightMetres, 0),
  );
}

function tuckedArmKinematics(person, bodyPosition, hand, shoulder, palm, playheadBeats) {
  const sign = handSignFor(hand);
  const right = rightFor(person);
  const forward = forwardFor(person);
  const policy = FOUR_COUNT_3D_ARM_RIG_POLICY;
  const rest = add(
    add(
      add(bodyPosition, scale(right, sign * policy.waistSideRest.outwardMetres)),
      scale(forward, policy.waistSideRest.forwardMetres),
    ),
    vector(0, policy.waistSideRest.heightMetres, 0),
  );
  // An elbow belongs at the actor's side, not at a weighted midpoint between
  // shoulder and a travelling palm. Its small movement is independent of the
  // club/hand path, giving a human, non-frozen rig without letting a throw
  // pull the upper arm out in front of the torso.
  const time = finite(playheadBeats);
  const phase = phaseFor(`elbow:${person.id}:${hand}`);
  const lateralExcursion = Math.sin(TAU * time / 17 + phase) * policy.independentExcursion.lateralMetres;
  const forwardExcursion = Math.cos(TAU * time / 13 + phase * 1.2) * policy.independentExcursion.forwardMetres;
  const verticalExcursion = Math.sin(TAU * time / 11 + phase * 0.7) * policy.independentExcursion.verticalMetres;
  const elbow = add(
    add(
      add(rest, scale(right, sign * lateralExcursion)),
      scale(forward, forwardExcursion),
    ),
    vector(0, verticalExcursion, 0),
  );
  const shoulderToElbow = subtract(elbow, shoulder);
  const elbowToPalm = subtract(palm, elbow);
  const elbowToShoulder = scale(shoulderToElbow, -1);
  const elbowExtensionRadians = Math.acos(clamp(
    dot(normalize(elbowToShoulder, UP), normalize(elbowToPalm, DOWN)),
    -1,
    1,
  ));
  return {
    elbow,
    rest,
    excursionMetres: length(subtract(elbow, rest)),
    local: {
      frontMetres: dot(subtract(elbow, bodyPosition), forward),
      outwardMetres: sign * dot(subtract(elbow, bodyPosition), right),
      heightMetres: elbow.y - bodyPosition.y,
    },
    upperArmMetres: length(shoulderToElbow),
    forearmMetres: length(elbowToPalm),
    elbowExtensionRadians,
  };
}

function countInArmKinematics(person, bodyPosition, hand, shoulder, palm, playheadBeats, swingProgress) {
  // The normal side-elbow policy remains the exact Earth/Pass endpoint. Sky
  // is the one intentional exception: the upper arm and elbow swing up with
  // the hand, so the raised club reads as a whole-arm count-in rather than a
  // static arm plus a spinning wrist.
  const rest = tuckedArmKinematics(person, bodyPosition, hand, shoulder, palm, playheadBeats);
  const progress = clamp(swingProgress, 0, 1);
  const sign = handSignFor(hand);
  const right = rightFor(person);
  const forward = forwardFor(person);
  const policy = FOUR_COUNT_3D_COUNT_IN_ARM_POLICY;
  const skyElbow = add(
    add(
      add(bodyPosition, scale(right, sign * policy.skyElbowOutwardMetres)),
      scale(forward, policy.skyElbowForwardMetres),
    ),
    vector(0, policy.skyElbowHeightMetres, 0),
  );
  const elbow = lerpVector(rest.elbow, skyElbow, progress);
  const shoulderToElbow = subtract(elbow, shoulder);
  const elbowToPalm = subtract(palm, elbow);
  const elbowToShoulder = scale(shoulderToElbow, -1);
  const elbowExtensionRadians = Math.acos(clamp(
    dot(normalize(elbowToShoulder, UP), normalize(elbowToPalm, DOWN)),
    -1,
    1,
  ));
  return {
    elbow,
    rest: rest.rest,
    excursionMetres: length(subtract(elbow, rest.rest)),
    local: {
      frontMetres: dot(subtract(elbow, bodyPosition), forward),
      outwardMetres: sign * dot(subtract(elbow, bodyPosition), right),
      heightMetres: elbow.y - bodyPosition.y,
    },
    upperArmMetres: length(shoulderToElbow),
    forearmMetres: length(elbowToPalm),
    elbowExtensionRadians,
    countIn: true,
    countInSwingProgress: progress,
  };
}

function readyAnchor(personId, hand, playheadBeats, clubId) {
  const person = performersById.get(personId);
  const side = hand === "left" ? -1 : 1;
  const base = add(
    add(
      person.position,
      scale(rightFor(person), side * FOUR_COUNT_3D_STAGE.readySideMetres),
    ),
    add(
      scale(forwardFor(person), FOUR_COUNT_3D_STAGE.readyForwardMetres),
      vector(0, FOUR_COUNT_3D_STAGE.readyBalanceHeightMetres, 0),
    ),
  );
  return add(base, humanAnchorVariation({ personId, hand, clubId, playheadBeats }));
}

// The down-side position is a visible rest pose, never an instantaneous throw
// origin. The active hand carries the club from `readyAnchor()` to this
// elbow-height, local-front anchor before release. Keep the club body down
// throughout the load so the subsequent pass has the specified down-body
// release and unwrapped 540-degree flight.
function throwReleaseAnchor(personId, hand, playheadBeats, clubId, balanceHeightMetres = FOUR_COUNT_3D_STAGE.throwReleaseBalanceHeightMetres, sideMetres = FOUR_COUNT_3D_STAGE.throwReleaseSideMetres) {
  const person = performersById.get(personId);
  const side = hand === "left" ? -1 : 1;
  const base = add(
    add(
      person.position,
      scale(rightFor(person), side * sideMetres),
    ),
    add(
      scale(forwardFor(person), FOUR_COUNT_3D_STAGE.throwReleaseForwardMetres),
      vector(0, balanceHeightMetres, 0),
    ),
  );
  return add(base, humanAnchorVariation({ personId, hand, clubId, playheadBeats }));
}

function selfCatchAnchor(personId, hand, playheadBeats, clubId) {
  const person = performersById.get(personId);
  const side = hand === "left" ? -1 : 1;
  const base = add(
    add(
      person.position,
      scale(rightFor(person), side * FOUR_COUNT_3D_STAGE.selfCatchSideMetres),
    ),
    add(
      scale(forwardFor(person), FOUR_COUNT_3D_STAGE.selfCatchForwardMetres),
      vector(0, FOUR_COUNT_3D_STAGE.selfCatchBalanceHeightMetres, 0),
    ),
  );
  return add(base, humanAnchorVariation({ personId, hand, clubId, playheadBeats }));
}

function passCatchGripAnchor(personId, hand, playheadBeats, clubId) {
  const person = performersById.get(personId);
  const fullVariation = humanAnchorVariation({ personId, hand, clubId, playheadBeats });
  // The named shoulder-front cue belongs to the receiving *hand/grip*, never
  // the club balance pivot. Derive the latter from the exact mesh handle seam
  // so the visible palm reaches shoulder height one foot in front rather than
  // silently catching the club 25 cm above its hand.
  const nonVerticalRemainder = subtract(fullVariation, torsoOffset(personId, playheadBeats));
  // A vertical-up catch places the balance pivot only 9.1 mm below the
  // head-height cap at its nominal shoulder cue. Preserve natural horizontal
  // variation, but let the quiet torso anchor own the vertical motion so a
  // decorative per-club jitter cannot send the real pivot above that cap.
  const lateralDepthOnly = vector(nonVerticalRemainder.x, 0, nonVerticalRemainder.z);
  const torso = add(person.position, torsoOffset(personId, playheadBeats));
  const side = hand === "left" ? -1 : 1;
  const grip = add(
    add(
      add(torso, scale(rightFor(person), side * FOUR_COUNT_3D_STAGE.passCatchSideMetres)),
      add(scale(forwardFor(person), FOUR_COUNT_3D_STAGE.passCatchForwardMetres), vector(0, FOUR_COUNT_3D_CATCH_HEIGHT_METRES, 0)),
    ),
    // `shoulderAnchor` already contains the correlated torso motion. Add the
    // horizontal remainder of the exact full variation instead of applying
    // torso motion twice or breaking the documented head-height cap.
    lateralDepthOnly,
  );
  return grip;
}

function quaternionMultiply(left, right) {
  return {
    x: left.w * right.x + left.x * right.w + left.y * right.z - left.z * right.y,
    y: left.w * right.y - left.x * right.z + left.y * right.w + left.z * right.x,
    z: left.w * right.z + left.x * right.y - left.y * right.x + left.z * right.w,
    w: left.w * right.w - left.x * right.x - left.y * right.y - left.z * right.z,
  };
}

function quaternionFromAxisAngle(axis, angle) {
  const unit = normalize(axis);
  const half = angle * 0.5;
  return { x: unit.x * Math.sin(half), y: unit.y * Math.sin(half), z: unit.z * Math.sin(half), w: Math.cos(half) };
}

function quaternionFromBasis(xAxis, yAxis, zAxis) {
  const m11 = xAxis.x; const m12 = yAxis.x; const m13 = zAxis.x;
  const m21 = xAxis.y; const m22 = yAxis.y; const m23 = zAxis.y;
  const m31 = xAxis.z; const m32 = yAxis.z; const m33 = zAxis.z;
  const trace = m11 + m22 + m33;
  if (trace > 0) { const s = 2 * Math.sqrt(trace + 1); return { x: (m32 - m23) / s, y: (m13 - m31) / s, z: (m21 - m12) / s, w: 0.25 * s }; }
  if (m11 > m22 && m11 > m33) { const s = 2 * Math.sqrt(1 + m11 - m22 - m33); return { x: 0.25 * s, y: (m12 + m21) / s, z: (m13 + m31) / s, w: (m32 - m23) / s }; }
  if (m22 > m33) { const s = 2 * Math.sqrt(1 + m22 - m11 - m33); return { x: (m12 + m21) / s, y: 0.25 * s, z: (m23 + m32) / s, w: (m13 - m31) / s }; }
  const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
  return { x: (m13 + m31) / s, y: (m23 + m32) / s, z: 0.25 * s, w: (m32 - m23) / s };
}

function quaternionForDirection(direction, horizontal) {
  const yAxis = normalize(direction, DOWN);
  let zAxis = normalize(subtract(horizontal, scale(yAxis, dot(horizontal, yAxis))), vector(0, 0, 1));
  let xAxis = normalize(cross(yAxis, zAxis), vector(1, 0, 0));
  zAxis = normalize(cross(xAxis, yAxis), zAxis);
  return quaternionFromBasis(xAxis, yAxis, zAxis);
}

function quaternionSlerp(from, to, amount) {
  let cosine = from.x * to.x + from.y * to.y + from.z * to.z + from.w * to.w;
  let target = to;
  if (cosine < 0) { cosine = -cosine; target = { x: -to.x, y: -to.y, z: -to.z, w: -to.w }; }
  if (cosine > 0.9995) return normalizeQuaternion({ x: mix(from.x, target.x, amount), y: mix(from.y, target.y, amount), z: mix(from.z, target.z, amount), w: mix(from.w, target.w, amount) });
  const theta = Math.acos(clamp(cosine, -1, 1));
  const sine = Math.sin(theta);
  const startWeight = Math.sin((1 - amount) * theta) / sine;
  const targetWeight = Math.sin(amount * theta) / sine;
  return { x: from.x * startWeight + target.x * targetWeight, y: from.y * startWeight + target.y * targetWeight, z: from.z * startWeight + target.z * targetWeight, w: from.w * startWeight + target.w * targetWeight };
}

function normalizeQuaternion(quaternion) {
  const magnitude = Math.hypot(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  return magnitude > 1e-9 ? { x: quaternion.x / magnitude, y: quaternion.y / magnitude, z: quaternion.z / magnitude, w: quaternion.w / magnitude } : { x: 0, y: 0, z: 0, w: 1 };
}

function continuousRotationTrack(startQuaternion, releaseDirection, spinRadians, flightSeconds, {
  throwAxisWorld: explicitThrowAxisWorld = null,
} = {}) {
  // The axis is authored in world space, rather than reverse-engineered from
  // a canonicalised quaternion delta. That lets the hand stroke and the
  // ballistic throw share one signed, inspectable rotation through release.
  const throwAxisWorld = normalize(
    explicitThrowAxisWorld || cross(DOWN, releaseDirection),
    vector(1, 0, 0),
  );
  const loadAngleRadians = Math.acos(clamp(dot(DOWN, releaseDirection), -1, 1));
  const releaseQuaternion = normalizeQuaternion(quaternionMultiply(
    quaternionFromAxisAngle(throwAxisWorld, loadAngleRadians),
    startQuaternion,
  ));
  const primaryFlightEndQuaternion = normalizeQuaternion(quaternionMultiply(
    quaternionFromAxisAngle(throwAxisWorld, spinRadians),
    releaseQuaternion,
  ));
  // The load begins at rest and reaches exactly the signed primary flight
  // rate at release. This monotonic cubic has no endpoint velocity jump.
  const endpointSlope = loadAngleRadians > 1e-9
    ? clamp(
      spinRadians * FOUR_COUNT_3D_FORWARD_LOAD_SECONDS / (loadAngleRadians * flightSeconds),
      0.25,
      2.75,
    )
    : 1;
  return freeze({
    throwAxisWorld: freeze(cloneVector(throwAxisWorld)),
    loadAngleRadians,
    loadEndSlope: endpointSlope,
    flightSpinRadians: spinRadians,
    startQuaternion: freeze({ ...startQuaternion }),
    releaseQuaternion: freeze({ ...releaseQuaternion }),
    primaryFlightEndQuaternion: freeze({ ...primaryFlightEndQuaternion }),
  });
}

function loadRotationProgress(progress, endpointSlope) {
  const time = clamp(progress, 0, 1);
  return (endpointSlope - 2) * time ** 3 + (3 - endpointSlope) * time ** 2;
}

function loadRotationProgressDerivative(progress, endpointSlope) {
  const time = clamp(progress, 0, 1);
  return 3 * (endpointSlope - 2) * time ** 2 + 2 * (3 - endpointSlope) * time;
}

function loadOrientation(track, progress) {
  return normalizeQuaternion(quaternionMultiply(
    quaternionFromAxisAngle(
      track.throwAxisWorld,
      track.loadAngleRadians * loadRotationProgress(progress, track.loadEndSlope),
    ),
    track.startQuaternion,
  ));
}

function flightOrientation(track, progress) {
  const amount = clamp(progress, 0, 1);
  return normalizeQuaternion(quaternionMultiply(
    quaternionFromAxisAngle(
      track.throwAxisWorld,
      track.flightSpinRadians * amount,
    ),
    track.releaseQuaternion,
  ));
}

function flightAngularVelocity(track, flightSeconds) {
  const radiansPerSecond = track.flightSpinRadians / flightSeconds;
  return {
    axisWorld: track.throwAxisWorld,
    radiansPerSecond,
  };
}

function quaternionRotateVector(quaternion, value) {
  const q = normalizeQuaternion(quaternion);
  const vectorQuaternion = { x: value.x, y: value.y, z: value.z, w: 0 };
  const inverse = { x: -q.x, y: -q.y, z: -q.z, w: q.w };
  const rotated = quaternionMultiply(quaternionMultiply(q, vectorQuaternion), inverse);
  return vector(rotated.x, rotated.y, rotated.z);
}

function eventAt(patternId, sourcePersonId, launchBeat) {
  const adapter = physicalTwoPersonAdapterFor(patternId);
  const phraseBeat = mod(launchBeat, adapter.loopBeats);
  const spec = adapter.schedule[phraseBeat].events[sourcePersonId];
  if (!spec) throw new RangeError(`${patternId} has no declared event for ${sourcePersonId} at beat ${phraseBeat}`);
  const targetPersonId = spec.target;
  return freeze({
    patternId,
    launchBeat,
    phraseBeat,
    sourcePersonId,
    targetPersonId,
    hand: spec.hand,
    catchHand: spec.catchHand,
    kind: spec.kind,
    label: spec.kind === "pass"
      ? `synchronised ${spec.hand}-hand 540° single pass`
      : `${spec.hand} self`,
  });
}

function nextEvent(event) {
  return eventAt(
    event.patternId,
    event.targetPersonId,
    event.launchBeat + FOUR_COUNT_3D_THROW_CYCLE_BEATS,
  );
}

const tokenAnchorsFor = (patternId) => freeze(FOUR_COUNT_3D_STAGE.people.flatMap((person) => [0, 1, 2].map((launchBeat, index) => freeze({
  id: `${person.id}-club-${index + 1}`,
  homePersonId: person.id,
  event: eventAt(patternId, person.id, launchBeat),
}))));

const PHYSICAL_TWO_PERSON_TOKEN_ANCHORS = Object.freeze(
  Object.fromEntries(PHYSICAL_TWO_PERSON_PATTERN_IDS.map((id) => [id, tokenAnchorsFor(id)])),
);
const TOKEN_ANCHORS = PHYSICAL_TWO_PERSON_TOKEN_ANCHORS[FOUR_COUNT_3D_PATTERN_ID];

// The opening allocation is not an invented R/L/R pose. It is derived from
// the first three declared events for each performer: clubs sharing the same
// scheduled hand form an explicit carry bundle, ordered by their actual
// launch beats. The first launch owns the visible palm; the later launch is
// a tightly controlled second seam in that same hand until Pass begins.
function countInCarryPlanFor(anchor) {
  const anchors = PHYSICAL_TWO_PERSON_TOKEN_ANCHORS[anchor.event.patternId];
  const group = anchors
    .filter((candidate) => candidate.homePersonId === anchor.homePersonId && candidate.event.hand === anchor.event.hand)
    .sort((left, right) => left.event.launchBeat - right.event.launchBeat);
  const carrySlot = group.findIndex((candidate) => candidate.id === anchor.id);
  if (carrySlot < 0 || group.length === 0) throw new RangeError(`count-in carry plan cannot find ${anchor.id}`);
  return freeze({
    personId: anchor.homePersonId,
    hand: anchor.event.hand,
    carrySlot,
    primary: group[0],
    group: freeze(group),
  });
}

function countInPersonStaggerBeats(personId) {
  // Keep the initial count human rather than mechanically simultaneous. Both
  // hands and every club of a given juggler use exactly the same offset.
  return personId === "left" ? 0 : FOUR_COUNT_3D_COUNT_IN_ARM_POLICY.skyStaggerBeats;
}

function countInSwingProgress(personId, playheadBeats) {
  const playhead = finite(playheadBeats);
  if (playhead >= -1) return 1 - smootherstep(playhead + 1);
  const skyFraction = (playhead + 2 - countInPersonStaggerBeats(personId))
    / FOUR_COUNT_3D_COUNT_IN_ARM_POLICY.skyTravelBeats;
  return smootherstep(skyFraction);
}

function currentEventForToken(anchor, playheadBeats) {
  if (playheadBeats < anchor.event.launchBeat) return null;
  let current = anchor.event;
  // Each token launches every three beats. The timeline begins causally after
  // Earth, so no pre-roll invents an incoming club before the initial pass.
  while (current.launchBeat + FOUR_COUNT_3D_THROW_CYCLE_BEATS <= playheadBeats + 1e-10) current = nextEvent(current);
  return current;
}

function handTimeline(flightBeats) {
  // A schedule beat means "begin this throw's hand stroke", rather than an
  // invisible instantaneous release. This lets Earth finish at the honest
  // down-side ready pose; Pass then starts the shared, readable forward load.
  // Every scheduled throw has the same release offset, so cadence and event
  // ordering remain exact even though ballistic flight begins later.
  const forwardLoadEnd = FOUR_COUNT_3D_FORWARD_LOAD_BEATS;
  const flightEnd = forwardLoadEnd + flightBeats;
  const recoveryBeats = FOUR_COUNT_3D_THROW_CYCLE_BEATS - flightEnd;
  const recoveryFraction = FOUR_COUNT_3D_HAND_PATH_FRACTIONS.catch
    + FOUR_COUNT_3D_HAND_PATH_FRACTIONS.return
    + FOUR_COUNT_3D_HAND_PATH_FRACTIONS.ready;
  const catchBeats = recoveryBeats * FOUR_COUNT_3D_HAND_PATH_FRACTIONS.catch / recoveryFraction;
  const returnBeats = recoveryBeats * FOUR_COUNT_3D_HAND_PATH_FRACTIONS.return / recoveryFraction;
  const readyBeats = recoveryBeats * FOUR_COUNT_3D_HAND_PATH_FRACTIONS.ready / recoveryFraction;
  return freeze({
    flightBeats,
    forwardLoadEnd,
    flightStart: forwardLoadEnd,
    flightEnd,
    catchEnd: flightEnd + catchBeats,
    returnEnd: flightEnd + catchBeats + returnBeats,
    readyEnd: flightEnd + catchBeats + returnBeats + readyBeats,
  });
}

function ballisticGeometry(anchor, event, { catchAnchor, flightSeconds, flightBeats }) {
  const source = performersById.get(event.sourcePersonId);
  const timeline = handTimeline(flightBeats);
  const releaseBeat = event.launchBeat + timeline.flightStart;
  const isPass = event.kind === "pass";
  const release = throwReleaseAnchor(
    source.id,
    event.hand,
    releaseBeat,
    anchor.id,
    isPass ? FOUR_COUNT_3D_STAGE.passThrowReleaseBalanceHeightMetres : FOUR_COUNT_3D_STAGE.throwReleaseBalanceHeightMetres,
    isPass ? FOUR_COUNT_3D_STAGE.passThrowReleaseSideMetres : FOUR_COUNT_3D_STAGE.throwReleaseSideMetres,
  );
  // A normal self inherits the local 45-degree front/cross-body handling
  // convention. A pass is deliberately different: it leaves body-down so a
  // single signed 3pi end-over-end rotation in the actual passing plane lands
  // it exactly body-up at the receiver's hand.
  const releaseDirection = isPass ? DOWN : clubDiagonalAxisFor(source.id, event.hand);
  const readyQuaternion = quaternionForDirection(DOWN, forwardFor(source));
  const spinRadians = isPass
    ? FOUR_COUNT_3D_PASS_SPIN_RADIANS
    : FOUR_COUNT_3D_SELF_SPIN_RADIANS;
  const referenceCatchBalance = catchAnchor(releaseBeat + flightBeats);
  const catchReferenceDirection = isPass
    ? UP
    : clubDiagonalAxisFor(event.targetPersonId, event.catchHand);
  const catchGripPosition = isPass
    ? referenceCatchBalance
    : gripPositionFor(referenceCatchBalance, catchReferenceDirection);
  const catchDirection = isPass ? UP : null;
  const catchPosition = isPass
    ? balancePositionForGrip(catchGripPosition, UP)
    : null;
  const horizontal = normalize(
    vector((catchPosition || referenceCatchBalance).x - release.x, 0, (catchPosition || referenceCatchBalance).z - release.z),
    forwardFor(source),
  );
  // The pass plane is `span(horizontalPath, UP)`. Its normal is an authored
  // world axis, so finite differences do not have to infer a shortest arc
  // from quaternions (which was the source of earlier perceived reversals).
  const passPlaneNormal = normalize(cross(horizontal, UP), rightFor(source));
  const rotationTrack = continuousRotationTrack(
    readyQuaternion,
    releaseDirection,
    spinRadians,
    flightSeconds,
    isPass ? { throwAxisWorld: passPlaneNormal } : undefined,
  );
  const resolvedCatchDirection = catchDirection || normalize(
    quaternionRotateVector(rotationTrack.primaryFlightEndQuaternion, UP),
    releaseDirection,
  );
  const resolvedCatchPosition = catchPosition || balancePositionForGrip(catchGripPosition, resolvedCatchDirection);
  // A 3pi rotation of DOWN around the path-plane normal is exactly UP. Keep a
  // hard contract here so a future quaternion change cannot make catch pose
  // look right through a post-flight snap while the sampled physics is wrong.
  if (isPass && dot(
    normalize(quaternionRotateVector(rotationTrack.primaryFlightEndQuaternion, UP), UP),
    UP,
  ) < 1 - 1e-10) {
    throw new RangeError("path-plane 3pi pass must arrive vertically body-up");
  }
  const horizontalVelocity = vector(
    (resolvedCatchPosition.x - release.x) / flightSeconds,
    0,
    (resolvedCatchPosition.z - release.z) / flightSeconds,
  );
  // Keep the gravity-derived nominal duration fixed, then solve the launch
  // velocity against the deterministic endpoints. This lands exactly while
  // retaining -9.80665 m/s² at 1×; it is not an eased animation duration.
  const launchVerticalVelocity = (
    resolvedCatchPosition.y - release.y
      + 0.5 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED * flightSeconds ** 2
  ) / flightSeconds;
  const apexTimeSeconds = launchVerticalVelocity / EARTH_GRAVITY_METRES_PER_SECOND_SQUARED;
  const apexHeightMetres = release.y
    + launchVerticalVelocity * apexTimeSeconds
    - 0.5 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED * apexTimeSeconds ** 2;
  const next = nextEvent(event);
  // Sample the two named hand endpoints at their own semantic times. The
  // recovery reaches `nextReady` before the following event starts its load,
  // so a deterministic variation cannot make a hand or club flicker across a
  // state boundary.
  const ready = readyAnchor(source.id, event.hand, event.launchBeat, anchor.id);
  const nextReady = readyAnchor(next.sourcePersonId, next.hand, next.launchBeat, anchor.id);
  const nextReadyQuaternion = quaternionForDirection(
    DOWN,
    forwardFor(performersById.get(next.sourcePersonId)),
  );
  return {
    loadStart: ready,
    release,
    catchPosition: resolvedCatchPosition,
    releaseDirection,
    releaseGripPosition: gripPositionFor(release, releaseDirection),
    ready,
    nextReady,
    nextEvent: next,
    timeline,
    horizontal,
    passPlaneNormal: isPass ? passPlaneNormal : null,
    horizontalVelocity,
    launchVerticalVelocity,
    apexTimeSeconds,
    apexHeightMetres,
    flightSeconds,
    sourceShoulder: shoulderAnchor(source.id, event.hand, releaseBeat),
    targetShoulder: shoulderAnchor(event.targetPersonId, event.catchHand, releaseBeat + flightBeats),
    readyQuaternion,
    nextReadyQuaternion,
    releaseQuaternion: rotationTrack.releaseQuaternion,
    catchDirection: resolvedCatchDirection,
    catchGripPosition,
    catchReferenceDirection,
    spinRadians,
    spinSemantics: FOUR_COUNT_3D_CLUB_HANDLING_POLICY.spinSemantics,
    rotationTrack,
  };
}

function selfGeometry(anchor, event) {
  return ballisticGeometry(anchor, event, {
    catchAnchor: (catchBeat) => selfCatchAnchor(
      event.targetPersonId,
      event.catchHand,
      catchBeat,
      anchor.id,
    ),
    flightSeconds: FOUR_COUNT_3D_SELF_FLIGHT_SECONDS,
    flightBeats: FOUR_COUNT_3D_SELF_FLIGHT_BEATS,
  });
}

function passGeometry(anchor, event) {
  return ballisticGeometry(anchor, event, {
    // Pass geometry takes the exact named shoulder-front *grip* point and
    // derives its vertically-up balance pivot from that seam contact.
    catchAnchor: (catchBeat) => passCatchGripAnchor(
      event.targetPersonId,
      event.catchHand,
      catchBeat,
      anchor.id,
    ),
    flightSeconds: FOUR_COUNT_3D_PASS_FLIGHT_SECONDS,
    flightBeats: FOUR_COUNT_3D_PASS_FLIGHT_BEATS,
  });
}

function ballisticPosition(geometry, flightSeconds) {
  const time = clamp(flightSeconds, 0, geometry.flightSeconds);
  return vector(
    geometry.release.x + geometry.horizontalVelocity.x * time,
    geometry.release.y + geometry.launchVerticalVelocity * time
      - 0.5 * EARTH_GRAVITY_METRES_PER_SECOND_SQUARED * time ** 2,
    geometry.release.z + geometry.horizontalVelocity.z * time,
  );
}

function spinningFlightPose(phase, geometry) {
  const flightProgress = clamp(phase / geometry.timeline.flightBeats, 0, 1);
  const quaternion = flightOrientation(geometry.rotationTrack, flightProgress);
  const angular = flightAngularVelocity(geometry.rotationTrack, geometry.flightSeconds);
  return {
    position: ballisticPosition(geometry, phase * FOUR_COUNT_3D_BEAT_SECONDS),
    direction: normalize(quaternionRotateVector(quaternion, UP), geometry.releaseDirection),
    quaternion,
    spinRadians: geometry.spinRadians * flightProgress,
    orientationRadians: geometry.rotationTrack.loadAngleRadians + geometry.spinRadians * flightProgress,
    unwrappedThrowPhaseRadians: geometry.rotationTrack.loadAngleRadians + geometry.spinRadians * flightProgress,
    angularVelocityRadiansPerSecond: angular.radiansPerSecond,
    angularVelocityAxisWorld: angular.axisWorld,
    primaryThrowAxisWorld: geometry.rotationTrack.throwAxisWorld,
  };
}

function releasePose(geometry) {
  const angular = flightAngularVelocity(geometry.rotationTrack, geometry.flightSeconds);
  return {
    position: geometry.release,
    direction: geometry.releaseDirection,
    quaternion: geometry.releaseQuaternion,
    airborne: true,
    holder: null,
    release: geometry.release,
    catchPosition: geometry.catchPosition,
    ready: geometry.ready,
    flightProgress: 0,
    returnProgress: 1,
    loadProgress: 1,
    spinRadians: 0,
    orientationRadians: geometry.rotationTrack.loadAngleRadians,
    unwrappedThrowPhaseRadians: geometry.rotationTrack.loadAngleRadians,
    angularVelocityRadiansPerSecond: angular.radiansPerSecond,
    angularVelocityAxisWorld: angular.axisWorld,
    primaryThrowAxisWorld: geometry.rotationTrack.throwAxisWorld,
    motionState: "release",
  };
}

function forwardLoadPose({
  start,
  release,
  holder,
  catchPosition,
  startDirection = DOWN,
  releaseDirection,
  startQuaternion,
  releaseQuaternion,
  rotationTrack,
}, progress) {
  const amount = smoothstep(clamp(progress, 0, 1));
  const diagonal = releaseDirection || DOWN;
  const orientationProgress = rotationTrack
    ? loadRotationProgress(progress, rotationTrack.loadEndSlope)
    : amount;
  const quaternion = rotationTrack
    ? loadOrientation(rotationTrack, progress)
    : quaternionSlerp(startQuaternion || quaternionForDirection(startDirection, DOWN), releaseQuaternion || quaternionForDirection(diagonal, DOWN), amount);
  const direction = normalize(quaternionRotateVector(quaternion, UP), diagonal);
  const angularVelocityRadiansPerSecond = rotationTrack
    ? rotationTrack.loadAngleRadians
      * loadRotationProgressDerivative(progress, rotationTrack.loadEndSlope)
      / FOUR_COUNT_3D_FORWARD_LOAD_SECONDS
    : 0;
  // The palm owns this stroke. Interpolate the real knob/handle contact point
  // first, then derive the balance pivot for the rotating mesh. Interpolating
  // balance points would make the grip briefly drift backwards while a
  // down-pointing club turns diagonal, recreating the detached side launch.
  const grip = lerpVector(
    gripPositionFor(start, startDirection),
    gripPositionFor(release, diagonal),
    amount,
  );
  return {
    position: balancePositionForGrip(grip, direction),
    direction,
    quaternion,
    airborne: false,
    holder,
    release,
    catchPosition,
    ready: start,
    flightProgress: 0,
    returnProgress: 1,
    loadProgress: amount,
    spinRadians: 0,
    orientationRadians: rotationTrack ? rotationTrack.loadAngleRadians * orientationProgress : 0,
    unwrappedThrowPhaseRadians: rotationTrack ? rotationTrack.loadAngleRadians * orientationProgress : 0,
    angularVelocityRadiansPerSecond,
    angularVelocityAxisWorld: rotationTrack?.throwAxisWorld || null,
    primaryThrowAxisWorld: rotationTrack?.throwAxisWorld || null,
    motionState: "forward-load",
  };
}

function postFlightPose(geometry, phase, catchPose) {
  const { timeline } = geometry;
  if (phase <= timeline.catchEnd) {
    return {
      position: geometry.catchPosition,
      direction: catchPose.direction,
      quaternion: catchPose.quaternion,
      airborne: false,
      holder: { personId: geometry.nextEvent.sourcePersonId, hand: geometry.nextEvent.hand },
      release: geometry.release,
      catchPosition: geometry.catchPosition,
      ready: geometry.nextReady,
      flightProgress: 1,
      returnProgress: 0,
      loadProgress: 0,
      spinRadians: catchPose.spinRadians,
      orientationRadians: catchPose.orientationRadians,
      unwrappedThrowPhaseRadians: catchPose.unwrappedThrowPhaseRadians,
      // The hand arrests the airborne rotation at the seam catch; subsequent
      // return motion is deliberately hand-connected rather than another
      // airborne transport.
      angularVelocityRadiansPerSecond: 0,
      angularVelocityAxisWorld: catchPose.angularVelocityAxisWorld,
      primaryThrowAxisWorld: catchPose.primaryThrowAxisWorld,
      motionState: "catch",
    };
  }
  if (phase <= timeline.returnEnd) {
    const amount = smoothstep((phase - timeline.catchEnd) / (timeline.returnEnd - timeline.catchEnd));
    return {
      position: lerpVector(geometry.catchPosition, geometry.nextReady, amount),
      direction: normalize(lerpVector(catchPose.direction, DOWN, amount), DOWN),
      // The club is now hand-connected. This is the first permitted receiver
      // reorientation after its uninterrupted world-frame airborne rotation.
      quaternion: quaternionSlerp(catchPose.quaternion, geometry.nextReadyQuaternion, amount),
      airborne: false,
      holder: { personId: geometry.nextEvent.sourcePersonId, hand: geometry.nextEvent.hand },
      release: geometry.release,
      catchPosition: geometry.catchPosition,
      ready: geometry.nextReady,
      flightProgress: 1,
      returnProgress: amount,
      loadProgress: 0,
      spinRadians: catchPose.spinRadians,
      orientationRadians: catchPose.orientationRadians,
      unwrappedThrowPhaseRadians: catchPose.unwrappedThrowPhaseRadians,
      angularVelocityRadiansPerSecond: 0,
      angularVelocityAxisWorld: catchPose.angularVelocityAxisWorld,
      primaryThrowAxisWorld: catchPose.primaryThrowAxisWorld,
      motionState: "return",
    };
  }
  if (phase <= timeline.readyEnd) {
    return {
      position: geometry.nextReady,
      direction: DOWN,
      quaternion: geometry.nextReadyQuaternion,
      airborne: false,
      holder: { personId: geometry.nextEvent.sourcePersonId, hand: geometry.nextEvent.hand },
      release: geometry.release,
      catchPosition: geometry.catchPosition,
      ready: geometry.nextReady,
      flightProgress: 1,
      returnProgress: 1,
      loadProgress: 0,
      spinRadians: catchPose.spinRadians,
      orientationRadians: catchPose.orientationRadians,
      unwrappedThrowPhaseRadians: catchPose.unwrappedThrowPhaseRadians,
      angularVelocityRadiansPerSecond: 0,
      angularVelocityAxisWorld: catchPose.angularVelocityAxisWorld,
      primaryThrowAxisWorld: catchPose.primaryThrowAxisWorld,
      motionState: "ready",
    };
  }
  // `currentEventForToken()` advances exactly at the next semantic schedule
  // beat, where that next event begins its own front-loading stroke.
  return {
    position: geometry.nextReady,
    direction: DOWN,
    quaternion: geometry.nextReadyQuaternion,
    airborne: false,
    holder: { personId: geometry.nextEvent.sourcePersonId, hand: geometry.nextEvent.hand },
    release: geometry.release,
    catchPosition: geometry.catchPosition,
    ready: geometry.nextReady,
    flightProgress: 1,
    returnProgress: 1,
    loadProgress: 0,
    spinRadians: catchPose.spinRadians,
    orientationRadians: catchPose.orientationRadians,
    unwrappedThrowPhaseRadians: catchPose.unwrappedThrowPhaseRadians,
    angularVelocityRadiansPerSecond: 0,
    angularVelocityAxisWorld: catchPose.angularVelocityAxisWorld,
    primaryThrowAxisWorld: catchPose.primaryThrowAxisWorld,
    motionState: "ready",
  };
}

function selfClubPose(anchor, event, phase) {
  const geometry = selfGeometry(anchor, event);
  const { timeline } = geometry;
  if (phase < timeline.flightStart - 1e-10) {
    return forwardLoadPose({
      start: geometry.loadStart,
      release: geometry.release,
      holder: { personId: event.sourcePersonId, hand: event.hand },
      catchPosition: geometry.catchPosition,
      startDirection: DOWN,
      releaseDirection: geometry.releaseDirection,
      startQuaternion: geometry.readyQuaternion,
      releaseQuaternion: geometry.releaseQuaternion,
      rotationTrack: geometry.rotationTrack,
    }, phase / timeline.forwardLoadEnd);
  }
  if (Math.abs(phase - timeline.flightStart) <= 1e-10) return releasePose(geometry);
  const flightPhase = phase - timeline.flightStart;
  if (flightPhase < FOUR_COUNT_3D_SELF_FLIGHT_BEATS - 1e-10) {
    const pose = spinningFlightPose(flightPhase, geometry);
    return {
      ...pose,
      airborne: true,
      holder: null,
      release: geometry.release,
      catchPosition: geometry.catchPosition,
      ready: geometry.ready,
      flightProgress: clamp(flightPhase / FOUR_COUNT_3D_SELF_FLIGHT_BEATS, 0, 1),
      returnProgress: 0,
      loadProgress: 1,
      motionState: "flight",
    };
  }
  const catchPose = spinningFlightPose(FOUR_COUNT_3D_SELF_FLIGHT_BEATS, geometry);
  return postFlightPose(geometry, phase, catchPose);
}

export function sampleFourCountPassGeometry({ sourcePersonId = "left", launchBeat = 0, clubId = "left-club-1" } = {}) {
  const event = eventAt(FOUR_COUNT_3D_PATTERN_ID, sourcePersonId, launchBeat);
  if (event.kind !== "pass") throw new RangeError("requested launch beat is not a four-count pass");
  const geometry = passGeometry({ id: clubId }, event);
  return freeze({
    sourcePersonId: event.sourcePersonId,
    targetPersonId: event.targetPersonId,
    hand: event.hand,
    catchHand: event.catchHand,
    release: freeze(cloneVector(geometry.release)),
    catchPosition: freeze(cloneVector(geometry.catchPosition)),
    ready: freeze(cloneVector(geometry.ready)),
    releaseGripPosition: freeze(cloneVector(geometry.releaseGripPosition)),
    catchGripPosition: freeze(cloneVector(geometry.catchGripPosition)),
    releaseDirection: freeze(cloneVector(geometry.releaseDirection)),
    catchDirection: freeze(cloneVector(geometry.catchDirection)),
    catchReferenceDirection: freeze(cloneVector(geometry.catchReferenceDirection)),
    throwAxisWorld: freeze(cloneVector(geometry.rotationTrack.throwAxisWorld)),
    sourceShoulder: freeze(cloneVector(geometry.sourceShoulder)),
    targetShoulder: freeze(cloneVector(geometry.targetShoulder)),
    horizontal: freeze(cloneVector(geometry.horizontal)),
    physics: freeze({
      gravityMetresPerSecondSquared: EARTH_GRAVITY_METRES_PER_SECOND_SQUARED,
      flightSeconds: geometry.flightSeconds,
      launchVelocity: freeze(vector(
        geometry.horizontalVelocity.x,
        geometry.launchVerticalVelocity,
        geometry.horizontalVelocity.z,
      )),
      apexTimeSeconds: geometry.apexTimeSeconds,
      apexHeightMetres: geometry.apexHeightMetres,
    }),
    spinRadians: FOUR_COUNT_3D_PASS_SPIN_RADIANS,
    spinTurns: FOUR_COUNT_3D_PASS_TURNS,
    spinSemantics: geometry.spinSemantics,
  });
}

function passClubPose(anchor, event, phase) {
  const geometry = passGeometry(anchor, event);
  const { timeline } = geometry;
  if (phase < timeline.flightStart - 1e-10) {
    return forwardLoadPose({
      start: geometry.loadStart,
      release: geometry.release,
      holder: { personId: event.sourcePersonId, hand: event.hand },
      catchPosition: geometry.catchPosition,
      startDirection: DOWN,
      releaseDirection: geometry.releaseDirection,
      startQuaternion: geometry.readyQuaternion,
      releaseQuaternion: geometry.releaseQuaternion,
      rotationTrack: geometry.rotationTrack,
    }, phase / timeline.forwardLoadEnd);
  }
  if (Math.abs(phase - timeline.flightStart) <= 1e-10) return releasePose(geometry);
  const flightPhase = phase - timeline.flightStart;
  if (flightPhase < FOUR_COUNT_3D_PASS_FLIGHT_BEATS - 1e-10) {
    const pose = spinningFlightPose(flightPhase, geometry);
    return {
      ...pose,
      airborne: true,
      release: geometry.release,
      catchPosition: geometry.catchPosition,
      ready: geometry.ready,
      flightProgress: clamp(flightPhase / FOUR_COUNT_3D_PASS_FLIGHT_BEATS, 0, 1),
      returnProgress: 0,
      loadProgress: 1,
      motionState: "flight",
      holder: null,
    };
  }
  return postFlightPose(
    geometry,
    phase,
    spinningFlightPose(FOUR_COUNT_3D_PASS_FLIGHT_BEATS, geometry),
  );
}

function freezeClub(value) {
  const contacts = clubContactPoints(value.position, value.direction);
  const next = {
    ...value,
    position: freeze(cloneVector(value.position)),
    direction: freeze(cloneVector(value.direction)),
    quaternion: freeze({ ...value.quaternion }),
    // The viewer/rig uses this seam contact for the palm. Keep the tip and
    // cap separately visible to callers so an exact hand contact never
    // weakens the full physical club collision/inventory model.
    knobPosition: freeze(cloneVector(contacts.knobPosition)),
    gripPosition: freeze(cloneVector(contacts.knobPosition)),
    knobTipPosition: freeze(cloneVector(contacts.knobTipPosition)),
    capPosition: freeze(cloneVector(contacts.capPosition)),
  };
  if (value.release) next.release = freeze(cloneVector(value.release));
  if (value.catchPosition) next.catchPosition = freeze(cloneVector(value.catchPosition));
  if (value.readyPosition) next.readyPosition = freeze(cloneVector(value.readyPosition));
  if (value.angularVelocityAxisWorld) next.angularVelocityAxisWorld = freeze(cloneVector(value.angularVelocityAxisWorld));
  if (value.primaryThrowAxisWorld) next.primaryThrowAxisWorld = freeze(cloneVector(value.primaryThrowAxisWorld));
  if (value.holder) next.holder = freeze({ ...value.holder });
  return freeze(next);
}

function prelaunchClubPose(anchor, playheadBeats) {
  const event = anchor.event;
  const position = readyAnchor(event.sourcePersonId, event.hand, playheadBeats, anchor.id);
  return freezeClub({
    id: anchor.id,
    homePersonId: anchor.homePersonId,
    state: "held",
    motionState: "ready",
    holder: { personId: event.sourcePersonId, hand: event.hand },
    holderPersonId: event.sourcePersonId,
    sourcePersonId: event.sourcePersonId,
    targetPersonId: event.sourcePersonId,
    hand: event.hand,
    catchHand: event.hand,
    kind: "ready",
    launchBeat: event.launchBeat,
    phraseBeat: event.phraseBeat,
    position,
    direction: DOWN,
    quaternion: quaternionForDirection(DOWN, forwardFor(performersById.get(event.sourcePersonId))),
    release: position,
    catchPosition: position,
    readyPosition: position,
    flightProgress: 0,
    returnProgress: 1,
    spinRadians: 0,
    spinTurns: 0,
  });
}

function clubPose(anchor, playheadBeats) {
  const event = currentEventForToken(anchor, playheadBeats);
  if (!event) return prelaunchClubPose(anchor, playheadBeats);
  const phase = clamp(playheadBeats - event.launchBeat, 0, FOUR_COUNT_3D_THROW_CYCLE_BEATS);
  const pose = event.kind === "pass" ? passClubPose(anchor, event, phase) : selfClubPose(anchor, event, phase);
  const inFlight = pose.airborne === true;
  return freezeClub({
    id: anchor.id,
    homePersonId: anchor.homePersonId,
    state: inFlight ? "airborne" : "held",
    motionState: pose.motionState,
    holder: pose.holder,
    holderPersonId: pose.holder?.personId || null,
    sourcePersonId: event.sourcePersonId,
    targetPersonId: event.targetPersonId,
    hand: event.hand,
    catchHand: event.catchHand,
    kind: event.kind,
    label: event.label,
    launchBeat: event.launchBeat,
    phraseBeat: event.phraseBeat,
    eventPhase: phase,
    position: pose.position,
    direction: pose.direction,
    quaternion: pose.quaternion,
    release: pose.release,
    catchPosition: pose.catchPosition,
    readyPosition: pose.ready,
    flightProgress: pose.flightProgress,
    returnProgress: pose.returnProgress,
    spinRadians: pose.spinRadians,
    spinTurns: pose.spinRadians / TAU,
    orientationRadians: pose.orientationRadians ?? 0,
    unwrappedThrowPhaseRadians: pose.unwrappedThrowPhaseRadians ?? 0,
    angularVelocityRadiansPerSecond: pose.angularVelocityRadiansPerSecond ?? 0,
    angularVelocityAxisWorld: pose.angularVelocityAxisWorld || null,
    primaryThrowAxisWorld: pose.primaryThrowAxisWorld || null,
  });
}

function countInClubPose(anchor, playheadBeats) {
  const person = performersById.get(anchor.homePersonId);
  const hand = anchor.event.hand;
  const carry = countInCarryPlanFor(anchor);
  const swingProgress = countInSwingProgress(person.id, playheadBeats);
  const policy = FOUR_COUNT_3D_COUNT_IN_ARM_POLICY;
  const sign = handSignFor(hand);
  const right = rightFor(person);
  const forward = forwardFor(person);

  // Earth is the exact pose used by normal causal playback at t=0. Interpolate
  // the **seam grip** in a carrier frame and derive the balance pivot after
  // orientation, rather than lifting one pivot and threshold-flipping its
  // axis. That removes the old half-metre knob jump and keeps a two-club
  // starting bundle rigid relative to its owning palm.
  const earthCarrierGrip = gripPositionFor(
    readyAnchor(person.id, hand, 0, carry.primary.id),
    DOWN,
  );
  const earthGrip = gripPositionFor(readyAnchor(person.id, hand, 0, anchor.id), DOWN);
  const earthQuaternion = quaternionForDirection(DOWN, forward);
  const inverseEarthQuaternion = {
    x: -earthQuaternion.x,
    y: -earthQuaternion.y,
    z: -earthQuaternion.z,
    w: earthQuaternion.w,
  };
  const localGripOffset = quaternionRotateVector(
    inverseEarthQuaternion,
    subtract(earthGrip, earthCarrierGrip),
  );
  const arc = Math.sin(Math.PI * swingProgress) ** 2;
  const carrierGrip = add(
    add(
      add(
        add(earthCarrierGrip, vector(0, policy.skyLiftMetres * swingProgress, 0)),
        scale(right, -sign * policy.skySideInwardMetres * swingProgress),
      ),
      scale(forward, policy.skyForwardMetres * swingProgress + policy.swingArcForwardMetres * arc),
    ),
    scale(right, sign * policy.swingArcSideMetres * arc),
  );
  // Down -> forward -> up is one continuous half-turn around the actor's
  // local right axis. The same carrier quaternion moves both clubs in a
  // starting bundle, so they cannot independently reverse-flip in the hand.
  const quaternion = normalizeQuaternion(quaternionMultiply(
    quaternionFromAxisAngle(right, Math.PI * swingProgress),
    earthQuaternion,
  ));
  const direction = normalize(quaternionRotateVector(quaternion, UP), DOWN);
  const gripPosition = add(carrierGrip, quaternionRotateVector(quaternion, localGripOffset));
  const position = balancePositionForGrip(gripPosition, direction);
  const countIn = freeze({
    phase: playheadBeats < -1 ? "sky" : "earth",
    swingProgress,
    carrierHand: hand,
    carrySlot: carry.carrySlot,
    primaryClubId: carry.primary.id,
    carrierGripPosition: freeze(cloneVector(carrierGrip)),
    carrierQuaternion: freeze({ ...quaternion }),
    localGripOffset: freeze(cloneVector(localGripOffset)),
    bundleContact: carry.carrySlot === 0 ? "primary-seam" : "secondary-seam-in-bundle",
  });
  return freezeClub({
    id: anchor.id,
    homePersonId: anchor.homePersonId,
    state: "held",
    motionState: "count-in",
    holder: { personId: person.id, hand },
    holderPersonId: person.id,
    sourcePersonId: person.id,
    targetPersonId: person.id,
    hand,
    catchHand: hand,
    kind: "count-in",
    launchBeat: null,
    phraseBeat: null,
    position,
    direction,
    quaternion,
    release: position,
    catchPosition: position,
    readyPosition: balancePositionForGrip(earthGrip, DOWN),
    flightProgress: 0,
    returnProgress: 1,
    spinRadians: 0,
    spinTurns: 0,
    countIn,
  });
}

function candidateForFlight(club, playheadBeats) {
  const candidates = [];
  const progress = club.flightProgress;
  const sourcePerson = performersById.get(club.sourcePersonId);
  const sourceRest = gripPositionFor(
    readyAnchor(club.sourcePersonId, club.hand, playheadBeats, `${club.sourcePersonId}-${club.hand}-rig`),
    DOWN,
  );
  // This is a hand-only follow-through after release, not a second attempt to
  // hold the airborne club. Rebase it on the fixed release seam so the wrist
  // completes a compact front-handling gesture instead of chasing a club up
  // its ballistic arc and pulling a straight upper arm after it.
  const releaseGrip = gripPositionFor(
    club.release,
    club.kind === "pass" ? DOWN : clubDiagonalAxisFor(sourcePerson, club.hand),
  );
  const followThrough = add(
    // Keep the release follow-through compact enough that a side-tucked elbow
    // does not manufacture a straight reaching arm. The airborne club owns
    // the travel; this wrist/forearm gesture just completes the throw.
    add(releaseGrip, scale(forwardFor(sourcePerson), 0.025)),
    vector(0, 0.02, 0),
  );
  if (progress <= 0.24) {
    candidates.push({
      personId: club.sourcePersonId,
      hand: club.hand,
      position: lerpVector(releaseGrip, followThrough, smoothstep(progress / 0.24)),
      mode: "throw-follow",
      influence: 0.82,
      clubId: club.id,
    });
  } else if (progress <= 0.50) {
    candidates.push({
      personId: club.sourcePersonId,
      hand: club.hand,
      position: lerpVector(followThrough, sourceRest, smoothstep((progress - 0.24) / 0.26)),
      mode: "throw-recovery",
      influence: 0.57,
      clubId: club.id,
    });
  }
  if (progress >= 0.70) {
    const targetRest = gripPositionFor(
      readyAnchor(club.targetPersonId, club.catchHand, playheadBeats, `${club.targetPersonId}-${club.catchHand}-rig`),
      DOWN,
    );
    candidates.push({
      personId: club.targetPersonId,
      hand: club.catchHand,
      position: lerpVector(targetRest, club.gripPosition, smoothstep((progress - 0.70) / 0.30)),
      mode: "catch-reach",
      influence: 0.84,
      clubId: club.id,
    });
  }
  return candidates;
}

function sampleHandKinematics(playheadBeats, clubs) {
  const hands = new Map(FOUR_COUNT_3D_STAGE.people.map((person) => [person.id, {
    left: { position: gripPositionFor(readyAnchor(person.id, "left", playheadBeats, `${person.id}-left-rig`), DOWN), mode: "ready", influence: 0, clubId: null },
    right: { position: gripPositionFor(readyAnchor(person.id, "right", playheadBeats, `${person.id}-right-rig`), DOWN), mode: "ready", influence: 0, clubId: null },
  }]));
  const countInClubs = clubs.filter((club) => club.motionState === "count-in");
  if (countInClubs.length > 0) {
    // Each Sky/Earth group has one actual palm position: the primary club's
    // seam. Its paired starting club is a bounded second seam in the same
    // rigid carrier frame; it must not win a competing, centre-grip palm.
    // This is deliberately the only interval where a hand carries two clubs.
    countInClubs.forEach((club) => {
      const countIn = club.countIn;
      if (!countIn) throw new RangeError(`${club.id} count-in club lacks its carrier frame`);
      const current = hands.get(club.holderPersonId)?.[countIn.carrierHand];
      if (!current || current.clubId === countIn.primaryClubId) return;
      hands.get(club.holderPersonId)[countIn.carrierHand] = {
        position: cloneVector(countIn.carrierGripPosition),
        mode: "count-in",
        influence: 1,
        clubId: countIn.primaryClubId,
        countInSwingProgress: countIn.swingProgress,
        countInPhase: countIn.phase,
        countInCarrierHand: countIn.carrierHand,
      };
    });
    return hands;
  }
  const apply = (candidate) => {
    const current = hands.get(candidate.personId)?.[candidate.hand];
    if (!current || current.influence > candidate.influence) return;
    hands.get(candidate.personId)[candidate.hand] = candidate;
  };
  clubs.forEach((club) => {
    if (club.motionState === "flight") {
      candidateForFlight(club, playheadBeats).forEach(apply);
      return;
    }
    if (club.motionState === "release") {
      apply({
        personId: club.sourcePersonId,
        hand: club.hand,
        position: club.gripPosition,
        mode: "release",
        influence: 0.98,
        clubId: club.id,
      });
      return;
    }
    if (club.holder) apply({
      personId: club.holder.personId,
      hand: club.holder.hand,
      position: club.gripPosition,
      mode: club.motionState,
      // Before its first causal launch, a club may be one of the two clubs
      // collected in the starting hand. Let the release follow-through lead
      // that hand briefly; the queued club itself still launches on schedule.
      // A physical ready club wins over a cosmetic follow-through candidate.
      // Otherwise the model can call a club "held" while drawing its palm
      // elsewhere, which is exactly the detached-centre-grip illusion this
      // pose policy is intended to eliminate. Flight arms still animate when
      // that hand has no hand-connected club to own.
      influence: club.motionState === "ready" ? 0.90 : 1,
      clubId: club.id,
    });
  });
  return hands;
}

function sampledPeople(playheadBeats, clubs) {
  const hands = sampleHandKinematics(playheadBeats, clubs);
  return freeze(FOUR_COUNT_3D_STAGE.people.map((person) => {
    const position = add(person.position, torsoOffset(person.id, playheadBeats));
    const orientation = fourCountOrientationFor(person);
    const left = hands.get(person.id).left;
    const right = hands.get(person.id).right;
    const shoulders = {
      left: shoulderAnchor(person.id, "left", playheadBeats),
      right: shoulderAnchor(person.id, "right", playheadBeats),
    };
    const arms = {
      left: left.mode === "count-in"
        ? countInArmKinematics(person, position, "left", shoulders.left, left.position, playheadBeats, left.countInSwingProgress)
        : tuckedArmKinematics(person, position, "left", shoulders.left, left.position, playheadBeats),
      right: right.mode === "count-in"
        ? countInArmKinematics(person, position, "right", shoulders.right, right.position, playheadBeats, right.countInSwingProgress)
        : tuckedArmKinematics(person, position, "right", shoulders.right, right.position, playheadBeats),
    };
    return freeze({
      id: person.id,
      name: person.name,
      position: freeze(position),
      headingRadians: orientation.headingRadians,
      visualYawRadians: orientation.visualYawRadians,
      forward: orientation.forward,
      right: orientation.right,
      partnerId: orientation.partnerId,
      hands: freeze({ left: freeze(cloneVector(left.position)), right: freeze(cloneVector(right.position)) }),
      handMotion: freeze({
        left: freeze({
          mode: left.mode,
          influence: left.influence,
          clubId: left.clubId,
          countInSwingProgress: left.countInSwingProgress ?? null,
          countInPhase: left.countInPhase ?? null,
        }),
        right: freeze({
          mode: right.mode,
          influence: right.influence,
          clubId: right.clubId,
          countInSwingProgress: right.countInSwingProgress ?? null,
          countInPhase: right.countInPhase ?? null,
        }),
      }),
      shoulders: freeze({ left: freeze(shoulders.left), right: freeze(shoulders.right) }),
      // The renderer consumes these sampled elbows rather than inventing a
      // camera-space midpoint. This keeps the tuck invariant true in audience
      // and either literal first-person camera.
      elbows: freeze({ left: freeze(cloneVector(arms.left.elbow)), right: freeze(cloneVector(arms.right.elbow)) }),
      arms: freeze({
        left: freeze({
          restElbow: freeze(cloneVector(arms.left.rest)),
          elbow: freeze(cloneVector(arms.left.elbow)),
          local: freeze({ ...arms.left.local }),
          excursionMetres: arms.left.excursionMetres,
          upperArmMetres: arms.left.upperArmMetres,
          forearmMetres: arms.left.forearmMetres,
          elbowExtensionRadians: arms.left.elbowExtensionRadians,
          countIn: arms.left.countIn === true,
          countInSwingProgress: arms.left.countInSwingProgress ?? null,
        }),
        right: freeze({
          restElbow: freeze(cloneVector(arms.right.rest)),
          elbow: freeze(cloneVector(arms.right.elbow)),
          local: freeze({ ...arms.right.local }),
          excursionMetres: arms.right.excursionMetres,
          upperArmMetres: arms.right.upperArmMetres,
          forearmMetres: arms.right.forearmMetres,
          elbowExtensionRadians: arms.right.elbowExtensionRadians,
          countIn: arms.right.countIn === true,
          countInSwingProgress: arms.right.countInSwingProgress ?? null,
        }),
      }),
    });
  }));
}

function closestPointOnSegment(point, start, end) {
  const axis = subtract(end, start);
  const denominator = dot(axis, axis);
  if (denominator <= 1e-12) return start;
  return add(start, scale(axis, clamp(dot(subtract(point, start), axis) / denominator, 0, 1)));
}

function segmentPointDistance(start, end, point) {
  return length(subtract(closestPointOnSegment(point, start, end), point));
}

function segmentSegmentDistance(firstStart, firstEnd, secondStart, secondEnd) {
  const firstAxis = subtract(firstEnd, firstStart);
  const secondAxis = subtract(secondEnd, secondStart);
  const betweenStarts = subtract(firstStart, secondStart);
  const firstLengthSquared = dot(firstAxis, firstAxis);
  const secondLengthSquared = dot(secondAxis, secondAxis);
  const crossAxis = dot(firstAxis, secondAxis);
  const firstProjection = dot(firstAxis, betweenStarts);
  const secondProjection = dot(secondAxis, betweenStarts);
  const denominator = firstLengthSquared * secondLengthSquared - crossAxis * crossAxis;
  let firstT = 0;
  let secondT = 0;

  if (firstLengthSquared <= 1e-12 && secondLengthSquared <= 1e-12) return length(betweenStarts);
  if (firstLengthSquared <= 1e-12) {
    secondT = clamp(secondProjection / secondLengthSquared, 0, 1);
  } else if (secondLengthSquared <= 1e-12) {
    firstT = clamp(-firstProjection / firstLengthSquared, 0, 1);
  } else {
    firstT = denominator > 1e-12
      ? clamp((crossAxis * secondProjection - firstProjection * secondLengthSquared) / denominator, 0, 1)
      : 0;
    secondT = (crossAxis * firstT + secondProjection) / secondLengthSquared;
    if (secondT < 0) {
      secondT = 0;
      firstT = clamp(-firstProjection / firstLengthSquared, 0, 1);
    } else if (secondT > 1) {
      secondT = 1;
      firstT = clamp((crossAxis - firstProjection) / firstLengthSquared, 0, 1);
    }
  }
  return length(subtract(
    add(firstStart, scale(firstAxis, firstT)),
    add(secondStart, scale(secondAxis, secondT)),
  ));
}

function clubCollisionSegment(club) {
  const direction = normalize(club.direction, DOWN);
  return freeze({
    // Creator Club geometry is 515 mm long and its balance point is 280 mm
    // from the knob. Keep the actual asymmetric reaches in the guard rather
    // than pretending the club is a point or a symmetric sprite.
    knob: add(club.position, scale(direction, -FOUR_COUNT_3D_CLUB_HANDLING_POLICY.knobTipFromBalanceMetres)),
    cap: add(club.position, scale(direction, FOUR_COUNT_3D_CLUB_HANDLING_POLICY.capTipFromBalanceMetres)),
  });
}

function bodyCollisionVolumes(person) {
  const torso = FOUR_COUNT_3D_COLLISION_POLICY.torsoCapsule;
  const head = FOUR_COUNT_3D_COLLISION_POLICY.headSphere;
  return freeze({
    torso: freeze({
      start: add(person.position, scale(UP, torso.bottomHeightMetres)),
      end: add(person.position, scale(UP, torso.topHeightMetres)),
      radiusMetres: torso.radiusMetres,
    }),
    head: freeze({
      center: add(person.position, scale(UP, head.centerHeightMetres)),
      radiusMetres: head.radiusMetres,
    }),
  });
}

function collisionClearanceFor(clubs, people) {
  // Sky/Earth carries, loads, catches, returns, and ready poses are all full
  // 515 mm objects. Guard the opening whole-arm swing too: a count-in is not
  // a licence to pass a cap through a torso or head.
  const physicalClubs = clubs;
  let closest = null;
  physicalClubs.forEach((club) => {
    const clubSegment = clubCollisionSegment(club);
    people.forEach((person) => {
      const volumes = bodyCollisionVolumes(person);
      const effectiveRadius = FOUR_COUNT_3D_COLLISION_POLICY.clubOuterRadiusMetres;
      const torsoClearance = segmentSegmentDistance(
        clubSegment.knob,
        clubSegment.cap,
        volumes.torso.start,
        volumes.torso.end,
      ) - effectiveRadius - volumes.torso.radiusMetres;
      const headClearance = segmentPointDistance(
        clubSegment.knob,
        clubSegment.cap,
        volumes.head.center,
      ) - effectiveRadius - volumes.head.radiusMetres;
      [["torso", torsoClearance], ["head", headClearance]].forEach(([bodyPart, clearance]) => {
        if (!closest || clearance < closest.clearanceMetres) {
          closest = { clubId: club.id, personId: person.id, bodyPart, clearanceMetres: clearance };
        }
      });
    });
  });
  return freeze({
    method: "sampled full-club segment against conservative torso capsule and head sphere",
    flightClubCount: clubs.filter((club) => club.state === "airborne").length,
    guardedClubCount: physicalClubs.length,
    requiredClearanceMetres: FOUR_COUNT_3D_COLLISION_POLICY.requiredClearanceMetres,
    minimumClearanceMetres: closest ? closest.clearanceMetres : Infinity,
    closest: closest ? freeze({ ...closest }) : null,
  });
}

function cueAt(patternId, playheadBeats) {
  if (playheadBeats < -1) return freeze({ name: "Sky", detail: "Raise all six clubs with a small natural stagger.", beat: -2 });
  if (playheadBeats < 0) return freeze({ name: "Earth", detail: "Lower together to the down-side ready position.", beat: -1 });
  const adapter = physicalTwoPersonAdapterFor(patternId);
  const phraseBeat = mod(Math.floor(playheadBeats), adapter.loopBeats);
  const event = adapter.schedule[phraseBeat];
  const phase = mod(playheadBeats, 1);
  const releaseLead = Math.max(0, FOUR_COUNT_3D_FORWARD_LOAD_SECONDS - phase * FOUR_COUNT_3D_BEAT_SECONDS);
  const preparation = phase < FOUR_COUNT_3D_FORWARD_LOAD_BEATS
    ? ` Begin the forward load; release in ${releaseLead.toFixed(2)} s.`
    : "";
  return freeze({ name: "Pass", detail: `${adapter.title} beat ${phraseBeat + 1}: ${event.label}.${preparation}`, beat: phraseBeat });
}

export function getFourCount3DCamera(mode = "audience") {
  return FOUR_COUNT_3D_CAMERAS[mode] || FOUR_COUNT_3D_CAMERAS.audience;
}

// The model keeps camera construction pure so the renderer and tests can
// prove it follows the sampled torso rather than retaining a stale static
// observer pose. There is one deliberately monocular eye point because the
// current actor mesh has a single head/face, not stereo eye geometry.
export function firstPersonCameraPoseForSample(sample, mode = "audience") {
  const definition = getFourCount3DCamera(mode);
  if (definition.viewKind !== "first-person") return definition;
  const owner = sample?.people?.find((person) => person.id === definition.ownerPersonId);
  if (!owner) throw new RangeError(`sampled first-person owner is required for ${definition.id}`);
  const position = add(
    add(owner.position, vector(0, FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeHeightMetres, 0)),
    scale(owner.forward, FOUR_COUNT_3D_FIRST_PERSON_CAMERA_POLICY.eyeForwardMetres),
  );
  return freeze({
    ...definition,
    position: freeze(cloneVector(position)),
    target: freeze(firstPersonCameraTarget(position, owner.forward)),
    forward: freeze(cloneVector(owner.forward)),
    sampled: true,
  });
}

export function selectFourCount3DPattern(selectedPatternId) {
  const supported = PHYSICAL_TWO_PERSON_PATTERN_IDS.includes(selectedPatternId);
  return freeze({
    supported,
    selectedPatternId: selectedPatternId || null,
    reason: supported
      ? `The selected 2-person ${getPassingPattern(selectedPatternId).title} runs the dedicated six-club 3D foundation.`
      : "Physical 3D is currently available only for the canonical 2-person 1-, 2-, 3-, and 4-count cards; this card stays in the schedule viewer.",
    animationOwner: supported ? "Passing Lab host transport" : "Passing Lab schedule viewer",
    concurrentAnimationCount: supported ? 1 : 0,
  });
}

export function samplePhysicalTwoPerson3D(patternId, playheadBeats, { camera = "audience" } = {}) {
  const capability = selectFourCount3DPattern(patternId);
  if (!capability.supported) throw new RangeError(`${patternId || "selected card"} is not a physical two-person pattern`);
  const adapter = physicalTwoPersonAdapterFor(patternId);
  const tokenAnchors = PHYSICAL_TWO_PERSON_TOKEN_ANCHORS[patternId];
  const playhead = Math.max(-2, finite(playheadBeats));
  const clubs = freeze(playhead < 0
    ? tokenAnchors.map((anchor) => countInClubPose(anchor, playhead))
    : tokenAnchors.map((anchor) => clubPose(anchor, playhead)));
  const ids = clubs.map((club) => club.id);
  if (clubs.length !== 6 || new Set(ids).size !== 6) throw new RangeError(`${patternId} 3D sampler must expose exactly six unique clubs`);
  const airborne = freeze(clubs.filter((club) => club.state === "airborne"));
  const handConnected = freeze(clubs.filter((club) => club.state !== "airborne"));
  const holders = handConnected.filter((club) => club.holder).map((club) => `${club.holder.personId}:${club.holder.hand}`);
  // Sky/Earth deliberately permits the schedule-derived opening two-club
  // carry in one hand. During the opening forward-load alone, the active
  // right-hand pass still shares its nominal start hand with the queued
  // right-side club; that is an explicit carry state, not a duplicate token.
  // Once release occurs, the causal cascade never duplicates a club in one
  // hand.
  const openingForwardLoad = playhead >= 0 && playhead < FOUR_COUNT_3D_FORWARD_LOAD_BEATS - 1e-10;
  if (playhead >= 0 && !openingForwardLoad && new Set(holders).size !== holders.length) {
    throw new RangeError(`no hand may hold two physical ${patternId} clubs at once`);
  }
  const people = sampledPeople(playhead, clubs);
  const collision = collisionClearanceFor(clubs, people);
  if (collision.minimumClearanceMetres < FOUR_COUNT_3D_COLLISION_POLICY.requiredClearanceMetres) {
    throw new RangeError(
      `${patternId} club path intersects a conservative ${collision.closest?.bodyPart || "body"} envelope: ${collision.minimumClearanceMetres.toFixed(4)}m`,
    );
  }
  const allocation = freeze(FOUR_COUNT_3D_STAGE.people.map((person) => freeze({ personId: person.id, count: 3, meaning: "initial token allocation" })));
  const stateCounts = freeze(Object.fromEntries(FOUR_COUNT_3D_MOTION_STATES.map((state) => [state, clubs.filter((club) => club.motionState === state).length])));
  const sample = freeze({
    version: FOUR_COUNT_3D_VERSION,
    patternId,
    physical: true,
    tempoBpm: FOUR_COUNT_3D_BASE_BPM,
    beatSeconds: FOUR_COUNT_3D_BEAT_SECONDS,
    physics: freeze({
      model: "first-order Earth-gravity teaching model",
      gravityMetresPerSecondSquared: EARTH_GRAVITY_METRES_PER_SECOND_SQUARED,
      adultJugglerHeightMetres: ADULT_JUGGLER_HEIGHT_METRES,
      balanceApexMetres: FOUR_COUNT_3D_BALANCE_APEX_METRES,
      selfFlightSeconds: FOUR_COUNT_3D_SELF_FLIGHT_SECONDS,
      passFlightSeconds: FOUR_COUNT_3D_PASS_FLIGHT_SECONDS,
      selfDwellSeconds: FOUR_COUNT_3D_SELF_DWELL_SECONDS,
      cycleSeconds: FOUR_COUNT_3D_CYCLE_SECONDS,
    }),
    playhead,
    cue: cueAt(patternId, playhead),
    camera: null,
    schedule: adapter.schedule,
    clubs,
    // `held` stays as a compatibility alias for existing viewer layout, but
    // the physical model names hand-connected states rather than promising a
    // constant held/airborne split.
    held: handConnected,
    airborne,
    handConnected,
    people,
    allocation,
    total: clubs.length,
    inventory: freeze({
      total: clubs.length,
      inFlight: airborne.length,
      handConnected: handConnected.length,
      unique: new Set(ids).size,
      states: stateCounts,
    }),
    collision,
    variation: HUMAN_ANCHOR_VARIATION_POLICY,
  });
  // Build the camera only after people have been sampled, so a literal eye
  // follows the quiet torso motion exactly. This keeps the sample immutable
  // while avoiding the historical static observer camera lag.
  return freeze({ ...sample, camera: firstPersonCameraPoseForSample(sample, camera) });
}

export function sampleFourCount3D(playheadBeats, options = {}) {
  return samplePhysicalTwoPerson3D(FOUR_COUNT_3D_PATTERN_ID, playheadBeats, options);
}

export function sampleFourCountCollisionClearance(playheadBeats) {
  return sampleFourCount3D(playheadBeats).collision;
}

export function sampleSelectedPassing3D(selectedPatternId, playheadBeats, options = {}) {
  const capability = selectFourCount3DPattern(selectedPatternId);
  return capability.supported
    ? samplePhysicalTwoPerson3D(selectedPatternId, playheadBeats, options)
    : freeze({ physical: false, capability });
}
