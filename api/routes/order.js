const express = require('express')

const router = express.Router();

router.get('/',(req , res , next)=>{
    res.status(200).json({
        message : 'order get request'
    })
})

router.post('/',(req , res , next)=>{
    res.status(201).json({
        message : 'order post request'
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
