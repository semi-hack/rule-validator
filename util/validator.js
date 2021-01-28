const { validationResponseSuccess, validationResponseFailure} = require('./response')

/** 
 * This function validates the fields that are sent in the request
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * @returns {Object}
 */
const validateFields = (req, res, next) => {
     let validFields = [ 'rule', 'data']
     const validData = Object.keys(req.body)

     try {
         validFields.forEach((field) => {
             if(!validData.includes(field)) {
                 return res.status(400).json({
                    message: `${field} is required.`,
                    status: 'error',
                    data: null
                 })
             }
         })

         validData.forEach((field) => {
             if(!validFields.includes(field)) {
                 return res.status(400).json({
                     message: `Invalid JSON Payload passed.`,
                     status: 'error',
                     data: null
                 })
             }
         })
        next()
     } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * This function validates the type of data each field is
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * @returns {Object} 
 */
const validateType = (req, res, next) => {
    const { rule, data } = req.body
    const reqFields = ['field', 'condition', 'condition_value'];



    function isObject(val) {
        if (val === null) { return false;}
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

    function isString(x) {
        return Object.prototype.toString.call(x) === "[object String]"
    }

    if(!isObject(rule)) {
        return res.status(400).json({
            message: `rule should be an object.`,
            status: 'error',
            data: null,
        });
    }

    if(!isObject(data)){
        return res.status(400).json({
            message: `data should be an Object.`,
            status: 'error',
            data: null,
        });
    }

    next()
}

/**
 * This function does the rule validation and returns a boolean true or false
 * @param {Object} rule
 * @param {*} data
 * 
 * @returns {Object}
 */
const conditionValidator = ( rule, data ) => {
    let fieldValue = data[rule.field]
    let condition = rule.condition
    let condition_value = rule.condition_value

    console.log(fieldValue, condition, condition_value)

    switch(condition) {
        case "eq":
            if(fieldValue === condition_value) {
                return validationResponseSuccess(rule, data, "eq")
            } else {
                return validationResponseFailure(rule, data, "eq")
            }
        case "neq":
            if (fieldValue !== condition_value) {
                return validationResponseSuccess(rule, data, "neq")
            } else {
                return validationResponseFailure(rule, data, "neq")
            }
        case "gt":
            if (fieldValue > condition_value) {
                return validationResponseSuccess(rule, data, "gt")
            } else {
                return validationResponseFailure(rule, data, "gt")
            }
        case "gte":
            if (fieldValue >= condition_value) {
                return  validationResponseSuccess(rule, data, "gte")
            } else {
                return validationResponseFailure(rule, data, "gte")
            }
        case "contains":
            if (fieldValue,includes(condition_value)) {
                return validationResponseSuccess(rule, data, "contains")
            } else {
                return validationResponseFailure(rule, data, "contains")
            }
        default:

        return 
    }
}

module.exports = { validateFields, validateType, conditionValidator}




