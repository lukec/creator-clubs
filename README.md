# Creator Clubs

We are exploring three programmable LED juggling clubs and building new ways
for their lights to respond to movement.

So far, we have safely preserved the clubs' original software, installed a
stable shared version, connected all three over Wi-Fi, controlled them
individually, and confirmed that their motion sensors work.

Next, we want to build a small library of movement-and-light scenes that Yuki
can browse with the button while practising. From the scenes that feel best, we
will create performances synchronized with music. We also plan to experiment
with persistence-of-vision images created by swinging or spinning a club.

The new [Club Lighting Lab](studies/club-lighting-lab/index.html) lets us compare
how individual LEDs become glowing plastic: distinct dots remain visible in the
narrow handle while the wider body blends them into a bright, continuous field.
It is an adjustable visual model for faster discussion, with the real club still
serving as the final judge.

The long-term goal is a portable, dependable creative toolkit that can travel
from rehearsal to the theatre.

The first **Club Lab** tool now lets us calibrate one physical club, step through
four movement-reactive patterns, record concise feedback, stop/resume safely,
and export the evidence for the next design revision. See
[`docs/club-lab-cli.md`](docs/club-lab-cli.md).

Club 1 now boots into a hands-free demo of all 24 movement-reactive effects,
ten seconds at a time. One button press enters the normal three-page browser at
Page 1, Effect 1. The complete on-club demo and button handoff have passed an
automated hardware soak; Clubs 0 and 2 are next.

Our first one-minute music-synchronized proof of concept is documented in
[`shows/exit-the-premises-poc/`](shows/exit-the-premises-poc/README.md).
The follow-up expands that experiment into a structured full-song visual score:
[`shows/exit-the-premises-full/`](shows/exit-the-premises-full/README.md).
Our next example uses a classic Japanese koto recording to explore slower
phrases, individual note accents, and moonlit visual storytelling:
[`shows/kojo-no-tsuki/`](shows/kojo-no-tsuki/README.md).

More detailed project notes are in [`docs/`](docs/README.md).

For a high-level visual introduction suitable for a project conversation with
Yuki, open [`docs/yuki-project-overview.html`](docs/yuki-project-overview.html).

Original work in this repository is available under the [MIT License](LICENSE).
Third-party hardware, firmware, and dependencies remain under their own terms.
