const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const app = express();

var allowCrossDomain = function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Security-Policy', 'img-src \'self\'');
    next();
}

app.use(allowCrossDomain);
app.use(cors());
app.use(expressCspHeader({
  directives: {
      'default-src': [NONE],
      'script-src': [SELF, INLINE],
      'style-src': [SELF],
      'img-src': [NONE],
      'worker-src': [NONE],
      'block-all-mixed-content': true
  }
}));

app.use(express.json());const PoiSchema = mongoose.Schema({
  name: String,
  position: {
    lat: Number,
    lon: Number
  }
});

const Poi =  mongoose.model("Poi", PoiSchema);app.get('v1/all', async (req, res) => {
  const allPois = await Poi.find().exec();
  return res.json({ msg: "Pois", data: allPois });
});
app.post('v1/add', async (req, res) => {
  await new Poi(req.body).save();
  return res.json({ msg: "Poi qdded" });
});

mongoose.connect(
  `mongodb://localhost:27017/pois`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
  ).then(
    async () => {
      app.listen(3000, () => { console.log('Server listening...'); })
    }
  );const db = mongoose.connection;db.on("error", console.error.bind(console, "connection error:"));db.once("open", function() {
  console.log("we're connected to Mongo!");
});
