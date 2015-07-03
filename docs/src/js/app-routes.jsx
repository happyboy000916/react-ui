"use strict"

import {Route, DefaultRoute} from 'react-router'

let Master = require('./pages/master.jsx')
let Home = require('./pages/home.jsx')

let menulist = []
let index = 1

function addMenu(list) {
  list.forEach(function (menu) {
    if (menu.handler) {
      menulist.push(
        <Route key={index} name={menu.route} handler={menu.handler} />
      )
    }
    index++
  })
}
require('./menulist').forEach(function (list) {
  addMenu(list)
})

let AppRoutes = (
  <Route name="root" path="/" handler={Master}>
    <Route name="home" handler={Home} />
    {menulist}
    <DefaultRoute handler={Home} />
  </Route>
)

module.exports = AppRoutes
