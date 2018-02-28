/* eslint no-console: "off" */
/* global require */
require('dotenv').config()
const express = require('express')
const request = require('request')
const cors = require('cors')
const merge = require('merge-objects')

const app = express()
const PORT = 3333
const URL = 'http://ws.audioscrobbler.com/2.0/'
const API_KEY = process.env.LASTFM_API_KEY
const USERNAME = 'luke--mitchell'

app.use(cors())

app.get('/recent_tracks', (req, res) => {
  var params = {
    method: 'user.getrecenttracks',
    api_key: API_KEY,
    user: USERNAME,
    format: 'json',
    extended: 1
  }

  request({url: URL, qs: params}, function(err, response, body){
    if (err) {
      return console.error('( Recent Tracks ) Error: ', err)
    }
    res.send(body)
  })
})

app.get('/recent_tracks/total/:from.:to?', (req, res) => {
  var params = {
    method: 'user.getrecenttracks',
    api_key: API_KEY,
    user: USERNAME,
    format: 'json'
  }
  params = merge(params, req.params)

  request({url: URL, qs: params}, function(err, response, body){
    if (err) {
      return console.error('( Recent Tracks From ) Error: ', err)
    } else {
      var b = JSON.parse(body)
      var total = b.recenttracks['@attr'].total.toString()
      res.send(total)
    }
  })
})

app.get('/weekly_album_chart/total', (req, res) => {
  var params = {
    method: 'user.getweeklyalbumchart',
    api_key: API_KEY,
    user: USERNAME,
    format: 'json'
  }

  request({url: URL, qs: params}, function(err, response, body){
    if (err) {
      return console.error('( Weekly Album Chart ) Error: ', err)
    } else {
      var b = JSON.parse(body)
      var total = b.weeklyalbumchart.album.length.toString()
      res.send(total)
    }
  })
})

app.get('/weekly_artist_chart/total', (req, res) => {
  var params = {
    method: 'user.getweeklyartistchart',
    api_key: API_KEY,
    user: USERNAME,
    format: 'json'
  }

  request({url: URL, qs: params}, function(err, response, body){
    if (err) {
      return console.error('( Weekly Artist Chart ) Error: ', err)
    } else {
      var b = JSON.parse(body)
      var total = b.weeklyartistchart.artist.length.toString()
      res.send(total)
    }
  })
})

app.get('/', (req, res) => {
  res.send('Swansong Server')
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))
