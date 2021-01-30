/**
 * 
 * @param {Object} rule 
 * @param {Object} data
 * 
 * @returns {String} 
 */

function field_Value(rule, data) {
  const nData = rule.field.split('.');
  if (nData.length === 2) {
      return data[nData[0]][nData[1]];
  }
  if (nData.length === 1) {
      return data[nData[0]];
  }
}

/**
 * 
 * @param {Object} rule
 * @param {String} condition
 * @param {Object|String|Array} data
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
        field_value: field_Value(rule, data),
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
        field_value: field_Value(rule, data),
        condition: `${condition}`,
        condition_value: `${rule.condition_value}`,
      },
    },
})

module.exports = {
    validationResponseSuccess,
    validationResponseFailure
}