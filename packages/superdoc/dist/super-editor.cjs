"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./chunks/index-B-v56jRR.cjs");
const superEditor_docxZipper = require("./super-editor/docx-zipper.cjs");
const superEditor_fileZipper = require("./super-editor/file-zipper.cjs");
const vue = require("./chunks/vue-De9wkgLl.cjs");
const superEditor_converter = require("./chunks/SuperConverter--V0Gvst5.cjs");
function isNodeType(node, name) {
  return node.type.name === name;
}
function assertNodeType(node, name) {
  if (node.type.name !== name) {
    throw new Error(`Expected node type "${name}", got "${node.type.name}"`);
  }
}
function isMarkType(mark, name) {
  return mark.type.name === name;
}
function defineNode(config) {
  return index.Node.create(config);
}
function defineMark(config) {
  return index.Mark.create(config);
}
const _hoisted_1 = ["accept"];
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  __name: "BasicUpload",
  props: {
    accept: { default: ".docx, .pdf, .html, .md" }
  },
  emits: ["file-change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const onFileChange = (event) => {
      const target = event.target;
      if (target.files?.[0]) {
        emit("file-change", target.files[0]);
      }
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", null, [
        vue.createBaseVNode("input", {
          type: "file",
          id: "fileInput",
          onChange: onFileChange,
          accept: __props.accept
        }, null, 40, _hoisted_1)
      ]);
    };
  }
});
exports.AIWriter = index.AIWriter;
exports.AnnotatorHelpers = index.AnnotatorHelpers;
exports.CommentsPluginKey = index.CommentsPluginKey;
exports.Editor = index.Editor;
exports.Extensions = index.Extensions;
exports.PresentationEditor = index.PresentationEditor;
exports.SectionHelpers = index.SectionHelpers;
exports.SlashMenu = index._sfc_main;
exports.SuperEditor = index.SuperEditor;
exports.SuperInput = index.SuperInput;
exports.SuperToolbar = index.SuperToolbar;
exports.Toolbar = index.Toolbar;
exports.TrackChangesBasePluginKey = index.TrackChangesBasePluginKey;
exports.fieldAnnotationHelpers = index.index;
exports.getActiveFormatting = index.getActiveFormatting;
exports.getAllowedImageDimensions = index.getAllowedImageDimensions;
exports.getMarksFromSelection = index.getMarksFromSelection;
exports.getRichTextExtensions = index.getRichTextExtensions;
exports.getStarterExtensions = index.getStarterExtensions;
exports.helpers = index.helpers;
exports.trackChangesHelpers = index.index$1;
exports.DocxZipper = superEditor_docxZipper;
exports.createZip = superEditor_fileZipper.createZip;
exports.SuperConverter = superEditor_converter.SuperConverter;
exports.registeredHandlers = superEditor_converter.registeredHandlers;
exports.BasicUpload = _sfc_main;
exports.assertNodeType = assertNodeType;
exports.defineMark = defineMark;
exports.defineNode = defineNode;
exports.isMarkType = isMarkType;
exports.isNodeType = isNodeType;
