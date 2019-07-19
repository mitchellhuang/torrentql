webpackHotUpdate("static/development/pages/torrents/[torrentId].js",{

/***/ "./pages/torrents/[torrentId].tsx":
/*!****************************************!*\
  !*** ./pages/torrents/[torrentId].tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_withAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/withAuth */ "./lib/withAuth.tsx");
/* harmony import */ var react_apollo_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-apollo-hooks */ "./node_modules/react-apollo-hooks/es/index.js");
/* harmony import */ var _apollo_queries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../apollo/queries */ "./apollo/queries.ts");
/* harmony import */ var _torrents__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../torrents */ "./pages/torrents.tsx");
/* harmony import */ var _layouts_Main__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../layouts/Main */ "./layouts/Main.tsx");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");













var Torrent = function Torrent() {
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();

  var _useQuery = Object(react_apollo_hooks__WEBPACK_IMPORTED_MODULE_6__["useQuery"])(_apollo_queries__WEBPACK_IMPORTED_MODULE_7__["GET_TORRENT_QUERY"], {
    ssr: false,
    pollInterval: 2000,
    variables: {
      id: router.query.torrentId
    }
  }),
      loading = _useQuery.loading,
      data = _useQuery.data,
      error = _useQuery.error;

  if (loading || !true) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_torrents__WEBPACK_IMPORTED_MODULE_8__["Unstyled"], {
      message: "Loading..."
    });
  }

  if (error) {
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_torrents__WEBPACK_IMPORTED_MODULE_8__["Unstyled"], {
      message: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(error)
    });
  }

  var torrent = data.getTorrent;
  var fileContents = torrent.files.contents;

  var initialDir = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(fileContents)[0];

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_layouts_Main__WEBPACK_IMPORTED_MODULE_9__["default"], {
    title: torrent.name
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "jsx-1812592545" + " " + "wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_10___default.a, {
    href: "../torrents"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("a", {
    className: "jsx-1812592545"
  }, "Back to torrents")), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h2", {
    className: "jsx-1812592545" + " " + "name"
  }, torrent.name), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("h3", {
    className: "jsx-1812592545"
  }, "Contents:"), directoryDive(torrent.files.contents[initialDir], initialDir, 0), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("br", {
    className: "jsx-1812592545"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "1812592545"
  }, ".name.jsx-1812592545{margin-bottom:15px;}.title.jsx-1812592545{font-weight:bold;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb2Zza3kvRGVza3RvcC90b3JyZW50cWwvcGFja2FnZXMvbmV4dGpzL3BhZ2VzL3RvcnJlbnRzL1t0b3JyZW50SWRdLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ29CLEFBRzhCLEFBR0YsaUJBQ25CLEVBSEEiLCJmaWxlIjoiL1VzZXJzL2pvZnNreS9EZXNrdG9wL3RvcnJlbnRxbC9wYWNrYWdlcy9uZXh0anMvcGFnZXMvdG9ycmVudHMvW3RvcnJlbnRJZF0udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB3aXRoQXV0aCBmcm9tICcuLi8uLi9saWIvd2l0aEF1dGgnO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdyZWFjdC1hcG9sbG8taG9va3MnO1xuaW1wb3J0IHsgR0VUX1RPUlJFTlRfUVVFUlkgfSBmcm9tICcuLi8uLi9hcG9sbG8vcXVlcmllcyc7XG5pbXBvcnQgeyBVbnN0eWxlZCB9IGZyb20gJy4uL3RvcnJlbnRzJztcbmltcG9ydCBNYWluIGZyb20gJy4uLy4uL2xheW91dHMvTWFpbic7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgRm9sZGVyLCBGaWxlIGFzIEZpbGVJY29uIH0gZnJvbSAncmVhY3QtZmVhdGhlcic7XG5cbmNvbnN0IFRvcnJlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IGxvYWRpbmcsIGRhdGEsIGVycm9yIH0gPSB1c2VRdWVyeShHRVRfVE9SUkVOVF9RVUVSWSwge1xuICAgIHNzcjogZmFsc2UsXG4gICAgcG9sbEludGVydmFsOiAyMDAwLFxuICAgIHZhcmlhYmxlczoge1xuICAgICAgaWQ6IHJvdXRlci5xdWVyeS50b3JyZW50SWQsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChsb2FkaW5nIHx8ICFwcm9jZXNzLmJyb3dzZXIpIHtcbiAgICByZXR1cm4gPFVuc3R5bGVkIG1lc3NhZ2U9XCJMb2FkaW5nLi4uXCIgLz47XG4gIH1cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxVbnN0eWxlZCBtZXNzYWdlPXtKU09OLnN0cmluZ2lmeShlcnJvcil9IC8+O1xuICB9XG4gIGNvbnN0IHRvcnJlbnQgPSBkYXRhLmdldFRvcnJlbnQ7XG4gIGNvbnN0IGZpbGVDb250ZW50cyA9IHRvcnJlbnQuZmlsZXMuY29udGVudHM7XG4gIGNvbnN0IGluaXRpYWxEaXIgPSBPYmplY3Qua2V5cyhmaWxlQ29udGVudHMpWzBdO1xuICByZXR1cm4gKFxuICAgIDxNYWluIHRpdGxlPXt0b3JyZW50Lm5hbWV9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIuLi90b3JyZW50c1wiPlxuICAgICAgICAgIDxhPkJhY2sgdG8gdG9ycmVudHM8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm5hbWVcIj57dG9ycmVudC5uYW1lfTwvaDI+XG4gICAgICAgIDxoMz5Db250ZW50czo8L2gzPlxuICAgICAgICB7ZGlyZWN0b3J5RGl2ZSh0b3JyZW50LmZpbGVzLmNvbnRlbnRzW2luaXRpYWxEaXJdLCBpbml0aWFsRGlyLCAwKX1cbiAgICAgICAgPGJyLz5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAubmFtZSB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICAgICAgfVxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L01haW4+XG4gICk7XG59O1xuXG4gICBmdW5jdGlvbiBkaXJlY3RvcnlEaXZlKGRpY3Rpb25hcnksa2V5LCBkZXB0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRpY3QgVHlwZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGljdGlvbmFyeS50eXBlKTtcbiAgICAgICAgaWYgKGRpY3Rpb25hcnkudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJmaWxlIGRpY3Rpb25hcnlcIik7ICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKGRpY3Rpb25hcnkpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZSBrZXlcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coa2V5KTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZpbGUgbmFtZT17a2V5fSBkZXB0aD17ZGVwdGh9IC8+XG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2UgaWYgKGRpY3Rpb25hcnkudHlwZSA9PT0gJ2RpcicpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50cyA9IGRpY3Rpb25hcnkuY29udGVudHM7XG4gICAgICAgICAgaWYgKGNvbnRlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnkgbmFtZT17a2V5fSBkZXB0aD17ZGVwdGh9IC8+XG4gICAgICAgICAgICAgICAge09iamVjdC5rZXlzKGNvbnRlbnRzKS5tYXAoa2V5ID0+IGRpcmVjdG9yeURpdmUoY29udGVudHNba2V5XSwga2V5LCBkZXB0aCArIDEpKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgfVxuXG5jb25zdCBEaXJlY3RvcnkgPSAoeyBuYW1lLCBkZXB0aCB9KSA9PiB7XG4gIGNvbnN0IG9mZlNldCA9IGRlcHRoID4gMCA/IChkZXB0aCAqIDIwKSArIDIwIDogMDtcbiAgcmV0dXJuIChcbiAgPGRpdiBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIiBrZXk9e25hbWV9ID5cbiAgICA8Rm9sZGVyIGNsYXNzTmFtZT1cImZvbGRlclwiIGNvbG9yPVwiYmx1ZVwiIC8+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuZGlyZWN0b3J5IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWxlZnQ6ICR7b2ZmU2V0fXB4O1xuICAgICAgfVxuICAgICAgLm5hbWUge1xuICAgICAgICBtYXJnaW4tbGVmdDogM3B4O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG59O1xuXG5jb25zdCBGaWxlID0gKHsgbmFtZSwgZGVwdGggfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImZpbGVcIiBrZXk9e25hbWV9PlxuICAgIDxGaWxlSWNvbiBjb2xvcj1cImJsdWVcIi8+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuZmlsZSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAkezIwICogKGRlcHRoICsgMSl9cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG4gICAgICAubmFtZSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzcHg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2Rpdj5cbilcbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoKFRvcnJlbnQpO1xuIl19 */\n/*@ sourceURL=/Users/jofsky/Desktop/torrentql/packages/nextjs/pages/torrents/[torrentId].tsx */")));
};

