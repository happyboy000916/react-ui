"use strict"

exports.Checkbox = require('./components/checkbox.jsx')
exports.CheckboxGroup = require('./components/checkboxGroup.jsx')
exports.Datetime = require('./components/datetime.jsx')
exports.Grid = require('./components/grid.jsx')
exports.Icon = require('./components/icon.jsx')
exports.Input = require('./components/input.jsx')
exports.RadioGroup = require('./components/radioGroup.jsx')
exports.Rating = require('./components/rating.jsx')
exports.Select = require('./components/select.jsx')
exports.Tree = require('./components/tree.jsx')
exports.Button = require('./components/button.jsx')

exports.FormControl = require('./components/formControl.jsx')
exports.FormSubmit = require('./components/formSubmit.jsx')
exports.Form = require('./components/form.jsx')

exports.Pagination = require('./components/pagination.jsx')

exports.Message = require('./components/message.jsx')
exports.Lang = require('./lang')

exports.dataSource = require('./utils/dataSource')

exports.Utils = {
  Datetime: require('./utils/datetime'),
  Dom: require('./utils/dom'),
  Objects: require('./utils/objects'),
  Strings: require('./utils/strings')
}

// ajax
exports.Qwest = require('qwest')
exports.Request = require('qwest') // alias

// set language
require('./lang/zh-cn')
