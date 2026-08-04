import fs from "node:fs/promises";
import { performance } from "node:perf_hooks";

export const CLUB_LIMITS = Object.freeze({
  ledCount: 32,
  updateHz: 50,
  updateSeconds: 0.02,
  scriptBytes: 16_000,
  wasmMemoryBytes: 4_096,
  wasmStackSlots: 2_000,
  nativeStackBytes: 16 * 1_024,
  firmwareStackGuardWords: 255,
});

const ALLOWED_IMPORTS = new Set([
  "arduino.clearLeds",
  "arduino.fillLedsRGB",
  "arduino.getActivity",
  "arduino.getButtonState",
  "arduino.getPitch",
  "arduino.getProjectedAngle",
  "arduino.getRoll",
  "arduino.getThrowState",
  "arduino.getTime",
  "arduino.getYaw",
  "arduino.printInt",
  "arduino.setIMUEnabled",
  "arduino.setLedRGB",
]);

const HARDWARE_IMPORTS = new Set([
  "clearLeds",
  "fillLedsRGB",
  "getActivity",
  "getButtonState",
  "getPitch",
  "getProjectedAngle",
  "getRoll",
  "getThrowState",
  "getTime",
  "getYaw",
  "setIMUEnabled",
  "setLedRGB",
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function finite(value, name) {
  assert(Number.isFinite(value), `${name} must be finite, got ${value}`);
  return value;
}

function channel(value, name) {
  assert(Number.isInteger(value), `${name} must be an integer, got ${value}`);
  assert(value >= 0 && value <= 255, `${name} must be in 0..255, got ${value}`);
  return value;
}

export class ClubWasmSimulator {
  static async fromFile(path, options = {}) {
    const bytes = await fs.readFile(path);
    return ClubWasmSimulator.fromBytes(bytes, { ...options, path });
  }

  static async fromBytes(bytes, options = {}) {
    const simulator = new ClubWasmSimulator(bytes, options);
    await simulator.instantiate();
    return simulator;
  }

  constructor(bytes, options = {}) {
    this.bytes = bytes;
    this.path = options.path ?? "<memory>";
    this.strict = options.strict ?? true;
    this.phase = "constructed";
    this.time = 0;
    this.sensors = {
      button: 0,
      projectedAngle: 0,
      yaw: 0,
      pitch: 0,
      roll: 0,
      activity: 0,
      throwState: 0,
    };
    this.imuEnabled = 0;
    this.leds = Array.from({ length: CLUB_LIMITS.ledCount }, () => [0, 0, 0]);
    this.messages = [];
    this.frames = 0;
    this.updateDurationsMs = [];
    this.hostCalls = new Map();
    this.initHardwareCalls = [];
    this.ledWritesThisFrame = 0;
    this.maxLedWritesPerFrame = 0;
  }

  recordHostCall(name) {
    this.hostCalls.set(name, (this.hostCalls.get(name) ?? 0) + 1);
    if (this.phase === "init" && HARDWARE_IMPORTS.has(name)) {
      this.initHardwareCalls.push(name);
    }
  }

  writeAll(red, green, blue) {
    const color = [
      channel(red, "red"),
      channel(green, "green"),
      channel(blue, "blue"),
    ];
    for (const led of this.leds) led.splice(0, 3, ...color);
    this.ledWritesThisFrame += CLUB_LIMITS.ledCount;
  }

  createArduinoHost() {
    return {
      clearLeds: () => {
        this.recordHostCall("clearLeds");
        this.writeAll(0, 0, 0);
      },
      fillLedsRGB: (red, green, blue) => {
        this.recordHostCall("fillLedsRGB");
        this.writeAll(red, green, blue);
      },
      setLedRGB: (index, red, green, blue) => {
        this.recordHostCall("setLedRGB");
        assert(Number.isInteger(index), `LED index must be integer, got ${index}`);
        assert(index >= 0 && index < CLUB_LIMITS.ledCount, `LED index ${index} is outside 0..31`);
        this.leds[index].splice(
          0,
          3,
          channel(red, "red"),
          channel(green, "green"),
          channel(blue, "blue"),
        );
        this.ledWritesThisFrame += 1;
      },
      getButtonState: () => {
        this.recordHostCall("getButtonState");
        return this.sensors.button ? 1 : 0;
      },
      setIMUEnabled: (enabled) => {
        this.recordHostCall("setIMUEnabled");
        this.imuEnabled = enabled ? 1 : 0;
      },
      getProjectedAngle: () => {
        this.recordHostCall("getProjectedAngle");
        return Math.fround(finite(this.sensors.projectedAngle, "projectedAngle"));
      },
      getYaw: () => {
        this.recordHostCall("getYaw");
        return Math.fround(finite(this.sensors.yaw, "yaw"));
      },
      getPitch: () => {
        this.recordHostCall("getPitch");
        return Math.fround(finite(this.sensors.pitch, "pitch"));
      },
      getRoll: () => {
        this.recordHostCall("getRoll");
        return Math.fround(finite(this.sensors.roll, "roll"));
      },
      getActivity: () => {
        this.recordHostCall("getActivity");
        return Math.fround(finite(this.sensors.activity, "activity"));
      },
      getThrowState: () => {
        this.recordHostCall("getThrowState");
        return Math.trunc(finite(this.sensors.throwState, "throwState"));
      },
      getTime: () => {
        this.recordHostCall("getTime");
        return Math.fround(this.time);
      },
      printInt: (value) => {
        this.recordHostCall("printInt");
        this.messages.push(value | 0);
      },
    };
  }

  async instantiate() {
    assert(this.bytes.length <= CLUB_LIMITS.scriptBytes, `${this.path} is ${this.bytes.length} bytes; limit is ${CLUB_LIMITS.scriptBytes}`);
    const module = await WebAssembly.compile(this.bytes);
    this.moduleImports = WebAssembly.Module.imports(module);
    this.moduleExports = WebAssembly.Module.exports(module);

    for (const item of this.moduleImports) {
      const key = `${item.module}.${item.name}`;
      assert(item.kind === "function", `unsupported non-function import ${key}`);
      assert(ALLOWED_IMPORTS.has(key), `unsupported stable-1.2.0 import ${key}`);
    }
    const exportedNames = new Set(this.moduleExports.map((item) => item.name));
    for (const required of ["init", "update", "stop", "memory"]) {
      assert(exportedNames.has(required), `missing required export ${required}`);
    }

    this.phase = "instantiate";
    const result = await WebAssembly.instantiate(module, { arduino: this.createArduinoHost() });
    this.instance = result;
    this.exports = result.exports;
    this.checkMemory();
    this.phase = "ready";
  }

  checkMemory() {
    const memory = this.exports?.memory;
    assert(memory instanceof WebAssembly.Memory, "memory export is not WebAssembly.Memory");
    assert(
      memory.buffer.byteLength <= CLUB_LIMITS.wasmMemoryBytes,
      `WASM memory is ${memory.buffer.byteLength} bytes; firmware ceiling is ${CLUB_LIMITS.wasmMemoryBytes}`,
    );
  }

  init() {
    assert(this.phase === "ready", `init called in phase ${this.phase}`);
    this.phase = "init";
    this.exports.init();
    this.checkMemory();
    this.phase = "running";
    if (this.strict) {
      assert(
        this.initHardwareCalls.length === 0,
        `init touched hardware-backed imports: ${this.initHardwareCalls.join(", ")}`,
      );
    }
  }

  setSensors(values) {
    Object.assign(this.sensors, values);
  }

  step(dt = CLUB_LIMITS.updateSeconds) {
    assert(this.phase === "running", `step called in phase ${this.phase}`);
    finite(dt, "dt");
    assert(dt > 0 && dt <= 0.25, `dt must be in (0, 0.25], got ${dt}`);
    this.time += dt;
    this.ledWritesThisFrame = 0;
    const started = performance.now();
    this.exports.update();
    const duration = performance.now() - started;
    this.updateDurationsMs.push(duration);
    this.frames += 1;
    this.maxLedWritesPerFrame = Math.max(this.maxLedWritesPerFrame, this.ledWritesThisFrame);
    this.checkMemory();
    return this.frame();
  }

  run(seconds, driver = null) {
    const frames = Math.ceil(seconds * CLUB_LIMITS.updateHz);
    for (let frame = 0; frame < frames; frame += 1) {
      if (driver) driver(this, frame);
      this.step();
    }
  }

  frame() {
    return this.leds.map((led) => [...led]);
  }

  visibility() {
    const maxima = this.leds.map((led) => Math.max(...led));
    return {
      minimumChannelMax: Math.min(...maxima),
      stronglyLit: maxima.filter((value) => value >= 160).length,
      black: maxima.filter((value) => value === 0).length,
    };
  }

  assertVisible(label, { minimum = 120, stronglyLit = 30 } = {}) {
    const metrics = this.visibility();
    assert(metrics.minimumChannelMax >= minimum, `${label}: minimum channel max ${metrics.minimumChannelMax} < ${minimum}`);
    assert(metrics.stronglyLit >= stronglyLit, `${label}: only ${metrics.stronglyLit}/32 LEDs >= 160`);
  }

  stop() {
    assert(this.phase === "running", `stop called in phase ${this.phase}`);
    this.preStopVisibility = this.visibility();
    this.phase = "stop";
    this.exports.stop();
    this.checkMemory();
    this.phase = "stopped";
  }

  report() {
    const sorted = [...this.updateDurationsMs].sort((a, b) => a - b);
    const percentile = (fraction) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))] ?? 0;
    return {
      path: this.path,
      moduleBytes: this.bytes.length,
      limits: CLUB_LIMITS,
      imports: this.moduleImports.map((item) => `${item.module}.${item.name}`),
      exports: this.moduleExports.map((item) => item.name),
      memoryBytes: this.exports.memory.buffer.byteLength,
      frames: this.frames,
      simulatedSeconds: Number(this.time.toFixed(3)),
      updateMs: {
        p50: Number(percentile(0.50).toFixed(4)),
        p95: Number(percentile(0.95).toFixed(4)),
        maximum: Number((sorted.at(-1) ?? 0).toFixed(4)),
      },
      maxLedWritesPerFrame: this.maxLedWritesPerFrame,
      imuEnabled: this.imuEnabled,
      lastRunningVisibility: this.preStopVisibility ?? this.visibility(),
      stoppedVisibility: this.visibility(),
      messages: this.messages.length,
      initHardwareCalls: [...this.initHardwareCalls],
      fidelityBoundary: (
        "Node executes browser WebAssembly, not Wasm3 on the ESP32. The 255-word historical " +
        "native-stack guard, BNO055 behavior, physical diffusion, radio timing, and downstream " +
        "0.5 boot brightness still require a clean physical-club canary."
      ),
    };
  }
}
