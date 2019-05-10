'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('antd/lib/index');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Calendar = require('./Calendar.less');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.state = {
      date: new Date(), //当前日期
      allDays: [], //当前月的天数
      dayTitle: null //当天的年-月-日（左右切换中间部分的title
    };

    //以下顺序是根据方法的定义顺序绑定
    _this.currentTitle = _this.currentTitle.bind(_this);
    _this.compareTime = _this.compareTime.bind(_this);
    _this.changeTime = _this.changeTime.bind(_this);
    _this.init = _this.init.bind(_this);
    _this.prev = _this.prev.bind(_this);
    _this.next = _this.next.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
      this.currentTitle();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps, nextState) {
      if (!_lodash2.default.isEqual(this.state.date, nextState.date)) {
        this.currentTitle();
        this.init();
      }
    }
  }, {
    key: 'currentTitle',
    value: function currentTitle() {
      // 日期转字符串
      var date = this.state.date;

      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      // let day = date.getDate();
      month = month <= 9 ? '0' + month : '' + month;
      // day = day <= 9 ? ('0' + day) : ('' + day);
      this.setState({
        dayTitle: year + '/' + month
      });
    }
  }, {
    key: 'compareTime',
    value: function compareTime(day, month, year) {
      if (!year) year = '';
      if (!month) month = '';
      if (!day) day = '';
      return '' + year + month + day;
    }

    //日期格式转化

  }, {
    key: 'changeTime',
    value: function changeTime(year, month, day, type) {
      //2019/02/20   2019.02.20   2019-02-20
      month = month <= 9 ? '0' + month : '' + month;
      day = day <= 9 ? '0' + day : '' + day;
      return '' + year + type + month + type + day;
    }

    //初始化生成dom结构、添加数据展示

  }, {
    key: 'init',
    value: function init() {
      var date = this.state.date;
      var format = this.props.format;

      var year = date.getFullYear();
      var month = date.getMonth();
      var firstDay = new Date(year, month, 1);
      var arr = [];
      for (var i = 0; i < 42; i++) {
        var allDay = format && format === 'zh' ? new Date(year, month, i + 2 - firstDay.getDay()) : new Date(year, month, i + 1 - firstDay.getDay());
        if (allDay.getMonth() + 1 === date.getMonth() + 1) {
          arr.push({ id: allDay.getMonth() + 1, day: allDay.getDate() });
        } else {
          arr.push(allDay.getDate());
        }
      }

      this.setState({
        allDays: arr
      });
    }
  }, {
    key: 'prev',
    value: function prev() {
      var date = this.state.date;

      var nowDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var requestDate = { year: nowDate.getFullYear(), month: nowDate.getMonth() + 1 };
      this.setState({
        date: nowDate
      });
    }
  }, {
    key: 'next',
    value: function next() {
      var date = this.state.date;

      var nowDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      var requestDate = { year: nowDate.getFullYear(), month: nowDate.getMonth() + 1 }; //切换月份获取数据时调用
      this.setState({
        date: nowDate
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          allDays = _state.allDays,
          dayTitle = _state.dayTitle,
          date = _state.date;
      var _props = this.props,
          format = _props.format,
          data = _props.data,
          type = _props.type,
          status = _props.status;

      var days = format && format === 'zh' ? ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'] : ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
      var commonStatus = {
        normal: require('../../assets/images/normal.png'),
        danger: require('../../assets/images/danger.png'),
        busy: require('../../assets/images/busy.png'),
        uncompleted: require('../../assets/images/uncompleted.png')
      };

      //未在月内的数据
      var dayStyle = {
        margin: 'auto',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        color: '#ccc'
      };

      var difMonthStyle = {
        margin: 'auto',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        background: '#ccc',
        borderRadius: '18px'
      };

      //在本月内数据并且是当前日期
      var currentStyle = {
        margin: 'auto',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
        borderRadius: '18px',
        background: '#0066FF',
        color: '#fff'
      };

      //在当前月的所有数据
      var currentMonStyle = {
        margin: 'auto',
        width: '30px',
        height: '30px',
        lineHeight: '30px'
      };

      //图片样式
      var imgStyle = {
        display: 'block',
        margin: 'auto',
        width: '16px',
        height: '16px'
      };

      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var currentYear = new Date().getFullYear();
      var currentMonth = new Date().getMonth() + 1;
      var currentDay = new Date().getDate();
      return _react2.default.createElement(
        'div',
        { id: 'dateCalendar', className: _Calendar2.default.dateCalendar },
        _react2.default.createElement(
          'div',
          { className: _Calendar2.default.calendarTitle },
          _react2.default.createElement(
            'a',
            { href: '#', className: _Calendar2.default.title },
            dayTitle
          ),
          _react2.default.createElement(
            'span',
            {
              className: _Calendar2.default.arrow_prev,
              onClick: this.prev },
            _react2.default.createElement(_index.Icon, { size: 'md', style: { color: '#0066FF' },
              type: 'left' })
          ),
          _react2.default.createElement(
            'span',
            {
              className: _Calendar2.default.arrow_next,
              onClick: this.next },
            _react2.default.createElement(_index.Icon, { size: 'md', style: { color: '#0066FF' },
              type: 'right' })
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: _Calendar2.default.calendarWeek },
          days.map(function (item, index) {
            return _react2.default.createElement(
              'li',
              { key: index },
              item
            );
          })
        ),
        _react2.default.createElement(
          'ul',
          { className: _Calendar2.default.calendarDate },
          allDays.map(function (item, index) {
            var dayItem = item.day ? item.day : item;
            var dataShow = _lodash2.default.find(data, { todate: _this2.changeTime(year, item.id, item.day, type) });
            return _react2.default.createElement(
              'li',
              { key: index },
              _react2.default.createElement(
                'div',
                {
                  style: _lodash2.default.isObject(item) && _lodash2.default.isEqual(_this2.compareTime(dayItem, month, year), _this2.compareTime(currentDay, currentMonth, currentYear)) ? currentStyle : _lodash2.default.isObject(item) && _lodash2.default.isEqual(_this2.compareTime(dayItem), _this2.compareTime(currentDay)) ? difMonthStyle : _lodash2.default.isObject(item) ? currentMonStyle : dayStyle },
                dayItem
              ),
              _react2.default.createElement('img', {
                src: dataShow && status ? status[dataShow.roomStatus] : null
                // src={dataShow && status ? status[dataShow.roomStatus] : dataShow && !status ? commonStatus[dataShow.roomStatus] : null}
                , style: dataShow ? imgStyle : null })
            );
          })
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;