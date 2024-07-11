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

const mongoose = require('mongoose')

/**
 * Connects to the Mongo Database
 */
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    console.log('Database connected', connection.connection.host, connection.connection.name)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDb
