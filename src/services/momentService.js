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
  store (id, date) {
    return new Promise((resolve, reject) => {
      this.storage.setItem(id, date)
      .then(resolve, reject)
    })
  },
  find (id) {
    return new Promise((resolve, reject) => {
      this.storage.getItem(id)
      .then((date) => {
        if (!date) {
          // return reject({code: 404, message: 'Date not found', data: {id: id}})
          return this.store(id, {id: id}).then(() => {
            this.find(id)
          })
        }
        this.services.todo.getByDate(date.id)
        .then((todos) => {
          date.todos = todos
          resolve(date)
        })
      }, reject)
    })
  },
  show (id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject({code: 403, message: 'Missing id', data: {id: id}})
      }
      return this.find(id)
      .then(resolve, reject)
    })
  }
}
