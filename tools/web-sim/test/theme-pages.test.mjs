import assert from "node:assert/strict";
import test from "node:test";

import {
  createThemeFrame,
  findThemePage,
  renderThemeEffect,
  THEME_EFFECT_COUNT,
  THEME_PAGES,
} from "../src/theme-pages.mjs";

test("theme studio contains twelve deliberately variable-length authored pages", () => {
  assert.equal(THEME_PAGES.length, 12);
  assert.equal(THEME_EFFECT_COUNT, 78);
  assert.deepEqual([...new Set(THEME_PAGES.map((page) => page.effects.length))].sort(), [6, 7]);

  const pageIds = THEME_PAGES.map((page) => page.id);
  const effectIds = THEME_PAGES.flatMap((page) => page.effects.map((effect) => effect.id));
  assert.equal(new Set(pageIds).size, pageIds.length);
  assert.equal(new Set(effectIds).size, effectIds.length);
  assert.equal(findThemePage("lightning")?.name, "Lightning Storm");
  assert.equal(findThemePage("missing"), null);
});

test("every theme effect renders bounded 32-pixel frames with a dark-venue visibility floor", () => {
  const states = [
    { activityPercent: 0, projectedAngle: 0, roll: -180, throwState: 0 },
    { activityPercent: 47, projectedAngle: 0.31, roll: 44, throwState: 2 },
    { activityPercent: 100, projectedAngle: 0.75, roll: 179, throwState: 5 },
  ];
  const times = [0, 0.73, 3.14159, 9.8];

  for (const page of THEME_PAGES) {
    for (const effect of page.effects) {
      for (const state of states) {
        for (const time of times) {
          const frame = renderThemeEffect(effect.id, state, time);
          assert.equal(frame.length, 32, effect.id);
          for (const rgb of frame) {
            assert.equal(rgb.length, 3, effect.id);
            rgb.forEach((channel) => {
              assert.equal(Number.isInteger(channel), true, effect.id);
              assert.ok(channel >= 0 && channel <= 255, `${effect.id}: ${channel}`);
            });
            assert.ok(Math.max(...rgb) >= 18, `${effect.id} produced an unsafe black pixel`);
          }
        }
      }
    }
  }
});

test("rendering is deterministic and supports caller-owned frame buffers", () => {
  const state = { activityPercent: 62, projectedAngle: 0.42, roll: -71, throwState: 3 };
  const a = createThemeFrame();
  const b = createThemeFrame();
  assert.equal(renderThemeEffect("festival-finale", state, 2.25, a), a);
  renderThemeEffect("festival-finale", state, 2.25, b);
  assert.deepEqual(a, b);
  assert.throws(() => renderThemeEffect("not-real", state, 1), /unknown theme effect/);
  assert.throws(() => renderThemeEffect("duel", state, Number.NaN), /finite/);
  assert.throws(() => renderThemeEffect("duel", state, 1, []), /32 RGB entries/);
});

test("sensor-led sketches visibly react to their named controls", () => {
  const frame = (id, state) => renderThemeEffect(id, state, 1.37);
  assert.notDeepEqual(
    frame("bellows", { activityPercent: 0 }),
    frame("bellows", { activityPercent: 100 }),
  );
  assert.notDeepEqual(
    frame("advancing-front", { roll: -90 }),
    frame("advancing-front", { roll: 90 }),
  );
  assert.notDeepEqual(
    frame("thermal-flip", { projectedAngle: 0 }),
    frame("thermal-flip", { projectedAngle: 0.5 }),
  );
  assert.notDeepEqual(
    frame("caught-bolt", { throwState: 0 }),
    frame("caught-bolt", { throwState: 2 }),
  );
});
