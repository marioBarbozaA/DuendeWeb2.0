const express = require('express');
const router = express.Router();
const saleController = require('./../controllers/SalesController.js');

const {uploadSingle, updateImagePathsForSale} = require('./../utilities/saveImages.js');

const logRequest = (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
    next();
  };

router.route('/newSale')
    .post(  logRequest,uploadSingle, // use single instead of fields
        updateImagePathsForSale,
        saleController.newSale);

router.route('/:id')
    .get(saleController.userHistory);

router.route('/admin/ventas')
    .get(saleController.adminHistory);

router.route('/admin/ventas/:id')
    .put(saleController.updateSale);

module.exports = router;