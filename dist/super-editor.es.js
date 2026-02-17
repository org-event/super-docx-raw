import { N as Node, M as Mark } from "./chunks/index-afjksbRp.es.js";
import { A, d, C, E, m, P, e, _, a, b, S, T, n, i, f, l, g, k, j, h, c } from "./chunks/index-afjksbRp.es.js";
import { default as default2 } from "./super-editor/docx-zipper.es.js";
import { createZip } from "./super-editor/file-zipper.es.js";
import { d as defineComponent, c as createElementBlock, o as openBlock, a as createBaseVNode } from "./chunks/vue-DI6_Tcq0.es.js";
import { S as S2, r } from "./chunks/SuperConverter-Cp6MGMGh.es.js";
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
  return Node.create(config);
}
function defineMark(config) {
  return Mark.create(config);
}
const _hoisted_1 = ["accept"];
const _sfc_main = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("input", {
          type: "file",
          id: "fileInput",
          onChange: onFileChange,
          accept: __props.accept
        }, null, 40, _hoisted_1)
      ]);
    };
  }
});
export {
  A as AIWriter,
  d as AnnotatorHelpers,
  _sfc_main as BasicUpload,
  C as CommentsPluginKey,
  default2 as DocxZipper,
  E as Editor,
  m as Extensions,
  P as PresentationEditor,
  e as SectionHelpers,
  _ as SlashMenu,
  S2 as SuperConverter,
  a as SuperEditor,
  b as SuperInput,
  S as SuperToolbar,
  T as Toolbar,
  n as TrackChangesBasePluginKey,
  assertNodeType,
  createZip,
  defineMark,
  defineNode,
  i as fieldAnnotationHelpers,
  f as getActiveFormatting,
  l as getAllowedImageDimensions,
  g as getMarksFromSelection,
  k as getRichTextExtensions,
  j as getStarterExtensions,
  h as helpers,
  isMarkType,
  isNodeType,
  r as registeredHandlers,
  c as trackChangesHelpers
};
