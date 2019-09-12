var Product = require('../../models/product.model');
// var db = require('../db');

module.exports.index = async function(req, res) {
	var products = await Product.find();
	res.json(products);
};

module.exports.create = async function(req, res) {
	var product = await Product.create(req.body);
	res.json(product);
};