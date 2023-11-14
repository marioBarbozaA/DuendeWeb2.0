const { getInstance: getSingleton } = require('./Singleton.js');
const SingletonDAO = getSingleton();
const Sale = require('../models/Sales.js');

const newSale = async (req, res) => {
    console.log('Sale controller...');
    console.log(req.body);
    try {
      // Collect data from the request
      const {
        actualBuyerName,
        actualBuyerPhone,
        actualBuyerEmail,
        location,
        cost,
      } = req.body;
      
      const locationObj = JSON.parse(location); // Parse the location JSON string
      const { provincia, canton, distrito, details } = locationObj; // Destructure values from the parsed location object

      const carrito = JSON.parse(req.body.carrito);
      // Generate unique order number
      const orderNum = Math.random().toString(36).substring(2, 8) + Date.now();
  
      // Get user's ID
      const userBuyer = req.body.userId; // assuming you have the user's ID in req.user.id
  
      // Calculate tax and delivery cost
      const tax = cost * 0.13;
      const deliveryCost = 8;
  
      // Create new sale object
      const saleData = {
        orderNum,
        userBuyer,
        products: carrito.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
        location: {
          provincia,
          canton,
          distrito,
          details,
        },
        sinpe: {
            url: req.body.mainImage,
          altText: 'Sinpe Image Alt Text',
        },
        tax,
        deliveryCost,
        total: parseFloat(cost) + tax + deliveryCost,
        actualBuyerName,
        actualBuyerPhone,
        actualBuyerEmail,
        deliverDate: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 business days after today
      };
      
      console.log('saleData:', saleData);

      // Call your Singleton method to create a new sale
      const newSale = await SingletonDAO.createSale(saleData);
  
      // Send the response to the frontend
      res.status(201).json(newSale);
    } catch (error) {
      console.error('Error creating new sale:', error);
      res.status(500).json({ msg: 'Server error' + error });
    }
  };

  const userHistory = async(req, res) => {
    console.log('User history controller...');
    console.log(req.params);    
    try {
        const sales = await SingletonDAO.userHistory(req.params.id);
        res.status(200).json(sales);
        } catch (error) {
        console.error('Error getting user history:', error);
        res.status(500).json({ msg: 'Server error' + error });
        }
    }

    const adminHistory = async(req, res) => {
        console.log('Admin history controller...');
        try {
            const sales = await SingletonDAO.adminHistory();
            res.status(200).json(sales);
            } catch (error) {
            console.error('Error getting admin history:', error);
            res.status(500).json({ msg: 'Server error' + error });
            }
    }

    const updateSale = async (req, res) => {
        try {
          console.log('Update sale controller...');
          const updatedSale = await SingletonDAO.updateSale(req.params.id, req.body);
          res.status(200).json(updatedSale);
        } catch (error) {
          console.error('Error updating sale:', error);
          res.status(error.message === 'Sale not found' ? 404 : 500).json({ msg: 'Server error: ' + error.message });
        }
      }
  
  module.exports = {
    newSale,userHistory,adminHistory,updateSale
  };