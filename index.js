'use strict'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

let app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:1234',
  credentials: true
}))

app.get('/items', function (req, res) {
  let items = fs.readFileSync('data.json', 'utf8')
  let payload = JSON.parse(items)
  res.json(payload)
})

app.delete('/items/:id/', function (req, res) {
  let items = fs.readFileSync('data.json', 'utf8')
  let db = JSON.parse(items)

  let sessionId = req.cookies['mvc-sess-id']
  if(!sessionId){
    res.status(401)
    res.json({})
    return
  }

  let idx = db.findIndex((item)=>item.id === req.body.id);
  db.splice(idx, 1)

  fs.writeFileSync('data.json', JSON.stringify(db), {encoding: 'utf8'})

  res.json({})
})

app.post('/items', function (req, res) {
  let payload = req.body
  let items = fs.readFileSync('data.json', 'utf8')
  let db = JSON.parse(items)

  if(payload.title === 'admin'){
    res.cookie('mvc-sess-id', '1234', {httpOnly: true})
  }

  db.push(payload)

  fs.writeFileSync('data.json', JSON.stringify(db), {encoding: 'utf8'})

  res.json(payload)
})

app.listen(3100)