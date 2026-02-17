import { D as BIT8, F as MAX_SAFE_INTEGER, G as create, H as BITS7, I as utf8TextDecoder, J as create$1, K as setIfUndefined, L as create$2, O as from, Q as floor$1, R as equalityDeep, U as writeVarUint, V as writeVarString, W as toUint8Array, X as createEncoder, Y as createInjectionKey, Z as toString, $ as throwError, a0 as useSsrAdapter, a1 as configProviderInjectionKey, a2 as cssrAnchorMetaName, a3 as globalStyle, q as cB, p as c, a4 as isMounted, a5 as commonVariables$2, s as cM, a6 as cNotM, a7 as cE, o as derived, a8 as changeColor, a9 as insideModal, aa as insidePopover, ab as resolveWrappedSlot, ac as on, w as warnOnce, u as useConfig, ad as useMergedState, ae as useMemo, t as useTheme, af as useRtl, x as createKey, y as useThemeClass, ag as createId, ah as call, ai as render, aj as messageProviderInjectionKey, ak as messageApiInjectionKey, j as getStarterExtensions, k as getRichTextExtensions, E as Editor, al as fromBase64, am as onChange, an as varStorage, ao as toBase64, ap as createUint8ArrayFromArrayBuffer, aq as offChange, ar as writeVarUint8Array, as as map, at as length, au as isNode, av as min, aw as pow, ax as comments_module_events, ay as getFileObject, az as getTrackChanges, C as CommentsPluginKey, n as TrackChangesBasePluginKey, aA as ellipsisVerticalSvg, aB as xmarkIconSvg, aC as checkIconSvg, aD as caretDownIconSvg, aE as commentIconSvg, B as _export_sfc, aF as NDropdown, b as SuperInput, aG as vClickOutside, P as PresentationEditor, a as SuperEditor, A as AIWriter, aH as NConfigProvider, S as SuperToolbar } from "./index-afjksbRp.es.js";
import { B as BlankDOCX } from "./blank-docx-ABm6XYAA.es.js";
import "./jszip-BjHgpFjf.es.js";
import "./helpers-BsvIMOxu.es.js";
import "./SuperConverter-Cp6MGMGh.es.js";
import { E as EventEmitter } from "./eventemitter3-B9iqx_uA.es.js";
import { j as inject, k as provide, b as computed, l as onBeforeUnmount, p as process$1, m as onBeforeMount, d as defineComponent, h, t as toRef, T as Transition, n as TransitionGroup, w as watchEffect, r as ref, e as onMounted, q as Teleport, F as Fragment, s as reactive, v as effectScope, x as markRaw, y as toRaw, z as isRef, A as isReactive, B as getCurrentInstance, C as watch, u as unref, D as hasInjectionContext, E as nextTick, G as getCurrentScope, H as onScopeDispose, I as toRefs, J as global, K as shallowRef, c as createElementBlock, o as openBlock, L as toDisplayString, i as createVNode, M as withCtx, a as createBaseVNode, N as normalizeStyle, g as createCommentVNode, O as createBlock, P as withModifiers, Q as normalizeClass, R as resolveDirective, S as withDirectives, U as renderList, V as createApp, W as resolveDynamicComponent, X as defineAsyncComponent } from "./vue-DI6_Tcq0.es.js";
import "./jszip.min-BWx74pG_.es.js";
import { HocuspocusProvider, HocuspocusProviderWebsocket } from "@hocuspocus/provider";
import { createZip } from "../super-editor/file-zipper.es.js";
import * as Y from "yjs";
import { Doc, Map as Map$1 } from "yjs";
import { v as v4 } from "./uuid-CjlX8hrF.es.js";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PDF = "application/pdf";
const HTML = "text/html";
const documentTypes = {
  docx: DOCX,
  pdf: PDF,
  html: HTML
};
function compareVersions(version1, version2) {
  const v1Parts = version1.split(".").map(Number);
  const v2Parts = version2.split(".").map(Number);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;
    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }
  return 0;
}
function hasUser(entry) {
  return entry[1].user !== void 0;
}
const awarenessStatesToArray = (context, states) => {
  const seenUsers = /* @__PURE__ */ new Set();
  return Array.from(states.entries()).filter(hasUser).filter(([, value]) => {
    const userEmail = value.user.email;
    if (seenUsers.has(userEmail)) return false;
    seenUsers.add(userEmail);
    return true;
  }).map(([key, value]) => {
    const email = value.user.email;
    let color = context.userColorMap.get(email);
    if (!color) {
      color = context.config.colors[context.colorIndex % context.config.colors.length];
      context.userColorMap.set(email, color);
      context.colorIndex++;
    }
    return {
      clientId: key,
      ...value.user,
      color
    };
  });
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const errorUnexpectedEndOfArray = create("Unexpected end of array");
const errorIntegerOutOfRange = create("Integer out of Range");
class Decoder {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor(uint8Array) {
    this.arr = uint8Array;
    this.pos = 0;
  }
}
const createDecoder = (uint8Array) => new Decoder(uint8Array);
const readUint8Array = (decoder, len) => {
  const view = new Uint8Array(decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len);
  decoder.pos += len;
  return view;
};
const readVarUint8Array = (decoder) => readUint8Array(decoder, readVarUint(decoder));
const readUint8 = (decoder) => decoder.arr[decoder.pos++];
const readVarUint = (decoder) => {
  let num = 0;
  let mult = 1;
  const len = decoder.arr.length;
  while (decoder.pos < len) {
    const r = decoder.arr[decoder.pos++];
    num = num + (r & BITS7) * mult;
    mult *= 128;
    if (r < BIT8) {
      return num;
    }
    if (num > MAX_SAFE_INTEGER) {
      throw errorIntegerOutOfRange;
    }
  }
  throw errorUnexpectedEndOfArray;
};
const _readVarStringPolyfill = (decoder) => {
  let remainingLen = readVarUint(decoder);
  if (remainingLen === 0) {
    return "";
  } else {
    let encodedString = String.fromCodePoint(readUint8(decoder));
    if (--remainingLen < 100) {
      while (remainingLen--) {
        encodedString += String.fromCodePoint(readUint8(decoder));
      }
    } else {
      while (remainingLen > 0) {
        const nextLen = remainingLen < 1e4 ? remainingLen : 1e4;
        const bytes = decoder.arr.subarray(decoder.pos, decoder.pos + nextLen);
        decoder.pos += nextLen;
        encodedString += String.fromCodePoint.apply(
          null,
          /** @type {any} */
          bytes
        );
        remainingLen -= nextLen;
      }
    }
    return decodeURIComponent(escape(encodedString));
  }
};
const _readVarStringNative = (decoder) => (
  /** @type any */
  utf8TextDecoder.decode(readVarUint8Array(decoder))
);
const readVarString = utf8TextDecoder ? _readVarStringNative : _readVarStringPolyfill;
const getUnixTime = Date.now;
class ObservableV2 {
  constructor() {
    this._observers = create$1();
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on(name, f) {
    setIfUndefined(
      this._observers,
      /** @type {string} */
      name,
      create$2
    ).add(f);
    return f;
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once(name, f) {
    const _f = (...args) => {
      this.off(
        name,
        /** @type {any} */
        _f
      );
      f(...args);
    };
    this.on(
      name,
      /** @type {any} */
      _f
    );
  }
  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off(name, f) {
    const observers = this._observers.get(name);
    if (observers !== void 0) {
      observers.delete(f);
      if (observers.size === 0) {
        this._observers.delete(name);
      }
    }
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit(name, args) {
    return from((this._observers.get(name) || create$1()).values()).forEach((f) => f(...args));
  }
  destroy() {
    this._observers = create$1();
  }
}
class Observable {
  constructor() {
    this._observers = create$1();
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  on(name, f) {
    setIfUndefined(this._observers, name, create$2).add(f);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  once(name, f) {
    const _f = (...args) => {
      this.off(name, _f);
      f(...args);
    };
    this.on(name, _f);
  }
  /**
   * @param {N} name
   * @param {function} f
   */
  off(name, f) {
    const observers = this._observers.get(name);
    if (observers !== void 0) {
      observers.delete(f);
      if (observers.size === 0) {
        this._observers.delete(name);
      }
    }
  }
  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit(name, args) {
    return from((this._observers.get(name) || create$1()).values()).forEach((f) => f(...args));
  }
  destroy() {
    this._observers = create$1();
  }
}
const outdatedTimeout = 3e4;
class Awareness extends Observable {
  /**
   * @param {Y.Doc} doc
   */
  constructor(doc) {
    super();
    this.doc = doc;
    this.clientID = doc.clientID;
    this.states = /* @__PURE__ */ new Map();
    this.meta = /* @__PURE__ */ new Map();
    this._checkInterval = /** @type {any} */
    setInterval(() => {
      const now2 = getUnixTime();
      if (this.getLocalState() !== null && outdatedTimeout / 2 <= now2 - /** @type {{lastUpdated:number}} */
      this.meta.get(this.clientID).lastUpdated) {
        this.setLocalState(this.getLocalState());
      }
      const remove = [];
      this.meta.forEach((meta, clientid) => {
        if (clientid !== this.clientID && outdatedTimeout <= now2 - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid);
        }
      });
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, "timeout");
      }
    }, floor$1(outdatedTimeout / 10));
    doc.on("destroy", () => {
      this.destroy();
    });
    this.setLocalState({});
  }
  destroy() {
    this.emit("destroy", [this]);
    this.setLocalState(null);
    super.destroy();
    clearInterval(this._checkInterval);
  }
  /**
   * @return {Object<string,any>|null}
   */
  getLocalState() {
    return this.states.get(this.clientID) || null;
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState(state) {
    const clientID = this.clientID;
    const currLocalMeta = this.meta.get(clientID);
    const clock = currLocalMeta === void 0 ? 0 : currLocalMeta.clock + 1;
    const prevState = this.states.get(clientID);
    if (state === null) {
      this.states.delete(clientID);
    } else {
      this.states.set(clientID, state);
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: getUnixTime()
    });
    const added = [];
    const updated = [];
    const filteredUpdated = [];
    const removed = [];
    if (state === null) {
      removed.push(clientID);
    } else if (prevState == null) {
      if (state != null) {
        added.push(clientID);
      }
    } else {
      updated.push(clientID);
      if (!equalityDeep(prevState, state)) {
        filteredUpdated.push(clientID);
      }
    }
    if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
      this.emit("change", [{ added, updated: filteredUpdated, removed }, "local"]);
    }
    this.emit("update", [{ added, updated, removed }, "local"]);
  }
  /**
   * @param {string} field
   * @param {any} value
   */
  setLocalStateField(field, value) {
    const state = this.getLocalState();
    if (state !== null) {
      this.setLocalState({
        ...state,
        [field]: value
      });
    }
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates() {
    return this.states;
  }
}
const removeAwarenessStates = (awareness, clients, origin) => {
  const removed = [];
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i];
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID);
      if (clientID === awareness.clientID) {
        const curMeta = (
          /** @type {MetaClientState} */
          awareness.meta.get(clientID)
        );
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: getUnixTime()
        });
      }
      removed.push(clientID);
    }
  }
  if (removed.length > 0) {
    awareness.emit("change", [{ added: [], updated: [], removed }, origin]);
    awareness.emit("update", [{ added: [], updated: [], removed }, origin]);
  }
};
const encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {
  const len = clients.length;
  const encoder = createEncoder();
  writeVarUint(encoder, len);
  for (let i = 0; i < len; i++) {
    const clientID = clients[i];
    const state = states.get(clientID) || null;
    const clock = (
      /** @type {MetaClientState} */
      awareness.meta.get(clientID).clock
    );
    writeVarUint(encoder, clientID);
    writeVarUint(encoder, clock);
    writeVarString(encoder, JSON.stringify(state));
  }
  return toUint8Array(encoder);
};
const applyAwarenessUpdate = (awareness, update, origin) => {
  const decoder = createDecoder(update);
  const timestamp = getUnixTime();
  const added = [];
  const updated = [];
  const filteredUpdated = [];
  const removed = [];
  const len = readVarUint(decoder);
  for (let i = 0; i < len; i++) {
    const clientID = readVarUint(decoder);
    let clock = readVarUint(decoder);
    const state = JSON.parse(readVarString(decoder));
    const clientMeta = awareness.meta.get(clientID);
    const prevState = awareness.states.get(clientID);
    const currClock = clientMeta === void 0 ? 0 : clientMeta.clock;
    if (currClock < clock || currClock === clock && state === null && awareness.states.has(clientID)) {
      if (state === null) {
        if (clientID === awareness.clientID && awareness.getLocalState() != null) {
          clock++;
        } else {
          awareness.states.delete(clientID);
        }
      } else {
        awareness.states.set(clientID, state);
      }
      awareness.meta.set(clientID, {
        clock,
        lastUpdated: timestamp
      });
      if (clientMeta === void 0 && state !== null) {
        added.push(clientID);
      } else if (clientMeta !== void 0 && state === null) {
        removed.push(clientID);
      } else if (state !== null) {
        if (!equalityDeep(state, prevState)) {
          filteredUpdated.push(clientID);
        }
        updated.push(clientID);
      }
    }
  }
  if (added.length > 0 || filteredUpdated.length > 0 || removed.length > 0) {
    awareness.emit("change", [{
      added,
      updated: filteredUpdated,
      removed
    }, origin]);
  }
  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    awareness.emit("update", [{
      added,
      updated,
      removed
    }, origin]);
  }
};
function omit(object, keys = [], rest) {
  const omitedObject = {};
  const originalKeys = Object.getOwnPropertyNames(object);
  originalKeys.forEach((originalKey) => {
    if (!keys.includes(originalKey)) {
      omitedObject[originalKey] = object[originalKey];
    }
  });
  return Object.assign(omitedObject, rest);
}
const formItemInjectionKey = createInjectionKey("n-form-item");
function useFormItem(props, {
  defaultSize = "medium",
  mergedSize,
  mergedDisabled
} = {}) {
  const NFormItem = inject(formItemInjectionKey, null);
  provide(formItemInjectionKey, null);
  const mergedSizeRef = computed(mergedSize ? () => mergedSize(NFormItem) : () => {
    const {
      size
    } = props;
    if (size) return size;
    if (NFormItem) {
      const {
        mergedSize: mergedSize2
      } = NFormItem;
      if (mergedSize2.value !== void 0) {
        return mergedSize2.value;
      }
    }
    return defaultSize;
  });
  const mergedDisabledRef = computed(mergedDisabled ? () => mergedDisabled(NFormItem) : () => {
    const {
      disabled
    } = props;
    if (disabled !== void 0) {
      return disabled;
    }
    if (NFormItem) {
      return NFormItem.disabled.value;
    }
    return false;
  });
  const mergedStatusRef = computed(() => {
    const {
      status
    } = props;
    if (status) return status;
    return NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.mergedValidationStatus.value;
  });
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation();
    }
  });
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
    nTriggerFormBlur() {
      if (NFormItem) {
        NFormItem.handleContentBlur();
      }
    },
    nTriggerFormChange() {
      if (NFormItem) {
        NFormItem.handleContentChange();
      }
    },
    nTriggerFormFocus() {
      if (NFormItem) {
        NFormItem.handleContentFocus();
      }
    },
    nTriggerFormInput() {
      if (NFormItem) {
        NFormItem.handleContentInput();
      }
    }
  };
}
function baseSlice(array, start, end) {
  var index = -1, length2 = array.length;
  if (start < 0) {
    start = -start > length2 ? 0 : length2 + start;
  }
  end = end > length2 ? length2 : end;
  if (end < 0) {
    end += length2;
  }
  length2 = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length2);
  while (++index < length2) {
    result[index] = array[index + start];
  }
  return result;
}
function castSlice(array, start, end) {
  var length2 = array.length;
  end = end === void 0 ? length2 : end;
  return !start && end >= length2 ? array : baseSlice(array, start, end);
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$1 + rsVarRange$1 + "]");
function hasUnicode(string) {
  return reHasUnicode.test(string);
}
function asciiToArray(string) {
  return string.split("");
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}
function stringToArray(string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);
    var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
    return chr[methodName]() + trailing;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
function useStyle(mountId, style2, clsPrefixRef) {
  if (!style2) {
    if (process$1.env.NODE_ENV !== "production") throwError("use-style", "No style is specified.");
    return;
  }
  const ssrAdapter = useSsrAdapter();
  const NConfigProvider2 = inject(configProviderInjectionKey, null);
  const mountStyle = () => {
    const clsPrefix = clsPrefixRef.value;
    style2.mount({
      id: clsPrefix === void 0 ? mountId : clsPrefix + mountId,
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      props: {
        bPrefix: clsPrefix ? `.${clsPrefix}-` : void 0
      },
      ssr: ssrAdapter,
      parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
    });
    if (!(NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.preflightStyleDisabled)) {
      globalStyle.mount({
        id: "n-global",
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter,
        parent: NConfigProvider2 === null || NConfigProvider2 === void 0 ? void 0 : NConfigProvider2.styleMountTarget
      });
    }
  };
  if (ssrAdapter) {
    mountStyle();
  } else {
    onBeforeMount(mountStyle);
  }
}
const style$4 = cB("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [c("svg", `
 height: 1em;
 width: 1em;
 `)]);
const NBaseIcon = defineComponent({
  name: "BaseIcon",
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: void 0
    },
    ariaHidden: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function,
    onMousedown: Function,
    onMouseup: Function
  },
  setup(props) {
    useStyle("-base-icon", style$4, toRef(props, "clsPrefix"));
  },
  render() {
    return h("i", {
      class: `${this.clsPrefix}-base-icon`,
      onClick: this.onClick,
      onMousedown: this.onMousedown,
      onMouseup: this.onMouseup,
      role: this.role,
      "aria-label": this.ariaLabel,
      "aria-hidden": this.ariaHidden,
      "aria-disabled": this.ariaDisabled
    }, this.$slots);
  }
});
const NIconSwitchTransition = defineComponent({
  name: "BaseIconSwitchTransition",
  setup(_, {
    slots
  }) {
    const isMountedRef = isMounted();
    return () => h(Transition, {
      name: "icon-switch-transition",
      appear: isMountedRef.value
    }, slots);
  }
});
function replaceable(name, icon) {
  const IconComponent = defineComponent({
    render() {
      return icon();
    }
  });
  return defineComponent({
    name: upperFirst(name),
    setup() {
      var _a;
      const mergedIconsRef = (_a = inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
      return () => {
        var _a2;
        const iconOverride = (_a2 = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a2 === void 0 ? void 0 : _a2[name];
        return iconOverride ? iconOverride() : h(IconComponent, null);
      };
    }
  });
}
const ErrorIcon$1 = replaceable("close", () => h("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, h("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, h("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
})))));
const ErrorIcon = replaceable("error", () => h("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
})))));
const InfoIcon = replaceable("info", () => h("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
})))));
const SuccessIcon = replaceable("success", () => h("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
})))));
const WarningIcon = replaceable("warning", () => h("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, h("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, h("g", {
  "fill-rule": "nonzero"
}, h("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
})))));
const {
  cubicBezierEaseInOut: cubicBezierEaseInOut$1
} = commonVariables$2;
function iconSwitchTransition({
  originalTransform = "",
  left = 0,
  top = 0,
  transition = `all .3s ${cubicBezierEaseInOut$1} !important`
} = {}) {
  return [c("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${originalTransform} scale(0.75)`,
    left,
    top,
    opacity: 0
  }), c("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${originalTransform}`,
    left,
    top,
    opacity: 1
  }), c("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left,
    top,
    transition
  })];
}
const style$3 = cB("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [cM("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), c("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), cNotM("disabled", [c("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), c("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), c("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), c("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), cM("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), cM("round", [c("&::before", `
 border-radius: 50%;
 `)])]);
