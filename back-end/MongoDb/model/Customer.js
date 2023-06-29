const mongoose = require("mongoose");
const { Schema, model } = mongoose;
mongoose.connect("mongodb://127.0.0.1:27017/Myproject",{
        useNewUrlParser: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
});
const customersSchema = new Schema({
    fullname: { type: String },
    phone: { type: String, validate: {
      validator: function (value) {
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        return phoneRegex.test(value);
      },},},
    address: { type: String },
    cartItems:[],
    tongtien:{ type: Number},
    tongsoluong:{ type: Number },
    trangthai:{type:String},
})
  const Customer = model("Customer", customersSchema);
  module.exports = Customer;