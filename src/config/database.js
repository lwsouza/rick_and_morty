const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set("useFindAndModify", false)

mongoose.connect('mongodb://admin:petlove2019@ds225010.mlab.com:25010/rickandmorty', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;