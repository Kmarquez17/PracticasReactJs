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
  console.log(noticia);
  var urlToImage = noticia.urlToImage,
      url = noticia.url,
      title = noticia.title,
      description = noticia.description,
      source = noticia.source;
  var imagen;

  if (urlToImage != "") {
    imagen = __jsx("img", {
      src: urlToImage,
      alt: title,
      className: "card-img-top",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      },
      __self: this
    });
  } else {
    imagen = __jsx("p", {
      className: "text-center my-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: this
    }, "Imagen no disponible");
  }

  return __jsx("div", {
    className: "col-md-6 col-12 mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __jsx("div", {
    className: "card",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("div", {
    className: "card-image",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, imagen), __jsx("div", {
    className: "card.body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, __jsx("h3", {
    className: "card-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, title), __jsx("p", {
    className: "card-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, description), __jsx("p", {
    className: "card-text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, source.name), __jsx("a", {
    href: url,
    target: "_blank",
    className: "btn btn-primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, " Leer Noticia"))));
};

var Noticias = function Noticias(_ref2) {
  var noticias = _ref2.noticias;
  return __jsx("div", {
    className: "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, noticias.map(function (noticia, i) {
    return __jsx(Noticia, {
      key: i,
      noticia: noticia,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Noticias);

/***/ })

})
//# sourceMappingURL=index.js.8cec902bbf5b17442d91.hot-update.js.map