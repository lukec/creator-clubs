import * as THREE from "three";

// Dimensions are in decimetres so the official 515 mm length is 5.15 scene
// units and the official 82 mm maximum body width is 0.82 scene units.
export const CREATOR_CLUB_DIMENSIONS = Object.freeze({
  lengthMm: 515,
  widthMm: 82,
  balanceFromKnobMm: 280,
  balanceY: 0.225,
});

// Image-derived from Flowtoys' front-on smooth/grip comparison, then split at
// the physical EVA knob and silicone cap seams. This is a visual fit, not CAD.
export const CREATOR_CLUB_PROFILES = Object.freeze({
  knob: Object.freeze([
    [-2.575, 0.000],
    [-2.551, 0.140],
    [-2.492, 0.182],
    [-2.443, 0.186],
    [-2.394, 0.182],
    [-2.345, 0.165],
    [-2.296, 0.119],
    [-2.290, 0.000],
  ].map(Object.freeze)),
  shell: Object.freeze([
    [-2.305, 0.000],
    [-2.296, 0.119],
    [-2.199, 0.109],
    [-1.710, 0.121],
    [-1.222, 0.130],
    [-0.733, 0.137],
    [-0.244, 0.149],
    [-0.098, 0.156],
    [0.000, 0.165],
    [0.122, 0.179],
    [0.244, 0.205],
    [0.366, 0.231],
    [0.489, 0.249],
    [0.611, 0.273],
    [0.733, 0.298],
    [0.855, 0.321],
    [0.977, 0.342],
    [1.099, 0.368],
    [1.222, 0.387],
    [1.344, 0.405],
    [1.466, 0.410],
    [1.588, 0.408],
    [1.710, 0.391],
    [1.832, 0.366],
    [1.954, 0.335],
    [2.077, 0.303],
    [2.199, 0.273],
    [2.321, 0.238],
    [2.420, 0.207],
    [2.430, 0.000],
  ].map(Object.freeze)),
  cap: Object.freeze([
    [2.405, 0.000],
    [2.405, 0.201],
    [2.430, 0.211],
    [2.535, 0.211],
    [2.565, 0.202],
    [2.575, 0.190],
    [2.575, 0.000],
  ].map(Object.freeze)),
});

const lathe = (profile, segments) => new THREE.LatheGeometry(
  profile.map(([y, radius]) => new THREE.Vector2(radius, y)),
  segments,
);

export const creatorClubRadiusAt = (y) => {
  const profile = CREATOR_CLUB_PROFILES.shell;
  if (y <= profile[1][0]) return profile[1][1];
  if (y >= profile.at(-2)[0]) return profile.at(-2)[1];
  for (let index = 2; index < profile.length - 1; index += 1) {
    const [nextY, nextRadius] = profile[index];
    if (y <= nextY) {
      const [previousY, previousRadius] = profile[index - 1];
      return THREE.MathUtils.lerp(
        previousRadius,
        nextRadius,
        (y - previousY) / (nextY - previousY),
      );
    }
  }
  return profile.at(-2)[1];
};

export const makeCreatorClubGeometries = ({ segments = 96 } = {}) => Object.freeze({
  shell: lathe(CREATOR_CLUB_PROFILES.shell, segments),
  knob: lathe(CREATOR_CLUB_PROFILES.knob, Math.max(32, Math.round(segments * 0.66))),
  cap: lathe(CREATOR_CLUB_PROFILES.cap, Math.max(32, Math.round(segments * 0.66))),
});
