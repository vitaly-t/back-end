require('app-module-path').addPath(__dirname)
const express = require('express')

const router = require('src/router')
const accessController = require('src/middleware/access-controller')
const errorHandler = require('src/middleware/error-handler')
const fb2userId = require('src/middleware/fb2user-id')

const app = express()

const PORT = 3000

app.use(accessController)
app.use(fb2userId)

for (let prop in router) {
  app.use('/api', router[prop])
}

app.get('/', (req, res) => {
  res.sendStatus(404)
})
app.get('/*', (req, res) => res.redirect('/'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is up and runnning on port(${PORT})...`)
})
