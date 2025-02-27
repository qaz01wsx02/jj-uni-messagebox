(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/index.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _toast = _interopRequireDefault(__webpack_require__(/*! ./toast.js */ 12));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./alert.js */ 26));
var _loading = _interopRequireDefault(__webpack_require__(/*! ./loading.js */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import Vue from 'vue'

var installPlugin = function installPlugin(Vue, appUrl) {
  Vue.prototype.$jj_loading = _loading.default;
  Vue.prototype.$jj_alert = _alert.default;
  Vue.prototype.$jj_toast = _toast.default;
  Vue.prototype.jj_app_message_url = appUrl || '';
};var _default =

installPlugin;exports.default = _default;

/***/ }),

/***/ 12:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/toast.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _constant = __webpack_require__(/*! ./constant.js */ 13);
var _ref = __webpack_require__(/*! ./ref.js */ 14);
var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 15));

var _jjToast = _interopRequireDefault(__webpack_require__(/*! ../toast/jj-toast.vue */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjToast = _vue.default.extend(_jjToast.default); //创建vm实例的构造函数
var jj_toast_instance = null;

var getData = function getData(toastData, type, duration) {
  var data = {};
  var isToastDataNull = toastData === undefined || toastData === null;
  var isTypeNull = type === undefined || type === null;
  var isDurationNull = duration === undefined || duration === null;
  if (isToastDataNull && isTypeNull && isDurationNull) {
    return {};
  } else {
    if (!isToastDataNull) {
      if (toastData.constructor === Object) {
        data = _objectSpread({},
        toastData);

        return data;
      } else {
        data['message'] = toastData + '';
      }
    }

    if (!isTypeNull) {
      data['type'] = type + '';
    }
    if (!isDurationNull) {
      if (duration.constructor === Number) {
        data["duration"] = duration;
      }
    }
  }
  return data;
};


var jj_toast = function jj_toast(toastData, type, duration) {
  var data = getData(toastData, type, duration);
  var obj = (0, _processor.default)(_constant.kToast);
  obj.processDataFun = getData;






  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showToastApp_MP(data);
  });








  return obj;
};

var showToastH5 = function showToastH5(data) {
  var isClose = data['isClose'] || false;
  if (jj_toast_instance !== null) {
    if (jj_toast_instance.jj_time !== null) {
      clearTimeout(jj_toast_instance.jj_time);
      jj_toast_instance.jj_time = null;
    }
    jj_toast_instance.close();
    jj_toast_instance.$el.remove();
    jj_toast_instance = null;
  }

  if (isClose) {
    return;
  }
  var instance = new jjToast({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_toast_instance = instance;
};

var showToastApp_MP = function showToastApp_MP(data) {
  var toast = (0, _ref.getRef)(_constant.kToast);
  if (toast !== undefined) {
    if (toast.jj_time !== null) {
      clearTimeout(toast.jj_time);
      toast.jj_time = null;
    }
    toast.isShow = false;
    var isClose = data['isClose'] || false;
    if (isClose) {
      toast.close();
      return null;
    }
    toast.show(data);
    return toast;
  }
  return null;
};var _default =

jj_toast;exports.default = _default;

/***/ }),

/***/ 122:
/*!***********************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/static/bg_custom_update.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 13:
/*!**************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/constant.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.kLoading = exports.kAlert = exports.kToast = void 0;
var kToast = "jj_toast";exports.kToast = kToast;
var kAlert = 'jj_alert';exports.kAlert = kAlert;
var kLoading = 'jj_loading';exports.kLoading = kLoading;

/***/ }),

