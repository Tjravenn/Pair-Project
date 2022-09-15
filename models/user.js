'use strict';
const { Model } = require('sequelize');
const hashPassword = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    get formatDate () {
      const date = new Date(this.dateFound);
      return date.toISOString().split("T")[0];
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Dress, {
        foreignKey: 'DressId'
      });
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: "username cannot be null"
        },
        notEmpty: {
          msg: "username cannot be empty"
        }
    },
    password: DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null"
        },
        notEmpty: {
          msg: "password cannot be empty"
        },
        minimumPassword(value) {
          if (value.length < 3) {
            throw new Error('password needs to have 3 minimal words')
          }
        }
      },
    role: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "role cannot be null"
      },
      notEmpty: {
        msg: "role cannot be empty"
      }
    },
    DressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = encrypt(user.password);
  });
  return User;
};