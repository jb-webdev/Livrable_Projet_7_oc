const express       = require('express'); 
const bodyParser    = require('body-parser');
const userRoutes    = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoute');

const app = express(); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

module.exports = app; 