
const Sequelize = require('sequelize');

const db = new Sequelize({
    username: 'root',
    password: 'dream',
    database: 'shoppingdb',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

const product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    imgUrl: Sequelize.STRING
    
});

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

const cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: Sequelize.INTEGER,
    userID: Sequelize.INTEGER
});



const AuthToken = db.define('authtoken', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: Sequelize.STRING,
        unique: true,
        index: true
    }
});

AuthToken.belongsTo(User);
User.hasMany(AuthToken);

cart.belongsTo(User, {
    foreignKey: 'userID',
    as: 'user'
});
User.hasMany(product, {
    foreignKey: 'UserId'
});
cart.belongsTo(product,{
    foreignKey: 'id',
})



db.sync({force: false}).then(() => {
    console.log('Database is synchronised');
});

module.exports = {
    product, User, cart, AuthToken
};

