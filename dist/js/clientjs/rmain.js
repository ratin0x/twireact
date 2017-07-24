'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _List = require('material-ui/List');

var _GridList = require('material-ui/GridList');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _colors = require('material-ui/styles/colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
            circleList: [],
            userName: '',
            rateExceeded: false
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.clickCircleButton = _this.clickCircleButton.bind(_this);
        _this.clickShowCircleButton = _this.clickShowCircleButton.bind(_this);

        _this.clickTile = _this.clickTile.bind(_this);

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
                    _this2.setState({ selectedUser: res, rateExceeded: false });
                });
            }, function (error) {
                console.log(error);
                this.setState({ rateExceeded: true });
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
                this.setState({ rateExceeded: true });
            });
        }
    }, {
        key: 'clickShowCircleButton',
        value: function clickShowCircleButton() {
            var _this3 = this;

            console.log('Show');

            fetch('/tw/showCircle', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ name: this.state.userName })
            }).then(function (res) {
                res.json().then(function (res) {
                    console.log(res);
                    _this3.setState({ circleList: res.circle });
                });
            }, function (error) {
                console.log(error);
                this.setState({ rateExceeded: true });
            });
        }
    }, {
        key: 'clickTile',
        value: function clickTile(event) {
            event.preventDefault();
            window.open(event.target.value);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.rateExceeded === false) {
                return _react2.default.createElement(
                    _MuiThemeProvider2.default,
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.BrowserRouter,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'app' },
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Appp'
                            ),
                            _react2.default.createElement(TargetInput, { handleSubmit: this.handleSubmit, handleChange: this.handleChange,
                                clickCircleButton: this.clickCircleButton, clickShowCircleButton: this.clickShowCircleButton, selectedUser: this.state.selectedUser,
                                userName: this.state.userName }),
                            _react2.default.createElement(CircleList, { circleList: this.state.circleList, clickTile: this.clickTile })
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    _MuiThemeProvider2.default,
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.BrowserRouter,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'app' },
                            _react2.default.createElement(
                                'h1',
                                null,
                                'Appp'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                'Rate limit exceeded'
                            ),
                            _react2.default.createElement(TargetInput, { handleSubmit: this.handleSubmit, handleChange: this.handleChange,
                                clickCircleButton: this.clickCircleButton, clickShowCircleButton: this.clickShowCircleButton, selectedUser: this.state.selectedUser,
                                userName: this.state.userName }),
                            _react2.default.createElement(CircleList, { circleList: this.state.circleList, clickTile: this.clickTile })
                        )
                    )
                );
            }
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
                    _RaisedButton2.default,
                    { onClick: this.props.clickCircleButton },
                    'Build Circle'
                ),
                _react2.default.createElement(
                    _RaisedButton2.default,
                    { onClick: this.props.clickShowCircleButton },
                    'Show Circle'
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
                    _react2.default.createElement(_Avatar2.default, { src: this.props.selectedUser.profile_image_url, size: 50 }),
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.selectedUser.screen_name
                    ),
                    '\xA0',
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.selectedUser.name
                    )
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

var CircleList = function (_Component5) {
    _inherits(CircleList, _Component5);

    function CircleList(props) {
        _classCallCheck(this, CircleList);

        return _possibleConstructorReturn(this, (CircleList.__proto__ || Object.getPrototypeOf(CircleList)).call(this, props));
    }

    _createClass(CircleList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ circleList: nextProps.circleList });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_GridList.GridList, { cols: 10, cellHeight: 150, children: this.props.circleList.map(function (user) {
                        return _react2.default.createElement(_GridList.GridTile, { subtitle: '@' + user.screen_name, title: user.name, actionIcon: _react2.default.createElement('img', { src: user.profile_image_url }), actionPosition: 'left', children: _react2.default.createElement(
                                'a',
                                { href: user.url },
                                _react2.default.createElement('img', { src: user.profile_background_image_url })
                            ) });
                    }) })
            );
        }
    }]);

    return CircleList;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=rmain.js.map