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
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FashionDesigner',
  });
  return FashionDesigner;
};