# RGB button cycle

Minimal autonomous Creators Club scene for stable firmware 1.2.0:

- starts solid red;
- each physical button press advances red -> green -> blue -> red;
- holding the button changes color only once; and
- stopping the script makes its LED layer transparent again.

Build from the repository root:

```sh
sh scenes/rgb-button-cycle/build.sh
```

The ignored output is `artifacts/rgb-button-cycle.wasm`. It targets the legacy
`arduino` WASM ABI discovered in the exact installed 1.2.0 image. The script is
small enough for the firmware's 16,000-byte file and 4,096-byte runtime-memory
limits.

Loading the script is transient, but uploading its file under `/scripts` is a
persistent club mutation. Test one club at a time and do not configure automatic
launch until reboot behavior is explicitly validated.
