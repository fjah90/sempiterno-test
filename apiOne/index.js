const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const usersRoutes = require('./src/routes/usersRoutes');
app.use('/users', usersRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});