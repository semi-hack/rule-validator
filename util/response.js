/**
 * 
 * @param {Object} rule
 * @param {String} condition
 * @param {Object|String|Array}
 * 
 * @returns {Object}
 * 
 */
const validationResponseSuccess = (rule, data, condition) => ({
    message: `field ${rule.field} successfully validated.`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field: `${rule.field}`,
        field_value: `${data[rule.field]}`,
        condition: `${condition}`,
        condition_value: `${rule.condition_value}`,
      },
    },  
})

/**
 * @param {Object} rule
 * @param {String} condition
 * @param {Object|String|Array} data
 * 
 * @returns {Object}
 */
const validationResponseFailure = (rule, data, condition) => ({
    message: `field ${rule.field} failed validation.`,
    status: 'error',
    data: {
      validation: {
        error: true,
        field: `${rule.field}`,
        field_value: `${data[rule.field]}`,
        condition: `${condition}`,
        condition_value: `${rule.condition_value}`,
      },
    },
})

module.exports = {
    validationResponseSuccess,
    validationResponseFailure
}