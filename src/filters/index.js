import Vue from 'vue'
// import Moment from 'moment'
import format from 'date-fns/format'

Vue.filter('date-format', function (value, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return format(value, formatString)
})
