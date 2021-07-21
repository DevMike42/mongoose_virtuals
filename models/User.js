const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String
    }
  },
  // Options required when converting document to JSON
  {
    toJSON: {
      virtuals: true
    },
    // Prohibits model from adding additional id
    id: false
  }
)

UserSchema
  .virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`
  })
  .set(function (v) {
    const firstName = v.substring(0, v.indexOf(' '))
    const lastName = v.substring(indexOf(' ') + 1)
    this.set({ firstName, lastName })
  })


const User = model('user', UserSchema)

module.exports = User