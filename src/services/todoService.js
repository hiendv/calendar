export default {
  // Demonstration purpose only
  factory (date) {
    return {
      id: date
    }
  },

  setStorage (storage) {
    this.storage = storage
    return this
  },

  show (date) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.storage.getItem(date).then((todos) => {
        date = self.factory(date)
        date.todos = todos
        return date
      })
    })
  }
}
