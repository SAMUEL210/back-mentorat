var express = require('express')
var objectifModel = require('../models/objectif')
var { createToken, checkToken } = require('../utilities/token')

var router = express.Router()



module.exports = router