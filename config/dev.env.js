'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"/api/api/ds"',
  URL_WEBSITE: '"http://10.155.22.252"'
  // URL_WEBSITE: '""'
})
