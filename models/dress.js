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
      Dress.hasMany(model.user, {
        foreignKey: 'DressId'
      });
      // define association here
    }
  }
  Dress.init({
    dressModel: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    FashionDesignerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dress',
  });
  return Dress;
};