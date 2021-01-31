const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

const db = require('../db');

const User = db.define("fitness", {
    firstName : {
        type: Sequelize.STRING,
        defaultValue: "First Name Here",
        allowNull: false,

    },
    lastName : {
        type: Sequelize.STRING,
        defaultValue: "Last Name Here",
        allowNull: false,

    },
    email : {
        type: Sequelize.STRING,
        allowNull: false,

    },
    height :{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    weight :{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    BMI:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    exercise:{
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        defaultValue: [1,2,3],
    }

});

module.exports = User;