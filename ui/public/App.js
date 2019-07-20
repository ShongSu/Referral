"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _IssueList = _interopRequireDefault(require("./IssueList.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var element = _react.default.createElement(_IssueList.default, null);

_reactDom.default.render(element, document.getElementById('contents'));

if (module.hot) {
  module.hot.accept();
}