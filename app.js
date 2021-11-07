const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/1876dfc2a4";

  const options = {
    method: "POST",
    auth: "atreyee6:c9de19a7f2e43016ce20e37b07b5cbf9-us5"
  }

const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/")
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.")
});

// c9de19a7f2e43016ce20e37b07b5cbf9-us5
// https://usX.api.mailchimp.com/3.0/lists/
// 1876dfc2a4
