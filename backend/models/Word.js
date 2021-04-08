const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  id: String,
  word: String,
  language: String,
  lexicalEntries: [
    {
      derivatives: [
        {
          id: String,
          text: String,
        },
      ],
      entries: [
        {
          etymologies: [],
          senses: [
            {
              definitions: [],
              examples: [
                {
                  text: String,
                },
              ],
              subsenses: [
                {
                  definitions: [],
                  examples: [
                    {
                      text: String,
                    },
                  ],
                  synonyms: [
                    {
                      language: String,
                      text: String,
                    },
                  ],
                },
              ],
              synonyms: [
                {
                  language: String,
                  text: String,
                },
              ],
            },
          ],
        },
      ],
      language: String,
      phrases: [
        {
          id: String,
          text: String,
        },
      ],
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

// Export Module/Schema
module.exports = mongoose.model("Word", wordSchema);
