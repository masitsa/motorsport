"use strict";
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car", {
      car_title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      car_location: {
        allowNull: false,
        type: DataTypes.STRING
      },
      //car_brand_id: { allowNull: false, type: DataTypes.INTEGER },
      car_model_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      car_year: {
        allowNull: false,
        type: DataTypes.DATE
      },
      brand_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      car_transmission: {
        allowNull: false,
        type: DataTypes.STRING
      },
      car_price: {
        allowNull: false,
        type: DataTypes.STRING
      },
      car_imgs: DataTypes.STRING
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'cars',
      operatorsAliases: false
    });
  Car.associate = function (models) {
    // associations can be defined here
    Car.belongsTo(models.Model, {
      foreignKey: "car_model_id",
      onDelete: "CASCADE",
      as: "model_car"
    });

    Car.belongsTo(models.Brand, {
      foreignKey: "brand_id",
      onDelete: "CASCADE",
      as: "brand_car"
    });
  };
  return Car;
};