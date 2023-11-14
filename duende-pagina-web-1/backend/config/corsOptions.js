// File: ./config/corsOptions.js
module.exports = {
  origin: "http://localhost:3000", // Replace with your frontend application’s URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
