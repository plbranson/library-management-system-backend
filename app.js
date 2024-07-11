/**
 * Copyright 2024 Patrick L. Branson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const logger = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')

// Allows access to the .env file
require('dotenv').config()

// Imports the routes
const indexRouter = require('./routes/index.route')
const usersRouter = require('./routes/users.route')

// Initializes Application
const app = express()

// The view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// The application middleware
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Adds the routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

// Catches the 404 and forwards to the Error Handler
app.use((req, res, next) => {
  next(createError(404))
})

// The Error Handler
app.use((err, req, res, next) => {
  // Sets the locals and only provides an error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Renders the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
