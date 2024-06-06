require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // dialect: 'mysql',
  // dialectModule: require('mysql2'),
  dialect: 'postgres',
  logging: false,
});

// Import the Contact model
const Contact = require('./contact')(sequelize, DataTypes);

// Define the db object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Contact = Contact;

// Synchronize the models
db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch(err => {
    console.error("Error creating database tables:", err);
  });

module.exports = db;
