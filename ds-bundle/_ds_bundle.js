/* @ds-bundle: {"namespace":"WorldCupGZM","components":[{"name":"Header","sourcePath":"components/general/Header/Header.jsx"},{"name":"HeroSection","sourcePath":"components/general/HeroSection/HeroSection.jsx"},{"name":"HomePalpitesSection","sourcePath":"components/general/HomePalpitesSection/HomePalpitesSection.jsx"},{"name":"Leaderboard","sourcePath":"components/general/Leaderboard/Leaderboard.jsx"},{"name":"LeaderboardSection","sourcePath":"components/general/LeaderboardSection/LeaderboardSection.jsx"},{"name":"MatchCard","sourcePath":"components/general/MatchCard/MatchCard.jsx"},{"name":"RegisterSection","sourcePath":"components/general/RegisterSection/RegisterSection.jsx"}],"sourceHashes":{"components/general/Header/Header.jsx":"bf1fb72ca540","components/general/Header/Header.d.ts":"0a63b08fd26b","components/general/Header/Header.prompt.md":"2b163aec9786","components/general/HeroSection/HeroSection.jsx":"c8042ce6070a","components/general/HeroSection/HeroSection.d.ts":"4133563362f5","components/general/HeroSection/HeroSection.prompt.md":"8ca8642115b3","components/general/HomePalpitesSection/HomePalpitesSection.jsx":"c1ec48421df6","components/general/HomePalpitesSection/HomePalpitesSection.d.ts":"32b231d4f0b3","components/general/HomePalpitesSection/HomePalpitesSection.prompt.md":"3ec228ca7dca","components/general/Leaderboard/Leaderboard.jsx":"ac2f87400fcd","components/general/Leaderboard/Leaderboard.d.ts":"681549336993","components/general/Leaderboard/Leaderboard.prompt.md":"1ce67ad2f40b","components/general/LeaderboardSection/LeaderboardSection.jsx":"785ffed3159b","components/general/LeaderboardSection/LeaderboardSection.d.ts":"faeab622bfe5","components/general/LeaderboardSection/LeaderboardSection.prompt.md":"818c4361d8ce","components/general/MatchCard/MatchCard.jsx":"bcf51f32bcbb","components/general/MatchCard/MatchCard.d.ts":"52b5f9a7fb6e","components/general/MatchCard/MatchCard.prompt.md":"ee7dca4caf38","components/general/RegisterSection/RegisterSection.jsx":"58f0f7db6e7d","components/general/RegisterSection/RegisterSection.d.ts":"85aa59247c72","components/general/RegisterSection/RegisterSection.prompt.md":"457b66c43820"},"inlinedExternals":["clsx","lucide-react","tailwind-merge"],"builtBy":"cc-design-sync"} */
"use strict";
var WorldCupGZM = (() => {
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
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // shim:next-link-shim
  var require_next_link_shim = __commonJS({
    "shim:next-link-shim"(exports, module) {
      var R = window.React;
      module.exports = function Link3(p) {
        return R.createElement("a", Object.assign({}, p, { href: p.href || "#" }), p.children);
      };
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      var R = window.React;
      function jsx8(t, p, k) {
        return R.createElement(t, k === void 0 ? p : Object.assign({ key: k }, p));
      }
      module.exports = R;
      module.exports.jsx = jsx8;
      module.exports.jsxs = jsx8;
      module.exports.jsxDEV = jsx8;
      module.exports.Fragment = R.Fragment;
    }
  });

  // shim:next-nav-shim
  var require_next_nav_shim = __commonJS({
    "shim:next-nav-shim"(exports) {
      exports.useRouter = function() {
        return { push: function() {
        }, replace: function() {
        }, back: function() {
        }, refresh: function() {
        }, forward: function() {
        } };
      };
      exports.usePathname = function() {
        return "/";
      };
      exports.useSearchParams = function() {
        return new URLSearchParams();
      };
      exports.useParams = function() {
        return {};
      };
    }
  });

  // _ds_entry.tsx
  var ds_entry_exports = {};
  __export(ds_entry_exports, {
    Header: () => Header,
    HeroSection: () => HeroSection,
    HomePalpitesSection: () => HomePalpitesSection,
    Leaderboard: () => Leaderboard,
    LeaderboardSection: () => LeaderboardSection,
    MatchCard: () => MatchCard,
    RegisterSection: () => RegisterSection
  });

  // src/components/Header.tsx
  var import_link = __toESM(require_next_link_shim());
  var import_jsx_runtime = __toESM(require_react_shim());
  function Header() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "header",
      {
        className: "sticky top-0 z-50 backdrop-blur-md border-b border-white/8",
        style: { background: "rgba(6,13,30,0.95)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "h-1 w-full flex", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-wc-electric" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-wc-red" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-wc-green" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 bg-wc-gold" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-5xl mx-auto px-4 h-13 flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_link.default, { href: "/", className: "flex items-center gap-2.5 group", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: "w-8 h-8 rounded-lg flex items-center justify-center font-display text-wc-navy text-xl leading-none",
                  style: { background: "linear-gradient(135deg, #f5c300, #ffd93d)" },
                  children: "26"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col leading-none", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-display text-wc-white text-lg tracking-wider leading-none", children: "BOL\xC3O" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] font-semibold tracking-widest uppercase text-wc-white/30 leading-none mt-0.5", children: "GZM \xB7 Mundial 2026" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_link.default,
                {
                  href: "/palpites",
                  className: "text-sm font-bold text-wc-white/50 hover:text-wc-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all tracking-wide",
                  children: "Palpites"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_link.default,
                {
                  href: "/#classificacao",
                  className: "text-sm font-bold text-wc-white/50 hover:text-wc-gold px-3 py-1.5 rounded-lg hover:bg-wc-gold/10 transition-all tracking-wide",
                  children: "Classifica\xE7\xE3o"
                }
              )
            ] })
          ] })
        ]
      }
    );
  }

  // src/components/HeroSection.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  function HeroSection() {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "relative overflow-hidden py-16 sm:py-24", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full opacity-25",
            style: { background: "radial-gradient(circle, #2352f0 0%, transparent 65%)" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "absolute -top-24 -right-20 w-[380px] h-[380px] rounded-full opacity-20",
            style: { background: "radial-gradient(circle, #e63312 0%, transparent 65%)" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "absolute top-1/2 -left-16 w-64 h-64 rounded-full opacity-15",
            style: { background: "radial-gradient(circle, #00a652 0%, transparent 65%)" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: "absolute top-8 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-10",
            style: { background: "radial-gradient(circle, #f5c300 0%, transparent 60%)" }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute top-0 right-0 w-48 h-48 overflow-hidden pointer-events-none opacity-30", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0", style: {
        background: "repeating-linear-gradient(135deg, #e63312 0px, #e63312 4px, transparent 4px, transparent 16px)"
      } }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative max-w-4xl mx-auto px-4 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-wc-red/30",
            style: { background: "rgba(230,51,18,0.08)" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "w-2 h-2 rounded-full bg-wc-red animate-pulse" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs font-bold tracking-widest uppercase text-wc-red", children: "A Decorrer \xB7 Jun / Jul 2026" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", { className: "font-display leading-none tracking-wide", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-wc-white", style: { fontSize: "clamp(3.5rem, 14vw, 8rem)" }, children: "BOL\xC3O" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block text-gold-gradient", style: { fontSize: "clamp(2.8rem, 11vw, 6.5rem)" }, children: "MUNDIAL 2026" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center justify-center gap-3 mb-8", children: [
          { code: "us", name: "EUA" },
          { code: "ca", name: "Canad\xE1" },
          { code: "mx", name: "M\xE9xico" }
        ].map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2", children: [
          i > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-wc-white/20 text-xs", children: "\xB7" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "img",
            {
              src: `https://flagcdn.com/w40/${n.code}.png`,
              alt: n.name,
              width: 24,
              height: 16,
              className: "rounded-[3px] shadow-sm"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-wc-white/40 text-sm font-medium", children: n.name })
        ] }, n.code)) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-10 flex flex-wrap justify-center gap-2", children: [
          { pts: "1pt", label: "1X2 correto", color: "bg-wc-electric/15 border-wc-electric/30 text-wc-electric" },
          { pts: "3pts", label: "Resultado exato", color: "bg-wc-green/15 border-wc-green/30 text-wc-green" },
          { pts: "10pts", label: "Vencedor", color: "bg-wc-gold/15 border-wc-gold/30 text-wc-gold" },
          { pts: "15pts", label: "Melhor marcador", color: "bg-wc-red/15 border-wc-red/30 text-wc-red" }
        ].map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `flex items-center gap-1.5 border rounded-full px-3 py-1.5 ${item.color}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-bold text-xs tabular-nums", children: item.pts }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-wc-white/40 text-xs", children: item.label })
        ] }, item.label)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute bottom-0 left-0 right-0 pointer-events-none", "aria-hidden": true, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { viewBox: "0 0 1440 40", className: "w-full", preserveAspectRatio: "none", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "path",
        {
          d: "M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z",
          fill: "rgba(35,82,240,0.08)"
        }
      ) }) })
    ] });
  }

  // src/components/HomePalpitesSection.tsx
  var import_react4 = __toESM(require_react_shim());
  var import_link2 = __toESM(require_next_link_shim());

  // node_modules/lucide-react/dist/esm/createLucideIcon.mjs
  var import_react3 = __toESM(require_react_shim(), 1);

  // node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  // node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // node_modules/lucide-react/dist/esm/Icon.mjs
  var import_react2 = __toESM(require_react_shim(), 1);

  // node_modules/lucide-react/dist/esm/defaultAttributes.mjs
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // node_modules/lucide-react/dist/esm/context.mjs
  var import_react = __toESM(require_react_shim(), 1);
  var LucideContext = (0, import_react.createContext)({});
  var useLucideContext = () => (0, import_react.useContext)(LucideContext);

  // node_modules/lucide-react/dist/esm/Icon.mjs
  var Icon = (0, import_react2.forwardRef)(
    ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
      const {
        size: contextSize = 24,
        strokeWidth: contextStrokeWidth = 2,
        absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
        color: contextColor = "currentColor",
        className: contextClass = ""
      } = useLucideContext() ?? {};
      const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
      return (0, import_react2.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size ?? contextSize ?? defaultAttributes.width,
          height: size ?? contextSize ?? defaultAttributes.height,
          stroke: color ?? contextColor,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClasses("lucide", contextClass, className),
          ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.mjs
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react3.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react3.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/arrow-right.mjs
  var __iconNode = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  var ArrowRight = createLucideIcon("arrow-right", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/circle-alert.mjs
  var __iconNode2 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  var CircleAlert = createLucideIcon("circle-alert", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/circle-check.mjs
  var __iconNode3 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("circle-check", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/loader-circle.mjs
  var __iconNode4 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  var LoaderCircle = createLucideIcon("loader-circle", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/lock.mjs
  var __iconNode5 = [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
  ];
  var Lock = createLucideIcon("lock", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs
  var __iconNode6 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("refresh-cw", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/star.mjs
  var __iconNode7 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  var Star = createLucideIcon("star", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/target.mjs
  var __iconNode8 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
  ];
  var Target = createLucideIcon("target", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/trophy.mjs
  var __iconNode9 = [
    ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }],
    ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }],
    ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
    ["path", { d: "M4 22h16", key: "57wxv0" }],
    ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
    ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]
  ];
  var Trophy = createLucideIcon("trophy", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/user-plus.mjs
  var __iconNode10 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
    ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
    ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
  ];
  var UserPlus = createLucideIcon("user-plus", __iconNode10);

  // src/lib/flags.ts
  var TEAM_CODES = {
    // Group A
    "M\xE9xico": "MEX",
    "\xC1frica do Sul": "RSA",
    "Korea do Sul": "KOR",
    "Rep\xFAblica Checa": "CZE",
    // Group B
    "Canad\xE1": "CAN",
    "B\xF3snia H.": "BIH",
    "Qatar": "QAT",
    "Su\xED\xE7a": "SUI",
    // Group C
    "Brasil": "BRA",
    "Marrocos": "MAR",
    "Haiti": "HAI",
    "Esc\xF3cia": "SCO",
    // Group D
    "Estados Unidos": "USA",
    "Paraguai": "PAR",
    "Austr\xE1lia": "AUS",
    "Turquia": "TUR",
    // Group E
    "Alemanha": "GER",
    "Cura\xE7au": "CUW",
    "Costa do Marfim": "CIV",
    "Equador": "ECU",
    // Group F
    "Holanda": "NED",
    "Jap\xE3o": "JPN",
    "Su\xE9cia": "SWE",
    "Tun\xEDsia": "TUN",
    // Group G
    "B\xE9lgica": "BEL",
    "Egito": "EGY",
    "Ir\xE3o": "IRN",
    "Nova Zel\xE2ndia": "NZL",
    // Group H
    "Espanha": "ESP",
    "Cabo Verde": "CPV",
    "Ar\xE1bia Saudita": "KSA",
    "Uruguai": "URU",
    // Group I
    "Fran\xE7a": "FRA",
    "Senegal": "SEN",
    "Iraque": "IRQ",
    "Noruega": "NOR",
    // Group J
    "Argentina": "ARG",
    "Arg\xE9lia": "ALG",
    "\xC1ustria": "AUT",
    "Jord\xE2nia": "JOR",
    // Group K
    "Portugal": "POR",
    "Congo": "CGO",
    "Uzbequist\xE3o": "UZB",
    "Col\xF4mbia": "COL",
    // Group L
    "Inglaterra": "ENG",
    "Cro\xE1cia": "CRO",
    "Gana": "GHA",
    "Panam\xE1": "PAN"
  };
  function getTeamCode(team) {
    return TEAM_CODES[team] ?? team.slice(0, 3).toUpperCase();
  }
  var FLAG_CODES = {
    // Group A
    "M\xE9xico": "mx",
    "\xC1frica do Sul": "za",
    "Korea do Sul": "kr",
    "Rep\xFAblica Checa": "cz",
    // Group B
    "Canad\xE1": "ca",
    "B\xF3snia H.": "ba",
    "Qatar": "qa",
    "Su\xED\xE7a": "ch",
    // Group C
    "Brasil": "br",
    "Marrocos": "ma",
    "Haiti": "ht",
    "Esc\xF3cia": "gb-sct",
    // Group D
    "Estados Unidos": "us",
    "Paraguai": "py",
    "Austr\xE1lia": "au",
    "Turquia": "tr",
    // Group E
    "Alemanha": "de",
    "Cura\xE7au": "cw",
    "Costa do Marfim": "ci",
    "Equador": "ec",
    // Group F
    "Holanda": "nl",
    "Jap\xE3o": "jp",
    "Su\xE9cia": "se",
    "Tun\xEDsia": "tn",
    // Group G
    "B\xE9lgica": "be",
    "Egito": "eg",
    "Ir\xE3o": "ir",
    "Nova Zel\xE2ndia": "nz",
    // Group H
    "Espanha": "es",
    "Cabo Verde": "cv",
    "Ar\xE1bia Saudita": "sa",
    "Uruguai": "uy",
    // Group I
    "Fran\xE7a": "fr",
    "Senegal": "sn",
    "Iraque": "iq",
    "Noruega": "no",
    // Group J
    "Argentina": "ar",
    "Arg\xE9lia": "dz",
    "\xC1ustria": "at",
    "Jord\xE2nia": "jo",
    // Group K
    "Portugal": "pt",
    "Congo": "cg",
    "Uzbequist\xE3o": "uz",
    "Col\xF4mbia": "co",
    // Group L
    "Inglaterra": "gb-eng",
    "Cro\xE1cia": "hr",
    "Gana": "gh",
    "Panam\xE1": "pa"
  };
  function getFlagUrl(team, size = "w40") {
    const code = FLAG_CODES[team];
    if (!code) return "";
    return `https://flagcdn.com/${size}/${code}.png`;
  }

  // src/components/HomePalpitesSection.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  function matchTimeStr(match_date) {
    return new Date(match_date).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Lisbon"
    });
  }
  function infer1x2(h, a) {
    return h > a ? "1" : h < a ? "2" : "x";
  }
  function chipState(pred, match) {
    if (match.status !== "finished" || pred.home_goals === null) return "pending";
    if (pred.home_goals === match.home_score && pred.away_goals === match.away_score) return "exact";
    if ((pred.points_earned ?? 0) > 0) return "partial";
    return "wrong";
  }
  function UserChip({ pred, match }) {
    const state = chipState(pred, match);
    const hasScore = pred.home_goals !== null;
    const score = hasScore ? `${pred.home_goals}\u2013${pred.away_goals}` : "\u2013";
    const pts = pred.points_earned ?? 0;
    const bet = pred.prediction_1x2;
    const firstName = pred.user_name.split(" ")[0];
    const showBadge = hasScore && state !== "pending";
    const styles = {
      exact: { bg: "#100d00", border: "#2e2200", scoreColor: "#f5c300", ptsBg: "#3a2e00", ptsTxt: "#f5c300", betTxt: "#e8c94a", betBg: "#2a2200" },
      partial: { bg: "#0d1608", border: "#1e3010", scoreColor: "#5ed46a", ptsBg: "#1a3a1a", ptsTxt: "#5ed46a", betTxt: "#4caf74", betBg: "#1a3a1a" },
      wrong: { bg: "#0e0e0e", border: "#1a1a1a", scoreColor: "#2e2e2e", ptsBg: "#1c1c1c", ptsTxt: "#444", betTxt: "#aaa", betBg: "#333" },
      pending: { bg: "#0e0e0e", border: "#1e1e1e", scoreColor: "#555", ptsBg: "transparent", ptsTxt: "#2a2a2a", betTxt: "#bbb", betBg: "#333" }
    }[state];
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "w-full h-[72px]",
        style: {
          flexShrink: 0,
          position: "relative",
          background: styles.bg,
          border: `1px solid ${styles.border}`,
          borderRadius: 8,
          padding: "7px 9px 6px",
          opacity: state === "pending" ? 0.5 : 1
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { style: { fontSize: 9, letterSpacing: "0.07em", textTransform: "uppercase", color: "#888", maxWidth: 62, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1 }, children: firstName }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 17, fontWeight: 800, color: styles.scoreColor, lineHeight: 1, whiteSpace: "nowrap" }, children: score }),
          showBadge && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: {
            position: "absolute",
            top: -7,
            right: -7,
            minWidth: 18,
            height: 18,
            background: pts > 0 ? styles.ptsBg : "#1c1c1c",
            color: pts > 0 ? styles.ptsTxt : "#3a3a3a",
            border: `2px solid ${styles.bg}`,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: "0.02em",
            padding: "0 4px",
            lineHeight: 1,
            zIndex: 10
          }, children: pts > 0 ? `+${pts}` : "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { position: "absolute", bottom: 7, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center" }, children: ["1", "x", "2"].map((opt, i) => {
            const isSelected = bet === opt;
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { style: { display: "flex", alignItems: "center" }, children: [
              i > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { fontSize: 8, color: styles.betTxt, padding: "0 1px", opacity: 0.2 }, children: "\xB7" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: {
                fontSize: 9,
                fontWeight: 700,
                padding: "1px 3px",
                borderRadius: 3,
                color: styles.betTxt,
                background: isSelected ? styles.betBg : "transparent",
                opacity: isSelected ? 1 : 0.2
              }, children: opt.toUpperCase() })
            ] }, opt);
          }) })
        ]
      }
    );
  }
  function GameInfoCard({ match }) {
    const finished = match.status === "finished";
    const actual1x2 = finished && match.home_score !== null ? infer1x2(match.home_score, match.away_score) : null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: "w-[96px] sm:w-[180px]",
        style: {
          flexShrink: 0,
          alignSelf: "stretch",
          background: "rgba(22,22,22,0.9)",
          border: "1px solid #222",
          borderRadius: 8,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
            match.matchday && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { style: { fontSize: 9, fontWeight: 800, color: "#444", letterSpacing: "0.04em" }, children: [
              "J",
              match.matchday
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { style: { fontSize: 10, color: "#555", lineHeight: 1 }, children: matchTimeStr(match.match_date) })
          ] }),
          [
            { team: match.home_team, score: match.home_score },
            { team: match.away_team, score: match.away_score }
          ].map((t, i) => {
            const flagUrl = getFlagUrl(t.team, "w40");
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 5 }, children: [
              flagUrl && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: flagUrl, alt: t.team, width: 16, height: 11, style: { borderRadius: 2, flexShrink: 0 } }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "hidden sm:block", style: { flex: 1, fontSize: 11, fontWeight: 600, color: "#bbb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: t.team }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "sm:hidden", style: { flex: 1, fontSize: 10, fontWeight: 700, color: "#888", overflow: "hidden", whiteSpace: "nowrap" }, children: t.team.substring(0, 3).toUpperCase() }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: { fontSize: 14, fontWeight: 800, color: finished ? "#fff" : "#2a2a2a", minWidth: 10, textAlign: "right", flexShrink: 0 }, children: finished ? String(t.score ?? "?") : "\u2013" })
            ] }, i);
          }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }, children: ["1", "x", "2"].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { style: {
            fontSize: 10,
            fontWeight: 800,
            padding: "1px 4px",
            borderRadius: 3,
            color: actual1x2 === opt ? "#e8c94a" : finished ? "#2e2e2e" : "#1e1e1e",
            background: actual1x2 === opt ? "rgba(30,25,0,1)" : "transparent"
          }, children: opt.toUpperCase() }, opt)) })
        ] })
      }
    );
  }
  function HomePalpitesSection() {
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" });
    const dayOptions = [
      {
        label: "Ontem",
        date: new Date(Date.now() - 864e5).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" })
      },
      { label: "Hoje", date: today },
      {
        label: "Amanh\xE3",
        date: new Date(Date.now() + 864e5).toLocaleDateString("sv", { timeZone: "Europe/Lisbon" })
      }
    ];
    const [selectedDate, setSelectedDate] = (0, import_react4.useState)(today);
    const [dayMatches, setDayMatches] = (0, import_react4.useState)([]);
    const [dayUsers, setDayUsers] = (0, import_react4.useState)([]);
    const [loading, setLoading] = (0, import_react4.useState)(false);
    (0, import_react4.useEffect)(() => {
      setLoading(true);
      fetch(`/api/palpites/day?date=${selectedDate}`).then((r2) => r2.json()).then((data) => {
        setDayMatches(data.matches ?? []);
        setDayUsers(data.users ?? []);
      }).finally(() => setLoading(false));
    }, [selectedDate]);
    const matchesByGroup = (() => {
      const sections = [];
      for (const m of dayMatches) {
        const last = sections[sections.length - 1];
        if (last?.group === m.group) last.matches.push(m);
        else sections.push({ group: m.group, matches: [m] });
      }
      return sections;
    })();
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "px-4 py-12 lg:px-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-1 h-6 rounded-full bg-wc-electric" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "font-display text-2xl text-wc-white tracking-wider", children: "PALPITES" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex gap-1.5", children: dayOptions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              onClick: () => setSelectedDate(d.date),
              className: "px-3 py-1 rounded-full text-xs font-medium border transition-all",
              style: selectedDate === d.date ? { background: "#f5c300", color: "#060d1e", borderColor: "#f5c300", fontWeight: 700 } : { background: "transparent", color: "#555", borderColor: "#1e1e1e" },
              children: d.label
            },
            d.date
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            import_link2.default,
            {
              href: "/palpites",
              className: "flex items-center gap-1 text-xs text-wc-white/30 hover:text-wc-gold transition-colors",
              children: [
                "Ver tudo ",
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArrowRight, { size: 12 })
              ]
            }
          )
        ] })
      ] }),
      loading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-6 h-6 rounded-full border-2 border-wc-gold/30 border-t-wc-gold animate-spin" }) }) : dayMatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-center py-12 text-sm text-wc-white/20", children: "Sem jogos neste dia" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-6", children: matchesByGroup.map(({ group, matches: gms }, gi) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-[10px] font-bold tracking-widest uppercase text-wc-white/20", children: "Fase de Grupos" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "font-display text-wc-gold text-base tracking-wider", children: [
            "GRUPO ",
            group
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex-1 h-px", style: { background: "rgba(255,255,255,0.05)" } })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-2", children: gms.map((match) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex gap-2 items-stretch", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GameInfoCard, { match }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: "flex-1 grid grid-cols-2 sm:grid-cols-4 gap-1.5",
              style: { paddingTop: 9, paddingRight: 9, paddingBottom: 4 },
              children: dayUsers.map((u) => {
                const pred = match.predictions.find((p) => p.user_id === u.id) ?? {
                  user_id: u.id,
                  user_name: u.name,
                  home_goals: null,
                  away_goals: null,
                  prediction_1x2: null,
                  points_earned: null
                };
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(UserChip, { pred, match }, u.id);
              })
            }
          )
        ] }, match.id)) })
      ] }, `${group}-${gi}`)) })
    ] });
  }

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // node_modules/tailwind-merge/dist/bundle-mjs.mjs
  var concatArrays = (array1, array2) => {
    const combinedArray = new Array(array1.length + array2.length);
    for (let i = 0; i < array1.length; i++) {
      combinedArray[i] = array1[i];
    }
    for (let i = 0; i < array2.length; i++) {
      combinedArray[array1.length + i] = array2[i];
    }
    return combinedArray;
  };
  var createClassValidatorObject = (classGroupId, validator) => ({
    classGroupId,
    validator
  });
  var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
    nextPart,
    validators,
    classGroupId
  });
  var CLASS_PART_SEPARATOR = "-";
  var EMPTY_CONFLICTS = [];
  var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
  var createClassGroupUtils = (config) => {
    const classMap = createClassMap(config);
    const {
      conflictingClassGroups,
      conflictingClassGroupModifiers
    } = config;
    const getClassGroupId = (className) => {
      if (className.startsWith("[") && className.endsWith("]")) {
        return getGroupIdForArbitraryProperty(className);
      }
      const classParts = className.split(CLASS_PART_SEPARATOR);
      const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
      return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
      if (hasPostfixModifier) {
        const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
        const baseConflicts = conflictingClassGroups[classGroupId];
        if (modifierConflicts) {
          if (baseConflicts) {
            return concatArrays(baseConflicts, modifierConflicts);
          }
          return modifierConflicts;
        }
        return baseConflicts || EMPTY_CONFLICTS;
      }
      return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
      getClassGroupId,
      getConflictingClassGroupIds
    };
  };
  var getGroupRecursive = (classParts, startIndex, classPartObject) => {
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
      return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
      const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
      if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
      return void 0;
    }
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for (let i = 0; i < validatorsLength; i++) {
      const validatorObj = validators[i];
      if (validatorObj.validator(classRest)) {
        return validatorObj.classGroupId;
      }
    }
    return void 0;
  };
  var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
    const content = className.slice(1, -1);
    const colonIndex = content.indexOf(":");
    const property = content.slice(0, colonIndex);
    return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
  })();
  var createClassMap = (config) => {
    const {
      theme,
      classGroups
    } = config;
    return processClassGroups(classGroups, theme);
  };
  var processClassGroups = (classGroups, theme) => {
    const classMap = createClassPartObject();
    for (const classGroupId in classGroups) {
      const group = classGroups[classGroupId];
      processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
  };
  var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
    const len = classGroup.length;
    for (let i = 0; i < len; i++) {
      const classDefinition = classGroup[i];
      processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
  };
  var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (typeof classDefinition === "string") {
      processStringDefinition(classDefinition, classPartObject, classGroupId);
      return;
    }
    if (typeof classDefinition === "function") {
      processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
      return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
  };
  var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
    const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
  };
  var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    if (isThemeGetter(classDefinition)) {
      processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
      return;
    }
    if (classPartObject.validators === null) {
      classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
  };
  var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for (let i = 0; i < len; i++) {
      const [key, value] = entries[i];
      processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
  };
  var getPart = (classPartObject, path) => {
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      let next = current.nextPart.get(part);
      if (!next) {
        next = createClassPartObject();
        current.nextPart.set(part, next);
      }
      current = next;
    }
    return current;
  };
  var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
  var createLruCache = (maxCacheSize) => {
    if (maxCacheSize < 1) {
      return {
        get: () => void 0,
        set: () => {
        }
      };
    }
    let cacheSize = 0;
    let cache = /* @__PURE__ */ Object.create(null);
    let previousCache = /* @__PURE__ */ Object.create(null);
    const update = (key, value) => {
      cache[key] = value;
      cacheSize++;
      if (cacheSize > maxCacheSize) {
        cacheSize = 0;
        previousCache = cache;
        cache = /* @__PURE__ */ Object.create(null);
      }
    };
    return {
      get(key) {
        let value = cache[key];
        if (value !== void 0) {
          return value;
        }
        if ((value = previousCache[key]) !== void 0) {
          update(key, value);
          return value;
        }
      },
      set(key, value) {
        if (key in cache) {
          cache[key] = value;
        } else {
          update(key, value);
        }
      }
    };
  };
  var IMPORTANT_MODIFIER = "!";
  var MODIFIER_SEPARATOR = ":";
  var EMPTY_MODIFIERS = [];
  var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
    modifiers,
    hasImportantModifier,
    baseClassName,
    maybePostfixModifierPosition,
    isExternal
  });
  var createParseClassName = (config) => {
    const {
      prefix,
      experimentalParseClassName
    } = config;
    let parseClassName = (className) => {
      const modifiers = [];
      let bracketDepth = 0;
      let parenDepth = 0;
      let modifierStart = 0;
      let postfixModifierPosition;
      const len = className.length;
      for (let index = 0; index < len; index++) {
        const currentCharacter = className[index];
        if (bracketDepth === 0 && parenDepth === 0) {
          if (currentCharacter === MODIFIER_SEPARATOR) {
            modifiers.push(className.slice(modifierStart, index));
            modifierStart = index + 1;
            continue;
          }
          if (currentCharacter === "/") {
            postfixModifierPosition = index;
            continue;
          }
        }
        if (currentCharacter === "[") bracketDepth++;
        else if (currentCharacter === "]") bracketDepth--;
        else if (currentCharacter === "(") parenDepth++;
        else if (currentCharacter === ")") parenDepth--;
      }
      const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
      let baseClassName = baseClassNameWithImportantModifier;
      let hasImportantModifier = false;
      if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
        baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
        hasImportantModifier = true;
      } else if (
        /**
         * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
         * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
         */
        baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
      ) {
        baseClassName = baseClassNameWithImportantModifier.slice(1);
        hasImportantModifier = true;
      }
      const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
      return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
      const fullPrefix = prefix + MODIFIER_SEPARATOR;
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
    }
    if (experimentalParseClassName) {
      const parseClassNameOriginal = parseClassName;
      parseClassName = (className) => experimentalParseClassName({
        className,
        parseClassName: parseClassNameOriginal
      });
    }
    return parseClassName;
  };
  var createSortModifiers = (config) => {
    const modifierWeights = /* @__PURE__ */ new Map();
    config.orderSensitiveModifiers.forEach((mod, index) => {
      modifierWeights.set(mod, 1e6 + index);
    });
    return (modifiers) => {
      const result = [];
      let currentSegment = [];
      for (let i = 0; i < modifiers.length; i++) {
        const modifier = modifiers[i];
        const isArbitrary = modifier[0] === "[";
        const isOrderSensitive = modifierWeights.has(modifier);
        if (isArbitrary || isOrderSensitive) {
          if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
            currentSegment = [];
          }
          result.push(modifier);
        } else {
          currentSegment.push(modifier);
        }
      }
      if (currentSegment.length > 0) {
        currentSegment.sort();
        result.push(...currentSegment);
      }
      return result;
    };
  };
  var createConfigUtils = (config) => ({
    cache: createLruCache(config.cacheSize),
    parseClassName: createParseClassName(config),
    sortModifiers: createSortModifiers(config),
    postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
    ...createClassGroupUtils(config)
  });
  var createPostfixLookupClassGroupIds = (config) => {
    const lookup = /* @__PURE__ */ Object.create(null);
    const classGroupIds = config.postfixLookupClassGroups;
    if (classGroupIds) {
      for (let i = 0; i < classGroupIds.length; i++) {
        lookup[classGroupIds[i]] = true;
      }
    }
    return lookup;
  };
  var SPLIT_CLASSES_REGEX = /\s+/;
  var mergeClassList = (classList, configUtils) => {
    const {
      parseClassName,
      getClassGroupId,
      getConflictingClassGroupIds,
      sortModifiers,
      postfixLookupClassGroupIds
    } = configUtils;
    const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = "";
    for (let index = classNames.length - 1; index >= 0; index -= 1) {
      const originalClassName = classNames[index];
      const {
        isExternal,
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition
      } = parseClassName(originalClassName);
      if (isExternal) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      let hasPostfixModifier = !!maybePostfixModifierPosition;
      let classGroupId;
      if (hasPostfixModifier) {
        const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
        classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
        const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
        if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
          classGroupId = classGroupIdWithPostfix;
          hasPostfixModifier = false;
        }
      } else {
        classGroupId = getClassGroupId(baseClassName);
      }
      if (!classGroupId) {
        if (!hasPostfixModifier) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        classGroupId = getClassGroupId(baseClassName);
        if (!classGroupId) {
          result = originalClassName + (result.length > 0 ? " " + result : result);
          continue;
        }
        hasPostfixModifier = false;
      }
      const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
      const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
      const classId = modifierId + classGroupId;
      if (classGroupsInConflict.indexOf(classId) > -1) {
        continue;
      }
      classGroupsInConflict.push(classId);
      const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
      for (let i = 0; i < conflictGroups.length; ++i) {
        const group = conflictGroups[i];
        classGroupsInConflict.push(modifierId + group);
      }
      result = originalClassName + (result.length > 0 ? " " + result : result);
    }
    return result;
  };
  var twJoin = (...classLists) => {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < classLists.length) {
      if (argument = classLists[index++]) {
        if (resolvedValue = toValue(argument)) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  var toValue = (mix) => {
    if (typeof mix === "string") {
      return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k = 0; k < mix.length; k++) {
      if (mix[k]) {
        if (resolvedValue = toValue(mix[k])) {
          string && (string += " ");
          string += resolvedValue;
        }
      }
    }
    return string;
  };
  var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList) => {
      const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
      configUtils = createConfigUtils(config);
      cacheGet = configUtils.cache.get;
      cacheSet = configUtils.cache.set;
      functionToCall = tailwindMerge;
      return tailwindMerge(classList);
    };
    const tailwindMerge = (classList) => {
      const cachedResult = cacheGet(classList);
      if (cachedResult) {
        return cachedResult;
      }
      const result = mergeClassList(classList, configUtils);
      cacheSet(classList, result);
      return result;
    };
    functionToCall = initTailwindMerge;
    return (...args) => functionToCall(twJoin(...args));
  };
  var fallbackThemeArr = [];
  var fromTheme = (key) => {
    const themeGetter = (theme) => theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
  };
  var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
  var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
  var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
  var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
  var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  var isFraction = (value) => fractionRegex.test(value);
  var isNumber = (value) => !!value && !Number.isNaN(Number(value));
  var isInteger = (value) => !!value && Number.isInteger(Number(value));
  var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
  var isTshirtSize = (value) => tshirtUnitRegex.test(value);
  var isAny = () => true;
  var isLengthOnly = (value) => (
    // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
  );
  var isNever = () => false;
  var isShadow = (value) => shadowRegex.test(value);
  var isImage = (value) => imageRegex.test(value);
  var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
  var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
  var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
  var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
  var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
  var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
  var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
  var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
  var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
  var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
  var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
  var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
  var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
  var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
  var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
  var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
  var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
  var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
  var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
  var getIsArbitraryValue = (value, testLabel, testValue) => {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return testValue(result[2]);
    }
    return false;
  };
  var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
      if (result[1]) {
        return testLabel(result[1]);
      }
      return shouldMatchNoLabel;
    }
    return false;
  };
  var isLabelPosition = (label) => label === "position" || label === "percentage";
  var isLabelImage = (label) => label === "image" || label === "url";
  var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
  var isLabelLength = (label) => label === "length";
  var isLabelNumber = (label) => label === "number";
  var isLabelFamilyName = (label) => label === "family-name";
  var isLabelWeight = (label) => label === "number" || label === "weight";
  var isLabelShadow = (label) => label === "shadow";
  var getDefaultConfig = () => {
    const themeColor = fromTheme("color");
    const themeFont = fromTheme("font");
    const themeText = fromTheme("text");
    const themeFontWeight = fromTheme("font-weight");
    const themeTracking = fromTheme("tracking");
    const themeLeading = fromTheme("leading");
    const themeBreakpoint = fromTheme("breakpoint");
    const themeContainer = fromTheme("container");
    const themeSpacing = fromTheme("spacing");
    const themeRadius = fromTheme("radius");
    const themeShadow = fromTheme("shadow");
    const themeInsetShadow = fromTheme("inset-shadow");
    const themeTextShadow = fromTheme("text-shadow");
    const themeDropShadow = fromTheme("drop-shadow");
    const themeBlur = fromTheme("blur");
    const themePerspective = fromTheme("perspective");
    const themeAspect = fromTheme("aspect");
    const themeEase = fromTheme("ease");
    const themeAnimate = fromTheme("animate");
    const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const scalePosition = () => [
      "center",
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "left-top",
      "top-right",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "right-top",
      "bottom-right",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "right-bottom",
      "bottom-left",
      // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
      "left-bottom"
    ];
    const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
    const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const scaleOverscroll = () => ["auto", "contain", "none"];
    const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
    const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
    const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartAndEnd = () => ["auto", {
      span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
    }, isInteger, isArbitraryVariable, isArbitraryValue];
    const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
    const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
    const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
    const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
    const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
    const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
    const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
    const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
      position: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleBgRepeat = () => ["no-repeat", {
      repeat: ["", "x", "y", "space", "round"]
    }];
    const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
      size: [isArbitraryVariable, isArbitraryValue]
    }];
    const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
    const scaleRadius = () => [
      // Deprecated since Tailwind CSS v4.0.0
      "",
      "none",
      "full",
      themeRadius,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
    const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
    const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
    const scaleBlur = () => [
      // Deprecated since Tailwind CSS v4.0.0
      "",
      "none",
      themeBlur,
      isArbitraryVariable,
      isArbitraryValue
    ];
    const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
    const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [isTshirtSize],
        breakpoint: [isTshirtSize],
        color: [isAny],
        container: [isTshirtSize],
        "drop-shadow": [isTshirtSize],
        ease: ["in", "out", "in-out"],
        font: [isAnyNonArbitrary],
        "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
        "inset-shadow": [isTshirtSize],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
        radius: [isTshirtSize],
        shadow: [isTshirtSize],
        spacing: ["px", isNumber],
        text: [isTshirtSize],
        "text-shadow": [isTshirtSize],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
      },
      classGroups: {
        // --------------
        // --- Layout ---
        // --------------
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [{
          aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
        }],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         * @deprecated since Tailwind CSS v4.0.0
         */
        container: ["container"],
        /**
         * Container Type
         * @see https://tailwindcss.com/docs/responsive-design#container-queries
         */
        "container-type": [{
          "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Container Name
         * @see https://tailwindcss.com/docs/responsive-design#named-containers
         */
        "container-named": [isNamedContainerQuery],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [{
          columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
        }],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        "break-after": [{
          "break-after": scaleBreak()
        }],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        "break-before": [{
          "break-before": scaleBreak()
        }],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [{
          box: ["border", "content"]
        }],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        /**
         * Screen Reader Only
         * @see https://tailwindcss.com/docs/display#screen-reader-only
         */
        sr: ["sr-only", "not-sr-only"],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ["isolate", "isolation-auto"],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        "object-position": [{
          object: scalePositionWithArbitrary()
        }],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [{
          overflow: scaleOverflow()
        }],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-x": [{
          "overflow-x": scaleOverflow()
        }],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-y": [{
          "overflow-y": scaleOverflow()
        }],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [{
          overscroll: scaleOverscroll()
        }],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-x": [{
          "overscroll-x": scaleOverscroll()
        }],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-y": [{
          "overscroll-y": scaleOverscroll()
        }],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        /**
         * Inset
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [{
          inset: scaleInset()
        }],
        /**
         * Inset Inline
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-x": [{
          "inset-x": scaleInset()
        }],
        /**
         * Inset Block
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-y": [{
          "inset-y": scaleInset()
        }],
        /**
         * Inset Inline Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         * @todo class group will be renamed to `inset-s` in next major release
         */
        start: [{
          "inset-s": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          start: scaleInset()
        }],
        /**
         * Inset Inline End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         * @todo class group will be renamed to `inset-e` in next major release
         */
        end: [{
          "inset-e": scaleInset(),
          /**
           * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
           * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
           */
          end: scaleInset()
        }],
        /**
         * Inset Block Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-bs": [{
          "inset-bs": scaleInset()
        }],
        /**
         * Inset Block End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-be": [{
          "inset-be": scaleInset()
        }],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [{
          top: scaleInset()
        }],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [{
          right: scaleInset()
        }],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [{
          bottom: scaleInset()
        }],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [{
          left: scaleInset()
        }],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ["visible", "invisible", "collapse"],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [{
          z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
        }],
        // ------------------------
        // --- Flexbox and Grid ---
        // ------------------------
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [{
          basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
        }],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        "flex-wrap": [{
          flex: ["nowrap", "wrap", "wrap-reverse"]
        }],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [{
          flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
        }],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [{
          grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [{
          shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [{
          order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        "grid-cols": [{
          "grid-cols": scaleGridTemplateColsRows()
        }],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start-end": [{
          col: scaleGridColRowStartAndEnd()
        }],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start": [{
          "col-start": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-end": [{
          "col-end": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        "grid-rows": [{
          "grid-rows": scaleGridTemplateColsRows()
        }],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start-end": [{
          row: scaleGridColRowStartAndEnd()
        }],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start": [{
          "row-start": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-end": [{
          "row-end": scaleGridColRowStartOrEnd()
        }],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        "auto-cols": [{
          "auto-cols": scaleGridAutoColsRows()
        }],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        "auto-rows": [{
          "auto-rows": scaleGridAutoColsRows()
        }],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [{
          gap: scaleUnambiguousSpacing()
        }],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-x": [{
          "gap-x": scaleUnambiguousSpacing()
        }],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-y": [{
          "gap-y": scaleUnambiguousSpacing()
        }],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        "justify-content": [{
          justify: [...scaleAlignPrimaryAxis(), "normal"]
        }],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        "justify-items": [{
          "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
        }],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        "justify-self": [{
          "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        "align-content": [{
          content: ["normal", ...scaleAlignPrimaryAxis()]
        }],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        "align-items": [{
          items: [...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        "align-self": [{
          self: ["auto", ...scaleAlignSecondaryAxis(), {
            baseline: ["", "last"]
          }]
        }],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        "place-content": [{
          "place-content": scaleAlignPrimaryAxis()
        }],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        "place-items": [{
          "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
        }],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        "place-self": [{
          "place-self": ["auto", ...scaleAlignSecondaryAxis()]
        }],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [{
          p: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline
         * @see https://tailwindcss.com/docs/padding
         */
        px: [{
          px: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block
         * @see https://tailwindcss.com/docs/padding
         */
        py: [{
          py: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [{
          ps: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Inline End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [{
          pe: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block Start
         * @see https://tailwindcss.com/docs/padding
         */
        pbs: [{
          pbs: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Block End
         * @see https://tailwindcss.com/docs/padding
         */
        pbe: [{
          pbe: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [{
          pt: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [{
          pr: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [{
          pb: scaleUnambiguousSpacing()
        }],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [{
          pl: scaleUnambiguousSpacing()
        }],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [{
          m: scaleMargin()
        }],
        /**
         * Margin Inline
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [{
          mx: scaleMargin()
        }],
        /**
         * Margin Block
         * @see https://tailwindcss.com/docs/margin
         */
        my: [{
          my: scaleMargin()
        }],
        /**
         * Margin Inline Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [{
          ms: scaleMargin()
        }],
        /**
         * Margin Inline End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [{
          me: scaleMargin()
        }],
        /**
         * Margin Block Start
         * @see https://tailwindcss.com/docs/margin
         */
        mbs: [{
          mbs: scaleMargin()
        }],
        /**
         * Margin Block End
         * @see https://tailwindcss.com/docs/margin
         */
        mbe: [{
          mbe: scaleMargin()
        }],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [{
          mt: scaleMargin()
        }],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [{
          mr: scaleMargin()
        }],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [{
          mb: scaleMargin()
        }],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [{
          ml: scaleMargin()
        }],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-x": [{
          "space-x": scaleUnambiguousSpacing()
        }],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-x-reverse": ["space-x-reverse"],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-y": [{
          "space-y": scaleUnambiguousSpacing()
        }],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/margin#adding-space-between-children
         */
        "space-y-reverse": ["space-y-reverse"],
        // --------------
        // --- Sizing ---
        // --------------
        /**
         * Size
         * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
         */
        size: [{
          size: scaleSizing()
        }],
        /**
         * Inline Size
         * @see https://tailwindcss.com/docs/width
         */
        "inline-size": [{
          inline: ["auto", ...scaleSizingInline()]
        }],
        /**
         * Min-Inline Size
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-inline-size": [{
          "min-inline": ["auto", ...scaleSizingInline()]
        }],
        /**
         * Max-Inline Size
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-inline-size": [{
          "max-inline": ["none", ...scaleSizingInline()]
        }],
        /**
         * Block Size
         * @see https://tailwindcss.com/docs/height
         */
        "block-size": [{
          block: ["auto", ...scaleSizingBlock()]
        }],
        /**
         * Min-Block Size
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-block-size": [{
          "min-block": ["auto", ...scaleSizingBlock()]
        }],
        /**
         * Max-Block Size
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-block-size": [{
          "max-block": ["none", ...scaleSizingBlock()]
        }],
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [{
          w: [themeContainer, "screen", ...scaleSizing()]
        }],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-w": [{
          "min-w": [
            themeContainer,
            "screen",
            /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            "none",
            ...scaleSizing()
          ]
        }],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-w": [{
          "max-w": [
            themeContainer,
            "screen",
            "none",
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            "prose",
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            {
              screen: [themeBreakpoint]
            },
            ...scaleSizing()
          ]
        }],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [{
          h: ["screen", "lh", ...scaleSizing()]
        }],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-h": [{
          "min-h": ["screen", "lh", "none", ...scaleSizing()]
        }],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-h": [{
          "max-h": ["screen", "lh", ...scaleSizing()]
        }],
        // ------------------
        // --- Typography ---
        // ------------------
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        "font-size": [{
          text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
        }],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        "font-style": ["italic", "not-italic"],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        "font-weight": [{
          font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
        }],
        /**
         * Font Stretch
         * @see https://tailwindcss.com/docs/font-stretch
         */
        "font-stretch": [{
          "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
        }],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        "font-family": [{
          font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
        }],
        /**
         * Font Feature Settings
         * @see https://tailwindcss.com/docs/font-feature-settings
         */
        "font-features": [{
          "font-features": [isArbitraryValue]
        }],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-normal": ["normal-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-ordinal": ["ordinal"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-slashed-zero": ["slashed-zero"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [{
          tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        "line-clamp": [{
          "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
        }],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [{
          leading: [
            /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
            themeLeading,
            ...scaleUnambiguousSpacing()
          ]
        }],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        "list-image": [{
          "list-image": ["none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        "list-style-type": [{
          list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://v3.tailwindcss.com/docs/placeholder-color
         */
        "placeholder-color": [{
          placeholder: scaleColor()
        }],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        "text-color": [{
          text: scaleColor()
        }],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        "text-decoration-style": [{
          decoration: [...scaleLineStyle(), "wavy"]
        }],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        "text-decoration-thickness": [{
          decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
        }],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        "text-decoration-color": [{
          decoration: scaleColor()
        }],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        "underline-offset": [{
          "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        /**
         * Text Wrap
         * @see https://tailwindcss.com/docs/text-wrap
         */
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [{
          indent: scaleUnambiguousSpacing()
        }],
        /**
         * Tab Size
         * @see https://tailwindcss.com/docs/tab-size
         */
        "tab-size": [{
          tab: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        /**
         * Overflow Wrap
         * @see https://tailwindcss.com/docs/overflow-wrap
         */
        wrap: [{
          wrap: ["break-word", "anywhere", "normal"]
        }],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [{
          content: ["none", isArbitraryVariable, isArbitraryValue]
        }],
        // -------------------
        // --- Backgrounds ---
        // -------------------
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        "bg-position": [{
          bg: scaleBgPosition()
        }],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        "bg-repeat": [{
          bg: scaleBgRepeat()
        }],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        "bg-size": [{
          bg: scaleBgSize()
        }],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        "bg-image": [{
          bg: ["none", {
            linear: [{
              to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
            }, isInteger, isArbitraryVariable, isArbitraryValue],
            radial: ["", isArbitraryVariable, isArbitraryValue],
            conic: [isInteger, isArbitraryVariable, isArbitraryValue]
          }, isArbitraryVariableImage, isArbitraryImage]
        }],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        "bg-color": [{
          bg: scaleColor()
        }],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from-pos": [{
          from: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via-pos": [{
          via: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to-pos": [{
          to: scaleGradientStopPosition()
        }],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from": [{
          from: scaleColor()
        }],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via": [{
          via: scaleColor()
        }],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to": [{
          to: scaleColor()
        }],
        // ---------------
        // --- Borders ---
        // ---------------
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [{
          rounded: scaleRadius()
        }],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-s": [{
          "rounded-s": scaleRadius()
        }],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-e": [{
          "rounded-e": scaleRadius()
        }],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-t": [{
          "rounded-t": scaleRadius()
        }],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-r": [{
          "rounded-r": scaleRadius()
        }],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-b": [{
          "rounded-b": scaleRadius()
        }],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-l": [{
          "rounded-l": scaleRadius()
        }],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ss": [{
          "rounded-ss": scaleRadius()
        }],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-se": [{
          "rounded-se": scaleRadius()
        }],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ee": [{
          "rounded-ee": scaleRadius()
        }],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-es": [{
          "rounded-es": scaleRadius()
        }],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tl": [{
          "rounded-tl": scaleRadius()
        }],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tr": [{
          "rounded-tr": scaleRadius()
        }],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-br": [{
          "rounded-br": scaleRadius()
        }],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-bl": [{
          "rounded-bl": scaleRadius()
        }],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w": [{
          border: scaleBorderWidth()
        }],
        /**
         * Border Width Inline
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-x": [{
          "border-x": scaleBorderWidth()
        }],
        /**
         * Border Width Block
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-y": [{
          "border-y": scaleBorderWidth()
        }],
        /**
         * Border Width Inline Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-s": [{
          "border-s": scaleBorderWidth()
        }],
        /**
         * Border Width Inline End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-e": [{
          "border-e": scaleBorderWidth()
        }],
        /**
         * Border Width Block Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-bs": [{
          "border-bs": scaleBorderWidth()
        }],
        /**
         * Border Width Block End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-be": [{
          "border-be": scaleBorderWidth()
        }],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-t": [{
          "border-t": scaleBorderWidth()
        }],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-r": [{
          "border-r": scaleBorderWidth()
        }],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-b": [{
          "border-b": scaleBorderWidth()
        }],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-l": [{
          "border-l": scaleBorderWidth()
        }],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-x": [{
          "divide-x": scaleBorderWidth()
        }],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-x-reverse": ["divide-x-reverse"],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-y": [{
          "divide-y": scaleBorderWidth()
        }],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/border-width#between-children
         */
        "divide-y-reverse": ["divide-y-reverse"],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        "border-style": [{
          border: [...scaleLineStyle(), "hidden", "none"]
        }],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
         */
        "divide-style": [{
          divide: [...scaleLineStyle(), "hidden", "none"]
        }],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color": [{
          border: scaleColor()
        }],
        /**
         * Border Color Inline
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-x": [{
          "border-x": scaleColor()
        }],
        /**
         * Border Color Block
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-y": [{
          "border-y": scaleColor()
        }],
        /**
         * Border Color Inline Start
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-s": [{
          "border-s": scaleColor()
        }],
        /**
         * Border Color Inline End
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-e": [{
          "border-e": scaleColor()
        }],
        /**
         * Border Color Block Start
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-bs": [{
          "border-bs": scaleColor()
        }],
        /**
         * Border Color Block End
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-be": [{
          "border-be": scaleColor()
        }],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-t": [{
          "border-t": scaleColor()
        }],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-r": [{
          "border-r": scaleColor()
        }],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-b": [{
          "border-b": scaleColor()
        }],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-l": [{
          "border-l": scaleColor()
        }],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        "divide-color": [{
          divide: scaleColor()
        }],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        "outline-style": [{
          outline: [...scaleLineStyle(), "none", "hidden"]
        }],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        "outline-offset": [{
          "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        "outline-w": [{
          outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
        }],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        "outline-color": [{
          outline: scaleColor()
        }],
        // ---------------
        // --- Effects ---
        // ---------------
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [{
          shadow: [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            themeShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
         */
        "shadow-color": [{
          shadow: scaleColor()
        }],
        /**
         * Inset Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
         */
        "inset-shadow": [{
          "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
        /**
         * Inset Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
         */
        "inset-shadow-color": [{
          "inset-shadow": scaleColor()
        }],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
         */
        "ring-w": [{
          ring: scaleBorderWidth()
        }],
        /**
         * Ring Width Inset
         * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-w-inset": ["ring-inset"],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
         */
        "ring-color": [{
          ring: scaleColor()
        }],
        /**
         * Ring Offset Width
         * @see https://v3.tailwindcss.com/docs/ring-offset-width
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-offset-w": [{
          "ring-offset": [isNumber, isArbitraryLength]
        }],
        /**
         * Ring Offset Color
         * @see https://v3.tailwindcss.com/docs/ring-offset-color
         * @deprecated since Tailwind CSS v4.0.0
         * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
         */
        "ring-offset-color": [{
          "ring-offset": scaleColor()
        }],
        /**
         * Inset Ring Width
         * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
         */
        "inset-ring-w": [{
          "inset-ring": scaleBorderWidth()
        }],
        /**
         * Inset Ring Color
         * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
         */
        "inset-ring-color": [{
          "inset-ring": scaleColor()
        }],
        /**
         * Text Shadow
         * @see https://tailwindcss.com/docs/text-shadow
         */
        "text-shadow": [{
          "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
        }],
        /**
         * Text Shadow Color
         * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
         */
        "text-shadow-color": [{
          "text-shadow": scaleColor()
        }],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [{
          opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        "mix-blend": [{
          "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
        }],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        "bg-blend": [{
          "bg-blend": scaleBlendMode()
        }],
        /**
         * Mask Clip
         * @see https://tailwindcss.com/docs/mask-clip
         */
        "mask-clip": [{
          "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
        }, "mask-no-clip"],
        /**
         * Mask Composite
         * @see https://tailwindcss.com/docs/mask-composite
         */
        "mask-composite": [{
          mask: ["add", "subtract", "intersect", "exclude"]
        }],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        "mask-image-linear-pos": [{
          "mask-linear": [isNumber]
        }],
        "mask-image-linear-from-pos": [{
          "mask-linear-from": scaleMaskImagePosition()
        }],
        "mask-image-linear-to-pos": [{
          "mask-linear-to": scaleMaskImagePosition()
        }],
        "mask-image-linear-from-color": [{
          "mask-linear-from": scaleColor()
        }],
        "mask-image-linear-to-color": [{
          "mask-linear-to": scaleColor()
        }],
        "mask-image-t-from-pos": [{
          "mask-t-from": scaleMaskImagePosition()
        }],
        "mask-image-t-to-pos": [{
          "mask-t-to": scaleMaskImagePosition()
        }],
        "mask-image-t-from-color": [{
          "mask-t-from": scaleColor()
        }],
        "mask-image-t-to-color": [{
          "mask-t-to": scaleColor()
        }],
        "mask-image-r-from-pos": [{
          "mask-r-from": scaleMaskImagePosition()
        }],
        "mask-image-r-to-pos": [{
          "mask-r-to": scaleMaskImagePosition()
        }],
        "mask-image-r-from-color": [{
          "mask-r-from": scaleColor()
        }],
        "mask-image-r-to-color": [{
          "mask-r-to": scaleColor()
        }],
        "mask-image-b-from-pos": [{
          "mask-b-from": scaleMaskImagePosition()
        }],
        "mask-image-b-to-pos": [{
          "mask-b-to": scaleMaskImagePosition()
        }],
        "mask-image-b-from-color": [{
          "mask-b-from": scaleColor()
        }],
        "mask-image-b-to-color": [{
          "mask-b-to": scaleColor()
        }],
        "mask-image-l-from-pos": [{
          "mask-l-from": scaleMaskImagePosition()
        }],
        "mask-image-l-to-pos": [{
          "mask-l-to": scaleMaskImagePosition()
        }],
        "mask-image-l-from-color": [{
          "mask-l-from": scaleColor()
        }],
        "mask-image-l-to-color": [{
          "mask-l-to": scaleColor()
        }],
        "mask-image-x-from-pos": [{
          "mask-x-from": scaleMaskImagePosition()
        }],
        "mask-image-x-to-pos": [{
          "mask-x-to": scaleMaskImagePosition()
        }],
        "mask-image-x-from-color": [{
          "mask-x-from": scaleColor()
        }],
        "mask-image-x-to-color": [{
          "mask-x-to": scaleColor()
        }],
        "mask-image-y-from-pos": [{
          "mask-y-from": scaleMaskImagePosition()
        }],
        "mask-image-y-to-pos": [{
          "mask-y-to": scaleMaskImagePosition()
        }],
        "mask-image-y-from-color": [{
          "mask-y-from": scaleColor()
        }],
        "mask-image-y-to-color": [{
          "mask-y-to": scaleColor()
        }],
        "mask-image-radial": [{
          "mask-radial": [isArbitraryVariable, isArbitraryValue]
        }],
        "mask-image-radial-from-pos": [{
          "mask-radial-from": scaleMaskImagePosition()
        }],
        "mask-image-radial-to-pos": [{
          "mask-radial-to": scaleMaskImagePosition()
        }],
        "mask-image-radial-from-color": [{
          "mask-radial-from": scaleColor()
        }],
        "mask-image-radial-to-color": [{
          "mask-radial-to": scaleColor()
        }],
        "mask-image-radial-shape": [{
          "mask-radial": ["circle", "ellipse"]
        }],
        "mask-image-radial-size": [{
          "mask-radial": [{
            closest: ["side", "corner"],
            farthest: ["side", "corner"]
          }]
        }],
        "mask-image-radial-pos": [{
          "mask-radial-at": scalePosition()
        }],
        "mask-image-conic-pos": [{
          "mask-conic": [isNumber]
        }],
        "mask-image-conic-from-pos": [{
          "mask-conic-from": scaleMaskImagePosition()
        }],
        "mask-image-conic-to-pos": [{
          "mask-conic-to": scaleMaskImagePosition()
        }],
        "mask-image-conic-from-color": [{
          "mask-conic-from": scaleColor()
        }],
        "mask-image-conic-to-color": [{
          "mask-conic-to": scaleColor()
        }],
        /**
         * Mask Mode
         * @see https://tailwindcss.com/docs/mask-mode
         */
        "mask-mode": [{
          mask: ["alpha", "luminance", "match"]
        }],
        /**
         * Mask Origin
         * @see https://tailwindcss.com/docs/mask-origin
         */
        "mask-origin": [{
          "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
        }],
        /**
         * Mask Position
         * @see https://tailwindcss.com/docs/mask-position
         */
        "mask-position": [{
          mask: scaleBgPosition()
        }],
        /**
         * Mask Repeat
         * @see https://tailwindcss.com/docs/mask-repeat
         */
        "mask-repeat": [{
          mask: scaleBgRepeat()
        }],
        /**
         * Mask Size
         * @see https://tailwindcss.com/docs/mask-size
         */
        "mask-size": [{
          mask: scaleBgSize()
        }],
        /**
         * Mask Type
         * @see https://tailwindcss.com/docs/mask-type
         */
        "mask-type": [{
          "mask-type": ["alpha", "luminance"]
        }],
        /**
         * Mask Image
         * @see https://tailwindcss.com/docs/mask-image
         */
        "mask-image": [{
          mask: ["none", isArbitraryVariable, isArbitraryValue]
        }],
        // ---------------
        // --- Filters ---
        // ---------------
        /**
         * Filter
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [{
          filter: [
            // Deprecated since Tailwind CSS v3.0.0
            "",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [{
          blur: scaleBlur()
        }],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [{
          brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [{
          contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        "drop-shadow": [{
          "drop-shadow": [
            // Deprecated since Tailwind CSS v4.0.0
            "",
            "none",
            themeDropShadow,
            isArbitraryVariableShadow,
            isArbitraryShadow
          ]
        }],
        /**
         * Drop Shadow Color
         * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
         */
        "drop-shadow-color": [{
          "drop-shadow": scaleColor()
        }],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [{
          grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        "hue-rotate": [{
          "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [{
          invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [{
          saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [{
          sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Filter
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        "backdrop-filter": [{
          "backdrop-filter": [
            // Deprecated since Tailwind CSS v3.0.0
            "",
            "none",
            isArbitraryVariable,
            isArbitraryValue
          ]
        }],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        "backdrop-blur": [{
          "backdrop-blur": scaleBlur()
        }],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        "backdrop-brightness": [{
          "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        "backdrop-contrast": [{
          "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        "backdrop-grayscale": [{
          "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        "backdrop-invert": [{
          "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        "backdrop-opacity": [{
          "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        "backdrop-saturate": [{
          "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        "backdrop-sepia": [{
          "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        // --------------
        // --- Tables ---
        // --------------
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing": [{
          "border-spacing": scaleUnambiguousSpacing()
        }],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-x": [{
          "border-spacing-x": scaleUnambiguousSpacing()
        }],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-y": [{
          "border-spacing-y": scaleUnambiguousSpacing()
        }],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [{
          caption: ["top", "bottom"]
        }],
        // ---------------------------------
        // --- Transitions and Animation ---
        // ---------------------------------
        /**
         * Transition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [{
          transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Behavior
         * @see https://tailwindcss.com/docs/transition-behavior
         */
        "transition-behavior": [{
          transition: ["normal", "discrete"]
        }],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [{
          duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [{
          ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [{
          delay: [isNumber, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [{
          animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
        }],
        // ------------------
        // --- Transforms ---
        // ------------------
        /**
         * Backface Visibility
         * @see https://tailwindcss.com/docs/backface-visibility
         */
        backface: [{
          backface: ["hidden", "visible"]
        }],
        /**
         * Perspective
         * @see https://tailwindcss.com/docs/perspective
         */
        perspective: [{
          perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Perspective Origin
         * @see https://tailwindcss.com/docs/perspective-origin
         */
        "perspective-origin": [{
          "perspective-origin": scalePositionWithArbitrary()
        }],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [{
          rotate: scaleRotate()
        }],
        /**
         * Rotate X
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-x": [{
          "rotate-x": scaleRotate()
        }],
        /**
         * Rotate Y
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-y": [{
          "rotate-y": scaleRotate()
        }],
        /**
         * Rotate Z
         * @see https://tailwindcss.com/docs/rotate
         */
        "rotate-z": [{
          "rotate-z": scaleRotate()
        }],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [{
          scale: scaleScale()
        }],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-x": [{
          "scale-x": scaleScale()
        }],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-y": [{
          "scale-y": scaleScale()
        }],
        /**
         * Scale Z
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-z": [{
          "scale-z": scaleScale()
        }],
        /**
         * Scale 3D
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-3d": ["scale-3d"],
        /**
         * Skew
         * @see https://tailwindcss.com/docs/skew
         */
        skew: [{
          skew: scaleSkew()
        }],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-x": [{
          "skew-x": scaleSkew()
        }],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-y": [{
          "skew-y": scaleSkew()
        }],
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [{
          transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
        }],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        "transform-origin": [{
          origin: scalePositionWithArbitrary()
        }],
        /**
         * Transform Style
         * @see https://tailwindcss.com/docs/transform-style
         */
        "transform-style": [{
          transform: ["3d", "flat"]
        }],
        /**
         * Translate
         * @see https://tailwindcss.com/docs/translate
         */
        translate: [{
          translate: scaleTranslate()
        }],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-x": [{
          "translate-x": scaleTranslate()
        }],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-y": [{
          "translate-y": scaleTranslate()
        }],
        /**
         * Translate Z
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-z": [{
          "translate-z": scaleTranslate()
        }],
        /**
         * Translate None
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-none": ["translate-none"],
        /**
         * Zoom
         * @see https://tailwindcss.com/docs/zoom
         */
        zoom: [{
          zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
        }],
        // ---------------------
        // --- Interactivity ---
        // ---------------------
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [{
          accent: scaleColor()
        }],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: [{
          appearance: ["none", "auto"]
        }],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        "caret-color": [{
          caret: scaleColor()
        }],
        /**
         * Color Scheme
         * @see https://tailwindcss.com/docs/color-scheme
         */
        "color-scheme": [{
          scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
        }],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
        }],
        /**
         * Field Sizing
         * @see https://tailwindcss.com/docs/field-sizing
         */
        "field-sizing": [{
          "field-sizing": ["fixed", "content"]
        }],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        "pointer-events": [{
          "pointer-events": ["auto", "none"]
        }],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [{
          resize: ["none", "", "y", "x"]
        }],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        /**
         * Scrollbar Thumb Color
         * @see https://tailwindcss.com/docs/scrollbar-color
         */
        "scrollbar-thumb-color": [{
          "scrollbar-thumb": scaleColor()
        }],
        /**
         * Scrollbar Track Color
         * @see https://tailwindcss.com/docs/scrollbar-color
         */
        "scrollbar-track-color": [{
          "scrollbar-track": scaleColor()
        }],
        /**
         * Scrollbar Gutter
         * @see https://tailwindcss.com/docs/scrollbar-gutter
         */
        "scrollbar-gutter": [{
          "scrollbar-gutter": ["auto", "stable", "both"]
        }],
        /**
         * Scrollbar Width
         * @see https://tailwindcss.com/docs/scrollbar-width
         */
        "scrollbar-w": [{
          scrollbar: ["auto", "thin", "none"]
        }],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-m": [{
          "scroll-m": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mx": [{
          "scroll-mx": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-my": [{
          "scroll-my": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ms": [{
          "scroll-ms": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Inline End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-me": [{
          "scroll-me": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mbs": [{
          "scroll-mbs": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Block End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mbe": [{
          "scroll-mbe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mt": [{
          "scroll-mt": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mr": [{
          "scroll-mr": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mb": [{
          "scroll-mb": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ml": [{
          "scroll-ml": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-p": [{
          "scroll-p": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-px": [{
          "scroll-px": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-py": [{
          "scroll-py": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-ps": [{
          "scroll-ps": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Inline End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pe": [{
          "scroll-pe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pbs": [{
          "scroll-pbs": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Block End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pbe": [{
          "scroll-pbe": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pt": [{
          "scroll-pt": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pr": [{
          "scroll-pr": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pb": [{
          "scroll-pb": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pl": [{
          "scroll-pl": scaleUnambiguousSpacing()
        }],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-pz": ["touch-pinch-zoom"],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
        }],
        // -----------
        // --- SVG ---
        // -----------
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [{
          fill: ["none", ...scaleColor()]
        }],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        "stroke-w": [{
          stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
        }],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [{
          stroke: ["none", ...scaleColor()]
        }],
        // ---------------------
        // --- Accessibility ---
        // ---------------------
        /**
         * Forced Color Adjust
         * @see https://tailwindcss.com/docs/forced-color-adjust
         */
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        "container-named": ["container-type"],
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      },
      postfixLookupClassGroups: ["container-type"],
      orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
    };
  };
  var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

  // src/lib/utils.ts
  function cn(...inputs) {
    return twMerge(clsx(inputs));
  }

  // src/components/Leaderboard.tsx
  var import_jsx_runtime4 = __toESM(require_react_shim());
  var RANK_CONFIG = [
    {
      bg: "border-wc-gold/40",
      cardStyle: { background: "rgba(245,195,0,0.08)" },
      numStyle: { color: "#f5c300" },
      badge: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: "w-8 h-8 rounded-full flex items-center justify-center",
          style: { background: "linear-gradient(135deg, #f5c300, #ffd93d)" },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Trophy, { size: 14, className: "text-wc-dark" })
        }
      )
    },
    {
      bg: "border-slate-400/25",
      cardStyle: { background: "rgba(148,163,184,0.06)" },
      numStyle: { color: "#cbd5e1" },
      badge: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: "w-8 h-8 rounded-full flex items-center justify-center",
          style: { background: "rgba(148,163,184,0.15)", border: "1px solid rgba(148,163,184,0.3)" },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-slate-300 font-display text-base", children: "2" })
        }
      )
    },
    {
      bg: "border-amber-700/25",
      cardStyle: { background: "rgba(180,83,9,0.06)" },
      numStyle: { color: "#d97706" },
      badge: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: "w-8 h-8 rounded-full flex items-center justify-center",
          style: { background: "rgba(180,83,9,0.15)", border: "1px solid rgba(180,83,9,0.3)" },
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-amber-600 font-display text-base", children: "3" })
        }
      )
    }
  ];
  function Leaderboard({ entries }) {
    if (entries.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-center py-16 text-wc-white/30", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Trophy, { size: 48, className: "mx-auto mb-3 opacity-20" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm", children: "A classifica\xE7\xE3o estar\xE1 dispon\xEDvel quando come\xE7ar o torneio." })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "space-y-2", children: entries.map((entry, idx) => {
      const cfg = RANK_CONFIG[idx];
      const isTop = idx < 3;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: cn(
            "flex items-center gap-3 p-3.5 rounded-2xl border transition-all",
            isTop ? cfg.bg : "border-white/6",
            idx === 0 && "glow-gold"
          ),
          style: isTop ? cfg.cardStyle : { background: "rgba(255,255,255,0.03)" },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "shrink-0", children: isTop ? cfg.badge : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center",
                style: { background: "rgba(255,255,255,0.05)" },
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "font-display text-wc-white/30 text-base", children: idx + 1 })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: cn(
                "font-bold truncate leading-tight",
                idx === 0 ? "text-wc-gold" : idx < 3 ? "text-wc-white" : "text-wc-white/60"
              ), children: entry.user_name }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex gap-3 mt-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-[11px] text-wc-white/30 flex items-center gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Target, { size: 9 }),
                  " ",
                  entry.correct_1x2,
                  " 1x2"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-[11px] text-wc-white/30 flex items-center gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Star, { size: 9 }),
                  " ",
                  entry.correct_scores,
                  " exatos"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "p",
                {
                  className: "font-display tabular-nums leading-none",
                  style: {
                    fontSize: "1.75rem",
                    ...isTop ? cfg.numStyle : { color: "rgba(255,255,255,0.4)" }
                  },
                  children: entry.total_points
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-[10px] text-wc-white/25 tracking-widest uppercase", children: "pts" })
            ] })
          ]
        },
        entry.user_id
      );
    }) });
  }

  // src/components/LeaderboardSection.tsx
  var import_react5 = __toESM(require_react_shim());
  var import_jsx_runtime5 = __toESM(require_react_shim());
  function LeaderboardSection() {
    const [entries, setEntries] = (0, import_react5.useState)([]);
    const [loading, setLoading] = (0, import_react5.useState)(true);
    const [refreshing, setRefreshing] = (0, import_react5.useState)(false);
    async function load(showRefresh = false) {
      if (showRefresh) setRefreshing(true);
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }
    (0, import_react5.useEffect)(() => {
      load();
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { id: "classificacao", className: "max-w-2xl mx-auto px-4 py-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "w-1 h-6 rounded-full", style: { background: "linear-gradient(180deg, #f5c300, #e63312)" } }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "font-display text-2xl text-wc-white tracking-wider", children: "CLASSIFICA\xC7\xC3O" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
          "button",
          {
            onClick: () => load(true),
            disabled: refreshing,
            className: "flex items-center gap-1.5 text-xs text-wc-white/30 hover:text-wc-gold transition-colors disabled:opacity-40 px-2 py-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RefreshCw, { size: 12, className: refreshing ? "animate-spin" : "" }),
              "Atualizar"
            ]
          }
        )
      ] }),
      loading ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "div",
        {
          className: "h-16 rounded-2xl animate-pulse",
          style: { background: "rgba(255,255,255,0.04)" }
        },
        i
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Leaderboard, { entries })
    ] });
  }

  // src/components/MatchCard.tsx
  var import_react6 = __toESM(require_react_shim());
  var import_jsx_runtime6 = __toESM(require_react_shim());
  function inferResult(home, away) {
    const h = parseInt(home);
    const a = parseInt(away);
    if (isNaN(h) || isNaN(a) || home === "" || away === "") return null;
    if (h > a) return { label: "Vit\xF3ria 1", color: "text-wc-green" };
    if (h < a) return { label: "Vit\xF3ria 2", color: "text-wc-electric" };
    return { label: "Empate", color: "text-wc-gold" };
  }
  var GOAL_OPTIONS = Array.from({ length: 10 }, (_, i) => String(i));
  function TeamFlag({ team, align }) {
    const url = getFlagUrl(team, "w40");
    const code = getTeamCode(team);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cn("flex-1 flex items-center gap-2 min-w-0", align === "right" ? "flex-row-reverse" : "flex-row"), children: [
      url && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        "img",
        {
          src: url,
          alt: team,
          width: 22,
          height: 15,
          className: "rounded-[3px] shrink-0 shadow-sm"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: cn(
        "hidden sm:block md:hidden font-bold text-xs tracking-wider shrink-0",
        align === "right" ? "text-right" : "text-left"
      ), children: code }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: cn(
        "hidden md:block font-semibold text-sm leading-tight truncate",
        align === "right" ? "text-right" : "text-left"
      ), children: team })
    ] });
  }
  function MatchCard({
    match,
    home_goals,
    away_goals,
    bet_1x2 = void 0,
    disabled,
    onChange,
    onChangeBet,
    showResult = false
  }) {
    const isFinished = match.status === "finished";
    const result = inferResult(home_goals, away_goals);
    const show1x2 = bet_1x2 !== void 0;
    const inferredBet = result ? result.label === "Vit\xF3ria 1" ? "1" : result.label === "Vit\xF3ria 2" ? "2" : "x" : null;
    const betDiffersFromScore = bet_1x2 && inferredBet && bet_1x2 !== inferredBet;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: cn(
          "rounded-2xl border p-4 transition-all",
          disabled ? "border-white/6 opacity-70" : "border-white/10 hover:border-wc-electric/30"
        ),
        style: disabled ? { background: "rgba(255,255,255,0.02)" } : { background: "rgba(35,82,240,0.06)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] font-bold tracking-widest uppercase text-wc-white/25", children: match.phase === "group" ? match.matchday ? `J${match.matchday} \xB7 Grupo ${match.group}` : `Grupo ${match.group}` : { round_of_32: "32", round_of_16: "16", quarter_final: "QF", semi_final: "SF", third_place: "3/4", final: "Final" }[match.phase] ?? "Eliminat\xF3ria" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1.5", children: [
              result && !disabled && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: cn("text-[10px] font-bold", result.color), children: result.label }),
              disabled && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1 text-wc-white/25", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Lock, { size: 10 }),
                isFinished && match.home_score !== null && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "text-[10px]", children: [
                  "Real: ",
                  match.home_score,
                  "\u2013",
                  match.away_score
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cn("flex-1", disabled ? "text-wc-white/35" : "text-wc-white"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TeamFlag, { team: match.home_team, align: "right" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex items-center gap-2 shrink-0", children: ["home_goals", "away_goals"].map((field, idx) => {
              const value = field === "home_goals" ? home_goals : away_goals;
              const hasValue = value !== "";
              return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_react6.default.Fragment, { children: [
                idx === 1 && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: cn(
                  "font-black text-xl select-none",
                  disabled ? "text-wc-white/15" : "text-wc-white/40"
                ), children: "\u2013" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "select",
                  {
                    disabled,
                    value,
                    onChange: (e) => onChange(field, e.target.value),
                    className: cn(
                      "w-14 h-14 text-center text-2xl font-black rounded-xl border transition-all outline-none appearance-none",
                      disabled ? hasValue ? "border-white/10 text-wc-white/40 cursor-not-allowed" : "border-white/5 text-wc-white/15 cursor-not-allowed" : "border-wc-electric/30 text-wc-white focus:border-wc-gold focus:scale-105 cursor-pointer"
                    ),
                    style: disabled ? { background: "rgba(255,255,255,0.04)", textAlignLast: "center" } : { background: "rgba(35,82,240,0.15)", textAlignLast: "center" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: "", style: { background: "#0a1628", color: "rgba(255,255,255,0.3)" }, children: "\u2013" }),
                      GOAL_OPTIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: n, style: { background: "#0a1628", color: "#fff" }, children: n }, n))
                    ]
                  }
                )
              ] }, field);
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cn("flex-1", disabled ? "text-wc-white/35" : "text-wc-white"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(TeamFlag, { team: match.away_team, align: "left" }) })
          ] }),
          show1x2 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] font-bold tracking-widest uppercase text-wc-white/25 shrink-0", children: "Aposta" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex gap-1.5 flex-1", children: ["1", "x", "2"].map((opt) => {
              const labels = { "1": "1", "x": "X", "2": "2" };
              const selected = bet_1x2 === opt;
              const isDivergent = selected && betDiffersFromScore;
              return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  type: "button",
                  disabled,
                  onClick: () => !disabled && onChangeBet?.(opt),
                  className: cn(
                    "flex-1 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all",
                    disabled ? "cursor-not-allowed" : "hover:opacity-90 active:scale-95"
                  ),
                  style: selected ? isDivergent ? { background: "rgba(245,195,0,0.25)", color: "#f5c300", border: "1px solid rgba(245,195,0,0.5)" } : { background: "rgba(245,195,0,0.15)", color: "#f5c300", border: "1px solid rgba(245,195,0,0.35)" } : disabled ? { background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.05)" } : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" },
                  children: labels[opt]
                },
                opt
              );
            }) }),
            betDiffersFromScore && !disabled && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[9px] font-bold text-wc-gold/60 shrink-0", children: "\u2260 placar" })
          ] })
        ]
      }
    );
  }

  // src/components/RegisterSection.tsx
  var import_react7 = __toESM(require_react_shim());
  var import_navigation = __toESM(require_next_nav_shim());

  // src/lib/matches-data.ts
  var GROUP_MATCHES = [
    // GRUPO A
    { phase: "group", group: "A", home_team: "M\xE9xico", away_team: "\xC1frica do Sul", match_date: null, match_order: 1 },
    { phase: "group", group: "A", home_team: "Korea do Sul", away_team: "Rep\xFAblica Checa", match_date: null, match_order: 2 },
    { phase: "group", group: "A", home_team: "M\xE9xico", away_team: "Korea do Sul", match_date: null, match_order: 3 },
    { phase: "group", group: "A", home_team: "Rep\xFAblica Checa", away_team: "\xC1frica do Sul", match_date: null, match_order: 4 },
    { phase: "group", group: "A", home_team: "\xC1frica do Sul", away_team: "Korea do Sul", match_date: null, match_order: 5 },
    { phase: "group", group: "A", home_team: "Rep\xFAblica Checa", away_team: "M\xE9xico", match_date: null, match_order: 6 },
    // GRUPO B
    { phase: "group", group: "B", home_team: "Canad\xE1", away_team: "B\xF3snia H.", match_date: null, match_order: 7 },
    { phase: "group", group: "B", home_team: "Qatar", away_team: "Su\xED\xE7a", match_date: null, match_order: 8 },
    { phase: "group", group: "B", home_team: "Su\xED\xE7a", away_team: "B\xF3snia H.", match_date: null, match_order: 9 },
    { phase: "group", group: "B", home_team: "Canad\xE1", away_team: "Qatar", match_date: null, match_order: 10 },
    { phase: "group", group: "B", home_team: "Su\xED\xE7a", away_team: "Canad\xE1", match_date: null, match_order: 11 },
    { phase: "group", group: "B", home_team: "B\xF3snia H.", away_team: "Qatar", match_date: null, match_order: 12 },
    // GRUPO C
    { phase: "group", group: "C", home_team: "Brasil", away_team: "Marrocos", match_date: null, match_order: 13 },
    { phase: "group", group: "C", home_team: "Haiti", away_team: "Esc\xF3cia", match_date: null, match_order: 14 },
    { phase: "group", group: "C", home_team: "Brasil", away_team: "Haiti", match_date: null, match_order: 15 },
    { phase: "group", group: "C", home_team: "Esc\xF3cia", away_team: "Marrocos", match_date: null, match_order: 16 },
    { phase: "group", group: "C", home_team: "Marrocos", away_team: "Haiti", match_date: null, match_order: 17 },
    { phase: "group", group: "C", home_team: "Esc\xF3cia", away_team: "Brasil", match_date: null, match_order: 18 },
    // GRUPO D
    { phase: "group", group: "D", home_team: "Estados Unidos", away_team: "Paraguai", match_date: null, match_order: 19 },
    { phase: "group", group: "D", home_team: "Austr\xE1lia", away_team: "Turquia", match_date: null, match_order: 20 },
    { phase: "group", group: "D", home_team: "Estados Unidos", away_team: "Austr\xE1lia", match_date: null, match_order: 21 },
    { phase: "group", group: "D", home_team: "Turquia", away_team: "Paraguai", match_date: null, match_order: 22 },
    { phase: "group", group: "D", home_team: "Paraguai", away_team: "Austr\xE1lia", match_date: null, match_order: 23 },
    { phase: "group", group: "D", home_team: "Turquia", away_team: "Estados Unidos", match_date: null, match_order: 24 },
    // GRUPO E
    { phase: "group", group: "E", home_team: "Alemanha", away_team: "Cura\xE7au", match_date: null, match_order: 25 },
    { phase: "group", group: "E", home_team: "Costa do Marfim", away_team: "Equador", match_date: null, match_order: 26 },
    { phase: "group", group: "E", home_team: "Alemanha", away_team: "Costa do Marfim", match_date: null, match_order: 27 },
    { phase: "group", group: "E", home_team: "Equador", away_team: "Cura\xE7au", match_date: null, match_order: 28 },
    { phase: "group", group: "E", home_team: "Equador", away_team: "Alemanha", match_date: null, match_order: 29 },
    { phase: "group", group: "E", home_team: "Cura\xE7au", away_team: "Costa do Marfim", match_date: null, match_order: 30 },
    // GRUPO F
    { phase: "group", group: "F", home_team: "Holanda", away_team: "Jap\xE3o", match_date: null, match_order: 31 },
    { phase: "group", group: "F", home_team: "Su\xE9cia", away_team: "Tun\xEDsia", match_date: null, match_order: 32 },
    { phase: "group", group: "F", home_team: "Tun\xEDsia", away_team: "Jap\xE3o", match_date: null, match_order: 33 },
    { phase: "group", group: "F", home_team: "Holanda", away_team: "Su\xE9cia", match_date: null, match_order: 34 },
    { phase: "group", group: "F", home_team: "Tun\xEDsia", away_team: "Holanda", match_date: null, match_order: 35 },
    { phase: "group", group: "F", home_team: "Jap\xE3o", away_team: "Su\xE9cia", match_date: null, match_order: 36 },
    // GRUPO G
    { phase: "group", group: "G", home_team: "B\xE9lgica", away_team: "Egito", match_date: null, match_order: 37 },
    { phase: "group", group: "G", home_team: "Ir\xE3o", away_team: "Nova Zel\xE2ndia", match_date: null, match_order: 38 },
    { phase: "group", group: "G", home_team: "Nova Zel\xE2ndia", away_team: "Egito", match_date: null, match_order: 39 },
    { phase: "group", group: "G", home_team: "B\xE9lgica", away_team: "Ir\xE3o", match_date: null, match_order: 40 },
    { phase: "group", group: "G", home_team: "Nova Zel\xE2ndia", away_team: "B\xE9lgica", match_date: null, match_order: 41 },
    { phase: "group", group: "G", home_team: "Egito", away_team: "Ir\xE3o", match_date: null, match_order: 42 },
    // GRUPO H
    { phase: "group", group: "H", home_team: "Espanha", away_team: "Cabo Verde", match_date: null, match_order: 43 },
    { phase: "group", group: "H", home_team: "Ar\xE1bia Saudita", away_team: "Uruguai", match_date: null, match_order: 44 },
    { phase: "group", group: "H", home_team: "Espanha", away_team: "Ar\xE1bia Saudita", match_date: null, match_order: 45 },
    { phase: "group", group: "H", home_team: "Uruguai", away_team: "Cabo Verde", match_date: null, match_order: 46 },
    { phase: "group", group: "H", home_team: "Uruguai", away_team: "Espanha", match_date: null, match_order: 47 },
    { phase: "group", group: "H", home_team: "Cabo Verde", away_team: "Ar\xE1bia Saudita", match_date: null, match_order: 48 },
    // GRUPO I
    { phase: "group", group: "I", home_team: "Fran\xE7a", away_team: "Senegal", match_date: null, match_order: 49 },
    { phase: "group", group: "I", home_team: "Iraque", away_team: "Noruega", match_date: null, match_order: 50 },
    { phase: "group", group: "I", home_team: "Fran\xE7a", away_team: "Iraque", match_date: null, match_order: 51 },
    { phase: "group", group: "I", home_team: "Noruega", away_team: "Senegal", match_date: null, match_order: 52 },
    { phase: "group", group: "I", home_team: "Noruega", away_team: "Fran\xE7a", match_date: null, match_order: 53 },
    { phase: "group", group: "I", home_team: "Senegal", away_team: "Iraque", match_date: null, match_order: 54 },
    // GRUPO J
    { phase: "group", group: "J", home_team: "Argentina", away_team: "Arg\xE9lia", match_date: null, match_order: 55 },
    { phase: "group", group: "J", home_team: "\xC1ustria", away_team: "Jord\xE2nia", match_date: null, match_order: 56 },
    { phase: "group", group: "J", home_team: "Argentina", away_team: "\xC1ustria", match_date: null, match_order: 57 },
    { phase: "group", group: "J", home_team: "Jord\xE2nia", away_team: "Arg\xE9lia", match_date: null, match_order: 58 },
    { phase: "group", group: "J", home_team: "Arg\xE9lia", away_team: "\xC1ustria", match_date: null, match_order: 59 },
    { phase: "group", group: "J", home_team: "Jord\xE2nia", away_team: "Argentina", match_date: null, match_order: 60 },
    // GRUPO K
    { phase: "group", group: "K", home_team: "Portugal", away_team: "Congo", match_date: null, match_order: 61 },
    { phase: "group", group: "K", home_team: "Uzbequist\xE3o", away_team: "Col\xF4mbia", match_date: null, match_order: 62 },
    { phase: "group", group: "K", home_team: "Portugal", away_team: "Uzbequist\xE3o", match_date: null, match_order: 63 },
    { phase: "group", group: "K", home_team: "Col\xF4mbia", away_team: "Congo", match_date: null, match_order: 64 },
    { phase: "group", group: "K", home_team: "Col\xF4mbia", away_team: "Portugal", match_date: null, match_order: 65 },
    { phase: "group", group: "K", home_team: "Congo", away_team: "Uzbequist\xE3o", match_date: null, match_order: 66 },
    // GRUPO L
    { phase: "group", group: "L", home_team: "Inglaterra", away_team: "Cro\xE1cia", match_date: null, match_order: 67 },
    { phase: "group", group: "L", home_team: "Gana", away_team: "Panam\xE1", match_date: null, match_order: 68 },
    { phase: "group", group: "L", home_team: "Inglaterra", away_team: "Gana", match_date: null, match_order: 69 },
    { phase: "group", group: "L", home_team: "Panam\xE1", away_team: "Cro\xE1cia", match_date: null, match_order: 70 },
    { phase: "group", group: "L", home_team: "Panam\xE1", away_team: "Inglaterra", match_date: null, match_order: 71 },
    { phase: "group", group: "L", home_team: "Cro\xE1cia", away_team: "Gana", match_date: null, match_order: 72 }
  ];
  var ALL_TEAMS = Array.from(
    new Set(GROUP_MATCHES.flatMap((m) => [m.home_team, m.away_team]))
  ).sort();

  // src/components/RegisterSection.tsx
  var import_jsx_runtime7 = __toESM(require_react_shim());
  function RegisterSection() {
    const router = (0, import_navigation.useRouter)();
    const [name, setName] = (0, import_react7.useState)("");
    const [topScorer, setTopScorer] = (0, import_react7.useState)("");
    const [winner, setWinner] = (0, import_react7.useState)("");
    const [loading, setLoading] = (0, import_react7.useState)(false);
    const [error, setError] = (0, import_react7.useState)("");
    const [success, setSuccess] = (0, import_react7.useState)(false);
    async function handleSubmit(e) {
      e.preventDefault();
      if (!name.trim() || !topScorer.trim() || !winner.trim()) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            top_scorer: topScorer.trim(),
            tournament_winner: winner
          })
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Erro ao registar. Tenta novamente.");
          return;
        }
        setSuccess(true);
        setTimeout(() => router.push(`/prever/${data.token}`), 800);
      } catch {
        setError("Erro de liga\xE7\xE3o. Verifica a tua internet.");
      } finally {
        setLoading(false);
      }
    }
    if (success) {
      return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { id: "inscricao", className: "max-w-lg mx-auto px-4 py-12", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CircleCheck, { size: 48, className: "mx-auto text-wc-gold mb-4" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "text-xl font-bold text-wc-white mb-2", children: "Inscrito com sucesso!" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-wc-white/50 text-sm", children: "A redirecionar para o formul\xE1rio de previs\xF5es..." })
      ] }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { id: "inscricao", className: "max-w-lg mx-auto px-4 py-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserPlus, { size: 20, className: "text-wc-gold" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-xl font-bold text-wc-white", children: "Inscri\xE7\xE3o" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-wc-blue-mid/20 border border-wc-blue-mid/40 rounded-2xl p-5 sm:p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-sm text-wc-white/50 mb-6 leading-relaxed", children: "Escolhe um nome \xFAnico, prev\xEA o melhor marcador e o vencedor do torneio. Depois preenches os resultados jogo a jogo." }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2", children: "Nome \xFAnico *" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "input",
              {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Ex: Pedro Silva",
                maxLength: 40,
                required: true,
                className: cn(
                  "w-full h-12 px-4 rounded-xl border bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none transition-all",
                  error.includes("nome") ? "border-wc-red/60 focus:border-wc-red" : "border-wc-blue-mid/50 focus:border-wc-gold"
                )
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2", children: [
              "Melhor marcador ",
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-wc-gold", children: "(15 pts)" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "input",
              {
                type: "text",
                value: topScorer,
                onChange: (e) => setTopScorer(e.target.value),
                placeholder: "Ex: Cristiano Ronaldo",
                maxLength: 60,
                required: true,
                className: "w-full h-12 px-4 rounded-xl border border-wc-blue-mid/50 bg-wc-blue/40 text-wc-white placeholder:text-wc-white/20 outline-none focus:border-wc-gold transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "block text-xs font-semibold text-wc-white/50 uppercase tracking-wider mb-2", children: [
              "Vencedor do Mundial ",
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-wc-gold", children: "(10 pts)" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
              "select",
              {
                value: winner,
                onChange: (e) => setWinner(e.target.value),
                required: true,
                className: cn(
                  "w-full h-12 px-4 rounded-xl border bg-wc-blue/40 text-wc-white outline-none transition-all appearance-none cursor-pointer",
                  winner ? "border-wc-gold/50 text-wc-white" : "border-wc-blue-mid/50 text-wc-white/30",
                  "focus:border-wc-gold"
                ),
                style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23c9a84c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: "", disabled: true, children: "Escolhe uma sele\xE7\xE3o..." }),
                  ALL_TEAMS.map((team) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("option", { value: team, style: { background: "#0a2240" }, children: team }, team))
                ]
              }
            )
          ] }),
          error && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-2 text-sm text-wc-red bg-wc-red/10 border border-wc-red/30 rounded-xl px-4 py-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(CircleAlert, { size: 16, className: "shrink-0" }),
            error
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "button",
            {
              type: "submit",
              disabled: loading || !name.trim() || !topScorer.trim() || !winner,
              className: "w-full h-13 py-3.5 bg-wc-gold hover:bg-wc-gold-light disabled:bg-wc-gold/30 text-wc-dark disabled:text-wc-dark/40 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2",
              children: loading ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LoaderCircle, { size: 18, className: "animate-spin" }),
                "A registar..."
              ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserPlus, { size: 18 }),
                "Inscrever e Prever Jogos"
              ] })
            }
          )
        ] })
      ] })
    ] });
  }
  return __toCommonJS(ds_entry_exports);
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/circle-alert.mjs:
lucide-react/dist/esm/icons/circle-check.mjs:
lucide-react/dist/esm/icons/loader-circle.mjs:
lucide-react/dist/esm/icons/lock.mjs:
lucide-react/dist/esm/icons/refresh-cw.mjs:
lucide-react/dist/esm/icons/star.mjs:
lucide-react/dist/esm/icons/target.mjs:
lucide-react/dist/esm/icons/trophy.mjs:
lucide-react/dist/esm/icons/user-plus.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.18.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
window.WorldCupGZM=WorldCupGZM.__dsMainNs?Object.assign({},WorldCupGZM,WorldCupGZM.__dsMainNs,{__dsMainNs:undefined}):WorldCupGZM;
