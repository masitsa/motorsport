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
          console.log('success');
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
      // console.log('shelby')
      // console.log(car)
      if (err) {
        1
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

//search
// router.get("/search", (req, res) => {
//   const car_title = req.query.hasOwnProperty("car_title") ?
//     req.query.car_title :
//     "";
//   const brand_name = req.query.hasOwnProperty("brand_name") ?
//     req.query.brand_name :
//     "";
//   const model_name = req.query.hasOwnProperty("model_name") ?
//     req.query.model_name :
//     "";
//   CarController.getCar(car_title, brand_name, model_name,
//     (err, fetchedCar) => {
//       if (err) {
//         res.status(400).json(err);
//         // console.log('brabus')
//         console.log(err)
//       } else {
//         res.status(200).json(fetchedCar);
//       }
//     })
// })

router.post("/whatsappDetails",
  (req, res) => {
    // console.log('subaru')
    // console.log(req.body)
    let modelName = req.body.Body;

    CarController.fetchCar(modelName, (err, fetchedcarDetails) => {
      // console.log('bughatti')
      // console.log(fetchedcarDetails)
      if (err) {
        res.status(400).json(err);
        // console.log('bughatti')
        // console.log(err)
      } else {
        // res.status(200).json(fetchedcarDetails);
        const accountSid = 'AC06bf23db88d97129122e566668258434';
        const authToken = '4dc8b2964c86f294c43480290a39c68d';
        const client = require('twilio')(accountSid, authToken);
        //carDetails
        let title = fetchedcarDetails.car_title
        let location = fetchedcarDetails.car_location
        let year = fetchedcarDetails.car_year
        let transmission = fetchedcarDetails.car_transmission
        let price = fetchedcarDetails.car_price
        let model = fetchedcarDetails.model_name
        let brand = fetchedcarDetails.brand_name
        let number = req.body.From
        let allCarDetails = "These are available cars: title-" + title + " location-" + location + " year-" + year + " transmission-" + transmission + " price-" + price + " model-" + model + " brand-" + brand
        client.messages
          .create({
            from: 'whatsapp:+14155238886',
            body: allCarDetails,
            to: number
          })
          .then(message => console.log(message.sid))
          .catch(err => {
            //  console.log(err)
            done()
          })
      }
    });
  })

router.post("/allWhatsappDetails",
  (req, res) => {
    // console.log('FORESTER')
    console.log(req.body)
    let modelName = req.body.Body;
    CarController.fetchAllCars(modelName, (err, fetchedAllCarDetails) => {
      if (err) {
        res.status(400).json(err);
      } else {
        // console.log('chiron')
        console.log(fetchedAllCarDetails)
        const accountSid = 'AC151e1b5766621d85ece48c53e0d50f9c';
        const authToken = '92757b3b1a07c9ef3462a35b3035cee5';
        const client = require('twilio')(accountSid, authToken);
        let number = req.body.From
        let imgUrl
        //let allCarDetailsArray = [];

        if (fetchedAllCarDetails.length > 0) {

          for (let i = 0; i < fetchedAllCarDetails.length; i++) {
            //carDetails
            let title = fetchedAllCarDetails[i].car_title
            let location = fetchedAllCarDetails[i].car_location
            let year = fetchedAllCarDetails[i].car_year
            let transmission = fetchedAllCarDetails[i].car_transmission
            let price = fetchedAllCarDetails[i].car_price
            let model = fetchedAllCarDetails[i].model_name
            let brand = fetchedAllCarDetails[i].brand_name
            let images = fetchedAllCarDetails[i].car_imgs
            imgUrl = "http://169.239.171.102:8082/uploads/" + images
            let allCarDetails = "title-" + title + " location-" + location + " year-" + year + " transmission-" + transmission + " price-" + price + " model-" + model + " brand-" + brand
            //allCarDetailsArray.push(allCarDetails)
            //  let toSendCarDetails = "These are the available cars" + allCarDetailsArray
            client.messages
              .create({
                mediaUrl: [imgUrl],
                from: 'whatsapp:+14155238886',
                body: allCarDetails,
                to: number
              })
              .then(message => res.status(200).json(message))
              .catch(err => {
                res.status(400).json(err)
                // done();
              })
          }
        } else {
          res.status(400).json({
            error: "Car not found"
          });
        }
        // console.log('Lambo')
        // console.log(imgUrl)

      }
    });
  })
module.exports = router;