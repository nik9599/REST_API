const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/orders.js");
const request = require('postman-request')

const router = express.Router();

router.get("/", (req, res, next) => {
  Order.find()
    .select(" _id , product , quantity")
    .then((result) => {
      res.status(200).json({
        total_Order: result.length,
        order: result.map((doc) => {
          return {
            _id: doc._id,
            product_id: doc.product,
            Quantity: doc.quantity,
            request: {
              type: "GET",
              Order_url: "http://localhost:3000/order/" + doc._id,
              product_url: "http://localhost:3000/products/" + doc.product,
            },
          };
        }),
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
});

router.post("/", (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productid,
  });

  order
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Order placed succesfully",
        placedOrder: {
          id: result._id,
          product_Id: result.product,
          Quantity: result.quantity,
        },
        response: {
          url: "http://localhost:3000/products/" + result.product,
          type: "POST",
        },
      });
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;

  Order.findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          _id: result._id,
          product_id: result.product,
          Quantity:  result.quantity,
          request: {
            type: "GET",
            Order_url: "http://localhost:3000/order/" + result._id,
            product_url: "http://localhost:3000/products/" + result.product,
          },
        });
      }else{
        res.status(404).json({
          message :'NOT FOUND'
        })
      }
    })
    .catch();
});

router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
   const url = 'http://localhost:3000/order/'+id
   request({url : url , json :true}, (err , {body})=>{
          if(body._id == id){
            Order.findByIdAndDelete(id).then(result =>{
              res.status(200).json({
                message : 'sucesfully deleted'
              })
            }).catch(err =>{
              res.status(500).json({
                error : err
              })
            })
          }else{
            res.status(404).json({
              error : "order id not found"
          })
   }
 
});
})

module.exports = router;
