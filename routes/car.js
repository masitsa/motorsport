const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
  CarController
} = require("../controllers");

//  @route POST customer
router.post("/",
  (req, res) => {
    // console.log('shelby')
    // console.log(req.body)
    if (req.files) {
      const file = req.files.file;

      const fileName = file.name;

      file.mv("./uploads/" + fileName, (err) => {
        if (err) {
          res.status(400).json({
            error: {
              upload: err.message
            }
          });
        } else {
          // console.log('success');
          // res.status(200).json({
          //   message: "Success"
          // })
          CarController.saveCar(req.body, fileName, (err, car) => {
            if (err) {
              res.status(400).json(err);
              // console.log("dane");
              // console.log(err)
            } else {
              res.status(200).json(car);
            }
          });
        }
      })

    }
  });

//  @route GET cars
//  @desc car list all
//  @access private
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 0;
  const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
  const order = req.query.hasOwnProperty("order") ?
    req.query.order :
    "car_title";
  const ordermethod = req.query.hasOwnProperty("ordermethod") ?
    req.query.ordermethod :
    "ASC";
  const car_title = req.query.hasOwnProperty("car_title") ?
    req.query.car_title :
    "";
  const car_location = req.query.hasOwnProperty("car_location") ?
    req.query.car_location :
    "";
  const car_transmission = req.query.hasOwnProperty("car_transmission") ?
    req.query.car_transmission :
    "";
  //console.log("mansory");
  CarController.getAllCar(
    page,
    limit,
    order,
    ordermethod,
    car_title,
    car_location,
    car_transmission,
    (err, car) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(car);
      }
    }
  );
});

//Twilio
router.post("/whatsapp",
  (req, res) => {
    CarController.getCarDetails(req.body, (err, carDetails) => {
      // console.log('FORESTER')
      // console.log(carDetails)
      if (err) {
        res.status(400).json(err);
        // console.log('panamera')
        // console.log(err)

      } else {
        const accountSid = 'AC06bf23db88d97129122e566668258434';
        const authToken = '4dc8b2964c86f294c43480290a39c68d';
        const client = require('twilio')(accountSid, authToken);
        //number
        let number = req.body.phone_number
        let concatNumber = number.substr(1);
        let stringNumber = 'whatsapp:+254' + concatNumber
        //carDetails
        let title = carDetails.car_title
        let location = carDetails.car_location
        let year = carDetails.car_year
        let transmission = carDetails.car_transmission
        let price = carDetails.car_price
        let model = carDetails.model_name
        let brand = carDetails.brand_name
        let allCarDetails = "The car with these details was clicked: title-" + title + " location-" + location + " year-" + year + " transmission-" + transmission + " price-" + price + " model-" + model + " brand-" + brand
        client.messages
          .create({
            from: 'whatsapp:+14155238886',
            body: allCarDetails,
            to: stringNumber
          })
          .then(message => console.log(message.sid))
          .catch(err => {
            console.log(err)
            done()
          })
      }
    });
  })

//search  brand
const brand_name = req.query.hasOwnProperty("brand_name") ?
  req.query.brand_name :
  "";
CarController.getCarBrand(brand_name,
  (err, brand) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(brand);
    }
  })
module.exports = router;