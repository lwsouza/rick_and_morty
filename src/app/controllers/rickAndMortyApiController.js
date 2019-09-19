const RickAndMorty = require('../models/RickAndMorty');
var rp = require('request-promise');

async function populatedCharacters(req, res) {

    rp('https://rickandmortyapi.com/api/character')
        .then(function (body) {

            try {
                body = JSON.parse(body)
            } catch (error) {
                console.error(error)
            }


            body.results.forEach(element => {
                var character = {
                    character: element.name,
                    image: element.image,
                    identifier: element.id
                }
                RickAndMorty.create(character)
            });

            newCharacter(body.info.next)

            res.send("Populado")

        })
        .catch(function (err) {
            // API call failed...
            console.error(err)
        });

}

const newCharacter = async (uri) => {

    rp(uri)
        .then(function (body) {

            try {
                body = JSON.parse(body)
            } catch (error) {
                console.error(error)
            }


            body.results.forEach(element => {
                var character = {
                    character: element.name,
                    image: element.image,
                    identifier: element.id
                }
                RickAndMorty.create(character)
            });

            if (body.info.next !== "")
                updateCharacter(body.info.next)
            else
                return;

        })
        .catch(function (err) {
            // API call failed...
            console.error(err)
        });

};


async function updateCharacters(req, res) {
    console.log("SWQU")

    rp('https://rickandmortyapi.com/api/location')
        .then(function (body) {

            try {
                body = JSON.parse(body)
            } catch (error) {
                console.error(error)
            }

            body.results.forEach(element => {

                element.residents.forEach(element => {
                    console.log(element.replace("https://rickandmortyapi.com/api/character/", ""))

                    var id = element.replace("https://rickandmortyapi.com/api/character/", "")

                    RickAndMorty.findOneAndUpdate({
                        identifier: parseInt(id)
                    }, {
                        $set: {
                            $inc: {
                                dimensions_count: 1
                            }
                        }
                    })
                })

                // var character = {
                //     character: element.name,
                //     image: element.image,
                //     identifier: element.id
                // }
                // RickAndMorty.create(character)
            });

            // newCharacter(body.info.next)

            // res.send("Populado")

        })
        .catch(function (err) {
            // API call failed...
            console.error(err)
        });

}


module.exports = {
    populatedCharacters,
    updateCharacters
}