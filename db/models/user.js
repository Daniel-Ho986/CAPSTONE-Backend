const Sequelize = require('sequelize');
const crypto = require('crypto');
const db = require('../db');

const User = db.define("player", {
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
    weight :{
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    BMI:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("password");
        }
      },
      salt: {
        type: Sequelize.STRING,
        get() {
          return () => this.getDataValue("salt");
        }
      },
      googleId: {
        type: Sequelize.STRING
      }
});
User.generateSalt = function() {
    return crypto.randomBytes(16).toString("base64");
  };
  
  User.encryptPassword = function(plainText, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");
  };
  
  User.prototype.correctPassword = function(candidatePwd) {
    return User.encryptPassword(candidatePwd, this.salt()) === this.password();
  };
  
  const setSaltAndPassword = user => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

module.exports = User;