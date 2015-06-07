"use strict";

require('../../../node_modules/purecss/build/menus.css');
require('../less/nav.less');

var classnames = require('classnames');
var React = require('react');
var Router = require('react-router');
var menulist = require('./menulist');
var Icon = require('../../../src/js/components/icon.jsx');

module.exports = React.createClass({
  displayName: 'NavList',

  mixins: [Router.State],

  getInitialState: function () {
    return {
      active: false
    };
  },

  getClasses: function (name, route) {
    return classnames(name, {
      active: this.context.router.isActive(route)
    });
  },

  routeChange: function (route) {
    this.context.router.transitionTo(route);
    this.setState({ active: false });
  },

  toggle: function () {
    var active = !this.state.active;
    this.setState({ active: active });
  },

  render: function () {
    var list = menulist.map(function (m) {
      return (
        <li className="pure-menu-item">
          <a onClick={this.routeChange.bind(this, m.route)} className={this.getClasses("pure-menu-link", m.route)}>{m.text}</a>
        </li>
      );
    }, this);

    return (
      <div className={classnames("nav-list pure-menu", {active: this.state.active})}>
        <a onClick={this.toggle} className="nav-handler"><Icon icon="navicon" size="lg" /></a>
        <a className="pure-menu-heading" onClick={this.routeChange.bind(this, '/')}>React UI</a>
        <ul className="pure-menu-list">{list}</ul>
      </div>
    );
  }
});