/***/ 14:
/*!*********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/ref.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getRefList = exports.removeRefObj = exports.addRefObj = exports.getRef = exports.showMessageBox = exports.isShowAppMessageView = exports.currentPageRoute = exports.refRouteKey = exports.refMessageObj = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var appShowing = false;
var appShowFnList = [];

var refMessageObj = function refMessageObj() {
  var obj = _vue.default.prototype.$jj_refMessageObj;
  if (obj !== undefined) {
    return obj;
  }
  _vue.default.prototype.$jj_refMessageObj = {};
  return _vue.default.prototype.$jj_refMessageObj;
};exports.refMessageObj = refMessageObj;

var currentPageRoute = function currentPageRoute() {
  var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  //H5 页面刷新后，返回上一页，会返回空数组
  if (routes.length === 0) {
    return '';
  }
  var curRoute = routes[routes.length - 1].route;
  return curRoute;
};exports.currentPageRoute = currentPageRoute;

var refRouteKey = function refRouteKey() {
  var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  //H5 页面刷新后，返回上一页，会返回空数组
  if (routes.length === 0) {
    return '';
  }
  var index = routes.length - 1;
  var rKey = routes[index].route + '/' + index;
  return rKey;
};exports.refRouteKey = refRouteKey;

var isShowAppMessageView = function isShowAppMessageView() {
  var curRoute = currentPageRoute();
  var url = _vue.default.prototype.jj_app_message_url;
  if (url.indexOf(curRoute) === -1) {
    return false;
  } else {
    return true;
  }
};exports.isShowAppMessageView = isShowAppMessageView;

var showMessageBox = function showMessageBox(showFn) {









  showFn();

};exports.showMessageBox = showMessageBox;

var appShowMessageBox = function appShowMessageBox(showFn) {
  var url = _vue.default.prototype.jj_app_message_url || '';

  if (url.length > 0) {
    if (appShowing) {
      //说明进入页面跳转，但是页面并没有挂载完成，需要放入队列中缓存起来
      appShowFnList.push(showFn);
      return;
    }
    // console.log(appShowFnList)
    var isShowAppView = isShowAppMessageView();
    if (!isShowAppView) {
      //标记页面跳转
      appShowing = true;
      uni.navigateTo({
        url: _vue.default.prototype.jj_app_message_url,
        animationType: 'none',
        animationDuration: 0,
        success: function success() {
          //页面已经加载完成，显示弹框
          appShowFn(showFn);
        },
        fail: function fail() {
          appShowing = false;
        } });

      return;
    }
  }
  appShowFn(showFn);
};
//循环调用，显示队列里面的方法
var appShowFn = function appShowFn(showFn) {
  showFn();
  appShowing = false;
  if (appShowFnList.length > 0) {
    var fn = appShowFnList[0];
    //删除数组中的第一个元素
    appShowFnList.splice(0, 1);
    appShowFn(fn);
  }
};

var getRef = function getRef(refId) {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    var ref = currentObj[refId];
    if (ref !== undefined) {
      return ref;
    }
  }
  return currentObj;
};exports.getRef = getRef;

var addRefObj = function addRefObj(refId, ref) {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    currentObj[refId] = ref;
  } else {
    var obj = {};
    obj[refId] = ref;
    refObj[refKey] = obj;
  }
};exports.addRefObj = addRefObj;

var removeRefObj = function removeRefObj() {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    delete refObj[refKey];
  }
};exports.removeRefObj = removeRefObj;

var getRefList = function getRefList() {
  var refList = [];
  var refKey = refRouteKey();

  var currentObj = refMessageObj()[refKey];
  if (currentObj !== undefined) {
    var refObj = refMessageObj()[refKey];
    for (var key in refObj) {
      refList.push(refObj[key]);
    }
  }
  return refList;
};exports.getRefList = getRefList;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!***************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/processor.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constant = __webpack_require__(/*! ./constant.js */ 13);





