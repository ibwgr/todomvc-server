'use strict'
import express from 'express'
let app = express()

app.get('/items', function (req, res) {
  let items = [{
    id: new Date().getTime(),
    title: 'Putzen'
  }]
  let payload = JSON.stringify(items)
  res.send(payload)
})

app.listen(3100)