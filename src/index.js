//lib
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//middlewares

//path
const path = require('path');

//config service 
const app = express();
const port = 3001;
app.use(cors());

//config JWT

//config router
const route = require('./routes');
//config db connect
const db = require('./config/db/index');

db.connect();

//config static file
app.use(express.static(path.join(__dirname, 'public')));



//config json
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());

//custom middlewares

//HTTP logger
app.use(morgan('combined'))

//use routes
route(app);


app.listen(port, () => { console.log(`App listening on port http://localhost:${port}`) });