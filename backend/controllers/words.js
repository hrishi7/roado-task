// const Word = require("../models/Word");

const Word = require("../models/Word");

exports.saveNewWord = async (req, res, next) => {
  if (req.data) {
    return res.status(200).json({ success: true, data: req.data });
  } else {
    res
      .status(500)
      .json({ success: false, data: {}, message: "Word Cannot be saved" });
  }
};

exports.getWords = async (req, res, next) => {
  try {
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);

    let filteringObj = {};
    if(req.query.text && req.query.text != ""){
      filteringObj['word'] = RegExp(req.query.text.trim(),'i')
    }

    let words = await Word.find(filteringObj).sort({createdAt:-1}).skip(page * limit).limit(limit);

    res.status(200).json({
      success: true,
      data: words,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
