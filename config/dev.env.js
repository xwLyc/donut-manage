'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"/api/app"',
  // URL_WEBSITE: '"http://10.155.32.137"'
  URL_WEBSITE: '""'
})
