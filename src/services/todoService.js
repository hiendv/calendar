// The seeder
import {random, lorem} from 'faker'
export default {
  setVM (vm) {
    this.vm = vm
    return this
  },
  setStorage (storage) {
    this.storage = storage
    return this
  },
  findByDate (date) {
    let list = []
    return new Promise((resolve, reject) => {
      this.storage.iterate((value, key) => {
        if (value.date.id === date.id) {
          list.push(value)
        }
      }).then(() => resolve(list))
    })
  },
  find (id) {
    return new Promise((resolve, reject) => this.storage.getItem(id).then((item) => {
      if (!item) {
        return reject({code: 404, message: 'Not found', data: {id: id}})
      }
      resolve(item)
    }, reject))
  },
  store (item) {
    item.id = random.uuid()
    item.created_at = new Date()
    return new Promise((resolve, reject) =>
      this.storage.setItem(item.id, item).then((item) => {
        this.vm.$emit('todo:created', item)
        resolve(item)
      }, (item) => {
        reject(item)
      })
    )
  },
  update (id, item) {
    item.updated_at = new Date()
    return new Promise((resolve, reject) =>
      this.find(id)
      .then((i) => this.storage.setItem(i.id, item).then((item) => {
        this.vm.$emit('todo:updated', item)
        resolve(item)
      }, (item) => {
        reject(item)
      }))
    )
  },
  destroy (id) {
    return new Promise((resolve, reject) =>
      this.find(id)
      .then((i) => this.storage.removeItem(i.id).then(() => {
        this.vm.$emit('todo:deleted')
        resolve(i)
      }, (item) => {
        reject(item)
      }))
    )
  },
  seeder: {
    _seedTodo () {
      return {
        id: random.uuid(),
        content: lorem.sentence(),
        completed: random.boolean()
      }
    },
    run () {
      let list = []
      let quantity = random.number({
        max: 5
      })
      for (let i = 0; i < quantity; i++) {
        list.push(this._seedTodo())
      }
      return list
    }
  }
}