var processorObj = function processorObj(type) {
  var appDuration = 300;
  var obj = new Object();
  obj.type = type;
  obj.isClose = false;
  obj.messageObj = null;
  obj.processDataFun = null;
  obj.close = function () {
    if (obj.isClose) {
      return;
    }
    if (obj.messageObj !== null) {
      removeData();
    } else {





    }
  };
  var closeApp = function closeApp() {
    setTimeout(function () {
      if (obj.messageObj !== null) {
        removeData();
      }
    }, appDuration);
  };

  var removeData = function removeData() {
    obj.isClose = true;
    obj.messageObj.close();
    obj.messageObj = null;
  };

  obj.update = function (param1, param2, param3) {
    if (obj.isClose) {
      return;
    }
    if (obj.processDataFun !== null) {
      if (obj.messageObj !== null) {
        updateData(param1, param2, param3);
      } else {





      }

    }
  };

  var updateApp = function updateApp(param1, param2, param3) {
    setTimeout(function () {
      if (obj.messageObj !== null) {
        updateData(param1, param2, param3);
      }
    }, appDuration);
  };

  var updateData = function updateData(param1, param2, param3) {

    var data = {};
    if (obj.type === _constant.kAlert) {
      data = obj.processDataFun(param1, param2, param3);
    } else if (obj.type === _constant.kLoading) {
      data = obj.processDataFun(param1);
    } else if (obj.type === _constant.kToast) {
      data = obj.processDataFun(param1, param2, param3);
    } else {
      return;
    }
    obj.messageObj.update(data);
  };

  return obj;
};var _default =

processorObj;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 21:
/*!**************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/success_icon.png ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 22:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/fail_icon.png ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 23:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/warn_icon.png ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 26:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/alert.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _constant = __webpack_require__(/*! ./constant.js */ 13);


var _ref = __webpack_require__(/*! ./ref.js */ 14);




var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 15));

var _jjAlert = _interopRequireDefault(__webpack_require__(/*! ../alert/jj-alert.vue */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjAlert = _vue.default.extend(_jjAlert.default); //创建vm实例的构造函数
var jj_alert_instance = null;

var jj_alert = function jj_alert(alertData, message, btnTitle) {

  var data = getData(alertData, message, btnTitle);
  var obj = (0, _processor.default)(_constant.kAlert);
  obj.processDataFun = getData;






  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showAlertApp_MP(data);
  });








  return obj;
};

var showAlertApp_MP = function showAlertApp_MP(data) {
  var alert = (0, _ref.getRef)(_constant.kAlert);
  if (alert !== undefined) {

    var isClose = data['isClose'] || false;
    if (isClose) {
      alert.isCloseAlert = false;
      alert.isShow = false;
      alert.close();
      return null;
    }
    var priority = data['priority'] || 0;
    var alertPriority = alert.priority;

    if (alertPriority > priority && alert.isShow) {
      //比较已有弹窗的优先级，如果已经展示的弹窗的优先级比较高，就不往下执行
      return;
    }
    alert.isCloseAlert = false;
    alert.isShow = false;
    alert.show(data);
    return alert;
  }
  return null;
};

