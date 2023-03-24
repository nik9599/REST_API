const express = require('express')

const router = express.Router();

router.get('/',(req , res , next)=>{
    res.status(200).json({
        message : 'hello get request'
    })
})

router.post('/',(req , res , next)=>{
    const product = {
        name : req.body.name,
        price :  req.body.price
    }
    res.status(200).json({
        message : 'hello post request',
        createdProduct : product  
    })
})

router.get('/:productId' , (req , res, next)=>{
    const id = req.params.productId;
     if(id === 'special'){
        res.status(200).json({
            message: 'discoverd the new id',
            id : id
        })
     }else{
        res.status(200).json ({
            message : 'passed id',
           id : id
        })
     }
})

router.patch('/:productId' , (req , res, next)=>{
    res.status(200).json({
        message : 'Updated product'

    })
})

router.delete('/:productId' , (req , res, next)=>{
    res.status(200).json({
        message : 'Deleted product'
        
    })
})
module.exports = router
