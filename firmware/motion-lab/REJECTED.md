# Rejected BentoFlow firmware path

Do not flash the experimental BentoFlow image produced during the 2026-07-15
investigation.

The checked-in BentoFlow 1.2.4 source compiled successfully after reconstructing
Creator Club feature flags and pinning legacy dependencies. A live preflight
then disproved the architectural match: the installed stable 1.2.0 club exposes
the Bentuino component tree (`/leds/strip1`, `/motion`, `/buttons`, `/script`),
while the candidate image used the older BentoFlow managers. Its ESP application
metadata also differs materially from the installed image.

The live stable firmware exposes a writable `/script/scriptAtLaunch` setting and
does not use the BentoFlow offline double-click stop handler. The requested
offline Motion Lab can therefore stay on the supported stable firmware: upload
`motion-lab.wasm`, verify it manually, set the launch name, save settings, and
test a reboot with the access point unavailable.

The failed build remains documented in `docs/lab-log.md` so it is not repeated.
The public project intentionally retains no build script or applicable patch for
the rejected image.
