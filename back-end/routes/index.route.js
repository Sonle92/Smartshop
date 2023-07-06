const CategoryRoute = require("./categories.route");
const CustomerRoute = require("./customers.route");
const ProductRoute = require("./products.route");
function routes(app) {
  app.use("/category", CategoryRoute);
  app.use("/customer", CustomerRoute);
  app.use("/product", ProductRoute);
}

module.exports = routes;
