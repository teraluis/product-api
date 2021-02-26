const Product = require('../model/ProductModel');
class ProductController {

    getById = async (req, res) => {
        const {id} = req.params;
        const product = await Product.find({_id: id, visible: true}).exec();
        return res.json(product);
    };

    getByName = async (req, res) => {
        const {name} = req.params;
        const product = await Product.find({name: name, visible: true}).exec();
        return res.json(product);
    };
    getAllProducts = async (req, res) => {
        const {from = 0, limit = 5} = req.query;
        const [count, products] = await Promise.all([
            Product.countDocuments({visible: true}),
            Product.find({state: true}, 'name description image').skip(Number(from))
                .limit(Number(limit))
                .exec({state: true})
        ]);
        return res.json({count, products});
    };

    addProduct = async (req, res) => {
        const {body} = req.body;
        const product = new Product({body});
        await product.save();
        return res.json(body);
    };

    removeProduct = async (req, res) => {
        const {id} = req.params;
        const product = await Product.findByIdAndRemove(id);
        return res.json({msg: `product id : ${product.name} was removed from database`});
    }
}

module.exports = new ProductController();
