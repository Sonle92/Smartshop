const mongoose = require('../../config/connectDB');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
// mongoose.connect("mongodb://127.0.0.1:27017/Myproject",{
//         useNewUrlParser: true,
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
// });
const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    discount: Number,
    stock: Number,
    memory:[String],
    color:[String],
    categoryId: { type: mongoose.Schema.Types.ObjectId},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    versionKey: false,
  },
  )
  productSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
  });
const Product = model('Product', productSchema);
module.exports = Product;
