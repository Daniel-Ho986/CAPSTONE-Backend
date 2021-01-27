const Sequelize = require('sequelize');

const db = require('../db');

const Plan = db.define("workout", {
    BMIClass:{
        type: Sequelize.STRING,
        defaultValue: "none"
    },
    exercises:{
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        defaultValue: [1,2,3]
    }

});
module.exports = Plan;