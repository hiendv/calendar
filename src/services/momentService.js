import moment from 'moment'
export default {
  factory () {
    if (arguments.length === 1 && !arguments[0]) {
      // Allow null arg to the factory's constructor
      return moment()
    }
    return moment.apply(null, arguments)
  },
  getFactory () {
    this.factory.daysInAWeek = () => {
      return moment.weekdaysShort.apply(null, arguments)
    }
    this.factory.monthsInAYear = () => {
      return moment.monthsShort.apply(null, arguments)
    }
    return this.factory
  },
  setStorage (storage) {
    this.storage = storage
    return this
  },
  setServices (services) {
    this.services = services
  },
  prepare (date) {
    date.todos = this.services.todo.getByDate(date.id)
  },
  find (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self.storage.getItem(id)
      .then((date) => {
        date = self.prepare(date)
        resolve(date)
      }, () => {
        reject.apply(null, arguments)
      })
    })
  },
  show (id) {
    let self = this
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject('Missing id', id)
      }
      return self.find(id)
      .then((date) => {
        resolve(date)
      }, () => {
        reject.apply(null, arguments)
      })
    })
  }
}
