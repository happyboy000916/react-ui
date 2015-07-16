"use strict"

global.uiRequire = function (src) {
  if (src) {
    return require('../../../src/js/' + src)
  } else {
    return require('../../../src/js')
  }
}

let React = require('react')
let Router = require('react-router')
let AppRoutes = require('./app-routes.jsx')

// load language
global.uiRequire('lang/zh-cn')

Router.create({
  routes: AppRoutes,
  scrollBehavior: Router.ScrollToTopBehavior
})
.run(function (Handler) {
  React.render(<Handler />, document.body)
})

// static files
require('file?name=index.html!../index.html')
require('../json/countries.json')
require('../json/form.json')
require('../json/text-value.json')
require('../json/tree.json')
