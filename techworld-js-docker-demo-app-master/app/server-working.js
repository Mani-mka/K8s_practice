var express = require("express");
var mongoose = require("mongoose");

// Require model
var Product = require("./Product.js");


// Connect to MongoDB
mongoose.connect("mongodb://mongo/pois", { useNewUrlParser: true });

var PORT = 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public static folder
app.use(express.static("public"));

// Routes
app.get("/", function(req, res) {
  res.send("Hello from demo app!");
});

// Route for creating a new Product
app.post("/product", function(req, res) {
  console.log("in post request");
  Product.create(req.body)
    .then(function(dbProduct) {
      // If we were able to successfully create a Product, send it back to the client
      res.json(dbProduct);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected to Mongo!");})


// Start the server
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + ".");
})
