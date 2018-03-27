
const route = require('express').Router();
const authUtils = require('../../auth/utils');
const product = require('../../db/models').product;
const User = require('../../db/models').User;
const cart = require('../../db/models').cart;


route.get('/', (req, res) => {
    console.log(req.user);
    product.findAll({
        attributes: ['id', 'name', 'price', 'imgUrl'],
    })
        .then((products) => {
            res.status(200).send(products)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Error retrieving products")
        })
});



route.get('/cart/:id', (req, res) => {
    console.log("Reached Here");
    cart.findAll({
        where: {
            userID: req.params.id,
            
        }}).then((products) => {
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(500).send('Cart Empty for this user')
        }
    })
});
route.post('/new', (req, res) => {

    product.create({
        
        name: req.body.name,
        price: req.body.price,
        imgUrl:req.body.imgUrl
    }).then((prods) => {
        //res.status(200).send(event)

        
            res.status(200).send(prods)
        
    }).catch((err) => {
        res.status(500).send("There was an error adding to list")

    })
});

route.post('/cart/new', (req, res) => {
    
    
    cart.create({
        id: req.body.p_id,
        quantity: 1,
        userID: req.user.id
    }).then((cart) => {
        //res.status(200).send(event)

        
            res.status(200).send(cart)
        
    }).catch((err) => {
        res.status(500).send("There was an error adding to cart")

    })
});

route.put('/cart/:id/add/:p_id', (req, res) => {
    cart.increment('quantity',
        {
            where: {
                userID: req.params.id,
                id: req.params.p_id
            }
        }).then((updatedCart) => {
            if (updatedCart[0] == 0) {
                return res.status(403).send('Item Does not exist in the cart')
            } else {
                res.status(200).send('Item added!')
            }

    })
});


route.delete('/cart/:id/remove/:p_id', (req, res) => {
    cart.destroy(
        {
            where: {
                userID: req.params.id,
                id: req.params.p_id
            }
        }).then((destroyedRows) => {
        if (destroyedRows == 0) {
            return res.status(403).send('Item does not exist or you do not have permissions')
        } else {
            res.status(200).send('Item successfully deleted')
        }

    })
});

module.exports = route;