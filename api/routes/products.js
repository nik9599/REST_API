const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Product = require("../models/product.js");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(200).json({ message: "Empty data" });
      }
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
        message: "hello post request",
        createdProduct: product,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          doc,
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
  res.status(200).json({
    message: "Updated product",
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findByIdAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
