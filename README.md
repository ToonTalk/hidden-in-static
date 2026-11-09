# Hidden in Static

Type a message and it appears only as moving noise on a static-noise background.
Pause it and the text vanishes: every single frame is just random noise.

**Try it:** https://toontalk.github.io/hidden-in-static/

## How it works

The whole window is random noise. The background noise is drawn once and never
changes. The pixels inside the letters keep getting new noise, so you see the
letters only through the change. Any one frame has the same mix of noise
everywhere, which is why a paused frame or a screenshot shows nothing.

This is the idea behind the *random-dot kinematogram*, a stimulus vision
scientists have used since the 1970s to study how we see shape from motion
alone.

## Controls

| Control | What it does |
| --- | --- |
| Your text | What to hide. More than one line is fine. |
| Noise | **B&W** or **Color** noise. |
| Letters | **Flicker**: fresh noise in the letters every frame. **Flow**: the noise inside the letters slides downward. |
| Size | Text size, from 10% up to the largest size that fits the screen. |
| Grain | Size of each noise dot, 1–10 px. |
| Speed | Frames per second, 2–60. |
| Pause | Stops the animation. Also **Space**, or tap the noise. |
| Save GIF | Records 2 seconds as a looping GIF. Each frame of the GIF is pure noise too. |
| Hide | Hides the panel. Also **H**. |

## Files

- `index.html`: the whole app in one file, with no dependencies except two Google Fonts.
- `tools/build-artifact.mjs`: builds `dist/artifact.html`, the version published as a
  claude.ai artifact. It's the same page without the outer `<html>`/`<head>`/`<body>`
  wrapper, which claude.ai adds itself.

Run locally by opening `index.html` in a browser.

## License

MIT. See [LICENSE](LICENSE).
