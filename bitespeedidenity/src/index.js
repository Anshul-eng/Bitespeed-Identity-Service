const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', contactRoutes);


db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  
