const router = require("express").Router();

/**controller function */
const { saveNewWord, getWords } = require("../controllers/words");

/**middleware function */
const {
  findInCache,
  collectFromExtenalApi,
} = require("../middlewares/cacheMiddleware");

/**
 * @description   this route is used to add new word
 * @route   POST      /api/v1/words
 * @access  Public
 */
router.post("/", findInCache, collectFromExtenalApi, saveNewWord);

/**
 * @description   this route is used to add new word
 * @route   GET      /api/v1/words/page/:page/limit/:limit
 * @query q
 * @access  Public
 */
router.get("/page/:page/limit/:limit", getWords);

module.exports = router;
