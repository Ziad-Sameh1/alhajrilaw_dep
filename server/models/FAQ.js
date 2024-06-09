const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// FAQSchema.plugin(AutoIncrement, { inc_field: "id" });

const FAQ = mongoose.model("FAQ", FAQSchema);

module.exports = FAQ;
