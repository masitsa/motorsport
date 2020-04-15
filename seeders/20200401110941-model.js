"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Models",
      [
        //bmw
        {
          model_name: "5 series",
          brand_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "X3",
          brand_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "X5",
          brand_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "x6",
          brand_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          model_name: "Z3",
          brand_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        //Mercedes
        {
          model_name: "GLC coupe",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "GLE coupe",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Cclass",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Eclass",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "AMG GT",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "SLS",
          brand_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        //Audi

        {
          model_name: "Q8",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "S6",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "A3",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "A6",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "R8",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "RSQ8",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "RS4",
          brand_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        //Volkswagen
        {
          model_name: "Toureg",
          brand_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Passat",
          brand_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Beetle",
          brand_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Polo",
          brand_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Jetta",
          brand_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        //Alfa Romeo
        {
          model_name: "Giulia Quadrifolio",
          brand_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Giulia Veloche",
          brand_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Stelvio Quadrifolio",
          brand_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },

        //Subaru
        {
          model_name: "WRX sti",
          brand_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Forester",
          brand_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          model_name: "Impreza",
          brand_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          model_name: "Outback",
          brand_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Models", null, {});
  }
};