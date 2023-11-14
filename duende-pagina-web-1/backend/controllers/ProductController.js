const { getInstance: getSingleton } = require('./Singleton.js');
const SingletonDAO = getSingleton();
const Product = require('../models/Product.js');
const { saveImages } = require('./../utilities/saveImages.js');  // Import the saveImages function


// Controller to get all products
const getAllProducts = async (req, res, next) => {
    try{    
        await SingletonDAO.getAllProducts(req, res, next);
    } catch(error) {
        res.status(500).json({ message: "Server error: "+ error });
    }
};

const getAllProductsActive = async (req, res, next) => {
    try{
      await SingletonDAO.getAllProductsActive(req, res, next);      
    } catch(error) {
        res.status(500).json({ message: "Server error: "+ error });
    }
};

const createProduct = async (req, res, next) => {
  const productData = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      status: req.body.status,
      price: req.body.price,
      stock: req.body.stock,
      mainImage: req.files.mainImage ? { url: `/uploads/${req.files.mainImage[0].filename}`, altText: 'Main Image Alt Text' } : null,
      secondaryImages: req.files.secondaryImages ? req.files.secondaryImages.map(file => ({ url: `/uploads/${file.filename}`, altText: 'Secondary Image Alt Text' })) : [],
      status: true,
  };

  console.log('Received product data (before):', productData);
  req.body = productData;
  try {
      const product = await SingletonDAO.createProduct(productData);  // Call your Singleton method
      res.status(201).json(product);  // Send the response here
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' + error });  // Handle any errors here
  }
};


const updateProduct = async (req, res, next) => {
    // Assuming you receive the product data in the request body
    const productData = req.body;
    try {
      const product = await SingletonDAO.updateProduct(req, res, next);
    } catch (error) {
      console.error(error);
    }
  };

const deleteProduct = async (req, res, next) => {
    try {
      const product = await SingletonDAO.deleteProduct(req, res, next);
    } catch (error) {
      console.error(error);
    }
  };  

const getProductById = async (req, res, next) => {
    try {
      const product = await SingletonDAO.getProductById(req, res, next);
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { getAllProducts, createProduct,getAllProductsActive, updateProduct, deleteProduct, getProductById };