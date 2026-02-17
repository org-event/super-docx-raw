import { B as Buffer } from "./jszip-BjHgpFjf.es.js";
import { r as requireLib } from "./xml-js-DSiO9tqd.es.js";
var libExports = requireLib();
const PIXELS_PER_INCH = 96;
function inchesToTwips(inches) {
  if (inches == null) return;
  if (typeof inches === "string") inches = parseFloat(inches);
  return Math.round(Number(inches) * 1440);
}
function twipsToInches(twips) {
  if (twips == null) return;
  const value = Number(twips);
  if (Number.isNaN(value)) return;
  return value / 1440;
}
function twipsToPixels(twips) {
  if (twips == null) return;
  const inches = twipsToInches(twips);
  return inchesToPixels(inches);
}
function pixelsToTwips(pixels) {
  const inches = pixelsToInches(pixels);
  return inchesToTwips(inches);
}
function inchesToPixels(inches) {
  if (inches == null) return;
  const pixels = inches * PIXELS_PER_INCH;
  return Math.round(pixels * 1e3) / 1e3;
}
function pixelsToInches(pixels) {
  if (pixels == null) return;
  const inches = Number(pixels) / PIXELS_PER_INCH;
  return inches;
}
function twipsToLines(twips) {
  if (twips == null) return;
  return twips / 240;
}
function linesToTwips(lines) {
  if (lines == null) return;
  return lines * 240;
}
function halfPointToPoints(halfPoints) {
  if (halfPoints == null) return;
  return Math.round(halfPoints) / 2;
}
function emuToPixels(emu) {
  if (emu == null) return;
  if (typeof emu === "string") emu = parseFloat(emu);
  const pixels = emu * PIXELS_PER_INCH / 914400;
  return Math.round(pixels);
}
function pixelsToEmu(px) {
  if (px == null) return;
  if (typeof px === "string") px = parseFloat(px);
  return Math.round(px * 9525);
}
function eighthPointsToPixels(eighthPoints) {
  if (eighthPoints == null) return;
  const points = parseFloat(eighthPoints) / 8;
  const pixels = points * 1.3333;
  return pixels;
}
function pointsToTwips(points) {
  if (points == null) return;
  return points * 20;
}
function pixelsToEightPoints(pixels) {
  if (pixels == null) return;
  return Math.round(pixels * 6);
}
function twipsToPt(twips) {
  if (twips == null) return;
  return twips / 20;
}
function ptToTwips(pt) {
  if (pt == null) return;
  return pt * 20;
}
function rotToDegrees(rot) {
  if (rot == null) return;
  return rot / 6e4;
}
function degreesToRot(degrees) {
  if (degrees == null) return;
  return degrees * 6e4;
}
function pixelsToPolygonUnits(pixels) {
  if (pixels == null) return;
  const pu = pixels * PIXELS_PER_INCH;
  return Math.round(pu);
}
function polygonUnitsToPixels(pu) {
  if (pu == null) return;
  const pixels = Number(pu) / PIXELS_PER_INCH;
  return Math.round(pixels * 1e3) / 1e3;
}
function polygonToObj(polygonNode) {
  if (!polygonNode) return null;
  const points = [];
  polygonNode.elements.forEach((element) => {
    if (["wp:start", "wp:lineTo"].includes(element.name)) {
      const { x, y } = element.attributes;
      points.push([polygonUnitsToPixels(x), polygonUnitsToPixels(y)]);
    }
  });
  if (points.length > 1) {
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    if (firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]) {
      points.pop();
    }
  }
  return points;
}
function objToPolygon(points) {
  if (!points || !Array.isArray(points)) return null;
  const polygonNode = {
    name: "wp:wrapPolygon",
    type: "wp:wrapPolygon",
    attributes: {
      edited: "0"
    },
    elements: []
  };
  points.forEach((point, index) => {
    const [x, y] = point;
    const tagName = index === 0 ? "wp:start" : "wp:lineTo";
    const pointNode = {
      name: tagName,
      type: tagName,
      attributes: {
        x: pixelsToPolygonUnits(x),
        y: pixelsToPolygonUnits(y)
      }
    };
    polygonNode.elements.push(pointNode);
  });
  if (points.length > 0) {
    const [startX, startY] = points[0];
    const closePointNode = {
      name: "wp:lineTo",
      type: "wp:lineTo",
      attributes: {
        x: pixelsToPolygonUnits(startX),
        y: pixelsToPolygonUnits(startY)
      }
    };
    polygonNode.elements.push(closePointNode);
  }
  return polygonNode;
}
const REMOTE_RESOURCE_PATTERN = /^https?:|^blob:|^file:/i;
const DATA_URI_PATTERN = /^data:/i;
const getArrayBufferFromUrl = async (input) => {
  if (input == null) {
    return new ArrayBuffer(0);
  }
  if (input instanceof ArrayBuffer) {
    return input;
  }
  if (ArrayBuffer.isView(input)) {
    const view = input;
    return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }
  if (typeof Blob !== "undefined" && input instanceof Blob) {
    return await input.arrayBuffer();
  }
  if (typeof input !== "string") {
    throw new TypeError("Unsupported media input type");
  }
  const trimmed = input.trim();
  const shouldFetchRemote = REMOTE_RESOURCE_PATTERN.test(trimmed);
  const isDataUri = DATA_URI_PATTERN.test(trimmed);
  if (shouldFetchRemote) {
    if (typeof fetch !== "function") {
      throw new Error(`Fetch API is not available to retrieve media: ${trimmed}`);
    }
    const response = await fetch(trimmed);
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }
    return await response.arrayBuffer();
  }
  const base64Payload = isDataUri ? trimmed.split(",", 2)[1] : trimmed.replace(/\s/g, "");
  try {
    if (typeof globalThis.atob === "function") {
      const binary = globalThis.atob(base64Payload);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    }
  } catch (err) {
    console.warn("atob failed, falling back to Buffer:", err);
  }
  const buf = Buffer.from(base64Payload, "base64");
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
};
const getContentTypesFromXml = (contentTypesXml) => {
  try {
    const result = libExports.xml2js(contentTypesXml, { compact: false });
    const types = result?.elements?.[0]?.elements || [];
    return types.filter((el) => el?.name === "Default").map((el) => el.attributes?.Extension).filter(Boolean);
  } catch (err) {
    console.warn("[super-editor] Failed to parse [Content_Types].xml", err);
    return [];
  }
};
const resolveOpcTargetPath = (target, baseDir = "word") => {
  if (!target) return null;
  if (target.includes("://")) return null;
  if (target.startsWith("/")) {
    return target.slice(1);
  }
  const segments = `${baseDir}/${target}`.split("/");
  const resolved = [];
  for (const seg of segments) {
    if (seg === "..") {
      resolved.pop();
    } else if (seg !== "." && seg !== "") {
      resolved.push(seg);
    }
  }
  return resolved.join("/");
};
const DOCX_HIGHLIGHT_KEYWORD_MAP = /* @__PURE__ */ new Map([
  ["yellow", "FFFF00"],
  ["green", "00FF00"],
  ["blue", "0000FF"],
  ["cyan", "00FFFF"],
  ["magenta", "FF00FF"],
  ["red", "FF0000"],
  ["darkYellow", "808000"],
  ["darkGreen", "008000"],
  ["darkBlue", "000080"],
  ["darkCyan", "008080"],
  ["darkMagenta", "800080"],
  ["darkGray", "808080"],
  ["darkRed", "800000"],
  ["lightGray", "C0C0C0"],
  ["black", "000000"],
  ["white", "FFFFFF"]
]);
const normalizeHexColor = (hex) => {
  if (!hex) return null;
  let value = hex.replace("#", "").trim();
  if (!value) return null;
  value = value.toUpperCase();
  if (value.length === 3)
    value = value.split("").map((c) => c + c).join("");
  if (value.length === 8) value = value.slice(0, 6);
  return value;
};
const getHexColorFromDocxSystem = (docxColor) => {
  const hex = DOCX_HIGHLIGHT_KEYWORD_MAP.get(docxColor);
  return hex ? `#${hex}` : null;
};
const getDocxHighlightKeywordFromHex = (hexColor) => {
  if (!hexColor) return null;
  if (DOCX_HIGHLIGHT_KEYWORD_MAP.has(hexColor)) return hexColor;
  const normalized = normalizeHexColor(hexColor);
  if (!normalized) return null;
  for (const [keyword, hex] of DOCX_HIGHLIGHT_KEYWORD_MAP.entries()) {
    if (hex === normalized) return keyword;
  }
  return null;
};
function isValidHexColor(color) {
  if (!color || typeof color !== "string") return false;
  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color);
    case 6:
      return /^[0-9A-F]{6}$/i.test(color);
    case 8:
      return /^[0-9A-F]{8}$/i.test(color);
    default:
      return false;
  }
}
const componentToHex = (val) => {
  const a = Number(val).toString(16);
  return a.length === 1 ? "0" + a : a;
};
const rgbToHex = (rgb) => {
  return "#" + rgb.match(/\d+/g).map(componentToHex).join("");
};
const DEFAULT_SHADING_FOREGROUND_COLOR = "#000000";
const hexToRgb = (hex) => {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
};
const clamp01 = (value) => {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
};
const blendHexColors = (backgroundHex, foregroundHex, foregroundRatio) => {
  const background = hexToRgb(backgroundHex);
  const foreground = hexToRgb(foregroundHex);
  if (!background || !foreground) return null;
  const ratio = clamp01(foregroundRatio);
  const r = Math.round(background.r * (1 - ratio) + foreground.r * ratio);
  const g = Math.round(background.g * (1 - ratio) + foreground.g * ratio);
  const b = Math.round(background.b * (1 - ratio) + foreground.b * ratio);
  const toByte = (n) => n.toString(16).padStart(2, "0").toUpperCase();
  return `${toByte(r)}${toByte(g)}${toByte(b)}`;
};
const resolveShadingFillColor = (shading) => {
  if (!shading || typeof shading !== "object") return null;
  const fill = normalizeHexColor(shading.fill);
  if (!fill) return null;
  const val = typeof shading.val === "string" ? shading.val.trim().toLowerCase() : "";
  const pctMatch = val.match(/^pct(\d{1,3})$/);
  if (!pctMatch) return fill;
  const pct = Number.parseInt(pctMatch[1], 10);
  if (!Number.isFinite(pct) || pct < 0 || pct > 100) return fill;
  const foreground = normalizeHexColor(shading.color) ?? DEFAULT_SHADING_FOREGROUND_COLOR;
  return blendHexColors(fill, foreground, pct / 100) ?? fill;
};
const deobfuscateFont = (arrayBuffer, guidHex) => {
  const dta = new Uint8Array(arrayBuffer);
  const guidStr = guidHex.replace(/[-{}]/g, "");
  if (guidStr.length !== 32) {
    console.error("Invalid GUID");
    return;
  }
  const guidBytes = new Uint8Array(16);
  for (let i = 0, j = 0; i < 32; i += 2, j++) {
    const hexByte = guidStr[i] + guidStr[i + 1];
    guidBytes[j] = parseInt(hexByte, 16);
  }
  for (let i = 0; i < 32; i++) {
    const gi = 15 - i % 16;
    dta[i] ^= guidBytes[gi];
  }
  return dta.buffer;
};
function convertSizeToCSS(value, type) {
  if (typeof value === "string" && value.endsWith("%")) {
    type = "pct";
  }
  if (value === null || value === void 0) {
    value = 0;
  }
  switch (type) {
    case "dxa":
    case null:
    case void 0:
      return `${twipsToPixels(value)}px`;
    case "nil":
      return "0";
    case "auto":
      return null;
    case "pct":
      let percent;
      if (typeof value === "number") {
        percent = value * 0.02;
      } else {
        if (value.endsWith("%")) {
          percent = parseFloat(value.slice(0, -1));
        } else {
          percent = parseFloat(value) * 0.02;
        }
      }
      return `${percent}%`;
    default:
      return null;
  }
}
export {
  rgbToHex as A,
  deobfuscateFont as B,
  getArrayBufferFromUrl as C,
  convertSizeToCSS as D,
  inchesToPixels as E,
  getDocxHighlightKeywordFromHex as a,
  getHexColorFromDocxSystem as b,
  twipsToPixels as c,
  linesToTwips as d,
  eighthPointsToPixels as e,
  twipsToLines as f,
  getContentTypesFromXml as g,
  halfPointToPoints as h,
  isValidHexColor as i,
  twipsToInches as j,
  pixelsToTwips as k,
  libExports as l,
  inchesToTwips as m,
  normalizeHexColor as n,
  pixelsToEightPoints as o,
  ptToTwips as p,
  emuToPixels as q,
  resolveShadingFillColor as r,
  polygonToObj as s,
  twipsToPt as t,
  rotToDegrees as u,
  pointsToTwips as v,
  pixelsToEmu as w,
  degreesToRot as x,
  objToPolygon as y,
  resolveOpcTargetPath as z
};
