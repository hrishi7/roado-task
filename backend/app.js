const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const config = require("./config/database");


/**importing routes */
const words = require("./routes/words");


const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(
  config.uri,
  {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("connection lost" + err);
    } else {
      console.log("DB is connected");
    }
  }
);



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Middleware
// express-session must be used before passport
app.use("/api/v1/words", words);

//Start Server: Listen on port 8080
let server = app.listen(port, () => {
  console.log("Listening on port 8080");
});
