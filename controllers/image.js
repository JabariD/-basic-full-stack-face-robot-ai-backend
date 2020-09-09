const Clarifai = require('clarifai');
/** Clarifai */
const app = new Clarifai.App( {apiKey: '994cdf52471d4800b5fbedf89c406ce3'} );

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
              .then(data => {
                  res.json(data);
              })
              .catch(err => res.status(400).json("Unable to work with API"));

}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
        if (entries.length === 0) throw Error("No user found.");
        res.json(entries[0]);
    })
    .catch(err => {res.status(400).json("There was an error updating entries")});
}

  module.exports = {
      handleImage,
      handleApiCall
  }