"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      module.exports = window.WorldCupGZM;
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      var R = window.React;
      function jsx2(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsx2;
      module.exports.jsxDEV = jsx2;
      module.exports.Fragment = R.Fragment;
    }
  });

  // .design-sync/previews/Leaderboard.tsx
  var Leaderboard_exports = {};
  __export(Leaderboard_exports, {
    Empty: () => Empty,
    WithEntries: () => WithEntries
  });

  // ds-shim:ds
  var ds_exports = {};
  __export(ds_exports, {
    default: () => ds_default
  });
  __reExport(ds_exports, __toESM(require_ds_raw()));
  var g = window.WorldCupGZM;
  var ds_default = "default" in g ? g.default : g;

  // .design-sync/previews/Leaderboard.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var entries = [
    { user_id: "1", user_name: "Pedro Silva", total_points: 127, correct_1x2: 31, correct_scores: 14, bonus_points: 25 },
    { user_id: "2", user_name: "João Santos", total_points: 98, correct_1x2: 26, correct_scores: 10, bonus_points: 10 },
    { user_id: "3", user_name: "Ana Costa", total_points: 84, correct_1x2: 22, correct_scores: 8, bonus_points: 10 },
    { user_id: "4", user_name: "Miguel Rodrigues", total_points: 71, correct_1x2: 19, correct_scores: 6, bonus_points: 0 },
    { user_id: "5", user_name: "Sofia Fernandes", total_points: 63, correct_1x2: 17, correct_scores: 5, bonus_points: 0 },
    { user_id: "6", user_name: "Carlos Pereira", total_points: 55, correct_1x2: 15, correct_scores: 4, bonus_points: 0 }
  ];
  function WithEntries() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "#060d1e", padding: 24, maxWidth: 600 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Leaderboard, { entries }) });
  }
  function Empty() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "#060d1e", padding: 24, maxWidth: 600 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_exports.Leaderboard, { entries: [] }) });
  }
  return __toCommonJS(Leaderboard_exports);
})();
