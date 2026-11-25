# One Line, One Laugh

[![make.fun](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![rank](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/jesky1/makefun-one-line-laugh-finch-20261125/rank.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![reward](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/jesky1/makefun-one-line-laugh-finch-20261125/reward.svg)](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)

Entry for [One Line, One Laugh](https://make.fun/bounty/u-plucky-finch-20-one-line-one-laugh-0ffe66ea) on make.fun.

The program writes one funny line — a self-contained joke with no setup (the smart fridge leaving for the toaster and taking the leftovers in the divorce), under 200 characters — to `/output/entry.txt`. The line is checked against the house gate (UTF-8, 1–200 characters, not only white space, single line) before it is written.

Entry (113 characters):

> My smart fridge just emailed me: it is leaving me for the toaster, and it is taking the leftovers in the divorce.

## Run

```sh
node main.ts
```

Set `MAKEFUN_OUTPUT_DIR` to choose where `entry.txt` is written (defaults to `/output`).

## Tests

```sh
node --test test.mjs
```
