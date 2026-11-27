"""Generate the six PitDev Club stamp states for Apple Wallet passes."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "club" / "wallet-art"
PUBLIC = ROOT / "club" / "public"
BLACK = (3, 6, 4)
PANEL = (9, 20, 13)
GREEN = (57, 255, 136)
MUTED = (82, 112, 94)
WHITE = (245, 255, 249)


def brand_mark():
    source = Image.open(ROOT / "public" / "logo.png").convert("RGB")
    crop = source.crop((380, 285, 870, 800))
    pixels = crop.load()
    mask = Image.new("L", crop.size)
    target = mask.load()
    for y in range(crop.height):
        for x in range(crop.width):
            r, g, b = pixels[x, y]
            target[x, y] = max(0, min(255, (max(r, g, b) - 18) * 3))
    return mask


MARK = brand_mark()


def seal(canvas, center, radius, active):
    x, y = center
    d = ImageDraw.Draw(canvas)
    halo = Image.new("RGBA", canvas.size)
    h = ImageDraw.Draw(halo)
    if active:
        h.ellipse((x-radius-18, y-radius-18, x+radius+18, y+radius+18), fill=(*GREEN, 55))
        canvas.alpha_composite(halo.filter(ImageFilter.GaussianBlur(25)))
    d.ellipse((x-radius, y-radius, x+radius, y+radius), fill=GREEN if active else PANEL,
              outline=GREEN if active else MUTED, width=5)
    inner = int(radius * .76)
    d.ellipse((x-inner, y-inner, x+inner, y+inner), outline=BLACK if active else (47, 82, 58), width=3)
    size = (int(radius * 1.22), int(radius * 1.27))
    glyph = MARK.resize(size, Image.Resampling.LANCZOS)
    tint = Image.new("RGBA", size, (*(BLACK if active else MUTED), 255))
    tint.putalpha(glyph)
    canvas.alpha_composite(tint, (x-size[0]//2, y-size[1]//2))


def art(count, dimensions, kind):
    w, h = dimensions
    canvas = Image.new("RGBA", dimensions, (*BLACK, 255))
    d = ImageDraw.Draw(canvas)
    if kind == "strip":
        d.rounded_rectangle((18, 16, w-18, h-16), radius=36, fill=(*PANEL, 255), outline=(27, 66, 39), width=3)
        xs, ys, radius = (w*.22, w*.50, w*.78), (h*.27, h*.73), 74
    else:
        d.rounded_rectangle((45, 260, w-45, 1110), radius=56, fill=(*PANEL, 255), outline=(27, 66, 39), width=4)
        xs, ys, radius = (w*.21, w*.50, w*.79), (535, 815), 110
        d.line((84, 1170, w-84, 1170), fill=(24, 60, 35), width=4)
    for i, (row, col) in enumerate(((r, c) for r in range(2) for c in range(3))):
        seal(canvas, (int(xs[col]), int(ys[row])), radius, i < count)
    return canvas.convert("RGB")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    glyph = MARK.resize((238, 250), Image.Resampling.LANCZOS)
    mark = Image.new("RGBA", (256, 256), (*GREEN, 0))
    tinted = Image.new("RGBA", glyph.size, (*GREEN, 255))
    tinted.putalpha(glyph)
    mark.alpha_composite(tinted, (9, 3))
    mark.save(PUBLIC / "stamp-mark.png")
    for count in range(1, 7):
        art(count, (1125, 432), "strip").save(OUT / f"strip-{count}.png", optimize=True)
        art(count, (1035, 1515), "poster").save(OUT / f"poster-{count}.png", optimize=True)


if __name__ == "__main__":
    main()
