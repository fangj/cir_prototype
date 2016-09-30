webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _obox = __webpack_require__(8);

	var _obox2 = _interopRequireDefault(_obox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reactDom2.default.render(_react2.default.createElement(_obox2.default, { checked: false }), document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ibox = __webpack_require__(9);

	var _ibox2 = _interopRequireDefault(_ibox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var obox = function (_React$Component) {
	  _inherits(obox, _React$Component);

	  function obox(props) {
	    _classCallCheck(this, obox);

	    var _this = _possibleConstructorReturn(this, (obox.__proto__ || Object.getPrototypeOf(obox)).call(this, props));

	    _this.state = { checked: props.checked };
	    return _this;
	  }

	  _createClass(obox, [{
	    key: 'render',
	    value: function render() {
	      var checked = this.state.checked ? "true" : "false";
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { onClick: this.click.bind(this) },
	          'obox:',
	          checked
	        ),
	        _react2.default.createElement(_ibox2.default, { checked: this.state.checked, onCheck: this.onCheck.bind(this) })
	      );
	    }
	  }, {
	    key: 'click',
	    value: function click() {
	      this.setState({ checked: !this.state.checked });
	    }
	  }, {
	    key: 'onCheck',
	    value: function onCheck(value) {
	      console.log('obox get value', value);
	      this.setState({ checked: value });
	    }
	  }]);

	  return obox;
	}(_react2.default.Component);

	obox.propTypes = { checked: _react2.default.PropTypes.bool };
	obox.defaultProps = { checked: true };
	exports.default = obox;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ibox = function (_React$Component) {
	  _inherits(ibox, _React$Component);

	  function ibox(props) {
	    _classCallCheck(this, ibox);

	    var _this = _possibleConstructorReturn(this, (ibox.__proto__ || Object.getPrototypeOf(ibox)).call(this, props));

	    _this.state = { checked: props.checked };
	    return _this;
	  }

	  _createClass(ibox, [{
	    key: "render",
	    value: function render() {
	      var checked = this.state.checked;

	      return _react2.default.createElement(
	        "div",
	        null,
	        "ibox:",
	        checked ? "true" : "false",
	        _react2.default.createElement("input", { type: "checkbox", checked: checked, onChange: this.click.bind(this) })
	      );
	    }
	  }, {
	    key: "click",
	    value: function click(e) {
	      var checked = e.target.checked;
	      this.props.onCheck(checked);
	      // this.setState({checked});
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      console.log('ibox componentDidMount');
	    }
	  }, {
	    key: "componentWillReceiveProps",
	    value: function componentWillReceiveProps(nextProps) {
	      console.log('ibox componentWillReceiveProps');
	      this.state.checked = nextProps.checked;
	    }
	  }]);

	  return ibox;
	}(_react2.default.Component);

	ibox.propTypes = {
	  onCheck: _react2.default.PropTypes.func.isRequired,
	  checked: _react2.default.PropTypes.bool.isRequired
	};
	exports.default = ibox;

/***/ }
]);