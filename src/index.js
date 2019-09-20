const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/rickandmortyapi');
// const routesAdmin = require('./app/routes/admin');
// const routesMarket = require('./app/routes/market');
const helmet = require('helmet')
const RickAndMortyApiController = require('./app/controllers/rickAndMortyApiController');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.use('/api', routes);

// Atualizada a cada 8 horas
setInterval(function() { 
    RickAndMortyApiController.updateCharacters()
    console.log("setInterval: Ja passou 1 segundo!"); 
}, 28800000);

const server = app.listen(3000);

module.exports = server;

// app.listen(3000, function(){
//     console.log("API Funcionando!");
// });