const NBaseClose = defineComponent({
  name: "BaseClose",
  props: {
    isButtonTag: {
      type: Boolean,
      default: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    focusable: {
      type: Boolean,
      default: true
    },
    round: Boolean,
    onClick: Function,
    absolute: Boolean
  },
  setup(props) {
    useStyle("-base-close", style$3, toRef(props, "clsPrefix"));
    return () => {
      const {
        clsPrefix,
        disabled,
        absolute,
        round,
        isButtonTag
      } = props;
      const Tag = isButtonTag ? "button" : "div";
      return h(Tag, {
        type: isButtonTag ? "button" : void 0,
        tabindex: disabled || !props.focusable ? -1 : 0,
        "aria-disabled": disabled,
        "aria-label": "close",
        role: isButtonTag ? void 0 : "button",
        disabled,
        class: [`${clsPrefix}-base-close`, absolute && `${clsPrefix}-base-close--absolute`, disabled && `${clsPrefix}-base-close--disabled`, round && `${clsPrefix}-base-close--round`],
        onMousedown: (e) => {
          if (!props.focusable) {
            e.preventDefault();
          }
        },
        onClick: props.onClick
      }, h(NBaseIcon, {
        clsPrefix
      }, {
        default: () => h(ErrorIcon$1, null)
      }));
    };
  }
});
const NFadeInExpandTransition = defineComponent({
  name: "FadeInExpandTransition",
  props: {
    appear: Boolean,
    group: Boolean,
    mode: String,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    // reverse mode is only used in tree
    // it make it from expanded to collapsed after mounted
    reverse: Boolean
  },
  setup(props, {
    slots
  }) {
    function handleBeforeLeave(el) {
      if (props.width) {
        el.style.maxWidth = `${el.offsetWidth}px`;
      } else {
        el.style.maxHeight = `${el.offsetHeight}px`;
      }
      void el.offsetWidth;
    }
    function handleLeave(el) {
      if (props.width) {
        el.style.maxWidth = "0";
      } else {
        el.style.maxHeight = "0";
      }
      void el.offsetWidth;
      const {
        onLeave
      } = props;
      if (onLeave) onLeave();
    }
    function handleAfterLeave(el) {
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        el.style.maxHeight = "";
      }
      const {
        onAfterLeave
      } = props;
      if (onAfterLeave) onAfterLeave();
    }
    function handleEnter(el) {
      el.style.transition = "none";
      if (props.width) {
        const memorizedWidth = el.offsetWidth;
        el.style.maxWidth = "0";
        void el.offsetWidth;
        el.style.transition = "";
        el.style.maxWidth = `${memorizedWidth}px`;
      } else {
        if (props.reverse) {
          el.style.maxHeight = `${el.offsetHeight}px`;
          void el.offsetHeight;
          el.style.transition = "";
          el.style.maxHeight = "0";
        } else {
          const memorizedHeight = el.offsetHeight;
          el.style.maxHeight = "0";
          void el.offsetWidth;
          el.style.transition = "";
          el.style.maxHeight = `${memorizedHeight}px`;
        }
      }
      void el.offsetWidth;
    }
    function handleAfterEnter(el) {
      var _a;
      if (props.width) {
        el.style.maxWidth = "";
      } else {
        if (!props.reverse) {
          el.style.maxHeight = "";
        }
      }
      (_a = props.onAfterEnter) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    return () => {
      const {
        group,
        width,
        appear,
        mode
      } = props;
      const type = group ? TransitionGroup : Transition;
      const resolvedProps = {
        name: width ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear,
        onEnter: handleEnter,
        onAfterEnter: handleAfterEnter,
        onBeforeLeave: handleBeforeLeave,
        onLeave: handleLeave,
        onAfterLeave: handleAfterLeave
      };
      if (!group) {
        resolvedProps.mode = mode;
      }
      return h(type, resolvedProps, slots);
    };
  }
});
const style$2 = c([c("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), cB("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [cE("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [iconSwitchTransition()]), cE("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [iconSwitchTransition({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), cE("container", `
 animation: rotator 3s linear infinite both;
 `, [cE("icon", `
 height: 1em;
 width: 1em;
 `)])])]);
const duration = "1.6s";
const exposedLoadingProps = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
};
const NBaseLoading = defineComponent({
  name: "BaseLoading",
  props: Object.assign({
    clsPrefix: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    }
  }, exposedLoadingProps),
  setup(props) {
    useStyle("-base-loading", style$2, toRef(props, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix,
      radius,
      strokeWidth,
      stroke,
      scale
    } = this;
    const scaledRadius = radius / scale;
    return h("div", {
      class: `${clsPrefix}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, h(NIconSwitchTransition, null, {
      default: () => this.show ? h("div", {
        key: "icon",
        class: `${clsPrefix}-base-loading__transition-wrapper`
      }, h("div", {
        class: `${clsPrefix}-base-loading__container`
      }, h("svg", {
        class: `${clsPrefix}-base-loading__icon`,
        viewBox: `0 0 ${2 * scaledRadius} ${2 * scaledRadius}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: stroke
        }
      }, h("g", null, h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${scaledRadius} ${scaledRadius};270 ${scaledRadius} ${scaledRadius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      }), h("circle", {
        class: `${clsPrefix}-base-loading__icon`,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        cx: scaledRadius,
        cy: scaledRadius,
        r: radius - strokeWidth / 2,
        "stroke-dasharray": 5.67 * radius,
        "stroke-dashoffset": 18.48 * radius
      }, h("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${scaledRadius} ${scaledRadius};135 ${scaledRadius} ${scaledRadius};450 ${scaledRadius} ${scaledRadius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      }), h("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * radius};${1.42 * radius};${5.67 * radius}`,
        begin: "0s",
        dur: duration,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : h("div", {
        key: "placeholder",
        class: `${clsPrefix}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
});
const {
  cubicBezierEaseInOut,
  cubicBezierEaseOut,
  cubicBezierEaseIn
} = commonVariables$2;
function fadeInHeightExpandTransition({
  overflow = "hidden",
  duration: duration2 = ".3s",
  originalTransition = "",
  leavingDelay = "0s",
  foldPadding = false,
  enterToProps = void 0,
  leaveToProps = void 0,
  reverse = false
} = {}) {
  const enterClass = reverse ? "leave" : "enter";
  const leaveClass = reverse ? "enter" : "leave";
  return [c(`&.fade-in-height-expand-transition-${leaveClass}-from,
 &.fade-in-height-expand-transition-${enterClass}-to`, Object.assign(Object.assign({}, enterToProps), {
    opacity: 1
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-to,
 &.fade-in-height-expand-transition-${enterClass}-from`, Object.assign(Object.assign({}, leaveToProps), {
    opacity: 0,
    marginTop: "0 !important",
    marginBottom: "0 !important",
    paddingTop: foldPadding ? "0 !important" : void 0,
    paddingBottom: foldPadding ? "0 !important" : void 0
  })), c(`&.fade-in-height-expand-transition-${leaveClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 opacity ${duration2} ${cubicBezierEaseOut} ${leavingDelay},
 margin-top ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 margin-bottom ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-top ${duration2} ${cubicBezierEaseInOut} ${leavingDelay},
 padding-bottom ${duration2} ${cubicBezierEaseInOut} ${leavingDelay}
 ${originalTransition ? `,${originalTransition}` : ""}
 `), c(`&.fade-in-height-expand-transition-${enterClass}-active`, `
 overflow: ${overflow};
 transition:
 max-height ${duration2} ${cubicBezierEaseInOut},
 opacity ${duration2} ${cubicBezierEaseIn},
 margin-top ${duration2} ${cubicBezierEaseInOut},
 margin-bottom ${duration2} ${cubicBezierEaseInOut},
 padding-top ${duration2} ${cubicBezierEaseInOut},
 padding-bottom ${duration2} ${cubicBezierEaseInOut}
 ${originalTransition ? `,${originalTransition}` : ""}
 `)];
}
const commonVariables$1 = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function self$2(vars) {
  const {
    baseColor,
    inputColorDisabled,
    cardColor,
    modalColor,
    popoverColor,
    textColorDisabled,
    borderColor,
    primaryColor,
    textColor2,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadiusSmall,
    lineHeight
  } = vars;
  return Object.assign(Object.assign({}, commonVariables$1), {
    labelLineHeight: lineHeight,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    borderRadius: borderRadiusSmall,
    color: baseColor,
    colorChecked: primaryColor,
    colorDisabled: inputColorDisabled,
    colorDisabledChecked: inputColorDisabled,
    colorTableHeader: cardColor,
    colorTableHeaderModal: modalColor,
    colorTableHeaderPopover: popoverColor,
    checkMarkColor: baseColor,
    checkMarkColorDisabled: textColorDisabled,
    checkMarkColorDisabledChecked: textColorDisabled,
    border: `1px solid ${borderColor}`,
    borderDisabled: `1px solid ${borderColor}`,
    borderDisabledChecked: `1px solid ${borderColor}`,
    borderChecked: `1px solid ${primaryColor}`,
    borderFocus: `1px solid ${primaryColor}`,
    boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, {
      alpha: 0.3
    })}`,
    textColor: textColor2,
    textColorDisabled
  });
}
const checkboxLight = {
  common: derived,
  self: self$2
};
const checkboxGroupInjectionKey = createInjectionKey("n-checkbox-group");
const renderCheckMark = () => h("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, h("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
}));
const renderLineMark = () => h("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, h("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
}));
const style$1 = c([
  cB("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [cM("show-label", "line-height: var(--n-label-line-height);"), c("&:hover", [cB("checkbox-box", [cE("border", "border: var(--n-border-checked);")])]), c("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cM("inside-table", [cB("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [cB("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    c(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), cM("indeterminate", [cB("checkbox-box", [cB("checkbox-icon", [c(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), c(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), cM("checked, indeterminate", [c("&:focus:not(:active)", [cB("checkbox-box", [cE("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), cB("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [cE("border", {
    border: "var(--n-border-checked)"
  })])]), cM("disabled", {
    cursor: "not-allowed"
  }, [cM("checked", [cB("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [cE("border", {
    border: "var(--n-border-disabled-checked)"
  }), cB("checkbox-icon", [c(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), cB("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [cE("border", `
 border: var(--n-border-disabled);
 `), cB("checkbox-icon", [c(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), cE("label", `
 color: var(--n-text-color-disabled);
 `)]), cB("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), cB("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [cE("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), cB("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [c(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), iconSwitchTransition({
    left: "1px",
    top: "1px"
  })])]), cE("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [c("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  insideModal(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  insidePopover(cB("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]);
const checkboxProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  checked: {
    type: [Boolean, String, Number],
    default: void 0
  },
  defaultChecked: {
    type: [Boolean, String, Number],
    default: false
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: void 0
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: true
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: true
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: false
  },
  "onUpdate:checked": [Function, Array],
  onUpdateChecked: [Function, Array],
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array]
});
const NCheckbox = defineComponent({
  name: "Checkbox",
  props: checkboxProps,
  setup(props) {
    if (process$1.env.NODE_ENV !== "production") {
      watchEffect(() => {
        if (props.onChange) {
          warnOnce("checkbox", "`on-change` is deprecated, please use `on-update:checked` instead.");
        }
      });
    }
    const NCheckboxGroup = inject(checkboxGroupInjectionKey, null);
    const selfRef = ref(null);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const uncontrolledCheckedRef = ref(props.defaultChecked);
    const controlledCheckedRef = toRef(props, "checked");
    const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSetRef.value;
        if (groupValueSet && props.value !== void 0) {
          return groupValueSet.has(props.value);
        }
        return false;
      } else {
        return mergedCheckedRef.value === props.checkedValue;
      }
    });
    const formItem = useFormItem(props, {
      mergedSize(NFormItem) {
        const {
          size
        } = props;
        if (size !== void 0) return size;
        if (NCheckboxGroup) {
          const {
            value: mergedSize
          } = NCheckboxGroup.mergedSizeRef;
          if (mergedSize !== void 0) {
            return mergedSize;
          }
        }
        if (NFormItem) {
          const {
            mergedSize
          } = NFormItem;
          if (mergedSize !== void 0) return mergedSize.value;
        }
        return "medium";
      },
      mergedDisabled(NFormItem) {
        const {
          disabled
        } = props;
        if (disabled !== void 0) return disabled;
        if (NCheckboxGroup) {
          if (NCheckboxGroup.disabledRef.value) return true;
          const {
            maxRef: {
              value: max
            },
            checkedCountRef
          } = NCheckboxGroup;
          if (max !== void 0 && checkedCountRef.value >= max && !renderedCheckedRef.value) {
            return true;
          }
          const {
            minRef: {
              value: min2
            }
          } = NCheckboxGroup;
          if (min2 !== void 0 && checkedCountRef.value <= min2 && renderedCheckedRef.value) {
            return true;
          }
        }
        if (NFormItem) {
          return NFormItem.disabled.value;
        }
        return false;
      }
    });
    const {
      mergedDisabledRef,
      mergedSizeRef
    } = formItem;
    const themeRef = useTheme("Checkbox", "-checkbox", style$1, checkboxLight, props, mergedClsPrefixRef);
    function toggle(e) {
      if (NCheckboxGroup && props.value !== void 0) {
        NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value);
      } else {
        const {
          onChange: onChange2,
          "onUpdate:checked": _onUpdateCheck,
          onUpdateChecked
        } = props;
        const {
          nTriggerFormInput,
          nTriggerFormChange
        } = formItem;
        const nextChecked = renderedCheckedRef.value ? props.uncheckedValue : props.checkedValue;
        if (_onUpdateCheck) {
          call(_onUpdateCheck, nextChecked, e);
        }
        if (onUpdateChecked) {
          call(onUpdateChecked, nextChecked, e);
        }
        if (onChange2) call(onChange2, nextChecked, e);
        nTriggerFormInput();
        nTriggerFormChange();
        uncontrolledCheckedRef.value = nextChecked;
      }
    }
    function handleClick(e) {
      if (!mergedDisabledRef.value) {
        toggle(e);
      }
    }
    function handleKeyUp(e) {
      if (mergedDisabledRef.value) return;
      switch (e.key) {
        case " ":
        case "Enter":
          toggle(e);
      }
    }
    function handleKeyDown(e) {
      switch (e.key) {
        case " ":
          e.preventDefault();
      }
    }
    const exposedMethods = {
      focus: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus();
      },
      blur: () => {
        var _a;
        (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
    const rtlEnabledRef = useRtl("Checkbox", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        value: mergedSize
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          borderRadius,
          color,
          colorChecked,
          colorDisabled,
          colorTableHeader,
          colorTableHeaderModal,
          colorTableHeaderPopover,
          checkMarkColor,
          checkMarkColorDisabled,
          border,
          borderFocus,
          borderDisabled,
          borderChecked,
          boxShadowFocus,
          textColor,
          textColorDisabled,
          checkMarkColorDisabledChecked,
          colorDisabledChecked,
          borderDisabledChecked,
          labelPadding,
          labelLineHeight,
          labelFontWeight,
          [createKey("fontSize", mergedSize)]: fontSize,
          [createKey("size", mergedSize)]: size
        }
      } = themeRef.value;
      return {
        "--n-label-line-height": labelLineHeight,
        "--n-label-font-weight": labelFontWeight,
        "--n-size": size,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-border-radius": borderRadius,
        "--n-border": border,
        "--n-border-checked": borderChecked,
        "--n-border-focus": borderFocus,
        "--n-border-disabled": borderDisabled,
        "--n-border-disabled-checked": borderDisabledChecked,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-color": color,
        "--n-color-checked": colorChecked,
        "--n-color-table": colorTableHeader,
        "--n-color-table-modal": colorTableHeaderModal,
        "--n-color-table-popover": colorTableHeaderPopover,
        "--n-color-disabled": colorDisabled,
        "--n-color-disabled-checked": colorDisabledChecked,
        "--n-text-color": textColor,
        "--n-text-color-disabled": textColorDisabled,
        "--n-check-mark-color": checkMarkColor,
        "--n-check-mark-color-disabled": checkMarkColorDisabled,
        "--n-check-mark-color-disabled-checked": checkMarkColorDisabledChecked,
        "--n-font-size": fontSize,
        "--n-label-padding": labelPadding
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("checkbox", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return Object.assign(formItem, exposedMethods, {
      rtlEnabled: rtlEnabledRef,
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      mergedTheme: themeRef,
      labelId: createId(),
      handleClick,
      handleKeyUp,
      handleKeyDown,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a;
    const {
      $slots,
      renderedChecked,
      mergedDisabled,
      indeterminate,
      privateInsideTable,
      cssVars,
      labelId,
      label,
      mergedClsPrefix,
      focusable,
      handleKeyUp,
      handleKeyDown,
      handleClick
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    const labelNode = resolveWrappedSlot($slots.default, (children) => {
      if (label || children) {
        return h("span", {
          class: `${mergedClsPrefix}-checkbox__label`,
          id: labelId
        }, label || children);
      }
      return null;
    });
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-checkbox`, this.themeClass, this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`, renderedChecked && `${mergedClsPrefix}-checkbox--checked`, mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`, indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`, privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`, labelNode && `${mergedClsPrefix}-checkbox--show-label`],
      tabindex: mergedDisabled || !focusable ? void 0 : 0,
      role: "checkbox",
      "aria-checked": indeterminate ? "mixed" : renderedChecked,
      "aria-labelledby": labelId,
      style: cssVars,
      onKeyup: handleKeyUp,
      onKeydown: handleKeyDown,
      onClick: handleClick,
      onMousedown: () => {
        on("selectstart", window, (e) => {
          e.preventDefault();
        }, {
          once: true
        });
      }
    }, h("div", {
      class: `${mergedClsPrefix}-checkbox-box-wrapper`
    }, " ", h("div", {
      class: `${mergedClsPrefix}-checkbox-box`
    }, h(NIconSwitchTransition, null, {
      default: () => this.indeterminate ? h("div", {
        key: "indeterminate",
        class: `${mergedClsPrefix}-checkbox-icon`
      }, renderLineMark()) : h("div", {
        key: "check",
        class: `${mergedClsPrefix}-checkbox-icon`
      }, renderCheckMark())
    }), h("div", {
      class: `${mergedClsPrefix}-checkbox-box__border`
    }))), labelNode);
  }
});
const commonVariables = {
  margin: "0 0 8px 0",
  padding: "10px 20px",
  maxWidth: "720px",
  minWidth: "420px",
  iconMargin: "0 10px 0 0",
  closeMargin: "0 0 0 10px",
  closeSize: "20px",
  closeIconSize: "16px",
  iconSize: "20px",
  fontSize: "14px"
};
function self$1(vars) {
  const {
    textColor2,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    infoColor,
    successColor,
    errorColor,
    warningColor,
    popoverColor,
    boxShadow2,
    primaryColor,
    lineHeight,
    borderRadius,
    closeColorHover,
    closeColorPressed
  } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    closeBorderRadius: borderRadius,
    textColor: textColor2,
    textColorInfo: textColor2,
    textColorSuccess: textColor2,
    textColorError: textColor2,
    textColorWarning: textColor2,
    textColorLoading: textColor2,
    color: popoverColor,
    colorInfo: popoverColor,
    colorSuccess: popoverColor,
    colorError: popoverColor,
    colorWarning: popoverColor,
    colorLoading: popoverColor,
    boxShadow: boxShadow2,
    boxShadowInfo: boxShadow2,
    boxShadowSuccess: boxShadow2,
    boxShadowError: boxShadow2,
    boxShadowWarning: boxShadow2,
    boxShadowLoading: boxShadow2,
    iconColor: textColor2,
    iconColorInfo: infoColor,
    iconColorSuccess: successColor,
    iconColorWarning: warningColor,
    iconColorError: errorColor,
    iconColorLoading: primaryColor,
    closeColorHover,
    closeColorPressed,
    closeIconColor,
    closeIconColorHover,
    closeIconColorPressed,
    closeColorHoverInfo: closeColorHover,
    closeColorPressedInfo: closeColorPressed,
    closeIconColorInfo: closeIconColor,
    closeIconColorHoverInfo: closeIconColorHover,
    closeIconColorPressedInfo: closeIconColorPressed,
    closeColorHoverSuccess: closeColorHover,
    closeColorPressedSuccess: closeColorPressed,
    closeIconColorSuccess: closeIconColor,
    closeIconColorHoverSuccess: closeIconColorHover,
    closeIconColorPressedSuccess: closeIconColorPressed,
    closeColorHoverError: closeColorHover,
    closeColorPressedError: closeColorPressed,
    closeIconColorError: closeIconColor,
    closeIconColorHoverError: closeIconColorHover,
    closeIconColorPressedError: closeIconColorPressed,
    closeColorHoverWarning: closeColorHover,
    closeColorPressedWarning: closeColorPressed,
    closeIconColorWarning: closeIconColor,
    closeIconColorHoverWarning: closeIconColorHover,
    closeIconColorPressedWarning: closeIconColorPressed,
    closeColorHoverLoading: closeColorHover,
    closeColorPressedLoading: closeColorPressed,
    closeIconColorLoading: closeIconColor,
    closeIconColorHoverLoading: closeIconColorHover,
    closeIconColorPressedLoading: closeIconColorPressed,
    loadingColor: primaryColor,
    lineHeight,
    borderRadius,
    border: "0"
  });
}
const messageLight = {
  common: derived,
  self: self$1
};
const messageProps = {
  icon: Function,
  type: {
    type: String,
    default: "info"
  },
  content: [String, Number, Function],
  showIcon: {
    type: Boolean,
    default: true
  },
  closable: Boolean,
  keepAliveOnHover: Boolean,
  onClose: Function,
  onMouseenter: Function,
  onMouseleave: Function
};
const style = c([cB("message-wrapper", `
 margin: var(--n-margin);
 z-index: 0;
 transform-origin: top center;
 display: flex;
 `, [fadeInHeightExpandTransition({
  overflow: "visible",
  originalTransition: "transform .3s var(--n-bezier)",
  enterToProps: {
    transform: "scale(1)"
  },
  leaveToProps: {
    transform: "scale(0.85)"
  }
})]), cB("message", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 margin-bottom .3s var(--n-bezier);
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 border: var(--n-border);
 flex-wrap: nowrap;
 overflow: hidden;
 max-width: var(--n-max-width);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-shadow: var(--n-box-shadow);
 `, [cE("content", `
 display: inline-block;
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 `), cE("icon", `
 position: relative;
 margin: var(--n-icon-margin);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 flex-shrink: 0;
 `, [["default", "info", "success", "warning", "error", "loading"].map((type) => cM(`${type}-type`, [c("> *", `
 color: var(--n-icon-color-${type});
 transition: color .3s var(--n-bezier);
 `)])), c("> *", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 `, [iconSwitchTransition()])]), cE("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 flex-shrink: 0;
 `, [c("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), c("&:active", `
 color: var(--n-close-icon-color-pressed);
 `)])]), cB("message-container", `
 z-index: 6000;
 position: fixed;
 height: 0;
 overflow: visible;
 display: flex;
 flex-direction: column;
 align-items: center;
 `, [cM("top", `
 top: 12px;
 left: 0;
 right: 0;
 `), cM("top-left", `
 top: 12px;
 left: 12px;
 right: 0;
 align-items: flex-start;
 `), cM("top-right", `
 top: 12px;
 left: 0;
 right: 12px;
 align-items: flex-end;
 `), cM("bottom", `
 bottom: 4px;
 left: 0;
 right: 0;
 justify-content: flex-end;
 `), cM("bottom-left", `
 bottom: 4px;
 left: 12px;
 right: 0;
 justify-content: flex-end;
 align-items: flex-start;
 `), cM("bottom-right", `
 bottom: 4px;
 left: 0;
 right: 12px;
 justify-content: flex-end;
 align-items: flex-end;
 `)])]);
const iconRenderMap = {
  info: () => h(InfoIcon, null),
  success: () => h(SuccessIcon, null),
  warning: () => h(WarningIcon, null),
  error: () => h(ErrorIcon, null),
  default: () => null
};
const NMessage = defineComponent({
  name: "Message",
  props: Object.assign(Object.assign({}, messageProps), {
    render: Function
  }),
  setup(props) {
    const {
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const {
      props: messageProviderProps2,
      mergedClsPrefixRef
    } = inject(messageProviderInjectionKey);
    const rtlEnabledRef = useRtl("Message", mergedRtlRef, mergedClsPrefixRef);
    const themeRef = useTheme("Message", "-message", style, messageLight, messageProviderProps2, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type
      } = props;
      const {
        common: {
          cubicBezierEaseInOut: cubicBezierEaseInOut2
        },
        self: {
          padding,
          margin,
          maxWidth,
          iconMargin,
          closeMargin,
          closeSize,
          iconSize,
          fontSize,
          lineHeight,
          borderRadius,
          border,
          iconColorInfo,
          iconColorSuccess,
          iconColorWarning,
          iconColorError,
          iconColorLoading,
          closeIconSize,
          closeBorderRadius,
          [createKey("textColor", type)]: textColor,
          [createKey("boxShadow", type)]: boxShadow,
          [createKey("color", type)]: color,
          [createKey("closeColorHover", type)]: closeColorHover,
          [createKey("closeColorPressed", type)]: closeColorPressed,
          [createKey("closeIconColor", type)]: closeIconColor,
          [createKey("closeIconColorPressed", type)]: closeIconColorPressed,
          [createKey("closeIconColorHover", type)]: closeIconColorHover
        }
      } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-margin": margin,
        "--n-padding": padding,
        "--n-max-width": maxWidth,
        "--n-font-size": fontSize,
        "--n-icon-margin": iconMargin,
        "--n-icon-size": iconSize,
        "--n-close-icon-size": closeIconSize,
        "--n-close-border-radius": closeBorderRadius,
        "--n-close-size": closeSize,
        "--n-close-margin": closeMargin,
        "--n-text-color": textColor,
        "--n-color": color,
        "--n-box-shadow": boxShadow,
        "--n-icon-color-info": iconColorInfo,
        "--n-icon-color-success": iconColorSuccess,
        "--n-icon-color-warning": iconColorWarning,
        "--n-icon-color-error": iconColorError,
        "--n-icon-color-loading": iconColorLoading,
        "--n-close-color-hover": closeColorHover,
        "--n-close-color-pressed": closeColorPressed,
        "--n-close-icon-color": closeIconColor,
        "--n-close-icon-color-pressed": closeIconColorPressed,
        "--n-close-icon-color-hover": closeIconColorHover,
        "--n-line-height": lineHeight,
        "--n-border-radius": borderRadius,
        "--n-border": border
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("message", computed(() => props.type[0]), cssVarsRef, {}) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      messageProviderProps: messageProviderProps2,
      handleClose() {
        var _a;
        (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
      },
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      placement: messageProviderProps2.placement
    };
  },
  render() {
    const {
      render: renderMessage,
      type,
      closable,
      content,
      mergedClsPrefix,
      cssVars,
      themeClass,
      onRender,
      icon,
      handleClose,
      showIcon
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    let iconNode;
    return h("div", {
      class: [`${mergedClsPrefix}-message-wrapper`, themeClass],
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave,
      style: [{
        alignItems: this.placement.startsWith("top") ? "flex-start" : "flex-end"
      }, cssVars]
    }, renderMessage ? renderMessage(this.$props) : h("div", {
      class: [`${mergedClsPrefix}-message ${mergedClsPrefix}-message--${type}-type`, this.rtlEnabled && `${mergedClsPrefix}-message--rtl`]
    }, (iconNode = createIconVNode(icon, type, mergedClsPrefix)) && showIcon ? h("div", {
      class: `${mergedClsPrefix}-message__icon ${mergedClsPrefix}-message__icon--${type}-type`
    }, h(NIconSwitchTransition, null, {
      default: () => iconNode
    })) : null, h("div", {
      class: `${mergedClsPrefix}-message__content`
    }, render(content)), closable ? h(NBaseClose, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-message__close`,
      onClick: handleClose,
      absolute: true
    }) : null));
  }
});
function createIconVNode(icon, type, clsPrefix) {
  if (typeof icon === "function") {
    return icon();
  } else {
    const innerIcon = type === "loading" ? h(NBaseLoading, {
      clsPrefix,
      strokeWidth: 24,
      scale: 0.85
    }) : iconRenderMap[type]();
    if (!innerIcon) return null;
    return h(NBaseIcon, {
      clsPrefix,
      key: type
    }, {
      default: () => innerIcon
    });
  }
}
const MessageEnvironment = defineComponent({
  name: "MessageEnvironment",
  props: Object.assign(Object.assign({}, messageProps), {
    duration: {
      type: Number,
      default: 3e3
    },
    onAfterLeave: Function,
    onLeave: Function,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: Function,
    // deprecated
    onHide: Function,
    onAfterHide: Function
  }),
  setup(props) {
    let timerId = null;
    const showRef = ref(true);
    onMounted(() => {
      setHideTimeout();
    });
    function setHideTimeout() {
      const {
        duration: duration2
      } = props;
      if (duration2) {
        timerId = window.setTimeout(hide, duration2);
      }
    }
    function handleMouseenter(e) {
      if (e.currentTarget !== e.target) return;
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    }
    function handleMouseleave(e) {
      if (e.currentTarget !== e.target) return;
      setHideTimeout();
    }
    function hide() {
      const {
        onHide
      } = props;
      showRef.value = false;
      if (timerId) {
        window.clearTimeout(timerId);
        timerId = null;
      }
      if (onHide) onHide();
    }
    function handleClose() {
      const {
        onClose
      } = props;
      if (onClose) onClose();
      hide();
    }
    function handleAfterLeave() {
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide,
        internalKey
      } = props;
      if (onAfterLeave) onAfterLeave();
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      if (onAfterHide) onAfterHide();
    }
    function deactivate() {
      hide();
    }
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      handleMouseleave,
      handleMouseenter,
      deactivate
    };
  },
  render() {
    return h(NFadeInExpandTransition, {
      appear: true,
      onAfterLeave: this.handleAfterLeave,
      onLeave: this.onLeave
    }, {
      default: () => [this.show ? h(NMessage, {
        content: this.content,
        type: this.type,
        icon: this.icon,
        showIcon: this.showIcon,
        closable: this.closable,
        onClose: this.handleClose,
        onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : void 0,
        onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : void 0
      }) : null]
    });
  }
});
const messageProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: [String, Object],
  duration: {
    type: Number,
    default: 3e3
  },
  keepAliveOnHover: Boolean,
  max: Number,
  placement: {
    type: String,
    default: "top"
  },
  closable: Boolean,
  containerClass: String,
  containerStyle: [String, Object]
});
const NMessageProvider = defineComponent({
  name: "MessageProvider",
  props: messageProviderProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const messageListRef = ref([]);
    const messageRefs = ref({});
    const api = {
      create(content, options) {
        return create2(content, Object.assign({
          type: "default"
        }, options));
      },
      info(content, options) {
        return create2(content, Object.assign(Object.assign({}, options), {
          type: "info"
        }));
      },
      success(content, options) {
        return create2(content, Object.assign(Object.assign({}, options), {
          type: "success"
        }));
      },
      warning(content, options) {
        return create2(content, Object.assign(Object.assign({}, options), {
          type: "warning"
        }));
      },
      error(content, options) {
        return create2(content, Object.assign(Object.assign({}, options), {
          type: "error"
        }));
      },
      loading(content, options) {
        return create2(content, Object.assign(Object.assign({}, options), {
          type: "loading"
        }));
      },
      destroyAll
    };
    provide(messageProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    });
    provide(messageApiInjectionKey, api);
    function create2(content, options) {
      const key = createId();
      const messageReactive = reactive(Object.assign(Object.assign({}, options), {
        content,
        key,
        destroy: () => {
          var _a;
          (_a = messageRefs.value[key]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      const {
        max
      } = props;
      if (max && messageListRef.value.length >= max) {
        messageListRef.value.shift();
      }
      messageListRef.value.push(messageReactive);
      return messageReactive;
    }
    function handleAfterLeave(key) {
      messageListRef.value.splice(messageListRef.value.findIndex((message) => message.key === key), 1);
      delete messageRefs.value[key];
    }
    function destroyAll() {
      Object.values(messageRefs.value).forEach((messageInstRef) => {
        messageInstRef.hide();
      });
    }
    return Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      messageRefs,
      messageList: messageListRef,
      handleAfterLeave
    }, api);
  },
  render() {
    var _a, _b, _c;
    return h(Fragment, null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a), this.messageList.length ? h(Teleport, {
      to: (_c = this.to) !== null && _c !== void 0 ? _c : "body"
    }, h("div", {
      class: [`${this.mergedClsPrefix}-message-container`, `${this.mergedClsPrefix}-message-container--${this.placement}`, this.containerClass],
      key: "message-container",
      style: this.containerStyle
    }, this.messageList.map((message) => {
      return h(MessageEnvironment, Object.assign({
        ref: (inst) => {
          if (inst) {
            this.messageRefs[message.key] = inst;
          }
        },
        internalKey: message.key,
        onInternalAfterLeave: this.handleAfterLeave
      }, omit(message, ["destroy"], void 0), {
        duration: message.duration === void 0 ? this.duration : message.duration,
        keepAliveOnHover: message.keepAliveOnHover === void 0 ? this.keepAliveOnHover : message.keepAliveOnHover,
        closable: message.closable === void 0 ? this.closable : message.closable
      }));
    }))) : null);
  }
});
const getSchemaIntrospection = async (options = {}) => {
  const { editor, extensions, mode = "docx" } = options;
  if (editor) {
    return editor.getSchemaSummaryJSON();
  }
  const resolvedExtensions = Array.isArray(extensions) && extensions.length ? extensions : mode === "docx" ? getStarterExtensions() : getRichTextExtensions();
  const tempEditor = new Editor({
    extensions: resolvedExtensions,
    mode,
    isHeadless: true,
    deferDocumentLoad: true
  });
  try {
    return await tempEditor.getSchemaSummaryJSON();
  } finally {
    if (typeof tempEditor.destroy === "function") {
      tempEditor.destroy();
    }
  }
};
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof globalThis !== "undefined" && ((_a = globalThis.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
    supported = true;
    perf = globalThis.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy) {
      setupFn(proxy.proxiedTarget);
    }
  }
}
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = process$1.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
function bom(blob, { autoBom = false } = {}) {
  if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
  }
  return blob;
}
function download(url, name, opts) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = function() {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror = function() {
    console.error("could not download file");
  };
  xhr.send();
}
function corsEnabled(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("HEAD", url, false);
  try {
    xhr.send();
  } catch (e) {
  }
  return xhr.status >= 200 && xhr.status <= 299;
}
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    const evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}
const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
const saveAs = !IS_CLIENT ? () => {
} : (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
      // Fallback to using FileReader and a popup
      fileSaverSaveAs
    )
  )
);
function downloadSaveAs(blob, name = "download", opts) {
  const a = document.createElement("a");
  a.download = name;
  a.rel = "noopener";
  if (typeof blob === "string") {
    a.href = blob;
    if (a.origin !== location.origin) {
      if (corsEnabled(a.href)) {
        download(blob, name, opts);
      } else {
        a.target = "_blank";
        click(a);
      }
    } else {
      click(a);
    }
  } else {
    a.href = URL.createObjectURL(blob);
    setTimeout(function() {
      URL.revokeObjectURL(a.href);
    }, 4e4);
    setTimeout(function() {
      click(a);
    }, 0);
  }
}
function msSaveAs(blob, name = "download", opts) {
  if (typeof blob === "string") {
    if (corsEnabled(blob)) {
      download(blob, name, opts);
    } else {
      const a = document.createElement("a");
      a.href = blob;
      a.target = "_blank";
      setTimeout(function() {
        click(a);
      });
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name);
  }
}
function fileSaverSaveAs(blob, name, opts, popup) {
  popup = popup || open("", "_blank");
  if (popup) {
    popup.document.title = popup.document.body.innerText = "downloading...";
  }
  if (typeof blob === "string")
    return download(blob, name, opts);
  const force = blob.type === "application/octet-stream";
  const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
  const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
    const reader = new FileReader();
    reader.onloadend = function() {
      let url = reader.result;
      if (typeof url !== "string") {
        popup = null;
        throw new Error("Wrong reader.result type");
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
      if (popup) {
        popup.location.href = url;
      } else {
        location.assign(url);
      }
      popup = null;
    };
    reader.readAsDataURL(blob);
  } else {
    const url = URL.createObjectURL(blob);
    if (popup)
      popup.location.assign(url);
    else
      location.href = url;
    popup = null;
    setTimeout(function() {
      URL.revokeObjectURL(url);
    }, 4e4);
  }
}
function toastMessage(message, type) {
  const piniaMessage = "🍍 " + message;
  if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
  } else if (type === "error") {
    console.error(piniaMessage);
  } else if (type === "warn") {
    console.warn(piniaMessage);
  } else {
    console.log(piniaMessage);
  }
}
function isPinia(o) {
  return "_a" in o && "install" in o;
}
function checkClipboardAccess() {
  if (!("clipboard" in navigator)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, "error");
    return true;
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
    toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
    return true;
  }
  return false;
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
    toastMessage("Global state copied to clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess())
    return;
  try {
    loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
    toastMessage("Global state pasted from clipboard.");
  } catch (error) {
    if (checkNotFocusedError(error))
      return;
    toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
    console.error(error);
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(new Blob([JSON.stringify(pinia.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
let fileInput;
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
  }
  function openFile() {
    return new Promise((resolve, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files)
          return resolve(null);
        const file = files.item(0);
        if (!file)
          return resolve(null);
        return resolve({ text: await file.text(), file });
      };
      fileInput.oncancel = () => resolve(null);
      fileInput.onerror = reject;
      fileInput.click();
    });
  }
  return openFile;
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open2 = getFileOpener();
    const result = await open2();
    if (!result)
      return;
    const { text, file } = result;
    loadStoresState(pinia, JSON.parse(text));
    toastMessage(`Global state imported from "${file.name}".`);
  } catch (error) {
    toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
    console.error(error);
  }
}
function loadStoresState(pinia, state) {
  for (const key in state) {
    const storeState = pinia.state.value[key];
    if (storeState) {
      Object.assign(storeState, state[key]);
    } else {
      pinia.state.value[key] = state[key];
    }
  }
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
const PINIA_ROOT_ID = "_root";
function formatStoreForInspectorTree(store) {
  return isPinia(store) ? {
    id: PINIA_ROOT_ID,
    label: PINIA_ROOT_LABEL
  } : {
    id: store.$id,
    label: store.$id
  };
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys());
    const storeMap = store._s;
    const state2 = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId]
      })),
      getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
        const store2 = storeMap.get(id);
        return {
          editable: false,
          key: id,
          value: store2._getters.reduce((getters, key) => {
            getters[key] = store2[key];
            return getters;
          }, {})
        };
      })
    };
    return state2;
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key]
    }))
  };
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName]
    }));
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key]
    }));
  }
  return state;
}
function formatEventData(events) {
  if (!events)
    return {};
  if (Array.isArray(events)) {
    return events.reduce((data, event) => {
      data.keys.push(event.key);
      data.operations.push(event.type);
      data.oldValue[event.key] = event.oldValue;
      data.newValue[event.key] = event.newValue;
      return data;
    }, {
      oldValue: {},
      keys: [],
      operations: [],
      newValue: {}
    });
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue
    };
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return "mutation";
    case MutationType.patchFunction:
      return "$patch";
    case MutationType.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let isTimelineActive = true;
const componentStateTypes = [];
const MUTATIONS_LAYER_ID = "pinia:mutations";
const INSPECTOR_ID = "pinia";
const { assign: assign$1 } = Object;
const getStoreType = (id) => "🍍 " + id;
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.addTimelineLayer({
      id: MUTATIONS_LAYER_ID,
      label: `Pinia 🍍`,
      color: 15064968
    });
    api.addInspector({
      id: INSPECTOR_ID,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            actionGlobalCopyState(pinia);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await actionGlobalPasteState(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            actionGlobalSaveState(pinia);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await actionGlobalOpenStateFile(pinia);
            api.sendInspectorTree(INSPECTOR_ID);
            api.sendInspectorState(INSPECTOR_ID);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (nodeId) => {
            const store = pinia._s.get(nodeId);
            if (!store) {
              toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
            } else if (typeof store.$reset !== "function") {
              toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
            } else {
              store.$reset();
              toastMessage(`Store "${nodeId}" reset.`);
            }
          }
        }
      ]
    });
    api.on.inspectComponent((payload, ctx) => {
      const proxy = payload.componentInstance && payload.componentInstance.proxy;
      if (proxy && proxy._pStores) {
        const piniaStores = payload.componentInstance.proxy._pStores;
        Object.values(piniaStores).forEach((store) => {
          payload.instanceData.state.push({
            type: getStoreType(store.$id),
            key: "state",
            editable: true,
            value: store._isOptionsAPI ? {
              _custom: {
                value: toRaw(store.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => store.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            )
          });
          if (store._getters && store._getters.length) {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "getters",
              editable: false,
              value: store._getters.reduce((getters, key) => {
                try {
                  getters[key] = store[key];
                } catch (error) {
                  getters[key] = error;
                }
                return getters;
              }, {})
            });
          }
        });
      }
    });
    api.on.getInspectorTree((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        let stores = [pinia];
        stores = stores.concat(Array.from(pinia._s.values()));
        payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
      }
    });
    globalThis.$pinia = pinia;
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return;
        }
        if (inspectedStore) {
          if (payload.nodeId !== PINIA_ROOT_ID)
            globalThis.$store = toRaw(inspectedStore);
          payload.state = formatStoreForInspectorState(inspectedStore);
        }
      }
    });
    api.on.editInspectorState((payload, ctx) => {
      if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
        const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
        if (!inspectedStore) {
          return toastMessage(`store "${payload.nodeId}" not found`, "error");
        }
        const { path } = payload;
        if (!isPinia(inspectedStore)) {
          if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
            path.unshift("$state");
          }
        } else {
          path.unshift("state");
        }
        isTimelineActive = false;
        payload.set(inspectedStore, path, payload.state.value);
        isTimelineActive = true;
      }
    });
    api.on.editComponentState((payload) => {
      if (payload.type.startsWith("🍍")) {
        const storeId = payload.type.replace(/^🍍\s*/, "");
        const store = pinia._s.get(storeId);
        if (!store) {
          return toastMessage(`store "${storeId}" not found`, "error");
        }
        const { path } = payload;
        if (path[0] !== "state") {
          return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
        }
        path[0] = "$state";
        isTimelineActive = false;
        payload.set(store, path, payload.state.value);
        isTimelineActive = true;
      }
    });
  });
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
  setupDevtoolsPlugin({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes,
    app,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: true
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (api) => {
    const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
    store.$onAction(({ after, onError, name, args }) => {
      const groupId = runningActionId++;
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "🛫 " + name,
          subtitle: "start",
          data: {
            store: formatDisplay(store.$id),
            action: formatDisplay(name),
            args
          },
          groupId
        }
      });
      after((result) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛬 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              result
            },
            groupId
          }
        });
      });
      onError((error) => {
        activeAction = void 0;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            logType: "error",
            title: "💥 " + name,
            subtitle: "end",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
              error
            },
            groupId
          }
        });
      });
    }, true);
    store._customProperties.forEach((name) => {
      watch(() => unref(store[name]), (newValue, oldValue) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (isTimelineActive) {
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "Change",
              subtitle: name,
              data: {
                newValue,
                oldValue
              },
              groupId: activeAction
            }
          });
        }
      }, { deep: true });
    });
    store.$subscribe(({ events, type }, state) => {
      api.notifyComponentUpdate();
      api.sendInspectorState(INSPECTOR_ID);
      if (!isTimelineActive)
        return;
      const eventData = {
        time: now2(),
        title: formatMutationType(type),
        data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
        groupId: activeAction
      };
      if (type === MutationType.patchFunction) {
        eventData.subtitle = "⤵️";
      } else if (type === MutationType.patchObject) {
        eventData.subtitle = "🧩";
      } else if (events && !Array.isArray(events)) {
        eventData.subtitle = events.type;
      }
      if (events) {
        eventData.data["rawEvent(s)"] = {
          _custom: {
            display: "DebuggerEvent",
            type: "object",
            tooltip: "raw DebuggerEvent[]",
            value: events
          }
        };
      }
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: eventData
      });
    }, { detached: true, flush: "sync" });
    const hotUpdate = store._hotUpdate;
    store._hotUpdate = markRaw((newStore) => {
      hotUpdate(newStore);
      api.addTimelineEvent({
        layerId: MUTATIONS_LAYER_ID,
        event: {
          time: now2(),
          title: "🔥 " + store.$id,
          subtitle: "HMR update",
          data: {
            store: formatDisplay(store.$id),
            info: formatDisplay(`HMR update`)
          }
        }
      });
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
    });
    const { $dispose } = store;
    store.$dispose = () => {
      $dispose();
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
    };
    api.notifyComponentUpdate();
    api.sendInspectorTree(INSPECTOR_ID);
    api.sendInspectorState(INSPECTOR_ID);
    api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
  });
}
let runningActionId = 0;
let activeAction;
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const _actionId = runningActionId;
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          activeAction = _actionId;
          return Reflect.get(...args);
        },
        set(...args) {
          activeAction = _actionId;
          return Reflect.set(...args);
        }
      }) : store;
      activeAction = _actionId;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      activeAction = void 0;
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  if (!store._p._testing) {
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
  }
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if ((process$1.env.NODE_ENV !== "production" || false) && !(process$1.env.NODE_ENV === "test") && IS_CLIENT) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && true) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if ((process$1.env.NODE_ENV !== "production" || false) && !(process$1.env.NODE_ENV === "test") && IS_CLIENT && typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key] = subPatch;
      }
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = process$1.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!(process$1.env.NODE_ENV !== "production") || !hot)) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = process$1.env.NODE_ENV !== "production" && hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (process$1.env.NODE_ENV !== "production" && name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (process$1.env.NODE_ENV !== "production" && !pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = { deep: true };
  if (process$1.env.NODE_ENV !== "production" && true) {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!(process$1.env.NODE_ENV !== "production") || !hot)) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (process$1.env.NODE_ENV !== "production") {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    process$1.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } : noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(process$1.env.NODE_ENV !== "production" || (process$1.env.NODE_ENV !== "production" || false) && !(process$1.env.NODE_ENV === "test") && IS_CLIENT ? assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) : partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (process$1.env.NODE_ENV !== "production" && hot) {
        set(hotState.value, key, toRef(setupStore, key));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
      if (process$1.env.NODE_ENV !== "production") {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = process$1.env.NODE_ENV !== "production" && hot ? prop : action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      if (process$1.env.NODE_ENV !== "production") {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else if (process$1.env.NODE_ENV !== "production") {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key);
        }
      }
    }
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => process$1.env.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (process$1.env.NODE_ENV !== "production" && hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  if (process$1.env.NODE_ENV !== "production") {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const actionFn = newStore[actionName];
        set(store, actionName, action(actionFn, actionName));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if ((process$1.env.NODE_ENV !== "production" || false) && !(process$1.env.NODE_ENV === "test") && IS_CLIENT) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if ((process$1.env.NODE_ENV !== "production" || false) && !(process$1.env.NODE_ENV === "test") && IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (process$1.env.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
    if (process$1.env.NODE_ENV !== "production" && typeof id !== "string") {
      throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
    }
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process$1.env.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (process$1.env.NODE_ENV !== "production" && !activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      if (process$1.env.NODE_ENV !== "production") {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (process$1.env.NODE_ENV !== "production" && hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (process$1.env.NODE_ENV !== "production" && IS_CLIENT) {
      const currentInstance = getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    const rawStore = toRaw(store);
    const refs = {};
    for (const key in rawStore) {
      const value = rawStore[key];
      if (value.effect) {
        refs[key] = // ...
        computed({
          get: () => store[key],
          set(value2) {
            store[key] = value2;
          }
        });
      } else if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
const extractBrowserFile = (input) => {
  if (!input) return null;
  if (typeof File === "function" && input instanceof File) return input;
  if (typeof Blob === "function" && input instanceof Blob) {
    const hasFileCtor = typeof File === "function";
    if (hasFileCtor) {
      const name = input.name || "document";
      return new File([input], name, { type: input.type });
    }
    return input;
  }
  if (input.originFileObj) return extractBrowserFile(input.originFileObj);
  if (input.file) return extractBrowserFile(input.file);
  if (input.raw) return extractBrowserFile(input.raw);
  return null;
};
const inferTypeFromName = (name = "") => {
  const lower = String(name).toLowerCase();
  if (lower.endsWith(".docx")) return DOCX;
  if (lower.endsWith(".pdf")) return PDF;
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return HTML;
  if (lower.endsWith(".md") || lower.endsWith(".markdown")) return "text/markdown";
  return "";
};
const normalizeDocumentEntry = (entry) => {
  const maybeFile = extractBrowserFile(entry);
  if (maybeFile) {
    const name = (
      /** @type {any} */
      maybeFile.name || entry && entry.name || "document"
    );
    const type = maybeFile.type || inferTypeFromName(name) || DOCX;
    return {
      type,
      data: maybeFile,
      name,
      isNewFile: true
    };
  }
  if (entry && typeof entry === "object" && "data" in entry) {
    const file = extractBrowserFile(entry.data);
    if (file) {
      const type = entry.type || file.type || inferTypeFromName(file.name) || DOCX;
      return {
        ...entry,
        type,
        data: file,
        name: entry.name || file.name || "document"
      };
    }
  }
  return entry;
};
function useFieldValueWatcher(field, originalValue) {
  const fieldId = field.itemid;
  const rawField = field;
  const valueIsObject = originalValue !== null && typeof originalValue === "object";
  const value = valueIsObject ? reactive({ ...originalValue }) : ref(originalValue);
  const change = ref(null);
  const handleChange = (newValue, oldValue) => {
    const newChange = {
      fieldId: fieldId.value,
      changeTime: Date.now(),
      oldValue,
      newValue,
      originalField: rawField
    };
    change.value = newChange;
  };
  watch(value, handleChange);
  return {
    value
  };
}
function useField(field) {
  const id = ref(field.itemid);
  const icon = ref(field.itemicon);
  const iconPack = ref(field.itemiconpack);
  const label = ref(field.itemdisplaylabel);
  const originalValue = field.itemlinkvalue;
  const placeholder = field.itemplaceholdertext;
  ref([]);
  const { value } = useFieldValueWatcher(field, originalValue);
  const fieldType = ref(field.itemtype);
  const fieldSubType = ref(field.itemfieldtype);
  const originalJSON = field;
  const fieldStyle = reactive({
    fontFamily: field.fontfamily || "Arial",
    fontSize: field.font_size || "12pt",
    originalFontSize: field.original_font_size || "12pt"
  });
  const logicRules = ref(field.logicrules);
  const hidden = ref(false);
  const additionalOptions = reactive({});
  const fieldHandlers = {
    SELECT: useSelectField,
    IMAGEINPUT: useImageField,
    CHECKBOXINPUT: useCheckboxField
  };
  if (fieldType.value in fieldHandlers) {
    Object.assign(additionalOptions, fieldHandlers[fieldType.value](field));
  }
  const format = ref(field.itemformat);
  const valueGetter = field.valueGetter;
  return {
    id,
    icon,
    iconPack,
    label,
    placeholder,
    fieldType,
    fieldSubType,
    value,
    format,
    logicRules,
    hidden,
    originalJSON,
    fieldStyle,
    valueGetter,
    ...additionalOptions
  };
}
function useImageField(field) {
  const fontfamily = ref(field.fontfamily);
  const iteminputtype = ref(field.iteminputtype);
  const self2 = {
    fontfamily,
    iteminputtype
  };
  return self2;
}
function useSelectField(field) {
  const options = ref(field.itemoptions);
  return {
    options
  };
}
function useCheckboxField(field) {
  const options = ref(field.itemoptions);
  if (options.value) {
    options.value = options.value.map((option) => {
      return {
        label: option.itemdisplaylabel,
        value: option.itemlinkvalue,
        checked: option.ischecked,
        id: option.itemid,
        annotationId: option.annotationId
      };
    });
  }
  return {
    options
  };
}
const channels = /* @__PURE__ */ new Map();
class LocalStoragePolyfill {
  /**
   * @param {string} room
   */
  constructor(room) {
    this.room = room;
    this.onmessage = null;
    this._onChange = (e) => e.key === room && this.onmessage !== null && this.onmessage({ data: fromBase64(e.newValue || "") });
    onChange(this._onChange);
  }
  /**
   * @param {ArrayBuffer} buf
   */
  postMessage(buf) {
    varStorage.setItem(this.room, toBase64(createUint8ArrayFromArrayBuffer(buf)));
  }
  close() {
    offChange(this._onChange);
  }
}
const BC = typeof BroadcastChannel === "undefined" ? LocalStoragePolyfill : BroadcastChannel;
const getChannel = (room) => setIfUndefined(channels, room, () => {
  const subs = create$2();
  const bc = new BC(room);
  bc.onmessage = (e) => subs.forEach((sub) => sub(e.data, "broadcastchannel"));
  return {
    bc,
    subs
  };
});
const subscribe = (room, f) => {
  getChannel(room).subs.add(f);
  return f;
};
const unsubscribe = (room, f) => {
  const channel = getChannel(room);
  const unsubscribed = channel.subs.delete(f);
  if (unsubscribed && channel.subs.size === 0) {
    channel.bc.close();
    channels.delete(room);
  }
  return unsubscribed;
};
const publish = (room, data, origin = null) => {
  const c2 = getChannel(room);
  c2.bc.postMessage(data);
  c2.subs.forEach((sub) => sub(data, origin));
};
const messageYjsSyncStep1 = 0;
const messageYjsSyncStep2 = 1;
const messageYjsUpdate = 2;
const writeSyncStep1 = (encoder, doc) => {
  writeVarUint(encoder, messageYjsSyncStep1);
  const sv = Y.encodeStateVector(doc);
  writeVarUint8Array(encoder, sv);
};
const writeSyncStep2 = (encoder, doc, encodedStateVector) => {
  writeVarUint(encoder, messageYjsSyncStep2);
  writeVarUint8Array(encoder, Y.encodeStateAsUpdate(doc, encodedStateVector));
};
const readSyncStep1 = (decoder, encoder, doc) => writeSyncStep2(encoder, doc, readVarUint8Array(decoder));
const readSyncStep2 = (decoder, doc, transactionOrigin) => {
  try {
    Y.applyUpdate(doc, readVarUint8Array(decoder), transactionOrigin);
  } catch (error) {
    console.error("Caught error while handling a Yjs update", error);
  }
};
const writeUpdate = (encoder, update) => {
  writeVarUint(encoder, messageYjsUpdate);
  writeVarUint8Array(encoder, update);
};
const readUpdate = readSyncStep2;
const readSyncMessage = (decoder, encoder, doc, transactionOrigin) => {
  const messageType = readVarUint(decoder);
  switch (messageType) {
    case messageYjsSyncStep1:
      readSyncStep1(decoder, encoder, doc);
      break;
    case messageYjsSyncStep2:
      readSyncStep2(decoder, doc, transactionOrigin);
      break;
    case messageYjsUpdate:
      readUpdate(decoder, doc, transactionOrigin);
      break;
    default:
      throw new Error("Unknown message type");
  }
  return messageType;
};
const messagePermissionDenied = 0;
const readAuthMessage = (decoder, y, permissionDeniedHandler2) => {
  switch (readVarUint(decoder)) {
    case messagePermissionDenied:
      permissionDeniedHandler2(y, readVarString(decoder));
  }
};
const encodeQueryParams = (params) => map(params, (val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join("&");
const messageSync = 0;
const messageQueryAwareness = 3;
const messageAwareness = 1;
const messageAuth = 2;
const messageHandlers = [];
messageHandlers[messageSync] = (encoder, decoder, provider, emitSynced, _messageType) => {
  writeVarUint(encoder, messageSync);
  const syncMessageType = readSyncMessage(
    decoder,
    encoder,
    provider.doc,
    provider
  );
  if (emitSynced && syncMessageType === messageYjsSyncStep2 && !provider.synced) {
    provider.synced = true;
  }
};
messageHandlers[messageQueryAwareness] = (encoder, _decoder, provider, _emitSynced, _messageType) => {
  writeVarUint(encoder, messageAwareness);
  writeVarUint8Array(
    encoder,
    encodeAwarenessUpdate(
      provider.awareness,
      Array.from(provider.awareness.getStates().keys())
    )
  );
};
messageHandlers[messageAwareness] = (_encoder, decoder, provider, _emitSynced, _messageType) => {
  applyAwarenessUpdate(
    provider.awareness,
    readVarUint8Array(decoder),
    provider
  );
};
messageHandlers[messageAuth] = (_encoder, decoder, provider, _emitSynced, _messageType) => {
  readAuthMessage(
    decoder,
    provider.doc,
    (_ydoc, reason) => permissionDeniedHandler(provider, reason)
  );
};
const messageReconnectTimeout = 3e4;
const permissionDeniedHandler = (provider, reason) => console.warn(`Permission denied to access ${provider.url}.
${reason}`);
const readMessage = (provider, buf, emitSynced) => {
  const decoder = createDecoder(buf);
  const encoder = createEncoder();
  const messageType = readVarUint(decoder);
  const messageHandler = provider.messageHandlers[messageType];
  if (
    /** @type {any} */
    messageHandler
  ) {
    messageHandler(encoder, decoder, provider, emitSynced, messageType);
  } else {
    console.error("Unable to compute message");
  }
  return encoder;
};
const closeWebsocketConnection = (provider, ws, event) => {
  if (ws === provider.ws) {
    provider.emit("connection-close", [event, provider]);
    provider.ws = null;
    ws.close();
    provider.wsconnecting = false;
    if (provider.wsconnected) {
      provider.wsconnected = false;
      provider.synced = false;
      removeAwarenessStates(
        provider.awareness,
        Array.from(provider.awareness.getStates().keys()).filter(
          (client) => client !== provider.doc.clientID
        ),
        provider
      );
      provider.emit("status", [{
        status: "disconnected"
      }]);
    } else {
      provider.wsUnsuccessfulReconnects++;
    }
    setTimeout(
      setupWS,
      min(
        pow(2, provider.wsUnsuccessfulReconnects) * 100,
        provider.maxBackoffTime
      ),
      provider
    );
  }
};
const setupWS = (provider) => {
  if (provider.shouldConnect && provider.ws === null) {
    const websocket = new provider._WS(provider.url, provider.protocols);
    websocket.binaryType = "arraybuffer";
    provider.ws = websocket;
    provider.wsconnecting = true;
    provider.wsconnected = false;
    provider.synced = false;
    websocket.onmessage = (event) => {
      provider.wsLastMessageReceived = getUnixTime();
      const encoder = readMessage(provider, new Uint8Array(event.data), true);
      if (length(encoder) > 1) {
        websocket.send(toUint8Array(encoder));
      }
    };
    websocket.onerror = (event) => {
      provider.emit("connection-error", [event, provider]);
    };
    websocket.onclose = (event) => {
      closeWebsocketConnection(provider, websocket, event);
    };
    websocket.onopen = () => {
      provider.wsLastMessageReceived = getUnixTime();
      provider.wsconnecting = false;
      provider.wsconnected = true;
      provider.wsUnsuccessfulReconnects = 0;
      provider.emit("status", [{
        status: "connected"
      }]);
      const encoder = createEncoder();
      writeVarUint(encoder, messageSync);
      writeSyncStep1(encoder, provider.doc);
      websocket.send(toUint8Array(encoder));
      if (provider.awareness.getLocalState() !== null) {
        const encoderAwarenessState = createEncoder();
        writeVarUint(encoderAwarenessState, messageAwareness);
        writeVarUint8Array(
          encoderAwarenessState,
          encodeAwarenessUpdate(provider.awareness, [
            provider.doc.clientID
          ])
        );
        websocket.send(toUint8Array(encoderAwarenessState));
      }
    };
    provider.emit("status", [{
      status: "connecting"
    }]);
  }
};
const broadcastMessage = (provider, buf) => {
  const ws = provider.ws;
  if (provider.wsconnected && ws && ws.readyState === ws.OPEN) {
    ws.send(buf);
  }
  if (provider.bcconnected) {
    publish(provider.bcChannel, buf, provider);
  }
};
class WebsocketProvider extends ObservableV2 {
  /**
   * @param {string} serverUrl
   * @param {string} roomname
   * @param {Y.Doc} doc
   * @param {object} opts
   * @param {boolean} [opts.connect]
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {Object<string,string>} [opts.params] specify url parameters
   * @param {Array<string>} [opts.protocols] specify websocket protocols
   * @param {typeof WebSocket} [opts.WebSocketPolyfill] Optionall provide a WebSocket polyfill
   * @param {number} [opts.resyncInterval] Request server state every `resyncInterval` milliseconds
   * @param {number} [opts.maxBackoffTime] Maximum amount of time to wait before trying to reconnect (we try to reconnect using exponential backoff)
   * @param {boolean} [opts.disableBc] Disable cross-tab BroadcastChannel communication
   */
  constructor(serverUrl, roomname, doc, {
    connect = true,
    awareness = new Awareness(doc),
    params = {},
    protocols = [],
    WebSocketPolyfill = WebSocket,
    resyncInterval = -1,
    maxBackoffTime = 2500,
    disableBc = false
  } = {}) {
    super();
    while (serverUrl[serverUrl.length - 1] === "/") {
      serverUrl = serverUrl.slice(0, serverUrl.length - 1);
    }
    this.serverUrl = serverUrl;
    this.bcChannel = serverUrl + "/" + roomname;
    this.maxBackoffTime = maxBackoffTime;
    this.params = params;
    this.protocols = protocols;
    this.roomname = roomname;
    this.doc = doc;
    this._WS = WebSocketPolyfill;
    this.awareness = awareness;
    this.wsconnected = false;
    this.wsconnecting = false;
    this.bcconnected = false;
    this.disableBc = disableBc;
    this.wsUnsuccessfulReconnects = 0;
    this.messageHandlers = messageHandlers.slice();
    this._synced = false;
    this.ws = null;
    this.wsLastMessageReceived = 0;
    this.shouldConnect = connect;
    this._resyncInterval = 0;
    if (resyncInterval > 0) {
      this._resyncInterval = /** @type {any} */
      setInterval(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          const encoder = createEncoder();
          writeVarUint(encoder, messageSync);
          writeSyncStep1(encoder, doc);
          this.ws.send(toUint8Array(encoder));
        }
      }, resyncInterval);
    }
    this._bcSubscriber = (data, origin) => {
      if (origin !== this) {
        const encoder = readMessage(this, new Uint8Array(data), false);
        if (length(encoder) > 1) {
          publish(this.bcChannel, toUint8Array(encoder), this);
        }
      }
    };
    this._updateHandler = (update, origin) => {
      if (origin !== this) {
        const encoder = createEncoder();
        writeVarUint(encoder, messageSync);
        writeUpdate(encoder, update);
        broadcastMessage(this, toUint8Array(encoder));
      }
    };
    this.doc.on("update", this._updateHandler);
    this._awarenessUpdateHandler = ({ added, updated, removed }, _origin) => {
      const changedClients = added.concat(updated).concat(removed);
      const encoder = createEncoder();
      writeVarUint(encoder, messageAwareness);
      writeVarUint8Array(
        encoder,
        encodeAwarenessUpdate(awareness, changedClients)
      );
      broadcastMessage(this, toUint8Array(encoder));
    };
    this._exitHandler = () => {
      removeAwarenessStates(
        this.awareness,
        [doc.clientID],
        "app closed"
      );
    };
    if (isNode && typeof process$1 !== "undefined") {
      process$1.on("exit", this._exitHandler);
    }
    awareness.on("update", this._awarenessUpdateHandler);
    this._checkInterval = /** @type {any} */
    setInterval(() => {
      if (this.wsconnected && messageReconnectTimeout < getUnixTime() - this.wsLastMessageReceived) {
        closeWebsocketConnection(
          this,
          /** @type {WebSocket} */
          this.ws,
          null
        );
      }
    }, messageReconnectTimeout / 10);
    if (connect) {
      this.connect();
    }
  }
  get url() {
    const encodedParams = encodeQueryParams(this.params);
    return this.serverUrl + "/" + this.roomname + (encodedParams.length === 0 ? "" : "?" + encodedParams);
  }
  /**
   * @type {boolean}
   */
  get synced() {
    return this._synced;
  }
  set synced(state) {
    if (this._synced !== state) {
      this._synced = state;
      this.emit("synced", [state]);
      this.emit("sync", [state]);
    }
  }
  destroy() {
    if (this._resyncInterval !== 0) {
      clearInterval(this._resyncInterval);
    }
    clearInterval(this._checkInterval);
    this.disconnect();
    if (isNode && typeof process$1 !== "undefined") {
      process$1.off("exit", this._exitHandler);
    }
    this.awareness.off("update", this._awarenessUpdateHandler);
    this.doc.off("update", this._updateHandler);
    super.destroy();
  }
  connectBc() {
    if (this.disableBc) {
      return;
    }
    if (!this.bcconnected) {
      subscribe(this.bcChannel, this._bcSubscriber);
      this.bcconnected = true;
    }
    const encoderSync = createEncoder();
    writeVarUint(encoderSync, messageSync);
    writeSyncStep1(encoderSync, this.doc);
    publish(this.bcChannel, toUint8Array(encoderSync), this);
    const encoderState = createEncoder();
    writeVarUint(encoderState, messageSync);
    writeSyncStep2(encoderState, this.doc);
    publish(this.bcChannel, toUint8Array(encoderState), this);
    const encoderAwarenessQuery = createEncoder();
    writeVarUint(encoderAwarenessQuery, messageQueryAwareness);
    publish(
      this.bcChannel,
      toUint8Array(encoderAwarenessQuery),
      this
    );
    const encoderAwarenessState = createEncoder();
    writeVarUint(encoderAwarenessState, messageAwareness);
    writeVarUint8Array(
      encoderAwarenessState,
      encodeAwarenessUpdate(this.awareness, [
        this.doc.clientID
      ])
    );
    publish(
      this.bcChannel,
      toUint8Array(encoderAwarenessState),
      this
    );
  }
  disconnectBc() {
    const encoder = createEncoder();
    writeVarUint(encoder, messageAwareness);
    writeVarUint8Array(
      encoder,
      encodeAwarenessUpdate(this.awareness, [
        this.doc.clientID
      ], /* @__PURE__ */ new Map())
    );
    broadcastMessage(this, toUint8Array(encoder));
    if (this.bcconnected) {
      unsubscribe(this.bcChannel, this._bcSubscriber);
      this.bcconnected = false;
    }
  }
  disconnect() {
    this.shouldConnect = false;
    this.disconnectBc();
    if (this.ws !== null) {
      closeWebsocketConnection(this, this.ws, null);
    }
  }
  connect() {
    this.shouldConnect = true;
    if (!this.wsconnected && this.ws === null) {
      setupWS(this);
      this.connectBc();
    }
  }
}
function awarenessHandler(context, { changes = {}, states }) {
  const { added = [], removed = [] } = changes;
  const awarenessArray = awarenessStatesToArray(context, states);
  const payload = {
    states: awarenessArray,
    added,
    removed,
    superdoc: context
  };
  context.emit("awareness-update", payload);
}
function createProvider({ config, user, documentId, socket, superdocInstance }) {
  console.warn(
    "[superdoc] Internal provider creation is deprecated. Pass { ydoc, provider } to modules.collaboration instead."
  );
  if (!config.providerType) config.providerType = "superdoc";
  const providers = {
    hocuspocus: () => createHocuspocusProvider({ config, user, documentId, socket, superdocInstance }),
    superdoc: () => createSuperDocProvider({ config, user, documentId, superdocInstance })
  };
  if (!providers) throw new Error(`Provider type ${config.providerType} is not supported.`);
  return providers[config.providerType]();
}
function createSuperDocProvider({ config, user, documentId, superdocInstance }) {
  const ydoc = new Doc({ gc: false });
  const options = {
    params: {
      ...config.params
    }
  };
  const provider = new WebsocketProvider(config.url, documentId, ydoc, options);
  provider.awareness.setLocalStateField("user", user);
  provider.awareness.on("update", (changes = {}) => {
    return awarenessHandler(superdocInstance, { changes, states: provider.awareness.getStates() });
  });
  return { provider, ydoc };
}
function createHocuspocusProvider({ config, user, documentId, socket, superdocInstance }) {
  const ydoc = new Doc({ gc: false });
  const options = {
    websocketProvider: socket,
    document: ydoc,
    name: documentId,
    token: config.token || "",
    preserveConnection: false,
    onAuthenticationFailed: () => onAuthenticationFailed(documentId),
    onConnect: () => onConnect(superdocInstance, documentId),
    onDisconnect: () => onDisconnect(superdocInstance, documentId),
    onDestroy: () => onDestroy(superdocInstance, documentId)
  };
  const provider = new HocuspocusProvider(options);
  provider.setAwarenessField("user", user);
  provider.on("awarenessUpdate", (params) => {
    return awarenessHandler(superdocInstance, {
      states: params.states
    });
  });
  return { provider, ydoc };
}
const onAuthenticationFailed = (data, documentId) => {
  console.warn("🔒 [superdoc] Authentication failed", data, "document", documentId);
};
const onConnect = (superdocInstance, documentId) => {
  console.warn("🔌 [superdoc] Connected -- ", documentId);
};
const onDisconnect = (superdocInstance, documentId) => {
  console.warn("🔌 [superdoc] Disconnected", documentId);
};
const onDestroy = (superdocInstance, documentId) => {
  console.warn("🔌 [superdoc] Destroyed", documentId);
};
function setupAwarenessHandler(provider, superdocInstance, user) {
  const awareness = provider.awareness;
  if (!awareness) {
    console.warn("[superdoc] External provider missing awareness property");
    return;
  }
  if (user && awareness.setLocalStateField) {
    awareness.setLocalStateField("user", user);
  }
  awareness.on("change", (changes = {}) => {
    awarenessHandler(superdocInstance, {
      changes,
      states: awareness.getStates()
    });
  });
}
const addYComment = (yArray, ydoc, event, user) => {
  const { comment } = event;
  const yComment = new Map$1(Object.entries(comment));
  ydoc.transact(
    () => {
      yArray.push([yComment]);
    },
    { user }
  );
};
const updateYComment = (yArray, ydoc, event, user) => {
  const { comment } = event;
  const yComment = new Map$1(Object.entries(comment));
  const commentIndex = getCommentIndex(yArray, comment);
  if (commentIndex === -1) return;
  ydoc.transact(
    () => {
      yArray.delete(commentIndex, 1);
      yArray.insert(commentIndex, [yComment]);
    },
    { user }
  );
};
const deleteYComment = (yArray, ydoc, event, user) => {
  const { comment } = event;
  const commentIndex = getCommentIndex(yArray, comment);
  if (commentIndex === -1) return;
  ydoc.transact(
    () => {
      yArray.delete(commentIndex, 1);
    },
    { user }
  );
};
const getCommentIndex = (yArray, comment) => {
  const baseArray = yArray.toJSON();
  return baseArray.findIndex((c2) => c2.commentId === comment.commentId);
};
const initCollaborationComments = (superdoc) => {
  if (!superdoc.config.modules.comments || !superdoc.provider) return;
  const onSuperDocYdocSynced = () => {
    const parent = superdoc.commentsStore.commentsParentElement;
    const ids = superdoc.commentsStore.editorCommentIds;
    superdoc.commentsStore.handleEditorLocationsUpdate(parent, ids);
    superdoc.commentsStore.hasSyncedCollaborationComments = true;
    superdoc.provider.off("synced", onSuperDocYdocSynced);
  };
  superdoc.provider.on("synced", onSuperDocYdocSynced);
  const commentsArray = superdoc.ydoc.getArray("comments");
  commentsArray.observe((event) => {
    const currentUser = superdoc.config.user;
    const { user = {} } = event.transaction.origin;
    if (currentUser.name === user.name && currentUser.email === user.email) return;
    const comments = commentsArray.toJSON();
    const seen = /* @__PURE__ */ new Set();
    const filtered = [];
    comments.forEach((c2) => {
      if (!seen.has(c2.commentId)) {
        seen.add(c2.commentId);
        filtered.push(c2);
      }
    });
    superdoc.commentsStore.commentsList = filtered.map((c2) => useComment(c2));
  });
};
const initSuperdocYdoc = (superdoc) => {
  const { isInternal } = superdoc.config;
  const baseName = `${superdoc.config.superdocId}-superdoc`;
  if (!superdoc.config.superdocId) return;
  const documentId = isInternal ? baseName : `${baseName}-external`;
  const superdocCollaborationOptions = {
    config: superdoc.config.modules.collaboration,
    user: superdoc.config.user,
    documentId,
    socket: superdoc.config.socket,
    superdocInstance: superdoc
  };
  const { provider: superdocProvider, ydoc: superdocYdoc } = createProvider(superdocCollaborationOptions);
  return { ydoc: superdocYdoc, provider: superdocProvider };
};
const makeDocumentsCollaborative = (superdoc) => {
  const processedDocuments = [];
  superdoc.config.documents.forEach((doc) => {
    superdoc.config.user.color = superdoc.colors[0];
    const options = {
      config: superdoc.config.modules.collaboration,
      user: superdoc.config.user,
      documentId: doc.id,
      socket: superdoc.config.socket,
      superdocInstance: superdoc
    };
    const { provider, ydoc } = createProvider(options);
    doc.provider = provider;
    doc.socket = superdoc.config.socket;
    doc.ydoc = ydoc;
    doc.role = superdoc.config.role;
    processedDocuments.push(doc);
  });
  return processedDocuments;
};
const syncCommentsToClients = (superdoc, event) => {
  if (!superdoc.isCollaborative || !superdoc.config.modules.comments) return;
  const yArray = superdoc.ydoc.getArray("comments");
  const user = superdoc.config.user;
  switch (event.type) {
    case "add":
      addYComment(yArray, superdoc.ydoc, event, user);
      break;
    case "update":
      updateYComment(yArray, superdoc.ydoc, event, user);
      break;
    case "resolved":
      updateYComment(yArray, superdoc.ydoc, event, user);
      break;
    case "deleted":
      deleteYComment(yArray, superdoc.ydoc, event, user);
      break;
  }
};
function useSelection(params) {
  const documentId = ref(params.documentId);
  const page = ref(params.page);
  const selectionBounds = reactive(params.selectionBounds || {});
  const source = ref(params.source);
  const getContainerId = () => `${documentId.value}-page-${page.value}`;
  const getContainerLocation = (parentContainer) => {
    if (!parentContainer) return { top: 0, left: 0 };
    const parentBounds = parentContainer.getBoundingClientRect();
    const container = document.getElementById(getContainerId());
    let containerBounds = {
      top: 0,
      left: 0
    };
    if (container) containerBounds = container.getBoundingClientRect();
    return {
      top: Number((containerBounds.top - parentBounds.top).toFixed(3)),
      left: Number((containerBounds.left - parentBounds.left).toFixed(3))
    };
  };
  const getValues = () => {
    return {
      documentId: documentId.value,
      page: page.value,
      selectionBounds: toRaw(selectionBounds),
      source: source.value
    };
  };
  return {
    documentId,
    page,
    selectionBounds,
    source,
    // Actions
    getValues,
    getContainerId,
    getContainerLocation
  };
}
function useComment(params) {
  const uid = ref(params.uid);
  const commentId = params.commentId || v4();
  const importedId = params.importedId;
  const parentCommentId = params.parentCommentId;
  const trackedChangeParentId = params.trackedChangeParentId;
  const fileId = params.fileId;
  const fileType = params.fileType;
  const createdAtVersionNumber = params.createdAtVersionNumber;
  const isInternal = ref(params.isInternal !== void 0 ? params.isInternal : true);
  const mentions = ref([]);
  const commentElement = ref(null);
  const isFocused = ref(params.isFocused || false);
  const creatorEmail = params.creatorEmail;
  const creatorName = params.creatorName;
  const creatorImage = params.creatorImage;
  const createdTime = params.createdTime || Date.now();
  const importedAuthor = ref(params.importedAuthor || null);
  const docxCommentJSON = params.docxCommentJSON || null;
  const origin = params.origin;
  const threadingMethod = params.threadingMethod;
  const threadingStyleOverride = params.threadingStyleOverride;
  const threadingParentCommentId = params.threadingParentCommentId;
  const originalXmlStructure = params.originalXmlStructure;
  const commentText = ref(params.commentText || "");
  const selection = params.selection ? useSelection(params.selection) : useSelection({
    documentId: fileId,
    page: 1,
    selectionBounds: {}
  });
  const floatingPosition = params.selection?.selectionBounds ? { ...params.selection.selectionBounds } : { top: 0, left: 0, right: 0, bottom: 0 };
  const trackedChange = ref(params.trackedChange);
  const trackedChangeType = ref(params.trackedChangeType || null);
  const trackedChangeText = ref(params.trackedChangeText || null);
  const deletedText = ref(params.deletedText || null);
  const resolvedTime = ref(params.resolvedTime || null);
  const resolvedByEmail = ref(params.resolvedByEmail || null);
  const resolvedByName = ref(params.resolvedByName || null);
  const resolveComment = ({ email, name, superdoc }) => {
    if (resolvedTime.value) return;
    resolvedTime.value = Date.now();
    resolvedByEmail.value = email;
    resolvedByName.value = name;
    if (trackedChange.value) {
      const emitData2 = { type: comments_module_events.RESOLVED, comment: getValues() };
      propagateUpdate(superdoc, emitData2);
      superdoc.activeEditor?.commands?.resolveComment({ commentId, importedId });
      return;
    }
    const emitData = { type: comments_module_events.RESOLVED, comment: getValues() };
    propagateUpdate(superdoc, emitData);
    superdoc.activeEditor?.commands?.resolveComment({ commentId, importedId });
  };
  const setIsInternal = ({ isInternal: newIsInternal, superdoc }) => {
    const previousValue = isInternal.value;
    if (previousValue === newIsInternal) return;
    isInternal.value = newIsInternal;
    const emitData = {
      type: comments_module_events.UPDATE,
      changes: [{ key: "isInternal", value: newIsInternal, previousValue }],
      comment: getValues()
    };
    propagateUpdate(superdoc, emitData);
    const activeEditor = superdoc.activeEditor;
    if (!activeEditor) return;
    activeEditor.commands.setCommentInternal({ commentId, importedId, isInternal: newIsInternal });
  };
  const setActive = (superdoc) => {
    const { activeEditor } = superdoc;
    activeEditor?.commands.setActiveComment({ commentId, importedId });
  };
  const setText = ({ text, superdoc, suppressUpdate }) => {
    commentText.value = text;
    mentions.value = extractMentions(text);
    if (suppressUpdate) return;
    const emitData = {
      type: comments_module_events.UPDATE,
      changes: [{ key: "text", value: text }],
      comment: getValues()
    };
    propagateUpdate(superdoc, emitData);
  };
  const extractMentions = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const mentionElements = [...doc.querySelectorAll('span[data-type="mention"]')];
    const uniqueMentions = [];
    mentionElements.forEach((span) => {
      const alreadyExists = uniqueMentions.some((m) => {
        const hasEmail = m.email === span.getAttribute("email");
        const hasName = m.name === span.getAttribute("name");
        return hasEmail && hasName;
      });
      if (!alreadyExists) {
        uniqueMentions.push({
          name: span.getAttribute("name"),
          email: span.getAttribute("email")
        });
      }
    });
    return uniqueMentions;
  };
  const updatePosition = (coords, parentElement) => {
    selection.source = "super-editor";
    const parentTop = parentElement?.getBoundingClientRect()?.top;
    const newCoords = {
      top: coords.top - parentTop,
      left: coords.left,
      right: coords.right,
      bottom: coords.bottom - parentTop
    };
    selection.selectionBounds = newCoords;
  };
  const getCommentUser = () => {
    const user = importedAuthor.value ? { name: importedAuthor.value.name || "(Imported)", email: importedAuthor.value.email } : { name: creatorName, email: creatorEmail, image: creatorImage };
    return user;
  };
  const propagateUpdate = (superdoc, event) => {
    superdoc.emit("comments-update", event);
    syncCommentsToClients(superdoc, event);
  };
  const getValues = () => {
    return {
      uid: uid.value,
      commentId,
      importedId,
      parentCommentId,
      trackedChangeParentId,
      fileId,
      fileType,
      mentions: mentions.value.map((u) => {
        return { ...u, name: u.name ? u.name : u.email };
      }),
      createdAtVersionNumber,
      creatorEmail,
      creatorName,
      creatorImage,
      createdTime,
      importedAuthor: importedAuthor.value,
      docxCommentJSON,
      isInternal: isInternal.value,
      commentText: commentText.value,
      selection: selection ? selection.getValues() : null,
      trackedChange: trackedChange.value,
      trackedChangeText: trackedChangeText.value,
      trackedChangeType: trackedChangeType.value,
      deletedText: deletedText.value,
      resolvedTime: resolvedTime.value,
      resolvedByEmail: resolvedByEmail.value,
      resolvedByName: resolvedByName.value,
      origin,
      threadingMethod,
      threadingStyleOverride,
      threadingParentCommentId,
      originalXmlStructure
    };
  };
  return reactive({
    uid,
    commentId,
    importedId,
    parentCommentId,
    trackedChangeParentId,
    fileId,
    fileType,
    mentions,
    commentElement,
    isFocused,
    creatorEmail,
    creatorName,
    creatorImage,
    createdTime,
    isInternal,
    commentText,
    selection,
    floatingPosition,
    trackedChange,
    deletedText,
    trackedChangeType,
    trackedChangeText,
    resolvedTime,
    resolvedByEmail,
    resolvedByName,
    importedAuthor,
    docxCommentJSON,
    origin,
    threadingMethod,
    threadingStyleOverride,
    threadingParentCommentId,
    originalXmlStructure,
    // Actions
    setText,
    getValues,
    resolveComment,
    setIsInternal,
    setActive,
    updatePosition,
    getCommentUser
  });
}
function useDocument(params, superdocConfig) {
  const id = params.id;
  const type = initDocumentType(params);
  const data = params.data;
  const config = superdocConfig;
  const state = params.state;
  const role = params.role;
  const html = params.html;
  const markdown = params.markdown;
  const container = ref(null);
  const pageContainers = ref([]);
  const isReady = ref(false);
  const rulers = ref(superdocConfig.rulers);
  const ydoc = shallowRef(params.ydoc);
  const provider = shallowRef(params.provider);
  const socket = shallowRef(params.socket);
  const isNewFile = ref(params.isNewFile);
  const editorRef = shallowRef(null);
  const setEditor = (ref2) => editorRef.value = ref2;
  const getEditor = () => editorRef.value;
  const presentationEditorRef = shallowRef(null);
  const setPresentationEditor = (ref2) => presentationEditorRef.value = ref2;
  const getPresentationEditor = () => presentationEditorRef.value;
  function initDocumentType({ type: type2, data: data2 }) {
    if (data2?.type) return data2.type;
    if (type2) return documentTypes[type2] || type2;
    throw new Error("Document type not specified");
  }
  const removeComments = () => {
    conversationsBackup.value = conversations.value;
    conversations.value = [];
  };
  const restoreComments = () => {
    conversations.value = conversationsBackup.value;
    console.debug("[superdoc] Restored comments:", conversations.value);
  };
  const rawFields = ref(params.fields || []);
  const fields = ref(params.fields?.map((f) => useField(f)) || []);
  const annotations = ref(params.annotations || []);
  const conversations = ref(initConversations());
  const conversationsBackup = ref(conversations.value);
  const commentThreadingProfile = ref(params.commentThreadingProfile || null);
  function initConversations() {
    if (!config.modules.comments) return [];
    return params.conversations?.map((c2) => useComment(c2)) || [];
  }
  const core = ref(null);
  const removeConversation = (conversationId) => {
    const index = conversations.value.findIndex((c2) => c2.conversationId === conversationId);
    if (index > -1) conversations.value.splice(index, 1);
  };
  return {
    id,
    data,
    html,
    markdown,
    type,
    config,
    state,
    role,
    core,
    ydoc,
    provider,
    socket,
    isNewFile,
    // Placement
    container,
    pageContainers,
    isReady,
    rulers,
    // Modules
    rawFields,
    fields,
    annotations,
    conversations,
    commentThreadingProfile,
    // Actions
    setEditor,
    getEditor,
    setPresentationEditor,
    getPresentationEditor,
    removeComments,
    restoreComments,
    removeConversation
  };
}
const useSuperdocStore = /* @__PURE__ */ defineStore("superdoc", () => {
  const currentConfig = ref(null);
  let exceptionHandler = null;
  const commentsStore = useCommentsStore();
  const documents = ref([]);
  const documentBounds = ref([]);
  const pages = reactive({});
  const documentUsers = ref([]);
  const activeZoom = ref(100);
  const isReady = ref(false);
  const isInternal = ref(false);
  const users = ref([]);
  const user = reactive({ name: null, email: null });
  const modules = reactive({});
  const activeSelection = ref(null);
  const selectionPosition = ref({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    source: null
  });
  const reset = () => {
    documents.value = [];
    documentBounds.value = [];
    Object.assign(pages, {});
    documentUsers.value = [];
    isReady.value = false;
    user.name = null;
    user.email = null;
    Object.assign(modules, {});
    activeSelection.value = null;
  };
  const documentScroll = reactive({
    scrollTop: 0,
    scrollLeft: 0
  });
  const setExceptionHandler = (handler) => {
    exceptionHandler = typeof handler === "function" ? handler : null;
  };
  const emitException = (payload) => {
    const handler = exceptionHandler || currentConfig.value?.onException;
    if (typeof handler === "function") handler(payload);
  };
  const init = async (config) => {
    reset();
    currentConfig.value = config;
    const { documents: configDocs, modules: configModules, user: configUser, users: configUsers } = config;
    documentUsers.value = configUsers || [];
    Object.assign(user, configUser);
    Object.assign(modules, configModules);
    if (!Object.prototype.hasOwnProperty.call(modules, "comments")) {
      modules.comments = {};
    }
    if (!configDocs?.length && !config.modules.collaboration) {
      const newDoc = await getFileObject(BlankDOCX, "blank.docx", DOCX);
      const newDocConfig = {
        type: DOCX,
        data: newDoc,
        name: "blank.docx",
        isNewFile: true
      };
      if (config.html) newDocConfig.html = config.html;
      if (config.markdown) newDocConfig.markdown = config.markdown;
      configDocs.push(newDocConfig);
    }
    await initializeDocuments(configDocs);
    isReady.value = true;
  };
  const initializeDocuments = async (docsToProcess = []) => {
    if (!docsToProcess) return [];
    for (let doc of docsToProcess) {
      if (!doc) {
        emitException({
          error: new Error("Received empty document entry during initialization."),
          stage: "document-init",
          document: doc
        });
        console.warn("[superdoc] Skipping empty document entry.");
        continue;
      }
      try {
        let docWithData = await _initializeDocumentData(doc);
        if (!docWithData) {
          emitException({
            error: new Error("Document could not be initialized with the provided configuration."),
            stage: "document-init",
            document: doc
          });
          console.warn("[superdoc] Skipping document due to invalid configuration:", doc);
          continue;
        }
        const smartDoc = useDocument(docWithData, currentConfig.value);
        documents.value.push(smartDoc);
      } catch (e) {
        emitException({ error: e, stage: "document-init", document: doc });
        console.warn("[superdoc] Error initializing document:", doc, "with error:", e, "Skipping document.");
      }
    }
  };
  const _blobToFile = (blob, name, type) => {
    return new File([blob], name, { type });
  };
  const _initializeDocumentData = async (doc) => {
    doc = normalizeDocumentEntry(doc);
    if (currentConfig.value?.html) doc.html = currentConfig.value.html;
    if (!doc.data && doc.url && !doc.type) doc.type = DOCX;
    if (currentConfig.value?.modules.collaboration && !doc.isNewFile) {
      return { ...doc, data: null, url: null };
    }
    if (doc.data instanceof File) {
      let fileName = doc.name;
      const extension = doc.type === DOCX ? ".docx" : doc.type === PDF ? ".pdf" : ".bin";
      if (!fileName) {
        fileName = `document${extension}`;
      } else if (!fileName.includes(".")) {
        fileName = `${fileName}${extension}`;
      }
      if (doc.data.name !== fileName) {
        const fileObject = _blobToFile(doc.data, fileName, doc.data.type || doc.type);
        return { ...doc, name: fileName, data: fileObject };
      }
      if (!doc.name) return { ...doc, name: fileName };
      return doc;
    } else if (doc.data instanceof Blob) {
      let fileName = doc.name;
      if (!fileName) {
        const extension = doc.type === DOCX ? ".docx" : doc.type === PDF ? ".pdf" : ".bin";
        fileName = `document${extension}`;
      }
      const fileObject = _blobToFile(doc.data, fileName, doc.data.type || doc.type);
      return { ...doc, data: fileObject };
    } else if (doc.data) return doc;
    else if (doc.url && doc.type) {
      if (doc.type.toLowerCase() === "docx") doc.type = DOCX;
      else if (doc.type.toLowerCase() === "pdf") doc.type = PDF;
      try {
        const fileObject = await getFileObject(doc.url, doc.name || "document", doc.type);
        return { ...doc, data: fileObject };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.debug("[SuperDoc] Failed to fetch document from URL:", message);
        throw err;
      }
    }
    return null;
  };
  const areDocumentsReady = computed(() => {
    for (let obj of documents.value.filter((doc) => doc.type === "pdf")) {
      if (!obj.isReady) return false;
    }
    return true;
  });
  const getDocument = (documentId) => documents.value.find((doc) => doc.id === documentId);
  const getPageBounds = (documentId, page) => {
    const matchedPage = pages[documentId];
    if (!matchedPage) return;
    const pageInfo = matchedPage.find((p) => p.page == page);
    if (!pageInfo || !pageInfo.container) return;
    const containerBounds = pageInfo.container.getBoundingClientRect();
    const { height } = containerBounds;
    const totalHeight = height * (page - 1);
    return {
      top: totalHeight
    };
  };
  const handlePageReady = (documentId, index, containerBounds) => {
    if (!pages[documentId]) pages[documentId] = [];
    pages[documentId].push({ page: index, containerBounds });
    const doc = getDocument(documentId);
    if (!doc) return;
    doc.pageContainers.push({
      page: index,
      containerBounds
    });
  };
  return {
    commentsStore,
    documents,
    documentBounds,
    pages,
    documentUsers,
    users,
    activeZoom,
    documentScroll,
    isInternal,
    selectionPosition,
    activeSelection,
    isReady,
    user,
    modules,
    // Getters
    areDocumentsReady,
    // Actions
    init,
    setExceptionHandler,
    reset,
    handlePageReady,
    getDocument,
    getPageBounds
  };
});
const groupChanges = (changes) => {
  const markMetaKeys = {
    trackInsert: "insertedMark",
    trackDelete: "deletionMark",
    trackFormat: "formatMark"
  };
  const grouped = [];
  const processed = /* @__PURE__ */ new Set();
  for (let i = 0; i < changes.length; i++) {
    if (processed.has(i)) continue;
    const c1 = changes[i];
    const c1Key = markMetaKeys[c1.mark.type.name];
    const c1Id = c1.mark.attrs.id;
    const c2 = changes[i + 1];
    if (c2 && c1.to === c2.from && c1Id === c2.mark.attrs.id) {
      const c2Key = markMetaKeys[c2.mark.type.name];
      grouped.push({
        from: c1.from,
        to: c2.to,
        [c1Key]: c1,
        [c2Key]: c2
      });
      processed.add(i);
      processed.add(i + 1);
      continue;
    }
    let foundMatch = false;
    for (let j = i + 1; j < changes.length; j++) {
      if (processed.has(j)) continue;
      const c22 = changes[j];
      if (c1Id === c22.mark.attrs.id && c1.mark.type.name !== c22.mark.type.name) {
        const c2Key = markMetaKeys[c22.mark.type.name];
        grouped.push({
          from: Math.min(c1.from, c22.from),
          to: Math.max(c1.to, c22.to),
          [c1Key]: c1,
          [c2Key]: c22
        });
        processed.add(i);
        processed.add(j);
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      grouped.push({
        from: c1.from,
        to: c1.to,
        [c1Key]: c1
      });
      processed.add(i);
    }
  }
  return grouped;
};
const useCommentsStore = /* @__PURE__ */ defineStore("comments", () => {
  const superdocStore = useSuperdocStore();
  const commentsConfig = reactive({
    name: "comments",
    readOnly: false,
    allowResolve: true,
    showResolved: false
  });
  const viewingVisibility = reactive({
    documentMode: "editing",
    commentsVisible: false,
    trackChangesVisible: false
  });
  const isDebugging = false;
  const debounceTimers = {};
  const COMMENT_EVENTS = comments_module_events;
  const hasInitializedComments = ref(false);
  const hasSyncedCollaborationComments = ref(false);
  const commentsParentElement = ref(null);
  const hasInitializedLocations = ref(false);
  const activeComment = ref(null);
  const editingCommentId = ref(null);
  const commentDialogs = ref([]);
  const overlappingComments = ref([]);
  const overlappedIds = /* @__PURE__ */ new Set([]);
  const suppressInternalExternal = ref(true);
  const currentCommentText = ref("");
  const commentsList = ref([]);
  const isCommentsListVisible = ref(false);
  const editorCommentIds = ref([]);
  const editorCommentPositions = ref({});
  const isCommentHighlighted = ref(false);
  const floatingCommentsOffset = ref(0);
  const sortedConversations = ref([]);
  const visibleConversations = ref([]);
  const skipSelectionUpdate = ref(false);
  const isFloatingCommentsReady = ref(false);
  const generalCommentIds = ref([]);
  const pendingComment = ref(null);
  const isViewingMode = computed(() => viewingVisibility.documentMode === "viewing");
  const init = (config = {}) => {
    const updatedConfig = { ...commentsConfig, ...config };
    Object.assign(commentsConfig, updatedConfig);
    suppressInternalExternal.value = commentsConfig.suppressInternalExternal || false;
    if (config.comments && config.comments.length) {
      commentsList.value = config.comments?.map((c2) => useComment(c2)) || [];
    }
  };
  const getComment = (id) => {
    if (id === void 0 || id === null) return null;
    return commentsList.value.find((c2) => c2.commentId == id || c2.importedId == id);
  };
  const getThreadParent = (comment) => {
    if (!comment?.parentCommentId) return comment;
    return getComment(comment.parentCommentId);
  };
  const isRangeThreadedComment = (comment) => {
    if (!comment) return false;
    return comment.threadingStyleOverride === "range-based" || comment.threadingMethod === "range-based" || comment.originalXmlStructure?.hasCommentsExtended === false;
  };
  const shouldThreadWithTrackedChange = (comment) => {
    if (!comment?.trackedChangeParentId) return false;
    if (!isRangeThreadedComment(comment)) return false;
    const trackedChange = getComment(comment.trackedChangeParentId);
    return Boolean(trackedChange?.trackedChange);
  };
  const getCommentPositionKey = (commentOrId) => {
    if (!commentOrId) return null;
    if (typeof commentOrId === "object") {
      return commentOrId.importedId ?? commentOrId.commentId ?? null;
    }
    return commentOrId;
  };
  const getCommentPositionRange = (position) => {
    if (!position) return null;
    const start = position.start ?? position.pos ?? position.from;
    const end = position.end ?? position.to ?? start;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
    return { start, end };
  };
  const getCommentPosition = (commentOrId) => {
    const key = getCommentPositionKey(commentOrId);
    if (!key) return null;
    return editorCommentPositions.value?.[key] ?? null;
  };
  const getCommentAnchoredText = (commentOrId, options = {}) => {
    const key = getCommentPositionKey(commentOrId);
    if (!key) return null;
    const comment = typeof commentOrId === "object" ? commentOrId : getComment(commentOrId);
    if (!comment) return null;
    const position = editorCommentPositions.value?.[key] ?? null;
    const range = getCommentPositionRange(position);
    if (!range) return null;
    const doc = superdocStore.getDocument(comment.fileId);
    const editor = doc?.getEditor?.();
    const docNode = editor?.state?.doc;
    if (!docNode?.textBetween) return null;
    const separator = options.separator ?? " ";
    const text = docNode.textBetween(range.start, range.end, separator, separator);
    return options.trim === false ? text : text?.trim();
  };
  const getCommentAnchorData = (commentOrId, options = {}) => {
    const position = getCommentPosition(commentOrId);
    if (!position) return null;
    return {
      position,
      anchoredText: getCommentAnchoredText(commentOrId, options)
    };
  };
  const isThreadVisible = (comment) => {
    if (!isViewingMode.value) return true;
    const parent = getThreadParent(comment);
    if (!parent && comment?.parentCommentId) return false;
    const isTrackedChange = Boolean(parent?.trackedChange) || Boolean(comment?.trackedChangeParentId);
    return isTrackedChange ? viewingVisibility.trackChangesVisible : viewingVisibility.commentsVisible;
  };
  const setActiveComment = (superdoc, id) => {
    if (id === void 0 || id === null) {
      activeComment.value = null;
      if (superdoc.activeEditor) {
        superdoc.activeEditor.commands?.setActiveComment({ commentId: null });
      }
      return;
    }
    const comment = getComment(id);
    if (comment) activeComment.value = comment.commentId;
    if (superdoc.activeEditor) {
      superdoc.activeEditor.commands?.setActiveComment({ commentId: activeComment.value });
    }
  };
  const handleTrackedChangeUpdate = ({ superdoc, params }) => {
    const {
      event,
      changeId,
      trackedChangeText,
      trackedChangeType,
      deletedText,
      authorEmail,
      authorImage,
      date,
      author: authorName,
      importedAuthor,
      documentId,
      coords
    } = params;
    const comment = getPendingComment({
      documentId,
      commentId: changeId,
      trackedChange: true,
      trackedChangeText,
      trackedChangeType,
      deletedText,
      createdTime: date,
      creatorName: authorName,
      creatorEmail: authorEmail,
      creatorImage: authorImage,
      isInternal: false,
      importedAuthor,
      selection: {
        selectionBounds: coords
      }
    });
    if (event === "add") {
      addComment({ superdoc, comment });
    } else if (event === "update") {
      const existingTrackedChange = commentsList.value.find((comment2) => comment2.commentId === changeId);
      if (!existingTrackedChange) return;
      existingTrackedChange.trackedChangeText = trackedChangeText;
      if (deletedText) {
        existingTrackedChange.deletedText = deletedText;
      }
      const emitData = {
        type: COMMENT_EVENTS.UPDATE,
        comment: existingTrackedChange.getValues()
      };
      syncCommentsToClients(superdoc, emitData);
      debounceEmit(changeId, emitData, superdoc);
    }
  };
  const debounceEmit = (commentId, event, superdoc, delay = 1e3) => {
    if (debounceTimers[commentId]) {
      clearTimeout(debounceTimers[commentId]);
    }
    debounceTimers[commentId] = setTimeout(() => {
      if (superdoc) {
        superdoc.emit("comments-update", event);
      }
      delete debounceTimers[commentId];
    }, delay);
  };
  const showAddComment = (superdoc) => {
    const event = { type: COMMENT_EVENTS.PENDING };
    superdoc.emit("comments-update", event);
    const selection = { ...superdocStore.activeSelection };
    selection.selectionBounds = { ...selection.selectionBounds };
    if (superdocStore.selectionPosition?.source) {
      superdocStore.selectionPosition.source = null;
    }
    pendingComment.value = getPendingComment({ selection, documentId: selection.documentId, parentCommentId: null });
    if (!superdoc.config.isInternal) pendingComment.value.isInternal = false;
    if (superdoc.activeEditor?.commands) {
      superdoc.activeEditor.commands.insertComment({
        ...pendingComment.value.getValues(),
        commentId: "pending",
        skipEmit: true
      });
    }
    if (pendingComment.value.selection.source === "super-editor" && superdocStore.selectionPosition) {
      superdocStore.selectionPosition.source = "super-editor";
    }
    activeComment.value = pendingComment.value.commentID;
  };
  const getPositionSortValue = (comment) => {
    const key = getCommentPositionKey(comment);
    if (!key) return null;
    const position = editorCommentPositions.value?.[key];
    if (!position) return null;
    if (Number.isFinite(position.start)) return position.start;
    if (Number.isFinite(position.pos)) return position.pos;
    if (Number.isFinite(position.from)) return position.from;
    if (Number.isFinite(position.to)) return position.to;
    return null;
  };
  const compareByCreatedTime = (a, b) => (a.createdTime ?? 0) - (b.createdTime ?? 0);
  const compareByPosition = (a, b) => {
    const posA = getPositionSortValue(a);
    const posB = getPositionSortValue(b);
    const hasA = Number.isFinite(posA);
    const hasB = Number.isFinite(posB);
    if (hasA && hasB && posA !== posB) return posA - posB;
    if (hasA && !hasB) return -1;
    if (!hasA && hasB) return 1;
    return compareByCreatedTime(a, b);
  };
  const buildGroupedComments = (sorter) => {
    const parentComments = [];
    const resolvedComments = [];
    const childCommentMap = /* @__PURE__ */ new Map();
    commentsList.value.forEach((comment) => {
      if (!isThreadVisible(comment)) return;
      const trackedChangeParentId = shouldThreadWithTrackedChange(comment) ? comment.trackedChangeParentId : null;
      const parentId = comment.parentCommentId || trackedChangeParentId;
      if (comment.resolvedTime) {
        resolvedComments.push(comment);
      } else if (!parentId && !comment.resolvedTime) {
        parentComments.push({ ...comment });
      } else if (parentId) {
        if (!childCommentMap.has(parentId)) {
          childCommentMap.set(parentId, []);
        }
        childCommentMap.get(parentId).push(comment);
      }
    });
    const sortedParentComments = parentComments.sort(sorter);
    const sortedResolvedComments = resolvedComments.sort(sorter);
    return {
      parentComments: sortedParentComments,
      resolvedComments: sortedResolvedComments
    };
  };
  const getGroupedComments = computed(() => buildGroupedComments(compareByCreatedTime));
  const getCommentsByPosition = computed(() => buildGroupedComments(compareByPosition));
  const hasOverlapId = (id) => overlappedIds.includes(id);
  const documentsWithConverations = computed(() => {
    return superdocStore.documents;
  });
  const getConfig = computed(() => {
    return commentsConfig;
  });
  const getCommentLocation = (selection, parent) => {
    const containerBounds = selection.getContainerLocation(parent);
    const top = containerBounds.top + selection.selectionBounds.top;
    const left = containerBounds.left + selection.selectionBounds.left;
    return {
      top,
      left
    };
  };
  const getPendingComment = ({ selection, documentId, parentCommentId, ...options }) => {
    return _getNewcomment({ selection, documentId, parentCommentId, ...options });
  };
  const _getNewcomment = ({ selection, documentId, parentCommentId, ...options }) => {
    let activeDocument;
    if (documentId) activeDocument = superdocStore.getDocument(documentId);
    else if (selection) activeDocument = superdocStore.getDocument(selection.documentId);
    if (!activeDocument) activeDocument = superdocStore.documents[0];
    return useComment({
      fileId: activeDocument.id,
      fileType: activeDocument.type,
      parentCommentId,
      creatorEmail: superdocStore.user.email,
      creatorName: superdocStore.user.name,
      creatorImage: superdocStore.user.image,
      commentText: currentCommentText.value,
      selection,
      ...options
    });
  };
  const removePendingComment = (superdoc) => {
    currentCommentText.value = "";
    pendingComment.value = null;
    activeComment.value = null;
    superdocStore.selectionPosition = null;
    superdoc.activeEditor?.commands.removeComment({ commentId: "pending" });
  };
  const addComment = ({ superdoc, comment, skipEditorUpdate = false }) => {
    let parentComment = commentsList.value.find((c2) => c2.commentId === activeComment.value);
    if (!parentComment) parentComment = comment;
    const newComment = useComment(comment.getValues());
    if (pendingComment.value) newComment.setText({ text: currentCommentText.value, suppressUpdate: true });
    else newComment.setText({ text: comment.commentText, suppressUpdate: true });
    newComment.selection.source = pendingComment.value?.selection?.source;
    if (parentComment) {
      const isParentInternal = parentComment.isInternal;
      newComment.isInternal = isParentInternal;
    }
    if (!superdoc.config.isInternal) newComment.isInternal = false;
    commentsList.value.push(newComment);
    removePendingComment(superdoc);
    if (!skipEditorUpdate && !comment.trackedChange && superdoc.activeEditor?.commands && !comment.parentCommentId) {
      superdoc.activeEditor.commands.insertComment({ ...newComment.getValues(), skipEmit: true });
    }
    const event = { type: COMMENT_EVENTS.ADD, comment: newComment.getValues() };
    syncCommentsToClients(superdoc, event);
    superdoc.emit("comments-update", event);
  };
  const deleteComment = ({ commentId: commentIdToDelete, superdoc }) => {
    const commentIndex = commentsList.value.findIndex((c2) => c2.commentId === commentIdToDelete);
    const comment = commentsList.value[commentIndex];
    const { commentId, importedId } = comment;
    const { fileId } = comment;
    superdoc.activeEditor?.commands?.removeComment({ commentId, importedId });
    commentsList.value.splice(commentIndex, 1);
    const childCommentIds = commentsList.value.filter((c2) => c2.parentCommentId === commentId).map((c2) => c2.commentId || c2.importedId);
    commentsList.value = commentsList.value.filter((c2) => !childCommentIds.includes(c2.commentId));
    const event = {
      type: COMMENT_EVENTS.DELETED,
      comment: comment.getValues(),
      changes: [{ key: "deleted", commentId, fileId }]
    };
    superdoc.emit("comments-update", event);
    syncCommentsToClients(superdoc, event);
  };
  const cancelComment = (superdoc) => {
    removePendingComment(superdoc);
  };
  const processLoadedDocxComments = async ({ superdoc, editor, comments, documentId }) => {
    const document2 = superdocStore.getDocument(documentId);
    if (document2?.commentThreadingProfile) {
      document2.commentThreadingProfile.value = editor?.converter?.commentThreadingProfile || null;
    }
    comments.forEach((comment) => {
      const htmlContent = getHtmlFromComment(comment.textJson);
      if (!htmlContent && !comment.trackedChange) {
        return;
      }
      const creatorName = comment.creatorName.replace("(imported)", "");
      const importedName = `${creatorName} (imported)`;
      const newComment = useComment({
        fileId: documentId,
        fileType: document2.type,
        docxCommentJSON: comment.textJson,
        commentId: comment.commentId,
        isInternal: false,
        parentCommentId: comment.parentCommentId,
        trackedChangeParentId: comment.trackedChangeParentId,
        creatorName,
        createdTime: comment.createdTime,
        creatorEmail: comment.creatorEmail,
        importedAuthor: {
          name: importedName,
          email: comment.creatorEmail
        },
        commentText: getHtmlFromComment(comment.textJson),
        resolvedTime: comment.isDone ? Date.now() : null,
        resolvedByEmail: comment.isDone ? comment.creatorEmail : null,
        resolvedByName: comment.isDone ? importedName : null,
        trackedChange: comment.trackedChange || false,
        trackedChangeText: comment.trackedChangeText,
        trackedChangeType: comment.trackedChangeType,
        deletedText: comment.trackedDeletedText,
        // Preserve origin metadata for export
        origin: comment.origin || "word",
        // Default to 'word' for backward compatibility
        threadingMethod: comment.threadingMethod,
        threadingStyleOverride: comment.threadingStyleOverride,
        threadingParentCommentId: comment.threadingParentCommentId,
        originalXmlStructure: comment.originalXmlStructure
      });
      addComment({ superdoc, comment: newComment });
    });
    setTimeout(() => {
      createCommentForTrackChanges(editor);
    }, 0);
  };
  const createCommentForTrackChanges = (editor) => {
    let trackedChanges = getTrackChanges(editor.state);
    const groupedChanges = groupChanges(trackedChanges);
    const { tr } = editor.view.state;
    const { dispatch } = editor.view;
    groupedChanges.forEach(({ insertedMark, deletionMark, formatMark }, index) => {
      console.debug(`Create comment for track change: ${index}`);
      const foundComment = commentsList.value.find(
        (i) => i.commentId === insertedMark?.mark.attrs.id || i.commentId === deletionMark?.mark.attrs.id || i.commentId === formatMark?.mark.attrs.id
      );
      const isLastIteration = trackedChanges.length === index + 1;
      if (foundComment) {
        if (isLastIteration) {
          tr.setMeta(CommentsPluginKey, { type: "force" });
        }
        return;
      }
      if (insertedMark || deletionMark || formatMark) {
        const trackChangesPayload = {
          ...insertedMark && { insertedMark: insertedMark.mark },
          ...deletionMark && { deletionMark: deletionMark.mark },
          ...formatMark && { formatMark: formatMark.mark }
        };
        if (isLastIteration) tr.setMeta(CommentsPluginKey, { type: "force" });
        tr.setMeta(CommentsPluginKey, { type: "forceTrackChanges" });
        tr.setMeta(TrackChangesBasePluginKey, trackChangesPayload);
      }
      dispatch(tr);
    });
  };
  const translateCommentsForExport = () => {
    const processedComments = [];
    commentsList.value.forEach((comment) => {
      const values = comment.getValues();
      const richText = values.commentText;
      const schema = values.docxCommentJSON || convertHtmlToSchema(richText);
      processedComments.push({
        ...values,
        commentJSON: schema
      });
    });
    return processedComments;
  };
  const convertHtmlToSchema = (commentHTML) => {
    const editor = new Editor({
      mode: "text",
      isHeadless: true,
      content: commentHTML,
      extensions: getRichTextExtensions()
    });
    return editor.getJSON().content[0];
  };
  const handleEditorLocationsUpdate = (allCommentPositions) => {
    editorCommentPositions.value = allCommentPositions || {};
  };
  const clearEditorCommentPositions = () => {
    editorCommentPositions.value = {};
  };
  const getFloatingComments = computed(() => {
    const comments = getGroupedComments.value?.parentComments.filter((c2) => !c2.resolvedTime).filter((c2) => {
      const keys = Object.keys(editorCommentPositions.value);
      const isPdfComment = c2.selection?.source !== "super-editor";
      if (isPdfComment) return true;
      const commentKey = c2.commentId || c2.importedId;
      return keys.includes(commentKey);
    });
    return comments;
  });
  const setViewingVisibility = ({ documentMode, commentsVisible, trackChangesVisible } = {}) => {
    if (typeof documentMode === "string") {
      viewingVisibility.documentMode = documentMode;
    }
    if (typeof commentsVisible === "boolean") {
      viewingVisibility.commentsVisible = commentsVisible;
    }
    if (typeof trackChangesVisible === "boolean") {
      viewingVisibility.trackChangesVisible = trackChangesVisible;
    }
  };
  const normalizeCommentForEditor = (node) => {
    if (!node || typeof node !== "object") return node;
    const stripTextStyleAttrs = (attrs) => {
      if (!attrs) return attrs;
      const rest = { ...attrs };
      delete rest.fontSize;
      delete rest.fontFamily;
      delete rest.eastAsiaFontFamily;
      return Object.keys(rest).length ? rest : void 0;
    };
    const normalizeMark = (mark) => {
      if (!mark) return mark;
      const typeName = typeof mark.type === "string" ? mark.type : mark.type?.name;
      const attrs = mark?.attrs ? { ...mark.attrs } : void 0;
      if (typeName === "textStyle" && attrs) {
        return { ...mark, attrs: stripTextStyleAttrs(attrs) };
      }
      return { ...mark, attrs };
    };
    const cloneMarks = (marks) => Array.isArray(marks) ? marks.filter(Boolean).map((mark) => normalizeMark(mark)) : void 0;
    const cloneAttrs = (attrs) => attrs && typeof attrs === "object" ? { ...attrs } : void 0;
    if (!Array.isArray(node.content)) {
      return {
        type: node.type,
        ...node.text !== void 0 ? { text: node.text } : {},
        ...node.attrs ? { attrs: cloneAttrs(node.attrs) } : {},
        ...node.marks ? { marks: cloneMarks(node.marks) } : {}
      };
    }
    const normalizedChildren = node.content.map((child) => normalizeCommentForEditor(child)).flat().filter(Boolean);
    if (node.type === "run") {
      return normalizedChildren;
    }
    return {
      type: node.type,
      ...node.attrs ? { attrs: cloneAttrs(node.attrs) } : {},
      ...node.marks ? { marks: cloneMarks(node.marks) } : {},
      content: normalizedChildren
    };
  };
  const getHtmlFromComment = (commentTextJson) => {
    if (!commentTextJson.content?.length) return;
    try {
      const normalizedContent = normalizeCommentForEditor(commentTextJson);
      const schemaContent = Array.isArray(normalizedContent) ? normalizedContent[0] : normalizedContent;
      if (!schemaContent.content.length) return null;
      const editor = new Editor({
        mode: "text",
        isHeadless: true,
        content: schemaContent,
        loadFromSchema: true,
        extensions: getRichTextExtensions()
      });
      return editor.getHTML();
    } catch (error) {
      console.warn("Failed to convert comment", error);
      return;
    }
  };
  return {
    COMMENT_EVENTS,
    isDebugging,
    hasInitializedComments,
    hasSyncedCollaborationComments,
    editingCommentId,
    activeComment,
    commentDialogs,
    overlappingComments,
    overlappedIds,
    suppressInternalExternal,
    pendingComment,
    currentCommentText,
    commentsList,
    isCommentsListVisible,
    generalCommentIds,
    editorCommentIds,
    commentsParentElement,
    editorCommentPositions,
    hasInitializedLocations,
    isCommentHighlighted,
    // Floating comments
    floatingCommentsOffset,
    sortedConversations,
    visibleConversations,
    skipSelectionUpdate,
    isFloatingCommentsReady,
    // Getters
    getConfig,
    documentsWithConverations,
    getGroupedComments,
    getCommentsByPosition,
    getFloatingComments,
    getCommentPosition,
    getCommentAnchoredText,
    getCommentAnchorData,
    // Actions
    init,
    setViewingVisibility,
    getComment,
    setActiveComment,
    getCommentLocation,
    hasOverlapId,
    getPendingComment,
    showAddComment,
    addComment,
    cancelComment,
    deleteComment,
    removePendingComment,
    processLoadedDocxComments,
    translateCommentsForExport,
    handleEditorLocationsUpdate,
    clearEditorCommentPositions,
    handleTrackedChangeUpdate
  };
});
const userCheckIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>';
const usersIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>';
const superdocIcons = {
  comment: commentIconSvg,
  caretDown: caretDownIconSvg,
  internal: userCheckIconSvg,
  external: usersIconSvg,
  markDone: checkIconSvg,
  acceptChange: checkIconSvg,
  rejectChange: xmarkIconSvg,
  overflow: ellipsisVerticalSvg
};
const _hoisted_1$f = { class: "user-container" };
const _hoisted_2$9 = ["src"];
const _hoisted_3$7 = {
  key: 1,
  class: "user-bg"
};
const _sfc_main$g = {
  __name: "Avatar",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const getInitials = (name, email) => {
      if (!name && !email) return;
      const firstLetter = name?.substring(0, 1) || email?.substring(0, 1) || null;
      return firstLetter;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        __props.user.image ? (openBlock(), createElementBlock("img", {
          key: 0,
          class: "user-bg",
          src: __props.user.image.startsWith("http") ? __props.user.image : `data:image/png;base64,${__props.user.image}`
        }, null, 8, _hoisted_2$9)) : (openBlock(), createElementBlock("span", _hoisted_3$7, toDisplayString(getInitials(__props.user.name, __props.user.email)), 1))
      ]);
    };
  }
};
const Avatar = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-53e13009"]]);
const DEFAULT_UI_FONT_FAMILY = "Arial, Helvetica, sans-serif";
function useUiFontFamily() {
  const instance = getCurrentInstance();
  const uiFontFamily = computed(() => {
    const configured = instance?.proxy?.$superdoc?.config?.uiDisplayFallbackFont;
    if (typeof configured === "string" && configured.trim()) {
      return configured.trim();
    }
    return DEFAULT_UI_FONT_FAMILY;
  });
  return {
    uiFontFamily
  };
}
const _hoisted_1$e = { class: "comment-option" };
const _hoisted_2$8 = ["innerHTML"];
const _hoisted_3$6 = { class: "option-state" };
const _hoisted_4$4 = ["innerHTML"];
const _sfc_main$f = {
  __name: "InternalDropdown",
  props: {
    state: {
      type: String,
      required: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { uiFontFamily } = useUiFontFamily();
    const renderIcon = (icon) => {
      return () => {
        return h("div", { innerHTML: icon, class: "internal-dropdown__item-icon" });
      };
    };
    const options = [
      {
        label: "Internal",
        key: "internal",
        icon: renderIcon(superdocIcons.internal),
        iconString: superdocIcons.internal,
        backgroundColor: "#CDE6E6"
      },
      {
        label: "External",
        key: "external",
        icon: renderIcon(superdocIcons.external),
        iconString: superdocIcons.external,
        backgroundColor: "#F5CFDA"
      }
    ];
    const getState = computed(() => {
      return options.find((o) => o.key === activeState.value)?.label;
    });
    const getStyle = computed(() => {
      if (!props.state) return {};
      const activeOption = options.find((o) => o.key === activeState.value);
      if (!activeOption) return {};
      const style2 = { backgroundColor: activeOption.backgroundColor };
      if (props.isDisabled) {
        style2.opacity = 0.5;
        style2.cursor = "default";
      }
      return style2;
    });
    const handleSelect = (key, suppressEmit = false) => {
      activeState.value = key;
      activeIcon.value = options.find((o) => o.key === key)?.iconString;
      if (suppressEmit) return;
      emit("select", key);
    };
    const activeState = ref(props.state);
    const activeIcon = ref(null);
    watch(
      () => props.state,
      (newVal) => {
        handleSelect(newVal);
      }
    );
    onMounted(() => {
      handleSelect(props.state, true);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "internal-dropdown",
        style: normalizeStyle(getStyle.value)
      }, [
        createVNode(unref(NDropdown), {
          trigger: "click",
          options,
          onSelect: _cache[0] || (_cache[0] = ($event) => handleSelect($event)),
          disabled: __props.isDisabled,
          "content-style": { fontFamily: unref(uiFontFamily) }
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$e, [
              createBaseVNode("div", {
                class: "active-icon",
                innerHTML: activeIcon.value
              }, null, 8, _hoisted_2$8),
              createBaseVNode("div", _hoisted_3$6, toDisplayString(getState.value), 1),
              createBaseVNode("div", {
                class: "dropdown-caret",
                innerHTML: unref(superdocIcons).caretDown
              }, null, 8, _hoisted_4$4)
            ])
          ]),
          _: 1
        }, 8, ["disabled", "content-style"])
      ], 4);
    };
  }
};
const InternalDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-8b9e3b75"]]);
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, "0")}${meridiem}`;
  const formattedDate = `${formattedTime} ${month} ${day}`;
  return formattedDate;
}
const PERMISSIONS = Object.freeze({
  RESOLVE_OWN: "RESOLVE_OWN",
  RESOLVE_OTHER: "RESOLVE_OTHER",
  REJECT_OWN: "REJECT_OWN",
  REJECT_OTHER: "REJECT_OTHER",
  COMMENTS_OVERFLOW_OWN: "COMMENTS_OVERFLOW",
  COMMENTS_OVERFLOW_OTHER: "COMMENTS_OVERFLOW_OTHER",
  COMMENTS_DELETE_OWN: "COMMENTS_DELETE_OWN",
  COMMENTS_DELETE_OTHER: "COMMENTS_DELETE_OTHER",
  UPLOAD_VERSION: "UPLOAD_VERSION",
  VERSION_HISTORY: "VERSION_HISTORY"
});
const ROLES = Object.freeze({
  EDITOR: "editor",
  SUGGESTER: "suggester",
  VIEWER: "viewer"
});
const PERMISSION_MATRIX = Object.freeze({
  [PERMISSIONS.RESOLVE_OWN]: {
    internal: [ROLES.EDITOR],
    external: [ROLES.EDITOR]
  },
  [PERMISSIONS.RESOLVE_OTHER]: {
    internal: [ROLES.EDITOR],
    external: []
  },
  [PERMISSIONS.REJECT_OWN]: {
    internal: [ROLES.EDITOR, ROLES.SUGGESTER],
    external: [ROLES.EDITOR, ROLES.SUGGESTER]
  },
  [PERMISSIONS.REJECT_OTHER]: {
    internal: [ROLES.EDITOR],
    external: []
  },
  [PERMISSIONS.COMMENTS_OVERFLOW_OWN]: {
    internal: [ROLES.EDITOR, ROLES.SUGGESTER],
    external: [ROLES.EDITOR, ROLES.SUGGESTER]
  },
  [PERMISSIONS.COMMENTS_OVERFLOW_OTHER]: {
    internal: [ROLES.EDITOR],
    external: []
  },
  [PERMISSIONS.COMMENTS_DELETE_OWN]: {
    internal: [ROLES.EDITOR, ROLES.SUGGESTER],
    external: [ROLES.EDITOR, ROLES.SUGGESTER]
  },
  [PERMISSIONS.COMMENTS_DELETE_OTHER]: {
    internal: [ROLES.EDITOR],
    external: []
  },
  [PERMISSIONS.UPLOAD_VERSION]: {
    internal: [ROLES.EDITOR],
    external: []
  },
  [PERMISSIONS.VERSION_HISTORY]: {
    internal: [ROLES.EDITOR],
    external: []
  }
});
const pickResolver = (context = {}) => {
  if (typeof context.permissionResolver === "function") return context.permissionResolver;
  if (context.superdoc?.config?.modules?.comments?.permissionResolver) {
    const resolver = context.superdoc.config.modules.comments.permissionResolver;
    if (typeof resolver === "function") return resolver;
  }
  if (typeof context.superdoc?.config?.permissionResolver === "function") {
    return context.superdoc.config.permissionResolver;
  }
  return null;
};
const defaultDecisionFor = (permission, role, isInternal) => {
  const internalExternal = isInternal ? "internal" : "external";
  return PERMISSION_MATRIX[permission]?.[internalExternal]?.includes(role) ?? false;
};
const isAllowed = (permission, role, isInternal, context = {}) => {
  const defaultDecision = defaultDecisionFor(permission, role, isInternal);
  const resolver = pickResolver(context);
  if (typeof resolver !== "function") return defaultDecision;
  const decision = resolver({
    permission,
    role,
    isInternal,
    defaultDecision,
    comment: context.comment ?? null,
    currentUser: context.currentUser ?? context.superdoc?.config?.user ?? null,
    superdoc: context.superdoc ?? null,
    trackedChange: context.trackedChange ?? null
  });
  return typeof decision === "boolean" ? decision : defaultDecision;
};
const _hoisted_1$d = { class: "card-section comment-header" };
const _hoisted_2$7 = { class: "comment-header-left" };
const _hoisted_3$5 = { class: "user-info" };
const _hoisted_4$3 = { class: "user-name" };
const _hoisted_5$2 = {
  key: 0,
  class: "user-timestamp"
};
const _hoisted_6$1 = { class: "overflow-menu" };
const _hoisted_7$1 = ["innerHTML"];
const _hoisted_8$1 = ["innerHTML"];
const _hoisted_9$1 = ["innerHTML"];
const _sfc_main$e = {
  __name: "CommentHeader",
  props: {
    timestamp: {
      type: Number,
      required: false
    },
    config: {
      type: Object,
      required: true
    },
    comment: {
      type: Object,
      required: false
    },
    isPendingInput: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["resolve", "reject", "overflow-select"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const commentsStore = useCommentsStore();
    const props = __props;
    const { proxy } = getCurrentInstance();
    const role = proxy.$superdoc.config.role;
    const isInternal = proxy.$superdoc.config.isInternal;
    const isOwnComment = props.comment.creatorEmail === proxy.$superdoc.config.user.email;
    const { uiFontFamily } = useUiFontFamily();
    const OVERFLOW_OPTIONS = Object.freeze({
      edit: { label: "Edit", key: "edit" },
      delete: { label: "Delete", key: "delete" }
    });
    const generallyAllowed = computed(() => {
      if (!props.comment) return false;
      if (props.comment.resolvedTime) return false;
      if (commentsStore.pendingComment) return false;
      if (props.isPendingInput) return false;
      return true;
    });
    const allowResolve = computed(() => {
      if (!generallyAllowed.value) return false;
      if (props.comment.parentCommentId) return false;
      const context = {
        comment: props.comment,
        currentUser: proxy.$superdoc.config.user,
        superdoc: proxy.$superdoc
      };
      if (isOwnComment || props.comment.trackedChange) {
        return isAllowed(PERMISSIONS.RESOLVE_OWN, role, isInternal, context);
      } else {
        return isAllowed(PERMISSIONS.RESOLVE_OTHER, role, isInternal, context);
      }
    });
    const allowReject = computed(() => {
      if (!generallyAllowed.value) return false;
      if (!props.comment.trackedChange) return false;
      const context = {
        comment: props.comment,
        currentUser: proxy.$superdoc.config.user,
        superdoc: proxy.$superdoc
      };
      if (isOwnComment || props.comment.trackedChange) {
        return isAllowed(PERMISSIONS.REJECT_OWN, role, isInternal, context);
      } else {
        return isAllowed(PERMISSIONS.REJECT_OTHER, role, isInternal, context);
      }
    });
    const allowOverflow = computed(() => {
      if (!generallyAllowed.value) return false;
      if (props.comment.trackedChange) return false;
      if (props.isPendingInput) return false;
      if (getOverflowOptions.value.length === 0) return false;
      return true;
    });
    const getOverflowOptions = computed(() => {
      if (!generallyAllowed.value) return false;
      const allowedOptions = [];
      const options = /* @__PURE__ */ new Set();
      if (props.comment.creatorEmail === proxy.$superdoc.config.user.email) {
        options.add("edit");
      }
      const isOwnComment2 = props.comment.creatorEmail === proxy.$superdoc.config.user.email;
      const context = {
        comment: props.comment,
        currentUser: proxy.$superdoc.config.user,
        superdoc: proxy.$superdoc
      };
      if (isOwnComment2 && isAllowed(PERMISSIONS.COMMENTS_DELETE_OWN, role, isInternal, context)) {
        options.add("delete");
      } else if (!isOwnComment2 && isAllowed(PERMISSIONS.COMMENTS_DELETE_OTHER, role, isInternal, context)) {
        options.add("delete");
      }
      options.forEach((option) => allowedOptions.push(OVERFLOW_OPTIONS[option]));
      return allowedOptions;
    });
    const handleResolve = () => emit("resolve");
    const handleReject = () => emit("reject");
    const handleSelect = (value) => emit("overflow-select", value);
    const getCurrentUser = computed(() => {
      if (props.isPendingInput) return proxy.$superdoc.config.user;
      return props.comment.getCommentUser();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        createBaseVNode("div", _hoisted_2$7, [
          createVNode(Avatar, {
            user: getCurrentUser.value,
            class: "avatar"
          }, null, 8, ["user"]),
          createBaseVNode("div", _hoisted_3$5, [
            createBaseVNode("div", _hoisted_4$3, toDisplayString(getCurrentUser.value.name), 1),
            props.comment.createdTime ? (openBlock(), createElementBlock("div", _hoisted_5$2, toDisplayString(unref(formatDate)(props.comment.createdTime)), 1)) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_6$1, [
          allowResolve.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "overflow-menu__icon",
            innerHTML: unref(superdocIcons).markDone,
            onClick: withModifiers(handleResolve, ["stop", "prevent"])
          }, null, 8, _hoisted_7$1)) : createCommentVNode("", true),
          allowReject.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "overflow-menu__icon",
            innerHTML: unref(superdocIcons).rejectChange,
            onClick: withModifiers(handleReject, ["stop", "prevent"])
          }, null, 8, _hoisted_8$1)) : createCommentVNode("", true),
          allowOverflow.value ? (openBlock(), createBlock(unref(NDropdown), {
            key: 2,
            trigger: "click",
            options: getOverflowOptions.value,
            onSelect: handleSelect,
            "content-style": { fontFamily: unref(uiFontFamily) }
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: "overflow-menu__icon",
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop", "prevent"]))
              }, [
                createBaseVNode("div", {
                  class: "overflow-icon",
                  innerHTML: unref(superdocIcons).overflow
                }, null, 8, _hoisted_9$1)
              ])
            ]),
            _: 1
          }, 8, ["options", "content-style"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const CommentHeader = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-5e404f08"]]);
const _hoisted_1$c = { class: "input-section" };
const _sfc_main$d = {
  __name: "CommentInput",
  props: {
    users: {
      type: Array,
      required: false,
      default: () => []
    },
    config: {
      type: Object,
      required: true
    },
    isFocused: {
      type: Boolean,
      default: false
    },
    includeHeader: {
      type: Boolean,
      default: true
    },
    comment: {
      type: Object,
      required: false
    }
  },
  emits: ["focus"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    useSuperdocStore();
    const commentsStore = useCommentsStore();
    const { currentCommentText } = storeToRefs(commentsStore);
    const handleFocusChange = (focused) => emit("focus", focused);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        __props.includeHeader ? (openBlock(), createBlock(CommentHeader, {
          key: 0,
          config: __props.config,
          comment: __props.comment,
          "is-pending-input": true
        }, null, 8, ["config", "comment"])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["comment-entry", { "sd-input-active": __props.isFocused }])
        }, [
          createVNode(unref(SuperInput), {
            class: "superdoc-field",
            placeholder: "Add a comment",
            modelValue: unref(currentCommentText),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(currentCommentText) ? currentCommentText.value = $event : null),
            users: __props.users,
            onFocus: _cache[1] || (_cache[1] = ($event) => handleFocusChange(true)),
            onBlur: _cache[2] || (_cache[2] = ($event) => handleFocusChange(false))
          }, null, 8, ["modelValue", "users"])
        ], 2)
      ]);
    };
  }
};
const CommentInput = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-5e1f953a"]]);
const _hoisted_1$b = {
  key: 0,
  class: "existing-internal-input"
};
const _hoisted_2$6 = {
  key: 0,
  class: "card-section comment-body"
};
const _hoisted_3$4 = { class: "tracked-change" };
const _hoisted_4$2 = { class: "tracked-change" };
const _hoisted_5$1 = { key: 0 };
const _hoisted_6 = { class: "tracked-change-text" };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { class: "tracked-change-text" };
const _hoisted_9 = { key: 2 };
const _hoisted_10 = { class: "tracked-change-text" };
const _hoisted_11 = {
  key: 1,
  class: "card-section comment-body"
};
const _hoisted_12 = ["innerHTML"];
const _hoisted_13 = {
  key: 1,
  class: "comment"
};
const _hoisted_14 = {
  key: 2,
  class: "comment-editing"
};
const _hoisted_15 = { class: "comment-footer" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = ["onClick"];
const _hoisted_18 = {
  key: 2,
  class: "comment-separator"
};
const _hoisted_19 = { key: 1 };
const _hoisted_20 = {
  key: 0,
  class: "comment-footer"
};
const _hoisted_21 = ["disabled"];
const _sfc_main$c = {
  __name: "CommentDialog",
  props: {
    comment: {
      type: Object,
      required: true
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Object,
      required: false
    }
  },
  emits: ["click-outside", "ready", "dialog-exit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const { proxy } = getCurrentInstance();
    proxy.$superdoc.config.role;
    props.comment.email;
    const superdocStore = useSuperdocStore();
    const commentsStore = useCommentsStore();
    const { addComment, cancelComment, deleteComment, removePendingComment } = commentsStore;
    const {
      suppressInternalExternal,
      getConfig,
      activeComment,
      floatingCommentsOffset,
      pendingComment,
      currentCommentText,
      isDebugging,
      editingCommentId,
      editorCommentPositions,
      isCommentHighlighted
    } = storeToRefs(commentsStore);
    const { activeZoom } = storeToRefs(superdocStore);
    const isInternal = ref(true);
    ref(false);
    const commentInput = ref(null);
    const commentDialogElement = ref(null);
    const isActiveComment = computed(() => activeComment.value === props.comment.commentId);
    const showButtons = computed(() => {
      return !getConfig.readOnly && isActiveComment.value && !props.comment.resolvedTime && editingCommentId.value !== props.comment.commentId;
    });
    const showSeparator = computed(() => (index) => {
      if (showInputSection.value && index === comments.value.length - 1) return true;
      return comments.value.length > 1 && index !== comments.value.length - 1;
    });
    const showInputSection = computed(() => {
      return !getConfig.readOnly && isActiveComment.value && !props.comment.resolvedTime && editingCommentId.value !== props.comment.commentId;
    });
    const isRangeThreadedComment = (comment) => {
      if (!comment) return false;
      return comment.threadingStyleOverride === "range-based" || comment.threadingMethod === "range-based" || comment.originalXmlStructure?.hasCommentsExtended === false;
    };
    const collectTrackedChangeThread = (parentComment, allComments) => {
      const trackedChangeId = parentComment.commentId;
      const threadIds = /* @__PURE__ */ new Set([trackedChangeId]);
      const queue = [];
      allComments.forEach((comment) => {
        if (comment.commentId === trackedChangeId) return;
        const isDirectChild = comment.parentCommentId === trackedChangeId;
        const isRangeBasedTrackedChangeComment = comment.trackedChangeParentId === trackedChangeId && isRangeThreadedComment(comment);
        if (isDirectChild || isRangeBasedTrackedChangeComment) {
          threadIds.add(comment.commentId);
          queue.push(comment.commentId);
        }
      });
      for (let i = 0; i < queue.length; i += 1) {
        const parentId = queue[i];
        allComments.forEach((comment) => {
          if (comment.parentCommentId === parentId && !threadIds.has(comment.commentId)) {
            threadIds.add(comment.commentId);
            queue.push(comment.commentId);
          }
        });
      }
      return allComments.filter((comment) => threadIds.has(comment.commentId));
    };
    const comments = computed(() => {
      const parentComment = props.comment;
      const allComments = commentsStore.commentsList;
      const threadComments = parentComment.trackedChange ? collectTrackedChangeThread(parentComment, allComments) : allComments.filter((comment) => {
        const isThreadedComment = comment.parentCommentId === parentComment.commentId;
        const isThisComment = comment.commentId === parentComment.commentId;
        return isThreadedComment || isThisComment;
      });
      return threadComments.sort((a, b) => {
        if (a.commentId === parentComment.commentId) return -1;
        if (b.commentId === parentComment.commentId) return 1;
        return a.createdTime - b.createdTime;
      });
    });
    const isInternalDropdownDisabled = computed(() => {
      if (props.comment.resolvedTime) return true;
      return getConfig.value.readOnly;
    });
    const isEditingThisComment = computed(() => (comment) => {
      return editingCommentId.value === comment.commentId;
    });
    const shouldShowInternalExternal = computed(() => {
      if (!proxy.$superdoc.config.isInternal) return false;
      return !suppressInternalExternal.value && !props.comment.trackedChange;
    });
    const hasTextContent = computed(() => {
      return currentCommentText.value && currentCommentText.value !== "<p></p>";
    });
    const setFocus = () => {
      const editor = proxy.$superdoc.activeEditor;
      if (!props.comment.resolvedTime) {
        activeComment.value = props.comment.commentId;
        props.comment.setActive(proxy.$superdoc);
      }
      if (editor) {
        const cursorId = props.comment.resolvedTime ? props.comment.commentId : props.comment.importedId || props.comment.commentId;
        editor.commands?.setCursorById(cursorId);
      }
    };
    const handleClickOutside = (e) => {
      const excludedClasses = [
        "n-dropdown-option-body__label",
        "sd-editor-comment-highlight",
        "sd-editor-tracked-change-highlight",
        "track-insert",
        "track-insert-dec",
        "track-delete",
        "track-delete-dec",
        "track-format",
        "track-format-dec"
      ];
      if (excludedClasses.some((className) => e.target.classList.contains(className)) || isCommentHighlighted.value) return;
      if (activeComment.value === props.comment.commentId) {
        floatingCommentsOffset.value = 0;
        emit("dialog-exit");
      }
      activeComment.value = null;
      commentsStore.setActiveComment(proxy.$superdoc, activeComment.value);
      isCommentHighlighted.value = false;
    };
    const handleAddComment = () => {
      const options = {
        documentId: props.comment.fileId,
        isInternal: pendingComment.value ? pendingComment.value.isInternal : isInternal.value,
        parentCommentId: pendingComment.value ? null : props.comment.commentId
      };
      if (pendingComment.value) {
        const selection = pendingComment.value.selection.getValues();
        options.selection = selection;
      }
      const comment = commentsStore.getPendingComment(options);
      addComment({ superdoc: proxy.$superdoc, comment });
    };
    const handleReject = () => {
      if (props.comment.trackedChange) {
        props.comment.resolveComment({
          email: superdocStore.user.email,
          name: superdocStore.user.name,
          superdoc: proxy.$superdoc
        });
        proxy.$superdoc.activeEditor.commands.rejectTrackedChangeById(props.comment.commentId);
      } else {
        commentsStore.deleteComment({ superdoc: proxy.$superdoc, commentId: props.comment.commentId });
      }
      nextTick(() => {
        commentsStore.lastUpdate = /* @__PURE__ */ new Date();
        activeComment.value = null;
        commentsStore.setActiveComment(proxy.$superdoc, activeComment.value);
      });
    };
    const handleResolve = () => {
      if (props.comment.trackedChange) {
        proxy.$superdoc.activeEditor.commands.acceptTrackedChangeById(props.comment.commentId);
      }
      props.comment.resolveComment({
        email: superdocStore.user.email,
        name: superdocStore.user.name,
        superdoc: proxy.$superdoc
      });
      nextTick(() => {
        commentsStore.lastUpdate = /* @__PURE__ */ new Date();
        activeComment.value = null;
        commentsStore.setActiveComment(proxy.$superdoc, activeComment.value);
      });
    };
    const handleOverflowSelect = (value, comment) => {
      switch (value) {
        case "edit":
          currentCommentText.value = comment.commentText;
          activeComment.value = comment.commentId;
          editingCommentId.value = comment.commentId;
          commentsStore.setActiveComment(proxy.$superdoc, activeComment.value);
          break;
        case "delete":
          deleteComment({ superdoc: proxy.$superdoc, commentId: comment.commentId });
          break;
      }
    };
    const handleCommentUpdate = (comment) => {
      editingCommentId.value = null;
      comment.setText({ text: currentCommentText.value, superdoc: proxy.$superdoc });
      removePendingComment(proxy.$superdoc);
    };
    const handleInternalExternalSelect = (value) => {
      const isPendingComment = !!pendingComment.value;
      const isInternal2 = value.toLowerCase() === "internal";
      if (!isPendingComment) props.comment.setIsInternal({ isInternal: isInternal2, superdoc: proxy.$superdoc });
      else pendingComment.value.isInternal = isInternal2;
    };
    const getSidebarCommentStyle = computed(() => {
      const style2 = {};
      props.comment;
      if (isActiveComment.value) {
        style2.backgroundColor = "white";
        style2.zIndex = 50;
      }
      if (pendingComment.value && pendingComment.value.commentId === props.comment.commentId) {
        const top = Math.max(96, pendingComment.value.selection?.selectionBounds.top - 50);
        style2.position = "absolute";
        style2.top = top + "px";
      }
      return style2;
    });
    const getProcessedDate = (timestamp) => {
      const isString = typeof timestamp === "string";
      return isString ? new Date(timestamp).getTime() : timestamp;
    };
    const handleCancel = (comment) => {
      editingCommentId.value = null;
      cancelComment(proxy.$superdoc);
    };
    const usersFiltered = computed(() => {
      const users = proxy.$superdoc.users;
      if (props.comment.isInternal === true) {
        return users.filter((user) => user.access?.role === "internal");
      }
      return users;
    });
    onMounted(() => {
      if (props.autoFocus) {
        nextTick(() => setFocus());
      }
      nextTick(() => {
        const commentId = props.comment.importedId !== void 0 ? props.comment.importedId : props.comment.commentId;
        emit("ready", { commentId, elementRef: commentDialogElement });
      });
    });
    return (_ctx, _cache) => {
      const _directive_click_outside = resolveDirective("click-outside");
      return withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass(["comments-dialog", { "is-active": isActiveComment.value, "is-resolved": props.comment.resolvedTime }]),
        onClick: withModifiers(setFocus, ["stop", "prevent"]),
        style: normalizeStyle(getSidebarCommentStyle.value),
        ref_key: "commentDialogElement",
        ref: commentDialogElement,
        role: "dialog"
      }, [
        shouldShowInternalExternal.value ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
          createVNode(InternalDropdown, {
            onClick: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["stop", "prevent"])),
            class: "internal-dropdown",
            "is-disabled": isInternalDropdownDisabled.value,
            state: __props.comment.isInternal ? "internal" : "external",
            onSelect: handleInternalExternalSelect
          }, null, 8, ["is-disabled", "state"])
        ])) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(comments.value, (comment, index) => {
          return openBlock(), createElementBlock("div", {
            key: index,
            class: "conversation-item"
          }, [
            createVNode(CommentHeader, {
              config: unref(getConfig),
              timestamp: getProcessedDate(comment.createdTime),
              comment,
              onResolve: handleResolve,
              onReject: handleReject,
              onOverflowSelect: ($event) => handleOverflowSelect($event, comment)
            }, null, 8, ["config", "timestamp", "comment", "onOverflowSelect"]),
            comment.trackedChange ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
              createBaseVNode("div", _hoisted_3$4, [
                createBaseVNode("div", _hoisted_4$2, [
                  comment.trackedChangeType === "trackFormat" ? (openBlock(), createElementBlock("div", _hoisted_5$1, [
                    _cache[2] || (_cache[2] = createBaseVNode("span", { class: "change-type" }, "Format: ", -1)),
                    createBaseVNode("span", _hoisted_6, toDisplayString(comment.trackedChangeText), 1)
                  ])) : createCommentVNode("", true),
                  comment.trackedChangeText && comment.trackedChangeType !== "trackFormat" ? (openBlock(), createElementBlock("div", _hoisted_7, [
                    _cache[3] || (_cache[3] = createBaseVNode("span", { class: "change-type" }, "Added: ", -1)),
                    createBaseVNode("span", _hoisted_8, toDisplayString(comment.trackedChangeText), 1)
                  ])) : createCommentVNode("", true),
                  comment.deletedText && comment.trackedChangeType !== "trackFormat" ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    _cache[4] || (_cache[4] = createBaseVNode("span", { class: "change-type" }, "Deleted: ", -1)),
                    createBaseVNode("span", _hoisted_10, toDisplayString(comment.deletedText), 1)
                  ])) : createCommentVNode("", true)
                ])
              ])
            ])) : createCommentVNode("", true),
            !comment.trackedChange ? (openBlock(), createElementBlock("div", _hoisted_11, [
              !unref(isDebugging) && !isEditingThisComment.value(comment) ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "comment",
                innerHTML: comment.commentText
              }, null, 8, _hoisted_12)) : unref(isDebugging) && !isEditingThisComment.value(comment) ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(unref(editorCommentPositions)[comment.importedId !== void 0 ? comment.importedId : comment.commentId]?.bounds), 1)) : (openBlock(), createElementBlock("div", _hoisted_14, [
                createVNode(CommentInput, {
                  users: usersFiltered.value,
                  config: unref(getConfig),
                  "include-header": false,
                  comment
                }, null, 8, ["users", "config", "comment"]),
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("button", {
                    class: "sd-button",
                    onClick: withModifiers(($event) => handleCancel(), ["stop", "prevent"])
                  }, "Cancel", 8, _hoisted_16),
                  createBaseVNode("button", {
                    class: "sd-button primary",
                    onClick: withModifiers(($event) => handleCommentUpdate(comment), ["stop", "prevent"])
                  }, "Update", 8, _hoisted_17)
                ])
              ]))
            ])) : createCommentVNode("", true),
            showSeparator.value(index) ? (openBlock(), createElementBlock("div", _hoisted_18)) : createCommentVNode("", true)
          ]);
        }), 128)),
        showInputSection.value && !unref(getConfig).readOnly ? (openBlock(), createElementBlock("div", _hoisted_19, [
          createVNode(CommentInput, {
            ref_key: "commentInput",
            ref: commentInput,
            users: usersFiltered.value,
            config: unref(getConfig),
            comment: props.comment
          }, null, 8, ["users", "config", "comment"]),
          showButtons.value && !unref(getConfig).readOnly ? (openBlock(), createElementBlock("div", _hoisted_20, [
            createBaseVNode("button", {
              class: "sd-button",
              onClick: _cache[1] || (_cache[1] = withModifiers((...args) => unref(cancelComment) && unref(cancelComment)(...args), ["stop", "prevent"]))
            }, "Cancel"),
            createBaseVNode("button", {
              class: normalizeClass(["sd-button primary", { disabled: !hasTextContent.value }]),
              onClick: withModifiers(handleAddComment, ["stop", "prevent"]),
              disabled: !hasTextContent.value
            }, " Comment ", 10, _hoisted_21)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 6)), [
        [_directive_click_outside, handleClickOutside]
      ]);
    };
  }
};
const CommentDialog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-664ab253"]]);
const _hoisted_1$a = { class: "comments-list" };
const _hoisted_2$5 = { key: 0 };
const _hoisted_3$3 = { class: "comment-item" };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5 = { class: "comment-item" };
const _sfc_main$b = {
  __name: "commentsList",
  props: {
    showMainComments: {
      type: Boolean,
      default: true
    },
    showResolvedComments: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    useSuperdocStore();
    const commentsStore = useCommentsStore();
    const { COMMENT_EVENTS } = commentsStore;
    const { commentsList, getGroupedComments, isCommentsListVisible } = storeToRefs(commentsStore);
    const { proxy } = getCurrentInstance();
    const shouldShowResolvedComments = computed(() => {
      return props.showResolvedComments && getGroupedComments.value?.resolvedComments?.length > 0;
    });
    onMounted(() => {
      isCommentsListVisible.value = true;
    });
    onBeforeUnmount(() => {
      isCommentsListVisible.value = false;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        __props.showMainComments ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getGroupedComments).parentComments, (comment) => {
            return openBlock(), createElementBlock("div", _hoisted_3$3, [
              createVNode(CommentDialog, { comment }, null, 8, ["comment"])
            ]);
          }), 256))
        ])) : createCommentVNode("", true),
        shouldShowResolvedComments.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "comment-title" }, "Resolved", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getGroupedComments).resolvedComments, (comment) => {
            return openBlock(), createElementBlock("div", _hoisted_5, [
              createVNode(CommentDialog, { comment }, null, 8, ["comment"])
            ]);
          }), 256))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const CommentsList = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-12d3e3dd"]]);
class SuperComments extends EventEmitter {
  element;
  config = {
    comments: [],
    element: null,
    commentsStore: null
  };
  constructor(options, superdoc) {
    super();
    this.config = { ...this.config, ...options };
    this.element = this.config.element;
    this.app = null;
    this.superdoc = superdoc;
    this.open();
  }
  createVueApp() {
    this.app = createApp(CommentsList);
    this.app.directive("click-outside", vClickOutside);
    this.app.config.globalProperties.$superdoc = this.superdoc;
    if (!this.element && this.config.selector) {
      this.element = document.getElementById(this.config.selector);
    }
    this.container = this.app.mount(this.element);
  }
  close() {
    if (this.app) {
      this.app.unmount();
      this.app = null;
      this.container = null;
      this.element = null;
    }
  }
  open() {
    if (!this.app) {
      this.createVueApp();
    }
  }
}
const _hoisted_1$9 = {
  class: "comments-container",
  id: "commentsContainer"
};
const _hoisted_2$4 = { class: "comments-layer" };
const _hoisted_3$2 = ["onClick", "data-id"];
const _sfc_main$a = {
  __name: "CommentsLayer",
  props: {
    user: {
      type: Object,
      required: true
    },
    parent: {
      type: Object,
      required: true
    }
  },
  emits: ["highlight-click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const superdocStore = useSuperdocStore();
    const commentsStore = useCommentsStore();
    const { COMMENT_EVENTS } = commentsStore;
    const { documentsWithConverations, activeComment, floatingCommentsOffset, getGroupedComments } = storeToRefs(commentsStore);
    const { documents, activeZoom } = storeToRefs(superdocStore);
    const { proxy } = getCurrentInstance();
    const emit = __emit;
    const props = __props;
    const addCommentEntry = (selection) => {
      const params = {
        creatorEmail: props.user.email,
        creatorName: props.user.name,
        documentId: selection.documentId,
        selection,
        isFocused: true
      };
      const bounds = selection.selectionBounds;
      if (bounds.top > bounds.bottom) {
        const temp = bounds.top;
        bounds.top = bounds.bottom;
        bounds.bottom = temp;
      }
      if (bounds.left > bounds.right) {
        const temp = bounds.left;
        bounds.left = bounds.right;
        bounds.right = temp;
      }
      selection.selectionBounds = bounds;
      const matchedDocument = documents.value.find((c2) => c2.id === selection.documentId);
      const newConvo = useComment(params);
      activeComment.value = newConvo.commentId;
      matchedDocument.conversations.push(newConvo);
      proxy.$superdoc.emit("comments-update", { type: COMMENT_EVENTS.NEW, comment: newConvo.getValues() });
    };
    const getStyle = (conversation) => {
      const { selection, commentId } = conversation;
      const containerBounds = selection.getContainerLocation(props.parent);
      const placement = conversation.selection.selectionBounds;
      (parseFloat(placement.top) + containerBounds.top) * activeZoom.value;
      const internalHighlightColor = "#078383";
      const externalHighlightColor = "#B1124B";
      let opacity = "33";
      activeComment.value === commentId ? opacity = "66" : "33";
      let fillColor = conversation.isInternal ? internalHighlightColor : externalHighlightColor;
      fillColor += opacity;
      return {
        position: "absolute",
        top: parseFloat(placement.top) + "px",
        left: placement.left + "px",
        width: placement.right - placement.left + "px",
        height: placement.bottom - placement.top + "px",
        backgroundColor: fillColor,
        pointerEvents: conversation.suppressClick ? "none" : "auto"
      };
    };
    const setFloatingCommentOffset = (conversation) => {
      floatingCommentsOffset.value = conversation.selection.selectionBounds.top;
    };
    const activateComment = (comment, e) => {
      comment.isFocused = true;
      activeComment.value = comment.commentId;
      comment.setActive(proxy.$superdoc);
      emit("highlight-click", comment);
    };
    const getCurrentComments = computed(() => {
      return getGroupedComments.value?.parentComments.filter((c2) => c2.selection && c2.selection.selectionBounds?.top).filter((c2) => !c2.resolvedTime).filter((c2) => c2.selection?.source !== "super-editor");
    });
    watch(activeComment, (newVal) => {
      if (!newVal) return;
      const element = document.querySelector(`[data-id="${newVal}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    __expose({
      addCommentEntry,
      activateComment,
      setFloatingCommentOffset
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("div", _hoisted_2$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(getCurrentComments.value, (conversation) => {
            return openBlock(), createElementBlock("div", {
              class: "sd-comment-anchor sd-highlight",
              onClick: withModifiers(($event) => activateComment(conversation), ["stop", "prevent"]),
              "data-id": conversation.commentId,
              style: normalizeStyle(getStyle(conversation))
            }, null, 12, _hoisted_3$2);
          }), 256))
        ])
      ]);
    };
  }
};
const CommentsLayer = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-7d21d613"]]);
const _hoisted_1$8 = { class: "sidebar-container calculation-container" };
const _hoisted_2$3 = ["id"];
const _sfc_main$9 = {
  __name: "FloatingComments",
  props: {
    currentDocument: {
      type: Object,
      required: true
    },
    parent: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    useSuperdocStore();
    const commentsStore = useCommentsStore();
    const { getFloatingComments, hasInitializedLocations, activeComment, commentsList, editorCommentPositions } = storeToRefs(commentsStore);
    const floatingCommentsContainer = ref(null);
    const renderedSizes = ref([]);
    const firstGroupRendered = ref(false);
    const verticalOffset = ref(0);
    const commentsRenderKey = ref(0);
    const measurementTimeoutId = ref(null);
    const getCommentPosition = computed(() => (comment) => {
      if (!floatingCommentsContainer.value) return { top: "0px" };
      if (typeof comment.top !== "number" || isNaN(comment.top)) {
        return { display: "none" };
      }
      return { top: `${comment.top}px` };
    });
    const handleDialog = (dialog) => {
      if (!dialog) return;
      const { elementRef, commentId } = dialog;
      if (!elementRef) return;
      nextTick(() => {
        const id = commentId;
        if (renderedSizes.value.some((item) => item.id == id)) return;
        const comment = getFloatingComments.value.find((c2) => c2.commentId === id || c2.importedId == id);
        const positionKey = id || comment?.importedId;
        const positionEntry = editorCommentPositions.value[positionKey];
        const position = positionEntry?.bounds || {};
        if (props.currentDocument.type === "application/pdf") {
          Object.entries(comment.selection?.selectionBounds).forEach(([key, value]) => {
            position[key] = Number(value);
          });
        }
        if (!position) return;
        const bounds = elementRef.value?.getBoundingClientRect();
        const top = Number(position.top);
        if (!Number.isFinite(top)) return;
        const placement = {
          id,
          top,
          height: bounds.height,
          commentRef: comment,
          elementRef,
          pageIndex: positionEntry?.pageIndex ?? 0
        };
        renderedSizes.value.push(placement);
      });
    };
    const processLocations = async () => {
      const groupedByPage = renderedSizes.value.reduce((acc, comment) => {
        const key = comment.pageIndex ?? 0;
        if (!acc[key]) acc[key] = [];
        acc[key].push(comment);
        return acc;
      }, {});
      Object.values(groupedByPage).forEach((comments) => {
        comments.sort((a, b) => a.top - b.top).forEach((comment, idx, arr) => {
          if (idx === 0) return;
          const prev = arr[idx - 1];
          const minTop = prev.top + prev.height + 15;
          if (comment.top < minTop) {
            comment.top = minTop;
          }
        });
      });
      await nextTick();
      firstGroupRendered.value = true;
    };
    watchEffect(() => {
      if (measurementTimeoutId.value) {
        clearTimeout(measurementTimeoutId.value);
        measurementTimeoutId.value = null;
      }
      const totalComments = getFloatingComments.value.length;
      const measuredComments = renderedSizes.value.length;
      if (totalComments === 0 || measuredComments === 0) {
        return;
      }
      nextTick(processLocations);
    });
    watch(activeComment, (newVal, oldVal) => {
      nextTick(() => {
        if (!activeComment.value) return verticalOffset.value = 0;
        const comment = commentsStore.getComment(activeComment.value);
        if (!comment) return verticalOffset.value = 0;
        const commentKey = comment.commentId || comment.importedId;
        const renderedItem = renderedSizes.value.find((item) => item.id === commentKey);
        if (!renderedItem) return verticalOffset.value = 0;
        const selectionTop = comment.selection.selectionBounds.top;
        const renderedTop = renderedItem.top;
        floatingCommentsContainer.value.getBoundingClientRect();
        verticalOffset.value = selectionTop - renderedTop;
        setTimeout(() => {
          renderedItem.elementRef?.value?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 200);
      });
    });
    onBeforeUnmount(() => {
      if (measurementTimeoutId.value) {
        clearTimeout(measurementTimeoutId.value);
        measurementTimeoutId.value = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "section-wrapper",
        ref_key: "floatingCommentsContainer",
        ref: floatingCommentsContainer
      }, [
        createBaseVNode("div", _hoisted_1$8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(getFloatingComments), (comment) => {
            return openBlock(), createElementBlock("div", {
              key: comment.commentId || comment.importedId
            }, [
              createBaseVNode("div", {
                id: comment.commentId || comment.importedId,
                class: "measure-comment"
              }, [
                (openBlock(), createBlock(CommentDialog, {
                  onReady: handleDialog,
                  key: comment.commentId + commentsRenderKey.value,
                  class: "floating-comment",
                  parent: __props.parent,
                  comment
                }, null, 8, ["parent", "comment"]))
              ], 8, _hoisted_2$3)
            ]);
          }), 128))
        ]),
        firstGroupRendered.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "sidebar-container",
          style: normalizeStyle({ top: verticalOffset.value + "px" })
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(renderedSizes.value, (comment) => {
            return openBlock(), createElementBlock("div", {
              key: comment.id,
              style: normalizeStyle(getCommentPosition.value(comment)),
              class: "floating-comment"
            }, [
              (openBlock(), createBlock(CommentDialog, {
                key: comment.id + commentsRenderKey.value,
                class: "floating-comment",
                parent: __props.parent,
                comment: comment.commentRef
              }, null, 8, ["parent", "comment"]))
            ], 4);
          }), 128))
        ], 4)) : createCommentVNode("", true)
      ], 512);
    };
  }
};
const FloatingComments = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6868516c"]]);
const _sfc_main$8 = {
  __name: "TextField",
  props: {
    field: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    },
    styleOverride: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const getStyle = computed(() => {
      const style2 = { ...props.styleOverride };
      if (!props.isEditing) return style2;
      style2.backgroundColor = "#FFF";
      return style2;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "text-field",
        style: normalizeStyle(getStyle.value)
      }, toDisplayString(__props.field.value || __props.field.placeholder), 5);
    };
  }
};
const TextField = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-f3984d30"]]);
const _hoisted_1$7 = ["innerHTML"];
const _sfc_main$7 = {
  __name: "ParagraphField",
  props: {
    field: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    },
    styleOverride: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(__props) {
    const getStyle = computed(() => {
      return {
        fontSize: "11pt"
      };
    });
    return (_ctx, _cache) => {
      return __props.field.value ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "paragraph-field",
        innerHTML: __props.field.value
      }, null, 8, _hoisted_1$7)) : (openBlock(), createElementBlock("span", {
        key: 1,
        style: normalizeStyle(getStyle.value)
      }, toDisplayString(__props.field.placeholder || __props.field.label), 5));
    };
  }
};
const ParagraphField = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-ce5a87b3"]]);
const _hoisted_1$6 = ["src"];
const _hoisted_2$2 = { key: 1 };
const _sfc_main$6 = {
  __name: "ImageField",
  props: {
    field: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    },
    styleOverride: {
      type: Object,
      required: false,
      default: () => ({})
    },
    optionId: {
      type: String,
      required: true
    },
    noStyle: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const getStyle = computed(() => {
      return {
        maxHeight: props.styleOverride.coordinates?.minHeight,
        maxWidth: props.styleOverride.coordinates?.minWidth
      };
    });
    const imageValue = computed(() => {
      if (props.field.valueGetter && typeof props.field.valueGetter === "function") {
        return props.field.valueGetter({ annotationId: props.optionId });
      }
      if (typeof props.field.value === "string") return props.field.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "image-field",
        style: normalizeStyle(getStyle.value)
      }, [
        __props.field.value && imageValue.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: imageValue.value,
          alt: "image",
          style: normalizeStyle(getStyle.value)
        }, null, 12, _hoisted_1$6)) : !__props.noStyle ? (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(__props.field.placeholder || __props.field.label), 1)) : createCommentVNode("", true)
      ], 4);
    };
  }
};
const ImageField = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-7dd69850"]]);
const _hoisted_1$5 = { class: "checkbox-container" };
const _sfc_main$5 = {
  __name: "CheckboxField",
  props: {
    field: {
      type: Object,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false
    },
    optionId: {
      type: String,
      required: true
    },
    styleOverride: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const getValue = computed(() => {
      const match = props.field.options.find((o) => o.annotationId.includes(props.optionId));
      return match?.checked;
    });
    const getPreviewStyle = computed(() => {
      const borderWidth = 2;
      const width = Number.parseFloat(props.styleOverride?.coordinates?.minWidth || 0) - borderWidth + "px";
      const height = Number.parseFloat(props.styleOverride?.coordinates?.minHeight || 0) - borderWidth + "px";
      const fontSize = parseFloat(width) + "pt";
      return {
        width,
        height,
        fontSize
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        props.isEditing ? (openBlock(), createBlock(unref(NCheckbox), {
          key: 0,
          checked: getValue.value,
          disabled: !props.isEditing
        }, null, 8, ["checked", "disabled"])) : (openBlock(), createElementBlock("div", {
          key: 1,
          class: "checkbox-preview",
          style: normalizeStyle(getPreviewStyle.value)
        }, toDisplayString(getValue.value ? "x" : ""), 5))
      ]);
    };
  }
};
const CheckboxField = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a135a0a5"]]);
const _hoisted_1$4 = { key: 0 };
const _sfc_main$4 = {
  __name: "SelectField",
  props: {
    field: {
      type: Object,
      required: true
    },
    fieldStyle: {
      type: Object,
      required: false,
      default: () => ({})
    },
    styleOverride: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const getStyle = computed(() => {
      if (!props.isEditing) return { ...props.styleOverride };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(getStyle.value),
        class: "select-container"
      }, [
        !props.isEditing ? (openBlock(), createElementBlock("div", _hoisted_1$4, toDisplayString(__props.field.value || __props.field.placeholder), 1)) : createCommentVNode("", true)
      ], 4);
    };
  }
};
const SelectField = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-1e49d9b3"]]);
const floor = (val, precision) => {
  const multiplier = 10 ** precision;
  return Math.floor(val * multiplier) / multiplier;
};
const useHrbrFieldsStore = /* @__PURE__ */ defineStore("hrbr-fields", () => {
  const superdocStore = useSuperdocStore();
  const { documents } = storeToRefs(superdocStore);
  const hrbrFieldsConfig = reactive({
    name: "hrbr-fields"
  });
  const fieldComponentsMap = Object.freeze({
    TEXTINPUT: markRaw(TextField),
    HTMLINPUT: markRaw(ParagraphField),
    SELECT: markRaw(SelectField),
    CHECKBOXINPUT: markRaw(CheckboxField),
    SIGNATUREINPUT: markRaw(ImageField),
    IMAGEINPUT: markRaw(ImageField)
  });
  const getField = (documentId, fieldId) => {
    const doc = documents.value.find((d) => d.id === documentId);
    if (!doc) return;
    const field = doc.fields.find((f) => f.id === fieldId);
    if (field) return field;
  };
  const getAnnotations = computed(() => {
    const mappedAnnotations = [];
    documents.value.forEach((doc) => {
      const { id, annotations } = doc;
      const docContainer = doc.container;
      if (!docContainer) return;
      const bounds = docContainer.getBoundingClientRect();
      const pageBoundsMap = doc.pageContainers;
      if (!bounds || !pageBoundsMap) return;
      annotations.forEach((annotation) => {
        const { itemid: fieldId, page, nostyle } = annotation;
        let annotationId = annotation.pageannotation;
        if (annotation.itemfieldtype === "CHECKBOXINPUT") {
          annotationId = annotation.annotationid;
        }
        const { x1, y1, x2, y2 } = annotation;
        const coordinates = { x1, y1, x2, y2 };
        const pageContainer = document.getElementById(`${id}-page-${page + 1}`);
        if (!pageContainer) return;
        const pageBounds = pageContainer.getBoundingClientRect();
        const pageInfo = doc.pageContainers.find((p) => p.page === page);
        const scale = pageBounds.height / pageInfo.containerBounds.originalHeight;
        const pageBottom = pageBounds.bottom - bounds.top;
        const pageLeft = pageBounds.left - bounds.left;
        const mappedCoordinates = _mapAnnotation(coordinates, scale, pageBottom, pageLeft);
        const annotationStyle = {
          fontSize: floor(annotation.original_font_size * scale, 2) + "pt",
          fontFamily: annotation.fontfamily || "Arial",
          originalFontSize: floor(annotation.original_font_size * scale, 2),
          coordinates: mappedCoordinates
        };
        const field = {
          documentId: id,
          fieldId,
          page,
          annotationId,
          originalAnnotationId: annotation.originalannotationid,
          coordinates: mappedCoordinates,
          style: annotationStyle,
          nostyle: nostyle ?? false
        };
        mappedAnnotations.push(field);
      });
    });
    return mappedAnnotations;
  });
  const _mapAnnotation = (coordinates, scale, pageBottom, boundsLeft) => {
    const { x1, y1, x2, y2 } = coordinates;
    const mappedX1 = x1 * scale;
    const mappedY1 = y1 * scale;
    const mappedX2 = x2 * scale;
    const mappedY2 = y2 * scale;
    return {
      top: `${pageBottom - mappedY2}px`,
      left: `${mappedX1 + boundsLeft}px`,
      minWidth: `${mappedX2 - mappedX1}px`,
      minHeight: `${mappedY2 - mappedY1}px`
    };
  };
  return {
    hrbrFieldsConfig,
    fieldComponentsMap,
    // Getters
    getAnnotations,
    getField
  };
});
const _hoisted_1$3 = { class: "main-container" };
const _sfc_main$3 = {
  __name: "HrbrFieldsLayer",
  props: {
    fields: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const hrbrFieldsStore = useHrbrFieldsStore();
    const { getAnnotations } = storeToRefs(hrbrFieldsStore);
    const { fieldComponentsMap, getField } = hrbrFieldsStore;
    const getStyle = computed(() => (entry) => {
      const { coordinates, field } = entry;
      const adjustTypes = ["TEXTINPUT", "SELECT"];
      if (adjustTypes.includes(field.fieldType)) {
        const top = coordinates.top.split("px")[0];
        const newTop = top - 4;
        coordinates.top = `${newTop}px`;
      }
      const widthAdjustTypes = ["HTMLINPUT"];
      if (widthAdjustTypes.includes(field.fieldType)) {
        const scaleFactor = 1.3362445414847162;
        const minWidthNum = coordinates.minWidth.split("px")[0];
        const newWidth = minWidthNum / scaleFactor;
        coordinates.width = `${newWidth}px`;
      }
      return {
        position: "absolute",
        //field,
        ...coordinates,
        lineHeight: 1
      };
    });
    const getAnnotationWithField = computed(() => {
      const annotationsWithFields = [];
      getAnnotations.value.forEach((annotation) => {
        const field = getField(annotation.documentId, annotation.fieldId);
        if (!field) return;
        annotationsWithFields.push({ ...annotation, field });
      });
      return annotationsWithFields;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(getAnnotationWithField.value, (entry) => {
          return openBlock(), createElementBlock("div", {
            style: normalizeStyle(getStyle.value(entry)),
            class: normalizeClass(["field-container", { "field-container--no-style": entry.nostyle }])
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(unref(fieldComponentsMap)[entry.field.fieldType]), {
              class: "field-component",
              field: entry.field,
              "style-override": entry.style,
              "option-id": entry.originalAnnotationId,
              "no-style": entry.nostyle,
              "is-editing": false
            }, null, 8, ["field", "style-override", "option-id", "no-style"]))
          ], 6);
        }), 256))
      ]);
    };
  }
};
const HrbrFieldsLayer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-22e6ae02"]]);
const _hoisted_1$2 = { class: "superdoc-html-viewer" };
const _hoisted_2$1 = { class: "superdoc-html-viewer__document" };
const _hoisted_3$1 = ["innerHTML"];
const _sfc_main$2 = {
  __name: "HtmlViewer",
  props: {
    fileSource: {
      type: [File, Blob],
      required: true
    },
    documentId: {
      type: String,
      required: true
    }
  },
  emits: ["ready", "selection-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const documentContent = ref("");
    const emit = __emit;
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      console.debug("selection from html viewer", selection);
      emit("selection-change", selection);
    };
    const getDocumentHtml = (fileSource) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const htmlString = e.target.result;
          resolve(htmlString);
        };
        reader.onerror = (e) => reject(e);
        reader.readAsText(fileSource);
      });
    };
    const initViewer = async () => {
      try {
        const documentHtml = await getDocumentHtml(props.fileSource);
        documentContent.value = documentHtml;
        emit("ready", props.documentId);
      } catch (error) {
        emit("error", error);
        console.error("Error loading document", error);
      }
    };
    onMounted(() => {
      initViewer();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", {
            class: "superdoc-html-viewer__content",
            innerHTML: documentContent.value,
            onMouseup: handleSelectionChange
          }, null, 40, _hoisted_3$1)
        ])
      ]);
    };
  }
};
const HtmlViewer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-da3494ba"]]);
const _hoisted_1$1 = {
  class: "ai-highlight-container",
  id: "aiHighlightContainer"
};
const _sfc_main$1 = {
  __name: "AiLayer",
  props: {
    editor: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const superdocStore = useSuperdocStore();
    const highlightLayer = ref(null);
    const getStyle = () => {
      const placement = superdocStore.activeSelection.selectionBounds;
      return {
        position: "absolute",
        top: parseFloat(placement.top) + "px",
        left: placement.left + "px",
        width: placement.right - placement.left + "px",
        height: placement.bottom - placement.top + "px",
        backgroundColor: "#6366f133",
        pointerEvents: "none"
      };
    };
    const addAiHighlight = () => {
      if (props.editor && !props.editor.isDestroyed) {
        props.editor.commands.insertAiMark();
      } else {
        if (highlightLayer.value && !highlightLayer.value.hasChildNodes()) {
          const highlightDiv = document.createElement("div");
          highlightDiv.className = "ai-highlight-anchor sd-highlight";
          Object.assign(highlightDiv.style, getStyle());
          highlightLayer.value.appendChild(highlightDiv);
        }
      }
    };
    const updateAiHighlight = () => {
      if (props.editor && !props.editor.isDestroyed) {
        props.editor.commands.updateAiHighlightStyle("sd-ai-highlight-pulse");
      } else {
        if (highlightLayer.value) {
          const highlights = highlightLayer.value.querySelectorAll(".ai-highlight-anchor");
          Array.from(highlights).forEach((highlight) => {
            highlight.classList.add("sd-ai-highlight-pulse");
          });
        }
      }
    };
    const removeAiHighlight = () => {
      if (props.editor && !props.editor.isDestroyed) {
        props.editor.commands.removeAiMark();
      }
      if (highlightLayer.value) {
        highlightLayer.value.innerHTML = "";
      }
    };
    __expose({
      addAiHighlight,
      removeAiHighlight,
      updateAiHighlight
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", {
          class: "ai-highlight-layer",
          ref_key: "highlightLayer",
          ref: highlightLayer
        }, null, 512)
      ]);
    };
  }
};
const AiLayer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-497b8118"]]);
function useSelectedText(editorRef) {
  const selectedText = computed(() => {
    const editor = editorRef.value;
    if (!editor || !editor.state) return "";
    return editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, " ");
  });
  return {
    selectedText
  };
}
function useAi({ activeEditorRef }) {
  const showAiLayer = ref(false);
  const showAiWriter = ref(false);
  const aiWriterPosition = reactive({ top: 0, left: 0 });
  const aiLayer = ref(null);
  const showAiWriterAtCursor = () => {
    const editor = activeEditorRef.value;
    if (!editor || editor.isDestroyed) {
      console.error("[useAi] Editor not available");
      return;
    }
    try {
      const { view } = editor;
      const { selection } = view.state;
      if (!selection.empty) {
        editor.commands.insertAiMark();
      }
      let coords;
      try {
        coords = view.coordsAtPos(selection.$head.pos);
      } catch {
        const domSelection = window.getSelection();
        if (domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          coords = { top: rect.top, left: rect.left };
        } else {
          const editorRect = view.dom.getBoundingClientRect();
          coords = { top: editorRect.top + 50, left: editorRect.left + 50 };
        }
      }
      aiWriterPosition.top = coords.top + 30 + "px";
      aiWriterPosition.left = coords.left + "px";
      showAiWriter.value = true;
    } catch (error) {
      console.error("[useAi] Error displaying AIWriter:", error);
      try {
        const editorDom = activeEditorRef.value.view.dom;
        const rect = editorDom.getBoundingClientRect();
        aiWriterPosition.top = rect.top + 100 + "px";
        aiWriterPosition.left = rect.left + 100 + "px";
        showAiWriter.value = true;
      } catch (e) {
        console.error("[useAi] Failed to get fallback position:", e);
      }
    }
  };
  const handleAiWriterClose = () => {
    showAiWriter.value = false;
  };
  const initAiLayer = (value = true) => {
    showAiLayer.value = value;
  };
  const handleAiToolClick = () => {
    const editor = activeEditorRef.value;
    if (!editor || editor.isDestroyed) {
      console.error("[useAi] Editor not available");
      return;
    }
    editor.commands.insertAiMark();
    showAiWriterAtCursor();
  };
  return {
    // State
    showAiLayer,
    showAiWriter,
    aiWriterPosition,
    aiLayer,
    // Methods
    initAiLayer,
    showAiWriterAtCursor,
    handleAiWriterClose,
    handleAiToolClick
  };
}
const isHighContrastMode = ref(false);
function useHighContrastMode() {
  const setHighContrastMode = (value) => {
    isHighContrastMode.value = value;
  };
  return {
    isHighContrastMode,
    setHighContrastMode
  };
}
const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { class: "superdoc__document document" };
const _hoisted_3 = {
  key: 0,
  class: "superdoc__right-sidebar right-sidebar"
};
const _hoisted_4 = { class: "floating-comments" };
const _sfc_main = {
  __name: "SuperDoc",
  emits: ["selection-update"],
  setup(__props, { emit: __emit }) {
    const PdfViewer = defineAsyncComponent(() => import("./PdfViewer-_jQUqH0-.es.js"));
    const superdocStore = useSuperdocStore();
    const commentsStore = useCommentsStore();
    const {
      documents,
      isReady,
      areDocumentsReady,
      selectionPosition,
      activeSelection,
      activeZoom
    } = storeToRefs(superdocStore);
    const { handlePageReady, modules, user, getDocument } = superdocStore;
    const {
      getConfig,
      documentsWithConverations,
      commentsList,
      pendingComment,
      activeComment,
      skipSelectionUpdate,
      commentsByDocument,
      isCommentsListVisible,
      isFloatingCommentsReady,
      generalCommentIds,
      getFloatingComments,
      hasSyncedCollaborationComments,
      editorCommentPositions,
      hasInitializedLocations,
      isCommentHighlighted
    } = storeToRefs(commentsStore);
    const {
      showAddComment,
      handleEditorLocationsUpdate,
      handleTrackedChangeUpdate,
      addComment,
      getComment,
      COMMENT_EVENTS
    } = commentsStore;
    const { proxy } = getCurrentInstance();
    commentsStore.proxy = proxy;
    const { isHighContrastMode: isHighContrastMode2 } = useHighContrastMode();
    const { uiFontFamily } = useUiFontFamily();
    const isViewingMode = () => proxy?.$superdoc?.config?.documentMode === "viewing";
    const isViewingCommentsVisible = computed(
      () => isViewingMode() && proxy?.$superdoc?.config?.comments?.visible === true
    );
    const isViewingTrackChangesVisible = computed(
      () => isViewingMode() && proxy?.$superdoc?.config?.trackChanges?.visible === true
    );
    const shouldRenderCommentsInViewing = computed(() => {
      if (!isViewingMode()) return true;
      return isViewingCommentsVisible.value || isViewingTrackChangesVisible.value;
    });
    const commentsModuleConfig = computed(() => {
      const config = modules.comments;
      if (config === false || config == null) return null;
      return config;
    });
    const superdocStyleVars = computed(() => {
      const vars = {
        "--sd-ui-font-family": uiFontFamily.value
      };
      const commentsConfig = proxy.$superdoc.config.modules?.comments;
      if (!commentsConfig || commentsConfig === false) return vars;
      if (commentsConfig.highlightHoverColor) {
        vars["--sd-comment-highlight-hover"] = commentsConfig.highlightHoverColor;
      }
      const trackChangeColors = commentsConfig.trackChangeHighlightColors || {};
      const activeTrackChangeColors = {
        ...trackChangeColors,
        ...commentsConfig.trackChangeActiveHighlightColors || {}
      };
      if (activeTrackChangeColors.insertBorder) vars["--sd-track-insert-border"] = activeTrackChangeColors.insertBorder;
      if (activeTrackChangeColors.insertBackground) vars["--sd-track-insert-bg"] = activeTrackChangeColors.insertBackground;
      if (activeTrackChangeColors.deleteBorder) vars["--sd-track-delete-border"] = activeTrackChangeColors.deleteBorder;
      if (activeTrackChangeColors.deleteBackground) vars["--sd-track-delete-bg"] = activeTrackChangeColors.deleteBackground;
      if (activeTrackChangeColors.formatBorder) vars["--sd-track-format-border"] = activeTrackChangeColors.formatBorder;
      return vars;
    });
    const layers = ref(null);
    const commentsLayer = ref(null);
    const toolsMenuPosition = reactive({ top: null, right: "-25px", zIndex: 101 });
    const activeEditorRef = computed(() => proxy.$superdoc.activeEditor);
    const { selectedText } = useSelectedText(activeEditorRef);
    const {
      showAiLayer,
      showAiWriter,
      aiWriterPosition,
      aiLayer,
      initAiLayer,
      handleAiWriterClose,
      handleAiToolClick
    } = useAi({
      activeEditorRef
    });
    const hrbrFieldsLayer = ref(null);
    const pdfConfig = proxy.$superdoc.config.modules?.pdf || {};
    const handleDocumentReady = (documentId, container) => {
      const doc = getDocument(documentId);
      doc.isReady = true;
      doc.container = container;
      if (areDocumentsReady.value) {
        if (!proxy.$superdoc.config.collaboration) isReady.value = true;
      }
      isFloatingCommentsReady.value = true;
      hasInitializedLocations.value = true;
      proxy.$superdoc.broadcastPdfDocumentReady();
    };
    const handleToolClick = (tool) => {
      const toolOptions = {
        comments: () => showAddComment(proxy.$superdoc),
        ai: () => handleAiToolClick()
      };
      if (tool in toolOptions) {
        toolOptions[tool](activeSelection.value, selectionPosition.value);
      }
      activeSelection.value = null;
      toolsMenuPosition.top = null;
    };
    const handleDocumentMouseDown = (e) => {
      if (pendingComment.value) return;
    };
    const handleHighlightClick = () => toolsMenuPosition.top = null;
    const cancelPendingComment = (e) => {
      if (e.target.classList.contains("n-dropdown-option-body__label")) return;
      commentsStore.removePendingComment(proxy.$superdoc);
    };
    const onCommentsLoaded = ({ editor, comments, replacedFile }) => {
      if (editor.options.shouldLoadComments || replacedFile) {
        nextTick(() => {
          commentsStore.processLoadedDocxComments({
            superdoc: proxy.$superdoc,
            editor,
            comments,
            documentId: editor.options.documentId
          });
        });
      }
    };
    const onEditorBeforeCreate = ({ editor }) => {
      proxy.$superdoc?.broadcastEditorBeforeCreate(editor);
    };
    const onEditorCreate = ({ editor }) => {
      const { documentId } = editor.options;
      const doc = getDocument(documentId);
      doc.setEditor(editor);
      proxy.$superdoc.setActiveEditor(editor);
      proxy.$superdoc.broadcastEditorCreate(editor);
      initAiLayer(true);
    };
    const onEditorReady = ({ editor, presentationEditor }) => {
      if (!presentationEditor) return;
      const { documentId } = editor.options;
      const doc = getDocument(documentId);
      if (doc) {
        doc.setPresentationEditor(presentationEditor);
      }
      presentationEditor.setContextMenuDisabled?.(proxy.$superdoc.config.disableContextMenu);
      presentationEditor.on("commentPositions", ({ positions }) => {
        const commentsConfig = proxy.$superdoc.config.modules?.comments;
        if (!commentsConfig || commentsConfig === false) return;
        if (!positions || Object.keys(positions).length === 0) return;
        if (!shouldRenderCommentsInViewing.value) {
          commentsStore.clearEditorCommentPositions?.();
          return;
        }
        const mappedPositions = presentationEditor.getCommentBounds(positions, layers.value);
        handleEditorLocationsUpdate(mappedPositions);
      });
    };
    const onEditorDestroy = () => {
      proxy.$superdoc.broadcastEditorDestroy();
    };
    const onEditorFocus = ({ editor }) => {
      proxy.$superdoc.setActiveEditor(editor);
    };
    const onEditorDocumentLocked = ({ editor, isLocked, lockedBy }) => {
      proxy.$superdoc.lockSuperdoc(isLocked, lockedBy);
    };
    const onEditorUpdate = ({ editor }) => {
      proxy.$superdoc.emit("editor-update", { editor });
    };
    const onEditorSelectionChange = ({ editor, transaction }) => {
      if (skipSelectionUpdate.value) {
        skipSelectionUpdate.value = false;
        if (isViewingMode()) {
          resetSelection();
        }
        return;
      }
      if (isViewingMode()) {
        resetSelection();
        return;
      }
      const { documentId } = editor.options;
      const txnSelection = transaction?.selection;
      const stateSelection = editor.state?.selection ?? editor.view?.state?.selection;
      const selectionWithPositions = txnSelection?.$from && txnSelection?.$to && txnSelection || stateSelection || txnSelection;
      if (!selectionWithPositions) return;
      const { $from, $to } = selectionWithPositions;
      if (!$from || !$to) return;
      const docSize = editor.state?.doc?.content?.size ?? editor.view?.state?.doc?.content?.size ?? Number.POSITIVE_INFINITY;
      if ($from.pos > docSize || $to.pos > docSize) {
        updateSelection({ x: null, y: null, source: "super-editor" });
        return;
      }
      if ($from.pos === $to.pos) updateSelection({ x: null, y: null, source: "super-editor" });
      if (!layers.value) return;
      const presentation = PresentationEditor.getInstance(documentId);
      if (!presentation) {
        const { view: view2 } = editor;
        const safeCoordsAtPos2 = (pos) => {
          try {
            return view2.coordsAtPos(pos);
          } catch (err) {
            console.warn("[superdoc] Ignoring selection coords error", err);
            return null;
          }
        };
        const fromCoords2 = safeCoordsAtPos2($from.pos);
        const toCoords2 = safeCoordsAtPos2($to.pos);
        if (!fromCoords2 || !toCoords2) return;
        const layerBounds2 = layers.value.getBoundingClientRect();
        const HEADER_HEIGHT2 = 96;
        const top2 = Math.max(HEADER_HEIGHT2, fromCoords2.top - layerBounds2.top);
        const bottom2 = toCoords2.bottom - layerBounds2.top;
        const selectionBounds2 = {
          top: top2,
          left: fromCoords2.left,
          right: toCoords2.left,
          bottom: bottom2
        };
        const selectionResult2 = useSelection({
          selectionBounds: selectionBounds2,
          page: 1,
          documentId,
          source: "super-editor"
        });
        handleSelectionChange(selectionResult2);
        return;
      }
      const layoutRange = presentation.getSelectionBounds($from.pos, $to.pos, layers.value);
      if (layoutRange) {
        const { bounds, pageIndex } = layoutRange;
        updateSelection({
          startX: bounds.left,
          startY: bounds.top,
          x: bounds.right,
          y: bounds.bottom,
          source: "super-editor"
        });
        const selectionResult2 = useSelection({
          selectionBounds: { ...bounds },
          page: pageIndex + 1,
          documentId,
          source: "super-editor"
        });
        handleSelectionChange(selectionResult2);
        return;
      }
      const { view } = editor;
      const safeCoordsAtPos = (pos) => {
        try {
          return view.coordsAtPos(pos);
        } catch (err) {
          console.warn("[superdoc] Ignoring selection coords error", err);
          return null;
        }
      };
      const fromCoords = safeCoordsAtPos($from.pos);
      const toCoords = safeCoordsAtPos($to.pos);
      if (!fromCoords || !toCoords) return;
      const layerBounds = layers.value.getBoundingClientRect();
      const HEADER_HEIGHT = 96;
      const top = Math.max(HEADER_HEIGHT, fromCoords.top - layerBounds.top);
      const bottom = toCoords.bottom - layerBounds.top;
      const selectionBounds = {
        top,
        left: fromCoords.left,
        right: toCoords.left,
        bottom
      };
      const selectionResult = useSelection({
        selectionBounds,
        page: 1,
        documentId,
        source: "super-editor"
      });
      handleSelectionChange(selectionResult);
    };
    const onEditorCollaborationReady = ({ editor }) => {
      proxy.$superdoc.emit("collaboration-ready", { editor });
      nextTick(() => {
        isReady.value = true;
        const urlParams = new URLSearchParams(window.location.search);
        const commentId = urlParams.get("commentId");
        if (commentId) scrollToComment(commentId);
      });
    };
    const onEditorContentError = ({ error, editor }) => {
      proxy.$superdoc.emit("content-error", { error, editor });
    };
    const onEditorException = ({ error, editor }) => {
      proxy.$superdoc.emit("exception", { error, editor });
    };
    const onEditorListdefinitionsChange = (params) => {
      proxy.$superdoc.emit("list-definitions-change", params);
    };
    const editorOptions = (doc) => {
      const onFontsResolvedFn = proxy.$superdoc.listeners?.("fonts-resolved")?.length > 0 ? proxy.$superdoc.listeners("fonts-resolved")[0] : null;
      const useLayoutEngine = proxy.$superdoc.config.useLayoutEngine !== false;
      const options = {
        isDebug: proxy.$superdoc.config.isDebug || false,
        documentId: doc.id,
        user: proxy.$superdoc.user,
        users: proxy.$superdoc.users,
        colors: proxy.$superdoc.colors,
        role: proxy.$superdoc.config.role,
        html: doc.html,
        markdown: doc.markdown,
        documentMode: proxy.$superdoc.config.documentMode,
        rulers: doc.rulers,
        rulerContainer: proxy.$superdoc.config.rulerContainer,
        isInternal: proxy.$superdoc.config.isInternal,
        annotations: proxy.$superdoc.config.annotations,
        isCommentsEnabled: Boolean(commentsModuleConfig.value),
        isAiEnabled: proxy.$superdoc.config.modules?.ai,
        slashMenuConfig: proxy.$superdoc.config.modules?.slashMenu,
        comments: {
          highlightColors: commentsModuleConfig.value?.highlightColors,
          highlightOpacity: commentsModuleConfig.value?.highlightOpacity
        },
        editorCtor: useLayoutEngine ? PresentationEditor : void 0,
        onBeforeCreate: onEditorBeforeCreate,
        onCreate: onEditorCreate,
        onDestroy: onEditorDestroy,
        onFocus: onEditorFocus,
        onDocumentLocked: onEditorDocumentLocked,
        onUpdate: onEditorUpdate,
        onSelectionUpdate: onEditorSelectionChange,
        onCollaborationReady: onEditorCollaborationReady,
        onContentError: onEditorContentError,
        onException: onEditorException,
        onCommentsLoaded,
        onCommentsUpdate: onEditorCommentsUpdate,
        onCommentLocationsUpdate: (payload) => onEditorCommentLocationsUpdate(doc, payload),
        onListDefinitionsChange: onEditorListdefinitionsChange,
        onFontsResolved: onFontsResolvedFn,
        onTransaction: onEditorTransaction,
        ydoc: doc.ydoc,
        collaborationProvider: doc.provider || null,
        isNewFile: doc.isNewFile || false,
        handleImageUpload: proxy.$superdoc.config.handleImageUpload,
        externalExtensions: proxy.$superdoc.config.editorExtensions || [],
        suppressDefaultDocxStyles: proxy.$superdoc.config.suppressDefaultDocxStyles,
        disableContextMenu: proxy.$superdoc.config.disableContextMenu,
        jsonOverride: proxy.$superdoc.config.jsonOverride,
        viewOptions: proxy.$superdoc.config.viewOptions,
        layoutEngineOptions: useLayoutEngine ? {
          ...proxy.$superdoc.config.layoutEngineOptions || {},
          debugLabel: proxy.$superdoc.config.layoutEngineOptions?.debugLabel ?? doc.name ?? doc.id,
          zoom: (activeZoom.value ?? 100) / 100,
          emitCommentPositionsInViewing: isViewingMode() && shouldRenderCommentsInViewing.value,
          enableCommentsInViewing: isViewingCommentsVisible.value
        } : void 0,
        permissionResolver: (payload = {}) => proxy.$superdoc.canPerformPermission({
          role: proxy.$superdoc.config.role,
          isInternal: proxy.$superdoc.config.isInternal,
          ...payload
        })
      };
      return options;
    };
    const onEditorCommentLocationsUpdate = (doc, { allCommentIds: activeThreadId, allCommentPositions } = {}) => {
      const commentsConfig = proxy.$superdoc.config.modules?.comments;
      if (!commentsConfig || commentsConfig === false) return;
      if (!shouldRenderCommentsInViewing.value) {
        commentsStore.clearEditorCommentPositions?.();
        return;
      }
      const presentation = PresentationEditor.getInstance(doc.id);
      if (!presentation) {
        handleEditorLocationsUpdate(allCommentPositions, activeThreadId);
        return;
      }
      const mappedPositions = presentation.getCommentBounds(allCommentPositions, layers.value);
      handleEditorLocationsUpdate(mappedPositions, activeThreadId);
    };
    const onEditorCommentsUpdate = (params = {}) => {
      let { activeCommentId, type, comment: commentPayload } = params;
      if (COMMENT_EVENTS?.ADD && type === COMMENT_EVENTS.ADD && commentPayload) {
        if (!commentPayload.commentText && commentPayload.text) {
          commentPayload.commentText = commentPayload.text;
        }
        const currentUser = proxy.$superdoc?.user;
        if (currentUser) {
          if (!commentPayload.creatorName) commentPayload.creatorName = currentUser.name;
          if (!commentPayload.creatorEmail) commentPayload.creatorEmail = currentUser.email;
        }
        if (!commentPayload.createdTime) commentPayload.createdTime = Date.now();
        const primaryDocumentId = commentPayload.documentId || documents.value?.[0]?.id;
        if (!commentPayload.documentId && primaryDocumentId) {
          commentPayload.documentId = primaryDocumentId;
        }
        if (!commentPayload.fileId && primaryDocumentId) {
          commentPayload.fileId = primaryDocumentId;
        }
        const id = commentPayload.commentId || commentPayload.importedId;
        if (id && !getComment(id)) {
          const commentModel = useComment(commentPayload);
          addComment({ superdoc: proxy.$superdoc, comment: commentModel, skipEditorUpdate: true });
        }
        if (!activeCommentId && id) {
          activeCommentId = id;
        }
      }
      if (type === "trackedChange") {
        handleTrackedChangeUpdate({ superdoc: proxy.$superdoc, params });
      }
      nextTick(() => {
        if (pendingComment.value) return;
        commentsStore.setActiveComment(proxy.$superdoc, activeCommentId);
        isCommentHighlighted.value = true;
      });
      if (typeof proxy.$superdoc.config.onCommentsUpdate === "function") {
        proxy.$superdoc.config.onCommentsUpdate(params);
      }
    };
    const onEditorTransaction = ({ editor, transaction, duration: duration2 }) => {
      if (typeof proxy.$superdoc.config.onTransaction === "function") {
        proxy.$superdoc.config.onTransaction({ editor, transaction, duration: duration2 });
      }
    };
    const isCommentsEnabled = computed(() => Boolean(commentsModuleConfig.value));
    const showCommentsSidebar = computed(() => {
      if (!shouldRenderCommentsInViewing.value) return false;
      return pendingComment.value || getFloatingComments.value?.length > 0 && isReady.value && layers.value && isCommentsEnabled.value && !isCommentsListVisible.value;
    });
    const showToolsFloatingMenu = computed(() => {
      if (!isCommentsEnabled.value) return false;
      return selectionPosition.value && toolsMenuPosition.top && !getConfig.value?.readOnly;
    });
    computed(() => {
      if (!isCommentsEnabled.value) return false;
      return !getConfig.value?.readOnly && selectionPosition.value;
    });
    watch(showCommentsSidebar, (value) => {
      proxy.$superdoc.broadcastSidebarToggle(value);
    });
    const scrollToComment = (commentId) => {
      const commentsConfig = proxy.$superdoc.config?.modules?.comments;
      if (!commentsConfig || commentsConfig === false) return;
      const element = document.querySelector(`[data-thread-id=${commentId}]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        commentsStore.setActiveComment(proxy.$superdoc, commentId);
      }
    };
    onMounted(() => {
      const config = commentsModuleConfig.value;
      if (config && !config.readOnly) {
        document.addEventListener("mousedown", handleDocumentMouseDown);
      }
    });
    onBeforeUnmount(() => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    });
    const selectionLayer = ref(null);
    const isDragging = ref(false);
    const getSelectionPosition = computed(() => {
      if (!selectionPosition.value || selectionPosition.value.source === "super-editor") {
        return { x: null, y: null };
      }
      const top = selectionPosition.value.top;
      const left = selectionPosition.value.left;
      const right = selectionPosition.value.right;
      const bottom = selectionPosition.value.bottom;
      const style2 = {
        zIndex: 500,
        borderRadius: "4px",
        top: top + "px",
        left: left + "px",
        height: Math.abs(top - bottom) + "px",
        width: Math.abs(left - right) + "px"
      };
      return style2;
    });
    const handleSelectionChange = (selection) => {
      if (isViewingMode()) {
        resetSelection();
        return;
      }
      if (!selection.selectionBounds || !isCommentsEnabled.value) return;
      resetSelection();
      const isMobileView = window.matchMedia("(max-width: 768px)").matches;
      updateSelection({
        startX: selection.selectionBounds.left,
        startY: selection.selectionBounds.top,
        x: selection.selectionBounds.right,
        y: selection.selectionBounds.bottom,
        source: selection.source
      });
      if (!selectionPosition.value) return;
      const selectionIsWideEnough = Math.abs(selectionPosition.value.left - selectionPosition.value.right) > 5;
      const selectionIsTallEnough = Math.abs(selectionPosition.value.top - selectionPosition.value.bottom) > 5;
      if (!selectionIsWideEnough || !selectionIsTallEnough) {
        selectionLayer.value.style.pointerEvents = "none";
        resetSelection();
        return;
      }
      activeSelection.value = selection;
      let top = selection.selectionBounds.top;
      toolsMenuPosition.top = top + "px";
      toolsMenuPosition.right = isMobileView ? "0" : "-25px";
    };
    const resetSelection = () => {
      selectionPosition.value = null;
      toolsMenuPosition.top = null;
    };
    const updateSelection = ({ startX, startY, x, y, source }) => {
      const hasStartCoords = typeof startX === "number" || typeof startY === "number";
      const hasEndCoords = typeof x === "number" || typeof y === "number";
      if (!hasStartCoords && !hasEndCoords) {
        resetSelection();
        return;
      }
      if (!selectionPosition.value) {
        if (startY == null || startX == null) return;
        selectionPosition.value = {
          top: startY,
          left: startX,
          right: startX,
          bottom: startY,
          startX,
          startY,
          source
        };
      }
      if (typeof startX === "number") selectionPosition.value.startX = startX;
      if (typeof startY === "number") selectionPosition.value.startY = startY;
      if (typeof y === "number") {
        const selectionTop = selectionPosition.value.startY;
        if (y < selectionTop) {
          selectionPosition.value.top = y;
        } else {
          selectionPosition.value.bottom = y;
        }
      }
      if (typeof x === "number") {
        const selectionLeft = selectionPosition.value.startX;
        if (x < selectionLeft) {
          selectionPosition.value.left = x;
        } else {
          selectionPosition.value.right = x;
        }
      }
    };
    const handleSelectionStart = (e) => {
      resetSelection();
      selectionLayer.value.style.pointerEvents = "auto";
      nextTick(() => {
        isDragging.value = true;
        const y = e.offsetY / (activeZoom.value / 100);
        const x = e.offsetX / (activeZoom.value / 100);
        updateSelection({ startX: x, startY: y });
        selectionLayer.value.addEventListener("mousemove", handleDragMove);
      });
    };
    const handleDragMove = (e) => {
      if (!isDragging.value) return;
      const y = e.offsetY / (activeZoom.value / 100);
      const x = e.offsetX / (activeZoom.value / 100);
      updateSelection({ x, y });
    };
    const handleDragEnd = (e) => {
      if (!isDragging.value) return;
      selectionLayer.value.removeEventListener("mousemove", handleDragMove);
      if (!selectionPosition.value) return;
      const selection = useSelection({
        selectionBounds: {
          top: selectionPosition.value.top,
          left: selectionPosition.value.left,
          right: selectionPosition.value.right,
          bottom: selectionPosition.value.bottom
        },
        documentId: documents.value[0].id
      });
      handleSelectionChange(selection);
      selectionLayer.value.style.pointerEvents = "none";
    };
    const shouldShowSelection = computed(() => {
      const config = proxy.$superdoc.config.modules?.comments;
      if (!config || config === false) return false;
      return !config.readOnly;
    });
    const handleSuperEditorPageMarginsChange = (doc, params) => {
      doc.documentMarginsLastChange = params.pageMargins;
    };
    const handlePdfClick = (e) => {
      if (!isCommentsEnabled.value) return;
      resetSelection();
      isDragging.value = true;
      handleSelectionStart(e);
    };
    watch(
      () => activeZoom.value,
      (zoom) => {
        if (proxy.$superdoc.config.useLayoutEngine !== false) {
          PresentationEditor.setGlobalZoom((zoom ?? 100) / 100);
        }
      }
    );
    watch(getFloatingComments, () => {
      hasInitializedLocations.value = false;
      nextTick(() => {
        hasInitializedLocations.value = true;
      });
    });
    return (_ctx, _cache) => {
      const _directive_click_outside = resolveDirective("click-outside");
      return openBlock(), createBlock(unref(NConfigProvider), {
        abstract: "",
        "preflight-style-disabled": ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: normalizeClass(["superdoc", {
              "superdoc--with-sidebar": showCommentsSidebar.value,
              "superdoc--web-layout": unref(proxy).$superdoc.config.viewOptions?.layout === "web",
              "high-contrast": unref(isHighContrastMode2)
            }]),
            style: normalizeStyle(superdocStyleVars.value)
          }, [
            createBaseVNode("div", {
              class: "superdoc__layers layers",
              ref_key: "layers",
              ref: layers,
              role: "group"
            }, [
              showToolsFloatingMenu.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "superdoc__tools tools",
                style: normalizeStyle(toolsMenuPosition)
              }, [
                createBaseVNode("div", {
                  class: "tools-item",
                  "data-id": "is-tool",
                  onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => handleToolClick("comments"), ["stop", "prevent"]))
                }, [
                  createBaseVNode("div", {
                    class: "superdoc__tools-icon",
                    innerHTML: unref(superdocIcons).comment
                  }, null, 8, _hoisted_1)
                ], 32),
                unref(proxy).$superdoc.config.modules.ai ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "tools-item",
                  "data-id": "is-tool",
                  onMousedown: _cache[1] || (_cache[1] = withModifiers(($event) => handleToolClick("ai"), ["stop", "prevent"]))
                }, [..._cache[3] || (_cache[3] = [
                  createBaseVNode("div", { class: "superdoc__tools-icon ai-tool" }, null, -1)
                ])], 32)) : createCommentVNode("", true)
              ], 4)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_2, [
                isCommentsEnabled.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "superdoc__selection-layer selection-layer",
                  onMousedown: handleSelectionStart,
                  onMouseup: handleDragEnd,
                  ref_key: "selectionLayer",
                  ref: selectionLayer
                }, [
                  unref(selectionPosition) && shouldShowSelection.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    style: normalizeStyle(getSelectionPosition.value),
                    class: "superdoc__temp-selection temp-selection sd-highlight sd-initial-highlight"
                  }, null, 4)) : createCommentVNode("", true)
                ], 544)) : createCommentVNode("", true),
                "hrbr-fields" in unref(modules) && layers.value ? (openBlock(), createBlock(HrbrFieldsLayer, {
                  key: 1,
                  fields: unref(modules)["hrbr-fields"],
                  class: "superdoc__comments-layer comments-layer",
                  style: { "z-index": "2" },
                  ref_key: "hrbrFieldsLayer",
                  ref: hrbrFieldsLayer
                }, null, 8, ["fields"])) : createCommentVNode("", true),
                layers.value ? (openBlock(), createBlock(CommentsLayer, {
                  key: 2,
                  class: "superdoc__comments-layer comments-layer",
                  style: { "z-index": "3" },
                  ref_key: "commentsLayer",
                  ref: commentsLayer,
                  parent: layers.value,
                  user: unref(user),
                  onHighlightClick: handleHighlightClick
                }, null, 8, ["parent", "user"])) : createCommentVNode("", true),
                unref(showAiLayer) ? (openBlock(), createBlock(AiLayer, {
                  key: 3,
                  class: "ai-layer",
                  style: { "z-index": "4" },
                  ref_key: "aiLayer",
                  ref: aiLayer,
                  editor: unref(proxy).$superdoc.activeEditor
                }, null, 8, ["editor"])) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(documents), (doc) => {
                  return openBlock(), createElementBlock("div", {
                    class: "superdoc__sub-document sub-document",
                    key: doc.id
                  }, [
                    doc.type === unref(PDF) ? (openBlock(), createBlock(unref(PdfViewer), {
                      key: 0,
                      "document-data": doc,
                      config: unref(pdfConfig),
                      onSelectionChange: handleSelectionChange,
                      onReady: handleDocumentReady,
                      onPageLoaded: unref(handlePageReady),
                      onBypassSelection: handlePdfClick
                    }, null, 8, ["document-data", "config", "onPageLoaded"])) : createCommentVNode("", true),
                    createVNode(unref(NMessageProvider), null, {
                      default: withCtx(() => [
                        doc.type === unref(DOCX) ? (openBlock(), createBlock(unref(SuperEditor), {
                          key: 0,
                          "file-source": doc.data,
                          state: doc.state,
                          "document-id": doc.id,
                          options: { ...editorOptions(doc), rulers: doc.rulers },
                          onEditorReady,
                          onPageMarginsChange: ($event) => handleSuperEditorPageMarginsChange(doc, $event)
                        }, null, 8, ["file-source", "state", "document-id", "options", "onPageMarginsChange"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024),
                    doc.type === unref(HTML) ? (openBlock(), createBlock(HtmlViewer, {
                      key: 1,
                      onReady: _cache[2] || (_cache[2] = (id) => handleDocumentReady(id, null)),
                      onSelectionChange: handleSelectionChange,
                      "file-source": doc.data,
                      "document-id": doc.id
                    }, null, 8, ["file-source", "document-id"])) : createCommentVNode("", true)
                  ]);
                }), 128))
              ])
            ], 512),
            showCommentsSidebar.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
              unref(pendingComment) ? withDirectives((openBlock(), createBlock(CommentDialog, {
                key: 0,
                comment: unref(pendingComment),
                "auto-focus": true,
                "is-floating": true
              }, null, 8, ["comment"])), [
                [_directive_click_outside, cancelPendingComment]
              ]) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_4, [
                unref(hasInitializedLocations) && unref(getFloatingComments).length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(documentsWithConverations), (doc) => {
                  return openBlock(), createBlock(FloatingComments, {
                    parent: layers.value,
                    "current-document": doc
                  }, null, 8, ["parent", "current-document"]);
                }), 256)) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            unref(showAiWriter) ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "ai-writer-container",
              style: normalizeStyle(unref(aiWriterPosition))
            }, [
              createVNode(unref(AIWriter), {
                "selected-text": unref(selectedText),
                "handle-close": unref(handleAiWriterClose),
                editor: unref(proxy).$superdoc.activeEditor,
                "api-key": unref(proxy).$superdoc.toolbar?.config?.aiApiKey,
                endpoint: unref(proxy).$superdoc.config?.modules?.ai?.endpoint
              }, null, 8, ["selected-text", "handle-close", "editor", "api-key", "endpoint"])
            ], 4)) : createCommentVNode("", true)
          ], 6)
        ]),
        _: 1
      });
    };
  }
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba1f348b"]]);
const createSuperdocVueApp = () => {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.directive("click-outside", vClickOutside);
  const superdocStore = useSuperdocStore();
  const commentsStore = useCommentsStore();
  const highContrastModeStore = useHighContrastMode();
  return { app, pinia, superdocStore, commentsStore, highContrastModeStore };
};
const MIME_TYPES = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  zip: "application/zip",
  html: "text/html",
  txt: "text/plain;charset=utf-8",
  json: "application/json"
};
const getMimeType = (extension) => {
  if (!extension || typeof extension.toLowerCase !== "function") return "application/octet-stream";
  return MIME_TYPES[extension.toLowerCase()] || "application/octet-stream";
};
const ensureBlob = (data, extension) => {
  if (data instanceof Blob) return data;
  const mimeType = getMimeType(extension);
  if (data instanceof ArrayBuffer) {
    return new Blob([data], { type: mimeType });
  }
  if (ArrayBuffer.isView(data)) {
    const { buffer, byteOffset, byteLength } = data;
    const slice = buffer.slice(byteOffset, byteOffset + byteLength);
    return new Blob([slice], { type: mimeType });
  }
  if (typeof data === "string") {
    return new Blob([data], { type: mimeType });
  }
  if (data == null) {
    throw new TypeError("createDownload requires a Blob, ArrayBuffer, or ArrayBufferView.");
  }
  throw new TypeError(`Cannot create download from value of type ${typeof data}`);
};
const createDownload = (data, name, extension) => {
  const blob = ensureBlob(data, extension);
  if (typeof URL === "undefined" || typeof URL.createObjectURL !== "function") return blob;
  if (typeof document === "undefined" || typeof document.createElement !== "function") return blob;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.${extension}`;
  const shouldAppend = document.body && typeof document.body.appendChild === "function";
  if (shouldAppend) document.body.appendChild(a);
  a.click();
  if (shouldAppend) document.body.removeChild(a);
  if (typeof URL.revokeObjectURL === "function") {
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  return blob;
};
const cleanName = (currentName) => {
  const lowerName = currentName.toLowerCase();
  if (lowerName.endsWith(".docx")) {
    return currentName.slice(0, -5);
  }
  if (lowerName.endsWith(".pdf")) {
    return currentName.slice(0, -4);
  }
  return currentName;
};
const DEFAULT_USER = Object.freeze({
  name: "Default SuperDoc user",
  email: null
});
class SuperDoc extends EventEmitter {
  /** @type {Array<string>} */
  static allowedTypes = [DOCX, PDF, HTML];
  /** @type {boolean} */
  #destroyed = false;
  /** @type {string} */
  version;
  /** @type {User[]} */
  users;
  /** @type {import('yjs').Doc | undefined} */
  ydoc;
  /** @type {import('@hocuspocus/provider').HocuspocusProvider | undefined} */
  provider;
  /** @type {Config} */
  config = {
    superdocId: null,
    selector: "#superdoc",
    documentMode: "editing",
    role: "editor",
    document: {},
    documents: [],
    format: null,
    editorExtensions: [],
    colors: [],
    user: { name: null, email: null },
    users: [],
    modules: {},
    // Optional: Modules to load. Use modules.ai.{your_key} to pass in your key
    permissionResolver: null,
    // Optional: Override for permission checks
    title: "SuperDoc",
    conversations: [],
    isInternal: false,
    comments: { visible: false },
    trackChanges: { visible: false },
    // toolbar config
    toolbar: null,
    // Optional DOM element to render the toolbar in
    toolbarGroups: ["left", "center", "right"],
    toolbarIcons: {},
    toolbarTexts: {},
    // UI font for SuperDoc surfaces (toolbar, comments UI, etc.)
    uiDisplayFallbackFont: "Arial, Helvetica, sans-serif",
    isDev: false,
    // Events
    onEditorBeforeCreate: () => null,
    onEditorCreate: () => null,
    onEditorDestroy: () => null,
    onContentError: () => null,
    onReady: () => null,
    onCommentsUpdate: () => null,
    onAwarenessUpdate: () => null,
    onLocked: () => null,
    onPdfDocumentReady: () => null,
    onSidebarToggle: () => null,
    onCollaborationReady: () => null,
    onEditorUpdate: () => null,
    onCommentsListChange: () => null,
    onException: () => null,
    onListDefinitionsChange: () => null,
    onTransaction: () => null,
    onFontsResolved: null,
    // Image upload handler
    // async (file) => url;
    handleImageUpload: null,
    // Disable context menus (slash and right-click) globally
    disableContextMenu: false,
    // Document view options (OOXML ST_View compatible)
    // - 'print': Print Layout View - displays document as it prints (default)
    // - 'web': Web Page View - content reflows to fit container (mobile/accessibility)
    viewOptions: { layout: "print" },
    // Internal: toggle layout-engine-powered PresentationEditor in dev shells
    useLayoutEngine: true
  };
  /**
   * @param {Config} config
   */
  constructor(config) {
    super();
    this.#init(config);
  }
  async #init(config) {
    this.config = {
      ...this.config,
      ...config
    };
    if (!this.config.comments || typeof this.config.comments !== "object") {
      this.config.comments = { visible: false };
    } else if (typeof this.config.comments.visible !== "boolean") {
      this.config.comments.visible = false;
    }
    if (!this.config.trackChanges || typeof this.config.trackChanges !== "object") {
      this.config.trackChanges = { visible: false };
    } else if (typeof this.config.trackChanges.visible !== "boolean") {
      this.config.trackChanges.visible = false;
    }
    if (this.config.viewOptions?.layout === "web" && this.config.useLayoutEngine) {
      console.warn(
        "[SuperDoc] Web layout mode requires useLayoutEngine: false. Automatically disabling layout engine."
      );
      this.config.useLayoutEngine = false;
    }
    const incomingUser = this.config.user;
    if (!incomingUser || typeof incomingUser !== "object") {
      this.config.user = { ...DEFAULT_USER };
    } else {
      this.config.user = {
        ...DEFAULT_USER,
        ...incomingUser
      };
      if (!this.config.user.name) {
        this.config.user.name = DEFAULT_USER.name;
      }
    }
    if (!this.config.layoutEngineOptions) {
      this.config.layoutEngineOptions = {};
    }
    if (!this.config.layoutEngineOptions.trackedChanges) {
      const isViewingMode = this.config.documentMode === "viewing";
      const viewingTrackedChangesVisible = isViewingMode && this.config.trackChanges?.visible === true;
      this.config.layoutEngineOptions.trackedChanges = {
        mode: isViewingMode ? viewingTrackedChangesVisible ? "review" : "original" : "review",
        enabled: true
      };
    }
    this.config.modules = this.config.modules || {};
    if (!Object.prototype.hasOwnProperty.call(this.config.modules, "comments")) {
      this.config.modules.comments = {};
    }
    this.config.colors = shuffleArray(this.config.colors);
    this.userColorMap = /* @__PURE__ */ new Map();
    this.colorIndex = 0;
    this.version = "1.9.0-next.5";
    this.#log("🦋 [superdoc] Using SuperDoc version:", this.version);
    this.superdocId = config.superdocId || v4();
    this.colors = this.config.colors;
    this.#initDocuments();
    await this.#initCollaboration(this.config.modules);
    if (this.#destroyed) {
      this.#cleanupCollaboration();
      return;
    }
    if (this.config.cspNonce) this.#patchNaiveUIStyles();
    this.#initVueApp();
    this.#initListeners();
    this.user = this.config.user;
    this.users = this.config.users || [];
    this.socket = null;
    this.isDev = this.config.isDev || false;
    this.activeEditor = null;
    this.comments = [];
    if (!this.config.selector) {
      throw new Error("SuperDoc: selector is required");
    }
    this.app.mount(this.config.selector);
    this.readyEditors = 0;
    this.isLocked = this.config.isLocked || false;
    this.lockedBy = this.config.lockedBy || null;
    this.#addToolbar();
  }
  /**
   * Get the number of editors that are required for this superdoc
   * @returns {number} The number of required editors
   */
  get requiredNumberOfEditors() {
    return this.superdocStore.documents.filter((d) => d.type === DOCX).length;
  }
  get state() {
    return {
      documents: this.superdocStore.documents,
      users: this.users
    };
  }
  /**
   * Get the SuperDoc container element
   * @returns {HTMLElement | null}
   */
  get element() {
    if (typeof this.config.selector === "string") {
      return document.querySelector(this.config.selector);
    }
    return this.config.selector;
  }
  #patchNaiveUIStyles() {
    const cspNonce = this.config.cspNonce;
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(this, tagName);
      if (tagName.toLowerCase() === "style") {
        element.setAttribute("nonce", cspNonce);
      }
      return element;
    };
  }
  #initDocuments() {
    const doc = this.config.document;
    const hasDocumentConfig = !!doc && typeof doc === "object" && Object.keys(this.config.document)?.length;
    const hasDocumentUrl = !!doc && typeof doc === "string" && doc.length > 0;
    const hasDocumentFile = !!doc && typeof File === "function" && doc instanceof File;
    const hasDocumentBlob = !!doc && doc instanceof Blob && !(doc instanceof File);
    const hasListOfDocuments = this.config.documents && this.config.documents?.length;
    if (hasDocumentConfig && hasListOfDocuments) {
      console.warn("🦋 [superdoc] You can only provide one of document or documents");
    }
    if (hasDocumentConfig) {
      const normalized = normalizeDocumentEntry(this.config.document);
      this.config.documents = [
        {
          id: v4(),
          ...normalized
        }
      ];
    } else if (hasDocumentUrl) {
      this.config.documents = [
        {
          id: v4(),
          type: DOCX,
          url: this.config.document,
          name: "document.docx",
          isNewFile: true
        }
      ];
    } else if (hasDocumentFile) {
      const normalized = normalizeDocumentEntry(this.config.document);
      this.config.documents = [
        {
          id: v4(),
          ...normalized
        }
      ];
    } else if (hasDocumentBlob) {
      const normalized = normalizeDocumentEntry(this.config.document);
      this.config.documents = [
        {
          id: v4(),
          ...normalized
        }
      ];
    }
    if (Array.isArray(this.config.documents) && this.config.documents.length > 0) {
      this.config.documents = this.config.documents.map((d) => {
        const normalized = normalizeDocumentEntry(d);
        if (!normalized || typeof normalized !== "object") {
          return normalized;
        }
        const existingId = typeof normalized === "object" && "id" in normalized && normalized.id || d && typeof d === "object" && "id" in d && d.id;
        return {
          ...normalized,
          id: existingId || v4()
        };
      });
    }
  }
  #initVueApp() {
    const { app, pinia, superdocStore, commentsStore, highContrastModeStore } = createSuperdocVueApp();
    this.app = app;
    this.pinia = pinia;
    this.app.config.globalProperties.$config = this.config;
    this.app.config.globalProperties.$documentMode = this.config.documentMode;
    this.app.config.globalProperties.$superdoc = this;
    this.superdocStore = superdocStore;
    this.commentsStore = commentsStore;
    this.highContrastModeStore = highContrastModeStore;
    if (typeof this.superdocStore.setExceptionHandler === "function") {
      this.superdocStore.setExceptionHandler((payload) => this.emit("exception", payload));
    }
    this.superdocStore.init(this.config);
    const commentsModuleConfig = this.config.modules.comments;
    this.commentsStore.init(commentsModuleConfig && commentsModuleConfig !== false ? commentsModuleConfig : {});
    this.#syncViewingVisibility();
  }
  #initListeners() {
    this.on("editorBeforeCreate", this.config.onEditorBeforeCreate);
    this.on("editorCreate", this.config.onEditorCreate);
    this.on("editorDestroy", this.config.onEditorDestroy);
    this.on("ready", this.config.onReady);
    this.on("comments-update", this.config.onCommentsUpdate);
    this.on("awareness-update", this.config.onAwarenessUpdate);
    this.on("locked", this.config.onLocked);
    this.on("pdf-document-ready", this.config.onPdfDocumentReady);
    this.on("sidebar-toggle", this.config.onSidebarToggle);
    this.on("collaboration-ready", this.config.onCollaborationReady);
    this.on("editor-update", this.config.onEditorUpdate);
    this.on("content-error", this.onContentError);
    this.on("exception", this.config.onException);
    this.on("list-definitions-change", this.config.onListDefinitionsChange);
    if (this.config.onFontsResolved) {
      this.on("fonts-resolved", this.config.onFontsResolved);
    }
  }
  /**
   * Initialize collaboration if configured
   * @param {Object} config
   * @returns {Promise<Object[]>} The processed documents with collaboration enabled
   */
  async #initCollaboration({ collaboration: collaborationModuleConfig, comments: commentsConfig = {} } = {}) {
    if (!collaborationModuleConfig) return this.config.documents;
    this.isCollaborative = true;
    const { ydoc: externalYdoc, provider: externalProvider } = collaborationModuleConfig;
    if (externalYdoc && externalProvider) {
      this.ydoc = externalYdoc;
      this.provider = externalProvider;
      setupAwarenessHandler(externalProvider, this, this.config.user);
      if (!this.config.documents || this.config.documents.length === 0) {
        this.config.documents = [
          {
            id: v4(),
            type: DOCX,
            name: "document.docx"
          }
        ];
      }
      this.config.documents.forEach((doc) => {
        doc.ydoc = externalYdoc;
        doc.provider = externalProvider;
        doc.role = this.config.role;
      });
      initCollaborationComments(this);
      return this.config.documents;
    }
    if (collaborationModuleConfig.providerType === "hocuspocus") {
      this.config.socket = new HocuspocusProviderWebsocket({
        url: collaborationModuleConfig.url
      });
    }
    const processedDocuments = makeDocumentsCollaborative(this);
    if (commentsConfig.useInternalExternalComments && !commentsConfig.suppressInternalExternalComments) {
      const { ydoc: sdYdoc, provider: sdProvider } = initSuperdocYdoc(this);
      this.ydoc = sdYdoc;
      this.provider = sdProvider;
    } else {
      this.ydoc = processedDocuments[0].ydoc;
      this.provider = processedDocuments[0].provider;
    }
    initCollaborationComments(this);
    return processedDocuments;
  }
  /**
   * Add a user to the shared users list
   * @param {Object} user The user to add
   * @returns {void}
   */
  addSharedUser(user) {
    if (this.users.some((u) => u.email === user.email)) return;
    this.users.push(user);
  }
  /**
   * Remove a user from the shared users list
   * @param {String} email The email of the user to remove
   * @returns {void}
   */
  removeSharedUser(email) {
    this.users = this.users.filter((u) => u.email !== email);
  }
  /**
   * Triggered when there is an error in the content
   * @param {Object} param0
   * @param {Error} param0.error The error that occurred
   * @param {Editor} param0.editor The editor that caused the error
   */
  onContentError({ error, editor }) {
    const { documentId } = editor.options;
    const doc = this.superdocStore.documents.find((d) => d.id === documentId);
    this.config.onContentError({ error, editor, documentId: doc.id, file: doc.data });
  }
  /**
   * Triggered when the PDF document is ready
   * @returns {void}
   */
  broadcastPdfDocumentReady() {
    this.emit("pdf-document-ready");
  }
  /**
   * Triggered when the superdoc is ready
   * @returns {void}
   */
  broadcastReady() {
    if (this.readyEditors === this.requiredNumberOfEditors) {
      this.emit("ready", { superdoc: this });
    }
  }
  /**
   * Triggered before an editor is created
   * @param {Editor} editor The editor that is about to be created
   * @returns {void}
   */
  broadcastEditorBeforeCreate(editor) {
    this.emit("editorBeforeCreate", { editor });
  }
  /**
   * Triggered when an editor is created
   * @param {Editor} editor The editor that was created
   * @returns {void}
   */
  broadcastEditorCreate(editor) {
    this.readyEditors++;
    this.broadcastReady();
    this.emit("editorCreate", { editor });
  }
  /**
   * Triggered when an editor is destroyed
   * @returns {void}
   */
  broadcastEditorDestroy() {
    this.emit("editorDestroy");
  }
  /**
   * Triggered when the comments sidebar is toggled
   * @param {boolean} isOpened
   */
  broadcastSidebarToggle(isOpened) {
    this.emit("sidebar-toggle", isOpened);
  }
  #log(...args) {
    (console.debug ? console.debug : console.log)("🦋 🦸‍♀️ [superdoc]", ...args);
  }
  /**
   * Set the active editor
   * @param {Editor} editor The editor to set as active
   * @returns {void}
   */
  setActiveEditor(editor) {
    this.activeEditor = editor;
    if (this.toolbar) {
      this.activeEditor.toolbar = this.toolbar;
      this.toolbar.setActiveEditor(editor);
    }
  }
  /**
   * Toggle the ruler visibility for SuperEditors
   *
   * @returns {void}
   */
  toggleRuler() {
    this.config.rulers = !this.config.rulers;
    this.superdocStore.documents.forEach((doc) => {
      doc.rulers = this.config.rulers;
    });
  }
  /**
   * Determine whether the current configuration allows a given permission.
   * Used by downstream consumers (toolbar, context menu, commands) to keep
   * tracked-change affordances consistent with customer overrides.
   *
   * @param {Object} params
   * @param {string} params.permission Permission key to evaluate
   * @param {string} [params.role=this.config.role] Role to evaluate against
   * @param {boolean} [params.isInternal=this.config.isInternal] Internal/external flag
   * @param {Object|null} [params.comment] Comment object (if already resolved)
   * @param {Object|null} [params.trackedChange] Tracked change metadata (id, attrs, etc.)
   * @returns {boolean}
   */
  canPerformPermission({
    permission,
    role = this.config.role,
    isInternal = this.config.isInternal,
    comment = null,
    trackedChange = null
  } = {}) {
    if (!permission) return false;
    let resolvedComment = comment ?? trackedChange?.comment ?? null;
    const commentId = trackedChange?.commentId || trackedChange?.id;
    if (!resolvedComment && commentId && this.commentsStore?.getComment) {
      const storeComment = this.commentsStore.getComment(commentId);
      resolvedComment = storeComment?.getValues ? storeComment.getValues() : storeComment;
    }
    const context = {
      superdoc: this,
      currentUser: this.config.user,
      comment: resolvedComment ?? null,
      trackedChange: trackedChange ?? null
    };
    return isAllowed(permission, role, isInternal, context);
  }
  #addToolbar() {
    const moduleConfig = this.config.modules?.toolbar || {};
    this.toolbarElement = this.config.modules?.toolbar?.selector || this.config.toolbar;
    this.toolbar = null;
    const excludeItems = [...moduleConfig.excludeItems || []];
    if (!this.config.rulers) {
      excludeItems.push("ruler");
    }
    const config = {
      selector: this.toolbarElement || null,
      isDev: this.isDev || false,
      toolbarGroups: this.config.modules?.toolbar?.groups || this.config.toolbarGroups,
      role: this.config.role,
      icons: this.config.modules?.toolbar?.icons || this.config.toolbarIcons,
      texts: this.config.modules?.toolbar?.texts || this.config.toolbarTexts,
      fonts: this.config.modules?.toolbar?.fonts || null,
      hideButtons: this.config.modules?.toolbar?.hideButtons ?? true,
      responsiveToContainer: this.config.modules?.toolbar?.responsiveToContainer ?? false,
      documentMode: this.config.documentMode,
      superdoc: this,
      aiApiKey: this.config.modules?.ai?.apiKey,
      aiEndpoint: this.config.modules?.ai?.endpoint,
      uiDisplayFallbackFont: this.config.uiDisplayFallbackFont,
      ...moduleConfig,
      excludeItems
      // Override moduleConfig.excludeItems with our computed list
    };
    this.toolbar = new SuperToolbar(config);
    this.toolbar.on("superdoc-command", this.onToolbarCommand.bind(this));
    this.toolbar.on("exception", this.config.onException);
    this.once("editorCreate", () => this.toolbar.updateToolbarState());
  }
  /**
   * Add a comments list to the superdoc
   * Requires the comments module to be enabled
   * @param {Element} element The DOM element to render the comments list in
   * @returns {void}
   */
  addCommentsList(element) {
    if (!this.config?.modules?.comments || this.config.role === "viewer") return;
    if (element) this.config.modules.comments.element = element;
    this.commentsList = new SuperComments(this.config.modules?.comments, this);
    if (this.config.onCommentsListChange) this.config.onCommentsListChange({ isRendered: true });
  }
  /**
   * Remove the comments list from the superdoc
   * @returns {void}
   */
  removeCommentsList() {
    if (this.commentsList) {
      this.commentsList.close();
      this.commentsList = null;
      if (this.config.onCommentsListChange) this.config.onCommentsListChange({ isRendered: false });
    }
  }
  /**
   * Toggle the custom context menu globally.
   * Updates both flow editors and PresentationEditor instances so downstream listeners can short-circuit early.
   * @param {boolean} disabled
   */
  setDisableContextMenu(disabled = true) {
    const nextValue = Boolean(disabled);
    if (this.config.disableContextMenu === nextValue) return;
    this.config.disableContextMenu = nextValue;
    this.superdocStore?.documents?.forEach((doc) => {
      const presentationEditor = doc.getPresentationEditor?.();
      if (presentationEditor?.setContextMenuDisabled) {
        presentationEditor.setContextMenuDisabled(nextValue);
      }
      const editor = doc.getEditor?.();
      if (editor?.setOptions) {
        editor.setOptions({ disableContextMenu: nextValue });
      }
    });
  }
  /**
   * Triggered when a toolbar command is executed
   * @param {Object} param0
   * @param {Object} param0.item The toolbar item that was clicked
   * @param {string} param0.argument The argument passed to the command
   */
  onToolbarCommand({ item, argument }) {
    if (item.command === "setDocumentMode") {
      this.setDocumentMode(argument);
    } else if (item.command === "setZoom") {
      this.superdocStore.activeZoom = argument;
    }
  }
  /**
   * Set the document mode.
   * @param {DocumentMode} type
   * @returns {void}
   */
  setDocumentMode(type) {
    if (!type) return;
    type = type.toLowerCase();
    this.config.documentMode = type;
    this.#syncViewingVisibility();
    const types = {
      viewing: () => this.#setModeViewing(),
      editing: () => this.#setModeEditing(),
      suggesting: () => this.#setModeSuggesting()
    };
    if (types[type]) {
      types[type]();
    }
  }
  /**
   * Set the document mode on a document's editor (PresentationEditor or Editor).
   * Tries PresentationEditor first, falls back to Editor for backward compatibility.
   * @param {Object} doc - The document object
   * @param {string} mode - The document mode ('editing', 'viewing', 'suggesting')
   */
  #applyDocumentMode(doc, mode) {
    const presentationEditor = typeof doc.getPresentationEditor === "function" ? doc.getPresentationEditor() : null;
    if (presentationEditor) {
      presentationEditor.setDocumentMode(mode);
      return;
    }
    const editor = typeof doc.getEditor === "function" ? doc.getEditor() : null;
    if (editor) {
      editor.setDocumentMode(mode);
    }
  }
  /**
   * Force PresentationEditor instances to render a specific tracked-changes mode
   * or disable tracked-change metadata entirely.
   *
   * @param {{ mode?: 'review' | 'original' | 'final' | 'off', enabled?: boolean }} [preferences]
   */
  setTrackedChangesPreferences(preferences) {
    const normalized = preferences && Object.keys(preferences).length ? { ...preferences } : void 0;
    if (!this.config.layoutEngineOptions) {
      this.config.layoutEngineOptions = {};
    }
    this.config.layoutEngineOptions.trackedChanges = normalized;
    this.superdocStore?.documents?.forEach((doc) => {
      const presentationEditor = typeof doc.getPresentationEditor === "function" ? doc.getPresentationEditor() : null;
      if (presentationEditor?.setTrackedChangesOverrides) {
        presentationEditor.setTrackedChangesOverrides(normalized);
      }
    });
  }
  #setModeEditing() {
    if (this.config.role !== "editor") return this.#setModeSuggesting();
    if (this.superdocStore.documents.length > 0) {
      const firstEditor = this.superdocStore.documents[0]?.getEditor();
      if (firstEditor) this.setActiveEditor(firstEditor);
    }
    this.setTrackedChangesPreferences({ mode: "review", enabled: true });
    this.superdocStore.documents.forEach((doc) => {
      doc.restoreComments();
      this.#applyDocumentMode(doc, "editing");
    });
    if (this.toolbar) {
      this.toolbar.documentMode = "editing";
      this.toolbar.updateToolbarState();
    }
  }
  #setModeSuggesting() {
    if (!["editor", "suggester"].includes(this.config.role)) return this.#setModeViewing();
    if (this.superdocStore.documents.length > 0) {
      const firstEditor = this.superdocStore.documents[0]?.getEditor();
      if (firstEditor) this.setActiveEditor(firstEditor);
    }
    this.setTrackedChangesPreferences({ mode: "review", enabled: true });
    this.superdocStore.documents.forEach((doc) => {
      doc.restoreComments();
      this.#applyDocumentMode(doc, "suggesting");
    });
    if (this.toolbar) {
      this.toolbar.documentMode = "suggesting";
      this.toolbar.updateToolbarState();
    }
  }
  #setModeViewing() {
    this.toolbar.activeEditor = null;
    const commentsVisible = this.config.comments?.visible === true;
    const trackChangesVisible = this.config.trackChanges?.visible === true;
    this.setTrackedChangesPreferences(
      trackChangesVisible ? { mode: "review", enabled: true } : { mode: "original", enabled: true }
    );
    if (!commentsVisible && !trackChangesVisible) {
      this.commentsStore?.clearEditorCommentPositions?.();
    }
    this.superdocStore.documents.forEach((doc) => {
      if (commentsVisible || trackChangesVisible) {
        doc.restoreComments();
      } else {
        doc.removeComments();
      }
      this.#applyDocumentMode(doc, "viewing");
    });
    if (this.toolbar) {
      this.toolbar.documentMode = "viewing";
      this.toolbar.updateToolbarState();
    }
  }
  #syncViewingVisibility() {
    const commentsVisible = this.config.comments?.visible === true;
    const trackChangesVisible = this.config.trackChanges?.visible === true;
    const isViewingMode = this.config.documentMode === "viewing";
    const shouldRenderCommentsInViewing = commentsVisible || trackChangesVisible;
    if (this.commentsStore?.setViewingVisibility) {
      this.commentsStore.setViewingVisibility({
        documentMode: this.config.documentMode,
        commentsVisible,
        trackChangesVisible
      });
    }
    const docs = this.superdocStore?.documents;
    if (Array.isArray(docs) && docs.length > 0) {
      docs.forEach((doc) => {
        const presentationEditor = typeof doc.getPresentationEditor === "function" ? doc.getPresentationEditor() : null;
        if (presentationEditor?.setViewingCommentOptions) {
          presentationEditor.setViewingCommentOptions({
            emitCommentPositionsInViewing: isViewingMode && shouldRenderCommentsInViewing,
            enableCommentsInViewing: isViewingMode && commentsVisible
          });
        }
      });
    }
  }
  /**
   * Search for text or regex in the active editor
   * @param {string | RegExp} text The text or regex to search for
   * @returns {Object[]} The search results
   */
  search(text) {
    return this.activeEditor?.commands.search(text);
  }
  /**
   * Go to the next search result
   * @param {Object} match The match object
   * @returns {void}
   */
  goToSearchResult(match) {
    return this.activeEditor?.commands.goToSearchResult(match);
  }
  /**
   * Set the document to locked or unlocked
   * @param {boolean} lock
   */
  setLocked(lock = true) {
    this.config.documents.forEach((doc) => {
      const metaMap = doc.ydoc.getMap("meta");
      doc.ydoc.transact(() => {
        metaMap.set("locked", lock);
        metaMap.set("lockedBy", this.user);
      });
    });
  }
  /**
   * Get the HTML content of all editors
   * @returns {Array<string>} The HTML content of all editors
   */
  getHTML(options = {}) {
    const editors = [];
    this.superdocStore.documents.forEach((doc) => {
      const editor = doc.getEditor();
      if (editor) {
        editors.push(editor);
      }
    });
    return editors.map((editor) => editor.getHTML(options));
  }
  /**
   * Lock the current superdoc
   * @param {Boolean} isLocked
   * @param {User} lockedBy The user who locked the superdoc
   */
  lockSuperdoc(isLocked = false, lockedBy) {
    this.isLocked = isLocked;
    this.lockedBy = lockedBy;
    this.#log("🦋 [superdoc] Locking superdoc:", isLocked, lockedBy, "\n\n\n");
    this.emit("locked", { isLocked, lockedBy });
  }
  /**
   * Export the superdoc to a file
   * @param {ExportParams} params - Export configuration
   * @returns {Promise<void | Blob>}
   */
  async export({
    exportType = ["docx"],
    commentsType = "external",
    exportedName,
    additionalFiles = [],
    additionalFileNames = [],
    isFinalDoc = false,
    triggerDownload = true,
    fieldsHighlightColor = null
  } = {}) {
    const baseFileName = exportedName ? cleanName(exportedName) : cleanName(this.config.title);
    const docxFiles = await this.exportEditorsToDOCX({ commentsType, isFinalDoc, fieldsHighlightColor });
    const blobsToZip = [...additionalFiles];
    const filenames = [...additionalFileNames];
    if (exportType.includes("docx")) {
      docxFiles.forEach((blob) => {
        blobsToZip.push(blob);
        filenames.push(`${baseFileName}.docx`);
      });
    }
    if (blobsToZip.length === 1) {
      if (triggerDownload) {
        return createDownload(blobsToZip[0], baseFileName, exportType[0]);
      }
      return blobsToZip[0];
    }
    const zip = await createZip(blobsToZip, filenames);
    if (triggerDownload) {
      return createDownload(zip, baseFileName, "zip");
    }
    return zip;
  }
  /**
   * Export editors to DOCX format.
   * @param {{ commentsType?: string, isFinalDoc?: boolean }} [options]
   * @returns {Promise<Array<Blob>>}
   */
  async exportEditorsToDOCX({ commentsType, isFinalDoc, fieldsHighlightColor } = {}) {
    const comments = [];
    if (commentsType !== "clean") {
      if (this.commentsStore && typeof this.commentsStore.translateCommentsForExport === "function") {
        comments.push(...this.commentsStore.translateCommentsForExport());
      }
    }
    const docxPromises = this.superdocStore.documents.map(async (doc) => {
      if (!doc || doc.type !== DOCX) return null;
      const editor = typeof doc.getEditor === "function" ? doc.getEditor() : null;
      const fallbackDocx = () => {
        if (!doc.data) return null;
        if (doc.data.type && doc.data.type !== DOCX) return null;
        return doc.data;
      };
      if (!editor) return fallbackDocx();
      try {
        const exported = await editor.exportDocx({ isFinalDoc, comments, commentsType, fieldsHighlightColor });
        if (exported) return exported;
      } catch (error) {
        this.emit("exception", { error, document: doc });
      }
      return fallbackDocx();
    });
    const docxFiles = await Promise.all(docxPromises);
    return docxFiles.filter(Boolean);
  }
  /**
   * Request an immediate save from all collaboration documents
   * @returns {Promise<void>} Resolves when all documents have saved
   */
  async #triggerCollaborationSaves() {
    this.#log("🦋 [superdoc] Triggering collaboration saves");
    return new Promise((resolve) => {
      this.superdocStore.documents.forEach((doc, index) => {
        this.#log(`Before reset - Doc ${index}: pending = ${this.pendingCollaborationSaves}`);
        this.pendingCollaborationSaves = 0;
        if (doc.ydoc) {
          this.pendingCollaborationSaves++;
          this.#log(`After increment - Doc ${index}: pending = ${this.pendingCollaborationSaves}`);
          const metaMap = doc.ydoc.getMap("meta");
          metaMap.observe((event) => {
            if (event.changes.keys.has("immediate-save-finished")) {
              this.pendingCollaborationSaves--;
              if (this.pendingCollaborationSaves <= 0) {
                resolve();
              }
            }
          });
          metaMap.set("immediate-save", true);
        }
      });
      this.#log(
        `FINAL pending = ${this.pendingCollaborationSaves}, but we have ${this.superdocStore.documents.filter((d) => d.ydoc).length} docs!`
      );
    });
  }
  /**
   * Save the superdoc if in collaboration mode
   * @returns {Promise<void[]>} Resolves when all documents have saved
   */
  async save() {
    const savePromises = [
      this.#triggerCollaborationSaves()
      // this.exportEditorsToDOCX(),
    ];
    this.#log("🦋 [superdoc] Saving superdoc");
    const result = await Promise.all(savePromises);
    this.#log("🦋 [superdoc] Save complete:", result);
    return result;
  }
  /**
   * Clean up collaboration resources (providers, ydocs, sockets)
   * @returns {void}
   */
  #cleanupCollaboration() {
    this.config.socket?.cancelWebsocketRetry();
    this.config.socket?.disconnect();
    this.config.socket?.destroy();
    this.ydoc?.destroy();
    this.provider?.disconnect();
    this.provider?.destroy();
    this.config.documents.forEach((doc) => {
      doc.provider?.disconnect();
      doc.provider?.destroy();
      doc.ydoc?.destroy();
    });
  }
  /**
   * Destroy the superdoc instance
   * @returns {void}
   */
  destroy() {
    this.#destroyed = true;
    this.#cleanupCollaboration();
    if (!this.app) {
      return;
    }
    this.#log("[superdoc] Unmounting app");
    this.superdocStore.reset();
    this.app.unmount();
    this.removeAllListeners();
    delete this.app.config.globalProperties.$config;
    delete this.app.config.globalProperties.$superdoc;
  }
  /**
   * Focus the active editor or the first editor in the superdoc
   * @returns {void}
   */
  focus() {
    if (this.activeEditor) {
      this.activeEditor.focus();
    } else {
      this.superdocStore.documents.find((doc) => {
        const editor = doc.getEditor();
        if (editor) {
          editor.focus();
        }
      });
    }
  }
  /**
   * Set the high contrast mode
   * @param {boolean} isHighContrast
   * @returns {void}
   */
  setHighContrastMode(isHighContrast) {
    if (!this.activeEditor) return;
    this.activeEditor.setHighContrastMode(isHighContrast);
    this.highContrastModeStore.setHighContrastMode(isHighContrast);
  }
}
export {
  DOCX as D,
  HTML as H,
  NBaseLoading as N,
  PDF as P,
  SuperDoc as S,
  useSelection as a,
  compareVersions as c,
  getSchemaIntrospection as g,
  storeToRefs as s,
  useSuperdocStore as u
};
