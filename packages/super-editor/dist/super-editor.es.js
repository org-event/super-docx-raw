var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _MARK_TOGGLE_NAMES, _SuperToolbar_instances, initToolbarGroups_fn, _interceptedCommands, makeToolbarItems_fn, initDefaultFonts_fn, updateHighlightColors_fn, deactivateAll_fn, updateToolbarHistory_fn, enrichTrackedChanges_fn, runCommandWithArgumentOnly_fn, syncStickyMarksFromState_fn, restoreStickyMarksIfNeeded_fn, ensureStoredMarksForMarkToggle_fn, isFieldAnnotationSelection_fn;
import { N as Node, M as Mark, _ as _export_sfc, u as useHighContrastMode, a as getQuickFormatList, b as generateLinkedStyleString, c as getFileOpener, d as checkAndProcessImage, r as replaceSelectionWithImagePlaceholder, e as uploadAndInsertImage, f as collectTrackedChanges, i as isTrackedChangeActionAllowed, y as yUndoPluginKey, h as undoDepth, j as redoDepth, k as getEditorSurfaceElement, l as collectTrackedChangesForContext, S as SLASH_MENU_HANDLED_FLAG, m as SlashMenuPluginKey, s as shouldBypassContextMenu, n as generateRulerDefinition, o as clampHandlePosition, p as calculateMarginFromHandle, q as measureCache, t as isHeadless, P as PresentationEditor, E as Editor, v as getStarterExtensions, w as Placeholder, x as getRichTextExtensions, D as DecorationSet, z as Decoration, A as Extension, B as Attribute } from "./chunks/editor-CZPleja1.js";
import { G, J, H, T, C, I, F } from "./chunks/editor-CZPleja1.js";
import { aP as getDefaultExportFromCjs, v as v4, T as TextSelection$1, y as getMarkRange, aS as vClickOutside, aT as getActiveFormatting, aI as isInTable, V as findParentNode, az as calculateResolvedParagraphProperties, a9 as twipsToLines, W as isList, au as parseSizeUnit, N as NodeSelection, Z as isMacOS, aa as pixelsToTwips, aU as getFileObject, P as PluginKey, a as Plugin } from "./chunks/converter-DgHap5EC.js";
import { ag, i, ab, aV } from "./chunks/converter-DgHap5EC.js";
import { ref, onMounted, createElementBlock, openBlock, normalizeClass, unref, Fragment, renderList, createElementVNode, withModifiers, toDisplayString, createCommentVNode, normalizeStyle, computed, watch, withDirectives, withKeys, vModelText, createTextVNode, createVNode, h, createApp, markRaw, nextTick, onBeforeUnmount, defineComponent, reactive, onUnmounted, renderSlot, useCssVars, shallowRef, createBlock, Teleport, withCtx, resolveDynamicComponent, normalizeProps, guardReactiveProps } from "vue";
import { t as toolbarIcons, s as sanitizeNumber, T as Toolbar, a as TrashIcon, A as AddRowTopIcon, b as AddRowBottomIcon, c as AddColLeftIcon, d as AddColRightIcon, R as RemoveRowIcon, e as RemoveColIcon, f as TableCellMergeIcon, g as TableCellSplitIcon, u as useMessage, N as NSkeleton } from "./chunks/toolbar-CdtrXT4d.js";
import AIWriter from "./ai-writer.es.js";
import { D } from "./chunks/docx-zipper-DVcRpcec.js";
import { createZip } from "./file-zipper.es.js";
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
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i2 = 0, l = handlers.length, ee = new Array(l); i2 < l; i2++) {
        ee[i2] = handlers[i2].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i2;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i2 = 1, args = new Array(len - 1); i2 < len; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i2 = 0; i2 < length; i2++) {
          if (listeners[i2].once) this.removeListener(event, listeners[i2].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i2].fn.call(listeners[i2].context);
              break;
            case 2:
              listeners[i2].fn.call(listeners[i2].context, a1);
              break;
            case 3:
              listeners[i2].fn.call(listeners[i2].context, a1, a2);
              break;
            case 4:
              listeners[i2].fn.call(listeners[i2].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i2].fn.apply(listeners[i2].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i2 = 0, events = [], length = listeners.length; i2 < length; i2++) {
          if (listeners[i2].fn !== fn || once && !listeners[i2].once || context && listeners[i2].context !== context) {
            events.push(listeners[i2]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
const useToolbarItem = (options) => {
  const types = ["button", "options", "separator", "dropdown", "overflow"];
  if (!types.includes(options.type)) {
    throw new Error("Invalid toolbar item type - " + options.type);
  }
  if (options.type === "button" && !options.defaultLabel && !options.icon) {
    throw new Error("Toolbar button item needs either icon or label - " + options.name);
  }
  if (!options.name) {
    throw new Error("Invalid toolbar item name - " + options.name);
  }
  const id = ref(v4());
  const type = options.type;
  const name = ref(options.name);
  const command = options.command;
  const noArgumentCommand = options.noArgumentCommand;
  const icon = ref(options.icon);
  const group = ref(options.group || "center");
  const allowWithoutEditor = ref(options.allowWithoutEditor);
  const attributes = ref(options.attributes || {});
  const initiallyDisabled = options.disabled || false;
  const disabled = ref(options.disabled);
  const active = ref(false);
  const expand = ref(false);
  const style = ref(options.style);
  const isNarrow = ref(options.isNarrow);
  const isWide = ref(options.isWide);
  const minWidth = ref(options.minWidth);
  const suppressActiveHighlight = ref(options.suppressActiveHighlight || false);
  const argument = ref(options.argument);
  const childItem = ref(null);
  const parentItem = ref(null);
  const iconColor = ref(options.iconColor);
  const hasCaret = ref(options.hasCaret);
  const restoreEditorFocus = Boolean(options.restoreEditorFocus);
  const dropdownStyles = ref(options.dropdownStyles);
  const tooltip = ref(options.tooltip);
  const tooltipVisible = ref(options.tooltipVisible);
  const tooltipTimeout = ref(options.tooltipTimeout);
  const defaultLabel = ref(options.defaultLabel);
  const label = ref(options.label);
  const hideLabel = ref(options.hideLabel);
  const inlineTextInputVisible = ref(options.inlineTextInputVisible);
  const hasInlineTextInput = ref(options.hasInlineTextInput);
  const markName = ref(options.markName);
  const labelAttr = ref(options.labelAttr);
  const selectedValue = ref(options.selectedValue);
  const dropdownValueKey = ref(options.dropdownValueKey);
  const inputRef = ref(options.inputRef || null);
  const nestedOptions = ref([]);
  if (options.options) {
    if (!Array.isArray(options.options)) throw new Error("Invalid toolbar item options - " + options.options);
    nestedOptions.value?.push(...options.options);
  }
  const activate = (attrs = {}, ...args) => {
    onActivate(attrs, ...args);
    if (suppressActiveHighlight.value) return;
    active.value = true;
  };
  const deactivate = () => {
    onDeactivate();
    active.value = false;
  };
  const setDisabled = (state) => {
    disabled.value = state;
  };
  const resetDisabled = () => {
    disabled.value = initiallyDisabled;
  };
  const onActivate = options.onActivate || (() => null);
  const onDeactivate = options.onDeactivate || (() => null);
  const unref2 = () => {
    const flattened = {};
    Object.keys(refs).forEach((key) => {
      if (refs[key].value !== void 0) {
        flattened[key] = refs[key].value;
      }
    });
    return flattened;
  };
  const refs = {
    id,
    name,
    type,
    command,
    noArgumentCommand,
    icon,
    tooltip,
    group,
    attributes,
    disabled,
    active,
    expand,
    nestedOptions,
    style,
    isNarrow,
    isWide,
    minWidth,
    argument,
    parentItem,
    iconColor,
    hasCaret,
    dropdownStyles,
    tooltipVisible,
    tooltipTimeout,
    defaultLabel,
    label,
    hideLabel,
    inlineTextInputVisible,
    hasInlineTextInput,
    restoreEditorFocus,
    markName,
    labelAttr,
    childItem,
    allowWithoutEditor,
    dropdownValueKey,
    selectedValue,
    inputRef
  };
  return {
    ...refs,
    unref: unref2,
    activate,
    deactivate,
    setDisabled,
    resetDisabled,
    onActivate,
    onDeactivate
  };
};
const _hoisted_1$f = ["onClick", "innerHTML", "aria-label", "onKeydown"];
const _sfc_main$h = {
  __name: "AlignmentButtons",
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const { isHighContrastMode } = useHighContrastMode();
    const emit = __emit;
    const alignmentButtonsRefs = ref([]);
    const alignmentButtons = [
      {
        key: "left",
        ariaLabel: "Align left",
        icon: toolbarIcons.alignLeft
      },
      {
        key: "center",
        ariaLabel: "Align center",
        icon: toolbarIcons.alignCenter
      },
      {
        key: "right",
        ariaLabel: "Align right",
        icon: toolbarIcons.alignRight
      },
      {
        key: "justify",
        ariaLabel: "Justify",
        icon: toolbarIcons.alignJustify
      }
    ];
    const select = (alignment2) => {
      emit("select", alignment2);
    };
    const moveToNextButton = (index) => {
      if (index === alignmentButtonsRefs.value.length - 1) return;
      const nextButton = alignmentButtonsRefs.value[index + 1];
      if (nextButton) {
        nextButton.setAttribute("tabindex", "0");
        nextButton.focus();
      }
    };
    const moveToPreviousButton = (index) => {
      if (index === 0) return;
      const previousButton = alignmentButtonsRefs.value[index - 1];
      if (previousButton) {
        previousButton.setAttribute("tabindex", "0");
        previousButton.focus();
      }
    };
    const handleKeyDown = (e, index) => {
      switch (e.key) {
        case "ArrowLeft":
          moveToPreviousButton(index);
          break;
        case "ArrowRight":
          moveToNextButton(index);
          break;
        case "Enter":
          select(alignmentButtons[index].key);
          break;
      }
    };
    onMounted(() => {
      const firstButton = alignmentButtonsRefs.value[0];
      if (firstButton) {
        firstButton.setAttribute("tabindex", "0");
        firstButton.focus();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["alignment-buttons", { "high-contrast": unref(isHighContrastMode) }])
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(alignmentButtons, (button, index) => {
          return createElementVNode("div", {
            key: button.key,
            class: "button-icon",
            onClick: ($event) => select(button.key),
            innerHTML: button.icon,
            "data-item": "btn-textAlign-option",
            role: "menuitem",
            "aria-label": button.ariaLabel,
            ref_for: true,
            ref_key: "alignmentButtonsRefs",
            ref: alignmentButtonsRefs,
            onKeydown: withModifiers((event) => handleKeyDown(event, index), ["prevent"])
          }, null, 40, _hoisted_1$f);
        }), 64))
      ], 2);
    };
  }
};
const AlignmentButtons = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-d84f57b6"]]);
const _hoisted_1$e = ["onClick", "onKeydown"];
const _hoisted_2$9 = { class: "document-mode-column icon-column" };
const _hoisted_3$6 = ["innerHTML"];
const _hoisted_4$3 = { class: "document-mode-column text-column" };
const _hoisted_5$2 = { class: "document-mode-type" };
const _hoisted_6$1 = { class: "document-mode-description" };
const _sfc_main$g = {
  __name: "DocumentMode",
  props: {
    options: {
      type: Array
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const documentModeRefs = ref([]);
    const { isHighContrastMode } = useHighContrastMode();
    const props = __props;
    const handleClick = (item) => {
      emit("select", item);
    };
    const moveToNextOption = (index) => {
      if (index === documentModeRefs.value.length - 1) return;
      const nextOption = documentModeRefs.value[index + 1];
      if (nextOption) {
        nextOption.setAttribute("tabindex", "0");
        nextOption.focus();
      }
    };
    const moveToPreviousOption = (index) => {
      if (index === 0) return;
      const previousOption = documentModeRefs.value[index - 1];
      if (previousOption) {
        previousOption.setAttribute("tabindex", "0");
        previousOption.focus();
      }
    };
    const handleKeyDown = (e, index) => {
      switch (e.key) {
        case "ArrowDown":
          moveToNextOption(index);
          break;
        case "ArrowUp":
          moveToPreviousOption(index);
          break;
        case "Enter":
          handleClick(props.options[index]);
          break;
      }
    };
    onMounted(() => {
      documentModeRefs.value[0].setAttribute("tabindex", "0");
      documentModeRefs.value[0].focus();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["document-mode", { "high-contrast": unref(isHighContrastMode) }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["option-item", { disabled: option.disabled }]),
            onClick: ($event) => handleClick(option),
            "data-item": "btn-documentMode-option",
            role: "menuitem",
            ref_for: true,
            ref_key: "documentModeRefs",
            ref: documentModeRefs,
            onKeydown: withModifiers((event) => handleKeyDown(event, index), ["prevent"])
          }, [
            createElementVNode("div", _hoisted_2$9, [
              createElementVNode("div", {
                class: "icon-column__icon",
                innerHTML: option.icon
              }, null, 8, _hoisted_3$6)
            ]),
            createElementVNode("div", _hoisted_4$3, [
              createElementVNode("div", _hoisted_5$2, toDisplayString(option.label), 1),
              createElementVNode("div", _hoisted_6$1, toDisplayString(option.description), 1)
            ])
          ], 42, _hoisted_1$e);
        }), 256))
      ], 2);
    };
  }
};
const DocumentMode = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-8730b752"]]);
const _hoisted_1$d = {
  key: 0,
  class: "linked-style-buttons",
  "data-editor-ui-surface": ""
};
const _hoisted_2$8 = ["onClick", "onKeydown", "aria-label"];
const _sfc_main$f = {
  __name: "LinkedStyle",
  props: {
    editor: {
      type: Object,
      required: true
    },
    selectedOption: {
      type: String
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const styleRefs = ref([]);
    const props = __props;
    const select = (style) => {
      emit("select", style);
    };
    const moveToNextStyle = (index) => {
      if (index === styleRefs.value.length - 1) {
        return;
      }
      const nextItem = styleRefs.value[index + 1];
      nextItem.setAttribute("tabindex", "0");
      nextItem.focus();
    };
    const moveToPreviousStyle = (index) => {
      if (index === 0) {
        return;
      }
      const previousItem = styleRefs.value[index - 1];
      previousItem.setAttribute("tabindex", "0");
      previousItem.focus();
    };
    const handleKeyDown = (event, index, style) => {
      switch (event.key) {
        case "ArrowDown":
          moveToNextStyle(index);
          break;
        case "ArrowUp":
          moveToPreviousStyle(index);
          break;
        case "Enter":
          event.preventDefault();
          select(style);
          break;
      }
    };
    onMounted(() => {
      styleRefs.value[0].setAttribute("tabindex", "0");
      styleRefs.value[0].focus();
    });
    return (_ctx, _cache) => {
      return props.editor ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getQuickFormatList)(__props.editor), (style, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["style-item", { selected: __props.selectedOption === style.id }]),
            onClick: ($event) => select(style),
            onKeydown: (event) => handleKeyDown(event, index, style),
            "aria-label": `Linked style - ${style.id}`,
            ref_for: true,
            ref_key: "styleRefs",
            ref: styleRefs
          }, [
            createElementVNode("div", {
              class: "style-name",
              style: normalizeStyle(unref(generateLinkedStyleString)(style, null, null, false)),
              "data-item": "btn-linkedStyles-option"
            }, toDisplayString(style.definition.attrs.name), 5)
          ], 42, _hoisted_2$8);
        }), 256))
      ])) : createCommentVNode("", true);
    };
  }
};
const LinkedStyle = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-ecb78965"]]);
const _hoisted_1$c = {
  key: 0,
  class: "link-title"
};
const _hoisted_2$7 = {
  key: 1,
  class: "link-title"
};
const _hoisted_3$5 = {
  key: 2,
  class: "link-title"
};
const _hoisted_4$2 = {
  key: 3,
  class: "link-input-wrapper"
};
const _hoisted_5$1 = { class: "input-row text-input-row" };
const _hoisted_6 = ["onKeydown"];
const _hoisted_7 = { class: "input-row url-input-row" };
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = ["onKeydown"];
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "input-row link-buttons" };
const _hoisted_12 = ["innerHTML"];
const _hoisted_13 = {
  key: 4,
  class: "input-row go-to-anchor clickable"
};
const _sfc_main$e = {
  __name: "LinkInput",
  props: {
    showInput: {
      type: Boolean,
      default: true
    },
    showLink: {
      type: Boolean,
      default: true
    },
    goToAnchor: {
      type: Function,
      default: () => {
      }
    },
    editor: {
      type: Object,
      required: true
    },
    closePopover: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const { isHighContrastMode } = useHighContrastMode();
    const urlError = ref(false);
    const getSelectedText = () => {
      if (!props.editor || !props.editor.state) return "";
      const { state } = props.editor;
      const { selection } = state;
      const linkMark = state.schema.marks.link;
      if (selection.empty) {
        const range = getMarkRange(selection.$from, linkMark);
        return range ? state.doc.textBetween(range.from, range.to, " ") : "";
      }
      const rangeFrom = getMarkRange(selection.$from, linkMark);
      const rangeTo = getMarkRange(selection.$to, linkMark);
      if (rangeFrom || rangeTo) {
        const linkRange = rangeFrom || rangeTo;
        return state.doc.textBetween(linkRange.from, linkRange.to, " ");
      }
      return state.doc.textBetween(selection.from, selection.to, " ");
    };
    const getLinkHrefAtSelection = () => {
      if (!props.editor || !props.editor.state) return "";
      const { state } = props.editor;
      const { schema, selection } = state;
      const linkMark = schema.marks.link;
      if (!linkMark) return "";
      let href = "";
      const { $from, empty } = selection;
      if (empty) {
        const marks = state.storedMarks || $from.marks();
        let link = marks.find((mark) => mark.type === linkMark);
        if (!link) {
          const nodeAfter = $from.nodeAfter;
          const nodeBefore = $from.nodeBefore;
          const marksOnNodeAfter = nodeAfter && Array.isArray(nodeAfter.marks) ? nodeAfter.marks : [];
          const marksOnNodeBefore = nodeBefore && Array.isArray(nodeBefore.marks) ? nodeBefore.marks : [];
          link = marksOnNodeAfter.find((mark) => mark.type === linkMark) || marksOnNodeBefore.find((mark) => mark.type === linkMark);
        }
        if (link && link.attrs && link.attrs.href) href = link.attrs.href;
      } else {
        state.doc.nodesBetween(selection.from, selection.to, (node) => {
          if (node.marks) {
            const link = node.marks.find((mark) => mark.type === linkMark);
            if (link && link.attrs && link.attrs.href) href = link.attrs.href;
          }
        });
      }
      return href || "";
    };
    const text = ref("");
    const rawUrl = ref("");
    const isAnchor = ref(false);
    const url = computed(() => {
      if (!rawUrl.value) return "";
      if (!rawUrl.value.startsWith("http") && !rawUrl.value.startsWith("#")) return "http://" + rawUrl.value;
      return rawUrl.value;
    });
    const validUrl = computed(() => {
      if (url.value.startsWith("#")) return true;
      const urlSplit = url.value.split(".").filter(Boolean);
      return url.value.includes(".") && urlSplit.length > 1;
    });
    const isEditing = computed(() => !isAnchor.value && !!getLinkHrefAtSelection());
    const isDisabled = computed(() => !validUrl.value);
    const openLink = () => {
      window.open(url.value, "_blank");
    };
    const updateFromEditor = () => {
      text.value = getSelectedText();
      rawUrl.value = getLinkHrefAtSelection();
    };
    watch(
      () => props.editor?.state?.selection,
      () => {
        updateFromEditor();
      },
      { immediate: true }
    );
    const focusInput = () => {
      const input = document.querySelector(".link-input-ctn input");
      if (!input) return;
      input.focus();
    };
    onMounted(() => {
      updateFromEditor();
      isAnchor.value = rawUrl.value.startsWith("#");
      if (props.showInput) focusInput();
    });
    const handleSubmit = () => {
      const editor = props.editor;
      if (!editor) return;
      if (!rawUrl.value) {
        if (editor.commands?.unsetLink) editor.commands.unsetLink();
        props.closePopover();
        return;
      }
      if (!validUrl.value) {
        urlError.value = true;
        return;
      }
      const finalText = text.value || url.value;
      if (editor.commands?.toggleLink) {
        editor.commands.toggleLink({ href: url.value, text: finalText });
      }
      const endPos = editor.view.state.selection.$to.pos;
      editor.view.dispatch(editor.view.state.tr.setSelection(new TextSelection$1(editor.view.state.doc.resolve(endPos))));
      setTimeout(() => editor.view.focus(), 100);
      props.closePopover();
    };
    const handleRemove = () => {
      if (props.editor && props.editor.commands && props.editor.commands.unsetLink) {
        props.editor.commands.unsetLink();
        props.closePopover();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["link-input-ctn", { "high-contrast": unref(isHighContrastMode) }])
      }, [
        isAnchor.value ? (openBlock(), createElementBlock("div", _hoisted_1$c, "Page anchor")) : isEditing.value ? (openBlock(), createElementBlock("div", _hoisted_2$7, "Edit link")) : (openBlock(), createElementBlock("div", _hoisted_3$5, "Add link")),
        __props.showInput && !isAnchor.value ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createElementVNode("div", _hoisted_5$1, [
            _cache[4] || (_cache[4] = createElementVNode("div", { class: "input-icon text-input-icon" }, "T", -1)),
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "text",
              placeholder: "Text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => text.value = $event),
              onKeydown: withKeys(withModifiers(handleSubmit, ["stop", "prevent"]), ["enter"])
            }, null, 40, _hoisted_6), [
              [vModelText, text.value]
            ])
          ]),
          createElementVNode("div", _hoisted_7, [
            createElementVNode("div", {
              class: "input-icon",
              innerHTML: unref(toolbarIcons).linkInput
            }, null, 8, _hoisted_8),
            withDirectives(createElementVNode("input", {
              type: "text",
              name: "link",
              placeholder: "Type or paste a link",
              class: normalizeClass({ error: urlError.value }),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => rawUrl.value = $event),
              onKeydown: [
                withKeys(withModifiers(handleSubmit, ["stop", "prevent"]), ["enter"]),
                _cache[2] || (_cache[2] = ($event) => urlError.value = false)
              ]
            }, null, 42, _hoisted_9), [
              [vModelText, rawUrl.value]
            ]),
            createElementVNode("div", {
              class: normalizeClass(["open-link-icon", { disabled: !validUrl.value }]),
              innerHTML: unref(toolbarIcons).openLink,
              onClick: openLink,
              "data-item": "btn-link-open"
            }, null, 10, _hoisted_10)
          ]),
          createElementVNode("div", _hoisted_11, [
            isEditing.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "remove-btn",
              onClick: handleRemove,
              "data-item": "btn-link-remove"
            }, [
              createElementVNode("div", {
                class: "remove-btn__icon",
                innerHTML: unref(toolbarIcons).removeLink
              }, null, 8, _hoisted_12),
              _cache[5] || (_cache[5] = createTextVNode(" Remove ", -1))
            ])) : createCommentVNode("", true),
            createElementVNode("button", {
              class: normalizeClass(["submit-btn", { "disable-btn": isDisabled.value }]),
              onClick: handleSubmit,
              "data-item": "btn-link-apply"
            }, " Apply ", 2)
          ])
        ])) : isAnchor.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createElementVNode("a", {
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => __props.goToAnchor && __props.goToAnchor(...args), ["stop", "prevent"]))
          }, "Go to " + toDisplayString(rawUrl.value.startsWith("#_") ? rawUrl.value.substring(2) : rawUrl.value), 1)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const LinkInput = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-27883505"]]);
const _hoisted_1$b = ["aria-label", "onClick", "onKeydown"];
const _hoisted_2$6 = ["innerHTML"];
const _hoisted_3$4 = ["innerHTML"];
const ROW_SIZE$1 = 7;
const _sfc_main$d = {
  __name: "IconGridRow",
  props: {
    icons: {
      type: Array,
      required: true
    },
    activeColor: {
      type: Object,
      required: false
    }
  },
  emits: ["select", "clickoutside"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const isActive = computed(() => (option) => {
      if (!props.activeColor.value) return false;
      return props.activeColor.value.toUpperCase() === option.value;
    });
    const getCheckStyle = (color, optionIndex) => {
      const lightColors = ["#FFFFFF", "#FAFF09"];
      if (optionIndex === 5 || lightColors.includes(color)) return { color: "#000" };
      return { color: "#FFF" };
    };
    const handleClick = (option) => {
      emit("select", option.value);
    };
    const rowRefs = ref([]);
    const iconRefs = ref([]);
    onMounted(() => {
      const isMatrix = props.icons.every((row) => Array.isArray(row));
      if (!isMatrix) throw new Error("icon props must be 2d array");
      const firstIcon = iconRefs.value[0];
      if (firstIcon) {
        firstIcon.setAttribute("tabindex", "0");
        firstIcon.focus();
      }
    });
    const moveToNextIcon = (rowIndex, optionIndex) => {
      const iconIndex = ROW_SIZE$1 * rowIndex + optionIndex + 1;
      const nextIcon = iconRefs.value[iconIndex];
      if (nextIcon) {
        nextIcon.setAttribute("tabindex", "0");
        nextIcon.focus();
      }
    };
    const moveToPreviousIcon = (rowIndex, optionIndex) => {
      const iconIndex = ROW_SIZE$1 * rowIndex + optionIndex - 1;
      const previousIcon = iconRefs.value[iconIndex];
      if (previousIcon) {
        previousIcon.setAttribute("tabindex", "0");
        previousIcon.focus();
      }
    };
    const moveToNextRow = (rowIndex, optionIndex) => {
      const iconIndex = optionIndex + ROW_SIZE$1 * (rowIndex + 1);
      const nextIcon = iconRefs.value[iconIndex];
      if (nextIcon) {
        nextIcon.setAttribute("tabindex", "0");
        nextIcon.focus();
      }
    };
    const moveToPreviousRow = (rowIndex, optionIndex) => {
      const iconIndex = optionIndex + ROW_SIZE$1 * (rowIndex - 1);
      const previousIcon = iconRefs.value[iconIndex];
      if (previousIcon) {
        previousIcon.setAttribute("tabindex", "0");
        previousIcon.focus();
      }
    };
    const handleKeyDown = (event, rowIndex, optionIndex, option) => {
      switch (event.key) {
        case "ArrowRight":
          moveToNextIcon(rowIndex, optionIndex);
          break;
        case "ArrowLeft":
          moveToPreviousIcon(rowIndex, optionIndex);
          break;
        case "ArrowDown":
          moveToNextRow(rowIndex, optionIndex);
          break;
        case "ArrowUp":
          moveToPreviousRow(rowIndex, optionIndex);
          break;
        case "Enter":
          handleClick(option);
          break;
        case "Escape":
          emit("clickoutside");
          break;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.icons, (row, rowIndex) => {
        return openBlock(), createElementBlock("div", {
          class: "option-row",
          key: rowIndex,
          role: "group",
          ref_for: true,
          ref_key: "rowRefs",
          ref: rowRefs
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(row, (option, optionIndex) => {
            return openBlock(), createElementBlock("div", {
              class: "option",
              key: optionIndex,
              "aria-label": option.label,
              role: "menuitem",
              ref_for: true,
              ref_key: "iconRefs",
              ref: iconRefs,
              onClick: withModifiers(($event) => handleClick(option), ["stop", "prevent"]),
              onKeydown: withModifiers((event) => handleKeyDown(event, rowIndex, optionIndex, option), ["prevent"])
            }, [
              createElementVNode("div", {
                class: "option__icon",
                innerHTML: option.icon,
                style: normalizeStyle(option.style)
              }, null, 12, _hoisted_2$6),
              isActive.value(option) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "option__check",
                innerHTML: unref(toolbarIcons).colorOptionCheck,
                style: normalizeStyle(getCheckStyle(option.value, optionIndex))
              }, null, 12, _hoisted_3$4)) : createCommentVNode("", true)
            ], 40, _hoisted_1$b);
          }), 128))
        ]);
      }), 128);
    };
  }
};
const IconGridRow = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-0f479b6c"]]);
const DropIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 512c53.2 0 101.4-21.6 136.1-56.6l-298.3-235C140 257.1 128 292.3 128 320c0 106 86 192 192 192zM505.2 370.7c4.4-16.2 6.8-33.1 6.8-50.7c0-91.2-130.2-262.3-166.6-308.3C339.4 4.2 330.5 0 320.9 0l-1.8 0c-9.6 0-18.5 4.2-24.5 11.7C277.8 33 240.7 81.3 205.8 136L38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L505.2 370.7zM224 336c0 44.2 35.8 80 80 80c8.8 0 16 7.2 16 16s-7.2 16-16 16c-61.9 0-112-50.1-112-112c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>\n';
const _hoisted_1$a = { class: "options-grid-wrap" };
const _hoisted_2$5 = ["innerHTML"];
const _hoisted_3$3 = { class: "option-grid-ctn" };
const _sfc_main$c = {
  __name: "IconGrid",
  props: {
    icons: {
      type: Array,
      required: true
    },
    customIcons: {
      type: Array,
      required: false
    },
    activeColor: {
      type: Object,
      required: false
    },
    hasNoneIcon: {
      type: Boolean,
      required: false
    }
  },
  emits: ["select", "clickoutside"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleSelect = (option) => {
      emit("select", option);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        __props.hasNoneIcon ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "none-option",
          role: "menuitem",
          "aria-label": "Clear color selection",
          onClick: _cache[0] || (_cache[0] = ($event) => handleSelect("none"))
        }, [
          createElementVNode("span", {
            innerHTML: unref(DropIcon),
            class: "none-icon"
          }, null, 8, _hoisted_2$5),
          _cache[1] || (_cache[1] = createTextVNode(" None ", -1))
        ])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_3$3, [
          createVNode(IconGridRow, {
            icons: __props.icons,
            "active-color": __props.activeColor,
            onSelect: handleSelect
          }, null, 8, ["icons", "active-color"]),
          __props.customIcons.flat().length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            _cache[2] || (_cache[2] = createElementVNode("span", { class: "option-grid-ctn__subtitle" }, "Custom colors", -1)),
            createVNode(IconGridRow, {
              icons: __props.customIcons,
              "active-color": __props.activeColor,
              onSelect: handleSelect
            }, null, 8, ["icons", "active-color"])
          ], 64)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const IconGrid = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-3d19fedf"]]);
