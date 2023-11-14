const { getInstance: getConnInstance } = require("./SingletonConexion.js");
const bcrypt = require("bcrypt");

const User = require("../models/auth/user.js");
const Usertype = require("../models/auth/usertype.js");
const Appointment = require("../models/appointment.js");
const Product = require("../models/Product.js");
const Message = require("../models/Message.js");
const ShoppingCart = require("../models/ShoppingCart.js");
const Gallery = require("../models/GalleryImage.js");
const Sale = require("../models/Sales.js");


const { createAccessToken } = require("../libs/jwt.js");
const { TOKEN_SECRET } = require("../config/config.js");
const jwt = require("jsonwebtoken");
const Sales = require("../models/Sales.js");

class Singleton {
  static instance;
  static count = 0;

  constructor() {
    console.log("Singleton constructor called");
    this.conn = getConnInstance();
  }

  static getInstance() {
    if (this.instance) {
      console.log("Returning instance");
      return this.instance;
    }
    console.log("creating instance");
    this.instance = new Singleton();

    this.count = this.count + 1;
    return this.instance;
  }
  //-------------------------------------------------------------------------------------
  //                               GalleryImage Functions
  //-------------------------------------------------------------------------------------
  async addGalleryImage(req, res, next) {
    try {
      const jsonImage = req.body;
      await Gallery.create({
        name: jsonImage.name,
        category: jsonImage.category,
        subCategory: jsonImage.subCategory,
        description: jsonImage.description,
        date: jsonImage.date,
        tags: jsonImage.tags,
        mainImage: jsonImage.mainImage,
        images: jsonImage.images,
        status: jsonImage.status,
      });

      res.status(201).json({
        state: true,
        message: "Se ha agregado la imagen exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async updateGalleryImage(req, res, next) {
    try {
      const jsonImage = req.body;
      const imageId = jsonImage._id;

      const imageFound = await Gallery.findOne({ _id: imageId });

      if (!imageFound) {
        return res.status(404).json({ message: "La imagen no se encuentra" });
      }

      const updateFields = {
        name: jsonImage.name,
        category: jsonImage.category,
        subCategory: jsonImage.subCategory,
        description: jsonImage.description,
        date: jsonImage.date,
        tags: jsonImage.tags,
        mainImage: jsonImage.mainImage,
        images: jsonImage.images,
        status: jsonImage.status,
      };

      // Actualizar la imagen en la base de datos
      await Gallery.updateOne({ _id: imageId }, { $set: updateFields });

      res.status(200).json({
        state: true,
        message: "La imagen se ha modificado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async deleteGalleryImage(req, res, next) {
    try {
      const jsonImage = req.body;
      const imageId = jsonImage.imageId;

      const imageFound = await Gallery.findOne({ _id: imageId });

      if (!imageFound) {
        return res.status(404).json({ message: "La imagen no se encuentra" });
      }

      // Eliminar la imagen de la base de datos
      await Gallery.deleteOne({ _id: imageId });

      res.status(200).json({
        state: true,
        message: "La imagen se ha eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async getGalleryImagesByCategory(req, res, next) {
    try {
      const category = req.params.category;
      const images = await Gallery.find({ category });

      if (images.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron imágenes en esta categoría" });
      }

      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  //-------------------------------------------------------------------------------------
  //                                 Message Functions
  //-------------------------------------------------------------------------------------

  async addMessage(req, res, next) {
    try {
      const jsonMessage = req.body;
      await Message.create({
        user: jsonMessage.user,
        message: jsonMessage.message,
        response: jsonMessage.response,
        type: jsonMessage.type,
        date: jsonMessage.date,
        galleryImageId: jsonMessage.galleryImageId,
        status: jsonMessage.status,
      });

      res.status(201).json({
        state: true,
        message: "El mensaje se ha agregado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async deleteMessage(req, res, next) {
    try {
      const jsonMessage = req.body;
      const messageId = jsonMessage.messageId;

      const messageFound = await Message.findOne({ _id: messageId });

      if (!messageFound) {
        return res.status(404).json({ message: "El mensaje no se encuentra" });
      }

      // Eliminar el mensaje de la base de datos
      await Message.deleteOne({ _id: messageId });

      res.status(200).json({
        state: true,
        message: "El mensaje se ha eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async getAllMessages(req, res, next) {
    try {
      const messages = await Message.find({});

      if (messages.length === 0) {
        return res.status(404).json({ message: `No se encontraron mensajes` });
      }

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).jeson({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  //-------------------------------------------------------------------------------------
  //                                Appointment Functions
  //-------------------------------------------------------------------------------------
  async createAppointment(req, res, next) {
    try {
      const jsonAppointment = req.body;
      await Appointment.create({
        participants: jsonAppointment.participants,
        type: jsonAppointment.type,
        details: jsonAppointment.details,
        date: jsonAppointment.date,
        image: jsonAppointment.image,
        status: jsonAppointment.status,
        startingTime: jsonAppointment.startingTime,
        endingTime: jsonAppointment.endingTime,
        orderNumber: jsonAppointment.orderNumber,
      });

      res.status(201).json({
        state: true,
        message: "El compromiso se ha creado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async updateAppointment(req, res, next) {
    try {
      const jsonAppointment = req.body;
      const appointmentId = jsonAppointment._id;

      const appointmentFound = await Appointment.findOne({
        _id: appointmentId,
      });

      if (!appointmentFound) {
        return res
          .status(404)
          .json({ message: "El compromiso no se encuentra" });
      }

      const updateFields = {
        participants: jsonAppointment.participants,
        type: jsonAppointment.type,
        details: jsonAppointment.details,
        date: jsonAppointment.date,
        image: jsonAppointment.image,
        status: jsonAppointment.status,
        startingTime: jsonAppointment.startingTime,
        endingTime: jsonAppointment.endingTime,
        orderNumber: jsonAppointment.orderNumber,
      };

      // Actualizar el compromiso en la base de datos
      await Appointment.updateOne(
        { _id: appointmentId },
        { $set: updateFields }
      );

      res.status(200).json({
        state: true,
        message: "El compromiso se ha modificado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async deleteAppointment(req, res, next) {
    try {
      const jsonAppointment = req.body;
      const appointmentId = jsonAppointment._id;

      const appointmentFound = await Appointment.findOne({
        _id: appointmentId,
      });

      if (!appointmentFound) {
        return res
          .status(404)
          .json({ message: "El compromiso no se encuentra" });
      }

      await Appointment.deleteOne({ _id: jsonAppointment._id });

      res.status(200).json({
        state: true,
        message: "El compromiso se ha eliminado exitosamente",
      });
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async getAppointmentById(req, res, next) {
    try {
      const appointmentId = req.params.appointmentId; // Obtener el ID del compromiso de los parámetros de la URL
      const appointment = await Appointment.findOne({ _id: appointmentId });

      if (!appointment) {
        return res
          .status(404)
          .json({ message: "El compromiso no se encuentra" });
      }

      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  async getAllAppointments(req, res, next) {
    try {
      const appointments = await Appointment.find({});

      if (appointments.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron compromisos en la agenda" });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: `Error del servidor: ${error}` });
    }
    next();
  }

  //-------------------------------------------------------------------------------------
  // Gestion Usuarios
  //-------------------------------------------------------------------------------------
  async registerUser(req, res, next) {
    const { email, password, name, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    //check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate) {
      return res.status(400).json({ msg: "User already exists" });
    }

    try {
      //encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
      // creating the user
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        phone,
      });
      // saving the user in the database
      const userSaved = await newUser.save();

      const token = await createAccessToken({ id: userSaved._id });

      console.log("Token generado:", token);
      res.cookie("token", token);

      res.status(200).json({ roles:['client'],userSaved, msg: "User created" });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }

  async generateTempPassword(){
    // Simple example: generate a random string
    return Math.random().toString(36).slice(2);
  };

  async updatePasswordEmail(req, res) {
    try{
      console.log("updatePassword DAO");
      const { email } = req.body;
      console.log(email);

      // Check if email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "No account with this email address exists." });
      }

      const randPass = await this.generateTempPassword()
      console.log("randPass:", randPass);
      // Generate temporary password or reset token
      const tempPassword = await bcrypt.hash(randPass, 10);

      console.log("tempPassword:", tempPassword);
      // Update user's document in the database with the temporary password or reset token
      await User.findOneAndUpdate({ email }, { password: tempPassword});      
      return randPass;
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
}


    
    //-------------------------------------------------------------------------------------
    //                               GalleryImage Functions
    //-------------------------------------------------------------------------------------
      async addGalleryImage(imageData,req, res, next) {
          console.log('addGalleryImage singleton:',imageData);
          try {
              const result = await Gallery.create(imageData);
              res.status(201).json({data: imageData, result : result });
          } catch (error) {
              res.status(500).json({ message: `Error del servidor: ${error}` });
          }
      }

  async loginUser(req, res, next) {
    try {
      //check for find the user usernames in the db
      const { email, password } = req.body;
      console.log('Singleton loginUser:')
      console.log(email, password);
      const userFound = await User.findOne({ email: email }).exec();
      if (!userFound) {
        res
          .status(400)
          .json({ status: false, message: "User has no register" });
        return false;
      }
      if (userFound) {
        const match = await bcrypt.compare(password, userFound.password);

        if (match) {

          const userTypeFound = await Usertype.findOne({ _id: userFound.type }).exec();

          const token = await createAccessToken({ id: userFound._id });
          console.log("Token generado:", token);
          res.cookie("token", token);

          res.status(200).json({
            status: true,
            roles: [userTypeFound.name],
            message: "User logged perfectly ",
          });
          return true;
        } else {
          console.log("Password incorrect");
          res.status(400).json({ status: false, message: "User not logged" });
          console.log("After res");
          return false;
        }
      }
    } catch {
      res.status(500).json({ status: false, message: "Server error" });
      return false;
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { email, newPassword, confirmPassword } = req.body;

      if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({ msg: "Please enter all fields" });
      }

      const userFound = await User.findOne({ email: email }).exec();
      if (!userFound) {
        res.status(400).json({ msg: "User has no register" });
        return false;
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
      });
      res.status(200).json({ msg: "User created" });
    } catch {
      res.status(500).json({ msg: "Server error" });
    }
  }

    async deleteGalleryImage(req, res, next) {
        console.log('deleteGalleryImage singleton:',req.params.id);
        try {
            const product = await Gallery.findByIdAndDelete(req.params.id);
            if(!product){
                return res.status(404).json({ msg: 'Product not found' });
            }
            res.status(200).json({ state: true, message: 'La imagen se ha eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
      }
      
  //CREATE  A LOGOUT
  async logout(req, res) {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  }

  // create VerifyToken
  async profile(req, res, next) {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ msg: "User not found" });
    return res.json({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
      phone: userFound.phone,
    });
  }

  // create VerifyToken

  async verifyToken(req, res, next) {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ msg: "Unauthorized1" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ msg: "Unauthorized2" });

      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ msg: "Unauthorized3" });

      return res.json({
        id: userFound._id,
        email: userFound.email,
        name: userFound.name,
        phone: userFound.phone,
      });
    });
  }

  async editProfile(req, res, next) {
    try {
      const { currentPassword, newName, newEmail } = req.body;
      const userId = req.user.id;
      console.log(currentPassword, newName, newEmail);
      if (!newName && !newEmail) {
        return res.status(400).json({
          msg: "Por favor, ingresa al menos un campo para actualizar.",
        });
      }

      const userToUpdate = await User.findById(userId).exec();

      if (!userToUpdate) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }

      // Verificar si la contraseña actual proporcionada coincide con la contraseña almacenada
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        userToUpdate.password
      );

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ msg: "La contraseña actual es incorrecta." });
      }

      if (newName) {
        userToUpdate.name = newName;
      }

      if (newEmail) {
        userToUpdate.email = newEmail;
      }

      const updatedUser = await userToUpdate.save();

      res
        .status(200)
        .json({ user: updatedUser, msg: "Perfil actualizado con éxito" });
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }

  async editarContraseña(req, res, next) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const userId = req.user.id;

      if (!currentPassword || !newPassword || !confirmPassword) {
        return res
          .status(400)
          .json({ msg: "Por favor, ingresa todas las contraseñas." });
      }

      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ msg: "Las contraseñas nuevas no coinciden." });
      }

      const userToUpdate = await User.findById(userId).exec();

      if (!userToUpdate) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }

      // Verificar si la contraseña actual proporcionada coincide con la contraseña almacenada
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        userToUpdate.password
      );

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ msg: "La contraseña actual es incorrecta." });
      }

      // Hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      userToUpdate.password = hashedPassword;

      const updatedUser = await userToUpdate.save();

      res
        .status(200)
        .json({ user: updatedUser, msg: "Contraseña actualizada con éxito" });
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  }

  /////////////////////////////////////
  ////////////  PRODUCT  //////////////
  /////////////////////////////////////

  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: "Server error" + error });
    }
    next();
  }


    async getAllImages(req, res, next) {
        try {
            const images = await Gallery.find({status: false});
    
            if (images.length === 0) {
                return res.status(404).json({ message: 'No se encontraron imágenes en la galería' });
            }
    
            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
      }

    async getImagesAdmin(req, res, next) {
        try {
            const images = await Gallery.find({});
            if (images.length === 0) {
                return res.status(404).json({ message: 'No se encontraron imágenes en la galería' });
            }
    
            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    async changeStatus(req, res, next) {
        console.log('changeStatus singleton:',req.params.id);
        try {
            const imageId = req.params.id; 
            const image = await Gallery.findOne({ _id: imageId });
            console.log('changeStatus singleton:',image);
            if (!image) {
                return res.status(404).json({ message: 'La imagen no se encuentra' });
            }
    
            const updateFields = {
                "status": !image.status
            };
    
            // Actualizar la imagen en la base de datos
            await Gallery.updateOne({ _id: req.params.id }, { $set: updateFields });
    
            res.status(200).json({ state: true, message: 'La imagen se ha modificado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    //-------------------------------------------------------------------------------------
    //                                 Message Functions
    //-------------------------------------------------------------------------------------
    
    async addMessage(req, res, next) {
        try {
            const jsonMessage = req.body;
            await Message.create({
                "user": jsonMessage.user,
                "message": jsonMessage.message,
                "response": jsonMessage.response,
                "type": jsonMessage.type,
                "date": jsonMessage.date,
                "galleryImageId": jsonMessage.galleryImageId,
                "status": jsonMessage.status
            });
    
            res.status(201).json({ state: true, message: 'El mensaje se ha agregado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    async deleteMessage(req, res, next) {
        try {
            const jsonMessage = req.body;
            const messageId = jsonMessage.messageId; 
    
        
            const messageFound = await Message.findOne({ _id: messageId });
    
            if (!messageFound) {
                return res.status(404).json({ message: 'El mensaje no se encuentra' });
            }
    
            // Eliminar el mensaje de la base de datos
            await Message.deleteOne({ _id: messageId });
    
            res.status(200).json({ state: true, message: 'El mensaje se ha eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    async getAllMessages(req, res, next){
        try {
            const messages = await Message.find({});
            
            if (messages.length===0){
                return res.status(404).json({message: `No se encontraron mensajes`})
            }

            res.status(200).json(messages);
        } catch (error){
            res.status(500).jeson({message: `Error del servidor: ${error}`})
        }
        next();
    }
    
    //-------------------------------------------------------------------------------------
    //                                Appointment Functions
    //-------------------------------------------------------------------------------------
    async createAppointment(req, res, next) {
        try {
            const jsonAppointment = req.body;
            await Appointment.create({
                "participants": jsonAppointment.participants,
                "type": jsonAppointment.type,
                "details": jsonAppointment.details,
                "date": jsonAppointment.date,
                "image": jsonAppointment.image,
                "status": jsonAppointment.status,
                "startingTime": jsonAppointment.startingTime,
                "endingTime": jsonAppointment.endingTime,
                "orderNumber": jsonAppointment.orderNumber
            });
    
            res.status(201).json({ state: true, message: 'El compromiso se ha creado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    async updateAppointment(req, res, next) {
        try {
            const jsonAppointment = req.body;
            const appointmentId = jsonAppointment._id; 
    
            
            const appointmentFound = await Appointment.findOne({ _id: appointmentId });
    
            if (!appointmentFound) {
                return res.status(404).json({ message: 'El compromiso no se encuentra' });
            }
    
            
            const updateFields = {
                "participants": jsonAppointment.participants,
                "type": jsonAppointment.type,
                "details": jsonAppointment.details,
                "date": jsonAppointment.date,
                "image": jsonAppointment.image,
                "status": jsonAppointment.status,
                "startingTime": jsonAppointment.startingTime,
                "endingTime": jsonAppointment.endingTime,
                "orderNumber": jsonAppointment.orderNumber
            };
    
            // Actualizar el compromiso en la base de datos
            await Appointment.updateOne({ _id: appointmentId }, { $set: updateFields });
    
            res.status(200).json({ state: true, message: 'El compromiso se ha modificado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }

    async deleteAppointment(req, res, next) {
        try {
            const jsonAppointment = req.body;
            const appointmentId = jsonAppointment._id; 

            const appointmentFound = await Appointment.findOne({ _id: appointmentId });
    
            if (!appointmentFound) {
                return res.status(404).json({ message: 'El compromiso no se encuentra' });
            }
    
            await Appointment.deleteOne({ _id: jsonAppointment._id });
    
            res.status(200).json({ state: true, message: 'El compromiso se ha eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }
    
    async getAppointmentById(req, res, next) {
        try {
            const appointmentId = req.params.appointmentId; // Obtener el ID del compromiso de los parámetros de la URL
            const appointment = await Appointment.findOne({ _id: appointmentId });
    
            if (!appointment) {
                return res.status(404).json({ message: 'El compromiso no se encuentra' });
            }
    
            res.status(200).json(appointment);
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }
    
    async getAllAppointments(req, res, next) {
        try {
            const appointments = await Appointment.find({});
    
            if (appointments.length === 0) {
                return res.status(404).json({ message: 'No se encontraron compromisos en la agenda' });
            }
    
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ message: `Error del servidor: ${error}` });
        }
        next();
    }
    

    //-------------------------------------------------------------------------------------
    //                                
    //-------------------------------------------------------------------------------------
    async updatePassword(req, res, next) {
        try{
            const { email, newPassword, confirmPassword } = req.body;

            if (!email || !newPassword || !confirmPassword) {
                return res.status(400).json({ msg: 'Please enter all fields' });
            }

            const userFound = await User.findOne({ email: email }).exec();
            if(!userFound){
                res.status(400).json({ msg: 'User has no register' });
                return false
            } 

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ msg: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newUser = await User.create({ "email": email, "password": hashedPassword });
            res.status(200).json({ msg: 'User created' });
        } catch {
            res.status(500).json({ msg: 'Server error' });
        }
    }

    /////////////////////////////////////
    ////////////  PRODUCT  //////////////
    /////////////////////////////////////

    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ msg: 'Server error' + error });
        }
        next();
    }

    async getAllProductsActive(req, res, next) {
        try {
          const products = await Product.find({ $or: [{ status: "active" }, { status: "disponible" }] });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ msg: 'Server error' + error });
        }
        next();
    }

    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            return { data: productData, result: product };  // Return the product instead of sending a response
        } catch (error) {
            console.error(error);
            throw new Error('Server error' + error);  // Throw an error to be caught by the calling function
        }
    }

    async updateProduct(req, res, next) {
        const productData = req.body;
        console.log(productData);
        try {
            const product = await Product.findByIdAndUpdate(productData._id, productData, { new: true, lean: true });
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
            return res.status(201).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Server error' + error });
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Server error' + error });
        }
      }

      async getProductById(req, res, next) {
        try{
          const product = await Product.findById(req.params.id);
          if(!product){
            return res.status(404).json({ msg: 'Product not found' });
          }
          return res.status(200).json(product);
        }catch(error){
            console.error(error);
            return res.status(500).json({ msg: 'Server error' + error });
        }
      
      }

      //////////////////////////////
      //ShoppingCart
      //////////////////////////////

      async getCarUser (req, res, next) {
        try {
            console.log("entro a getCarUser singleton",req.params.id);
            const carts = await ShoppingCart.findOne({ user: req.params.id });
            console.log("carts",carts);
            if (!carts) {  // Check if the array is empty
                const newCart = await ShoppingCart.create({ user: req.params.id });
                if (!newCart) {
                    return res.status(404).json({ msg: 'Error creating cart' });
                }
                return res.status(200).json(newCart);
            } else {
                return res.status(200).json(carts);  // Return the first cart
            }
        } catch (error) {
            res.status(500).json({ message: "Server error: " + error });
        }
    }

    async addProduct (req, res, next) {
      try {
          const cart = await ShoppingCart.findOne({ user: req.params.userId });
          if (!cart) {
              return res.status(404).json({ msg: 'Cart not found' });
          }
          // Find if the product is already in the cart
          const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.productId);
          if (productIndex > -1) {
              // Update the quantity if the product is already in the cart
              cart.products[productIndex].quantity += parseInt(req.params.quantity);
          } else {
              // Add the product with quantity to the cart
              cart.products.push({ product: req.params.productId, quantity: parseInt(req.params.quantity) });
          }
          
          // Update the date
          cart.updateDate = Date.now();

          // Save the updated cart
          await cart.save();
  
          res.status(200).json(cart);
  
      } catch (error) {
          res.status(500).json({ message: "Server error: " + error });
      }
  }

  async deleteProductFromCart(req, res, next) {
      try {
        console.log("Start deleteProductFromCart");
    
        const userId = req.params.userId;
        const productId = req.params.productId;
    
        console.log("userId:", userId);
        console.log("productId:", productId);
    
        // Find the cart by user ID
        const cart = await ShoppingCart.findOne({ user: userId });
    
        console.log("cart:", cart);
    
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
    
        // Find the index of the product in the cart's products array
        const productIndex = cart.products.findIndex(
          (p) => p.product.toString() === productId
        );
    
        console.log("productIndex:", productIndex);
    
        // If product is not found, return 404
        if (productIndex === -1) {
          return res.status(404).json({ message: "Product not found in cart" });
        }
    
        // Remove the product from the cart's products array
        cart.products.splice(productIndex, 1);
    
        // Save the updated cart back to the database
        await cart.save();
    
        console.log("Product removed from cart");
    
        res.status(200).json({ message: "Product removed from cart" });
      } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server error: " + error });
      }
  }

      async updateProductQuantity (req, res, next) {
        try {
          const userId = req.params.userId;
          const productId = req.params.productId;
          const { newQuantity } = req.body;

          if (newQuantity === 0) {
              // If the new quantity is 0, remove the product from the cart
              const cart = await ShoppingCart.findOne({ user: userId });
              if (!cart) {
                  return res.status(404).json({ message: "Cart not found" });
              }

              const productIndex = cart.products.findIndex(
                  (p) => p.product.toString() === productId
              );

              if (productIndex === -1) {
                  return res.status(404).json({ message: "Product not found in cart" });
              }

              cart.products.splice(productIndex, 1);
              await cart.save();

              return res.status(200).json({ message: "Product removed from cart" });
          }

          // If the new quantity is not 0, update the quantity in the cart
          const cart = await ShoppingCart.findOne({ user: userId });
          if (!cart) {
              return res.status(404).json({ message: "Cart not found" });
          }

          const productIndex = cart.products.findIndex(
              (p) => p.product.toString() === productId
          );

          if (productIndex === -1) {
              return res.status(404).json({ message: "Product not found in cart" });
          }

          cart.products[productIndex].quantity = newQuantity;
          await cart.save();

          res.status(200).json({ message: "Product quantity updated" });
      } catch (error) {
          res.status(500).json({ message: "Server error: " + error });
      }

    }

    async emptyCart (userId) {
      try{
        const cart = await ShoppingCart.findOne({ user: userId });
        cart.products = [];
        await cart.save();

        return { message: "Cart emptied" };
      }catch(error){
        throw new Error("Server error: " + error);
      }
    }

    /////////////////////////////////////
    ////////////  Sale  //////////////
    /////////////////////////////////////

    async createSale(saleData) {
      try{
        console.log("Singleton createSale...");
        const newSale = await Sales.create(saleData);
        if(!newSale){
          throw new Error("Sale not found");
        }
        await this.emptyCart(saleData.userBuyer);
        return newSale;
      } catch(error){
        throw new Error("Server error: " + error);
      }
    }

    async userHistory(userId) {
      try{  
         const history = await Sales.find({userBuyer: userId}).exec();
         console.log("Singleton userHistory:",history);
         return history;
      }catch(error){
        res.status(500).json({ message: "Server error: " + error });
      }
    }

    async adminHistory(){
      try{
        const history = await Sales.find({}).exec();
        return history;
      }catch(error){
        res.status(500).json({ message: "Server error: " + error });
      }
    }

    async updateInventory(productId, quantity) {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      
      product.stock -= quantity;
      
      if (product.stock < 0) {
        throw new Error('Not enough stock');
      }
      
      await product.save();
    }
    
    async updateSale(saleId, saleData){
      try{
        console.log("Singleton updateSale...");
        const sale = await Sales.findById(saleId);
        if (!sale) {
          throw new Error('Sale not found');
        }
        
        console.log("Singleton updateSale saleData:",saleData);
        console.log("Singleton updateSale sale:",sale);
        // If the sale is being updated to "Aceptado", update the inventory
        if (saleData.status === 'Aceptado' && sale.status !== 'Aceptado') {
          for (const product of sale.products) {
            console.log("Singleton updateSale product:",product);
            this.updateInventory(product._id, product.quantity);
          }
        }
        
        // Update the sale
        const updatedSale = await Sales.findByIdAndUpdate(saleId, saleData, { new: true, lean: true });
        return updatedSale;
      }catch(error){
        res.status(500).json({ message: "Server error: " + error });
      }
    }
  
  
}


let instance = null;

const getInstance = () => {
  if (!instance) {
    instance = new Singleton();
  }
  return instance;
};

module.exports = { getInstance };
