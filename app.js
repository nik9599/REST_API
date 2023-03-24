// Importig Dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

// Callin different routes

const productRoutes = require("./api/routes/product.js");

const orderRouter = require("./api/routes/order.js");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use("/products", productRoutes);

app.use("/order", orderRouter);

app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
