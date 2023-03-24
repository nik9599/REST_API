const express = require('express')

const router = express.Router();

router.get('/',(req , res , next)=>{
    res.status(200).json({
        message : 'order get request'
    })
})

router.post('/',(req , res , next)=>{
    const order = {
        name : req.body.productId,
        quantity :  req.body.quantity
    }
    res.status(201).json({
        message : 'order post request',
        order : order
    })
})

router.get('/:ordertId' , (req , res, next)=>{
    res.status(200).json({
        message : 'order request'
    })
})

router.delete('/:ordertId' , (req , res, next)=>{
    res.status(200).json({
        message : 'order delete request',
        id : req.params.ordertId
    })
})


module.exports = router
