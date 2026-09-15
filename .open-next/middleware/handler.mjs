
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.1.4";globalThis.nextVersion = "16.3.4";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__0o5yty_._.js
var require_root_of_the_server_0o5yty = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__0o5yty_._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0o5yty_._.js", 51615, (e, r, t) => {
      r.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 38022, (e, r, t) => {
      self._ENTRIES ||= {};
      let h = Promise.resolve().then(() => e.i(42738));
      h.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(h, { get(e2, r2) {
        if ("then" === r2) return (r3, t3) => e2.then(r3, t3);
        let t2 = (...t3) => e2.then((e3) => (0, e3[r2])(...t3));
        return t2.then = (t3, h2) => e2.then((e3) => e3[r2]).then(t3, h2), t2;
      } });
    }]);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__1d6cwet._.js
var require_root_of_the_server_1d6cwet = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__1d6cwet._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__1d6cwet._.js", 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 86761, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? i.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var a = { handleFetch: function() {
        return d;
      }, interceptFetch: function() {
        return u;
      }, reader: function() {
        return s;
      } };
      for (var i in a) Object.defineProperty(r, i, { enumerable: true, get: a[i] });
      let o = e.r(86761), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: a2, headers: i2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: d2, redirect: u2, referrer: f, referrerPolicy: h } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: a2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: d2, redirect: u2, referrer: f, referrerPolicy: h } };
      }
      function c(e2, t2) {
        return t2.headers.set("next-test-internal", "1"), e2(t2);
      }
      async function d(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return c(e2, t2);
        let { testData: a2, proxyPort: i2 } = r2, d2 = await l(a2, t2), u2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(d2), headers: { "next-test-internal": "1" }, next: { internal: true } });
        if (!u2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${u2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let f = await u2.json(), { api: h } = f;
        switch (h) {
          case "continue":
            return c(e2, t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: a3 } = e3.response;
              return new Response(a3 ? n.Buffer.from(a3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(f);
          default:
            return h;
        }
      }
      function u(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : d(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var a in n) Object.defineProperty(r, a, { enumerable: true, get: n[a] });
      let i = e.r(86761), o = e.r(28325);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }, 54846, (e, t, r) => {
      !function() {
        "use strict";
        var e2 = { 431: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", a = 0, i = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (i === s - 1 || 1 === o) ;
                else if (i !== s - 1 && 2 === o) {
                  if (n3.length < 2 || 2 !== a || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", a = 0) : a = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), i = s, o = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", a = 0, i = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", a = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(i + 1, s) : n3 = e4.slice(i + 1, s), a = s - i - 1;
                i = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, a = "", i = false, o = arguments.length - 1; o >= -1 && !i; o--) o >= 0 ? n3 = arguments[o] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (a = n3 + "/" + a, i = 47 === n3.charCodeAt(0));
            if (a = r3(a, !i), i) if (a.length > 0) return "/" + a;
            else return "/";
            return a.length > 0 ? a : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), a = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && a && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var a = arguments[r4];
              t2(a), a.length > 0 && (void 0 === e4 ? e4 = a : e4 += "/" + a);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var a = 1; a < e4.length && 47 === e4.charCodeAt(a); ++a) ;
            for (var i = e4.length, o = i - a, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, c = o < l ? o : l, d = -1, u = 0; u <= c; ++u) {
              if (u === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(s + u)) return r4.slice(s + u + 1);
                  else if (0 === u) return r4.slice(s + u);
                } else o > c && (47 === e4.charCodeAt(a + u) ? d = u : 0 === u && (d = 0));
                break;
              }
              var f = e4.charCodeAt(a + u);
              if (f !== r4.charCodeAt(s + u)) break;
              47 === f && (d = u);
            }
            var h = "";
            for (u = a + d + 1; u <= i; ++u) (u === i || 47 === e4.charCodeAt(u)) && (0 === h.length ? h += ".." : h += "/..");
            return h.length > 0 ? h + r4.slice(s + d) : (s += d, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, a = -1, i = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!i) {
                a = o;
                break;
              }
            } else i = false;
            return -1 === a ? n3 ? "/" : "." : n3 && 1 === a ? "//" : e4.slice(0, a);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, a = 0, i = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var c = e4.charCodeAt(n3);
                if (47 === c) {
                  if (!o) {
                    a = n3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = n3 + 1), s >= 0 && (c === r4.charCodeAt(s) ? -1 == --s && (i = n3) : (s = -1, i = l));
              }
              return a === i ? i = l : -1 === i && (i = e4.length), e4.slice(a, i);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!o) {
                a = n3 + 1;
                break;
              }
            } else -1 === i && (o = false, i = n3 + 1);
            return -1 === i ? "" : e4.slice(a, i);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, a = -1, i = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!i) {
                  n3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === a && (i = false, a = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === a || 0 === o || 1 === o && r4 === a - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, a);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var a = e4.charCodeAt(0), i = 47 === a;
            i ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, c = true, d = e4.length - 1, u = 0; d >= r4; --d) {
              if (47 === (a = e4.charCodeAt(d))) {
                if (!c) {
                  s = d + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = d + 1), 46 === a ? -1 === o ? o = d : 1 !== u && (u = 1) : -1 !== o && (u = -1);
            }
            return -1 === o || -1 === l || 0 === u || 1 === u && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && i ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(s, l)) : (0 === s && i ? (n3.name = e4.slice(1, o), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(s, o), n3.base = e4.slice(s, l)), n3.ext = e4.slice(o, l)), s > 0 ? n3.dir = e4.slice(0, s - 1) : i && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var a = r2[t2];
          if (void 0 !== a) return a.exports;
          var i = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](i, i.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return i.exports;
        }
        n.ab = "/ROOT/node_modules/next/dist/compiled/path-browserify/", t.exports = n(431);
      }();
    }, 68886, (e, t, r) => {
      t.exports = e.r(54846);
    }, 67914, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var a2 = "", i3 = r4 + 1; i3 < e4.length; ) {
                    var o3 = e4.charCodeAt(i3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      a2 += e4[i3++];
                      continue;
                    }
                    break;
                  }
                  if (!a2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: a2 }), r4 = i3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", i3 = r4 + 1;
                  if ("?" === e4[i3]) throw TypeError('Pattern cannot start with "?" at '.concat(i3));
                  for (; i3 < e4.length; ) {
                    if ("\\" === e4[i3]) {
                      l2 += e4[i3++] + e4[i3++];
                      continue;
                    }
                    if (")" === e4[i3]) {
                      if (0 == --s3) {
                        i3++;
                        break;
                      }
                    } else if ("(" === e4[i3] && (s3++, "?" !== e4[i3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(i3));
                    l2 += e4[i3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = i3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            }(e3), n2 = t3.prefixes, i2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, d = 0, u = "", f = function(e4) {
              if (d < r3.length && r3[d].type === e4) return r3[d++].value;
            }, h = function(e4) {
              var t4 = f(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[d], a2 = n3.type, i3 = n3.index;
              throw TypeError("Unexpected ".concat(a2, " at ").concat(i3, ", expected ").concat(e4));
            }, p = function() {
              for (var e4, t4 = ""; e4 = f("CHAR") || f("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, b = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, g = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || b(r4) ? "[^".concat(a(s2), "]+?") : "(?:(?!".concat(a(r4), ")[^").concat(a(s2), "])+?");
            }; d < r3.length; ) {
              var x = f("CHAR"), m = f("NAME"), v = f("PATTERN");
              if (m || v) {
                var y = x || "";
                -1 === i2.indexOf(y) && (u += y, y = ""), u && (l.push(u), u = ""), l.push({ name: m || c++, prefix: y, suffix: "", pattern: v || g(y), modifier: f("MODIFIER") || "" });
                continue;
              }
              var w = x || f("ESCAPED_CHAR");
              if (w) {
                u += w;
                continue;
              }
              if (u && (l.push(u), u = ""), f("OPEN")) {
                var y = p(), _ = f("NAME") || "", E = f("PATTERN") || "", S = p();
                h("CLOSE"), l.push({ name: _ || (E ? c++ : ""), pattern: _ && !E ? g(y) : E, prefix: y, suffix: S, modifier: f("MODIFIER") || "" });
                continue;
              }
              h("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = i(t3), n2 = t3.encode, a2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var i2 = e3[n3];
                if ("string" == typeof i2) {
                  r4 += i2;
                  continue;
                }
                var o3 = t4 ? t4[i2.name] : void 0, c = "?" === i2.modifier || "*" === i2.modifier, d = "*" === i2.modifier || "+" === i2.modifier;
                if (Array.isArray(o3)) {
                  if (!d) throw TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(i2.name, '" to not be empty'));
                  }
                  for (var u = 0; u < o3.length; u++) {
                    var f = a2(o3[u], i2);
                    if (s2 && !l[n3].test(f)) throw TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(f, '"'));
                    r4 += i2.prefix + f + i2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var f = a2(String(o3), i2);
                  if (s2 && !l[n3].test(f)) throw TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(f, '"'));
                  r4 += i2.prefix + f + i2.suffix;
                  continue;
                }
                if (!c) {
                  var h = d ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(i2.name, '" to be ').concat(h));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, a2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var i2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return a2(e5, r5);
                  }) : s2[r5.name] = a2(n3[e4], r5);
                }
              }(l);
              return { path: i2, index: o2, params: s2 };
            };
          }
          function a(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function i(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, c = r3.encode, d = void 0 === c ? function(e4) {
              return e4;
            } : c, u = r3.delimiter, f = r3.endsWith, h = "[".concat(a(void 0 === f ? "" : f), "]|$"), p = "[".concat(a(void 0 === u ? "/#?" : u), "]"), b = void 0 === s2 || s2 ? "^" : "", g = 0; g < e3.length; g++) {
              var x = e3[g];
              if ("string" == typeof x) b += a(d(x));
              else {
                var m = a(d(x.prefix)), v = a(d(x.suffix));
                if (x.pattern) if (t3 && t3.push(x), m || v) if ("+" === x.modifier || "*" === x.modifier) {
                  var y = "*" === x.modifier ? "?" : "";
                  b += "(?:".concat(m, "((?:").concat(x.pattern, ")(?:").concat(v).concat(m, "(?:").concat(x.pattern, "))*)").concat(v, ")").concat(y);
                } else b += "(?:".concat(m, "(").concat(x.pattern, ")").concat(v, ")").concat(x.modifier);
                else {
                  if ("+" === x.modifier || "*" === x.modifier) throw TypeError('Can not repeat "'.concat(x.name, '" without a prefix and suffix'));
                  b += "(".concat(x.pattern, ")").concat(x.modifier);
                }
                else b += "(?:".concat(m).concat(v, ")").concat(x.modifier);
              }
            }
            if (void 0 === l || l) o2 || (b += "".concat(p, "?")), b += r3.endsWith ? "(?=".concat(h, ")") : "$";
            else {
              var w = e3[e3.length - 1], _ = "string" == typeof w ? p.indexOf(w[w.length - 1]) > -1 : void 0 === w;
              o2 || (b += "(?:".concat(p, "(?=").concat(h, "))?")), _ || (b += "(?=".concat(p, "|").concat(h, ")"));
            }
            return new RegExp(b, i(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var a2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, d = l.exec(e3.source); d; ) r3.push({ name: d[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), d = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (a2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(a2.join("|"), ")"), i(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 64445, (e, t, r) => {
      var n = { 943: function(t2, r2) {
        !function(n2) {
          "use strict";
          var a2 = "function", i2 = "undefined", o = "object", s = "string", l = "major", c = "model", d = "name", u = "type", f = "vendor", h = "version", p = "architecture", b = "console", g = "mobile", x = "tablet", m = "smarttv", v = "wearable", y = "embedded", w = "Amazon", _ = "Apple", E = "ASUS", S = "BlackBerry", C = "Browser", R = "Chrome", T = "Firefox", O = "Google", P = "Huawei", A = "Microsoft", k = "Motorola", N = "Opera", I = "Samsung", M = "Sharp", j = "Sony", D = "Xiaomi", L = "Zebra", $ = "Facebook", U = "Chromium OS", H = "Mac OS", q = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, F = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === s && -1 !== W(t3).indexOf(W(e2));
          }, W = function(e2) {
            return e2.toLowerCase();
          }, V = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === i2 ? e2 : e2.substring(0, 350);
          }, G = function(e2, t3) {
            for (var r3, n3, i3, s2, l2, c2, d2 = 0; d2 < t3.length && !l2; ) {
              var u2 = t3[d2], f2 = t3[d2 + 1];
              for (r3 = n3 = 0; r3 < u2.length && !l2 && u2[r3]; ) if (l2 = u2[r3++].exec(e2)) for (i3 = 0; i3 < f2.length; i3++) c2 = l2[++n3], typeof (s2 = f2[i3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == a2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== a2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              d2 += 2;
            }
          }, X = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, K = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [h, [d, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [h, [d, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [d, h], [/opios[\/ ]+([\w\.]+)/i], [h, [d, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [h, [d, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [d, h], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [h, [d, "UC" + C]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [h, [d, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [h, [d, "WeChat"]], [/konqueror\/([\w\.]+)/i], [h, [d, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [h, [d, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [h, [d, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[d, /(.+)/, "$1 Secure " + C], h], [/\bfocus\/([\w\.]+)/i], [h, [d, T + " Focus"]], [/\bopt\/([\w\.]+)/i], [h, [d, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [h, [d, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [h, [d, "Dolphin"]], [/coast\/([\w\.]+)/i], [h, [d, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [h, [d, "MIUI " + C]], [/fxios\/([-\w\.]+)/i], [h, [d, T]], [/\bqihu|(qi?ho?o?|360)browser/i], [[d, "360 " + C]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[d, /(.+)/, "$1 " + C], h], [/(comodo_dragon)\/([\w\.]+)/i], [[d, /_/g, " "], h], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [d, h], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [d], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[d, $], h], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [d, h], [/\bgsa\/([\w\.]+) .*safari\//i], [h, [d, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [h, [d, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [h, [d, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[d, R + " WebView"], h], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [h, [d, "Android " + C]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [d, h], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [h, [d, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [h, d], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [d, [h, X, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [d, h], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[d, "Netscape"], h], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [h, [d, T + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [d, h], [/(cobalt)\/([\w\.]+)/i], [d, [h, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[p, "amd64"]], [/(ia32(?=;))/i], [[p, W]], [/((?:i[346]|x)86)[;\)]/i], [[p, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[p, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[p, "armhf"]], [/windows (ce|mobile); ppc;/i], [[p, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[p, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[p, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[p, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [f, I], [u, x]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [f, I], [u, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [f, _], [u, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [f, _], [u, x]], [/(macintosh);/i], [c, [f, _]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [f, M], [u, g]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [f, P], [u, x]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [f, P], [u, g]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [f, D], [u, g]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [f, D], [u, x]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [f, "OPPO"], [u, g]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [f, "Vivo"], [u, g]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [f, "Realme"], [u, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [f, k], [u, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [f, k], [u, x]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [f, "LG"], [u, x]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [f, "LG"], [u, g]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [f, "Lenovo"], [u, x]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [f, "Nokia"], [u, g]], [/(pixel c)\b/i], [c, [f, O], [u, x]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [f, O], [u, g]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [f, j], [u, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [f, j], [u, x]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [f, "OnePlus"], [u, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [f, w], [u, x]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [f, w], [u, g]], [/(playbook);[-\w\),; ]+(rim)/i], [c, f, [u, x]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [f, S], [u, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [f, E], [u, x]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [f, E], [u, g]], [/(nexus 9)/i], [c, [f, "HTC"], [u, x]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [f, [c, /_/g, " "], [u, g]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [f, "Acer"], [u, x]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [f, "Meizu"], [u, g]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [f, c, [u, g]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [f, c, [u, x]], [/(surface duo)/i], [c, [f, A], [u, x]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [f, "Fairphone"], [u, g]], [/(u304aa)/i], [c, [f, "AT&T"], [u, g]], [/\bsie-(\w*)/i], [c, [f, "Siemens"], [u, g]], [/\b(rct\w+) b/i], [c, [f, "RCA"], [u, x]], [/\b(venue[\d ]{2,7}) b/i], [c, [f, "Dell"], [u, x]], [/\b(q(?:mv|ta)\w+) b/i], [c, [f, "Verizon"], [u, x]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [f, "Barnes & Noble"], [u, x]], [/\b(tm\d{3}\w+) b/i], [c, [f, "NuVision"], [u, x]], [/\b(k88) b/i], [c, [f, "ZTE"], [u, x]], [/\b(nx\d{3}j) b/i], [c, [f, "ZTE"], [u, g]], [/\b(gen\d{3}) b.+49h/i], [c, [f, "Swiss"], [u, g]], [/\b(zur\d{3}) b/i], [c, [f, "Swiss"], [u, x]], [/\b((zeki)?tb.*\b) b/i], [c, [f, "Zeki"], [u, x]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[f, "Dragon Touch"], c, [u, x]], [/\b(ns-?\w{0,9}) b/i], [c, [f, "Insignia"], [u, x]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [f, "NextBook"], [u, x]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[f, "Voice"], c, [u, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[f, "LvTel"], c, [u, g]], [/\b(ph-1) /i], [c, [f, "Essential"], [u, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [f, "Envizen"], [u, x]], [/\b(trio[-\w\. ]+) b/i], [c, [f, "MachSpeed"], [u, x]], [/\btu_(1491) b/i], [c, [f, "Rotor"], [u, x]], [/(shield[\w ]+) b/i], [c, [f, "Nvidia"], [u, x]], [/(sprint) (\w+)/i], [f, c, [u, g]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [f, A], [u, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [f, L], [u, x]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [f, L], [u, g]], [/smart-tv.+(samsung)/i], [f, [u, m]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [f, I], [u, m]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[f, "LG"], [u, m]], [/(apple) ?tv/i], [f, [c, _ + " TV"], [u, m]], [/crkey/i], [[c, R + "cast"], [f, O], [u, m]], [/droid.+aft(\w)( bui|\))/i], [c, [f, w], [u, m]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [f, M], [u, m]], [/(bravia[\w ]+)( bui|\))/i], [c, [f, j], [u, m]], [/(mitv-\w{5}) bui/i], [c, [f, D], [u, m]], [/Hbbtv.*(technisat) (.*);/i], [f, c, [u, m]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[f, V], [c, V], [u, m]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[u, m]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [f, c, [u, b]], [/droid.+; (shield) bui/i], [c, [f, "Nvidia"], [u, b]], [/(playstation [345portablevi]+)/i], [c, [f, j], [u, b]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [f, A], [u, b]], [/((pebble))app/i], [f, c, [u, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [f, _], [u, v]], [/droid.+; (glass) \d/i], [c, [f, O], [u, v]], [/droid.+; (wt63?0{2,3})\)/i], [c, [f, L], [u, v]], [/(quest( 2| pro)?)/i], [c, [f, $], [u, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [f, [u, y]], [/(aeobc)\b/i], [c, [f, w], [u, y]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [u, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [u, x]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[u, x]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[u, g]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [f, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [h, [d, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [h, [d, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [d, h], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [h, d]], os: [[/microsoft (windows) (vista|xp)/i], [d, h], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [d, [h, X, z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[d, "Windows"], [h, X, z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[h, /_/g, "."], [d, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[d, H], [h, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [h, d], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [d, h], [/\(bb(10);/i], [h, [d, S]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [h, [d, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [h, [d, T + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [h, [d, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [h, [d, "watchOS"]], [/crkey\/([\d\.]+)/i], [h, [d, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[d, U], h], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [d, h], [/(sunos) ?([\w\.\d]*)/i], [[d, "Solaris"], h], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [d, h]] }, J = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof J)) return new J(e2, t3).getResult();
            var r3 = typeof n2 !== i2 && n2.navigator ? n2.navigator : void 0, b2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), m2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? q(K, t3) : K, y2 = r3 && r3.userAgent == b2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[d] = void 0, t4[h] = void 0, G.call(t4, b2, v2.browser), t4[l] = typeof (e3 = t4[h]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, y2 && r3 && r3.brave && typeof r3.brave.isBrave == a2 && (t4[d] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[p] = void 0, G.call(e3, b2, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[f] = void 0, e3[c] = void 0, e3[u] = void 0, G.call(e3, b2, v2.device), y2 && !e3[u] && m2 && m2.mobile && (e3[u] = g), y2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== i2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[u] = x), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[d] = void 0, e3[h] = void 0, G.call(e3, b2, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[d] = void 0, e3[h] = void 0, G.call(e3, b2, v2.os), y2 && !e3[d] && m2 && "Unknown" != m2.platform && (e3[d] = m2.platform.replace(/chrome os/i, U).replace(/macos/i, H)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return b2;
            }, this.setUA = function(e3) {
              return b2 = typeof e3 === s && e3.length > 350 ? V(e3, 350) : e3, this;
            }, this.setUA(b2), this;
          };
          if (J.VERSION = "1.0.35", J.BROWSER = F([d, h, l]), J.CPU = F([p]), J.DEVICE = F([c, f, u, b, g, m, x, v, y]), J.ENGINE = J.OS = F([d, h]), typeof r2 !== i2) t2.exports && (r2 = t2.exports = J), r2.UAParser = J;
          else if (typeof define === a2 && define.amd) e.r, void 0 !== J && e.v(J);
          else typeof n2 !== i2 && (n2.UAParser = J);
          var Q = typeof n2 !== i2 && (n2.jQuery || n2.Zepto);
          if (Q && !Q.ua) {
            var Y = new J();
            Q.ua = Y.getResult(), Q.ua.get = function() {
              return Y.getUA();
            }, Q.ua.set = function(e2) {
              Y.setUA(e2);
              var t3 = Y.getResult();
              for (var r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, a = {};
      function i(e2) {
        var t2 = a[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = a[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, i), o = false;
        } finally {
          o && delete a[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(943);
    }, 8946, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function a(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray;
      function o() {
      }
      var s = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), f = Symbol.for("react.forward_ref"), h = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), x = Symbol.for("react.view_transition"), m = Symbol.iterator, v = Object.prototype.hasOwnProperty, y = Object.assign;
      function w(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function _(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var E = /\/+/g;
      function S(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function C(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !function e3(t3, r3, n3, c3, d2) {
          var u2, f2, h2, p2 = typeof t3;
          ("undefined" === p2 || "boolean" === p2) && (t3 = null);
          var g2 = false;
          if (null === t3) g2 = true;
          else switch (p2) {
            case "bigint":
            case "string":
            case "number":
              g2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  g2 = true;
                  break;
                case b:
                  return e3((g2 = t3._init)(t3._payload), r3, n3, c3, d2);
              }
          }
          if (g2) return d2 = d2(t3), g2 = "" === c3 ? "." + S(t3, 0) : c3, i(d2) ? (n3 = "", null != g2 && (n3 = g2.replace(E, "$&/") + "/"), e3(d2, r3, n3, "", function(e4) {
            return e4;
          })) : null != d2 && (_(d2) && (u2 = d2, f2 = n3 + (null == d2.key || t3 && t3.key === d2.key ? "" : ("" + d2.key).replace(E, "$&/") + "/") + g2, d2 = w(u2.type, f2, u2.props)), r3.push(d2)), 1;
          g2 = 0;
          var x2 = "" === c3 ? "." : c3 + ":";
          if (i(t3)) for (var v2 = 0; v2 < t3.length; v2++) p2 = x2 + S(c3 = t3[v2], v2), g2 += e3(c3, r3, n3, p2, d2);
          else if ("function" == typeof (v2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = m && h2[m] || h2["@@iterator"]) ? h2 : null)) for (t3 = v2.call(t3), v2 = 0; !(c3 = t3.next()).done; ) p2 = x2 + S(c3 = c3.value, v2++), g2 += e3(c3, r3, n3, p2, d2);
          else if ("object" === p2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, n3, c3, d2);
            throw Error(a(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return g2;
        }(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function R(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function T() {
        return /* @__PURE__ */ new WeakMap();
      }
      function O() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = g, r.Children = { map: C, forEach: function(e2, t2, r2) {
        C(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return C(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return C(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!_(e2)) throw Error(a(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = u, r.StrictMode = d, r.Suspense = h, r.ViewTransition = x, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(T);
          void 0 === (t2 = r2.get(e2)) && (t2 = O(), r2.set(e2, t2)), r2 = 0;
          for (var a2 = arguments.length; r2 < a2; r2++) {
            var i2 = arguments[r2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(i2)) && (t2 = O(), o2.set(i2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(i2)) && (t2 = O(), o2.set(i2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(a(267, e2));
        var n2 = y({}, e2.props), i2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) v.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return w(e2.type, i2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, a2 = {}, i2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) v.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (a2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) a2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          a2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === a2[n2] && (a2[n2] = o2[n2]);
        return w(e2, i2, a2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: f, render: e2 };
      }, r.isValidElement = _, r.lazy = function(e2) {
        return { $$typeof: b, _payload: { _status: -1, _result: e2 }, _init: R };
      }, r.memo = function(e2, t2) {
        return { $$typeof: p, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-cbb046ab-20260731";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 90894, (e, t, r) => {
      e.n(__import_unsupported("crypto"));
    }, 12438, (e, t, r) => {
      !function(r2, n) {
        if ("function" == typeof define && define.amd) {
          let t2;
          void 0 !== (t2 = n()) && e.v(t2);
        } else t && t.exports ? t.exports = n() : (r2.dcodeIO = r2.dcodeIO || {}).bcrypt = n();
      }(e.e, function() {
        "use strict";
        var r2, n = {}, a = null;
        function i(r3) {
          if (t && t.exports) try {
            return e.r(90894).randomBytes(r3);
          } catch (e2) {
          }
          try {
            var n2;
            return (self.crypto || self.msCrypto).getRandomValues(n2 = new Uint32Array(r3)), Array.prototype.slice.call(n2);
          } catch (e2) {
          }
          if (!a) throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
          return a(r3);
        }
        try {
          i(1);
        } catch (e2) {
        }
        function o(e2, t2) {
          for (var r3 = 0, n2 = 0, a2 = 0, i2 = e2.length; a2 < i2; ++a2) e2.charCodeAt(a2) === t2.charCodeAt(a2) ? ++r3 : ++n2;
          return !(r3 < 0) && 0 === n2;
        }
        a = null, n.setRandomFallback = function(e2) {
          a = e2;
        }, n.genSaltSync = function(e2, t2) {
          if ("number" != typeof (e2 = e2 || b)) throw Error("Illegal arguments: " + typeof e2 + ", " + typeof t2);
          e2 < 4 ? e2 = 4 : e2 > 31 && (e2 = 31);
          var r3 = [];
          return r3.push("$2a$"), e2 < 10 && r3.push("0"), r3.push(e2.toString()), r3.push("$"), r3.push(u(i(p), p)), r3.join("");
        }, n.genSalt = function(e2, t2, r3) {
          if ("function" == typeof t2 && (r3 = t2, t2 = void 0), "function" == typeof e2 && (r3 = e2, e2 = void 0), void 0 === e2) e2 = b;
          else if ("number" != typeof e2) throw Error("illegal arguments: " + typeof e2);
          function a2(t3) {
            s(function() {
              try {
                t3(null, n.genSaltSync(e2));
              } catch (e3) {
                t3(e3);
              }
            });
          }
          if (!r3) return new Promise(function(e3, t3) {
            a2(function(r4, n2) {
              r4 ? t3(r4) : e3(n2);
            });
          });
          if ("function" != typeof r3) throw Error("Illegal callback: " + typeof r3);
          a2(r3);
        }, n.hashSync = function(e2, t2) {
          if (void 0 === t2 && (t2 = b), "number" == typeof t2 && (t2 = n.genSaltSync(t2)), "string" != typeof e2 || "string" != typeof t2) throw Error("Illegal arguments: " + typeof e2 + ", " + typeof t2);
          return E(e2, t2);
        }, n.hash = function(e2, t2, r3, a2) {
          function i2(r4) {
            "string" == typeof e2 && "number" == typeof t2 ? n.genSalt(t2, function(t3, n2) {
              E(e2, n2, r4, a2);
            }) : "string" == typeof e2 && "string" == typeof t2 ? E(e2, t2, r4, a2) : s(r4.bind(this, Error("Illegal arguments: " + typeof e2 + ", " + typeof t2)));
          }
          if (!r3) return new Promise(function(e3, t3) {
            i2(function(r4, n2) {
              r4 ? t3(r4) : e3(n2);
            });
          });
          if ("function" != typeof r3) throw Error("Illegal callback: " + typeof r3);
          i2(r3);
        }, n.compareSync = function(e2, t2) {
          if ("string" != typeof e2 || "string" != typeof t2) throw Error("Illegal arguments: " + typeof e2 + ", " + typeof t2);
          return 60 === t2.length && o(n.hashSync(e2, t2.substr(0, t2.length - 31)), t2);
        }, n.compare = function(e2, t2, r3, a2) {
          function i2(r4) {
            "string" != typeof e2 || "string" != typeof t2 ? s(r4.bind(this, Error("Illegal arguments: " + typeof e2 + ", " + typeof t2))) : 60 !== t2.length ? s(r4.bind(this, null, false)) : n.hash(e2, t2.substr(0, 29), function(e3, n2) {
              e3 ? r4(e3) : r4(null, o(n2, t2));
            }, a2);
          }
          if (!r3) return new Promise(function(e3, t3) {
            i2(function(r4, n2) {
              r4 ? t3(r4) : e3(n2);
            });
          });
          if ("function" != typeof r3) throw Error("Illegal callback: " + typeof r3);
          i2(r3);
        }, n.getRounds = function(e2) {
          if ("string" != typeof e2) throw Error("Illegal arguments: " + typeof e2);
          return parseInt(e2.split("$")[2], 10);
        }, n.getSalt = function(e2) {
          if ("string" != typeof e2) throw Error("Illegal arguments: " + typeof e2);
          if (60 !== e2.length) throw Error("Illegal hash length: " + e2.length + " != 60");
          return e2.substring(0, 29);
        };
        var s = "u" > typeof process && process && "function" == typeof process.nextTick ? "function" == typeof setImmediate ? setImmediate : process.nextTick : setTimeout, l = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), c = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, -1, -1, -1, -1, -1], d = String.fromCharCode;
        function u(e2, t2) {
          var r3, n2, a2 = 0, i2 = [];
          if (t2 <= 0 || t2 > e2.length) throw Error("Illegal len: " + t2);
          for (; a2 < t2; ) {
            if (r3 = 255 & e2[a2++], i2.push(l[r3 >> 2 & 63]), r3 = (3 & r3) << 4, a2 >= t2 || (r3 |= (n2 = 255 & e2[a2++]) >> 4 & 15, i2.push(l[63 & r3]), r3 = (15 & n2) << 2, a2 >= t2)) {
              i2.push(l[63 & r3]);
              break;
            }
            r3 |= (n2 = 255 & e2[a2++]) >> 6 & 3, i2.push(l[63 & r3]), i2.push(l[63 & n2]);
          }
          return i2.join("");
        }
        function f(e2, t2) {
          var r3, n2, a2, i2, o2, s2 = 0, l2 = e2.length, u2 = 0, f2 = [];
          if (t2 <= 0) throw Error("Illegal len: " + t2);
          for (; s2 < l2 - 1 && u2 < t2 && (r3 = (o2 = e2.charCodeAt(s2++)) < c.length ? c[o2] : -1, n2 = (o2 = e2.charCodeAt(s2++)) < c.length ? c[o2] : -1, -1 != r3 && -1 != n2) && (i2 = r3 << 2 >>> 0 | (48 & n2) >> 4, f2.push(d(i2)), !(++u2 >= t2 || s2 >= l2 || -1 == (a2 = (o2 = e2.charCodeAt(s2++)) < c.length ? c[o2] : -1) || (i2 = (15 & n2) << 4 >>> 0 | (60 & a2) >> 2, f2.push(d(i2)), ++u2 >= t2 || s2 >= l2))); ) {
            ;
            i2 = (3 & a2) << 6 >>> 0 | ((o2 = e2.charCodeAt(s2++)) < c.length ? c[o2] : -1), f2.push(d(i2)), ++u2;
          }
          var h2 = [];
          for (s2 = 0; s2 < u2; s2++) h2.push(f2[s2].charCodeAt(0));
          return h2;
        }
        var h = ((r2 = {}).MAX_CODEPOINT = 1114111, r2.encodeUTF8 = function(e2, t2) {
          var r3 = null;
          for ("number" == typeof e2 && (r3 = e2, e2 = function() {
            return null;
          }); null !== r3 || null !== (r3 = e2()); ) r3 < 128 ? t2(127 & r3) : (r3 < 2048 ? t2(r3 >> 6 & 31 | 192) : (r3 < 65536 ? t2(r3 >> 12 & 15 | 224) : (t2(r3 >> 18 & 7 | 240), t2(r3 >> 12 & 63 | 128)), t2(r3 >> 6 & 63 | 128)), t2(63 & r3 | 128)), r3 = null;
        }, r2.decodeUTF8 = function(e2, t2) {
          for (var r3, n2, a2, i2, o2 = function(e3) {
            var t3 = Error((e3 = e3.slice(0, e3.indexOf(null))).toString());
            throw t3.name = "TruncatedError", t3.bytes = e3, t3;
          }; null !== (r3 = e2()); ) if ((128 & r3) == 0) t2(r3);
          else if ((224 & r3) == 192) null === (n2 = e2()) && o2([r3, n2]), t2((31 & r3) << 6 | 63 & n2);
          else if ((240 & r3) == 224) (null === (n2 = e2()) || null === (a2 = e2())) && o2([r3, n2, a2]), t2((15 & r3) << 12 | (63 & n2) << 6 | 63 & a2);
          else if ((248 & r3) == 240) (null === (n2 = e2()) || null === (a2 = e2()) || null === (i2 = e2())) && o2([r3, n2, a2, i2]), t2((7 & r3) << 18 | (63 & n2) << 12 | (63 & a2) << 6 | 63 & i2);
          else throw RangeError("Illegal starting byte: " + r3);
        }, r2.UTF16toUTF8 = function(e2, t2) {
          for (var r3, n2 = null; null !== (r3 = null !== n2 ? n2 : e2()); ) {
            if (r3 >= 55296 && r3 <= 57343 && null !== (n2 = e2()) && n2 >= 56320 && n2 <= 57343) {
              t2((r3 - 55296) * 1024 + n2 - 56320 + 65536), n2 = null;
              continue;
            }
            t2(r3);
          }
          null !== n2 && t2(n2);
        }, r2.UTF8toUTF16 = function(e2, t2) {
          var r3 = null;
          for ("number" == typeof e2 && (r3 = e2, e2 = function() {
            return null;
          }); null !== r3 || null !== (r3 = e2()); ) r3 <= 65535 ? t2(r3) : (t2(((r3 -= 65536) >> 10) + 55296), t2(r3 % 1024 + 56320)), r3 = null;
        }, r2.encodeUTF16toUTF8 = function(e2, t2) {
          r2.UTF16toUTF8(e2, function(e3) {
            r2.encodeUTF8(e3, t2);
          });
        }, r2.decodeUTF8toUTF16 = function(e2, t2) {
          r2.decodeUTF8(e2, function(e3) {
            r2.UTF8toUTF16(e3, t2);
          });
        }, r2.calculateCodePoint = function(e2) {
          return e2 < 128 ? 1 : e2 < 2048 ? 2 : e2 < 65536 ? 3 : 4;
        }, r2.calculateUTF8 = function(e2) {
          for (var t2, n2 = 0; null !== (t2 = e2()); ) n2 += r2.calculateCodePoint(t2);
          return n2;
        }, r2.calculateUTF16asUTF8 = function(e2) {
          var t2 = 0, n2 = 0;
          return r2.UTF16toUTF8(e2, function(e3) {
            ++t2, n2 += r2.calculateCodePoint(e3);
          }), [t2, n2];
        }, r2);
        Date.now = Date.now || function() {
          return +/* @__PURE__ */ new Date();
        };
        var p = 16, b = 10, g = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], x = [3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946, 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055, 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504, 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462], m = [1332899944, 1700884034, 1701343084, 1684370003, 1668446532, 1869963892];
        function v(e2, t2, r3, n2) {
          var a2 = e2[t2], i2 = e2[t2 + 1];
          return a2 ^= r3[0], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[1], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[2], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[3], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[4], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[5], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[6], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[7], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[8], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[9], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[10], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[11], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[12], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[13], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[14], i2 ^= (n2[a2 >>> 24] + n2[256 | a2 >> 16 & 255] ^ n2[512 | a2 >> 8 & 255]) + n2[768 | 255 & a2] ^ r3[15], a2 ^= (n2[i2 >>> 24] + n2[256 | i2 >> 16 & 255] ^ n2[512 | i2 >> 8 & 255]) + n2[768 | 255 & i2] ^ r3[16], e2[t2] = i2 ^ r3[17], e2[t2 + 1] = a2, e2;
        }
        function y(e2, t2) {
          for (var r3 = 0, n2 = 0; r3 < 4; ++r3) n2 = n2 << 8 | 255 & e2[t2], t2 = (t2 + 1) % e2.length;
          return { key: n2, offp: t2 };
        }
        function w(e2, t2, r3) {
          for (var n2, a2 = 0, i2 = [0, 0], o2 = t2.length, s2 = r3.length, l2 = 0; l2 < o2; l2++) a2 = (n2 = y(e2, a2)).offp, t2[l2] = t2[l2] ^ n2.key;
          for (l2 = 0; l2 < o2; l2 += 2) i2 = v(i2, 0, t2, r3), t2[l2] = i2[0], t2[l2 + 1] = i2[1];
          for (l2 = 0; l2 < s2; l2 += 2) i2 = v(i2, 0, t2, r3), r3[l2] = i2[0], r3[l2 + 1] = i2[1];
        }
        function _(e2, t2, r3, n2, a2) {
          var i2, o2, l2 = m.slice(), c2 = l2.length;
          if (r3 < 4 || r3 > 31) {
            if (o2 = Error("Illegal number of rounds (4-31): " + r3), n2) return void s(n2.bind(this, o2));
            throw o2;
          }
          if (t2.length !== p) {
            if (o2 = Error("Illegal salt length: " + t2.length + " != " + p), n2) return void s(n2.bind(this, o2));
            throw o2;
          }
          r3 = 1 << r3 >>> 0;
          var d2, u2, f2, h2 = 0;
          function b2() {
            if (a2 && a2(h2 / r3), h2 < r3) for (var i3 = Date.now(); h2 < r3 && (h2 += 1, w(e2, d2, u2), w(t2, d2, u2), !(Date.now() - i3 > 100)); ) ;
            else {
              for (h2 = 0; h2 < 64; h2++) for (f2 = 0; f2 < c2 >> 1; f2++) v(l2, f2 << 1, d2, u2);
              var o3 = [];
              for (h2 = 0; h2 < c2; h2++) o3.push((l2[h2] >> 24 & 255) >>> 0), o3.push((l2[h2] >> 16 & 255) >>> 0), o3.push((l2[h2] >> 8 & 255) >>> 0), o3.push((255 & l2[h2]) >>> 0);
              return n2 ? void n2(null, o3) : o3;
            }
            n2 && s(b2);
          }
          if (Int32Array ? (d2 = new Int32Array(g), u2 = new Int32Array(x)) : (d2 = g.slice(), u2 = x.slice()), !function(e3, t3, r4, n3) {
            for (var a3, i3 = 0, o3 = [0, 0], s2 = r4.length, l3 = n3.length, c3 = 0; c3 < s2; c3++) i3 = (a3 = y(t3, i3)).offp, r4[c3] = r4[c3] ^ a3.key;
            for (c3 = 0, i3 = 0; c3 < s2; c3 += 2) i3 = (a3 = y(e3, i3)).offp, o3[0] ^= a3.key, i3 = (a3 = y(e3, i3)).offp, o3[1] ^= a3.key, o3 = v(o3, 0, r4, n3), r4[c3] = o3[0], r4[c3 + 1] = o3[1];
            for (c3 = 0; c3 < l3; c3 += 2) i3 = (a3 = y(e3, i3)).offp, o3[0] ^= a3.key, i3 = (a3 = y(e3, i3)).offp, o3[1] ^= a3.key, o3 = v(o3, 0, r4, n3), n3[c3] = o3[0], n3[c3 + 1] = o3[1];
          }(t2, e2, d2, u2), void 0 !== n2) b2();
          else for (; ; ) if (void 0 !== (i2 = b2())) return i2 || [];
        }
        function E(e2, t2, r3, n2) {
          if ("string" != typeof e2 || "string" != typeof t2) {
            if (l2 = Error("Invalid string / salt: Not a string"), r3) return void s(r3.bind(this, l2));
            throw l2;
          }
          if ("$" !== t2.charAt(0) || "2" !== t2.charAt(1)) {
            if (l2 = Error("Invalid salt version: " + t2.substring(0, 2)), r3) return void s(r3.bind(this, l2));
            throw l2;
          }
          if ("$" === t2.charAt(2)) c2 = "\0", d2 = 3;
          else {
            if ("a" !== (c2 = t2.charAt(2)) && "b" !== c2 && "y" !== c2 || "$" !== t2.charAt(3)) {
              if (l2 = Error("Invalid salt revision: " + t2.substring(2, 4)), r3) return void s(r3.bind(this, l2));
              throw l2;
            }
            d2 = 4;
          }
          if (t2.charAt(d2 + 2) > "$") {
            if (l2 = Error("Missing salt rounds"), r3) return void s(r3.bind(this, l2));
            throw l2;
          }
          var a2, i2, o2, l2, c2, d2, b2 = 10 * parseInt(t2.substring(d2, d2 + 1), 10) + parseInt(t2.substring(d2 + 1, d2 + 2), 10), g2 = t2.substring(d2 + 3, d2 + 25);
          e2 += c2 >= "a" ? "\0" : "";
          var x2 = (a2 = e2, i2 = [], o2 = 0, h.encodeUTF16toUTF8(function() {
            return o2 >= a2.length ? null : a2.charCodeAt(o2++);
          }, function(e3) {
            i2.push(e3);
          }), i2), v2 = f(g2, p);
          function y2(e3) {
            var t3 = [];
            return t3.push("$2"), c2 >= "a" && t3.push(c2), t3.push("$"), b2 < 10 && t3.push("0"), t3.push(b2.toString()), t3.push("$"), t3.push(u(v2, v2.length)), t3.push(u(e3, 4 * m.length - 1)), t3.join("");
          }
          if (void 0 === r3) return y2(_(x2, v2, b2));
          _(x2, v2, b2, function(e3, t3) {
            e3 ? r3(e3, null) : r3(null, y2(t3));
          }, n2);
        }
        return n.encodeBase64 = u, n.decodeBase64 = f, n;
      });
    }, 42738, (e) => {
      "use strict";
      let t, r, n, a, i;
      async function o() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(74398);
      let s = null;
      async function l() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        s || (s = o());
        let e10 = await s;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function c(...e10) {
        let t10 = await o();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let d = null;
      function u() {
        return d || (d = l()), d;
      }
      function f(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r10, n2, a2) {
            if ("function" == typeof a2[0]) return a2[0](t10);
            throw Object.defineProperty(Error(f(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      u();
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1177", enumerable: false, configurable: true });
        }
      }
      class p extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  "), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1178", enumerable: false, configurable: true });
        }
      }
      class b extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  "), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1172", enumerable: false, configurable: true });
        }
      }
      let g = "x-prerender-revalidate", x = "x-prerender-revalidate-if-generated", m = ".meta", v = "x-next-cache-tags", y = "x-next-revalidated-tags", w = "_N_T_", _ = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function E(e10) {
        var t10, r10, n2, a2, i2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, i2 = false; l2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), a2 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (i2 = true, s2 = a2, o2.push(e10.substring(t10, n2)), t10 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!i2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function S(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n2, a2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r10.push(...E(a2)), t10[n2] = 1 === r10.length ? r10[0] : r10) : t10[n2] = a2;
        return t10;
      }
      function C(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ..._, GROUP: { builtinReact: [_.reactServerComponents, _.actionBrowser], serverOnly: [_.reactServerComponents, _.actionBrowser, _.instrument, _.middleware], neutralTarget: [_.apiNode, _.apiEdge], clientOnly: [_.serverSideRendering, _.appPagesBrowser], bundled: [_.reactServerComponents, _.actionBrowser, _.serverSideRendering, _.appPagesBrowser, _.shared, _.instrument, _.middleware], appPages: [_.reactServerComponents, _.serverSideRendering, _.appPagesBrowser, _.actionBrowser] } });
      let R = Symbol("response"), T = Symbol("passThrough"), O = Symbol("waitUntil");
      class P {
        constructor(e10, t10) {
          this[T] = false, this[O] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[R] || (this[R] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[T] = true;
        }
        waitUntil(e10) {
          if ("external" === this[O].kind) return (0, this[O].function)(e10);
          this[O].promises.push(e10);
        }
      }
      class A extends P {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function k(e10) {
        return 47 === e10.charCodeAt(e10.length - 1) && e10.length > 1 ? e10.slice(0, -1) : e10;
      }
      function N(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n2 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n2 || t10 > -1 ? { pathname: e10.substring(0, n2 ? r10 : t10), query: n2 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function I(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: a2 } = N(e10);
        return `${t10}${r10}${n2}${a2}`;
      }
      function M(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: a2 } = N(e10);
        return `${r10}${t10}${n2}${a2}`;
      }
      function j(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = N(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let D = /* @__PURE__ */ new WeakMap();
      function L(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n2 = D.get(t10);
        n2 || (n2 = t10.map((e11) => e11.toLowerCase()), D.set(t10, n2));
        let a2 = e10.split("/", 2);
        if (!a2[1]) return { pathname: e10 };
        let i2 = a2[1].toLowerCase(), o2 = n2.indexOf(i2);
        return o2 < 0 ? { pathname: e10 } : (r10 = t10[o2], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let $ = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function U(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return $.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let H = Symbol("NextURLInternal");
      class q {
        constructor(e10, t10, r10) {
          let n2, a2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n2 = t10, a2 = r10 || {}) : a2 = r10 || t10 || {}, this[H] = { url: U(e10, n2 ?? a2.base), options: a2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n2, a2;
          let i2 = function(e11, t11) {
            let { basePath: r11, i18n: n3, trailingSlash: a3 } = t11.nextConfig ?? {}, i3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : a3 };
            r11 && j(i3.pathname, r11) && (i3.pathname = function(e12, t12) {
              if (!j(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            }(i3.pathname, r11), i3.basePath = r11);
            let o3 = i3.pathname;
            if (i3.pathname.startsWith("/_next/data/") && i3.pathname.endsWith(".json")) {
              let e12 = i3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i3.pathname = o3);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i3.pathname) : L(i3.pathname, n3.locales);
              i3.locale = e12.detectedLocale, i3.pathname = e12.pathname ?? i3.pathname, !e12.detectedLocale && i3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : L(o3, n3.locales)).detectedLocale && (i3.locale = e12.detectedLocale);
            }
            return i3;
          }(this[H].url.pathname, { nextConfig: this[H].options.nextConfig, parseData: true, i18nProvider: this[H].options.i18nProvider }), o2 = function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          }(this[H].url, this[H].options.headers);
          this[H].domainLocale = this[H].options.i18nProvider ? this[H].options.i18nProvider.detectDomainLocale(o2) : function(e11, t11, r11) {
            if (e11) {
              for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n3.domain?.split(":", 1)[0].toLowerCase() || r11 === n3.defaultLocale.toLowerCase() || n3.locales?.some((e12) => e12.toLowerCase() === r11)) return n3;
            }
          }(null == (t10 = this[H].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r10 = this[H].domainLocale) ? void 0 : r10.defaultLocale) || (null == (a2 = this[H].options.nextConfig) || null == (n2 = a2.i18n) ? void 0 : n2.defaultLocale);
          this[H].url.pathname = i2.pathname, this[H].defaultLocale = s2, this[H].basePath = i2.basePath ?? "", this[H].buildId = i2.buildId, this[H].locale = i2.locale ?? s2, this[H].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r10, n2) {
            if (!t11 || t11 === r10) return e11;
            let a2 = e11.toLowerCase();
            return !n2 && (j(a2, "/api") || j(a2, `/${t11.toLowerCase()}`)) ? e11 : I(e11, `/${t11}`);
          }((e10 = { basePath: this[H].basePath, buildId: this[H].buildId, defaultLocale: this[H].options.forceLocale ? void 0 : this[H].defaultLocale, locale: this[H].locale, pathname: this[H].url.pathname, trailingSlash: this[H].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = k(t10)), e10.buildId && (t10 = M(I(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = I(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : M(t10, "/") : k(t10);
        }
        formatSearch() {
          return this[H].url.search;
        }
        get buildId() {
          return this[H].buildId;
        }
        set buildId(e10) {
          this[H].buildId = e10;
        }
        get locale() {
          return this[H].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[H].locale || !(null == (r10 = this[H].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[H].locale = e10;
        }
        get defaultLocale() {
          return this[H].defaultLocale;
        }
        get domainLocale() {
          return this[H].domainLocale;
        }
        get searchParams() {
          return this[H].url.searchParams;
        }
        get host() {
          return this[H].url.host;
        }
        set host(e10) {
          this[H].url.host = e10;
        }
        get hostname() {
          return this[H].url.hostname;
        }
        set hostname(e10) {
          this[H].url.hostname = e10;
        }
        get port() {
          return this[H].url.port;
        }
        set port(e10) {
          this[H].url.port = e10;
        }
        get protocol() {
          return this[H].url.protocol;
        }
        set protocol(e10) {
          this[H].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[H].url = U(e10), this.analyze();
        }
        get origin() {
          return this[H].url.origin;
        }
        get pathname() {
          return this[H].url.pathname;
        }
        set pathname(e10) {
          this[H].url.pathname = e10;
        }
        get hash() {
          return this[H].url.hash;
        }
        set hash(e10) {
          this[H].url.hash = e10;
        }
        get search() {
          return this[H].url.search;
        }
        set search(e10) {
          this[H].url.search = e10;
        }
        get password() {
          return this[H].url.password;
        }
        set password(e10) {
          this[H].url.password = e10;
        }
        get username() {
          return this[H].url.username;
        }
        set username(e10) {
          this[H].url.username = e10;
        }
        get basePath() {
          return this[H].basePath;
        }
        set basePath(e10) {
          this[H].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new q(String(this), this[H].options);
        }
      }
      var F, B, W, V, G, X, z, K, J, Q, Y, Z, ee, et, er, en, ea = e.i(28042);
      let ei = Symbol("internal request");
      class eo extends Request {
        constructor(e10, t10 = {}) {
          const r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          C(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          const n2 = new q(r10, { headers: S(this.headers), nextConfig: t10.nextConfig });
          this[ei] = { cookies: new ea.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ei].cookies;
        }
        get nextUrl() {
          return this[ei].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new b();
        }
        get url() {
          return this[ei].url;
        }
      }
      class es {
        static get(e10, t10, r10) {
          let n2 = Reflect.get(e10, t10, r10);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t10, r10, n2) {
          return Reflect.set(e10, t10, r10, n2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let el = Symbol("internal response"), ec = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ed(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r11 = [];
          for (let [n2, a2] of e10.request.headers) t10.set("x-middleware-request-" + n2, a2), r11.push(n2);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class eu extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r10 = this.headers, n2 = new Proxy(new ea.ResponseCookies(r10), { get(e11, n3, a2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...a3) => {
                  let i2 = Reflect.apply(e11[n3], e11, a3), o2 = new Headers(r10);
                  return i2 instanceof ea.ResponseCookies && r10.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, ea.stringifyCookie)(e12)).join(",")), ed(t10, o2), i2;
                };
              default:
                return es.get(e11, n3, a2);
            }
          } });
          this[el] = { cookies: n2, url: t10.url ? new q(t10.url, { headers: S(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[el].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new eu(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!ec.has(r10)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let n2 = "object" == typeof t10 ? t10 : {}, a2 = new Headers(null == n2 ? void 0 : n2.headers);
          return a2.set("Location", C(e10)), new eu(null, { ...n2, headers: a2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", C(e10)), ed(t10, r10), new eu(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ed(e10, t10), new eu(null, { ...e10, headers: t10 });
        }
      }
      function ef(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n2 = new URL(e10, t10), a2 = n2.origin === r10.origin;
        return { url: a2 ? n2.toString().slice(r10.origin.length) : n2.toString(), isRelative: a2 };
      }
      let eh = "next-router-prefetch", ep = ["rsc", "next-router-state-tree", eh, "next-hmr-refresh", "next-router-segment-prefetch"], eb = "_rsc";
      function eg(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function ex(e10) {
        return eg(e10.split("/").reduce((e11, t10, r10, n2) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n2.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class em extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers"), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1176", enumerable: false, configurable: true });
        }
        static callable() {
          throw new em();
        }
      }
      class ev extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n2) {
            if ("symbol" == typeof r10) return es.get(t10, r10, n2);
            let a2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            if (void 0 !== i2) return es.get(t10, i2, n2);
          }, set(t10, r10, n2, a2) {
            if ("symbol" == typeof r10) return es.set(t10, r10, n2, a2);
            let i2 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return es.set(t10, o2 ?? r10, n2, a2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return es.has(t10, r10);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== a2 && es.has(t10, a2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return es.deleteProperty(t10, r10);
            let n2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === a2 || es.deleteProperty(t10, a2);
          } });
        }
        static seal(e10, t10) {
          let r10, n2 = t10 && t10.size > 0 ? (e11) => t10.has(e11.toLowerCase()) : null, a2 = new Proxy(e10, { get(e11, t11, n3) {
            switch (t11) {
              case "append":
              case "delete":
              case "set":
                return em.callable;
              case Symbol.iterator:
                return r10[Symbol.iterator];
              case "get":
              case "has":
              case "getSetCookie":
              case "keys":
              case "values":
              case "entries":
              case "forEach":
                return r10[t11];
              default:
                return es.get(e11, t11, n3);
            }
          } });
          return r10 = n2 ? /* @__PURE__ */ function(e11, t11, r11) {
            function* n3() {
              for (let t12 of e11.entries()) r11(t12[0]) || (yield t12);
            }
            return { entries: n3, [Symbol.iterator]: n3, get: (t12) => r11(t12) ? null : e11.get(t12), has: (t12) => !r11(t12) && e11.has(t12), getSetCookie: () => r11("set-cookie") ? [] : e11.getSetCookie(), *keys() {
              for (let t12 of e11.keys()) r11(t12) || (yield t12);
            }, *values() {
              for (let [, e12] of n3()) yield e12;
            }, forEach(e12, r12) {
              for (let [a3, i2] of n3()) e12.call(r12, i2, a3, t11);
            } };
          }(e10, a2, n2) : { get: e10.get.bind(e10), has: e10.has.bind(e10), getSetCookie: e10.getSetCookie.bind(e10), keys: e10.keys.bind(e10), values: e10.values.bind(e10), entries: e10.entries.bind(e10), [Symbol.iterator]: e10[Symbol.iterator].bind(e10), forEach(t11, r11) {
            for (let [n3, i2] of e10.entries()) t11.call(r11, i2, n3, a2);
          } }, a2;
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => es.get(e11, t10, r10) });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ev(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n2] of this.entries()) e10.call(t10, n2, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let ey = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class ew {
        disable() {
          throw ey;
        }
        getStore() {
        }
        run() {
          throw ey;
        }
        exit() {
          throw ey;
        }
        enterWith() {
          throw ey;
        }
        static bind(e10) {
          return e10;
        }
      }
      let e_ = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eE() {
        return e_ ? new e_() : new ew();
      }
      let eS = eE();
      class eC extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options"), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1180", enumerable: false, configurable: true });
        }
        static callable() {
          throw new eC();
        }
      }
      class eR {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eC.callable;
              default:
                return es.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => es.get(e11, t10, r10) });
        }
      }
      let eT = Symbol.for("next.mutated.cookies");
      class eO {
        static wrap(e10, t10) {
          let r10 = new ea.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n2 = [], a2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = eS.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n2 = r10.getAll().filter((e12) => a2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n2) {
                let r11 = new ea.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case eT:
                return n2;
              case "delete":
                return function(...t12) {
                  a2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t12) {
                  a2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    i2();
                  }
                };
              default:
                return es.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function eP(e10, t10) {
        if ("action" !== e10.phase) throw new eC();
      }
      var eA = ((F = eA || {}).handleRequest = "BaseServer.handleRequest", F.run = "BaseServer.run", F.pipe = "BaseServer.pipe", F.getStaticHTML = "BaseServer.getStaticHTML", F.render = "BaseServer.render", F.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", F.renderToResponse = "BaseServer.renderToResponse", F.renderToHTML = "BaseServer.renderToHTML", F.renderError = "BaseServer.renderError", F.renderErrorToResponse = "BaseServer.renderErrorToResponse", F.renderErrorToHTML = "BaseServer.renderErrorToHTML", F.render404 = "BaseServer.render404", F), ek = ((B = ek || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", B.loadComponents = "LoadComponents.loadComponents", B), eN = ((W = eN || {}).getRequestHandler = "NextServer.getRequestHandler", W.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", W.getServer = "NextServer.getServer", W.getServerRequestHandler = "NextServer.getServerRequestHandler", W.createServer = "createServer.createServer", W), eI = ((V = eI || {}).compression = "NextNodeServer.compression", V.getBuildId = "NextNodeServer.getBuildId", V.createComponentTree = "NextNodeServer.createComponentTree", V.clientComponentLoading = "NextNodeServer.clientComponentLoading", V.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", V.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", V.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", V.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", V.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", V.sendRenderResult = "NextNodeServer.sendRenderResult", V.proxyRequest = "NextNodeServer.proxyRequest", V.runApi = "NextNodeServer.runApi", V.render = "NextNodeServer.render", V.renderHTML = "NextNodeServer.renderHTML", V.imageOptimizer = "NextNodeServer.imageOptimizer", V.getPagePath = "NextNodeServer.getPagePath", V.getRoutesManifest = "NextNodeServer.getRoutesManifest", V.findPageComponents = "NextNodeServer.findPageComponents", V.getFontManifest = "NextNodeServer.getFontManifest", V.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", V.getRequestHandler = "NextNodeServer.getRequestHandler", V.renderToHTML = "NextNodeServer.renderToHTML", V.renderError = "NextNodeServer.renderError", V.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", V.render404 = "NextNodeServer.render404", V.startResponse = "NextNodeServer.startResponse", V.route = "route", V.onProxyReq = "onProxyReq", V.apiResolver = "apiResolver", V.internalFetch = "internalFetch", V), eM = ((G = eM || {}).startServer = "startServer.startServer", G), ej = ((X = ej || {}).getServerSideProps = "Render.getServerSideProps", X.getStaticProps = "Render.getStaticProps", X.renderToString = "Render.renderToString", X.renderDocument = "Render.renderDocument", X.createBodyResult = "Render.createBodyResult", X), eD = ((z = eD || {}).renderToString = "AppRender.renderToString", z.renderToReadableStream = "AppRender.renderToReadableStream", z.getBodyResult = "AppRender.getBodyResult", z.fetch = "AppRender.fetch", z.waitShellReady = "AppRender.waitShellReady", z.renderToNodeFizzStream = "AppRender.renderToNodeFizzStream", z.instantInsights = "AppRender.instantInsights", z.instantInsightsPrepareValidation = "AppRender.instantInsights.prepareValidation", z.instantInsightsRunValidation = "AppRender.instantInsights.runValidation", z), eL = ((K = eL || {}).executeRoute = "Router.executeRoute", K), e$ = ((J = e$ || {}).runHandler = "Node.runHandler", J), eU = ((Q = eU || {}).runHandler = "AppRouteRouteHandlers.runHandler", Q), eH = ((Y = eH || {}).generateMetadata = "ResolveMetadata.generateMetadata", Y.generateViewport = "ResolveMetadata.generateViewport", Y), eq = ((Z = eq || {}).execute = "Middleware.execute", Z);
      let eF = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eB = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eW(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eV = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      function eG() {
      }
      Symbol.for("@next/local-span-recorder");
      let { context: eX, propagation: ez, trace: eK, SpanStatusCode: eJ, SpanKind: eQ, ROOT_CONTEXT: eY } = t = e.r(59110);
      class eZ extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let e0 = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eZ && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: eJ.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, e1 = /* @__PURE__ */ new Map(), e2 = t.createContextKey("next.rootSpanId"), e5 = 0, e6 = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, e4 = (i = new class e {
        getTracerInstance() {
          return eK.getTracer("next.js", "0.0.1");
        }
        isOpenTelemetryEnabled() {
          var e10, t10;
          let r10 = eK.getSpan(eX.active());
          if (null == r10 ? void 0 : r10.isRecording()) return true;
          let n2 = eK.getTracerProvider();
          return !("getDelegate" in n2) || (null == n2.getDelegate || null == (t10 = n2.getDelegate.call(n2)) || null == (e10 = t10.constructor) ? void 0 : e10.name) !== "NoopTracerProvider";
        }
        getContext() {
          return eX;
        }
        getTracePropagationData() {
          let e10 = eX.active(), t10 = [];
          return ez.inject(e10, t10, e6), t10;
        }
        getActiveScopeSpan() {
          let e10 = eG(), t10 = null == e10 ? void 0 : e10.getActiveLocalSpan();
          return t10 && (null == e10 ? void 0 : e10.isOpenTelemetryIsolatedSpan(t10)) ? t10 : eK.getSpan(eX.active());
        }
        runWithDetachedContext(e10) {
          return eV || this.isOpenTelemetryEnabled() ? eX.with(eY, e10) : e10();
        }
        withPropagatedContext(e10, t10, r10, n2 = false) {
          let a2 = eX.active();
          if (!eV && !this.isOpenTelemetryEnabled() && !eK.getSpanContext(a2)) return t10();
          if (n2) {
            let n3 = ez.extract(eY, e10, r10);
            if (eK.getSpanContext(n3)) return eX.with(n3, t10);
            let i3 = ez.extract(a2, e10, r10);
            return eX.with(i3, t10);
          }
          if (eK.getSpanContext(a2)) return t10();
          let i2 = ez.extract(a2, e10, r10);
          return eX.with(i2, t10);
        }
        trace(...e10) {
          let [t10, r10, n2] = e10, a2 = !!eV || this.isOpenTelemetryEnabled(), i2 = eG(), o2 = (null == i2 ? void 0 : i2.isLocalSpanRecordingEnabled()) ?? false;
          if (!a2 && !o2) return "function" == typeof r10 ? r10() : n2();
          let { fn: s2, options: l2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n2, options: { ...r10 } }, c2 = l2.spanName ?? t10, d2 = l2.parentSpan ?? this.getActiveScopeSpan(), u2 = d2 && (null == i2 ? void 0 : i2.isOpenTelemetryIsolatedSpan(d2)) ? d2 : void 0, f2 = !u2 && (eF.has(t10) || "1" === process.env.NEXT_OTEL_VERBOSE);
          if (!(f2 || (null == i2 ? void 0 : i2.isRequestInsightsEnabled())) || l2.hideSpan) return s2();
          let h2 = u2 ? eX.active() : this.getSpanContext(d2);
          h2 || (h2 = (null == eX ? void 0 : eX.active()) ?? eY);
          let p2 = h2.getValue(e2), b2 = "number" != typeof p2 || !e1.has(p2), g2 = e5++;
          return l2.attributes = { "next.span_category": "nextjs", "next.span_name": c2, "next.span_type": t10, ...l2.attributes }, eX.with(h2.setValue(e2, g2), () => this.runWithActiveSpan(c2, l2, h2, a2 && f2, o2, u2, (e11) => {
            let r11;
            eV && t10 && eB.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n3 = false, a3 = () => {
              !n3 && (n3 = true, e1.delete(g2), r11 && performance.measure(`${eV}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (b2 && e1.set(g2, new Map(Object.entries(l2.attributes ?? {}))), s2.length > 1) try {
              return s2(e11, (t11) => {
                t11 ? e0(e11, t11) : e11.end();
              });
            } catch (t11) {
              throw e0(e11, t11), t11;
            } finally {
              a3();
            }
            try {
              let t11 = s2(e11);
              if (eW(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw e0(e11, t12), t12;
              }).finally(a3);
              return e11.end(), a3(), t11;
            } catch (t11) {
              throw e0(e11, t11), a3(), t11;
            }
          }));
        }
        runWithActiveSpan(e10, t10, r10, n2, a2, i2, o2) {
          if (n2) return this.getTracerInstance().startActiveSpan(e10, t10, (n3) => o2(a2 ? this.createLocalRecordingSpan(e10, t10, r10, n3, i2) : n3));
          let s2 = this.createLocalRecordingSpan(e10, t10, r10, void 0, i2), l2 = eG();
          return l2.withLocalSpan(s2, () => l2.isOpenTelemetryIsolatedSpan(s2) ? o2(s2) : eX.with(eK.setSpan(eX.active(), s2), o2, void 0, s2));
        }
        createLocalRecordingSpan(e10, t10, r10, n2, a2) {
          let i2 = (null == a2 ? void 0 : a2.spanContext()) ?? eK.getSpanContext(r10), o2 = null == n2 ? void 0 : n2.spanContext();
          return eG().createLocalSpan({ name: e10, attributes: t10.attributes, links: t10.links, startTime: t10.startTime, delegateSpan: n2, traceId: (null == o2 ? void 0 : o2.traceId) ?? (null == i2 ? void 0 : i2.traceId), spanId: null == o2 ? void 0 : o2.spanId, parentSpanId: null == i2 ? void 0 : i2.spanId, isolateOpenTelemetry: void 0 !== a2 });
        }
        wrap(...e10) {
          let t10 = this, [r10, n2, a2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return eF.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof a2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, o2 = arguments[i2];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => a2.apply(this, arguments));
            {
              let n3 = t10.getContext().bind(eX.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[i2] = function(e13) {
                return null == t11 || t11(e13), n3.apply(this, arguments);
              }, a2.apply(this, arguments)));
            }
          } : a2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n2 = r10 ? { ...r10, attributes: { "next.span_category": "nextjs", ...r10.attributes } } : { attributes: { "next.span_category": "nextjs" } }, a2 = eG(), i2 = n2.parentSpan ?? this.getActiveScopeSpan(), o2 = i2 && (null == a2 ? void 0 : a2.isOpenTelemetryIsolatedSpan(i2)) ? i2 : void 0, s2 = (o2 ? void 0 : this.getSpanContext(i2)) ?? eX.active();
          if (!(null == a2 ? void 0 : a2.isLocalSpanRecordingEnabled())) return this.getTracerInstance().startSpan(t10, n2, s2);
          let l2 = !o2 && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(t10, n2, s2) : void 0;
          return this.createLocalRecordingSpan(t10, n2, s2, l2, o2);
        }
        getSpanContext(e10) {
          return e10 ? eK.setSpan(eX.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = eX.active().getValue(e2);
          return e1.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = eX.active().getValue(e2), n2 = e1.get(r10);
          n2 && !n2.has(e10) && n2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = eG();
          return (null == r10 ? void 0 : r10.isLocalRecordingSpan(e10)) ? r10.withLocalSpan(e10, () => r10.isOpenTelemetryIsolatedSpan(e10) ? t10() : eX.with(eK.setSpan(eX.active(), e10), t10)) : eX.with(eK.setSpan(eX.active(), e10), t10);
        }
      }(), () => i), e3 = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(e3);
      class e8 {
        constructor(e10, t10, r10, n2) {
          var a2;
          const i2 = e10 && function(e11, t11) {
            if ("function" == typeof e11.get) {
              let r11 = ev.from(e11);
              return { isOnDemandRevalidate: r11.get(g) === t11.previewModeId, revalidateOnlyGenerated: r11.has(x) };
            }
            return { isOnDemandRevalidate: e11[g] === t11.previewModeId, revalidateOnlyGenerated: e11.hasOwnProperty(x) };
          }(t10, e10).isOnDemandRevalidate, o2 = null == (a2 = r10.get(e3)) ? void 0 : a2.value;
          this._isEnabled = !!(!i2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: e3, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: e3, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      let e9 = new Set([...ep, "x-nextjs-request-id", "x-nextjs-html-request-id"].map((e10) => e10.toLowerCase()));
      function e7(e10, t10) {
        if ("x-middleware-set-cookie" in e10 && "string" == typeof e10["x-middleware-set-cookie"]) {
          let r10 = e10["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of E(r10)) n2.append("set-cookie", e11);
          for (let e11 of new ea.ResponseCookies(n2).getAll()) t10.set(e11);
        }
      }
      let te = eE();
      function tt(e10) {
        switch (e10.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
          case "prerender-ppr":
            return e10.resumeDataCache;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return e10;
        }
      }
      var tr = e.i(99734);
      class tn extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E1179", enumerable: false, configurable: true }), this.name = "InvariantError";
        }
      }
      var ta = e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let ti = Symbol.for("@next/cache-handlers-map"), to = Symbol.for("@next/cache-handlers-set");
      Symbol.for("@next/cache-handlers-private"), Symbol.for("@next/cache-handlers-built-in"), Symbol.for("@next/cache-handlers-dev-fronts"), Symbol.for("@next/cache-handlers-dev-tiered"), Symbol.for("@next/cache-handlers-memory-disabled");
      let ts = globalThis;
      function tl() {
        let e10 = ts[ti];
        if (e10) return e10.entries();
      }
      async function tc(e10, t10) {
        if (!e10) return t10();
        let r10 = td(e10);
        try {
          return await t10();
        } finally {
          var n2, a2, i2, o2;
          let t11, s2, l2, c2, d2 = (n2 = r10, a2 = td(e10), t11 = new Set(n2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), s2 = new Set(n2.pendingRevalidateWrites), { pendingRevalidatedTags: a2.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r11}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(a2.pendingRevalidates).filter(([e11]) => !(e11 in n2.pendingRevalidates))), pendingRevalidateWrites: a2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (i2 = e10, l2 = [], (c2 = (null == (o2 = d2) ? void 0 : o2.pendingRevalidatedTags) ?? i2.pendingRevalidatedTags ?? []).length > 0 && l2.push(tu(c2, i2.incrementalCache, i2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? i2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? i2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function td(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tu(e10, t10, r10) {
        if (0 === e10.length) return;
        let n2 = function() {
          let e11 = ts[to];
          if (e11) return e11.values();
        }(), a2 = [], i2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of i2) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n3 = e11 || r11;
          i2.has(n3) || i2.set(n3, []), i2.get(n3).push(t11.tag);
        }
        for (let [e11, o2] of i2) {
          let i3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11 && !(t11 = null == r10 ? void 0 : r10.cacheLifeProfiles[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            t11 && (i3 = { expire: t11.expire });
          }
          for (let t11 of n2 || []) e11 ? a2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2, i3)) : a2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2));
          t10 && a2.push(t10.revalidateTag(o2, i3));
        }
        await Promise.all(a2);
      }
      let tf = eE();
      class th {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.isRequestClosed = false, this.initialOnCloseError = null, this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new tr.default(), this.callbackQueue.pause();
          try {
            t10(() => {
              for (let e11 of (this.isRequestClosed = true, this.workUnitStores)) e11.phase = "after";
            });
          } catch (e11) {
            this.initialOnCloseError = { error: e11 };
          }
        }
        after(e10, t10) {
          if (this.initialOnCloseError) throw Object.defineProperty(new tn("An onClose call failed, which means after() can't work correctly.", { cause: this.initialOnCloseError.error }), "__NEXT_ERROR_CODE", { value: "E1376", enumerable: false, configurable: true });
          if (this.workUnitStores.add(t10), eW(e10)) this.addThenable(e10);
          else if ("function" == typeof e10) this.addCallback(e10, t10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addThenable(e10) {
          this.waitUntil || tp(), this.waitUntil(new Promise((t10) => {
            e10.then(() => {
              t10();
            }, (e11) => {
              t10(), this.reportTaskError("promise", e11);
            });
          }));
        }
        addCallback(e10, t10) {
          var r10;
          this.waitUntil || tp();
          let n2 = tf.getStore(), a2 = n2 ? n2.rootTaskSpawnPhase : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (r10 = async () => {
            try {
              await tf.run({ rootTaskSpawnPhase: a2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, e_ ? e_.bind(r10) : ew.bind(r10));
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return this.isRequestClosed ? await new Promise((e10) => {
            setTimeout(e10, 0);
          }) : await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          let e10 = eS.getStore();
          if (!e10) throw Object.defineProperty(new tn("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return tc(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new tn("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function tp() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function tb(e10) {
        let t10, r10 = { then: (n2, a2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n2, a2)) };
        return r10;
      }
      class tg {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function tx() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tm = Symbol.for("@next/request-context"), tv = /[^\t\x20-\x7e]/, ty = /[^\t\x20-\x7e]+/g;
      function tw(e10) {
        return tv.test(e10) ? e10.replace(ty, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function t_(e10, t10, r10) {
        let n2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.indexOf("/", 1);
            for (; ; ) {
              -1 === r11 && (r11 = e11.length);
              let n3 = e11.slice(0, r11);
              if (n3 && (n3.endsWith("/page") || n3.endsWith("/route") || (n3 = `${n3}${!n3.endsWith("/") ? "/" : ""}layout`), t12.push(n3)), r11 === e11.length) break;
              r11 = e11.indexOf("/", r11 + 1);
            }
          }
          return t12;
        })(e10)) t11 = tw(`${w}${t11}`), n2.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = tw(`${w}${t10}`);
          n2.add(e11);
        }
        n2.has(`${w}/`) && n2.add(`${w}/index`), n2.has(`${w}/index`) && n2.add(`${w}/`);
        let a2 = Array.from(n2);
        return { tags: a2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tl();
          if (r11) for (let [n3, a3] of r11) "getExpiration" in a3 && t11.set(n3, tb(async () => a3.getExpiration(e11)));
          return t11;
        }(a2) };
      }
      let tE = Symbol.for("NextInternalRequestMeta"), tS = { get default() {
        throw Object.defineProperty(new tn("Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected."), "__NEXT_ERROR_CODE", { value: "E1406", enumerable: false, configurable: true });
      } };
      class tC extends eo {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new h({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tR = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tT = (e10, t10) => e4().withPropagatedContext(e10.headers, t10, tR), tO = false;
      async function tP(t10) {
        var r10, n2, a2, i2, o2;
        let s2, l2, c2, d2, f2;
        !function() {
          if (!tO && (tO = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(94165);
            t11(), tT = r11(tT);
          }
        }(), await u();
        let h2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new q(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r11 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r11) {
            for (let e11 of (p2.searchParams.delete(r11), t11)) p2.searchParams.append(r11, e11);
            p2.searchParams.delete(e10);
          }
        }
        let b2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (b2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r11, n3] of Object.entries(e10)) for (let e11 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        }(t10.request.headers), x2 = g2.has("x-nextjs-data"), m2 = "1" === g2.get("rsc");
        x2 && "/index" === p2.pathname && (p2.pathname = "/");
        let v2 = /* @__PURE__ */ new Map();
        if (!h2) for (let e10 of ep) {
          let t11 = g2.get(e10);
          null !== t11 && (v2.set(e10, t11), g2.delete(e10));
        }
        let y2 = p2.searchParams.get(eb), w2 = new tC({ page: t10.page, input: ((d2 = (c2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(eb), c2 ? d2.toString() : d2).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, w2[tE] = o2), x2 && Object.defineProperty(w2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tx() }) }));
        let _2 = t10.request.waitUntil ?? (null == (r10 = null == (f2 = globalThis[tm]) ? void 0 : f2.get()) ? void 0 : r10.waitUntil), E2 = new A({ request: w2, page: t10.page, context: _2 ? { waitUntil: _2 } : void 0 });
        if ((s2 = await tT(w2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = E2.waitUntil.bind(E2), r11 = new tg();
            return e4().trace(eq.execute, { spanName: `middleware ${w2.method}`, attributes: { "http.target": w2.nextUrl.pathname, "http.method": w2.method } }, async () => {
              try {
                var n3, a3, i3, o3, s3;
                let c3 = tx(), d3 = await t_("/", w2.nextUrl.pathname, null), u2 = (i3 = w2.nextUrl, o3 = (e11) => {
                  l2 = e11;
                }, s3 = void 0, function(e11) {
                  let { phase: t11, headers: r12, onUpdateCookies: n4, url: a4, rootParams: i4, implicitTags: o4, resumeDataCache: s4, previewProps: l3, isHmrRefresh: c4, serverComponentsHmrCache: d4, hmrRefreshHash: u3, fallbackParams: f4 } = e11, h3 = {};
                  return { type: "request", phase: t11, implicitTags: o4, url: { pathname: a4.pathname, search: a4.search ?? "" }, rootParams: i4, get headers() {
                    return h3.headers || (h3.headers = ev.seal(ev.from(r12), e9)), h3.headers;
                  }, get cookies() {
                    if (!h3.cookies) {
                      let e12 = new ea.RequestCookies(ev.from(r12));
                      e7(r12, e12), h3.cookies = eR.seal(e12);
                    }
                    return h3.cookies;
                  }, set cookies(value) {
                    h3.cookies = value;
                  }, get mutableCookies() {
                    if (!h3.mutableCookies) {
                      let e12, t12 = (e12 = new ea.RequestCookies(ev.from(r12)), eO.wrap(e12, n4));
                      e7(r12, t12), h3.mutableCookies = t12;
                    }
                    return h3.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!h3.userspaceMutableCookies) {
                      var p3;
                      let e12;
                      p3 = this, h3.userspaceMutableCookies = e12 = new Proxy(p3.mutableCookies, { get(t12, r13, n5) {
                        switch (r13) {
                          case "delete":
                            return function(...r14) {
                              return eP(p3, "cookies().delete"), t12.delete(...r14), e12;
                            };
                          case "set":
                            return function(...r14) {
                              return eP(p3, "cookies().set"), t12.set(...r14), e12;
                            };
                          default:
                            return es.get(t12, r13, n5);
                        }
                      } });
                    }
                    return h3.userspaceMutableCookies;
                  }, get draftMode() {
                    return h3.draftMode || (h3.draftMode = new e8(l3, r12, this.cookies, this.mutableCookies)), h3.draftMode;
                  }, resumeDataCache: s4 ?? null, isHmrRefresh: c4, serverComponentsHmrCache: d4 || globalThis.__serverComponentsHmrCache, hmrRefreshHash: u3, fallbackParams: f4 };
                }({ phase: "action", headers: w2.headers, onUpdateCookies: o3, url: i3, rootParams: {}, implicitTags: d3, resumeDataCache: null, previewProps: c3, isHmrRefresh: false, serverComponentsHmrCache: void 0, hmrRefreshHash: s3, fallbackParams: null })), f3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n4, deploymentId: a4, previouslyRevalidatedTags: i4, nonce: o4 }) {
                  let s4 = !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = s4 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: s4, page: e11, route: ex(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, useCacheTimeout: t11.experimental.useCacheTimeout, staticPageGenerationTimeout: t11.staticPageGenerationTimeout, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, requestId: void 0, htmlRequestId: void 0, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n4, deploymentId: a4, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r13, onAfterTaskError: n5 } = e12;
                    return new th({ waitUntil: t12, onClose: r13, onTaskError: n5 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, validationLevel: t11.validationLevel, previouslyRevalidatedTags: i4, requestStartTime: performance.timeOrigin + performance.now(), refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = tl();
                    if (t12) for (let [r13, n5] of t12) "refreshTags" in n5 && e12.set(r13, tb(async () => n5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: e_ ? e_.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: l3, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: tS, staticPageGenerationTimeout: 0, cacheComponents: false, validationLevel: "warning", experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a3 = t10.request.nextConfig) || null == (n3 = a3.experimental) ? void 0 : n3.authInterrupts), useCacheTimeout: 0 }, supportsDynamicResponse: true, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === w2.headers.get(eh), buildId: b2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] });
                return await eS.run(f3, () => te.run(u2, t10.handler, w2, E2));
              } finally {
                setTimeout(() => {
                  r11.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(w2, E2);
        })) && !(s2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        s2 && l2 && s2.headers.set("set-cookie", l2);
        let S2 = null == s2 ? void 0 : s2.headers.get("x-middleware-rewrite");
        if (s2 && S2 && (m2 || !h2)) {
          let e10 = new q(S2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          h2 || e10.host !== w2.nextUrl.host || (e10.buildId = b2 || e10.buildId, s2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o3 } = ef(e10.toString(), p2.toString());
          !h2 && x2 && s2.headers.set("x-nextjs-rewrite", r11);
          let l3 = !o3 && (null == (i2 = t10.request.nextConfig) || null == (a2 = i2.experimental) || null == (n2 = a2.clientParamParsingOrigins) ? void 0 : n2.some((t11) => new RegExp(t11).test(e10.origin)));
          m2 && (o3 || l3) && (p2.pathname !== e10.pathname && s2.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && s2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (s2 && S2 && m2 && y2) {
          let e10 = new URL(S2);
          e10.searchParams.has(eb) || (e10.searchParams.set(eb, y2), s2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let C2 = null == s2 ? void 0 : s2.headers.get("Location");
        if (s2 && C2 && !h2) {
          let e10 = new q(C2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          s2 = new Response(s2.body, s2), e10.host === p2.host && (e10.buildId = b2 || e10.buildId, s2.headers.set("Location", ef(e10, p2).url)), x2 && (s2.headers.delete("Location"), s2.headers.set("x-nextjs-redirect", ef(e10.toString(), p2.toString()).url));
        }
        let R2 = s2 || eu.next(), T2 = R2.headers.get("x-middleware-override-headers"), P2 = [];
        if (T2) {
          for (let [e10, t11] of v2) R2.headers.set(`x-middleware-request-${e10}`, t11), P2.push(e10);
          P2.length > 0 && R2.headers.set("x-middleware-override-headers", T2 + "," + P2.join(","));
        }
        return { response: R2, waitUntil: ("internal" === E2[O].kind ? Promise.all(E2[O].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: w2.fetchMetrics };
      }
      class tA {
        constructor() {
          let e10, t10;
          this.promise = new Promise((r10, n2) => {
            e10 = r10, t10 = n2;
          }), this.resolve = e10, this.reject = t10;
        }
      }
      class tk {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class tN {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class tI {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new tN(), this.tail = new tN(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10, e10)) ?? 1;
          if (r10 <= 0) throw Object.defineProperty(Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", { value: "E1045", enumerable: false, configurable: true });
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n2 = this.cache.get(e10);
          if (n2) n2.data = t10, this.totalSize = this.totalSize - n2.size + r10, n2.size = r10, this.moveToHead(n2);
          else {
            let n3 = new tk(e10, t10, r10);
            this.cache.set(e10, n3), this.addToHead(n3), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: tM, stdout: tj } = (null == (en = globalThis) ? void 0 : en.process) ?? {}, tD = tM && !tM.NO_COLOR && (tM.FORCE_COLOR || (null == tj ? void 0 : tj.isTTY) && !tM.CI && "dumb" !== tM.TERM), tL = (e10, t10, r10, n2) => {
        let a2 = e10.substring(0, n2) + r10, i2 = e10.substring(n2 + t10.length), o2 = i2.indexOf(t10);
        return ~o2 ? a2 + tL(i2, t10, r10, o2) : a2 + i2;
      }, t$ = (e10, t10, r10 = e10) => tD ? (n2) => {
        let a2 = "" + n2, i2 = a2.indexOf(t10, e10.length);
        return ~i2 ? e10 + tL(a2, t10, r10, i2) + t10 : e10 + a2 + t10;
      } : String, tU = t$("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      t$("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), t$("\x1B[3m", "\x1B[23m"), t$("\x1B[4m", "\x1B[24m"), t$("\x1B[7m", "\x1B[27m"), t$("\x1B[8m", "\x1B[28m"), t$("\x1B[9m", "\x1B[29m"), t$("\x1B[30m", "\x1B[39m");
      let tH = t$("\x1B[31m", "\x1B[39m"), tq = t$("\x1B[32m", "\x1B[39m"), tF = t$("\x1B[33m", "\x1B[39m");
      t$("\x1B[34m", "\x1B[39m");
      let tB = t$("\x1B[35m", "\x1B[39m");
      t$("\x1B[38;2;173;127;168m", "\x1B[39m"), t$("\x1B[36m", "\x1B[39m");
      let tW = t$("\x1B[37m", "\x1B[39m");
      t$("\x1B[90m", "\x1B[39m"), t$("\x1B[40m", "\x1B[49m"), t$("\x1B[41m", "\x1B[49m"), t$("\x1B[42m", "\x1B[49m"), t$("\x1B[43m", "\x1B[49m"), t$("\x1B[44m", "\x1B[49m"), t$("\x1B[45m", "\x1B[49m"), t$("\x1B[46m", "\x1B[49m"), t$("\x1B[47m", "\x1B[49m"), tW(tU("\u25CB")), tH(tU("\u2A2F")), tF(tU("\u26A0")), tW(tU(" ")), tq(tU("\u2713")), tB(tU("\xBB")), new tI(1e4, (e10) => e10.length), new tI(1e4, (e10) => e10.length);
      var tV = ((ee = {}).APP_PAGE = "APP_PAGE", ee.APP_ROUTE = "APP_ROUTE", ee.PAGES = "PAGES", ee.FETCH = "FETCH", ee.REDIRECT = "REDIRECT", ee.IMAGE = "IMAGE", ee), tG = ((et = {}).APP_PAGE = "APP_PAGE", et.APP_ROUTE = "APP_ROUTE", et.PAGES = "PAGES", et.FETCH = "FETCH", et.IMAGE = "IMAGE", et);
      function tX() {
      }
      new TextEncoder();
      let tz = new TextEncoder();
      function tK(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tz.encode(e10)), t10.close();
        } });
      }
      function tJ(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tQ(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n2 = "";
        for await (let a2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n2;
          n2 += r10.decode(a2, { stream: true });
        }
        return n2 + r10.decode();
      }
      let tY = "ResponseAborted";
      class tZ extends Error {
        constructor(...e10) {
          super(...e10), this.name = tY;
        }
      }
      let t0 = 0, t1 = 0, t2 = 0;
      function t5(e10 = {}) {
        let t10 = 0 === t0 ? void 0 : { clientComponentLoadStart: t0, clientComponentLoadTimes: t1, clientComponentLoadCount: t2 };
        return e10.reset && (t0 = 0, t1 = 0, t2 = 0), t10;
      }
      function t6(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === tY;
      }
      let t4 = "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      async function t3(e10, t10, r10) {
        try {
          let n2, { errored: a2, destroyed: i2 } = t10;
          if (a2 || i2) return;
          let o2 = (n2 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || n2.abort(new tZ());
          }), n2), s2 = function(e11, t11) {
            let r11 = false, n3 = new tA();
            function a3() {
              n3.resolve();
            }
            e11.on("drain", a3), e11.once("close", () => {
              e11.off("drain", a3), n3.resolve();
            });
            let i3 = new tA();
            return e11.once("finish", () => {
              i3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!r11) {
                if (r11 = true, t4) {
                  let e12 = t5();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), e4().trace(eI.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await n3.promise, n3 = new tA());
              } catch (t13) {
                throw e11.end(), Object.defineProperty(Error("failed to write chunk to response", { cause: t13 }), "__NEXT_ERROR_CODE", { value: "E321", enumerable: false, configurable: true });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), i3.promise;
            } });
          }(t10, r10);
          await e10.pipeTo(s2, { signal: o2.signal });
        } catch (e11) {
          if (t6(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      async function t8(e10, t10, r10) {
        try {
          let { errored: n2, destroyed: a2 } = t10;
          if (n2 || a2) return;
          let i2 = false, o2 = new tA();
          t10.once("close", () => {
            e10.destroy(), o2.resolve();
          }), e10.on("data", (r11) => {
            if (!i2) {
              if (i2 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                let e11 = t5();
                e11 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e11.clientComponentLoadStart, end: e11.clientComponentLoadStart + e11.clientComponentLoadTimes });
              }
              t10.flushHeaders(), e4().trace(eI.startResponse, { spanName: "start response" }, () => void 0);
            }
            let n3 = t10.write(r11);
            "flush" in t10 && "function" == typeof t10.flush && t10.flush(), n3 || (e10.pause(), t10.once("drain", () => {
              e10.resume();
            }));
          }), e10.on("end", async () => {
            r10 && await r10, t10.writableFinished || t10.end(), o2.resolve();
          }), e10.on("error", (e11) => {
            t6(e11) || t10.destroy(e11), o2.resolve();
          }), await o2.promise;
        } catch (e11) {
          if (t6(e11)) return;
          throw Object.defineProperty(Error("failed to pipe response", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E180", enumerable: false, configurable: true });
        }
      }
      function t9(e10) {
        return null !== e10 && "object" == typeof e10 && "function" == typeof e10.pipe && "function" == typeof e10.on && !(e10 instanceof ReadableStream);
      }
      class t7 {
        static #e = this.EMPTY = new t7(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new t7(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n2 }) {
          this.response = e10, this.contentType = t10, this.metadata = n2, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw Object.defineProperty(new tn("dynamic responses cannot be unchunked. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E732", enumerable: false, configurable: true });
            return tQ(this.readable);
          }
          return this.response;
        }
        get readable() {
          if (null === this.response) return new ReadableStream({ start(e10) {
            e10.close();
          } });
          if ("string" == typeof this.response) return tK(this.response);
          if (ta.Buffer.isBuffer(this.response)) return tJ(this.response);
          if (Array.isArray(this.response)) return function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n2 = e10[0].pipeTo(r10, { preventClose: true }), a2 = 1;
            for (; a2 < e10.length - 1; a2++) {
              let t11 = e10[a2];
              n2 = n2.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let i2 = e10[a2];
            return (n2 = n2.then(() => i2.pipeTo(r10))).catch(tX), t10;
          }(...this.response);
          if (t9(this.response)) throw Object.defineProperty(new tn("Node.js Readable cannot be converted to a web stream in the edge runtime"), "__NEXT_ERROR_CODE", { value: "E1150", enumerable: false, configurable: true });
          return this.response;
        }
        coerce() {
          if (null === this.response) return [];
          if ("string" == typeof this.response) return [tK(this.response)];
          if (Array.isArray(this.response)) return this.response;
          if (ta.Buffer.isBuffer(this.response)) return [tJ(this.response)];
          if (!t9(this.response)) return [this.response];
          throw Object.defineProperty(new tn("Node.js Readable cannot be converted to a web stream in the edge runtime"), "__NEXT_ERROR_CODE", { value: "E1150", enumerable: false, configurable: true });
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (t6(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          null !== this.response && "string" != typeof this.response && !ta.Buffer.isBuffer(this.response) && !Array.isArray(this.response) && t9(this.response) ? await t8(this.response, e10, this.waitUntil) : await t3(this.readable, e10, this.waitUntil);
        }
      }
      function re(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      re(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), re(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var rt = e.i(68886);
      let rr = /* @__PURE__ */ new Map(), rn = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rr.get(r10), n2 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n2 && n2 <= performance.timeOrigin + performance.now() && n2 > t10) return true;
        }
        return false;
      }, ra = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rr.get(r10), n2 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n2 && n2 > t10) return true;
        }
        return false;
      };
      class ri {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(rt.default.dirname(e10)), n2 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n2.catch(() => {
          }), r10[2].push(n2);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function ro(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class rs {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor(e10) {
          this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize ? rs.memoryCache ? rs.debug && console.log("FileSystemCache: memory store already initialized") : (rs.debug && console.log("FileSystemCache: using memory store for fetch cache"), rs.memoryCache = function(e11) {
            return r || (r = new tI(e11, function({ value: e12 }, t10) {
              var r10, n2;
              let a2;
              if (e12) if (e12.kind === tV.REDIRECT) a2 = JSON.stringify(e12.props).length;
              else if (e12.kind === tV.IMAGE) throw Object.defineProperty(Error("invariant image should not be incremental-cache"), "__NEXT_ERROR_CODE", { value: "E501", enumerable: false, configurable: true });
              else a2 = e12.kind === tV.FETCH ? JSON.stringify(e12.data || "").length : e12.kind === tV.APP_ROUTE ? e12.body.length : e12.kind === tV.APP_PAGE ? Math.max(1, e12.html.length + ro(e12.rscData) + ((null == (r10 = e12.postponed) ? void 0 : r10.length) || 0) + function(e13) {
                if (!e13) return 0;
                let t11 = 0;
                for (let [r11, n3] of e13) t11 += r11.length + ro(n3);
                return t11;
              }(e12.segmentData)) : e12.html.length + ((null == (n2 = JSON.stringify(e12.pageData)) ? void 0 : n2.length) || 0);
              else a2 = 25;
              return t10.length + a2;
            })), r;
          }(e10.maxMemoryCacheSize)) : rs.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rs.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n2 of e10) {
            let e11 = rr.get(n2) || {};
            if (t10) {
              let a2 = { ...e11 };
              a2.stale = r10, void 0 !== t10.expire && (a2.expired = r10 + 1e3 * t10.expire), rr.set(n2, a2);
            } else rr.set(n2, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n2, a2, i2, o2;
          let [s2, l2] = e10, { kind: c2 } = l2, d2 = null == (t10 = rs.memoryCache) ? void 0 : t10.get(s2);
          if (rs.debug && (c2 === tG.FETCH ? console.log("FileSystemCache: get", s2, l2.tags, c2, !!d2) : console.log("FileSystemCache: get", s2, c2, !!d2)), (null == d2 || null == (r10 = d2.value) ? void 0 : r10.kind) === tV.APP_PAGE || (null == d2 || null == (n2 = d2.value) ? void 0 : n2.kind) === tV.APP_ROUTE || (null == d2 || null == (a2 = d2.value) ? void 0 : a2.kind) === tV.PAGES) {
            let e11 = null == (o2 = d2.value.headers) ? void 0 : o2[v];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && rn(t11, d2.lastModified)) return rs.debug && console.log("FileSystemCache: expired tags", t11), null;
            }
          } else if ((null == d2 || null == (i2 = d2.value) ? void 0 : i2.kind) === tV.FETCH) {
            let e11 = l2.kind === tG.FETCH ? [...l2.tags || [], ...l2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rs.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (rn(e11, d2.lastModified)) return rs.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          return d2 ?? null;
        }
        async set(e10, t10, r10) {
          var n2;
          if (null == (n2 = rs.memoryCache) || n2.set(e10, { value: t10, lastModified: Date.now() }), rs.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          let a2 = new ri(this.fs);
          if (t10.kind === tV.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, tG.APP_ROUTE);
            a2.append(r11, t10.body);
            let n3 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
            a2.append(r11.replace(/\.body$/, m), JSON.stringify(n3, null, 2));
          } else if (t10.kind === tV.PAGES || t10.kind === tV.APP_PAGE) {
            let n3 = t10.kind === tV.APP_PAGE, i2 = this.getFilePath(`${e10}.html`, n3 ? tG.APP_PAGE : tG.PAGES);
            if (a2.append(i2, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || a2.append(this.getFilePath(`${e10}${n3 ? ".rsc" : ".json"}`, n3 ? tG.APP_PAGE : tG.PAGES), n3 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === tV.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = i2.replace(/\.html$/, ".segments");
                for (let [n4, i3] of t10.segmentData) {
                  e11.push(n4);
                  let t11 = r12 + n4 + ".segment.rsc";
                  a2.append(t11, i3);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0 };
              a2.append(i2.replace(/\.html$/, m), JSON.stringify(r11));
            }
          } else if (t10.kind === tV.FETCH) {
            let n3 = this.getFilePath(e10, tG.FETCH);
            a2.append(n3, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await a2.wait();
        }
        getFilePath(e10, t10) {
          let r10;
          switch (t10) {
            case tG.FETCH:
              r10 = rt.default.join(this.serverDistDir, "..", "cache", "fetch-cache");
              break;
            case tG.PAGES:
              r10 = rt.default.join(this.serverDistDir, "pages");
              break;
            case tG.IMAGE:
            case tG.APP_PAGE:
            case tG.APP_ROUTE:
              r10 = rt.default.join(this.serverDistDir, "app");
              break;
            default:
              throw Object.defineProperty(Error(`Unexpected file path kind: ${t10}`), "__NEXT_ERROR_CODE", { value: "E479", enumerable: false, configurable: true });
          }
          let n2 = rt.default.join(r10, e10);
          if (!(n2.startsWith(r10 + rt.default.sep) || n2 === r10)) throw Object.defineProperty(Error(`Invalid file path: ${n2}`), "__NEXT_ERROR_CODE", { value: "E1468", enumerable: false, configurable: true });
          return n2;
        }
      }
      let rl = ["(..)(..)", "(.)", "(..)", "(...)"], rc = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, rd = /\/\[[^/]+\](?=\/|$)/;
      function ru(e10) {
        return e10.replace(/(?:\/index)?\/?$/, "") || "/";
      }
      class rf {
        static #e = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10) {
          this.prerenderManifest = e10;
        }
        get(e10) {
          let t10 = rf.cacheControls.get(e10);
          if (t10) return t10;
          let r10 = this.prerenderManifest.routes[e10];
          if (r10) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = r10;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let n2 = this.prerenderManifest.dynamicRoutes[e10];
          if (n2) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = n2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rf.cacheControls.set(e10, t10);
        }
        clear() {
          rf.cacheControls.clear();
        }
      }
      function rh(e10) {
        let t10 = "buffer" in e10 ? new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength) : new Uint8Array(e10), r10 = "";
        for (let e11 of t10) r10 += e11.toString(16).padStart(2, "0");
        return r10;
      }
      async function rp(e10) {
        {
          let t10 = new TextEncoder().encode(e10);
          return rh(await crypto.subtle.digest("SHA-256", t10));
        }
      }
      e.i(67914);
      class rb {
        static #e = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n2, serverDistDir: a2, requestHeaders: i2, maxMemoryCacheSize: o2, getPrerenderManifest: s2, fetchCacheKeyPrefix: l2, CurCacheHandler: c2, allowedRevalidateHeaderKeys: d2 }) {
          var u2, f2, h2, p2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!c2;
          const b2 = Symbol.for("@next/cache-handlers"), x2 = globalThis;
          if (c2) rb.debug && console.log("IncrementalCache: using custom cache handler", c2.name);
          else {
            const t11 = x2[b2];
            (null == t11 ? void 0 : t11.FetchCache) ? (c2 = t11.FetchCache, rb.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && a2 && (rb.debug && console.log("IncrementalCache: using filesystem cache handler"), c2 = rs);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n2, this.requestHeaders = i2, this.allowedRevalidateHeaderKeys = d2, this.prerenderManifest = s2(), this.cacheControls = new rf(this.prerenderManifest), this.fetchCacheKeyPrefix = l2;
          let m2 = [];
          i2[g] === (null == (f2 = this.prerenderManifest) || null == (u2 = f2.preview) ? void 0 : u2.previewModeId) && (this.isOnDemandRevalidate = true), n2 && (m2 = this.revalidatedTags = function(e11, t11) {
            return "string" == typeof e11[y] && e11["x-next-revalidate-tag-token"] === t11 ? e11[y].split(",") : [];
          }(i2, null == (p2 = this.prerenderManifest) || null == (h2 = p2.preview) ? void 0 : h2.previewModeId)), c2 && (this.cacheHandler = new c2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: a2, revalidatedTags: m2, maxMemoryCacheSize: o2, _requestHeaders: i2, fetchCacheKeyPrefix: l2 }));
        }
        calculateRevalidate(e10, t10, r10, n2) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let a2 = this.cacheControls.get(ru(e10)), i2 = a2 ? a2.revalidate : !n2 && 1;
          return "number" == typeof i2 ? 1e3 * i2 + t10 : i2;
        }
        _getPathname(e10, t10) {
          return t10 ? e10 : /^\/index(\/|$)/.test(e10) && !function(e11, t11 = true) {
            return (void 0 !== e11.split("/").find((e12) => rl.find((t12) => e12.startsWith(t12))) && (e11 = function(e12) {
              let t12, r10, n2;
              for (let a2 of e12.split("/")) if (r10 = rl.find((e13) => a2.startsWith(e13))) {
                [t12, n2] = e12.split(r10, 2);
                break;
              }
              if (!t12 || !r10 || !n2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", { value: "E269", enumerable: false, configurable: true });
              switch (t12 = ex(t12), r10) {
                case "(.)":
                  n2 = "/" === t12 ? `/${n2}` : t12 + "/" + n2;
                  break;
                case "(..)":
                  if ("/" === t12) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", { value: "E207", enumerable: false, configurable: true });
                  n2 = t12.split("/").slice(0, -1).concat(n2).join("/");
                  break;
                case "(...)":
                  n2 = "/" + n2;
                  break;
                case "(..)(..)":
                  let a2 = t12.split("/");
                  if (a2.length <= 2) throw Object.defineProperty(Error(`Invalid interception route: ${e12}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", { value: "E486", enumerable: false, configurable: true });
                  n2 = a2.slice(0, -2).concat(n2).join("/");
                  break;
                default:
                  throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: false, configurable: true });
              }
              return { interceptingRoute: t12, interceptedRoute: n2 };
            }(e11).interceptedRoute), t11) ? rd.test(e11) : rc.test(e11);
          }(e10) ? `/index${e10}` : "/" === e10 ? "/index" : eg(e10);
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (rb.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = new tA();
          return rb.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateSimpleCacheKey(e10) {
          return rp(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10]));
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n2 = new TextEncoder(), a2 = null, i2 = t10.body;
          if (i2) if ("object" == typeof i2 && "byteLength" in i2) r10.push(`bytes:${rh(i2)}`), t10._ogBody = i2;
          else if ("function" == typeof i2.getReader) {
            let e11 = [];
            try {
              await i2.pipeTo(new WritableStream({ write(t11) {
                e11.push("string" == typeof t11 ? n2.encode(t11) : t11);
              } }));
              let a3 = e11.reduce((e12, t11) => e12 + t11.length, 0), o3 = new Uint8Array(a3), s2 = 0;
              for (let t11 of e11) o3.set(t11, s2), s2 += t11.length;
              r10.push(`bytes:${rh(o3)}`), t10._ogBody = o3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof i2.keys) for (let [e11, n3] of (a2 = "[object FormData]" === String(i2) ? "multipart/form-data; boundary=" : "application/x-www-form-urlencoded;charset=UTF-8", t10._ogBody = i2, i2.entries())) r10.push(`key:${e11}`), "string" == typeof n3 ? r10.push(`str:${n3}`) : r10.push("file", n3.name, n3.type, `bytes:${rh(await n3.arrayBuffer())}`);
          else if ("function" == typeof i2.arrayBuffer) {
            let e11 = await i2.arrayBuffer();
            r10.push("blob", i2.type, `bytes:${rh(e11)}`), t10._ogBody = new Blob([e11], { type: i2.type }), a2 = i2.type;
          } else if ("string" == typeof i2) r10.push(`str:${i2}`), t10._ogBody = i2, a2 = "text/plain;charset=UTF-8";
          else throw Object.defineProperty(Error(`Unsupported body type: ${typeof i2}`), "__NEXT_ERROR_CODE", { value: "E1443", enumerable: false, configurable: true });
          let o2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          return "traceparent" in o2 && delete o2.traceparent, "tracestate" in o2 && delete o2.tracestate, rp(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10, t10.method, a2, o2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]));
        }
        async get(e10, t10) {
          var r10, n2, a2, i2, o2, s2, l2;
          let c2, d2;
          if (t10.kind === tG.FETCH) {
            let r11 = te.getStore(), n3 = r11 ? tt(r11) : null;
            if (n3) {
              let r12 = n3.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === tV.FETCH) {
                let n4 = eS.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n4 || null == (r13 = n4.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return rb.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                rb.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else rb.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else rb.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== tG.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          e10 = this._getPathname(e10, t10.kind === tG.FETCH);
          let u2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(e10, t10));
          if (t10.kind === tG.FETCH) {
            if (!u2) return null;
            if ((null == (a2 = u2.value) ? void 0 : a2.kind) !== tV.FETCH) throw Object.defineProperty(new tn(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (i2 = u2.value) ? void 0 : i2.kind)} instead.`), "__NEXT_ERROR_CODE", { value: "E653", enumerable: false, configurable: true });
            let r11 = eS.getStore(), n3 = [...t10.tags || [], ...t10.softTags || []];
            if (n3.some((e11) => {
              var t11, n4;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n4 = r11.pendingRevalidatedTags) ? void 0 : n4.some((t12) => t12.tag === e11));
            })) return rb.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = te.getStore();
            if (o3) {
              let t11 = tt(o3);
              (null == t11 ? void 0 : t11.mutable) && (rb.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, u2.value));
            }
            let s3 = t10.revalidate || u2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (u2.lastModified || 0)) / 1e3 > s3, c3 = u2.value.data;
            return rn(n3, u2.lastModified) ? null : (ra(n3, u2.lastModified) && (l3 = true), { isStale: l3, value: { kind: tV.FETCH, data: c3, revalidate: s3 } });
          }
          if ((null == u2 || null == (n2 = u2.value) ? void 0 : n2.kind) === tV.FETCH) throw Object.defineProperty(new tn(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`), "__NEXT_ERROR_CODE", { value: "E652", enumerable: false, configurable: true });
          let f2 = null, { isFallback: h2 } = t10, p2 = this.cacheControls.get(ru(e10));
          if ((null == u2 ? void 0 : u2.lastModified) === -1) c2 = -1, d2 = -31536e6;
          else {
            let r11 = performance.timeOrigin + performance.now(), n3 = (null == u2 ? void 0 : u2.lastModified) || r11;
            d2 = this.calculateRevalidate(e10, n3, this.dev ?? false, t10.isFallback);
            let a3 = "number" == typeof (null == p2 ? void 0 : p2.expire) ? 1e3 * p2.expire + n3 : void 0;
            if (void 0 !== a3 && a3 < r11) c2 = -1;
            else if (void 0 === (c2 = false !== d2 && d2 < r11 || void 0) && ((null == u2 || null == (o2 = u2.value) ? void 0 : o2.kind) === tV.APP_PAGE || (null == u2 || null == (s2 = u2.value) ? void 0 : s2.kind) === tV.APP_ROUTE)) {
              let e11 = null == (l2 = u2.value.headers) ? void 0 : l2[v];
              if ("string" == typeof e11) {
                let t11 = e11.split(",");
                t11.length > 0 && (rn(t11, n3) ? c2 = -1 : ra(t11, n3) && (c2 = true));
              }
            }
          }
          return u2 && (f2 = { isStale: c2, cacheControl: p2, revalidateAfter: d2, value: u2.value, isFallback: h2 }), !u2 && this.prerenderManifest.notFoundRoutes.includes(e10) && (f2 = { isStale: c2, value: null, cacheControl: p2, revalidateAfter: d2, isFallback: h2 }, this.set(e10, f2.value, { ...t10, cacheControl: p2 })), f2;
        }
        async set(e10, t10, r10) {
          if ((null == t10 ? void 0 : t10.kind) === tV.FETCH) {
            let r11 = te.getStore(), n3 = r11 ? tt(r11) : null;
            (null == n3 ? void 0 : n3.mutable) && (rb.debug && console.log("IncrementalCache: rdc:set", e10), n3.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          e10 = this._getPathname(e10, r10.fetchCache);
          let n2 = JSON.stringify(t10).length;
          if (r10.fetchCache && n2 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${n2} bytes)`;
            if (this.dev) throw Object.defineProperty(Error(t11), "__NEXT_ERROR_CODE", { value: "E1003", enumerable: false, configurable: true });
            console.warn(t11);
            return;
          }
          try {
            var a2;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(ru(e10), r10.cacheControl), await (null == (a2 = this.cacheHandler) ? void 0 : a2.set(e10, t10, r10));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      e.i(64445);
      var rg = e.i(40049), rx = ((er = {})[er.Before = 1] = "Before", er[er.ShellStatic = 11] = "ShellStatic", er[er.Static = 13] = "Static", er[er.ShellRuntime = 21] = "ShellRuntime", er[er.Runtime = 23] = "Runtime", er[er.Dynamic = 30] = "Dynamic", er[er.Abandoned = 40] = "Abandoned", er);
      if (/* @__PURE__ */ new WeakMap(), rx.ShellRuntime, rx.Static, rx.Runtime, rg.default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp("\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)"), RegExp("\\n\\s+at __next_metadata_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_viewport_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_outlet_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_validation_boundary__[\\n\\s]"), RegExp("\\n\\s+at __next_instant_slot_(\\d+)__[\\n\\s]"), eE(), e.i(12438);
      let rm = new TextEncoder(), rv = new TextDecoder(), ry = (e10) => {
        let t10 = e10;
        t10 instanceof Uint8Array && (t10 = rv.decode(t10)), t10 = t10.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
        try {
          var r10 = t10;
          let e11 = atob(r10), n2 = new Uint8Array(e11.length);
          for (let t11 = 0; t11 < e11.length; t11++) n2[t11] = e11.charCodeAt(t11);
          return n2;
        } catch {
          throw TypeError("The input to be decoded is not correctly encoded.");
        }
      };
      class rw extends Error {
        constructor(e10, t10) {
          super(e10, t10), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      rw.code = "ERR_JOSE_GENERIC";
      class r_ extends rw {
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      r_.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      class rE extends rw {
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.code = "ERR_JWT_EXPIRED", this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      rE.code = "ERR_JWT_EXPIRED";
      class rS extends rw {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
        }
      }
      rS.code = "ERR_JOSE_ALG_NOT_ALLOWED";
      class rC extends rw {
        constructor() {
          super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
        }
      }
      rC.code = "ERR_JOSE_NOT_SUPPORTED";
      class rR extends rw {
        constructor() {
          super(...arguments), this.code = "ERR_JWS_INVALID";
        }
      }
      rR.code = "ERR_JWS_INVALID";
      class rT extends rw {
        constructor() {
          super(...arguments), this.code = "ERR_JWT_INVALID";
        }
      }
      rT.code = "ERR_JWT_INVALID";
      class rO extends rw {
        constructor(e10 = "signature verification failed", t10) {
          super(e10, t10), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        }
      }
      rO.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
      let rP = crypto;
      function rA(e10, t10 = "algorithm.name") {
        return TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      }
      function rk(e10, t10) {
        return e10.name === t10;
      }
      function rN(e10) {
        return parseInt(e10.name.slice(4), 10);
      }
      function rI(e10, t10, ...r10) {
        if ((r10 = r10.filter(Boolean)).length > 2) {
          let t11 = r10.pop();
          e10 += `one of type ${r10.join(", ")}, or ${t11}.`;
        } else 2 === r10.length ? e10 += `one of type ${r10[0]} or ${r10[1]}.` : e10 += `of type ${r10[0]}.`;
        return null == t10 ? e10 += ` Received ${t10}` : "function" == typeof t10 && t10.name ? e10 += ` Received function ${t10.name}` : "object" == typeof t10 && null != t10 && t10.constructor?.name && (e10 += ` Received an instance of ${t10.constructor.name}`), e10;
      }
      let rM = (e10, ...t10) => rI("Key must be ", e10, ...t10);
      function rj(e10, t10, ...r10) {
        return rI(`Key for the ${e10} algorithm must be `, t10, ...r10);
      }
      let rD = (e10) => e10 instanceof CryptoKey || e10?.[Symbol.toStringTag] === "KeyObject", rL = ["CryptoKey"];
      function r$(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        if (null === Object.getPrototypeOf(e10)) return true;
        let t10 = e10;
        for (; null !== Object.getPrototypeOf(t10); ) t10 = Object.getPrototypeOf(t10);
        return Object.getPrototypeOf(e10) === t10;
      }
      function rU(e10) {
        return r$(e10) && "string" == typeof e10.kty;
      }
      let rH = async (e10) => {
        if (!e10.alg) throw TypeError('"alg" argument is required when "jwk.alg" is not present');
        let { algorithm: t10, keyUsages: r10 } = function(e11) {
          let t11, r11;
          switch (e11.kty) {
            case "RSA":
              switch (e11.alg) {
                case "PS256":
                case "PS384":
                case "PS512":
                  t11 = { name: "RSA-PSS", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RS256":
                case "RS384":
                case "RS512":
                  t11 = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e11.alg.slice(-3)}` }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "RSA-OAEP":
                case "RSA-OAEP-256":
                case "RSA-OAEP-384":
                case "RSA-OAEP-512":
                  t11 = { name: "RSA-OAEP", hash: `SHA-${parseInt(e11.alg.slice(-3), 10) || 1}` }, r11 = e11.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
                  break;
                default:
                  throw new rC('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "EC":
              switch (e11.alg) {
                case "ES256":
                  t11 = { name: "ECDSA", namedCurve: "P-256" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES384":
                  t11 = { name: "ECDSA", namedCurve: "P-384" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ES512":
                  t11 = { name: "ECDSA", namedCurve: "P-521" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: "ECDH", namedCurve: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rC('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            case "OKP":
              switch (e11.alg) {
                case "Ed25519":
                  t11 = { name: "Ed25519" }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "EdDSA":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["sign"] : ["verify"];
                  break;
                case "ECDH-ES":
                case "ECDH-ES+A128KW":
                case "ECDH-ES+A192KW":
                case "ECDH-ES+A256KW":
                  t11 = { name: e11.crv }, r11 = e11.d ? ["deriveBits"] : [];
                  break;
                default:
                  throw new rC('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
              }
              break;
            default:
              throw new rC('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
          }
          return { algorithm: t11, keyUsages: r11 };
        }(e10), n2 = [t10, e10.ext ?? false, e10.key_ops ?? r10], a2 = { ...e10 };
        return delete a2.alg, delete a2.use, rP.subtle.importKey("jwk", a2, ...n2);
      }, rq = (e10) => e10?.[Symbol.toStringTag] === "KeyObject", rF = async (e10, t10, r10, n2, a2 = false) => {
        let i2 = e10.get(t10);
        if (i2?.[n2]) return i2[n2];
        let o2 = await rH({ ...r10, alg: n2 });
        return a2 && Object.freeze(t10), i2 ? i2[n2] = o2 : e10.set(t10, { [n2]: o2 }), o2;
      };
      async function rB(e10, t10, r10) {
        if ("sign" === r10 && (t10 = await ((e11, t11) => {
          if (rq(e11)) {
            let r11 = e11.export({ format: "jwk" });
            return r11.k ? ry(r11.k) : (n || (n = /* @__PURE__ */ new WeakMap()), rF(n, e11, r11, t11));
          }
          return rU(e11) ? e11.k ? ry(e11.k) : (n || (n = /* @__PURE__ */ new WeakMap()), rF(n, e11, e11, t11, true)) : e11;
        })(t10, e10)), "verify" === r10 && (t10 = await ((e11, t11) => {
          if (rq(e11)) {
            let r11 = e11.export({ format: "jwk" });
            return (delete r11.d, delete r11.dp, delete r11.dq, delete r11.p, delete r11.q, delete r11.qi, r11.k) ? ry(r11.k) : (a || (a = /* @__PURE__ */ new WeakMap()), rF(a, e11, r11, t11));
          }
          return rU(e11) ? e11.k ? ry(e11.k) : (a || (a = /* @__PURE__ */ new WeakMap()), rF(a, e11, e11, t11, true)) : e11;
        })(t10, e10)), t10 instanceof CryptoKey) return !function(e11, t11, ...r11) {
          switch (t11) {
            case "HS256":
            case "HS384":
            case "HS512": {
              if (!rk(e11.algorithm, "HMAC")) throw rA("HMAC");
              let r12 = parseInt(t11.slice(2), 10);
              if (rN(e11.algorithm.hash) !== r12) throw rA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "RS256":
            case "RS384":
            case "RS512": {
              if (!rk(e11.algorithm, "RSASSA-PKCS1-v1_5")) throw rA("RSASSA-PKCS1-v1_5");
              let r12 = parseInt(t11.slice(2), 10);
              if (rN(e11.algorithm.hash) !== r12) throw rA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "PS256":
            case "PS384":
            case "PS512": {
              if (!rk(e11.algorithm, "RSA-PSS")) throw rA("RSA-PSS");
              let r12 = parseInt(t11.slice(2), 10);
              if (rN(e11.algorithm.hash) !== r12) throw rA(`SHA-${r12}`, "algorithm.hash");
              break;
            }
            case "EdDSA":
              if ("Ed25519" !== e11.algorithm.name && "Ed448" !== e11.algorithm.name) throw rA("Ed25519 or Ed448");
              break;
            case "Ed25519":
              if (!rk(e11.algorithm, "Ed25519")) throw rA("Ed25519");
              break;
            case "ES256":
            case "ES384":
            case "ES512": {
              if (!rk(e11.algorithm, "ECDSA")) throw rA("ECDSA");
              let r12 = function(e12) {
                switch (e12) {
                  case "ES256":
                    return "P-256";
                  case "ES384":
                    return "P-384";
                  case "ES512":
                    return "P-521";
                  default:
                    throw Error("unreachable");
                }
              }(t11);
              if (e11.algorithm.namedCurve !== r12) throw rA(r12, "algorithm.namedCurve");
              break;
            }
            default:
              throw TypeError("CryptoKey does not support this operation");
          }
          if (r11.length && !r11.some((t12) => e11.usages.includes(t12))) {
            let e12 = "CryptoKey does not support this operation, its usages must include ";
            if (r11.length > 2) {
              let t12 = r11.pop();
              e12 += `one of ${r11.join(", ")}, or ${t12}.`;
            } else 2 === r11.length ? e12 += `one of ${r11[0]} or ${r11[1]}.` : e12 += `${r11[0]}.`;
            throw TypeError(e12);
          }
        }(t10, e10, r10), t10;
        if (t10 instanceof Uint8Array) {
          if (!e10.startsWith("HS")) throw TypeError(rM(t10, ...rL));
          return rP.subtle.importKey("raw", t10, { hash: `SHA-${e10.slice(-3)}`, name: "HMAC" }, false, [r10]);
        }
        throw TypeError(rM(t10, ...rL, "Uint8Array", "JSON Web Key"));
      }
      let rW = async (e10, t10, r10, n2) => {
        let a2 = await rB(e10, t10, "verify");
        ((e11, t11) => {
          if (e11.startsWith("RS") || e11.startsWith("PS")) {
            let { modulusLength: r11 } = t11.algorithm;
            if ("number" != typeof r11 || r11 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
          }
        })(e10, a2);
        let i2 = function(e11, t11) {
          let r11 = `SHA-${e11.slice(-3)}`;
          switch (e11) {
            case "HS256":
            case "HS384":
            case "HS512":
              return { hash: r11, name: "HMAC" };
            case "PS256":
            case "PS384":
            case "PS512":
              return { hash: r11, name: "RSA-PSS", saltLength: e11.slice(-3) >> 3 };
            case "RS256":
            case "RS384":
            case "RS512":
              return { hash: r11, name: "RSASSA-PKCS1-v1_5" };
            case "ES256":
            case "ES384":
            case "ES512":
              return { hash: r11, name: "ECDSA", namedCurve: t11.namedCurve };
            case "Ed25519":
              return { name: "Ed25519" };
            case "EdDSA":
              return { name: t11.name };
            default:
              throw new rC(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          }
        }(e10, a2.algorithm);
        try {
          return await rP.subtle.verify(i2, a2, r10, n2);
        } catch {
          return false;
        }
      }, rV = (e10) => e10?.[Symbol.toStringTag], rG = (e10, t10, r10) => {
        if (void 0 !== t10.use && "sig" !== t10.use) throw TypeError("Invalid key for this operation, when present its use must be sig");
        if (void 0 !== t10.key_ops && t10.key_ops.includes?.(r10) !== true) throw TypeError(`Invalid key for this operation, when present its key_ops must include ${r10}`);
        if (void 0 !== t10.alg && t10.alg !== e10) throw TypeError(`Invalid key for this operation, when present its alg must be ${e10}`);
        return true;
      };
      function rX(e10, t10, r10, n2) {
        t10.startsWith("HS") || "dir" === t10 || t10.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t10) ? ((e11, t11, r11, n3) => {
          if (!(t11 instanceof Uint8Array)) {
            if (n3 && rU(t11)) {
              if (rU(t11) && "oct" === t11.kty && "string" == typeof t11.k && rG(e11, t11, r11)) return;
              throw TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
            }
            if (!rD(t11)) throw TypeError(rj(e11, t11, ...rL, "Uint8Array", n3 ? "JSON Web Key" : null));
            if ("secret" !== t11.type) throw TypeError(`${rV(t11)} instances for symmetric algorithms must be of type "secret"`);
          }
        })(t10, r10, n2, e10) : ((e11, t11, r11, n3) => {
          if (n3 && rU(t11)) switch (r11) {
            case "sign":
              if ("oct" !== t11.kty && "string" == typeof t11.d && rG(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a private JWK");
            case "verify":
              if ("oct" !== t11.kty && void 0 === t11.d && rG(e11, t11, r11)) return;
              throw TypeError("JSON Web Key for this operation be a public JWK");
          }
          if (!rD(t11)) throw TypeError(rj(e11, t11, ...rL, n3 ? "JSON Web Key" : null));
          if ("secret" === t11.type) throw TypeError(`${rV(t11)} instances for asymmetric algorithms must not be of type "secret"`);
          if ("sign" === r11 && "public" === t11.type) throw TypeError(`${rV(t11)} instances for asymmetric algorithm signing must be of type "private"`);
          if ("decrypt" === r11 && "public" === t11.type) throw TypeError(`${rV(t11)} instances for asymmetric algorithm decryption must be of type "private"`);
          if (t11.algorithm && "verify" === r11 && "private" === t11.type) throw TypeError(`${rV(t11)} instances for asymmetric algorithm verifying must be of type "public"`);
          if (t11.algorithm && "encrypt" === r11 && "private" === t11.type) throw TypeError(`${rV(t11)} instances for asymmetric algorithm encryption must be of type "public"`);
        })(t10, r10, n2, e10);
      }
      rX.bind(void 0, false);
      let rz = rX.bind(void 0, true), rK = function(e10, t10, r10, n2, a2) {
        let i2;
        if (void 0 !== a2.crit && n2?.crit === void 0) throw new e10('"crit" (Critical) Header Parameter MUST be integrity protected');
        if (!n2 || void 0 === n2.crit) return /* @__PURE__ */ new Set();
        if (!Array.isArray(n2.crit) || 0 === n2.crit.length || n2.crit.some((e11) => "string" != typeof e11 || 0 === e11.length)) throw new e10('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        for (let o2 of (i2 = void 0 !== r10 ? new Map([...Object.entries(r10), ...t10.entries()]) : t10, n2.crit)) {
          if (!i2.has(o2)) throw new rC(`Extension Header Parameter "${o2}" is not recognized`);
          if (void 0 === a2[o2]) throw new e10(`Extension Header Parameter "${o2}" is missing`);
          if (i2.get(o2) && void 0 === n2[o2]) throw new e10(`Extension Header Parameter "${o2}" MUST be integrity protected`);
        }
        return new Set(n2.crit);
      };
      async function rJ(e10, t10) {
        if (!r$(e10)) throw TypeError("JWK must be an object");
        switch (t10 || (t10 = e10.alg), e10.kty) {
          case "oct":
            if ("string" != typeof e10.k || !e10.k) throw TypeError('missing "k" (Key Value) Parameter value');
            return ry(e10.k);
          case "RSA":
            if ("oth" in e10 && void 0 !== e10.oth) throw new rC('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
          case "EC":
          case "OKP":
            return rH({ ...e10, alg: t10 });
          default:
            throw new rC('Unsupported "kty" (Key Type) Parameter value');
        }
      }
      async function rQ(e10, t10, r10) {
        let n2, a2;
        if (!r$(e10)) throw new rR("Flattened JWS must be an object");
        if (void 0 === e10.protected && void 0 === e10.header) throw new rR('Flattened JWS must have either of the "protected" or "header" members');
        if (void 0 !== e10.protected && "string" != typeof e10.protected) throw new rR("JWS Protected Header incorrect type");
        if (void 0 === e10.payload) throw new rR("JWS Payload missing");
        if ("string" != typeof e10.signature) throw new rR("JWS Signature missing or incorrect type");
        if (void 0 !== e10.header && !r$(e10.header)) throw new rR("JWS Unprotected Header incorrect type");
        let i2 = {};
        if (e10.protected) try {
          let t11 = ry(e10.protected);
          i2 = JSON.parse(rv.decode(t11));
        } catch {
          throw new rR("JWS Protected Header is invalid");
        }
        if (!((...e11) => {
          let t11, r11 = e11.filter(Boolean);
          if (0 === r11.length || 1 === r11.length) return true;
          for (let e12 of r11) {
            let r12 = Object.keys(e12);
            if (!t11 || 0 === t11.size) {
              t11 = new Set(r12);
              continue;
            }
            for (let e13 of r12) {
              if (t11.has(e13)) return false;
              t11.add(e13);
            }
          }
          return true;
        })(i2, e10.header)) throw new rR("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let o2 = { ...i2, ...e10.header }, s2 = rK(rR, /* @__PURE__ */ new Map([["b64", true]]), r10?.crit, i2, o2), l2 = true;
        if (s2.has("b64") && "boolean" != typeof (l2 = i2.b64)) throw new rR('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        let { alg: c2 } = o2;
        if ("string" != typeof c2 || !c2) throw new rR('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        let d2 = r10 && ((e11, t11) => {
          if (void 0 !== t11 && (!Array.isArray(t11) || t11.some((e12) => "string" != typeof e12))) throw TypeError(`"${e11}" option must be an array of strings`);
          if (t11) return new Set(t11);
        })("algorithms", r10.algorithms);
        if (d2 && !d2.has(c2)) throw new rS('"alg" (Algorithm) Header Parameter value not allowed');
        if (l2) {
          if ("string" != typeof e10.payload) throw new rR("JWS Payload must be a string");
        } else if ("string" != typeof e10.payload && !(e10.payload instanceof Uint8Array)) throw new rR("JWS Payload must be a string or an Uint8Array instance");
        let u2 = false;
        "function" == typeof t10 ? (t10 = await t10(i2, e10), u2 = true, rz(c2, t10, "verify"), rU(t10) && (t10 = await rJ(t10, c2))) : rz(c2, t10, "verify");
        let f2 = function(...e11) {
          let t11 = new Uint8Array(e11.reduce((e12, { length: t12 }) => e12 + t12, 0)), r11 = 0;
          for (let n3 of e11) t11.set(n3, r11), r11 += n3.length;
          return t11;
        }(rm.encode(e10.protected ?? ""), rm.encode("."), "string" == typeof e10.payload ? rm.encode(e10.payload) : e10.payload);
        try {
          n2 = ry(e10.signature);
        } catch {
          throw new rR("Failed to base64url decode the signature");
        }
        if (!await rW(c2, t10, n2, f2)) throw new rO();
        if (l2) try {
          a2 = ry(e10.payload);
        } catch {
          throw new rR("Failed to base64url decode the payload");
        }
        else a2 = "string" == typeof e10.payload ? rm.encode(e10.payload) : e10.payload;
        let h2 = { payload: a2 };
        return (void 0 !== e10.protected && (h2.protectedHeader = i2), void 0 !== e10.header && (h2.unprotectedHeader = e10.header), u2) ? { ...h2, key: t10 } : h2;
      }
      async function rY(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = rv.decode(e10)), "string" != typeof e10) throw new rR("Compact JWS must be a string or Uint8Array");
        let { 0: n2, 1: a2, 2: i2, length: o2 } = e10.split(".");
        if (3 !== o2) throw new rR("Invalid Compact JWS");
        let s2 = await rQ({ payload: a2, protected: n2, signature: i2 }, t10, r10), l2 = { payload: s2.payload, protectedHeader: s2.protectedHeader };
        return "function" == typeof t10 ? { ...l2, key: s2.key } : l2;
      }
      let rZ = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, r0 = (e10) => {
        let t10, r10 = rZ.exec(e10);
        if (!r10 || r10[4] && r10[1]) throw TypeError("Invalid time period format");
        let n2 = parseFloat(r10[2]);
        switch (r10[3].toLowerCase()) {
          case "sec":
          case "secs":
          case "second":
          case "seconds":
          case "s":
            t10 = Math.round(n2);
            break;
          case "minute":
          case "minutes":
          case "min":
          case "mins":
          case "m":
            t10 = Math.round(60 * n2);
            break;
          case "hour":
          case "hours":
          case "hr":
          case "hrs":
          case "h":
            t10 = Math.round(3600 * n2);
            break;
          case "day":
          case "days":
          case "d":
            t10 = Math.round(86400 * n2);
            break;
          case "week":
          case "weeks":
          case "w":
            t10 = Math.round(604800 * n2);
            break;
          default:
            t10 = Math.round(31557600 * n2);
        }
        return "-" === r10[1] || "ago" === r10[4] ? -t10 : t10;
      }, r1 = (e10) => e10.toLowerCase().replace(/^application\//, "");
      async function r2(e10, t10, r10) {
        let n2 = await rY(e10, t10, r10);
        if (n2.protectedHeader.crit?.includes("b64") && false === n2.protectedHeader.b64) throw new rT("JWTs MUST NOT use unencoded payload");
        let a2 = { payload: ((e11, t11, r11 = {}) => {
          var n3, a3;
          let i2, o2;
          try {
            i2 = JSON.parse(rv.decode(t11));
          } catch {
          }
          if (!r$(i2)) throw new rT("JWT Claims Set must be a top-level JSON object");
          let { typ: s2 } = r11;
          if (s2 && ("string" != typeof e11.typ || r1(e11.typ) !== r1(s2))) throw new r_('unexpected "typ" JWT header value', i2, "typ", "check_failed");
          let { requiredClaims: l2 = [], issuer: c2, subject: d2, audience: u2, maxTokenAge: f2 } = r11, h2 = [...l2];
          for (let e12 of (void 0 !== f2 && h2.push("iat"), void 0 !== u2 && h2.push("aud"), void 0 !== d2 && h2.push("sub"), void 0 !== c2 && h2.push("iss"), new Set(h2.reverse()))) if (!(e12 in i2)) throw new r_(`missing required "${e12}" claim`, i2, e12, "missing");
          if (c2 && !(Array.isArray(c2) ? c2 : [c2]).includes(i2.iss)) throw new r_('unexpected "iss" claim value', i2, "iss", "check_failed");
          if (d2 && i2.sub !== d2) throw new r_('unexpected "sub" claim value', i2, "sub", "check_failed");
          if (u2 && (n3 = i2.aud, a3 = "string" == typeof u2 ? [u2] : u2, "string" == typeof n3 ? !a3.includes(n3) : !(Array.isArray(n3) && a3.some(Set.prototype.has.bind(new Set(n3)))))) throw new r_('unexpected "aud" claim value', i2, "aud", "check_failed");
          switch (typeof r11.clockTolerance) {
            case "string":
              o2 = r0(r11.clockTolerance);
              break;
            case "number":
              o2 = r11.clockTolerance;
              break;
            case "undefined":
              o2 = 0;
              break;
            default:
              throw TypeError("Invalid clockTolerance option type");
          }
          let { currentDate: p2 } = r11, b2 = Math.floor((p2 || /* @__PURE__ */ new Date()).getTime() / 1e3);
          if ((void 0 !== i2.iat || f2) && "number" != typeof i2.iat) throw new r_('"iat" claim must be a number', i2, "iat", "invalid");
          if (void 0 !== i2.nbf) {
            if ("number" != typeof i2.nbf) throw new r_('"nbf" claim must be a number', i2, "nbf", "invalid");
            if (i2.nbf > b2 + o2) throw new r_('"nbf" claim timestamp check failed', i2, "nbf", "check_failed");
          }
          if (void 0 !== i2.exp) {
            if ("number" != typeof i2.exp) throw new r_('"exp" claim must be a number', i2, "exp", "invalid");
            if (i2.exp <= b2 - o2) throw new rE('"exp" claim timestamp check failed', i2, "exp", "check_failed");
          }
          if (f2) {
            let e12 = b2 - i2.iat;
            if (e12 - o2 > ("number" == typeof f2 ? f2 : r0(f2))) throw new rE('"iat" claim timestamp check failed (too far in the past)', i2, "iat", "check_failed");
            if (e12 < 0 - o2) throw new r_('"iat" claim timestamp check failed (it should be in the past)', i2, "iat", "check_failed");
          }
          return i2;
        })(n2.protectedHeader, n2.payload, r10), protectedHeader: n2.protectedHeader };
        return "function" == typeof t10 ? { ...a2, key: n2.key } : a2;
      }
      async function r5(e10) {
        try {
          let { payload: t10 } = await r2(e10, function() {
            let e11 = process.env.JWT_SECRET;
            if (!e11) throw Error("Missing JWT_SECRET. Set it in your .env.local (see .env.example).");
            return new TextEncoder().encode(e11);
          }());
          if ("number" == typeof t10.adminId && "string" == typeof t10.email && "string" == typeof t10.name) return { adminId: t10.adminId, email: t10.email, name: t10.name };
          return null;
        } catch {
          return null;
        }
      }
      let r6 = ["/admin/login", "/admin/signup"], r4 = ["/api/admin/auth/login", "/api/admin/auth/signup", "/api/admin/auth/logout"];
      async function r3(e10) {
        let { pathname: t10 } = e10.nextUrl, r10 = r6.some((e11) => t10.startsWith(e11)), n2 = r4.some((e11) => t10.startsWith(e11));
        if (r10 || n2) return eu.next();
        let a2 = e10.cookies.get("tinytods_admin_session")?.value;
        if (!(a2 ? await r5(a2) : null)) {
          if (t10.startsWith("/api/admin")) return eu.json({ error: "Not authenticated." }, { status: 401 });
          let r11 = new URL("/admin/login", e10.url);
          return r11.searchParams.set("from", t10), eu.redirect(r11);
        }
        return eu.next();
      }
      e.s(["config", 0, { matcher: ["/admin/:path*", "/api/admin/:path*"] }, "middleware", 0, r3], 99446);
      let r8 = { ...e.i(99446) }, r9 = "/middleware", r7 = r8.middleware || r8.default;
      if ("function" != typeof r7) throw new class extends Error {
        constructor(e10) {
          super(e10), Object.defineProperty(this, "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true }), this.stack = "";
        }
      }(`The Middleware file "${r9}" must export a function named \`middleware\` or a default function.`);
      let ne = async (e10) => tP({ ...e10, IncrementalCache: rb, incrementalCacheHandler: null, page: r9, handler: async (...e11) => {
        try {
          return await r7(...e11);
        } catch (a2) {
          let t10 = e11[0], r10 = new URL(t10.url), n2 = r10.pathname + r10.search;
          throw await c(a2, { path: n2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), a2;
        }
      } });
      async function nt(e10, t10) {
        let r10 = await ne({ request: { url: e10.url, method: e10.method, headers: S(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: r9 }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, ne, "handler", 0, nt], 42738);
    }, 74398, (e, t, r) => {
    }, 28042, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, a = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => b, ResponseCookies: () => g, parseCookie: () => u, parseSetCookie: () => f, stringifyCookie: () => d };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function d(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function u(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, a2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != a2 ? a2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function f(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = u(e2), { domain: a2, expires: i2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: d2, partitioned: f2, priority: b2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var g2, x, m = { name: t2, value: decodeURIComponent(r2), domain: a2, ...i2 && { expires: new Date(i2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: h.includes(g2 = (g2 = c2).toLowerCase()) ? g2 : void 0 }, ...d2 && { secure: true }, ...b2 && { priority: p.includes(x = (x = b2).toLowerCase()) ? x : void 0 }, ...f2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in m) m[t3] && (e3[t3] = m[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let s2 of i(t2)) o.call(e2, s2) || void 0 === s2 || n(e2, s2, { get: () => t2[s2], enumerable: !(r2 = a(t2, s2)) || r2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var h = ["strict", "lax", "none"], p = ["low", "medium", "high"], b = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of u(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => d(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => d(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, g = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const a2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (const e3 of Array.isArray(a2) ? a2 : function(e4) {
            if (!e4) return [];
            var t3, r3, n3, a3, i2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), a3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (i2 = true, s2 = a3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!i2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(a2)) {
            const t3 = f(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, a2 = this._parsed;
          return a2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = d(r3);
              t3.append("set-cookie", e4);
            }
          }(a2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(d).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, a, i, o;
        var s, l, c, d, u, f, h, p, b, g, x, m, v, y, w, _, E = { 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(108), a2 = r3(221), i2 = r3(44), o2 = "context", s2 = new n2.NoopContextManager();
          t2.ContextAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalContextManager(e4) {
              return (0, a2.registerGlobal)(o2, e4, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e4, t3, r4, ...n3) {
              return this._getContextManager().with(e4, t3, r4, ...n3);
            }
            bind(e4, t3) {
              return this._getContextManager().bind(e4, t3);
            }
            _getContextManager() {
              return (0, a2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          };
        }, 44: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(757), a2 = r3(412), i2 = r3(711), o2 = r3(221);
          t2.DiagAPI = class e3 {
            constructor() {
              function e4(e5) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e5](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e5, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var n3, s2, l2;
                if (e5 === t3) {
                  let e6 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e6.stack) ? n3 : e6.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), d2 = (0, a2.createLogLevelDiagLogger)(null != (s2 = r4.logLevel) ? s2 : i2.DiagLogLevel.INFO, e5);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e6 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e6}`), d2.warn(`Current logger will overwrite one already registered from ${e6}`);
                }
                return (0, o2.registerGlobal)("diag", d2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e5) => new n2.DiagComponentLogger(e5), t3.verbose = e4("verbose"), t3.debug = e4("debug"), t3.info = e4("info"), t3.warn = e4("warn"), t3.error = e4("error");
            }
            static instance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
          };
        }, 262: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(586), a2 = r3(221), i2 = r3(44), o2 = "metrics";
          t2.MetricsAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalMeterProvider(e4) {
              return (0, a2.registerGlobal)(o2, e4, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, a2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e4, t3, r4) {
              return this.getMeterProvider().getMeter(e4, t3, r4);
            }
            disable() {
              (0, a2.unregisterGlobal)(o2, i2.DiagAPI.instance());
            }
          };
        }, 25: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(221), a2 = r3(19), i2 = r3(92), o2 = r3(398), s2 = r3(504), l2 = r3(44), c2 = "propagation", d2 = new a2.NoopTextMapPropagator();
          t2.PropagationAPI = class e3 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalPropagator(e4) {
              return (0, n2.registerGlobal)(c2, e4, l2.DiagAPI.instance());
            }
            inject(e4, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e4, t3, r4);
            }
            extract(e4, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e4, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || d2;
            }
          };
        }, 397: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(221), a2 = r3(498), i2 = r3(477), o2 = r3(793), s2 = r3(44), l2 = "trace";
          t2.TraceAPI = class e3 {
            constructor() {
              this._proxyTracerProvider = new a2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalTracerProvider(e4) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e4), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e4, t3) {
              return this.getTracerProvider().getTracer(e4, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new a2.ProxyTracerProvider();
            }
          };
        }, 398: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(912), a2 = (0, r3(23).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(a2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(a2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(a2);
          };
        }, 152: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0, t2.BaggageImpl = class e3 {
            constructor(e4) {
              this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
            }
            getEntry(e4) {
              let t3 = this._entries.get(e4);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e4, t3]) => [e4, t3]);
            }
            setEntry(t3, r3) {
              let n2 = new e3(this._entries);
              return n2._entries.set(t3, r3), n2;
            }
            removeEntry(t3) {
              let r3 = new e3(this._entries);
              return r3._entries.delete(t3), r3;
            }
            removeEntries(...t3) {
              let r3 = new e3(this._entries);
              for (let e4 of t3) r3._entries.delete(e4);
              return r3;
            }
            clear() {
              return new e3();
            }
          };
        }, 647: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 504: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(44), a2 = r3(152), i2 = r3(647), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new a2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 778: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(912).ContextAPI.getInstance();
        }, 108: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(23);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 23: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          }, t2.ROOT_CONTEXT = new class e3 {
            constructor(t3) {
              const r3 = this;
              r3._currentContext = t3 ? new Map(t3) : /* @__PURE__ */ new Map(), r3.getValue = (e4) => r3._currentContext.get(e4), r3.setValue = (t4, n2) => {
                let a2 = new e3(r3._currentContext);
                return a2._currentContext.set(t4, n2), a2;
              }, r3.deleteValue = (t4) => {
                let n2 = new e3(r3._currentContext);
                return n2._currentContext.delete(t4), n2;
              };
            }
          }();
        }, 304: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(44).DiagAPI.instance();
        }, 757: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(221);
          function a2(e3, t3, r4) {
            let a3 = (0, n2.getGlobal)("diag");
            if (a3) return r4.unshift(t3), a3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          };
        }, 83: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 412: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(711);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let a2 = t3[r5];
              return "function" == typeof a2 && e3 >= n3 ? a2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 711: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 221: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(678), a2 = r3(652), i2 = r3(662), o2 = a2.VERSION.split(".")[0], s2 = Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var i3;
            let o3 = l2[s2] = null != (i3 = l2[s2]) ? i3 : { version: a2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== a2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${a2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${a2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, i2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${a2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 662: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(652), a2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(a2);
            if (!n3) return () => false;
            let i3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(a2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || i3.major !== s2.major) return o2(e4);
              if (0 === i3.major) return i3.minor === s2.minor && i3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return i3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(n2.VERSION);
        }, 120: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(262).MetricsAPI.getInstance();
        }, 532: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 440: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = a2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class d2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = d2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new a2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new d2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 586: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(440);
          class a2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = a2, t2.NOOP_METER_PROVIDER = new a2();
        }, 678: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(59), t2);
        }, 460: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 59: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), a2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), a2(r3(460), t2);
        }, 27: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(25).PropagationAPI.getInstance();
        }, 19: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 92: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 816: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(397).TraceAPI.getInstance();
        }, 374: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(546);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 637: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(912), a2 = r3(793), i2 = r3(374), o2 = r3(477), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, a2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), d2 = this.startSpan(e3, i3, c2), u2 = (0, a2.setSpan)(c2, d2);
              return s2.with(u2, l2, void 0, d2);
            }
          };
        }, 76: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(637);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 779: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(637)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a2 = this._getTracer();
              return Reflect.apply(a2.startActiveSpan, a2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 498: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(779), a2 = new (r3(76)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var a3;
              return null != (a3 = this.getDelegateTracer(e3, t3, r4)) ? a3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : a2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 312: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 793: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(23), a2 = r3(374), i2 = r3(912), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new a2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 285: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(240);
          t2.TraceStateImpl = class e3 {
            constructor(e4) {
              this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
            }
            set(e4, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e4) && r4._internalState.delete(e4), r4._internalState.set(e4, t3), r4;
            }
            unset(e4) {
              let t3 = this._clone();
              return t3._internalState.delete(e4), t3;
            }
            get(e4) {
              return this._internalState.get(e4);
            }
            serialize() {
              return this._keys().reduce((e4, t3) => (e4.push(t3 + "=" + this.get(t3)), e4), []).join(",");
            }
            _parse(e4) {
              !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce((e5, t3) => {
                let r4 = t3.trim(), a2 = r4.indexOf("=");
                if (-1 !== a2) {
                  let i2 = r4.slice(0, a2), o2 = r4.slice(a2 + 1, t3.length);
                  (0, n2.validateKey)(i2) && (0, n2.validateValue)(o2) && e5.set(i2, o2);
                }
                return e5;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let t3 = new e3();
              return t3._internalState = new Map(this._internalState), t3;
            }
          };
        }, 240: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, a2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${n2}|${a2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 87: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(285);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 546: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(731);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 613: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 477: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(546), a2 = r3(374), i2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return i2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new a2.NonRecordingSpan(e3);
          };
        }, 854: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 731: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 652: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, S = {};
        function C(e2) {
          var t2 = S[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = S[e2] = { exports: {} }, n2 = true;
          try {
            E[e2].call(r3.exports, r3, r3.exports, C), n2 = false;
          } finally {
            n2 && delete S[e2];
          }
          return r3.exports;
        }
        C.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var R = {};
        Object.defineProperty(R, "__esModule", { value: true }), R.trace = R.propagation = R.metrics = R.diag = R.context = R.INVALID_SPAN_CONTEXT = R.INVALID_TRACEID = R.INVALID_SPANID = R.isValidSpanId = R.isValidTraceId = R.isSpanContextValid = R.createTraceState = R.TraceFlags = R.SpanStatusCode = R.SpanKind = R.SamplingDecision = R.ProxyTracerProvider = R.ProxyTracer = R.defaultTextMapSetter = R.defaultTextMapGetter = R.ValueType = R.createNoopMeter = R.DiagLogLevel = R.DiagConsoleLogger = R.ROOT_CONTEXT = R.createContextKey = R.baggageEntryMetadataFromString = void 0, s = C(504), Object.defineProperty(R, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = C(23), Object.defineProperty(R, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(R, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = C(83), Object.defineProperty(R, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), d = C(711), Object.defineProperty(R, "DiagLogLevel", { enumerable: true, get: function() {
          return d.DiagLogLevel;
        } }), u = C(440), Object.defineProperty(R, "createNoopMeter", { enumerable: true, get: function() {
          return u.createNoopMeter;
        } }), f = C(532), Object.defineProperty(R, "ValueType", { enumerable: true, get: function() {
          return f.ValueType;
        } }), h = C(92), Object.defineProperty(R, "defaultTextMapGetter", { enumerable: true, get: function() {
          return h.defaultTextMapGetter;
        } }), Object.defineProperty(R, "defaultTextMapSetter", { enumerable: true, get: function() {
          return h.defaultTextMapSetter;
        } }), p = C(779), Object.defineProperty(R, "ProxyTracer", { enumerable: true, get: function() {
          return p.ProxyTracer;
        } }), b = C(498), Object.defineProperty(R, "ProxyTracerProvider", { enumerable: true, get: function() {
          return b.ProxyTracerProvider;
        } }), g = C(312), Object.defineProperty(R, "SamplingDecision", { enumerable: true, get: function() {
          return g.SamplingDecision;
        } }), x = C(613), Object.defineProperty(R, "SpanKind", { enumerable: true, get: function() {
          return x.SpanKind;
        } }), m = C(854), Object.defineProperty(R, "SpanStatusCode", { enumerable: true, get: function() {
          return m.SpanStatusCode;
        } }), v = C(731), Object.defineProperty(R, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), y = C(87), Object.defineProperty(R, "createTraceState", { enumerable: true, get: function() {
          return y.createTraceState;
        } }), w = C(477), Object.defineProperty(R, "isSpanContextValid", { enumerable: true, get: function() {
          return w.isSpanContextValid;
        } }), Object.defineProperty(R, "isValidTraceId", { enumerable: true, get: function() {
          return w.isValidTraceId;
        } }), Object.defineProperty(R, "isValidSpanId", { enumerable: true, get: function() {
          return w.isValidSpanId;
        } }), _ = C(546), Object.defineProperty(R, "INVALID_SPANID", { enumerable: true, get: function() {
          return _.INVALID_SPANID;
        } }), Object.defineProperty(R, "INVALID_TRACEID", { enumerable: true, get: function() {
          return _.INVALID_TRACEID;
        } }), Object.defineProperty(R, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return _.INVALID_SPAN_CONTEXT;
        } }), r2 = C(778), Object.defineProperty(R, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = C(304), Object.defineProperty(R, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), a = C(120), Object.defineProperty(R, "metrics", { enumerable: true, get: function() {
          return a.metrics;
        } }), i = C(27), Object.defineProperty(R, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), o = C(816), Object.defineProperty(R, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), R.default = { context: r2.context, diag: n.diag, metrics: a.metrics, propagation: i.propagation, trace: o.trace }, t.exports = R;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, a, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var a2 = {}, i2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < i2.length; s++) {
            var l = i2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var d = l.substr(0, c).trim(), u = l.substr(++c, l.length).trim();
              '"' == u[0] && (u = u.slice(1, -1)), void 0 == a2[d] && (a2[d] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(u, o));
            }
          }
          return a2;
        }, i.serialize = function(e3, t2, n2) {
          var i2 = n2 || {}, o = i2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!a.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !a.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != i2.maxAge) {
            var c = i2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (i2.domain) {
            if (!a.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!a.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, a = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, a, i;
        var o = { 234: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function a2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, n3, i3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new a2(n3, i3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, a3 = [];
            if (0 === this._eventsCount) return a3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && a3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? a3.concat(Object.getOwnPropertySymbols(e4)) : a3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var a3 = 0, i3 = n3.length, o3 = Array(i3); a3 < i3; a3++) o3[a3] = n3[a3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, a3, i3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, d = this._events[s3], u = arguments.length;
            if (d.fn) {
              switch (d.once && this.removeListener(e4, d.fn, void 0, true), u) {
                case 1:
                  return d.fn.call(d.context), true;
                case 2:
                  return d.fn.call(d.context, t3), true;
                case 3:
                  return d.fn.call(d.context, t3, n3), true;
                case 4:
                  return d.fn.call(d.context, t3, n3, a3), true;
                case 5:
                  return d.fn.call(d.context, t3, n3, a3, i3), true;
                case 6:
                  return d.fn.call(d.context, t3, n3, a3, i3, o3), true;
              }
              for (c2 = 1, l2 = Array(u - 1); c2 < u; c2++) l2[c2 - 1] = arguments[c2];
              d.fn.apply(d.context, l2);
            } else {
              var f, h = d.length;
              for (c2 = 0; c2 < h; c2++) switch (d[c2].once && this.removeListener(e4, d[c2].fn, void 0, true), u) {
                case 1:
                  d[c2].fn.call(d[c2].context);
                  break;
                case 2:
                  d[c2].fn.call(d[c2].context, t3);
                  break;
                case 3:
                  d[c2].fn.call(d[c2].context, t3, n3);
                  break;
                case 4:
                  d[c2].fn.call(d[c2].context, t3, n3, a3);
                  break;
                default:
                  if (!l2) for (f = 1, l2 = Array(u - 1); f < u; f++) l2[f - 1] = arguments[f];
                  d[c2].fn.apply(d[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, a3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return o2(this, i3), this;
            var s3 = this._events[i3];
            if (s3.fn) s3.fn !== t3 || a3 && !s3.once || n3 && s3.context !== n3 || o2(this, i3);
            else {
              for (var l2 = 0, c2 = [], d = s3.length; l2 < d; l2++) (s3[l2].fn !== t3 || a3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[i3] = 1 === c2.length ? c2[0] : c2 : o2(this, i3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 274: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 294: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, a2 = e4.length;
            for (; a2 > 0; ) {
              let i2 = a2 / 2 | 0, o2 = n2 + i2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, a2 -= i2 + 1) : a2 = i2;
            }
            return n2;
          };
        }, 838: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(294);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let a2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(a2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 138: (e3, t2, r3) => {
          let n2 = r3(274);
          class a2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new a2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(i3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = a2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(234), r2 = l(138), n = l(838), a = () => {
        }, i = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, a2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && a2(i);
                  });
                  n2(await o3);
                } catch (e4) {
                  a2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1a-4w75.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1a_4w75 = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1a-4w75.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1a-4w75.js", { otherChunks: ["chunks/[root-of-the-server]__0o5yty_._.js", "chunks/[root-of-the-server]__1d6cwet._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      var t, r = ((t = r || {})[t.Runtime = 0] = "Runtime", t[t.Parent = 1] = "Parent", t[t.Update = 2] = "Update", t);
      let n = /* @__PURE__ */ new WeakMap();
      function o(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let u = o.prototype, l = Object.prototype.hasOwnProperty, i = "u" > typeof Symbol && Symbol.toStringTag;
      function a(e2, t2, r2) {
        l.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function f(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function c(e2, t2, r2) {
        a(e2, "__esModule", { value: true }), i && a(e2, i, { value: "Module" });
        let n2 = 0;
        for (; n2 < t2.length; ) {
          let r3 = t2[n2++], o2 = t2[n2++];
          if ("number" == typeof o2) if (0 === o2) a(e2, r3, { value: t2[n2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[n2] ? a(e2, r3, { get: o2, set: t2[n2++], enumerable: true }) : a(e2, r3, { get: o2, enumerable: true });
        }
        r2 || Object.seal(e2);
      }
      function d(e2, t2) {
        (null != t2 ? f(this.c, t2) : this.m).exports = e2;
      }
      u.s = function(e2, t2, r2) {
        let n2, o2;
        null != t2 ? o2 = (n2 = f(this.c, t2)).exports : (n2 = this.m, o2 = this.e), n2.namespaceObject = o2, c(o2, e2, r2);
      }, u.j = function(e2, t2) {
        let r2, o2;
        null != t2 ? o2 = (r2 = f(this.c, t2)).exports : (r2 = this.m, o2 = this.e);
        let u2 = function(e3, t3) {
          let r3 = n.get(e3);
          if (!r3) {
            n.set(e3, r3 = []);
            let o3 = (e4) => {
              if ("default" !== e4) {
                for (let t4 of r3) if (l.call(t4, e4)) return t4;
              }
            };
            e3.exports = e3.namespaceObject = new Proxy(t3, { get(e4, t4) {
              if (l.call(e4, t4) || "default" === t4 || "__esModule" === t4) return Reflect.get(e4, t4);
              let r4 = o3(t4);
              return r4 && Reflect.get(r4, t4);
            }, set: () => false, defineProperty: () => false, deleteProperty: () => false, has: (e4, t4) => !!Reflect.has(e4, t4) || "default" !== t4 && "__esModule" !== t4 && void 0 !== o3(t4), ownKeys(e4) {
              let t4 = Reflect.ownKeys(e4);
              for (let e5 of r3) for (let r4 of Reflect.ownKeys(e5)) "default" === r4 || t4.includes(r4) || t4.push(r4);
              return t4;
            }, getOwnPropertyDescriptor(e4, t4) {
              let r4 = Reflect.getOwnPropertyDescriptor(e4, t4);
              if (r4 || "default" === t4 || "__esModule" === t4) return r4;
              let n2 = o3(t4);
              if (n2) return { enumerable: true, configurable: true, get: () => Reflect.get(n2, t4) };
            } });
          }
          return r3;
        }(r2, o2);
        "object" == typeof e2 && null !== e2 && u2.push(e2);
      }, u.v = d, u.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? f(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let p = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, h = [null, p({}), p([]), p(p)];
      function m(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !h.includes(t3); t3 = p(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), c(t2, n2), t2;
      }
      function y(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function b(e2) {
        let t2 = K(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = m(r2, y(r2), r2 && r2.__esModule);
      }
      function g(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function w(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      u.i = b, u.A = function(e2) {
        return this.r(e2)(b.bind(this));
      }, u.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, u.r = function(e2) {
        return K(e2, this.m).exports;
      }, u.f = function(e2) {
        function t2(t3) {
          if (t3 = g(t3), l.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = g(t3), l.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let O = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function _(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      O.prototype = URL.prototype, u.U = O, u.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, u.g = globalThis;
      let k = o.prototype, P = "string" == typeof TURBOPACK_CHUNK_BASE_PATH ? TURBOPACK_CHUNK_BASE_PATH : "", R = /* @__PURE__ */ new Map();
      u.M = R;
      let C = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map();
      async function v(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return function(e3, t3, r3) {
          return T(e3, t3, r3);
        }(e2, t2, E(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!R.has(e3) || C.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        for (let u3 of (n2 = T(e2, t2, E(r2.path)), o2)) C.has(u3) || C.set(u3, n2);
        await n2;
      }
      k.l = function(e2) {
        return v(r.Parent, this.m.id, e2);
      };
      let M = Promise.resolve(void 0), $ = /* @__PURE__ */ new WeakMap();
      function T(t2, n2, o2) {
        let u2 = e.loadChunkCached(t2, o2), l2 = $.get(u2);
        if (void 0 === l2) {
          let e2 = $.set.bind($, u2, M);
          l2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case r.Runtime:
                u3 = `as a runtime dependency of chunk ${n2}`;
                break;
              case r.Parent:
                u3 = `from module ${n2}`;
                break;
              case r.Update:
                u3 = "from an HMR update";
                break;
              default:
                _(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let l3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw l3.name = "ChunkLoadError", l3;
          }), $.set(u2, l2);
        }
        return l2;
      }
      k.L = function(e2) {
        var t2, n2;
        return t2 = r.Parent, n2 = this.m.id, T(t2, n2, e2);
      };
      k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.F = function(e2) {
        return e2 ? `file:///ROOT/${e2.split("/").map(encodeURIComponent).join("/")}` : "file:///ROOT/";
      }, k.q = function(e2, t2) {
        d.call(this, `${e2}`, t2);
      };
      let x = /[^A-Za-z0-9\-_.!~*'()/]/;
      function E(e2, t2 = P) {
        let r2 = x.test(e2) ? e2.split("/").map(encodeURIComponent).join("/") : e2;
        return `${t2}${r2}`;
      }
      k.b = P, k.X = "", k.h = E;
      let A = {};
      u.c = A;
      let K = (e2, t2) => {
        let n2 = A[e2];
        if (n2) {
          if (n2.error) throw n2.error;
          return n2;
        }
        return N(e2, r.Parent, t2.id);
      };
      function N(e2, t2, r2) {
        let n2 = R.get(e2);
        if ("function" != typeof n2) throw Error(function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              _(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, r2));
        let u2 = s(e2), l2 = u2.exports;
        A[e2] = u2;
        let i2 = new o(u2, l2);
        try {
          n2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && m(u2.exports, u2.namespaceObject), u2;
      }
      function S(t2) {
        let r2;
        if (!Array.isArray(t2)) return e.registerChunk(void 0, t2);
        let n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let l2 = n3 ?? u2, i2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (i2 || (l2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), i2 = true), t3.set(r4, l2));
            }
            r3 = o2 + 1;
          }
        }(t2, R)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : m(n2, y(n2), true);
      }
      u.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? m(t2.default, y(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), u.x = B, e = { registerChunk(e2, t2) {
        if (null == e2) throw Error("inline entry registration is not supported");
        let r2 = function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith(P) ? t3.slice(P.length) : t3;
        }(e2);
        q.add(r2), function(e3) {
          let t3 = I.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && H(r3.runtimeModuleIds, r3.chunkPath);
            I.delete(e3);
          }
        }(r2), null != t2 && (0 === t2.otherChunks.length ? H(t2.runtimeModuleIds, r2) : function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = w(e4);
            if (q.has(t4)) continue;
            n2.add(t4);
            let r4 = I.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), I.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && H(o2.runtimeModuleIds, o2.chunkPath);
        }(r2, t2.otherChunks.filter((e3) => function(e4) {
          let t3, r3 = e4.indexOf("?");
          if (-1 !== r3) t3 = r3;
          else {
            let r4 = e4.indexOf("#");
            t3 = -1 !== r4 ? r4 : e4.length;
          }
          return t3 >= 3 && e4.startsWith(".js", t3 - 3);
        }(w(e3))), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      } };
      let q = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Map();
      function H(e2, t2) {
        for (let n2 of e2) !function(e3, t3) {
          let n3 = A[t3];
          if (n3) {
            if (n3.error) throw n3.error;
            return;
          }
          N(t3, r.Runtime, e3);
        }(t2, n2);
      }
      var L = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: S }, L.forEach(S);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    require_root_of_the_server_0o5yty();
    require_root_of_the_server_1d6cwet();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1a_4w75();
  }
});

// node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "**" }], "qualities": [75], "unoptimized": false, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "C:\\Eimsky\\my\\tinytods", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "experimental": { "appNewScrollHandler": true, "coldCacheBadge": false, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "useOffline": false, "varyParams": true, "optimisticRouting": true, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "globalNotFound": false, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.js", "repoRoot": "C:\\Eimsky\\my\\tinytods", "turbopack": { "root": "C:\\Eimsky\\my\\tinytods" }, "distDirRoot": ".next" };
var BuildId = "DuiwnsLxtfUHN7hHPweNt";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/dashboard", "regex": "^/admin/dashboard(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/dashboard(?:/)?$" }, { "page": "/admin/login", "regex": "^/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/login(?:/)?$" }, { "page": "/admin/orders", "regex": "^/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/orders(?:/)?$" }, { "page": "/admin/products", "regex": "^/admin/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products(?:/)?$" }, { "page": "/admin/products/new", "regex": "^/admin/products/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/products/new(?:/)?$" }, { "page": "/admin/signup", "regex": "^/admin/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/signup(?:/)?$" }, { "page": "/api/admin/auth/login", "regex": "^/api/admin/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/login(?:/)?$" }, { "page": "/api/admin/auth/logout", "regex": "^/api/admin/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/logout(?:/)?$" }, { "page": "/api/admin/auth/me", "regex": "^/api/admin/auth/me(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/me(?:/)?$" }, { "page": "/api/admin/auth/signup", "regex": "^/api/admin/auth/signup(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/signup(?:/)?$" }, { "page": "/api/admin/categories", "regex": "^/api/admin/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/categories(?:/)?$" }, { "page": "/api/admin/orders", "regex": "^/api/admin/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/orders(?:/)?$" }, { "page": "/api/admin/products", "regex": "^/api/admin/products(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/products(?:/)?$" }, { "page": "/api/admin/stats", "regex": "^/api/admin/stats(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/stats(?:/)?$" }, { "page": "/api/admin/uploads/images", "regex": "^/api/admin/uploads/images(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/uploads/images(?:/)?$" }, { "page": "/api/orders", "regex": "^/api/orders(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/orders(?:/)?$" }, { "page": "/apple-icon.png", "regex": "^/apple\\-icon\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/apple\\-icon\\.png(?:/)?$" }, { "page": "/cart", "regex": "^/cart(?:/)?$", "routeKeys": {}, "namedRegex": "^/cart(?:/)?$" }, { "page": "/categories", "regex": "^/categories(?:/)?$", "routeKeys": {}, "namedRegex": "^/categories(?:/)?$" }, { "page": "/checkout", "regex": "^/checkout(?:/)?$", "routeKeys": {}, "namedRegex": "^/checkout(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/icon.png", "regex": "^/icon\\.png(?:/)?$", "routeKeys": {}, "namedRegex": "^/icon\\.png(?:/)?$" }, { "page": "/offers", "regex": "^/offers(?:/)?$", "routeKeys": {}, "namedRegex": "^/offers(?:/)?$" }, { "page": "/order-confirmation", "regex": "^/order\\-confirmation(?:/)?$", "routeKeys": {}, "namedRegex": "^/order\\-confirmation(?:/)?$" }], "dynamic": [{ "page": "/admin/orders/[id]", "regex": "^/admin/orders/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/orders/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/admin/products/[id]/edit", "regex": "^/admin/products/([^/]+?)/edit(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/admin/products/(?<nxtPid>[^/]+?)/edit(?:/)?$" }, { "page": "/api/admin/orders/[id]", "regex": "^/api/admin/orders/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/orders/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/admin/products/[id]", "regex": "^/api/admin/products/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/products/(?<nxtPid>[^/]+?)(?:/)?$" }, { "page": "/api/orders/[orderNumber]", "regex": "^/api/orders/([^/]+?)(?:/)?$", "routeKeys": { "nxtPorderNumber": "nxtPorderNumber" }, "namedRegex": "^/api/orders/(?<nxtPorderNumber>[^/]+?)(?:/)?$" }, { "page": "/product/[id]", "regex": "^/product/([^/]+?)(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/product/(?<nxtPid>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 129215, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/", "dataRoute": "/index.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 9184, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/_not-found": { "initialStatus": 404, "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 10955, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_not-found", "dataRoute": "/_not-found.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/about": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 47040, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/about", "dataRoute": "/about.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 8667, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin", "dataRoute": "/admin.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/login": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 10732, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/login", "dataRoute": "/admin/login.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/admin/signup": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 15071, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/admin/signup", "dataRoute": "/admin/signup.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/apple-icon.png": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/apple-icon.png/layout,_N_T_/apple-icon.png/route,_N_T_/apple-icon.png" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/apple-icon.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/cart": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 30996, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/cart", "dataRoute": "/cart.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/categories": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 83484, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/categories", "dataRoute": "/categories.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/checkout": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 31004, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/checkout", "dataRoute": "/checkout.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/contact": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 43915, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/contact", "dataRoute": "/contact.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/icon.png": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/png", "x-next-cache-tags": "_N_T_/layout,_N_T_/icon.png/layout,_N_T_/icon.png/route,_N_T_/icon.png" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/icon.png", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/offers": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 45436, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/offers", "dataRoute": "/offers.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/order-confirmation": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 30754, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/order-confirmation", "dataRoute": "/order-confirmation.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "1f6aa7c5dfdc9f5e8bb3e14a0e10d4b3", "previewModeSigningKey": "a2cb4e38ec00c27c8abd488d62050d49ec14ac9ec770ae9ef2307520b9131f75", "previewModeEncryptionKey": "5e173d5d95dcf8c26702ee34c6e83454b5a99dfdd2354e76456b22bf8d0fa4f1" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__0o5yty_._.js", "server/edge/chunks/[root-of-the-server]__1d6cwet._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1a-4w75.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1a-4w75.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/admin/:path*" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "DuiwnsLxtfUHN7hHPweNt", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "iQD21E2/UkfdhCLBAvpA1fuvJnGKn/voMCx2kLUkeAg=", "__NEXT_PREVIEW_MODE_ID": "1f6aa7c5dfdc9f5e8bb3e14a0e10d4b3", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "5e173d5d95dcf8c26702ee34c6e83454b5a99dfdd2354e76456b22bf8d0fa4f1", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a2cb4e38ec00c27c8abd488d62050d49ec14ac9ec770ae9ef2307520b9131f75" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/(storefront)/about/page": "/about", "/(storefront)/cart/page": "/cart", "/(storefront)/categories/page": "/categories", "/(storefront)/checkout/page": "/checkout", "/(storefront)/contact/page": "/contact", "/(storefront)/offers/page": "/offers", "/(storefront)/order-confirmation/page": "/order-confirmation", "/(storefront)/page": "/", "/(storefront)/product/[id]/page": "/product/[id]", "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/admin/(dashboard)/dashboard/page": "/admin/dashboard", "/admin/(dashboard)/orders/[id]/page": "/admin/orders/[id]", "/admin/(dashboard)/orders/page": "/admin/orders", "/admin/(dashboard)/products/[id]/edit/page": "/admin/products/[id]/edit", "/admin/(dashboard)/products/new/page": "/admin/products/new", "/admin/(dashboard)/products/page": "/admin/products", "/admin/login/page": "/admin/login", "/admin/page": "/admin", "/admin/signup/page": "/admin/signup", "/api/admin/auth/login/route": "/api/admin/auth/login", "/api/admin/auth/logout/route": "/api/admin/auth/logout", "/api/admin/auth/me/route": "/api/admin/auth/me", "/api/admin/auth/signup/route": "/api/admin/auth/signup", "/api/admin/categories/route": "/api/admin/categories", "/api/admin/orders/[id]/route": "/api/admin/orders/[id]", "/api/admin/orders/route": "/api/admin/orders", "/api/admin/products/[id]/route": "/api/admin/products/[id]", "/api/admin/products/route": "/api/admin/products", "/api/admin/stats/route": "/api/admin/stats", "/api/admin/uploads/images/route": "/api/admin/uploads/images", "/api/orders/[orderNumber]/route": "/api/orders/[orderNumber]", "/api/orders/route": "/api/orders", "/apple-icon.png/route": "/apple-icon.png", "/favicon.ico/route": "/favicon.ico", "/icon.png/route": "/icon.png" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/404": "pages/404.html", "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = NextConfig.deploymentId ?? BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: url.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

// node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    delete value.meta?.headers?.[CACHE_TAGS_HEADER];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified, isStaleFromTagCache = false) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  const isStaleFromTime = !isSSG && remainingTtl === 1;
  const isStale2 = isStaleFromTime || isStaleFromTagCache;
  if (!isSSG || isStaleFromTagCache) {
    const sMaxAge = isStaleFromTagCache ? 1 : remainingTtl;
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate,
      isStaleFromTagCache
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
  const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {}) && !NextConfig.experimental?.prefetchInlining;
  if (isSegmentResponse) {
    return {
      body: cachedValue.segmentData[segmentHeader],
      additionalHeaders: {
        [NEXT_PRERENDER_HEADER]: "1",
        [NEXT_POSTPONED_HEADER]: "2"
      }
    };
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, localizedPath, cachedValue, lastModified, isStaleFromTagCache = false) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified, isStaleFromTagCache);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...cachedValue.meta?.headers,
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  const cacheKey = localizedPath === "/" ? "/index" : localizedPath;
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const tags = getTagsFromValue(cachedData.value);
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(cacheKey, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const _isStale = cachedData.shouldBypassTagCache ? false : await isStale(cacheKey, tags, cachedData.lastModified ?? Date.now());
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, localizedPath, cachedData.value, cachedData.lastModified, _isStale);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified, _isStale);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...cachedData.value.meta?.headers,
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !(event.query.__nextDataReq === "1") && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie();
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length"
];
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
