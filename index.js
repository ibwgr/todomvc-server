'use strict'
import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'

let app = express()
app.use(bodyParser.json())

app.get('/items', function (req, res) {
  let items = fs.readFileSync('data.json', 'utf8')
  let payload = JSON.parse(items)
  
  res.json(payload)
})

app.post('/items', function (req, res) {
  let payload = req.body
  let items = fs.readFileSync('data.json', 'utf8')
  let db = JSON.parse(items)

  db.push(payload)

  fs.writeFileSync('data.json', JSON.stringify(db), {encoding: 'utf8'})

  res.json(payload)
})

app.listen(3100)