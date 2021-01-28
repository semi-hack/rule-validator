const express = require("express");
const { conditionValidator, validateFields, validateObject } = require('../util/validator');
const getData = async (req, res) => {

    const data = {
        name: 'Oluwasemiloore Akinlo',
        github: '@semi-hack',
        email: 'asemiloore@gmail.com',
        mobile: '08065434987',
        twitter: '@_zhemi_',
    };

    return res.status(200).send({
      message: "My Rule-validation Api",
      status: "success",
      data
    })
};



const ruleValidation = (req, res) => {

  const {rule, data } = req.body
  const dataValues = Object.keys(data)

  try {
    if (!dataValues.includes(rule.field)) {
        return res.status(400).send({
          message: `field ${rule.field} is missing from data.`,
          status: 'error',
          data: null,
        });
    }

    const result = conditionValidator( rule, data) 
    if (result) {
        return res.status(200).send(result);
    } else {
        return res.status(200).json(result);
    }

  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
    getData,
    ruleValidation
}

      // if the rule field is not passed ,  error 400 and response is
//    {
//     "message": "rule is required."
//     "status": "error",
//     "data": null
//   }

// If a field is of the wrong type, your endpoint should return with a response (HTTP 400 status code) that is similar to the below:
// {
//   "message": "[field] should be a|an [type]."
//   "status": "error",
//   "data": null
// }


   // if the rule field is passed as a number,  error 400 and response is
//    {
//     "message": "rule should be an object."
//     "status": "error",
//     "data": null
//   }


   // if wrong json payload is passed to the api should be error 400 and
//    {
//     "message": "Invalid JSON payload passed."
//     "status": "error",
//     "data": null
//   }

  // if field(rule) in not in the data return error 400 and response should be
//   {
//     "message": "field [name of field] is missing from data."
//     "status": "error",
//     "data": null
//   }

  // if rule is succesfully met then
//   return res.json({
//     message: `${req.body.rule.field} successfully validated.`,
//     status: "success",
//     data: {
//       validation: {
//         error: false,
//         field: `${req.body.rule.field}`,
//         field_value: 45,
//         condition: `${req.body.rule.condition}`,
//         condition_value: `${rule.condition_value}`,
//       },
//     },
//   });

  // else if rule fails
//   return res.json({
//     message: `field ${req.body.rule.field} failed validation.`,
//     status: "error",
//     data: {
//       validation: {
//         error: true,
//         field: `${req.body.rule.field}`,
//         field_value: 45,
//         condition: `${req.body.rule.condition}`,
//         condition_value: `${rule.condition_value}`,
//       },
//     },
//   });
// };


