const express = require('express')
const connectDB = require('./config/db')
const User = require('./models/User')

const app = express()

connectDB()

app.use(express.json({ extended: false }))


app.post('/users', async ({ body }, res) => {
  try {
    const user = await User.create(body)
    user.username = body.email
    res.json(user)
  } catch (err) {
    console.error(err)
  }
})

app.get('/users/:id', async ({ params, body }, res) => {
  try {
    const user = await User.findOne({ _id: params.id })
    res.json(user)
  } catch (err) {
    console.error(err)
  }
})

// app.put('/users/:id', async ({ params, body }, res) => {
//   User.fullName = (`${body.firstName} ${body.lastName}`)
// })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))