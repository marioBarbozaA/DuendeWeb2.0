require("dotenv").config();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

//Singleton Instance
const { getInstance: getSingleton } = require("./controllers/Singleton.js");

// Express app
const app = express();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

//App usa morgan dev
app.use(morgan("dev"));

// Middleware for setting response headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your frontend application’s URL
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Add this middleware in your server.js or app.js file
app.use((req, res, next) => {
  console.log(req.body); // Log the request body
  next(); // Continue to the next middleware or route handler
});

// Routes
app.use("/login", require("./routes/UserRoute.js"));
app.use("/gallery", require("./routes/GalleryImageRoute.js"));
app.use("/appointments", require("./routes/AppointmentRoute.js"));
app.use("/shoppingCart", require("./routes/ShoppingCartRoute.js"));
app.use("/product", require("./routes/ProductRoute.js"));
app.use("/message", require("./routes/MessageRoute.js"));
app.use("/sales", require("./routes/SalesRouter.js"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  const singleton = getSingleton();
});
