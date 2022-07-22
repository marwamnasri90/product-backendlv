'use strict';
const express = require('express');
const cors = require('cors');
const environement = require('./environnement');
const bodyParser = require('body-parser');
const winston = require('winston');
const app = express();
require('dotenv').config({ path: "./env" })
const categorieRouter = require('./routes/categorie-routes');
const productRoutes = require('./routes/product.routes');
const mongoose=require('mongoose');

 require('./middleware/logging')();

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.use('/api/categorie', categorieRouter.routes);
app.use('/api/product', productRoutes.routes);
app.use('/upload',express.static(__dirname+'/upload'));
mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true, useUnifiedTopology: true ,useFindAndModify: false
    }).then(()=>winston.info('Mongo db Connected.....'));

app.listen(process.env.PORT, () => winston.info('App listening on url ' + process.env.HOST_URL)); 