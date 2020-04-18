/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([33,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var frmAnuncio_1 = __webpack_require__(34);
var component_1 = __webpack_require__(1);
var serverInfo_1 = __webpack_require__(0);
var jsonReq_1 = __webpack_require__(2);
var redirect_1 = __webpack_require__(3);
$(function () {
    var url = new redirect_1.Redirect(window);
    var api = new jsonReq_1.JsonReq(serverInfo_1.default.host, window);
    var component = new component_1.Component(ko);
    component.register("frm-lugar", frmAnuncio_1.View, function () {
        var model = new frmAnuncio_1.Model(ko, api, url);
        model.load();
        return model;
    });
    ko.applyBindings();
});


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var view_html_1 = __webpack_require__(35);
exports.View = view_html_1.default;
var model_1 = __webpack_require__(36);
exports.Model = model_1.Model;


/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form data-bind=\"submit: $data.onSave.bind($data)\" novalidate>\n\n    <div data-bind=\"if: estatus() === 0\">\n        <h2>Crear Anuncio</h2>\n        <div class=\"form-row\">\n            <div class=\"col-md-12 mb-3\">\n\n                <label>Estado</label>\n                <select class=\"form-control\" data-bind=\"options: estados,\n                       optionsText: 'nombre',\n                       optionsValue: 'id',\n                       value: estado.value,\n                       optionsCaption: 'Estado...', \n                       css: { \n                           'is-invalid': estado.hasError(),\n                           'is-valid': !estado.hasError() && estado.wasValidated() \n                       }\"></select>\n\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: estado.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n\n            </div>\n            <div class=\"col-md-12 mb-3\">\n\n                <label>Ciudad</label>\n                <select class=\"form-control\" data-bind=\"options: ciudades,\n                       optionsText: 'nombre',\n                       optionsValue: 'id',\n                       value: ciudad.value,\n                       optionsCaption: 'Ciudad...', \n                       css: { \n                           'is-invalid': ciudad.hasError(),\n                           'is-valid': !ciudad.hasError() && ciudad.wasValidated() \n                       }\"></select>\n\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: ciudad.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n\n            <div class=\"col-md-12 mb-3\">\n\n                <label>Tipo de anuncio</label>\n                <select class=\"form-control\" data-bind=\"options: tipos,\n                       optionsText: 'desc',\n                       optionsValue: 'tipo',\n                       value: tipo.value,\n                       optionsCaption: 'Tipo de anuncio...', \n                       css: { \n                           'is-invalid': tipo.hasError(),\n                           'is-valid': !tipo.hasError() && tipo.wasValidated() \n                       }\"></select>\n\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: tipo.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n\n            <h2 data-bind=\"text: tipoDesc\"></h2>\n\n            <!-- ko if: tipo.value() === 5 -->\n            <div class=\"col-md-12 mb-3\">\n                <label>Marca</label>\n                <input type=\"text\" class=\"form-control\" maxlength=\"50\" data-bind=\"\n                                css: { \n                                    'is-invalid': marca.hasError(),\n                                    'is-valid': !marca.hasError() && marca.wasValidated() \n                                },\n                                textInput: marca.value \">\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: marca.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n\n            <div class=\"col-md-12 mb-3\">\n                <label>Modelo</label>\n                <input type=\"text\" class=\"form-control\" maxlength=\"50\" data-bind=\"\n                                css: { \n                                    'is-invalid': modelo.hasError(),\n                                    'is-valid': !modelo.hasError() && modelo.wasValidated() \n                                },\n                                textInput: modelo.value \">\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: modelo.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n\n            <div class=\"col-md-12 mb-3\">\n                <label>Año (numérico)</label>\n                <input type=\"text\" class=\"form-control\" maxlength=\"4\" data-bind=\"\n                                css: { \n                                    'is-invalid': año.hasError(),\n                                    'is-valid': !año.hasError() && año.wasValidated() \n                                },\n                                textInput: año.value \">\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: año.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n            <!-- /ko -->\n\n            <div class=\"col-md-12 mb-3\">\n                <label>Anuncio</label>\n                <label data-bind=\"text: letrasRestantes() + ' letras restantes'\"></label>\n                <textarea class=\"form-control\" maxlength=\"500\" rows=\"5\" data-bind=\"\n                css: { \n                    'is-invalid': descripcion.hasError(),\n                    'is-valid': !descripcion.hasError() && descripcion.wasValidated() \n                },\n                textInput: descripcion.value\"></textarea>\n                <div class=\"invalid-feedback\">\n                    <!-- ko foreach: descripcion.errors -->\n                    <span data-bind=\"text: $data\"></span>\n                    <!-- /ko -->\n                </div>\n            </div>\n        </div>\n    </div>\n    <div data-bind=\"if: estatus() === 1\">\n        <h2>Así se verá su anuncio</h2>\n        <p>\n            Revise que todo esté en orden, que su\n            anuncio tenga sus datos de contacto y\n            que no presente información repetida.\n        </p>\n\n        <h3 data-bind=\"text: lugarSeleccionado()\"></h3>\n        <!-- ko template: { name: templateName() } -->\n        <!-- /ko -->\n    </div>\n\n    <br />\n\n    <div class=\"text-right\">\n        <button class=\"btn btn-primary\" data-bind=\"visible: estatus() === 0, click: () => estatus(1)\">Siguente</button>\n        <button class=\"btn btn-secondary\"\n            data-bind=\"visible: estatus() === 1, click: () => estatus(0)\">Anterior</button>\n        <button class=\"btn btn-primary\" data-bind=\"visible: estatus() === 1\" type=\"submit\">Publicar</button>\n    </div>\n</form>\n\n<script type=\"text/html\" id=\"date-row-template\">\n    <p class=\"card-text\">        \n        <small class=\"text-muted\" \n        data-bind=\"text: $component.formatDate.call($component.formatDate)\"></small>\n    </p>\n</script>\n\n<script type=\"text/html\" id=\"empty-row-template\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"card\">\n                <div class=\"card-body\">                  \n                  <h6 class=\"card-subtitle mb-2 text-muted\">\n                      Título\n                  </h6>\n\n                  <p class=\"card-text\">\n                      Descripción\n                  </p>\n                  <!-- ko template: { name: \"date-row-template\" } -->\n                  <!-- /ko -->\n                </div>\n            </div>\n        </div>\n    </div>\n</script>\n\n<script type=\"text/html\" id=\"default-row-template\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"card\" data-bind=\"with: getModel()\">\n                <div class=\"card-body\">\n                  <p class=\"card-text\" data-bind=\"text: descripcion\"></p>\n                  <!-- ko template: { name: \"date-row-template\" } -->\n                  <!-- /ko -->\n                </div>\n            </div>\n        </div>\n    </div>\n</script>\n\n<script type=\"text/html\" id=\"vehiculo-row-template\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <div class=\"card\" data-bind=\"with: getModel()\">\n                <div class=\"card-body\">                  \n                  <h6 class=\"card-subtitle mb-2 text-muted\" data-bind=\"text: marca + ' ' + modelo + ' ' + año\"></h6>\n\n                  <p class=\"card-text\" data-bind=\"text: descripcion\"></p>\n                  <!-- ko template: { name: \"date-row-template\" } -->\n                  <!-- /ko -->\n                </div>\n            </div>\n        </div>\n    </div>\n</script>\n\n\n<script type=\"text/html\" id=\"inmueble-row-template\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">            \n            <div class=\"card\" data-bind=\"with: getModel()\">\n                <div class=\"card-body\">                  \n                  <!-- ko if: ventaRenta === 0 && casaTerreno === 0 -->\n                    <h6 class=\"card-subtitle mb-2 text-muted\">Casa en venta</h6>\n                    <!-- /ko -->\n                    <!-- ko if: ventaRenta === 1 && casaTerreno === 0 -->\n                    <h6 class=\"card-subtitle mb-2 text-muted\">Casa en renta</h6>\n                    <!-- /ko -->\n                    <!-- ko if: ventaRenta === 0 && casaTerreno === 1 -->\n                    <h6 class=\"card-subtitle mb-2 text-muted\">Terreno en venta</h6>\n                    <!-- /ko -->\n                    <!-- ko if: ventaRenta === 1 && casaTerreno === 1 -->\n                    <h6 class=\"card-subtitle mb-2 text-muted\">Terreno en renta</h6>\n                  <!-- /ko -->\n                  <p class=\"card-text\" data-bind=\"text: descripcion\"></p>\n                  <!-- ko template: { name: \"date-row-template\" } -->\n                  <!-- /ko -->\n                </div>\n            </div>            \n        </div>\n    </div>\n</script>");

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tiposAnuncio_1 = __webpack_require__(37);
var serverInfo_1 = __webpack_require__(0);
var positiveNumber_1 = __webpack_require__(12);
var requiredString_1 = __webpack_require__(38);
var valiko_1 = __webpack_require__(8);
var inmueble_1 = __webpack_require__(39);
var AnuncioEstatus;
(function (AnuncioEstatus) {
    AnuncioEstatus[AnuncioEstatus["Editando"] = 0] = "Editando";
    AnuncioEstatus[AnuncioEstatus["Revisando"] = 1] = "Revisando";
})(AnuncioEstatus || (AnuncioEstatus = {}));
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(ko, api, url) {
        var _this = _super.call(this, ko) || this;
        _this.getSaveUrl = function () {
            var self = _this;
            switch (self.tipo.value()) {
                case tiposAnuncio_1.TipoAnuncio.Empleo:
                    return serverInfo_1.default.api.empleos.save;
                case tiposAnuncio_1.TipoAnuncio.RentaCasa:
                    return serverInfo_1.default.api.inmuebles.save;
                case tiposAnuncio_1.TipoAnuncio.RentaTerreno:
                    return serverInfo_1.default.api.inmuebles.save;
                case tiposAnuncio_1.TipoAnuncio.VentaCasa:
                    return serverInfo_1.default.api.inmuebles.save;
                case tiposAnuncio_1.TipoAnuncio.VentaTerreno:
                    return serverInfo_1.default.api.inmuebles.save;
                case tiposAnuncio_1.TipoAnuncio.Vehiculo:
                    return serverInfo_1.default.api.vehiculos.save;
                case tiposAnuncio_1.TipoAnuncio.Varios:
                    return serverInfo_1.default.api.varios.save;
                default:
                    throw new Error("Tipo no válido");
            }
        };
        _this.getRedirectUrl = function () {
            var self = _this;
            switch (self.tipo.value()) {
                case tiposAnuncio_1.TipoAnuncio.Empleo:
                    return serverInfo_1.default.web.empleos.index;
                case tiposAnuncio_1.TipoAnuncio.RentaCasa:
                    return serverInfo_1.default.web.inmuebles.index;
                case tiposAnuncio_1.TipoAnuncio.RentaTerreno:
                    return serverInfo_1.default.web.inmuebles.index;
                case tiposAnuncio_1.TipoAnuncio.VentaCasa:
                    return serverInfo_1.default.web.inmuebles.index;
                case tiposAnuncio_1.TipoAnuncio.VentaTerreno:
                    return serverInfo_1.default.web.inmuebles.index;
                case tiposAnuncio_1.TipoAnuncio.Vehiculo:
                    return serverInfo_1.default.web.vehiculos.index;
                case tiposAnuncio_1.TipoAnuncio.Varios:
                    return serverInfo_1.default.web.varios.index;
                default:
                    throw new Error("Tipo no válido");
            }
        };
        _this.getModel = function () {
            var self = _this;
            var now = new Date();
            switch (self.tipo.value()) {
                case tiposAnuncio_1.TipoAnuncio.Empleo:
                    var empleo = {
                        id: 0,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return empleo;
                case tiposAnuncio_1.TipoAnuncio.RentaCasa:
                    var rentaCasa = {
                        id: 0,
                        casaTerreno: inmueble_1.CasaTerreno.Casa,
                        ventaRenta: inmueble_1.VentaRenta.Renta,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return rentaCasa;
                case tiposAnuncio_1.TipoAnuncio.RentaTerreno:
                    var rentaTerreno = {
                        id: 0,
                        casaTerreno: inmueble_1.CasaTerreno.Terreno,
                        ventaRenta: inmueble_1.VentaRenta.Renta,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return rentaTerreno;
                case tiposAnuncio_1.TipoAnuncio.VentaCasa:
                    var ventaCasa = {
                        id: 0,
                        casaTerreno: inmueble_1.CasaTerreno.Casa,
                        ventaRenta: inmueble_1.VentaRenta.Venta,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return ventaCasa;
                case tiposAnuncio_1.TipoAnuncio.VentaTerreno:
                    var ventaTerreno = {
                        id: 0,
                        casaTerreno: inmueble_1.CasaTerreno.Terreno,
                        ventaRenta: inmueble_1.VentaRenta.Venta,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return ventaTerreno;
                case tiposAnuncio_1.TipoAnuncio.Vehiculo:
                    var vehiculo = {
                        id: 0,
                        marca: self.marca.value(),
                        modelo: self.modelo.value(),
                        año: parseInt(self.año.value().toString()),
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return vehiculo;
                case tiposAnuncio_1.TipoAnuncio.Varios:
                    var varios = {
                        id: 0,
                        fecha: now,
                        activo: true,
                        ciudadId: self.ciudad.value(),
                        descripcion: self.descripcion.value(),
                    };
                    return varios;
                default:
                    throw new Error("Tipo no válido");
            }
        };
        _this.formatDate = function () {
            var d = new Date(Date.now());
            var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiémbre", "octubre", "noviémbre", "diciembre"];
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            var strMinutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + strMinutes + ' ' + ampm;
            return d.getDate() + " de " + meses[d.getMonth()] + ", " + d.getFullYear() + ". " + strTime;
        };
        _this.indexRedirect = function () {
            var self = _this;
            var url = self.getRedirectUrl();
            self.url.navigate(url);
        };
        _this.url = url;
        _this.api = api;
        _this.estados = ko.observableArray();
        _this.descripcion = _this.add().with(new requiredString_1.RequiredString());
        _this.estado = _this.add().with(new positiveNumber_1.PositiveNumber());
        _this.ciudad = _this.add().with(new positiveNumber_1.PositiveNumber());
        _this.tipo = _this.add().with(new positiveNumber_1.PositiveNumber());
        _this.estatus = ko.observable(AnuncioEstatus.Editando);
        _this.año = _this.add();
        _this.marca = _this.add();
        _this.modelo = _this.add();
        _this.tipos = ko.observableArray([
            { tipo: tiposAnuncio_1.TipoAnuncio.VentaCasa, desc: "Venta de casa o departamento" },
            { tipo: tiposAnuncio_1.TipoAnuncio.VentaTerreno, desc: "Venta de terrenos" },
            { tipo: tiposAnuncio_1.TipoAnuncio.Vehiculo, desc: "Venta de vehículos" },
            { tipo: tiposAnuncio_1.TipoAnuncio.RentaCasa, desc: "Rentar casa o departamento" },
            { tipo: tiposAnuncio_1.TipoAnuncio.RentaTerreno, desc: "Renta de terrenos" },
            { tipo: tiposAnuncio_1.TipoAnuncio.Empleo, desc: "Oferta de empleo" },
            { tipo: tiposAnuncio_1.TipoAnuncio.Varios, desc: "Anuncio en general" },
        ]);
        var self = _this;
        _this.ciudades = ko.pureComputed(function () {
            if (self.estado.value() === -1) {
                return [];
            }
            var e = ko.utils.arrayFirst(self.estados(), function (e) {
                return e.id === self.estado.value();
            });
            if (e === null || e === undefined || e.ciudades === null || e.ciudades === undefined) {
                return [];
            }
            return e.ciudades;
        }, self);
        _this.letrasRestantes = ko.pureComputed(function () {
            var maxSize = 500;
            if (self.descripcion.value() === null || self.descripcion.value() === undefined) {
                return maxSize;
            }
            return maxSize - self.descripcion.value().length;
        }, self);
        _this.tipoDesc = ko.pureComputed(function () {
            var maxSize = 500;
            if (self.tipo.value() === null || self.tipo.value() === undefined) {
                return "";
            }
            return self.ko.utils.arrayFirst(self.tipos(), function (t) {
                return t.tipo === self.tipo.value();
            }).desc;
        }, self);
        _this.templateName = ko.pureComputed(function () {
            switch (self.tipo.value()) {
                case tiposAnuncio_1.TipoAnuncio.Empleo:
                    return "default-row-template";
                case tiposAnuncio_1.TipoAnuncio.RentaCasa:
                    return "inmueble-row-template";
                case tiposAnuncio_1.TipoAnuncio.RentaTerreno:
                    return "inmueble-row-template";
                case tiposAnuncio_1.TipoAnuncio.VentaCasa:
                    return "inmueble-row-template";
                case tiposAnuncio_1.TipoAnuncio.VentaTerreno:
                    return "inmueble-row-template";
                case tiposAnuncio_1.TipoAnuncio.Vehiculo:
                    return "vehiculo-row-template";
                case tiposAnuncio_1.TipoAnuncio.Varios:
                    return "default-row-template";
                default:
                    return "empty-row-template";
            }
        }, self);
        _this.lugarSeleccionado = ko.pureComputed(function () {
            if (self.estado.value() === null || self.estado.value() === undefined ||
                self.ciudad.value() === null || self.ciudad.value() === undefined ||
                self.estado.value() <= 0 || self.ciudad.value() <= 0)
                return "";
            var e = ko.utils.arrayFilter(self.estados(), function (it) {
                return it.id === self.estado.value();
            });
            if (e.length !== 1) {
                return "";
            }
            var c = ko.utils.arrayFilter(e[0].ciudades, function (it) {
                return it.id === self.ciudad.value();
            });
            if (c.length !== 1) {
                return "";
            }
            return c[0].nombre + ", " + e[0].nombre + ".";
        }, self);
        return _this;
    }
    Model.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, url, items, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        url = serverInfo_1.default.api.lugares.getAll;
                        return [4 /*yield*/, this.api.get(url)];
                    case 1:
                        items = _a.sent();
                        self.estados(items);
                        url = "" + serverInfo_1.default.api.lugares.base;
                        return [4 /*yield*/, self.api.get(url)];
                    case 2:
                        model = _a.sent();
                        if (model.hasValue) {
                            self.estado.value(model.estado.id);
                            self.ciudad.value(model.ciudad.id);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Model.prototype.onSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, isValid, url, model;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (self.tipo.value() === tiposAnuncio_1.TipoAnuncio.Vehiculo) {
                            self.año.rules.push(new positiveNumber_1.PositiveNumber());
                            self.marca.rules.push(new requiredString_1.RequiredString());
                            self.modelo.rules.push(new requiredString_1.RequiredString());
                        }
                        else {
                            self.año.rules = [];
                            self.marca.rules = [];
                            self.modelo.rules = [];
                        }
                        return [4 /*yield*/, self.validate()];
                    case 1:
                        isValid = _a.sent();
                        if (isValid === false)
                            return [2 /*return*/];
                        url = self.getSaveUrl();
                        model = self.getModel();
                        return [4 /*yield*/, this.api.post("" + url, model)];
                    case 2:
                        _a.sent();
                        // Guardar lugar
                        url = serverInfo_1.default.api.lugares.save;
                        return [4 /*yield*/, this.api.post(url + "/" + self.ciudad.value(), {})];
                    case 3:
                        _a.sent();
                        self.indexRedirect();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Model;
}(valiko_1.ObsFrm));
exports.Model = Model;


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TipoAnuncio;
(function (TipoAnuncio) {
    TipoAnuncio[TipoAnuncio["Empleo"] = 0] = "Empleo";
    TipoAnuncio[TipoAnuncio["VentaCasa"] = 1] = "VentaCasa";
    TipoAnuncio[TipoAnuncio["VentaTerreno"] = 2] = "VentaTerreno";
    TipoAnuncio[TipoAnuncio["RentaCasa"] = 3] = "RentaCasa";
    TipoAnuncio[TipoAnuncio["RentaTerreno"] = 4] = "RentaTerreno";
    TipoAnuncio[TipoAnuncio["Vehiculo"] = 5] = "Vehiculo";
    TipoAnuncio[TipoAnuncio["Varios"] = 6] = "Varios";
})(TipoAnuncio = exports.TipoAnuncio || (exports.TipoAnuncio = {}));


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var valiko_1 = __webpack_require__(8);
var RequiredString = /** @class */ (function (_super) {
    __extends(RequiredString, _super);
    function RequiredString(msg) {
        if (msg === void 0) { msg = "Requerido"; }
        return _super.call(this, msg) || this;
    }
    RequiredString.prototype.check = function (value) {
        var self = this;
        if (value === null || value === undefined || value.length === 0) {
            return self.toNotValid();
        }
        return self.toValid();
    };
    return RequiredString;
}(valiko_1.RuleBase));
exports.RequiredString = RequiredString;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VentaRenta;
(function (VentaRenta) {
    VentaRenta[VentaRenta["Venta"] = 0] = "Venta";
    VentaRenta[VentaRenta["Renta"] = 1] = "Renta";
})(VentaRenta = exports.VentaRenta || (exports.VentaRenta = {}));
;
var CasaTerreno;
(function (CasaTerreno) {
    CasaTerreno[CasaTerreno["Casa"] = 0] = "Casa";
    CasaTerreno[CasaTerreno["Terreno"] = 1] = "Terreno";
})(CasaTerreno = exports.CasaTerreno || (exports.CasaTerreno = {}));
;


/***/ })

/******/ });