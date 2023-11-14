const express = require('express');
const router = express.Router();
const ShoppingCart = require('../controllers/ShoppingCartController.js');

router.route('/:id')
    .get(ShoppingCart.getCarUser)

router.route('/addProduct/:userId/:productId/:quantity')
    .put(ShoppingCart.addProduct)

    router.route('/:userId/deleteProduct/:productId')
    .delete(ShoppingCart.deleteProductFromCart);

    router.route('/updateProductQuantity/:userId/:productId')
    .patch(ShoppingCart.updateProductQuantity);

module.exports = router;