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
// app.use(auth.initialize());

app.use('/api', routes);
// app.use('/admin', routesAdmin);
// app.use('/market', routesMarket);

// setInterval(function() { 
//     RickAndMortyApiController.updateCharacters()
//     console.log("setInterval: Ja passou 1 segundo!"); 
// }, 5000);

setTimeout(function() { 
    RickAndMortyApiController.updateCharacters()
    console.log("setInterval: Ja passou 1 segundo!"); 
}, 3000);

app.listen(3000, function(){
    console.log("API Funcionando!");
});