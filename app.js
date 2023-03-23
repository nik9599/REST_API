const express = require('express')
const morgan  = require('morgan')

const app = express()

const productRoutes = require('./api/routes/product.js')

const orderRouter = require('./api/routes/order.js')

// app.use('/',(req ,  res , next)=>{
//     res.status(200).json({
//         message : 'it works'
//     })
    
// })

app.use(morgan('dev'))

app.use('/products' , productRoutes)

app.use('/order' , orderRouter)

module.exports = app;