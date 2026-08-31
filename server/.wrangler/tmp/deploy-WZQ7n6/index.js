var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
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

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedAsync(name) {
  const fn = /* @__PURE__ */ notImplemented(name);
  fn.__promisify__ = () => /* @__PURE__ */ notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      static {
        __name(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
      static {
        __name(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming = class extends PerformanceEntry {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance = class {
      static {
        __name(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver = class {
      static {
        __name(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    if (!("__unenv__" in performance)) {
      const proto = Performance.prototype;
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (key !== "constructor" && !(key in performance)) {
          const desc = Object.getOwnPropertyDescriptor(proto, key);
          if (desc) {
            Object.defineProperty(performance, key, desc);
          }
        }
      }
    }
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream;
var init_read_stream = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class {
      static {
        __name(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream;
var init_write_stream = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class {
      static {
        __name(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd) {
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION;
var init_node_version = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION = "22.14.0";
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process = class _Process extends EventEmitter {
      static {
        __name(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION}`;
      }
      get versions() {
        return { node: NODE_VERSION };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, workerdProcess, unenvProcess, exit, features, platform, _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert2, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime3, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions, _process, process_default;
var init_process2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule("node:process");
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess.nextTick
    });
    ({ exit, features, platform } = workerdProcess);
    ({
      _channel,
      _debugEnd,
      _debugProcess,
      _disconnect,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _handleQueue,
      _kill,
      _linkedBinding,
      _maxListeners,
      _pendingMessage,
      _preload_modules,
      _rawDebug,
      _send,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert2,
      availableMemory,
      binding,
      channel,
      chdir,
      config,
      connected,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      disconnect,
      dlopen,
      domain,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exitCode,
      finalization,
      getActiveResourcesInfo,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getMaxListeners,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime: hrtime3,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      mainModule,
      memoryUsage,
      moduleLoadList,
      nextTick,
      off,
      on,
      once,
      openStdin,
      permission,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      ref,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      send,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setMaxListeners,
      setSourceMapsEnabled,
      setuid,
      setUncaughtExceptionCaptureCallback,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      throwDeprecation,
      title,
      traceDeprecation,
      umask,
      unref,
      uptime,
      version,
      versions
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// node-built-in-modules:crypto
import libDefault from "crypto";
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// node_modules/bcryptjs/dist/bcrypt.js
var require_bcrypt = __commonJS({
  "node_modules/bcryptjs/dist/bcrypt.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(global2, factory) {
      if (typeof define === "function" && define["amd"])
        define([], factory);
      else if (typeof __require === "function" && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
      else
        (global2["dcodeIO"] = global2["dcodeIO"] || {})["bcrypt"] = factory();
    })(exports, function() {
      "use strict";
      var bcrypt2 = {};
      var randomFallback = null;
      function random(len) {
        if (typeof module !== "undefined" && module && module["exports"])
          try {
            return require_crypto()["randomBytes"](len);
          } catch (e) {
          }
        try {
          var a;
          (self["crypto"] || self["msCrypto"])["getRandomValues"](a = new Uint32Array(len));
          return Array.prototype.slice.call(a);
        } catch (e) {
        }
        if (!randomFallback)
          throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
        return randomFallback(len);
      }
      __name(random, "random");
      var randomAvailable = false;
      try {
        random(1);
        randomAvailable = true;
      } catch (e) {
      }
      randomFallback = null;
      bcrypt2.setRandomFallback = function(random2) {
        randomFallback = random2;
      };
      bcrypt2.genSaltSync = function(rounds, seed_length) {
        rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof rounds !== "number")
          throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
        if (rounds < 4)
          rounds = 4;
        else if (rounds > 31)
          rounds = 31;
        var salt = [];
        salt.push("$2a$");
        if (rounds < 10)
          salt.push("0");
        salt.push(rounds.toString());
        salt.push("$");
        salt.push(base64_encode(random(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN));
        return salt.join("");
      };
      bcrypt2.genSalt = function(rounds, seed_length, callback) {
        if (typeof seed_length === "function")
          callback = seed_length, seed_length = void 0;
        if (typeof rounds === "function")
          callback = rounds, rounds = void 0;
        if (typeof rounds === "undefined")
          rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
        else if (typeof rounds !== "number")
          throw Error("illegal arguments: " + typeof rounds);
        function _async(callback2) {
          nextTick2(function() {
            try {
              callback2(null, bcrypt2.genSaltSync(rounds));
            } catch (err) {
              callback2(err);
            }
          });
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.hashSync = function(s, salt) {
        if (typeof salt === "undefined")
          salt = GENSALT_DEFAULT_LOG2_ROUNDS;
        if (typeof salt === "number")
          salt = bcrypt2.genSaltSync(salt);
        if (typeof s !== "string" || typeof salt !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof salt);
        return _hash(s, salt);
      };
      bcrypt2.hash = function(s, salt, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s === "string" && typeof salt === "number")
            bcrypt2.genSalt(salt, function(err, salt2) {
              _hash(s, salt2, callback2, progressCallback);
            });
          else if (typeof s === "string" && typeof salt === "string")
            _hash(s, salt, callback2, progressCallback);
          else
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof salt)));
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      function safeStringCompare(known, unknown) {
        var right = 0, wrong = 0;
        for (var i = 0, k = known.length; i < k; ++i) {
          if (known.charCodeAt(i) === unknown.charCodeAt(i))
            ++right;
          else
            ++wrong;
        }
        if (right < 0)
          return false;
        return wrong === 0;
      }
      __name(safeStringCompare, "safeStringCompare");
      bcrypt2.compareSync = function(s, hash) {
        if (typeof s !== "string" || typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof s + ", " + typeof hash);
        if (hash.length !== 60)
          return false;
        return safeStringCompare(bcrypt2.hashSync(s, hash.substr(0, hash.length - 31)), hash);
      };
      bcrypt2.compare = function(s, hash, callback, progressCallback) {
        function _async(callback2) {
          if (typeof s !== "string" || typeof hash !== "string") {
            nextTick2(callback2.bind(this, Error("Illegal arguments: " + typeof s + ", " + typeof hash)));
            return;
          }
          if (hash.length !== 60) {
            nextTick2(callback2.bind(this, null, false));
            return;
          }
          bcrypt2.hash(s, hash.substr(0, 29), function(err, comp) {
            if (err)
              callback2(err);
            else
              callback2(null, safeStringCompare(comp, hash));
          }, progressCallback);
        }
        __name(_async, "_async");
        if (callback) {
          if (typeof callback !== "function")
            throw Error("Illegal callback: " + typeof callback);
          _async(callback);
        } else
          return new Promise(function(resolve, reject) {
            _async(function(err, res) {
              if (err) {
                reject(err);
                return;
              }
              resolve(res);
            });
          });
      };
      bcrypt2.getRounds = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        return parseInt(hash.split("$")[2], 10);
      };
      bcrypt2.getSalt = function(hash) {
        if (typeof hash !== "string")
          throw Error("Illegal arguments: " + typeof hash);
        if (hash.length !== 60)
          throw Error("Illegal hash length: " + hash.length + " != 60");
        return hash.substring(0, 29);
      };
      var nextTick2 = typeof process !== "undefined" && process && typeof process.nextTick === "function" ? typeof setImmediate === "function" ? setImmediate : process.nextTick : setTimeout;
      function stringToBytes(str) {
        var out = [], i = 0;
        utfx.encodeUTF16toUTF8(function() {
          if (i >= str.length) return null;
          return str.charCodeAt(i++);
        }, function(b) {
          out.push(b);
        });
        return out;
      }
      __name(stringToBytes, "stringToBytes");
      var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
      var BASE64_INDEX = [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        1,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        -1,
        -1,
        -1,
        -1,
        -1
      ];
      var stringFromCharCode = String.fromCharCode;
      function base64_encode(b, len) {
        var off2 = 0, rs = [], c1, c2;
        if (len <= 0 || len > b.length)
          throw Error("Illegal len: " + len);
        while (off2 < len) {
          c1 = b[off2++] & 255;
          rs.push(BASE64_CODE[c1 >> 2 & 63]);
          c1 = (c1 & 3) << 4;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 4 & 15;
          rs.push(BASE64_CODE[c1 & 63]);
          c1 = (c2 & 15) << 2;
          if (off2 >= len) {
            rs.push(BASE64_CODE[c1 & 63]);
            break;
          }
          c2 = b[off2++] & 255;
          c1 |= c2 >> 6 & 3;
          rs.push(BASE64_CODE[c1 & 63]);
          rs.push(BASE64_CODE[c2 & 63]);
        }
        return rs.join("");
      }
      __name(base64_encode, "base64_encode");
      function base64_decode(s, len) {
        var off2 = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
        if (len <= 0)
          throw Error("Illegal len: " + len);
        while (off2 < slen - 1 && olen < len) {
          code = s.charCodeAt(off2++);
          c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          code = s.charCodeAt(off2++);
          c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c1 == -1 || c2 == -1)
            break;
          o = c1 << 2 >>> 0;
          o |= (c2 & 48) >> 4;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          if (c3 == -1)
            break;
          o = (c2 & 15) << 4 >>> 0;
          o |= (c3 & 60) >> 2;
          rs.push(stringFromCharCode(o));
          if (++olen >= len || off2 >= slen)
            break;
          code = s.charCodeAt(off2++);
          c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
          o = (c3 & 3) << 6 >>> 0;
          o |= c4;
          rs.push(stringFromCharCode(o));
          ++olen;
        }
        var res = [];
        for (off2 = 0; off2 < olen; off2++)
          res.push(rs[off2].charCodeAt(0));
        return res;
      }
      __name(base64_decode, "base64_decode");
      var utfx = (function() {
        "use strict";
        var utfx2 = {};
        utfx2.MAX_CODEPOINT = 1114111;
        utfx2.encodeUTF8 = function(src, dst) {
          var cp3 = null;
          if (typeof src === "number")
            cp3 = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp3 !== null || (cp3 = src()) !== null) {
            if (cp3 < 128)
              dst(cp3 & 127);
            else if (cp3 < 2048)
              dst(cp3 >> 6 & 31 | 192), dst(cp3 & 63 | 128);
            else if (cp3 < 65536)
              dst(cp3 >> 12 & 15 | 224), dst(cp3 >> 6 & 63 | 128), dst(cp3 & 63 | 128);
            else
              dst(cp3 >> 18 & 7 | 240), dst(cp3 >> 12 & 63 | 128), dst(cp3 >> 6 & 63 | 128), dst(cp3 & 63 | 128);
            cp3 = null;
          }
        };
        utfx2.decodeUTF8 = function(src, dst) {
          var a, b, c, d, fail = /* @__PURE__ */ __name(function(b2) {
            b2 = b2.slice(0, b2.indexOf(null));
            var err = Error(b2.toString());
            err.name = "TruncatedError";
            err["bytes"] = b2;
            throw err;
          }, "fail");
          while ((a = src()) !== null) {
            if ((a & 128) === 0)
              dst(a);
            else if ((a & 224) === 192)
              (b = src()) === null && fail([a, b]), dst((a & 31) << 6 | b & 63);
            else if ((a & 240) === 224)
              ((b = src()) === null || (c = src()) === null) && fail([a, b, c]), dst((a & 15) << 12 | (b & 63) << 6 | c & 63);
            else if ((a & 248) === 240)
              ((b = src()) === null || (c = src()) === null || (d = src()) === null) && fail([a, b, c, d]), dst((a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63);
            else throw RangeError("Illegal starting byte: " + a);
          }
        };
        utfx2.UTF16toUTF8 = function(src, dst) {
          var c1, c2 = null;
          while (true) {
            if ((c1 = c2 !== null ? c2 : src()) === null)
              break;
            if (c1 >= 55296 && c1 <= 57343) {
              if ((c2 = src()) !== null) {
                if (c2 >= 56320 && c2 <= 57343) {
                  dst((c1 - 55296) * 1024 + c2 - 56320 + 65536);
                  c2 = null;
                  continue;
                }
              }
            }
            dst(c1);
          }
          if (c2 !== null) dst(c2);
        };
        utfx2.UTF8toUTF16 = function(src, dst) {
          var cp3 = null;
          if (typeof src === "number")
            cp3 = src, src = /* @__PURE__ */ __name(function() {
              return null;
            }, "src");
          while (cp3 !== null || (cp3 = src()) !== null) {
            if (cp3 <= 65535)
              dst(cp3);
            else
              cp3 -= 65536, dst((cp3 >> 10) + 55296), dst(cp3 % 1024 + 56320);
            cp3 = null;
          }
        };
        utfx2.encodeUTF16toUTF8 = function(src, dst) {
          utfx2.UTF16toUTF8(src, function(cp3) {
            utfx2.encodeUTF8(cp3, dst);
          });
        };
        utfx2.decodeUTF8toUTF16 = function(src, dst) {
          utfx2.decodeUTF8(src, function(cp3) {
            utfx2.UTF8toUTF16(cp3, dst);
          });
        };
        utfx2.calculateCodePoint = function(cp3) {
          return cp3 < 128 ? 1 : cp3 < 2048 ? 2 : cp3 < 65536 ? 3 : 4;
        };
        utfx2.calculateUTF8 = function(src) {
          var cp3, l = 0;
          while ((cp3 = src()) !== null)
            l += utfx2.calculateCodePoint(cp3);
          return l;
        };
        utfx2.calculateUTF16asUTF8 = function(src) {
          var n = 0, l = 0;
          utfx2.UTF16toUTF8(src, function(cp3) {
            ++n;
            l += utfx2.calculateCodePoint(cp3);
          });
          return [n, l];
        };
        return utfx2;
      })();
      Date.now = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      var BCRYPT_SALT_LEN = 16;
      var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
      var BLOWFISH_NUM_ROUNDS = 16;
      var MAX_EXECUTION_TIME = 100;
      var P_ORIG = [
        608135816,
        2242054355,
        320440878,
        57701188,
        2752067618,
        698298832,
        137296536,
        3964562569,
        1160258022,
        953160567,
        3193202383,
        887688300,
        3232508343,
        3380367581,
        1065670069,
        3041331479,
        2450970073,
        2306472731
      ];
      var S_ORIG = [
        3509652390,
        2564797868,
        805139163,
        3491422135,
        3101798381,
        1780907670,
        3128725573,
        4046225305,
        614570311,
        3012652279,
        134345442,
        2240740374,
        1667834072,
        1901547113,
        2757295779,
        4103290238,
        227898511,
        1921955416,
        1904987480,
        2182433518,
        2069144605,
        3260701109,
        2620446009,
        720527379,
        3318853667,
        677414384,
        3393288472,
        3101374703,
        2390351024,
        1614419982,
        1822297739,
        2954791486,
        3608508353,
        3174124327,
        2024746970,
        1432378464,
        3864339955,
        2857741204,
        1464375394,
        1676153920,
        1439316330,
        715854006,
        3033291828,
        289532110,
        2706671279,
        2087905683,
        3018724369,
        1668267050,
        732546397,
        1947742710,
        3462151702,
        2609353502,
        2950085171,
        1814351708,
        2050118529,
        680887927,
        999245976,
        1800124847,
        3300911131,
        1713906067,
        1641548236,
        4213287313,
        1216130144,
        1575780402,
        4018429277,
        3917837745,
        3693486850,
        3949271944,
        596196993,
        3549867205,
        258830323,
        2213823033,
        772490370,
        2760122372,
        1774776394,
        2652871518,
        566650946,
        4142492826,
        1728879713,
        2882767088,
        1783734482,
        3629395816,
        2517608232,
        2874225571,
        1861159788,
        326777828,
        3124490320,
        2130389656,
        2716951837,
        967770486,
        1724537150,
        2185432712,
        2364442137,
        1164943284,
        2105845187,
        998989502,
        3765401048,
        2244026483,
        1075463327,
        1455516326,
        1322494562,
        910128902,
        469688178,
        1117454909,
        936433444,
        3490320968,
        3675253459,
        1240580251,
        122909385,
        2157517691,
        634681816,
        4142456567,
        3825094682,
        3061402683,
        2540495037,
        79693498,
        3249098678,
        1084186820,
        1583128258,
        426386531,
        1761308591,
        1047286709,
        322548459,
        995290223,
        1845252383,
        2603652396,
        3431023940,
        2942221577,
        3202600964,
        3727903485,
        1712269319,
        422464435,
        3234572375,
        1170764815,
        3523960633,
        3117677531,
        1434042557,
        442511882,
        3600875718,
        1076654713,
        1738483198,
        4213154764,
        2393238008,
        3677496056,
        1014306527,
        4251020053,
        793779912,
        2902807211,
        842905082,
        4246964064,
        1395751752,
        1040244610,
        2656851899,
        3396308128,
        445077038,
        3742853595,
        3577915638,
        679411651,
        2892444358,
        2354009459,
        1767581616,
        3150600392,
        3791627101,
        3102740896,
        284835224,
        4246832056,
        1258075500,
        768725851,
        2589189241,
        3069724005,
        3532540348,
        1274779536,
        3789419226,
        2764799539,
        1660621633,
        3471099624,
        4011903706,
        913787905,
        3497959166,
        737222580,
        2514213453,
        2928710040,
        3937242737,
        1804850592,
        3499020752,
        2949064160,
        2386320175,
        2390070455,
        2415321851,
        4061277028,
        2290661394,
        2416832540,
        1336762016,
        1754252060,
        3520065937,
        3014181293,
        791618072,
        3188594551,
        3933548030,
        2332172193,
        3852520463,
        3043980520,
        413987798,
        3465142937,
        3030929376,
        4245938359,
        2093235073,
        3534596313,
        375366246,
        2157278981,
        2479649556,
        555357303,
        3870105701,
        2008414854,
        3344188149,
        4221384143,
        3956125452,
        2067696032,
        3594591187,
        2921233993,
        2428461,
        544322398,
        577241275,
        1471733935,
        610547355,
        4027169054,
        1432588573,
        1507829418,
        2025931657,
        3646575487,
        545086370,
        48609733,
        2200306550,
        1653985193,
        298326376,
        1316178497,
        3007786442,
        2064951626,
        458293330,
        2589141269,
        3591329599,
        3164325604,
        727753846,
        2179363840,
        146436021,
        1461446943,
        4069977195,
        705550613,
        3059967265,
        3887724982,
        4281599278,
        3313849956,
        1404054877,
        2845806497,
        146425753,
        1854211946,
        1266315497,
        3048417604,
        3681880366,
        3289982499,
        290971e4,
        1235738493,
        2632868024,
        2414719590,
        3970600049,
        1771706367,
        1449415276,
        3266420449,
        422970021,
        1963543593,
        2690192192,
        3826793022,
        1062508698,
        1531092325,
        1804592342,
        2583117782,
        2714934279,
        4024971509,
        1294809318,
        4028980673,
        1289560198,
        2221992742,
        1669523910,
        35572830,
        157838143,
        1052438473,
        1016535060,
        1802137761,
        1753167236,
        1386275462,
        3080475397,
        2857371447,
        1040679964,
        2145300060,
        2390574316,
        1461121720,
        2956646967,
        4031777805,
        4028374788,
        33600511,
        2920084762,
        1018524850,
        629373528,
        3691585981,
        3515945977,
        2091462646,
        2486323059,
        586499841,
        988145025,
        935516892,
        3367335476,
        2599673255,
        2839830854,
        265290510,
        3972581182,
        2759138881,
        3795373465,
        1005194799,
        847297441,
        406762289,
        1314163512,
        1332590856,
        1866599683,
        4127851711,
        750260880,
        613907577,
        1450815602,
        3165620655,
        3734664991,
        3650291728,
        3012275730,
        3704569646,
        1427272223,
        778793252,
        1343938022,
        2676280711,
        2052605720,
        1946737175,
        3164576444,
        3914038668,
        3967478842,
        3682934266,
        1661551462,
        3294938066,
        4011595847,
        840292616,
        3712170807,
        616741398,
        312560963,
        711312465,
        1351876610,
        322626781,
        1910503582,
        271666773,
        2175563734,
        1594956187,
        70604529,
        3617834859,
        1007753275,
        1495573769,
        4069517037,
        2549218298,
        2663038764,
        504708206,
        2263041392,
        3941167025,
        2249088522,
        1514023603,
        1998579484,
        1312622330,
        694541497,
        2582060303,
        2151582166,
        1382467621,
        776784248,
        2618340202,
        3323268794,
        2497899128,
        2784771155,
        503983604,
        4076293799,
        907881277,
        423175695,
        432175456,
        1378068232,
        4145222326,
        3954048622,
        3938656102,
        3820766613,
        2793130115,
        2977904593,
        26017576,
        3274890735,
        3194772133,
        1700274565,
        1756076034,
        4006520079,
        3677328699,
        720338349,
        1533947780,
        354530856,
        688349552,
        3973924725,
        1637815568,
        332179504,
        3949051286,
        53804574,
        2852348879,
        3044236432,
        1282449977,
        3583942155,
        3416972820,
        4006381244,
        1617046695,
        2628476075,
        3002303598,
        1686838959,
        431878346,
        2686675385,
        1700445008,
        1080580658,
        1009431731,
        832498133,
        3223435511,
        2605976345,
        2271191193,
        2516031870,
        1648197032,
        4164389018,
        2548247927,
        300782431,
        375919233,
        238389289,
        3353747414,
        2531188641,
        2019080857,
        1475708069,
        455242339,
        2609103871,
        448939670,
        3451063019,
        1395535956,
        2413381860,
        1841049896,
        1491858159,
        885456874,
        4264095073,
        4001119347,
        1565136089,
        3898914787,
        1108368660,
        540939232,
        1173283510,
        2745871338,
        3681308437,
        4207628240,
        3343053890,
        4016749493,
        1699691293,
        1103962373,
        3625875870,
        2256883143,
        3830138730,
        1031889488,
        3479347698,
        1535977030,
        4236805024,
        3251091107,
        2132092099,
        1774941330,
        1199868427,
        1452454533,
        157007616,
        2904115357,
        342012276,
        595725824,
        1480756522,
        206960106,
        497939518,
        591360097,
        863170706,
        2375253569,
        3596610801,
        1814182875,
        2094937945,
        3421402208,
        1082520231,
        3463918190,
        2785509508,
        435703966,
        3908032597,
        1641649973,
        2842273706,
        3305899714,
        1510255612,
        2148256476,
        2655287854,
        3276092548,
        4258621189,
        236887753,
        3681803219,
        274041037,
        1734335097,
        3815195456,
        3317970021,
        1899903192,
        1026095262,
        4050517792,
        356393447,
        2410691914,
        3873677099,
        3682840055,
        3913112168,
        2491498743,
        4132185628,
        2489919796,
        1091903735,
        1979897079,
        3170134830,
        3567386728,
        3557303409,
        857797738,
        1136121015,
        1342202287,
        507115054,
        2535736646,
        337727348,
        3213592640,
        1301675037,
        2528481711,
        1895095763,
        1721773893,
        3216771564,
        62756741,
        2142006736,
        835421444,
        2531993523,
        1442658625,
        3659876326,
        2882144922,
        676362277,
        1392781812,
        170690266,
        3921047035,
        1759253602,
        3611846912,
        1745797284,
        664899054,
        1329594018,
        3901205900,
        3045908486,
        2062866102,
        2865634940,
        3543621612,
        3464012697,
        1080764994,
        553557557,
        3656615353,
        3996768171,
        991055499,
        499776247,
        1265440854,
        648242737,
        3940784050,
        980351604,
        3713745714,
        1749149687,
        3396870395,
        4211799374,
        3640570775,
        1161844396,
        3125318951,
        1431517754,
        545492359,
        4268468663,
        3499529547,
        1437099964,
        2702547544,
        3433638243,
        2581715763,
        2787789398,
        1060185593,
        1593081372,
        2418618748,
        4260947970,
        69676912,
        2159744348,
        86519011,
        2512459080,
        3838209314,
        1220612927,
        3339683548,
        133810670,
        1090789135,
        1078426020,
        1569222167,
        845107691,
        3583754449,
        4072456591,
        1091646820,
        628848692,
        1613405280,
        3757631651,
        526609435,
        236106946,
        48312990,
        2942717905,
        3402727701,
        1797494240,
        859738849,
        992217954,
        4005476642,
        2243076622,
        3870952857,
        3732016268,
        765654824,
        3490871365,
        2511836413,
        1685915746,
        3888969200,
        1414112111,
        2273134842,
        3281911079,
        4080962846,
        172450625,
        2569994100,
        980381355,
        4109958455,
        2819808352,
        2716589560,
        2568741196,
        3681446669,
        3329971472,
        1835478071,
        660984891,
        3704678404,
        4045999559,
        3422617507,
        3040415634,
        1762651403,
        1719377915,
        3470491036,
        2693910283,
        3642056355,
        3138596744,
        1364962596,
        2073328063,
        1983633131,
        926494387,
        3423689081,
        2150032023,
        4096667949,
        1749200295,
        3328846651,
        309677260,
        2016342300,
        1779581495,
        3079819751,
        111262694,
        1274766160,
        443224088,
        298511866,
        1025883608,
        3806446537,
        1145181785,
        168956806,
        3641502830,
        3584813610,
        1689216846,
        3666258015,
        3200248200,
        1692713982,
        2646376535,
        4042768518,
        1618508792,
        1610833997,
        3523052358,
        4130873264,
        2001055236,
        3610705100,
        2202168115,
        4028541809,
        2961195399,
        1006657119,
        2006996926,
        3186142756,
        1430667929,
        3210227297,
        1314452623,
        4074634658,
        4101304120,
        2273951170,
        1399257539,
        3367210612,
        3027628629,
        1190975929,
        2062231137,
        2333990788,
        2221543033,
        2438960610,
        1181637006,
        548689776,
        2362791313,
        3372408396,
        3104550113,
        3145860560,
        296247880,
        1970579870,
        3078560182,
        3769228297,
        1714227617,
        3291629107,
        3898220290,
        166772364,
        1251581989,
        493813264,
        448347421,
        195405023,
        2709975567,
        677966185,
        3703036547,
        1463355134,
        2715995803,
        1338867538,
        1343315457,
        2802222074,
        2684532164,
        233230375,
        2599980071,
        2000651841,
        3277868038,
        1638401717,
        4028070440,
        3237316320,
        6314154,
        819756386,
        300326615,
        590932579,
        1405279636,
        3267499572,
        3150704214,
        2428286686,
        3959192993,
        3461946742,
        1862657033,
        1266418056,
        963775037,
        2089974820,
        2263052895,
        1917689273,
        448879540,
        3550394620,
        3981727096,
        150775221,
        3627908307,
        1303187396,
        508620638,
        2975983352,
        2726630617,
        1817252668,
        1876281319,
        1457606340,
        908771278,
        3720792119,
        3617206836,
        2455994898,
        1729034894,
        1080033504,
        976866871,
        3556439503,
        2881648439,
        1522871579,
        1555064734,
        1336096578,
        3548522304,
        2579274686,
        3574697629,
        3205460757,
        3593280638,
        3338716283,
        3079412587,
        564236357,
        2993598910,
        1781952180,
        1464380207,
        3163844217,
        3332601554,
        1699332808,
        1393555694,
        1183702653,
        3581086237,
        1288719814,
        691649499,
        2847557200,
        2895455976,
        3193889540,
        2717570544,
        1781354906,
        1676643554,
        2592534050,
        3230253752,
        1126444790,
        2770207658,
        2633158820,
        2210423226,
        2615765581,
        2414155088,
        3127139286,
        673620729,
        2805611233,
        1269405062,
        4015350505,
        3341807571,
        4149409754,
        1057255273,
        2012875353,
        2162469141,
        2276492801,
        2601117357,
        993977747,
        3918593370,
        2654263191,
        753973209,
        36408145,
        2530585658,
        25011837,
        3520020182,
        2088578344,
        530523599,
        2918365339,
        1524020338,
        1518925132,
        3760827505,
        3759777254,
        1202760957,
        3985898139,
        3906192525,
        674977740,
        4174734889,
        2031300136,
        2019492241,
        3983892565,
        4153806404,
        3822280332,
        352677332,
        2297720250,
        60907813,
        90501309,
        3286998549,
        1016092578,
        2535922412,
        2839152426,
        457141659,
        509813237,
        4120667899,
        652014361,
        1966332200,
        2975202805,
        55981186,
        2327461051,
        676427537,
        3255491064,
        2882294119,
        3433927263,
        1307055953,
        942726286,
        933058658,
        2468411793,
        3933900994,
        4215176142,
        1361170020,
        2001714738,
        2830558078,
        3274259782,
        1222529897,
        1679025792,
        2729314320,
        3714953764,
        1770335741,
        151462246,
        3013232138,
        1682292957,
        1483529935,
        471910574,
        1539241949,
        458788160,
        3436315007,
        1807016891,
        3718408830,
        978976581,
        1043663428,
        3165965781,
        1927990952,
        4200891579,
        2372276910,
        3208408903,
        3533431907,
        1412390302,
        2931980059,
        4132332400,
        1947078029,
        3881505623,
        4168226417,
        2941484381,
        1077988104,
        1320477388,
        886195818,
        18198404,
        3786409e3,
        2509781533,
        112762804,
        3463356488,
        1866414978,
        891333506,
        18488651,
        661792760,
        1628790961,
        3885187036,
        3141171499,
        876946877,
        2693282273,
        1372485963,
        791857591,
        2686433993,
        3759982718,
        3167212022,
        3472953795,
        2716379847,
        445679433,
        3561995674,
        3504004811,
        3574258232,
        54117162,
        3331405415,
        2381918588,
        3769707343,
        4154350007,
        1140177722,
        4074052095,
        668550556,
        3214352940,
        367459370,
        261225585,
        2610173221,
        4209349473,
        3468074219,
        3265815641,
        314222801,
        3066103646,
        3808782860,
        282218597,
        3406013506,
        3773591054,
        379116347,
        1285071038,
        846784868,
        2669647154,
        3771962079,
        3550491691,
        2305946142,
        453669953,
        1268987020,
        3317592352,
        3279303384,
        3744833421,
        2610507566,
        3859509063,
        266596637,
        3847019092,
        517658769,
        3462560207,
        3443424879,
        370717030,
        4247526661,
        2224018117,
        4143653529,
        4112773975,
        2788324899,
        2477274417,
        1456262402,
        2901442914,
        1517677493,
        1846949527,
        2295493580,
        3734397586,
        2176403920,
        1280348187,
        1908823572,
        3871786941,
        846861322,
        1172426758,
        3287448474,
        3383383037,
        1655181056,
        3139813346,
        901632758,
        1897031941,
        2986607138,
        3066810236,
        3447102507,
        1393639104,
        373351379,
        950779232,
        625454576,
        3124240540,
        4148612726,
        2007998917,
        544563296,
        2244738638,
        2330496472,
        2058025392,
        1291430526,
        424198748,
        50039436,
        29584100,
        3605783033,
        2429876329,
        2791104160,
        1057563949,
        3255363231,
        3075367218,
        3463963227,
        1469046755,
        985887462
      ];
      var C_ORIG = [
        1332899944,
        1700884034,
        1701343084,
        1684370003,
        1668446532,
        1869963892
      ];
      function _encipher(lr, off2, P, S) {
        var n, l = lr[off2], r = lr[off2 + 1];
        l ^= P[0];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[1];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[2];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[3];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[4];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[5];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[6];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[7];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[8];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[9];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[10];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[11];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[12];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[13];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[14];
        n = S[l >>> 24];
        n += S[256 | l >> 16 & 255];
        n ^= S[512 | l >> 8 & 255];
        n += S[768 | l & 255];
        r ^= n ^ P[15];
        n = S[r >>> 24];
        n += S[256 | r >> 16 & 255];
        n ^= S[512 | r >> 8 & 255];
        n += S[768 | r & 255];
        l ^= n ^ P[16];
        lr[off2] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
        lr[off2 + 1] = l;
        return lr;
      }
      __name(_encipher, "_encipher");
      function _streamtoword(data, offp) {
        for (var i = 0, word = 0; i < 4; ++i)
          word = word << 8 | data[offp] & 255, offp = (offp + 1) % data.length;
        return { key: word, offp };
      }
      __name(_streamtoword, "_streamtoword");
      function _key(key, P, S) {
        var offset = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
        for (i = 0; i < plen; i += 2)
          lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_key, "_key");
      function _ekskey(data, key, P, S) {
        var offp = 0, lr = [0, 0], plen = P.length, slen = S.length, sw;
        for (var i = 0; i < plen; i++)
          sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
        offp = 0;
        for (i = 0; i < plen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
        for (i = 0; i < slen; i += 2)
          sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
      }
      __name(_ekskey, "_ekskey");
      function _crypt(b, salt, rounds, callback, progressCallback) {
        var cdata = C_ORIG.slice(), clen = cdata.length, err;
        if (rounds < 4 || rounds > 31) {
          err = Error("Illegal number of rounds (4-31): " + rounds);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.length !== BCRYPT_SALT_LEN) {
          err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        rounds = 1 << rounds >>> 0;
        var P, S, i = 0, j;
        if (Int32Array) {
          P = new Int32Array(P_ORIG);
          S = new Int32Array(S_ORIG);
        } else {
          P = P_ORIG.slice();
          S = S_ORIG.slice();
        }
        _ekskey(salt, b, P, S);
        function next() {
          if (progressCallback)
            progressCallback(i / rounds);
          if (i < rounds) {
            var start = Date.now();
            for (; i < rounds; ) {
              i = i + 1;
              _key(b, P, S);
              _key(salt, P, S);
              if (Date.now() - start > MAX_EXECUTION_TIME)
                break;
            }
          } else {
            for (i = 0; i < 64; i++)
              for (j = 0; j < clen >> 1; j++)
                _encipher(cdata, j << 1, P, S);
            var ret = [];
            for (i = 0; i < clen; i++)
              ret.push((cdata[i] >> 24 & 255) >>> 0), ret.push((cdata[i] >> 16 & 255) >>> 0), ret.push((cdata[i] >> 8 & 255) >>> 0), ret.push((cdata[i] & 255) >>> 0);
            if (callback) {
              callback(null, ret);
              return;
            } else
              return ret;
          }
          if (callback)
            nextTick2(next);
        }
        __name(next, "next");
        if (typeof callback !== "undefined") {
          next();
        } else {
          var res;
          while (true)
            if (typeof (res = next()) !== "undefined")
              return res || [];
        }
      }
      __name(_crypt, "_crypt");
      function _hash(s, salt, callback, progressCallback) {
        var err;
        if (typeof s !== "string" || typeof salt !== "string") {
          err = Error("Invalid string / salt: Not a string");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var minor, offset;
        if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
          err = Error("Invalid salt version: " + salt.substring(0, 2));
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        if (salt.charAt(2) === "$")
          minor = String.fromCharCode(0), offset = 3;
        else {
          minor = salt.charAt(2);
          if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
              nextTick2(callback.bind(this, err));
              return;
            } else
              throw err;
          }
          offset = 4;
        }
        if (salt.charAt(offset + 2) > "$") {
          err = Error("Missing salt rounds");
          if (callback) {
            nextTick2(callback.bind(this, err));
            return;
          } else
            throw err;
        }
        var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
        s += minor >= "a" ? "\0" : "";
        var passwordb = stringToBytes(s), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
        function finish(bytes2) {
          var res = [];
          res.push("$2");
          if (minor >= "a")
            res.push(minor);
          res.push("$");
          if (rounds < 10)
            res.push("0");
          res.push(rounds.toString());
          res.push("$");
          res.push(base64_encode(saltb, saltb.length));
          res.push(base64_encode(bytes2, C_ORIG.length * 4 - 1));
          return res.join("");
        }
        __name(finish, "finish");
        if (typeof callback == "undefined")
          return finish(_crypt(passwordb, saltb, rounds));
        else {
          _crypt(passwordb, saltb, rounds, function(err2, bytes2) {
            if (err2)
              callback(err2, null);
            else
              callback(null, finish(bytes2));
          }, progressCallback);
        }
      }
      __name(_hash, "_hash");
      bcrypt2.encodeBase64 = base64_encode;
      bcrypt2.decodeBase64 = base64_decode;
      return bcrypt2;
    });
  }
});

// node-built-in-modules:buffer
import libDefault2 from "buffer";
var require_buffer = __commonJS({
  "node-built-in-modules:buffer"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var buffer = require_buffer();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    __name(copyProps, "copyProps");
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    __name(SafeBuffer, "SafeBuffer");
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node-built-in-modules:stream
import libDefault3 from "stream";
var require_stream = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// node-built-in-modules:util
import libDefault4 from "util";
var require_util = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/jws/lib/data-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require_stream();
    var util = require_util();
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    __name(DataStream, "DataStream");
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = /* @__PURE__ */ __name(function write2(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    }, "write");
    DataStream.prototype.end = /* @__PURE__ */ __name(function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    }, "end");
    module.exports = DataStream;
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    __name(getParamSize, "getParamSize");
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    __name(getParamBytesForAlg, "getParamBytesForAlg");
    module.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64Url, "base64Url");
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    __name(signatureAsBuffer, "signatureAsBuffer");
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    __name(derToJose, "derToJose");
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    __name(countPadding, "countPadding");
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    __name(joseToDer, "joseToDer");
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/buffer-equal-constant-time/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    var SlowBuffer = require_buffer().SlowBuffer;
    module.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    __name(bufferEq, "bufferEq");
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = /* @__PURE__ */ __name(function equal(that) {
        return bufferEq(this, that);
      }, "equal");
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/jwa/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto2 = require_crypto();
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require_util();
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto2.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    __name(checkIsPublicKey, "checkIsPublicKey");
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    __name(checkIsPrivateKey, "checkIsPrivateKey");
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    __name(checkIsSecretKey, "checkIsSecretKey");
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(fromBase64, "fromBase64");
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    __name(toBase64, "toBase64");
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    __name(typeError, "typeError");
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    __name(bufferOrString, "bufferOrString");
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    __name(normalizeInput, "normalizeInput");
    function createHmacSigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto2.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createHmacSigner, "createHmacSigner");
    var bufferEqual;
    var timingSafeEqual = "timingSafeEqual" in crypto2 ? /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return crypto2.timingSafeEqual(a, b);
    }, "timingSafeEqual") : /* @__PURE__ */ __name(function timingSafeEqual2(a, b) {
      if (!bufferEqual) {
        bufferEqual = require_buffer_equal_constant_time();
      }
      return bufferEqual(a, b);
    }, "timingSafeEqual");
    function createHmacVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      }, "verify");
    }
    __name(createHmacVerifier, "createHmacVerifier");
    function createKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto2.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createKeySigner, "createKeySigner");
    function createKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto2.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      }, "verify");
    }
    __name(createKeyVerifier, "createKeyVerifier");
    function createPSSKeySigner(bits) {
      return /* @__PURE__ */ __name(function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto2.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto2.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto2.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      }, "sign");
    }
    __name(createPSSKeySigner, "createPSSKeySigner");
    function createPSSKeyVerifier(bits) {
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto2.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto2.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto2.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      }, "verify");
    }
    __name(createPSSKeyVerifier, "createPSSKeyVerifier");
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return /* @__PURE__ */ __name(function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      }, "sign");
    }
    __name(createECDSASigner, "createECDSASigner");
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return /* @__PURE__ */ __name(function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      }, "verify");
    }
    __name(createECDSAVerifer, "createECDSAVerifer");
    function createNoneSigner() {
      return /* @__PURE__ */ __name(function sign() {
        return "";
      }, "sign");
    }
    __name(createNoneSigner, "createNoneSigner");
    function createNoneVerifier() {
      return /* @__PURE__ */ __name(function verify(thing, signature) {
        return signature === "";
      }, "verify");
    }
    __name(createNoneVerifier, "createNoneVerifier");
    module.exports = /* @__PURE__ */ __name(function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match2 = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
      if (!match2)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match2[1] || match2[3]).toLowerCase();
      var bits = match2[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    }, "jwa");
  }
});

// node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/jws/lib/tostring.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_buffer().Buffer;
    module.exports = /* @__PURE__ */ __name(function toString2(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    }, "toString");
  }
});

// node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/jws/lib/sign-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString2 = require_tostring();
    var util = require_util();
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    __name(base64url, "base64url");
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString2(header), "binary");
      var encodedPayload = base64url(toString2(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    __name(jwsSecuredInput, "jwsSecuredInput");
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    __name(jwsSign, "jwsSign");
    function SignStream(opts) {
      var secret = opts.secret;
      secret = secret == null ? opts.privateKey : secret;
      secret = secret == null ? opts.key : secret;
      if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    __name(SignStream, "SignStream");
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = /* @__PURE__ */ __name(function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "sign");
    SignStream.sign = jwsSign;
    module.exports = SignStream;
  }
});

// node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/jws/lib/verify-stream.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require_stream();
    var toString2 = require_tostring();
    var util = require_util();
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    __name(isObject, "isObject");
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    __name(safeJsonParse, "safeJsonParse");
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    __name(headerFromJWS, "headerFromJWS");
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    __name(securedInputFromJWS, "securedInputFromJWS");
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    __name(signatureFromJWS, "signatureFromJWS");
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    __name(payloadFromJWS, "payloadFromJWS");
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    __name(isValidJws, "isValidJws");
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString2(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    __name(jwsVerify, "jwsVerify");
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString2(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    __name(jwsDecode, "jwsDecode");
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret;
      secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
      secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
      if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    __name(VerifyStream, "VerifyStream");
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = /* @__PURE__ */ __name(function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    }, "verify");
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module.exports = VerifyStream;
  }
});

// node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/jws/index.js"(exports) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = /* @__PURE__ */ __name(function createSign(opts) {
      return new SignStream(opts);
    }, "createSign");
    exports.createVerify = /* @__PURE__ */ __name(function createVerify(opts) {
      return new VerifyStream(opts);
    }, "createVerify");
  }
});

// node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "node_modules/jsonwebtoken/decode.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var jws = require_jws();
    module.exports = function(jwt3, options) {
      options = options || {};
      var decoded = jws.decode(jwt3, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = /* @__PURE__ */ __name(function(message, error3) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error3) this.inner = error3;
    }, "JsonWebTokenError");
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module.exports = JsonWebTokenError;
  }
});

// node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = /* @__PURE__ */ __name(function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    }, "NotBeforeError");
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module.exports = NotBeforeError;
  }
});

// node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = /* @__PURE__ */ __name(function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    }, "TokenExpiredError");
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module.exports = TokenExpiredError;
  }
});

// node_modules/jsonwebtoken/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/jsonwebtoken/node_modules/ms/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    __name(parse2, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "node_modules/jsonwebtoken/lib/timespan.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ms = require_ms();
    module.exports = function(time3, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time3 === "string") {
        var milliseconds = ms(time3);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time3 === "number") {
        return timestamp + time3;
      } else {
        return;
      }
    };
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var debug4 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug4;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug4 = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = /* @__PURE__ */ __name((value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    }, "makeSafeRegex");
    var createToken = /* @__PURE__ */ __name((name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug4(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    }, "createToken");
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = /* @__PURE__ */ __name((options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    }, "parseOptions");
    module.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = /* @__PURE__ */ __name((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }, "compareIdentifiers");
    var rcompareIdentifiers = /* @__PURE__ */ __name((a, b) => compareIdentifiers(b, a), "rcompareIdentifiers");
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var debug4 = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = /* @__PURE__ */ __name((prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    }, "isPrereleaseIdentifier");
    var SemVer = class _SemVer {
      static {
        __name(this, "SemVer");
      }
      constructor(version2, options) {
        options = parseOptions(options);
        if (version2 instanceof _SemVer) {
          if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug4("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version2}`);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug4("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug4("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug4("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release2, identifier, identifierBase) {
        if (release2.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match2 = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match2 || match2[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release2) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release2}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var parse2 = /* @__PURE__ */ __name((version2, options, throwErrors = false) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      try {
        return new SemVer(version2, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    }, "parse");
    module.exports = parse2;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var valid = /* @__PURE__ */ __name((version2, options) => {
      const v = parse2(version2, options);
      return v ? v.version : null;
    }, "valid");
    module.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var clean = /* @__PURE__ */ __name((version2, options) => {
      const s = parse2(version2.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }, "clean");
    module.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var inc = /* @__PURE__ */ __name((version2, release2, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version2 instanceof SemVer ? version2.version : version2,
          options
        ).inc(release2, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    }, "inc");
    module.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var diff = /* @__PURE__ */ __name((version1, version2) => {
      const v1 = parse2(version1, null, true);
      const v2 = parse2(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    }, "diff");
    module.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var major = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).major, "major");
    module.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var minor = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).minor, "minor");
    module.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var patch = /* @__PURE__ */ __name((a, loose) => new SemVer(a, loose).patch, "patch");
    module.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var prerelease = /* @__PURE__ */ __name((version2, options) => {
      const parsed = parse2(version2, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }, "prerelease");
    module.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var compare = /* @__PURE__ */ __name((a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose)), "compare");
    module.exports = compare;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var rcompare = /* @__PURE__ */ __name((a, b, loose) => compare(b, a, loose), "rcompare");
    module.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var compareLoose = /* @__PURE__ */ __name((a, b) => compare(a, b, true), "compareLoose");
    module.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var compareBuild = /* @__PURE__ */ __name((a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    }, "compareBuild");
    module.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compareBuild = require_compare_build();
    var sort = /* @__PURE__ */ __name((list2, loose) => list2.sort((a, b) => compareBuild(a, b, loose)), "sort");
    module.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compareBuild = require_compare_build();
    var rsort = /* @__PURE__ */ __name((list2, loose) => list2.sort((a, b) => compareBuild(b, a, loose)), "rsort");
    module.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var gt = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) > 0, "gt");
    module.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var lt = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) < 0, "lt");
    module.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var eq = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) === 0, "eq");
    module.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var neq = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) !== 0, "neq");
    module.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var gte = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) >= 0, "gte");
    module.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var compare = require_compare();
    var lte = /* @__PURE__ */ __name((a, b, loose) => compare(a, b, loose) <= 0, "lte");
    module.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = /* @__PURE__ */ __name((a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    }, "cmp");
    module.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var parse2 = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce = /* @__PURE__ */ __name((version2, options) => {
      if (version2 instanceof SemVer) {
        return version2;
      }
      if (typeof version2 === "number") {
        version2 = String(version2);
      }
      if (typeof version2 !== "string") {
        return null;
      }
      options = options || {};
      let match2 = null;
      if (!options.rtl) {
        match2 = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version2)) && (!match2 || match2.index + match2[0].length !== version2.length)) {
          if (!match2 || next.index + next[0].length !== match2.index + match2[0].length) {
            match2 = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match2 === null) {
        return null;
      }
      const major = match2[2];
      const minor = match2[3] || "0";
      const patch = match2[4] || "0";
      const prerelease = options.includePrerelease && match2[5] ? `-${match2[5]}` : "";
      const build = options.includePrerelease && match2[6] ? `+${match2[6]}` : "";
      return parse2(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    }, "coerce");
    module.exports = coerce;
  }
});

// node_modules/semver/functions/truncate.js
var require_truncate = __commonJS({
  "node_modules/semver/functions/truncate.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse2 = require_parse();
    var constants2 = require_constants();
    var SemVer = require_semver();
    var truncate3 = /* @__PURE__ */ __name((version2, truncation, options) => {
      if (!constants2.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version2, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    }, "truncate");
    var cloneInputVersion = /* @__PURE__ */ __name((version2, options) => {
      const versionStringToParse = version2 instanceof SemVer ? version2.version : version2;
      return parse2(versionStringToParse, options);
    }, "cloneInputVersion");
    var doTruncation = /* @__PURE__ */ __name((version2, truncation) => {
      if (isPrerelease(truncation)) {
        return version2.version;
      }
      version2.prerelease = [];
      switch (truncation) {
        case "major":
          version2.minor = 0;
          version2.patch = 0;
          break;
        case "minor":
          version2.patch = 0;
          break;
      }
      return version2.format();
    }, "doTruncation");
    var isPrerelease = /* @__PURE__ */ __name((type) => {
      return type.startsWith("pre");
    }, "isPrerelease");
    module.exports = truncate3;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var LRUCache = class {
      static {
        __name(this, "LRUCache");
      }
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      static {
        __name(this, "Range");
      }
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug4("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug4("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug4("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug4("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug4("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug4("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version2) {
        if (!version2) {
          return false;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version2, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug4 = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = /* @__PURE__ */ __name((c) => c.value === "<0.0.0-0", "isNullSet");
    var isAny = /* @__PURE__ */ __name((c) => c.value === "", "isAny");
    var isSatisfiable = /* @__PURE__ */ __name((comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    }, "isSatisfiable");
    var parseComparator = /* @__PURE__ */ __name((comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug4("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug4("caret", comp);
      comp = replaceTildes(comp, options);
      debug4("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug4("xrange", comp);
      comp = replaceStars(comp, options);
      debug4("stars", comp);
      return comp;
    }, "parseComparator");
    var isX = /* @__PURE__ */ __name((id) => !id || id.toLowerCase() === "x" || id === "*", "isX");
    var invalidXRangeOrder = /* @__PURE__ */ __name((M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p), "invalidXRangeOrder");
    var replaceTildes = /* @__PURE__ */ __name((comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    }, "replaceTildes");
    var replaceTilde = /* @__PURE__ */ __name((comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug4("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug4("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug4("tilde return", ret);
        return ret;
      });
    }, "replaceTilde");
    var replaceCarets = /* @__PURE__ */ __name((comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    }, "replaceCarets");
    var replaceCaret = /* @__PURE__ */ __name((comp, options) => {
      debug4("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug4("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug4("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug4("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug4("caret return", ret);
        return ret;
      });
    }, "replaceCaret");
    var replaceXRanges = /* @__PURE__ */ __name((comp, options) => {
      debug4("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    }, "replaceXRanges");
    var replaceXRange = /* @__PURE__ */ __name((comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug4("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug4("xRange return", ret);
        return ret;
      });
    }, "replaceXRange");
    var replaceStars = /* @__PURE__ */ __name((comp, options) => {
      debug4("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    }, "replaceStars");
    var replaceGTE0 = /* @__PURE__ */ __name((comp, options) => {
      debug4("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    }, "replaceGTE0");
    var hyphenReplace = /* @__PURE__ */ __name((incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    }, "hyphenReplace");
    var testSet = /* @__PURE__ */ __name((set, version2, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version2)) {
          return false;
        }
      }
      if (version2.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug4(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }, "testSet");
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static {
        __name(this, "Comparator");
      }
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug4("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug4("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version2) {
        debug4("Comparator.test", version2, this.options.loose);
        if (this.semver === ANY || version2 === ANY) {
          return true;
        }
        if (typeof version2 === "string") {
          try {
            version2 = new SemVer(version2, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version2, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug4 = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var satisfies = /* @__PURE__ */ __name((version2, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version2);
    }, "satisfies");
    module.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var toComparators = /* @__PURE__ */ __name((range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" ")), "toComparators");
    module.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = /* @__PURE__ */ __name((versions2, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions2.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }, "maxSatisfying");
    module.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = /* @__PURE__ */ __name((versions2, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions2.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }, "minSatisfying");
    module.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = /* @__PURE__ */ __name((range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }, "minVersion");
    module.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var validRange = /* @__PURE__ */ __name((range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }, "validRange");
    module.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = /* @__PURE__ */ __name((version2, range, hilo, options) => {
      version2 = new SemVer(version2, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version2, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
          return false;
        }
      }
      return true;
    }, "outside");
    module.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var outside = require_outside();
    var gtr = /* @__PURE__ */ __name((version2, range, options) => outside(version2, range, ">", options), "gtr");
    module.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var outside = require_outside();
    var ltr = /* @__PURE__ */ __name((version2, range, options) => outside(version2, range, "<", options), "ltr");
    module.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var intersects = /* @__PURE__ */ __name((r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    }, "intersects");
    module.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var satisfies = require_satisfies();
    var compare = require_compare();
    module.exports = (versions2, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions2.sort((a, b) => compare(a, b, options));
      for (const version2 of v) {
        const included = satisfies(version2, range, options);
        if (included) {
          prev = version2;
          if (!first) {
            first = version2;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = /* @__PURE__ */ __name((sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    }, "subset");
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = /* @__PURE__ */ __name((sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !c.test(gt.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    }, "simpleSubset");
    var higherGT = /* @__PURE__ */ __name((a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    }, "higherGT");
    var lowerLT = /* @__PURE__ */ __name((a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    }, "lowerLT");
    module.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var internalRe = require_re();
    var constants2 = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse2 = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var truncate3 = require_truncate();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module.exports = {
      parse: parse2,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      truncate: truncate3,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants2.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants2.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
var require_asymmetricKeyDetailsSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=15.7.0");
  }
});

// node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
var require_rsaPssKeyDetailsSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=16.9.0");
  }
});

// node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
var require_validateAsymmetricKey = __commonJS({
  "node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
    var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
    var allowedAlgorithmsForKeys = {
      "ec": ["ES256", "ES384", "ES512"],
      "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
      "rsa-pss": ["PS256", "PS384", "PS512"]
    };
    var allowedCurves = {
      ES256: "prime256v1",
      ES384: "secp384r1",
      ES512: "secp521r1"
    };
    module.exports = function(algorithm, key) {
      if (!algorithm || !key) return;
      const keyType = key.asymmetricKeyType;
      if (!keyType) return;
      const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
      if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
      }
      if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
      }
      if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch (keyType) {
          case "ec":
            const keyCurve = key.asymmetricKeyDetails.namedCurve;
            const allowedCurve = allowedCurves[algorithm];
            if (keyCurve !== allowedCurve) {
              throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
            }
            break;
          case "rsa-pss":
            if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
              const length = parseInt(algorithm.slice(-3), 10);
              const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
              if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
              }
              if (saltLength !== void 0 && saltLength > length >> 3) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
              }
            }
            break;
        }
      }
    };
  }
});

// node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/psSupported.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "node_modules/jsonwebtoken/verify.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var { KeyObject, createSecretKey, createPublicKey } = require_crypto();
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    }
    module.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      let done;
      if (callback) {
        done = callback;
      } else {
        done = /* @__PURE__ */ __name(function(err, data) {
          if (err) throw err;
          return data;
        }, "done");
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
        return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
      }
      const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      const parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      let decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      const header = decodedToken.header;
      let getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = /* @__PURE__ */ __name(function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        }, "getSecret");
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        const hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
          try {
            secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
          } catch (_) {
            try {
              secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
            } catch (_2) {
              return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
            }
          }
        }
        if (!options.algorithms) {
          if (secretOrPublicKey2.type === "secret") {
            options.algorithms = HS_ALGS;
          } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
            options.algorithms = RSA_KEY_ALGS;
          } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
            options.algorithms = EC_KEY_ALGS;
          } else {
            options.algorithms = PUB_KEY_ALGS;
          }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPublicKey2);
          } catch (e) {
            return done(e);
          }
        }
        let valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          const match2 = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match2) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          const signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.includes/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    __name(arrayMap, "arrayMap");
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    __name(baseFindIndex, "baseFindIndex");
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    __name(baseIndexOf, "baseIndexOf");
    function baseIsNaN(value) {
      return value !== value;
    }
    __name(baseIsNaN, "baseIsNaN");
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    __name(baseTimes, "baseTimes");
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    __name(baseValues, "baseValues");
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    __name(overArg, "overArg");
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString2 = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    __name(arrayLikeKeys, "arrayLikeKeys");
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    __name(baseKeys, "baseKeys");
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    __name(isIndex, "isIndex");
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    __name(isPrototype, "isPrototype");
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    __name(includes, "includes");
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString2.call(value) == argsTag);
    }
    __name(isArguments, "isArguments");
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    __name(isArrayLike, "isArrayLike");
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    __name(isArrayLikeObject, "isArrayLikeObject");
    function isFunction(value) {
      var tag = isObject(value) ? objectToString2.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    __name(isFunction, "isFunction");
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    __name(isLength, "isLength");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString2.call(value) == stringTag;
    }
    __name(isString, "isString");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    __name(keys, "keys");
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    __name(values, "values");
    module.exports = includes;
  }
});

// node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.isboolean/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString2 = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString2.call(value) == boolTag;
    }
    __name(isBoolean, "isBoolean");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    module.exports = isBoolean;
  }
});

// node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "node_modules/lodash.isinteger/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString2 = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    __name(isInteger, "isInteger");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = isInteger;
  }
});

// node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "node_modules/lodash.isnumber/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString2 = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString2.call(value) == numberTag;
    }
    __name(isNumber, "isNumber");
    module.exports = isNumber;
  }
});

// node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "node_modules/lodash.isplainobject/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    __name(isHostObject, "isHostObject");
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    __name(overArg, "overArg");
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString2 = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isPlainObject2(value) {
      if (!isObjectLike(value) || objectToString2.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    __name(isPlainObject2, "isPlainObject");
    module.exports = isPlainObject2;
  }
});

// node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "node_modules/lodash.isstring/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString2 = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString2.call(value) == stringTag;
    }
    __name(isString, "isString");
    module.exports = isString;
  }
});

// node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "node_modules/lodash.once/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString2 = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    __name(before, "before");
    function once2(func) {
      return before(2, func);
    }
    __name(once2, "once");
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    __name(isObject, "isObject");
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    __name(isObjectLike, "isObjectLike");
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString2.call(value) == symbolTag;
    }
    __name(isSymbol, "isSymbol");
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    __name(toFinite, "toFinite");
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    __name(toInteger, "toInteger");
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    __name(toNumber, "toNumber");
    module.exports = once2;
  }
});

// node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "node_modules/jsonwebtoken/sign.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject2 = require_lodash5();
    var isString = require_lodash6();
    var once2 = require_lodash7();
    var { KeyObject, createSecretKey, createPrivateKey } = require_crypto();
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: /* @__PURE__ */ __name(function(value) {
        return isInteger(value) || isString(value) && value;
      }, "isValid"), message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: /* @__PURE__ */ __name(function(value) {
        return isInteger(value) || isString(value) && value;
      }, "isValid"), message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: /* @__PURE__ */ __name(function(value) {
        return isString(value) || Array.isArray(value);
      }, "isValid"), message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject2, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
      allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
      allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject2(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        const validator = schema[key];
        if (!validator) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator.isValid(object[key])) {
          throw new Error(validator.message);
        }
      });
    }
    __name(validate, "validate");
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    __name(validateOptions, "validateOptions");
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    __name(validatePayload, "validatePayload");
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      const header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      __name(failure, "failure");
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
          secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
          try {
            secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
          } catch (_2) {
            return failure(new Error("secretOrPrivateKey is not valid key material"));
          }
        }
      }
      if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== "private") {
          return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
          return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error3) {
          return failure(error3);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        const invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error3) {
        return failure(error3);
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error3) {
          return failure(error3);
        }
      }
      const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      const encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once2(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
          callback(null, signature);
        });
      } else {
        let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
      }
    };
  }
});

// node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "node_modules/jsonwebtoken/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// node_modules/@prisma/client/runtime/wasm-engine-edge.js
var require_wasm_engine_edge = __commonJS({
  "node_modules/@prisma/client/runtime/wasm-engine-edge.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Vs = Object.create;
    var nr = Object.defineProperty;
    var Bs = Object.getOwnPropertyDescriptor;
    var $s = Object.getOwnPropertyNames;
    var js = Object.getPrototypeOf;
    var Qs = Object.prototype.hasOwnProperty;
    var ae = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "ae");
    var yt = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "yt");
    var ht = /* @__PURE__ */ __name((t, e) => {
      for (var r in e) nr(t, r, { get: e[r], enumerable: true });
    }, "ht");
    var Hn = /* @__PURE__ */ __name((t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function") for (let i of $s(e)) !Qs.call(t, i) && i !== r && nr(t, i, { get: /* @__PURE__ */ __name(() => e[i], "get"), enumerable: !(n = Bs(e, i)) || n.enumerable });
      return t;
    }, "Hn");
    var bt = /* @__PURE__ */ __name((t, e, r) => (r = t != null ? Vs(js(t)) : {}, Hn(e || !t || !t.__esModule ? nr(r, "default", { value: t, enumerable: true }) : r, t)), "bt");
    var Gs = /* @__PURE__ */ __name((t) => Hn(nr({}, "__esModule", { value: true }), t), "Gs");
    function Kr(t, e) {
      if (e = e.toLowerCase(), e === "utf8" || e === "utf-8") return new y(Hs.encode(t));
      if (e === "base64" || e === "base64url") return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(t)].map((r) => r.charCodeAt(0)));
      if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return new y([...t].map((r) => r.charCodeAt(0)));
      if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < t.length; i++) n.setUint16(i * 2, t.charCodeAt(i), true);
        return r;
      }
      if (e === "hex") {
        let r = new y(t.length / 2);
        for (let n = 0, i = 0; i < t.length; i += 2, n++) r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
      }
      Yn(`encoding "${e}"`);
    }
    __name(Kr, "Kr");
    function Js(t) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, f) => function(v = 0) {
        return J(v, "offset"), re(v, "offset"), K(v, "offset", this.length - 1), new DataView(this.buffer)[r[a]](v, f);
      }, "i"), o = /* @__PURE__ */ __name((a, f) => function(v, R = 0) {
        let A = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), I = Ks[A];
        return J(R, "offset"), re(R, "offset"), K(R, "offset", this.length - 1), Ws(v, "value", I[0], I[1]), new DataView(this.buffer)[r[a]](R, v, f), R + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a) => {
        a.forEach((f) => {
          f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
      }, "s");
      n.forEach((a, f) => {
        a.startsWith("read") && (t[a] = i(f, false), t[a + "LE"] = i(f, true), t[a + "BE"] = i(f, false)), a.startsWith("write") && (t[a] = o(f, false), t[a + "LE"] = o(f, true), t[a + "BE"] = o(f, false)), s([a, a + "LE", a + "BE"]);
      });
    }
    __name(Js, "Js");
    function Yn(t) {
      throw new Error(`Buffer polyfill does not implement "${t}"`);
    }
    __name(Yn, "Yn");
    function ir(t, e) {
      if (!(t instanceof Uint8Array)) throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(ir, "ir");
    function K(t, e, r = Xs + 1) {
      if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(K, "K");
    function J(t, e) {
      if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(J, "J");
    function re(t, e) {
      if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(re, "re");
    function Ws(t, e, r, n) {
      if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(Ws, "Ws");
    function zn(t, e) {
      if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(zn, "zn");
    function Zs(t, e = "utf8") {
      return y.from(t, e);
    }
    __name(Zs, "Zs");
    var y;
    var Ks;
    var Hs;
    var zs;
    var Ys;
    var Xs;
    var h;
    var Hr;
    var u = ae(() => {
      "use strict";
      y = class t extends Uint8Array {
        static {
          __name(this, "t");
        }
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
          return zn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
          return t.from(e);
        }
        static allocUnsafeSlow(e) {
          return t.from(e);
        }
        static isBuffer(e) {
          return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
          if (typeof e == "string") return Kr(e, r).byteLength;
          if (e && e.byteLength) return e.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
          return Ys.includes(e);
        }
        static compare(e, r) {
          ir(e, "buff1"), ir(r, "buff2");
          for (let n = 0; n < e.length; n++) {
            if (e[n] < r[n]) return -1;
            if (e[n] > r[n]) return 1;
          }
          return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
          if (e && typeof e == "object" && e.type === "Buffer") return new t(e.data);
          if (typeof e == "number") return new t(new Uint8Array(e));
          if (typeof e == "string") return Kr(e, r);
          if (ArrayBuffer.isView(e)) {
            let { byteOffset: n, byteLength: i, buffer: o } = e;
            return "map" in e && typeof e.map == "function" ? new t(e.map((s) => s % 256), n, i) : new t(o, n, i);
          }
          if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e)) return new t(e);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
          if (e.length === 0) return t.alloc(0);
          let n = [].concat(...e.map((o) => [...o])), i = t.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
          return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(e, r) {
          J(e, "offset"), re(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
          J(e, "offset"), re(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
          J(e, "offset"), re(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(e, r) {
          return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
          J(e, "offset"), re(e, "offset"), K(e, "offset", this.length - 1), J(r, "byteLength"), re(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++) i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(e, r) {
          return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
          J(r, "offset"), re(r, "offset"), K(r, "offset", this.length - 1), J(n, "byteLength"), re(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintBE(e, r, n) {
          return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
          J(r, "offset"), re(r, "offset"), K(r, "offset", this.length - 1), J(n, "byteLength"), re(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++) i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintLE(e, r, n) {
          return this.writeUIntLE(e, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2) e.setUint16(r, e.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4) e.setUint32(r, e.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8) e.setBigUint64(r, e.getBigUint64(r, true), false);
          return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
          return ir(e, "target"), J(r, "targetStart"), J(n, "targetEnd"), J(i, "sourceStart"), J(o, "sourceEnd"), K(r, "targetStart"), K(n, "targetEnd", e.length), K(i, "sourceStart"), K(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
          return ir(e, "otherBuffer"), this.length === e.length && this.every((r, n) => r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
          K(r, "targetStart"), K(n, "sourceStart", this.length), K(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || e[r] === void 0); ) e[r] = this[n], o++, n++, r++;
          return o;
        }
        write(e, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, J(o, "offset"), J(s, "length"), K(o, "offset", this.length), K(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), Kr(e, i).copy(this, o, 0, s);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [e] : e ?? [], i), zn(i, "encoding"), K(o, "offset", this.length), K(s, "end", this.length), e.length !== 0) for (let a = o; a < s; a += e.length) super.set(e.slice(0, e.length + a >= this.length ? this.length - a : e.length), a);
          return this;
        }
        includes(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n, true);
        }
        indexOf(e, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s = t.from(typeof e == "number" ? [e] : e, n), a = typeof r == "string" ? 0 : r;
          return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s.length === 0 && i === false ? a >= this.length ? this.length : a : s.length === 0 && i === true ? (a >= this.length ? this.length : a) || this.length : o((f, v) => (i ? v <= a : v >= a) && this[v] === s[0] && s.every((A, I) => this[v + I] === A));
        }
        toString(e = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0) return "";
          if (e === "utf8" || e === "utf-8") return zs.decode(this.slice(r, n));
          if (e === "base64" || e === "base64url") {
            let i = btoa(this.reduce((o, s) => o + Hr(s), ""));
            return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1") return this.slice(r, n).reduce((i, o) => i + Hr(o & (e === "ascii" ? 127 : 255)), "");
          if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s) => s * 2 + 1 < i.byteLength ? Hr(i.getUint16(s * 2, true)) : "").join("");
          }
          if (e === "hex") return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          Yn(`encoding "${e}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      };
      Ks = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, Hs = new TextEncoder(), zs = new TextDecoder(), Ys = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], Xs = 4294967295;
      Js(y.prototype);
      h = new Proxy(Zs, { construct(t, [e, r]) {
        return y.from(e, r);
      }, get(t, e) {
        return y[e];
      } }), Hr = String.fromCodePoint;
    });
    var g;
    var w;
    var c = ae(() => {
      "use strict";
      g = { nextTick: /* @__PURE__ */ __name((t, ...e) => {
        setTimeout(() => {
          t(...e);
        }, 0);
      }, "nextTick"), env: {}, version: "", cwd: /* @__PURE__ */ __name(() => "/", "cwd"), stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: w } = g;
    });
    var x;
    var p = ae(() => {
      "use strict";
      x = globalThis.performance ?? (() => {
        let t = Date.now();
        return { now: /* @__PURE__ */ __name(() => Date.now() - t, "now") };
      })();
    });
    var E;
    var m = ae(() => {
      "use strict";
      E = /* @__PURE__ */ __name(() => {
      }, "E");
      E.prototype = E;
    });
    var b;
    var d = ae(() => {
      "use strict";
      b = class {
        static {
          __name(this, "b");
        }
        value;
        constructor(e) {
          this.value = e;
        }
        deref() {
          return this.value;
        }
      };
    });
    function ti(t, e) {
      var r, n, i, o, s, a, f, v, R = t.constructor, A = R.precision;
      if (!t.s || !e.s) return e.s || (e = new R(t)), $ ? N(e, A) : e;
      if (f = t.d, v = e.d, s = t.e, i = e.e, f = f.slice(), o = s - i, o) {
        for (o < 0 ? (n = f, o = -o, a = v.length) : (n = v, i = s, a = f.length), s = Math.ceil(A / B), a = s > a ? s + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; ) n.push(0);
        n.reverse();
      }
      for (a = f.length, o = v.length, a - o < 0 && (o = a, n = v, v = f, f = n), r = 0; o; ) r = (f[--o] = f[o] + v[o] + r) / H | 0, f[o] %= H;
      for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; ) f.pop();
      return e.d = f, e.e = i, $ ? N(e, A) : e;
    }
    __name(ti, "ti");
    function de(t, e, r) {
      if (t !== ~~t || t < e || t > r) throw Error(_e + t);
    }
    __name(de, "de");
    function me(t) {
      var e, r, n, i = t.length - 1, o = "", s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++) n = t[e] + "", r = B - n.length, r && (o += Ae(r)), o += n;
        s = t[e], n = s + "", r = B - n.length, r && (o += Ae(r));
      } else if (s === 0) return "0";
      for (; s % 10 === 0; ) s /= 10;
      return o + s;
    }
    __name(me, "me");
    function ri(t, e) {
      var r, n, i, o, s, a, f = 0, v = 0, R = t.constructor, A = R.precision;
      if (W(t) > 16) throw Error(Yr + W(t));
      if (!t.s) return new R(oe);
      for (e == null ? ($ = false, a = A) : a = e, s = new R(0.03125); t.abs().gte(0.1); ) t = t.times(s), v += 5;
      for (n = Math.log(ke(2, v)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new R(oe), R.precision = a; ; ) {
        if (i = N(i.times(t), a), r = r.times(++f), s = o.plus(we(i, r, a)), me(s.d).slice(0, a) === me(o.d).slice(0, a)) {
          for (; v--; ) o = N(o.times(o), a);
          return R.precision = A, e == null ? ($ = true, N(o, A)) : o;
        }
        o = s;
      }
    }
    __name(ri, "ri");
    function W(t) {
      for (var e = t.e * B, r = t.d[0]; r >= 10; r /= 10) e++;
      return e;
    }
    __name(W, "W");
    function zr(t, e, r) {
      if (e > t.LN10.sd()) throw $ = true, r && (t.precision = r), Error(le + "LN10 precision limit exceeded");
      return N(new t(t.LN10), e);
    }
    __name(zr, "zr");
    function Ae(t) {
      for (var e = ""; t--; ) e += "0";
      return e;
    }
    __name(Ae, "Ae");
    function Et(t, e) {
      var r, n, i, o, s, a, f, v, R, A = 1, I = 10, C = t, L = C.d, D = C.constructor, k = D.precision;
      if (C.s < 1) throw Error(le + (C.s ? "NaN" : "-Infinity"));
      if (C.eq(oe)) return new D(0);
      if (e == null ? ($ = false, v = k) : v = e, C.eq(10)) return e == null && ($ = true), zr(D, v);
      if (v += I, D.precision = v, r = me(L), n = r.charAt(0), o = W(C), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; ) C = C.times(t), r = me(C.d), n = r.charAt(0), A++;
        o = W(C), n > 1 ? (C = new D("0." + r), o++) : C = new D(n + "." + r.slice(1));
      } else return f = zr(D, v + 2, k).times(o + ""), C = Et(new D(n + "." + r.slice(1)), v - I).plus(f), D.precision = k, e == null ? ($ = true, N(C, k)) : C;
      for (a = s = C = we(C.minus(oe), C.plus(oe), v), R = N(C.times(C), v), i = 3; ; ) {
        if (s = N(s.times(R), v), f = a.plus(we(s, new D(i), v)), me(f.d).slice(0, v) === me(a.d).slice(0, v)) return a = a.times(2), o !== 0 && (a = a.plus(zr(D, v + 2, k).times(o + ""))), a = we(a, new D(A), v), D.precision = k, e == null ? ($ = true, N(a, k)) : a;
        a = f, i += 2;
      }
    }
    __name(Et, "Et");
    function Xn(t, e) {
      var r, n, i;
      for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; ) ++n;
      for (i = e.length; e.charCodeAt(i - 1) === 48; ) --i;
      if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Qe(r / B), t.d = [], n = (r + 1) % B, r < 0 && (n += B), n < i) {
          for (n && t.d.push(+e.slice(0, n)), i -= B; n < i; ) t.d.push(+e.slice(n, n += B));
          e = e.slice(n), n = B - e.length;
        } else n -= i;
        for (; n--; ) e += "0";
        if (t.d.push(+e), $ && (t.e > or || t.e < -or)) throw Error(Yr + r);
      } else t.s = 0, t.e = 0, t.d = [0];
      return t;
    }
    __name(Xn, "Xn");
    function N(t, e, r) {
      var n, i, o, s, a, f, v, R, A = t.d;
      for (s = 1, o = A[0]; o >= 10; o /= 10) s++;
      if (n = e - s, n < 0) n += B, i = e, v = A[R = 0];
      else {
        if (R = Math.ceil((n + 1) / B), o = A.length, R >= o) return t;
        for (v = o = A[R], s = 1; o >= 10; o /= 10) s++;
        n %= B, i = n - B + s;
      }
      if (r !== void 0 && (o = ke(10, s - i - 1), a = v / o % 10 | 0, f = e < 0 || A[R + 1] !== void 0 || v % o, f = r < 4 ? (a || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? v / ke(10, s - i) : 0 : A[R - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !A[0]) return f ? (o = W(t), A.length = 1, e = e - o - 1, A[0] = ke(10, (B - e % B) % B), t.e = Qe(-e / B) || 0) : (A.length = 1, A[0] = t.e = t.s = 0), t;
      if (n == 0 ? (A.length = R, o = 1, R--) : (A.length = R + 1, o = ke(10, B - n), A[R] = i > 0 ? (v / ke(10, s - i) % ke(10, i) | 0) * o : 0), f) for (; ; ) if (R == 0) {
        (A[0] += o) == H && (A[0] = 1, ++t.e);
        break;
      } else {
        if (A[R] += o, A[R] != H) break;
        A[R--] = 0, o = 1;
      }
      for (n = A.length; A[--n] === 0; ) A.pop();
      if ($ && (t.e > or || t.e < -or)) throw Error(Yr + W(t));
      return t;
    }
    __name(N, "N");
    function ni(t, e) {
      var r, n, i, o, s, a, f, v, R, A, I = t.constructor, C = I.precision;
      if (!t.s || !e.s) return e.s ? e.s = -e.s : e = new I(t), $ ? N(e, C) : e;
      if (f = t.d, A = e.d, n = e.e, v = t.e, f = f.slice(), s = v - n, s) {
        for (R = s < 0, R ? (r = f, s = -s, a = A.length) : (r = A, n = v, a = f.length), i = Math.max(Math.ceil(C / B), a) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; ) r.push(0);
        r.reverse();
      } else {
        for (i = f.length, a = A.length, R = i < a, R && (a = i), i = 0; i < a; i++) if (f[i] != A[i]) {
          R = f[i] < A[i];
          break;
        }
        s = 0;
      }
      for (R && (r = f, f = A, A = r, e.s = -e.s), a = f.length, i = A.length - a; i > 0; --i) f[a++] = 0;
      for (i = A.length; i > s; ) {
        if (f[--i] < A[i]) {
          for (o = i; o && f[--o] === 0; ) f[o] = H - 1;
          --f[o], f[i] += H;
        }
        f[i] -= A[i];
      }
      for (; f[--a] === 0; ) f.pop();
      for (; f[0] === 0; f.shift()) --n;
      return f[0] ? (e.d = f, e.e = n, $ ? N(e, C) : e) : new I(0);
    }
    __name(ni, "ni");
    function Me(t, e, r) {
      var n, i = W(t), o = me(t.d), s = o.length;
      return e ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Ae(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Ae(-i - 1) + o, r && (n = r - s) > 0 && (o += Ae(n))) : i >= s ? (o += Ae(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Ae(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Ae(n))), t.s < 0 ? "-" + o : o;
    }
    __name(Me, "Me");
    function Zn(t, e) {
      if (t.length > e) return t.length = e, true;
    }
    __name(Zn, "Zn");
    function ii(t) {
      var e, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i)) return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0) throw Error(_e + o);
          if (o > 0) s.s = 1;
          else if (o < 0) o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return Xn(s, o.toString());
        } else if (typeof o != "string") throw Error(_e + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, ta.test(o)) Xn(s, o);
        else throw Error(_e + o);
      }
      __name(i, "i");
      if (i.prototype = S, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = ii, i.config = i.set = ra, t === void 0 && (t = {}), t) for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; ) t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
      return i.config(t), i;
    }
    __name(ii, "ii");
    function ra(t) {
      if (!t || typeof t != "object") throw Error(le + "Object expected");
      var e, r, n, i = ["precision", 1, je, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (e = 0; e < i.length; e += 3) if ((n = t[r = i[e]]) !== void 0) if (Qe(n) === n && n >= i[e + 1] && n <= i[e + 2]) this[r] = n;
      else throw Error(_e + r + ": " + n);
      if ((n = t[r = "LN10"]) !== void 0) if (n == Math.LN10) this[r] = new this(n);
      else throw Error(_e + r + ": " + n);
      return this;
    }
    __name(ra, "ra");
    var je;
    var ea;
    var Xr;
    var $;
    var le;
    var _e;
    var Yr;
    var Qe;
    var ke;
    var ta;
    var oe;
    var H;
    var B;
    var ei;
    var or;
    var S;
    var we;
    var Xr;
    var sr;
    var oi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      je = 1e9, ea = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, $ = true, le = "[DecimalError] ", _e = le + "Invalid argument: ", Yr = le + "Exponent out of range: ", Qe = Math.floor, ke = Math.pow, ta = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, H = 1e7, B = 7, ei = 9007199254740991, or = Qe(ei / B), S = {};
      S.absoluteValue = S.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
      };
      S.comparedTo = S.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s) return o.s || -t.s;
        if (o.e !== t.e) return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e) if (o.d[e] !== t.d[e]) return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      S.decimalPlaces = S.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * B;
        if (e = t.d[e], e) for (; e % 10 == 0; e /= 10) r--;
        return r < 0 ? 0 : r;
      };
      S.dividedBy = S.div = function(t) {
        return we(this, new this.constructor(t));
      };
      S.dividedToIntegerBy = S.idiv = function(t) {
        var e = this, r = e.constructor;
        return N(we(e, new r(t), 0, 1), r.precision);
      };
      S.equals = S.eq = function(t) {
        return !this.cmp(t);
      };
      S.exponent = function() {
        return W(this);
      };
      S.greaterThan = S.gt = function(t) {
        return this.cmp(t) > 0;
      };
      S.greaterThanOrEqualTo = S.gte = function(t) {
        return this.cmp(t) >= 0;
      };
      S.isInteger = S.isint = function() {
        return this.e > this.d.length - 2;
      };
      S.isNegative = S.isneg = function() {
        return this.s < 0;
      };
      S.isPositive = S.ispos = function() {
        return this.s > 0;
      };
      S.isZero = function() {
        return this.s === 0;
      };
      S.lessThan = S.lt = function(t) {
        return this.cmp(t) < 0;
      };
      S.lessThanOrEqualTo = S.lte = function(t) {
        return this.cmp(t) < 1;
      };
      S.logarithm = S.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0) t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(oe)) throw Error(le + "NaN");
        if (r.s < 1) throw Error(le + (r.s ? "NaN" : "-Infinity"));
        return r.eq(oe) ? new n(0) : ($ = false, e = we(Et(r, o), Et(t, o), o), $ = true, N(e, i));
      };
      S.minus = S.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? ni(e, t) : ti(e, (t.s = -t.s, t));
      };
      S.modulo = S.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s) throw Error(le + "NaN");
        return r.s ? ($ = false, e = we(r, t, 0, 1).times(t), $ = true, r.minus(e)) : N(new n(r), i);
      };
      S.naturalExponential = S.exp = function() {
        return ri(this);
      };
      S.naturalLogarithm = S.ln = function() {
        return Et(this);
      };
      S.negated = S.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
      };
      S.plus = S.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? ti(e, t) : ni(e, (t.s = -t.s, t));
      };
      S.precision = S.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0) throw Error(_e + t);
        if (e = W(i) + 1, n = i.d.length - 1, r = n * B + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10) r--;
          for (n = i.d[0]; n >= 10; n /= 10) r++;
        }
        return t && e > r ? e : r;
      };
      S.squareRoot = S.sqrt = function() {
        var t, e, r, n, i, o, s, a = this, f = a.constructor;
        if (a.s < 1) {
          if (!a.s) return new f(0);
          throw Error(le + "NaN");
        }
        for (t = W(a), $ = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (e = me(a.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Qe((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s = r + 3; ; ) if (o = n, n = o.plus(we(a, o, s + 2)).times(0.5), me(o.d).slice(0, s) === (e = me(n.d)).slice(0, s)) {
          if (e = e.slice(s - 3, s + 1), i == s && e == "4999") {
            if (N(o, r + 1, 0), o.times(o).eq(a)) {
              n = o;
              break;
            }
          } else if (e != "9999") break;
          s += 4;
        }
        return $ = true, N(n, r);
      };
      S.times = S.mul = function(t) {
        var e, r, n, i, o, s, a, f, v, R = this, A = R.constructor, I = R.d, C = (t = new A(t)).d;
        if (!R.s || !t.s) return new A(0);
        for (t.s *= R.s, r = R.e + t.e, f = I.length, v = C.length, f < v && (o = I, I = C, C = o, s = f, f = v, v = s), o = [], s = f + v, n = s; n--; ) o.push(0);
        for (n = v; --n >= 0; ) {
          for (e = 0, i = f + n; i > n; ) a = o[i] + C[n] * I[i - n - 1] + e, o[i--] = a % H | 0, e = a / H | 0;
          o[i] = (o[i] + e) % H | 0;
        }
        for (; !o[--s]; ) o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, $ ? N(t, A.precision) : t;
      };
      S.toDecimalPlaces = S.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (de(t, 0, je), e === void 0 ? e = n.rounding : de(e, 0, 8), N(r, t + W(r) + 1, e));
      };
      S.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = Me(n, true) : (de(t, 0, je), e === void 0 ? e = i.rounding : de(e, 0, 8), n = N(new i(n), t + 1, e), r = Me(n, true, t + 1)), r;
      };
      S.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? Me(i) : (de(t, 0, je), e === void 0 ? e = o.rounding : de(e, 0, 8), n = N(new o(i), t + W(i) + 1, e), r = Me(n.abs(), false, t + W(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      S.toInteger = S.toint = function() {
        var t = this, e = t.constructor;
        return N(new e(t), W(t) + 1, e.rounding);
      };
      S.toNumber = function() {
        return +this;
      };
      S.toPower = S.pow = function(t) {
        var e, r, n, i, o, s, a = this, f = a.constructor, v = 12, R = +(t = new f(t));
        if (!t.s) return new f(oe);
        if (a = new f(a), !a.s) {
          if (t.s < 1) throw Error(le + "Infinity");
          return a;
        }
        if (a.eq(oe)) return a;
        if (n = f.precision, t.eq(oe)) return N(a, n);
        if (e = t.e, r = t.d.length - 1, s = e >= r, o = a.s, s) {
          if ((r = R < 0 ? -R : R) <= ei) {
            for (i = new f(oe), e = Math.ceil(n / B + 4), $ = false; r % 2 && (i = i.times(a), Zn(i.d, e)), r = Qe(r / 2), r !== 0; ) a = a.times(a), Zn(a.d, e);
            return $ = true, t.s < 0 ? new f(oe).div(i) : N(i, n);
          }
        } else if (o < 0) throw Error(le + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a.s = 1, $ = false, i = t.times(Et(a, n + v)), $ = true, i = ri(i), i.s = o, i;
      };
      S.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = W(i), n = Me(i, r <= o.toExpNeg || r >= o.toExpPos)) : (de(t, 1, je), e === void 0 ? e = o.rounding : de(e, 0, 8), i = N(new o(i), t, e), r = W(i), n = Me(i, t <= r || r <= o.toExpNeg, t)), n;
      };
      S.toSignificantDigits = S.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (de(t, 1, je), e === void 0 ? e = n.rounding : de(e, 0, 8)), N(new n(r), t, e);
      };
      S.toString = S.valueOf = S.val = S.toJSON = S[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = W(t), r = t.constructor;
        return Me(t, e <= r.toExpNeg || e >= r.toExpPos);
      };
      we = /* @__PURE__ */ (function() {
        function t(n, i) {
          var o, s = 0, a = n.length;
          for (n = n.slice(); a--; ) o = n[a] * i + s, n[a] = o % H | 0, s = o / H | 0;
          return s && n.unshift(s), n;
        }
        __name(t, "t");
        function e(n, i, o, s) {
          var a, f;
          if (o != s) f = o > s ? 1 : -1;
          else for (a = f = 0; a < o; a++) if (n[a] != i[a]) {
            f = n[a] > i[a] ? 1 : -1;
            break;
          }
          return f;
        }
        __name(e, "e");
        function r(n, i, o) {
          for (var s = 0; o--; ) n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * H + n[o] - i[o];
          for (; !n[0] && n.length > 1; ) n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a, f, v, R, A, I, C, L, D, k, Ee, ee, U, te, Oe, Wr, ue, tr, rr = n.constructor, qs = n.s == i.s ? 1 : -1, pe = n.d, G = i.d;
          if (!n.s) return new rr(n);
          if (!i.s) throw Error(le + "Division by zero");
          for (f = n.e - i.e, ue = G.length, Oe = pe.length, C = new rr(qs), L = C.d = [], v = 0; G[v] == (pe[v] || 0); ) ++v;
          if (G[v] > (pe[v] || 0) && --f, o == null ? ee = o = rr.precision : s ? ee = o + (W(n) - W(i)) + 1 : ee = o, ee < 0) return new rr(0);
          if (ee = ee / B + 2 | 0, v = 0, ue == 1) for (R = 0, G = G[0], ee++; (v < Oe || R) && ee--; v++) U = R * H + (pe[v] || 0), L[v] = U / G | 0, R = U % G | 0;
          else {
            for (R = H / (G[0] + 1) | 0, R > 1 && (G = t(G, R), pe = t(pe, R), ue = G.length, Oe = pe.length), te = ue, D = pe.slice(0, ue), k = D.length; k < ue; ) D[k++] = 0;
            tr = G.slice(), tr.unshift(0), Wr = G[0], G[1] >= H / 2 && ++Wr;
            do
              R = 0, a = e(G, D, ue, k), a < 0 ? (Ee = D[0], ue != k && (Ee = Ee * H + (D[1] || 0)), R = Ee / Wr | 0, R > 1 ? (R >= H && (R = H - 1), A = t(G, R), I = A.length, k = D.length, a = e(A, D, I, k), a == 1 && (R--, r(A, ue < I ? tr : G, I))) : (R == 0 && (a = R = 1), A = G.slice()), I = A.length, I < k && A.unshift(0), r(D, A, k), a == -1 && (k = D.length, a = e(G, D, ue, k), a < 1 && (R++, r(D, ue < k ? tr : G, k))), k = D.length) : a === 0 && (R++, D = [0]), L[v++] = R, a && D[0] ? D[k++] = pe[te] || 0 : (D = [pe[te]], k = 1);
            while ((te++ < Oe || D[0] !== void 0) && ee--);
          }
          return L[0] || L.shift(), C.e = f, N(C, s ? o + W(C) + 1 : o);
        };
      })();
      Xr = ii(ea);
      oe = new Xr(1);
      sr = Xr;
    });
    var P;
    var xe;
    var l = ae(() => {
      "use strict";
      oi();
      P = class extends sr {
        static {
          __name(this, "P");
        }
        static isDecimal(e) {
          return e instanceof sr;
        }
        static random(e = 20) {
          {
            let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o) => i + o, "");
            return new sr(`0.${n.slice(0, e)}`);
          }
        }
      }, xe = P;
    });
    function la() {
      return false;
    }
    __name(la, "la");
    function nn() {
      return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
    }
    __name(nn, "nn");
    function ua() {
      return nn();
    }
    __name(ua, "ua");
    function ca() {
      return [];
    }
    __name(ca, "ca");
    function pa(t) {
      t(null, []);
    }
    __name(pa, "pa");
    function ma() {
      return "";
    }
    __name(ma, "ma");
    function da() {
      return "";
    }
    __name(da, "da");
    function fa() {
    }
    __name(fa, "fa");
    function ga() {
    }
    __name(ga, "ga");
    function ya() {
    }
    __name(ya, "ya");
    function ha() {
    }
    __name(ha, "ha");
    function ba() {
    }
    __name(ba, "ba");
    function Ea() {
    }
    __name(Ea, "Ea");
    function wa() {
    }
    __name(wa, "wa");
    function xa() {
    }
    __name(xa, "xa");
    function Pa() {
      return { close: /* @__PURE__ */ __name(() => {
      }, "close"), on: /* @__PURE__ */ __name(() => {
      }, "on"), removeAllListeners: /* @__PURE__ */ __name(() => {
      }, "removeAllListeners") };
    }
    __name(Pa, "Pa");
    function Ta(t, e) {
      e(null, nn());
    }
    __name(Ta, "Ta");
    var va;
    var Ra;
    var Pi;
    var Ti = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      va = {}, Ra = { existsSync: la, lstatSync: nn, stat: Ta, statSync: ua, readdirSync: ca, readdir: pa, readlinkSync: ma, realpathSync: da, chmodSync: fa, renameSync: ga, mkdirSync: ya, rmdirSync: ha, rmSync: ba, unlinkSync: Ea, watchFile: wa, unwatchFile: xa, watch: Pa, promises: va }, Pi = Ra;
    });
    var vi = yt((Yp, Aa) => {
      Aa.exports = { name: "@prisma/internals", version: "6.19.3", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", "escape-string-regexp": "5.0.0", execa: "8.0.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "global-directory": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-engine-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
    });
    function Sa(...t) {
      return t.join("/");
    }
    __name(Sa, "Sa");
    function Ia(...t) {
      return t.join("/");
    }
    __name(Ia, "Ia");
    function Da(t) {
      let e = Ri(t), r = Ai(t), [n, i] = e.split(".");
      return { root: "/", dir: r, base: e, ext: i, name: n };
    }
    __name(Da, "Da");
    function Ri(t) {
      let e = t.split("/");
      return e[e.length - 1];
    }
    __name(Ri, "Ri");
    function Ai(t) {
      return t.split("/").slice(0, -1).join("/");
    }
    __name(Ai, "Ai");
    function ka(t) {
      let e = t.split("/").filter((i) => i !== "" && i !== "."), r = [];
      for (let i of e) i === ".." ? r.pop() : r.push(i);
      let n = r.join("/");
      return t.startsWith("/") ? "/" + n : n;
    }
    __name(ka, "ka");
    var Ci;
    var Oa;
    var _a3;
    var Ma;
    var cr;
    var Si = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Ci = "/", Oa = ":";
      _a3 = { sep: Ci }, Ma = { basename: Ri, delimiter: Oa, dirname: Ai, join: Ia, normalize: ka, parse: Da, posix: _a3, resolve: Sa, sep: Ci }, cr = Ma;
    });
    var un = yt((ud, qa) => {
      qa.exports = { name: "@prisma/engines-version", version: "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var Di = yt((dr) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Object.defineProperty(dr, "__esModule", { value: true });
      dr.enginesVersion = void 0;
      dr.enginesVersion = un().prisma.enginesVersion;
    });
    var _i = yt((vd, ki) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      ki.exports = (t, e = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof t != "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0) return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
      };
    });
    var hn = yt((eb, qi) => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      qi.exports = /* @__PURE__ */ (function() {
        function t(e, r, n, i, o) {
          return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        __name(t, "t");
        return function(e, r) {
          if (e === r) return 0;
          if (e.length > r.length) {
            var n = e;
            e = r, r = n;
          }
          for (var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1); ) i--, o--;
          for (var s = 0; s < i && e.charCodeAt(s) === r.charCodeAt(s); ) s++;
          if (i -= s, o -= s, i === 0 || o < 3) return o;
          var a = 0, f, v, R, A, I, C, L, D, k, Ee, ee, U, te = [];
          for (f = 0; f < i; f++) te.push(f + 1), te.push(e.charCodeAt(s + f));
          for (var Oe = te.length - 1; a < o - 3; ) for (k = r.charCodeAt(s + (v = a)), Ee = r.charCodeAt(s + (R = a + 1)), ee = r.charCodeAt(s + (A = a + 2)), U = r.charCodeAt(s + (I = a + 3)), C = a += 4, f = 0; f < Oe; f += 2) L = te[f], D = te[f + 1], v = t(L, v, R, k, D), R = t(v, R, A, Ee, D), A = t(R, A, I, ee, D), C = t(A, I, C, U, D), te[f] = C, I = A, A = R, R = v, v = L;
          for (; a < o; ) for (k = r.charCodeAt(s + (v = a)), C = ++a, f = 0; f < Oe; f += 2) L = te[f], te[f] = C = t(L, v, C, k, te[f + 1]), v = L;
          return C;
        };
      })();
    });
    var Qi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
    });
    var Gi = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
    });
    var Fr;
    var yo = ae(() => {
      "use strict";
      u();
      c();
      p();
      m();
      d();
      l();
      Fr = class {
        static {
          __name(this, "Fr");
        }
        events = {};
        on(e, r) {
          return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
          return this.events[e] ? (this.events[e].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      };
    });
    var zu = {};
    ht(zu, { DMMF: /* @__PURE__ */ __name(() => At, "DMMF"), Debug: /* @__PURE__ */ __name(() => j, "Debug"), Decimal: /* @__PURE__ */ __name(() => xe, "Decimal"), Extensions: /* @__PURE__ */ __name(() => Zr, "Extensions"), MetricsClient: /* @__PURE__ */ __name(() => nt, "MetricsClient"), PrismaClientInitializationError: /* @__PURE__ */ __name(() => M, "PrismaClientInitializationError"), PrismaClientKnownRequestError: /* @__PURE__ */ __name(() => X, "PrismaClientKnownRequestError"), PrismaClientRustPanicError: /* @__PURE__ */ __name(() => Te, "PrismaClientRustPanicError"), PrismaClientUnknownRequestError: /* @__PURE__ */ __name(() => Q, "PrismaClientUnknownRequestError"), PrismaClientValidationError: /* @__PURE__ */ __name(() => Y, "PrismaClientValidationError"), Public: /* @__PURE__ */ __name(() => en, "Public"), Sql: /* @__PURE__ */ __name(() => ne, "Sql"), createParam: /* @__PURE__ */ __name(() => ao, "createParam"), defineDmmfProperty: /* @__PURE__ */ __name(() => fo, "defineDmmfProperty"), deserializeJsonResponse: /* @__PURE__ */ __name(() => lt, "deserializeJsonResponse"), deserializeRawResult: /* @__PURE__ */ __name(() => Gr, "deserializeRawResult"), dmmfToRuntimeDataModel: /* @__PURE__ */ __name(() => Ui, "dmmfToRuntimeDataModel"), empty: /* @__PURE__ */ __name(() => bo, "empty"), getPrismaClient: /* @__PURE__ */ __name(() => Fs, "getPrismaClient"), getRuntime: /* @__PURE__ */ __name(() => ut, "getRuntime"), join: /* @__PURE__ */ __name(() => ho, "join"), makeStrictEnum: /* @__PURE__ */ __name(() => Ns, "makeStrictEnum"), makeTypedQueryFactory: /* @__PURE__ */ __name(() => go, "makeTypedQueryFactory"), objectEnumValues: /* @__PURE__ */ __name(() => Ar, "objectEnumValues"), raw: /* @__PURE__ */ __name(() => An, "raw"), serializeJsonQuery: /* @__PURE__ */ __name(() => _r, "serializeJsonQuery"), skip: /* @__PURE__ */ __name(() => kr, "skip"), sqltag: /* @__PURE__ */ __name(() => Cn, "sqltag"), warnEnvConflicts: /* @__PURE__ */ __name(() => void 0, "warnEnvConflicts"), warnOnce: /* @__PURE__ */ __name(() => Tt, "warnOnce") });
    module.exports = Gs(zu);
    u();
    c();
    p();
    m();
    d();
    l();
    var Zr = {};
    ht(Zr, { defineExtension: /* @__PURE__ */ __name(() => si, "defineExtension"), getExtensionContext: /* @__PURE__ */ __name(() => ai, "getExtensionContext") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function si(t) {
      return typeof t == "function" ? t : (e) => e.$extends(t);
    }
    __name(si, "si");
    u();
    c();
    p();
    m();
    d();
    l();
    function ai(t) {
      return t;
    }
    __name(ai, "ai");
    var en = {};
    ht(en, { validator: /* @__PURE__ */ __name(() => li, "validator") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function li(...t) {
      return (e) => e;
    }
    __name(li, "li");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var tn;
    var ui;
    var ci;
    var pi;
    var mi = true;
    typeof g < "u" && ({ FORCE_COLOR: tn, NODE_DISABLE_COLORS: ui, NO_COLOR: ci, TERM: pi } = g.env || {}, mi = g.stdout && g.stdout.isTTY);
    var na = { enabled: !ui && ci == null && pi !== "dumb" && (tn != null && tn !== "0" || mi) };
    function q(t, e) {
      let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
      return function(o) {
        return !na.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(q, "q");
    var Kc = q(0, 0);
    var ar = q(1, 22);
    var lr = q(2, 22);
    var Hc = q(3, 23);
    var di = q(4, 24);
    var zc = q(7, 27);
    var Yc = q(8, 28);
    var Xc = q(9, 29);
    var Zc = q(30, 39);
    var Ge = q(31, 39);
    var fi = q(32, 39);
    var gi = q(33, 39);
    var yi = q(34, 39);
    var ep = q(35, 39);
    var hi = q(36, 39);
    var tp = q(37, 39);
    var bi = q(90, 39);
    var rp = q(90, 39);
    var np = q(40, 49);
    var ip = q(41, 49);
    var op = q(42, 49);
    var sp = q(43, 49);
    var ap = q(44, 49);
    var lp = q(45, 49);
    var up = q(46, 49);
    var cp3 = q(47, 49);
    u();
    c();
    p();
    m();
    d();
    l();
    var ia = 100;
    var Ei = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var ur = [];
    var wi = Date.now();
    var oa = 0;
    var rn = typeof g < "u" ? g.env : {};
    globalThis.DEBUG ??= rn.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= rn.DEBUG_COLORS ? rn.DEBUG_COLORS === "true" : true;
    var wt = { enable(t) {
      typeof t == "string" && (globalThis.DEBUG = t);
    }, disable() {
      let t = globalThis.DEBUG;
      return globalThis.DEBUG = "", t;
    }, enabled(t) {
      let e = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i) => i === "" || i[0] === "-" ? false : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i) => i === "" || i[0] !== "-" ? false : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: /* @__PURE__ */ __name((...t) => {
      let [e, r, ...n] = t;
      (console.warn ?? console.log)(`${e} ${r}`, ...n);
    }, "log"), formatters: {} };
    function sa(t) {
      let e = { color: Ei[oa++ % Ei.length], enabled: wt.enabled(t), namespace: t, log: wt.log, extend: /* @__PURE__ */ __name(() => {
      }, "extend") }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = e;
        if (n.length !== 0 && ur.push([o, ...n]), ur.length > ia && ur.shift(), wt.enabled(o) || i) {
          let f = n.map((R) => typeof R == "string" ? R : aa(R)), v = `+${Date.now() - wi}ms`;
          wi = Date.now(), a(o, ...f, v);
        }
      }, "r");
      return new Proxy(r, { get: /* @__PURE__ */ __name((n, i) => e[i], "get"), set: /* @__PURE__ */ __name((n, i, o) => e[i] = o, "set") });
    }
    __name(sa, "sa");
    var j = new Proxy(sa, { get: /* @__PURE__ */ __name((t, e) => wt[e], "get"), set: /* @__PURE__ */ __name((t, e, r) => wt[e] = r, "set") });
    function aa(t, e = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(t, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i)) return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint") return i.toString();
        return i;
      }, e);
    }
    __name(aa, "aa");
    function xi() {
      ur.length = 0;
    }
    __name(xi, "xi");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var on2 = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    u();
    c();
    p();
    m();
    d();
    l();
    var Ca = vi();
    var sn = Ca.version;
    u();
    c();
    p();
    m();
    d();
    l();
    function Je(t) {
      let e = La();
      return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Fa());
    }
    __name(Je, "Je");
    function La() {
      let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
      return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
    }
    __name(La, "La");
    function Fa() {
      return "library";
    }
    __name(Fa, "Fa");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function an(t) {
      return t.name === "DriverAdapterError" && typeof t.cause == "object";
    }
    __name(an, "an");
    u();
    c();
    p();
    m();
    d();
    l();
    function pr(t) {
      return { ok: true, value: t, map(e) {
        return pr(e(t));
      }, flatMap(e) {
        return e(t);
      } };
    }
    __name(pr, "pr");
    function Le(t) {
      return { ok: false, error: t, map() {
        return Le(t);
      }, flatMap() {
        return Le(t);
      } };
    }
    __name(Le, "Le");
    var Ii = j("driver-adapter-utils");
    var ln = class {
      static {
        __name(this, "ln");
      }
      registeredErrors = [];
      consumeError(e) {
        return this.registeredErrors[e];
      }
      registerNewError(e) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; ) r++;
        return this.registeredErrors[r] = { error: e }, r;
      }
    };
    var mr = /* @__PURE__ */ __name((t, e = new ln()) => {
      let r = { adapterName: t.adapterName, errorRegistry: e, queryRaw: Pe(e, t.queryRaw.bind(t)), executeRaw: Pe(e, t.executeRaw.bind(t)), executeScript: Pe(e, t.executeScript.bind(t)), dispose: Pe(e, t.dispose.bind(t)), provider: t.provider, startTransaction: /* @__PURE__ */ __name(async (...n) => (await Pe(e, t.startTransaction.bind(t))(...n)).map((o) => Na(e, o)), "startTransaction") };
      return t.getConnectionInfo && (r.getConnectionInfo = Ua(e, t.getConnectionInfo.bind(t))), r;
    }, "mr");
    var Na = /* @__PURE__ */ __name((t, e) => ({ adapterName: e.adapterName, provider: e.provider, options: e.options, queryRaw: Pe(t, e.queryRaw.bind(e)), executeRaw: Pe(t, e.executeRaw.bind(e)), commit: Pe(t, e.commit.bind(e)), rollback: Pe(t, e.rollback.bind(e)) }), "Na");
    function Pe(t, e) {
      return async (...r) => {
        try {
          return pr(await e(...r));
        } catch (n) {
          if (Ii("[error@wrapAsync]", n), an(n)) return Le(n.cause);
          let i = t.registerNewError(n);
          return Le({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Pe, "Pe");
    function Ua(t, e) {
      return (...r) => {
        try {
          return pr(e(...r));
        } catch (n) {
          if (Ii("[error@wrapSync]", n), an(n)) return Le(n.cause);
          let i = t.registerNewError(n);
          return Le({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Ua, "Ua");
    u();
    c();
    p();
    m();
    d();
    l();
    var Oi = "prisma+postgres";
    var fr = `${Oi}:`;
    function gr(t) {
      return t?.toString().startsWith(`${fr}//`) ?? false;
    }
    __name(gr, "gr");
    function cn(t) {
      if (!gr(t)) return false;
      let { host: e } = new URL(t);
      return e.includes("localhost") || e.includes("127.0.0.1") || e.includes("[::1]");
    }
    __name(cn, "cn");
    var Pt = {};
    ht(Pt, { error: /* @__PURE__ */ __name(() => $a, "error"), info: /* @__PURE__ */ __name(() => Ba, "info"), log: /* @__PURE__ */ __name(() => Va, "log"), query: /* @__PURE__ */ __name(() => ja, "query"), should: /* @__PURE__ */ __name(() => Mi, "should"), tags: /* @__PURE__ */ __name(() => xt, "tags"), warn: /* @__PURE__ */ __name(() => pn, "warn") });
    u();
    c();
    p();
    m();
    d();
    l();
    var xt = { error: Ge("prisma:error"), warn: gi("prisma:warn"), info: hi("prisma:info"), query: yi("prisma:query") };
    var Mi = { warn: /* @__PURE__ */ __name(() => !g.env.PRISMA_DISABLE_WARNINGS, "warn") };
    function Va(...t) {
      console.log(...t);
    }
    __name(Va, "Va");
    function pn(t, ...e) {
      Mi.warn() && console.warn(`${xt.warn} ${t}`, ...e);
    }
    __name(pn, "pn");
    function Ba(t, ...e) {
      console.info(`${xt.info} ${t}`, ...e);
    }
    __name(Ba, "Ba");
    function $a(t, ...e) {
      console.error(`${xt.error} ${t}`, ...e);
    }
    __name($a, "$a");
    function ja(t, ...e) {
      console.log(`${xt.query} ${t}`, ...e);
    }
    __name(ja, "ja");
    u();
    c();
    p();
    m();
    d();
    l();
    function yr(t, e) {
      if (!t) throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(yr, "yr");
    u();
    c();
    p();
    m();
    d();
    l();
    function Fe(t, e) {
      throw new Error(e);
    }
    __name(Fe, "Fe");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function mn({ onlyFirst: t = false } = {}) {
      let r = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
      return new RegExp(r, t ? void 0 : "g");
    }
    __name(mn, "mn");
    var Qa = mn();
    function dn(t) {
      if (typeof t != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof t}\``);
      return t.replace(Qa, "");
    }
    __name(dn, "dn");
    u();
    c();
    p();
    m();
    d();
    l();
    function fn(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    __name(fn, "fn");
    u();
    c();
    p();
    m();
    d();
    l();
    function hr(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(hr, "hr");
    u();
    c();
    p();
    m();
    d();
    l();
    function gn(t, e) {
      if (t.length === 0) return;
      let r = t[0];
      for (let n = 1; n < t.length; n++) e(r, t[n]) < 0 && (r = t[n]);
      return r;
    }
    __name(gn, "gn");
    u();
    c();
    p();
    m();
    d();
    l();
    function O(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(O, "O");
    u();
    c();
    p();
    m();
    d();
    l();
    var Li = /* @__PURE__ */ new Set();
    var Tt = /* @__PURE__ */ __name((t, e, ...r) => {
      Li.has(t) || (Li.add(t), pn(e, ...r));
    }, "Tt");
    var M = class t extends Error {
      static {
        __name(this, "t");
      }
      clientVersion;
      errorCode;
      retryable;
      constructor(e, r, n) {
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    };
    O(M, "PrismaClientInitializationError");
    u();
    c();
    p();
    m();
    d();
    l();
    var X = class extends Error {
      static {
        __name(this, "X");
      }
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    };
    O(X, "PrismaClientKnownRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Te = class extends Error {
      static {
        __name(this, "Te");
      }
      clientVersion;
      constructor(e, r) {
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    };
    O(Te, "PrismaClientRustPanicError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Q = class extends Error {
      static {
        __name(this, "Q");
      }
      clientVersion;
      batchRequestIdx;
      constructor(e, { clientVersion: r, batchRequestIdx: n }) {
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    };
    O(Q, "PrismaClientUnknownRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Y = class extends Error {
      static {
        __name(this, "Y");
      }
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(e, { clientVersion: r }) {
        super(e), this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    };
    O(Y, "PrismaClientValidationError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var fe = class {
      static {
        __name(this, "fe");
      }
      _map = /* @__PURE__ */ new Map();
      get(e) {
        return this._map.get(e)?.value;
      }
      set(e, r) {
        this._map.set(e, { value: r });
      }
      getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n) return n.value;
        let i = r();
        return this.set(e, i), i;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function Ce(t) {
      return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
    __name(Ce, "Ce");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ni(t, e) {
      let r = {};
      for (let n of t) {
        let i = n[e];
        r[i] = n;
      }
      return r;
    }
    __name(Ni, "Ni");
    u();
    c();
    p();
    m();
    d();
    l();
    function vt(t) {
      let e;
      return { get() {
        return e || (e = { value: t() }), e.value;
      } };
    }
    __name(vt, "vt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ui(t) {
      return { models: yn(t.models), enums: yn(t.enums), types: yn(t.types) };
    }
    __name(Ui, "Ui");
    function yn(t) {
      let e = {};
      for (let { name: r, ...n } of t) e[r] = n;
      return e;
    }
    __name(yn, "yn");
    u();
    c();
    p();
    m();
    d();
    l();
    function We(t) {
      return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
    }
    __name(We, "We");
    function br(t) {
      return t.toString() !== "Invalid Date";
    }
    __name(br, "br");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function Ke(t) {
      return P.isDecimal(t) ? true : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
    }
    __name(Ke, "Ke");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var At = {};
    ht(At, { ModelAction: /* @__PURE__ */ __name(() => Rt, "ModelAction"), datamodelEnumToSchemaEnum: /* @__PURE__ */ __name(() => Ga, "datamodelEnumToSchemaEnum") });
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function Ga(t) {
      return { name: t.name, values: t.values.map((e) => e.name) };
    }
    __name(Ga, "Ga");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rt = ((U) => (U.findUnique = "findUnique", U.findUniqueOrThrow = "findUniqueOrThrow", U.findFirst = "findFirst", U.findFirstOrThrow = "findFirstOrThrow", U.findMany = "findMany", U.create = "create", U.createMany = "createMany", U.createManyAndReturn = "createManyAndReturn", U.update = "update", U.updateMany = "updateMany", U.updateManyAndReturn = "updateManyAndReturn", U.upsert = "upsert", U.delete = "delete", U.deleteMany = "deleteMany", U.groupBy = "groupBy", U.count = "count", U.aggregate = "aggregate", U.findRaw = "findRaw", U.aggregateRaw = "aggregateRaw", U))(Rt || {});
    var Ja = bt(_i());
    var Wa = { red: Ge, gray: bi, dim: lr, bold: ar, underline: di, highlightSource: /* @__PURE__ */ __name((t) => t.highlight(), "highlightSource") };
    var Ka = { red: /* @__PURE__ */ __name((t) => t, "red"), gray: /* @__PURE__ */ __name((t) => t, "gray"), dim: /* @__PURE__ */ __name((t) => t, "dim"), bold: /* @__PURE__ */ __name((t) => t, "bold"), underline: /* @__PURE__ */ __name((t) => t, "underline"), highlightSource: /* @__PURE__ */ __name((t) => t, "highlightSource") };
    function Ha({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${e}()`, message: t, isPanic: r ?? false, callArguments: n };
    }
    __name(Ha, "Ha");
    function za({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], f = e ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${t}\``)} invocation${f}`))) : a.push(s.red(`Invalid ${s.bold(`\`${t}\``)} invocation${f}`)), e && a.push(s.underline(Ya(e))), i) {
        a.push("");
        let v = [i.toString()];
        o && (v.push(o), v.push(s.dim(")"))), a.push(v.join("")), o && a.push("");
      } else a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(za, "za");
    function Ya(t) {
      let e = [t.fileName];
      return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
    }
    __name(Ya, "Ya");
    function Er(t) {
      let e = t.showColors ? Wa : Ka, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = Ha(t), za(r, e);
    }
    __name(Er, "Er");
    u();
    c();
    p();
    m();
    d();
    l();
    var Wi = bt(hn());
    u();
    c();
    p();
    m();
    d();
    l();
    function $i(t, e, r) {
      let n = ji(t), i = Xa(n), o = el(i);
      o ? wr(o, e, r) : e.addErrorMessage(() => "Unknown error");
    }
    __name($i, "$i");
    function ji(t) {
      return t.errors.flatMap((e) => e.kind === "Union" ? ji(e) : [e]);
    }
    __name(ji, "ji");
    function Xa(t) {
      let e = /* @__PURE__ */ new Map(), r = [];
      for (let n of t) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, { ...n, argument: { ...n.argument, typeNames: Za(o.argument.typeNames, n.argument.typeNames) } }) : e.set(i, n);
      }
      return r.push(...e.values()), r;
    }
    __name(Xa, "Xa");
    function Za(t, e) {
      return [...new Set(t.concat(e))];
    }
    __name(Za, "Za");
    function el(t) {
      return gn(t, (e, r) => {
        let n = Vi(e), i = Vi(r);
        return n !== i ? n - i : Bi(e) - Bi(r);
      });
    }
    __name(el, "el");
    function Vi(t) {
      let e = 0;
      return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
    }
    __name(Vi, "Vi");
    function Bi(t) {
      switch (t.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(Bi, "Bi");
    u();
    c();
    p();
    m();
    d();
    l();
    var se = class {
      static {
        __name(this, "se");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    Gi();
    u();
    c();
    p();
    m();
    d();
    l();
    var He = class {
      static {
        __name(this, "He");
      }
      constructor(e = 0, r) {
        this.context = r;
        this.currentIndent = e;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
      }
      writeJoined(e, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++) n(r[o], this), o !== i && this.write(e);
        return this;
      }
      writeLine(e) {
        return this.write(e).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
      }
      withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
      }
      afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(e) {
        return this.marginSymbol = e, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
      }
    };
    Qi();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var xr = class {
      static {
        __name(this, "xr");
      }
      constructor(e) {
        this.value = e;
      }
      write(e) {
        e.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Pr = /* @__PURE__ */ __name((t) => t, "Pr");
    var Tr = { bold: Pr, red: Pr, green: Pr, dim: Pr, enabled: false };
    var Ji = { bold: ar, red: Ge, green: fi, dim: lr, enabled: true };
    var ze = { write(t) {
      t.writeLine(",");
    } };
    u();
    c();
    p();
    m();
    d();
    l();
    var ge = class {
      static {
        __name(this, "ge");
      }
      constructor(e) {
        this.contents = e;
      }
      isUnderlined = false;
      color = /* @__PURE__ */ __name((e) => e, "color");
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(e) {
        return this.color = e, this;
      }
      write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(() => {
          e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Se = class {
      static {
        __name(this, "Se");
      }
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    };
    var Ye = class extends Se {
      static {
        __name(this, "Ye");
      }
      items = [];
      addItem(e) {
        return this.items.push(new xr(e)), this;
      }
      getField(e) {
        return this.items[e];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(e) {
        if (this.items.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithItems(e);
      }
      writeEmpty(e) {
        let r = new ge("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(() => e.writeJoined(ze, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    };
    var Xe = class t extends Se {
      static {
        __name(this, "t");
      }
      fields = {};
      suggestions = [];
      addField(e) {
        this.fields[e.name] = e;
      }
      addSuggestion(e) {
        this.suggestions.push(e);
      }
      getField(e) {
        return this.fields[e];
      }
      getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i) return;
        let o = i;
        for (let s of n) {
          let a;
          if (o.value instanceof t ? a = o.value.getField(s) : o.value instanceof Ye && (a = o.value.getField(Number(s))), !a) return;
          o = a;
        }
        return o;
      }
      getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
      }
      hasField(e) {
        return !!this.getField(e);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(e) {
        delete this.fields[e];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(e) {
        return this.getField(e)?.value;
      }
      getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e) {
          if (!(r instanceof t)) return;
          let i = r.getSubSelectionValue(n);
          if (!i) return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r) return;
        let n = r;
        for (let i of e) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof t)) return;
          let s = o.getSelectionParent();
          if (!s) return;
          n = s;
        }
        return n;
      }
      getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e) return { kind: "select", value: e };
        let r = this.getField("include")?.value.asObject();
        if (r) return { kind: "include", value: r };
      }
      getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
      }
      getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n) => n.getPrintWidth())) + 2;
      }
      write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithContents(e, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(e) {
        let r = new ge("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithContents(e, r) {
        e.writeLine("{").withIndent(() => {
          e.writeJoined(ze, [...r, ...this.suggestions]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var z = class extends Se {
      static {
        __name(this, "z");
      }
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new ge(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Ct = class {
      static {
        __name(this, "Ct");
      }
      fields = [];
      addField(e, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(() => {
          e.writeJoined(ze, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    };
    function wr(t, e, r) {
      switch (t.kind) {
        case "MutuallyExclusiveFields":
          tl(t, e);
          break;
        case "IncludeOnScalar":
          rl(t, e);
          break;
        case "EmptySelection":
          nl(t, e, r);
          break;
        case "UnknownSelectionField":
          al(t, e);
          break;
        case "InvalidSelectionValue":
          ll(t, e);
          break;
        case "UnknownArgument":
          ul(t, e);
          break;
        case "UnknownInputField":
          cl(t, e);
          break;
        case "RequiredArgumentMissing":
          pl(t, e);
          break;
        case "InvalidArgumentType":
          ml(t, e);
          break;
        case "InvalidArgumentValue":
          dl(t, e);
          break;
        case "ValueTooLarge":
          fl(t, e);
          break;
        case "SomeFieldsMissing":
          gl(t, e);
          break;
        case "TooManyFieldsGiven":
          yl(t, e);
          break;
        case "Union":
          $i(t, e, r);
          break;
        default:
          throw new Error("not implemented: " + t.kind);
      }
    }
    __name(wr, "wr");
    function tl(t, e) {
      let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(tl, "tl");
    function rl(t, e) {
      let [r, n] = Ze(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i)) for (let s of i.fields) s.isRelation && o.addSuggestion(new se(s.name, "true"));
      e.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${St(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(rl, "rl");
    function nl(t, e, r) {
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          il(t, e, i);
          return;
        }
        if (n.hasField("select")) {
          ol(t, e);
          return;
        }
      }
      if (r?.[Ce(t.outputType.name)]) {
        sl(t, e);
        return;
      }
      e.addErrorMessage(() => `Unknown field at "${t.selectionPath.join(".")} selection"`);
    }
    __name(nl, "nl");
    function il(t, e, r) {
      r.removeAllFields();
      for (let n of t.outputType.fields) r.addSuggestion(new se(n.name, "false"));
      e.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(il, "il");
    function ol(t, e) {
      let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), zi(n, r)), e.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${St(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(ol, "ol");
    function sl(t, e) {
      let r = new Ct();
      for (let i of t.outputType.fields) i.isRelation || r.addField(i.name, "false");
      let n = new se("omit", r).makeRequired();
      if (t.selectionPath.length === 0) e.arguments.addSuggestion(n);
      else {
        let [i, o] = Ze(t.selectionPath), a = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let f = a?.value.asObject() ?? new Xe();
          f.addSuggestion(n), a.value = f;
        }
      }
      e.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(sl, "sl");
    function al(t, e) {
      let r = Yi(t.selectionPath, e);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            zi(n, t.outputType);
            break;
          case "include":
            hl(n, t.outputType);
            break;
          case "omit":
            bl(n, t.outputType);
            break;
        }
      }
      e.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(St(n)), i.join(" ");
      });
    }
    __name(al, "al");
    function ll(t, e) {
      let r = Yi(t.selectionPath, e);
      r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
    }
    __name(ll, "ll");
    function ul(t, e) {
      let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), El(n, t.arguments)), e.addErrorMessage((i) => Ki(i, r, t.arguments.map((o) => o.name)));
    }
    __name(ul, "ul");
    function cl(t, e) {
      let [r, n] = Ze(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && Xi(o, t.inputType);
      }
      e.addErrorMessage((o) => Ki(o, n, t.inputType.fields.map((s) => s.name)));
    }
    __name(cl, "cl");
    function Ki(t, e, r) {
      let n = [`Unknown argument \`${t.red(e)}\`.`], i = xl(e, r);
      return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(St(t)), n.join(" ");
    }
    __name(Ki, "Ki");
    function pl(t, e) {
      let r;
      e.addErrorMessage((f) => r?.value instanceof z && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (!n) return;
      let [i, o] = Ze(t.argumentPath), s = new Ct(), a = n.getDeepFieldValue(i)?.asObject();
      if (a) {
        if (r = a.getField(o), r && a.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
          for (let f of t.inputTypes[0].fields) s.addField(f.name, f.typeNames.join(" | "));
          a.addSuggestion(new se(o, s).makeRequired());
        } else {
          let f = t.inputTypes.map(Hi).join(" | ");
          a.addSuggestion(new se(o, f).makeRequired());
        }
        if (t.dependentArgumentPath) {
          n.getDeepField(t.dependentArgumentPath)?.markAsError();
          let [, f] = Ze(t.dependentArgumentPath);
          e.addErrorMessage((v) => `Argument \`${v.green(o)}\` is required because argument \`${v.green(f)}\` was provided.`);
        }
      }
    }
    __name(pl, "pl");
    function Hi(t) {
      return t.kind === "list" ? `${Hi(t.elementType)}[]` : t.name;
    }
    __name(Hi, "Hi");
    function ml(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = vr("or", t.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
      });
    }
    __name(ml, "ml");
    function dl(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
          let s = vr("or", t.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(dl, "dl");
    function fl(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(t.argumentPath)?.value;
        s?.markAsError(), s instanceof z && (i = s.text);
      }
      e.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(fl, "fl");
    function gl(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && Xi(i, t.inputType);
      }
      e.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${vr("or", t.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(St(i)), o.join(" ");
      });
    }
    __name(gl, "gl");
    function yl(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      e.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${vr("and", i.map((a) => o.red(a)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${t.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(yl, "yl");
    function zi(t, e) {
      for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new se(r.name, "true"));
    }
    __name(zi, "zi");
    function hl(t, e) {
      for (let r of e.fields) r.isRelation && !t.hasField(r.name) && t.addSuggestion(new se(r.name, "true"));
    }
    __name(hl, "hl");
    function bl(t, e) {
      for (let r of e.fields) !t.hasField(r.name) && !r.isRelation && t.addSuggestion(new se(r.name, "true"));
    }
    __name(bl, "bl");
    function El(t, e) {
      for (let r of e) t.hasField(r.name) || t.addSuggestion(new se(r.name, r.typeNames.join(" | ")));
    }
    __name(El, "El");
    function Yi(t, e) {
      let [r, n] = Ze(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i) return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
      return o && f ? { parentKind: "select", parent: o, field: f, fieldName: n } : (f = s?.getField(n), s && f ? { parentKind: "include", field: f, parent: s, fieldName: n } : (f = a?.getField(n), a && f ? { parentKind: "omit", field: f, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(Yi, "Yi");
    function Xi(t, e) {
      if (e.kind === "object") for (let r of e.fields) t.hasField(r.name) || t.addSuggestion(new se(r.name, r.typeNames.join(" | ")));
    }
    __name(Xi, "Xi");
    function Ze(t) {
      let e = [...t], r = e.pop();
      if (!r) throw new Error("unexpected empty path");
      return [e, r];
    }
    __name(Ze, "Ze");
    function St({ green: t, enabled: e }) {
      return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
    }
    __name(St, "St");
    function vr(t, e) {
      if (e.length === 1) return e[0];
      let r = [...e], n = r.pop();
      return `${r.join(", ")} ${t} ${n}`;
    }
    __name(vr, "vr");
    var wl = 3;
    function xl(t, e) {
      let r = 1 / 0, n;
      for (let i of e) {
        let o = (0, Wi.default)(t, i);
        o > wl || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(xl, "xl");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var It = class {
      static {
        __name(this, "It");
      }
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(e, r, n, i, o) {
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    };
    function et(t) {
      return t instanceof It;
    }
    __name(et, "et");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rr = /* @__PURE__ */ Symbol();
    var En = /* @__PURE__ */ new WeakMap();
    var ve = class {
      static {
        __name(this, "ve");
      }
      constructor(e) {
        e === Rr ? En.set(this, `Prisma.${this._getName()}`) : En.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return En.get(this);
      }
    };
    var Dt = class extends ve {
      static {
        __name(this, "Dt");
      }
      _getNamespace() {
        return "NullTypes";
      }
    };
    var Ot = class extends Dt {
      static {
        __name(this, "Ot");
      }
      #e;
    };
    wn(Ot, "DbNull");
    var kt = class extends Dt {
      static {
        __name(this, "kt");
      }
      #e;
    };
    wn(kt, "JsonNull");
    var _t = class extends Dt {
      static {
        __name(this, "_t");
      }
      #e;
    };
    wn(_t, "AnyNull");
    var Ar = { classes: { DbNull: Ot, JsonNull: kt, AnyNull: _t }, instances: { DbNull: new Ot(Rr), JsonNull: new kt(Rr), AnyNull: new _t(Rr) } };
    function wn(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(wn, "wn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Zi = ": ";
    var Cr = class {
      static {
        __name(this, "Cr");
      }
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + Zi.length;
      }
      write(e) {
        let r = new ge(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(Zi).write(this.value);
      }
    };
    var xn = class {
      static {
        __name(this, "xn");
      }
      arguments;
      errorMessages = [];
      constructor(e) {
        this.arguments = e;
      }
      write(e) {
        e.write(this.arguments);
      }
      addErrorMessage(e) {
        this.errorMessages.push(e);
      }
      renderAllMessages(e) {
        return this.errorMessages.map((r) => r(e)).join(`
`);
      }
    };
    function tt(t) {
      return new xn(eo(t));
    }
    __name(tt, "tt");
    function eo(t) {
      let e = new Xe();
      for (let [r, n] of Object.entries(t)) {
        let i = new Cr(r, to(n));
        e.addField(i);
      }
      return e;
    }
    __name(eo, "eo");
    function to(t) {
      if (typeof t == "string") return new z(JSON.stringify(t));
      if (typeof t == "number" || typeof t == "boolean") return new z(String(t));
      if (typeof t == "bigint") return new z(`${t}n`);
      if (t === null) return new z("null");
      if (t === void 0) return new z("undefined");
      if (Ke(t)) return new z(`new Prisma.Decimal("${t.toFixed()}")`);
      if (t instanceof Uint8Array) return h.isBuffer(t) ? new z(`Buffer.alloc(${t.byteLength})`) : new z(`new Uint8Array(${t.byteLength})`);
      if (t instanceof Date) {
        let e = br(t) ? t.toISOString() : "Invalid Date";
        return new z(`new Date("${e}")`);
      }
      return t instanceof ve ? new z(`Prisma.${t._getName()}`) : et(t) ? new z(`prisma.${Ce(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Pl(t) : typeof t == "object" ? eo(t) : new z(Object.prototype.toString.call(t));
    }
    __name(to, "to");
    function Pl(t) {
      let e = new Ye();
      for (let r of t) e.addItem(to(r));
      return e;
    }
    __name(Pl, "Pl");
    function Sr(t, e) {
      let r = e === "pretty" ? Ji : Tr, n = t.renderAllMessages(r), i = new He(0, { colors: r }).write(t).toString();
      return { message: n, args: i };
    }
    __name(Sr, "Sr");
    function Ir({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = tt(t);
      for (let A of e) wr(A, a, s);
      let { message: f, args: v } = Sr(a, r), R = Er({ message: f, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: v });
      throw new Y(R, { clientVersion: o });
    }
    __name(Ir, "Ir");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function ye(t) {
      return t.replace(/^./, (e) => e.toLowerCase());
    }
    __name(ye, "ye");
    u();
    c();
    p();
    m();
    d();
    l();
    function no(t, e, r) {
      let n = ye(r);
      return !e.result || !(e.result.$allModels || e.result[n]) ? t : Tl({ ...t, ...ro(e.name, t, e.result.$allModels), ...ro(e.name, t, e.result[n]) });
    }
    __name(no, "no");
    function Tl(t) {
      let e = new fe(), r = /* @__PURE__ */ __name((n, i) => e.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), t[n] ? t[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return hr(t, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Tl, "Tl");
    function ro(t, e, r) {
      return r ? hr(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: vl(e, o, i) })) : {};
    }
    __name(ro, "ro");
    function vl(t, e, r) {
      let n = t?.[e]?.compute;
      return n ? (i) => r({ ...i, [e]: n(i) }) : r;
    }
    __name(vl, "vl");
    function io(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (t[n.name]) for (let i of n.needs) r[i] = true;
      return r;
    }
    __name(io, "io");
    function oo(t, e) {
      if (!e) return t;
      let r = { ...t };
      for (let n of Object.values(e)) if (!t[n.name]) for (let i of n.needs) delete r[i];
      return r;
    }
    __name(oo, "oo");
    var Dr = class {
      static {
        __name(this, "Dr");
      }
      constructor(e, r) {
        this.extension = e;
        this.previous = r;
      }
      computedFieldsCache = new fe();
      modelExtensionsCache = new fe();
      queryCallbacksCache = new fe();
      clientExtensions = vt(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = vt(() => {
        let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? e.concat(r) : e;
      });
      getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, () => no(this.previous?.getAllComputedFields(e), this.extension, e));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, () => {
          let r = ye(e);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : { ...this.previous?.getAllModelExtensions(e), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    };
    var rt = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.head = e;
      }
      static empty() {
        return new t();
      }
      static single(e) {
        return new t(new Dr(e));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(e) {
        return new t(new Dr(e, this.head));
      }
      getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
      }
      getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    var Or = class {
      static {
        __name(this, "Or");
      }
      constructor(e) {
        this.name = e;
      }
    };
    function so(t) {
      return t instanceof Or;
    }
    __name(so, "so");
    function ao(t) {
      return new Or(t);
    }
    __name(ao, "ao");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var lo = /* @__PURE__ */ Symbol();
    var Mt = class {
      static {
        __name(this, "Mt");
      }
      constructor(e) {
        if (e !== lo) throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(e) {
        return e === void 0 ? kr : e;
      }
    };
    var kr = new Mt(lo);
    function he(t) {
      return t instanceof Mt;
    }
    __name(he, "he");
    var Rl = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var uo = "explicitly `undefined` values are not allowed";
    function _r({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = rt.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: f, previewFeatures: v, globalOmit: R }) {
      let A = new Pn({ runtimeDataModel: n, modelName: t, action: e, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: f, previewFeatures: v, globalOmit: R });
      return { modelName: t, action: Rl[e], query: Lt(r, A) };
    }
    __name(_r, "_r");
    function Lt({ select: t, include: e, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: po(r, n), selection: Al(t, e, i, n) };
    }
    __name(Lt, "Lt");
    function Al(t, e, r, n) {
      return t ? (e ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Dl(t, n)) : Cl(n, e, r);
    }
    __name(Al, "Al");
    function Cl(t, e, r) {
      let n = {};
      return t.modelOrType && !t.isRawAction() && (n.$composites = true, n.$scalars = true), e && Sl(n, e, t), Il(n, r, t), n;
    }
    __name(Cl, "Cl");
    function Sl(t, e, r) {
      for (let [n, i] of Object.entries(e)) {
        if (he(i)) continue;
        let o = r.nestSelection(n);
        if (Tn(i, o), i === false || i === void 0) {
          t[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          t[n] = Lt(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          t[n] = true;
          continue;
        }
        t[n] = Lt(i, o);
      }
    }
    __name(Sl, "Sl");
    function Il(t, e, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...e }, o = oo(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (he(a)) continue;
        Tn(a, r.nestSelection(s));
        let f = r.findField(s);
        n?.[s] && !f || (t[s] = !a);
      }
    }
    __name(Il, "Il");
    function Dl(t, e) {
      let r = {}, n = e.getComputedFields(), i = io(t, n);
      for (let [o, s] of Object.entries(i)) {
        if (he(s)) continue;
        let a = e.nestSelection(o);
        Tn(s, a);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
          if (s === false || s === void 0 || he(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            f?.kind === "object" ? r[o] = Lt({}, a) : r[o] = true;
            continue;
          }
          r[o] = Lt(s, a);
        }
      }
      return r;
    }
    __name(Dl, "Dl");
    function co(t, e) {
      if (t === null) return null;
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") return t;
      if (typeof t == "bigint") return { $type: "BigInt", value: String(t) };
      if (We(t)) {
        if (br(t)) return { $type: "DateTime", value: t.toISOString() };
        e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (so(t)) return { $type: "Param", value: t.name };
      if (et(t)) return { $type: "FieldRef", value: { _ref: t.name, _container: t.modelName } };
      if (Array.isArray(t)) return Ol(t, e);
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { $type: "Bytes", value: h.from(r, n, i).toString("base64") };
      }
      if (kl(t)) return t.values;
      if (Ke(t)) return { $type: "Decimal", value: t.toFixed() };
      if (t instanceof ve) {
        if (t !== Ar.instances[t._getName()]) throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: t._getName() };
      }
      if (_l(t)) return t.toJSON();
      if (typeof t == "object") return po(t, e);
      e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(co, "co");
    function po(t, e) {
      if (t.$type) return { $type: "Raw", value: t };
      let r = {};
      for (let n in t) {
        let i = t[n], o = e.nestArgument(n);
        he(i) || (i !== void 0 ? r[n] = co(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: e.getSelectionPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: uo }));
      }
      return r;
    }
    __name(po, "po");
    function Ol(t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || he(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${e.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(co(o, i));
      }
      return r;
    }
    __name(Ol, "Ol");
    function kl(t) {
      return typeof t == "object" && t !== null && t.__prismaRawParameters__ === true;
    }
    __name(kl, "kl");
    function _l(t) {
      return typeof t == "object" && t !== null && typeof t.toJSON == "function";
    }
    __name(_l, "_l");
    function Tn(t, e) {
      t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: e.getSelectionPath(), underlyingError: uo });
    }
    __name(Tn, "Tn");
    var Pn = class t {
      static {
        __name(this, "t");
      }
      constructor(e) {
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(e) {
        Ir({ errors: [e], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e) => ({ name: e.name, typeName: "boolean", isRelation: e.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
      }
      getComputedFields() {
        if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(e) {
        return this.modelOrType?.fields.find((r) => r.name === e);
      }
      nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(e) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[Ce(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            Fe(this.params.action, "Unknown action");
        }
      }
      nestArgument(e) {
        return new t({ ...this.params, argumentPath: this.params.argumentPath.concat(e) });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function mo(t) {
      if (!t._hasPreviewFlag("metrics")) throw new Y("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: t._clientVersion });
    }
    __name(mo, "mo");
    var nt = class {
      static {
        __name(this, "nt");
      }
      _client;
      constructor(e) {
        this._client = e;
      }
      prometheus(e) {
        return mo(this._client), this._client._engine.metrics({ format: "prometheus", ...e });
      }
      json(e) {
        return mo(this._client), this._client._engine.metrics({ format: "json", ...e });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function fo(t, e) {
      let r = vt(() => Ml(e));
      Object.defineProperty(t, "dmmf", { get: /* @__PURE__ */ __name(() => r.get(), "get") });
    }
    __name(fo, "fo");
    function Ml(t) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(Ml, "Ml");
    u();
    c();
    p();
    m();
    d();
    l();
    var Rn = /* @__PURE__ */ new WeakMap();
    var Mr = "$$PrismaTypedSql";
    var Ft = class {
      static {
        __name(this, "Ft");
      }
      constructor(e, r) {
        Rn.set(this, { sql: e, values: r }), Object.defineProperty(this, Mr, { value: Mr });
      }
      get sql() {
        return Rn.get(this).sql;
      }
      get values() {
        return Rn.get(this).values;
      }
    };
    function go(t) {
      return (...e) => new Ft(t, e);
    }
    __name(go, "go");
    function Lr(t) {
      return t != null && t[Mr] === Mr;
    }
    __name(Lr, "Lr");
    u();
    c();
    p();
    m();
    d();
    l();
    var Ls = bt(un());
    u();
    c();
    p();
    m();
    d();
    l();
    yo();
    Ti();
    Si();
    u();
    c();
    p();
    m();
    d();
    l();
    var ne = class t {
      static {
        __name(this, "t");
      }
      constructor(e, r) {
        if (e.length - 1 !== r.length) throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s, a) => s + (a instanceof t ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a = e[i];
          if (s instanceof t) {
            this.strings[o] += s.strings[0];
            let f = 0;
            for (; f < s.values.length; ) this.values[o++] = s.values[f++], this.strings[o] = s.strings[f];
            this.strings[o] += a;
          } else this.values[o++] = s, this.strings[o] = a;
        }
      }
      get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; ) n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    };
    function ho(t, e = ",", r = "", n = "") {
      if (t.length === 0) throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new ne([r, ...Array(t.length - 1).fill(e), n], t);
    }
    __name(ho, "ho");
    function An(t) {
      return new ne([t], []);
    }
    __name(An, "An");
    var bo = An("");
    function Cn(t, ...e) {
      return new ne(t, e);
    }
    __name(Cn, "Cn");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function Nt(t) {
      return { getKeys() {
        return Object.keys(t);
      }, getPropertyValue(e) {
        return t[e];
      } };
    }
    __name(Nt, "Nt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Z(t, e) {
      return { getKeys() {
        return [t];
      }, getPropertyValue() {
        return e();
      } };
    }
    __name(Z, "Z");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ne(t) {
      let e = new fe();
      return { getKeys() {
        return t.getKeys();
      }, getPropertyValue(r) {
        return e.getOrCreate(r, () => t.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return t.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ne, "Ne");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Nr = { enumerable: true, configurable: true, writable: true };
    function Ur(t) {
      let e = new Set(t);
      return { getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf"), getOwnPropertyDescriptor: /* @__PURE__ */ __name(() => Nr, "getOwnPropertyDescriptor"), has: /* @__PURE__ */ __name((r, n) => e.has(n), "has"), set: /* @__PURE__ */ __name((r, n, i) => e.add(n) && Reflect.set(r, n, i), "set"), ownKeys: /* @__PURE__ */ __name(() => [...e], "ownKeys") };
    }
    __name(Ur, "Ur");
    var Eo = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    function ce(t, e) {
      let r = Ll(e), n = /* @__PURE__ */ new Set(), i = new Proxy(t, { get(o, s) {
        if (n.has(s)) return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s)) return true;
        let a = r.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = wo(Reflect.ownKeys(o), r), a = wo(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable) return a;
        let f = r.get(s);
        return f ? f.getPropertyDescriptor ? { ...Nr, ...f?.getPropertyDescriptor(s) } : Nr : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      }, getPrototypeOf: /* @__PURE__ */ __name(() => Object.prototype, "getPrototypeOf") });
      return i[Eo] = function() {
        let o = { ...this };
        return delete o[Eo], o;
      }, i;
    }
    __name(ce, "ce");
    function Ll(t) {
      let e = /* @__PURE__ */ new Map();
      for (let r of t) {
        let n = r.getKeys();
        for (let i of n) e.set(i, r);
      }
      return e;
    }
    __name(Ll, "Ll");
    function wo(t, e) {
      return t.filter((r) => e.get(r)?.has?.(r) ?? true);
    }
    __name(wo, "wo");
    u();
    c();
    p();
    m();
    d();
    l();
    function it(t) {
      return { getKeys() {
        return t;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(it, "it");
    u();
    c();
    p();
    m();
    d();
    l();
    function ot(t, e) {
      return { batch: t, transaction: e?.kind === "batch" ? { isolationLevel: e.options.isolationLevel } : void 0 };
    }
    __name(ot, "ot");
    u();
    c();
    p();
    m();
    d();
    l();
    function xo(t) {
      if (t === void 0) return "";
      let e = tt(t);
      return new He(0, { colors: Tr }).write(e).toString();
    }
    __name(xo, "xo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Fl = "P2037";
    function st({ error: t, user_facing_error: e }, r, n) {
      return e.error_code ? new X(Nl(e, n), { code: e.error_code, clientVersion: r, meta: e.meta, batchRequestIdx: e.batch_request_idx }) : new Q(t, { clientVersion: r, batchRequestIdx: e.batch_request_idx });
    }
    __name(st, "st");
    function Nl(t, e) {
      let r = t.message;
      return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Fl && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name(Nl, "Nl");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Sn = class {
      static {
        __name(this, "Sn");
      }
      getLocation() {
        return null;
      }
    };
    function Ie(t) {
      return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite() : new Sn();
    }
    __name(Ie, "Ie");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Po = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function at(t = {}) {
      let e = ql(t);
      return Object.entries(e).reduce((n, [i, o]) => (Po[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(at, "at");
    function ql(t = {}) {
      return typeof t._count == "boolean" ? { ...t, _count: { _all: t._count } } : t;
    }
    __name(ql, "ql");
    function qr(t = {}) {
      return (e) => (typeof t._count == "boolean" && (e._count = e._count._all), e);
    }
    __name(qr, "qr");
    function To(t, e) {
      let r = qr(t);
      return e({ action: "aggregate", unpacker: r, argsMapper: at })(t);
    }
    __name(To, "To");
    u();
    c();
    p();
    m();
    d();
    l();
    function Vl(t = {}) {
      let { select: e, ...r } = t;
      return typeof e == "object" ? at({ ...r, _count: e }) : at({ ...r, _count: { _all: true } });
    }
    __name(Vl, "Vl");
    function Bl(t = {}) {
      return typeof t.select == "object" ? (e) => qr(t)(e)._count : (e) => qr(t)(e)._count._all;
    }
    __name(Bl, "Bl");
    function vo(t, e) {
      return e({ action: "count", unpacker: Bl(t), argsMapper: Vl })(t);
    }
    __name(vo, "vo");
    u();
    c();
    p();
    m();
    d();
    l();
    function $l(t = {}) {
      let e = at(t);
      if (Array.isArray(e.by)) for (let r of e.by) typeof r == "string" && (e.select[r] = true);
      else typeof e.by == "string" && (e.select[e.by] = true);
      return e;
    }
    __name($l, "$l");
    function jl(t = {}) {
      return (e) => (typeof t?._count == "boolean" && e.forEach((r) => {
        r._count = r._count._all;
      }), e);
    }
    __name(jl, "jl");
    function Ro(t, e) {
      return e({ action: "groupBy", unpacker: jl(t), argsMapper: $l })(t);
    }
    __name(Ro, "Ro");
    function Ao(t, e, r) {
      if (e === "aggregate") return (n) => To(n, r);
      if (e === "count") return (n) => vo(n, r);
      if (e === "groupBy") return (n) => Ro(n, r);
    }
    __name(Ao, "Ao");
    u();
    c();
    p();
    m();
    d();
    l();
    function Co(t, e) {
      let r = e.fields.filter((i) => !i.relationName), n = Ni(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol") return i[o];
        let s = n[o];
        if (s) return new It(t, o, s.type, s.isList, s.kind === "enum");
      }, ...Ur(Object.keys(n)) });
    }
    __name(Co, "Co");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var So = /* @__PURE__ */ __name((t) => Array.isArray(t) ? t : t.split("."), "So");
    var In = /* @__PURE__ */ __name((t, e) => So(e).reduce((r, n) => r && r[n], t), "In");
    var Io = /* @__PURE__ */ __name((t, e, r) => So(e).reduceRight((n, i, o, s) => Object.assign({}, In(t, s.slice(0, o)), { [i]: n }), r), "Io");
    function Ql(t, e) {
      return t === void 0 || e === void 0 ? [] : [...e, "select", t];
    }
    __name(Ql, "Ql");
    function Gl(t, e, r) {
      return e === void 0 ? t ?? {} : Io(e, r, t || true);
    }
    __name(Gl, "Gl");
    function Dn(t, e, r, n, i, o) {
      let a = t._runtimeDataModel.models[e].fields.reduce((f, v) => ({ ...f, [v.name]: v }), {});
      return (f) => {
        let v = Ie(t._errorFormat), R = Ql(n, i), A = Gl(f, o, R), I = r({ dataPath: R, callsite: v })(A), C = Jl(t, e);
        return new Proxy(I, { get(L, D) {
          if (!C.includes(D)) return L[D];
          let Ee = [a[D].type, r, D], ee = [R, A];
          return Dn(t, ...Ee, ...ee);
        }, ...Ur([...C, ...Object.getOwnPropertyNames(I)]) });
      };
    }
    __name(Dn, "Dn");
    function Jl(t, e) {
      return t._runtimeDataModel.models[e].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(Jl, "Jl");
    var Wl = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Kl = ["aggregate", "count", "groupBy"];
    function On(t, e) {
      let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [Hl(t, e), Yl(t, e), Nt(r), Z("name", () => e), Z("$name", () => e), Z("$parent", () => t._appliedParent)];
      return ce({}, n);
    }
    __name(On, "On");
    function Hl(t, e) {
      let r = ye(e), n = Object.keys(Rt).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((a) => (f) => {
          let v = Ie(t._errorFormat);
          return t._createPrismaPromise((R) => {
            let A = { args: f, dataPath: [], action: o, model: e, clientMethod: `${r}.${i}`, jsModelName: r, transaction: R, callsite: v };
            return t._request({ ...A, ...a });
          }, { action: o, args: f, model: e });
        }, "s");
        return Wl.includes(o) ? Dn(t, e, s) : zl(i) ? Ao(t, i, s) : s({});
      } };
    }
    __name(Hl, "Hl");
    function zl(t) {
      return Kl.includes(t);
    }
    __name(zl, "zl");
    function Yl(t, e) {
      return Ne(Z("fields", () => {
        let r = t._runtimeDataModel.models[e];
        return Co(e, r);
      }));
    }
    __name(Yl, "Yl");
    u();
    c();
    p();
    m();
    d();
    l();
    function Do(t) {
      return t.replace(/^./, (e) => e.toUpperCase());
    }
    __name(Do, "Do");
    var kn = /* @__PURE__ */ Symbol();
    function Ut(t) {
      let e = [Xl(t), Zl(t), Z(kn, () => t), Z("$parent", () => t._appliedParent)], r = t._extensions.getAllClientExtensions();
      return r && e.push(Nt(r)), ce(t, e);
    }
    __name(Ut, "Ut");
    function Xl(t) {
      let e = Object.getPrototypeOf(t._originalClient), r = [...new Set(Object.getOwnPropertyNames(e))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return t[n];
      } };
    }
    __name(Xl, "Xl");
    function Zl(t) {
      let e = Object.keys(t._runtimeDataModel.models), r = e.map(ye), n = [...new Set(e.concat(r))];
      return Ne({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Do(i);
        if (t._runtimeDataModel.models[o] !== void 0) return On(t, o);
        if (t._runtimeDataModel.models[i] !== void 0) return On(t, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i)) return { enumerable: false };
      } });
    }
    __name(Zl, "Zl");
    function Oo(t) {
      return t[kn] ? t[kn] : t;
    }
    __name(Oo, "Oo");
    function ko(t) {
      if (typeof t == "function") return t(this);
      if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let e = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(t) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } });
      return Ut(e);
    }
    __name(ko, "ko");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function _o({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(e);
      if (!o) return t;
      let s = [], a = [];
      for (let f of Object.values(o)) {
        if (n) {
          if (n[f.name]) continue;
          let v = f.needs.filter((R) => n[R]);
          v.length > 0 && a.push(it(v));
        } else if (r) {
          if (!r[f.name]) continue;
          let v = f.needs.filter((R) => !r[R]);
          v.length > 0 && a.push(it(v));
        }
        eu(t, f.needs) && s.push(tu(f, ce(t, s)));
      }
      return s.length > 0 || a.length > 0 ? ce(t, [...s, ...a]) : t;
    }
    __name(_o, "_o");
    function eu(t, e) {
      return e.every((r) => fn(t, r));
    }
    __name(eu, "eu");
    function tu(t, e) {
      return Ne(Z(t.name, () => t.compute(e)));
    }
    __name(tu, "tu");
    u();
    c();
    p();
    m();
    d();
    l();
    function Vr({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(e)) {
        for (let s = 0; s < e.length; s++) e[s] = Vr({ result: e[s], args: r, modelName: i, runtimeDataModel: n, visitor: t });
        return e;
      }
      let o = t(e, i, r) ?? e;
      return r.include && Mo({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), r.select && Mo({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), o;
    }
    __name(Vr, "Vr");
    function Mo({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(t)) {
        if (!s || e[o] == null || he(s)) continue;
        let f = n.models[r].fields.find((R) => R.name === o);
        if (!f || f.kind !== "object" || !f.relationName) continue;
        let v = typeof s == "object" ? s : {};
        e[o] = Vr({ visitor: i, result: e[o], args: v, modelName: f.type, runtimeDataModel: n });
      }
    }
    __name(Mo, "Mo");
    function Lo({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : Vr({ result: t, args: r ?? {}, modelName: e, runtimeDataModel: i, visitor: /* @__PURE__ */ __name((a, f, v) => {
        let R = ye(f);
        return _o({ result: a, modelName: R, select: v.select, omit: v.select ? void 0 : { ...o?.[R], ...v.omit }, extensions: n });
      }, "visitor") });
    }
    __name(Lo, "Lo");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var ru = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
    var Fo = ru;
    function No(t) {
      if (t instanceof ne) return nu(t);
      if (Lr(t)) return iu(t);
      if (Array.isArray(t)) {
        let r = [t[0]];
        for (let n = 1; n < t.length; n++) r[n] = qt(t[n]);
        return r;
      }
      let e = {};
      for (let r in t) e[r] = qt(t[r]);
      return e;
    }
    __name(No, "No");
    function nu(t) {
      return new ne(t.strings, t.values);
    }
    __name(nu, "nu");
    function iu(t) {
      return new Ft(t.sql, t.values);
    }
    __name(iu, "iu");
    function qt(t) {
      if (typeof t != "object" || t == null || t instanceof ve || et(t)) return t;
      if (Ke(t)) return new xe(t.toFixed());
      if (We(t)) return /* @__PURE__ */ new Date(+t);
      if (ArrayBuffer.isView(t)) return t.slice(0);
      if (Array.isArray(t)) {
        let e = t.length, r;
        for (r = Array(e); e--; ) r[e] = qt(t[e]);
        return r;
      }
      if (typeof t == "object") {
        let e = {};
        for (let r in t) r === "__proto__" ? Object.defineProperty(e, r, { value: qt(t[r]), configurable: true, enumerable: true, writable: true }) : e[r] = qt(t[r]);
        return e;
      }
      Fe(t, "Unknown value");
    }
    __name(qt, "qt");
    function qo(t, e, r, n = 0) {
      return t._createPrismaPromise((i) => {
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({ model: e.model, operation: e.model ? e.action : e.clientMethod, args: No(e.args ?? {}), __internalParams: e, query: /* @__PURE__ */ __name((s, a = e) => {
          let f = a.customDataProxyFetch;
          return a.customDataProxyFetch = jo(o, f), a.args = s, qo(t, a, r, n + 1);
        }, "query") });
      });
    }
    __name(qo, "qo");
    function Vo(t, e) {
      let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
      if (t._extensions.isEmpty()) return t._executeRequest(e);
      let s = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return qo(t, e, s);
    }
    __name(Vo, "Vo");
    function Bo(t) {
      return (e) => {
        let r = { requests: e }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? $o(r, n, 0, t) : t(r);
      };
    }
    __name(Bo, "Bo");
    function $o(t, e, r, n) {
      if (r === e.length) return n(t);
      let i = t.customDataProxyFetch, o = t.requests[0].transaction;
      return e[r]({ args: { queries: t.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: t, query(s, a = t) {
        let f = a.customDataProxyFetch;
        return a.customDataProxyFetch = jo(i, f), $o(a, e, r + 1, n);
      } });
    }
    __name($o, "$o");
    var Uo = /* @__PURE__ */ __name((t) => t, "Uo");
    function jo(t = Uo, e = Uo) {
      return (r) => t(e(r));
    }
    __name(jo, "jo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Qo = j("prisma:client");
    var Go = { Vercel: "vercel", "Netlify CI": "netlify" };
    function Jo({ postinstall: t, ciName: e, clientVersion: r, generator: n }) {
      if (Qo("checkPlatformCaching:postinstall", t), Qo("checkPlatformCaching:ciName", e), t === true && !(n?.output && typeof (n.output.fromEnvVar ?? n.output.value) == "string") && e && e in Go) {
        let i = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${Go[e]}-build`;
        throw console.error(i), new M(i, r);
      }
    }
    __name(Jo, "Jo");
    u();
    c();
    p();
    m();
    d();
    l();
    function Wo(t, e) {
      return t ? t.datasources ? t.datasources : t.datasourceUrl ? { [e[0]]: { url: t.datasourceUrl } } : {} : {};
    }
    __name(Wo, "Wo");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function Ko(t, e) {
      throw new Error(e);
    }
    __name(Ko, "Ko");
    function ou(t) {
      return t !== null && typeof t == "object" && typeof t.$type == "string";
    }
    __name(ou, "ou");
    function su(t, e) {
      let r = {};
      for (let n of Object.keys(t)) r[n] = e(t[n], n);
      return r;
    }
    __name(su, "su");
    function lt(t) {
      return t === null ? t : Array.isArray(t) ? t.map(lt) : typeof t == "object" ? ou(t) ? au(t) : t.constructor !== null && t.constructor.name !== "Object" ? t : su(t, lt) : t;
    }
    __name(lt, "lt");
    function au({ $type: t, value: e }) {
      switch (t) {
        case "BigInt":
          return BigInt(e);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = h.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(e);
        case "Decimal":
          return new P(e);
        case "Json":
          return JSON.parse(e);
        default:
          Ko(e, "Unknown tagged value");
      }
    }
    __name(au, "au");
    var Ho = "6.19.3";
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var uu = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "uu");
    var cu = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "cu");
    var pu = /* @__PURE__ */ __name(() => !!globalThis.Deno, "pu");
    var mu = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "mu");
    var du = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "du");
    var fu = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "fu");
    function gu() {
      return [[mu, "netlify"], [du, "edge-light"], [fu, "workerd"], [pu, "deno"], [cu, "bun"], [uu, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(gu, "gu");
    var yu = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function ut() {
      let t = gu();
      return { id: t, prettyName: yu[t] || t, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(t) };
    }
    __name(ut, "ut");
    function ct({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
      let i, o = Object.keys(t)[0], s = t[o]?.url, a = e[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0) throw ut().id === "workerd" ? new M(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new M(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0) throw new M("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(ct, "ct");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Br = class extends Error {
      static {
        __name(this, "Br");
      }
      clientVersion;
      cause;
      constructor(e, r) {
        super(e), this.clientVersion = r.clientVersion, this.cause = r.cause;
      }
      get [Symbol.toStringTag]() {
        return this.name;
      }
    };
    var ie = class extends Br {
      static {
        __name(this, "ie");
      }
      isRetryable;
      constructor(e, r) {
        super(e, r), this.isRetryable = r.isRetryable ?? true;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function _(t, e) {
      return { ...t, isRetryable: e };
    }
    __name(_, "_");
    var Ue = class extends ie {
      static {
        __name(this, "Ue");
      }
      name = "InvalidDatasourceError";
      code = "P6001";
      constructor(e, r) {
        super(e, _(r, false));
      }
    };
    O(Ue, "InvalidDatasourceError");
    function zo(t) {
      let e = { clientVersion: t.clientVersion }, r = Object.keys(t.inlineDatasources)[0], n = ct({ inlineDatasources: t.inlineDatasources, overrideDatasources: t.overrideDatasources, clientVersion: t.clientVersion, env: { ...t.env, ...typeof g < "u" ? g.env : {} } }), i;
      try {
        i = new URL(n);
      } catch {
        throw new Ue(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\``, e);
      }
      let { protocol: o, searchParams: s } = i;
      if (o !== "prisma:" && o !== fr) throw new Ue(`Error validating datasource \`${r}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``, e);
      let a = s.get("api_key");
      if (a === null || a.length < 1) throw new Ue(`Error validating datasource \`${r}\`: the URL must contain a valid API key`, e);
      let f = cn(i) ? "http:" : "https:";
      g.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && i.searchParams.has("use_http") && (f = "http:");
      let v = new URL(i.href.replace(o, f));
      return { apiKey: a, url: v };
    }
    __name(zo, "zo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Yo = bt(Di());
    var $r = class {
      static {
        __name(this, "$r");
      }
      apiKey;
      tracingHelper;
      logLevel;
      logQueries;
      engineHash;
      constructor({ apiKey: e, tracingHelper: r, logLevel: n, logQueries: i, engineHash: o }) {
        this.apiKey = e, this.tracingHelper = r, this.logLevel = n, this.logQueries = i, this.engineHash = o;
      }
      build({ traceparent: e, transactionId: r } = {}) {
        let n = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": Yo.enginesVersion };
        this.tracingHelper.isEnabled() && (n.traceparent = e ?? this.tracingHelper.getTraceParent()), r && (n["X-Transaction-Id"] = r);
        let i = this.#e();
        return i.length > 0 && (n["X-Capture-Telemetry"] = i.join(", ")), n;
      }
      #e() {
        let e = [];
        return this.tracingHelper.isEnabled() && e.push("tracing"), this.logLevel && e.push(this.logLevel), this.logQueries && e.push("query"), e;
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function hu(t) {
      return t[0] * 1e3 + t[1] / 1e6;
    }
    __name(hu, "hu");
    function _n(t) {
      return new Date(hu(t));
    }
    __name(_n, "_n");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var pt = class extends ie {
      static {
        __name(this, "pt");
      }
      name = "ForcedRetryError";
      code = "P5001";
      constructor(e) {
        super("This request must be retried", _(e, true));
      }
    };
    O(pt, "ForcedRetryError");
    u();
    c();
    p();
    m();
    d();
    l();
    var qe = class extends ie {
      static {
        __name(this, "qe");
      }
      name = "NotImplementedYetError";
      code = "P5004";
      constructor(e, r) {
        super(e, _(r, false));
      }
    };
    O(qe, "NotImplementedYetError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var V = class extends ie {
      static {
        __name(this, "V");
      }
      response;
      constructor(e, r) {
        super(e, r), this.response = r.response;
        let n = this.response.headers.get("prisma-request-id");
        if (n) {
          let i = `(The request id was: ${n})`;
          this.message = this.message + " " + i;
        }
      }
    };
    var Ve = class extends V {
      static {
        __name(this, "Ve");
      }
      name = "SchemaMissingError";
      code = "P5005";
      constructor(e) {
        super("Schema needs to be uploaded", _(e, true));
      }
    };
    O(Ve, "SchemaMissingError");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Mn = "This request could not be understood by the server";
    var Vt = class extends V {
      static {
        __name(this, "Vt");
      }
      name = "BadRequestError";
      code = "P5000";
      constructor(e, r, n) {
        super(r || Mn, _(e, false)), n && (this.code = n);
      }
    };
    O(Vt, "BadRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Bt = class extends V {
      static {
        __name(this, "Bt");
      }
      name = "HealthcheckTimeoutError";
      code = "P5013";
      logs;
      constructor(e, r) {
        super("Engine not started: healthcheck timeout", _(e, true)), this.logs = r;
      }
    };
    O(Bt, "HealthcheckTimeoutError");
    u();
    c();
    p();
    m();
    d();
    l();
    var $t = class extends V {
      static {
        __name(this, "$t");
      }
      name = "EngineStartupError";
      code = "P5014";
      logs;
      constructor(e, r, n) {
        super(r, _(e, true)), this.logs = n;
      }
    };
    O($t, "EngineStartupError");
    u();
    c();
    p();
    m();
    d();
    l();
    var jt = class extends V {
      static {
        __name(this, "jt");
      }
      name = "EngineVersionNotSupportedError";
      code = "P5012";
      constructor(e) {
        super("Engine version is not supported", _(e, false));
      }
    };
    O(jt, "EngineVersionNotSupportedError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Ln = "Request timed out";
    var Qt = class extends V {
      static {
        __name(this, "Qt");
      }
      name = "GatewayTimeoutError";
      code = "P5009";
      constructor(e, r = Ln) {
        super(r, _(e, false));
      }
    };
    O(Qt, "GatewayTimeoutError");
    u();
    c();
    p();
    m();
    d();
    l();
    var bu = "Interactive transaction error";
    var Gt = class extends V {
      static {
        __name(this, "Gt");
      }
      name = "InteractiveTransactionError";
      code = "P5015";
      constructor(e, r = bu) {
        super(r, _(e, false));
      }
    };
    O(Gt, "InteractiveTransactionError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Eu = "Request parameters are invalid";
    var Jt = class extends V {
      static {
        __name(this, "Jt");
      }
      name = "InvalidRequestError";
      code = "P5011";
      constructor(e, r = Eu) {
        super(r, _(e, false));
      }
    };
    O(Jt, "InvalidRequestError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Fn = "Requested resource does not exist";
    var Wt = class extends V {
      static {
        __name(this, "Wt");
      }
      name = "NotFoundError";
      code = "P5003";
      constructor(e, r = Fn) {
        super(r, _(e, false));
      }
    };
    O(Wt, "NotFoundError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Nn = "Unknown server error";
    var mt = class extends V {
      static {
        __name(this, "mt");
      }
      name = "ServerError";
      code = "P5006";
      logs;
      constructor(e, r, n) {
        super(r || Nn, _(e, true)), this.logs = n;
      }
    };
    O(mt, "ServerError");
    u();
    c();
    p();
    m();
    d();
    l();
    var Un = "Unauthorized, check your connection string";
    var Kt = class extends V {
      static {
        __name(this, "Kt");
      }
      name = "UnauthorizedError";
      code = "P5007";
      constructor(e, r = Un) {
        super(r, _(e, false));
      }
    };
    O(Kt, "UnauthorizedError");
    u();
    c();
    p();
    m();
    d();
    l();
    var qn = "Usage exceeded, retry again later";
    var Ht = class extends V {
      static {
        __name(this, "Ht");
      }
      name = "UsageExceededError";
      code = "P5008";
      constructor(e, r = qn) {
        super(r, _(e, true));
      }
    };
    O(Ht, "UsageExceededError");
    async function wu(t) {
      let e;
      try {
        e = await t.text();
      } catch {
        return { type: "EmptyError" };
      }
      try {
        let r = JSON.parse(e);
        if (typeof r == "string") switch (r) {
          case "InternalDataProxyError":
            return { type: "DataProxyError", body: r };
          default:
            return { type: "UnknownTextError", body: r };
        }
        if (typeof r == "object" && r !== null) {
          if ("is_panic" in r && "message" in r && "error_code" in r) return { type: "QueryEngineError", body: r };
          if ("EngineNotStarted" in r || "InteractiveTransactionMisrouted" in r || "InvalidRequestError" in r) {
            let n = Object.values(r)[0].reason;
            return typeof n == "string" && !["SchemaMissing", "EngineVersionNotSupported"].includes(n) ? { type: "UnknownJsonError", body: r } : { type: "DataProxyError", body: r };
          }
        }
        return { type: "UnknownJsonError", body: r };
      } catch {
        return e === "" ? { type: "EmptyError" } : { type: "UnknownTextError", body: e };
      }
    }
    __name(wu, "wu");
    async function zt(t, e) {
      if (t.ok) return;
      let r = { clientVersion: e, response: t }, n = await wu(t);
      if (n.type === "QueryEngineError") throw new X(n.body.message, { code: n.body.error_code, clientVersion: e });
      if (n.type === "DataProxyError") {
        if (n.body === "InternalDataProxyError") throw new mt(r, "Internal Data Proxy error");
        if ("EngineNotStarted" in n.body) {
          if (n.body.EngineNotStarted.reason === "SchemaMissing") return new Ve(r);
          if (n.body.EngineNotStarted.reason === "EngineVersionNotSupported") throw new jt(r);
          if ("EngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, logs: o } = n.body.EngineNotStarted.reason.EngineStartupError;
            throw new $t(r, i, o);
          }
          if ("KnownEngineStartupError" in n.body.EngineNotStarted.reason) {
            let { msg: i, error_code: o } = n.body.EngineNotStarted.reason.KnownEngineStartupError;
            throw new M(i, e, o);
          }
          if ("HealthcheckTimeout" in n.body.EngineNotStarted.reason) {
            let { logs: i } = n.body.EngineNotStarted.reason.HealthcheckTimeout;
            throw new Bt(r, i);
          }
        }
        if ("InteractiveTransactionMisrouted" in n.body) {
          let i = { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" };
          throw new Gt(r, i[n.body.InteractiveTransactionMisrouted.reason]);
        }
        if ("InvalidRequestError" in n.body) throw new Jt(r, n.body.InvalidRequestError.reason);
      }
      if (t.status === 401 || t.status === 403) throw new Kt(r, dt(Un, n));
      if (t.status === 404) return new Wt(r, dt(Fn, n));
      if (t.status === 429) throw new Ht(r, dt(qn, n));
      if (t.status === 504) throw new Qt(r, dt(Ln, n));
      if (t.status >= 500) throw new mt(r, dt(Nn, n));
      if (t.status >= 400) throw new Vt(r, dt(Mn, n));
    }
    __name(zt, "zt");
    function dt(t, e) {
      return e.type === "EmptyError" ? t : `${t}: ${JSON.stringify(e)}`;
    }
    __name(dt, "dt");
    u();
    c();
    p();
    m();
    d();
    l();
    function Xo(t) {
      let e = Math.pow(2, t) * 50, r = Math.ceil(Math.random() * e) - Math.ceil(e / 2), n = e + r;
      return new Promise((i) => setTimeout(() => i(n), n));
    }
    __name(Xo, "Xo");
    u();
    c();
    p();
    m();
    d();
    l();
    var Re = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function Zo(t) {
      let e = new TextEncoder().encode(t), r = "", n = e.byteLength, i = n % 3, o = n - i, s, a, f, v, R;
      for (let A = 0; A < o; A = A + 3) R = e[A] << 16 | e[A + 1] << 8 | e[A + 2], s = (R & 16515072) >> 18, a = (R & 258048) >> 12, f = (R & 4032) >> 6, v = R & 63, r += Re[s] + Re[a] + Re[f] + Re[v];
      return i == 1 ? (R = e[o], s = (R & 252) >> 2, a = (R & 3) << 4, r += Re[s] + Re[a] + "==") : i == 2 && (R = e[o] << 8 | e[o + 1], s = (R & 64512) >> 10, a = (R & 1008) >> 4, f = (R & 15) << 2, r += Re[s] + Re[a] + Re[f] + "="), r;
    }
    __name(Zo, "Zo");
    u();
    c();
    p();
    m();
    d();
    l();
    function es(t) {
      if (!!t.generator?.previewFeatures.some((r) => r.toLowerCase().includes("metrics"))) throw new M("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", t.clientVersion);
    }
    __name(es, "es");
    u();
    c();
    p();
    m();
    d();
    l();
    var ts = { "@prisma/debug": "workspace:*", "@prisma/engines-version": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/fetch-engine": "workspace:*", "@prisma/get-platform": "workspace:*" };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var Yt = class extends ie {
      static {
        __name(this, "Yt");
      }
      name = "RequestError";
      code = "P5010";
      constructor(e, r) {
        super(`Cannot fetch data from service:
${e}`, _(r, true));
      }
    };
    O(Yt, "RequestError");
    async function Be(t, e, r = (n) => n) {
      let { clientVersion: n, ...i } = e, o = r(fetch);
      try {
        return await o(t, i);
      } catch (s) {
        let a = s.message ?? "Unknown error";
        throw new Yt(a, { clientVersion: n, cause: s });
      }
    }
    __name(Be, "Be");
    var Pu = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/;
    var rs = j("prisma:client:dataproxyEngine");
    async function Tu(t, e) {
      let r = ts["@prisma/engines-version"], n = e.clientVersion ?? "unknown";
      if (g.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return g.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
      if (t.includes("accelerate") && n !== "0.0.0" && n !== "in-memory") return n;
      let [i, o] = n?.split("-") ?? [];
      if (o === void 0 && Pu.test(i)) return i;
      if (o !== void 0 || n === "0.0.0" || n === "in-memory") {
        let [s] = r.split("-") ?? [], [a, f, v] = s.split("."), R = vu(`<=${a}.${f}.${v}`), A = await Be(R, { clientVersion: n });
        if (!A.ok) throw new Error(`Failed to fetch stable Prisma version, unpkg.com status ${A.status} ${A.statusText}, response body: ${await A.text() || "<empty body>"}`);
        let I = await A.text();
        rs("length of body fetched from unpkg.com", I.length);
        let C;
        try {
          C = JSON.parse(I);
        } catch (L) {
          throw console.error("JSON.parse error: body fetched from unpkg.com: ", I), L;
        }
        return C.version;
      }
      throw new qe("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: n });
    }
    __name(Tu, "Tu");
    async function ns(t, e) {
      let r = await Tu(t, e);
      return rs("version", r), r;
    }
    __name(ns, "ns");
    function vu(t) {
      return encodeURI(`https://unpkg.com/prisma@${t}/package.json`);
    }
    __name(vu, "vu");
    var is = 3;
    var Xt = j("prisma:client:dataproxyEngine");
    var Zt = class {
      static {
        __name(this, "Zt");
      }
      name = "DataProxyEngine";
      inlineSchema;
      inlineSchemaHash;
      inlineDatasources;
      config;
      logEmitter;
      env;
      clientVersion;
      engineHash;
      tracingHelper;
      remoteClientVersion;
      host;
      headerBuilder;
      startPromise;
      protocol;
      constructor(e) {
        es(e), this.config = e, this.env = e.env, this.inlineSchema = Zo(e.inlineSchema), this.inlineDatasources = e.inlineDatasources, this.inlineSchemaHash = e.inlineSchemaHash, this.clientVersion = e.clientVersion, this.engineHash = e.engineVersion, this.logEmitter = e.logEmitter, this.tracingHelper = e.tracingHelper;
      }
      apiKey() {
        return this.headerBuilder.apiKey;
      }
      version() {
        return this.engineHash;
      }
      async start() {
        this.startPromise !== void 0 && await this.startPromise, this.startPromise = (async () => {
          let { apiKey: e, url: r } = this.getURLAndAPIKey();
          this.host = r.host, this.protocol = r.protocol, this.headerBuilder = new $r({ apiKey: e, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel ?? "error", logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await ns(this.host, this.config), Xt("host", this.host), Xt("protocol", this.protocol);
        })(), await this.startPromise;
      }
      async stop() {
      }
      propagateResponseExtensions(e) {
        e?.logs?.length && e.logs.forEach((r) => {
          switch (r.level) {
            case "debug":
            case "trace":
              Xt(r);
              break;
            case "error":
            case "warn":
            case "info": {
              this.logEmitter.emit(r.level, { timestamp: _n(r.timestamp), message: r.attributes.message ?? "", target: r.target ?? "BinaryEngine" });
              break;
            }
            case "query": {
              this.logEmitter.emit("query", { query: r.attributes.query ?? "", timestamp: _n(r.timestamp), duration: r.attributes.duration_ms ?? 0, params: r.attributes.params ?? "", target: r.target ?? "BinaryEngine" });
              break;
            }
            default:
              r.level;
          }
        }), e?.traces?.length && this.tracingHelper.dispatchEngineSpans(e.traces);
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the remote query engine');
      }
      async url(e) {
        return await this.start(), `${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${e}`;
      }
      async uploadSchema() {
        let e = { name: "schemaUpload", internal: true };
        return this.tracingHelper.runInChildSpan(e, async () => {
          let r = await Be(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
          r.ok || Xt("schema response status", r.status);
          let n = await zt(r, this.clientVersion);
          if (n) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${n.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), n;
          this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
        });
      }
      request(e, { traceparent: r, interactiveTransaction: n, customDataProxyFetch: i }) {
        return this.requestInternal({ body: e, traceparent: r, interactiveTransaction: n, customDataProxyFetch: i });
      }
      async requestBatch(e, { traceparent: r, transaction: n, customDataProxyFetch: i }) {
        let o = n?.kind === "itx" ? n.options : void 0, s = ot(e, n);
        return (await this.requestInternal({ body: s, customDataProxyFetch: i, interactiveTransaction: o, traceparent: r })).map((f) => (f.extensions && this.propagateResponseExtensions(f.extensions), "errors" in f ? this.convertProtocolErrorsToClientError(f.errors) : f));
      }
      requestInternal({ body: e, traceparent: r, customDataProxyFetch: n, interactiveTransaction: i }) {
        return this.withRetry({ actionGerund: "querying", callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          let s = i ? `${i.payload.endpoint}/graphql` : await this.url("graphql");
          o(s);
          let a = await Be(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r, transactionId: i?.id }), body: JSON.stringify(e), clientVersion: this.clientVersion }, n);
          a.ok || Xt("graphql response status", a.status), await this.handleError(await zt(a, this.clientVersion));
          let f = await a.json();
          if (f.extensions && this.propagateResponseExtensions(f.extensions), "errors" in f) throw this.convertProtocolErrorsToClientError(f.errors);
          return "batchResult" in f ? f.batchResult : f;
        }, "callback") });
      }
      async transaction(e, r, n) {
        let i = { start: "starting", commit: "committing", rollback: "rolling back" };
        return this.withRetry({ actionGerund: `${i[e]} transaction`, callback: /* @__PURE__ */ __name(async ({ logHttpCall: o }) => {
          if (e === "start") {
            let s = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel }), a = await this.url("transaction/start");
            o(a);
            let f = await Be(a, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), body: s, clientVersion: this.clientVersion });
            await this.handleError(await zt(f, this.clientVersion));
            let v = await f.json(), { extensions: R } = v;
            R && this.propagateResponseExtensions(R);
            let A = v.id, I = v["data-proxy"].endpoint;
            return { id: A, payload: { endpoint: I } };
          } else {
            let s = `${n.payload.endpoint}/${e}`;
            o(s);
            let a = await Be(s, { method: "POST", headers: this.headerBuilder.build({ traceparent: r.traceparent }), clientVersion: this.clientVersion });
            await this.handleError(await zt(a, this.clientVersion));
            let f = await a.json(), { extensions: v } = f;
            v && this.propagateResponseExtensions(v);
            return;
          }
        }, "callback") });
      }
      getURLAndAPIKey() {
        return zo({ clientVersion: this.clientVersion, env: this.env, inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources });
      }
      metrics() {
        throw new qe("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
      }
      async withRetry(e) {
        for (let r = 0; ; r++) {
          let n = /* @__PURE__ */ __name((i) => {
            this.logEmitter.emit("info", { message: `Calling ${i} (n=${r})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }, "n");
          try {
            return await e.callback({ logHttpCall: n });
          } catch (i) {
            if (!(i instanceof ie) || !i.isRetryable) throw i;
            if (r >= is) throw i instanceof pt ? i.cause : i;
            this.logEmitter.emit("warn", { message: `Attempt ${r + 1}/${is} failed for ${e.actionGerund}: ${i.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            let o = await Xo(r);
            this.logEmitter.emit("warn", { message: `Retrying after ${o}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          }
        }
      }
      async handleError(e) {
        if (e instanceof Ve) throw await this.uploadSchema(), new pt({ clientVersion: this.clientVersion, cause: e });
        if (e) throw e;
      }
      convertProtocolErrorsToClientError(e) {
        return e.length === 1 ? st(e[0], this.config.clientVersion, this.config.activeProvider) : new Q(JSON.stringify(e), { clientVersion: this.config.clientVersion });
      }
      applyPendingMigrations() {
        throw new Error("Method not implemented.");
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function os(t) {
      if (t?.kind === "itx") return t.options.id;
    }
    __name(os, "os");
    u();
    c();
    p();
    m();
    d();
    l();
    var Vn;
    var ss = { async loadLibrary(t) {
      let { clientVersion: e, adapter: r, engineWasm: n } = t;
      if (r === void 0) throw new M(`The \`adapter\` option for \`PrismaClient\` is required in this context (${ut().prettyName})`, e);
      if (n === void 0) throw new M("WASM engine was unexpectedly `undefined`", e);
      Vn === void 0 && (Vn = (async () => {
        let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null) throw new M("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
        let a = { "./query_engine_bg.js": o }, f = new WebAssembly.Instance(s, a), v = f.exports.__wbindgen_start;
        return o.__wbg_set_wasm(f.exports), v(), o.QueryEngine;
      })());
      let i = await Vn;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var Ru = "P2036";
    var be = j("prisma:client:libraryEngine");
    function Au(t) {
      return t.item_type === "query" && "query" in t;
    }
    __name(Au, "Au");
    function Cu(t) {
      return "level" in t ? t.level === "error" && t.message === "PANIC" : false;
    }
    __name(Cu, "Cu");
    var VL = [...on2, "native"];
    var Su = 0xffffffffffffffffn;
    var Bn = 1n;
    function Iu() {
      let t = Bn++;
      return Bn > Su && (Bn = 1n), t;
    }
    __name(Iu, "Iu");
    var er = class {
      static {
        __name(this, "er");
      }
      name = "LibraryEngine";
      engine;
      libraryInstantiationPromise;
      libraryStartingPromise;
      libraryStoppingPromise;
      libraryStarted;
      executingQueryPromise;
      config;
      QueryEngineConstructor;
      libraryLoader;
      library;
      logEmitter;
      libQueryEnginePath;
      binaryTarget;
      datasourceOverrides;
      datamodel;
      logQueries;
      logLevel;
      lastQuery;
      loggerRustPanic;
      tracingHelper;
      adapterPromise;
      versionInfo;
      constructor(e, r) {
        this.libraryLoader = r ?? ss, this.config = e, this.libraryStarted = false, this.logQueries = e.logQueries ?? false, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(e) {
        return { applyPendingMigrations: e.applyPendingMigrations?.bind(e), commitTransaction: this.withRequestId(e.commitTransaction.bind(e)), connect: this.withRequestId(e.connect.bind(e)), disconnect: this.withRequestId(e.disconnect.bind(e)), metrics: e.metrics?.bind(e), query: this.withRequestId(e.query.bind(e)), rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)), sdlSchema: e.sdlSchema?.bind(e), startTransaction: this.withRequestId(e.startTransaction.bind(e)), trace: e.trace.bind(e), free: e.free?.bind(e) };
      }
      withRequestId(e) {
        return async (...r) => {
          let n = Iu().toString();
          try {
            return await e(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await this.engine?.trace(n);
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s;
        if (e === "start") {
          let f = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          s = await this.engine?.startTransaction(f, o);
        } else e === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s);
        if (Du(a)) {
          let f = this.getExternalAdapterError(a, i?.errorRegistry);
          throw f ? f.error : new X(a.message, { code: a.error_code, clientVersion: this.config.clientVersion, meta: a.meta });
        } else if (typeof a.message == "string") throw new Q(a.message, { clientVersion: this.config.clientVersion });
        return a;
      }
      async instantiateLibrary() {
        if (be("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(e) {
        if (!e) throw new Q("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(e);
        } catch {
          throw new Q("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let e = new b(this);
            this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(mr));
            let r = await this.adapterPromise;
            r && be("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: g.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              e.deref()?.logger(n);
            }, r));
          } catch (e) {
            let r = e, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new M(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", Au(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Cu(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path })));
      }
      parseInitError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      parseRequestError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return be(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted) return;
        let e = /* @__PURE__ */ __name(async () => {
          be("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(mr)), await this.adapterPromise, be("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new M(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "e");
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return be("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted) {
          await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
          return;
        }
        let e = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setImmediate(n)), be("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, be("library stopped");
        }, "e");
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(e) {
        return this.library?.debugPanic(e);
      }
      async request(e, { traceparent: r, interactiveTransaction: n }) {
        be(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(e);
        try {
          await this.start();
          let s = await this.adapterPromise;
          this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let a = this.parseEngineResponse(await this.executingQueryPromise);
          if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic) throw this.loggerRustPanic;
          return { data: a };
        } catch (s) {
          if (s instanceof M) throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new Q(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(e, { transaction: r, traceparent: n }) {
        be("requestBatch");
        let i = ot(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: n }), os(r));
        let s = await this.executingQueryPromise, a = this.parseEngineResponse(s);
        if (a.errors) throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new Q(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: f, errors: v } = a;
        if (Array.isArray(f)) return f.map((R) => R.errors && R.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(R.errors[0], o?.errorRegistry) : { data: R });
        throw v && v.length === 1 ? new Error(v[0].error) : new Error(JSON.stringify(a));
      }
      buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : st(e, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(e, r) {
        if (e.error_code === Ru && r) {
          let n = e.meta?.id;
          yr(typeof n == "number", "Malformed external JS error received from the engine");
          let i = r.consumeError(n);
          return yr(i, "External error with reported id was not registered"), i;
        }
      }
      async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    };
    function Du(t) {
      return typeof t == "object" && t !== null && t.error_code !== void 0;
    }
    __name(Du, "Du");
    u();
    c();
    p();
    m();
    d();
    l();
    function as({ url: t, adapter: e, copyEngine: r, targetBuildType: n }) {
      let i = [], o = [], s = /* @__PURE__ */ __name((D) => {
        i.push({ _tag: "warning", value: D });
      }, "s"), a = /* @__PURE__ */ __name((D) => {
        let k = D.join(`
`);
        o.push({ _tag: "error", value: k });
      }, "a"), f = !!t?.startsWith("prisma://"), v = gr(t), R = !!e, A = f || v;
      !R && r && A && n !== "client" && n !== "wasm-compiler-edge" && s(["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"]);
      let I = A || !r;
      R && (I || n === "edge") && (n === "edge" ? a(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : A ? a(["You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.", "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."]) : r || a(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
      let C = { accelerate: I, ppg: v, driverAdapters: R };
      function L(D) {
        return D.length > 0;
      }
      __name(L, "L");
      return L(o) ? { ok: false, diagnostics: { warnings: i, errors: o }, isUsing: C } : { ok: true, diagnostics: { warnings: i }, isUsing: C };
    }
    __name(as, "as");
    function ls({ copyEngine: t = true }, e) {
      let r;
      try {
        r = ct({ inlineDatasources: e.inlineDatasources, overrideDatasources: e.overrideDatasources, env: { ...e.env, ...g.env }, clientVersion: e.clientVersion });
      } catch {
      }
      let { ok: n, isUsing: i, diagnostics: o } = as({ url: r, adapter: e.adapter, copyEngine: t, targetBuildType: "wasm-engine-edge" });
      for (let A of o.warnings) Tt(...A.value);
      if (!n) {
        let A = o.errors[0];
        throw new Y(A.value, { clientVersion: e.clientVersion });
      }
      let s = Je(e.generator), a = s === "library", f = s === "binary", v = s === "client", R = (i.accelerate || i.ppg) && !i.driverAdapters;
      return i.accelerate ? new Zt(e) : i.driverAdapters ? new er(e) : new $n({ clientVersion: e.clientVersion });
    }
    __name(ls, "ls");
    var $n = class {
      static {
        __name(this, "$n");
      }
      constructor(e) {
        return new Proxy(this, { get(r, n) {
          let i = `In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`;
          throw new Y(i, e);
        } });
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    function us({ generator: t }) {
      return t?.previewFeatures ?? [];
    }
    __name(us, "us");
    u();
    c();
    p();
    m();
    d();
    l();
    var cs = /* @__PURE__ */ __name((t) => ({ command: t }), "cs");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    var ps = /* @__PURE__ */ __name((t) => t.strings.reduce((e, r, n) => `${e}@P${n}${r}`), "ps");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function ft(t) {
      try {
        return ms(t, "fast");
      } catch {
        return ms(t, "slow");
      }
    }
    __name(ft, "ft");
    function ms(t, e) {
      return JSON.stringify(t.map((r) => fs(r, e)));
    }
    __name(ms, "ms");
    function fs(t, e) {
      if (Array.isArray(t)) return t.map((r) => fs(r, e));
      if (typeof t == "bigint") return { prisma__type: "bigint", prisma__value: t.toString() };
      if (We(t)) return { prisma__type: "date", prisma__value: t.toJSON() };
      if (xe.isDecimal(t)) return { prisma__type: "decimal", prisma__value: t.toJSON() };
      if (h.isBuffer(t)) return { prisma__type: "bytes", prisma__value: t.toString("base64") };
      if (Ou(t)) return { prisma__type: "bytes", prisma__value: h.from(t).toString("base64") };
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { prisma__type: "bytes", prisma__value: h.from(r, n, i).toString("base64") };
      }
      return typeof t == "object" && e === "slow" ? gs(t) : t;
    }
    __name(fs, "fs");
    function Ou(t) {
      return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? true : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Ou, "Ou");
    function gs(t) {
      if (typeof t != "object" || t === null) return t;
      if (typeof t.toJSON == "function") return t.toJSON();
      if (Array.isArray(t)) return t.map(ds);
      let e = {};
      for (let r of Object.keys(t)) e[r] = ds(t[r]);
      return e;
    }
    __name(gs, "gs");
    function ds(t) {
      return typeof t == "bigint" ? t.toString() : gs(t);
    }
    __name(ds, "ds");
    var ku = /^(\s*alter\s)/i;
    var ys = j("prisma:client");
    function jn(t, e, r, n) {
      if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && ku.exec(e)) throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(jn, "jn");
    var Qn = /* @__PURE__ */ __name(({ clientMethod: t, activeProvider: e }) => (r) => {
      let n = "", i;
      if (Lr(r)) n = r.sql, i = { values: ft(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: ft(s || []), __prismaRawParameters__: true };
      } else switch (e) {
        case "sqlite":
        case "mysql": {
          n = r.sql, i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        case "cockroachdb":
        case "postgresql":
        case "postgres": {
          n = r.text, i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        case "sqlserver": {
          n = ps(r), i = { values: ft(r.values), __prismaRawParameters__: true };
          break;
        }
        default:
          throw new Error(`The ${e} provider does not support ${t}`);
      }
      return i?.values ? ys(`prisma.${t}(${n}, ${i.values})`) : ys(`prisma.${t}(${n})`), { query: n, parameters: i };
    }, "Qn");
    var hs = { requestArgsToMiddlewareArgs(t) {
      return [t.strings, ...t.values];
    }, middlewareArgsToRequestArgs(t) {
      let [e, ...r] = t;
      return new ne(e, r);
    } };
    var bs = { requestArgsToMiddlewareArgs(t) {
      return [t];
    }, middlewareArgsToRequestArgs(t) {
      return t[0];
    } };
    u();
    c();
    p();
    m();
    d();
    l();
    function Gn(t) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s = t) => {
          try {
            return s === void 0 || s?.kind === "itx" ? i ??= Es(r(s)) : Es(r(s));
          } catch (a) {
            return Promise.reject(a);
          }
        }, "o");
        return { get spec() {
          return n;
        }, then(s, a) {
          return o().then(s, a);
        }, catch(s) {
          return o().catch(s);
        }, finally(s) {
          return o().finally(s);
        }, requestTransaction(s) {
          let a = o(s);
          return a.requestTransaction ? a.requestTransaction(s) : a;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(Gn, "Gn");
    function Es(t) {
      return typeof t.then == "function" ? t : Promise.resolve(t);
    }
    __name(Es, "Es");
    u();
    c();
    p();
    m();
    d();
    l();
    var _u = sn.split(".")[0];
    var Mu = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(t, e) {
      return e();
    } };
    var Jn = class {
      static {
        __name(this, "Jn");
      }
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
      }
      dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
      }
      getGlobalTracingHelper() {
        let e = globalThis[`V${_u}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? Mu;
      }
    };
    function ws() {
      return new Jn();
    }
    __name(ws, "ws");
    u();
    c();
    p();
    m();
    d();
    l();
    function xs(t, e = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --t === 0 && r(e()), i?.(n);
      } };
    }
    __name(xs, "xs");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ps(t) {
      return typeof t == "string" ? t : t.reduce((e, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
      }, void 0);
    }
    __name(Ps, "Ps");
    u();
    c();
    p();
    m();
    d();
    l();
    u();
    c();
    p();
    m();
    d();
    l();
    function jr(t) {
      return typeof t.batchRequestIdx == "number";
    }
    __name(jr, "jr");
    u();
    c();
    p();
    m();
    d();
    l();
    function Ts(t) {
      if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow") return;
      let e = [];
      return t.modelName && e.push(t.modelName), t.query.arguments && e.push(Wn(t.query.arguments)), e.push(Wn(t.query.selection)), e.join("");
    }
    __name(Ts, "Ts");
    function Wn(t) {
      return `(${Object.keys(t).sort().map((r) => {
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${Wn(n)})` : r;
      }).join(" ")})`;
    }
    __name(Wn, "Wn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Lu = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function Kn(t) {
      return Lu[t];
    }
    __name(Kn, "Kn");
    u();
    c();
    p();
    m();
    d();
    l();
    var Qr = class {
      static {
        __name(this, "Qr");
      }
      constructor(e) {
        this.options = e;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, g.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: e, resolve: n, reject: i });
        })) : this.options.singleLoader(e);
      }
      dispatchBatches() {
        for (let e in this.batches) {
          let r = this.batches[e];
          delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error) for (let i = 0; i < r.length; i++) r[i].reject(n);
            else for (let i = 0; i < r.length; i++) {
              let o = n[i];
              o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
            }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++) r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    };
    u();
    c();
    p();
    m();
    d();
    l();
    l();
    function $e(t, e) {
      if (e === null) return e;
      switch (t) {
        case "bigint":
          return BigInt(e);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = h.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new xe(e);
        case "datetime":
        case "date":
          return new Date(e);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
          return e.map((r) => $e("bigint", r));
        case "bytes-array":
          return e.map((r) => $e("bytes", r));
        case "decimal-array":
          return e.map((r) => $e("decimal", r));
        case "datetime-array":
          return e.map((r) => $e("datetime", r));
        case "date-array":
          return e.map((r) => $e("date", r));
        case "time-array":
          return e.map((r) => $e("time", r));
        default:
          return e;
      }
    }
    __name($e, "$e");
    function Gr(t) {
      let e = [], r = Fu(t);
      for (let n = 0; n < t.rows.length; n++) {
        let i = t.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++) o[t.columns[s]] = $e(t.types[s], i[s]);
        e.push(o);
      }
      return e;
    }
    __name(Gr, "Gr");
    function Fu(t) {
      let e = {};
      for (let r = 0; r < t.columns.length; r++) e[t.columns[r]] = null;
      return e;
    }
    __name(Fu, "Fu");
    var Nu = j("prisma:client:request_handler");
    var Jr = class {
      static {
        __name(this, "Jr");
      }
      client;
      dataloader;
      logEmitter;
      constructor(e, r) {
        this.logEmitter = r, this.client = e, this.dataloader = new Qr({ batchLoader: Bo(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((A) => A.protocolQuery), f = this.client._tracingHelper.getTraceParent(s), v = n.some((A) => Kn(A.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: f, transaction: Uu(o), containsWrite: v, customDataProxyFetch: i })).map((A, I) => {
            if (A instanceof Error) return A;
            try {
              return this.mapQueryEngineResult(n[I], A);
            } catch (C) {
              return C;
            }
          });
        }), singleLoader: /* @__PURE__ */ __name(async (n) => {
          let i = n.transaction?.kind === "itx" ? vs(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: Kn(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, "singleLoader"), batchBy: /* @__PURE__ */ __name((n) => n.transaction?.id ? `transaction-${n.transaction.id}` : Ts(n.protocolQuery), "batchBy"), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(e) {
        try {
          return await this.dataloader.request(e);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = e;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: e.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(e) {
        try {
          this.handleRequestError(e);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: e.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Nu(e), qu(e, i)) throw e;
        if (e instanceof X && Vu(e)) {
          let v = Rs(e.meta);
          Ir({ args: o, errors: [v], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let f = e.message;
        if (n && (f = Er({ callsite: n, originalMethod: r, isPanic: e.isPanic, showColors: this.client._errorFormat === "pretty", message: f })), f = this.sanitizeMessage(f), e.code) {
          let v = s ? { modelName: s, ...e.meta } : e.meta;
          throw new X(f, { code: e.code, clientVersion: this.client._clientVersion, meta: v, batchRequestIdx: e.batchRequestIdx });
        } else {
          if (e.isPanic) throw new Te(f, this.client._clientVersion);
          if (e instanceof Q) throw new Q(f, { clientVersion: this.client._clientVersion, batchRequestIdx: e.batchRequestIdx });
          if (e instanceof M) throw new M(f, this.client._clientVersion);
          if (e instanceof Te) throw new Te(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
      }
      sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? dn(e) : e;
      }
      unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e)) return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s = r.filter((v) => v !== "select" && v !== "include"), a = In(o, s), f = i === "queryRaw" ? Gr(a) : lt(a);
        return n ? n(f) : f;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    };
    function Uu(t) {
      if (t) {
        if (t.kind === "batch") return { kind: "batch", options: { isolationLevel: t.isolationLevel } };
        if (t.kind === "itx") return { kind: "itx", options: vs(t) };
        Fe(t, "Unknown transaction kind");
      }
    }
    __name(Uu, "Uu");
    function vs(t) {
      return { id: t.id, payload: t.payload };
    }
    __name(vs, "vs");
    function qu(t, e) {
      return jr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
    }
    __name(qu, "qu");
    function Vu(t) {
      return t.code === "P2009" || t.code === "P2012";
    }
    __name(Vu, "Vu");
    function Rs(t) {
      if (t.kind === "Union") return { kind: "Union", errors: t.errors.map(Rs) };
      if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return { ...t, selectionPath: e };
      }
      return t;
    }
    __name(Rs, "Rs");
    u();
    c();
    p();
    m();
    d();
    l();
    var As = Ho;
    u();
    c();
    p();
    m();
    d();
    l();
    var Os = bt(hn());
    u();
    c();
    p();
    m();
    d();
    l();
    var F = class extends Error {
      static {
        __name(this, "F");
      }
      constructor(e) {
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    };
    O(F, "PrismaClientConstructorValidationError");
    var Cs = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var Ss = ["pretty", "colorless", "minimal"];
    var Is = ["info", "query", "warn", "error"];
    var Bu = { datasources: /* @__PURE__ */ __name((t, { datasourceNames: e }) => {
      if (t) {
        if (typeof t != "object" || Array.isArray(t)) throw new F(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(t)) {
          if (!e.includes(r)) {
            let i = gt(r, e) || ` Available datasources: ${e.join(", ")}`;
            throw new F(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n)) throw new F(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object") for (let [i, o] of Object.entries(n)) {
            if (i !== "url") throw new F(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (typeof o != "string") throw new F(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          }
        }
      }
    }, "datasources"), adapter: /* @__PURE__ */ __name((t, e) => {
      if (!t && Je(e.generator) === "client") throw new F('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (t !== null) {
        if (t === void 0) throw new F('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
        if (Je(e.generator) === "binary") throw new F('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
      }
    }, "adapter"), datasourceUrl: /* @__PURE__ */ __name((t) => {
      if (typeof t < "u" && typeof t != "string") throw new F(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, "datasourceUrl"), errorFormat: /* @__PURE__ */ __name((t) => {
      if (t) {
        if (typeof t != "string") throw new F(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!Ss.includes(t)) {
          let e = gt(t, Ss);
          throw new F(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
        }
      }
    }, "errorFormat"), log: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      if (!Array.isArray(t)) throw new F(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
      function e(r) {
        if (typeof r == "string" && !Is.includes(r)) {
          let n = gt(r, Is);
          throw new F(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(e, "e");
      for (let r of t) {
        e(r);
        let n = { level: e, emit: /* @__PURE__ */ __name((i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = gt(i, o);
            throw new F(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        }, "emit") };
        if (r && typeof r == "object") for (let [i, o] of Object.entries(r)) if (n[i]) n[i](o);
        else throw new F(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, "log"), transactionOptions: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = t.maxWait;
      if (e != null && e <= 0) throw new F(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = t.timeout;
      if (r != null && r <= 0) throw new F(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, "transactionOptions"), omit: /* @__PURE__ */ __name((t, e) => {
      if (typeof t != "object") throw new F('"omit" option is expected to be an object.');
      if (t === null) throw new F('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(t)) {
        let o = ju(n, e.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let f = o.fields.find((v) => v.name === s);
          if (!f) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (f.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0) throw new F(Qu(t, r));
    }, "omit"), __internal: /* @__PURE__ */ __name((t) => {
      if (!t) return;
      let e = ["debug", "engine", "configOverride"];
      if (typeof t != "object") throw new F(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(t)) if (!e.includes(r)) {
        let n = gt(r, e);
        throw new F(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
      }
    }, "__internal") };
    function ks(t, e) {
      for (let [r, n] of Object.entries(t)) {
        if (!Cs.includes(r)) {
          let i = gt(r, Cs);
          throw new F(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Bu[r](n, e);
      }
      if (t.datasourceUrl && t.datasources) throw new F('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(ks, "ks");
    function gt(t, e) {
      if (e.length === 0 || typeof t != "string") return "";
      let r = $u(t, e);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(gt, "gt");
    function $u(t, e) {
      if (e.length === 0) return null;
      let r = e.map((i) => ({ value: i, distance: (0, Os.default)(t, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name($u, "$u");
    function ju(t, e) {
      return Ds(e.models, t) ?? Ds(e.types, t);
    }
    __name(ju, "ju");
    function Ds(t, e) {
      let r = Object.keys(t).find((n) => Ce(n) === e);
      if (r) return t[r];
    }
    __name(Ds, "Ds");
    function Qu(t, e) {
      let r = tt(t);
      for (let o of e) switch (o.kind) {
        case "UnknownModel":
          r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
          break;
        case "UnknownField":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
          break;
        case "RelationInOmit":
          r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
          break;
        case "InvalidFieldValue":
          r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
          break;
      }
      let { message: n, args: i } = Sr(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Qu, "Qu");
    u();
    c();
    p();
    m();
    d();
    l();
    function _s(t) {
      return t.length === 0 ? Promise.resolve([]) : new Promise((e, r) => {
        let n = new Array(t.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === t.length && (o = true, i ? r(i) : e(n)));
        }, "a"), f = /* @__PURE__ */ __name((v) => {
          o || (o = true, r(v));
        }, "f");
        for (let v = 0; v < t.length; v++) t[v].then((R) => {
          n[v] = R, a();
        }, (R) => {
          if (!jr(R)) {
            f(R);
            return;
          }
          R.batchRequestIdx === v ? f(R) : (i || (i = R), a());
        });
      });
    }
    __name(_s, "_s");
    var De = j("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Gu = { requestArgsToMiddlewareArgs: /* @__PURE__ */ __name((t) => t, "requestArgsToMiddlewareArgs"), middlewareArgsToRequestArgs: /* @__PURE__ */ __name((t) => t, "middlewareArgsToRequestArgs") };
    var Ju = /* @__PURE__ */ Symbol.for("prisma.client.transaction.id");
    var Wu = { id: 0, nextId() {
      return ++this.id;
    } };
    function Fs(t) {
      class e {
        static {
          __name(this, "e");
        }
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = Gn();
        constructor(n) {
          t = n?.__internal?.configOverride?.(t) ?? t, Jo(t), n && ks(n, t);
          let i = new Fr().on("error", () => {
          });
          this._extensions = rt.empty(), this._previewFeatures = us(t), this._clientVersion = t.clientVersion ?? As, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = ws();
          let o = t.relativeEnvPaths && { rootEnvPath: t.relativeEnvPaths.rootEnvPath && cr.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath), schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && cr.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = n.adapter;
            let f = t.activeProvider === "postgresql" || t.activeProvider === "cockroachdb" ? "postgres" : t.activeProvider;
            if (s.provider !== f) throw new M(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0) throw new M("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = t.injectableEdgeEnv?.();
          try {
            let f = n ?? {}, v = f.__internal ?? {}, R = v.debug === true;
            R && j.enable("prisma:client");
            let A = cr.resolve(t.dirname, t.relativePath);
            Pi.existsSync(A) || (A = t.dirname), De("dirname", t.dirname), De("relativePath", t.relativePath), De("cwd", A);
            let I = v.engine || {};
            if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = { cwd: A, dirname: t.dirname, enableDebugLogs: R, allowTriggerPanic: I.allowTriggerPanic, prismaPath: I.binaryPath ?? void 0, engineEndpoint: I.endpoint, generator: t.generator, showColors: this._errorFormat === "pretty", logLevel: f.log && Ps(f.log), logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((C) => typeof C == "string" ? C === "query" : C.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: t.engineWasm, compilerWasm: t.compilerWasm, clientVersion: t.clientVersion, engineVersion: t.engineVersion, previewFeatures: this._previewFeatures, activeProvider: t.activeProvider, inlineSchema: t.inlineSchema, overrideDatasources: Wo(f, t.datasourceNames), inlineDatasources: t.inlineDatasources, inlineSchemaHash: t.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: f.transactionOptions?.maxWait ?? 2e3, timeout: f.transactionOptions?.timeout ?? 5e3, isolationLevel: f.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: t.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: ct, getBatchRequestPayload: ot, prismaGraphQLToJSError: st, PrismaClientUnknownRequestError: Q, PrismaClientInitializationError: M, PrismaClientKnownRequestError: X, debug: j("prisma:client:accelerateEngine"), engineVersion: Ls.version, clientVersion: t.clientVersion } }, De("clientVersion", t.clientVersion), this._engine = ls(t, this._engineConfig), this._requestHandler = new Jr(this, i), f.log) for (let C of f.log) {
              let L = typeof C == "string" ? C : C.emit === "stdout" ? C.level : null;
              L && this.$on(L, (D) => {
                Pt.log(`${Pt.tags[L] ?? ""}`, D.message || D.query);
              });
            }
          } catch (f) {
            throw f.clientVersion = this._clientVersion, f;
          }
          return this._appliedParent = Ut(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $on(n, i) {
          return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            xi();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: Qn({ clientMethod: i, activeProvider: a }), callsite: Ie(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Ms(n, i);
              return jn(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new Y("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (jn(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (t.activeProvider !== "mongodb") throw new Y(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: cs, callsite: Ie(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: Qn({ clientMethod: i, activeProvider: a }), callsite: Ie(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) return this.$queryRawInternal(o, "$queryRaw", ...Ms(n, i));
            throw new Y("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql")) throw new Y("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Wu.nextId(), s = xs(n.length), a = n.map((f, v) => {
            if (f?.[Symbol.toStringTag] !== "PrismaPromise") throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let R = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, A = { kind: "batch", id: o, index: v, isolationLevel: R, lock: s };
            return f.requestTransaction?.(A) ?? f;
          });
          return _s(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), f;
          try {
            let v = { kind: "itx", ...a };
            f = await n(this._createItxClient(v)), await this._engine.transaction("commit", o, a);
          } catch (v) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), v;
          }
          return f;
        }
        _createItxClient(n) {
          return ce(Ut(ce(Oo(this), [Z("_appliedParent", () => this._appliedParent._createItxClient(n)), Z("_createPrismaPromise", () => Gn(n)), Z(Ju, () => n.id)])), [it(Fo)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Gu, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = /* @__PURE__ */ __name(async (f) => {
            let { runInTransaction: v, args: R, ...A } = f, I = { ...n, ...A };
            R && (I.args = i.middlewareArgsToRequestArgs(R)), n.transaction !== void 0 && v === false && delete I.transaction;
            let C = await Vo(this, I);
            return I.model ? Lo({ result: C, modelName: I.model, args: I.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : C;
          }, "a");
          return this._tracingHelper.runInChildSpan(s.operation, () => a(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: f, argsMapper: v, transaction: R, unpacker: A, otelParentCtx: I, customDataProxyFetch: C }) {
          try {
            n = v ? v(n) : n;
            let L = { name: "serialize" }, D = this._tracingHelper.runInChildSpan(L, () => _r({ modelName: f, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return j.enabled("prisma:client") && (De("Prisma Client call:"), De(`prisma.${i}(${xo(n)})`), De("Generated request:"), De(JSON.stringify(D, null, 2) + `
`)), R?.kind === "batch" && await R.lock, this._requestHandler.request({ protocolQuery: D, modelName: f, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: R, unpacker: A, otelParentCtx: I, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: C });
          } catch (L) {
            throw L.clientVersion = this._clientVersion, L;
          }
        }
        $metrics = new nt(this);
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
        $extends = ko;
      }
      return e;
    }
    __name(Fs, "Fs");
    function Ms(t, e) {
      return Ku(t) ? [new ne(t, e), hs] : [t, bs];
    }
    __name(Ms, "Ms");
    function Ku(t) {
      return Array.isArray(t) && Array.isArray(t.raw);
    }
    __name(Ku, "Ku");
    u();
    c();
    p();
    m();
    d();
    l();
    var Hu = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Ns(t) {
      return new Proxy(t, { get(e, r) {
        if (r in e) return e[r];
        if (!Hu.has(r)) throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Ns, "Ns");
    u();
    c();
    p();
    m();
    d();
    l();
    l();
  }
});

// node_modules/.prisma/client/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "node_modules/.prisma/client/query_engine_bg.js"(exports, module) {
    "use strict";
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var F = Object.defineProperty;
    var j = Object.getOwnPropertyDescriptor;
    var B = Object.getOwnPropertyNames;
    var U = Object.prototype.hasOwnProperty;
    var L = /* @__PURE__ */ __name((e, t) => {
      for (var n in t) F(e, n, { get: t[n], enumerable: true });
    }, "L");
    var N = /* @__PURE__ */ __name((e, t, n, r) => {
      if (t && typeof t == "object" || typeof t == "function") for (let o of B(t)) !U.call(e, o) && o !== n && F(e, o, { get: /* @__PURE__ */ __name(() => t[o], "get"), enumerable: !(r = j(t, o)) || r.enumerable });
      return e;
    }, "N");
    var C = /* @__PURE__ */ __name((e) => N(F({}, "__esModule", { value: true }), e), "C");
    var kt = {};
    L(kt, { QueryEngine: /* @__PURE__ */ __name(() => k, "QueryEngine"), __wbg_Error_e83987f665cf5504: /* @__PURE__ */ __name(() => J, "__wbg_Error_e83987f665cf5504"), __wbg_Number_bb48ca12f395cd08: /* @__PURE__ */ __name(() => X, "__wbg_Number_bb48ca12f395cd08"), __wbg_String_8f0eb39a4a4c2f66: /* @__PURE__ */ __name(() => Y, "__wbg_String_8f0eb39a4a4c2f66"), __wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd: /* @__PURE__ */ __name(() => K, "__wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd"), __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: /* @__PURE__ */ __name(() => Z, "__wbg___wbindgen_boolean_get_6d5a1ee65bab5f68"), __wbg___wbindgen_debug_string_df47ffb5e35e6763: /* @__PURE__ */ __name(() => ee, "__wbg___wbindgen_debug_string_df47ffb5e35e6763"), __wbg___wbindgen_in_bb933bd9e1b3bc0f: /* @__PURE__ */ __name(() => te, "__wbg___wbindgen_in_bb933bd9e1b3bc0f"), __wbg___wbindgen_is_bigint_cb320707dcd35f0b: /* @__PURE__ */ __name(() => ne, "__wbg___wbindgen_is_bigint_cb320707dcd35f0b"), __wbg___wbindgen_is_function_ee8a6c5833c90377: /* @__PURE__ */ __name(() => re, "__wbg___wbindgen_is_function_ee8a6c5833c90377"), __wbg___wbindgen_is_object_c818261d21f283a4: /* @__PURE__ */ __name(() => _e, "__wbg___wbindgen_is_object_c818261d21f283a4"), __wbg___wbindgen_is_string_fbb76cb2940daafd: /* @__PURE__ */ __name(() => oe, "__wbg___wbindgen_is_string_fbb76cb2940daafd"), __wbg___wbindgen_is_undefined_2d472862bd29a478: /* @__PURE__ */ __name(() => ce, "__wbg___wbindgen_is_undefined_2d472862bd29a478"), __wbg___wbindgen_jsval_eq_6b13ab83478b1c50: /* @__PURE__ */ __name(() => ie, "__wbg___wbindgen_jsval_eq_6b13ab83478b1c50"), __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: /* @__PURE__ */ __name(() => ue, "__wbg___wbindgen_jsval_loose_eq_b664b38a2f582147"), __wbg___wbindgen_number_get_a20bf9b85341449d: /* @__PURE__ */ __name(() => se, "__wbg___wbindgen_number_get_a20bf9b85341449d"), __wbg___wbindgen_string_get_e4f06c90489ad01b: /* @__PURE__ */ __name(() => be, "__wbg___wbindgen_string_get_e4f06c90489ad01b"), __wbg___wbindgen_throw_b855445ff6a94295: /* @__PURE__ */ __name(() => fe, "__wbg___wbindgen_throw_b855445ff6a94295"), __wbg__wbg_cb_unref_2454a539ea5790d9: /* @__PURE__ */ __name(() => ae, "__wbg__wbg_cb_unref_2454a539ea5790d9"), __wbg_call_525440f72fbfc0ea: /* @__PURE__ */ __name(() => ge, "__wbg_call_525440f72fbfc0ea"), __wbg_call_e762c39fa8ea36bf: /* @__PURE__ */ __name(() => le, "__wbg_call_e762c39fa8ea36bf"), __wbg_crypto_805be4ce92f1e370: /* @__PURE__ */ __name(() => de, "__wbg_crypto_805be4ce92f1e370"), __wbg_done_2042aa2670fb1db1: /* @__PURE__ */ __name(() => we, "__wbg_done_2042aa2670fb1db1"), __wbg_entries_e171b586f8f6bdbf: /* @__PURE__ */ __name(() => pe, "__wbg_entries_e171b586f8f6bdbf"), __wbg_exec_fdeec61d47617356: /* @__PURE__ */ __name(() => xe, "__wbg_exec_fdeec61d47617356"), __wbg_getRandomValues_f6a868620c8bab49: /* @__PURE__ */ __name(() => ye, "__wbg_getRandomValues_f6a868620c8bab49"), __wbg_getTime_14776bfb48a1bff9: /* @__PURE__ */ __name(() => me, "__wbg_getTime_14776bfb48a1bff9"), __wbg_get_7bed016f185add81: /* @__PURE__ */ __name(() => he, "__wbg_get_7bed016f185add81"), __wbg_get_ece95cf6585650d9: /* @__PURE__ */ __name(() => Te, "__wbg_get_ece95cf6585650d9"), __wbg_get_efcb449f58ec27c2: /* @__PURE__ */ __name(() => Ae, "__wbg_get_efcb449f58ec27c2"), __wbg_get_with_ref_key_1dc361bd10053bfe: /* @__PURE__ */ __name(() => Se, "__wbg_get_with_ref_key_1dc361bd10053bfe"), __wbg_has_787fafc980c3ccdb: /* @__PURE__ */ __name(() => Fe, "__wbg_has_787fafc980c3ccdb"), __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: /* @__PURE__ */ __name(() => Ie, "__wbg_instanceof_ArrayBuffer_70beb1189ca63b38"), __wbg_instanceof_Map_8579b5e2ab5437c7: /* @__PURE__ */ __name(() => qe, "__wbg_instanceof_Map_8579b5e2ab5437c7"), __wbg_instanceof_Promise_001fdd42afa1b7ef: /* @__PURE__ */ __name(() => Ee, "__wbg_instanceof_Promise_001fdd42afa1b7ef"), __wbg_instanceof_Uint8Array_20c8e73002f7af98: /* @__PURE__ */ __name(() => ke, "__wbg_instanceof_Uint8Array_20c8e73002f7af98"), __wbg_isArray_96e0af9891d0945d: /* @__PURE__ */ __name(() => Oe, "__wbg_isArray_96e0af9891d0945d"), __wbg_isSafeInteger_d216eda7911dde36: /* @__PURE__ */ __name(() => Me, "__wbg_isSafeInteger_d216eda7911dde36"), __wbg_iterator_e5822695327a3c39: /* @__PURE__ */ __name(() => ve, "__wbg_iterator_e5822695327a3c39"), __wbg_keys_b4d27b02ad14f4be: /* @__PURE__ */ __name(() => De, "__wbg_keys_b4d27b02ad14f4be"), __wbg_length_69bca3cb64fc8748: /* @__PURE__ */ __name(() => Re, "__wbg_length_69bca3cb64fc8748"), __wbg_length_cdd215e10d9dd507: /* @__PURE__ */ __name(() => je, "__wbg_length_cdd215e10d9dd507"), __wbg_msCrypto_2ac4d17c4748234a: /* @__PURE__ */ __name(() => Be, "__wbg_msCrypto_2ac4d17c4748234a"), __wbg_new_0_f9740686d739025c: /* @__PURE__ */ __name(() => Ue, "__wbg_new_0_f9740686d739025c"), __wbg_new_1acc0b6eea89d040: /* @__PURE__ */ __name(() => Le, "__wbg_new_1acc0b6eea89d040"), __wbg_new_23fa8b12a239f036: /* @__PURE__ */ __name(() => Ne, "__wbg_new_23fa8b12a239f036"), __wbg_new_3c3d849046688a66: /* @__PURE__ */ __name(() => Ce, "__wbg_new_3c3d849046688a66"), __wbg_new_5a79be3ab53b8aa5: /* @__PURE__ */ __name(() => $e, "__wbg_new_5a79be3ab53b8aa5"), __wbg_new_68651c719dcda04e: /* @__PURE__ */ __name(() => Ve, "__wbg_new_68651c719dcda04e"), __wbg_new_e17d9f43105b08be: /* @__PURE__ */ __name(() => We, "__wbg_new_e17d9f43105b08be"), __wbg_new_from_slice_92f4d78ca282a2d2: /* @__PURE__ */ __name(() => ze, "__wbg_new_from_slice_92f4d78ca282a2d2"), __wbg_new_no_args_ee98eee5275000a4: /* @__PURE__ */ __name(() => Pe, "__wbg_new_no_args_ee98eee5275000a4"), __wbg_new_with_length_01aa0dc35aa13543: /* @__PURE__ */ __name(() => Ge, "__wbg_new_with_length_01aa0dc35aa13543"), __wbg_next_020810e0ae8ebcb0: /* @__PURE__ */ __name(() => Qe, "__wbg_next_020810e0ae8ebcb0"), __wbg_next_2c826fe5dfec6b6a: /* @__PURE__ */ __name(() => He, "__wbg_next_2c826fe5dfec6b6a"), __wbg_node_ecc8306b9857f33d: /* @__PURE__ */ __name(() => Je, "__wbg_node_ecc8306b9857f33d"), __wbg_now_793306c526e2e3b6: /* @__PURE__ */ __name(() => Xe, "__wbg_now_793306c526e2e3b6"), __wbg_now_7fd00a794a07d388: /* @__PURE__ */ __name(() => Ye, "__wbg_now_7fd00a794a07d388"), __wbg_now_b3f7572f6ef3d3a9: /* @__PURE__ */ __name(() => Ke, "__wbg_now_b3f7572f6ef3d3a9"), __wbg_process_5cff2739921be718: /* @__PURE__ */ __name(() => Ze, "__wbg_process_5cff2739921be718"), __wbg_prototypesetcall_2a6620b6922694b2: /* @__PURE__ */ __name(() => et, "__wbg_prototypesetcall_2a6620b6922694b2"), __wbg_push_df81a39d04db858c: /* @__PURE__ */ __name(() => tt, "__wbg_push_df81a39d04db858c"), __wbg_queueMicrotask_5a8a9131f3f0b37b: /* @__PURE__ */ __name(() => nt, "__wbg_queueMicrotask_5a8a9131f3f0b37b"), __wbg_queueMicrotask_6d79674585219521: /* @__PURE__ */ __name(() => rt, "__wbg_queueMicrotask_6d79674585219521"), __wbg_randomFillSync_d3c85af7e31cf1f8: /* @__PURE__ */ __name(() => _t, "__wbg_randomFillSync_d3c85af7e31cf1f8"), __wbg_require_0c566c6f2eef6c79: /* @__PURE__ */ __name(() => ot, "__wbg_require_0c566c6f2eef6c79"), __wbg_resolve_caf97c30b83f7053: /* @__PURE__ */ __name(() => ct, "__wbg_resolve_caf97c30b83f7053"), __wbg_setTimeout_5d6a1d4fc51ea450: /* @__PURE__ */ __name(() => it, "__wbg_setTimeout_5d6a1d4fc51ea450"), __wbg_set_3f1d0b984ed272ed: /* @__PURE__ */ __name(() => ut, "__wbg_set_3f1d0b984ed272ed"), __wbg_set_907fb406c34a251d: /* @__PURE__ */ __name(() => st, "__wbg_set_907fb406c34a251d"), __wbg_set_c213c871859d6500: /* @__PURE__ */ __name(() => bt, "__wbg_set_c213c871859d6500"), __wbg_set_c2abbebe8b9ebee1: /* @__PURE__ */ __name(() => ft, "__wbg_set_c2abbebe8b9ebee1"), __wbg_set_wasm: /* @__PURE__ */ __name(() => $, "__wbg_set_wasm"), __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: /* @__PURE__ */ __name(() => at, "__wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e"), __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: /* @__PURE__ */ __name(() => gt, "__wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac"), __wbg_static_accessor_SELF_6fdf4b64710cc91b: /* @__PURE__ */ __name(() => lt, "__wbg_static_accessor_SELF_6fdf4b64710cc91b"), __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: /* @__PURE__ */ __name(() => dt, "__wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2"), __wbg_subarray_480600f3d6a9f26c: /* @__PURE__ */ __name(() => wt, "__wbg_subarray_480600f3d6a9f26c"), __wbg_then_4f46f6544e6b4a28: /* @__PURE__ */ __name(() => pt, "__wbg_then_4f46f6544e6b4a28"), __wbg_then_70d05cf780a18d77: /* @__PURE__ */ __name(() => xt, "__wbg_then_70d05cf780a18d77"), __wbg_valueOf_9eee4828c11458ca: /* @__PURE__ */ __name(() => yt, "__wbg_valueOf_9eee4828c11458ca"), __wbg_value_692627309814bb8c: /* @__PURE__ */ __name(() => mt, "__wbg_value_692627309814bb8c"), __wbg_versions_a8e5a362e1f16442: /* @__PURE__ */ __name(() => ht, "__wbg_versions_a8e5a362e1f16442"), __wbindgen_cast_2241b6af4c4b2941: /* @__PURE__ */ __name(() => Tt, "__wbindgen_cast_2241b6af4c4b2941"), __wbindgen_cast_4625c577ab2ec9ee: /* @__PURE__ */ __name(() => At, "__wbindgen_cast_4625c577ab2ec9ee"), __wbindgen_cast_7bf296c42657ff30: /* @__PURE__ */ __name(() => St, "__wbindgen_cast_7bf296c42657ff30"), __wbindgen_cast_9ae0607507abb057: /* @__PURE__ */ __name(() => Ft, "__wbindgen_cast_9ae0607507abb057"), __wbindgen_cast_cb9088102bce6b30: /* @__PURE__ */ __name(() => It, "__wbindgen_cast_cb9088102bce6b30"), __wbindgen_cast_d6cd19b81560fd6e: /* @__PURE__ */ __name(() => qt, "__wbindgen_cast_d6cd19b81560fd6e"), __wbindgen_init_externref_table: /* @__PURE__ */ __name(() => Et, "__wbindgen_init_externref_table"), debug_panic: /* @__PURE__ */ __name(() => G, "debug_panic"), getBuildTimeInfo: /* @__PURE__ */ __name(() => P, "getBuildTimeInfo") });
    module.exports = C(kt);
    var T = /* @__PURE__ */ __name(() => {
    }, "T");
    T.prototype = T;
    var _;
    function $(e) {
      _ = e;
    }
    __name($, "$");
    var A = null;
    function y() {
      return (A === null || A.byteLength === 0) && (A = new Uint8Array(_.memory.buffer)), A;
    }
    __name(y, "y");
    var S = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    S.decode();
    var V = 2146435072;
    var I = 0;
    function W(e, t) {
      return I += t, I >= V && (S = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }), S.decode(), I = t), S.decode(y().subarray(e, e + t));
    }
    __name(W, "W");
    function w(e, t) {
      return e = e >>> 0, W(e, t);
    }
    __name(w, "w");
    var s = 0;
    var m = new TextEncoder();
    "encodeInto" in m || (m.encodeInto = function(e, t) {
      const n = m.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    });
    function b(e, t, n) {
      if (n === void 0) {
        const u = m.encode(e), f = t(u.length, 1) >>> 0;
        return y().subarray(f, f + u.length).set(u), s = u.length, f;
      }
      let r = e.length, o = t(r, 1) >>> 0;
      const i = y();
      let c = 0;
      for (; c < r; c++) {
        const u = e.charCodeAt(c);
        if (u > 127) break;
        i[o + c] = u;
      }
      if (c !== r) {
        c !== 0 && (e = e.slice(c)), o = n(o, r, r = c + e.length * 3, 1) >>> 0;
        const u = y().subarray(o + c, o + r), f = m.encodeInto(e, u);
        c += f.written, o = n(o, r, c, 1) >>> 0;
      }
      return s = c, o;
    }
    __name(b, "b");
    var p = null;
    function l() {
      return (p === null || p.buffer.detached === true || p.buffer.detached === void 0 && p.buffer !== _.memory.buffer) && (p = new DataView(_.memory.buffer)), p;
    }
    __name(l, "l");
    function a(e) {
      return e == null;
    }
    __name(a, "a");
    function q(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null) return `${e}`;
      if (t == "string") return `"${e}"`;
      if (t == "symbol") {
        const o = e.description;
        return o == null ? "Symbol" : `Symbol(${o})`;
      }
      if (t == "function") {
        const o = e.name;
        return typeof o == "string" && o.length > 0 ? `Function(${o})` : "Function";
      }
      if (Array.isArray(e)) {
        const o = e.length;
        let i = "[";
        o > 0 && (i += q(e[0]));
        for (let c = 1; c < o; c++) i += ", " + q(e[c]);
        return i += "]", i;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
      let r;
      if (n && n.length > 1) r = n[1];
      else return toString.call(e);
      if (r == "Object") try {
        return "Object(" + JSON.stringify(e) + ")";
      } catch {
        return "Object";
      }
      return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
    }
    __name(q, "q");
    function x(e) {
      const t = _.__externref_table_alloc();
      return _.__wbindgen_externrefs.set(t, e), t;
    }
    __name(x, "x");
    function g(e, t) {
      try {
        return e.apply(this, t);
      } catch (n) {
        const r = x(n);
        _.__wbindgen_exn_store(r);
      }
    }
    __name(g, "g");
    function E(e, t) {
      return e = e >>> 0, y().subarray(e / 1, e / 1 + t);
    }
    __name(E, "E");
    var O = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
    function z(e, t, n, r) {
      const o = { a: e, b: t, cnt: 1, dtor: n }, i = /* @__PURE__ */ __name((...c) => {
        o.cnt++;
        const u = o.a;
        o.a = 0;
        try {
          return r(u, o.b, ...c);
        } finally {
          o.a = u, i._wbg_cb_unref();
        }
      }, "i");
      return i._wbg_cb_unref = () => {
        --o.cnt === 0 && (o.dtor(o.a, o.b), o.a = 0, O.unregister(o));
      }, O.register(i, o, o), i;
    }
    __name(z, "z");
    function M(e) {
      const t = _.__wbindgen_externrefs.get(e);
      return _.__externref_table_dealloc(e), t;
    }
    __name(M, "M");
    function P() {
      return _.getBuildTimeInfo();
    }
    __name(P, "P");
    function G(e) {
      var t = a(e) ? 0 : b(e, _.__wbindgen_malloc, _.__wbindgen_realloc), n = s;
      const r = _.debug_panic(t, n);
      if (r[1]) throw M(r[0]);
    }
    __name(G, "G");
    function Q(e, t, n) {
      _.wasm_bindgen__convert__closures_____invoke__ha235f3ea55a06a09(e, t, n);
    }
    __name(Q, "Q");
    function H(e, t, n, r) {
      _.wasm_bindgen__convert__closures_____invoke__h1a2f20be69ab8911(e, t, n, r);
    }
    __name(H, "H");
    var v = typeof FinalizationRegistry > "u" ? { register: /* @__PURE__ */ __name(() => {
    }, "register"), unregister: /* @__PURE__ */ __name(() => {
    }, "unregister") } : new FinalizationRegistry((e) => _.__wbg_queryengine_free(e >>> 0, 1));
    var k = class {
      static {
        __name(this, "k");
      }
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, v.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        _.__wbg_queryengine_free(t, 0);
      }
      disconnect(t, n) {
        const r = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), o = s, i = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), c = s;
        return _.queryengine_disconnect(this.__wbg_ptr, r, o, i, c);
      }
      startTransaction(t, n, r) {
        const o = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = s, c = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = s, f = b(r, _.__wbindgen_malloc, _.__wbindgen_realloc), d = s;
        return _.queryengine_startTransaction(this.__wbg_ptr, o, i, c, u, f, d);
      }
      commitTransaction(t, n, r) {
        const o = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = s, c = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = s, f = b(r, _.__wbindgen_malloc, _.__wbindgen_realloc), d = s;
        return _.queryengine_commitTransaction(this.__wbg_ptr, o, i, c, u, f, d);
      }
      rollbackTransaction(t, n, r) {
        const o = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), i = s, c = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), u = s, f = b(r, _.__wbindgen_malloc, _.__wbindgen_realloc), d = s;
        return _.queryengine_rollbackTransaction(this.__wbg_ptr, o, i, c, u, f, d);
      }
      constructor(t, n, r) {
        const o = _.queryengine_new(t, n, r);
        if (o[2]) throw M(o[1]);
        return this.__wbg_ptr = o[0] >>> 0, v.register(this, this.__wbg_ptr, this), this;
      }
      query(t, n, r, o) {
        const i = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), c = s, u = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), f = s;
        var d = a(r) ? 0 : b(r, _.__wbindgen_malloc, _.__wbindgen_realloc), h = s;
        const D = b(o, _.__wbindgen_malloc, _.__wbindgen_realloc), R = s;
        return _.queryengine_query(this.__wbg_ptr, i, c, u, f, d, h, D, R);
      }
      trace(t) {
        const n = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), r = s;
        return _.queryengine_trace(this.__wbg_ptr, n, r);
      }
      connect(t, n) {
        const r = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), o = s, i = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), c = s;
        return _.queryengine_connect(this.__wbg_ptr, r, o, i, c);
      }
      metrics(t) {
        const n = b(t, _.__wbindgen_malloc, _.__wbindgen_realloc), r = s;
        return _.queryengine_metrics(this.__wbg_ptr, n, r);
      }
    };
    Symbol.dispose && (k.prototype[Symbol.dispose] = k.prototype.free);
    function J(e, t) {
      return Error(w(e, t));
    }
    __name(J, "J");
    function X(e) {
      return Number(e);
    }
    __name(X, "X");
    function Y(e, t) {
      const n = String(t), r = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), o = s;
      l().setInt32(e + 4 * 1, o, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(Y, "Y");
    function K(e, t) {
      const n = t, r = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(e + 8 * 1, a(r) ? BigInt(0) : r, true), l().setInt32(e + 4 * 0, !a(r), true);
    }
    __name(K, "K");
    function Z(e) {
      const t = e, n = typeof t == "boolean" ? t : void 0;
      return a(n) ? 16777215 : n ? 1 : 0;
    }
    __name(Z, "Z");
    function ee(e, t) {
      const n = q(t), r = b(n, _.__wbindgen_malloc, _.__wbindgen_realloc), o = s;
      l().setInt32(e + 4 * 1, o, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(ee, "ee");
    function te(e, t) {
      return e in t;
    }
    __name(te, "te");
    function ne(e) {
      return typeof e == "bigint";
    }
    __name(ne, "ne");
    function re(e) {
      return typeof e == "function";
    }
    __name(re, "re");
    function _e(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(_e, "_e");
    function oe(e) {
      return typeof e == "string";
    }
    __name(oe, "oe");
    function ce(e) {
      return e === void 0;
    }
    __name(ce, "ce");
    function ie(e, t) {
      return e === t;
    }
    __name(ie, "ie");
    function ue(e, t) {
      return e == t;
    }
    __name(ue, "ue");
    function se(e, t) {
      const n = t, r = typeof n == "number" ? n : void 0;
      l().setFloat64(e + 8 * 1, a(r) ? 0 : r, true), l().setInt32(e + 4 * 0, !a(r), true);
    }
    __name(se, "se");
    function be(e, t) {
      const n = t, r = typeof n == "string" ? n : void 0;
      var o = a(r) ? 0 : b(r, _.__wbindgen_malloc, _.__wbindgen_realloc), i = s;
      l().setInt32(e + 4 * 1, i, true), l().setInt32(e + 4 * 0, o, true);
    }
    __name(be, "be");
    function fe(e, t) {
      throw new Error(w(e, t));
    }
    __name(fe, "fe");
    function ae(e) {
      e._wbg_cb_unref();
    }
    __name(ae, "ae");
    function ge() {
      return g(function(e, t, n) {
        return e.call(t, n);
      }, arguments);
    }
    __name(ge, "ge");
    function le() {
      return g(function(e, t) {
        return e.call(t);
      }, arguments);
    }
    __name(le, "le");
    function de(e) {
      return e.crypto;
    }
    __name(de, "de");
    function we(e) {
      return e.done;
    }
    __name(we, "we");
    function pe(e) {
      return Object.entries(e);
    }
    __name(pe, "pe");
    function xe(e, t, n) {
      const r = e.exec(w(t, n));
      return a(r) ? 0 : x(r);
    }
    __name(xe, "xe");
    function ye() {
      return g(function(e, t) {
        e.getRandomValues(t);
      }, arguments);
    }
    __name(ye, "ye");
    function me(e) {
      return e.getTime();
    }
    __name(me, "me");
    function he(e, t) {
      return e[t >>> 0];
    }
    __name(he, "he");
    function Te() {
      return g(function(e, t) {
        return e[t];
      }, arguments);
    }
    __name(Te, "Te");
    function Ae() {
      return g(function(e, t) {
        return Reflect.get(e, t);
      }, arguments);
    }
    __name(Ae, "Ae");
    function Se(e, t) {
      return e[t];
    }
    __name(Se, "Se");
    function Fe() {
      return g(function(e, t) {
        return Reflect.has(e, t);
      }, arguments);
    }
    __name(Fe, "Fe");
    function Ie(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(Ie, "Ie");
    function qe(e) {
      let t;
      try {
        t = e instanceof Map;
      } catch {
        t = false;
      }
      return t;
    }
    __name(qe, "qe");
    function Ee(e) {
      let t;
      try {
        t = e instanceof Promise;
      } catch {
        t = false;
      }
      return t;
    }
    __name(Ee, "Ee");
    function ke(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ke, "ke");
    function Oe(e) {
      return Array.isArray(e);
    }
    __name(Oe, "Oe");
    function Me(e) {
      return Number.isSafeInteger(e);
    }
    __name(Me, "Me");
    function ve() {
      return Symbol.iterator;
    }
    __name(ve, "ve");
    function De(e) {
      return Object.keys(e);
    }
    __name(De, "De");
    function Re(e) {
      return e.length;
    }
    __name(Re, "Re");
    function je(e) {
      return e.length;
    }
    __name(je, "je");
    function Be(e) {
      return e.msCrypto;
    }
    __name(Be, "Be");
    function Ue() {
      return /* @__PURE__ */ new Date();
    }
    __name(Ue, "Ue");
    function Le() {
      return new Object();
    }
    __name(Le, "Le");
    function Ne(e, t, n, r) {
      return new RegExp(w(e, t), w(n, r));
    }
    __name(Ne, "Ne");
    function Ce(e, t) {
      try {
        var n = { a: e, b: t }, r = /* @__PURE__ */ __name((i, c) => {
          const u = n.a;
          n.a = 0;
          try {
            return H(u, n.b, i, c);
          } finally {
            n.a = u;
          }
        }, "r");
        return new Promise(r);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(Ce, "Ce");
    function $e(e) {
      return new Uint8Array(e);
    }
    __name($e, "$e");
    function Ve() {
      return /* @__PURE__ */ new Map();
    }
    __name(Ve, "Ve");
    function We() {
      return new Array();
    }
    __name(We, "We");
    function ze(e, t) {
      return new Uint8Array(E(e, t));
    }
    __name(ze, "ze");
    function Pe(e, t) {
      return new T(w(e, t));
    }
    __name(Pe, "Pe");
    function Ge(e) {
      return new Uint8Array(e >>> 0);
    }
    __name(Ge, "Ge");
    function Qe() {
      return g(function(e) {
        return e.next();
      }, arguments);
    }
    __name(Qe, "Qe");
    function He(e) {
      return e.next;
    }
    __name(He, "He");
    function Je(e) {
      return e.node;
    }
    __name(Je, "Je");
    function Xe() {
      return Date.now();
    }
    __name(Xe, "Xe");
    function Ye(e) {
      return e.now();
    }
    __name(Ye, "Ye");
    function Ke() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(Ke, "Ke");
    function Ze(e) {
      return e.process;
    }
    __name(Ze, "Ze");
    function et(e, t, n) {
      Uint8Array.prototype.set.call(E(e, t), n);
    }
    __name(et, "et");
    function tt(e, t) {
      return e.push(t);
    }
    __name(tt, "tt");
    function nt(e) {
      return e.queueMicrotask;
    }
    __name(nt, "nt");
    function rt(e) {
      queueMicrotask(e);
    }
    __name(rt, "rt");
    function _t() {
      return g(function(e, t) {
        e.randomFillSync(t);
      }, arguments);
    }
    __name(_t, "_t");
    function ot() {
      return g(function() {
        return module.require;
      }, arguments);
    }
    __name(ot, "ot");
    function ct(e) {
      return Promise.resolve(e);
    }
    __name(ct, "ct");
    function it(e, t) {
      return setTimeout(e, t >>> 0);
    }
    __name(it, "it");
    function ut(e, t, n) {
      e[t] = n;
    }
    __name(ut, "ut");
    function st(e, t, n) {
      return e.set(t, n);
    }
    __name(st, "st");
    function bt(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(bt, "bt");
    function ft() {
      return g(function(e, t, n) {
        return Reflect.set(e, t, n);
      }, arguments);
    }
    __name(ft, "ft");
    function at() {
      const e = typeof global > "u" ? null : global;
      return a(e) ? 0 : x(e);
    }
    __name(at, "at");
    function gt() {
      const e = typeof globalThis > "u" ? null : globalThis;
      return a(e) ? 0 : x(e);
    }
    __name(gt, "gt");
    function lt() {
      const e = typeof self > "u" ? null : self;
      return a(e) ? 0 : x(e);
    }
    __name(lt, "lt");
    function dt() {
      const e = typeof window > "u" ? null : window;
      return a(e) ? 0 : x(e);
    }
    __name(dt, "dt");
    function wt(e, t, n) {
      return e.subarray(t >>> 0, n >>> 0);
    }
    __name(wt, "wt");
    function pt(e, t) {
      return e.then(t);
    }
    __name(pt, "pt");
    function xt(e, t, n) {
      return e.then(t, n);
    }
    __name(xt, "xt");
    function yt(e) {
      return e.valueOf();
    }
    __name(yt, "yt");
    function mt(e) {
      return e.value;
    }
    __name(mt, "mt");
    function ht(e) {
      return e.versions;
    }
    __name(ht, "ht");
    function Tt(e, t) {
      return w(e, t);
    }
    __name(Tt, "Tt");
    function At(e) {
      return BigInt.asUintN(64, e);
    }
    __name(At, "At");
    function St(e, t) {
      return z(e, t, _.wasm_bindgen__closure__destroy__hf9ae564cf31e91c2, Q);
    }
    __name(St, "St");
    function Ft(e) {
      return e;
    }
    __name(Ft, "Ft");
    function It(e, t) {
      return E(e, t);
    }
    __name(It, "It");
    function qt(e) {
      return e;
    }
    __name(qt, "qt");
    function Et() {
      const e = _.__wbindgen_externrefs, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(Et, "Et");
  }
});

// node_modules/.prisma/client/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "node_modules/.prisma/client/wasm-worker-loader.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    wasm_worker_loader_default = import("./f4b69850bc2f6b02c2a186cea508d821c6b30f98-query_engine_bg.wasm");
  }
});

// node_modules/.prisma/client/wasm.js
var require_wasm = __commonJS({
  "node_modules/.prisma/client/wasm.js"(exports) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join3,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug2,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm_engine_edge();
    var Prisma = {};
    exports.Prisma = Prisma;
    exports.$Enums = {};
    Prisma.prismaVersion = {
      client: "6.19.3",
      engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
    };
    Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma.Decimal = Decimal2;
    Prisma.sql = sqltag2;
    Prisma.empty = empty2;
    Prisma.join = join3;
    Prisma.raw = raw3;
    Prisma.validator = Public2.validator;
    Prisma.getExtensionContext = Extensions2.getExtensionContext;
    Prisma.defineExtension = Extensions2.defineExtension;
    Prisma.DbNull = objectEnumValues2.instances.DbNull;
    Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.AdminScalarFieldEnum = {
      id: "id",
      username: "username",
      passwordHash: "passwordHash",
      createdAt: "createdAt"
    };
    exports.Prisma.StoreSectionScalarFieldEnum = {
      id: "id",
      name: "name",
      x: "x",
      y: "y",
      width: "width",
      height: "height",
      color: "color",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StoreRackScalarFieldEnum = {
      id: "id",
      name: "name",
      sectionId: "sectionId",
      x: "x",
      y: "y",
      width: "width",
      height: "height",
      divisions: "divisions",
      orientation: "orientation",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.ProductScalarFieldEnum = {
      id: "id",
      name: "name",
      brand: "brand",
      category: "category",
      price: "price",
      sku: "sku",
      status: "status",
      imageUrl: "imageUrl",
      floor: "floor",
      sectionName: "sectionName",
      aisle: "aisle",
      rackId: "rackId",
      rackDivision: "rackDivision",
      locationX: "locationX",
      locationY: "locationY",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.NavNodeScalarFieldEnum = {
      id: "id",
      x: "x",
      y: "y",
      label: "label",
      type: "type"
    };
    exports.Prisma.NavEdgeScalarFieldEnum = {
      id: "id",
      fromNodeId: "fromNodeId",
      toNodeId: "toNodeId",
      distance: "distance"
    };
    exports.Prisma.StoreConfigScalarFieldEnum = {
      key: "key",
      value: "value",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.JsonNullValueInput = {
      JsonNull: Prisma.JsonNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma.DbNull,
      JsonNull: Prisma.JsonNull,
      AnyNull: Prisma.AnyNull
    };
    exports.Prisma.ModelName = {
      Admin: "Admin",
      StoreSection: "StoreSection",
      StoreRack: "StoreRack",
      Product: "Product",
      NavNode: "NavNode",
      NavEdge: "NavEdge",
      StoreConfig: "StoreConfig"
    };
    var config2 = {
      "generator": {
        "name": "client",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/home/harsh/StoreMap/server/node_modules/@prisma/client",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "debian-openssl-3.0.x",
            "native": true
          }
        ],
        "previewFeatures": [],
        "sourceFilePath": "/home/harsh/StoreMap/server/prisma/schema.prisma"
      },
      "relativeEnvPaths": {
        "rootEnvPath": null,
        "schemaEnvPath": "../../../.env"
      },
      "relativePath": "../../../prisma",
      "clientVersion": "6.19.3",
      "engineVersion": "c2990dca591cba766e3b7ef5d9e8a84796e47ab7",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id           Int      @id @default(autoincrement())
  username     String   @unique
  passwordHash String   @map("password_hash")
  createdAt    DateTime @default(now()) @map("created_at")

  @@map("admins")
}

model StoreSection {
  id        String   @id @default(cuid())
  name      String
  x         Float
  y         Float
  width     Float
  height    Float
  color     String   @default("#f1f5f9")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  racks StoreRack[]

  @@map("store_sections")
}

model StoreRack {
  id          String   @id @default(cuid())
  name        String
  sectionId   String?  @map("section_id")
  x           Float
  y           Float
  width       Float
  height      Float
  divisions   Int      @default(5)
  orientation String   @default("vertical") // 'vertical' | 'horizontal'
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  section  StoreSection? @relation(fields: [sectionId], references: [id], onDelete: SetNull)
  products Product[]

  @@map("store_racks")
}

model Product {
  id           String   @id @default(cuid())
  name         String
  brand        String?
  category     String?
  price        Float    @default(0)
  sku          String?
  status       String   @default("Available") // 'Available' | 'Low Stock' | 'Out of Stock'
  imageUrl     String?  @map("image_url")
  floor        Int      @default(1)
  sectionName  String?  @map("section_name")
  aisle        String?
  rackId       String?  @map("rack_id")
  rackDivision Int?     @map("rack_division") // 1-based slot index
  locationX    Float?   @map("location_x")
  locationY    Float?   @map("location_y")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  rack StoreRack? @relation(fields: [rackId], references: [id], onDelete: SetNull)

  @@map("products")
}

model NavNode {
  id    String  @id
  x     Float
  y     Float
  label String?
  type  String  @default("path") // 'path' | 'product' | 'entrance' | 'checkout'

  fromEdges NavEdge[] @relation("from")
  toEdges   NavEdge[] @relation("to")

  @@map("nav_nodes")
}

model NavEdge {
  id         Int    @id @default(autoincrement())
  fromNodeId String @map("from_node_id")
  toNodeId   String @map("to_node_id")
  distance   Float

  fromNode NavNode @relation("from", fields: [fromNodeId], references: [id], onDelete: Cascade)
  toNode   NavNode @relation("to", fields: [toNodeId], references: [id], onDelete: Cascade)

  @@unique([fromNodeId, toNodeId])
  @@map("nav_edges")
}

model StoreConfig {
  key       String   @id
  value     Json
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("store_config")
}
`,
      "inlineSchemaHash": "48eafd643db837d00c242d4fe5888778e0b2d0d2a4a84492874c09d5e512a858",
      "copyEngine": true
    };
    config2.dirname = "/";
    config2.runtimeDataModel = JSON.parse('{"models":{"Admin":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"username","kind":"scalar","type":"String"},{"name":"passwordHash","kind":"scalar","type":"String","dbName":"password_hash"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"}],"dbName":"admins"},"StoreSection":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"x","kind":"scalar","type":"Float"},{"name":"y","kind":"scalar","type":"Float"},{"name":"width","kind":"scalar","type":"Float"},{"name":"height","kind":"scalar","type":"Float"},{"name":"color","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"racks","kind":"object","type":"StoreRack","relationName":"StoreRackToStoreSection"}],"dbName":"store_sections"},"StoreRack":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"sectionId","kind":"scalar","type":"String","dbName":"section_id"},{"name":"x","kind":"scalar","type":"Float"},{"name":"y","kind":"scalar","type":"Float"},{"name":"width","kind":"scalar","type":"Float"},{"name":"height","kind":"scalar","type":"Float"},{"name":"divisions","kind":"scalar","type":"Int"},{"name":"orientation","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"section","kind":"object","type":"StoreSection","relationName":"StoreRackToStoreSection"},{"name":"products","kind":"object","type":"Product","relationName":"ProductToStoreRack"}],"dbName":"store_racks"},"Product":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"brand","kind":"scalar","type":"String"},{"name":"category","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"sku","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String","dbName":"image_url"},{"name":"floor","kind":"scalar","type":"Int"},{"name":"sectionName","kind":"scalar","type":"String","dbName":"section_name"},{"name":"aisle","kind":"scalar","type":"String"},{"name":"rackId","kind":"scalar","type":"String","dbName":"rack_id"},{"name":"rackDivision","kind":"scalar","type":"Int","dbName":"rack_division"},{"name":"locationX","kind":"scalar","type":"Float","dbName":"location_x"},{"name":"locationY","kind":"scalar","type":"Float","dbName":"location_y"},{"name":"createdAt","kind":"scalar","type":"DateTime","dbName":"created_at"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"},{"name":"rack","kind":"object","type":"StoreRack","relationName":"ProductToStoreRack"}],"dbName":"products"},"NavNode":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"x","kind":"scalar","type":"Float"},{"name":"y","kind":"scalar","type":"Float"},{"name":"label","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"fromEdges","kind":"object","type":"NavEdge","relationName":"from"},{"name":"toEdges","kind":"object","type":"NavEdge","relationName":"to"}],"dbName":"nav_nodes"},"NavEdge":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"fromNodeId","kind":"scalar","type":"String","dbName":"from_node_id"},{"name":"toNodeId","kind":"scalar","type":"String","dbName":"to_node_id"},{"name":"distance","kind":"scalar","type":"Float"},{"name":"fromNode","kind":"object","type":"NavNode","relationName":"from"},{"name":"toNode","kind":"object","type":"NavNode","relationName":"to"}],"dbName":"nav_edges"},"StoreConfig":{"fields":[{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"Json"},{"name":"updatedAt","kind":"scalar","type":"DateTime","dbName":"updated_at"}],"dbName":"store_config"}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config2.runtimeDataModel);
    config2.engineWasm = {
      getRuntime: /* @__PURE__ */ __name(async () => require_query_engine_bg(), "getRuntime"),
      getQueryEngineWasmModule: /* @__PURE__ */ __name(async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }, "getQueryEngineWasmModule")
    };
    config2.compilerWasm = void 0;
    config2.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug2.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient2 = getPrismaClient2(config2);
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// node_modules/.prisma/client/default.js
var require_default = __commonJS({
  "node_modules/.prisma/client/default.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = { ...require_wasm() };
  }
});

// node_modules/@prisma/client/default.js
var require_default2 = __commonJS({
  "node_modules/@prisma/client/default.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      ...require_default()
    };
  }
});

// node_modules/is-node-process/lib/index.mjs
function isNodeProcess() {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return true;
  }
  if (typeof process !== "undefined") {
    const type = process.type;
    if (type === "renderer" || type === "worker") {
      return false;
    }
    return !!(process.versions && process.versions.node);
  }
  return false;
}
var init_lib = __esm({
  "node_modules/is-node-process/lib/index.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(isNodeProcess, "isNodeProcess");
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = /* @__PURE__ */ __name(function isBuffer2(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    }, "isBuffer");
  }
});

// node_modules/retry/lib/retry_operation.js
var require_retry_operation = __commonJS({
  "node_modules/retry/lib/retry_operation.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function RetryOperation(timeouts, options) {
      if (typeof options === "boolean") {
        options = { forever: options };
      }
      this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
      this._timeouts = timeouts;
      this._options = options || {};
      this._maxRetryTime = options && options.maxRetryTime || Infinity;
      this._fn = null;
      this._errors = [];
      this._attempts = 1;
      this._operationTimeout = null;
      this._operationTimeoutCb = null;
      this._timeout = null;
      this._operationStart = null;
      this._timer = null;
      if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
      }
    }
    __name(RetryOperation, "RetryOperation");
    module.exports = RetryOperation;
    RetryOperation.prototype.reset = function() {
      this._attempts = 1;
      this._timeouts = this._originalTimeouts.slice(0);
    };
    RetryOperation.prototype.stop = function() {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this._timeouts = [];
      this._cachedTimeouts = null;
    };
    RetryOperation.prototype.retry = function(err) {
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
      if (!err) {
        return false;
      }
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error("RetryOperation timeout occurred"));
        return false;
      }
      this._errors.push(err);
      var timeout = this._timeouts.shift();
      if (timeout === void 0) {
        if (this._cachedTimeouts) {
          this._errors.splice(0, this._errors.length - 1);
          timeout = this._cachedTimeouts.slice(-1);
        } else {
          return false;
        }
      }
      var self2 = this;
      this._timer = setTimeout(function() {
        self2._attempts++;
        if (self2._operationTimeoutCb) {
          self2._timeout = setTimeout(function() {
            self2._operationTimeoutCb(self2._attempts);
          }, self2._operationTimeout);
          if (self2._options.unref) {
            self2._timeout.unref();
          }
        }
        self2._fn(self2._attempts);
      }, timeout);
      if (this._options.unref) {
        this._timer.unref();
      }
      return true;
    };
    RetryOperation.prototype.attempt = function(fn, timeoutOps) {
      this._fn = fn;
      if (timeoutOps) {
        if (timeoutOps.timeout) {
          this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
          this._operationTimeoutCb = timeoutOps.cb;
        }
      }
      var self2 = this;
      if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
          self2._operationTimeoutCb();
        }, self2._operationTimeout);
      }
      this._operationStart = (/* @__PURE__ */ new Date()).getTime();
      this._fn(this._attempts);
    };
    RetryOperation.prototype.try = function(fn) {
      console.log("Using RetryOperation.try() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = function(fn) {
      console.log("Using RetryOperation.start() is deprecated");
      this.attempt(fn);
    };
    RetryOperation.prototype.start = RetryOperation.prototype.try;
    RetryOperation.prototype.errors = function() {
      return this._errors;
    };
    RetryOperation.prototype.attempts = function() {
      return this._attempts;
    };
    RetryOperation.prototype.mainError = function() {
      if (this._errors.length === 0) {
        return null;
      }
      var counts = {};
      var mainError = null;
      var mainErrorCount = 0;
      for (var i = 0; i < this._errors.length; i++) {
        var error3 = this._errors[i];
        var message = error3.message;
        var count3 = (counts[message] || 0) + 1;
        counts[message] = count3;
        if (count3 >= mainErrorCount) {
          mainError = error3;
          mainErrorCount = count3;
        }
      }
      return mainError;
    };
  }
});

// node_modules/retry/lib/retry.js
var require_retry = __commonJS({
  "node_modules/retry/lib/retry.js"(exports) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var RetryOperation = require_retry_operation();
    exports.operation = function(options) {
      var timeouts = exports.timeouts(options);
      return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
      });
    };
    exports.timeouts = function(options) {
      if (options instanceof Array) {
        return [].concat(options);
      }
      var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: Infinity,
        randomize: false
      };
      for (var key in options) {
        opts[key] = options[key];
      }
      if (opts.minTimeout > opts.maxTimeout) {
        throw new Error("minTimeout is greater than maxTimeout");
      }
      var timeouts = [];
      for (var i = 0; i < opts.retries; i++) {
        timeouts.push(this.createTimeout(i, opts));
      }
      if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
      }
      timeouts.sort(function(a, b) {
        return a - b;
      });
      return timeouts;
    };
    exports.createTimeout = function(attempt, opts) {
      var random = opts.randomize ? Math.random() + 1 : 1;
      var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
      timeout = Math.min(timeout, opts.maxTimeout);
      return timeout;
    };
    exports.wrap = function(obj, options, methods) {
      if (options instanceof Array) {
        methods = options;
        options = null;
      }
      if (!methods) {
        methods = [];
        for (var key in obj) {
          if (typeof obj[key] === "function") {
            methods.push(key);
          }
        }
      }
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        var original = obj[method];
        obj[method] = (/* @__PURE__ */ __name(function retryWrapper(original2) {
          var op = exports.operation(options);
          var args = Array.prototype.slice.call(arguments, 1);
          var callback = args.pop();
          args.push(function(err) {
            if (op.retry(err)) {
              return;
            }
            if (err) {
              arguments[0] = op.mainError();
            }
            callback.apply(this, arguments);
          });
          op.attempt(function() {
            original2.apply(obj, args);
          });
        }, "retryWrapper")).bind(obj, original);
        obj[method].options = options;
      }
    };
  }
});

// node_modules/retry/index.js
var require_retry2 = __commonJS({
  "node_modules/retry/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_retry();
  }
});

// node_modules/async-retry/lib/index.js
var require_lib = __commonJS({
  "node_modules/async-retry/lib/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var retrier = require_retry2();
    function retry2(fn, opts) {
      function run(resolve, reject) {
        var options = opts || {};
        var op;
        if (!("randomize" in options)) {
          options.randomize = true;
        }
        op = retrier.operation(options);
        function bail(err) {
          reject(err || new Error("Aborted"));
        }
        __name(bail, "bail");
        function onError(err, num) {
          if (err.bail) {
            bail(err);
            return;
          }
          if (!op.retry(err)) {
            reject(op.mainError());
          } else if (options.onRetry) {
            options.onRetry(err, num);
          }
        }
        __name(onError, "onError");
        function runAttempt(num) {
          var val;
          try {
            val = fn(bail, num);
          } catch (err) {
            onError(err, num);
            return;
          }
          Promise.resolve(val).then(resolve).catch(/* @__PURE__ */ __name(function catchIt(err) {
            onError(err, num);
          }, "catchIt"));
        }
        __name(runAttempt, "runAttempt");
        op.attempt(runAttempt);
      }
      __name(run, "run");
      return new Promise(run);
    }
    __name(retry2, "retry");
    module.exports = retry2;
  }
});

// node_modules/@vercel/blob/dist/undici-browser.js
var fetch2;
var init_undici_browser = __esm({
  "node_modules/@vercel/blob/dist/undici-browser.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    fetch2 = globalThis.fetch.bind(globalThis);
  }
});

// node_modules/throttleit/index.js
var require_throttleit = __commonJS({
  "node_modules/throttleit/index.js"(exports, module) {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function throttle3(function_, wait) {
      if (typeof function_ !== "function") {
        throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
      }
      let timeoutId;
      let lastCallTime = 0;
      return /* @__PURE__ */ __name(function throttled(...arguments_) {
        clearTimeout(timeoutId);
        const now = Date.now();
        const timeSinceLastCall = now - lastCallTime;
        const delayForNextCall = wait - timeSinceLastCall;
        if (delayForNextCall <= 0) {
          lastCallTime = now;
          function_.apply(this, arguments_);
        } else {
          timeoutId = setTimeout(() => {
            lastCallTime = Date.now();
            function_.apply(this, arguments_);
          }, delayForNextCall);
        }
      }, "throttled");
    }
    __name(throttle3, "throttle");
    module.exports = throttle3;
  }
});

// node_modules/@vercel/blob/dist/chunk-VMBKF2I4.js
import { Readable } from "stream";
async function toReadableStream(value) {
  if (value instanceof ReadableStream) {
    return value;
  }
  if (value instanceof Blob) {
    return value.stream();
  }
  if (isNodeJsReadableStream(value)) {
    return Readable.toWeb(value);
  }
  let streamValue;
  if (value instanceof ArrayBuffer) {
    streamValue = new Uint8Array(value);
  } else if (isNodeJsBuffer(value)) {
    streamValue = value;
  } else {
    streamValue = stringToUint8Array(value);
  }
  if (await supportsNewBlobFromArrayBuffer) {
    return new Blob([streamValue]).stream();
  }
  return new ReadableStream({
    start(controller) {
      controller.enqueue(streamValue);
      controller.close();
    }
  });
}
function isNodeJsReadableStream(value) {
  return typeof value === "object" && typeof value.pipe === "function" && value.readable && typeof value._read === "function" && // @ts-expect-error _readableState does exists on Readable
  typeof value._readableState === "object";
}
function stringToUint8Array(s) {
  const enc = new TextEncoder();
  return enc.encode(s);
}
function isNodeJsBuffer(value) {
  return (0, import_is_buffer.default)(value);
}
function bytes(val) {
  if (typeof val === "number" && !isNaN(val)) {
    return val;
  }
  if (typeof val !== "string") {
    return null;
  }
  const results = parseRegExp.exec(val);
  let floatValue;
  let unit = "b";
  if (!results) {
    floatValue = parseInt(val, 10);
  } else {
    const [, res, , , unitMatch] = results;
    if (!res) {
      return null;
    }
    floatValue = parseFloat(res);
    if (unitMatch) {
      unit = unitMatch.toLowerCase();
    }
  }
  if (isNaN(floatValue)) {
    return null;
  }
  return Math.floor(map[unit] * floatValue);
}
function getTokenFromOptionsOrEnv(options) {
  if (options == null ? void 0 : options.token) {
    return options.token;
  }
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }
  throw new BlobError(
    "No token found. Either configure the `BLOB_READ_WRITE_TOKEN` environment variable, or pass a `token` option to your calls."
  );
}
function getDownloadUrl(blobUrl) {
  const url = new URL(blobUrl);
  url.searchParams.set("download", "1");
  return url.toString();
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function getApiUrl(pathname = "") {
  let baseUrl = null;
  try {
    baseUrl = process.env.VERCEL_BLOB_API_URL || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL;
  } catch {
  }
  return `${baseUrl || "https://blob.vercel-storage.com"}${pathname}`;
}
function computeBodyLength(body) {
  if (!body) {
    return 0;
  }
  if (typeof body === "string") {
    if (TEXT_ENCODER) {
      return TEXT_ENCODER.encode(body).byteLength;
    }
    return new Blob([body]).size;
  }
  if ("byteLength" in body && typeof body.byteLength === "number") {
    return body.byteLength;
  }
  if ("size" in body && typeof body.size === "number") {
    return body.size;
  }
  return 0;
}
function isReadableStream(value) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Not present in Node.js 16
    globalThis.ReadableStream && // TODO: Can be removed once Node.js 16 is no more required internally
    value instanceof ReadableStream
  );
}
function isStream(value) {
  if (isReadableStream(value)) {
    return true;
  }
  if (isNodeJsReadableStream(value)) {
    return true;
  }
  return false;
}
function isNetworkError(error3) {
  const isValid = error3 && isError(error3) && error3.name === "TypeError" && typeof error3.message === "string";
  if (!isValid) {
    return false;
  }
  if (error3.message === "Load failed") {
    return error3.stack === void 0;
  }
  return errorMessages.has(error3.message);
}
function debug3(message, ...args) {
  if (debugIsActive) {
    console.debug(`vercel-blob: ${message}`, ...args);
  }
}
function getApiVersion() {
  let versionOverride = null;
  try {
    versionOverride = process.env.VERCEL_BLOB_API_VERSION_OVERRIDE || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_VERSION_OVERRIDE;
  } catch {
  }
  return `${versionOverride != null ? versionOverride : BLOB_API_VERSION}`;
}
function getRetries() {
  try {
    const retries = process.env.VERCEL_BLOB_RETRIES || "10";
    return parseInt(retries, 10);
  } catch {
    return 10;
  }
}
function createBlobServiceRateLimited(response) {
  const retryAfter = response.headers.get("retry-after");
  return new BlobServiceRateLimited(
    retryAfter ? parseInt(retryAfter, 10) : void 0
  );
}
async function getBlobError(response) {
  var _a3, _b2, _c;
  let code;
  let message;
  try {
    const data = await response.json();
    code = (_b2 = (_a3 = data.error) == null ? void 0 : _a3.code) != null ? _b2 : "unknown_error";
    message = (_c = data.error) == null ? void 0 : _c.message;
  } catch {
    code = "unknown_error";
  }
  if ((message == null ? void 0 : message.includes("contentType")) && message.includes("is not allowed")) {
    code = "content_type_not_allowed";
  }
  if ((message == null ? void 0 : message.includes('"pathname"')) && message.includes("does not match the token payload")) {
    code = "client_token_pathname_mismatch";
  }
  if (message === "Token expired") {
    code = "client_token_expired";
  }
  if (message == null ? void 0 : message.includes("the file length cannot be greater than")) {
    code = "file_too_large";
  }
  let error3;
  switch (code) {
    case "store_suspended":
      error3 = new BlobStoreSuspendedError();
      break;
    case "forbidden":
      error3 = new BlobAccessError();
      break;
    case "content_type_not_allowed":
      error3 = new BlobContentTypeNotAllowedError(message);
      break;
    case "client_token_pathname_mismatch":
      error3 = new BlobPathnameMismatchError(message);
      break;
    case "client_token_expired":
      error3 = new BlobClientTokenExpiredError();
      break;
    case "file_too_large":
      error3 = new BlobFileTooLargeError(message);
      break;
    case "not_found":
      error3 = new BlobNotFoundError();
      break;
    case "store_not_found":
      error3 = new BlobStoreNotFoundError();
      break;
    case "bad_request":
      error3 = new BlobError(message != null ? message : "Bad request");
      break;
    case "service_unavailable":
      error3 = new BlobServiceNotAvailable();
      break;
    case "rate_limited":
      error3 = createBlobServiceRateLimited(response);
      break;
    case "unknown_error":
    case "not_allowed":
    default:
      error3 = new BlobUnknownError();
      break;
  }
  return { code, error: error3 };
}
async function requestApi(pathname, init, commandOptions) {
  const apiVersion = getApiVersion();
  const token = getTokenFromOptionsOrEnv(commandOptions);
  const extraHeaders = getProxyThroughAlternativeApiHeaderFromEnv();
  const [, , , storeId = ""] = token.split("_");
  const requestId = `${storeId}:${Date.now()}:${Math.random().toString(16).slice(2)}`;
  let retryCount = 0;
  let bodyLength = 0;
  let totalLoaded = 0;
  const sendBodyLength = (commandOptions == null ? void 0 : commandOptions.onUploadProgress) || shouldUseXContentLength();
  if (init.body && // 1. For upload progress we always need to know the total size of the body
  // 2. In development we need the header for put() to work correctly when passing a stream
  sendBodyLength) {
    bodyLength = computeBodyLength(init.body);
  }
  if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
    commandOptions.onUploadProgress({
      loaded: 0,
      total: bodyLength,
      percentage: 0
    });
  }
  const apiResponse = await (0, import_async_retry.default)(
    async (bail) => {
      let res;
      try {
        res = await blobRequest({
          input: getApiUrl(pathname),
          init: {
            ...init,
            headers: {
              "x-api-blob-request-id": requestId,
              "x-api-blob-request-attempt": String(retryCount),
              "x-api-version": apiVersion,
              ...sendBodyLength ? { "x-content-length": String(bodyLength) } : {},
              authorization: `Bearer ${token}`,
              ...extraHeaders,
              ...init.headers
            }
          },
          onUploadProgress: (commandOptions == null ? void 0 : commandOptions.onUploadProgress) ? (loaded) => {
            var _a3;
            const total = bodyLength !== 0 ? bodyLength : loaded;
            totalLoaded = loaded;
            const percentage = bodyLength > 0 ? Number((loaded / total * 100).toFixed(2)) : 0;
            if (percentage === 100 && bodyLength > 0) {
              return;
            }
            (_a3 = commandOptions.onUploadProgress) == null ? void 0 : _a3.call(commandOptions, {
              loaded,
              // When passing a stream to put(), we have no way to know the total size of the body.
              // Instead of defining total as total?: number we decided to set the total to the currently
              // loaded number. This is not inaccurate and way more practical for DX.
              // Passing down a stream to put() is very rare
              total,
              percentage
            });
          } : void 0
        });
      } catch (error22) {
        if (error22 instanceof DOMException2 && error22.name === "AbortError") {
          bail(new BlobRequestAbortedError());
          return;
        }
        if (isNetworkError(error22)) {
          throw error22;
        }
        if (error22 instanceof TypeError) {
          bail(error22);
          return;
        }
        throw error22;
      }
      if (res.ok) {
        return res;
      }
      const { code, error: error3 } = await getBlobError(res);
      if (code === "unknown_error" || code === "service_unavailable" || code === "internal_server_error") {
        throw error3;
      }
      bail(error3);
    },
    {
      retries: getRetries(),
      onRetry: /* @__PURE__ */ __name((error3) => {
        if (error3 instanceof Error) {
          debug3(`retrying API request to ${pathname}`, error3.message);
        }
        retryCount = retryCount + 1;
      }, "onRetry")
    }
  );
  if (!apiResponse) {
    throw new BlobUnknownError();
  }
  if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
    commandOptions.onUploadProgress({
      loaded: totalLoaded,
      total: totalLoaded,
      percentage: 100
    });
  }
  return await apiResponse.json();
}
function getProxyThroughAlternativeApiHeaderFromEnv() {
  const extraHeaders = {};
  try {
    if ("VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
      extraHeaders["x-proxy-through-alternative-api"] = process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
    } else if ("NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
      extraHeaders["x-proxy-through-alternative-api"] = process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
    }
  } catch {
  }
  return extraHeaders;
}
function shouldUseXContentLength() {
  try {
    return process.env.VERCEL_BLOB_USE_X_CONTENT_LENGTH === "1";
  } catch {
    return false;
  }
}
function createPutHeaders(allowedOptions, options) {
  const headers = {};
  if (allowedOptions.includes("contentType") && options.contentType) {
    headers[putOptionHeaderMap.contentType] = options.contentType;
  }
  if (allowedOptions.includes("addRandomSuffix") && options.addRandomSuffix !== void 0) {
    headers[putOptionHeaderMap.addRandomSuffix] = options.addRandomSuffix ? "1" : "0";
  }
  if (allowedOptions.includes("cacheControlMaxAge") && options.cacheControlMaxAge !== void 0) {
    headers[putOptionHeaderMap.cacheControlMaxAge] = options.cacheControlMaxAge.toString();
  }
  return headers;
}
async function createPutOptions({
  pathname,
  options,
  extraChecks,
  getToken
}) {
  if (!pathname) {
    throw new BlobError("pathname is required");
  }
  if (pathname.length > MAXIMUM_PATHNAME_LENGTH) {
    throw new BlobError(
      `pathname is too long, maximum length is ${MAXIMUM_PATHNAME_LENGTH}`
    );
  }
  for (const invalidCharacter of disallowedPathnameCharacters) {
    if (pathname.includes(invalidCharacter)) {
      throw new BlobError(
        `pathname cannot contain "${invalidCharacter}", please encode it if needed`
      );
    }
  }
  if (!options) {
    throw new BlobError("missing options, see usage");
  }
  if (options.access !== "public") {
    throw new BlobError('access must be "public"');
  }
  if (extraChecks) {
    extraChecks(options);
  }
  if (getToken) {
    options.token = await getToken(pathname, options);
  }
  return options;
}
function createCompleteMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
  return async (pathname, parts, optionsInput) => {
    const options = await createPutOptions({
      pathname,
      options: optionsInput,
      extraChecks,
      getToken
    });
    const headers = createPutHeaders(allowedOptions, options);
    return completeMultipartUpload({
      uploadId: options.uploadId,
      key: options.key,
      pathname,
      headers,
      options,
      parts
    });
  };
}
async function completeMultipartUpload({
  uploadId,
  key,
  pathname,
  parts,
  headers,
  options
}) {
  const params = new URLSearchParams({ pathname });
  try {
    const response = await requestApi(
      `/mpu?${params.toString()}`,
      {
        method: "POST",
        headers: {
          ...headers,
          "content-type": "application/json",
          "x-mpu-action": "complete",
          "x-mpu-upload-id": uploadId,
          // key can be any utf8 character so we need to encode it as HTTP headers can only be us-ascii
          // https://www.rfc-editor.org/rfc/rfc7230#swection-3.2.4
          "x-mpu-key": encodeURIComponent(key)
        },
        body: JSON.stringify(parts),
        signal: options.abortSignal
      },
      options
    );
    debug3("mpu: complete", response);
    return response;
  } catch (error3) {
    if (error3 instanceof TypeError && (error3.message === "Failed to fetch" || error3.message === "fetch failed")) {
      throw new BlobServiceNotAvailable();
    } else {
      throw error3;
    }
  }
}
function createCreateMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
  return async (pathname, optionsInput) => {
    const options = await createPutOptions({
      pathname,
      options: optionsInput,
      extraChecks,
      getToken
    });
    const headers = createPutHeaders(allowedOptions, options);
    const createMultipartUploadResponse = await createMultipartUpload(
      pathname,
      headers,
      options
    );
    return {
      key: createMultipartUploadResponse.key,
      uploadId: createMultipartUploadResponse.uploadId
    };
  };
}
async function createMultipartUpload(pathname, headers, options) {
  debug3("mpu: create", "pathname:", pathname);
  const params = new URLSearchParams({ pathname });
  try {
    const response = await requestApi(
      `/mpu?${params.toString()}`,
      {
        method: "POST",
        headers: {
          ...headers,
          "x-mpu-action": "create"
        },
        signal: options.abortSignal
      },
      options
    );
    debug3("mpu: create", response);
    return response;
  } catch (error3) {
    if (error3 instanceof TypeError && (error3.message === "Failed to fetch" || error3.message === "fetch failed")) {
      throw new BlobServiceNotAvailable();
    }
    throw error3;
  }
}
function createUploadPartMethod({ allowedOptions, getToken, extraChecks }) {
  return async (pathname, body, optionsInput) => {
    const options = await createPutOptions({
      pathname,
      options: optionsInput,
      extraChecks,
      getToken
    });
    const headers = createPutHeaders(allowedOptions, options);
    if (isPlainObject(body)) {
      throw new BlobError(
        "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
      );
    }
    const result = await uploadPart({
      uploadId: options.uploadId,
      key: options.key,
      pathname,
      part: { blob: body, partNumber: options.partNumber },
      headers,
      options
    });
    return {
      etag: result.etag,
      partNumber: options.partNumber
    };
  };
}
async function uploadPart({
  uploadId,
  key,
  pathname,
  headers,
  options,
  internalAbortController = new AbortController(),
  part
}) {
  var _a3, _b2, _c;
  const params = new URLSearchParams({ pathname });
  const responsePromise = requestApi(
    `/mpu?${params.toString()}`,
    {
      signal: internalAbortController.signal,
      method: "POST",
      headers: {
        ...headers,
        "x-mpu-action": "upload",
        "x-mpu-key": encodeURIComponent(key),
        "x-mpu-upload-id": uploadId,
        "x-mpu-part-number": part.partNumber.toString()
      },
      // weird things between undici types and native fetch types
      body: part.blob
    },
    options
  );
  function handleAbort() {
    internalAbortController.abort();
  }
  __name(handleAbort, "handleAbort");
  if ((_a3 = options.abortSignal) == null ? void 0 : _a3.aborted) {
    handleAbort();
  } else {
    (_b2 = options.abortSignal) == null ? void 0 : _b2.addEventListener("abort", handleAbort);
  }
  const response = await responsePromise;
  (_c = options.abortSignal) == null ? void 0 : _c.removeEventListener("abort", handleAbort);
  return response;
}
function uploadAllParts({
  uploadId,
  key,
  pathname,
  stream,
  headers,
  options,
  totalToLoad
}) {
  debug3("mpu: upload init", "key:", key);
  const internalAbortController = new AbortController();
  return new Promise((resolve, reject) => {
    const partsToUpload = [];
    const completedParts = [];
    const reader = stream.getReader();
    let activeUploads = 0;
    let reading = false;
    let currentPartNumber = 1;
    let rejected = false;
    let currentBytesInMemory = 0;
    let doneReading = false;
    let bytesSent = 0;
    let arrayBuffers = [];
    let currentPartBytesRead = 0;
    let onUploadProgress;
    const totalLoadedPerPartNumber = {};
    if (options.onUploadProgress) {
      onUploadProgress = (0, import_throttleit.default)(() => {
        var _a3;
        const loaded = Object.values(totalLoadedPerPartNumber).reduce(
          (acc, cur) => {
            return acc + cur;
          },
          0
        );
        const total = totalToLoad || loaded;
        const percentage = totalToLoad > 0 ? Number(((loaded / totalToLoad || loaded) * 100).toFixed(2)) : 0;
        (_a3 = options.onUploadProgress) == null ? void 0 : _a3.call(options, { loaded, total, percentage });
      }, 150);
    }
    read2().catch(cancel);
    async function read2() {
      debug3(
        "mpu: upload read start",
        "activeUploads:",
        activeUploads,
        "currentBytesInMemory:",
        `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
        "bytesSent:",
        bytes(bytesSent)
      );
      reading = true;
      while (currentBytesInMemory < maxBytesInMemory && !rejected) {
        try {
          const { value, done } = await reader.read();
          if (done) {
            doneReading = true;
            debug3("mpu: upload read consumed the whole stream");
            if (arrayBuffers.length > 0) {
              partsToUpload.push({
                partNumber: currentPartNumber++,
                blob: new Blob(arrayBuffers, {
                  type: "application/octet-stream"
                })
              });
              sendParts();
            }
            reading = false;
            return;
          }
          currentBytesInMemory += value.byteLength;
          let valueOffset = 0;
          while (valueOffset < value.byteLength) {
            const remainingPartSize = partSizeInBytes - currentPartBytesRead;
            const endOffset = Math.min(
              valueOffset + remainingPartSize,
              value.byteLength
            );
            const chunk = value.slice(valueOffset, endOffset);
            arrayBuffers.push(chunk);
            currentPartBytesRead += chunk.byteLength;
            valueOffset = endOffset;
            if (currentPartBytesRead === partSizeInBytes) {
              partsToUpload.push({
                partNumber: currentPartNumber++,
                blob: new Blob(arrayBuffers, {
                  type: "application/octet-stream"
                })
              });
              arrayBuffers = [];
              currentPartBytesRead = 0;
              sendParts();
            }
          }
        } catch (error3) {
          cancel(error3);
        }
      }
      debug3(
        "mpu: upload read end",
        "activeUploads:",
        activeUploads,
        "currentBytesInMemory:",
        `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
        "bytesSent:",
        bytes(bytesSent)
      );
      reading = false;
    }
    __name(read2, "read");
    async function sendPart(part) {
      activeUploads++;
      debug3(
        "mpu: upload send part start",
        "partNumber:",
        part.partNumber,
        "size:",
        part.blob.size,
        "activeUploads:",
        activeUploads,
        "currentBytesInMemory:",
        `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
        "bytesSent:",
        bytes(bytesSent)
      );
      try {
        const uploadProgressForPart = options.onUploadProgress ? (event) => {
          totalLoadedPerPartNumber[part.partNumber] = event.loaded;
          if (onUploadProgress) {
            onUploadProgress();
          }
        } : void 0;
        const completedPart = await uploadPart({
          uploadId,
          key,
          pathname,
          headers,
          options: {
            ...options,
            onUploadProgress: uploadProgressForPart
          },
          internalAbortController,
          part
        });
        debug3(
          "mpu: upload send part end",
          "partNumber:",
          part.partNumber,
          "activeUploads",
          activeUploads,
          "currentBytesInMemory:",
          `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`,
          "bytesSent:",
          bytes(bytesSent)
        );
        if (rejected) {
          return;
        }
        completedParts.push({
          partNumber: part.partNumber,
          etag: completedPart.etag
        });
        currentBytesInMemory -= part.blob.size;
        activeUploads--;
        bytesSent += part.blob.size;
        if (partsToUpload.length > 0) {
          sendParts();
        }
        if (doneReading) {
          if (activeUploads === 0) {
            reader.releaseLock();
            resolve(completedParts);
          }
          return;
        }
        if (!reading) {
          read2().catch(cancel);
        }
      } catch (error3) {
        cancel(error3);
      }
    }
    __name(sendPart, "sendPart");
    function sendParts() {
      if (rejected) {
        return;
      }
      debug3(
        "send parts",
        "activeUploads",
        activeUploads,
        "partsToUpload",
        partsToUpload.length
      );
      while (activeUploads < maxConcurrentUploads && partsToUpload.length > 0) {
        const partToSend = partsToUpload.shift();
        if (partToSend) {
          void sendPart(partToSend);
        }
      }
    }
    __name(sendParts, "sendParts");
    function cancel(error3) {
      if (rejected) {
        return;
      }
      rejected = true;
      internalAbortController.abort();
      reader.releaseLock();
      if (error3 instanceof TypeError && (error3.message === "Failed to fetch" || error3.message === "fetch failed")) {
        reject(new BlobServiceNotAvailable());
      } else {
        reject(error3);
      }
    }
    __name(cancel, "cancel");
  });
}
async function uncontrolledMultipartUpload(pathname, body, headers, options) {
  debug3("mpu: init", "pathname:", pathname, "headers:", headers);
  const optionsWithoutOnUploadProgress = {
    ...options,
    onUploadProgress: void 0
  };
  const createMultipartUploadResponse = await createMultipartUpload(
    pathname,
    headers,
    optionsWithoutOnUploadProgress
  );
  const totalToLoad = computeBodyLength(body);
  const stream = await toReadableStream(body);
  const parts = await uploadAllParts({
    uploadId: createMultipartUploadResponse.uploadId,
    key: createMultipartUploadResponse.key,
    pathname,
    stream,
    headers,
    options,
    totalToLoad
  });
  const blob = await completeMultipartUpload({
    uploadId: createMultipartUploadResponse.uploadId,
    key: createMultipartUploadResponse.key,
    pathname,
    parts,
    headers,
    options: optionsWithoutOnUploadProgress
  });
  return blob;
}
function createPutMethod({
  allowedOptions,
  getToken,
  extraChecks
}) {
  return /* @__PURE__ */ __name(async function put2(pathname, body, optionsInput) {
    if (!body) {
      throw new BlobError("body is required");
    }
    if (isPlainObject(body)) {
      throw new BlobError(
        "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
      );
    }
    const options = await createPutOptions({
      pathname,
      options: optionsInput,
      extraChecks,
      getToken
    });
    const headers = createPutHeaders(allowedOptions, options);
    if (options.multipart === true) {
      return uncontrolledMultipartUpload(pathname, body, headers, options);
    }
    const onUploadProgress = options.onUploadProgress ? (0, import_throttleit2.default)(options.onUploadProgress, 100) : void 0;
    const params = new URLSearchParams({ pathname });
    const response = await requestApi(
      `/?${params.toString()}`,
      {
        method: "PUT",
        body,
        headers,
        signal: options.abortSignal
      },
      {
        ...options,
        onUploadProgress
      }
    );
    return {
      url: response.url,
      downloadUrl: response.downloadUrl,
      pathname: response.pathname,
      contentType: response.contentType,
      contentDisposition: response.contentDisposition
    };
  }, "put");
}
function createCreateMultipartUploaderMethod({ allowedOptions, getToken, extraChecks }) {
  return async (pathname, optionsInput) => {
    const options = await createPutOptions({
      pathname,
      options: optionsInput,
      extraChecks,
      getToken
    });
    const headers = createPutHeaders(allowedOptions, options);
    const createMultipartUploadResponse = await createMultipartUpload(
      pathname,
      headers,
      options
    );
    return {
      key: createMultipartUploadResponse.key,
      uploadId: createMultipartUploadResponse.uploadId,
      async uploadPart(partNumber, body) {
        if (isPlainObject(body)) {
          throw new BlobError(
            "Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload."
          );
        }
        const result = await uploadPart({
          uploadId: createMultipartUploadResponse.uploadId,
          key: createMultipartUploadResponse.key,
          pathname,
          part: { partNumber, blob: body },
          headers,
          options
        });
        return {
          etag: result.etag,
          partNumber
        };
      },
      async complete(parts) {
        return completeMultipartUpload({
          uploadId: createMultipartUploadResponse.uploadId,
          key: createMultipartUploadResponse.key,
          pathname,
          parts,
          headers,
          options
        });
      }
    };
  };
}
async function createFolder(pathname, options = {}) {
  const folderPathname = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const headers = {};
  headers[putOptionHeaderMap.addRandomSuffix] = "0";
  const params = new URLSearchParams({ pathname: folderPathname });
  const response = await requestApi(
    `/?${params.toString()}`,
    {
      method: "PUT",
      headers,
      signal: options.abortSignal
    },
    options
  );
  return {
    url: response.url,
    pathname: response.pathname
  };
}
var import_is_buffer, import_async_retry, import_throttleit, import_throttleit2, supportsNewBlobFromArrayBuffer, parseRegExp, map, BlobError, disallowedPathnameCharacters, supportsRequestStreams, TEXT_ENCODER, createChunkTransformStream, objectToString, isError, errorMessages, debugIsActive, _a, _b, hasFetch, hasFetchWithUploadProgress, CHUNK_SIZE, blobFetch, hasXhr, blobXhr, blobRequest, _a2, DOMException2, MAXIMUM_PATHNAME_LENGTH, BlobAccessError, BlobContentTypeNotAllowedError, BlobPathnameMismatchError, BlobClientTokenExpiredError, BlobFileTooLargeError, BlobStoreNotFoundError, BlobStoreSuspendedError, BlobUnknownError, BlobNotFoundError, BlobServiceNotAvailable, BlobServiceRateLimited, BlobRequestAbortedError, BLOB_API_VERSION, putOptionHeaderMap, maxConcurrentUploads, partSizeInBytes, maxBytesInMemory;
var init_chunk_VMBKF2I4 = __esm({
  "node_modules/@vercel/blob/dist/chunk-VMBKF2I4.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_lib();
    import_is_buffer = __toESM(require_is_buffer(), 1);
    import_async_retry = __toESM(require_lib(), 1);
    init_undici_browser();
    import_throttleit = __toESM(require_throttleit(), 1);
    import_throttleit2 = __toESM(require_throttleit(), 1);
    supportsNewBlobFromArrayBuffer = new Promise((resolve) => {
      try {
        const helloAsArrayBuffer = new Uint8Array([104, 101, 108, 108, 111]);
        const blob = new Blob([helloAsArrayBuffer]);
        blob.text().then((text) => {
          resolve(text === "hello");
        }).catch(() => {
          resolve(false);
        });
      } catch {
        resolve(false);
      }
    });
    __name(toReadableStream, "toReadableStream");
    __name(isNodeJsReadableStream, "isNodeJsReadableStream");
    __name(stringToUint8Array, "stringToUint8Array");
    __name(isNodeJsBuffer, "isNodeJsBuffer");
    parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
    map = {
      b: 1,
      // eslint-disable-next-line no-bitwise -- fine
      kb: 1 << 10,
      // eslint-disable-next-line no-bitwise -- fine
      mb: 1 << 20,
      // eslint-disable-next-line no-bitwise -- fine
      gb: 1 << 30,
      tb: Math.pow(1024, 4),
      pb: Math.pow(1024, 5)
    };
    __name(bytes, "bytes");
    __name(getTokenFromOptionsOrEnv, "getTokenFromOptionsOrEnv");
    BlobError = class extends Error {
      static {
        __name(this, "BlobError");
      }
      constructor(message) {
        super(`Vercel Blob: ${message}`);
      }
    };
    __name(getDownloadUrl, "getDownloadUrl");
    __name(isPlainObject, "isPlainObject");
    disallowedPathnameCharacters = ["//"];
    supportsRequestStreams = (() => {
      if (isNodeProcess()) {
        return true;
      }
      const apiUrl = getApiUrl();
      if (apiUrl.startsWith("http://localhost")) {
        return false;
      }
      let duplexAccessed = false;
      const hasContentType = new Request(getApiUrl(), {
        body: new ReadableStream(),
        method: "POST",
        // @ts-expect-error -- TypeScript doesn't yet have duplex but it's in the spec: https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1729
        get duplex() {
          duplexAccessed = true;
          return "half";
        }
      }).headers.has("Content-Type");
      return duplexAccessed && !hasContentType;
    })();
    __name(getApiUrl, "getApiUrl");
    TEXT_ENCODER = typeof TextEncoder === "function" ? new TextEncoder() : null;
    __name(computeBodyLength, "computeBodyLength");
    createChunkTransformStream = /* @__PURE__ */ __name((chunkSize, onProgress) => {
      let buffer = new Uint8Array(0);
      return new TransformStream({
        transform(chunk, controller) {
          queueMicrotask(() => {
            const newBuffer = new Uint8Array(buffer.length + chunk.byteLength);
            newBuffer.set(buffer);
            newBuffer.set(new Uint8Array(chunk), buffer.length);
            buffer = newBuffer;
            while (buffer.length >= chunkSize) {
              const newChunk = buffer.slice(0, chunkSize);
              controller.enqueue(newChunk);
              onProgress == null ? void 0 : onProgress(newChunk.byteLength);
              buffer = buffer.slice(chunkSize);
            }
          });
        },
        flush(controller) {
          queueMicrotask(() => {
            if (buffer.length > 0) {
              controller.enqueue(buffer);
              onProgress == null ? void 0 : onProgress(buffer.byteLength);
            }
          });
        }
      });
    }, "createChunkTransformStream");
    __name(isReadableStream, "isReadableStream");
    __name(isStream, "isStream");
    objectToString = Object.prototype.toString;
    isError = /* @__PURE__ */ __name((value) => objectToString.call(value) === "[object Error]", "isError");
    errorMessages = /* @__PURE__ */ new Set([
      "network error",
      // Chrome
      "Failed to fetch",
      // Chrome
      "NetworkError when attempting to fetch resource.",
      // Firefox
      "The Internet connection appears to be offline.",
      // Safari 16
      "Load failed",
      // Safari 17+
      "Network request failed",
      // `cross-fetch`
      "fetch failed",
      // Undici (Node.js)
      "terminated"
      // Undici (Node.js)
    ]);
    __name(isNetworkError, "isNetworkError");
    debugIsActive = false;
    try {
      if (((_a = process.env.DEBUG) == null ? void 0 : _a.includes("blob")) || ((_b = process.env.NEXT_PUBLIC_DEBUG) == null ? void 0 : _b.includes("blob"))) {
        debugIsActive = true;
      }
    } catch (error3) {
    }
    __name(debug3, "debug");
    hasFetch = typeof fetch2 === "function";
    hasFetchWithUploadProgress = hasFetch && supportsRequestStreams;
    CHUNK_SIZE = 64 * 1024;
    blobFetch = /* @__PURE__ */ __name(async ({
      input,
      init,
      onUploadProgress
    }) => {
      debug3("using fetch");
      let body;
      if (init.body) {
        if (onUploadProgress) {
          const stream = await toReadableStream(init.body);
          let loaded = 0;
          const chunkTransformStream = createChunkTransformStream(
            CHUNK_SIZE,
            (newLoaded) => {
              loaded += newLoaded;
              onUploadProgress(loaded);
            }
          );
          body = stream.pipeThrough(chunkTransformStream);
        } else {
          body = init.body;
        }
      }
      const duplex = supportsRequestStreams && body && isStream(body) ? "half" : void 0;
      return fetch2(
        input,
        // @ts-expect-error -- Blob and Nodejs Blob are triggering type errors, fine with it
        {
          ...init,
          ...init.body ? { body } : {},
          duplex
        }
      );
    }, "blobFetch");
    hasXhr = typeof XMLHttpRequest !== "undefined";
    blobXhr = /* @__PURE__ */ __name(async ({
      input,
      init,
      onUploadProgress
    }) => {
      debug3("using xhr");
      let body = null;
      if (init.body) {
        if (isReadableStream(init.body)) {
          body = await new Response(init.body).blob();
        } else {
          body = init.body;
        }
      }
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(init.method || "GET", input.toString(), true);
        if (onUploadProgress) {
          xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
              onUploadProgress(event.loaded);
            }
          });
        }
        xhr.onload = () => {
          var _a3;
          if ((_a3 = init.signal) == null ? void 0 : _a3.aborted) {
            reject(new DOMException("The user aborted the request.", "AbortError"));
            return;
          }
          const headers = new Headers();
          const rawHeaders = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
          rawHeaders.forEach((line) => {
            const parts = line.split(": ");
            const key = parts.shift();
            const value = parts.join(": ");
            if (key) headers.set(key.toLowerCase(), value);
          });
          const response = new Response(xhr.response, {
            status: xhr.status,
            statusText: xhr.statusText,
            headers
          });
          resolve(response);
        };
        xhr.onerror = () => {
          reject(new TypeError("Network request failed"));
        };
        xhr.ontimeout = () => {
          reject(new TypeError("Network request timed out"));
        };
        xhr.onabort = () => {
          reject(new DOMException("The user aborted a request.", "AbortError"));
        };
        if (init.headers) {
          const headers = new Headers(init.headers);
          headers.forEach((value, key) => {
            xhr.setRequestHeader(key, value);
          });
        }
        if (init.signal) {
          init.signal.addEventListener("abort", () => {
            xhr.abort();
          });
          if (init.signal.aborted) {
            xhr.abort();
            return;
          }
        }
        xhr.send(body);
      });
    }, "blobXhr");
    blobRequest = /* @__PURE__ */ __name(async ({
      input,
      init,
      onUploadProgress
    }) => {
      if (onUploadProgress) {
        if (hasFetchWithUploadProgress) {
          return blobFetch({ input, init, onUploadProgress });
        }
        if (hasXhr) {
          return blobXhr({ input, init, onUploadProgress });
        }
      }
      if (hasFetch) {
        return blobFetch({ input, init });
      }
      if (hasXhr) {
        return blobXhr({ input, init });
      }
      throw new Error("No request implementation available");
    }, "blobRequest");
    DOMException2 = (_a2 = globalThis.DOMException) != null ? _a2 : (() => {
      try {
        atob("~");
      } catch (err) {
        return Object.getPrototypeOf(err).constructor;
      }
    })();
    MAXIMUM_PATHNAME_LENGTH = 950;
    BlobAccessError = class extends BlobError {
      static {
        __name(this, "BlobAccessError");
      }
      constructor() {
        super("Access denied, please provide a valid token for this resource.");
      }
    };
    BlobContentTypeNotAllowedError = class extends BlobError {
      static {
        __name(this, "BlobContentTypeNotAllowedError");
      }
      constructor(message) {
        super(`Content type mismatch, ${message}.`);
      }
    };
    BlobPathnameMismatchError = class extends BlobError {
      static {
        __name(this, "BlobPathnameMismatchError");
      }
      constructor(message) {
        super(
          `Pathname mismatch, ${message}. Check the pathname used in upload() or put() matches the one from the client token.`
        );
      }
    };
    BlobClientTokenExpiredError = class extends BlobError {
      static {
        __name(this, "BlobClientTokenExpiredError");
      }
      constructor() {
        super("Client token has expired.");
      }
    };
    BlobFileTooLargeError = class extends BlobError {
      static {
        __name(this, "BlobFileTooLargeError");
      }
      constructor(message) {
        super(`File is too large, ${message}.`);
      }
    };
    BlobStoreNotFoundError = class extends BlobError {
      static {
        __name(this, "BlobStoreNotFoundError");
      }
      constructor() {
        super("This store does not exist.");
      }
    };
    BlobStoreSuspendedError = class extends BlobError {
      static {
        __name(this, "BlobStoreSuspendedError");
      }
      constructor() {
        super("This store has been suspended.");
      }
    };
    BlobUnknownError = class extends BlobError {
      static {
        __name(this, "BlobUnknownError");
      }
      constructor() {
        super("Unknown error, please visit https://vercel.com/help.");
      }
    };
    BlobNotFoundError = class extends BlobError {
      static {
        __name(this, "BlobNotFoundError");
      }
      constructor() {
        super("The requested blob does not exist");
      }
    };
    BlobServiceNotAvailable = class extends BlobError {
      static {
        __name(this, "BlobServiceNotAvailable");
      }
      constructor() {
        super("The blob service is currently not available. Please try again.");
      }
    };
    BlobServiceRateLimited = class extends BlobError {
      static {
        __name(this, "BlobServiceRateLimited");
      }
      constructor(seconds) {
        super(
          `Too many requests please lower the number of concurrent requests ${seconds ? ` - try again in ${seconds} seconds` : ""}.`
        );
        this.retryAfter = seconds != null ? seconds : 0;
      }
    };
    BlobRequestAbortedError = class extends BlobError {
      static {
        __name(this, "BlobRequestAbortedError");
      }
      constructor() {
        super("The request was aborted.");
      }
    };
    BLOB_API_VERSION = 9;
    __name(getApiVersion, "getApiVersion");
    __name(getRetries, "getRetries");
    __name(createBlobServiceRateLimited, "createBlobServiceRateLimited");
    __name(getBlobError, "getBlobError");
    __name(requestApi, "requestApi");
    __name(getProxyThroughAlternativeApiHeaderFromEnv, "getProxyThroughAlternativeApiHeaderFromEnv");
    __name(shouldUseXContentLength, "shouldUseXContentLength");
    putOptionHeaderMap = {
      cacheControlMaxAge: "x-cache-control-max-age",
      addRandomSuffix: "x-add-random-suffix",
      contentType: "x-content-type"
    };
    __name(createPutHeaders, "createPutHeaders");
    __name(createPutOptions, "createPutOptions");
    __name(createCompleteMultipartUploadMethod, "createCompleteMultipartUploadMethod");
    __name(completeMultipartUpload, "completeMultipartUpload");
    __name(createCreateMultipartUploadMethod, "createCreateMultipartUploadMethod");
    __name(createMultipartUpload, "createMultipartUpload");
    __name(createUploadPartMethod, "createUploadPartMethod");
    __name(uploadPart, "uploadPart");
    maxConcurrentUploads = typeof window !== "undefined" ? 6 : 8;
    partSizeInBytes = 8 * 1024 * 1024;
    maxBytesInMemory = maxConcurrentUploads * partSizeInBytes * 2;
    __name(uploadAllParts, "uploadAllParts");
    __name(uncontrolledMultipartUpload, "uncontrolledMultipartUpload");
    __name(createPutMethod, "createPutMethod");
    __name(createCreateMultipartUploaderMethod, "createCreateMultipartUploaderMethod");
    __name(createFolder, "createFolder");
  }
});

// node_modules/@vercel/blob/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  BlobAccessError: () => BlobAccessError,
  BlobClientTokenExpiredError: () => BlobClientTokenExpiredError,
  BlobContentTypeNotAllowedError: () => BlobContentTypeNotAllowedError,
  BlobError: () => BlobError,
  BlobFileTooLargeError: () => BlobFileTooLargeError,
  BlobNotFoundError: () => BlobNotFoundError,
  BlobPathnameMismatchError: () => BlobPathnameMismatchError,
  BlobRequestAbortedError: () => BlobRequestAbortedError,
  BlobServiceNotAvailable: () => BlobServiceNotAvailable,
  BlobServiceRateLimited: () => BlobServiceRateLimited,
  BlobStoreNotFoundError: () => BlobStoreNotFoundError,
  BlobStoreSuspendedError: () => BlobStoreSuspendedError,
  BlobUnknownError: () => BlobUnknownError,
  completeMultipartUpload: () => completeMultipartUpload2,
  copy: () => copy,
  createFolder: () => createFolder,
  createMultipartUpload: () => createMultipartUpload2,
  createMultipartUploader: () => createMultipartUploader,
  del: () => del,
  getDownloadUrl: () => getDownloadUrl,
  head: () => head,
  list: () => list,
  put: () => put,
  uploadPart: () => uploadPart2
});
async function del(url, options) {
  await requestApi(
    "/delete",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ urls: Array.isArray(url) ? url : [url] }),
      signal: options == null ? void 0 : options.abortSignal
    },
    options
  );
}
async function head(url, options) {
  const searchParams = new URLSearchParams({ url });
  const response = await requestApi(
    `?${searchParams.toString()}`,
    // HEAD can't have body as a response, so we use GET
    {
      method: "GET",
      signal: options == null ? void 0 : options.abortSignal
    },
    options
  );
  return {
    url: response.url,
    downloadUrl: response.downloadUrl,
    pathname: response.pathname,
    size: response.size,
    contentType: response.contentType,
    contentDisposition: response.contentDisposition,
    cacheControl: response.cacheControl,
    uploadedAt: new Date(response.uploadedAt)
  };
}
async function list(options) {
  var _a3;
  const searchParams = new URLSearchParams();
  if (options == null ? void 0 : options.limit) {
    searchParams.set("limit", options.limit.toString());
  }
  if (options == null ? void 0 : options.prefix) {
    searchParams.set("prefix", options.prefix);
  }
  if (options == null ? void 0 : options.cursor) {
    searchParams.set("cursor", options.cursor);
  }
  if (options == null ? void 0 : options.mode) {
    searchParams.set("mode", options.mode);
  }
  const response = await requestApi(
    `?${searchParams.toString()}`,
    {
      method: "GET",
      signal: options == null ? void 0 : options.abortSignal
    },
    options
  );
  if ((options == null ? void 0 : options.mode) === "folded") {
    return {
      folders: (_a3 = response.folders) != null ? _a3 : [],
      cursor: response.cursor,
      hasMore: response.hasMore,
      blobs: response.blobs.map(mapBlobResult)
    };
  }
  return {
    cursor: response.cursor,
    hasMore: response.hasMore,
    blobs: response.blobs.map(mapBlobResult)
  };
}
function mapBlobResult(blobResult) {
  return {
    url: blobResult.url,
    downloadUrl: blobResult.downloadUrl,
    pathname: blobResult.pathname,
    size: blobResult.size,
    uploadedAt: new Date(blobResult.uploadedAt)
  };
}
async function copy(fromUrl, toPathname, options) {
  if (!options) {
    throw new BlobError("missing options, see usage");
  }
  if (options.access !== "public") {
    throw new BlobError('access must be "public"');
  }
  if (toPathname.length > MAXIMUM_PATHNAME_LENGTH) {
    throw new BlobError(
      `pathname is too long, maximum length is ${MAXIMUM_PATHNAME_LENGTH}`
    );
  }
  for (const invalidCharacter of disallowedPathnameCharacters) {
    if (toPathname.includes(invalidCharacter)) {
      throw new BlobError(
        `pathname cannot contain "${invalidCharacter}", please encode it if needed`
      );
    }
  }
  const headers = {};
  if (options.addRandomSuffix !== void 0) {
    headers["x-add-random-suffix"] = options.addRandomSuffix ? "1" : "0";
  }
  if (options.contentType) {
    headers["x-content-type"] = options.contentType;
  }
  if (options.cacheControlMaxAge !== void 0) {
    headers["x-cache-control-max-age"] = options.cacheControlMaxAge.toString();
  }
  const params = new URLSearchParams({ pathname: toPathname, fromUrl });
  const response = await requestApi(
    `?${params.toString()}`,
    {
      method: "PUT",
      headers,
      signal: options.abortSignal
    },
    options
  );
  return {
    url: response.url,
    downloadUrl: response.downloadUrl,
    pathname: response.pathname,
    contentType: response.contentType,
    contentDisposition: response.contentDisposition
  };
}
var put, createMultipartUpload2, createMultipartUploader, uploadPart2, completeMultipartUpload2;
var init_dist = __esm({
  "node_modules/@vercel/blob/dist/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunk_VMBKF2I4();
    __name(del, "del");
    __name(head, "head");
    __name(list, "list");
    __name(mapBlobResult, "mapBlobResult");
    __name(copy, "copy");
    put = createPutMethod({
      allowedOptions: ["cacheControlMaxAge", "addRandomSuffix", "contentType"]
    });
    createMultipartUpload2 = createCreateMultipartUploadMethod({
      allowedOptions: ["cacheControlMaxAge", "addRandomSuffix", "contentType"]
    });
    createMultipartUploader = createCreateMultipartUploaderMethod({
      allowedOptions: ["cacheControlMaxAge", "addRandomSuffix", "contentType"]
    });
    uploadPart2 = createUploadPartMethod({
      allowedOptions: ["cacheControlMaxAge", "addRandomSuffix", "contentType"]
    });
    completeMultipartUpload2 = createCompleteMultipartUploadMethod({
      allowedOptions: ["cacheControlMaxAge", "addRandomSuffix", "contentType"]
    });
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs.mjs
var fs_exports = {};
__export(fs_exports, {
  Dir: () => Dir,
  Dirent: () => Dirent,
  F_OK: () => F_OK,
  FileReadStream: () => FileReadStream,
  FileWriteStream: () => FileWriteStream,
  R_OK: () => R_OK,
  ReadStream: () => ReadStream2,
  Stats: () => Stats,
  W_OK: () => W_OK,
  WriteStream: () => WriteStream2,
  X_OK: () => X_OK,
  _toUnixTimestamp: () => _toUnixTimestamp,
  access: () => access2,
  accessSync: () => accessSync,
  appendFile: () => appendFile2,
  appendFileSync: () => appendFileSync,
  chmod: () => chmod2,
  chmodSync: () => chmodSync,
  chown: () => chown2,
  chownSync: () => chownSync,
  close: () => close,
  closeSync: () => closeSync,
  constants: () => constants_exports,
  copyFile: () => copyFile2,
  copyFileSync: () => copyFileSync,
  cp: () => cp2,
  cpSync: () => cpSync,
  createReadStream: () => createReadStream,
  createWriteStream: () => createWriteStream,
  default: () => fs_default,
  exists: () => exists,
  existsSync: () => existsSync,
  fchmod: () => fchmod,
  fchmodSync: () => fchmodSync,
  fchown: () => fchown,
  fchownSync: () => fchownSync,
  fdatasync: () => fdatasync,
  fdatasyncSync: () => fdatasyncSync,
  fstat: () => fstat,
  fstatSync: () => fstatSync,
  fsync: () => fsync,
  fsyncSync: () => fsyncSync,
  ftruncate: () => ftruncate,
  ftruncateSync: () => ftruncateSync,
  futimes: () => futimes,
  futimesSync: () => futimesSync,
  glob: () => glob2,
  globSync: () => globSync,
  lchmod: () => lchmod2,
  lchmodSync: () => lchmodSync,
  lchown: () => lchown2,
  lchownSync: () => lchownSync,
  link: () => link2,
  linkSync: () => linkSync,
  lstat: () => lstat2,
  lstatSync: () => lstatSync,
  lutimes: () => lutimes2,
  lutimesSync: () => lutimesSync,
  mkdir: () => mkdir2,
  mkdirSync: () => mkdirSync,
  mkdtemp: () => mkdtemp2,
  mkdtempSync: () => mkdtempSync,
  open: () => open2,
  openAsBlob: () => openAsBlob,
  openSync: () => openSync,
  opendir: () => opendir2,
  opendirSync: () => opendirSync,
  promises: () => promises_default,
  read: () => read,
  readFile: () => readFile2,
  readFileSync: () => readFileSync,
  readSync: () => readSync,
  readdir: () => readdir2,
  readdirSync: () => readdirSync,
  readlink: () => readlink2,
  readlinkSync: () => readlinkSync,
  readv: () => readv,
  readvSync: () => readvSync,
  realpath: () => realpath2,
  realpathSync: () => realpathSync,
  rename: () => rename2,
  renameSync: () => renameSync,
  rm: () => rm2,
  rmSync: () => rmSync,
  rmdir: () => rmdir2,
  rmdirSync: () => rmdirSync,
  stat: () => stat2,
  statSync: () => statSync,
  statfs: () => statfs2,
  statfsSync: () => statfsSync,
  symlink: () => symlink2,
  symlinkSync: () => symlinkSync,
  truncate: () => truncate2,
  truncateSync: () => truncateSync,
  unlink: () => unlink2,
  unlinkSync: () => unlinkSync,
  unwatchFile: () => unwatchFile,
  utimes: () => utimes2,
  utimesSync: () => utimesSync,
  watch: () => watch2,
  watchFile: () => watchFile,
  write: () => write,
  writeFile: () => writeFile2,
  writeFileSync: () => writeFileSync,
  writeSync: () => writeSync,
  writev: () => writev,
  writevSync: () => writevSync
});
var fs_default;
var init_fs2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node_modules/@hono/node-server/dist/constants-BLSFu_RU.mjs
var X_ALREADY_SENT;
var init_constants_BLSFu_RU = __esm({
  "node_modules/@hono/node-server/dist/constants-BLSFu_RU.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    X_ALREADY_SENT = "x-hono-already-sent";
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/request.mjs
import { Socket } from "node:net";
import { Readable as Readable2 } from "node:stream";
var init_request = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/request.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/response.mjs
import { Writable as Writable2 } from "node:stream";
var init_response = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/response.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/agent.mjs
import { EventEmitter as EventEmitter2 } from "node:events";
var Agent;
var init_agent = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/agent.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Agent = class extends EventEmitter2 {
      static {
        __name(this, "Agent");
      }
      __unenv__ = {};
      maxFreeSockets = 256;
      maxSockets = Infinity;
      maxTotalSockets = Infinity;
      freeSockets = {};
      sockets = {};
      requests = {};
      options;
      constructor(opts = {}) {
        super();
        this.options = opts;
      }
      destroy() {
      }
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/constants.mjs
var STATUS_CODES;
var init_constants2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    STATUS_CODES = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a Teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      425: "Too Early",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      509: "Bandwidth Limit Exceeded",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/http.mjs
var createServer, globalAgent, WebSocket, CloseEvent, MessageEvent2;
var init_http = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/http.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_agent();
    init_constants2();
    init_request();
    init_response();
    createServer = /* @__PURE__ */ notImplemented("http.createServer");
    globalAgent = new Agent();
    WebSocket = globalThis.WebSocket || /* @__PURE__ */ notImplementedClass("WebSocket");
    CloseEvent = globalThis.CloseEvent || /* @__PURE__ */ notImplementedClass("CloseEvent");
    MessageEvent2 = globalThis.MessageEvent || /* @__PURE__ */ notImplementedClass("MessageEvent");
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http2/constants.mjs
var NGHTTP2_ERR_FRAME_SIZE_ERROR, NGHTTP2_SESSION_SERVER, NGHTTP2_SESSION_CLIENT, NGHTTP2_STREAM_STATE_IDLE, NGHTTP2_STREAM_STATE_OPEN, NGHTTP2_STREAM_STATE_RESERVED_LOCAL, NGHTTP2_STREAM_STATE_RESERVED_REMOTE, NGHTTP2_STREAM_STATE_HALF_CLOSED_LOCAL, NGHTTP2_STREAM_STATE_HALF_CLOSED_REMOTE, NGHTTP2_STREAM_STATE_CLOSED, NGHTTP2_FLAG_NONE, NGHTTP2_FLAG_END_STREAM, NGHTTP2_FLAG_END_HEADERS, NGHTTP2_FLAG_ACK, NGHTTP2_FLAG_PADDED, NGHTTP2_FLAG_PRIORITY, DEFAULT_SETTINGS_HEADER_TABLE_SIZE, DEFAULT_SETTINGS_ENABLE_PUSH, DEFAULT_SETTINGS_MAX_CONCURRENT_STREAMS, DEFAULT_SETTINGS_INITIAL_WINDOW_SIZE, DEFAULT_SETTINGS_MAX_FRAME_SIZE, DEFAULT_SETTINGS_MAX_HEADER_LIST_SIZE, DEFAULT_SETTINGS_ENABLE_CONNECT_PROTOCOL, MAX_MAX_FRAME_SIZE, MIN_MAX_FRAME_SIZE, MAX_INITIAL_WINDOW_SIZE, NGHTTP2_SETTINGS_HEADER_TABLE_SIZE, NGHTTP2_SETTINGS_ENABLE_PUSH, NGHTTP2_SETTINGS_MAX_CONCURRENT_STREAMS, NGHTTP2_SETTINGS_INITIAL_WINDOW_SIZE, NGHTTP2_SETTINGS_MAX_FRAME_SIZE, NGHTTP2_SETTINGS_MAX_HEADER_LIST_SIZE, NGHTTP2_SETTINGS_ENABLE_CONNECT_PROTOCOL, PADDING_STRATEGY_NONE, PADDING_STRATEGY_ALIGNED, PADDING_STRATEGY_MAX, PADDING_STRATEGY_CALLBACK, NGHTTP2_NO_ERROR, NGHTTP2_PROTOCOL_ERROR, NGHTTP2_INTERNAL_ERROR, NGHTTP2_FLOW_CONTROL_ERROR, NGHTTP2_SETTINGS_TIMEOUT, NGHTTP2_STREAM_CLOSED, NGHTTP2_FRAME_SIZE_ERROR, NGHTTP2_REFUSED_STREAM, NGHTTP2_CANCEL, NGHTTP2_COMPRESSION_ERROR, NGHTTP2_CONNECT_ERROR, NGHTTP2_ENHANCE_YOUR_CALM, NGHTTP2_INADEQUATE_SECURITY, NGHTTP2_HTTP_1_1_REQUIRED, NGHTTP2_DEFAULT_WEIGHT, HTTP2_HEADER_STATUS, HTTP2_HEADER_METHOD, HTTP2_HEADER_AUTHORITY, HTTP2_HEADER_SCHEME, HTTP2_HEADER_PATH, HTTP2_HEADER_PROTOCOL, HTTP2_HEADER_ACCEPT_ENCODING, HTTP2_HEADER_ACCEPT_LANGUAGE, HTTP2_HEADER_ACCEPT_RANGES, HTTP2_HEADER_ACCEPT, HTTP2_HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS, HTTP2_HEADER_ACCESS_CONTROL_ALLOW_HEADERS, HTTP2_HEADER_ACCESS_CONTROL_ALLOW_METHODS, HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN, HTTP2_HEADER_ACCESS_CONTROL_EXPOSE_HEADERS, HTTP2_HEADER_ACCESS_CONTROL_REQUEST_HEADERS, HTTP2_HEADER_ACCESS_CONTROL_REQUEST_METHOD, HTTP2_HEADER_AGE, HTTP2_HEADER_AUTHORIZATION, HTTP2_HEADER_CACHE_CONTROL, HTTP2_HEADER_CONNECTION, HTTP2_HEADER_CONTENT_DISPOSITION, HTTP2_HEADER_CONTENT_ENCODING, HTTP2_HEADER_CONTENT_LENGTH, HTTP2_HEADER_CONTENT_TYPE, HTTP2_HEADER_COOKIE, HTTP2_HEADER_DATE, HTTP2_HEADER_ETAG, HTTP2_HEADER_FORWARDED, HTTP2_HEADER_HOST, HTTP2_HEADER_IF_MODIFIED_SINCE, HTTP2_HEADER_IF_NONE_MATCH, HTTP2_HEADER_IF_RANGE, HTTP2_HEADER_LAST_MODIFIED, HTTP2_HEADER_LINK, HTTP2_HEADER_LOCATION, HTTP2_HEADER_RANGE, HTTP2_HEADER_REFERER, HTTP2_HEADER_SERVER, HTTP2_HEADER_SET_COOKIE, HTTP2_HEADER_STRICT_TRANSPORT_SECURITY, HTTP2_HEADER_TRANSFER_ENCODING, HTTP2_HEADER_TE, HTTP2_HEADER_UPGRADE_INSECURE_REQUESTS, HTTP2_HEADER_UPGRADE, HTTP2_HEADER_USER_AGENT, HTTP2_HEADER_VARY, HTTP2_HEADER_X_CONTENT_TYPE_OPTIONS, HTTP2_HEADER_X_FRAME_OPTIONS, HTTP2_HEADER_KEEP_ALIVE, HTTP2_HEADER_PROXY_CONNECTION, HTTP2_HEADER_X_XSS_PROTECTION, HTTP2_HEADER_ALT_SVC, HTTP2_HEADER_CONTENT_SECURITY_POLICY, HTTP2_HEADER_EARLY_DATA, HTTP2_HEADER_EXPECT_CT, HTTP2_HEADER_ORIGIN, HTTP2_HEADER_PURPOSE, HTTP2_HEADER_TIMING_ALLOW_ORIGIN, HTTP2_HEADER_X_FORWARDED_FOR, HTTP2_HEADER_PRIORITY, HTTP2_HEADER_ACCEPT_CHARSET, HTTP2_HEADER_ACCESS_CONTROL_MAX_AGE, HTTP2_HEADER_ALLOW, HTTP2_HEADER_CONTENT_LANGUAGE, HTTP2_HEADER_CONTENT_LOCATION, HTTP2_HEADER_CONTENT_MD5, HTTP2_HEADER_CONTENT_RANGE, HTTP2_HEADER_DNT, HTTP2_HEADER_EXPECT, HTTP2_HEADER_EXPIRES, HTTP2_HEADER_FROM, HTTP2_HEADER_IF_MATCH, HTTP2_HEADER_IF_UNMODIFIED_SINCE, HTTP2_HEADER_MAX_FORWARDS, HTTP2_HEADER_PREFER, HTTP2_HEADER_PROXY_AUTHENTICATE, HTTP2_HEADER_PROXY_AUTHORIZATION, HTTP2_HEADER_REFRESH, HTTP2_HEADER_RETRY_AFTER, HTTP2_HEADER_TRAILER, HTTP2_HEADER_TK, HTTP2_HEADER_VIA, HTTP2_HEADER_WARNING, HTTP2_HEADER_WWW_AUTHENTICATE, HTTP2_HEADER_HTTP2_SETTINGS, HTTP2_METHOD_ACL, HTTP2_METHOD_BASELINE_CONTROL, HTTP2_METHOD_BIND, HTTP2_METHOD_CHECKIN, HTTP2_METHOD_CHECKOUT, HTTP2_METHOD_CONNECT, HTTP2_METHOD_COPY, HTTP2_METHOD_DELETE, HTTP2_METHOD_GET, HTTP2_METHOD_HEAD, HTTP2_METHOD_LABEL, HTTP2_METHOD_LINK, HTTP2_METHOD_LOCK, HTTP2_METHOD_MERGE, HTTP2_METHOD_MKACTIVITY, HTTP2_METHOD_MKCALENDAR, HTTP2_METHOD_MKCOL, HTTP2_METHOD_MKREDIRECTREF, HTTP2_METHOD_MKWORKSPACE, HTTP2_METHOD_MOVE, HTTP2_METHOD_OPTIONS, HTTP2_METHOD_ORDERPATCH, HTTP2_METHOD_PATCH, HTTP2_METHOD_POST, HTTP2_METHOD_PRI, HTTP2_METHOD_PROPFIND, HTTP2_METHOD_PROPPATCH, HTTP2_METHOD_PUT, HTTP2_METHOD_REBIND, HTTP2_METHOD_REPORT, HTTP2_METHOD_SEARCH, HTTP2_METHOD_TRACE, HTTP2_METHOD_UNBIND, HTTP2_METHOD_UNCHECKOUT, HTTP2_METHOD_UNLINK, HTTP2_METHOD_UNLOCK, HTTP2_METHOD_UPDATE, HTTP2_METHOD_UPDATEREDIRECTREF, HTTP2_METHOD_VERSION_CONTROL, HTTP_STATUS_CONTINUE, HTTP_STATUS_SWITCHING_PROTOCOLS, HTTP_STATUS_PROCESSING, HTTP_STATUS_EARLY_HINTS, HTTP_STATUS_OK, HTTP_STATUS_CREATED, HTTP_STATUS_ACCEPTED, HTTP_STATUS_NON_AUTHORITATIVE_INFORMATION, HTTP_STATUS_NO_CONTENT, HTTP_STATUS_RESET_CONTENT, HTTP_STATUS_PARTIAL_CONTENT, HTTP_STATUS_MULTI_STATUS, HTTP_STATUS_ALREADY_REPORTED, HTTP_STATUS_IM_USED, HTTP_STATUS_MULTIPLE_CHOICES, HTTP_STATUS_MOVED_PERMANENTLY, HTTP_STATUS_FOUND, HTTP_STATUS_SEE_OTHER, HTTP_STATUS_NOT_MODIFIED, HTTP_STATUS_USE_PROXY, HTTP_STATUS_TEMPORARY_REDIRECT, HTTP_STATUS_PERMANENT_REDIRECT, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_UNAUTHORIZED, HTTP_STATUS_PAYMENT_REQUIRED, HTTP_STATUS_FORBIDDEN, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_METHOD_NOT_ALLOWED, HTTP_STATUS_NOT_ACCEPTABLE, HTTP_STATUS_PROXY_AUTHENTICATION_REQUIRED, HTTP_STATUS_REQUEST_TIMEOUT, HTTP_STATUS_CONFLICT, HTTP_STATUS_GONE, HTTP_STATUS_LENGTH_REQUIRED, HTTP_STATUS_PRECONDITION_FAILED, HTTP_STATUS_PAYLOAD_TOO_LARGE, HTTP_STATUS_URI_TOO_LONG, HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE, HTTP_STATUS_RANGE_NOT_SATISFIABLE, HTTP_STATUS_EXPECTATION_FAILED, HTTP_STATUS_TEAPOT, HTTP_STATUS_MISDIRECTED_REQUEST, HTTP_STATUS_UNPROCESSABLE_ENTITY, HTTP_STATUS_LOCKED, HTTP_STATUS_FAILED_DEPENDENCY, HTTP_STATUS_TOO_EARLY, HTTP_STATUS_UPGRADE_REQUIRED, HTTP_STATUS_PRECONDITION_REQUIRED, HTTP_STATUS_TOO_MANY_REQUESTS, HTTP_STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE, HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_NOT_IMPLEMENTED, HTTP_STATUS_BAD_GATEWAY, HTTP_STATUS_SERVICE_UNAVAILABLE, HTTP_STATUS_GATEWAY_TIMEOUT, HTTP_STATUS_HTTP_VERSION_NOT_SUPPORTED, HTTP_STATUS_VARIANT_ALSO_NEGOTIATES, HTTP_STATUS_INSUFFICIENT_STORAGE, HTTP_STATUS_LOOP_DETECTED, HTTP_STATUS_BANDWIDTH_LIMIT_EXCEEDED, HTTP_STATUS_NOT_EXTENDED, HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED;
var init_constants3 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/internal/http2/constants.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NGHTTP2_ERR_FRAME_SIZE_ERROR = -522;
    NGHTTP2_SESSION_SERVER = 0;
    NGHTTP2_SESSION_CLIENT = 1;
    NGHTTP2_STREAM_STATE_IDLE = 1;
    NGHTTP2_STREAM_STATE_OPEN = 2;
    NGHTTP2_STREAM_STATE_RESERVED_LOCAL = 3;
    NGHTTP2_STREAM_STATE_RESERVED_REMOTE = 4;
    NGHTTP2_STREAM_STATE_HALF_CLOSED_LOCAL = 5;
    NGHTTP2_STREAM_STATE_HALF_CLOSED_REMOTE = 6;
    NGHTTP2_STREAM_STATE_CLOSED = 7;
    NGHTTP2_FLAG_NONE = 0;
    NGHTTP2_FLAG_END_STREAM = 1;
    NGHTTP2_FLAG_END_HEADERS = 4;
    NGHTTP2_FLAG_ACK = 1;
    NGHTTP2_FLAG_PADDED = 8;
    NGHTTP2_FLAG_PRIORITY = 32;
    DEFAULT_SETTINGS_HEADER_TABLE_SIZE = 4096;
    DEFAULT_SETTINGS_ENABLE_PUSH = 1;
    DEFAULT_SETTINGS_MAX_CONCURRENT_STREAMS = 4294967295;
    DEFAULT_SETTINGS_INITIAL_WINDOW_SIZE = 65535;
    DEFAULT_SETTINGS_MAX_FRAME_SIZE = 16384;
    DEFAULT_SETTINGS_MAX_HEADER_LIST_SIZE = 65535;
    DEFAULT_SETTINGS_ENABLE_CONNECT_PROTOCOL = 0;
    MAX_MAX_FRAME_SIZE = 16777215;
    MIN_MAX_FRAME_SIZE = 16384;
    MAX_INITIAL_WINDOW_SIZE = 2147483647;
    NGHTTP2_SETTINGS_HEADER_TABLE_SIZE = 1;
    NGHTTP2_SETTINGS_ENABLE_PUSH = 2;
    NGHTTP2_SETTINGS_MAX_CONCURRENT_STREAMS = 3;
    NGHTTP2_SETTINGS_INITIAL_WINDOW_SIZE = 4;
    NGHTTP2_SETTINGS_MAX_FRAME_SIZE = 5;
    NGHTTP2_SETTINGS_MAX_HEADER_LIST_SIZE = 6;
    NGHTTP2_SETTINGS_ENABLE_CONNECT_PROTOCOL = 8;
    PADDING_STRATEGY_NONE = 0;
    PADDING_STRATEGY_ALIGNED = 1;
    PADDING_STRATEGY_MAX = 2;
    PADDING_STRATEGY_CALLBACK = 1;
    NGHTTP2_NO_ERROR = 0;
    NGHTTP2_PROTOCOL_ERROR = 1;
    NGHTTP2_INTERNAL_ERROR = 2;
    NGHTTP2_FLOW_CONTROL_ERROR = 3;
    NGHTTP2_SETTINGS_TIMEOUT = 4;
    NGHTTP2_STREAM_CLOSED = 5;
    NGHTTP2_FRAME_SIZE_ERROR = 6;
    NGHTTP2_REFUSED_STREAM = 7;
    NGHTTP2_CANCEL = 8;
    NGHTTP2_COMPRESSION_ERROR = 9;
    NGHTTP2_CONNECT_ERROR = 10;
    NGHTTP2_ENHANCE_YOUR_CALM = 11;
    NGHTTP2_INADEQUATE_SECURITY = 12;
    NGHTTP2_HTTP_1_1_REQUIRED = 13;
    NGHTTP2_DEFAULT_WEIGHT = 16;
    HTTP2_HEADER_STATUS = ":status";
    HTTP2_HEADER_METHOD = ":method";
    HTTP2_HEADER_AUTHORITY = ":authority";
    HTTP2_HEADER_SCHEME = ":scheme";
    HTTP2_HEADER_PATH = ":path";
    HTTP2_HEADER_PROTOCOL = ":protocol";
    HTTP2_HEADER_ACCEPT_ENCODING = "accept-encoding";
    HTTP2_HEADER_ACCEPT_LANGUAGE = "accept-language";
    HTTP2_HEADER_ACCEPT_RANGES = "accept-ranges";
    HTTP2_HEADER_ACCEPT = "accept";
    HTTP2_HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS = "access-control-allow-credentials";
    HTTP2_HEADER_ACCESS_CONTROL_ALLOW_HEADERS = "access-control-allow-headers";
    HTTP2_HEADER_ACCESS_CONTROL_ALLOW_METHODS = "access-control-allow-methods";
    HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN = "access-control-allow-origin";
    HTTP2_HEADER_ACCESS_CONTROL_EXPOSE_HEADERS = "access-control-expose-headers";
    HTTP2_HEADER_ACCESS_CONTROL_REQUEST_HEADERS = "access-control-request-headers";
    HTTP2_HEADER_ACCESS_CONTROL_REQUEST_METHOD = "access-control-request-method";
    HTTP2_HEADER_AGE = "age";
    HTTP2_HEADER_AUTHORIZATION = "authorization";
    HTTP2_HEADER_CACHE_CONTROL = "cache-control";
    HTTP2_HEADER_CONNECTION = "connection";
    HTTP2_HEADER_CONTENT_DISPOSITION = "content-disposition";
    HTTP2_HEADER_CONTENT_ENCODING = "content-encoding";
    HTTP2_HEADER_CONTENT_LENGTH = "content-length";
    HTTP2_HEADER_CONTENT_TYPE = "content-type";
    HTTP2_HEADER_COOKIE = "cookie";
    HTTP2_HEADER_DATE = "date";
    HTTP2_HEADER_ETAG = "etag";
    HTTP2_HEADER_FORWARDED = "forwarded";
    HTTP2_HEADER_HOST = "host";
    HTTP2_HEADER_IF_MODIFIED_SINCE = "if-modified-since";
    HTTP2_HEADER_IF_NONE_MATCH = "if-none-match";
    HTTP2_HEADER_IF_RANGE = "if-range";
    HTTP2_HEADER_LAST_MODIFIED = "last-modified";
    HTTP2_HEADER_LINK = "link";
    HTTP2_HEADER_LOCATION = "location";
    HTTP2_HEADER_RANGE = "range";
    HTTP2_HEADER_REFERER = "referer";
    HTTP2_HEADER_SERVER = "server";
    HTTP2_HEADER_SET_COOKIE = "set-cookie";
    HTTP2_HEADER_STRICT_TRANSPORT_SECURITY = "strict-transport-security";
    HTTP2_HEADER_TRANSFER_ENCODING = "transfer-encoding";
    HTTP2_HEADER_TE = "te";
    HTTP2_HEADER_UPGRADE_INSECURE_REQUESTS = "upgrade-insecure-requests";
    HTTP2_HEADER_UPGRADE = "upgrade";
    HTTP2_HEADER_USER_AGENT = "user-agent";
    HTTP2_HEADER_VARY = "vary";
    HTTP2_HEADER_X_CONTENT_TYPE_OPTIONS = "x-content-type-options";
    HTTP2_HEADER_X_FRAME_OPTIONS = "x-frame-options";
    HTTP2_HEADER_KEEP_ALIVE = "keep-alive";
    HTTP2_HEADER_PROXY_CONNECTION = "proxy-connection";
    HTTP2_HEADER_X_XSS_PROTECTION = "x-xss-protection";
    HTTP2_HEADER_ALT_SVC = "alt-svc";
    HTTP2_HEADER_CONTENT_SECURITY_POLICY = "content-security-policy";
    HTTP2_HEADER_EARLY_DATA = "early-data";
    HTTP2_HEADER_EXPECT_CT = "expect-ct";
    HTTP2_HEADER_ORIGIN = "origin";
    HTTP2_HEADER_PURPOSE = "purpose";
    HTTP2_HEADER_TIMING_ALLOW_ORIGIN = "timing-allow-origin";
    HTTP2_HEADER_X_FORWARDED_FOR = "x-forwarded-for";
    HTTP2_HEADER_PRIORITY = "priority";
    HTTP2_HEADER_ACCEPT_CHARSET = "accept-charset";
    HTTP2_HEADER_ACCESS_CONTROL_MAX_AGE = "access-control-max-age";
    HTTP2_HEADER_ALLOW = "allow";
    HTTP2_HEADER_CONTENT_LANGUAGE = "content-language";
    HTTP2_HEADER_CONTENT_LOCATION = "content-location";
    HTTP2_HEADER_CONTENT_MD5 = "content-md5";
    HTTP2_HEADER_CONTENT_RANGE = "content-range";
    HTTP2_HEADER_DNT = "dnt";
    HTTP2_HEADER_EXPECT = "expect";
    HTTP2_HEADER_EXPIRES = "expires";
    HTTP2_HEADER_FROM = "from";
    HTTP2_HEADER_IF_MATCH = "if-match";
    HTTP2_HEADER_IF_UNMODIFIED_SINCE = "if-unmodified-since";
    HTTP2_HEADER_MAX_FORWARDS = "max-forwards";
    HTTP2_HEADER_PREFER = "prefer";
    HTTP2_HEADER_PROXY_AUTHENTICATE = "proxy-authenticate";
    HTTP2_HEADER_PROXY_AUTHORIZATION = "proxy-authorization";
    HTTP2_HEADER_REFRESH = "refresh";
    HTTP2_HEADER_RETRY_AFTER = "retry-after";
    HTTP2_HEADER_TRAILER = "trailer";
    HTTP2_HEADER_TK = "tk";
    HTTP2_HEADER_VIA = "via";
    HTTP2_HEADER_WARNING = "warning";
    HTTP2_HEADER_WWW_AUTHENTICATE = "www-authenticate";
    HTTP2_HEADER_HTTP2_SETTINGS = "http2-settings";
    HTTP2_METHOD_ACL = "ACL";
    HTTP2_METHOD_BASELINE_CONTROL = "BASELINE-CONTROL";
    HTTP2_METHOD_BIND = "BIND";
    HTTP2_METHOD_CHECKIN = "CHECKIN";
    HTTP2_METHOD_CHECKOUT = "CHECKOUT";
    HTTP2_METHOD_CONNECT = "CONNECT";
    HTTP2_METHOD_COPY = "COPY";
    HTTP2_METHOD_DELETE = "DELETE";
    HTTP2_METHOD_GET = "GET";
    HTTP2_METHOD_HEAD = "HEAD";
    HTTP2_METHOD_LABEL = "LABEL";
    HTTP2_METHOD_LINK = "LINK";
    HTTP2_METHOD_LOCK = "LOCK";
    HTTP2_METHOD_MERGE = "MERGE";
    HTTP2_METHOD_MKACTIVITY = "MKACTIVITY";
    HTTP2_METHOD_MKCALENDAR = "MKCALENDAR";
    HTTP2_METHOD_MKCOL = "MKCOL";
    HTTP2_METHOD_MKREDIRECTREF = "MKREDIRECTREF";
    HTTP2_METHOD_MKWORKSPACE = "MKWORKSPACE";
    HTTP2_METHOD_MOVE = "MOVE";
    HTTP2_METHOD_OPTIONS = "OPTIONS";
    HTTP2_METHOD_ORDERPATCH = "ORDERPATCH";
    HTTP2_METHOD_PATCH = "PATCH";
    HTTP2_METHOD_POST = "POST";
    HTTP2_METHOD_PRI = "PRI";
    HTTP2_METHOD_PROPFIND = "PROPFIND";
    HTTP2_METHOD_PROPPATCH = "PROPPATCH";
    HTTP2_METHOD_PUT = "PUT";
    HTTP2_METHOD_REBIND = "REBIND";
    HTTP2_METHOD_REPORT = "REPORT";
    HTTP2_METHOD_SEARCH = "SEARCH";
    HTTP2_METHOD_TRACE = "TRACE";
    HTTP2_METHOD_UNBIND = "UNBIND";
    HTTP2_METHOD_UNCHECKOUT = "UNCHECKOUT";
    HTTP2_METHOD_UNLINK = "UNLINK";
    HTTP2_METHOD_UNLOCK = "UNLOCK";
    HTTP2_METHOD_UPDATE = "UPDATE";
    HTTP2_METHOD_UPDATEREDIRECTREF = "UPDATEREDIRECTREF";
    HTTP2_METHOD_VERSION_CONTROL = "VERSION-CONTROL";
    HTTP_STATUS_CONTINUE = 100;
    HTTP_STATUS_SWITCHING_PROTOCOLS = 101;
    HTTP_STATUS_PROCESSING = 102;
    HTTP_STATUS_EARLY_HINTS = 103;
    HTTP_STATUS_OK = 200;
    HTTP_STATUS_CREATED = 201;
    HTTP_STATUS_ACCEPTED = 202;
    HTTP_STATUS_NON_AUTHORITATIVE_INFORMATION = 203;
    HTTP_STATUS_NO_CONTENT = 204;
    HTTP_STATUS_RESET_CONTENT = 205;
    HTTP_STATUS_PARTIAL_CONTENT = 206;
    HTTP_STATUS_MULTI_STATUS = 207;
    HTTP_STATUS_ALREADY_REPORTED = 208;
    HTTP_STATUS_IM_USED = 226;
    HTTP_STATUS_MULTIPLE_CHOICES = 300;
    HTTP_STATUS_MOVED_PERMANENTLY = 301;
    HTTP_STATUS_FOUND = 302;
    HTTP_STATUS_SEE_OTHER = 303;
    HTTP_STATUS_NOT_MODIFIED = 304;
    HTTP_STATUS_USE_PROXY = 305;
    HTTP_STATUS_TEMPORARY_REDIRECT = 307;
    HTTP_STATUS_PERMANENT_REDIRECT = 308;
    HTTP_STATUS_BAD_REQUEST = 400;
    HTTP_STATUS_UNAUTHORIZED = 401;
    HTTP_STATUS_PAYMENT_REQUIRED = 402;
    HTTP_STATUS_FORBIDDEN = 403;
    HTTP_STATUS_NOT_FOUND = 404;
    HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
    HTTP_STATUS_NOT_ACCEPTABLE = 406;
    HTTP_STATUS_PROXY_AUTHENTICATION_REQUIRED = 407;
    HTTP_STATUS_REQUEST_TIMEOUT = 408;
    HTTP_STATUS_CONFLICT = 409;
    HTTP_STATUS_GONE = 410;
    HTTP_STATUS_LENGTH_REQUIRED = 411;
    HTTP_STATUS_PRECONDITION_FAILED = 412;
    HTTP_STATUS_PAYLOAD_TOO_LARGE = 413;
    HTTP_STATUS_URI_TOO_LONG = 414;
    HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE = 415;
    HTTP_STATUS_RANGE_NOT_SATISFIABLE = 416;
    HTTP_STATUS_EXPECTATION_FAILED = 417;
    HTTP_STATUS_TEAPOT = 418;
    HTTP_STATUS_MISDIRECTED_REQUEST = 421;
    HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;
    HTTP_STATUS_LOCKED = 423;
    HTTP_STATUS_FAILED_DEPENDENCY = 424;
    HTTP_STATUS_TOO_EARLY = 425;
    HTTP_STATUS_UPGRADE_REQUIRED = 426;
    HTTP_STATUS_PRECONDITION_REQUIRED = 428;
    HTTP_STATUS_TOO_MANY_REQUESTS = 429;
    HTTP_STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
    HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
    HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
    HTTP_STATUS_NOT_IMPLEMENTED = 501;
    HTTP_STATUS_BAD_GATEWAY = 502;
    HTTP_STATUS_SERVICE_UNAVAILABLE = 503;
    HTTP_STATUS_GATEWAY_TIMEOUT = 504;
    HTTP_STATUS_HTTP_VERSION_NOT_SUPPORTED = 505;
    HTTP_STATUS_VARIANT_ALSO_NEGOTIATES = 506;
    HTTP_STATUS_INSUFFICIENT_STORAGE = 507;
    HTTP_STATUS_LOOP_DETECTED = 508;
    HTTP_STATUS_BANDWIDTH_LIMIT_EXCEEDED = 509;
    HTTP_STATUS_NOT_EXTENDED = 510;
    HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED = 511;
  }
});

// ../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/http2.mjs
var constants, Http2ServerRequest;
var init_http2 = __esm({
  "../../../../usr/local/lib/node_modules/wrangler/node_modules/unenv/dist/runtime/node/http2.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants3();
    constants = {
      NGHTTP2_ERR_FRAME_SIZE_ERROR,
      NGHTTP2_SESSION_SERVER,
      NGHTTP2_SESSION_CLIENT,
      NGHTTP2_STREAM_STATE_IDLE,
      NGHTTP2_STREAM_STATE_OPEN,
      NGHTTP2_STREAM_STATE_RESERVED_LOCAL,
      NGHTTP2_STREAM_STATE_RESERVED_REMOTE,
      NGHTTP2_STREAM_STATE_HALF_CLOSED_LOCAL,
      NGHTTP2_STREAM_STATE_HALF_CLOSED_REMOTE,
      NGHTTP2_STREAM_STATE_CLOSED,
      NGHTTP2_FLAG_NONE,
      NGHTTP2_FLAG_END_STREAM,
      NGHTTP2_FLAG_END_HEADERS,
      NGHTTP2_FLAG_ACK,
      NGHTTP2_FLAG_PADDED,
      NGHTTP2_FLAG_PRIORITY,
      DEFAULT_SETTINGS_HEADER_TABLE_SIZE,
      DEFAULT_SETTINGS_ENABLE_PUSH,
      DEFAULT_SETTINGS_MAX_CONCURRENT_STREAMS,
      DEFAULT_SETTINGS_INITIAL_WINDOW_SIZE,
      DEFAULT_SETTINGS_MAX_FRAME_SIZE,
      DEFAULT_SETTINGS_MAX_HEADER_LIST_SIZE,
      DEFAULT_SETTINGS_ENABLE_CONNECT_PROTOCOL,
      MAX_MAX_FRAME_SIZE,
      MIN_MAX_FRAME_SIZE,
      MAX_INITIAL_WINDOW_SIZE,
      NGHTTP2_SETTINGS_HEADER_TABLE_SIZE,
      NGHTTP2_SETTINGS_ENABLE_PUSH,
      NGHTTP2_SETTINGS_MAX_CONCURRENT_STREAMS,
      NGHTTP2_SETTINGS_INITIAL_WINDOW_SIZE,
      NGHTTP2_SETTINGS_MAX_FRAME_SIZE,
      NGHTTP2_SETTINGS_MAX_HEADER_LIST_SIZE,
      NGHTTP2_SETTINGS_ENABLE_CONNECT_PROTOCOL,
      PADDING_STRATEGY_NONE,
      PADDING_STRATEGY_ALIGNED,
      PADDING_STRATEGY_MAX,
      PADDING_STRATEGY_CALLBACK,
      NGHTTP2_NO_ERROR,
      NGHTTP2_PROTOCOL_ERROR,
      NGHTTP2_INTERNAL_ERROR,
      NGHTTP2_FLOW_CONTROL_ERROR,
      NGHTTP2_SETTINGS_TIMEOUT,
      NGHTTP2_STREAM_CLOSED,
      NGHTTP2_FRAME_SIZE_ERROR,
      NGHTTP2_REFUSED_STREAM,
      NGHTTP2_CANCEL,
      NGHTTP2_COMPRESSION_ERROR,
      NGHTTP2_CONNECT_ERROR,
      NGHTTP2_ENHANCE_YOUR_CALM,
      NGHTTP2_INADEQUATE_SECURITY,
      NGHTTP2_HTTP_1_1_REQUIRED,
      NGHTTP2_DEFAULT_WEIGHT,
      HTTP2_HEADER_STATUS,
      HTTP2_HEADER_METHOD,
      HTTP2_HEADER_AUTHORITY,
      HTTP2_HEADER_SCHEME,
      HTTP2_HEADER_PATH,
      HTTP2_HEADER_PROTOCOL,
      HTTP2_HEADER_ACCEPT_ENCODING,
      HTTP2_HEADER_ACCEPT_LANGUAGE,
      HTTP2_HEADER_ACCEPT_RANGES,
      HTTP2_HEADER_ACCEPT,
      HTTP2_HEADER_ACCESS_CONTROL_ALLOW_CREDENTIALS,
      HTTP2_HEADER_ACCESS_CONTROL_ALLOW_HEADERS,
      HTTP2_HEADER_ACCESS_CONTROL_ALLOW_METHODS,
      HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN,
      HTTP2_HEADER_ACCESS_CONTROL_EXPOSE_HEADERS,
      HTTP2_HEADER_ACCESS_CONTROL_REQUEST_HEADERS,
      HTTP2_HEADER_ACCESS_CONTROL_REQUEST_METHOD,
      HTTP2_HEADER_AGE,
      HTTP2_HEADER_AUTHORIZATION,
      HTTP2_HEADER_CACHE_CONTROL,
      HTTP2_HEADER_CONNECTION,
      HTTP2_HEADER_CONTENT_DISPOSITION,
      HTTP2_HEADER_CONTENT_ENCODING,
      HTTP2_HEADER_CONTENT_LENGTH,
      HTTP2_HEADER_CONTENT_TYPE,
      HTTP2_HEADER_COOKIE,
      HTTP2_HEADER_DATE,
      HTTP2_HEADER_ETAG,
      HTTP2_HEADER_FORWARDED,
      HTTP2_HEADER_HOST,
      HTTP2_HEADER_IF_MODIFIED_SINCE,
      HTTP2_HEADER_IF_NONE_MATCH,
      HTTP2_HEADER_IF_RANGE,
      HTTP2_HEADER_LAST_MODIFIED,
      HTTP2_HEADER_LINK,
      HTTP2_HEADER_LOCATION,
      HTTP2_HEADER_RANGE,
      HTTP2_HEADER_REFERER,
      HTTP2_HEADER_SERVER,
      HTTP2_HEADER_SET_COOKIE,
      HTTP2_HEADER_STRICT_TRANSPORT_SECURITY,
      HTTP2_HEADER_TRANSFER_ENCODING,
      HTTP2_HEADER_TE,
      HTTP2_HEADER_UPGRADE_INSECURE_REQUESTS,
      HTTP2_HEADER_UPGRADE,
      HTTP2_HEADER_USER_AGENT,
      HTTP2_HEADER_VARY,
      HTTP2_HEADER_X_CONTENT_TYPE_OPTIONS,
      HTTP2_HEADER_X_FRAME_OPTIONS,
      HTTP2_HEADER_KEEP_ALIVE,
      HTTP2_HEADER_PROXY_CONNECTION,
      HTTP2_HEADER_X_XSS_PROTECTION,
      HTTP2_HEADER_ALT_SVC,
      HTTP2_HEADER_CONTENT_SECURITY_POLICY,
      HTTP2_HEADER_EARLY_DATA,
      HTTP2_HEADER_EXPECT_CT,
      HTTP2_HEADER_ORIGIN,
      HTTP2_HEADER_PURPOSE,
      HTTP2_HEADER_TIMING_ALLOW_ORIGIN,
      HTTP2_HEADER_X_FORWARDED_FOR,
      HTTP2_HEADER_PRIORITY,
      HTTP2_HEADER_ACCEPT_CHARSET,
      HTTP2_HEADER_ACCESS_CONTROL_MAX_AGE,
      HTTP2_HEADER_ALLOW,
      HTTP2_HEADER_CONTENT_LANGUAGE,
      HTTP2_HEADER_CONTENT_LOCATION,
      HTTP2_HEADER_CONTENT_MD5,
      HTTP2_HEADER_CONTENT_RANGE,
      HTTP2_HEADER_DNT,
      HTTP2_HEADER_EXPECT,
      HTTP2_HEADER_EXPIRES,
      HTTP2_HEADER_FROM,
      HTTP2_HEADER_IF_MATCH,
      HTTP2_HEADER_IF_UNMODIFIED_SINCE,
      HTTP2_HEADER_MAX_FORWARDS,
      HTTP2_HEADER_PREFER,
      HTTP2_HEADER_PROXY_AUTHENTICATE,
      HTTP2_HEADER_PROXY_AUTHORIZATION,
      HTTP2_HEADER_REFRESH,
      HTTP2_HEADER_RETRY_AFTER,
      HTTP2_HEADER_TRAILER,
      HTTP2_HEADER_TK,
      HTTP2_HEADER_VIA,
      HTTP2_HEADER_WARNING,
      HTTP2_HEADER_WWW_AUTHENTICATE,
      HTTP2_HEADER_HTTP2_SETTINGS,
      HTTP2_METHOD_ACL,
      HTTP2_METHOD_BASELINE_CONTROL,
      HTTP2_METHOD_BIND,
      HTTP2_METHOD_CHECKIN,
      HTTP2_METHOD_CHECKOUT,
      HTTP2_METHOD_CONNECT,
      HTTP2_METHOD_COPY,
      HTTP2_METHOD_DELETE,
      HTTP2_METHOD_GET,
      HTTP2_METHOD_HEAD,
      HTTP2_METHOD_LABEL,
      HTTP2_METHOD_LINK,
      HTTP2_METHOD_LOCK,
      HTTP2_METHOD_MERGE,
      HTTP2_METHOD_MKACTIVITY,
      HTTP2_METHOD_MKCALENDAR,
      HTTP2_METHOD_MKCOL,
      HTTP2_METHOD_MKREDIRECTREF,
      HTTP2_METHOD_MKWORKSPACE,
      HTTP2_METHOD_MOVE,
      HTTP2_METHOD_OPTIONS,
      HTTP2_METHOD_ORDERPATCH,
      HTTP2_METHOD_PATCH,
      HTTP2_METHOD_POST,
      HTTP2_METHOD_PRI,
      HTTP2_METHOD_PROPFIND,
      HTTP2_METHOD_PROPPATCH,
      HTTP2_METHOD_PUT,
      HTTP2_METHOD_REBIND,
      HTTP2_METHOD_REPORT,
      HTTP2_METHOD_SEARCH,
      HTTP2_METHOD_TRACE,
      HTTP2_METHOD_UNBIND,
      HTTP2_METHOD_UNCHECKOUT,
      HTTP2_METHOD_UNLINK,
      HTTP2_METHOD_UNLOCK,
      HTTP2_METHOD_UPDATE,
      HTTP2_METHOD_UPDATEREDIRECTREF,
      HTTP2_METHOD_VERSION_CONTROL,
      HTTP_STATUS_CONTINUE,
      HTTP_STATUS_SWITCHING_PROTOCOLS,
      HTTP_STATUS_PROCESSING,
      HTTP_STATUS_EARLY_HINTS,
      HTTP_STATUS_OK,
      HTTP_STATUS_CREATED,
      HTTP_STATUS_ACCEPTED,
      HTTP_STATUS_NON_AUTHORITATIVE_INFORMATION,
      HTTP_STATUS_NO_CONTENT,
      HTTP_STATUS_RESET_CONTENT,
      HTTP_STATUS_PARTIAL_CONTENT,
      HTTP_STATUS_MULTI_STATUS,
      HTTP_STATUS_ALREADY_REPORTED,
      HTTP_STATUS_IM_USED,
      HTTP_STATUS_MULTIPLE_CHOICES,
      HTTP_STATUS_MOVED_PERMANENTLY,
      HTTP_STATUS_FOUND,
      HTTP_STATUS_SEE_OTHER,
      HTTP_STATUS_NOT_MODIFIED,
      HTTP_STATUS_USE_PROXY,
      HTTP_STATUS_TEMPORARY_REDIRECT,
      HTTP_STATUS_PERMANENT_REDIRECT,
      HTTP_STATUS_BAD_REQUEST,
      HTTP_STATUS_UNAUTHORIZED,
      HTTP_STATUS_PAYMENT_REQUIRED,
      HTTP_STATUS_FORBIDDEN,
      HTTP_STATUS_NOT_FOUND,
      HTTP_STATUS_METHOD_NOT_ALLOWED,
      HTTP_STATUS_NOT_ACCEPTABLE,
      HTTP_STATUS_PROXY_AUTHENTICATION_REQUIRED,
      HTTP_STATUS_REQUEST_TIMEOUT,
      HTTP_STATUS_CONFLICT,
      HTTP_STATUS_GONE,
      HTTP_STATUS_LENGTH_REQUIRED,
      HTTP_STATUS_PRECONDITION_FAILED,
      HTTP_STATUS_PAYLOAD_TOO_LARGE,
      HTTP_STATUS_URI_TOO_LONG,
      HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE,
      HTTP_STATUS_RANGE_NOT_SATISFIABLE,
      HTTP_STATUS_EXPECTATION_FAILED,
      HTTP_STATUS_TEAPOT,
      HTTP_STATUS_MISDIRECTED_REQUEST,
      HTTP_STATUS_UNPROCESSABLE_ENTITY,
      HTTP_STATUS_LOCKED,
      HTTP_STATUS_FAILED_DEPENDENCY,
      HTTP_STATUS_TOO_EARLY,
      HTTP_STATUS_UPGRADE_REQUIRED,
      HTTP_STATUS_PRECONDITION_REQUIRED,
      HTTP_STATUS_TOO_MANY_REQUESTS,
      HTTP_STATUS_REQUEST_HEADER_FIELDS_TOO_LARGE,
      HTTP_STATUS_UNAVAILABLE_FOR_LEGAL_REASONS,
      HTTP_STATUS_INTERNAL_SERVER_ERROR,
      HTTP_STATUS_NOT_IMPLEMENTED,
      HTTP_STATUS_BAD_GATEWAY,
      HTTP_STATUS_SERVICE_UNAVAILABLE,
      HTTP_STATUS_GATEWAY_TIMEOUT,
      HTTP_STATUS_HTTP_VERSION_NOT_SUPPORTED,
      HTTP_STATUS_VARIANT_ALSO_NEGOTIATES,
      HTTP_STATUS_INSUFFICIENT_STORAGE,
      HTTP_STATUS_LOOP_DETECTED,
      HTTP_STATUS_BANDWIDTH_LIMIT_EXCEEDED,
      HTTP_STATUS_NOT_EXTENDED,
      HTTP_STATUS_NETWORK_AUTHENTICATION_REQUIRED
    };
    Http2ServerRequest = /* @__PURE__ */ notImplementedClass("http2.Http2ServerRequest");
  }
});

// node_modules/hono/dist/helper/websocket/index.js
var defineWebSocketHelper;
var init_websocket = __esm({
  "node_modules/hono/dist/helper/websocket/index.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    defineWebSocketHelper = /* @__PURE__ */ __name((handler) => {
      return ((...args) => {
        if (typeof args[0] === "function") {
          const [createEvents, options] = args;
          return /* @__PURE__ */ __name(async function upgradeWebSocket2(c, next) {
            const events = await createEvents(c);
            const result = await handler(c, events, options);
            if (result) {
              return result;
            }
            await next();
          }, "upgradeWebSocket");
        } else {
          const [c, events, options] = args;
          return (async () => {
            const upgraded = await handler(c, events, options);
            if (!upgraded) {
              throw new Error("Failed to upgrade WebSocket");
            }
            return upgraded;
          })();
        }
      });
    }, "defineWebSocketHelper");
  }
});

// node_modules/@hono/node-server/dist/index.mjs
var dist_exports2 = {};
__export(dist_exports2, {
  RequestError: () => RequestError,
  createAdaptorServer: () => createAdaptorServer,
  getRequestListener: () => getRequestListener,
  serve: () => serve,
  upgradeWebSocket: () => upgradeWebSocket
});
import { Readable as Readable3 } from "node:stream";
async function readWithoutBlocking(readPromise) {
  return Promise.race([readPromise, Promise.resolve().then(() => Promise.resolve(void 0))]);
}
function writeFromReadableStreamDefaultReader(reader, writable, currentReadPromise) {
  const cancel = /* @__PURE__ */ __name((error3) => {
    reader.cancel(error3).catch(() => {
    });
  }, "cancel");
  writable.on("close", cancel);
  writable.on("error", cancel);
  (currentReadPromise ?? reader.read()).then(flow, handleStreamError);
  return reader.closed.finally(() => {
    writable.off("close", cancel);
    writable.off("error", cancel);
  });
  function handleStreamError(error3) {
    if (error3) writable.destroy(error3);
  }
  __name(handleStreamError, "handleStreamError");
  function onDrain() {
    reader.read().then(flow, handleStreamError);
  }
  __name(onDrain, "onDrain");
  function flow({ done, value }) {
    try {
      if (done) writable.end();
      else if (!writable.write(value)) writable.once("drain", onDrain);
      else return reader.read().then(flow, handleStreamError);
    } catch (e) {
      handleStreamError(e);
    }
  }
  __name(flow, "flow");
}
function writeFromReadableStream(stream, writable) {
  if (stream.locked) throw new TypeError("ReadableStream is locked.");
  else if (writable.destroyed) return;
  return writeFromReadableStreamDefaultReader(stream.getReader(), writable);
}
var RequestError, nonJoinedHeaders, validHeaderName, isHttpWhitespace, normalizeHeaderValue, forbiddenHeaderValue, GlobalHeaders, materializeHeaders, RequestHeaders, newHeadersFromIncoming, reValidRequestUrl, reDotSegment, reValidHost, buildUrl, toRequestError, GlobalRequest, Request$1, wrapBodyStream, byteExactEncodings, isByteExactEncoding, bodyBufferedBeforeDisconnectKey, bodyBufferedLengthBeforeDisconnectKey, toBufferChunk, isRecoverableDisconnectedIncoming, recordBodyBufferedBeforeDisconnect, readBodyBufferedBeforeDisconnect, enqueueBufferedBody, newRequestFromIncoming, getRequestCache, requestCache, incomingKey, urlKey, methodKey, headersKey, abortControllerKey, getAbortController, abortRequest, bodyBufferKey, bodyReadPromiseKey, bodyConsumedDirectlyKey, bodyLockReaderKey, abortReasonKey, newBodyUnusableError, rejectBodyUnusable, textDecoder, consumeBodyDirectOnce, toArrayBuffer, contentType, methodTokenRegExp, normalizeIncomingMethod, validateDirectReadMethod, readBodyWithFastPath, readRawBodyIfAvailable, normalizeAbortError, readBodyDirect, requestPrototype, newRequest, defaultContentType, responseCache, getResponseCache, cacheKey, GlobalResponse, Response$1, validRedirectUrl, parseRedirectUrl, validRedirectStatuses, buildOutgoingHttpHeaders, outgoingEnded, incomingDraining, DRAIN_TIMEOUT_MS, MAX_DRAIN_BYTES, drainIncoming, makeCloseHandler, isImmediateCacheableResponse, handleRequestError, handleFetchError, handleResponseError, flushHeaders, responseViaCache, isPromise, responseViaResponseObject, getRequestListener, CloseEvent2, ErrorEvent, generateConnectionSymbol, CONNECTION_SYMBOL_KEY, WAIT_FOR_WEBSOCKET_SYMBOL, responseHeadersToSkip, appendResponseHeaders, rejectUpgradeRequest, createUpgradeRequest, setupWebSocket, upgradeWebSocket, createAdaptorServer, serve;
var init_dist2 = __esm({
  "node_modules/@hono/node-server/dist/index.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants_BLSFu_RU();
    init_http();
    init_http2();
    init_websocket();
    RequestError = class extends Error {
      static {
        __name(this, "RequestError");
      }
      constructor(message, options) {
        super(message, options);
        this.name = "RequestError";
      }
    };
    nonJoinedHeaders = /* @__PURE__ */ new Set([
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "server",
      "user-agent"
    ]);
    validHeaderName = /^[!#$%&'*+\-.^_`|~\dA-Za-z]+$/;
    isHttpWhitespace = /* @__PURE__ */ __name((code) => code === 9 || code === 10 || code === 13 || code === 32, "isHttpWhitespace");
    normalizeHeaderValue = /* @__PURE__ */ __name((value) => {
      if (!isHttpWhitespace(value.charCodeAt(0)) && !isHttpWhitespace(value.charCodeAt(value.length - 1))) return value;
      let start = 0;
      let end = value.length;
      while (start < end && isHttpWhitespace(value.charCodeAt(start))) start++;
      while (end > start && isHttpWhitespace(value.charCodeAt(end - 1))) end--;
      return value.slice(start, end);
    }, "normalizeHeaderValue");
    forbiddenHeaderValue = /[\0\r\n]/;
    GlobalHeaders = globalThis.Headers;
    materializeHeaders = /* @__PURE__ */ __name((rawHeaders, HeadersCtor = GlobalHeaders) => {
      const headers = new HeadersCtor();
      for (let i = 0; i < rawHeaders.length; i += 2) {
        const name = rawHeaders[i];
        if (!name.startsWith(":")) headers.append(name, rawHeaders[i + 1]);
      }
      return headers;
    }, "materializeHeaders");
    RequestHeaders = class {
      static {
        __name(this, "RequestHeaders");
      }
      #incoming;
      #rawHeaders;
      #headers;
      #invalidValue;
      constructor(incoming) {
        this.#incoming = incoming;
        if (incoming instanceof Http2ServerRequest) this.#rawHeaders = incoming.rawHeaders.slice();
      }
      get #lazyRawHeaders() {
        return this.#rawHeaders ??= this.#incoming.rawHeaders.slice();
      }
      get #native() {
        if (!this.#headers) {
          this.#headers = materializeHeaders(this.#lazyRawHeaders);
          this.#rawHeaders = void 0;
        }
        return this.#headers;
      }
      #normalizedName(name) {
        if (typeof name !== "string") return;
        if (!validHeaderName.test(name)) throw new TypeError(`Invalid header name: ${name}`);
        return name.toLowerCase();
      }
      #lookupHttp1(lowerName) {
        const headers = this.#incoming instanceof Http2ServerRequest ? void 0 : this.#incoming.headers;
        if (!headers || nonJoinedHeaders.has(lowerName) || lowerName === "set-cookie" || lowerName === "__proto__") return;
        if (!Object.hasOwn(headers, lowerName)) return null;
        const rawValue = headers[lowerName];
        if (typeof rawValue === "string") {
          const value = normalizeHeaderValue(rawValue);
          return forbiddenHeaderValue.test(value) ? void 0 : value;
        }
      }
      #lookup(rawHeaders, lowerName) {
        const separator = lowerName === "cookie" ? "; " : ", ";
        let value = null;
        for (let i = 0; i < rawHeaders.length; i += 2) {
          const rawName = rawHeaders[i];
          if (rawName.length === lowerName.length && rawName.toLowerCase() === lowerName) {
            const rawValue = normalizeHeaderValue(rawHeaders[i + 1]);
            if (forbiddenHeaderValue.test(rawValue)) {
              this.#invalidValue = true;
              return;
            }
            value = value === null ? rawValue : value + separator + rawValue;
          }
        }
        return value;
      }
      append(name, value) {
        this.#native.append(name, value);
      }
      delete(name) {
        this.#native.delete(name);
      }
      get(name) {
        const lowerName = this.#normalizedName(name);
        if (lowerName && !this.#headers && !this.#invalidValue) {
          const http1Value = this.#lookupHttp1(lowerName);
          if (http1Value !== void 0) return http1Value;
          const value = this.#lookup(this.#lazyRawHeaders, lowerName);
          if (value !== void 0) return value;
        }
        return this.#native.get(name);
      }
      has(name) {
        const lowerName = this.#normalizedName(name);
        if (lowerName && !this.#headers && !this.#invalidValue) {
          const http1Value = this.#lookupHttp1(lowerName);
          if (http1Value !== void 0) return http1Value !== null;
          const value = this.#lookup(this.#lazyRawHeaders, lowerName);
          if (value !== void 0) return value !== null;
        }
        return this.#native.has(name);
      }
      set(name, value) {
        this.#native.set(name, value);
      }
      getSetCookie() {
        return this.#native.getSetCookie();
      }
      keys() {
        return this.#native.keys();
      }
      values() {
        return this.#native.values();
      }
      entries() {
        return this.#native.entries();
      }
      forEach(callback, thisArg) {
        this.#native.forEach((value, key) => {
          callback.call(thisArg, value, key, this);
        });
      }
      [Symbol.iterator]() {
        return this.entries();
      }
    };
    Object.defineProperty(RequestHeaders.prototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), { value: /* @__PURE__ */ __name(function(depth, options, inspectFn) {
      return `Headers (lightweight) ${inspectFn(Object.fromEntries(this), {
        ...options,
        depth: depth == null ? null : depth - 1
      })}`;
    }, "value") });
    Object.setPrototypeOf(RequestHeaders.prototype, GlobalHeaders.prototype);
    newHeadersFromIncoming = /* @__PURE__ */ __name((incoming) => globalThis.Headers === GlobalHeaders ? new RequestHeaders(incoming) : materializeHeaders(incoming.rawHeaders, globalThis.Headers), "newHeadersFromIncoming");
    reValidRequestUrl = /^\/[!#$&-;=?-\[\]_a-z~]*$/;
    reDotSegment = /\/\.\.?(?:[/?#]|$)/;
    reValidHost = /^[a-z0-9._-]+(?::(?:[1-5]\d{3,4}|[6-9]\d{3}))?$/;
    buildUrl = /* @__PURE__ */ __name((scheme, host, incomingUrl) => {
      const url = `${scheme}://${host}${incomingUrl}`;
      if (!reValidHost.test(host)) {
        const urlObj = new URL(url);
        if (urlObj.hostname.length !== host.length && urlObj.hostname !== (host.includes(":") ? host.replace(/:\d+$/, "") : host).toLowerCase()) throw new RequestError("Invalid host header");
        return urlObj.href;
      } else if (incomingUrl.length === 0) return url + "/";
      else {
        if (incomingUrl.charCodeAt(0) !== 47) throw new RequestError("Invalid URL");
        if (!reValidRequestUrl.test(incomingUrl) || reDotSegment.test(incomingUrl)) return new URL(url).href;
        return url;
      }
    }, "buildUrl");
    toRequestError = /* @__PURE__ */ __name((e) => {
      if (e instanceof RequestError) return e;
      return new RequestError(e.message, { cause: e });
    }, "toRequestError");
    GlobalRequest = global.Request;
    Request$1 = class extends GlobalRequest {
      static {
        __name(this, "Request$1");
      }
      constructor(input, options) {
        if (typeof input === "object" && getRequestCache in input) {
          const hasReplacementBody = options !== void 0 && "body" in options && options.body != null;
          if (input[bodyConsumedDirectlyKey] && !hasReplacementBody) throw new TypeError("Cannot construct a Request with a Request object that has already been used.");
          input = input[getRequestCache]();
        }
        if (typeof options?.body?.getReader !== "undefined") options.duplex ??= "half";
        super(input, options);
      }
    };
    wrapBodyStream = /* @__PURE__ */ Symbol("wrapBodyStream");
    byteExactEncodings = /* @__PURE__ */ new Set([
      "latin1",
      "binary",
      "hex",
      "base64",
      "base64url"
    ]);
    isByteExactEncoding = /* @__PURE__ */ __name((encoding) => encoding === null || byteExactEncodings.has(encoding), "isByteExactEncoding");
    bodyBufferedBeforeDisconnectKey = /* @__PURE__ */ Symbol("bodyBufferedBeforeDisconnect");
    bodyBufferedLengthBeforeDisconnectKey = /* @__PURE__ */ Symbol("bodyBufferedLengthBeforeDisconnect");
    toBufferChunk = /* @__PURE__ */ __name((chunk, encoding) => Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding ?? "utf8"), "toBufferChunk");
    isRecoverableDisconnectedIncoming = /* @__PURE__ */ __name((incoming) => !(incoming instanceof Http2ServerRequest) && !!incoming.complete && !!incoming.readableAborted && typeof incoming.read === "function" && isByteExactEncoding(incoming.readableEncoding), "isRecoverableDisconnectedIncoming");
    recordBodyBufferedBeforeDisconnect = /* @__PURE__ */ __name((incoming) => {
      if (incoming.readableDidRead || !isRecoverableDisconnectedIncoming(incoming)) return;
      const incomingWithRecovery = incoming;
      incomingWithRecovery[bodyBufferedLengthBeforeDisconnectKey] ??= incoming.readableLength;
    }, "recordBodyBufferedBeforeDisconnect");
    readBodyBufferedBeforeDisconnect = /* @__PURE__ */ __name((incoming, chunks) => {
      if (incoming.readableDidRead && !chunks || !isRecoverableDisconnectedIncoming(incoming)) return;
      const incomingWithRecovery = incoming;
      if (incomingWithRecovery[bodyBufferedBeforeDisconnectKey] !== void 0) return incomingWithRecovery[bodyBufferedBeforeDisconnectKey];
      let result;
      const errored = incoming.errored;
      if (errored && errored.code !== "ECONNRESET") result = errored;
      else if (incomingWithRecovery[bodyBufferedLengthBeforeDisconnectKey] !== void 0 && incoming.readableLength !== incomingWithRecovery[bodyBufferedLengthBeforeDisconnectKey]) result = newBodyUnusableError();
      else {
        const bodyChunks = chunks ?? [];
        const chunk = incoming.read();
        if (chunk !== null) bodyChunks.push(toBufferChunk(chunk, incoming.readableEncoding));
        const buffer = bodyChunks.length === 1 ? bodyChunks[0] : Buffer.concat(bodyChunks);
        result = buffer;
        const contentLength = incoming.headers["content-length"];
        if (typeof contentLength === "string" && /^\d+$/.test(contentLength)) {
          const expectedLength = Number(contentLength);
          if (Number.isSafeInteger(expectedLength) && buffer.length !== expectedLength) result = newBodyUnusableError();
        }
      }
      incomingWithRecovery[bodyBufferedBeforeDisconnectKey] = result;
      return result;
    }, "readBodyBufferedBeforeDisconnect");
    enqueueBufferedBody = /* @__PURE__ */ __name((controller, buffered) => {
      if (buffered instanceof Error) {
        controller.error(buffered);
        return;
      }
      if (buffered.length > 0) controller.enqueue(buffered);
      controller.close();
    }, "enqueueBufferedBody");
    newRequestFromIncoming = /* @__PURE__ */ __name((method, url, headers, incoming, abortController) => {
      const init = {
        method,
        headers,
        signal: abortController.signal
      };
      if (method === "TRACE") {
        init.method = "GET";
        const req = new Request$1(url, init);
        Object.defineProperty(req, "method", { get() {
          return "TRACE";
        } });
        return req;
      }
      if (!(method === "GET" || method === "HEAD")) if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) init.body = new ReadableStream({ start(controller) {
        controller.enqueue(incoming.rawBody);
        controller.close();
      } });
      else if (incoming[wrapBodyStream]) {
        let reader;
        init.body = new ReadableStream({ async pull(controller) {
          try {
            if (!reader) {
              const buffered = readBodyBufferedBeforeDisconnect(incoming);
              if (buffered !== void 0) {
                enqueueBufferedBody(controller, buffered);
                return;
              }
            }
            reader ||= Readable3.toWeb(incoming).getReader();
            const { done, value } = await reader.read();
            if (done) controller.close();
            else controller.enqueue(value);
          } catch (error3) {
            controller.error(error3);
          }
        } });
      } else {
        const buffered = readBodyBufferedBeforeDisconnect(incoming);
        if (buffered !== void 0) init.body = new ReadableStream({ start(controller) {
          enqueueBufferedBody(controller, buffered);
        } });
        else init.body = Readable3.toWeb(incoming);
      }
      return new Request$1(url, init);
    }, "newRequestFromIncoming");
    getRequestCache = /* @__PURE__ */ Symbol("getRequestCache");
    requestCache = /* @__PURE__ */ Symbol("requestCache");
    incomingKey = /* @__PURE__ */ Symbol("incomingKey");
    urlKey = /* @__PURE__ */ Symbol("urlKey");
    methodKey = /* @__PURE__ */ Symbol("methodKey");
    headersKey = /* @__PURE__ */ Symbol("headersKey");
    abortControllerKey = /* @__PURE__ */ Symbol("abortControllerKey");
    getAbortController = /* @__PURE__ */ Symbol("getAbortController");
    abortRequest = /* @__PURE__ */ Symbol("abortRequest");
    bodyBufferKey = /* @__PURE__ */ Symbol("bodyBuffer");
    bodyReadPromiseKey = /* @__PURE__ */ Symbol("bodyReadPromise");
    bodyConsumedDirectlyKey = /* @__PURE__ */ Symbol("bodyConsumedDirectly");
    bodyLockReaderKey = /* @__PURE__ */ Symbol("bodyLockReader");
    abortReasonKey = /* @__PURE__ */ Symbol("abortReason");
    newBodyUnusableError = /* @__PURE__ */ __name(() => {
      return /* @__PURE__ */ new TypeError("Body is unusable");
    }, "newBodyUnusableError");
    rejectBodyUnusable = /* @__PURE__ */ __name(() => {
      return Promise.reject(newBodyUnusableError());
    }, "rejectBodyUnusable");
    textDecoder = new TextDecoder();
    consumeBodyDirectOnce = /* @__PURE__ */ __name((request) => {
      if (request[bodyConsumedDirectlyKey]) return rejectBodyUnusable();
      request[bodyConsumedDirectlyKey] = true;
    }, "consumeBodyDirectOnce");
    toArrayBuffer = /* @__PURE__ */ __name((buf) => {
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }, "toArrayBuffer");
    contentType = /* @__PURE__ */ __name((request) => {
      return (request[headersKey] ||= newHeadersFromIncoming(request[incomingKey])).get("content-type") || "";
    }, "contentType");
    methodTokenRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    normalizeIncomingMethod = /* @__PURE__ */ __name((method) => {
      if (typeof method !== "string" || method.length === 0) return "GET";
      switch (method) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "PATCH":
        case "POST":
        case "PUT":
        case "QUERY":
          return method;
      }
      const upper = method.toUpperCase();
      switch (upper) {
        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "POST":
        case "PUT":
          return upper;
        default:
          return method;
      }
    }, "normalizeIncomingMethod");
    validateDirectReadMethod = /* @__PURE__ */ __name((method) => {
      if (!methodTokenRegExp.test(method)) return /* @__PURE__ */ new TypeError(`'${method}' is not a valid HTTP method.`);
      const normalized = method.toUpperCase();
      if (normalized === "CONNECT" || normalized === "TRACK" || normalized === "TRACE" && method !== "TRACE") return /* @__PURE__ */ new TypeError(`'${method}' HTTP method is unsupported.`);
    }, "validateDirectReadMethod");
    readBodyWithFastPath = /* @__PURE__ */ __name((request, method, fromBuffer) => {
      if (request[bodyConsumedDirectlyKey]) return rejectBodyUnusable();
      const methodName = request.method;
      if (methodName === "GET" || methodName === "HEAD") return request[getRequestCache]()[method]();
      const methodValidationError = validateDirectReadMethod(methodName);
      if (methodValidationError) return Promise.reject(methodValidationError);
      if (request[requestCache]) {
        if (methodName !== "TRACE") return request[requestCache][method]();
      }
      const alreadyUsedError = consumeBodyDirectOnce(request);
      if (alreadyUsedError) return alreadyUsedError;
      const raw3 = readRawBodyIfAvailable(request);
      if (raw3) {
        const result = Promise.resolve(fromBuffer(raw3, request));
        request[bodyBufferKey] = void 0;
        return result;
      }
      return readBodyDirect(request).then((buf) => {
        const result = fromBuffer(buf, request);
        request[bodyBufferKey] = void 0;
        return result;
      });
    }, "readBodyWithFastPath");
    readRawBodyIfAvailable = /* @__PURE__ */ __name((request) => {
      const incoming = request[incomingKey];
      if ("rawBody" in incoming && incoming.rawBody instanceof Buffer) return incoming.rawBody;
    }, "readRawBodyIfAvailable");
    normalizeAbortError = /* @__PURE__ */ __name((request, incoming) => {
      if (incoming.errored) return incoming.errored;
      const reason = request[abortReasonKey];
      if (reason !== void 0) return reason instanceof Error ? reason : new Error(String(reason));
      return /* @__PURE__ */ new Error("Client connection prematurely closed.");
    }, "normalizeAbortError");
    readBodyDirect = /* @__PURE__ */ __name((request) => {
      if (request[bodyBufferKey]) return Promise.resolve(request[bodyBufferKey]);
      if (request[bodyReadPromiseKey]) return request[bodyReadPromiseKey];
      const incoming = request[incomingKey];
      if (incoming.readableDidRead) return rejectBodyUnusable();
      const buffered = readBodyBufferedBeforeDisconnect(incoming);
      if (buffered !== void 0) {
        if (buffered instanceof Error) return Promise.reject(buffered);
        request[bodyBufferKey] = buffered;
        return Promise.resolve(buffered);
      }
      const promise = new Promise((resolve, reject) => {
        const chunks = [];
        let settled = false;
        const finish = /* @__PURE__ */ __name((callback) => {
          if (settled) return;
          settled = true;
          cleanup();
          callback();
        }, "finish");
        const recoverCompleteBodyAfterDisconnect = /* @__PURE__ */ __name((error3) => {
          const streamError = incoming.errored ?? error3;
          if (!isRecoverableDisconnectedIncoming(incoming) || streamError && streamError.code !== "ECONNRESET") return false;
          finish(() => {
            const recovered = readBodyBufferedBeforeDisconnect(incoming, chunks);
            if (recovered instanceof Error) reject(recovered);
            else if (recovered === void 0) reject(error3 ?? normalizeAbortError(request, incoming));
            else {
              request[bodyBufferKey] = recovered;
              resolve(recovered);
            }
          });
          return true;
        }, "recoverCompleteBodyAfterDisconnect");
        const onData = /* @__PURE__ */ __name((chunk) => {
          chunks.push(toBufferChunk(chunk, incoming.readableEncoding));
        }, "onData");
        const onEnd = /* @__PURE__ */ __name(() => {
          finish(() => {
            const buffer = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks);
            request[bodyBufferKey] = buffer;
            resolve(buffer);
          });
        }, "onEnd");
        const onError = /* @__PURE__ */ __name((error3) => {
          if (recoverCompleteBodyAfterDisconnect(error3)) return;
          finish(() => {
            reject(error3);
          });
        }, "onError");
        const onClose = /* @__PURE__ */ __name(() => {
          if (incoming.readableEnded) {
            onEnd();
            return;
          }
          if (recoverCompleteBodyAfterDisconnect()) return;
          finish(() => {
            reject(normalizeAbortError(request, incoming));
          });
        }, "onClose");
        const cleanup = /* @__PURE__ */ __name(() => {
          incoming.off("data", onData);
          incoming.off("end", onEnd);
          incoming.off("error", onError);
          incoming.off("close", onClose);
          request[bodyReadPromiseKey] = void 0;
        }, "cleanup");
        incoming.on("data", onData);
        incoming.on("end", onEnd);
        incoming.on("error", onError);
        incoming.on("close", onClose);
        queueMicrotask(() => {
          if (settled) return;
          if (incoming.readableEnded) onEnd();
          else if (incoming.errored) onError(incoming.errored);
          else if (incoming.destroyed) onClose();
        });
      });
      request[bodyReadPromiseKey] = promise;
      return promise;
    }, "readBodyDirect");
    requestPrototype = {
      get method() {
        return this[methodKey];
      },
      get url() {
        return this[urlKey];
      },
      get headers() {
        return this[headersKey] ||= newHeadersFromIncoming(this[incomingKey]);
      },
      [abortRequest](reason) {
        if (this[abortReasonKey] === void 0) this[abortReasonKey] = reason;
        const abortController = this[abortControllerKey];
        if (abortController && !abortController.signal.aborted) abortController.abort(reason);
      },
      [getAbortController]() {
        this[abortControllerKey] ||= new AbortController();
        if (this[abortReasonKey] !== void 0 && !this[abortControllerKey].signal.aborted) this[abortControllerKey].abort(this[abortReasonKey]);
        return this[abortControllerKey];
      },
      [getRequestCache]() {
        const abortController = this[getAbortController]();
        if (this[requestCache]) return this[requestCache];
        const method = this.method;
        if (this[bodyConsumedDirectlyKey] && !(method === "GET" || method === "HEAD")) {
          this[bodyBufferKey] = void 0;
          const init = {
            method: method === "TRACE" ? "GET" : method,
            headers: this.headers,
            signal: abortController.signal
          };
          if (method !== "TRACE") {
            init.body = new ReadableStream({ start(c) {
              c.close();
            } });
            init.duplex = "half";
          }
          const req = new Request$1(this[urlKey], init);
          if (method === "TRACE") Object.defineProperty(req, "method", { get() {
            return "TRACE";
          } });
          return this[requestCache] = req;
        }
        return this[requestCache] = newRequestFromIncoming(this.method, this[urlKey], this.headers, this[incomingKey], abortController);
      },
      get body() {
        if (!this[bodyConsumedDirectlyKey]) return this[getRequestCache]().body;
        const request = this[getRequestCache]();
        if (!this[bodyLockReaderKey] && request.body) this[bodyLockReaderKey] = request.body.getReader();
        return request.body;
      },
      get bodyUsed() {
        if (this[bodyConsumedDirectlyKey]) return true;
        if (this[requestCache]) return this[requestCache].bodyUsed;
        return false;
      }
    };
    Object.defineProperty(requestPrototype, "signal", { get() {
      return this[getAbortController]().signal;
    } });
    [
      "cache",
      "credentials",
      "destination",
      "integrity",
      "mode",
      "redirect",
      "referrer",
      "referrerPolicy",
      "keepalive"
    ].forEach((k) => {
      Object.defineProperty(requestPrototype, k, { get() {
        return this[getRequestCache]()[k];
      } });
    });
    ["clone", "formData"].forEach((k) => {
      Object.defineProperty(requestPrototype, k, { value: /* @__PURE__ */ __name(function() {
        if (this[bodyConsumedDirectlyKey]) {
          if (k === "clone") throw newBodyUnusableError();
          return rejectBodyUnusable();
        }
        return this[getRequestCache]()[k]();
      }, "value") });
    });
    Object.defineProperty(requestPrototype, "text", { value: /* @__PURE__ */ __name(function() {
      return readBodyWithFastPath(this, "text", (buf) => textDecoder.decode(buf));
    }, "value") });
    Object.defineProperty(requestPrototype, "arrayBuffer", { value: /* @__PURE__ */ __name(function() {
      return readBodyWithFastPath(this, "arrayBuffer", (buf) => toArrayBuffer(buf));
    }, "value") });
    Object.defineProperty(requestPrototype, "blob", { value: /* @__PURE__ */ __name(function() {
      return readBodyWithFastPath(this, "blob", (buf, request) => {
        const type = contentType(request);
        const init = type ? { headers: { "content-type": type } } : void 0;
        return new Response(buf, init).blob();
      });
    }, "value") });
    Object.defineProperty(requestPrototype, "json", { value: /* @__PURE__ */ __name(function() {
      if (this[bodyConsumedDirectlyKey]) return rejectBodyUnusable();
      return this.text().then(JSON.parse);
    }, "value") });
    Object.defineProperty(requestPrototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), { value: /* @__PURE__ */ __name(function(depth, options, inspectFn) {
      return `Request (lightweight) ${inspectFn({
        method: this.method,
        url: this.url,
        headers: this.headers,
        nativeRequest: this[requestCache]
      }, {
        ...options,
        depth: depth == null ? null : depth - 1
      })}`;
    }, "value") });
    Object.setPrototypeOf(requestPrototype, Request$1.prototype);
    newRequest = /* @__PURE__ */ __name((incoming, defaultHostname) => {
      const req = Object.create(requestPrototype);
      req[incomingKey] = incoming;
      req[methodKey] = normalizeIncomingMethod(incoming.method);
      const incomingUrl = incoming.url || "";
      if (incomingUrl[0] !== "/" && (incomingUrl.startsWith("http://") || incomingUrl.startsWith("https://"))) {
        if (incoming instanceof Http2ServerRequest) throw new RequestError("Absolute URL for :path is not allowed in HTTP/2");
        try {
          req[urlKey] = new URL(incomingUrl).href;
        } catch (e) {
          throw new RequestError("Invalid absolute URL", { cause: e });
        }
        return req;
      }
      const host = (incoming instanceof Http2ServerRequest ? incoming.authority : incoming.headers.host) || defaultHostname;
      if (!host) throw new RequestError("Missing host header");
      let scheme;
      if (incoming instanceof Http2ServerRequest) {
        scheme = incoming.scheme;
        if (!(scheme === "http" || scheme === "https")) throw new RequestError("Unsupported scheme");
      } else scheme = incoming.socket && incoming.socket.encrypted ? "https" : "http";
      try {
        req[urlKey] = buildUrl(scheme, host, incomingUrl);
      } catch (e) {
        if (e instanceof RequestError) throw e;
        else throw new RequestError("Invalid URL", { cause: e });
      }
      return req;
    }, "newRequest");
    defaultContentType = "text/plain; charset=UTF-8";
    responseCache = /* @__PURE__ */ Symbol("responseCache");
    getResponseCache = /* @__PURE__ */ Symbol("getResponseCache");
    cacheKey = /* @__PURE__ */ Symbol("cache");
    GlobalResponse = global.Response;
    Response$1 = class Response$12 {
      static {
        __name(this, "Response$1");
      }
      #body;
      #init;
      [getResponseCache]() {
        const cache = this[cacheKey];
        const liveHeaders = cache && cache[2] instanceof Headers ? cache[2] : void 0;
        delete this[cacheKey];
        return this[responseCache] ||= new GlobalResponse(this.#body, liveHeaders ? {
          status: this.#init?.status,
          statusText: this.#init?.statusText,
          headers: liveHeaders
        } : this.#init);
      }
      constructor(body, init) {
        let headers;
        this.#body = body;
        if (init instanceof GlobalResponse) {
          const cachedGlobalResponse = init[responseCache];
          if (cachedGlobalResponse) {
            this.#init = cachedGlobalResponse;
            this[getResponseCache]();
            return;
          }
          this.#init = init instanceof Response$12 ? init.#init : init;
          headers = new Headers(init.headers);
        } else this.#init = init;
        if (body == null || typeof body === "string" || typeof body?.getReader !== "undefined" || body instanceof Blob || body instanceof Uint8Array) this[cacheKey] = [
          init?.status || 200,
          body ?? null,
          headers || init?.headers
        ];
      }
      get headers() {
        const cache = this[cacheKey];
        if (cache) {
          if (!(cache[2] instanceof Headers)) cache[2] = new Headers(cache[2] || (cache[1] === null ? void 0 : { "content-type": defaultContentType }));
          return cache[2];
        }
        return this[getResponseCache]().headers;
      }
      get status() {
        return this[cacheKey]?.[0] ?? this[getResponseCache]().status;
      }
      get ok() {
        const status = this.status;
        return status >= 200 && status < 300;
      }
    };
    [
      "body",
      "bodyUsed",
      "redirected",
      "statusText",
      "trailers",
      "type",
      "url"
    ].forEach((k) => {
      Object.defineProperty(Response$1.prototype, k, { get() {
        return this[getResponseCache]()[k];
      } });
    });
    [
      "arrayBuffer",
      "blob",
      "clone",
      "formData",
      "json",
      "text"
    ].forEach((k) => {
      Object.defineProperty(Response$1.prototype, k, { value: /* @__PURE__ */ __name(function() {
        return this[getResponseCache]()[k]();
      }, "value") });
    });
    Object.defineProperty(Response$1.prototype, /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), { value: /* @__PURE__ */ __name(function(depth, options, inspectFn) {
      return `Response (lightweight) ${inspectFn({
        status: this.status,
        headers: this.headers,
        ok: this.ok,
        nativeResponse: this[responseCache]
      }, {
        ...options,
        depth: depth == null ? null : depth - 1
      })}`;
    }, "value") });
    Object.setPrototypeOf(Response$1, GlobalResponse);
    Object.setPrototypeOf(Response$1.prototype, GlobalResponse.prototype);
    validRedirectUrl = /^https?:\/\/[!#-;=?-[\]_a-z~A-Z]+$/;
    parseRedirectUrl = /* @__PURE__ */ __name((url) => {
      if (url instanceof URL) return url.href;
      if (validRedirectUrl.test(url)) return url;
      return new URL(url).href;
    }, "parseRedirectUrl");
    validRedirectStatuses = /* @__PURE__ */ new Set([
      301,
      302,
      303,
      307,
      308
    ]);
    Object.defineProperty(Response$1, "redirect", {
      value: /* @__PURE__ */ __name(function redirect(url, status = 302) {
        if (!validRedirectStatuses.has(status)) throw new RangeError("Invalid status code");
        return new Response$1(null, {
          status,
          headers: { location: parseRedirectUrl(url) }
        });
      }, "redirect"),
      writable: true,
      configurable: true
    });
    Object.defineProperty(Response$1, "json", {
      value: /* @__PURE__ */ __name(function json(data, init) {
        const body = JSON.stringify(data);
        if (body === void 0) throw new TypeError("The data is not JSON serializable");
        const initHeaders = init?.headers;
        let headers;
        if (initHeaders) {
          headers = new Headers(initHeaders);
          if (!headers.has("content-type")) headers.set("content-type", "application/json");
        } else headers = { "content-type": "application/json" };
        return new Response$1(body, {
          status: init?.status ?? 200,
          statusText: init?.statusText,
          headers
        });
      }, "json"),
      writable: true,
      configurable: true
    });
    __name(readWithoutBlocking, "readWithoutBlocking");
    __name(writeFromReadableStreamDefaultReader, "writeFromReadableStreamDefaultReader");
    __name(writeFromReadableStream, "writeFromReadableStream");
    buildOutgoingHttpHeaders = /* @__PURE__ */ __name((headers, defaultContentType2) => {
      const res = {};
      if (!(headers instanceof Headers)) headers = new Headers(headers ?? void 0);
      if (headers.has("set-cookie")) {
        const cookies = [];
        for (const [k, v] of headers) if (k === "set-cookie") cookies.push(v);
        else res[k] = v;
        if (cookies.length > 0) res["set-cookie"] = cookies;
      } else for (const [k, v] of headers) res[k] = v;
      if (defaultContentType2) res["content-type"] ??= defaultContentType2;
      return res;
    }, "buildOutgoingHttpHeaders");
    outgoingEnded = /* @__PURE__ */ Symbol("outgoingEnded");
    incomingDraining = /* @__PURE__ */ Symbol("incomingDraining");
    DRAIN_TIMEOUT_MS = 500;
    MAX_DRAIN_BYTES = 64 * 1024 * 1024;
    drainIncoming = /* @__PURE__ */ __name((incoming) => {
      const incomingWithDrainState = incoming;
      if (incoming.destroyed || incomingWithDrainState[incomingDraining]) return;
      incomingWithDrainState[incomingDraining] = true;
      if (incoming instanceof Http2ServerRequest) {
        try {
          incoming.stream?.close?.(constants.NGHTTP2_NO_ERROR);
        } catch {
        }
        return;
      }
      let bytesRead = 0;
      const cleanup = /* @__PURE__ */ __name(() => {
        clearTimeout(timer);
        incoming.off("data", onData);
        incoming.off("end", cleanup);
        incoming.off("error", cleanup);
      }, "cleanup");
      const forceClose = /* @__PURE__ */ __name(() => {
        cleanup();
        const socket = incoming.socket;
        if (socket && !socket.destroyed) {
          if (typeof socket.destroySoon === "function") socket.destroySoon();
          else if (typeof socket.destroy === "function") socket.destroy();
        }
      }, "forceClose");
      const timer = setTimeout(forceClose, DRAIN_TIMEOUT_MS);
      timer.unref?.();
      const onData = /* @__PURE__ */ __name((chunk) => {
        bytesRead += chunk.length;
        if (bytesRead > MAX_DRAIN_BYTES) forceClose();
      }, "onData");
      incoming.on("data", onData);
      incoming.on("end", cleanup);
      incoming.on("error", cleanup);
      incoming.resume();
    }, "drainIncoming");
    makeCloseHandler = /* @__PURE__ */ __name((req, incoming, outgoing, needsBodyCleanup) => () => {
      if (incoming.errored) {
        recordBodyBufferedBeforeDisconnect(incoming);
        req[abortRequest](incoming.errored.toString());
      } else if (!outgoing.writableFinished) {
        recordBodyBufferedBeforeDisconnect(incoming);
        req[abortRequest]("Client connection prematurely closed.");
      }
      if (needsBodyCleanup && !incoming.readableEnded) setTimeout(() => {
        if (!incoming.readableEnded) setTimeout(() => {
          drainIncoming(incoming);
        });
      });
    }, "makeCloseHandler");
    isImmediateCacheableResponse = /* @__PURE__ */ __name((res) => {
      if (!(cacheKey in res)) return false;
      const body = res[cacheKey][1];
      return body === null || typeof body === "string" || body instanceof Uint8Array;
    }, "isImmediateCacheableResponse");
    handleRequestError = /* @__PURE__ */ __name(() => new Response(null, { status: 400 }), "handleRequestError");
    handleFetchError = /* @__PURE__ */ __name((e) => new Response(null, { status: e instanceof Error && (e.name === "TimeoutError" || e.constructor.name === "TimeoutError") ? 504 : 500 }), "handleFetchError");
    handleResponseError = /* @__PURE__ */ __name((e, outgoing) => {
      const err = e instanceof Error ? e : new Error("unknown error", { cause: e });
      if (err.code === "ERR_STREAM_PREMATURE_CLOSE") console.info("The user aborted a request.");
      else {
        console.error(e);
        if (!outgoing.headersSent) outgoing.writeHead(500, { "Content-Type": "text/plain" });
        outgoing.end(`Error: ${err.message}`);
        outgoing.destroy(err);
      }
    }, "handleResponseError");
    flushHeaders = /* @__PURE__ */ __name((outgoing) => {
      if ("flushHeaders" in outgoing && outgoing.writable) outgoing.flushHeaders();
    }, "flushHeaders");
    responseViaCache = /* @__PURE__ */ __name(async (res, outgoing) => {
      let [status, body, header] = res[cacheKey];
      if (!header) {
        if (body === null) {
          outgoing.writeHead(status);
          outgoing.end();
        } else if (typeof body === "string") {
          outgoing.writeHead(status, {
            "Content-Type": defaultContentType,
            "Content-Length": Buffer.byteLength(body)
          });
          outgoing.end(body);
        } else if (body instanceof Uint8Array) {
          outgoing.writeHead(status, {
            "Content-Type": defaultContentType,
            "Content-Length": body.byteLength
          });
          outgoing.end(body);
        } else if (body instanceof Blob) {
          outgoing.writeHead(status, {
            "Content-Type": defaultContentType,
            "Content-Length": body.size
          });
          outgoing.end(new Uint8Array(await body.arrayBuffer()));
        } else {
          outgoing.writeHead(status, { "Content-Type": defaultContentType });
          flushHeaders(outgoing);
          await writeFromReadableStream(body, outgoing)?.catch((e) => handleResponseError(e, outgoing));
        }
        outgoing[outgoingEnded]?.();
        return;
      }
      let hasContentLength = false;
      if (header instanceof Headers) {
        hasContentLength = header.has("content-length");
        header = buildOutgoingHttpHeaders(header, body === null ? void 0 : defaultContentType);
      } else if (Array.isArray(header)) {
        const headerObj = new Headers(header);
        hasContentLength = headerObj.has("content-length");
        header = buildOutgoingHttpHeaders(headerObj, body === null ? void 0 : defaultContentType);
      } else for (const key in header) if (key.length === 14 && key.toLowerCase() === "content-length") {
        hasContentLength = true;
        break;
      }
      if (!hasContentLength) {
        if (typeof body === "string") header["Content-Length"] = Buffer.byteLength(body);
        else if (body instanceof Uint8Array) header["Content-Length"] = body.byteLength;
        else if (body instanceof Blob) header["Content-Length"] = body.size;
      }
      outgoing.writeHead(status, header);
      if (body == null) outgoing.end();
      else if (typeof body === "string" || body instanceof Uint8Array) outgoing.end(body);
      else if (body instanceof Blob) outgoing.end(new Uint8Array(await body.arrayBuffer()));
      else {
        flushHeaders(outgoing);
        await writeFromReadableStream(body, outgoing)?.catch((e) => handleResponseError(e, outgoing));
      }
      outgoing[outgoingEnded]?.();
    }, "responseViaCache");
    isPromise = /* @__PURE__ */ __name((res) => typeof res.then === "function", "isPromise");
    responseViaResponseObject = /* @__PURE__ */ __name(async (res, outgoing, options = {}) => {
      if (isPromise(res)) if (options.errorHandler) try {
        res = await res;
      } catch (err) {
        const errRes = await options.errorHandler(err);
        if (!errRes) return;
        res = errRes;
      }
      else res = await res.catch(handleFetchError);
      if (cacheKey in res) return responseViaCache(res, outgoing);
      const resHeaderRecord = buildOutgoingHttpHeaders(res.headers, res.body === null ? void 0 : defaultContentType);
      if (res.body) {
        const reader = res.body.getReader();
        const values = [];
        let done = false;
        let currentReadPromise = void 0;
        if (resHeaderRecord["transfer-encoding"] !== "chunked") {
          let maxReadCount = 2;
          for (let i = 0; i < maxReadCount; i++) {
            currentReadPromise ||= reader.read();
            const chunk = await readWithoutBlocking(currentReadPromise).catch((e) => {
              console.error(e);
              done = true;
            });
            if (!chunk) {
              if (i === 1) {
                await new Promise((resolve) => setTimeout(resolve));
                maxReadCount = 3;
                continue;
              }
              break;
            }
            currentReadPromise = void 0;
            if (chunk.value) values.push(chunk.value);
            if (chunk.done) {
              done = true;
              break;
            }
          }
          if (done && !("content-length" in resHeaderRecord)) resHeaderRecord["content-length"] = values.reduce((acc, value) => acc + value.length, 0);
        }
        outgoing.writeHead(res.status, resHeaderRecord);
        values.forEach((value) => {
          outgoing.write(value);
        });
        if (done) outgoing.end();
        else {
          if (values.length === 0) flushHeaders(outgoing);
          await writeFromReadableStreamDefaultReader(reader, outgoing, currentReadPromise);
        }
      } else if (resHeaderRecord[X_ALREADY_SENT]) {
      } else {
        outgoing.writeHead(res.status, resHeaderRecord);
        outgoing.end();
      }
      outgoing[outgoingEnded]?.();
    }, "responseViaResponseObject");
    getRequestListener = /* @__PURE__ */ __name((fetchCallback, options = {}) => {
      const autoCleanupIncoming = options.autoCleanupIncoming ?? true;
      if (options.overrideGlobalObjects !== false && global.Request !== Request$1) {
        Object.defineProperty(global, "Request", { value: Request$1 });
        Object.defineProperty(global, "Response", { value: Response$1 });
      }
      return async (incoming, outgoing) => {
        let res, req;
        let needsBodyCleanup = false;
        let closeHandlerAttached = false;
        const ensureCloseHandler = /* @__PURE__ */ __name(() => {
          if (!req || closeHandlerAttached) return;
          closeHandlerAttached = true;
          outgoing.on("close", makeCloseHandler(req, incoming, outgoing, needsBodyCleanup));
        }, "ensureCloseHandler");
        try {
          req = newRequest(incoming, options.hostname);
          needsBodyCleanup = autoCleanupIncoming && !(incoming.method === "GET" || incoming.method === "HEAD");
          if (needsBodyCleanup) {
            incoming[wrapBodyStream] = true;
            if (incoming instanceof Http2ServerRequest) outgoing[outgoingEnded] = () => {
              if (!incoming.readableEnded) setTimeout(() => {
                if (!incoming.readableEnded) setTimeout(() => {
                  incoming.destroy();
                  outgoing.destroy();
                });
              });
            };
          }
          res = fetchCallback(req, {
            incoming,
            outgoing
          });
          if (!isPromise(res) && isImmediateCacheableResponse(res)) {
            if (needsBodyCleanup && !incoming.readableEnded) outgoing.once("finish", () => {
              if (!incoming.readableEnded) drainIncoming(incoming);
            });
            return responseViaCache(res, outgoing);
          }
          ensureCloseHandler();
        } catch (e) {
          if (!res) if (options.errorHandler) {
            ensureCloseHandler();
            res = await options.errorHandler(req ? e : toRequestError(e));
            if (!res) return;
          } else if (!req) res = handleRequestError();
          else res = handleFetchError(e);
          else return handleResponseError(e, outgoing);
        }
        try {
          return await responseViaResponseObject(res, outgoing, options);
        } catch (e) {
          return handleResponseError(e, outgoing);
        }
      };
    }, "getRequestListener");
    CloseEvent2 = globalThis.CloseEvent ?? class extends Event {
      #eventInitDict;
      constructor(type, eventInitDict = {}) {
        super(type, eventInitDict);
        this.#eventInitDict = eventInitDict;
      }
      get wasClean() {
        return this.#eventInitDict.wasClean ?? false;
      }
      get code() {
        return this.#eventInitDict.code ?? 0;
      }
      get reason() {
        return this.#eventInitDict.reason ?? "";
      }
    };
    ErrorEvent = globalThis.ErrorEvent ?? class extends Event {
      #eventInitDict;
      constructor(type, eventInitDict = {}) {
        super(type, eventInitDict);
        this.#eventInitDict = eventInitDict;
      }
      get message() {
        return this.#eventInitDict.message ?? "";
      }
      get filename() {
        return this.#eventInitDict.filename ?? "";
      }
      get lineno() {
        return this.#eventInitDict.lineno ?? 0;
      }
      get colno() {
        return this.#eventInitDict.colno ?? 0;
      }
      get error() {
        return this.#eventInitDict.error ?? null;
      }
    };
    generateConnectionSymbol = /* @__PURE__ */ __name(() => /* @__PURE__ */ Symbol("connection"), "generateConnectionSymbol");
    CONNECTION_SYMBOL_KEY = /* @__PURE__ */ Symbol("CONNECTION_SYMBOL_KEY");
    WAIT_FOR_WEBSOCKET_SYMBOL = /* @__PURE__ */ Symbol("WAIT_FOR_WEBSOCKET_SYMBOL");
    responseHeadersToSkip = /* @__PURE__ */ new Set([
      "connection",
      "content-length",
      "keep-alive",
      "proxy-authenticate",
      "proxy-authorization",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "sec-websocket-accept",
      "sec-websocket-extensions",
      "sec-websocket-protocol"
    ]);
    appendResponseHeaders = /* @__PURE__ */ __name((headers, responseHeaders) => {
      if (!responseHeaders) return;
      responseHeaders.forEach((value, key) => {
        if (responseHeadersToSkip.has(key.toLowerCase())) return;
        headers.push(`${key}: ${value}`);
      });
    }, "appendResponseHeaders");
    rejectUpgradeRequest = /* @__PURE__ */ __name((socket, status, responseHeaders) => {
      const responseLines = ["Connection: close", "Content-Length: 0"];
      appendResponseHeaders(responseLines, responseHeaders);
      socket.end(`HTTP/1.1 ${status.toString()} ${STATUS_CODES[status] ?? ""}\r
${responseLines.join("\r\n")}\r
\r
`);
    }, "rejectUpgradeRequest");
    createUpgradeRequest = /* @__PURE__ */ __name((request) => {
      const protocol = request.socket.encrypted ? "https" : "http";
      const url = new URL(request.url ?? "/", `${protocol}://${request.headers.host ?? "localhost"}`);
      const headers = new Headers();
      for (const key in request.headers) {
        const value = request.headers[key];
        if (!value) continue;
        headers.append(key, Array.isArray(value) ? value[0] : value);
      }
      return new Request(url, { headers });
    }, "createUpgradeRequest");
    setupWebSocket = /* @__PURE__ */ __name((options) => {
      const { server, fetchCallback, wss } = options;
      const waiterMap = /* @__PURE__ */ new Map();
      wss.on("connection", (ws, request) => {
        const waiter = waiterMap.get(request);
        if (waiter) {
          waiter.resolve(ws);
          waiterMap.delete(request);
        }
      });
      const rejectWaiter = /* @__PURE__ */ __name((request) => {
        const waiter = waiterMap.get(request);
        if (waiter) {
          waiterMap.delete(request);
          waiter.reject(/* @__PURE__ */ new Error("WebSocket handshake aborted"));
        }
      }, "rejectWaiter");
      const waitForWebSocket = /* @__PURE__ */ __name((request, connectionSymbol) => {
        return new Promise((resolve, reject) => {
          waiterMap.set(request, {
            resolve,
            reject,
            connectionSymbol
          });
        });
      }, "waitForWebSocket");
      server.on("upgrade", async (request, socket, head2) => {
        if (request.headers.upgrade?.toLowerCase() !== "websocket") return;
        const env2 = {
          incoming: request,
          outgoing: void 0,
          wss,
          [WAIT_FOR_WEBSOCKET_SYMBOL]: waitForWebSocket
        };
        let status = 400;
        let responseHeaders;
        try {
          const response = await fetchCallback(createUpgradeRequest(request), env2);
          if (response instanceof Response) {
            status = response.status;
            responseHeaders = response.headers;
          }
        } catch {
          if (server.listenerCount("upgrade") === 1) rejectUpgradeRequest(socket, 500);
          return;
        }
        const waiter = waiterMap.get(request);
        if (!waiter || waiter.connectionSymbol !== env2[CONNECTION_SYMBOL_KEY]) {
          rejectWaiter(request);
          if (server.listenerCount("upgrade") === 1) rejectUpgradeRequest(socket, status, responseHeaders);
          return;
        }
        const addResponseHeaders = /* @__PURE__ */ __name((headers) => {
          appendResponseHeaders(headers, responseHeaders);
        }, "addResponseHeaders");
        const reclaimWaiterOnClose = /* @__PURE__ */ __name(() => rejectWaiter(request), "reclaimWaiterOnClose");
        socket.once("close", reclaimWaiterOnClose);
        wss.on("headers", addResponseHeaders);
        try {
          wss.handleUpgrade(request, socket, head2, (ws) => {
            socket.off("close", reclaimWaiterOnClose);
            wss.emit("connection", ws, request);
          });
        } finally {
          wss.off("headers", addResponseHeaders);
        }
      });
      server.on("close", () => {
        wss.close();
      });
    }, "setupWebSocket");
    upgradeWebSocket = defineWebSocketHelper(async (c, events, options) => {
      if (c.req.header("upgrade")?.toLowerCase() !== "websocket") return;
      const env2 = c.env;
      const waitForWebSocket = env2[WAIT_FOR_WEBSOCKET_SYMBOL];
      if (!waitForWebSocket || !env2.incoming) return new Response(null, { status: 500 });
      const connectionSymbol = generateConnectionSymbol();
      env2[CONNECTION_SYMBOL_KEY] = connectionSymbol;
      (async () => {
        let ws;
        try {
          ws = await waitForWebSocket(env2.incoming, connectionSymbol);
        } catch {
          return;
        }
        const messagesReceivedInStarting = [];
        const bufferMessage = /* @__PURE__ */ __name((data, isBinary) => {
          messagesReceivedInStarting.push([data, isBinary]);
        }, "bufferMessage");
        ws.on("message", bufferMessage);
        const ctx = {
          binaryType: "arraybuffer",
          close(code, reason) {
            ws.close(code, reason);
          },
          protocol: ws.protocol,
          raw: ws,
          get readyState() {
            return ws.readyState;
          },
          send(source, opts) {
            ws.send(source, { compress: opts?.compress });
          },
          url: new URL(c.req.url)
        };
        try {
          events?.onOpen?.(new Event("open"), ctx);
        } catch (e) {
          (options?.onError ?? console.error)(e);
        }
        const handleMessage = /* @__PURE__ */ __name((data, isBinary) => {
          const datas = Array.isArray(data) ? data : [data];
          for (const data2 of datas) try {
            events?.onMessage?.(new MessageEvent("message", { data: isBinary ? data2 instanceof ArrayBuffer ? data2 : data2.buffer.slice(data2.byteOffset, data2.byteOffset + data2.byteLength) : typeof data2 === "string" ? data2 : Buffer.from(data2).toString("utf-8") }), ctx);
          } catch (e) {
            (options?.onError ?? console.error)(e);
          }
        }, "handleMessage");
        ws.off("message", bufferMessage);
        for (const message of messagesReceivedInStarting) handleMessage(...message);
        ws.on("message", (data, isBinary) => {
          handleMessage(data, isBinary);
        });
        ws.on("close", (code, reason) => {
          try {
            events?.onClose?.(new CloseEvent2("close", {
              code,
              reason: reason.toString()
            }), ctx);
          } catch (e) {
            (options?.onError ?? console.error)(e);
          }
        });
        ws.on("error", (error3) => {
          try {
            events?.onError?.(new ErrorEvent("error", { error: error3 }), ctx);
          } catch (e) {
            (options?.onError ?? console.error)(e);
          }
        });
      })();
      return new Response();
    });
    createAdaptorServer = /* @__PURE__ */ __name((options) => {
      const fetchCallback = options.fetch;
      const requestListener = getRequestListener(fetchCallback, {
        hostname: options.hostname,
        overrideGlobalObjects: options.overrideGlobalObjects,
        autoCleanupIncoming: options.autoCleanupIncoming
      });
      const server = (options.createServer || createServer)(options.serverOptions || {}, requestListener);
      if (options.websocket && options.websocket.server) {
        if (options.websocket.server.options.noServer !== true) throw new Error("WebSocket server must be created with { noServer: true } option");
        setupWebSocket({
          server,
          fetchCallback,
          wss: options.websocket.server
        });
      }
      return server;
    }, "createAdaptorServer");
    serve = /* @__PURE__ */ __name((options, listeningListener) => {
      const server = createAdaptorServer(options);
      server.listen(options?.port ?? 3e3, options.hostname, () => {
        const serverInfo = server.address();
        listeningListener && listeningListener(serverInfo);
      });
      return server;
    }, "serve");
  }
});

// node_modules/@hono/node-server/dist/utils/stream.mjs
import { Readable as Readable4 } from "node:stream";
var pr54206Applied, useReadableToWeb, createStreamBody;
var init_stream = __esm({
  "node_modules/@hono/node-server/dist/utils/stream.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_process2();
    pr54206Applied = /* @__PURE__ */ __name(() => {
      const [major, minor] = versions.node.split(".").map((component) => parseInt(component));
      return major >= 23 || major === 22 && minor >= 7 || major === 20 && minor >= 18;
    }, "pr54206Applied");
    useReadableToWeb = pr54206Applied();
    createStreamBody = /* @__PURE__ */ __name((stream, useNativeReadableToWeb = useReadableToWeb) => {
      if (useNativeReadableToWeb) return Readable4.toWeb(stream);
      let controller;
      let settled = false;
      const cleanup = /* @__PURE__ */ __name(() => {
        stream.off("data", onData);
        stream.off("error", onError);
        stream.off("end", onTerminate);
        stream.off("close", onTerminate);
      }, "cleanup");
      const settle = /* @__PURE__ */ __name((callback) => {
        if (settled) return;
        settled = true;
        cleanup();
        callback?.();
      }, "settle");
      const onData = /* @__PURE__ */ __name((chunk) => {
        if (settled || !controller) return;
        controller.enqueue(chunk);
        if ((controller.desiredSize ?? 0) <= 0) stream.pause();
      }, "onData");
      const onError = /* @__PURE__ */ __name((error3) => {
        settle(() => {
          controller?.error(error3);
        });
      }, "onError");
      const onTerminate = /* @__PURE__ */ __name(() => {
        settle(() => {
          controller?.close();
        });
      }, "onTerminate");
      return new ReadableStream({
        start(streamController) {
          controller = streamController;
          stream.on("data", onData);
          stream.on("error", onError);
          stream.on("end", onTerminate);
          stream.on("close", onTerminate);
          stream.pause();
        },
        pull() {
          if (!settled) stream.resume();
        },
        cancel() {
          settle();
          const ignoreError = /* @__PURE__ */ __name(() => {
          }, "ignoreError");
          stream.on("error", ignoreError);
          stream.once("close", () => stream.off("error", ignoreError));
          stream.destroy();
        }
      });
    }, "createStreamBody");
  }
});

// node_modules/hono/dist/utils/mime.js
var getMimeType, _baseMimes, baseMimes;
var init_mime = __esm({
  "node_modules/hono/dist/utils/mime.js"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    getMimeType = /* @__PURE__ */ __name((filename, mimes = baseMimes) => {
      const regexp = /\.([a-zA-Z0-9]+?)$/;
      const match2 = filename.match(regexp);
      if (!match2) {
        return;
      }
      return mimes[match2[1].toLowerCase()];
    }, "getMimeType");
    _baseMimes = {
      aac: "audio/aac",
      avi: "video/x-msvideo",
      avif: "image/avif",
      av1: "video/av1",
      bin: "application/octet-stream",
      bmp: "image/bmp",
      css: "text/css; charset=utf-8",
      csv: "text/csv; charset=utf-8",
      eot: "application/vnd.ms-fontobject",
      epub: "application/epub+zip",
      gif: "image/gif",
      gz: "application/gzip",
      htm: "text/html; charset=utf-8",
      html: "text/html; charset=utf-8",
      ico: "image/x-icon",
      ics: "text/calendar; charset=utf-8",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      js: "text/javascript; charset=utf-8",
      json: "application/json",
      jsonld: "application/ld+json",
      map: "application/json",
      mid: "audio/x-midi",
      midi: "audio/x-midi",
      mjs: "text/javascript; charset=utf-8",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
      mpeg: "video/mpeg",
      oga: "audio/ogg",
      ogv: "video/ogg",
      ogx: "application/ogg",
      opus: "audio/opus",
      otf: "font/otf",
      pdf: "application/pdf",
      png: "image/png",
      rtf: "application/rtf",
      svg: "image/svg+xml; charset=utf-8",
      tif: "image/tiff",
      tiff: "image/tiff",
      ts: "video/mp2t",
      ttf: "font/ttf",
      txt: "text/plain; charset=utf-8",
      wasm: "application/wasm",
      webm: "video/webm",
      weba: "audio/webm",
      webmanifest: "application/manifest+json",
      webp: "image/webp",
      woff: "font/woff",
      woff2: "font/woff2",
      xhtml: "application/xhtml+xml; charset=utf-8",
      xml: "application/xml; charset=utf-8",
      zip: "application/zip",
      "3gp": "video/3gpp",
      "3g2": "video/3gpp2",
      gltf: "model/gltf+json",
      glb: "model/gltf-binary"
    };
    baseMimes = _baseMimes;
  }
});

// node_modules/@hono/node-server/dist/serve-static.mjs
var serve_static_exports = {};
__export(serve_static_exports, {
  serveStatic: () => serveStatic
});
import { join as join2 } from "node:path";
var COMPRESSIBLE_CONTENT_TYPE_REGEX, ENCODINGS, ENCODINGS_ORDERED_KEYS, getStats, BYTE_RANGE_PATTERN, parseByteRange, resolveByteRange, tryDecode2, tryDecodeURI2, serveStatic;
var init_serve_static = __esm({
  "node_modules/@hono/node-server/dist/serve-static.mjs"() {
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_stream();
    init_mime();
    init_fs2();
    COMPRESSIBLE_CONTENT_TYPE_REGEX = /^\s*(?:text\/[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
    ENCODINGS = {
      br: ".br",
      zstd: ".zst",
      gzip: ".gz"
    };
    ENCODINGS_ORDERED_KEYS = Object.keys(ENCODINGS);
    getStats = /* @__PURE__ */ __name((path) => {
      let stats;
      try {
        stats = statSync(path);
      } catch {
      }
      return stats;
    }, "getStats");
    BYTE_RANGE_PATTERN = /^(?:bytes=)?(?!-$)(\d*)-(\d*)$/;
    parseByteRange = /* @__PURE__ */ __name((range) => {
      const match2 = range.match(BYTE_RANGE_PATTERN);
      if (!match2) return;
      const [, start, end] = match2;
      if (start === "") return {
        type: "suffix",
        length: Number(end)
      };
      if (end === "") return {
        type: "open-ended",
        start: Number(start)
      };
      return {
        type: "bounded",
        start: Number(start),
        end: Number(end)
      };
    }, "parseByteRange");
    resolveByteRange = /* @__PURE__ */ __name((spec, size) => {
      if (size === 0) return;
      if (spec.type === "suffix") {
        if (spec.length === 0) return;
        return {
          start: Math.max(size - spec.length, 0),
          end: size - 1
        };
      }
      const end = spec.type === "bounded" ? Math.min(spec.end, size - 1) : size - 1;
      if (spec.start >= size || spec.start > end) return;
      return {
        start: spec.start,
        end
      };
    }, "resolveByteRange");
    tryDecode2 = /* @__PURE__ */ __name((str, decoder) => {
      try {
        return decoder(str);
      } catch {
        return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
          try {
            return decoder(match2);
          } catch {
            return match2;
          }
        });
      }
    }, "tryDecode");
    tryDecodeURI2 = /* @__PURE__ */ __name((str) => tryDecode2(str, decodeURI), "tryDecodeURI");
    serveStatic = /* @__PURE__ */ __name((options = { root: "" }) => {
      const root = options.root || "";
      const optionPath = options.path;
      if (root !== "" && !existsSync(root)) console.error(`serveStatic: root path '${root}' is not found, are you sure it's correct?`);
      return async (c, next) => {
        if (c.finalized) return next();
        let filename;
        if (optionPath) filename = optionPath;
        else try {
          filename = tryDecodeURI2(c.req.path);
          if (/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}|\\/.test(filename)) throw new Error();
        } catch {
          await options.onNotFound?.(c.req.path, c);
          return next();
        }
        let path = join2(root, !optionPath && options.rewriteRequestPath ? options.rewriteRequestPath(filename, c) : filename);
        let stats = getStats(path);
        if (stats && stats.isDirectory()) {
          const indexFile = options.index ?? "index.html";
          path = join2(path, indexFile);
          stats = getStats(path);
        }
        if (!stats) {
          await options.onNotFound?.(path, c);
          return next();
        }
        const mimeType = getMimeType(path);
        c.header("Content-Type", mimeType || "application/octet-stream");
        if (options.precompressed && (!mimeType || mimeType === "application/octet-stream" || COMPRESSIBLE_CONTENT_TYPE_REGEX.test(mimeType))) {
          const acceptEncodingSet = new Set(c.req.header("Accept-Encoding")?.split(",").map((encoding) => encoding.trim()));
          for (const encoding of ENCODINGS_ORDERED_KEYS) {
            if (!acceptEncodingSet.has(encoding)) continue;
            const precompressedStats = getStats(path + ENCODINGS[encoding]);
            if (precompressedStats) {
              c.header("Content-Encoding", encoding);
              c.header("Vary", "Accept-Encoding", { append: true });
              stats = precompressedStats;
              path = path + ENCODINGS[encoding];
              break;
            }
          }
        }
        let result;
        const size = stats.size;
        const range = c.req.header("range") || "";
        c.header("Last-Modified", stats.mtime.toUTCString());
        if (c.req.method == "HEAD" || c.req.method == "OPTIONS") {
          c.header("Content-Length", size.toString());
          c.status(200);
          result = c.body(null);
        } else if (!range) {
          c.header("Content-Length", size.toString());
          result = c.body(createStreamBody(createReadStream(path)), 200);
        } else {
          c.header("Accept-Ranges", "bytes");
          const resolvedRange = resolveByteRange(parseByteRange(range) ?? {
            type: "open-ended",
            start: 0
          }, size);
          if (!resolvedRange) {
            c.header("Content-Range", `bytes */${size}`);
            result = c.body(null, 416);
          } else {
            const { start, end } = resolvedRange;
            const chunkSize = end - start + 1;
            const stream = createReadStream(path, {
              start,
              end
            });
            c.header("Content-Length", chunkSize.toString());
            c.header("Content-Range", `bytes ${start}-${end}/${size}`);
            result = c.body(createStreamBody(stream), 206);
          }
        }
        await options.onFound?.(path, c);
        return result;
      };
    }, "serveStatic");
  }
});

// src/index.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/hono-base.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/compose.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError2 = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError2 = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError2)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/context.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/http-exception.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/request/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/crypto.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = /* @__PURE__ */ __name((arrayBuffer, contentType2) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType2.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
}, "bufferToFormData");

// node_modules/hono/dist/utils/body.js
var MAX_NESTING_DEPTH = 32;
var MAX_NESTED_OBJECTS = 1e4;
var isRawRequest = /* @__PURE__ */ __name((request) => "headers" in request, "isRawRequest");
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType2 = headers.get("Content-Type");
  const mediaType = contentType2?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  const nestingState = { count: 0 };
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value, nestingState);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value, state) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".", MAX_NESTING_DEPTH + 2);
  if (keys.length > MAX_NESTING_DEPTH + 1) {
    throwNestingLimitExceeded();
  }
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        if (state.count++ >= MAX_NESTED_OBJECTS) {
          throwNestingLimitExceeded();
        }
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");
var throwNestingLimitExceeded = /* @__PURE__ */ __name(() => {
  throw new Error("Nesting limit exceeded");
}, "throwNestingLimitExceeded");

// node_modules/hono/dist/utils/url.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey2 = `${label}#${next}`;
    if (!patternCache[cacheKey2]) {
      if (match2[2]) {
        patternCache[cacheKey2] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey2, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey2] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey2];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str, "tryDecodeURIComponent");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  const hashIndex = url.indexOf("#", 8);
  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var HonoRequest = class {
  static {
    __name(this, "HonoRequest");
  }
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = /* @__PURE__ */ __name((key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  }, "#cachedBody");
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType2, headers) => {
  return {
    "Content-Type": contentType2,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = class {
  static {
    __name(this, "Context");
  }
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = /* @__PURE__ */ __name((...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  }, "render");
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = /* @__PURE__ */ __name((layout) => this.#layout = layout, "setLayout");
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = /* @__PURE__ */ __name(() => this.#layout, "getLayout");
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = /* @__PURE__ */ __name((renderer) => {
    this.#renderer = renderer;
  }, "setRenderer");
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = /* @__PURE__ */ __name((name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  }, "header");
  status = /* @__PURE__ */ __name((status) => {
    this.#status = status;
  }, "status");
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = /* @__PURE__ */ __name((key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  }, "set");
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = /* @__PURE__ */ __name((key) => {
    return this.#var ? this.#var.get(key) : void 0;
  }, "get");
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count3 = 0;
        for (const k in headers) {
          if (++count3 > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = /* @__PURE__ */ __name((...args) => this.#newResponse(...args), "newResponse");
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = /* @__PURE__ */ __name((data, arg, headers) => this.#newResponse(data, arg, headers), "body");
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = /* @__PURE__ */ __name((text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  }, "text");
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = /* @__PURE__ */ __name((object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  }, "json");
  html = /* @__PURE__ */ __name((html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  }, "html");
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = /* @__PURE__ */ __name((location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  }, "redirect");
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name(() => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  }, "notFound");
};

// node_modules/hono/dist/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
  static {
    __name(this, "UnsupportedPathError");
  }
};

// node_modules/hono/dist/utils/constants.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = class _Hono {
  static {
    __name(this, "_Hono");
  }
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = /* @__PURE__ */ __name((handler) => {
    this.errorHandler = handler;
    return this;
  }, "onError");
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = /* @__PURE__ */ __name((handler) => {
    this.#notFoundHandler = handler;
    return this;
  }, "notFound");
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler, baseRoutePath) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path,
      method,
      handler
    };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = /* @__PURE__ */ __name((request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  }, "fetch");
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = /* @__PURE__ */ __name((input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  }, "request");
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = /* @__PURE__ */ __name(() => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  }, "fire");
};

// node_modules/hono/dist/router/reg-exp-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/reg-exp-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/utils.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var createNullObject = /* @__PURE__ */ __name(() => /* @__PURE__ */ Object.create(null), "createNullObject");

// node_modules/hono/dist/router/reg-exp-router/matcher.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name(((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }), "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = class _Node {
  static {
    __name(this, "_Node");
  }
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context2, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context2.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Trie = class {
  static {
    __name(this, "Trie");
  }
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = createNullObject();
  insert(path, isStatic) {
    if (isStatic) {
      this.#root.insert(path.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    `^${path.replace(
      /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
      (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ONLY_WILDCARD_REG_EXP_STR : `/:${LABEL_REG_EXP_STR}`
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function findMiddleware(middleware, path) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = class {
  static {
    __name(this, "RegExpRouter");
  }
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: createNullObject() };
    this.#routes = { [METHOD_NAME_ALL]: createNullObject() };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path) {
    try {
      this.#tries[method].insert(path, !/\*|\/:/.test(path));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap[METHOD_NAME_ALL]) {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path === "/*") {
      path = "*";
    }
    const methods = method === METHOD_NAME_ALL ? Object.keys(middleware) : [method];
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      for (const m of methods) {
        if (!middleware[m][path]) {
          this.#insertPath(m, path);
          middleware[m][path] = findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        }
      }
      for (const handlerMap of [middleware, routes]) {
        for (const m of methods) {
          for (const p in handlerMap[m]) {
            re.test(p) && handlerMap[m][p].push([handler, path]);
          }
        }
      }
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (const path2 of paths) {
      for (const m of methods) {
        if (!routes[m][path2]) {
          this.#insertPath(m, path2);
          routes[m][path2] = findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || [];
        }
        routes[m][path2].push([handler, path2]);
      }
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) {
      matchers[method] = this.#buildMatcher(method);
    }
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) {
      for (const path in r) {
        const handlers = r[path];
        const pathData = trie.paths[path];
        if (!pathData) {
          staticMap[path] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
          h,
          trie.paths[handlerPath][1].reduceRight((map2, [key], i) => {
            map2[key] = paramReplacementMap[pathData[1][i][1]];
            return map2;
          }, createNullObject())
        ]);
      }
    }
    return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/prepared-router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/smart-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SmartRouter = class {
  static {
    __name(this, "SmartRouter");
  }
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/router.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/router/trie-router/node.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParams = createNullObject();
var order = 0;
var Node2 = class _Node2 {
  static {
    __name(this, "_Node");
  }
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  static {
    __name(this, "TrieRouter");
  }
  name = "TrieRouter";
  #node = new Node2();
  add(method, path, handler) {
    for (const result of checkOptionalParameter(path) || [path]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  static {
    __name(this, "Hono");
  }
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/hono/dist/middleware/cors/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var cors = /* @__PURE__ */ __name((options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    } else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else {
      return () => "";
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (exposeHeadersStr) {
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        c.res.headers.append("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) {
        set("Access-Control-Allow-Methods", allowMethods);
      }
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
        }
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/routes/auth.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/helper/cookie/index.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// node_modules/hono/dist/utils/cookie.js
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var relaxedCookieNameRegEx = /^[!#-:<>-[\]-~]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = /* @__PURE__ */ __name((value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
}, "trimCookieWhitespace");
var parse = /* @__PURE__ */ __name((cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.split(";");
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (name && name !== cookieName || !relaxedCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = tryDecodeURIComponent(cookieValue);
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
}, "parse");
var _serialize = /* @__PURE__ */ __name((name, value, opt = {}) => {
  if (!validCookieNameRegEx.test(name)) {
    throw new Error("Invalid cookie name");
  }
  let cookie = `${name}=${value}`;
  if (name.startsWith("__Secure-") && !opt.secure) {
    throw new Error("__Secure- Cookie must have Secure attributes");
  }
  if (name.startsWith("__Host-")) {
    if (!opt.secure) {
      throw new Error("__Host- Cookie must have Secure attributes");
    }
    if (opt.path !== "/") {
      throw new Error('__Host- Cookie must have Path attributes with "/"');
    }
    if (opt.domain) {
      throw new Error("__Host- Cookie must not have Domain attributes");
    }
  }
  for (const key of ["domain", "path", "sameSite", "priority"]) {
    if (opt[key] && /[;\r\n]/.test(opt[key])) {
      throw new Error(`${key} must not contain ";", "\\r", or "\\n"`);
    }
  }
  if (opt && typeof opt.maxAge === "number" && opt.maxAge >= 0) {
    if (opt.maxAge > 3456e4) {
      throw new Error(
        "Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration."
      );
    }
    cookie += `; Max-Age=${opt.maxAge | 0}`;
  }
  if (opt.domain && opt.prefix !== "host") {
    cookie += `; Domain=${opt.domain}`;
  }
  if (opt.path) {
    cookie += `; Path=${opt.path}`;
  }
  if (opt.expires) {
    if (opt.expires.getTime() - Date.now() > 3456e7) {
      throw new Error(
        "Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future."
      );
    }
    cookie += `; Expires=${opt.expires.toUTCString()}`;
  }
  if (opt.httpOnly) {
    cookie += "; HttpOnly";
  }
  if (opt.secure) {
    cookie += "; Secure";
  }
  if (opt.sameSite) {
    cookie += `; SameSite=${opt.sameSite.charAt(0).toUpperCase() + opt.sameSite.slice(1)}`;
  }
  if (opt.priority) {
    cookie += `; Priority=${opt.priority.charAt(0).toUpperCase() + opt.priority.slice(1)}`;
  }
  if (opt.partitioned) {
    if (!opt.secure) {
      throw new Error("Partitioned Cookie must have Secure attributes");
    }
    cookie += "; Partitioned";
  }
  return cookie;
}, "_serialize");
var serialize = /* @__PURE__ */ __name((name, value, opt) => {
  value = encodeURIComponent(value);
  return _serialize(name, value, opt);
}, "serialize");

// node_modules/hono/dist/helper/cookie/index.js
var getCookie = /* @__PURE__ */ __name((c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
}, "getCookie");
var generateCookie = /* @__PURE__ */ __name((name, value, opt) => {
  let cookie;
  if (opt?.prefix === "secure") {
    cookie = serialize("__Secure-" + name, value, { path: "/", ...opt, secure: true });
  } else if (opt?.prefix === "host") {
    cookie = serialize("__Host-" + name, value, {
      ...opt,
      path: "/",
      secure: true,
      domain: void 0
    });
  } else {
    cookie = serialize(name, value, { path: "/", ...opt });
  }
  return cookie;
}, "generateCookie");
var setCookie = /* @__PURE__ */ __name((c, name, value, opt) => {
  const cookie = generateCookie(name, value, opt);
  c.header("Set-Cookie", cookie, { append: true });
}, "setCookie");
var deleteCookie = /* @__PURE__ */ __name((c, name, opt) => {
  const deletedCookie = getCookie(c, name, opt?.prefix);
  setCookie(c, name, "", { ...opt, maxAge: 0 });
  return deletedCookie;
}, "deleteCookie");

// src/routes/auth.ts
var import_bcryptjs = __toESM(require_bcrypt());
var import_jsonwebtoken2 = __toESM(require_jsonwebtoken());

// src/db/client.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_client = __toESM(require_default2());
var globalForPrisma = globalThis;
var prisma = globalForPrisma.prisma ?? new import_client.PrismaClient({
  log: true ? ["query", "error", "warn"] : ["error"]
});
if (true) globalForPrisma.prisma = prisma;

// src/middleware/auth.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_jsonwebtoken = __toESM(require_jsonwebtoken());
var JWT_SECRET = process.env.JWT_SECRET || "storemap_dev_secret";
async function requireAuth(c, next) {
  const tokenCookie = getCookie(c, "token");
  const authHeader = c.req.header("Authorization");
  const bearerToken = authHeader?.replace("Bearer ", "");
  const token = tokenCookie || bearerToken;
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  try {
    const payload = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    c.set("adminId", payload.adminId);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
}
__name(requireAuth, "requireAuth");
function signToken(adminId) {
  return import_jsonwebtoken.default.sign({ adminId }, JWT_SECRET, { expiresIn: "7d" });
}
__name(signToken, "signToken");

// src/routes/auth.ts
var authRouter = new Hono2();
var JWT_SECRET2 = process.env.JWT_SECRET || "storemap_dev_secret";
authRouter.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ error: "Username and password required" }, 400);
    }
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const valid = await import_bcryptjs.default.compare(password, admin.passwordHash);
    if (!valid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    const token = signToken(admin.id);
    setCookie(c, "token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60,
      // 7 days (seconds in Hono)
      path: "/"
    });
    return c.json({ success: true, username: admin.username, token });
  } catch (err) {
    console.error("Login error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});
authRouter.post("/logout", (c) => {
  deleteCookie(c, "token", { path: "/" });
  return c.json({ success: true });
});
authRouter.get("/me", async (c) => {
  const tokenCookie = getCookie(c, "token");
  const authHeader = c.req.header("Authorization");
  const bearerToken = authHeader?.replace("Bearer ", "");
  const token = tokenCookie || bearerToken;
  if (!token) {
    return c.json({ error: "Not logged in" }, 401);
  }
  try {
    const payload = import_jsonwebtoken2.default.verify(token, JWT_SECRET2);
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, username: true }
    });
    if (!admin) {
      return c.json({ error: "Not found" }, 401);
    }
    return c.json(admin);
  } catch {
    return c.json({ error: "Invalid token" }, 401);
  }
});
var auth_default = authRouter;

// src/routes/map.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var mapRouter = new Hono2();
mapRouter.get("/", async (c) => {
  try {
    const [sections, racks, configs] = await Promise.all([
      prisma.storeSection.findMany({ orderBy: { name: "asc" } }),
      prisma.storeRack.findMany({ orderBy: { name: "asc" } }),
      prisma.storeConfig.findMany()
    ]);
    const configMap = {};
    for (const conf of configs) {
      configMap[conf.key] = conf.value;
    }
    return c.json({ sections, racks, config: configMap });
  } catch (err) {
    console.error("Map fetch error:", err);
    return c.json({ error: "Failed to load map data" }, 500);
  }
});
mapRouter.put("/sections", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const sections = body.sections;
    if (!Array.isArray(sections)) {
      return c.json({ error: "sections array required" }, 400);
    }
    const result = await prisma.$transaction(
      sections.map(
        (s) => prisma.storeSection.upsert({
          where: { id: s.id },
          update: {
            name: s.name,
            x: s.x,
            y: s.y,
            width: s.width,
            height: s.height,
            color: s.color
          },
          create: s
        })
      )
    );
    return c.json({ success: true, sections: result });
  } catch (err) {
    console.error("Section upsert error:", err);
    return c.json({ error: "Failed to save sections" }, 500);
  }
});
mapRouter.delete("/sections/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    await prisma.storeSection.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: "Section not found" }, 404);
  }
});
mapRouter.put("/racks", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const racks = body.racks;
    if (!Array.isArray(racks)) {
      return c.json({ error: "racks array required" }, 400);
    }
    const result = await prisma.$transaction(
      racks.map(
        (r) => prisma.storeRack.upsert({
          where: { id: r.id },
          update: {
            name: r.name,
            sectionId: r.sectionId,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            divisions: r.divisions,
            orientation: r.orientation
          },
          create: {
            id: r.id,
            name: r.name,
            sectionId: r.sectionId,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            divisions: r.divisions ?? 5,
            orientation: r.orientation ?? "vertical"
          }
        })
      )
    );
    return c.json({ success: true, racks: result });
  } catch (err) {
    console.error("Rack upsert error:", err);
    return c.json({ error: "Failed to save racks" }, 500);
  }
});
mapRouter.delete("/racks/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    await prisma.storeRack.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: "Rack not found" }, 404);
  }
});
mapRouter.put("/config", requireAuth, async (c) => {
  try {
    const { key, value } = await c.req.json();
    if (!key) {
      return c.json({ error: "key required" }, 400);
    }
    const result = await prisma.storeConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    return c.json(result);
  } catch (err) {
    console.error("Config update error:", err);
    return c.json({ error: "Failed to update config" }, 500);
  }
});
var map_default = mapRouter;

// src/routes/products.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var productsRouter = new Hono2();
productsRouter.get("/", async (c) => {
  try {
    const category = c.req.query("category");
    const search = c.req.query("search");
    const status = c.req.query("status");
    const products = await prisma.product.findMany({
      where: {
        ...category ? { category: String(category) } : {},
        ...status ? { status: String(status) } : {},
        ...search ? {
          OR: [
            { name: { contains: String(search), mode: "insensitive" } },
            { brand: { contains: String(search), mode: "insensitive" } },
            { category: { contains: String(search), mode: "insensitive" } }
          ]
        } : {}
      },
      include: { rack: { include: { section: true } } },
      orderBy: { name: "asc" }
    });
    return c.json(products);
  } catch (err) {
    console.error("Products fetch error:", err);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});
productsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { rack: { include: { section: true } } }
    });
    if (!product) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json(product);
  } catch (err) {
    console.error("Product fetch error:", err);
    return c.json({ error: "Failed to fetch product" }, 500);
  }
});
productsRouter.post("/", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const {
      name,
      brand,
      category,
      price,
      sku,
      status,
      imageUrl,
      floor,
      sectionName,
      aisle,
      rackId,
      rackDivision,
      locationX,
      locationY
    } = body;
    if (!name) {
      return c.json({ error: "name is required" }, 400);
    }
    const product = await prisma.product.create({
      data: {
        name,
        brand,
        category,
        price: Number(price) || 0,
        sku,
        status: status || "Available",
        imageUrl,
        floor: Number(floor) || 1,
        sectionName,
        aisle,
        rackId: rackId || null,
        rackDivision: rackDivision ? Number(rackDivision) : null,
        locationX: locationX ? Number(locationX) : null,
        locationY: locationY ? Number(locationY) : null
      }
    });
    return c.json(product, 201);
  } catch (err) {
    console.error("Product create error:", err);
    return c.json({ error: "Failed to create product" }, 500);
  }
});
productsRouter.put("/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    const body = await c.req.json();
    const {
      name,
      brand,
      category,
      price,
      sku,
      status,
      imageUrl,
      floor,
      sectionName,
      aisle,
      rackId,
      rackDivision,
      locationX,
      locationY
    } = body;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...name !== void 0 ? { name } : {},
        ...brand !== void 0 ? { brand } : {},
        ...category !== void 0 ? { category } : {},
        ...price !== void 0 ? { price: Number(price) } : {},
        ...sku !== void 0 ? { sku } : {},
        ...status !== void 0 ? { status } : {},
        ...imageUrl !== void 0 ? { imageUrl } : {},
        ...floor !== void 0 ? { floor: Number(floor) } : {},
        ...sectionName !== void 0 ? { sectionName } : {},
        ...aisle !== void 0 ? { aisle } : {},
        ...rackId !== void 0 ? { rackId: rackId || null } : {},
        ...rackDivision !== void 0 ? { rackDivision: rackDivision ? Number(rackDivision) : null } : {},
        ...locationX !== void 0 ? { locationX: locationX !== null ? Number(locationX) : null } : {},
        ...locationY !== void 0 ? { locationY: locationY !== null ? Number(locationY) : null } : {}
      }
    });
    return c.json(product);
  } catch (err) {
    console.error("Product update error:", err);
    return c.json({ error: "Failed to update product" }, 500);
  }
});
productsRouter.patch("/:id/location", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    const body = await c.req.json();
    const { rackId, rackDivision, locationX, locationY, sectionName, aisle } = body;
    const product = await prisma.product.update({
      where: { id },
      data: {
        rackId: rackId || null,
        rackDivision: rackDivision ? Number(rackDivision) : null,
        locationX: locationX !== void 0 ? Number(locationX) : void 0,
        locationY: locationY !== void 0 ? Number(locationY) : void 0,
        sectionName,
        aisle
      }
    });
    return c.json(product);
  } catch (err) {
    console.error("Location update error:", err);
    return c.json({ error: "Failed to update location" }, 500);
  }
});
productsRouter.delete("/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  try {
    await prisma.product.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: "Product not found" }, 404);
  }
});
var products_default = productsRouter;

// src/routes/upload.ts
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var uploadRouter = new Hono2();
uploadRouter.post("/", requireAuth, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"];
    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file uploaded" }, 400);
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name ? file.name.substring(file.name.lastIndexOf(".")) : ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      const { put: put2 } = await Promise.resolve().then(() => (init_dist(), dist_exports));
      const blob = await put2(filename, buffer, {
        access: "public",
        token: blobToken
      });
      return c.json({ url: blob.url });
    }
    if (typeof process !== "undefined" && process.release?.name === "node") {
      try {
        const fs = await Promise.resolve().then(() => (init_fs2(), fs_exports));
        const path = await import("node:path");
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        return c.json({ url: `/uploads/${filename}` });
      } catch (e) {
        console.warn("Local filesystem write failed:", e);
      }
    }
    const base64 = buffer.toString("base64");
    const mime = file.type || "image/jpeg";
    return c.json({ url: `data:${mime};base64,${base64}` });
  } catch (err) {
    console.error("Upload error:", err);
    return c.json({ error: "Failed to upload image" }, 500);
  }
});
var upload_default = uploadRouter;

// src/index.ts
var app = new Hono2();
app.use(
  "*",
  cors({
    origin: /* @__PURE__ */ __name((origin) => origin || "*", "origin"),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
  })
);
app.route("/api/auth", auth_default);
app.route("/api/map", map_default);
app.route("/api/products", products_default);
app.route("/api/upload", upload_default);
app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    runtime: "Hono on Cloudflare Workers",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
if (typeof process !== "undefined" && process.release?.name === "node" && !process.env.CF_WORKER) {
  Promise.resolve().then(() => (init_dist2(), dist_exports2)).then(({ serve: serve2 }) => {
    Promise.resolve().then(() => (init_serve_static(), serve_static_exports)).then(({ serveStatic: serveStatic2 }) => {
      app.use("/uploads/*", serveStatic2({ root: "./" }));
      const PORT = Number(process.env.PORT) || 4e3;
      serve2(
        {
          fetch: app.fetch,
          port: PORT
        },
        (info3) => {
          console.log(`
\u{1F525} Hono Server running on http://localhost:${info3.port}`);
          console.log(`   \u{1F4E6} API:     http://localhost:${info3.port}/api`);
          console.log(`   \u{1F5BC}  Uploads: http://localhost:${info3.port}/uploads`);
          console.log(`   \u{1F49A} Health:  http://localhost:${info3.port}/api/health
`);
        }
      );
    });
  });
}
var index_default = app;
export {
  index_default as default
};
/*! Bundled license information:

bcryptjs/dist/bcrypt.js:
  (**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@vercel/blob/dist/chunk-VMBKF2I4.js:
  (*!
   * bytes
   * Copyright(c) 2012-2014 TJ Holowaychuk
   * Copyright(c) 2015 Jed Watson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=index.js.map
