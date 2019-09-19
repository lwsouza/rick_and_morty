const express = require('express');
const RickAndMortyApiController = require('../controllers/rickAndMortyApiController');

const routes = express.Router();

// Routes of User
routes.get('/populated', RickAndMortyApiController.populatedCharacters);

// routes.post('/posts', upload.single('image'), PostController.store);

// routes.post('/posts/:id/like', LikeController.store);


// module.exports = app => app.use('/auth', router);
module.exports = routes;