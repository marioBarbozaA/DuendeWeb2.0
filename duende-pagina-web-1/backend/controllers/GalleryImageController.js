const { getInstance: getSingleton } = require('./Singleton.js');
const SingletonDAO = getSingleton();

const addGalleryImage = async (req, res, next) => {
  console.log('Received gallery item data (before):', req.body);
  
  const galleryItemData = {
      name: req.body.name,
      category: req.body.category,
      subCategorty: req.body.subCategory,
      description: req.body.description,
      date: req.body.date,
      tags: req.body.tags,
      mainImage: req.files.mainImage ? { url: `/uploads/${req.files.mainImage[0].filename}`, altText: 'Main Image Alt Text' } : '',
      secondaryImages: req.files.secondaryImages ? req.files.secondaryImages.map(file => ({ url: `/uploads/${file.filename}`, altText: 'Secondary Image Alt Text' })) : [],
      status: true,
  };
  console.log('Received gallery item data (after):', galleryItemData);
  try {
      const galleryItem = await SingletonDAO.addGalleryImage(galleryItemData,req, res, next);
      res.status(201).json(galleryItem);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' + error });
  }
};
  
  const updateGalleryImage = async (req, res, next) => {
    await SingletonDAO.updateGalleryImage(req, res, next);
  };
  
  const deleteGalleryImage = async (req, res, next) => {
    console.log('Received gallery item data (before):', req.params.id);
    await SingletonDAO.deleteGalleryImage(req, res, next);
  };
  
  const getGalleryImageByID = async (req, res, next) => {
    await SingletonDAO.getGalleryImageByID(req, res, next);
  };
  
  const getGalleryImagesByCategory = async (req, res, next) => {
    await SingletonDAO.getGalleryImagesByCategory(req, res, next);
  };
  
  const getAllImages = async (req, res, next) => {
    await SingletonDAO.getAllImages(req, res, next);
  };

  const getImagesAdmin = async (req, res, next) => {
    await SingletonDAO.getImagesAdmin(req, res, next);
  }

  const changeStatus = async (req, res, next) => {
    console.log('CONTROLLER CHANGE:', req.params.id);
    await SingletonDAO.changeStatus(req, res, next);
  }
  
  module.exports = {
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    getGalleryImageByID,
    getGalleryImagesByCategory,
    getAllImages,
    getImagesAdmin,
    changeStatus,
  };
  