var showAlertH5 = function showAlertH5(data) {
  var isClose = data['isClose'] || false;
  if (jj_alert_instance !== null) {
    var priority = data['priority'] || 0;
    var alertPriority = jj_alert_instance.priority;
    if (alertPriority > priority && jj_alert_instance.isShow) {
      //比较已有弹窗的优先级，如果已经展示的弹窗的优先级比较高，就不往下执行
      return;
    }
    jj_alert_instance.close();
    jj_alert_instance.$el.remove();
    jj_alert_instance = null;

  }
  if (isClose) {
    return;
  }
  var instance = new jjAlert({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_alert_instance = instance;
};

var getData = function getData(alertData, message, btnTitle) {
  var data = {};
  var isAlertDataNull = alertData === undefined || alertData === null;
  var isMessageNull = message === undefined || message === null;
  var isBtnTitileNull = btnTitle === undefined || btnTitle === null;
  if (isAlertDataNull && isMessageNull && isBtnTitileNull) {
    return {};
  } else {
    if (!isAlertDataNull) {
      if (alertData.constructor === Object) {
        data = _objectSpread({},
        alertData);

        return data;
      } else {
        data['title'] = alertData + '';
      }
    }

    if (!isMessageNull) {
      data['message'] = message + '';
    }
    if (!isBtnTitileNull) {
      data['btns'] = [{
        'title': btnTitle }];

    }

  }
  return data;
};var _default =

jj_alert;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 32:
/*!***************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/jj_close_icon.png ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAv5JREFUeF7tm0uS0zAQQFv2RYDZ8FnFTo4BS2DHNVjBFCuuwQ5YwtwiVrLiswHmIrYoTcUuJVEitdStSJlklaro0++pJdmOJeCef8Qu/2KxeLRcLv+eoxcb2ySgaZr3QojnANAKIb70ff9hvV7/PAcRs9nsaV3X75RSrwBAKqVuVqvVtWabBLRt+w8AHhjAP4ZheFm6BA1fVdVXAHhmsN1KKR9OAnRqDMPwxzLaRUs4AH+HWVXVlZ7qUwbM5/PPmxTZ9VCkhGPweop3Xfd6awocqwAARUnAsGztApiKuS6OWIa9bRDbQE4iQmLfE6CBQho6tYjQmK0CSpMQCr+1CNpGMKbhVBkRG+PBDBgBYjvgFEERm1NArtOBAt45BczRo+qQIiMoY/HKgJymAyU8KgNykEANHyTgVGsCB3ywgNQSuOCjBKSSwAkfLYBbAjc8iQAuCSngyQRQS0gFTyqASkJKeHIBsRJSw7MICJVwCng2AVgJp4JnFeArQZezPLcfr7zZH8aiboZC7uRco7tp0/zTIhk8ewZ43kDZvLKP/NgpewYESEgGnywDEBKSwl8EmP8OhyxwmDqOxdBsKmkWJFkDEPBJd4AkU+Beb4MueP0CxtleCPnAj2+fYMpi1h2fsixrQAhQSB0fQFcZcgExIDF1XaCHficVQAFA0QZGBpkAysAp23LJIBHAETBHmzYZ0QI4A+Vsm+RuMEWA3H0EZwB3YGa6cvYVJIAzoEOLFlefaAFcgbhWa/07R98oARwB+IBzTgdvATnAez5ZQj1P8BKQEzy1BKeAHOEpJRwVkDM8lYTLq7K2VbiEkd+NOzTmy+vynHssdo+nKI/NhCkDsBUpguVqA8NiHpr6ppTS5wZ3P6gLCy4obLvHJAghvndd90K3eSegbdvHAPDrXOA9t8gnUsrf5sHJTrswJBQ58p67g5RSzqcM0F+aprkWQrzRp0d1ivR9/7b0U6NmJtR1/XEzxW+VUp/2js6OhfV00KmBnXMllLexOe8FSgCLifE/KM7xbmzAXMcAAAAASUVORK5CYII="

/***/ }),

/***/ 35:
/*!*************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/loading.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _constant = __webpack_require__(/*! ./constant.js */ 13);
var _ref = __webpack_require__(/*! ./ref.js */ 14);
var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 15));

var _jjLoading = _interopRequireDefault(__webpack_require__(/*! ../loading/jj-loading.vue */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjLoading = _vue.default.extend(_jjLoading.default); //创建vm实例的构造函数
var jj_loading_instance = null;

var getLoadingData = function getLoadingData(loadingData) {
  var data = {};
  if (loadingData === undefined || loadingData === null) {

  } else {
    if (loadingData.constructor === Object) {
      data = _objectSpread({},
      loadingData);

    } else {
      data = {
        "message": loadingData + '' };

    }
  }
  return data;
};

var jj_loading = function jj_loading(loadingData) {
  var data = getLoadingData(loadingData);
  var obj = (0, _processor.default)(_constant.kLoading);
  obj.processDataFun = getLoadingData;






  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showLoadingApp_MP(data);
  });








  return obj;
};

var showLoadingH5 = function showLoadingH5(data) {
  var isClose = data['isClose'] || false;
  if (jj_loading_instance !== null) {
    jj_loading_instance.close();
    jj_loading_instance.$el.remove();
    jj_loading_instance = null;

  }
  if (isClose) {
    return;
  }
  var instance = new jjLoading({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_loading_instance = instance;
};

var showLoadingApp_MP = function showLoadingApp_MP(data) {
  var loading = (0, _ref.getRef)(_constant.kLoading);
  if (loading !== undefined) {
    loading.isShow = false;
    var isClose = data['isClose'] || false;
    if (isClose) {
      loading.close();
      return null;
    }
    loading.show(data);
    return loading;
  }
  return null;
};var _default =




jj_loading;exports.default = _default;

/***/ }),