const closeDropdown$1 = (dropdown) => {
  dropdown.expand.value = false;
};
const makeColorOption = (color, label = null) => {
  return {
    label,
    icon: toolbarIcons.colorOption,
    value: color,
    style: {
      color,
      boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.1)",
      borderRadius: "50%"
    }
  };
};
const renderColorOptions = (superToolbar, button, customIcons = [], hasNoneIcon = false) => {
  const handleSelect = (e) => {
    button.iconColor.value = e;
    superToolbar.emitCommand({ item: button, argument: e });
    closeDropdown$1(button);
  };
  return h("div", {}, [
    h(IconGrid, {
      icons,
      customIcons,
      activeColor: button.iconColor,
      hasNoneIcon,
      onSelect: handleSelect
    })
  ]);
};
const icons = [
  [
    makeColorOption("#111111", "black"),
    makeColorOption("#333333", "dark gray"),
    makeColorOption("#5C5C5C", "medium gray"),
    makeColorOption("#858585", "light gray"),
    makeColorOption("#ADADAD", "very light gray"),
    makeColorOption("#D6D6D6", "transparent gray"),
    makeColorOption("#FFFFFF", "white")
  ],
  [
    makeColorOption("#860028", "dark red"),
    makeColorOption("#D2003F", "red"),
    makeColorOption("#DB3365", "coral red"),
    makeColorOption("#E4668C", "light red"),
    makeColorOption("#ED99B2", "pale pink"),
    makeColorOption("#F6CCD9", "transparent pink"),
    makeColorOption("#FF004D", "bright pink")
  ],
  [
    makeColorOption("#83015E", "dark purple"),
    makeColorOption("#CD0194", "purple"),
    makeColorOption("#D734A9", "orchid"),
    makeColorOption("#E167BF", "light purple"),
    makeColorOption("#EB99D4", "lavender"),
    makeColorOption("#F5CCEA", "transparent pink"),
    makeColorOption("#FF00A8", "neon pink")
  ],
  [
    makeColorOption("#8E220A", "maroon"),
    makeColorOption("#DD340F", "red-orange"),
    makeColorOption("#E45C3F", "burnt orange"),
    makeColorOption("#EB856F", "peach"),
    makeColorOption("#F1AE9F", "pale peach"),
    makeColorOption("#F8D6CF", "transparent peach"),
    makeColorOption("#FF7A00", "orange")
  ],
  [
    makeColorOption("#947D02", "olive"),
    makeColorOption("#E7C302", "mustard yellow"),
    makeColorOption("#ECCF35", "yellow"),
    makeColorOption("#F1DB67", "light yellow"),
    makeColorOption("#F5E79A", "very pale yellow"),
    makeColorOption("#FAF3CC", "transparent yellow"),
    makeColorOption("#FAFF09", "neon yellow")
  ],
  [
    makeColorOption("#055432", "forest green"),
    makeColorOption("#07834F", "green"),
    makeColorOption("#399C72", "medium green"),
    makeColorOption("#6AB595", "light green"),
    makeColorOption("#9CCDB9", "mint"),
    makeColorOption("#CDE6DC", "transparent mint"),
    makeColorOption("#05F38F", "bright teal")
  ],
  [
    makeColorOption("#063E7E", "navy blue"),
    makeColorOption("#0A60C5", "blue"),
    makeColorOption("#3B80D1", "sky blue"),
    makeColorOption("#6CA0DC", "cornflower blue"),
    makeColorOption("#9DBFE8", "light blue"),
    makeColorOption("#CEDFF3", "very light blue"),
    makeColorOption("#21c8ce", "cyan")
  ],
  [
    makeColorOption("#3E027A", "deep purple"),
    makeColorOption("#6103BF", "indigo"),
    makeColorOption("#8136CC", "violet"),
    makeColorOption("#A068D9", "lavender pink"),
    makeColorOption("#C09AE6", "light lilac"),
    makeColorOption("#DFCDF2", "transparent lilac"),
    makeColorOption("#A91DFF", "neon purple")
  ]
];
const getAvailableColorOptions = () => {
  return icons.flat().map((item) => item.value);
};
const _hoisted_1$9 = ["data-cols", "data-rows", "onKeydown", "onClick"];
const _hoisted_2$4 = ["aria-valuetext"];
const ROW_SIZE = 5;
const _sfc_main$b = {
  __name: "TableGrid",
  emits: ["select", "clickoutside"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedRows = ref(0);
    const selectedCols = ref(0);
    const { isHighContrastMode } = useHighContrastMode();
    const tableGridItems = ref([]);
    const onTableGridMouseOver = (event) => {
      let target = event.target;
      let isGrid = !!target.dataset.grid;
      if (isGrid) {
        return;
      }
      let grid = target.parentElement;
      let allItems = [...grid.querySelectorAll("[data-item]")];
      let cols = parseInt(target.dataset.cols, 10);
      let rows = parseInt(target.dataset.rows, 10);
      selectGridItems(allItems, cols, rows);
    };
    const selectGridItems = (allItems, cols, rows) => {
      selectedCols.value = cols;
      selectedRows.value = rows;
      for (let i2 = 0; i2 < allItems.length; i2++) {
        let item = allItems[i2];
        let itemsCols = parseInt(item.dataset.cols, 10);
        let itemsRows = parseInt(item.dataset.rows, 10);
        if (itemsCols <= cols && itemsRows <= rows) {
          item.classList.add("selected");
        } else {
          item.classList.remove("selected");
        }
      }
    };
    const handleClick = ({ cols, rows }) => {
      emit("select", { cols, rows });
    };
    const handleKeyDown = (event, cols, rows) => {
      let normalizedCols = cols - 1;
      let normalizedRows = rows - 1;
      switch (event.key) {
        case "ArrowRight": {
          if (normalizedCols >= 4) {
            return;
          }
          const currentRow = normalizedRows * ROW_SIZE;
          tableGridItems.value[currentRow + normalizedCols + 1].setAttribute("tabindex", "0");
          tableGridItems.value[currentRow + normalizedCols + 1].focus();
          selectGridItems(tableGridItems.value, cols + 1, rows);
          break;
        }
        case "ArrowLeft": {
          if (normalizedCols <= 0) {
            return;
          }
          const currentRow = normalizedRows * ROW_SIZE;
          tableGridItems.value[currentRow + normalizedCols - 1].setAttribute("tabindex", "0");
          tableGridItems.value[currentRow + normalizedCols - 1].focus();
          selectGridItems(tableGridItems.value, cols - 1, rows);
          break;
        }
        case "ArrowDown": {
          if (normalizedRows >= 4) {
            return;
          }
          const nextRow = (normalizedRows + 1) * ROW_SIZE;
          tableGridItems.value[nextRow + normalizedCols].setAttribute("tabindex", "0");
          tableGridItems.value[nextRow + normalizedCols].focus();
          selectGridItems(tableGridItems.value, cols, rows + 1);
          break;
        }
        case "ArrowUp": {
          if (normalizedRows <= 0) {
            return;
          }
          const previousRow = (normalizedRows - 1) * ROW_SIZE;
          tableGridItems.value[previousRow + normalizedCols].setAttribute("tabindex", "0");
          tableGridItems.value[previousRow + normalizedCols].focus();
          selectGridItems(tableGridItems.value, cols, rows - 1);
          break;
        }
        case "Enter": {
          handleClick({ cols, rows });
          break;
        }
      }
    };
    onMounted(() => {
      tableGridItems.value[0].setAttribute("tabindex", "0");
      tableGridItems.value[0].focus();
      selectGridItems(tableGridItems.value, 1, 1);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["toolbar-table-grid-wrapper", { "high-contrast": unref(isHighContrastMode) }])
      }, [
        createElementVNode("div", {
          class: "toolbar-table-grid",
          onMouseover: onTableGridMouseOver,
          "data-grid": "true"
        }, [
          (openBlock(), createElementBlock(Fragment, null, renderList(5, (i2) => {
            return openBlock(), createElementBlock(Fragment, { key: i2 }, [
              (openBlock(), createElementBlock(Fragment, null, renderList(5, (n) => {
                return createElementVNode("div", {
                  class: "toolbar-table-grid__item",
                  key: `${i2}_${n}`,
                  "data-cols": n,
                  "data-rows": i2,
                  "data-item": "true",
                  ref_for: true,
                  ref_key: "tableGridItems",
                  ref: tableGridItems,
                  onKeydown: withModifiers((event) => handleKeyDown(event, n, i2), ["prevent"]),
                  onClick: withModifiers(($event) => handleClick({ cols: n, rows: i2 }), ["stop", "prevent"])
                }, null, 40, _hoisted_1$9);
              }), 64))
            ], 64);
          }), 64))
        ], 32),
        createElementVNode("div", {
          class: "toolbar-table-grid-value",
          "aria-valuetext": `${selectedRows.value} x ${selectedCols.value}`
        }, toDisplayString(selectedRows.value) + " x " + toDisplayString(selectedCols.value), 9, _hoisted_2$4)
      ], 2);
    };
  }
};
const TableGrid = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-92e8d5fb"]]);
const _hoisted_1$8 = { class: "toolbar-table-actions" };
const _hoisted_2$3 = ["onClick", "data-item", "ariaLabel"];
const _hoisted_3$2 = { class: "toolbar-table-actions__icon" };
const _hoisted_4$1 = ["innerHTML"];
const _hoisted_5 = { class: "toolbar-table-actions__label" };
const _sfc_main$a = {
  __name: "TableActions",
  props: {
    options: {
      type: Array
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleClick = (item) => {
      emit("select", { command: item.command });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["toolbar-table-actions__item", { "toolbar-table-actions__item--border": option.bottomBorder }]),
            onClick: ($event) => handleClick(option),
            "data-item": option.props?.["data-item"] || "",
            ariaLabel: option.props?.ariaLabel,
            role: "menuitem"
          }, [
            createElementVNode("div", _hoisted_3$2, [
              createElementVNode("div", {
                class: "toolbar-table-actions__icon-wrapper",
                innerHTML: option.icon
              }, null, 8, _hoisted_4$1)
            ]),
            createElementVNode("div", _hoisted_5, toDisplayString(option.label), 1)
          ], 10, _hoisted_2$3);
        }), 256))
      ]);
    };
  }
};
const TableActions = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-990b9a25"]]);
function getScrollableParent(element) {
  let currentElement = element;
  while (currentElement) {
    const overflowY = window.getComputedStyle(currentElement).overflowY;
    if (/(auto|scroll)/.test(overflowY) && currentElement.scrollHeight > currentElement.clientHeight) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}
function scrollToElement(targetElement, options = { behavior: "smooth", block: "start" }) {
  if (!targetElement) return;
  const container = getScrollableParent(targetElement);
  const containerRect = container.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const offsetTop = targetRect.top - containerRect.top + container.scrollTop;
  container.scrollTo({
    top: options.block === "start" ? offsetTop : offsetTop - container.clientHeight + targetElement.offsetHeight,
    behavior: options.behavior
  });
}
const checkIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>\n';
const _hoisted_1$7 = { class: "search-input-ctn" };
const _hoisted_2$2 = { class: "row" };
const _hoisted_3$1 = ["onKeydown"];
const _sfc_main$9 = {
  __name: "SearchInput",
  props: {
    searchRef: {
      type: Object
    }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const searchValue = ref("");
    const emit = __emit;
    const handleSubmit = () => {
      emit("submit", { value: searchValue.value });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createElementVNode("div", _hoisted_2$2, [
          withDirectives(createElementVNode("input", {
            ref: __props.searchRef,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchValue.value = $event),
            class: "search-input",
            type: "text",
            name: "search",
            placeholder: "Type search string",
            onKeydown: withKeys(withModifiers(handleSubmit, ["stop", "prevent"]), ["enter"])
          }, null, 40, _hoisted_3$1), [
            [vModelText, searchValue.value]
          ])
        ]),
        createElementVNode("div", { class: "row submit" }, [
          createElementVNode("button", {
            class: "submit-btn",
            onClick: handleSubmit
          }, "Apply")
        ])
      ]);
    };
  }
};
const SearchInput = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-957cbcf2"]]);
const TOOLBAR_FONTS = [
  {
    label: "Georgia",
    key: "Georgia, serif",
    fontWeight: 400,
    props: {
      style: { fontFamily: "Georgia, serif" },
      "data-item": "btn-fontFamily-option"
    }
  },
  {
    label: "Arial",
    key: "Arial, sans-serif",
    fontWeight: 400,
    props: {
      style: { fontFamily: "Arial, sans-serif" },
      "data-item": "btn-fontFamily-option"
    }
  },
  {
    label: "Courier New",
    key: "Courier New, monospace",
    fontWeight: 400,
    props: {
      style: { fontFamily: "Courier New, monospace" },
      "data-item": "btn-fontFamily-option"
    }
  },
  {
    label: "Times New Roman",
    key: "Times New Roman, serif",
    fontWeight: 400,
    props: {
      style: { fontFamily: "Times New Roman, serif" },
      "data-item": "btn-fontFamily-option"
    }
  }
];
const TOOLBAR_FONT_SIZES = [
  { label: "8", key: "8pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "9", key: "9pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "10", key: "10pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "11", key: "11pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "12", key: "12pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "14", key: "14pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "18", key: "18pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "24", key: "24pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "30", key: "30pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "36", key: "36pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "48", key: "48pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "60", key: "60pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "72", key: "72pt", props: { "data-item": "btn-fontSize-option" } },
  { label: "96", key: "96pt", props: { "data-item": "btn-fontSize-option" } }
];
const closeDropdown = (dropdown) => {
  dropdown.expand.value = false;
};
const makeDefaultItems = ({
  superToolbar,
  toolbarIcons: toolbarIcons2,
  toolbarTexts: toolbarTexts2,
  toolbarFonts,
  hideButtons,
  availableWidth,
  role,
  isDev = false
} = {}) => {
  const bold = useToolbarItem({
    type: "button",
    name: "bold",
    command: "toggleBold",
    icon: toolbarIcons2.bold,
    tooltip: toolbarTexts2.bold,
    attributes: {
      ariaLabel: "Bold"
    }
  });
  const fontOptions = [...toolbarFonts ? toolbarFonts : TOOLBAR_FONTS];
  const fontButton = useToolbarItem({
    type: "dropdown",
    name: "fontFamily",
    tooltip: toolbarTexts2.fontFamily,
    command: "setFontFamily",
    defaultLabel: "Arial",
    label: "Arial",
    markName: "textStyle",
    labelAttr: "fontFamily",
    hasCaret: true,
    isWide: true,
    style: { width: "116px" },
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "Font family"
    },
    options: fontOptions,
    onActivate: ({ fontFamily }) => {
      if (!fontFamily) return;
      fontFamily = fontFamily.split(",")[0];
      fontButton.label.value = fontFamily;
      const defaultFont = fontOptions.find((i2) => i2.label === fontButton.defaultLabel.value);
      const foundFont = fontOptions.find((i2) => i2.label === fontFamily);
      if (foundFont) {
        fontButton.selectedValue.value = foundFont.key;
      } else if (defaultFont) {
        fontButton.selectedValue.value = defaultFont.key;
      } else {
        fontButton.selectedValue.value = "";
      }
    },
    onDeactivate: () => {
      fontButton.label.value = fontButton.defaultLabel.value;
      const defaultFont = fontOptions.find((i2) => i2.label === fontButton.defaultLabel.value);
      if (defaultFont) fontButton.selectedValue.value = defaultFont.key;
      else fontButton.selectedValue.value = "";
    }
  });
  const aiButton = useToolbarItem({
    type: "dropdown",
    dropdownStyles: {
      padding: 0,
      outline: "none"
    },
    name: "ai",
    tooltip: toolbarTexts2.ai,
    icon: toolbarIcons2.ai,
    hideLabel: true,
    hasCaret: false,
    isWide: true,
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "AI"
    },
    options: [
      {
        type: "render",
        key: "ai",
        render: () => {
          let selectedText = "";
          if (superToolbar.activeEditor) {
            const { state } = superToolbar.activeEditor;
            const { from, to, empty } = state.selection;
            selectedText = !empty ? state.doc.textBetween(from, to) : "";
          }
          const handleClose = () => {
            closeDropdown(aiButton);
          };
          return h("div", {}, [
            h(AIWriter, {
              handleClose,
              selectedText,
              editor: superToolbar.activeEditor,
              apiKey: superToolbar.config.aiApiKey,
              endpoint: superToolbar.config.aiEndpoint,
              superToolbar
            })
          ]);
        }
      }
    ]
  });
  const fontSizeOptions = TOOLBAR_FONT_SIZES;
  const fontSize = useToolbarItem({
    type: "dropdown",
    name: "fontSize",
    defaultLabel: "12",
    label: "12",
    minWidth: "50px",
    markName: "textStyle",
    labelAttr: "fontSize",
    tooltip: toolbarTexts2.fontSize,
    hasCaret: true,
    hasInlineTextInput: true,
    inlineTextInputVisible: true,
    suppressActiveHighlight: true,
    isWide: true,
    command: "setFontSize",
    attributes: {
      ariaLabel: "Font size"
    },
    options: fontSizeOptions,
    onActivate: ({ fontSize: size }, isMultiple = false) => {
      if (isMultiple) {
        fontSize.label.value = "";
        fontSize.selectedValue.value = "";
        return;
      }
      const defaultSize = fontSizeOptions.find((i2) => i2.label === String(fontSize.defaultLabel.value));
      if (!size) {
        fontSize.label.value = fontSize.defaultLabel.value;
        if (defaultSize) fontSize.selectedValue.value = defaultSize.key;
        else fontSize.selectedValue.value = "";
        return;
      }
      let sanitizedValue = sanitizeNumber(size, 12);
      if (sanitizedValue < 8) sanitizedValue = 8;
      if (sanitizedValue > 96) sanitizedValue = 96;
      let sanitizedValueStr = String(sanitizedValue);
      const foundSize = fontSizeOptions.find((i2) => {
        return i2.label === sanitizedValueStr || i2.key === sanitizedValueStr;
      });
      if (foundSize) {
        fontSize.selectedValue.value = foundSize.key;
      } else {
        fontSize.selectedValue.value = "";
      }
      fontSize.label.value = sanitizedValueStr;
    },
    onDeactivate: () => {
      fontSize.label.value = fontSize.defaultLabel.value;
      const defaultSize = fontSizeOptions.find((i2) => i2.label === String(fontSize.defaultLabel.value));
      if (defaultSize) fontSize.selectedValue.value = defaultSize.key;
      else fontSize.selectedValue.value = "";
    }
  });
  const separator = useToolbarItem({
    type: "separator",
    name: "separator",
    isNarrow: true
  });
  const italic = useToolbarItem({
    type: "button",
    name: "italic",
    command: "toggleItalic",
    icon: toolbarIcons2.italic,
    tooltip: toolbarTexts2.italic,
    attributes: {
      ariaLabel: "Italic"
    }
  });
  const underline = useToolbarItem({
    type: "button",
    name: "underline",
    command: "toggleUnderline",
    icon: toolbarIcons2.underline,
    tooltip: toolbarTexts2.underline,
    attributes: {
      ariaLabel: "Underline"
    }
  });
  const strikethrough = useToolbarItem({
    type: "button",
    name: "strike",
    command: "toggleStrike",
    icon: toolbarIcons2.strikethrough,
    tooltip: toolbarTexts2.strikethrough,
    attributes: {
      ariaLabel: "Strikethrough"
    }
  });
  const highlight = useToolbarItem({
    type: "dropdown",
    name: "highlight",
    icon: toolbarIcons2.highlight,
    hideLabel: true,
    markName: "highlight",
    labelAttr: "color",
    tooltip: toolbarTexts2.highlight,
    command: "setHighlight",
    noArgumentCommand: "unsetHighlight",
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "Highlight"
    },
    options: [
      {
        key: "color",
        type: "render",
        render: () => renderColorOptions(superToolbar, highlight, [], true)
      }
    ],
    onActivate: ({ color }) => {
      highlight.iconColor.value = color || "";
    },
    onDeactivate: () => highlight.iconColor.value = ""
  });
  const colorButton = useToolbarItem({
    type: "dropdown",
    name: "color",
    icon: toolbarIcons2.color,
    hideLabel: true,
    markName: "textStyle",
    labelAttr: "color",
    tooltip: toolbarTexts2.color,
    command: "setColor",
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "Color"
    },
    options: [
      {
        key: "color",
        type: "render",
        render: () => renderColorOptions(superToolbar, colorButton)
      }
    ],
    onActivate: ({ color }) => {
      colorButton.iconColor.value = color;
    },
    onDeactivate: () => colorButton.iconColor.value = "#000"
  });
  const searchRef = ref(null);
  const search = useToolbarItem({
    type: "dropdown",
    name: "search",
    icon: toolbarIcons2.search,
    tooltip: toolbarTexts2.search,
    group: "right",
    inputRef: searchRef,
    attributes: {
      ariaLabel: "Search"
    },
    options: [
      {
        type: "render",
        key: "searchDropdown",
        render: () => renderSearchDropdown()
      }
    ]
  });
  const renderSearchDropdown = () => {
    const handleSubmit = ({ value }) => {
      superToolbar.activeEditor.commands.search(value);
    };
    return h("div", {}, [
      h(SearchInput, {
        onSubmit: handleSubmit,
        searchRef
      })
    ]);
  };
  const link = useToolbarItem({
    type: "dropdown",
    name: "link",
    markName: "link",
    icon: toolbarIcons2.link,
    tooltip: toolbarTexts2.link,
    attributes: {
      ariaLabel: "Link dropdown"
    },
    options: [
      {
        type: "render",
        key: "linkDropdown",
        render: () => renderLinkDropdown(link)
      }
    ],
    onActivate: ({ href }) => {
      if (href) link.attributes.value = { href };
      else link.attributes.value = {};
    },
    onDeactivate: () => {
      link.attributes.value = {};
      link.expand.value = false;
    }
  });
  function renderLinkDropdown(link2) {
    return h("div", {}, [
      h(LinkInput, {
        editor: superToolbar.activeEditor,
        closePopover: () => closeDropdown(link2),
        goToAnchor: () => {
          closeDropdown(link2);
          if (!superToolbar.activeEditor || !link2.attributes.value?.href) return;
          const anchorName = link2.attributes.value?.href?.slice(1);
          const container = superToolbar.activeEditor.element;
          const anchor = container.querySelector(`a[name='${anchorName}']`);
          if (anchor) scrollToElement(anchor);
        }
      })
    ]);
  }
  const linkInput = useToolbarItem({
    type: "options",
    name: "linkInput",
    command: "toggleLink"
  });
  link.childItem = linkInput;
  linkInput.parentItem = link;
  const image = useToolbarItem({
    type: "button",
    name: "image",
    command: "startImageUpload",
    icon: toolbarIcons2.image,
    tooltip: toolbarTexts2.image,
    disabled: false,
    attributes: {
      ariaLabel: "Image"
    }
  });
  const tableItem = useToolbarItem({
    type: "dropdown",
    name: "table",
    icon: toolbarIcons2.table,
    hideLabel: true,
    labelAttr: "table",
    tooltip: toolbarTexts2.table,
    command: "insertTable",
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "Table"
    },
    options: [
      {
        key: "table",
        type: "render",
        render: () => renderTableGrid(tableItem)
      }
    ]
  });
  function renderTableGrid(tableItem2) {
    const handleSelect = (e) => {
      superToolbar.emitCommand({ item: tableItem2, argument: e });
      closeDropdown(tableItem2);
    };
    return h("div", {}, [
      h(TableGrid, {
        onSelect: handleSelect
      })
    ]);
  }
  const tableActionsItem = useToolbarItem({
    type: "dropdown",
    name: "tableActions",
    command: "executeTableCommand",
    tooltip: toolbarTexts2.tableActions,
    icon: toolbarIcons2.tableActions,
    hideLabel: true,
    disabled: true,
    attributes: {
      ariaLabel: "Table actions"
    },
    options: [
      {
        type: "render",
        render: () => renderTableActions(tableActionsItem)
      }
    ]
  });
  const tableActionsOptions2 = [
    {
      label: toolbarTexts2.addRowBefore,
      command: "addRowBefore",
      icon: toolbarIcons2.addRowBefore,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Add row before"
      }
    },
    {
      label: toolbarTexts2.addRowAfter,
      command: "addRowAfter",
      icon: toolbarIcons2.addRowAfter,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Add row after"
      }
    },
    {
      label: toolbarTexts2.addColumnBefore,
      command: "addColumnBefore",
      icon: toolbarIcons2.addColumnBefore,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Add column before"
      }
    },
    {
      label: toolbarTexts2.addColumnAfter,
      command: "addColumnAfter",
      icon: toolbarIcons2.addColumnAfter,
      bottomBorder: true,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Add column after"
      }
    },
    {
      label: toolbarTexts2.deleteRow,
      command: "deleteRow",
      icon: toolbarIcons2.deleteRow,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Удалить строку"
      }
    },
    {
      label: toolbarTexts2.deleteColumn,
      command: "deleteColumn",
      icon: toolbarIcons2.deleteColumn,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Delete column"
      }
    },
    {
      label: toolbarTexts2.deleteTable,
      command: "deleteTable",
      icon: toolbarIcons2.deleteTable,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Delete table"
      }
    },
    {
      label: toolbarTexts2.removeBorders,
      command: "deleteCellAndTableBorders",
      icon: toolbarIcons2.deleteBorders,
      bottomBorder: true,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Delete cell and table borders"
      }
    },
    {
      label: toolbarTexts2.mergeCells,
      command: "mergeCells",
      icon: toolbarIcons2.mergeCells,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Merge cells"
      }
    },
    {
      label: toolbarTexts2.splitCell,
      command: "splitCell",
      icon: toolbarIcons2.splitCell,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Split cells"
      }
    },
    {
      label: toolbarTexts2.fixTables,
      command: "fixTables",
      icon: toolbarIcons2.fixTables,
      props: {
        "data-item": "btn-tableActions-option",
        ariaLabel: "Fix tables"
      }
    }
  ];
  function renderTableActions(tableActionsItem2) {
    return h(TableActions, {
      options: tableActionsOptions2,
      onSelect: (event) => {
        closeDropdown(tableActionsItem2);
        const { command } = event;
        superToolbar.emitCommand({ item: tableActionsItem2, argument: { command } });
      }
    });
  }
  const alignment2 = useToolbarItem({
    type: "dropdown",
    name: "textAlign",
    tooltip: toolbarTexts2.textAlign,
    icon: toolbarIcons2.alignLeft,
    command: "setTextAlign",
    hasCaret: true,
    markName: "textAlign",
    labelAttr: "textAlign",
    suppressActiveHighlight: true,
    attributes: {
      ariaLabel: "Text align"
    },
    options: [
      {
        type: "render",
        render: () => {
          const handleSelect = (e) => {
            closeDropdown(alignment2);
            const buttonWithCommand = { ...alignment2, command: "setTextAlign" };
            buttonWithCommand.command = "setTextAlign";
            superToolbar.emitCommand({ item: buttonWithCommand, argument: e });
            setAlignmentIcon(alignment2, e);
          };
          return h("div", {}, [
            h(AlignmentButtons, {
              onSelect: handleSelect
            })
          ]);
        },
        key: "alignment"
      }
    ],
    onActivate: ({ textAlign }) => {
      setAlignmentIcon(alignment2, textAlign);
    },
    onDeactivate: () => {
      setAlignmentIcon(alignment2, "left");
    }
  });
  const setAlignmentIcon = (alignment3, e) => {
    let alignValue = e === "both" ? "justify" : e;
    let icons2 = {
      left: toolbarIcons2.alignLeft,
      right: toolbarIcons2.alignRight,
      center: toolbarIcons2.alignCenter,
      justify: toolbarIcons2.alignJustify
    };
    let icon = icons2[alignValue] ?? icons2.left;
    alignment3.icon.value = icon;
  };
  const bulletedList = useToolbarItem({
    type: "button",
    name: "list",
    command: "toggleBulletList",
    icon: toolbarIcons2.bulletList,
    tooltip: toolbarTexts2.bulletList,
    restoreEditorFocus: true,
    attributes: {
      ariaLabel: "Bullet list"
    }
  });
  const numberedList = useToolbarItem({
    type: "button",
    name: "numberedlist",
    command: "toggleOrderedList",
    icon: toolbarIcons2.numberedList,
    tooltip: toolbarTexts2.numberedList,
    restoreEditorFocus: true,
    attributes: {
      ariaLabel: "Numbered list"
    }
  });
  const indentLeft = useToolbarItem({
    type: "button",
    name: "indentleft",
    command: "decreaseTextIndent",
    icon: toolbarIcons2.indentLeft,
    tooltip: toolbarTexts2.indentLeft,
    disabled: false,
    attributes: {
      ariaLabel: "Left indent"
    }
  });
  const indentRight = useToolbarItem({
    type: "button",
    name: "indentright",
    command: "increaseTextIndent",
    icon: toolbarIcons2.indentRight,
    tooltip: toolbarTexts2.indentRight,
    disabled: false,
    attributes: {
      ariaLabel: "Right indent"
    }
  });
  const overflow = useToolbarItem({
    type: "overflow",
    name: "overflow",
    command: null,
    icon: toolbarIcons2.overflow,
    disabled: false,
    attributes: {
      ariaLabel: "Overflow items"
    }
  });
  const zoom = useToolbarItem({
    type: "dropdown",
    name: "zoom",
    allowWithoutEditor: true,
    tooltip: toolbarTexts2.zoom,
    defaultLabel: "100%",
    label: "100%",
    hasCaret: true,
    command: "setZoom",
    isWide: true,
    inlineTextInputVisible: false,
    hasInlineTextInput: true,
    attributes: {
      ariaLabel: "Zoom"
    },
    options: [
      { label: "50%", key: 0.5, props: { "data-item": "btn-zoom-option" } },
      { label: "75%", key: 0.75, props: { "data-item": "btn-zoom-option" } },
      { label: "90%", key: 0.9, props: { "data-item": "btn-zoom-option" } },
      { label: "100%", key: 1, props: { "data-item": "btn-zoom-option" } },
      { label: "125%", key: 1.25, props: { "data-item": "btn-zoom-option" } },
      { label: "150%", key: 1.5, props: { "data-item": "btn-zoom-option" } },
      { label: "200%", key: 2, props: { "data-item": "btn-zoom-option" } }
    ],
    onActivate: ({ zoom: value }) => {
      if (!value) return;
      zoom.label.value = value;
    }
  });
  const undo = useToolbarItem({
    type: "button",
    name: "undo",
    disabled: true,
    tooltip: toolbarTexts2.undo,
    command: "undo",
    icon: toolbarIcons2.undo,
    group: "left",
    attributes: {
      ariaLabel: "Undo"
    }
  });
  const redo = useToolbarItem({
    type: "button",
    disabled: true,
    name: "redo",
    tooltip: toolbarTexts2.redo,
    command: "redo",
    icon: toolbarIcons2.redo,
    group: "left",
    attributes: {
      ariaLabel: "Redo"
    }
  });
  const toggleTrackChanges = useToolbarItem({
    type: "button",
    disabled: false,
    name: "toggleTrackChanges",
    tooltip: toolbarTexts2.trackChanges,
    command: "toggleTrackChanges",
    icon: toolbarIcons2.trackChanges,
    group: "left",
    attributes: {
      ariaLabel: "Track changes"
    }
  });
  const acceptTrackedChangeBySelection = useToolbarItem({
    type: "button",
    disabled: false,
    name: "acceptTrackedChangeBySelection",
    tooltip: toolbarTexts2.trackChangesAccept,
    command: "acceptTrackedChangeFromToolbar",
    icon: toolbarIcons2.trackChangesAccept,
    group: "left",
    attributes: {
      ariaLabel: "Accept tracked changes"
    }
  });
  const rejectTrackedChangeOnSelection = useToolbarItem({
    type: "button",
    disabled: false,
    name: "rejectTrackedChangeOnSelection",
    tooltip: toolbarTexts2.trackChangesReject,
    command: "rejectTrackedChangeFromToolbar",
    icon: toolbarIcons2.trackChangesReject,
    group: "left",
    attributes: {
      ariaLabel: "Reject tracked changes"
    }
  });
  const toggleTrackChangesOriginal = useToolbarItem({
    type: "button",
    disabled: false,
    name: "toggleTrackChangesShowOriginal",
    tooltip: toolbarTexts2.trackChangesOriginal,
    command: "toggleTrackChangesShowOriginal",
    icon: toolbarIcons2.trackChangesOriginal,
    group: "left",
    attributes: {
      ariaLabel: "Toggle tracked changes show original"
    }
  });
  const toggleTrackChangesFinal = useToolbarItem({
    type: "button",
    disabled: false,
    name: "toggleTrackChangesShowFinal",
    tooltip: toolbarTexts2.trackChangesFinal,
    command: "toggleTrackChangesShowFinal",
    icon: toolbarIcons2.trackChangesFinal,
    group: "left",
    attributes: {
      ariaLabel: "Toggle tracked changes show final"
    }
  });
  const clearFormatting = useToolbarItem({
    type: "button",
    name: "clearFormatting",
    command: "clearFormat",
    tooltip: toolbarTexts2.clearFormatting,
    icon: toolbarIcons2.clearFormatting,
    attributes: {
      ariaLabel: "Clear formatting"
    }
  });
  const copyFormat = useToolbarItem({
    type: "button",
    name: "copyFormat",
    tooltip: toolbarTexts2.copyFormat,
    icon: toolbarIcons2.copyFormat,
    command: "copyFormat",
    attributes: {
      ariaLabel: "Copy formatting"
    }
  });
  const getDocumentOptionsAfterRole = (role2, documentOptions2) => {
    if (role2 === "editor") return documentOptions2;
    else if (role2 === "suggester") return documentOptions2.filter((option) => option.value === "suggesting");
    else return documentOptions2.filter((option) => option.value === "viewing");
  };
  const getDefaultLabel = (role2) => {
    if (role2 === "editor") return "Editing";
    else if (role2 === "suggester") return "Suggesting";
    else return "Viewing";
  };
  const documentMode = useToolbarItem({
    type: "dropdown",
    name: "documentMode",
    command: "setDocumentMode",
    allowWithoutEditor: true,
    icon: toolbarIcons2.documentMode,
    defaultLabel: getDefaultLabel(role),
    label: getDefaultLabel(role),
    hasCaret: role === "editor",
    isWide: true,
    style: { display: "flex", justifyContent: "flex-end" },
    inlineTextInputVisible: false,
    hasInlineTextInput: false,
    group: "right",
    disabled: role !== "editor",
    attributes: {
      dropdownPosition: "right",
      className: "toolbar-item--doc-mode",
      ariaLabel: "Document mode"
    },
    options: [
      {
        type: "render",
        render: () => renderDocumentMode(documentMode)
      }
    ]
  });
  const documentOptions = [
    {
      label: toolbarTexts2.documentEditingMode,
      value: "editing",
      icon: toolbarIcons2.documentEditingMode,
      description: toolbarTexts2.documentEditingModeDescription
    },
    {
      label: toolbarTexts2.documentSuggestingMode,
      value: "suggesting",
      icon: toolbarIcons2.documentSuggestingMode,
      description: toolbarTexts2.documentSuggestingModeDescription
    },
    {
      label: toolbarTexts2.documentViewingMode,
      value: "viewing",
      icon: toolbarIcons2.documentViewingMode,
      description: toolbarTexts2.documentViewingModeDescription
    }
  ];
  function renderDocumentMode(renderDocumentButton) {
    const optionsAfterRole = getDocumentOptionsAfterRole(role, documentOptions);
    return h(DocumentMode, {
      options: optionsAfterRole,
      onSelect: (item) => {
        closeDropdown(renderDocumentButton);
        const { label, icon } = item;
        documentMode.label.value = label;
        documentMode.icon.value = icon;
        superToolbar.emitCommand({ item: documentMode, argument: label });
      }
    });
  }
  const controlSizes = /* @__PURE__ */ new Map([
    ["separator", 20],
    ["zoom", 71],
    ["fontFamily", 118],
    ["fontSize", 57],
    ["textAlign", 40],
    ["linkedStyles", 142],
    ["documentMode", 47],
    ["ai", 32],
    ["default", 32]
  ]);
  const ruler = useToolbarItem({
    type: "button",
    name: "ruler",
    command: "toggleRuler",
    icon: toolbarIcons2.ruler,
    tooltip: toolbarTexts2.ruler,
    attributes: {
      ariaLabel: "Ruler"
    }
  });
  const selectedLinkedStyle = ref(null);
  const linkedStyles = useToolbarItem({
    type: "dropdown",
    name: "linkedStyles",
    command: "setLinkedStyle",
    tooltip: toolbarTexts2.linkedStyles,
    icon: toolbarIcons2.paintbrush,
    defaultLabel: toolbarTexts2.formatText,
    label: toolbarTexts2.formatText,
    hasCaret: true,
    isWide: true,
    style: { width: "140px" },
    suppressActiveHighlight: true,
    disabled: false,
    attributes: {
      className: "toolbar-item--linked-styles",
      ariaLabel: "Linked styles"
    },
    options: [
      {
        type: "render",
        key: "linkedStyle",
        render: () => {
          const handleSelect = (style) => {
            closeDropdown(linkedStyles);
            const itemWithCommand = { ...linkedStyles, command: "setLinkedStyle" };
            superToolbar.emitCommand({ item: itemWithCommand, argument: style });
            selectedLinkedStyle.value = style.id;
          };
          return h("div", {}, [
            h(LinkedStyle, {
              editor: superToolbar.activeEditor,
              onSelect: handleSelect,
              selectedOption: selectedLinkedStyle.value
            })
          ]);
        }
      }
    ],
    onActivate: ({ styleId }) => {
      const styles = getQuickFormatList(superToolbar.activeEditor);
      const selectedStyle = styles?.find((style) => style.id === styleId);
      linkedStyles.label.value = selectedStyle && selectedStyle.id !== "Normal" ? selectedStyle.definition.attrs.name : toolbarTexts2.formatText;
      linkedStyles.disabled.value = false;
    },
    onDeactivate: () => {
      linkedStyles.disabled.value = true;
      linkedStyles.label.value = toolbarTexts2.formatText;
    }
  });
  const renderIcon = (value, selectedValue) => {
    if (selectedValue.value != value) return;
    return h("div", { innerHTML: checkIconSvg, class: "dropdown-select-icon" });
  };
  const lineHeight = useToolbarItem({
    type: "dropdown",
    name: "lineHeight",
    tooltip: toolbarTexts2.lineHeight,
    icon: toolbarIcons2.lineHeight,
    hasCaret: false,
    hasInlineTextInput: false,
    inlineTextInputVisible: false,
    suppressActiveHighlight: true,
    isWide: false,
    command: "setLineHeight",
    dropdownValueKey: "key",
    selectedValue: "1",
    attributes: {
      ariaLabel: "Line height"
    },
    options: [1, 1.15, 1.5, 2, 2.5, 3].map((lineHeightValue) => {
      return {
        label: lineHeightValue.toFixed(2),
        key: lineHeightValue,
        icon: () => renderIcon(lineHeightValue, lineHeight.selectedValue),
        props: { "data-item": "btn-lineHeight-option" }
      };
    })
  });
  const breakpoints = {
    sm: 768,
    md: 1024,
    xl: 1410
  };
  const stickyItemsWidth = 120;
  const toolbarPadding = 32;
  const itemsToHideXL = ["linkedStyles", "clearFormatting", "copyFormat", "ruler"];
  const itemsToHideSM = ["zoom", "fontFamily", "fontSize", "redo"];
  let toolbarItems = [
    undo,
    redo,
    // Dev - tracked changes
    // toggleTrackChanges,
    acceptTrackedChangeBySelection,
    rejectTrackedChangeOnSelection,
    // toggleTrackChangesOriginal,
    // toggleTrackChangesFinal,
    zoom,
    fontButton,
    separator,
    fontSize,
    separator,
    bold,
    italic,
    underline,
    strikethrough,
    colorButton,
    highlight,
    separator,
    link,
    image,
    tableItem,
    tableActionsItem,
    separator,
    alignment2,
    bulletedList,
    numberedList,
    indentLeft,
    indentRight,
    lineHeight,
    separator,
    linkedStyles,
    separator,
    ruler,
    copyFormat,
    clearFormatting,
    aiButton,
    overflow,
    documentMode
  ];
  if (!superToolbar.config?.superdoc?.config?.modules?.ai) {
    toolbarItems = toolbarItems.filter((item) => item.name.value !== "ai");
  }
  if (availableWidth <= breakpoints.md && hideButtons) {
    toolbarItems = toolbarItems.filter((item) => item.type !== "separator");
  }
  if (superToolbar.config.mode !== "docx") {
    const getLinkedStylesIndex = toolbarItems.findIndex((item) => item.name.value === "linkedStyles");
    toolbarItems.splice(getLinkedStylesIndex - 1, 2);
    const filterItems = ["ruler", "zoom", "undo", "redo"];
    toolbarItems = toolbarItems.filter((item) => !filterItems.includes(item.name.value));
  }
  const devItems = [toggleTrackChanges, toggleTrackChangesOriginal, toggleTrackChangesFinal];
  if (!isDev) {
    if (role === "viewer") {
      devItems.push(...[acceptTrackedChangeBySelection, rejectTrackedChangeOnSelection]);
    }
    toolbarItems = toolbarItems.filter((item) => !devItems.includes(item));
  }
  const toolbarItemsSticky = [search, undo, overflow, documentMode].map((item) => item.name);
  const isStickyItem = (item) => toolbarItemsSticky.includes(item.name);
  const overflowItems = [];
  const visibleItems = [];
  let totalWidth = toolbarPadding + stickyItemsWidth;
  toolbarItems.forEach((item) => {
    const itemWidth = controlSizes.get(item.name.value) || controlSizes.get("default");
    if (availableWidth < breakpoints.xl && itemsToHideXL.includes(item.name.value) && hideButtons) {
      overflowItems.push(item);
      if (item.name.value === "linkedStyles") {
        const linkedStylesIdx = toolbarItems.findIndex((item2) => item2.name.value === "linkedStyles");
        toolbarItems.splice(linkedStylesIdx + 1, 1);
      }
      return;
    }
    if (availableWidth < breakpoints.sm && itemsToHideSM.includes(item.name.value) && hideButtons) {
      overflowItems.push(item);
      return;
    }
    if (isStickyItem(item)) {
      visibleItems.push(item);
      totalWidth += itemWidth;
      return;
    }
    if (totalWidth < availableWidth || !hideButtons) {
      visibleItems.push(item);
      totalWidth += itemWidth;
    } else {
      overflowItems.push(item);
    }
  });
  return {
    defaultItems: visibleItems,
    overflowItems: overflowItems.filter((item) => item.type !== "separator")
  };
};
const toolbarTexts = {
  bold: "Bold",
  fontFamily: "Font",
  ai: "AI text generation",
  fontSize: "Font size",
  italic: "Italic",
  underline: "Underline",
  highlight: "Highlight color",
  strikethrough: "Strikethrough",
  color: "Text color",
  search: "Search",
  link: "Link",
  image: "Image",
  table: "Insert table",
  tableActions: "Table options",
  addRowBefore: "Insert row above",
  addRowAfter: "Insert row below",
  addColumnBefore: "Insert column left",
  addColumnAfter: "Insert column right",
  deleteRow: "Delete row",
  deleteColumn: "Delete column",
  deleteTable: "Delete table",
  removeBorders: "Remove borders",
  mergeCells: "Merge cells",
  splitCell: "Split cell",
  fixTables: "Fix tables",
  textAlign: "Alignment",
  bulletList: "Bullet list",
  numberedList: "Numbered list",
  indentLeft: "Left indent",
  indentRight: "Right indent",
  zoom: "Zoom",
  undo: "Undo",
  redo: "Redo",
  trackChanges: "Track Changes",
  trackChangesAccept: "Accept changes under selection",
  trackChangesReject: "Reject changes under selection",
  trackChangesOriginal: "Toggle Show Original",
  trackChangesFinal: "Toggle Show Final",
  clearFormatting: "Clear formatting",
  copyFormat: "Format painter",
  lineHeight: "Line height",
  formatText: "Format text",
  ruler: "Show or hide ruler",
  pageBreak: "Insert page break",
  documentEditingMode: "Editing",
  documentSuggestingMode: "Suggesting",
  documentViewingMode: "Viewing",
  documentEditingModeDescription: "Edit document directly",
  documentSuggestingModeDescription: "Edits become suggestions",
  documentViewingModeDescription: "View clean version of document only",
  linkedStyles: "Linked styles"
};
const toolbarTextsRu = {
  bold: "Жирный",
  fontFamily: "Шрифт",
  ai: "AI генерация текста",
  fontSize: "Размер шрифта",
  italic: "Курсив",
  underline: "Подчеркнутый",
  highlight: "Цвет выделения",
  strikethrough: "Зачеркнутый",
  color: "Цвет текста",
  search: "Поиск",
  link: "Ссылка",
  image: "Изображение",
  table: "Вставить таблицу",
  tableActions: "Настройки таблицы",
  addRowBefore: "Вставить строку выше",
  addRowAfter: "Вставить строку ниже",
  addColumnBefore: "Вставить столбец слева",
  addColumnAfter: "Вставить столбец справа",
  deleteRow: "Удалить строку",
  deleteColumn: "Удалить столбец",
  deleteTable: "Удалить таблицу",
  removeBorders: "Убрать границы",
  mergeCells: "Объединить ячейки",
  splitCell: "Разделить ячейку",
  fixTables: "Исправить таблицы",
  textAlign: "Выравнивание",
  bulletList: "Маркированный список",
  numberedList: "Нумерованный список",
  indentLeft: "Уменьшить отступ",
  indentRight: "Увеличить отступ",
  zoom: "Масштаб",
  undo: "Отменить",
  redo: "Повторить",
  trackChanges: "Отслеживание изменений",
  trackChangesAccept: "Принять изменения в выделенном",
  trackChangesReject: "Отклонить изменения в выделенном",
  trackChangesOriginal: "Показать оригинал",
  trackChangesFinal: "Показать финал",
  clearFormatting: "Очистить форматирование",
  copyFormat: "Копировать форматирование",
  lineHeight: "Межстрочный интервал",
  formatText: "Форматирование текста",
  ruler: "Показать или скрыть линейку",
  pageBreak: "Вставить разрыв страницы",
  documentEditingMode: "Редактирование",
  documentSuggestingMode: "Предложение",
  documentViewingMode: "Просмотр",
  documentEditingModeDescription: "Редактировать документ напрямую",
  documentSuggestingModeDescription: "Правки становятся предложениями",
  documentViewingModeDescription: "Просмотр чистовой версии документа",
  linkedStyles: "Связанные стили"
};
const isOffValue = (value) => {
  if (value == null) return false;
  const normalized = String(value).toLowerCase();
  return normalized === "0" || normalized === "false" || normalized === "off";
};
const negationChecks = {
  bold: (attrs = {}) => isOffValue(attrs.value),
  italic: (attrs = {}) => isOffValue(attrs.value),
  strike: (attrs = {}) => isOffValue(attrs.value),
  underline: (attrs = {}) => {
    const type = attrs.underlineType ?? attrs.value;
    if (type == null) return false;
    const normalized = String(type).toLowerCase();
    return normalized === "none" || isOffValue(normalized);
  },
  color: (attrs = {}) => {
    const value = attrs.color;
    if (value == null) return true;
    return String(value).toLowerCase() === "inherit";
  },
  highlight: (attrs = {}) => {
    const value = attrs.color;
    if (value == null) return true;
    const normalized = String(value).toLowerCase();
    return normalized === "transparent" || normalized === "none";
  }
};
const isNegatedMark = (name, attrs = {}) => {
  const checker = negationChecks[name];
  if (typeof checker !== "function") return false;
  return Boolean(checker(attrs));
};
const _SuperToolbar = class _SuperToolbar extends EventEmitter {
  /**
   * Creates a new SuperToolbar instance
   * @param {ToolbarConfig} config - The configuration for the toolbar
   * @returns {void}
   */
  constructor(config) {
    super();
    __privateAdd(this, _SuperToolbar_instances);
    /**
     * Default configuration for the toolbar
     * @type {ToolbarConfig}
     */
    __publicField(this, "config", {
      selector: null,
      toolbarGroups: ["left", "center", "right"],
      role: "editor",
      icons: { ...toolbarIcons },
      locale: "ru",
      texts: { ...toolbarTextsRu },
      fonts: null,
      hideButtons: true,
      responsiveToContainer: false,
      mode: "docx",
      excludeItems: [],
      groups: null,
      editor: null,
      aiApiKey: null,
      aiEndpoint: null,
      customButtons: []
    });
    /**
     * Custom commands that override default behavior
     * @private
     * @type {Object.<string, function(CommandItem): void>}
     */
    __privateAdd(this, _interceptedCommands, {
      /**
       * Handles zoom level changes
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string|number} params.argument - The zoom level (percentage)
       * @returns {void}
       */
      setZoom: ({ item, argument }) => {
        if (!argument) return;
        item.onActivate({ zoom: argument });
        this.emit("superdoc-command", { item, argument });
        this.superdoc.superdocStore.activeZoom = parseInt(argument, 10);
      },
      /**
       * Sets the document mode
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string} params.argument - The document mode to set
       * @returns {void}
       */
      setDocumentMode: ({ item, argument }) => {
        if (!argument) return;
        this.emit("superdoc-command", { item, argument });
      },
      /**
       * Sets the font size for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string|number} params.argument - The font size to set
       * @returns {void}
       */
      setFontSize: ({ item, argument }) => {
        if (__privateMethod(this, _SuperToolbar_instances, isFieldAnnotationSelection_fn).call(this) && argument) {
          this.activeEditor?.commands.setFieldAnnotationsFontSize(argument, true);
          this.updateToolbarState();
          return;
        }
        __privateMethod(this, _SuperToolbar_instances, runCommandWithArgumentOnly_fn).call(this, { item, argument }, () => {
          this.activeEditor?.commands.setFieldAnnotationsFontSize(argument, true);
        });
      },
      /**
       * Sets the font family for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string} params.argument - The font family to set
       * @returns {void}
       */
      setFontFamily: ({ item, argument }) => {
        if (__privateMethod(this, _SuperToolbar_instances, isFieldAnnotationSelection_fn).call(this) && argument) {
          this.activeEditor?.commands.setFieldAnnotationsFontFamily(argument, true);
          this.updateToolbarState();
          return;
        }
        __privateMethod(this, _SuperToolbar_instances, runCommandWithArgumentOnly_fn).call(this, { item, argument }, () => {
          this.activeEditor?.commands.setFieldAnnotationsFontFamily(argument, true);
        });
      },
      /**
       * Sets the text color
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string} params.argument - The color to set
       * @returns {void}
       */
      setColor: ({ argument }) => {
        if (!argument || !this.activeEditor) return;
        const isNone = argument === "none";
        const value = isNone ? "inherit" : argument;
        if (this.activeEditor?.commands?.setColor) this.activeEditor.commands.setColor(value);
        const argValue = isNone ? null : argument;
        this.activeEditor?.commands.setFieldAnnotationsTextColor(argValue, true);
        this.updateToolbarState();
      },
      /**
       * Sets the highlight color for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {string} params.argument - The highlight color to set
       * @returns {void}
       */
      setHighlight: ({ argument }) => {
        if (!argument || !this.activeEditor) return;
        const inlineColor = argument !== "none" ? argument : "transparent";
        if (this.activeEditor?.commands?.setHighlight) this.activeEditor.commands.setHighlight(inlineColor);
        const argValue = argument !== "none" ? argument : null;
        this.activeEditor?.commands.setFieldAnnotationsTextHighlight(argValue, true);
        this.activeEditor?.commands.setCellBackground(argValue);
        this.updateToolbarState();
      },
      /**
       * Toggles the ruler visibility
       * @returns {void}
       */
      toggleRuler: () => {
        this.superdoc.toggleRuler();
        this.updateToolbarState();
      },
      /**
       * Initiates the image upload process
       * @async
       * @returns {Promise<void>}
       */
      startImageUpload: async () => {
        try {
          let open = getFileOpener();
          let result = await open();
          if (!result?.file) {
            return;
          }
          const { size, file } = await checkAndProcessImage({
            file: result.file,
            getMaxContentSize: () => this.activeEditor.getMaxContentSize()
          });
          if (!file) {
            return;
          }
          const id = {};
          replaceSelectionWithImagePlaceholder({
            view: this.activeEditor.view,
            editorOptions: this.activeEditor.options,
            id
          });
          await uploadAndInsertImage({
            editor: this.activeEditor,
            view: this.activeEditor.view,
            file,
            size,
            id
          });
        } catch (error) {
          const err = new Error("[super-toolbar 🎨] Image upload failed");
          this.emit("exception", { error: err, editor: this.activeEditor, originalError: error });
          console.error(err, error);
        }
      },
      /**
       * Increases text indentation or list level
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {void}
       */
      increaseTextIndent: ({ item, argument }) => {
        let command = item.command;
        if (this.activeEditor.commands.increaseListIndent?.()) {
          return true;
        }
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
        }
      },
      /**
       * Decreases text indentation or list level
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {boolean}
       */
      decreaseTextIndent: ({ item, argument }) => {
        let command = item.command;
        if (this.activeEditor.commands.decreaseListIndent?.()) {
          return true;
        }
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
        }
      },
      /**
       * Toggles bold formatting for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {void}
       */
      toggleBold: ({ item, argument }) => {
        if (__privateMethod(this, _SuperToolbar_instances, isFieldAnnotationSelection_fn).call(this)) {
          this.activeEditor?.commands.toggleFieldAnnotationsFormat("bold", true);
          this.updateToolbarState();
          return;
        }
        let command = item.command;
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
          this.activeEditor.commands.toggleFieldAnnotationsFormat("bold", true);
        }
        this.updateToolbarState();
      },
      /**
       * Toggles italic formatting for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {void}
       */
      toggleItalic: ({ item, argument }) => {
        if (__privateMethod(this, _SuperToolbar_instances, isFieldAnnotationSelection_fn).call(this)) {
          this.activeEditor?.commands.toggleFieldAnnotationsFormat("italic", true);
          this.updateToolbarState();
          return;
        }
        let command = item.command;
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
          this.activeEditor.commands.toggleFieldAnnotationsFormat("italic", true);
        }
        this.updateToolbarState();
      },
      /**
       * Toggles underline formatting for text
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {void}
       */
      toggleUnderline: ({ item, argument }) => {
        if (__privateMethod(this, _SuperToolbar_instances, isFieldAnnotationSelection_fn).call(this)) {
          this.activeEditor?.commands.toggleFieldAnnotationsFormat("underline", true);
          this.updateToolbarState();
          return;
        }
        let command = item.command;
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
          this.activeEditor.commands.toggleFieldAnnotationsFormat("underline", true);
        }
        this.updateToolbarState();
      },
      /**
       * Toggles link formatting and updates cursor position
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {*} params.argument - Command arguments
       * @returns {void}
       */
      toggleLink: ({ item, argument }) => {
        let command = item.command;
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
          const { view } = this.activeEditor;
          let { selection } = view.state;
          if (this.activeEditor.options.isHeaderOrFooter) {
            selection = this.activeEditor.options.lastSelection;
          }
          const endPos = selection.$to.pos;
          const newSelection = new TextSelection(view.state.doc.resolve(endPos));
          const tr = view.state.tr.setSelection(newSelection);
          const state = view.state.apply(tr);
          view.updateState(state);
          if (!this.activeEditor.options.isHeaderOrFooter) {
            setTimeout(() => {
              view.focus();
            }, 100);
          }
        }
        this.updateToolbarState();
      },
      /**
       * Inserts a table into the document
       * @param {Object} params - Command parameters
       * @param {CommandItem} params.item - The command item
       * @param {Object} params.argument - Table configuration
       * @returns {void}
       */
      insertTable: ({ item, argument }) => {
        __privateMethod(this, _SuperToolbar_instances, runCommandWithArgumentOnly_fn).call(this, { item, argument });
      },
      /**
       * Executes a table-related command
       * @param {Object} params - Command parameters
       * @param {Object} params.argument - The table command and its parameters
       * @param {string} params.argument.command - The specific table command to execute
       * @returns {void}
       */
      executeTableCommand: ({ argument }) => {
        if (!argument) return;
        let command = argument.command;
        if (command in this.activeEditor.commands) {
          this.activeEditor.commands[command](argument);
        }
        this.updateToolbarState();
      }
    });
    /**
     * Handler for toolbar resize events
     * @returns {void}
     */
    __publicField(this, "onToolbarResize", () => {
      __privateMethod(this, _SuperToolbar_instances, makeToolbarItems_fn).call(this, {
        superToolbar: this,
        icons: this.config.icons,
        texts: this.config.texts,
        fonts: this.config.fonts,
        hideButtons: this.config.hideButtons,
        isDev: this.isDev
      });
      if (this.role === "viewer") {
        __privateMethod(this, _SuperToolbar_instances, deactivateAll_fn).call(this);
      }
      this.updateToolbarState();
    });
    this.config = { ...this.config, ...config };
    this.toolbarItems = [];
    this.overflowItems = [];
    this.documentMode = config.documentMode || "editing";
    this.isDev = config.isDev || false;
    this.superdoc = config.superdoc;
    this.role = config.role || "editor";
    this.toolbarContainer = null;
    if (this.config.editor) {
      this.config.mode = this.config.editor.options.mode;
    }
    this.config.icons = {
      ...toolbarIcons,
      ...config.icons
    };
    const defaultTexts = this.config.locale === "ru" ? toolbarTextsRu : toolbarTexts;
    this.config.texts = {
      ...defaultTexts,
      ...config.texts
    };
    this.config.hideButtons = config.hideButtons ?? true;
    this.config.responsiveToContainer = config.responsiveToContainer ?? false;
    this.pendingMarkCommands = [];
    this.stickyStoredMarks = null;
    this._boundEditorHandlers = {
      transaction: null,
      selectionUpdate: null,
      focus: null
    };
    this._restoreFocusTimeoutId = null;
    if (!this.config.selector && this.config.element) {
      this.config.selector = this.config.element;
    }
    this.toolbarContainer = this.findElementBySelector(this.config.selector);
    if (this.toolbarContainer) {
      const uiFontFamily = (this.config?.uiDisplayFallbackFont || "").toString().trim() || "Arial, Helvetica, sans-serif";
      this.toolbarContainer.style.setProperty("--sd-ui-font-family", uiFontFamily);
    }
    __privateMethod(this, _SuperToolbar_instances, initToolbarGroups_fn).call(this);
    __privateMethod(this, _SuperToolbar_instances, makeToolbarItems_fn).call(this, {
      superToolbar: this,
      icons: this.config.icons,
      texts: this.config.texts,
      fonts: this.config.fonts,
      hideButtons: this.config.hideButtons,
      isDev: config.isDev
    });
    if (this.config.selector && !this.toolbarContainer) {
      return;
    }
    this.app = createApp(Toolbar);
    this.app.directive("click-outside", vClickOutside);
    this.app.config.globalProperties.$toolbar = this;
    if (this.toolbarContainer) {
      this.toolbar = this.app.mount(this.toolbarContainer);
    }
    this.activeEditor = config.editor || null;
    this.updateToolbarState();
  }
  findElementBySelector(selector) {
    let el = null;
    if (selector) {
      if (selector.startsWith("#") || selector.startsWith(".")) {
        el = document.querySelector(selector);
      } else {
        el = document.getElementById(selector);
      }
      if (!el) {
        return null;
      }
    }
    return el;
  }
  /**
   * Log debug information to the console
   * @param {...*} args - Arguments to log
   * @returns {void}
   */
  log(...args) {
    console.debug("[🎨 super-toolbar]", ...args);
  }
  /**
   * Set the zoom level
   * @param {number} percent_int - The zoom percentage as an integer
   * @returns {void}
   */
  setZoom(percent_int) {
    const allItems = [...this.toolbarItems, ...this.overflowItems];
    const item = allItems.find((item2) => item2.name.value === "zoom");
    __privateGet(this, _interceptedCommands).setZoom({ item, argument: percent_int });
  }
  /**
   * The toolbar expects an active Super Editor instance.
   * Removes listeners from the previous editor (if any) before attaching to the new one.
   * @param {Object|null} editor - The editor instance to attach to the toolbar, or null to detach
   * @returns {void}
   */
  setActiveEditor(editor) {
    if (this.activeEditor && this._boundEditorHandlers.transaction) {
      this.activeEditor.off("transaction", this._boundEditorHandlers.transaction);
      this.activeEditor.off("selectionUpdate", this._boundEditorHandlers.selectionUpdate);
      this.activeEditor.off("focus", this._boundEditorHandlers.focus);
      this._boundEditorHandlers.transaction = null;
      this._boundEditorHandlers.selectionUpdate = null;
      this._boundEditorHandlers.focus = null;
    }
    this.activeEditor = editor;
    if (editor) {
      this._boundEditorHandlers.transaction = this.onEditorTransaction.bind(this);
      this._boundEditorHandlers.selectionUpdate = this.onEditorSelectionUpdate.bind(this);
      this._boundEditorHandlers.focus = this.onEditorFocus.bind(this);
      this.activeEditor.on("transaction", this._boundEditorHandlers.transaction);
      this.activeEditor.on("selectionUpdate", this._boundEditorHandlers.selectionUpdate);
      this.activeEditor.on("focus", this._boundEditorHandlers.focus);
    }
  }
  /**
   * Get toolbar items by group name
   * @param {string} groupName - The name of the group
   * @returns {ToolbarItem[]} An array of toolbar items in the specified group
   */
  getToolbarItemByGroup(groupName) {
    return this.toolbarItems.filter((item) => (item.group?.value || "center") === groupName);
  }
  /**
   * Get a toolbar item by name
   * @param {string} name - The name of the toolbar item
   * @returns {ToolbarItem|undefined} The toolbar item with the specified name or undefined if not found
   */
  getToolbarItemByName(name) {
    return this.toolbarItems.find((item) => item.name.value === name);
  }
  /**
   * Update the toolbar state based on the current editor state
   * Updates active/inactive state of all toolbar items
   * @returns {void}
   */
  updateToolbarState() {
    __privateMethod(this, _SuperToolbar_instances, updateToolbarHistory_fn).call(this);
    __privateMethod(this, _SuperToolbar_instances, initDefaultFonts_fn).call(this);
    __privateMethod(this, _SuperToolbar_instances, updateHighlightColors_fn).call(this);
    if (!this.activeEditor || this.documentMode === "viewing") {
      __privateMethod(this, _SuperToolbar_instances, deactivateAll_fn).call(this);
      return;
    }
    const { state } = this.activeEditor;
    if (!state) {
      __privateMethod(this, _SuperToolbar_instances, deactivateAll_fn).call(this);
      return;
    }
    const selection = state.selection;
    const selectionTrackedChanges = __privateMethod(this, _SuperToolbar_instances, enrichTrackedChanges_fn).call(this, collectTrackedChanges({ state, from: selection.from, to: selection.to }));
    const hasTrackedChanges = selectionTrackedChanges.length > 0;
    const hasValidSelection = hasTrackedChanges;
    const canAcceptTrackedChanges = hasValidSelection && isTrackedChangeActionAllowed({
      editor: this.activeEditor,
      action: "accept",
      trackedChanges: selectionTrackedChanges
    });
    const canRejectTrackedChanges = hasValidSelection && isTrackedChangeActionAllowed({
      editor: this.activeEditor,
      action: "reject",
      trackedChanges: selectionTrackedChanges
    });
    const marks = getActiveFormatting(this.activeEditor);
    const inTable = isInTable(this.activeEditor.state);
    const paragraphParent = findParentNode((n) => n.type.name === "paragraph")(selection);
    const paragraphProps = paragraphParent ? calculateResolvedParagraphProperties(
      this.activeEditor,
      paragraphParent.node,
      state.doc.resolve(paragraphParent.pos)
    ) : null;
    this.toolbarItems.forEach((item) => {
      item.resetDisabled();
      if (item.name.value === "undo") {
        item.setDisabled(this.undoDepth === 0);
      }
      if (item.name.value === "redo") {
        item.setDisabled(this.redoDepth === 0);
      }
      if (item.name.value === "acceptTrackedChangeBySelection") {
        item.setDisabled(!canAcceptTrackedChanges);
      }
      if (item.name.value === "rejectTrackedChangeOnSelection") {
        item.setDisabled(!canRejectTrackedChanges);
      }
      if (item.name.value === "linkedStyles") {
        if (this.activeEditor && !getQuickFormatList(this.activeEditor).length) {
          return item.deactivate();
        } else {
          return item.activate({ styleId: paragraphProps?.styleId || null });
        }
      }
      const rawActiveMark = marks.find((mark) => mark.name === item.name.value);
      const markNegated = rawActiveMark ? isNegatedMark(rawActiveMark.name, rawActiveMark.attrs) : false;
      const activeMark = markNegated ? null : rawActiveMark;
      if (activeMark) {
        if (activeMark.name === "fontSize") {
          const fontSizes = marks.filter((i2) => i2.name === "fontSize").map((i2) => i2.attrs.fontSize);
          const isMultiple = [...new Set(fontSizes)].length > 1;
          item.activate(activeMark.attrs, isMultiple);
        } else {
          item.activate(activeMark.attrs);
        }
      } else {
        item.deactivate();
      }
      if (!activeMark && !markNegated && paragraphParent && paragraphProps?.styleId) {
        const markToStyleMap = {
          fontSize: "font-size",
          fontFamily: "font-family",
          bold: "bold"
        };
        const linkedStyles = this.activeEditor.converter?.linkedStyles.find(
          (style) => style.id === paragraphProps.styleId
        );
        if (linkedStyles && linkedStyles.definition && linkedStyles.definition.styles && markToStyleMap[item.name.value] in linkedStyles.definition.styles) {
          const linkedStylesItem = linkedStyles.definition.styles[markToStyleMap[item.name.value]];
          const value = {
            [item.name.value]: linkedStylesItem
          };
          item.activate(value);
        }
      }
      if (item.name.value === "textAlign" && paragraphProps?.justification) {
        item.activate({ textAlign: paragraphProps.justification });
      }
      if (item.name.value === "lineHeight") {
        if (paragraphProps?.spacing) {
          item.selectedValue.value = twipsToLines(paragraphProps.spacing.line);
        } else {
          item.selectedValue.value = "";
        }
      }
      if (item.name.value === "tableActions") {
        item.disabled.value = !inTable;
      }
      const listParent = isList(paragraphParent?.node) ? paragraphParent.node : null;
      if (listParent) {
        const numberingType = listParent.attrs.listRendering.numberingType;
        if (item.name.value === "list" && numberingType === "bullet") {
          item.activate();
        } else if (item.name.value === "numberedlist" && numberingType !== "bullet") {
          item.activate();
        }
      }
      if (item.name.value === "ruler") {
        if (this.superdoc?.config?.rulers) {
          item.activate();
        } else {
          item.deactivate();
        }
      }
    });
  }
  /**
   * React to editor transactions. Might want to debounce this.
   * @param {Object} params - Transaction parameters
   * @param {Object} params.transaction - The transaction object
   * @returns {void}
   */
  onEditorTransaction({ transaction }) {
    if (!transaction.docChanged && !transaction.selectionSet) return;
    this.updateToolbarState();
  }
  /**
   * Main handler for toolbar commands
   * @param {CommandItem} params - Command parameters
   * @param {ToolbarItem} params.item - An instance of the useToolbarItem composable
   * @param {*} [params.argument] - The argument passed to the command
   * @returns {*} The result of the executed command, undefined if no result is returned
   */
  emitCommand({ item, argument, option }) {
    const hasFocusFn = this.activeEditor?.view?.hasFocus;
    const wasFocused = Boolean(typeof hasFocusFn === "function" && hasFocusFn.call(this.activeEditor.view));
    const { command } = item;
    const isMarkToggle = this.isMarkToggle(item);
    const shouldRestoreFocus = Boolean(item?.restoreEditorFocus);
    const hasArgument = argument !== null && argument !== void 0;
    const isDropdownOpen = item?.type === "dropdown" && !hasArgument;
    const isFontCommand = item?.command === "setFontFamily" || item?.command === "setFontSize";
    if (isDropdownOpen && isFontCommand) {
      return;
    }
    if (!wasFocused && isMarkToggle) {
      this.pendingMarkCommands.push({ command, argument, item });
      item?.activate?.();
      if (this.activeEditor && !this.activeEditor.options.isHeaderOrFooter) {
        this.activeEditor.focus();
      }
      return;
    }
    if (this.activeEditor && !this.activeEditor.options.isHeaderOrFooter) {
      this.activeEditor.focus();
    }
    if (!command) {
      return;
    }
    if (command in __privateGet(this, _interceptedCommands)) {
      const result = __privateGet(this, _interceptedCommands)[command]({ item, argument });
      if (isMarkToggle) __privateMethod(this, _SuperToolbar_instances, syncStickyMarksFromState_fn).call(this);
      return result;
    }
    if (this.activeEditor && this.activeEditor.commands && command in this.activeEditor.commands) {
      this.activeEditor.commands[command](argument);
    } else if (typeof command === "function") {
      command({ item, argument, option });
    } else {
      const error = new Error(`[super-toolbar 🎨] Command not found: ${command}`);
      this.emit("exception", { error, editor: this.activeEditor });
      throw error;
    }
    if (isMarkToggle) __privateMethod(this, _SuperToolbar_instances, syncStickyMarksFromState_fn).call(this);
    this.updateToolbarState();
    if (shouldRestoreFocus && this.activeEditor && !this.activeEditor.options.isHeaderOrFooter) {
      this._restoreFocusTimeoutId = setTimeout(() => {
        this._restoreFocusTimeoutId = null;
        if (!this.activeEditor || this.activeEditor.options.isHeaderOrFooter) return;
        this.activeEditor.focus();
      }, 0);
    }
  }
  /**
   * Processes and executes pending mark commands when editor selection updates.
   * This is triggered by the editor's 'selectionUpdate' event after focus is restored.
   * Clears the pending queue after execution.
   * @returns {void}
   */
  onEditorSelectionUpdate() {
    if (!this.activeEditor) return;
    if (this.pendingMarkCommands.length) {
      const pending = this.pendingMarkCommands;
      this.pendingMarkCommands = [];
      pending.forEach(({ command, argument, item }) => {
        if (!command) return;
        try {
          if (command in __privateGet(this, _interceptedCommands)) {
            __privateGet(this, _interceptedCommands)[command]({ item, argument });
          } else if (this.activeEditor.commands && command in this.activeEditor.commands) {
            this.activeEditor.commands[command](argument);
          }
          __privateMethod(this, _SuperToolbar_instances, ensureStoredMarksForMarkToggle_fn).call(this, { command, argument });
        } catch (error) {
          const err = new Error(`[super-toolbar 🎨] Failed to execute pending command: ${command}`);
          this.emit("exception", { error: err, editor: this.activeEditor, originalError: error });
          console.error(err, error);
        }
      });
      __privateMethod(this, _SuperToolbar_instances, syncStickyMarksFromState_fn).call(this);
      this.updateToolbarState();
      return;
    }
    const restored = __privateMethod(this, _SuperToolbar_instances, restoreStickyMarksIfNeeded_fn).call(this);
    if (restored) this.updateToolbarState();
  }
  /**
   * Handles editor focus events by flushing any pending mark commands.
   * This is triggered by the editor's 'focus' event.
   * @returns {void}
   */
  onEditorFocus() {
    if (this.pendingMarkCommands.length) {
      this.onEditorSelectionUpdate();
      return;
    }
    const restored = __privateMethod(this, _SuperToolbar_instances, restoreStickyMarksIfNeeded_fn).call(this);
    if (restored) this.updateToolbarState();
  }
  /**
   * Determines if a toolbar item represents a mark toggle command.
   * Mark toggles include text formatting commands like bold, italic, underline, etc.
   * @param {ToolbarItem} item - The toolbar item to check
   * @returns {boolean} True if the item is a mark toggle, false otherwise
   */
  isMarkToggle(item) {
    const name = item?.name?.value;
    return __privateGet(_SuperToolbar, _MARK_TOGGLE_NAMES).has(name);
  }
  /**
   * Cleans up resources when the toolbar is destroyed.
   * Clears any pending timeouts to prevent callbacks firing after unmount.
   * @returns {void}
   */
  destroy() {
    if (this._restoreFocusTimeoutId !== null) {
      clearTimeout(this._restoreFocusTimeoutId);
      this._restoreFocusTimeoutId = null;
    }
  }
};
_MARK_TOGGLE_NAMES = new WeakMap();
_SuperToolbar_instances = new WeakSet();
/**
 * Initiate toolbar groups
 * @private
 * @returns {void}
 */
