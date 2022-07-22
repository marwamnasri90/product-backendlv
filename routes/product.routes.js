const express=require('express');
const productController = require('../controllers/product');
const router =express.Router();
const multerInstance = require("../middleware/file")

router.post('/createproduct',multerInstance.upload.single('image'),productController.createproduct);
router.get('/allproduct',productController.allproduct)
router.get('/singleproduct/:id',productController.singleproduct)
router.get('/filter/:categorie/:prixmin/:prixmax/:sort',productController.filter)

router.delete('/deleteproduct/:id',productController.deleteproduct)
router.put('/updateproduct/:id',productController.updateproduct)
router.get('/statistique/:categorie',productController.statistique)

module.exports={
    routes:router
}