const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Product = require("../models/product.js");

router.get("/", (req, res, next) => {
  Product.find()
    .select("_id, name , price")
    .exec()
    .then((docs) => {
      const response = {
        number_of_entries: docs.length,
        product: docs.map((doc) => {
          return {
            name: doc.name,
            Price: doc.price,
            id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            },
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Created succesfully",
        createdProduct: {
          name : result.name,
          price : result. price,
          id : result._id,
          response :{
            type : 'POST',            
            url : 'http://localhost:3000/products/'+result._id
          }
        }
      });
    })
    .catch((error) => console.log(error));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
  .select('name , price , _ id ')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
            name :doc.name,
            price : doc.price,
            id : doc._id,
            response :{
              type:'GET',
              url :'http://localhost:3000/products/'+doc._id
            }
          
        });
      } else {
        res.status(404).json({
          message: "NOT FOUND",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.findByIdAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        name : result.name,
        price : result.price,
        id : result._id,
        response: {
            type : 'PATCH',
            url : 'http://localhost:3000/products/'+result._id
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        messaage: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message :"Deleted succesfully"
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
