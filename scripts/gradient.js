/**
 * Script for creating the necessary gradients by interpolation from one or more colors.
 *
 * Usage:
 *
 * node gradient.js <key> <hex-color>[@<nnnn>] ...
 */

const minL = 0.15;
const maxL = 0.95;

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function interpolate(f, v1, f1, v2, f2) {
  if (f1 === f2) {
    return v1;
  }

  const k = (v2 - v1) / (f2 - f1);
  const d = v1 - k * f1;

  return clamp(k * f + d, 0, 1);
}

function bezier(f, index, allPs) {
  if (index <= 0) {
    return allPs[0].v + (allPs[1].v - allPs[0].v) * ((f - allPs[0].f) / (allPs[1].f - allPs[0].f));
  }

  if (index > allPs.length - 2) {
    return (
      allPs[allPs.length - 2].v +
      (allPs[allPs.length - 1].v - allPs[allPs.length - 2].v) *
        ((f - allPs[allPs.length - 2].f) / (allPs[allPs.length - 1].f - allPs[allPs.length - 2].f))
    );
  }

  const p0 = allPs[index - 1];
  const p1 = allPs[index];
  const p2 = allPs[index + 1];

  f = clamp((f - p0.f) / (p2.f - p0.f), 0, 1);

  let x1 = (p1.f - p0.f) / (p2.f - p0.f);
  let t;

  if (x1 === 0.5) {
    t = f;
  } else {
    t = (x1 - Math.sqrt(Math.pow(x1, 2) - 2 * x1 * f + f)) / (2 * x1 - 1);
  }

  return p0.v * Math.pow(t - 1, 2) + t * (p2.v * t - 2 * p1.v * (t - 1));
}

function smoothCurve(f, allPs) {
  let index = 0;

  for (let i = 0; i < allPs.length - 1; i++) {
    if (f >= allPs[i].f && f < allPs[i + 1].f) {
      index = i;
      break;
    }
  }

  return clamp((bezier(f, index, allPs) + bezier(f, index + 1, allPs)) / 2, 0, 1);
}

// credits: https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
function rgbToHsl(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})(@\d+)?$/i.exec(hex);
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let l = (max + min) / 2;

  let f = result[4] ? 1 - parseInt(result[4].substring(1)) / 1000 : l / (maxL - minL);
  let hsl = { h: 0, s: 0, l: l, f: f };

  if (max == min) {
    hsl.h = hsl.s = 0; // achromatic
  } else {
    let d = max - min;
    hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hsl.h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hsl.h = (b - r) / d + 2;
        break;
      case b:
        hsl.h = (r - g) / d + 4;
        break;
    }
    hsl.h /= 6;
  }

  return hsl;
}

function toHex(v) {
  let s = v.toString(16);

  return s.length === 1 ? '0' + s : s;
}

// credits: https://gist.github.com/mjackson/5311256
function hslToRgb(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) {
        t += 1;
      }

      if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }

      if (t < 1 / 2) {
        return q;
      }

      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `#${toHex(Math.round(255 * r))}${toHex(Math.round(255 * g))}${toHex(Math.round(255 * b))}`;
}

function formatHSL(hsl) {
  return `hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%) @ ${Math.round(
    (1 - hsl.f) * 1000
  )}`;
}

function computeColor(f, colors) {
  const hs = colors.map(c => ({ f: c.f, v: c.h }));
  const ss = colors.map(c => ({ f: c.f, v: c.s }));
  const ls = colors.map(c => ({ f: c.f, v: c.l }));

  return {
    h: smoothCurve(f, hs),
    s: smoothCurve(f, ss),
    l: smoothCurve(f, ls),
    f: f,
  };
}

let key = process.argv[2];
let colors = [];

for (let i = 3; i < process.argv.length; i++) {
  colors.push(rgbToHsl(process.argv[i]));
}

if (colors.length < 1) {
  console.error('At least one color is required');
  process.exit(1);
}

colors.sort((a, b) => a.f - b.f);

if (colors.length > 1) {
  colors.push({
    h: interpolate(0, colors[0].h, colors[0].f, colors[1].h, colors[1].f),
    s: interpolate(0, colors[0].s, colors[0].f, colors[1].s, colors[1].f),
    l: interpolate(0, colors[0].l, colors[0].f, colors[1].l, colors[1].f),
    f: 0,
  });
} else {
  colors.push({
    h: colors[0].h,
    s: colors[0].s,
    l: minL,
    f: 0,
  });
}

colors.sort((a, b) => a.f - b.f);

if (colors.length > 2) {
  colors.push({
    h: interpolate(
      1,
      colors[colors.length - 2].h,
      colors[colors.length - 2].f,
      colors[colors.length - 1].h,
      colors[colors.length - 1].f
    ),
    s: interpolate(
      1,
      colors[colors.length - 2].s,
      colors[colors.length - 2].f,
      colors[colors.length - 1].s,
      colors[colors.length - 1].f
    ),
    l: interpolate(
      1,
      colors[colors.length - 2].l,
      colors[colors.length - 2].f,
      colors[colors.length - 1].l,
      colors[colors.length - 1].f
    ),
    f: 1,
  });
} else {
  colors.push({
    h: colors[colors.length - 1].h,
    s: colors[colors.length - 1].s,
    l: maxL,
    f: 1,
  });
}

colors.sort((a, b) => a.f - b.f);

const steps = [0.975, 0.95, 0.925, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0];

for (let i = 0; i < steps.length; i++) {
  let id = 1000 - Math.round(1000 * steps[i]);
  let hsl = computeColor(steps[i], colors);

  console.log(
    `$phs-global-color-${key}-${id}: hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, ${Math.round(
      hsl.l * 100
    )}%); // ${hslToRgb(hsl)}`
  );
}