initToolbarGroups_fn = function() {
  if (this.config.groups && !Array.isArray(this.config.groups) && Object.keys(this.config.groups).length) {
    this.config.toolbarGroups = Object.keys(this.config.groups);
  }
};
_interceptedCommands = new WeakMap();
/**
 * Create toolbar items based on configuration
 * @private
 * @param {SuperToolbar} options.superToolbar - The toolbar instance
 * @param {Object} options.icons - Icons to use for toolbar items
 * @param {Object} options.texts - Texts to use for toolbar items
 * @param {Array} options.fonts - Fonts for the toolbar item
 * @param {boolean} options.isDev - Whether in development mode
 * @returns {void}
 */
makeToolbarItems_fn = function({ superToolbar, icons: icons2, texts, fonts, hideButtons, isDev = false } = {}) {
  const documentWidth = document.documentElement.clientWidth;
  const containerWidth = this.toolbarContainer?.offsetWidth ?? 0;
  const availableWidth = this.config.responsiveToContainer ? containerWidth : documentWidth;
  const { defaultItems, overflowItems } = makeDefaultItems({
    superToolbar,
    toolbarIcons: icons2,
    toolbarTexts: texts,
    toolbarFonts: fonts,
    hideButtons,
    availableWidth,
    role: this.role,
    isDev
  });
  const customItems = this.config.customButtons || [];
  if (customItems.length) {
    defaultItems.push(...customItems.map((item) => useToolbarItem({ ...item })));
  }
  let allConfigItems = [
    ...defaultItems.map((item) => item.name.value),
    ...overflowItems.map((item) => item.name.value)
  ];
  if (this.config.groups) allConfigItems = Object.values(this.config.groups).flatMap((item) => item);
  const filteredItems = defaultItems.filter((item) => allConfigItems.includes(item.name.value)).filter((item) => !this.config.excludeItems.includes(item.name.value));
  this.toolbarItems = filteredItems;
  this.overflowItems = overflowItems.filter((item) => allConfigItems.includes(item.name.value));
};
/**
 * Initialize default fonts from the editor
 * @private
 * @returns {void}
 */
