import moment from 'moment'
import {random} from 'faker'
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
  setVM (vm) {
    this.vm = vm
    return this
  },
  setStorage (storage) {
    this.storage = storage
    return this
  },
  find (id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject({ code: 403, message: 'ID is missing', data: {id: id} })
      }
      this.storage.getItem(id)
      .then((item) => {
        if (!item) {
          return reject({ code: 404, message: 'Not found', data: {id: id, item: item} })
        }
        this._loadRelations(item, resolve)
      }, reject)
    })
  },
  store (item) {
    item.id = item.id || random.uuid()
    return new Promise((resolve, reject) =>
      this.storage.setItem(item.id, item).then(resolve, reject)
    )
  },
  _loadRelations (item, resolve) {
    this.vm.TodoService.findByDate(item)
    .then((todos) => {
      item.todos = todos
      resolve(item)
    })
  }
}
