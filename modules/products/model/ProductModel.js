const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name is mandatory']
    },
    description: {
        type: String
    },
    img: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'price is mandatory']
    },
    category: {
        type: String,
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
    },
    users: {type: Schema.Types.ObjectId, ref: "User"}
});

ProductSchema.toJSON = function () {
    const { __v, _id, ...product} = this.toObject();
    product.id = _id;
    return product
};

ProductSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Product', ProductSchema);
