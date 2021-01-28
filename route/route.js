const express = require('express')
const router = express.Router()
const validator = require('../controller/controller');
const { validateFields, validateType } = require('../util/validator')


router.get('/', validator.getData);
router.post('/validate-rule',[validateFields, validateType ], validator.ruleValidation)

module.exports = router