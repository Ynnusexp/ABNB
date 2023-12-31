'use strict';
const {
  Model
} = require('sequelize');
const spot = require('./spot');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userId"
      })
      Booking.belongsTo(models.Spot,{
        foreignKey: "spotId"
      })
    }
  }
  // Booking.init({
  //   spotId: DataTypes.INTEGER,
  //   userId: DataTypes.INTEGER,
  //   startDate: DataTypes.STRING,
  //   endDate: DataTypes.STRING
  // }, {
  //   sequelize,
  //   modelName: 'Booking',
  // });

  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
