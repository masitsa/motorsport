"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "cars",
      [
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "Blue x7",
          car_location: "Singapore",
          car_model_id: "4",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "Black SLS",
          car_location: "Tokyo",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        },
        {
          car_title: "silver Eclass",
          car_location: "USA",
          car_model_id: "3",
          car_year: "2015",
          car_transmission: "automatic",
          car_price: "$20000"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Cars", null, {});
  }
};
