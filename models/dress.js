'use strict';
const {
  Model
} = require('sequelize');
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
      Dress.hasMany(models.User, {
        foreignKey: 'DressId'
      });
      // define association here
    }
  }
  Dress.init({
    dressModel:{
      type:DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            msg: "Dress model cannot be null"
          },
          notEmpty: {
            msg: "Dress model cannot be empty"
          }
        }
    } ,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notNull: {
            msg: " price cannot be null"
          },
          notEmpty: {
            msg: " price cannot be empty"
          },
          minimumPrice(value) {
            if (value < 350000) {
              throw new Error(`Minimum selling price is ${formatRp}`)
            }
          }
        }
    } ,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notNull: {
            msg: " stock cannot be null"
          },
          notEmpty: {
            msg: " stock cannot be empty"
          },
          minimumStock(value) {
            if (value < 0) {
              throw new Error('STOCK CANNOT BE NEGATIVE!')
            }
          }
        }
    } ,
    FashionDesignerId: DataTypes.INTEGER,
    DressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dress',
  });
  return Dress;
};