/***/ 4:
/*!******************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages.json ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 41:
/*!***********************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/jj_loading_round_icon.png ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA/NJREFUeF7tm0uolVUUx3//WYNmQqSRg4xwYAOFbGIDyxqYD5w6ieyhKUWoZBg2sIcvdKCoJZYQRdCggSniMygnJuigiYoGvdCKZg2crViyjyz3+c7r3nO959vfXbD5Lud893z7/zv7sdba64iGmxqunykAUyNgkgmYmQF/hvYP4O2kpB8nunuTPgUSgE46fwe+Bk5JOjsRMEYdQNR8DfgSOCDp32HBqBOAluYbDiGBuD1eEKMA4GFgOuDXVnsO8NbNfk4QPhkPhEkH0KnzZuZQlgJL0rXTrYckrR4rhJEFEAWZ2Vzg5dQerBB7RtLzY4FQCwAtYWb2eIKwKk2XqPkXSbMGhVArAAHEbOAL4KlcsKSBNA1086B0J/p+MzsHLMyec1HS/H6fXWsALtLMPk/TImp2X2FdPxBqDyBB2AG8kwneIendXhCKAJAgHAZeyQS/Iamrn1AMgAThGPBigODO0nxJHT3G0gD4NukRpHuULdsgaU+nqVAUgDQKPgI2B8EeOzzdKYAqEYCPgstA9Bjfl/RB1SgoDkAaBXuBN+MokORg2qxUAB47XMrULpd0tM1z7LVP1vV9MzsJvBD6f1jSa00CsBHYFQTflDSjSQBmAr9mghflucUi14CWaDNzn2BBgPCxpPcilNIBeCywLQg+IslzCXetdAArga+C3hOSFjcJwLNAPE+4LGlekwDMATwgatktSZ5sbcwUeAj46x7BWcqsbQ2oOKqaLulWXR2iXv2uAvAH8Ej4x3mSPLgo0qoAXPAkQlC7WNKJItVDe4GEmX0LrAiCV0k60iQAnwKvB8GbJUVnoigWVVPgQyC6i2clLSpKdbdt0MyeAX7IBM+QdLNECJWusJn9BjwaBK+WdKhJAPKDhu8kLWsSAC9OOJMJLtIf6BgNmtlV4IkAYZ+kt0obBd0AbAG2BsH/AXMlXS8JQjcA0wD3CmPRQVtGpe4wuiZEzGw9sDuI9KBooaQrdRfe6n8vAA8APwFPBsEDFSCMOqieKTEzWwMczIR8L8mzLbW3ngBcoZnl8YG/3JZgrCONvgAkCKeBPCbYKWlTHYX3tQbkwszMj5ofy17/TNKrdYXQ9whoCexQ3X0ceLuOPsLAANJ08J0hr9HzLdIrtnxtqI2zNCYACcJ+YG3F0HeP0TNIDmLkc4ljBpAgbAe6LYKnAF88v5HkIfbI2bgAJAjuJ/hIiM5SldDzgK8VDsKny9/eJPl10mzcABIE9xgdgreBCpYHre0dNqmhAAg7hAdQDuGlfkEUBSB+O2bmGST/wYMXLt5zHhfvKxZABsMzTB47xJ/G3Pm7EQCGPW+H+XlDXQOG2bH79VlTAO4X6VF9zv/xIy5QSa7r/AAAAABJRU5ErkJggg=="

/***/ }),

