require('./config/config');

const mongoose = require('mongoose');

const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');


const app = express();

const publicPath = path.resolve(__dirname, '../vista');

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/index'));
app.use(express.static(publicPath));


mongoose.connect(process.env.URLDB, (err, res) => {

    if (err) throw err;

    console.log('Conectando a Localhost(Temporal)');

});

app.listen(process.env.PORT, () => {
    console.log(`Puerto: ${process.env.PORT}`);
});