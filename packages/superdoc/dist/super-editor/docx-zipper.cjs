"use strict";
const jszip = require("../chunks/jszip-C8_CqJxM.cjs");
const helpers = require("../chunks/helpers-C7_u3NNJ.cjs");
const jszip_min = require("../chunks/jszip.min-BPh2MMAa.cjs");
const isXmlLike = (name) => /\.xml$|\.rels$/i.test(name);
function sniffEncoding(u8) {
  if (u8.length >= 2) {
    const b0 = u8[0], b1 = u8[1];
    if (b0 === 255 && b1 === 254) return "utf-16le";
    if (b0 === 254 && b1 === 255) return "utf-16be";
  }
  let nul = 0;
  for (let i = 0; i < Math.min(64, u8.length); i++) if (u8[i] === 0) nul++;
  if (nul > 16) return "utf-16le";
  return "utf-8";
}
function stripBOM(str) {
  return str && str.charCodeAt(0) === 65279 ? str.slice(1) : str;
}
function ensureXmlString(content) {
  if (typeof content === "string") return stripBOM(content);
  let u8 = null;
  if (content && typeof content === "object") {
    if (content instanceof Uint8Array) {
      u8 = content;
    } else if (typeof jszip.Buffer !== "undefined" && jszip.Buffer.isBuffer && jszip.Buffer.isBuffer(content)) {
      u8 = new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
    } else if (ArrayBuffer.isView && ArrayBuffer.isView(content)) {
      u8 = new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
    } else if (content.constructor && (content instanceof ArrayBuffer || content.constructor.name === "ArrayBuffer")) {
      u8 = new Uint8Array(content);
    }
  }
  if (!u8) throw new Error("Unsupported content type for XML");
  const enc = sniffEncoding(u8);
  let xml = new TextDecoder(enc).decode(u8);
  return stripBOM(xml);
}
class DocxZipper {
  constructor(params = {}) {
    this.debug = params.debug || false;
    this.zip = new jszip_min.JSZip();
    this.files = [];
    this.media = {};
    this.mediaFiles = {};
    this.fonts = {};
  }
  /**
   * Get all docx data from the zipped docx
   *
   * [ContentTypes].xml
   * _rels/.rels
   * word/document.xml
   * word/_rels/document.xml.rels
   * word/footnotes.xml
   * word/endnotes.xml
   * word/header1.xml
   * word/theme/theme1.xml
   * word/settings.xml
   * word/styles.xml
   * word/webSettings.xml
   * word/fontTable.xml
   * docProps/core.xml
   * docProps/app.xml
   * */
  async getDocxData(file, isNode = false) {
    const extractedFiles = await this.unzip(file);
    const files = Object.entries(extractedFiles.files);
    for (const [, zipEntry] of files) {
      const name = zipEntry.name;
      if (isXmlLike(name)) {
        const u8 = await zipEntry.async("uint8array");
        const content = ensureXmlString(u8);
        this.files.push({ name, content });
      } else if (name.startsWith("word/media") && name !== "word/media/" || zipEntry.name.startsWith("media") && zipEntry.name !== "media/" || name.startsWith("media") && name !== "media/" || name.startsWith("word/embeddings") && name !== "word/embeddings/") {
        if (isNode) {
          const buffer = await zipEntry.async("nodebuffer");
          const fileBase64 = buffer.toString("base64");
          this.mediaFiles[name] = fileBase64;
        } else {
          const fileBase64 = await zipEntry.async("base64");
          const extension = this.getFileExtension(name)?.toLowerCase();
          const imageTypes = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "bmp", "tiff", "emf", "wmf", "svg", "webp"]);
          if (imageTypes.has(extension)) {
            this.mediaFiles[name] = `data:image/${extension};base64,${fileBase64}`;
            const blob = await zipEntry.async("blob");
            const fileObj = new File([blob], name, { type: blob.type });
            const imageUrl = URL.createObjectURL(fileObj);
            this.media[name] = imageUrl;
          } else {
            this.mediaFiles[name] = fileBase64;
          }
        }
      } else if (name.startsWith("word/fonts") && name !== "word/fonts/") {
        const uint8array = await zipEntry.async("uint8array");
        this.fonts[name] = uint8array;
      }
    }
    return this.files;
  }
  getFileExtension(fileName) {
    const fileSplit = fileName.split(".");
    if (fileSplit.length < 2) return null;
    return fileSplit[fileSplit.length - 1];
  }
  /**
   * Update [Content_Types].xml with extensions of new Image annotations
   */
  async updateContentTypes(docx, media, fromJson, updatedDocs = {}) {
    const additionalPartNames = Object.keys(updatedDocs || {});
    const imageExts = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "bmp", "tiff", "emf", "wmf", "svg", "webp"]);
    const newMediaTypes = Object.keys(media).map((name) => this.getFileExtension(name)).filter((ext) => ext && imageExts.has(ext));
    const contentTypesPath = "[Content_Types].xml";
    let contentTypesXml;
    if (fromJson) {
      if (Array.isArray(docx.files)) {
        contentTypesXml = docx.files.find((file) => file.name === contentTypesPath)?.content || "";
      } else {
        contentTypesXml = docx.files?.[contentTypesPath] || "";
      }
    } else contentTypesXml = await docx.file(contentTypesPath).async("string");
    let typesString = "";
    const defaultMediaTypes = helpers.getContentTypesFromXml(contentTypesXml);
    const seenTypes = /* @__PURE__ */ new Set();
    for (let type of newMediaTypes) {
      if (defaultMediaTypes.includes(type)) continue;
      if (seenTypes.has(type)) continue;
      const newContentType = `<Default Extension="${type}" ContentType="image/${type}"/>`;
      typesString += newContentType;
      seenTypes.add(type);
    }
    const xmlJson = JSON.parse(helpers.libExports.xml2json(contentTypesXml, null, 2));
    const types = xmlJson.elements?.find((el) => el.name === "Types") || {};
    const hasComments = types.elements?.some(
      (el) => el.name === "Override" && el.attributes.PartName === "/word/comments.xml"
    );
    const hasCommentsExtended = types.elements?.some(
      (el) => el.name === "Override" && el.attributes.PartName === "/word/commentsExtended.xml"
    );
    const hasCommentsIds = types.elements?.some(
      (el) => el.name === "Override" && el.attributes.PartName === "/word/commentsIds.xml"
    );
    const hasCommentsExtensible = types.elements?.some(
      (el) => el.name === "Override" && el.attributes.PartName === "/word/commentsExtensible.xml"
    );
    const hasFile = (filename) => {
      if (updatedDocs && Object.prototype.hasOwnProperty.call(updatedDocs, filename)) {
        return true;
      }
      if (!docx?.files) return false;
      if (!fromJson) return Boolean(docx.files[filename]);
      if (Array.isArray(docx.files)) return docx.files.some((file) => file.name === filename);
      return Boolean(docx.files[filename]);
    };
    if (hasFile("word/comments.xml")) {
      const commentsDef = `<Override PartName="/word/comments.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml" />`;
      if (!hasComments) typesString += commentsDef;
    }
    if (hasFile("word/commentsExtended.xml")) {
      const commentsExtendedDef = `<Override PartName="/word/commentsExtended.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml" />`;
      if (!hasCommentsExtended) typesString += commentsExtendedDef;
    }
    if (hasFile("word/commentsIds.xml")) {
      const commentsIdsDef = `<Override PartName="/word/commentsIds.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml" />`;
      if (!hasCommentsIds) typesString += commentsIdsDef;
    }
    if (hasFile("word/commentsExtensible.xml")) {
      const commentsExtendedDef = `<Override PartName="/word/commentsExtensible.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtensible+xml" />`;
      if (!hasCommentsExtensible) typesString += commentsExtendedDef;
    }
    const hasFootnotes = types.elements?.some(
      (el) => el.name === "Override" && el.attributes.PartName === "/word/footnotes.xml"
    );
    if (hasFile("word/footnotes.xml")) {
      const footnotesDef = `<Override PartName="/word/footnotes.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml" />`;
      if (!hasFootnotes) typesString += footnotesDef;
    }
    const partNames = new Set(additionalPartNames);
    if (docx?.files) {
      if (fromJson && Array.isArray(docx.files)) {
        docx.files.forEach((file) => partNames.add(file.name));
      } else {
        Object.keys(docx.files).forEach((key) => partNames.add(key));
      }
    }
    partNames.forEach((name) => {
      if (name.includes(".rels")) return;
      if (!name.includes("header") && !name.includes("footer")) return;
      const hasExtensible = types.elements?.some(
        (el) => el.name === "Override" && el.attributes.PartName === `/${name}`
      );
      const type = name.includes("header") ? "header" : "footer";
      const extendedDef = `<Override PartName="/${name}" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.${type}+xml"/>`;
      if (!hasExtensible) {
        typesString += extendedDef;
      }
    });
    const beginningString = '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">';
    let updatedContentTypesXml = contentTypesXml.replace(beginningString, `${beginningString}${typesString}`);
    let relationshipsXml = updatedDocs["word/_rels/document.xml.rels"];
    if (!relationshipsXml) {
      if (fromJson) {
        if (Array.isArray(docx.files)) {
          relationshipsXml = docx.files.find((file) => file.name === "word/_rels/document.xml.rels")?.content;
        } else {
          relationshipsXml = docx.files?.["word/_rels/document.xml.rels"];
        }
      } else {
        relationshipsXml = await docx.file("word/_rels/document.xml.rels")?.async("string");
      }
    }
    if (relationshipsXml) {
      try {
        const relJson = helpers.libExports.xml2js(relationshipsXml, { compact: false });
        const relationships = relJson.elements?.find((el) => el.name === "Relationships");
        relationships?.elements?.forEach((rel) => {
          const type = rel.attributes?.Type;
          const target = rel.attributes?.Target;
          if (!type || !target) return;
          const isHeader = type.includes("/header");
          const isFooter = type.includes("/footer");
          if (!isHeader && !isFooter) return;
          let sanitizedTarget = target.replace(/^\.\//, "");
          if (sanitizedTarget.startsWith("../")) sanitizedTarget = sanitizedTarget.slice(3);
          if (sanitizedTarget.startsWith("/")) sanitizedTarget = sanitizedTarget.slice(1);
          const partName = sanitizedTarget.startsWith("word/") ? sanitizedTarget : `word/${sanitizedTarget}`;
          partNames.add(partName);
        });
      } catch (error) {
        console.warn("Failed to parse document relationships while updating content types", error);
      }
    }
    partNames.forEach((name) => {
      if (name.includes(".rels")) return;
      if (!name.includes("header") && !name.includes("footer")) return;
      if (updatedContentTypesXml.includes(`PartName="/${name}"`)) return;
      const type = name.includes("header") ? "header" : "footer";
      const extendedDef = `<Override PartName="/${name}" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.${type}+xml"/>`;
      updatedContentTypesXml = updatedContentTypesXml.replace("</Types>", `${extendedDef}</Types>`);
    });
    if (fromJson) return updatedContentTypesXml;
    docx.file(contentTypesPath, updatedContentTypesXml);
  }
  async unzip(file) {
    const zip = await this.zip.loadAsync(file);
    return zip;
  }
  async updateZip({ docx, updatedDocs, originalDocxFile, media, fonts, isHeadless }) {
    let zip;
    if (originalDocxFile) {
      zip = await this.exportFromOriginalFile(originalDocxFile, updatedDocs, media);
    } else {
      zip = await this.exportFromCollaborativeDocx(docx, updatedDocs, media, fonts);
    }
    const exportType = isHeadless ? "nodebuffer" : "blob";
    return await zip.generateAsync({ type: exportType });
  }
  /**
   * Export the Editor content to a docx file, updating changed docs
   * @param {Object} docx An object containing the unzipped docx files (keys are relative file names)
   * @param {Object} updatedDocs An object containing the updated docs (keys are relative file names)
   * @returns {Promise<JSZip>} The unzipped but updated docx file ready for zipping
   */
  async exportFromCollaborativeDocx(docx, updatedDocs, media, fonts) {
    const zip = new jszip_min.JSZip();
    for (const file of docx) {
      const content = file.content;
      zip.file(file.name, content);
    }
    Object.keys(updatedDocs).forEach((key) => {
      const content = updatedDocs[key];
      zip.file(key, content);
    });
    Object.keys(media).forEach((path) => {
      const binaryData = jszip.Buffer.from(media[path], "base64");
      zip.file(path, binaryData);
    });
    for (const [fontName, fontUintArray] of Object.entries(fonts)) {
      zip.file(fontName, fontUintArray);
    }
    await this.updateContentTypes(zip, media, false, updatedDocs);
    return zip;
  }
  /**
   * Export the Editor content to a docx file, updating changed docs
   * Requires the original docx file
   * @param {File} originalDocxFile The original docx file
   * @param {Object} updatedDocs An object containing the updated docs (keys are relative file names)
   * @returns {Promise<JSZip>} The unzipped but updated docx file ready for zipping
   */
  async exportFromOriginalFile(originalDocxFile, updatedDocs, media) {
    const unzippedOriginalDocx = await this.unzip(originalDocxFile);
    const filePromises = [];
    unzippedOriginalDocx.forEach((relativePath, zipEntry) => {
      const promise = zipEntry.async("string").then((content) => {
        unzippedOriginalDocx.file(zipEntry.name, content);
      });
      filePromises.push(promise);
    });
    await Promise.all(filePromises);
    Object.keys(updatedDocs).forEach((key) => {
      unzippedOriginalDocx.file(key, updatedDocs[key]);
    });
    Object.keys(media).forEach((path) => {
      unzippedOriginalDocx.file(path, media[path]);
    });
    await this.updateContentTypes(unzippedOriginalDocx, media, false, updatedDocs);
    return unzippedOriginalDocx;
  }
}
module.exports = DocxZipper;
