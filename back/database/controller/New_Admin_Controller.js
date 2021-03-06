const connect = require("../connect.js");
const Schema = require("../Schema/Schema.js");
const test_function = require("./function/test_input_function");
const bcrypt = require("bcrypt");

exports.New_Admin_Controller = async function (req, res) {
  function test_input(data) {
    data = data.trim();
    data = test_function.stripslashes(data);
    data = test_function.htmlspecialchars(data);
    return data;
  }



  try {
    if (
     
      req.body.email == undefined ||
      req.body.email == "" ||
      req.body.password == undefined ||
      req.body.password == "" ||
      req.body.verifypassword == undefined ||
      req.body.verifypassword == ""
    )
      return res.json({
        status: 401,
        message: "Please fill out all the fields",
      });
    else {
      //console.log(test_input("hh<htm   l>  ////0 &  "));
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      if (req.body.password != req.body.verifypassword) {
        return res.json({
          status: 401,
          message: "Pass and Verify Pass must be the same",
        });
      }
      var newAdmin = {
       
        email: test_input(req.body.email),
        password: test_input(hashedPassword),
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
      };
      Schema.users.findOne({
   
        email: req.body.email
   
}).then(async user => {
    if (user) {
        let errors = "Email already exists";
      
        
        return res.json({ status: 400, message: errors });
    } 
    else{
      const admin = new Schema.users(newAdmin);
      await admin
        .save()
        .then((user) => {
          console.log("ok");
        })
        .catch((err) => console.log(err));

      Schema.users
        .find(function (err, data) {
          if (err) console.log("Somthing went wrong!");
        })
        .then((admin) => {
          res.json({ status: 200, message: admin });
        });
      }
    })
  }
} catch (err) {
  console.log(err);
}
};