/***/ 42:
/*!************************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/jj_loading_taichi_icon.png ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABL1JREFUeF7tm41RFTEQgHcrECtQKlArECpQKxArECtQKlAqECtAKxAqECoQK1ArWOd7s8fkxfzcXe4evIPMMLyZ95LLfrvZbDZ7Kne86R2XX+4BtFqAme2IyBMR4f+lql4NHdPMnorIg7Cfqp4PHWfM75sswMwOROSjC989/5Oqvhs6GQcJiD0ReelQgXkhImcicq6qfJ60jQLgk0VwAKTaG1U9aZmpmT12EIci8sjHAgjjfhljaan5DAbgwn8XEbSVa2gLTU7SzIyxPojI82BAQBy1ghgEoKfwzBFfUAI0CowvOUB0FsE4gHinqn/GDNobgAv/Q0QwzVr7pqqs48mbz+OTiLwOBkf4D6p6PPSBvQAM0Hz3/GdzOKxQOLeGz5HAX0UE/9PbGvoCYM33WdO/RORQVZnI7M23T3aIcAvFUb7qq4AqADNjzb2vSIPgmGCT5x9DLAMBC9jvA6EIwL0v2i811h3C9za7MYKW+rRAyALo4fT+sk+rKiZ44y2jrKollACUTP/ShR8c9s5JyswImgjQwgaE3ZyFJgG49n9GIW43KMLv3aTJV5YDFhkGTPz8QlWfpfrlALDPvk10uNXCM18PoVFe3Igaseq19h+Agvbx9E9vq+ZDqQo7FzvDms9KAUitI8afPbiZyj+4EvFPa0fs1FJIASDcjeN4Ym2Wxda0ghWsnVTXAPh+CoCwTXqy2xTBgi+4UtXdbh4xgJT5/7duNiVE63PMLLUjMOy1FcQA4g4kHnJJj9b5zd4/Exfw3DNV3edDDMCiWW2N40vRLCwDfk5wdHUNILH+Z0lqzK726AFmRiQY7wb86lhVD0MAHHfDg09zXm/TwmasIOcHVtFhCCCO/VcmchuEaJmDmeWiWoZ9mAOwCPNHwko+41UOwGp9tJC/LX0rAI5yAEgpbSStNTeoCoDzHICtDX5ioBUAF0kAqlrNFc6tuanGr+U07wF0pM2Mi4zTVXi4LAuI45vQuC6TkeCSAPhWmAuG9pNngQUCoHaBQI+DHWExqT0ucM6Sp8GlASg51BjAKhy+ywBIhZERWkwcUNtOUzlBDkA3cs9Xm+wc36cAsAx2lnIWqEFLAaAA4jR3k1IbcNu+z90Mcc3NMtj6fEBNITkAqwqtbbsLqAmb+r50O3xwEwUPY4Ro6VOrD8AZLnoZLObYm7MC7glLF7qLBsAJt5bZWiwAL6PjHrBYwrNIAC48tQzVxO7iAATltL2KORYFwMwo6znyGqZepfXNAPxO8YVXX3xr2ZPH9vWKEMpmSesNutIbDSBTP0zMwAQ2Vjvo9YEIT/Q6SPhV/rOBOueFsGI7HGqSWv7S3Pzqm5rArip9sPCjAbj2f/eANzkIX3Ks9bBwY5TwLQAwt1QtXo4J12z8UW80OLR2beNnEDos4KJcl6LNXg5v0GGopt1C4UGtK5PlDxA5X0EWF0EBTV4/9ZIGDpcDW1ORdosPQBvxCws14af4ftJ3EkYD8AsHIi1SaKkSlCmEDcfA3Cl24LW8Jq2HgzYB6Aby6AsYvEA5dUPjCH4ypeDdJCcBEIDo3vVja4ortoeA4eZm5ThbHFyfB04KIH6gByk4M5xa6Z0jnCJmTf3exoKo0dtgH7Lb8pt/aqP/srUKsSAAAAAASUVORK5CYII="

/***/ }),