initDefaultFonts_fn = function() {
  if (!this.activeEditor || !this.activeEditor.converter) return;
  const { typeface = "Arial", fontSizePt = 12 } = this.activeEditor.converter.getDocumentDefaultStyles() ?? {};
  const fontSizeItem = this.toolbarItems.find((item) => item.name.value === "fontSize");
  if (fontSizeItem) fontSizeItem.defaultLabel.value = fontSizePt;
  const fontFamilyItem = this.toolbarItems.find((item) => item.name.value === "fontFamily");
  if (fontFamilyItem) fontFamilyItem.defaultLabel.value = typeface;
};
/**
 * Update highlight color options based on document colors
 * @private
 * @returns {void}
 */
updateHighlightColors_fn = function() {
  if (!this.activeEditor || !this.activeEditor.converter) return;
  if (!this.activeEditor.converter.docHiglightColors.size) return;
  const highlightItem = this.toolbarItems.find((item) => item.name.value === "highlight");
  if (!highlightItem) return;
  const pickerColorOptions = getAvailableColorOptions();
  const perChunk = 7;
  const result = Array.from(this.activeEditor.converter.docHiglightColors).reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    if (!pickerColorOptions.includes(item)) resultArray[chunkIndex].push(makeColorOption(item));
    return resultArray;
  }, []);
  const option = {
    key: "color",
    type: "render",
    render: () => renderColorOptions(this, highlightItem, result, true)
  };
  highlightItem.nestedOptions.value = [option];
};
/**
 * Deactivate all toolbar items
 * @private
 * @returns {void}
 */
deactivateAll_fn = function() {
  this.activeEditor = null;
  this.toolbarItems.forEach((item) => {
    const { allowWithoutEditor } = item;
    if (allowWithoutEditor.value) return;
    item.setDisabled(true);
  });
};
/**
 * Update undo/redo history state in the toolbar
 * @private
 * @returns {void}
 */
updateToolbarHistory_fn = function() {
  if (!this.activeEditor?.state) return;
  try {
    if (this.activeEditor.options.ydoc) {
      const undoManager = yUndoPluginKey.getState(this.activeEditor.state)?.undoManager;
      this.undoDepth = undoManager?.undoStack.length || 0;
      this.redoDepth = undoManager?.redoStack.length || 0;
    } else {
      this.undoDepth = undoDepth(this.activeEditor.state);
      this.redoDepth = redoDepth(this.activeEditor.state);
    }
  } catch {
    this.undoDepth = 0;
    this.redoDepth = 0;
  }
};
enrichTrackedChanges_fn = function(trackedChanges = []) {
  if (!trackedChanges?.length) return trackedChanges;
  const store = this.superdoc?.commentsStore;
  if (!store?.getComment) return trackedChanges;
  return trackedChanges.map((change) => {
    const commentId = change.id;
    if (!commentId) return change;
    const storeComment = store.getComment(commentId);
    if (!storeComment) return change;
    const comment = typeof storeComment.getValues === "function" ? storeComment.getValues() : storeComment;
    return { ...change, comment };
  });
};
/**
 * Run a command that requires an argument
 * @private
 * @param {CommandItem} params - Command parameters
 * @param {ToolbarItem} params.item - The toolbar item
 * @param {*} params.argument - The argument for the command
 * @param {boolean} params.noArgumentCallback - Whether to call callback even if argument === 'none'
 * @param {Function} [callback] - Optional callback to run after the command
 * @returns {void}
 */
runCommandWithArgumentOnly_fn = function({ item, argument, noArgumentCallback = false }, callback) {
  if (!argument || !this.activeEditor) return;
  let command = item.command;
  const noArgumentCommand = item.noArgumentCommand;
  if (argument === "none" && this.activeEditor && this.activeEditor.commands && noArgumentCommand in this.activeEditor.commands) {
    this.activeEditor.commands[noArgumentCommand]();
    if (typeof callback === "function" && noArgumentCallback) callback(argument);
    this.updateToolbarState();
    return;
  }
  if (this.activeEditor && this.activeEditor.commands && command in this.activeEditor.commands) {
    this.activeEditor.commands[command](argument);
    if (typeof callback === "function") callback(argument);
    this.updateToolbarState();
  }
};
/**
 * Capture stored marks when a mark toggle is used on an empty selection
 * so they can be re-applied after focus/selection changes.
 * @private
 * @returns {void}
 */
syncStickyMarksFromState_fn = function() {
  if (!this.activeEditor) return;
  const { selection, storedMarks } = this.activeEditor.state || {};
  if (!selection?.empty) return;
  this.stickyStoredMarks = storedMarks?.length ? [...storedMarks] : null;
};
/**
 * Re-apply stored marks captured from toolbar toggles when the current
 * selection is empty and unformatted.
 * @private
 * @returns {boolean} True if marks were restored
 */
restoreStickyMarksIfNeeded_fn = function() {
  if (!this.activeEditor) return false;
  if (!this.stickyStoredMarks?.length) return false;
  const { state, view } = this.activeEditor;
  const { selection, storedMarks } = state || {};
  if (!selection?.empty) return false;
  if (storedMarks?.length) return false;
  if (!view?.dispatch || !state?.tr) return false;
  const hasActiveMarkToggle = getActiveFormatting(this.activeEditor).some(
    (mark) => __privateGet(_SuperToolbar, _MARK_TOGGLE_NAMES).has(mark.name)
  );
  if (hasActiveMarkToggle) return false;
  const tr = state.tr.setStoredMarks(this.stickyStoredMarks);
  view.dispatch(tr);
  return true;
};
/**
 * Fallback to ensure stored marks exist for mark toggles when executed off-focus.
 * Helps cases where a command doesn't set storedMarks (e.g., font size from toolbar before focus).
 * @private
 * @param {Object} params
 * @param {string} params.command
 * @param {*} params.argument
 * @returns {void}
 */
ensureStoredMarksForMarkToggle_fn = function({ command, argument }) {
  if (!this.activeEditor) return;
  if (!this.activeEditor.state?.selection?.empty) return;
  if (this.activeEditor.state?.storedMarks?.length) return;
  if (command !== "setFontSize") return;
  const { state, view } = this.activeEditor;
  const textStyleMark = state.schema?.marks?.textStyle;
  if (!textStyleMark || !view?.dispatch || !state?.tr) return;
  const [value, unit] = parseSizeUnit(argument ?? "");
  if (Number.isNaN(value)) return;
  const clamped = Math.min(96, Math.max(8, Number(value)));
  const resolvedUnit = unit || "pt";
  const mark = textStyleMark.create({ fontSize: `${clamped}${resolvedUnit}` });
  const tr = state.tr.setStoredMarks([mark]);
  view.dispatch(tr);
};
isFieldAnnotationSelection_fn = function() {
  const selection = this.activeEditor?.state?.selection;
  return selection instanceof NodeSelection && selection?.node?.type?.name === "fieldAnnotation";
};
/**
 * Mark toggle names used to identify mark commands that need special handling
 * when the editor is not focused.
 * @type {Set<string>}
 * @private
 */
