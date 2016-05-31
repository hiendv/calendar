import moment from 'moment'
function factory () {
  if (arguments.length === 1 && !arguments[0]) {
    // Allow null arg to the factory's constructor
    return moment()
  }
  return moment.apply(null, arguments)
}
export default {
  getInstance () {
    factory.daysInAWeek = () => {
      return moment.weekdaysShort.apply(null, arguments)
    }
    factory.monthsInAYear = () => {
      return moment.monthsShort.apply(null, arguments)
    }
    return factory
  }
}
