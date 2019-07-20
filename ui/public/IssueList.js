"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("whatwg-fetch");

var _IssueAdd = _interopRequireDefault(require("./IssueAdd.jsx"));

var _IssueFilter = _interopRequireDefault(require("./IssueFilter.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function IssueRow(props) {
  var issue = props.issue;
  return _react.default.createElement("tr", null, _react.default.createElement("td", null, issue.id), _react.default.createElement("td", null, issue.status), _react.default.createElement("td", null, issue.owner), _react.default.createElement("td", null, issue.created.toDateString()), _react.default.createElement("td", null, issue.effort), _react.default.createElement("td", null, issue.due ? issue.due.toDateString() : ''), _react.default.createElement("td", null, issue.title));
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return _react.default.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  return _react.default.createElement("table", {
    className: "bordered-table"
  }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "ID"), _react.default.createElement("th", null, "Status"), _react.default.createElement("th", null, "Owner"), _react.default.createElement("th", null, "Created"), _react.default.createElement("th", null, "Effort"), _react.default.createElement("th", null, "Due Date"), _react.default.createElement("th", null, "Title"))), _react.default.createElement("tbody", null, issueRows));
}

var IssueList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(IssueList, _React$Component);

  function IssueList() {
    var _this;

    _classCallCheck(this, IssueList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IssueList).call(this));
    _this.state = {
      issues: []
    };
    _this.createIssue = _this.createIssue.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this2 = this;

      fetch('/api/issues').then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach(function (issue) {
              issue.created = new Date(issue.created);
              if (issue.due) issue.due = new Date(issue.due);
            });

            _this2.setState({
              issues: data.records
            });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to fetch issues:" + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: "createIssue",
    value: function createIssue(newIssue) {
      var _this3 = this;

      fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newIssue)
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (updatedIssue) {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.due) updatedIssue.due = new Date(updatedIssue.due);

            var newIssues = _this3.state.issues.concat(updatedIssue);

            _this3.setState({
              issues: newIssues
            });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to add issue: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("h1", null, "Issue Tracker"), _react.default.createElement(_IssueFilter.default, null), _react.default.createElement("hr", null), _react.default.createElement(IssueTable, {
        issues: this.state.issues
      }), _react.default.createElement("hr", null), _react.default.createElement(_IssueAdd.default, {
        createIssue: this.createIssue
      }));
    }
  }]);

  return IssueList;
}(_react.default.Component);

exports.default = IssueList;