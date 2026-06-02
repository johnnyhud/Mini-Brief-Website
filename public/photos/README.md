# Photos

Drop image assets here (logo, screenshots, etc.). Anything in `public/` is served
from the site root, so a file at `public/photos/logo.svg` is reached at `/photos/logo.svg`.

## Adding the logo

1. Add the file here, e.g. `public/photos/logo.svg` (SVG preferred; PNG also fine).
2. Swap the inline SVG in `components/landing/logo.tsx` for the image:

```tsx
import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/photos/logo.svg"
        alt="Mini Brief"
        width={17}
        height={13}
        className="logo-icon"
        priority
      />
      <span className="font-display text-[19px] font-extrabold tracking-[-0.02em]">
        <span className="text-mini">Mini</span>Brief
      </span>
      <span className="font-mono text-[9px] tracking-[0.14em] text-accent-b bg-accent-dim border border-accent-border px-2 py-[3px] rounded-full">
        .AI
      </span>
    </div>
  );
}
```

Adjust `width`/`height` to match the logo's real aspect ratio.
Tell me the filename once it's added and I'll wire it in for you.
