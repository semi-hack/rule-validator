const express = require("express");
const { conditionValidator } = require('../util/validator');


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

function getNestedData(data, path) {
  const keys = path.split("."); 
  if (keys.length > 2 || !keys[0]) {
      return { Success: false };
  }
  else if (keys.length === 2) {
      return { value: data[keys[0]][keys[1]], Success: true };
  }
  return { value: data[keys[0]], Success: true }; // data["3"]
}



const ruleValidation = (req, res) => {

  const {rule, data } = req.body
  const dataValues = Object.keys(data)
  const { value: fieldValue } = getNestedData(data, rule.field)

  try {
    if (!fieldValue) {
      return res.status(400).send({
        message: `field ${rule.field} is missing from data.`,
        status: 'error',
        data: null,
      });
    }
    // if (!dataValues.includes(rule.field)) {
    //     return res.status(400).send({
    //       message: `field ${rule.field} is missing from data.`,
    //       status: 'error',
    //       data: null,
    //     });
    // }

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