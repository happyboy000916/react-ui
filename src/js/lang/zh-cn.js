module.exports = {
  request: {
    status: {
      400: '',
      404: '所请求的地址不存在'
    },
    loading: '读取中...',
    error: '获取失败.'
  },
  page: {
    buttons: {
      add: '新建',
      back: '返回',
      fields: '字段',
      filter: '筛选',
      refresh: '刷新',
      reset: '重置',
      save: '保存'
    }
  },
  validation: {
    hints: {
      required: '必填',
      maxlen: '最大长度 {0}',
      minlen: '最小长度 {0}',
      password: '大写英文字符,小写英文字符,数字,特殊字符'
    },
    tips: {
      email: '格式不正确',
      required: '不能为空',
      maxlen: '最大长度不能超过 {0} 个字符',
      minlen: '最小长度不能少于 {0} 个字符',
      password: '含有非法字符'
    }
  }
}
