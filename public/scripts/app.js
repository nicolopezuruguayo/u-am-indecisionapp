'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('Hi carapalida');

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            options: ['one', 'two', 'three'],
            title: 'Indecision App!',
            subtitle: 'Put your life in the hands of a computer'
        };
        _this.onAddOptionHandler = _this.onAddOptionHandler.bind(_this);
        _this.onRemoveAll = _this.onRemoveAll.bind(_this);
        _this.onSuggest = _this.onSuggest.bind(_this);
        _this.onOptionDelete = _this.onOptionDelete.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'onAddOptionHandler',
        value: function onAddOptionHandler(option) {
            if (option.trim() === '') {
                return 'Option should contain a value';
            };

            if (this.state.options.indexOf(option) > -1) {
                return 'This option already exists';
            } else {
                this.setState(function (prevState) {
                    return {
                        options: prevState.options.concat(option)
                    };
                });
            }
        }
    }, {
        key: 'onRemoveAll',
        value: function onRemoveAll() {
            this.setState(function () {
                return {
                    options: []
                };
            });
        }
    }, {
        key: 'onSuggest',
        value: function onSuggest() {
            alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
        }
    }, {
        key: 'onOptionDelete',
        value: function onOptionDelete(opt) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return option !== opt;
                    })
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { title: this.state.title, subtitle: this.state.subtitle }),
                React.createElement(Action, { removeAll: this.onRemoveAll, suggest: this.onSuggest }),
                React.createElement(Options, { options: this.state.options, optionDelete: this.onOptionDelete }),
                React.createElement(AddOption, { addOption: this.onAddOptionHandler })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

;

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        React.createElement(
            'p',
            null,
            props.subtitle
        )
    );
};

var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.suggest },
            'What should I do ?'
        ),
        React.createElement(
            'button',
            { onClick: props.removeAll },
            'Remove All'
        )
    );
};

var Options = function Options(props) {
    return props.options.map(function (option) {
        return React.createElement(Option, { item: option, 'delete': function _delete() {
                return props.optionDelete(option);
            } });
    });
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            React.createElement(
                'button',
                { onClick: props.delete },
                'X'
            ),
            ' ',
            props.item
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.state = {
            error: ''
        };
        _this2.onSubmitHandler = _this2.onSubmitHandler.bind(_this2);
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'onSubmitHandler',
        value: function onSubmitHandler(e) {
            e.preventDefault();
            var option = e.target.elements.option.value;
            if (this.props.addOption(option) !== undefined) {
                this.setState({ error: this.props.addOption(option) });
            } else {
                this.setState({ error: '' });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error,
                React.createElement(
                    'form',
                    { onSubmit: this.onSubmitHandler },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

;

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
