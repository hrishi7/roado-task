const Word = require("../models/Word");
const axios = require('axios');
const instance = axios.create({
  baseURL: "https://od-api.oxforddictionaries.com",
  headers: {
    Accept: "application/json",
    app_id: "db71ca6a",
    app_key: "7f9a1410671edb3d3d7922325840700f",
  },
});

exports.findInCache = async (req, res, next) => {
  const lang = "en-us";
  const input = req.body.oxford;
  try {
    let existInCache = await Word.findOne({ word: input });
    if (existInCache) {
      console.log("return from cache");
      res.status(200).json({ success: true, data: existInCache });
    } else {
      next();
    }
  } catch (err) {
    res
      .status(200)
      .json({ success: false, data: {}, message: "Word Cannot be saved" });
  }
};

exports.collectFromExtenalApi = async (req, res, next) => {
  const lang = "en-us";
  const input = req.body.oxford;

  instance
    .get(`/api/v2/entries/${lang}/${input}`)
    .then(async (result) => {
      if (result.data.results.length > 0) {
        let newWord = result.data.results[0];
        let addedWord = await new Word(newWord).save();
        req.data = addedWord;
        next();
      }
      res
        .status(200)
        .json({ success: false, data: {}, message: "Word Cannot be saved" });
    })
    .catch((err) =>
      res
        .status(200)
        .json({ success: false, data: {}, message: "Word Cannot be saved" })
    );
};
