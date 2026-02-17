"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jszip_min = require("../chunks/jszip.min-BPh2MMAa.cjs");
async function createZip(blobs, fileNames) {
  const zip = new jszip_min.JSZip();
  blobs.forEach((blob, index) => {
    zip.file(fileNames[index], blob);
  });
  const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  return zipBlob;
}
exports.createZip = createZip;
