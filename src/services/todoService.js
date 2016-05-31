// The seeder
import {random, lorem} from 'faker'
export default {
  _seedObject () {
    return {
      id: random.uuid(),
      content: lorem.sentence(),
      completed: random.boolean()
    }
  },
  _seed () {
    let list = []
    let quantity = random.number({
      max: 5
    })
    for (let i = 0; i < quantity; i++) {
      list.push(this._seedObject())
    }
    return list
  },
  setStorage (storage) {
    this.storage = storage
    return this
  },
  getByDate (date) {
    let self = this
    return new Promise((resolve, reject) => {
      self.storage.getItem('date:' + date)
      .then((list) => {
        if (!list) {
          let fakeList = self._seed()
          self.storage.setItem('date:' + date, fakeList).then(resolve)
        }
        resolve(list)
      }, reject)
    })
  }
}
