"use strict";
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define(
    "Brand", {
      brand_name: DataTypes.STRING,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'brands',
      operatorsAliases: false
    });
  Brand.associate = function (models) {
    // associations can be defined here
    Brand.hasMany(models.Model, {
      foreignKey: "brand_id",
      onDelete: "CASCADE",
      as: "brand_model"
    });

    Brand.hasMany(models.Car, {
      foreignKey: "brand_id",
      onDelete: "CASCADE",
      as: "brand_car"
    });
  };
  return Brand;
};