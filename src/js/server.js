var bodyParser = require('body-parser')
var cors = require('cors')
var express = require('express')
var path = require('path')

var node = express()
node.use(cors())
node.set('views', path.join(__dirname, '../ejs'))
node.set('view engine', 'ejs')
node.use(express.static(path.join(__dirname, '../../public')))
node.use(bodyParser.json())
node.use(bodyParser.urlencoded({extended: true}))

var blockchain = require('./blockchain.js')

var argv = require('yargs')
  .default(blockchain.DEFAULT_OPTIONS)
  .help('help')
  .describe('clientPort', "Web interface port")
  .describe('peersUpdateInterval', "Interval for fetching information about peers (seconds)")
  .describe('noSgx', "Use mock implementation and not Intel SGX")
  .boolean('noSgx')
  .default('noSgx', false)
  .argv

if (argv.noSgx) {
  process.env.FORCE_MOCK_SECUREWORKER = "true"
}

blockchain(node, argv)

module.exports = node
