const CategoryRoute = require('../routes/categories')
const CustomerRoute = require('../routes/customers')
const ProductRoute = require('../routes/products')
function routes(app) {
    app.use('/category',CategoryRoute);
    app.use('/customer',CustomerRoute);
    app.use('/product',ProductRoute);
}

module.exports = routes