__privateAdd(_SuperToolbar, _MARK_TOGGLE_NAMES, /* @__PURE__ */ new Set([
  "bold",
  "italic",
  "underline",
  "strike",
  "highlight",
  "color",
  "fontSize",
  "fontFamily"
]));
let SuperToolbar = _SuperToolbar;
const onMarginClickCursorChange = (event, editor) => {
  const y = event.clientY;
  const x = event.clientX;
  const { view } = editor;
  const editorRect = view.dom.getBoundingClientRect();
  let coords = {
    left: 0,
    top: y
  };
  let isRightMargin = false;
  if (x > editorRect.right) {
    coords.left = editorRect.left + editorRect.width - 1;
    isRightMargin = true;
  } else if (x < editorRect.left) {
    coords.left = editorRect.left;
  }
  const pos = view.posAtCoords(coords)?.pos;
  if (pos) {
    let cursorPos = pos;
    if (isRightMargin) {
      const $pos = view.state.doc.resolve(pos);
      const charOffset = $pos.textOffset;
      const node = view.state.doc.nodeAt(pos);
      const text = node?.text;
      const charAtPos = text?.charAt(charOffset);
      cursorPos = node?.isText && charAtPos !== " " ? pos - 1 : pos;
    }
    const transaction = view.state.tr.setSelection(TextSelection$1.create(view.state.doc, cursorPos));
    view.dispatch(transaction);
    view.focus();
  }
};
const checkNodeSpecificClicks = (editor, event, popoverControls) => {
  if (!editor) return;
  const state = editor.state;
  if (!state) return;
  const surface = getEditorSurfaceElement(editor);
  if (!surface) return;
  if (selectionHasNodeOrMark(state, "link", { requireEnds: true })) {
    popoverControls.component = LinkInput;
    const surfaceRect = surface.getBoundingClientRect();
    if (!surfaceRect) return;
    popoverControls.position = {
      left: `${event.clientX - surfaceRect.left}px`,
      top: `${event.clientY - surfaceRect.top + 15}px`
    };
    popoverControls.props = {
      showInput: true
    };
    popoverControls.visible = true;
  }
};
function selectionHasNodeOrMark(state, name, options = {}) {
  const { requireEnds = false } = options;
  const $from = state.selection.$from;
  const $to = state.selection.$to;
  if (requireEnds) {
    for (let d = $from.depth; d > 0; d--) {
      if ($from.node(d).type.name === name) {
        return true;
      }
    }
    for (let d = $to.depth; d > 0; d--) {
      if ($to.node(d).type.name === name) {
        return true;
      }
    }
  } else {
    for (let d = $from.depth; d > 0; d--) {
      if ($from.node(d).type.name === name) {
        return true;
      }
    }
  }
  const markType = state.schema.marks[name];
  if (markType) {
    const { from, to, empty } = state.selection;
    if (requireEnds) {
      const fromMarks = markType.isInSet($from.marks());
      const toMarks = markType.isInSet($to.marks());
      if (fromMarks || toMarks) {
        return true;
      }
      if (empty && markType.isInSet(state.storedMarks || $from.marks())) {
        return true;
      }
    } else {
      if (empty) {
        if (markType.isInSet(state.storedMarks || $from.marks())) {
          return true;
        }
      } else {
        let hasMark = false;
        state.doc.nodesBetween(from, to, (node) => {
          if (markType.isInSet(node.marks)) {
            hasMark = true;
            return false;
          }
        });
        if (hasMark) return true;
      }
    }
  }
  return false;
}
function moveCursorToMouseEvent(event, editor) {
  if (!editor) return;
  const state = editor.state;
  if (!state) return;
  const coords = { left: event.clientX, top: event.clientY };
  const result = editor.posAtCoords?.(coords);
  if (typeof result?.pos === "number") {
    const tr = state.tr.setSelection(TextSelection$1.create(state.doc, result.pos));
    if (typeof editor.dispatch === "function") {
      editor.dispatch(tr);
    }
    editor.focus?.();
  }
}
const PlusIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const CheckIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L9.70711 17.7071C9.31658 18.0976 8.68342 18.0976 8.29289 17.7071L3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929C3.68342 10.9024 4.31658 10.9024 4.70711 11.2929L9 15.5858L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const XIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      d="M18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const LinkIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      d="M16.9958 1.06669C15.4226 1.05302 13.907 1.65779 12.7753 2.75074L12.765 2.76086L11.045 4.47086C10.6534 4.86024 10.6515 5.49341 11.0409 5.88507C11.4303 6.27673 12.0634 6.27858 12.4551 5.88919L14.1697 4.18456C14.9236 3.45893 15.9319 3.05752 16.9784 3.06662C18.0272 3.07573 19.0304 3.49641 19.772 4.23804C20.5137 4.97967 20.9344 5.98292 20.9435 7.03171C20.9526 8.07776 20.5515 9.08563 19.8265 9.83941L16.833 12.8329C16.4274 13.2386 15.9393 13.5524 15.4019 13.7529C14.8645 13.9533 14.2903 14.0359 13.7181 13.9949C13.146 13.9539 12.5894 13.7904 12.0861 13.5154C11.5827 13.2404 11.1444 12.8604 10.8008 12.401C10.47 11.9588 9.84333 11.8685 9.40108 12.1993C8.95883 12.5301 8.86849 13.1568 9.1993 13.599C9.71464 14.288 10.3721 14.858 11.1272 15.2705C11.8822 15.683 12.7171 15.9283 13.5753 15.9898C14.4334 16.0513 15.2948 15.9274 16.1009 15.6267C16.907 15.326 17.639 14.8555 18.2473 14.247L21.2472 11.2471L21.2593 11.2347C22.3523 10.1031 22.9571 8.58751 22.9434 7.01433C22.9297 5.44115 22.2987 3.93628 21.1863 2.82383C20.0738 1.71138 18.5689 1.08036 16.9958 1.06669Z"\n      fill="currentColor"\n    />\n    <path\n      d="M10.4247 8.0102C9.56657 7.94874 8.70522 8.07256 7.89911 8.37326C7.09305 8.67395 6.36096 9.14458 5.75272 9.753L2.75285 12.7529L2.74067 12.7653C1.64772 13.8969 1.04295 15.4125 1.05662 16.9857C1.07029 18.5589 1.70131 20.0637 2.81376 21.1762C3.9262 22.2886 5.43108 22.9196 7.00426 22.9333C8.57744 22.947 10.0931 22.3422 11.2247 21.2493L11.2371 21.2371L12.9471 19.5271C13.3376 19.1366 13.3376 18.5034 12.9471 18.1129C12.5565 17.7223 11.9234 17.7223 11.5328 18.1129L9.82932 19.8164C9.07555 20.5414 8.06768 20.9425 7.02164 20.9334C5.97285 20.9243 4.9696 20.5036 4.22797 19.762C3.48634 19.0203 3.06566 18.0171 3.05655 16.9683C3.04746 15.9222 3.44851 14.9144 4.17355 14.1606L7.16719 11.167C7.5727 10.7613 8.06071 10.4476 8.59811 10.2471C9.13552 10.0467 9.70976 9.96412 10.2819 10.0051C10.854 10.0461 11.4106 10.2096 11.9139 10.4846C12.4173 10.7596 12.8556 11.1397 13.1992 11.599C13.53 12.0412 14.1567 12.1316 14.5989 11.8007C15.0412 11.4699 15.1315 10.8433 14.8007 10.401C14.2854 9.71205 13.6279 9.14198 12.8729 8.72948C12.1178 8.31697 11.2829 8.07166 10.4247 8.0102Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const TableIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM4 5C4 4.44772 4.44772 4 5 4H11V8H4V5ZM4 10H11V14H4V10ZM20 14V10H13V14H20ZM13 16H20V19C20 19.5523 19.5523 20 19 20H13V16ZM11 16V20H5C4.44772 20 4 19.5523 4 19V16H11ZM13 8H20V5C20 4.44772 19.5523 4 19 4H13V8Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const CopyIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M10 9C9.44772 9 9 9.44772 9 10V20C9 20.5523 9.44772 21 10 21H20C20.5523 21 21 20.5523 21 20V10C21 9.44772 20.5523 9 20 9H10ZM7 10C7 8.34315 8.34315 7 10 7H20C21.6569 7 23 8.34315 23 10V20C23 21.6569 21.6569 23 20 23H10C8.34315 23 7 21.6569 7 20V10Z"\n      fill="currentColor"\n    />\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M4 3C3.45228 3 3 3.45228 3 4V14C3 14.5477 3.45228 15 4 15C4.55228 15 5 15.4477 5 16C5 16.5523 4.55228 17 4 17C2.34772 17 1 15.6523 1 14V4C1 2.34772 2.34772 1 4 1H14C15.6523 1 17 2.34772 17 4C17 4.55228 16.5523 5 16 5C15.4477 5 15 4.55228 15 4C15 3.45228 14.5477 3 14 3H4Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const ClipboardIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      d="M15 1C16.1046 1 17 1.89543 17 3H18C18.7956 3 19.5585 3.3163 20.1211 3.87891C20.6837 4.44151 21 5.20435 21 6V20C21 20.7957 20.6837 21.5585 20.1211 22.1211C19.5585 22.6837 18.7957 23 18 23H6C5.20435 23 4.44151 22.6837 3.87891 22.1211C3.3163 21.5585 3 20.7957 3 20V6C3 5.20435 3.3163 4.44152 3.87891 3.87891C4.44152 3.3163 5.20435 3 6 3H7C7 1.89543 7.89543 1 9 1H15ZM6 5C5.73478 5 5.4805 5.10543 5.29297 5.29297C5.10543 5.4805 5 5.73478 5 6V20L5.00488 20.0986C5.02757 20.3276 5.12883 20.5429 5.29297 20.707C5.48051 20.8946 5.73478 21 6 21H18C18.2652 21 18.5195 20.8946 18.707 20.707C18.8946 20.5195 19 20.2652 19 20V6C19 5.73478 18.8946 5.48051 18.707 5.29297C18.5429 5.12883 18.3276 5.02757 18.0986 5.00488L18 5H17C17 6.10457 16.1046 7 15 7H9C7.89543 7 7 6.10457 7 5H6ZM9 5H15V3H9V5Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const AiSparklesIcon = '<svg\n    width="24"\n    height="24"\n    viewBox="0 0 24 24"\n    fill="currentColor"\n    xmlns="http://www.w3.org/2000/svg"\n  >\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M6.94924 1.68544C6.81364 1.27624 6.43108 1 6 1C5.56892 1 5.18636 1.27624 5.05076 1.68544L4.3711 3.73642C4.2717 4.03638 4.03638 4.2717 3.73642 4.3711L1.68544 5.05076C1.27624 5.18636 1 5.56892 1 6C1 6.43108 1.27624 6.81364 1.68544 6.94924L3.73642 7.6289C4.03638 7.7283 4.2717 7.96362 4.3711 8.26358L5.05076 10.3146C5.18636 10.7238 5.56892 11 6 11C6.43108 11 6.81364 10.7238 6.94924 10.3146L7.6289 8.26358C7.7283 7.96362 7.96362 7.7283 8.26358 7.6289L10.3146 6.94924C10.7238 6.81364 11 6.43108 11 6C11 5.56892 10.7238 5.18636 10.3146 5.05076L8.26358 4.3711C7.96362 4.2717 7.7283 4.03638 7.6289 3.73642L6.94924 1.68544ZM4.95595 6C5.38537 5.74447 5.74447 5.38537 6 4.95595C6.25554 5.38537 6.61463 5.74447 7.04405 6C6.61463 6.25554 6.25554 6.61463 6 7.04405C5.74447 6.61463 5.38537 6.25554 4.95595 6Z"\n      fill="currentColor"\n    />\n    <path\n      fill-rule="evenodd"\n      clip-rule="evenodd"\n      d="M14.9492 5.68544C14.8136 5.27624 14.4311 5 14 5C13.5689 5 13.1864 5.27624 13.0508 5.68544L11.3755 10.7408C11.2761 11.0408 11.0408 11.2761 10.7408 11.3755L5.68544 13.0508C5.27624 13.1864 5 13.5689 5 14C5 14.4311 5.27624 14.8136 5.68544 14.9492L10.7408 16.6245C11.0408 16.7239 11.2761 16.9592 11.3755 17.2592L13.0508 22.3146C13.1864 22.7238 13.5689 23 14 23C14.4311 23 14.8136 22.7238 14.9492 22.3146L16.6245 17.2592C16.7239 16.9592 16.9592 16.7239 17.2592 16.6245L22.3146 14.9492C22.7238 14.8136 23 14.4311 23 14C23 13.5689 22.7238 13.1864 22.3146 13.0508L17.2592 11.3755C16.9592 11.2761 16.7239 11.0408 16.6245 10.7408L14.9492 5.68544ZM13.274 11.3699L14 9.17903L14.726 11.3699C15.0242 12.2698 15.7302 12.9758 16.6301 13.274L18.821 14L16.6301 14.726C15.7302 15.0242 15.0242 15.7302 14.726 16.6301L14 18.821L13.274 16.6301C12.9758 15.7302 12.2698 15.0242 11.3699 14.726L9.17903 14L11.3699 13.274C12.2698 12.9758 12.9758 12.2698 13.274 11.3699Z"\n      fill="currentColor"\n    />\n  </svg>\n';
const Wrench = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7L336 192c-8.8 0-16-7.2-16-16l0-57.4c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>';
const BorderNoneIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM320 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM224 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-448a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm192 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 320a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM416 192a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>';
const ScissorsIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M278.1 256L444.5 89.6c4.7-4.7 4.7-12.3 0-17-32.8-32.8-86-32.8-118.8 0L210.2 188.1l-24.9-24.9c4.3-10.9 6.7-22.8 6.7-35.3 0-53-43-96-96-96S0 75 0 128s43 96 96 96c4.5 0 9-.3 13.4-.9L142.3 256l-32.9 32.9c-4.4-.6-8.8-.9-13.4-.9-53 0-96 43-96 96s43 96 96 96 96-43 96-96c0-12.5-2.4-24.3-6.7-35.3l24.9-24.9L325.7 439.4c32.8 32.8 86 32.8 118.8 0 4.7-4.7 4.7-12.3 0-17L278.1 256zM96 160c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zm0 256c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"/></svg>';
const ICONS = {
  addRowBefore: AddRowTopIcon,
  addRowAfter: AddRowBottomIcon,
  addColumnBefore: AddColLeftIcon,
  addColumnAfter: AddColRightIcon,
  deleteRow: RemoveRowIcon,
  deleteColumn: RemoveColIcon,
  deleteTable: TrashIcon,
  deleteBorders: BorderNoneIcon,
  mergeCells: TableCellMergeIcon,
  splitCell: TableCellSplitIcon,
  fixTables: Wrench,
  ai: AiSparklesIcon,
  link: LinkIcon,
  table: TableIcon,
  cut: ScissorsIcon,
  copy: CopyIcon,
  paste: ClipboardIcon,
  addDocumentSection: PlusIcon,
  removeDocumentSection: TrashIcon,
  trackChangesAccept: CheckIcon,
  trackChangesReject: XIcon
};
const TEXTS = {
  addRowBefore: "Вставить строку сверху",
  addRowAfter: "Вставить строку снизу",
  addColumnBefore: "Вставить столбец слева",
  addColumnAfter: "Вставить столбец справа",
  deleteRow: "Удалить строку",
  deleteColumn: "Удалить столбец",
  deleteTable: "Удалить таблицу",
  removeBorders: "Убрать границы",
  mergeCells: "Объединить ячейки",
  splitCell: "Разделить ячейку",
  fixTables: "Исправить таблицы",
  insertText: "Вставить текст",
  replaceText: "Заменить текст",
  insertLink: "Вставить ссылку",
  insertTable: "Вставить таблицу",
  cut: "Вырезать",
  copy: "Копировать",
  paste: "Вставить",
  removeDocumentSection: "Удалить раздел",
  createDocumentSection: "Создать раздел",
  trackChangesAccept: "Принять изменение",
  trackChangesReject: "Отклонить изменение"
};
const tableActionsOptions = [
  {
    label: TEXTS.addRowBefore,
    command: "addRowBefore",
    icon: ICONS.addRowBefore,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Add row before"
    }
  },
  {
    label: TEXTS.addRowAfter,
    command: "addRowAfter",
    icon: ICONS.addRowAfter,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Add row after"
    }
  },
  {
    label: TEXTS.addColumnBefore,
    command: "addColumnBefore",
    icon: ICONS.addColumnBefore,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Add column before"
    }
  },
  {
    label: TEXTS.addColumnAfter,
    command: "addColumnAfter",
    icon: ICONS.addColumnAfter,
    bottomBorder: true,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Add column after"
    }
  },
  {
    label: TEXTS.deleteRow,
    command: "deleteRow",
    icon: ICONS.deleteRow,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Delete row"
    }
  },
  {
    label: TEXTS.deleteColumn,
    command: "deleteColumn",
    icon: ICONS.deleteColumn,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Delete column"
    }
  },
  {
    label: TEXTS.deleteTable,
    command: "deleteTable",
    icon: ICONS.deleteTable,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Delete table"
    }
  },
  {
    label: TEXTS.removeBorders,
    command: "deleteCellAndTableBorders",
    icon: ICONS.deleteBorders,
    bottomBorder: true,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Delete cell and table borders"
    }
  },
  {
    label: TEXTS.mergeCells,
    command: "mergeCells",
    icon: ICONS.mergeCells,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Merge cells"
    }
  },
  {
    label: TEXTS.splitCell,
    command: "splitCell",
    icon: ICONS.splitCell,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Split cells"
    }
  },
  {
    label: TEXTS.fixTables,
    command: "fixTables",
    icon: ICONS.fixTables,
    props: {
      "data-item": "btn-tableActions-option",
      ariaLabel: "Fix tables"
    }
  }
];
const TRIGGERS = {
  slash: "slash",
  click: "click"
};
const getPropsByItemId = (itemId, props) => {
  const editor = props.editor;
  const baseProps = {
    editor: markRaw(props.editor)
  };
  switch (itemId) {
    case "insert-text":
      const { state } = editor.view;
      const { from, to, empty } = state.selection;
      const selectedText = !empty ? state.doc.textBetween(from, to) : "";
      return {
        ...baseProps,
        selectedText,
        handleClose: props.closePopover || (() => null),
        apiKey: editor.options?.aiApiKey,
        endpoint: editor.options?.aiEndpoint
      };
    case "insert-link":
      return baseProps;
    case "insert-table":
      return {
        ...baseProps,
        onSelect: ({ rows, cols }) => {
          editor.commands.insertTable({ rows, cols });
          props.closePopover();
        }
      };
    case "edit-table":
      return {
        ...baseProps,
        options: tableActionsOptions,
        onSelect: ({ command }) => {
          if (editor.commands[command]) {
            editor.commands[command]();
          }
          props.closePopover();
        }
      };
    case "copy":
    case "paste":
      return {
        ...baseProps
        // These actions don't need additional props
      };
    default:
      return baseProps;
  }
};
async function getEditorContext(editor, event) {
  if (!editor) return null;
  const state = editor.state;
  if (!state) return null;
  const { from, to, empty } = state.selection;
  const selectedText = !empty ? state.doc.textBetween(from, to) : "";
  let pos = null;
  let node = null;
  if (event && typeof event.clientX === "number" && typeof event.clientY === "number") {
    const coords = { left: event.clientX, top: event.clientY };
    const hit = editor.posAtCoords?.(coords);
    if (typeof hit?.pos === "number") {
      pos = hit.pos;
      node = state.doc.nodeAt(pos);
    }
  }
  if (pos === null && typeof from === "number") {
    pos = from;
    node = state.doc.nodeAt(pos);
  }
  const clipboardContent = {
    html: null,
    text: null,
    hasContent: true,
    // Assume clipboard might have content - we'll check on paste
    raw: null
  };
  const structureFromResolvedPos = pos !== null ? getStructureFromResolvedPos(state, pos) : null;
  const isInTable2 = structureFromResolvedPos?.isInTable ?? selectionHasNodeOrMark(state, "table", { requireEnds: true });
  const isInList = structureFromResolvedPos?.isInList ?? selectionIncludesListParagraph(state);
  const isInSectionNode = structureFromResolvedPos?.isInSectionNode ?? selectionHasNodeOrMark(state, "documentSection", { requireEnds: true });
  const currentNodeType = node?.type?.name || null;
  const activeMarks = [];
  let trackedChangeId = null;
  if (event && pos !== null) {
    const $pos = state.doc.resolve(pos);
    const processMark = (mark) => {
      if (!activeMarks.includes(mark.type.name)) {
        activeMarks.push(mark.type.name);
      }
      if (!trackedChangeId && (mark.type.name === "trackInsert" || mark.type.name === "trackDelete" || mark.type.name === "trackFormat")) {
        trackedChangeId = mark.attrs.id;
      }
    };
    $pos.marks().forEach(processMark);
    const nodeBefore = $pos.nodeBefore;
    const nodeAfter = $pos.nodeAfter;
    if (nodeBefore?.marks) {
      nodeBefore.marks.forEach(processMark);
    }
    if (nodeAfter?.marks) {
      nodeAfter.marks.forEach(processMark);
    }
    state.storedMarks?.forEach(processMark);
  } else {
    state.storedMarks?.forEach((mark) => activeMarks.push(mark.type.name));
    state.selection.$head.marks().forEach((mark) => activeMarks.push(mark.type.name));
  }
  const isTrackedChange = activeMarks.includes("trackInsert") || activeMarks.includes("trackDelete") || activeMarks.includes("trackFormat");
  const trackedChanges = event && pos !== null ? collectTrackedChangesForContext({ state, pos, trackedChangeId }) : collectTrackedChanges({ state, from, to });
  const cursorCoords = pos !== null ? editor.coordsAtPos?.(pos) : null;
  const cursorPosition = cursorCoords ? {
    x: cursorCoords.left,
    y: cursorCoords.top
  } : event ? { x: event.clientX, y: event.clientY } : null;
  return {
    selectedText,
    hasSelection: !empty,
    selectionStart: from,
    selectionEnd: to,
    isInTable: isInTable2,
    isInList,
    isInSectionNode,
    currentNodeType,
    activeMarks,
    isTrackedChange,
    trackedChangeId,
    documentMode: editor.options?.documentMode || "editing",
    canUndo: computeCanUndo(editor, state),
    canRedo: computeCanRedo(editor, state),
    isEditable: editor.isEditable,
    clipboardContent,
    cursorPosition,
    pos,
    node,
    event,
    trigger: event ? "click" : "slash",
    editor,
    trackedChanges
  };
}
function computeCanUndo(editor, state) {
  if (typeof editor?.can === "function") {
    try {
      const can = editor.can();
      if (can && typeof can.undo === "function") {
        return !!can.undo();
      }
    } catch (error) {
      console.warn("[SlashMenu] Unable to determine undo availability via editor.can():", error);
    }
  }
  if (isCollaborationEnabled(editor)) {
    try {
      const undoManager = yUndoPluginKey.getState(state)?.undoManager;
      return !!undoManager && undoManager.undoStack.length > 0;
    } catch (error) {
      console.warn("[SlashMenu] Unable to determine undo availability via y-prosemirror:", error);
    }
  }
  try {
    return undoDepth(state) > 0;
  } catch (error) {
    console.warn("[SlashMenu] Unable to determine undo availability via history plugin:", error);
    return false;
  }
}
function computeCanRedo(editor, state) {
  if (typeof editor?.can === "function") {
    try {
      const can = editor.can();
      if (can && typeof can.redo === "function") {
        return !!can.redo();
      }
    } catch (error) {
      console.warn("[SlashMenu] Unable to determine redo availability via editor.can():", error);
    }
  }
  if (isCollaborationEnabled(editor)) {
    try {
      const undoManager = yUndoPluginKey.getState(state)?.undoManager;
      return !!undoManager && undoManager.redoStack.length > 0;
    } catch (error) {
      console.warn("[SlashMenu] Unable to determine redo availability via y-prosemirror:", error);
    }
  }
  try {
    return redoDepth(state) > 0;
  } catch (error) {
    console.warn("[SlashMenu] Unable to determine redo availability via history plugin:", error);
    return false;
  }
}
function isCollaborationEnabled(editor) {
  return Boolean(editor?.options?.collaborationProvider && editor?.options?.ydoc);
}
function selectionIncludesListParagraph(state) {
  const { $from, $to, from, to } = state.selection;
  const hasListInResolvedPos = ($pos) => {
    for (let depth = $pos.depth; depth > 0; depth--) {
      if (isList($pos.node(depth))) {
        return true;
      }
    }
    return false;
  };
  if (hasListInResolvedPos($from) || hasListInResolvedPos($to)) {
    return true;
  }
  let found = false;
  state.doc.nodesBetween(from, to, (node) => {
    if (isList(node)) {
      found = true;
      return false;
    }
    return true;
  });
  return found;
}
function getStructureFromResolvedPos(state, pos) {
  try {
    const $pos = state.doc.resolve(pos);
    let isInList = false;
    let isInTable2 = false;
    let isInSectionNode = false;
    for (let depth = $pos.depth; depth > 0; depth--) {
      const node = $pos.node(depth);
      const name = node.type.name;
      if (!isInList && isList(node)) {
        isInList = true;
      }
      if (!isInTable2 && (name === "table" || name === "tableRow" || name === "tableCell" || name === "tableHeader")) {
        isInTable2 = true;
      }
      if (!isInSectionNode && name === "documentSection") {
        isInSectionNode = true;
      }
      if (isInList && isInTable2 && isInSectionNode) {
        break;
      }
    }
    return {
      isInTable: isInTable2,
      isInList,
      isInSectionNode
    };
  } catch (error) {
    console.warn("[SlashMenu] Unable to resolve position for structural context:", error);
    return null;
  }
}
const isModuleEnabled = (editorOptions, moduleName) => {
  switch (moduleName) {
    case "ai":
      return !!editorOptions?.isAiEnabled;
    default:
      return true;
  }
};
const shouldShowItem = (item, context) => {
  if (typeof item.showWhen === "function") {
    try {
      return Boolean(item.showWhen(context));
    } catch (error) {
      console.warn("[SlashMenu] showWhen error for item", item.id, ":", error);
      return false;
    }
  }
  return true;
};
const canPerformTrackedChange = (context, action) => {
  if (!context?.editor) return true;
  return isTrackedChangeActionAllowed({
    editor: context.editor,
    action,
    trackedChanges: context.trackedChanges ?? []
  });
};
function getItems(context, customItems = [], includeDefaultItems = true) {
  const { selectedText, editor } = context;
  if (arguments.length === 1 && editor?.options?.slashMenuConfig) {
    customItems = editor.options.slashMenuConfig.items || editor.options.slashMenuConfig.customItems || [];
    includeDefaultItems = editor.options.slashMenuConfig.includeDefaultItems !== false;
  }
  const enhancedContext = {
    ...context,
    isInTable: context.isInTable ?? false,
    isInSectionNode: context.isInSectionNode ?? false,
    isTrackedChange: context.isTrackedChange ?? false,
    clipboardContent: context.clipboardContent ?? { hasContent: false },
    selectedText: context.selectedText ?? "",
    hasSelection: context.hasSelection ?? Boolean(context.selectedText)
  };
  const defaultSections = [
    {
      id: "ai-content",
      isDefault: true,
      items: [
        {
          id: "insert-text",
          label: selectedText ? TEXTS.replaceText : TEXTS.insertText,
          icon: ICONS.ai,
          component: AIWriter,
          isDefault: true,
          action: (editor2) => {
            if (editor2?.commands && typeof editor2.commands?.insertAiMark === "function") {
              editor2.commands.insertAiMark();
            }
          },
          showWhen: (context2) => {
            const { trigger } = context2;
            const allowedTriggers = [TRIGGERS.slash, TRIGGERS.click];
            return allowedTriggers.includes(trigger) && isModuleEnabled(context2.editor?.options, "ai");
          }
        }
      ]
    },
    {
      id: "track-changes",
      isDefault: true,
      items: [
        {
          id: "track-changes-accept",
          icon: ICONS.trackChangesAccept,
          label: TEXTS.trackChangesAccept,
          isDefault: true,
          action: (editor2, context2) => {
            if (context2?.trackedChangeId) {
              editor2.commands.acceptTrackedChangeById(context2.trackedChangeId);
            } else {
              editor2.commands.acceptTrackedChangeBySelection();
            }
          },
          showWhen: (context2) => {
            const { trigger, isTrackedChange } = context2;
            return trigger === TRIGGERS.click && isTrackedChange && canPerformTrackedChange(context2, "accept");
          }
        },
        {
          id: "track-changes-reject",
          label: TEXTS.trackChangesReject,
          icon: ICONS.trackChangesReject,
          isDefault: true,
          action: (editor2, context2) => {
            if (context2?.trackedChangeId) {
              editor2.commands.rejectTrackedChangeById(context2.trackedChangeId);
            } else {
              editor2.commands.rejectTrackedChangeOnSelection();
            }
          },
          showWhen: (context2) => {
            const { trigger, isTrackedChange } = context2;
            return trigger === TRIGGERS.click && isTrackedChange && canPerformTrackedChange(context2, "reject");
          }
        }
      ]
    },
    {
      id: "document-sections",
      isDefault: true,
      items: [
        {
          id: "insert-document-section",
          label: TEXTS.createDocumentSection,
          icon: ICONS.addDocumentSection,
          isDefault: true,
          action: (editor2) => {
            editor2.commands.createDocumentSection();
          },
          // TODO: Temporarily disabled - restore original: `return trigger === TRIGGERS.click;`
          showWhen: () => {
            return false;
          }
        },
        {
          id: "remove-section",
          label: TEXTS.removeDocumentSection,
          icon: ICONS.removeDocumentSection,
          isDefault: true,
          action: (editor2) => {
            editor2.commands.removeSectionAtSelection();
          },
          showWhen: (context2) => {
            const { trigger, isInSectionNode } = context2;
            return trigger === TRIGGERS.click && isInSectionNode;
          }
        }
      ]
    },
    {
      id: "general",
      isDefault: true,
      items: [
        {
          id: "insert-link",
          label: TEXTS.insertLink,
          icon: ICONS.link,
          component: LinkInput,
          isDefault: true,
          showWhen: (context2) => {
            const { trigger } = context2;
            return trigger === TRIGGERS.click;
          }
        },
        {
          id: "insert-table",
          label: TEXTS.insertTable,
          icon: ICONS.table,
          component: TableGrid,
          isDefault: true,
          showWhen: (context2) => {
            const { trigger, isInTable: isInTable2 } = context2;
            const allowedTriggers = [TRIGGERS.slash, TRIGGERS.click];
            return allowedTriggers.includes(trigger) && !isInTable2;
          }
        },
        // Flatten table actions
        ...tableActionsOptions.map((option) => ({
          id: option.command,
          label: option.label,
          icon: option.icon,
          isDefault: true,
          action: (editor2) => {
            if (editor2.commands[option.command]) {
              editor2.commands[option.command]();
            }
          },
          showWhen: (context2) => {
            const { trigger, isInTable: isInTable2 } = context2;
            const allowedTriggers = [TRIGGERS.slash, TRIGGERS.click];
            return allowedTriggers.includes(trigger) && isInTable2;
          }
        }))
      ]
    },
    {
      id: "clipboard",
      isDefault: true,
      items: [
        {
          id: "cut",
          label: TEXTS.cut,
          icon: ICONS.cut,
          isDefault: true,
          action: (editor2) => {
            editor2.focus?.();
            document.execCommand("cut");
          },
          showWhen: (context2) => {
            const { trigger, selectedText: selectedText2 } = context2;
            return trigger === TRIGGERS.click && selectedText2;
          }
        },
        {
          id: "copy",
          label: TEXTS.copy,
          icon: ICONS.copy,
          isDefault: true,
          action: (editor2) => {
            editor2.focus?.();
            document.execCommand("copy");
          },
          showWhen: (context2) => {
            const { trigger, selectedText: selectedText2 } = context2;
            return trigger === TRIGGERS.click && selectedText2;
          }
        },
        {
          id: "paste",
          label: TEXTS.paste,
          icon: ICONS.paste,
          isDefault: true,
          action: (editor2) => {
            const editorDom = editor2.view?.dom;
            if (editorDom) {
              editorDom.focus();
              const success = document.execCommand("paste");
              if (!success) {
                console.warn("[Paste] execCommand paste failed - clipboard may be empty or inaccessible");
              }
            }
          },
          showWhen: (context2) => {
            const { trigger } = context2;
            const allowedTriggers = [TRIGGERS.click, TRIGGERS.slash];
            return allowedTriggers.includes(trigger);
          }
        }
      ]
    }
  ];
  let allSections = [];
  if (includeDefaultItems) {
    allSections = [...defaultSections];
  }
  if (customItems.length > 0) {
    customItems.forEach((customSection) => {
      const existingSectionIndex = allSections.findIndex((section) => section.id === customSection.id);
      if (existingSectionIndex !== -1) {
        allSections[existingSectionIndex].items = [
          ...allSections[existingSectionIndex].items,
          ...customSection.items.map((item) => ({ ...item, isDefault: false }))
        ];
      } else {
        allSections.push({
          ...customSection,
          isDefault: false,
          items: customSection.items.map((item) => ({ ...item, isDefault: false }))
        });
      }
    });
  }
  if (editor?.options?.slashMenuConfig?.menuProvider) {
    try {
      allSections = editor.options.slashMenuConfig.menuProvider(enhancedContext, allSections) || allSections;
    } catch (error) {
      console.warn("[SlashMenu] menuProvider error:", error);
    }
  }
  const filteredSections = allSections.map((section) => {
    const filteredItems = section.items.filter((item) => shouldShowItem(item, enhancedContext));
    return {
      ...section,
      items: filteredItems
    };
  }).filter((section) => section.items.length > 0);
  return filteredSections;
}
const _hoisted_1$6 = { class: "slash-menu-items" };
const _hoisted_2$1 = {
  key: 0,
  class: "slash-menu-divider",
  tabindex: "0"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = ["innerHTML"];
const _sfc_main$8 = {
  __name: "SlashMenu",
  props: {
    editor: {
      type: Object,
      required: true
    },
    openPopover: {
      type: Function,
      required: true
    },
    closePopover: {
      type: Function,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const searchInput = ref(null);
    const searchQuery = ref("");
    const isOpen = ref(false);
    const menuPosition = ref({ left: "0px", top: "0px" });
    const menuRef = ref(null);
    const sections = ref([]);
    const selectedId = ref(null);
    const currentContext = ref(null);
    const handleEditorUpdate = () => {
      if (!props.editor?.isEditable && isOpen.value) {
        closeMenu({ restoreCursor: false });
      }
    };
    const flattenedItems = computed(() => {
      const items = [];
      sections.value.forEach((section) => {
        section.items.forEach((item) => {
          items.push(item);
        });
      });
      return items;
    });
    const filteredItems = computed(() => {
      if (!searchQuery.value) {
        return flattenedItems.value;
      }
      return flattenedItems.value.filter((item) => item.label?.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const filteredSections = computed(() => {
      if (!searchQuery.value) {
        return sections.value;
      }
      return [
        {
          id: "search-results",
          items: filteredItems.value
        }
      ];
    });
    watch(isOpen, (open) => {
      if (open) {
        nextTick(() => {
          if (searchInput.value) {
            searchInput.value.focus({ preventScroll: true });
          }
        });
      }
    });
    watch(flattenedItems, (newItems) => {
      if (newItems.length > 0) {
        selectedId.value = newItems[0].id;
      }
    });
    const customItemRefs = /* @__PURE__ */ new Map();
    const setCustomItemRef = (el, item) => {
      if (el) {
        customItemRefs.set(item.id, { element: el, item });
        nextTick(() => {
          renderCustomItem(item.id);
        });
      }
    };
    const defaultRender = (context) => {
      const item = context.item || context.currentItem;
      const container = document.createElement("div");
      container.className = "slash-menu-default-content";
      if (item.icon) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "slash-menu-item-icon";
        iconSpan.innerHTML = item.icon;
        container.appendChild(iconSpan);
      }
      const labelSpan = document.createElement("span");
      labelSpan.textContent = item.label;
      container.appendChild(labelSpan);
      return container;
    };
    const renderCustomItem = async (itemId) => {
      const refData = customItemRefs.get(itemId);
      if (!refData || refData.element.hasCustomContent) return;
      const { element, item } = refData;
      try {
        if (!currentContext.value) {
          currentContext.value = await getEditorContext(props.editor);
        }
        const contextWithItem = { ...currentContext.value, currentItem: item };
        const renderFunction = item.render || defaultRender;
        const customElement = renderFunction(contextWithItem);
        if (customElement instanceof HTMLElement) {
          element.innerHTML = "";
          element.appendChild(customElement);
          element.hasCustomContent = true;
        }
      } catch (error) {
        console.warn(`[SlashMenu] Error rendering custom item ${itemId}:`, error);
        const fallbackElement = defaultRender({ ...currentContext.value || {}, currentItem: item });
        element.innerHTML = "";
        element.appendChild(fallbackElement);
        element.hasCustomContent = true;
      }
    };
    const cleanupCustomItems = () => {
      customItemRefs.forEach((refData) => {
        if (refData.element) {
          refData.element.hasCustomContent = false;
        }
      });
      customItemRefs.clear();
    };
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Escape" && isOpen.value) {
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
        props.editor?.focus?.();
        return;
      }
      if (isOpen.value && (event.target === searchInput.value || menuRef.value && menuRef.value.contains(event.target))) {
        const currentItems = filteredItems.value;
        const currentIndex = currentItems.findIndex((item) => item.id === selectedId.value);
        switch (event.key) {
          case "ArrowDown": {
            event.preventDefault();
            if (currentIndex < currentItems.length - 1) {
              selectedId.value = currentItems[currentIndex + 1].id;
            }
            break;
          }
          case "ArrowUp": {
            event.preventDefault();
            if (currentIndex > 0) {
              selectedId.value = currentItems[currentIndex - 1].id;
            }
            break;
          }
          case "Enter": {
            event.preventDefault();
            const selectedItem = currentItems.find((item) => item.id === selectedId.value);
            if (selectedItem) {
              executeCommand(selectedItem);
            }
            break;
          }
        }
      }
    };
    const handleGlobalOutsideClick = (event) => {
      if (isOpen.value && menuRef.value && !menuRef.value.contains(event.target)) {
        const isCtrlClickOnMac = event.ctrlKey && isMacOS();
        const isLeftClick = event.button === 0 && !isCtrlClickOnMac;
        if (isLeftClick) {
          moveCursorToMouseEvent(event, props.editor);
        }
        closeMenu({ restoreCursor: false });
      }
    };
    const shouldHandleContextMenu = (event) => {
      const readOnly = !props.editor?.isEditable;
      const contextMenuDisabled = props.editor?.options?.disableContextMenu;
      const bypass = shouldBypassContextMenu(event);
      return !readOnly && !contextMenuDisabled && !bypass;
    };
    const handleRightClickCapture = (event) => {
      try {
        if (shouldHandleContextMenu(event)) {
          event[SLASH_MENU_HANDLED_FLAG] = true;
        }
      } catch (error) {
        console.warn("[SlashMenu] Error in capture phase context menu handler:", error);
      }
    };
    const handleRightClick = async (event) => {
      if (!shouldHandleContextMenu(event)) {
        return;
      }
      event.preventDefault();
      const editorState = props.editor?.state;
      const hasRangeSelection = editorState?.selection?.from !== editorState?.selection?.to;
      let isClickInsideSelection = false;
      if (hasRangeSelection && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
        const hit = props.editor?.posAtCoords?.({ left: event.clientX, top: event.clientY });
        if (typeof hit?.pos === "number") {
          const { from, to } = editorState.selection;
          isClickInsideSelection = hit.pos >= from && hit.pos <= to;
        }
      }
      if (!isClickInsideSelection) {
        moveCursorToMouseEvent(event, props.editor);
      }
      try {
        const context = await getEditorContext(props.editor, event);
        currentContext.value = context;
        sections.value = getItems({ ...context, trigger: "click" });
        selectedId.value = flattenedItems.value[0]?.id || null;
        searchQuery.value = "";
        const currentState = props.editor.state;
        if (!currentState) return;
        props.editor.dispatch(
          currentState.tr.setMeta(SlashMenuPluginKey, {
            type: "open",
            pos: context?.pos ?? currentState.selection.from,
            clientX: event.clientX,
            clientY: event.clientY
          })
        );
      } catch (error) {
        console.error("[SlashMenu] Error opening context menu:", error);
      }
    };
    const executeCommand = async (item) => {
      if (props.editor) {
        item.action ? await item.action(props.editor, currentContext.value) : null;
        if (item.component) {
          const menuElement = menuRef.value;
          const componentProps = getPropsByItemId(item.id, props);
          let popoverPosition = { left: menuPosition.value.left, top: menuPosition.value.top };
          if (menuElement) {
            const menuRect = menuElement.getBoundingClientRect();
            const container = menuElement.closest(".super-editor");
            if (container) {
              const containerRect = container.getBoundingClientRect();
              popoverPosition = {
                left: `${menuRect.left - containerRect.left}px`,
                top: `${menuRect.top - containerRect.top}px`
              };
            }
          }
          props.openPopover(markRaw(item.component), componentProps, popoverPosition);
          closeMenu({ restoreCursor: false });
        } else {
          const shouldRestoreCursor = item.id !== "paste";
          closeMenu({ restoreCursor: shouldRestoreCursor });
        }
      }
    };
    const closeMenu = (options = { restoreCursor: true }) => {
      if (!props.editor) return;
      const state = props.editor.state;
      if (!state) return;
      const pluginState = SlashMenuPluginKey.getState(state);
      const anchorPos = pluginState?.anchorPos;
      props.editor.dispatch(state.tr.setMeta(SlashMenuPluginKey, { type: "close" }));
      if (options.restoreCursor && anchorPos !== null && anchorPos !== void 0) {
        const tr = props.editor.state.tr.setSelection(
          props.editor.state.selection.constructor.near(props.editor.state.doc.resolve(anchorPos))
        );
        props.editor.dispatch(tr);
        props.editor.focus?.();
      }
      cleanupCustomItems();
      currentContext.value = null;
      isOpen.value = false;
      searchQuery.value = "";
      sections.value = [];
    };
    let contextMenuTarget = null;
    let slashMenuOpenHandler = null;
    let slashMenuCloseHandler = null;
    onMounted(() => {
      if (!props.editor) return;
      document.addEventListener("keydown", handleGlobalKeyDown);
      document.addEventListener("pointerdown", handleGlobalOutsideClick);
      props.editor.on("update", handleEditorUpdate);
      slashMenuOpenHandler = async (event) => {
        const readOnly = !props.editor?.isEditable;
        if (readOnly) return;
        isOpen.value = true;
        menuPosition.value = event.menuPosition;
        searchQuery.value = "";
        if (!currentContext.value) {
          const context = await getEditorContext(props.editor);
          currentContext.value = context;
          sections.value = getItems({ ...context, trigger: "slash" });
          selectedId.value = flattenedItems.value[0]?.id || null;
        } else if (sections.value.length === 0) {
          const trigger = currentContext.value.event?.type === "contextmenu" ? "click" : "slash";
          sections.value = getItems({ ...currentContext.value, trigger });
          selectedId.value = flattenedItems.value[0]?.id || null;
        }
      };
      props.editor.on("slashMenu:open", slashMenuOpenHandler);
      contextMenuTarget = getEditorSurfaceElement(props.editor);
      if (contextMenuTarget) {
        contextMenuTarget.addEventListener("contextmenu", handleRightClickCapture, true);
        contextMenuTarget.addEventListener("contextmenu", handleRightClick);
      }
      slashMenuCloseHandler = () => {
        cleanupCustomItems();
        isOpen.value = false;
        searchQuery.value = "";
        currentContext.value = null;
      };
      props.editor.on("slashMenu:close", slashMenuCloseHandler);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("pointerdown", handleGlobalOutsideClick);
      cleanupCustomItems();
      if (props.editor) {
        try {
          if (slashMenuOpenHandler) {
            props.editor.off("slashMenu:open", slashMenuOpenHandler);
          }
          if (slashMenuCloseHandler) {
            props.editor.off("slashMenu:close", slashMenuCloseHandler);
          }
          props.editor.off("update", handleEditorUpdate);
          contextMenuTarget?.removeEventListener("contextmenu", handleRightClickCapture, true);
          contextMenuTarget?.removeEventListener("contextmenu", handleRightClick);
        } catch (error) {
          console.warn("[SlashMenu] Error during cleanup:", error);
        }
      }
    });
    return (_ctx, _cache) => {
      return isOpen.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        ref_key: "menuRef",
        ref: menuRef,
        class: "slash-menu",
        style: normalizeStyle(menuPosition.value),
        onPointerdown: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["stop"]))
      }, [
        withDirectives(createElementVNode("input", {
          ref_key: "searchInput",
          ref: searchInput,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
          type: "text",
          class: "slash-menu-hidden-input",
          onKeydown: [
            handleGlobalKeyDown,
            _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["stop"]))
          ]
        }, null, 544), [
          [vModelText, searchQuery.value]
        ]),
        createElementVNode("div", _hoisted_1$6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredSections.value, (section, sectionIndex) => {
            return openBlock(), createElementBlock(Fragment, {
              key: section.id
            }, [
              sectionIndex > 0 && section.items.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(section.items, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: normalizeClass(["slash-menu-item", { "is-selected": item.id === selectedId.value }]),
                  onClick: ($event) => executeCommand(item)
                }, [
                  createElementVNode("div", {
                    ref_for: true,
                    ref: (el) => setCustomItemRef(el, item),
                    class: "slash-menu-custom-item"
                  }, [
                    !item.render ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      item.icon ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: "slash-menu-item-icon",
                        innerHTML: item.icon
                      }, null, 8, _hoisted_4)) : createCommentVNode("", true),
                      createElementVNode("span", null, toDisplayString(item.label), 1)
                    ], 64)) : createCommentVNode("", true)
                  ], 512)
                ], 10, _hoisted_3);
              }), 128))
            ], 64);
          }), 128))
        ])
      ], 36)) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$5 = ["accept"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
        createElementVNode("input", {
          type: "file",
          id: "fileInput",
          onChange: onFileChange,
          accept: __props.accept
        }, null, 40, _hoisted_1$5)
      ]);
    };
  }
});
const _hoisted_1$4 = {
  key: 0,
  class: "numbering"
};
const MIN_WIDTH = 200;
const PPI = 96;
const alignment = "flex-end";
const _sfc_main$6 = {
  __name: "Ruler",
  props: {
    orientation: {
      type: String,
      default: "horizontal"
    },
    length: {
      type: Number,
      default: 0
    },
    editor: {
      type: Object,
      required: true
    }
  },
  emits: ["margin-change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const ruler = ref(null);
    const rulerDefinition = ref(null);
    const rulerHandleOriginalColor = ref("#CCCCCC");
    const rulerHandleActiveColor = ref("#2563EB66");
    const pageSize = ref(null);
    const pageMargins = ref(null);
    const currentSectionIndex = ref(0);
    const isDragging = ref(false);
    const currentHandle = ref(null);
    const leftHandle = reactive({ side: "left", x: 0 });
    const rightHandle = reactive({ side: "right", x: 0 });
    const showVerticalIndicator = ref(false);
    const initialX = ref(0);
    let offsetX = 0;
    let selectionUpdateHandler = null;
    let zoomChangeHandler = null;
    const currentZoom = ref(1);
    const getPresentationEditor = () => {
      const editor = props.editor;
      if (!editor) return null;
      if (typeof editor.zoom === "number" && typeof editor.setZoom === "function") {
        return editor;
      }
      if (editor.presentationEditor) {
        return editor.presentationEditor;
      }
      return null;
    };
    const updateRulerForCurrentSection = () => {
      if (!props.editor || props.editor.options?.mode !== "docx") {
        return;
      }
      const presentationEditor = getPresentationEditor();
      let docSize, docMargins, sectionIndex;
      if (presentationEditor && typeof presentationEditor.getCurrentSectionPageStyles === "function") {
        const sectionStyles = presentationEditor.getCurrentSectionPageStyles();
        docSize = sectionStyles.pageSize;
        docMargins = sectionStyles.pageMargins;
        sectionIndex = sectionStyles.sectionIndex;
      } else {
        const styles = props.editor.getPageStyles();
        docSize = styles.pageSize ?? { width: 8.5, height: 11 };
        docMargins = styles.pageMargins ?? { left: 1, right: 1, top: 1, bottom: 1 };
        sectionIndex = 0;
      }
      if (pageSize.value && currentSectionIndex.value === sectionIndex) {
        return;
      }
      currentSectionIndex.value = sectionIndex;
      pageSize.value = docSize;
      pageMargins.value = docMargins;
      const definition = generateRulerDefinition({
        pageSize: { width: docSize.width, height: docSize.height },
        pageMargins: {
          left: docMargins.left,
          right: docMargins.right,
          top: docMargins.top ?? 1,
          bottom: docMargins.bottom ?? 1
        }
      });
      leftHandle.x = definition.leftMarginPx;
      rightHandle.x = definition.rightMarginPx;
      rulerDefinition.value = definition;
    };
    const getTickStyle = computed(() => (tick) => {
      const zoom = currentZoom.value;
      return {
        position: "absolute",
        left: `${tick.x * zoom}px`,
        bottom: "0",
        width: "1px",
        height: tick.height,
        backgroundColor: "#666",
        pointerEvents: "none"
      };
    });
    const getHandlePosition = computed(() => (side) => {
      const handle = side === "left" ? leftHandle : rightHandle;
      const zoom = currentZoom.value;
      return {
        left: `${handle.x * zoom}px`
      };
    });
    const getVerticalIndicatorStyle = computed(() => {
      if (!ruler.value) {
        return { left: "0px", minHeight: "100%" };
      }
      const zoom = currentZoom.value;
      const parentElement = ruler.value.parentElement;
      const editor = parentElement?.querySelector(".super-editor") ?? document.querySelector(".super-editor");
      if (!editor) return { left: `${currentHandle.value.x * zoom}px`, minHeight: "100%" };
      const editorBounds = editor.getBoundingClientRect();
      return {
        left: `${currentHandle.value.x * zoom}px`,
        minHeight: `${editorBounds.height}px`
      };
    });
    const screenToLocalX = (screenX) => {
      if (!ruler.value) return screenX;
      const rulerRect = ruler.value.getBoundingClientRect();
      const zoom = currentZoom.value;
      return (screenX - rulerRect.left) / zoom;
    };
    const handleMouseDown = (event) => {
      isDragging.value = true;
      setRulerHandleActive();
      const itemId = event.currentTarget.id;
      currentHandle.value = itemId === "left-margin-handle" ? leftHandle : rightHandle;
      initialX.value = currentHandle.value.x;
      const localX = screenToLocalX(event.clientX);
      offsetX = localX - currentHandle.value.x;
      showVerticalIndicator.value = true;
    };
    const handleMouseMove = (event) => {
      if (!isDragging.value || !pageSize.value) return;
      const localX = screenToLocalX(event.clientX);
      const newLeft = localX - offsetX;
      const pageWidthPx = pageSize.value.width * PPI;
      const otherHandleX = currentHandle.value.side === "left" ? rightHandle.x : leftHandle.x;
      currentHandle.value.x = clampHandlePosition(newLeft, currentHandle.value.side, otherHandleX, pageWidthPx, MIN_WIDTH);
    };
    const handleMouseUp = () => {
      isDragging.value = false;
      showVerticalIndicator.value = false;
      setRulerHandleInactive();
      if (currentHandle.value && currentHandle.value.x !== initialX.value) {
        const marginValue = getNewMarginValue();
        emit("margin-change", {
          side: currentHandle.value.side,
          value: marginValue,
          sectionIndex: currentSectionIndex.value
        });
      }
    };
    const setRulerHandleActive = () => {
      rulerHandleOriginalColor.value = rulerHandleActiveColor.value;
    };
    const setRulerHandleInactive = () => {
      rulerHandleOriginalColor.value = "#CCC";
    };
    const getNewMarginValue = () => {
      if (!pageSize.value) return 0;
      const pageWidthPx = pageSize.value.width * PPI;
      return calculateMarginFromHandle(currentHandle.value.x, currentHandle.value.side, pageWidthPx, PPI);
    };
    const wrapperStyle = computed(() => {
      const width = rulerDefinition.value?.widthPx ?? pageSize.value?.width * PPI ?? 816;
      const zoom = currentZoom.value;
      const scaledWidth = width * zoom;
      return {
        width: `${scaledWidth}px`,
        minWidth: `${scaledWidth}px`,
        height: "25px",
        overflow: "visible",
        flexShrink: 0
      };
    });
    const rulerStyle = computed(() => {
      const width = rulerDefinition.value?.widthPx ?? pageSize.value?.width * PPI ?? 816;
      const zoom = currentZoom.value;
      const scaledWidth = width * zoom;
      return {
        width: `${scaledWidth}px`,
        height: "25px"
      };
    });
    const getStyleVars = computed(() => {
      return {
        "--alignment": alignment,
        "--ruler-handle-color": rulerHandleOriginalColor.value,
        "--ruler-handle-active-color": rulerHandleActiveColor.value
      };
    });
    const handleSelectionUpdate = () => {
      if (isDragging.value) return;
      updateRulerForCurrentSection();
    };
    const handleZoomChange = ({ zoom }) => {
      currentZoom.value = zoom;
    };
    const initializeZoom = () => {
      const presentationEditor = getPresentationEditor();
      if (presentationEditor && typeof presentationEditor.zoom === "number") {
        currentZoom.value = presentationEditor.zoom;
      } else {
        currentZoom.value = 1;
      }
    };
    const setupEditorListeners = () => {
      if (!props.editor) return;
      selectionUpdateHandler = handleSelectionUpdate;
      props.editor.on("selectionUpdate", selectionUpdateHandler);
      const presentationEditor = getPresentationEditor();
      if (presentationEditor) {
        zoomChangeHandler = handleZoomChange;
        presentationEditor.on("zoomChange", zoomChangeHandler);
        initializeZoom();
      }
    };
    const cleanupEditorListeners = () => {
      if (props.editor && selectionUpdateHandler) {
        props.editor.off("selectionUpdate", selectionUpdateHandler);
        selectionUpdateHandler = null;
      }
      const presentationEditor = getPresentationEditor();
      if (presentationEditor && zoomChangeHandler) {
        presentationEditor.off("zoomChange", zoomChangeHandler);
        zoomChangeHandler = null;
      }
    };
    const getPresentationEditorFrom = (editor) => {
      if (!editor) return null;
      if (typeof editor.zoom === "number" && typeof editor.setZoom === "function") {
        return editor;
      }
      return editor.presentationEditor ?? null;
    };
    watch(
      () => props.editor,
      (newEditor, oldEditor) => {
        if (oldEditor) {
          if (selectionUpdateHandler) {
            oldEditor.off("selectionUpdate", selectionUpdateHandler);
          }
          const oldPresentationEditor = getPresentationEditorFrom(oldEditor);
          if (oldPresentationEditor && zoomChangeHandler) {
            oldPresentationEditor.off("zoomChange", zoomChangeHandler);
          }
        }
        if (zoomChangeHandler && !oldEditor) {
          zoomChangeHandler = null;
        }
        if (newEditor) {
          setupEditorListeners();
          updateRulerForCurrentSection();
        }
      }
    );
    onMounted(() => {
      updateRulerForCurrentSection();
      setupEditorListeners();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    });
    onUnmounted(() => {
      cleanupEditorListeners();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "ruler-wrapper",
        style: normalizeStyle([wrapperStyle.value, getStyleVars.value])
      }, [
        createElementVNode("div", {
          class: "ruler",
          ref_key: "ruler",
          ref: ruler,
          style: normalizeStyle(rulerStyle.value)
        }, [
          createElementVNode("div", {
            class: "margin-handle handle-left",
            id: "left-margin-handle",
            onMousedown: handleMouseDown,
            style: normalizeStyle(getHandlePosition.value("left"))
          }, null, 36),
          createElementVNode("div", {
            class: "margin-handle handle-right",
            id: "right-margin-handle",
            onMousedown: handleMouseDown,
            style: normalizeStyle(getHandlePosition.value("right"))
          }, null, 36),
          showVerticalIndicator.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "vertical-indicator",
            style: normalizeStyle(getVerticalIndicatorStyle.value)
          }, null, 4)) : createCommentVNode("", true),
          rulerDefinition.value ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(rulerDefinition.value.ticks, (tick, index) => {
            return openBlock(), createElementBlock("div", {
              key: index,
              class: normalizeClass(["ruler-tick", `ruler-tick--${tick.size}`]),
              style: normalizeStyle(getTickStyle.value(tick))
            }, [
              tick.label !== void 0 ? (openBlock(), createElementBlock("span", _hoisted_1$4, toDisplayString(tick.label), 1)) : createCommentVNode("", true)
            ], 6);
          }), 128)) : createCommentVNode("", true)
        ], 4)
      ], 4);
    };
  }
};
const Ruler = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-fc86020f"]]);
const _sfc_main$5 = {
  __name: "GenericPopover",
  props: {
    editor: { type: Object, required: true },
    styles: { type: Object, default: () => ({}) },
    visible: { type: Boolean, default: false },
    position: { type: Object, default: () => ({ left: "0px", top: "0px" }) }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const popover = ref(null);
    function handleClickOutside(event) {
      if (popover.value && !popover.value.contains(event.target)) {
        emit("close");
      }
      moveCursorToMouseEvent(event, props.editor);
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        emit("close");
      }
    }
    watch(
      () => props.visible,
      (val) => {
        if (val) {
          document.addEventListener("pointerdown", handleClickOutside);
          document.addEventListener("keydown", handleEscape);
        } else {
          document.removeEventListener("pointerdown", handleClickOutside);
          document.removeEventListener("keydown", handleEscape);
        }
      }
    );
    onMounted(() => {
      if (props.visible) {
        document.addEventListener("pointerdown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
      }
    });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    });
    const derivedStyles = computed(() => ({
      left: props.position.left,
      top: props.position.top,
      ...props.styles
    }));
    return (_ctx, _cache) => {
      return __props.visible ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "generic-popover",
        style: normalizeStyle(derivedStyles.value),
        ref_key: "popover",
        ref: popover,
        onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"])),
        onClick: _cache[1] || (_cache[1] = withModifiers(() => {
        }, ["stop"]))
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 36)) : createCommentVNode("", true);
    };
  }
};
const GenericPopover = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-157855b5"]]);
const _hoisted_1$3 = ["data-boundary-index", "data-boundary-type", "onMousedown"];
const RESIZE_HANDLE_WIDTH_PX = 9;
const RESIZE_HANDLE_OFFSET_PX = 4;
const DRAG_OVERLAY_EXTENSION_PX = 1e3;
const MIN_DRAG_OVERLAY_WIDTH_PX = 2e3;
const THROTTLE_INTERVAL_MS = 16;
const MIN_RESIZE_DELTA_PX = 1;
const _sfc_main$4 = {
  __name: "TableResizeOverlay",
  props: {
    /** Editor instance for dispatching transactions */
    editor: {
      type: Object,
      required: true
    },
    /** Show or hide the overlay */
    visible: {
      type: Boolean,
      default: false
    },
    /** Table fragment element containing data-table-boundaries */
    tableElement: {
      type: Object,
      default: null
    }
  },
  emits: ["resize-start", "resize-move", "resize-end", "resize-success", "resize-error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const overlayRect = ref(null);
    const tableMetadata = ref(null);
    const getZoom = () => {
      const editor = props.editor;
      if (editor && typeof editor.zoom === "number") {
        return editor.zoom;
      }
      if (editor?.presentationEditor && typeof editor.presentationEditor.zoom === "number") {
        return editor.presentationEditor.zoom;
      }
      console.warn(
        "[TableResizeOverlay] getZoom: Unable to retrieve zoom from editor instance, using fallback value of 1. This may indicate the editor is not fully initialized or is not a PresentationEditor instance. Table resize handles may be misaligned."
      );
      return 1;
    };
    const dragState = ref(null);
    const forcedCleanup = ref(false);
    let rafId = null;
    let isUnmounted = false;
    function startOverlayTracking() {
      if (rafId !== null) return;
      const step = () => {
        updateOverlayRect();
        rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }
    function stopOverlayTracking() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
    const overlayStyle = computed(() => {
      if (!overlayRect.value || !props.tableElement) return {};
      const rect = overlayRect.value;
      let overlayWidth = rect.width;
      if (dragState.value) {
        overlayWidth = Math.max(rect.width + DRAG_OVERLAY_EXTENSION_PX, MIN_DRAG_OVERLAY_WIDTH_PX);
      }
      return {
        position: "absolute",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${overlayWidth}px`,
        height: `${rect.height}px`,
        pointerEvents: dragState.value ? "auto" : "none",
        zIndex: 10
      };
    });
    function updateOverlayRect() {
      if (!props.tableElement) {
        overlayRect.value = null;
        return;
      }
      const parent = props.tableElement.offsetParent;
      const tableRect = props.tableElement.getBoundingClientRect();
      if (tableRect.width === 0 || tableRect.height === 0) {
        overlayRect.value = null;
        return;
      }
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const left = tableRect.left - parentRect.left + (parent.scrollLeft || 0);
        const top = tableRect.top - parentRect.top + (parent.scrollTop || 0);
        overlayRect.value = {
          left,
          top,
          width: tableRect.width,
          height: tableRect.height
        };
      } else {
        overlayRect.value = {
          left: props.tableElement.offsetLeft,
          top: props.tableElement.offsetTop,
          width: tableRect.width,
          height: tableRect.height
        };
      }
    }
    const resizableBoundaries = computed(() => {
      if (!tableMetadata.value?.columns) {
        return [];
      }
      const columns = tableMetadata.value.columns;
      const boundaries = [];
      for (let i2 = 0; i2 < columns.length - 1; i2++) {
        const col = columns[i2];
        const nextCol = columns[i2 + 1];
        boundaries.push({
          ...col,
          index: i2,
          x: nextCol.x,
          type: "inner"
        });
      }
      const lastCol = columns[columns.length - 1];
      boundaries.push({
        ...lastCol,
        index: columns.length - 1,
        x: lastCol.x + lastCol.w,
        type: "right-edge"
      });
      return boundaries;
    });
    function getBoundarySegments(boundary) {
      if (boundary.type === "right-edge") {
        return [{ y: 0, h: null }];
      }
      const segmentsData = tableMetadata.value?.segments;
      if (!segmentsData || !Array.isArray(segmentsData)) {
        return [{ y: 0, h: null }];
      }
      const boundaryColIndex = boundary.index + 1;
      const colSegments = segmentsData[boundaryColIndex];
      if (!colSegments || colSegments.length === 0) {
        return [];
      }
      return colSegments.filter((seg) => seg && typeof seg === "object").map((seg) => ({
        y: typeof seg.y === "number" ? seg.y : 0,
        h: seg.h !== null && typeof seg.h === "number" ? seg.h : null
      }));
    }
    function getSegmentHandleStyle(boundary, segment) {
      const zoom = getZoom();
      const scaledX = boundary.x * zoom;
      const scaledY = segment.y != null ? segment.y * zoom : null;
      const scaledH = segment.h != null ? segment.h * zoom : null;
      return {
        position: "absolute",
        left: `${scaledX}px`,
        top: scaledY != null ? `${scaledY}px` : "0",
        width: `${RESIZE_HANDLE_WIDTH_PX}px`,
        height: scaledH != null ? `${scaledH}px` : "100%",
        transform: `translateX(-${RESIZE_HANDLE_OFFSET_PX}px)`,
        cursor: "col-resize",
        pointerEvents: "auto"
      };
    }
    const guidelineStyle = computed(() => {
      if (!dragState.value || !tableMetadata.value) return { display: "none" };
      const initialBoundary = resizableBoundaries.value[dragState.value.resizableBoundaryIndex];
      if (!initialBoundary) return { display: "none" };
      const zoom = getZoom();
      const newX = (initialBoundary.x + dragState.value.constrainedDelta) * zoom;
      return {
        position: "absolute",
        left: `${newX}px`,
        top: "0",
        width: "2px",
        height: "100%",
        backgroundColor: "#4A90E2",
        pointerEvents: "none",
        zIndex: 20
      };
    });
    function parseTableMetadata() {
      if (!props.tableElement) {
        tableMetadata.value = null;
        return;
      }
      try {
        const boundariesAttr = props.tableElement.getAttribute("data-table-boundaries");
        if (!boundariesAttr) {
          tableMetadata.value = null;
          return;
        }
        const parsed = JSON.parse(boundariesAttr);
        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.columns)) {
          tableMetadata.value = null;
          return;
        }
        const validatedColumns = parsed.columns.filter((col) => {
          return typeof col === "object" && Number.isFinite(col.i) && col.i >= 0 && Number.isFinite(col.x) && col.x >= 0 && Number.isFinite(col.w) && col.w > 0 && Number.isFinite(col.min) && col.min > 0 && (col.r === 0 || col.r === 1);
        }).map((col) => ({
          i: col.i,
          x: Math.max(0, col.x),
          w: Math.max(1, col.w),
          min: Math.max(1, col.min),
          r: col.r
        }));
        if (validatedColumns.length === 0) {
          tableMetadata.value = null;
          emit("resize-error", {
            error: "Table metadata is corrupted or empty after validation",
            rawMetadata: boundariesAttr
          });
          return;
        }
        const segments = Array.isArray(parsed.segments) ? parsed.segments : void 0;
        tableMetadata.value = { columns: validatedColumns, segments };
      } catch (error) {
        tableMetadata.value = null;
        emit("resize-error", {
          error: error instanceof Error ? error.message : "Failed to parse table boundaries",
          rawMetadata: props.tableElement?.getAttribute("data-table-boundaries")
        });
      }
    }
    function onHandleMouseDown(event, resizableBoundaryIndex) {
      event.preventDefault();
      event.stopPropagation();
      if (!tableMetadata.value?.columns) return;
      const boundary = resizableBoundaries.value[resizableBoundaryIndex];
      if (!boundary) return;
      const columns = tableMetadata.value.columns;
      const isRightEdge = boundary.type === "right-edge";
      const leftColumn = columns[boundary.index];
      const rightColumn = isRightEdge ? null : columns[boundary.index + 1];
      dragState.value = {
        columnIndex: boundary.index,
        resizableBoundaryIndex,
        isRightEdge,
        initialX: event.clientX,
        initialWidths: columns.map((col) => col.w),
        leftColumn: {
          width: leftColumn.w,
          minWidth: leftColumn.min
        },
        rightColumn: rightColumn ? {
          width: rightColumn.w,
          minWidth: rightColumn.min
        } : null,
        constrainedDelta: 0
      };
      if (!props.editor?.view?.dom) {
        emit("resize-error", { error: "Editor view not available" });
        dragState.value = null;
        return;
      }
      const pmView = props.editor.view.dom;
      pmView.style.pointerEvents = "none";
      try {
        document.addEventListener("mousemove", onDocumentMouseMove);
        document.addEventListener("mouseup", onDocumentMouseUp);
        emit("resize-start", {
          columnIndex: boundary.index,
          isRightEdge,
          initialWidths: dragState.value.initialWidths
        });
      } catch (error) {
        document.removeEventListener("mousemove", onDocumentMouseMove);
        document.removeEventListener("mouseup", onDocumentMouseUp);
        pmView.style.pointerEvents = "auto";
        dragState.value = null;
        emit("resize-error", { error: error instanceof Error ? error.message : String(error) });
      }
    }
    function throttle(func, limit) {
      let inThrottle;
      let timeoutId = null;
      const throttled = function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          timeoutId = setTimeout(() => {
            inThrottle = false;
            timeoutId = null;
          }, limit);
        }
      };
      const cancel = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
          inThrottle = false;
        }
      };
      return { throttled, cancel };
    }
    const mouseMoveThrottle = throttle((event) => {
      if (isUnmounted || !dragState.value) return;
      const zoom = getZoom();
      const screenDelta = event.clientX - dragState.value.initialX;
      const delta = screenDelta / zoom;
      const minDelta = -(dragState.value.leftColumn.width - dragState.value.leftColumn.minWidth);
      let maxDelta;
      if (dragState.value.isRightEdge) {
        const tableRect = props.tableElement.getBoundingClientRect();
        const pageEl = props.tableElement.closest(".superdoc-page");
        if (pageEl) {
          const pageRect = pageEl.getBoundingClientRect();
          const tableLeftInPage = tableRect.left - pageRect.left;
          const rightMargin = tableLeftInPage;
          const maxRightPosition = pageRect.right - rightMargin;
          const availableSpace = (maxRightPosition - tableRect.right) / zoom;
          maxDelta = Math.max(0, availableSpace);
        } else {
          maxDelta = Infinity;
        }
      } else {
        maxDelta = dragState.value.rightColumn.width - dragState.value.rightColumn.minWidth;
      }
      const constrainedDelta = Math.max(minDelta, Math.min(maxDelta, delta));
      dragState.value.constrainedDelta = constrainedDelta;
      emit("resize-move", {
        columnIndex: dragState.value.columnIndex,
        delta: constrainedDelta
      });
    }, THROTTLE_INTERVAL_MS);
    const onDocumentMouseMove = mouseMoveThrottle.throttled;
    function onDocumentMouseUp(event) {
      if (!dragState.value) return;
      const finalDelta = dragState.value.constrainedDelta;
      const columnIndex = dragState.value.columnIndex;
      const initialWidths = dragState.value.initialWidths;
      const isRightEdge = dragState.value.isRightEdge;
      const newWidths = [...initialWidths];
      newWidths[columnIndex] = initialWidths[columnIndex] + finalDelta;
      if (!isRightEdge) {
        newWidths[columnIndex + 1] = initialWidths[columnIndex + 1] - finalDelta;
      }
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("mouseup", onDocumentMouseUp);
      if (props.editor?.view?.dom) {
        const pmView = props.editor.view.dom;
        pmView.style.pointerEvents = "auto";
      }
      if (!forcedCleanup.value && Math.abs(finalDelta) > MIN_RESIZE_DELTA_PX) {
        dispatchResizeTransaction(columnIndex, newWidths);
        emit("resize-end", {
          columnIndex,
          finalWidths: newWidths,
          delta: finalDelta
        });
      }
      dragState.value = null;
    }
    function dispatchResizeTransaction(columnIndex, newWidths) {
      if (!props.editor?.view || !props.tableElement) {
        return;
      }
      try {
        const { state, dispatch } = props.editor.view;
        const tr = state.tr;
        const tablePos = findTablePosition(state, props.tableElement);
        if (tablePos === null) {
          emit("resize-error", {
            columnIndex,
            error: "Table position not found in document"
          });
          return;
        }
        const tableNode = state.doc.nodeAt(tablePos);
        if (!tableNode || tableNode.type.name !== "table") {
          emit("resize-error", {
            columnIndex,
            error: "Invalid table node at position"
          });
          return;
        }
        const gridTwips = newWidths.map((w) => pixelsToTwips(w));
        const newGrid = gridTwips.map((twips) => ({ col: twips }));
        const totalWidthTwips = gridTwips.reduce((sum, w) => sum + w, 0);
        const newAttrs = {
          ...tableNode.attrs,
          grid: newGrid,
          tableWidth: totalWidthTwips,
          userEdited: true
        };
        tr.setNodeMarkup(tablePos, null, newAttrs);
        const affectedColumns = [columnIndex, columnIndex + 1];
        updateCellColwidths(tr, tableNode, tablePos, affectedColumns, newWidths);
        dispatch(tr);
        const blockId = props.tableElement?.getAttribute("data-sd-block-id");
        if (blockId && blockId.trim()) {
          measureCache.invalidate([blockId]);
        }
        emit("resize-success", { columnIndex, newWidths });
      } catch (error) {
        emit("resize-error", {
          columnIndex,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
    function findTablePosition(state, tableElement) {
      const pmElement = tableElement.querySelector("[data-pm-start]");
      if (!pmElement) {
        return null;
      }
      const pmStartAttr = pmElement.getAttribute("data-pm-start");
      if (!pmStartAttr) {
        return null;
      }
      const pmStart = parseInt(pmStartAttr, 10);
      if (!Number.isFinite(pmStart)) {
        return null;
      }
      let tablePos = null;
      state.doc.descendants((node, pos) => {
        if (node.type.name === "table") {
          const tableEnd = pos + node.nodeSize;
          if (pmStart >= pos && pmStart < tableEnd) {
            tablePos = pos;
            return false;
          }
        }
      });
      return tablePos;
    }
    function updateCellColwidths(tr, tableNode, tablePos, affectedColumns, newWidths) {
      let currentCol = 0;
      tableNode.descendants((node, pos, parent) => {
        if (node.type.name === "tableRow") {
          currentCol = 0;
          return true;
        }
        if (node.type.name === "tableCell" || node.type.name === "tableHeader") {
          const { colspan = 1 } = node.attrs;
          const cellAffectsColumns = affectedColumns.some(
            (affectedCol) => affectedCol >= currentCol && affectedCol < currentCol + colspan
          );
          if (cellAffectsColumns) {
            const absolutePos = tablePos + 1 + pos;
            const newColwidth = [];
            for (let i2 = 0; i2 < colspan; i2++) {
              const colIndex = currentCol + i2;
              const width = newWidths[colIndex];
              if (width !== void 0 && width > 0) {
                newColwidth.push(width);
              }
            }
            if (newColwidth.length > 0) {
              tr.setNodeMarkup(absolutePos, null, {
                ...node.attrs,
                colwidth: newColwidth
              });
            }
          }
          currentCol += colspan;
          return false;
        }
        return true;
      });
    }
    watch(
      () => props.tableElement,
      () => {
        parseTableMetadata();
        updateOverlayRect();
        if (props.visible && props.tableElement) {
          startOverlayTracking();
        } else if (!props.tableElement) {
          stopOverlayTracking();
        }
      },
      { immediate: true }
    );
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          parseTableMetadata();
          updateOverlayRect();
          startOverlayTracking();
        } else {
          stopOverlayTracking();
          if (dragState.value) {
            forcedCleanup.value = true;
            onDocumentMouseUp(new MouseEvent("mouseup"));
            forcedCleanup.value = false;
          }
        }
      }
    );
    onMounted(() => {
      window.addEventListener("scroll", updateOverlayRect, true);
      window.addEventListener("resize", updateOverlayRect);
      updateOverlayRect();
    });
    onBeforeUnmount(() => {
      isUnmounted = true;
      mouseMoveThrottle.cancel();
      stopOverlayTracking();
      if (dragState.value) {
        document.removeEventListener("mousemove", onDocumentMouseMove);
        document.removeEventListener("mouseup", onDocumentMouseUp);
        if (props.editor?.view?.dom) {
          props.editor.view.dom.style.pointerEvents = "auto";
        }
      }
      window.removeEventListener("scroll", updateOverlayRect, true);
      window.removeEventListener("resize", updateOverlayRect);
    });
    return (_ctx, _cache) => {
      return __props.visible && tableMetadata.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "superdoc-table-resize-overlay",
        style: normalizeStyle(overlayStyle.value),
        onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(resizableBoundaries.value, (boundary, resizableBoundaryIndex) => {
          return openBlock(), createElementBlock(Fragment, {
            key: `boundary-${resizableBoundaryIndex}`
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(getBoundarySegments(boundary), (segment, segmentIndex) => {
              return openBlock(), createElementBlock("div", {
                key: `handle-${boundary.type}-${boundary.index}-${segmentIndex}`,
                class: normalizeClass(["resize-handle", {
                  "resize-handle--active": dragState.value && dragState.value.resizableBoundaryIndex === resizableBoundaryIndex,
                  "resize-handle--edge": boundary.type === "right-edge"
                }]),
                "data-boundary-index": resizableBoundaryIndex,
                "data-boundary-type": boundary.type,
                style: normalizeStyle(getSegmentHandleStyle(boundary, segment)),
                onMousedown: ($event) => onHandleMouseDown($event, resizableBoundaryIndex)
              }, null, 46, _hoisted_1$3);
            }), 128))
          ], 64);
        }), 128)),
        dragState.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "resize-guideline",
          style: normalizeStyle(guidelineStyle.value)
        }, null, 4)) : createCommentVNode("", true)
      ], 36)) : createCommentVNode("", true);
    };
  }
};
const TableResizeOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-814384b6"]]);
const _hoisted_1$2 = ["data-handle-position", "onMousedown"];
const OVERLAY_EXPANSION_PX = 2e3;
const RESIZE_HANDLE_SIZE_PX = 12;
const MOUSE_MOVE_THROTTLE_MS = 16;
const DIMENSION_CHANGE_THRESHOLD_PX = 1;
const Z_INDEX_OVERLAY = 10;
const Z_INDEX_HANDLE = 15;
const Z_INDEX_GUIDELINE = 20;
const _sfc_main$3 = {
  __name: "ImageResizeOverlay",
  props: {
    /** Editor instance for dispatching transactions */
    editor: {
      type: Object,
      required: true
    },
    /** Show or hide the overlay */
    visible: {
      type: Boolean,
      default: false
    },
    /** Image fragment element containing data-image-metadata */
    imageElement: {
      type: Object,
      default: null
    }
  },
  emits: ["resize-start", "resize-move", "resize-end", "resize-success", "resize-error"],
  setup(__props, { emit: __emit }) {
    useCssVars((_ctx) => ({
      "v1e81f81d": RESIZE_HANDLE_SIZE_PX + "px",
      "v12763124": Z_INDEX_HANDLE
    }));
    function isValidEditor(editor) {
      return editor && typeof editor === "object" && editor.view && typeof editor.view === "object" && editor.view.dom instanceof HTMLElement && editor.view.state && typeof editor.view.dispatch === "function";
    }
    const props = __props;
    const emit = __emit;
    const imageMetadata = ref(null);
    const dragState = ref(null);
    const forcedCleanup = ref(false);
    const overlayStyle = computed(() => {
      if (!props.imageElement || !props.imageElement.isConnected) return {};
      const imageRect = props.imageElement.getBoundingClientRect();
      const wrapper = props.imageElement.closest(".super-editor");
      if (!wrapper) {
        return {
          position: "absolute",
          left: `${props.imageElement.offsetLeft}px`,
          top: `${props.imageElement.offsetTop}px`,
          width: `${imageRect.width}px`,
          height: `${imageRect.height}px`,
          pointerEvents: dragState.value ? "auto" : "none",
          zIndex: Z_INDEX_OVERLAY
        };
      }
      const wrapperRect = wrapper.getBoundingClientRect();
      const scrollLeft = wrapper.scrollLeft || 0;
      const scrollTop = wrapper.scrollTop || 0;
      const relativeLeft = imageRect.left - wrapperRect.left + scrollLeft;
      const relativeTop = imageRect.top - wrapperRect.top + scrollTop;
      let overlayWidth = imageRect.width;
      let overlayHeight = imageRect.height;
      let offsetX = 0;
      let offsetY = 0;
      if (dragState.value) {
        const expansion = OVERLAY_EXPANSION_PX;
        overlayWidth = imageRect.width + expansion * 2;
        overlayHeight = imageRect.height + expansion * 2;
        offsetX = -expansion;
        offsetY = -expansion;
      }
      return {
        position: "absolute",
        left: `${relativeLeft + offsetX}px`,
        top: `${relativeTop + offsetY}px`,
        width: `${overlayWidth}px`,
        height: `${overlayHeight}px`,
        pointerEvents: dragState.value ? "auto" : "none",
        zIndex: Z_INDEX_OVERLAY
      };
    });
    const resizeHandles = computed(() => {
      if (!imageMetadata.value || !props.imageElement) {
        return [];
      }
      const rect = props.imageElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const handleSize = RESIZE_HANDLE_SIZE_PX;
      const offset = handleSize / 2;
      const expansion = dragState.value ? OVERLAY_EXPANSION_PX : 0;
      return [
        {
          position: "nw",
          style: {
            left: `${expansion - offset}px`,
            top: `${expansion - offset}px`,
            cursor: "nwse-resize"
          }
        },
        {
          position: "ne",
          style: {
            left: `${expansion + width - offset}px`,
            top: `${expansion - offset}px`,
            cursor: "nesw-resize"
          }
        },
        {
          position: "sw",
          style: {
            left: `${expansion - offset}px`,
            top: `${expansion + height - offset}px`,
            cursor: "nesw-resize"
          }
        },
        {
          position: "se",
          style: {
            left: `${expansion + width - offset}px`,
            top: `${expansion + height - offset}px`,
            cursor: "nwse-resize"
          }
        }
      ];
    });
    const guidelineStyle = computed(() => {
      if (!dragState.value || !props.imageElement) {
        return { display: "none" };
      }
      const expansion = OVERLAY_EXPANSION_PX;
      return {
        position: "absolute",
        left: `${expansion}px`,
        top: `${expansion}px`,
        width: `${dragState.value.constrainedWidth}px`,
        height: `${dragState.value.constrainedHeight}px`,
        border: "2px solid #4A90E2",
        pointerEvents: "none",
        zIndex: Z_INDEX_GUIDELINE,
        boxSizing: "border-box"
      };
    });
    function parseImageMetadata() {
      if (!props.imageElement || !props.imageElement.isConnected) {
        imageMetadata.value = null;
        return;
      }
      try {
        const metadataAttr = props.imageElement.getAttribute("data-image-metadata");
        if (!metadataAttr) {
          imageMetadata.value = null;
          return;
        }
        const parsed = JSON.parse(metadataAttr);
        if (!parsed || typeof parsed !== "object") {
          imageMetadata.value = null;
          return;
        }
        const required = [
          "originalWidth",
          "originalHeight",
          "maxWidth",
          "maxHeight",
          "aspectRatio",
          "minWidth",
          "minHeight"
        ];
        for (const field of required) {
          if (!Number.isFinite(parsed[field]) || parsed[field] <= 0) {
            console.warn(`[ImageResizeOverlay] Invalid or missing metadata field: ${field}`);
            imageMetadata.value = null;
            return;
          }
        }
        imageMetadata.value = parsed;
      } catch (error) {
        imageMetadata.value = null;
        emit("resize-error", {
          error: error instanceof Error ? error.message : "Failed to parse image metadata",
          rawMetadata: props.imageElement?.getAttribute("data-image-metadata")
        });
      }
    }
    function onHandleMouseDown(event, handlePosition) {
      event.preventDefault();
      event.stopPropagation();
      if (!isValidEditor(props.editor) || !imageMetadata.value || !props.imageElement) return;
      const rect = props.imageElement.getBoundingClientRect();
      dragState.value = {
        handle: handlePosition,
        initialX: event.clientX,
        initialY: event.clientY,
        initialWidth: rect.width,
        initialHeight: rect.height,
        aspectRatio: imageMetadata.value.aspectRatio,
        constrainedWidth: rect.width,
        constrainedHeight: rect.height
      };
      const pmView = props.editor.view.dom;
      pmView.style.pointerEvents = "none";
      document.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("mouseup", onDocumentMouseUp);
      document.addEventListener("keydown", onEscapeKey);
      emit("resize-start", {
        blockId: props.imageElement.getAttribute("data-sd-block-id"),
        initialWidth: rect.width,
        initialHeight: rect.height
      });
    }
    function throttle(func, limit) {
      let inThrottle;
      let timeoutId = null;
      const throttled = function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          timeoutId = setTimeout(() => {
            inThrottle = false;
            timeoutId = null;
          }, limit);
        }
      };
      const cancel = () => {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
          inThrottle = false;
        }
      };
      return { throttled, cancel };
    }
    const mouseMoveThrottle = throttle((event) => {
      if (!dragState.value || !imageMetadata.value) return;
      let deltaX = event.clientX - dragState.value.initialX;
      let deltaY = event.clientY - dragState.value.initialY;
      const handle = dragState.value.handle;
      if (handle === "nw") {
        deltaX = -deltaX;
        deltaY = -deltaY;
      } else if (handle === "ne") {
        deltaY = -deltaY;
      } else if (handle === "sw") {
        deltaX = -deltaX;
      }
      const scaleX = (dragState.value.initialWidth + deltaX) / dragState.value.initialWidth;
      const scaleY = (dragState.value.initialHeight + deltaY) / dragState.value.initialHeight;
      const scale = Math.max(scaleX, scaleY);
      let newWidth = dragState.value.initialWidth * scale;
      let newHeight = dragState.value.initialHeight * scale;
      const minWidth = imageMetadata.value.minWidth;
      const minHeight = imageMetadata.value.minHeight;
      const maxWidth = imageMetadata.value.maxWidth;
      const maxHeight = imageMetadata.value.maxHeight;
      if (newWidth < minWidth) {
        newWidth = minWidth;
        newHeight = newWidth / dragState.value.aspectRatio;
      }
      if (newHeight < minHeight) {
        newHeight = minHeight;
        newWidth = newHeight * dragState.value.aspectRatio;
      }
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / dragState.value.aspectRatio;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * dragState.value.aspectRatio;
      }
      dragState.value.constrainedWidth = newWidth;
      dragState.value.constrainedHeight = newHeight;
      emit("resize-move", {
        blockId: props.imageElement.getAttribute("data-sd-block-id"),
        width: newWidth,
        height: newHeight
      });
    }, MOUSE_MOVE_THROTTLE_MS);
    const onDocumentMouseMove = mouseMoveThrottle.throttled;
    function onEscapeKey(event) {
      if (event.key === "Escape" && dragState.value) {
        forcedCleanup.value = true;
        onDocumentMouseUp(new MouseEvent("mouseup"));
        forcedCleanup.value = false;
      }
    }
    function onDocumentMouseUp(event) {
      if (!dragState.value) return;
      const finalWidth = dragState.value.constrainedWidth;
      const finalHeight = dragState.value.constrainedHeight;
      const blockId = props.imageElement?.getAttribute("data-sd-block-id");
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("mouseup", onDocumentMouseUp);
      document.removeEventListener("keydown", onEscapeKey);
      if (props.editor?.view) {
        const pmView = props.editor.view.dom;
        if (pmView && pmView.style) {
          pmView.style.pointerEvents = "auto";
        }
      }
      const widthDelta = Math.abs(finalWidth - dragState.value.initialWidth);
      const heightDelta = Math.abs(finalHeight - dragState.value.initialHeight);
      if (!forcedCleanup.value && (widthDelta > DIMENSION_CHANGE_THRESHOLD_PX || heightDelta > DIMENSION_CHANGE_THRESHOLD_PX)) {
        dispatchResizeTransaction(blockId, finalWidth, finalHeight);
        emit("resize-end", {
          blockId,
          finalWidth,
          finalHeight
        });
      }
      dragState.value = null;
    }
    function dispatchResizeTransaction(blockId, newWidth, newHeight) {
      if (!isValidEditor(props.editor) || !props.imageElement) {
        return;
      }
      if (!Number.isFinite(newWidth) || !Number.isFinite(newHeight) || newWidth <= 0 || newHeight <= 0) {
        emit("resize-error", {
          blockId,
          error: "Invalid dimensions: width and height must be positive finite numbers"
        });
        return;
      }
      try {
        const { state, dispatch } = props.editor.view;
        const tr = state.tr;
        const pmStartAttr = props.imageElement.getAttribute("data-pm-start");
        if (!pmStartAttr) {
          emit("resize-error", {
            blockId,
            error: "Image position marker (data-pm-start) not found"
          });
          return;
        }
        const imagePos = parseInt(pmStartAttr, 10);
        if (!Number.isFinite(imagePos) || imagePos < 0) {
          emit("resize-error", {
            blockId,
            error: "Invalid image position marker"
          });
          return;
        }
        const imageNode = state.doc.nodeAt(imagePos);
        if (!imageNode || imageNode.type.name !== "image") {
          emit("resize-error", {
            blockId,
            error: "Invalid image node at position"
          });
          return;
        }
        const newAttrs = {
          ...imageNode.attrs,
          size: {
            width: Math.round(newWidth),
            height: Math.round(newHeight)
          }
        };
        tr.setNodeMarkup(imagePos, null, newAttrs);
        dispatch(tr);
        if (blockId && blockId.trim()) {
          measureCache.invalidate([blockId]);
        }
        emit("resize-success", { blockId, newWidth, newHeight });
      } catch (error) {
        emit("resize-error", {
          blockId,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
    watch(
      () => props.imageElement,
      () => {
        parseImageMetadata();
      },
      { immediate: true }
    );
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          parseImageMetadata();
        } else {
          if (dragState.value) {
            forcedCleanup.value = true;
            onDocumentMouseUp(new MouseEvent("mouseup"));
            forcedCleanup.value = false;
          }
        }
      }
    );
    onBeforeUnmount(() => {
      mouseMoveThrottle.cancel();
      if (dragState.value) {
        document.removeEventListener("mousemove", onDocumentMouseMove);
        document.removeEventListener("mouseup", onDocumentMouseUp);
        document.removeEventListener("keydown", onEscapeKey);
        if (props.editor?.view?.dom) {
          props.editor.view.dom.style.pointerEvents = "auto";
        }
      }
    });
    return (_ctx, _cache) => {
      return __props.visible && imageMetadata.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "superdoc-image-resize-overlay",
        style: normalizeStyle(overlayStyle.value),
        onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(resizeHandles.value, (handle) => {
          return openBlock(), createElementBlock("div", {
            key: handle.position,
            class: normalizeClass(["resize-handle", {
              "resize-handle--active": dragState.value && dragState.value.handle === handle.position,
              [`resize-handle--${handle.position}`]: true
            }]),
            style: normalizeStyle(handle.style),
            "data-handle-position": handle.position,
            onMousedown: ($event) => onHandleMouseDown($event, handle.position)
          }, null, 46, _hoisted_1$2);
        }), 128)),
        dragState.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "resize-guideline",
          style: normalizeStyle(guidelineStyle.value)
        }, null, 4)) : createCommentVNode("", true)
      ], 36)) : createCommentVNode("", true);
    };
  }
};
const ImageResizeOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e66ec7bb"]]);
const LINK_CLICK_DEBOUNCE_MS = 300;
const CURSOR_UPDATE_TIMEOUT_MS = 10;
const _sfc_main$2 = {
  __name: "LinkClickHandler",
  props: {
    editor: {
      type: Object,
      required: true
    },
    openPopover: {
      type: Function,
      required: true
    },
    closePopover: {
      type: Function,
      required: true
    },
    popoverVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    let lastLinkClickTime = 0;
    const handleLinkClick = (event) => {
      const detail = event?.detail ?? {};
      const linkElement = detail.element;
      const now = Date.now();
      if (now - lastLinkClickTime < LINK_CLICK_DEBOUNCE_MS) {
        return;
      }
      lastLinkClickTime = now;
      if (props.popoverVisible) {
        props.closePopover();
        return;
      }
      if (!props.editor || !props.editor.state) {
        return;
      }
      const surface = getEditorSurfaceElement(props.editor);
      if (!surface) {
        return;
      }
      const pmStart = linkElement?.dataset?.pmStart;
      if (pmStart != null) {
        const pos = parseInt(pmStart, 10);
        const state = props.editor.state;
        const doc = state.doc;
        if (!isNaN(pos) && pos >= 0 && pos <= doc.content.size) {
          const tr = state.tr.setSelection(TextSelection$1.create(doc, pos));
          props.editor.dispatch(tr);
        } else {
          console.warn(`Invalid PM position from data-pm-start: ${pmStart}, falling back to coordinate-based positioning`);
          moveCursorToMouseEvent(detail, props.editor);
        }
      } else {
        moveCursorToMouseEvent(detail, props.editor);
      }
      setTimeout(() => {
        const currentState = props.editor.state;
        const $from = currentState.selection.$from;
        const linkMarkType = currentState.schema.marks.link;
        const nodeAfter = $from.nodeAfter;
        const nodeBefore = $from.nodeBefore;
        const marksOnNodeAfter = nodeAfter?.marks || [];
        const marksOnNodeBefore = nodeBefore?.marks || [];
        const linkOnNodeAfter = linkMarkType && marksOnNodeAfter.some((m) => m.type === linkMarkType);
        const linkOnNodeBefore = linkMarkType && marksOnNodeBefore.some((m) => m.type === linkMarkType);
        const hasLinkAdjacent = linkOnNodeAfter || linkOnNodeBefore;
        const hasLink = selectionHasNodeOrMark(currentState, "link", { requireEnds: true });
        if (hasLink || hasLinkAdjacent) {
          const surfaceRect = surface.getBoundingClientRect();
          if (!surfaceRect) return;
          props.openPopover(
            markRaw(LinkInput),
            {
              showInput: true,
              editor: props.editor,
              closePopover: props.closePopover
            },
            {
              left: `${detail.clientX - surfaceRect.left}px`,
              top: `${detail.clientY - surfaceRect.top + 15}px`
            }
          );
        }
      }, CURSOR_UPDATE_TIMEOUT_MS);
    };
    let surfaceElement = null;
    onMounted(() => {
      if (!props.editor) return;
      surfaceElement = getEditorSurfaceElement(props.editor);
      if (surfaceElement) {
        surfaceElement.addEventListener("superdoc-link-click", handleLinkClick);
      }
    });
    onBeforeUnmount(() => {
      if (surfaceElement) {
        surfaceElement.removeEventListener("superdoc-link-click", handleLinkClick);
      }
    });
    return (_ctx, _cache) => {
      return null;
    };
  }
};
function adjustPaginationBreaks(editorElem, editor) {
  if (!editorElem.value || !editor?.value?.options?.scale || isHeadless(editor)) return;
  const zoom = editor.value.options.scale;
  const bounds = editorElem.value.getBoundingClientRect();
  const breakNodes = editorElem.value.querySelectorAll(".pagination-break-wrapper");
  let firstLeft;
  breakNodes.forEach((node) => {
    const nodeBounds = node.getBoundingClientRect();
    const left = (nodeBounds.left - bounds.left) / zoom * -1 + 1;
    if (!firstLeft) firstLeft = left;
    if (left !== firstLeft) {
      const diff = left - firstLeft;
      node.style.transform = `translateX(${diff}px)`;
    }
  });
}
const BlankDOCX = "data:application/octet-stream;base64,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";
const _hoisted_1$1 = {
  key: 2,
  class: "placeholder-editor"
};
const _hoisted_2 = { class: "placeholder-title" };
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const TABLE_RESIZE_HOVER_THRESHOLD = 8;
const TABLE_RESIZE_THROTTLE_MS = 16;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SuperEditor",
  props: {
    documentId: {
      type: String,
      required: false
    },
    fileSource: {
      type: [File, Blob],
      required: false
    },
    state: {
      type: Object,
      required: false,
      default: () => null
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  emits: ["editor-ready", "editor-click", "editor-keydown", "comments-loaded", "selection-update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const editorReady = ref(false);
    const editor = shallowRef(null);
    const activeEditor = computed(() => {
      if (editor.value && "editor" in editor.value && editor.value.editor) {
        return editor.value.editor;
      }
      return editor.value;
    });
    const contextMenuDisabled = computed(() => {
      const active = activeEditor.value;
      return active?.options ? Boolean(active.options.disableContextMenu) : Boolean(props.options.disableContextMenu);
    });
    const isWebLayout = computed(() => {
      return props.options.viewOptions?.layout === "web";
    });
    const rulersVisible = ref(Boolean(props.options.rulers));
    const currentZoom = ref(1);
    let zoomChangeHandler = null;
    watch(
      () => props.options,
      (newOptions) => {
        const rulers = newOptions?.rulers;
        if (rulers && typeof rulers === "object" && "value" in rulers) {
          rulersVisible.value = Boolean(rulers.value);
        } else {
          rulersVisible.value = Boolean(rulers);
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      () => props.options?.rulerContainer,
      () => {
        nextTick(() => {
          syncRulerOffset();
          setupRulerObservers();
        });
      },
      { immediate: true }
    );
    watch(
      rulersVisible,
      (visible) => {
        nextTick(() => {
          if (visible) {
            syncRulerOffset();
            setupRulerObservers();
          } else {
            rulerHostStyle.value = {};
            cleanupRulerObservers();
          }
        });
      },
      { immediate: true }
    );
    const containerStyle = computed(() => {
      if (isWebLayout.value) {
        return {};
      }
      let maxWidth = 8.5 * 96;
      const ed = editor.value;
      if (ed && "getPages" in ed && typeof ed.getPages === "function") {
        const pages = ed.getPages();
        if (Array.isArray(pages) && pages.length > 0) {
          for (const page of pages) {
            if (page.size && typeof page.size.w === "number" && page.size.w > 0) {
              maxWidth = Math.max(maxWidth, page.size.w);
            }
          }
        }
      }
      if (maxWidth === 8.5 * 96 && ed && "getPageStyles" in ed && typeof ed.getPageStyles === "function") {
        const styles = ed.getPageStyles();
        if (styles && typeof styles === "object" && styles.pageSize && typeof styles.pageSize === "object" && typeof styles.pageSize.width === "number" && styles.pageSize.width > 0) {
          maxWidth = styles.pageSize.width * 96;
        }
      }
      const scaledWidth = maxWidth * currentZoom.value;
      return {
        minWidth: `${scaledWidth}px`
      };
    });
    const rulerHostStyle = ref({});
    const rulerContainerEl = ref(null);
    let editorResizeObserver = null;
    let rulerContainerResizeObserver = null;
    let layoutUpdatedHandler = null;
    const resolveRulerContainer = () => {
      const container = props.options?.rulerContainer;
      if (!container) return null;
      if (typeof container === "string") {
        const doc = editorWrapper.value?.ownerDocument ?? document;
        return doc.querySelector(container);
      }
      return container instanceof HTMLElement ? container : null;
    };
    const getViewportRect = () => {
      const host = editorWrapper.value;
      if (!host) return null;
      const viewport = host.querySelector(".presentation-editor__viewport");
      const target = viewport ?? host;
      return target.getBoundingClientRect();
    };
    const syncRulerOffset = () => {
      if (!rulersVisible.value) {
        rulerHostStyle.value = {};
        return;
      }
      rulerContainerEl.value = resolveRulerContainer();
      if (!rulerContainerEl.value) {
        rulerHostStyle.value = {};
        return;
      }
      const viewportRect = getViewportRect();
      if (!viewportRect) return;
      const hostRect = rulerContainerEl.value.getBoundingClientRect();
      const paddingLeft = Math.max(0, viewportRect.left - hostRect.left);
      const paddingRight = Math.max(0, hostRect.right - viewportRect.right);
      rulerHostStyle.value = {
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`
      };
    };
    const cleanupRulerObservers = () => {
      if (editorResizeObserver) {
        editorResizeObserver.disconnect();
        editorResizeObserver = null;
      }
      if (rulerContainerResizeObserver) {
        rulerContainerResizeObserver.disconnect();
        rulerContainerResizeObserver = null;
      }
    };
    const setupRulerObservers = () => {
      cleanupRulerObservers();
      if (typeof ResizeObserver === "undefined") return;
      const viewportHost = editorWrapper.value;
      const rulerHost = resolveRulerContainer();
      if (viewportHost) {
        editorResizeObserver = new ResizeObserver(() => syncRulerOffset());
        editorResizeObserver.observe(viewportHost);
      }
      if (rulerHost) {
        rulerContainerResizeObserver = new ResizeObserver(() => syncRulerOffset());
        rulerContainerResizeObserver.observe(rulerHost);
      }
    };
    const message = useMessage();
    const editorWrapper = ref(null);
    const editorElem = ref(null);
    const fileSource = ref(null);
    const popoverControls = reactive({
      visible: false,
      position: { left: "0px", top: "0px" },
      component: null,
      props: {}
    });
    const closePopover = () => {
      popoverControls.visible = false;
      popoverControls.component = null;
      popoverControls.props = {};
      activeEditor.value?.view?.focus();
    };
    const openPopover = (component, props2, position) => {
      popoverControls.component = component;
      popoverControls.props = props2;
      popoverControls.position = position;
      popoverControls.visible = true;
    };
    const tableResizeState = reactive({
      visible: false,
      tableElement: null
    });
    const imageResizeState = reactive({
      visible: false,
      imageElement: null,
      blockId: null
    });
    const selectedImageState = reactive({
      element: null,
      blockId: null,
      pmStart: null
    });
    const getEditorZoom = () => {
      const active = activeEditor.value;
      if (active && typeof active.zoom === "number") {
        return active.zoom;
      }
      if (active?.presentationEditor && typeof active.presentationEditor.zoom === "number") {
        return active.presentationEditor.zoom;
      }
      console.warn(
        "[SuperEditor] getEditorZoom: Unable to retrieve zoom from editor instance, using fallback value of 1. This may indicate the editor is not fully initialized or is not a PresentationEditor instance."
      );
      return 1;
    };
    let lastUpdateTableResizeTimestamp = 0;
    const isNearColumnBoundary = (event, tableElement) => {
      if (!event || typeof event.clientX !== "number" || typeof event.clientY !== "number") {
        console.warn("[isNearColumnBoundary] Invalid event: missing clientX or clientY", event);
        return false;
      }
      if (!tableElement || !(tableElement instanceof HTMLElement)) {
        console.warn("[isNearColumnBoundary] Invalid tableElement: not an HTMLElement", tableElement);
        return false;
      }
      const boundariesAttr = tableElement.getAttribute("data-table-boundaries");
      if (!boundariesAttr) return false;
      try {
        const metadata = JSON.parse(boundariesAttr);
        if (!metadata.columns || !Array.isArray(metadata.columns)) return false;
        const zoom = getEditorZoom();
        const tableRect = tableElement.getBoundingClientRect();
        const mouseXScreen = event.clientX - tableRect.left;
        const mouseYScreen = event.clientY - tableRect.top;
        for (let i2 = 0; i2 < metadata.columns.length; i2++) {
          const col = metadata.columns[i2];
          if (!col || typeof col !== "object") {
            console.warn(`[isNearColumnBoundary] Invalid column at index ${i2}: not an object`, col);
            continue;
          }
          if (typeof col.x !== "number" || !Number.isFinite(col.x)) {
            console.warn(`[isNearColumnBoundary] Invalid column.x at index ${i2}:`, col.x);
            continue;
          }
          if (typeof col.w !== "number" || !Number.isFinite(col.w) || col.w <= 0) {
            console.warn(`[isNearColumnBoundary] Invalid column.w at index ${i2}:`, col.w);
            continue;
          }
          const boundaryXScreen = (col.x + col.w) * zoom;
          if (Math.abs(mouseXScreen - boundaryXScreen) <= TABLE_RESIZE_HOVER_THRESHOLD) {
            const segmentColIndex = i2 + 1;
            const segments = metadata.segments?.[segmentColIndex];
            if (!segments || segments.length === 0) {
              if (i2 === metadata.columns.length - 1) return true;
              continue;
            }
            for (const seg of segments) {
              const segTopScreen = (seg.y || 0) * zoom;
              const segBottomScreen = seg.h != null ? segTopScreen + seg.h * zoom : tableRect.height;
              if (mouseYScreen >= segTopScreen && mouseYScreen <= segBottomScreen) {
                return true;
              }
            }
          }
        }
        if (Math.abs(mouseXScreen) <= TABLE_RESIZE_HOVER_THRESHOLD) {
          return true;
        }
        return false;
      } catch (e) {
        console.warn("[isNearColumnBoundary] Failed to parse table boundary metadata:", e);
        return false;
      }
    };
    const updateTableResizeOverlay = (event) => {
      const now = Date.now();
      if (now - lastUpdateTableResizeTimestamp < TABLE_RESIZE_THROTTLE_MS) {
        return;
      }
      lastUpdateTableResizeTimestamp = now;
      if (!editorElem.value) return;
      let target = event.target;
      while (target && target !== editorElem.value) {
        if (target.classList?.contains("superdoc-table-resize-overlay")) {
          return;
        }
        if (target.classList?.contains("superdoc-table-fragment") && target.hasAttribute("data-table-boundaries")) {
          if (isNearColumnBoundary(event, target)) {
            tableResizeState.visible = true;
            tableResizeState.tableElement = target;
          } else {
            tableResizeState.visible = false;
            tableResizeState.tableElement = null;
          }
          return;
        }
        target = target.parentElement;
      }
      tableResizeState.visible = false;
      tableResizeState.tableElement = null;
    };
    const hideTableResizeOverlay = () => {
      tableResizeState.visible = false;
      tableResizeState.tableElement = null;
    };
    const updateImageResizeOverlay = (event) => {
      if (!editorElem.value) return;
      if (!(event.target instanceof Element)) {
        imageResizeState.visible = false;
        imageResizeState.imageElement = null;
        imageResizeState.blockId = null;
        return;
      }
      let target = event.target;
      while (target && target !== document.body) {
        if (target.classList?.contains("superdoc-image-resize-overlay") || target.closest?.(".superdoc-image-resize-overlay")) {
          return;
        }
        if (target.classList?.contains("superdoc-image-fragment") && target.hasAttribute("data-image-metadata")) {
          imageResizeState.visible = true;
          imageResizeState.imageElement = target;
          imageResizeState.blockId = target.getAttribute("data-sd-block-id");
          return;
        }
        if (target.classList?.contains("superdoc-inline-image") && target.hasAttribute("data-image-metadata")) {
          imageResizeState.visible = true;
          imageResizeState.imageElement = target;
          imageResizeState.blockId = target.getAttribute("data-pm-start");
          return;
        }
        target = target.parentElement;
      }
      imageResizeState.visible = false;
      imageResizeState.imageElement = null;
      imageResizeState.blockId = null;
    };
    const hideImageResizeOverlay = () => {
      imageResizeState.visible = false;
      imageResizeState.imageElement = null;
      imageResizeState.blockId = null;
    };
    const clearSelectedImage = () => {
      if (selectedImageState.element?.classList?.contains("superdoc-image-selected")) {
        selectedImageState.element.classList.remove("superdoc-image-selected");
      }
      selectedImageState.element = null;
      selectedImageState.blockId = null;
      selectedImageState.pmStart = null;
    };
    const setSelectedImage = (element, blockId, pmStart) => {
      if (selectedImageState.element && selectedImageState.element !== element) {
        selectedImageState.element.classList.remove("superdoc-image-selected");
      }
      if (element && element.classList) {
        element.classList.add("superdoc-image-selected");
        selectedImageState.element = element;
        selectedImageState.blockId = blockId ?? null;
        selectedImageState.pmStart = typeof pmStart === "number" ? pmStart : null;
      } else {
        clearSelectedImage();
      }
    };
    const handleOverlayUpdates = (event) => {
      updateTableResizeOverlay(event);
      updateImageResizeOverlay(event);
    };
    const handleOverlayHide = () => {
      hideTableResizeOverlay();
      hideImageResizeOverlay();
    };
    let dataPollTimeout;
    const stopPolling = () => {
      clearTimeout(dataPollTimeout);
    };
    const pollForMetaMapData = (ydoc, retries = 10, interval = 500) => {
      const metaMap = ydoc.getMap("meta");
      const checkData = () => {
        const docx = metaMap.get("docx");
        if (docx) {
          stopPolling();
          initEditor({ content: docx });
        } else if (retries > 0) {
          dataPollTimeout = setTimeout(checkData, interval);
          retries--;
        } else {
          console.warn("Failed to load docx data from meta map.");
        }
      };
      checkData();
    };
    const setDefaultBlankFile = async () => {
      fileSource.value = await getFileObject(BlankDOCX, "blank.docx", DOCX);
    };
    const loadNewFileData = async () => {
      if (!fileSource.value) {
        fileSource.value = props.fileSource;
      }
      if (!fileSource.value || fileSource.value.type !== DOCX) {
        await setDefaultBlankFile();
      }
      try {
        const [docx, media, mediaFiles, fonts] = await Editor.loadXmlData(fileSource.value);
        return { content: docx, media, mediaFiles, fonts };
      } catch (err) {
        console.debug("[SuperDoc] Error loading file:", err);
        if (typeof props.options.onException === "function") {
          props.options.onException({ error: err, editor: null });
        }
      }
    };
    const initializeData = async () => {
      if (props.fileSource) {
        let fileData = await loadNewFileData();
        if (!fileData) {
          message.error("Unable to load the file. Please verify the .docx is valid and not password protected.");
          await setDefaultBlankFile();
          fileData = await loadNewFileData();
        }
        return initEditor(fileData);
      } else if (props.options.ydoc && props.options.collaborationProvider) {
        delete props.options.content;
        const ydoc = props.options.ydoc;
        const provider = props.options.collaborationProvider;
        const waitForSync = () => {
          if (provider.isSynced || provider.synced) return Promise.resolve();
          return new Promise((resolve) => {
            const onSync = (synced) => {
              if (synced === false) return;
              provider.off("synced", onSync);
              provider.off("sync", onSync);
              resolve();
            };
            provider.on("synced", onSync);
            provider.on("sync", onSync);
          });
        };
        waitForSync().then(async () => {
          const metaMap = ydoc.getMap("meta");
          if (metaMap.has("docx")) {
            pollForMetaMapData(ydoc);
          } else {
            props.options.isNewFile = true;
            const fileData = await loadNewFileData();
            if (fileData) initEditor(fileData);
          }
        });
      }
    };
    const getExtensions = () => getStarterExtensions();
    const initEditor = async ({ content, media = {}, mediaFiles = {}, fonts = {} } = {}) => {
      if (!editorElem.value) return;
      const { editorCtor, ...editorOptions } = props.options || {};
      const EditorCtor = editorCtor ?? Editor;
      clearSelectedImage();
      editor.value = new EditorCtor({
        mode: "docx",
        element: editorElem.value,
        fileSource: fileSource.value,
        extensions: getExtensions(),
        documentId: props.documentId,
        content,
        media,
        mediaFiles,
        fonts,
        ...editorOptions
      });
      emit("editor-ready", {
        editor: activeEditor.value,
        presentationEditor: editor.value instanceof PresentationEditor ? editor.value : null
      });
      if (editor.value instanceof PresentationEditor) {
        const presentationEditor = editor.value;
        presentationEditor.on("imageSelected", ({ element, blockId, pmStart }) => {
          setSelectedImage(element, blockId ?? null, pmStart);
        });
        presentationEditor.on("imageDeselected", () => {
          clearSelectedImage();
        });
        layoutUpdatedHandler = () => {
          if (imageResizeState.visible && imageResizeState.blockId) {
            const escapedBlockId = CSS.escape(imageResizeState.blockId);
            const newElement = editorElem.value?.querySelector(
              `.superdoc-image-fragment[data-sd-block-id="${escapedBlockId}"]`
            );
            if (newElement) {
              imageResizeState.imageElement = newElement;
            } else {
              imageResizeState.visible = false;
              imageResizeState.imageElement = null;
              imageResizeState.blockId = null;
            }
          }
          if (selectedImageState.blockId) {
            const escapedBlockId = CSS.escape(selectedImageState.blockId);
            const refreshed = editorElem.value?.querySelector(
              `.superdoc-image-fragment[data-sd-block-id="${escapedBlockId}"]`
            );
            if (refreshed) {
              setSelectedImage(refreshed, selectedImageState.blockId, selectedImageState.pmStart);
            } else {
              if (selectedImageState.pmStart != null) {
                const pmSelector = `.superdoc-image-fragment[data-pm-start="${selectedImageState.pmStart}"], .superdoc-inline-image[data-pm-start="${selectedImageState.pmStart}"]`;
                const pmElement = editorElem.value?.querySelector(pmSelector);
                if (pmElement) {
                  setSelectedImage(pmElement, selectedImageState.blockId, selectedImageState.pmStart);
                  return;
                }
              }
              clearSelectedImage();
            }
          }
          nextTick(() => syncRulerOffset());
        };
        presentationEditor.on("layoutUpdated", layoutUpdatedHandler);
        zoomChangeHandler = ({ zoom }) => {
          currentZoom.value = zoom;
          nextTick(() => syncRulerOffset());
        };
        presentationEditor.on("zoomChange", zoomChangeHandler);
        if (typeof presentationEditor.zoom === "number") {
          currentZoom.value = presentationEditor.zoom;
          nextTick(() => syncRulerOffset());
        }
      }
      editor.value.on("paginationUpdate", () => {
        const base = activeEditor.value;
        if (isHeadless(base)) return;
        const paginationTarget = editor.value?.editor ? { value: base } : editor;
        adjustPaginationBreaks(editorElem, paginationTarget);
      });
      editor.value.on("collaborationReady", () => {
        setTimeout(() => {
          editorReady.value = true;
        }, 150);
      });
    };
    const handleSuperEditorKeydown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.altKey && event.shiftKey) {
        if (event.code === "KeyM") {
          const toolbar = document.querySelector(".superdoc-toolbar");
          if (toolbar) {
            toolbar.setAttribute("tabindex", "0");
            toolbar.focus();
          }
        }
      }
      if ((event.metaKey || event.ctrlKey) && !event.shiftKey && !event.altKey && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        const base = activeEditor.value;
        if (!base) return;
        const view = base.view;
        const { state } = view;
        const container = editorWrapper.value;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const cursorCoords = view.coordsAtPos(state.selection.head);
        const left = `${cursorCoords.left - containerRect.left}px`;
        const top = `${cursorCoords.bottom - containerRect.top + 6}px`;
        openPopover(markRaw(LinkInput), {}, { left, top });
      }
      emit("editor-keydown", { editor: activeEditor.value });
    };
    const handleSuperEditorClick = (event) => {
      emit("editor-click", { editor: activeEditor.value });
      let pmElement = editorElem.value?.querySelector(".ProseMirror");
      const base = activeEditor.value;
      if (!pmElement || !base) {
        return;
      }
      let isInsideEditor = pmElement.contains(event.target);
      if (!isInsideEditor && base.isEditable) {
        base.view?.focus();
      }
      if (isInsideEditor && base.isEditable) {
        checkNodeSpecificClicks(base, event, popoverControls);
      }
      updateTableResizeOverlay(event);
    };
    onMounted(() => {
      initializeData();
      if (props.options?.suppressSkeletonLoader || !props.options?.collaborationProvider) editorReady.value = true;
      window.addEventListener("resize", syncRulerOffset, { passive: true });
      nextTick(() => {
        syncRulerOffset();
        setupRulerObservers();
      });
    });
    const handleMarginClick = (event) => {
      if (event.button !== 0) {
        return;
      }
      if (event.ctrlKey && isMacOS()) {
        return;
      }
      const target = event.target;
      if (target?.classList?.contains("ProseMirror")) return;
      if (target?.closest?.(".presentation-editor, .superdoc-layout")) {
        return;
      }
      onMarginClickCursorChange(event, activeEditor.value);
    };
    const handleMarginChange = ({ side, value }) => {
      const base = activeEditor.value;
      if (!base) return;
      const payload = side === "left" ? { leftInches: value } : side === "right" ? { rightInches: value } : side === "top" ? { topInches: value } : side === "bottom" ? { bottomInches: value } : {};
      const didUpdateSection = typeof base.commands?.setSectionPageMarginsAtSelection === "function" ? base.commands.setSectionPageMarginsAtSelection(payload) : false;
      if (!didUpdateSection) {
        const pageStyles = base.getPageStyles();
        const { pageMargins } = pageStyles;
        const update = { ...pageMargins, [side]: value };
        base?.updatePageStyle({ pageMargins: update });
      }
    };
    onBeforeUnmount(() => {
      stopPolling();
      clearSelectedImage();
      if (editor.value instanceof PresentationEditor && zoomChangeHandler) {
        editor.value.off("zoomChange", zoomChangeHandler);
        zoomChangeHandler = null;
      }
      if (editor.value instanceof PresentationEditor && layoutUpdatedHandler) {
        editor.value.off("layoutUpdated", layoutUpdatedHandler);
        layoutUpdatedHandler = null;
      }
      cleanupRulerObservers();
      window.removeEventListener("resize", syncRulerOffset);
      editor.value?.destroy();
      editor.value = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["super-editor-container", { "web-layout": isWebLayout.value }]),
        style: normalizeStyle(containerStyle.value)
      }, [
        __props.options.rulerContainer && rulersVisible.value && !!activeEditor.value ? (openBlock(), createBlock(Teleport, {
          key: 0,
          to: __props.options.rulerContainer
        }, [
          createElementVNode("div", {
            class: "ruler-host",
            style: normalizeStyle(rulerHostStyle.value)
          }, [
            createVNode(Ruler, {
              class: "ruler superdoc-ruler",
              editor: activeEditor.value,
              onMarginChange: handleMarginChange
            }, null, 8, ["editor"])
          ], 4)
        ], 8, ["to"])) : rulersVisible.value && !!activeEditor.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "ruler-host",
          style: normalizeStyle(rulerHostStyle.value)
        }, [
          createVNode(Ruler, {
            class: "ruler",
            editor: activeEditor.value,
            onMarginChange: handleMarginChange
          }, null, 8, ["editor"])
        ], 4)) : createCommentVNode("", true),
        createElementVNode("div", {
          class: "super-editor",
          ref_key: "editorWrapper",
          ref: editorWrapper,
          onKeydown: handleSuperEditorKeydown,
          onClick: handleSuperEditorClick,
          onMousedown: handleMarginClick,
          onMousemove: handleOverlayUpdates,
          onMouseleave: handleOverlayHide
        }, [
          createElementVNode("div", {
            ref_key: "editorElem",
            ref: editorElem,
            class: "editor-element super-editor__element",
            role: "presentation"
          }, null, 512),
          !contextMenuDisabled.value && editorReady.value && activeEditor.value ? (openBlock(), createBlock(_sfc_main$8, {
            key: 0,
            editor: activeEditor.value,
            popoverControls,
            openPopover,
            closePopover
          }, null, 8, ["editor", "popoverControls"])) : createCommentVNode("", true),
          editorReady.value && activeEditor.value ? (openBlock(), createBlock(_sfc_main$2, {
            key: 1,
            editor: activeEditor.value,
            openPopover,
            closePopover,
            popoverVisible: popoverControls.visible
          }, null, 8, ["editor", "popoverVisible"])) : createCommentVNode("", true),
          editorReady.value && activeEditor.value ? (openBlock(), createBlock(TableResizeOverlay, {
            key: 2,
            editor: activeEditor.value,
            visible: tableResizeState.visible,
            tableElement: tableResizeState.tableElement
          }, null, 8, ["editor", "visible", "tableElement"])) : createCommentVNode("", true),
          editorReady.value && activeEditor.value ? (openBlock(), createBlock(ImageResizeOverlay, {
            key: 3,
            editor: activeEditor.value,
            visible: imageResizeState.visible,
            imageElement: imageResizeState.imageElement
          }, null, 8, ["editor", "visible", "imageElement"])) : createCommentVNode("", true)
        ], 544),
        !editorReady.value ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          createElementVNode("div", _hoisted_2, [
            createVNode(unref(NSkeleton), {
              text: "",
              style: { "width": "60%" }
            })
          ]),
          createVNode(unref(NSkeleton), {
            text: "",
            repeat: 6
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            style: { "width": "60%" }
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            repeat: 6,
            style: { "width": "30%", "display": "block", "margin": "20px" }
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            style: { "width": "60%" }
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            repeat: 5
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            style: { "width": "30%" }
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            style: { "margin-top": "50px" }
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            repeat: 6
          }),
          createVNode(unref(NSkeleton), {
            text: "",
            style: { "width": "70%" }
          })
        ])) : createCommentVNode("", true),
        activeEditor.value ? (openBlock(), createBlock(GenericPopover, {
          key: 3,
          editor: activeEditor.value,
          visible: popoverControls.visible,
          position: popoverControls.position,
          onClose: closePopover
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(popoverControls.component), normalizeProps(guardReactiveProps({ ...popoverControls.props, editor: activeEditor.value, closePopover })), null, 16))
          ]),
          _: 1
        }, 8, ["editor", "visible", "position"])) : createCommentVNode("", true)
      ], 6);
    };
  }
});
const SuperEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7d57373c"]]);
const _hoisted_1 = ["innerHTML"];
const _sfc_main = {
  __name: "SuperInput",
  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String,
      required: false,
      default: "Type something..."
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    users: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const editor = shallowRef();
    const editorElem = ref(null);
    const isFocused = ref(false);
    const onTransaction = ({ editor: editor2, transaction }) => {
      const contents = editor2.getHTML();
      emit("update:modelValue", contents);
    };
    const onFocus = ({ editor: editor2, transaction }) => {
      isFocused.value = true;
      updateUsersState();
      emit("focus", { editor: editor2, transaction });
    };
    const onBlur = ({ editor: editor2, transaction }) => {
      isFocused.value = false;
      emit("blur", { editor: editor2, transaction });
    };
    const initEditor = async () => {
      Placeholder.options.placeholder = props.placeholder || "Type something...";
      props.options.onTransaction = onTransaction;
      props.options.onFocus = onFocus;
      props.options.onBlur = onBlur;
      editor.value = new Editor({
        mode: "text",
        content: document.getElementById("currentContent"),
        element: editorElem.value,
        extensions: getRichTextExtensions(),
        users: props.users,
        ...props.options
      });
    };
    const handleFocus = () => {
      isFocused.value = true;
      editor.value?.view?.focus();
    };
    const updateUsersState = () => {
      editor.value?.setOptions({ users: props.users });
    };
    onMounted(() => {
      initEditor();
    });
    onBeforeUnmount(() => {
      editor.value?.destroy();
      editor.value = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["super-editor super-input", { "super-input-active": isFocused.value }]),
        onClick: withModifiers(handleFocus, ["stop", "prevent"])
      }, [
        createElementVNode("div", {
          id: "currentContent",
          style: { "display": "none" },
          innerHTML: __props.modelValue
        }, null, 8, _hoisted_1),
        createElementVNode("div", {
          ref_key: "editorElem",
          ref: editorElem,
          class: "editor-element super-editor__element"
        }, null, 512)
      ], 2);
    };
  }
};
const SuperInput = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c811de9"]]);
const Extensions = {
  Node,
  Attribute,
  Extension,
  Mark,
  //
  Plugin,
  PluginKey,
  Decoration,
  DecorationSet
};
export {
  AIWriter,
  G as AnnotatorHelpers,
  _sfc_main$7 as BasicUpload,
  J as CommentsPluginKey,
  D as DocxZipper,
  Editor,
  Extensions,
  PresentationEditor,
  H as SectionHelpers,
  _sfc_main$8 as SlashMenu,
  ag as SuperConverter,
  SuperEditor,
  SuperInput,
  SuperToolbar,
  Toolbar,
  T as TrackChangesBasePluginKey,
  assertNodeType,
  createZip,
  defineMark,
  defineNode,
  C as fieldAnnotationHelpers,
  getActiveFormatting,
  I as getAllowedImageDimensions,
  i as getMarksFromSelection,
  getRichTextExtensions,
  getStarterExtensions,
  ab as helpers,
  isMarkType,
  isNodeType,
  aV as registeredHandlers,
  F as trackChangesHelpers
};
