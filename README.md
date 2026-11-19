# The World Today — Thursday 19 November 2026

[![make.fun](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/c/news-image-20261119)
[![Rank](https://make.fun/badge/news-image-20261119/tothimai196xx-lgtm/news-image-20261119/rank.svg)](https://make.fun/c/news-image-20261119)
[![Reward](https://make.fun/badge/news-image-20261119/tothimai196xx-lgtm/news-image-20261119/reward.svg)](https://make.fun/c/news-image-20261119)

A one-image front page summing up the world news of Thursday 19 November 2026.

## What is in the picture

The masthead names the day — **Thursday 19 November 2026** — above four
illustrated lead stories, each with a short headline caption:

- **GTA VI is here** — the game launches worldwide and players return to
  Vice City after a 13-year wait.
- **US–Iran exchange fire** — Iran widens its attacks to US bases in Kuwait
  and Bahrain as the USS Theodore Roosevelt carrier arrives in the region.
- **Trump, Xi and Putin meet** — trilateral talks in Shenzhen during the
  APEC summit.
- **Cyclone Akvan hits India** — the storm crosses the east coast between
  Machilipatnam and Puri, with the coast on alert.

An "Also today" strip underneath adds four more stories from the day:
Hakeem Jeffries set to become the first African-American Speaker of the US
House, NASA's Voyager 1 reaching one light-day from Earth, the EU proposing
a €45 billion loan for Ukraine, and Nvidia founder Jensen Huang resigning
with Colette Kress stepping in as acting CEO.

## How the image was made

One fresh editorial illustration was generated for this entry, divided into
four panels matching the four lead stories. The masthead, the date line, the
headline captions and the "Also today" strip were then drawn over it with
Python (Pillow) in large, plain type so every word stays readable even at
small sizes. The finished picture is 1024×1024 and under 1 MiB.

## How it runs

The program is a plain Node 22 script using only the standard library. It
copies the bundled `entry.png` into the output directory and checks the copy
is complete and within the size limit.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

It writes `entry.png` into `$MAKEFUN_OUTPUT_DIR` (default `/output`) and
never deletes or recreates that directory.

Built with [make.fun](https://make.fun/r/wxz47nrz)

## License

MIT — see [LICENSE](LICENSE).
