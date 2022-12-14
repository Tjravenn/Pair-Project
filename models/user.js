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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            msg: "username cannot be null"
          },
          notEmpty: {
            msg: "username cannot be empty"
          }
      }
    } ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { 
          msg: "email cannot be null "
        },
        notEmpty: {
           msg: "email cannot be empty"
          },
      }
    },
    password: {
      type: DataTypes.STRING,
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
        }
    } ,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "role cannot be null"
        },
        notEmpty: {
          msg: "role cannot be empty"
        }
      }
    } 
    
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (val) => {
        val.password = hashPassword(val.password);
        val.role = 'user';
      }
    }
  });
  return User;
};