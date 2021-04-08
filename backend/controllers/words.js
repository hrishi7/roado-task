// const Word = require("../models/Word");

exports.saveNewWord = async (req, res, next) => {
  if (req.data) {
    return res.status(200).json({ success: true, data: req.data });
  } else {
    res
      .status(200)
      .json({ success: false, data: {}, message: "Word Cannot be saved" });
  }
};

exports.getWords = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "working",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
