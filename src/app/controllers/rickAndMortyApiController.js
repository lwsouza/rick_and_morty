const RickAndMorty = require('../models/RickAndMorty');
var rp = require('request-promise');

async function populatedCharacters(req, res) {

    rp('https://rickandmortyapi.com/api/character/?name=rick')
        .then(async function (body) {

            try {
                body = JSON.parse(body)
            } catch (error) {
                console.error(error)
            }

            var character = {
                character: "Rick",
                image: body.results[0].image,
                dimensions_count: body.info.count
            }

            if ( await RickAndMorty.findOne({character: "Rick"}))
                return res.status(200).send({ error: 'Já populado' });

            RickAndMorty.create(character);

            rp('https://rickandmortyapi.com/api/character/?name=morty')
                .then(async function (body) {

                    try {
                        body = JSON.parse(body)
                    } catch (error) {
                        console.error(error)
                    }

                    var character = {
                        character: "Morty",
                        image: body.results[0].image,
                        dimensions_count: body.info.count
                    }
                    await RickAndMorty.create(character)


                    res.send("Populado")

                })
                .catch(function (err) {
                    // API call failed...
                    console.error(err)
                });

        })
        .catch(function (err) {
            // API call failed...
            console.error(err)
        });

}


async function updateCharacters(req, res) {

    rp('https://rickandmortyapi.com/api/character/?name=rick')
        .then(async function (body) {

            try {
                body = JSON.parse(body)
            } catch (error) {
                console.error(error)
            }

            var character = {
                character: "Rick",
                image: body.results[0].image,
                dimensions_count: body.info.count
            }
            await RickAndMorty.updateOne({character: "Rick"}, character);

            rp('https://rickandmortyapi.com/api/character/?name=morty')
                .then(async function (body) {

                    try {
                        body = JSON.parse(body)
                    } catch (error) {
                        console.error(error)
                    }

                    var character = {
                        character: "Morty",
                        image: body.results[0].image,
                        dimensions_count: body.info.count
                    }
                    await RickAndMorty.updateOne({character: "Morty"}, character)

                })
                .catch(function (err) {
                    // API call failed...
                    console.error(err)
                });

        })
        .catch(function (err) {
            // API call failed...
            console.error(err)
        });

}

async function getCharacters(req, res) {

    const rickandmorty = await RickAndMorty.find();

    return res.json(rickandmorty);

}

async function getCharactersByName(req, res) {

    var character = { character: req.params.name}

    const rickandmorty = await RickAndMorty.find(character);

    return res.json(rickandmorty);

}


module.exports = {
    populatedCharacters,
    updateCharacters,
    getCharacters,
    getCharactersByName
}