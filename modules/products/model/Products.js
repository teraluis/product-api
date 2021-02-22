const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {Category} = require('../../category/model/Categories');
let Schema = mongoose.Schema;

let ProductsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    price: {
        type: Float64Array,
        required: [true, 'price is mandatory']
    },
    category: {
        type: Category.ObjectId,
        required: [true, 'category is mandatory'],
        enum: ['Optic', 'Solaire','Hybride', 'Goodies']
    },
    stock: {
        type: Number,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductsSchema);
