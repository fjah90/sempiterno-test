const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const imageRoutes = require('./src/routes/imageRoutes');
app.use('/', imageRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});