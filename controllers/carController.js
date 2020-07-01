const sequelize = require("sequelize");
const Op = sequelize.Op;
const Car = require("../models").Car;
const Brand = require("../models").Brand;
const Model = require("../models").Model;
const Buffer = require('buffer').Buffer;

const {
  createError,
  validateCarInput,
  isEmpty
} = require("../validation");

module.exports = {
  findCar(where, result) {
    // console.log(where);
    Car.findOne({
        raw: true,
        where: where,
      })
      .then((fetchedCar) => {
        console.log(fetchedCar);
        return result(null, fetchedCar);
      })
      .catch((err) => {
        result(err, null);
      });
  },

  saveCar(reqCar, carUrl, result) {
    // console.log("vista");
    // console.log(reqCar);
    const {
      errors,
      isValid
    } = validateCarInput(reqCar);
    if (!isValid) {
      const customError = createError(errors);
      result(customError, null);
    } else {
      this.findCar({
          car_title: reqCar.car_title,
          car_location: reqCar.car_location,
          phone_number: reqCar.phone_number,
          car_year: reqCar.car_year,
          car_transmission: reqCar.car_transmission,
          car_price: reqCar.car_price,
          car_model_id: reqCar.car_model_id,
          brand_id: reqCar.brand_id
        },
        (err, dbCar) => {

          if (err) {
            const customError = createError(err);
            result(customError, null);
          } else {
            if (dbCar) {
              const customError = createError({
                car: "Car already exist",
              });
              result(customError, null);
            } else {
              Car.create({
                  car_title: reqCar.car_title,
                  car_location: reqCar.car_location,
                  car_year: reqCar.car_year,
                  car_transmission: reqCar.car_transmission,
                  car_price: reqCar.car_price,
                  phone_number: reqCar.phone_number,
                  car_model_id: reqCar.car_model_id,
                  brand_id: reqCar.brand_id,
                  car_imgs: carUrl,
                })
                .then(() => {
                  result(null, {
                    message: "Success",
                  });
                })
                .catch((err) => {
                  const customError = createError(err);
                  result(customError, null);
                });
            }
          }
        }
      );
    }
  },
  getAllCar(
    page,
    limit,
    order,
    ordermethod,
    car_title,
    car_location,
    car_transmission,
    result
  ) {
    // console.log("silphy");
    let where = {};
    if (!isEmpty(car_title)) {
      where["car_title"] = {
        [Op.like]: "%" + car_title + "%",
      };
    }
    console.log("saab");
    if (!isEmpty(car_location)) {
      where["car_location"] = {
        [Op.like]: "%" + car_location + "%",
      };
    }
    if (!isEmpty(car_transmission)) {
      where["car_transmission"] = {
        [Op.like]: "%" + car_transmission + "%",
      };
    }
    console.log("saab");
    Car.findAll({
        // attributes: ["*"],
        // attributes: [
        //   ["car_title", "title"],
        //   ["car_location", "location"],
        //   ["car_transmission", "transmission"],
        // ],
        attributes: [
          "car_title",
          "id",
          "car_location",
          "phone_number",
          "car_model_id",
          [sequelize.col("model_car.model_name"), "model_name"],
          [sequelize.col("model_car.brand_id"), "brand_id"],
          [sequelize.col("model_car.brand_model.brand_name"), "brand_name"],
          // [sequelize.col("model_car.brand_model.id"), "brand_id"],
          "car_price",
          "car_year",
          "car_transmission",
          "car_imgs"
        ],
        offset: page * limit,
        limit: limit,
        raw: true,
        where: where,
        order: [
          [order, ordermethod]
        ],
        include: [{
          model: Model,
          as: "model_car",
          attributes: [],
          include: [{
            model: Brand,
            as: "brand_model",
            attributes: [],
          }]
        }],
      })
      .then((fetchedCar) => {
        // for (let i = 0; i < fetchedCar.length; i++) {
        //   console.log(fetchedCar[i])
        //   let carimages = fetchedCar[i].car_imgs;
        //   let buf = Buffer.from(carimages);
        //   let base64 = buf.toString('base64');
        //   //console.log(base64)
        // }
        this.countCar(where, (err, total) => {
          if (err) {
            result(err, null);
          } else {
            result(null, {
              rows: total,
              items: fetchedCar,
            });
          }
        });
      })
      .catch((err) => {
        result(err, null);
      });
  },
  countCar(where, result) {
    // console.log("impreza");
    // console.log(where);

    Car.count({
        where: where,
      })
      .then((total) => {
        result(null, total);
      })
      .catch((error) => {
        result(error, null);
      });
  },

  getCarDetails(phone, result) {
    // console.log("panamera");
    Car.findOne({
        attributes: [
          "car_title",
          "car_location",
          "car_year",
          "car_transmission",
          "car_price", [sequelize.col("model_car.model_name"), "model_name"],
          [sequelize.col("model_car.brand_model.brand_name"), "brand_name"],
          // [sequelize.col("model_car.brand_model.id"), "brand_id"],
        ],
        raw: true,
        where: {
          phone_number: phone.phone_number
        },
        include: [{
          model: Model,
          as: "model_car",
          attributes: [],
          include: [{
            model: Brand,
            as: "brand_model",
            attributes: [],
          }]
        }, ],
      })
      .then((car) => {
        return result(null, car);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },

  fetchCar(reqCar, result) {
    // console.log("panamera");
    // console.log(reqCar);
    Car.findOne({
        attributes: [
          "car_title",
          "car_location",
          "car_year",
          "car_transmission",
          "car_price", [sequelize.col("model_car.model_name"), "model_name"],
          [sequelize.col("model_car.brand_model.brand_name"), "brand_name"],
          // [sequelize.col("model_car.brand_model.id"), "brand_id"],
        ],
        raw: true,
        where: {
          [Op.or]: [{
              car_title: {
                [Op.like]: '%' + reqCar + '%'
              }
            },
            {
              '$model_car.model_name$': {
                [Op.like]: '%' + reqCar + '%'
              }
            },
            {
              '$model_car.brand_model.brand_name$': {
                [Op.like]: '%' + reqCar + '%'
              }
            },
          ],
        },
        include: [{
          model: Model,
          as: "model_car",
          attributes: [],
          include: [{
            model: Brand,
            as: "brand_model",
            attributes: [],
          }]
        }, ],
      })
      .then((fetchedCar) => {
        return result(null, fetchedCar);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },

  fetchAllCars(reqCar, result) {
    Car.findAll({
        attributes: [
          "car_title",
          "car_location",
          "car_year",
          "car_transmission",
          "car_price",
          "car_imgs", [sequelize.col("model_car.model_name"), "model_name"],
          [sequelize.col("model_car.brand_model.brand_name"), "brand_name"],
          // [sequelize.col("model_car.brand_model.id"), "brand_id"],
        ],
        raw: true,
        where: {
          [Op.or]: [{
              car_title: {
                [Op.like]: '%' + reqCar + '%'
              }
            },
            {
              '$model_car.model_name$': {
                [Op.like]: '%' + reqCar + '%'
              }
            },
            {
              '$model_car.brand_model.brand_name$': {
                [Op.like]: '%' + reqCar + '%'
              }
            },
          ],
        },
        include: [{
          model: Model,
          as: "model_car",
          attributes: [],
          required: false,
          include: [{
            model: Brand,
            as: "brand_model",
            attributes: [],
            required: false
          }]
        }],
      })
      .then((fetchedAllCar) => {
        // console.log('gt4')
        // console.log(fetchedAllCar)
        return result(null, fetchedAllCar);
      })
      .catch((err) => {
        const customError = createError(err);
        result(customError, null);
      });
  },

  // getCar(car_title, brand_name, model_name, result) {
  //   let where = {};
  //   let modelWhere = {};
  //   let brandWhere = {};
  //   if (!isEmpty(car_title)) {
  //     where["car_title"] = {
  //       [Op.like]: "%" + car_title + "%",
  //     };
  //   }
  //   if (!isEmpty(brand_name)) {
  //     brandWhere["brand_name"] = {
  //       [Op.like]: "%" + brand_name + "%",
  //     };
  //   }
  //   if (!isEmpty(model_name)) {
  //     modelWhere["model_name"] = {
  //       [Op.like]: "%" + model_name + "%",
  //     };
  //   }
  //   Car.findAll({
  //       attributes: [
  //         "car_title",
  //         [sequelize.col("model_car.model_name"), "model_name"],
  //         [sequelize.col("model_car.brand_model.brand_name"), "brand_name"],
  //       ],
  //       raw: true,
  //       where: where,
  //       include: [{
  //         model: Model,
  //         as: "model_car",
  //         attributes: [],
  //         where: modelWhere,
  //         required: true,

  //         include: [{
  //           model: Brand,
  //           as: "brand_model",
  //           attributes: [],
  //           where: brandWhere,
  //           required: true,
  //         }]
  //       }],
  //     })
  //     .then((fetchedCar) => {
  //       return result(null, fetchedCar);
  //     })
  //     .catch((err) => {
  //       const customError = createError(err);
  //       result(customError, null);
  //     });
  // }
};