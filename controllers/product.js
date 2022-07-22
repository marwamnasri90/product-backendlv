
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const moment = require('moment')
const { Categorie } = require('../models/categorie');
const getMonthDateRange = require("../middleware/month-helper");
var forEach = require("async-foreach").forEach;


exports.createproduct = async (req, res) => {
    const trouve= await Product.findOne({title:req.body.title})//type de retoure promise
    if(trouve){
    res.status(400).send("Title already exists");
    return;
   }else{
    try {
       let promo = { rate: 0, price: 0 };
     if (parseFloat(req.body.promo) > 0) {
       promo.rate = parseFloat(req.body.promo);
       promo.price = parseFloat(req.body.price - req.body.promo); 
     }
       const new_product = new Product({
           title: req.body.title,
            state: req.body.state,
           code: req.body.code,
            price: parseFloat(req.body.price),
            stock: req.body.stock,
           description: req.body.description,
           new: req.body.new,
            promo: promo,
           imageUrl:req.file.path,
            categorie: [mongoose.mongo.ObjectId(req.body.categories)],
       })
 
       const new_products = await new_product.save();
       res.status(200).send({ status: true, result: new_product });
   }
   catch (err) {
       res.status(500).send("Somthing failed.");

   }
}
}
 
exports.updateproduct = async (req, res, next) => {
   try {
       let promo = { rate: 0, price: 0 };
       if (parseFloat(req.body.promo) > 0) {
         promo.rate = parseFloat(req.body.promo);
         promo.price = parseFloat(req.body.price - req.body.promo); //parseFloat(req.body.price) - (promo.rate * parseFloat(req.body.price)) / 100;
       }
       const entity = await Product.findByIdAndUpdate(req.params.id, {
           title: req.body.title,
           state: req.body.state,
          code: req.body.code,
           price: parseFloat(req.body.price),
           stock: req.body.stock,
          description: req.body.description,
          new: req.body.new,
           promo: promo,
           categorie: [mongoose.mongo.ObjectId(req.body.categories)],
       })
        res.status(200).send({ status: true, result: entity });
   }
   catch (err) {
       res.status(500).send("Somthing failed.");
   }
} 

exports.filter=async(req,res,next)=>{
     try{

        if (req.params.sort == -1) sort = { price: -1 };
        else if (req.params.sort == 1) sort = { price: 1 };
        else if (req.params.sort == 'stock') sort = { stock: 1 };
        else if (req.params.sort == 'AZ') sort = { title: 1 };
        else if (req.params.sort == 'ZA') sort = { title: -1 };
    

        var findObj = {
           price: { $lte: 1000000, $gt: 0 },
           categorie: req.params.categorie,
          
        };

        findObj.price = { $lte: req.params.prixmax, $gte: req.params.prixmin };
         let totalproduct = await Product.find(findObj).sort(sort).populate({ path: 'categorie', select: 'name' }); //.countDocuments();
        res.status(200).send({ status: true, result: totalproduct });

    }
    catch(err){
        res.status(500).send("Somthing failed.");
    }
}

exports.deleteproduct = async (req, res, next) => {
   try {
       const entity = await Product.findByIdAndRemove(req.params.id)
       res.status(200).send({ status: true, result: entity });
   }
   catch (err) {
       res.status(500).send("Somthing failed.");
   }
} 


exports.allproduct = async (req, res, next) => {
   try {
       const products = await Product.find().populate({ path: 'categorie', select: 'name' })
       res.status(200).send({ status: true, result: products });
   }
   catch (err) {
       res.status(500).send("Somthing failed.");
   }
}
exports.singleproduct = async (req, res, next) => {
   try {
       const product = await Product.findById(req.params.id).populate({ path: 'categorie', select: 'name' })
       res.status(200).send({ status: true, result: product });
   }
   catch (err) {
       res.status(500).send("Somthing failed.");
   }
} 
exports.statistique = async  (req, res) => {

  
    let lineChartLabels = []  //laxe des x
    let lineChartLabel = [] 
   lineChartLabel=moment.monthsShort()
   const entity= await Categorie.findById(req.params.categorie)
    var labelChart = [{ data: [], label: entity.slug }];
    for (let mois = 1; mois < 13; mois++) {
      lineChartLabels.push(getMonthDateRange.getMonthDateRange('2022',mois));
    }
    let data=[]
    forEach(lineChartLabels , async (mois, index) => {
  
    const promise = new Promise(async (resolve, reject) => {
     
      const products=  await  Product.find({ created: { $lte: mois.end, $gte: mois.start }, categorie: req.params.categorie})
         resolve([products.length]);
      }).then((r)=>{
        return r;
      })
      data.push(promise)
   
    }) 
    Promise.all(data).then((resp)=>{
      resp.forEach(element => {
        labelChart[0].data.push(element[0])
       });
    return res.status(200).send({"lineChartLabel":lineChartLabel,"labelChart":labelChart})
  
    })
   
     
   
  }