/***/ 43:
/*!*****************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/jj_loading_icon.png ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAw9JREFUeF7tm7uKFUEQhv8/EENBREEQDAQDL5FgYGJk4gUDXfAFTBbFxFh9AkF0wVdwEQNFMFLB1ETZTc1UWBF8gl9KZqAd5xz7Umdm9pzubNkzdfmqunpmqoZY8cUV9x8VQM2AkQhIug/gGoAdAO9J2t+Dr9G2gKS3AM43Hm+RPDm498B4NUCSQodJjhKMUZSa4xVAzYC6BXZvDWiOsIckf+VWbs8aIGk/gNs5R2lyEQwM/wrgDsnNHAheACRdB7AB4IDZkXqaJAFoIn+v4/BaDgQPAI3zzzr2PEjJhFQA+wBsAzhcCqEUwAznfwA4TvJnbFYmAWjOb0u5LnX7V1ImlACY4XyyDX+2TCyp8HceBuTeCnvo/usONAeARybkPAx5O5+dAS20RRg0KyCL0pW1BSK3w2WSr3IzrKPjHIAPPbKS6k6fLcUA5myH1yQvOgF4AeBq6cmzMAAzICSdx/NA9dx/FEe+1eeSAUFNOAvgFoBvJO96RD+Q/QjAXgCPSX72ku0KwMuoIeVUAEPSnqKumgFTjMqQNtUMGJL2FHX9kwHBQ8qJSIPfjdHZ8bKzD0DYsYlkgME7O53H6Ww7K4AuOq/Uig1J7u+87KynQG4EluW6mgHLEslcP2oG5JJblutqBnhHUpL1Dq1H6Tr0JMnmiW5M+pWYJGuZWevM1kuSVzwAS7pk8gJZ03spKukNgAuBkTskDzoBeArgZkeWCwSXGiDpO4BDHQM3SK47ATgF4FOPrGIIRQAkWbvcBh33dIzbJLnm4XwrY3KtMUlHANj7eYMQrijnd3VzVJJNddqe7w5KRDlvtHZte1zSaQDPARzLiXyQ0tlTYp7bIbkGdI661p/oyHsAaDJo1qTKGZIfY+tPDoAvAI4GCpKdbxzIzoD/FMZ1kjY1FrVyAIRncpbzXgCCTGjH5LaaWSUb5IpayQACpdYB7htaiFJcMiTVVdAOSgJ4QtKO5eiVBSBa+pwfegIosacCKKFXcm3NgPq9QP1eYOU/mlrtz+ZKCqjntaMdg55OlMiqAEroLcO1vwEXP5hQQ2kdjgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 65:
/*!************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/static/background_image.jpeg ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/background_image.jpeg";

/***/ }),

/***/ 66:
/*!*********************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/static/loading_custom.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 67:
/*!***********************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/static/logo.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAAEi6oPRAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxNTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxNDdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCN0M3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCN0Q3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BZZ+3AAAB1ElEQVR42mJkAALtmZb/GfAAJkIKwIoYiAA4FV1JO0Ylk0hWxILLHTgV6cyywqoIIIAYiQinb8S4iYs036E7esgEJq6ABAGAACImMBmo5m6yDcLlR5gcNnnaumhADWIhJoOTbRC+9ILPa9+o4TWAAAIlyDVAOphCc1SYqGAICNwZxumIidi8NILz2qhBdCyPaOcicgq1wRnYAAFErRKSgZo+GzSOoWpQD1sHsRCjCDnzkpp90DM+If2jUTbqoFEHjZZDpJYroyFESeNmNFHTykEqg8g9bwACCNRiVAYyLgEx1wA7Zu3V9OMhVBt1opajBlsaCh7NZaMOGnXQgFeupHZjKO1CjUbZqINGHTTqoFEHjTpo1EGjDhqMgw342kejUTaahggpoOdg1WiUjTpoODoIvL7tzSBykB5AgPbtGIdBGIYCaBR16swROEQvzT06cxjm1lRFDC0LcpXC+xJzpIdJhOW8e4z359MVWSde1C32xRYasC0mCmascDZzrQz+7NgABAgQINnRY/iUrb5D9v9l9toqCBAgQIAAAQIESAABAgQIEKCD5ZK9QPaMigoCdIJP7NdjOyoIECBAgGQBGjB8zVDjam153T0OqInJbBAWfdg8AExKZVcA71uIAAAAAElFTkSuQmCC"

/***/ }),

/***/ 70:
/*!*****************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/mine/request.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _loading = _interopRequireDefault(__webpack_require__(/*! ../components/jj-messagebox/messageView/loading.js */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var requsetUserInfo = function requsetUserInfo() {
  //引入文件方式调用
  var load = (0, _loading.default)();
  setTimeout(function () {
    load.close();
    //使用单例方法调用
    _vue.default.prototype.$jj_toast('成功获取用户信息。。。。。。哈哈😄😄');
  }, 3000);
};var _default =

requsetUserInfo;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map