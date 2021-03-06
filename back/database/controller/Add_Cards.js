const Schema = require("../Schema/Schema.js");

exports.Add_Cards = async function (req, res) {
  try {
    if(req.fileValidationError) {
      return res.json({ status: 400, message:req.fileValidationError})
}
console.log(req.fileValidationError)
    if (
      req.body.Title == undefined ||
      req.body.Title == "" ||
      req.body.description == undefined ||
      req.body.description == "" ||
      req.body.categories == undefined ||
      req.body.categories == "" ||
      req.body.Views == undefined ||
      req.body.Views == "" ||
      req.file == undefined
    )
      res.json({ status: 400, message: "Please fill out all the fields" });
    else {
      var newCard = {
        Title: req.body.Title,
        description: req.body.description,
        categories: req.body.categories,
        Views: req.body.Views,
        Image: req.file.filename,
      };
      //const admin = new Admin(newAdmin);
      const card = new Schema.cards(newCard);
      await card
        .save()
        .then((user) => {
          console.log("ok");
        })
        .catch((err) => console.log(err));

      await Schema.cards
        .find(function (err, data) {
          if (err) console.log("Somthing went wrong!");
        })
        .then((cards) => {
          res.json({ status: 200, message: cards });
        });
    }
  } catch (err) {
    console.log(err, "this");
  }
};
