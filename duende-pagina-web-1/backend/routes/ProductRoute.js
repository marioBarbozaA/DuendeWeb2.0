const express = require('express');
const router = express.Router();
const productControllers = require('./../controllers/ProductController.js');
// in your router file
const { upload, updateImagePaths } = require('./../utilities/saveImages.js');


router.route('/')
    .get(productControllers.getAllProductsActive)

router.route('/admin')  
    .get(productControllers.getAllProducts)
    .put(productControllers.updateProduct)
    .post(
        upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'secondaryImages', maxCount: 10 }]),
        updateImagePaths,
        productControllers.createProduct
    );

router.route('/admin/:id')
        .put(productControllers.deleteProduct)

router.route('/:id')
    .get(productControllers.getProductById)

module.exports = router;