function directoryDive(dictionary, key, depth) {
  console.log("Dict Type");
  console.log(dictionary.type);

  if (dictionary.type === 'file') {
    console.log("file dictionary");
    console.log(dictionary);
    console.log("file key");
    console.log(key);
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(File, {
      name: key,
      depth: depth
    });
  } else if (dictionary.type === 'dir') {
    var contents = dictionary.contents;

    if (contents) {
      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Directory, {
        name: key,
        depth: depth
      }), _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(contents).map(function (key) {
        return directoryDive(contents[key], key, depth + 1);
      }));
    }
  }
}

var Directory = function Directory(_ref) {
  var name = _ref.name,
      depth = _ref.depth;
  var offSet = depth > 0 ? depth * 20 + 20 : 0;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    key: name,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["2033037736", [offSet]]]) + " " + "directory"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_11__["Folder"], {
    className: "folder",
    color: "blue"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["2033037736", [offSet]]]) + " " + "name"
  }, name), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "2033037736",
    dynamic: [offSet]
  }, ".directory.__jsx-style-dynamic-selector{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-left:".concat(offSet, "px;}.name.__jsx-style-dynamic-selector{margin-left:3px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb2Zza3kvRGVza3RvcC90b3JyZW50cWwvcGFja2FnZXMvbmV4dGpzL3BhZ2VzL3RvcnJlbnRzL1t0b3JyZW50SWRdLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRmdCLEFBR3NCLEFBTUcsZ0JBQ2xCLDBEQU5xQixxRUFDQSw2RkFDd0IsMkNBQzdDIiwiZmlsZSI6Ii9Vc2Vycy9qb2Zza3kvRGVza3RvcC90b3JyZW50cWwvcGFja2FnZXMvbmV4dGpzL3BhZ2VzL3RvcnJlbnRzL1t0b3JyZW50SWRdLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgd2l0aEF1dGggZnJvbSAnLi4vLi4vbGliL3dpdGhBdXRoJztcbmltcG9ydCB7IHVzZVF1ZXJ5IH0gZnJvbSAncmVhY3QtYXBvbGxvLWhvb2tzJztcbmltcG9ydCB7IEdFVF9UT1JSRU5UX1FVRVJZIH0gZnJvbSAnLi4vLi4vYXBvbGxvL3F1ZXJpZXMnO1xuaW1wb3J0IHsgVW5zdHlsZWQgfSBmcm9tICcuLi90b3JyZW50cyc7XG5pbXBvcnQgTWFpbiBmcm9tICcuLi8uLi9sYXlvdXRzL01haW4nO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IEZvbGRlciwgRmlsZSBhcyBGaWxlSWNvbiB9IGZyb20gJ3JlYWN0LWZlYXRoZXInO1xuXG5jb25zdCBUb3JyZW50ID0gKCkgPT4ge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBsb2FkaW5nLCBkYXRhLCBlcnJvciB9ID0gdXNlUXVlcnkoR0VUX1RPUlJFTlRfUVVFUlksIHtcbiAgICBzc3I6IGZhbHNlLFxuICAgIHBvbGxJbnRlcnZhbDogMjAwMCxcbiAgICB2YXJpYWJsZXM6IHtcbiAgICAgIGlkOiByb3V0ZXIucXVlcnkudG9ycmVudElkLFxuICAgIH0sXG4gIH0pO1xuICBpZiAobG9hZGluZyB8fCAhcHJvY2Vzcy5icm93c2VyKSB7XG4gICAgcmV0dXJuIDxVbnN0eWxlZCBtZXNzYWdlPVwiTG9hZGluZy4uLlwiIC8+O1xuICB9XG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiA8VW5zdHlsZWQgbWVzc2FnZT17SlNPTi5zdHJpbmdpZnkoZXJyb3IpfSAvPjtcbiAgfVxuICBjb25zdCB0b3JyZW50ID0gZGF0YS5nZXRUb3JyZW50O1xuICBjb25zdCBmaWxlQ29udGVudHMgPSB0b3JyZW50LmZpbGVzLmNvbnRlbnRzO1xuICBjb25zdCBpbml0aWFsRGlyID0gT2JqZWN0LmtleXMoZmlsZUNvbnRlbnRzKVswXTtcbiAgcmV0dXJuIChcbiAgICA8TWFpbiB0aXRsZT17dG9ycmVudC5uYW1lfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlclwiPlxuICAgICAgICA8TGluayBocmVmPVwiLi4vdG9ycmVudHNcIj5cbiAgICAgICAgICA8YT5CYWNrIHRvIHRvcnJlbnRzPC9hPlxuICAgICAgICA8L0xpbms+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJuYW1lXCI+e3RvcnJlbnQubmFtZX08L2gyPlxuICAgICAgICA8aDM+Q29udGVudHM6PC9oMz5cbiAgICAgICAge2RpcmVjdG9yeURpdmUodG9ycmVudC5maWxlcy5jb250ZW50c1tpbml0aWFsRGlyXSwgaW5pdGlhbERpciwgMCl9XG4gICAgICAgIDxici8+XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLm5hbWUge1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgPC9NYWluPlxuICApO1xufTtcblxuICAgZnVuY3Rpb24gZGlyZWN0b3J5RGl2ZShkaWN0aW9uYXJ5LGtleSwgZGVwdGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJEaWN0IFR5cGVcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpY3Rpb25hcnkudHlwZSk7XG4gICAgICAgIGlmIChkaWN0aW9uYXJ5LnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZSBkaWN0aW9uYXJ5XCIpOyAgICAgICAgICBcbiAgICAgICAgICBjb25zb2xlLmxvZyhkaWN0aW9uYXJ5KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGUga2V5XCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGaWxlIG5hbWU9e2tleX0gZGVwdGg9e2RlcHRofSAvPlxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIGlmIChkaWN0aW9uYXJ5LnR5cGUgPT09ICdkaXInKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudHMgPSBkaWN0aW9uYXJ5LmNvbnRlbnRzO1xuICAgICAgICAgIGlmIChjb250ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8RGlyZWN0b3J5IG5hbWU9e2tleX0gZGVwdGg9e2RlcHRofSAvPlxuICAgICAgICAgICAgICAgIHtPYmplY3Qua2V5cyhjb250ZW50cykubWFwKGtleSA9PiBkaXJlY3RvcnlEaXZlKGNvbnRlbnRzW2tleV0sIGtleSwgZGVwdGggKyAxKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgIH1cblxuY29uc3QgRGlyZWN0b3J5ID0gKHsgbmFtZSwgZGVwdGggfSkgPT4ge1xuICBjb25zdCBvZmZTZXQgPSBkZXB0aCA+IDAgPyAoZGVwdGggKiAyMCkgKyAyMCA6IDA7XG4gIHJldHVybiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCIga2V5PXtuYW1lfSA+XG4gICAgPEZvbGRlciBjbGFzc05hbWU9XCJmb2xkZXJcIiBjb2xvcj1cImJsdWVcIiAvPlxuICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj57bmFtZX08L3NwYW4+XG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLmRpcmVjdG9yeSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAke29mZlNldH1weDtcbiAgICAgIH1cbiAgICAgIC5uYW1lIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgIH1cbiAgICBgfTwvc3R5bGU+XG4gIDwvZGl2PlxuKVxufTtcblxuY29uc3QgRmlsZSA9ICh7IG5hbWUsIGRlcHRoIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJmaWxlXCIga2V5PXtuYW1lfT5cbiAgICA8RmlsZUljb24gY29sb3I9XCJibHVlXCIvPlxuICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hbWVcIj57bmFtZX08L3NwYW4+XG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLmZpbGUge1xuICAgICAgICBtYXJnaW4tbGVmdDogJHsyMCAqIChkZXB0aCArIDEpfXB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgICAgLm5hbWUge1xuICAgICAgICBtYXJnaW4tbGVmdDogM3B4O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG5leHBvcnQgZGVmYXVsdCB3aXRoQXV0aChUb3JyZW50KTtcbiJdfQ== */\n/*@ sourceURL=/Users/jofsky/Desktop/torrentql/packages/nextjs/pages/torrents/[torrentId].tsx */")));
};

