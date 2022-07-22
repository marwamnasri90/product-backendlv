const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
     },
    promo: {
        rate: {
            type: Number,
         },
        price: {
            type: Number,
         },
    },
    imageUrl: {
        type: String,
    },
    description: { type: String  },
     categorie:
    {
        type: Schema.Types.ObjectId,
        ref: "Categorie",
    },
    new:{
        type:Boolean
    },
    state: {
        type: String,
        default: "not_available",
        enum: ["not_available", "in_stock", "in_48_h", "on_arrival"],
    } ,
    created: {
      type: Date,
      default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema);

exports.Product = Product