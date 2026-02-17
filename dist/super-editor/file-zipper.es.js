import { J as JSZip } from "./chunks/docx-zipper-DVcRpcec.js";
async function createZip(blobs, fileNames) {
  const zip = new JSZip();
  blobs.forEach((blob, index) => {
    zip.file(fileNames[index], blob);
  });
  const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  return zipBlob;
}
export {
  createZip
};
