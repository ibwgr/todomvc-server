'use strict'
import express from 'express'
import fs from 'fs'
let app = express()

app.get('/items', function (req, res) {
  let items = fs.readFileSync('data.json', 'utf8')
  let payload = JSON.parse(items)
  res.send(payload)
})

app.listen(3100)