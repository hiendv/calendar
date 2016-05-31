import moment from 'moment'
export default {
  getInstance () {
    var factory = moment
    factory.daysInAWeek = () => {
      return moment.weekdaysShort.apply(null, arguments)
    }
    factory.monthsInAYear = () => {
      return moment.monthsShort.apply(null, arguments)
    }
    return factory
  }
}
