# Video

The "See a demo" button (nav + hero) is already wired to a popup video player.
It is waiting for one file:

## Drop the video here

    public/video/intro.mp4        ← required (H.264 MP4)

Optional poster frame (shown before play, and while loading):

    public/photos/intro-poster.jpg

That's it — no code change needed. As soon as `intro.mp4` exists, the demo
popup plays it. Until then, the popup shows a tidy "Demo video coming soon"
fallback instead of a broken player.

## Notes

- Keep it reasonably small (a landing-page intro is usually < ~15 MB) so it
  loads fast. If it must be large, we should host it externally and embed instead.
- To use a different filename or path, edit the `VIDEO_SRC` / `POSTER_SRC`
  constants at the top of `components/landing/video-dialog.tsx`.
- The player has native controls, is keyboard-accessible, and stops/​resets
  when the popup is closed.
