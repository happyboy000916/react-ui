// add string proptype format
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== undefined
        ? args[number]
        : match
    })
  }
}

var Lang = require('../lang')

var regs = {
  'email': /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
  'url': /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  'number': /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
  //'date': /^(\d{4})-(\d{2})-(\d{2})$/,
  'alpha': /^[a-z ._-]+$/i,
  'alphanum': /^[a-z0-9_]+$/i,
  'password': /^[\x00-\xff]+$/,
  'integer': /^[-+]?[0-9]+$/,
  'tel': /^[\d\s ().-]+$/
}

var multTypes = ['checkbox-group', 'mult-select']

function getTip(key, value) {
  var text = Lang.get('validation.tips.' + key)
  text = text.format(value)
  return text
}

function getHint(hints, key, value, isArray) {
  key = ['minlen','maxlen'].indexOf(key) >= 0 ?
        key + (isArray ? 's' : '') :
        key

  var text = Lang.get('validation.hints.' + key)
  if (text) hints.push(text.format(value))
}

module.exports = {
  componentWillMount: function () {
    this._setHint(this.props)
  },

  componentWillReceiveProps: function (nextProps) {
    this._setHint(nextProps)
  },

  _setHint: function (props) {
    var hints = [],
        isArray = multTypes.indexOf(this.props.type) >= 0,
        keys = ['required','minlen','maxlen','type']

    keys.forEach(function (key) {
      if (props[key])
        getHint(hints, key, props[key], isArray)
    })
    if (props['tip']) {
      hints.push(props['tip'])
    }
    this.setState({ hintText: hints.join(',') })
  },

  validate: function (value) {
    value = value || this.getValue(true)
    var isArray = multTypes.indexOf(this.props.type) >= 0

    var {
      required,
      minlen,
      maxlen,
      readOnly,
      type
    } = this.props

    if (readOnly) {
      return true
    }

    // validate require
    if (required && (undefined === value || null === value || value.length === 0)) {
      this._validateFail('required', value)
      return false
    }

    if (undefined === value || null === value || '' === value) {
      this._validatePass()
      return true
    }

    // length
    var length = value.length
    if (minlen && length > 0 && length < minlen) {
      this._validateFail(isArray ? 'minlens' : 'minlen', minlen)
      return false
    }

    if (maxlen && length > maxlen) {
      this._validateFail(isArray ? 'maxlens' : 'maxlen', maxlen)
      return false
    }

    // validate type
    var reg = regs[type]
    if (reg && !reg.test(value)) {
      this._validateFail(type, value)
      return false
    }

    this._validatePass()
    return true
  },

  _validatePass: function () {
    this.setState({ hasError: false, errorText: '' })
  },

  _validateFail: function (type, value) {
    var text = getTip(type, value)
    this.setState({ hasError: true, errorText: text })
  }
}
