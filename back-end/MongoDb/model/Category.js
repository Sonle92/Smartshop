const mongoose = require("mongoose");
const { Schema, model } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/Myproject",{
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
});
  const categorySchema = new Schema({
    name: { type: String, required: true },
  });
  const Category = model("Category", categorySchema);
  module.exports = Category;
