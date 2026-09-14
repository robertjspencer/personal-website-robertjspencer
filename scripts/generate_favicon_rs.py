"""Generate the site's compact, font-independent R favicon."""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "images" / "favicon.svg"

# Filled outlines keep the letter consistent across browsers and at small sizes.
SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Robert Spencer">
  <rect width="64" height="64" rx="12" fill="#16181b"/>
  <path fill="#f5f3ee" fill-rule="evenodd" d="M20 15h14c9 0 14 4.5 14 12 0 5.7-3 9.5-8 11l10 11H39L28 36v13h-8V15Zm8 7v8h6c4 0 6-1.3 6-4s-2-4-6-4h-6Z"/>
</svg>
'''


def main() -> None:
    OUT.write_text(SVG, encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
