const Schema = require("../Schema/Schema.js");

exports.Delete_Cards = async function (req, res) {
  try {
    Schema.cards.deleteOne({ _id: `${req.body._id}` }, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  } catch (err) {
    console.log(err);
  }
};
