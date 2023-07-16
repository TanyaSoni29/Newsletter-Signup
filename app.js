const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
    const name= req.body.firstName;
    const last= req.body.secondName;
    const email= req.body.emailAddress;
    const data = {
        members: [{
            email_address: email ,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
                LNAME: last,

            }
        }
    ]
    }; 
    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/293dbe9826";
    
    const options = {
    method: "POST",
    auth: "TanyaS:de2fa46bceaf7d88683851a304c9ef67-us17"
}

 const request =   https.request(url, options,  function(response){
    if (response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");

    }
    else {
        res.sendFile(__dirname + "/failure.html");
    }
response.on("data", function(data){
    console.log(JSON.parse(data));
})
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});



app.listen(3000, function(){
    console.log("server starting on port 3000!");
});
//apikey
//de2fa46bceaf7d88683851a304c9ef67-us17
//list id or audience id-293dbe9826