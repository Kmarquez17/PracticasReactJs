webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/Noticias.js":
/*!********************************!*\
  !*** ./components/Noticias.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "C:\\Users\\KMARQUEZ\\Desktop\\Cursos_Practicas\\Curso_React_udemy\\bitcoinapp\\components\\Noticias.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

var Noticia = function Noticia(_ref) {
  var noticia = _ref.noticia;
  var urlToImagen = noticia.urlToImagen,
      url = noticia.url,
      title = noticia.title,
      description = noticia.description,
      source = noticia.source;
  var imagen;

  if (urlToImagen != "") {
    imagen = __jsx("img", {
      src: urlToImagen,
      alt: title,
      className: "card-img-top",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    });
  }

  return __jsx("div", {
    className: "col-md-6 col-12 mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx("div", {
    className: "card",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __jsx("div", {
    className: "card-image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, imagen)));
};

var Noticias = function Noticias(_ref2) {
  var noticias = _ref2.noticias;
  return __jsx("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, noticias.map(function (noticia, i) {
    return __jsx(Noticia, {
      key: i,
      noticia: noticia,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Noticias);

/***/ })

})
//# sourceMappingURL=index.js.2f467b8dcebc7f04ef08.hot-update.js.map