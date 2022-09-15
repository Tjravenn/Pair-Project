'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FashionDesigner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FashionDesigner.hasOne(models.Dress, {
        foreignKey: 'FashionDesignerId'
      });
      // define association here
    }
  }
  FashionDesigner.init({
    nameOfDressMaker: DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: 'name of dress maker cannot be null'
        },
        notEmpty: {
          msg: 'name of dress maker cannot be empty'
        }
      },
    address: DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: 'address cannot be null'
        },
        notEmpty: {
          msg: 'address cannot be empty'
        }
      },
    phoneNumber: DataTypes.STRING,
    allowNull: false,
      validate: {
        isNumeric: {
          msg: 'phone number can only be number'
        },
        notNull: {
          msg: 'phone number cannot be null'
        },
        notEmpty: {
          msg: 'phone number cannot be empty'
        },
        minimumPhoneNumber(value) {
          if (value.length < 8 || value.length > 14) {
            throw new Error('Phone number need 8 number as minimum and 14 number as maximum')
          }
        }
      },
  }, {
    sequelize,
    modelName: 'FashionDesigner',
  });
  return FashionDesigner;
};