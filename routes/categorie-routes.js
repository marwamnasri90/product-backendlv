const express=require('express');
const categorieController = require('../controllers/categorie');
const router =express.Router();
router.post('/createCategorie',categorieController.createCategorie);
router.get('/allCategorie',categorieController.allCategorie)
router.get('/singleCategorie/:id',categorieController.singleCategorie)
router.delete('/deleteCategorie/:id',categorieController.deleteCategorie)
router.put('/updateCategorie/:id',categorieController.updateCategorie)
module.exports={
    routes:router
}