'use strict';
const {
  Model
} = require('sequelize');
const formatRp = require('../helpers/formatRp');
module.exports = (sequelize, DataTypes) => {
  class Dress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dress.belongsTo(models.FashionDesigner, {
        foreignKey: 'FashionDesignerId'
      });
      Dress.hasMany(model.user, {
        foreignKey: 'DressId'
      });
      // define association here
    }
  }
  Dress.init({
    dressModel: DataTypes.STRING,
    allowNull: false,
      validate: {
        notNull: {
          msg: "Dress model cannot be null"
        },
        notEmpty: {
          msg: "Dress model cannot be empty"
        }
      },
    price: DataTypes.INTEGER,
    allowNull: false,
      validate: {
        notNull: {
          msg: "Magazine price cannot be null"
        },
        notEmpty: {
          msg: "Magazine price cannot be empty"
        },
        minimumPrice(value) {
          if (value < 350000) {
            throw new Error(`Minimum selling price is ${formatRp}`)
          }
        }
      },
    stock: DataTypes.INTEGER,
    allowNull: false,
      validate: {
        notNull: {
          msg: "magazine stock cannot be null"
        },
        notEmpty: {
          msg: "magazine stock cannot be empty"
        },
        minimumStock(value) {
          if (value < 0) {
            throw new Error('STOCK CANNOT BE NEGATIVE!')
          }
        }
      },
    FashionDesignerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dress',
  });
  return Dress;
};