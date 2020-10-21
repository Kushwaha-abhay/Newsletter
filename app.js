const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
mailchimp.setConfig({
  apiKey: "98aeb33e5031d14e1f059f6911d4f17e-us2",
  server: "us2"
});

app.use(express.static("public"));
app.get("/", function(req,res){
res.sendFile(__dirname+"/signup.html");

})

app.post("/", function(req,res){

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.inputEmail;
  const listId="943ceced46";
  console.log(fname+"  "+ lname+"  "+ email);
  async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname
    }
  });
//  console.log("Successfully added contact as an audience member. The contact's id is"+ response.status);
console.log(`This user's subscription status is ${response.status}.`);
if(response.status=="subscribed")
res.sendFile(__dirname+"/success.html");
else
res.sendFile(__dirname+"/failure.html");
}

run();
})

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){

  console.log("Server is running..!!");
})

//98aeb33e5031d14e1f059f6911d4f17e-us2

//943ceced46
