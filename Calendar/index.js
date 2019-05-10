'use strict';
import React, { Component } from 'react';
import { Icon } from 'antd';
import _ from 'lodash';

import styles from './index.less';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),         //当前日期
      allDays: [],              //当前月的天数
      dayTitle: null,           //当天的年-月-日（左右切换中间部分的title
    };

    //以下顺序是根据方法的定义顺序绑定
    this.currentTitle = this.currentTitle.bind(this);
    this.compareTime = this.compareTime.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.init = this.init.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.init();
    this.currentTitle();
  }


  componentDidUpdate(nextProps, nextState) {
    if (!_.isEqual(this.state.date, nextState.date)) {
      this.currentTitle();
      this.init();
    }
  }

  currentTitle() { // 日期转字符串
    let { date } = this.state;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    // let day = date.getDate();
    month = month <= 9 ? ('0' + month) : ('' + month);
    // day = day <= 9 ? ('0' + day) : ('' + day);
    this.setState({
        dayTitle: `${year}/${month}`,
      },
    );
  };

  compareTime(day, month, year) {
    if (!year) year = '';
    if (!month) month = '';
    if (!day) day = '';
    return `${year}${month}${day}`;
  }

  //日期格式转化
  changeTime(year, month, day, type) {  //2019/02/20   2019.02.20   2019-02-20
    month = month <= 9 ? ('0' + month) : ('' + month);
    day = day <= 9 ? ('0' + day) : ('' + day);
    return `${year}${type}${month}${type}${day}`;
  }

  //初始化生成dom结构、添加数据展示
  init() {
    let { date } = this.state;
    let { format } = this.props;
    let year = date.getFullYear();
    let month = date.getMonth();
    let firstDay = new Date(year, month, 1);
    let arr = [];
    for (let i = 0; i < 42; i++) {
      let allDay = format && format === 'zh' ? new Date(year, month, i + 2 - firstDay.getDay()) : new Date(year, month, i + 1 - firstDay.getDay());
      if (allDay.getMonth() + 1 === date.getMonth() + 1) {
        arr.push({ id: allDay.getMonth() + 1, day: allDay.getDate() });
      } else {
        arr.push(allDay.getDate());
      }

    }

    this.setState({
      allDays: arr,
    });
  };

  prev() {
    let { date } = this.state;
    let nowDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let requestDate = { year: nowDate.getFullYear(), month: nowDate.getMonth() + 1 };
    this.setState({
      date: nowDate,
    });
  };

  next() {
    let { date } = this.state;
    let nowDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    let requestDate = { year: nowDate.getFullYear(), month: nowDate.getMonth() + 1 };   //切换月份获取数据时调用
    this.setState({
      date: nowDate,
    });
  };


  render() {
    let { allDays, dayTitle, date } = this.state;
    let { format, data, type, status } = this.props;
    let days = format && format === 'zh' ? ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'] : ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
    let commonStatus = {
      normal: require('../../assets/images/normal.png'),
      danger: require('../../assets/images/danger.png'),
      busy: require('../../assets/images/busy.png'),
      uncompleted: require('../../assets/images/uncompleted.png'),
    };

    //未在月内的数据
    let dayStyle = {
      margin: 'auto',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      color: '#ccc',
    };

    let difMonthStyle = {
      margin: 'auto',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      background: '#ccc',
      borderRadius: '18px',
    };

    //在本月内数据并且是当前日期
    let currentStyle = {
      margin: 'auto',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
      borderRadius: '18px',
      background: '#0066FF',
      color: '#fff',
    };

    //在当前月的所有数据
    let currentMonStyle = {
      margin: 'auto',
      width: '30px',
      height: '30px',
      lineHeight: '30px',
    };

    //图片样式
    let imgStyle = {
      display: 'block',
      margin: 'auto',
      width: '16px',
      height: '16px',
    };

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    return (
      <div id="dateCalendar" className={styles.dateCalendar}>
        <div className={styles.calendarTitle}>
          <a href="#" className={styles.title}>{dayTitle}</a>
          <span
            className={styles.arrow_prev}
            onClick={this.prev}>
            {/*<span className={styles.}></span>*/}
            <Icon size={'md'} style={{ color: '#0066FF' }}
                  type={'left'}/></span>
          <span
            className={styles.arrow_next}
            onClick={this.next}>
            <Icon size={'md'} style={{ color: '#0066FF' }}
                  type={'right'}/></span>
        </div>
        <ul className={styles.calendarWeek}>
          {
            days.map((item, index) => {
              return <li key={index}>{item}</li>;
            })
          }
        </ul>
        <ul className={styles.calendarDate}>
          {
            allDays.map((item, index) => {
              let dayItem = item.day ? item.day : item;
              let dataShow = _.find(data, { todate: this.changeTime(year, item.id, item.day, type) });
              return (<li key={index}>
                <div
                  style={
                    _.isObject(item) && _.isEqual(this.compareTime(dayItem, month, year), this.compareTime(currentDay, currentMonth, currentYear)) ?
                      currentStyle : _.isObject(item) && _.isEqual(this.compareTime(dayItem), this.compareTime(currentDay)) ?
                      difMonthStyle : _.isObject(item) ?
                        currentMonStyle : dayStyle}>{dayItem}
                </div>
                <img
                  src={dataShow && status ? status[dataShow.roomStatus] : null}
                  // src={dataShow && status ? status[dataShow.roomStatus] : dataShow && !status ? commonStatus[dataShow.roomStatus] : null}
                  style={dataShow ? imgStyle : null}/>
              </li>);
            })
          }
        </ul>
      </div>
    );
  }
}


export default Calendar;