var File = function File(_ref2) {
  var name = _ref2.name,
      depth = _ref2.depth;
  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    key: name,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["4093730307", [20 * (depth + 1)]]]) + " " + "file"
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_11__["File"], {
    color: "blue"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("span", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["4093730307", [20 * (depth + 1)]]]) + " " + "name"
  }, name), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "4093730307",
    dynamic: [20 * (depth + 1)]
  }, ".file.__jsx-style-dynamic-selector{margin-left:".concat(20 * (depth + 1), "px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.name.__jsx-style-dynamic-selector{margin-left:3px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qb2Zza3kvRGVza3RvcC90b3JyZW50cWwvcGFja2FnZXMvbmV4dGpzL3BhZ2VzL3RvcnJlbnRzL1t0b3JyZW50SWRdLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvR2dCLEFBR29ELEFBTTNCLGdCQUNsQiwyQkFOZSwwRUFDTSxxRUFDQSw2RkFDckIiLCJmaWxlIjoiL1VzZXJzL2pvZnNreS9EZXNrdG9wL3RvcnJlbnRxbC9wYWNrYWdlcy9uZXh0anMvcGFnZXMvdG9ycmVudHMvW3RvcnJlbnRJZF0udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCB3aXRoQXV0aCBmcm9tICcuLi8uLi9saWIvd2l0aEF1dGgnO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdyZWFjdC1hcG9sbG8taG9va3MnO1xuaW1wb3J0IHsgR0VUX1RPUlJFTlRfUVVFUlkgfSBmcm9tICcuLi8uLi9hcG9sbG8vcXVlcmllcyc7XG5pbXBvcnQgeyBVbnN0eWxlZCB9IGZyb20gJy4uL3RvcnJlbnRzJztcbmltcG9ydCBNYWluIGZyb20gJy4uLy4uL2xheW91dHMvTWFpbic7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgRm9sZGVyLCBGaWxlIGFzIEZpbGVJY29uIH0gZnJvbSAncmVhY3QtZmVhdGhlcic7XG5cbmNvbnN0IFRvcnJlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IGxvYWRpbmcsIGRhdGEsIGVycm9yIH0gPSB1c2VRdWVyeShHRVRfVE9SUkVOVF9RVUVSWSwge1xuICAgIHNzcjogZmFsc2UsXG4gICAgcG9sbEludGVydmFsOiAyMDAwLFxuICAgIHZhcmlhYmxlczoge1xuICAgICAgaWQ6IHJvdXRlci5xdWVyeS50b3JyZW50SWQsXG4gICAgfSxcbiAgfSk7XG4gIGlmIChsb2FkaW5nIHx8ICFwcm9jZXNzLmJyb3dzZXIpIHtcbiAgICByZXR1cm4gPFVuc3R5bGVkIG1lc3NhZ2U9XCJMb2FkaW5nLi4uXCIgLz47XG4gIH1cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIDxVbnN0eWxlZCBtZXNzYWdlPXtKU09OLnN0cmluZ2lmeShlcnJvcil9IC8+O1xuICB9XG4gIGNvbnN0IHRvcnJlbnQgPSBkYXRhLmdldFRvcnJlbnQ7XG4gIGNvbnN0IGZpbGVDb250ZW50cyA9IHRvcnJlbnQuZmlsZXMuY29udGVudHM7XG4gIGNvbnN0IGluaXRpYWxEaXIgPSBPYmplY3Qua2V5cyhmaWxlQ29udGVudHMpWzBdO1xuICByZXR1cm4gKFxuICAgIDxNYWluIHRpdGxlPXt0b3JyZW50Lm5hbWV9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwcGVyXCI+XG4gICAgICAgIDxMaW5rIGhyZWY9XCIuLi90b3JyZW50c1wiPlxuICAgICAgICAgIDxhPkJhY2sgdG8gdG9ycmVudHM8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cIm5hbWVcIj57dG9ycmVudC5uYW1lfTwvaDI+XG4gICAgICAgIDxoMz5Db250ZW50czo8L2gzPlxuICAgICAgICB7ZGlyZWN0b3J5RGl2ZSh0b3JyZW50LmZpbGVzLmNvbnRlbnRzW2luaXRpYWxEaXJdLCBpbml0aWFsRGlyLCAwKX1cbiAgICAgICAgPGJyLz5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAubmFtZSB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICAgICAgfVxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L01haW4+XG4gICk7XG59O1xuXG4gICBmdW5jdGlvbiBkaXJlY3RvcnlEaXZlKGRpY3Rpb25hcnksa2V5LCBkZXB0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRpY3QgVHlwZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGljdGlvbmFyeS50eXBlKTtcbiAgICAgICAgaWYgKGRpY3Rpb25hcnkudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJmaWxlIGRpY3Rpb25hcnlcIik7ICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKGRpY3Rpb25hcnkpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsZSBrZXlcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coa2V5KTtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZpbGUgbmFtZT17a2V5fSBkZXB0aD17ZGVwdGh9IC8+XG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2UgaWYgKGRpY3Rpb25hcnkudHlwZSA9PT0gJ2RpcicpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50cyA9IGRpY3Rpb25hcnkuY29udGVudHM7XG4gICAgICAgICAgaWYgKGNvbnRlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxEaXJlY3RvcnkgbmFtZT17a2V5fSBkZXB0aD17ZGVwdGh9IC8+XG4gICAgICAgICAgICAgICAge09iamVjdC5rZXlzKGNvbnRlbnRzKS5tYXAoa2V5ID0+IGRpcmVjdG9yeURpdmUoY29udGVudHNba2V5XSwga2V5LCBkZXB0aCArIDEpKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgfVxuXG5jb25zdCBEaXJlY3RvcnkgPSAoeyBuYW1lLCBkZXB0aCB9KSA9PiB7XG4gIGNvbnN0IG9mZlNldCA9IGRlcHRoID4gMCA/IChkZXB0aCAqIDIwKSArIDIwIDogMDtcbiAgcmV0dXJuIChcbiAgPGRpdiBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIiBrZXk9e25hbWV9ID5cbiAgICA8Rm9sZGVyIGNsYXNzTmFtZT1cImZvbGRlclwiIGNvbG9yPVwiYmx1ZVwiIC8+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuZGlyZWN0b3J5IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWxlZnQ6ICR7b2ZmU2V0fXB4O1xuICAgICAgfVxuICAgICAgLm5hbWUge1xuICAgICAgICBtYXJnaW4tbGVmdDogM3B4O1xuICAgICAgfVxuICAgIGB9PC9zdHlsZT5cbiAgPC9kaXY+XG4pXG59O1xuXG5jb25zdCBGaWxlID0gKHsgbmFtZSwgZGVwdGggfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImZpbGVcIiBrZXk9e25hbWV9PlxuICAgIDxGaWxlSWNvbiBjb2xvcj1cImJsdWVcIi8+XG4gICAgPHNwYW4gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICA8c3R5bGUganN4PntgXG4gICAgICAuZmlsZSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAkezIwICogKGRlcHRoICsgMSl9cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB9XG4gICAgICAubmFtZSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzcHg7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L2Rpdj5cbilcbmV4cG9ydCBkZWZhdWx0IHdpdGhBdXRoKFRvcnJlbnQpO1xuIl19 */\n/*@ sourceURL=/Users/jofsky/Desktop/torrentql/packages/nextjs/pages/torrents/[torrentId].tsx */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(_lib_withAuth__WEBPACK_IMPORTED_MODULE_5__["default"])(Torrent));

/***/ })

})
//# sourceMappingURL=[torrentId].js.0788453bee6e0649d69d.hot-update.js.map