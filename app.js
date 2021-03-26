const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('./config/config')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors('*'));


// parse application/json
app.use(bodyParser.json());
app.use(require('./modules/users/routes/userRoute'));
app.use(require('./modules/roles/routes/rolesRoutes'));
app.use(require('./modules/auth/routes/auth'));
const opts = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true};
mongoose.connect('mongodb://localhost:27017/cafe',opts,(err, res) => {
   if(err) throw err;
   console.log("database online");

});
app.listen(process.env.PORT, () => {
   console.log('server listening on port :', process.env.PORT);
});
