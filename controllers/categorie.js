
const { Categorie } = require('../models/categorie');
const slugify = require("slugify");

exports.createCategorie = async (req, res) => {

    try {    
        const new_catalog = new Categorie({
            name: req.body.name,
            slug: slugify(req.body.name)
        })

         const new_catalogs = await new_catalog.save();
        res.status(200).send({ status: true, result: new_catalog });
    }
    catch (err) {

        res.status(500).send({error:err,message:"Somthing failed."});

    }
}

exports.updateCategorie = async (req, res, next) => {
    try {
        
        const entity=     await Categorie.findOneAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                name: req.body.name,
            slug: slugify(req.body.name),
              },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })

        res.status(200).send({ status: true, result: entity });
    }
    catch (err) {
        res.status(500).send("Somthing failed.");
    }
} 


exports.deleteCategorie = async (req, res, next) => {
    try {
        const entity = await Categorie.findByIdAndRemove(req.params.id)
        res.status(200).send({ status: true, result: entity });
    }
    catch (err) {
        res.status(500).send("Somthing failed.");
    }
} 


exports.allCategorie = async (req, res, next) => {
    try {
        const categories = await Categorie.find()
         res.status(200).send({ status: true, result: categories });
    }
    catch (err) {
        res.status(500).send("Somthing failed.");
    }
}
exports.singleCategorie = async (req, res, next) => {
    try {
        const categorie = await Categorie.findById(req.params.id)
        res.status(200).send({ status: true, result: categorie });
    }
    catch (err) {
        res.status(500).send("Somthing failed.");
    }
} 