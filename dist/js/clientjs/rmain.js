'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by rat on 18/07/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            selectedUser: [],
            userFriends: [],
            userCircle: [],
            userName: ''
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.clickCircleButton = _this.clickCircleButton.bind(_this);

        return _this;
    }

    _createClass(App, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ userName: event.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            var _this2 = this;

            event.preventDefault();

            fetch('/tw/searchUser', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ name: this.state.userName })
            }).then(function (res) {
                res.json().then(function (res) {
                    console.log(res);
                    // const gotUser = res.map( function ( user ) {
                    //     console.log(user);
                    //     return user;
                    // });
                    _this2.setState({ selectedUser: res });
                });
            }, function (error) {
                console.log(error);
            });

            // alert('Submitted : ' + this.props.userName );
        }
    }, {
        key: 'clickCircleButton',
        value: function clickCircleButton() {
            console.log('Click');

            fetch('/tw/circle', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ name: this.state.userName })
            }).then(function (res) {
                res.json().then(function (res) {
                    console.log(res);
                });
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'app' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Appp'
                ),
                _react2.default.createElement(TargetInput, { handleSubmit: this.handleSubmit, handleChange: this.handleChange, clickCircleButton: this.clickCircleButton, selectedUser: this.state.selectedUser, userName: this.state.userName })
            );
        }
    }]);

    return App;
}(_react.Component);

var TargetInput = function (_Component2) {
    _inherits(TargetInput, _Component2);

    function TargetInput(props) {
        _classCallCheck(this, TargetInput);

        return _possibleConstructorReturn(this, (TargetInput.__proto__ || Object.getPrototypeOf(TargetInput)).call(this, props));
        // this.handleChange = this.handleChange.bind(this);
    }

    _createClass(TargetInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ selectedUser: nextProps.selectedUser, userName: nextProps.userName });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(SelectedUserPanel, { selectedUser: this.props.selectedUser, userName: this.props.userName }),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.props.handleSubmit.bind(this) },
                    _react2.default.createElement('input', { type: 'text', placeholder: 'username', onChange: this.props.handleChange }),
                    _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
                ),
                _react2.default.createElement(
                    'button',
                    { onClick: this.props.clickCircleButton, userName: this.props.userName },
                    'Get Circle'
                )
            );
        }
    }]);

    return TargetInput;
}(_react.Component);

var SelectedUserPanel = function (_Component3) {
    _inherits(SelectedUserPanel, _Component3);

    function SelectedUserPanel(props) {
        _classCallCheck(this, SelectedUserPanel);

        return _possibleConstructorReturn(this, (SelectedUserPanel.__proto__ || Object.getPrototypeOf(SelectedUserPanel)).call(this, props));
    }

    _createClass(SelectedUserPanel, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ selectedUser: nextProps.selectedUser });
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);
            if (this.props.selectedUser) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(User, { key: this.props.selectedUser.id, screenName: this.props.selectedUser.screen_name, name: this.props.selectedUser.name, imgSrc: this.props.selectedUser.profile_image_url })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'p',
                        null,
                        'Selected User: ',
                        this.props.userName
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'No Selected User'
                    )
                );
            }
        }
    }]);

    return SelectedUserPanel;
}(_react.Component);

var User = function (_Component4) {
    _inherits(User, _Component4);

    function User(props) {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, props));
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('img', { src: this.props.imgSrc }),
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.screenName
                ),
                '\xA0',
                _react2.default.createElement(
                    'span',
                    null,
                    this.props.name
                )
            );
        }
    }]);

    return User;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=rmain.js.map