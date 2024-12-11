const sequelize = require('./database/database.js');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', routes);

dotenv.config();

const PORT = process.env.NODE_PORT

const startNode = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error('Error Starting the server:', error);
    }
};

startNode()

module.exports = app;