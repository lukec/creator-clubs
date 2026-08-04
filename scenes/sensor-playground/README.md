# Sensor playground

Four autonomous, button-selected scenes for Creators Club stable firmware
1.2.0. Each scene keeps a nonblack whole-club visibility floor.

| Button index | Scene | Sensor response |
| ---: | --- | --- |
| 1 | Orientation wheel | Projected angle selects a continuous solid hue |
| 2 | Orbit comet | Projected angle moves a bright head and tail along the LEDs |
| 3 | Activity flame | Linear-motion activity heats amber toward yellow-white |
| 4 | Spin heat | Estimated angular speed shifts cool blue toward hot orange |

One ordinary quick press advances to the next scene and wraps from scene 4 to
scene 1. Long holds remain reserved for normal club power behavior.

Build from the repository root:

```sh
sh scenes/sensor-playground/build.sh
```

The ignored output is `artifacts/sensor-playground.wasm`. Uploading the file is
persistent, but launching it and enabling the IMU are transient. The script
disables the IMU and clears its LED layer when stopped; automatic launch is not
configured.
