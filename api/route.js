'use strict';
module.exports = function(app) {
    let productsCtrl = require('./controllers/ProductsController');
    //let userCtrl = require('./controllers/UsersController');
    let userCtrl = require('./database');
    // list route to do
    app.route('/products')
        .get(productsCtrl.get)
        .post(productsCtrl.store);

    app.route('/products/:productId')
        .get(productsCtrl.detail)
        .put(productsCtrl.update)
        .delete(productsCtrl.delete);
    
    app.route('/users?page=:page')
        .get(userCtrl.get)
    app.route('/users')
        .get(userCtrl.getalluser)
        .post(userCtrl.store)
    app.route('/users/:userId')
        .get(userCtrl.detail)
        .put(userCtrl.update)
        .delete(userCtrl.delete)
};