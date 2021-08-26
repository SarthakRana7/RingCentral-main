var express = require('express');
var url = require("url");
const bodyParser = require('body-parser');
const SDK = require('ringcentral')
var sms=require('./src/sms');
var podioBuyers=require('./src/podioBuyers');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();
const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
});

const platform = rcsdk.platform()

app.post('/SMS',function (req, res) {



platform.loggedIn().then(function(status){ if (status) { 

 console.log("Redy Status",status);
 sms.sendSMS(req,platform,res);

} else {

 platform.login({
        username: process.env.RINGCENTRAL_USERNAME, // phone number in full format
        extension: '', // leave blank if direct number is used
        password: process.env.RINGCENTRAL_PASSWORD
            })
    .then(response => {
          console.log("Ready To Call");
        sms.sendSMS(req,platform,res);
    })
    .catch(function(e) {
        console.log(e  || 'Server cannot authorize user');
    }); 

} });


});
    
   app.post('/Register',function (req, res){
let vt=req.headers
console.log("Trigger",req.headers);
res.setHeader("validation-token", vt["validation-token"]);

res.json({"Success":"True"});
console.log("Body",req.body);
var body = JSON.stringify(req.body);
request.post('https://workflow-automation.podio.com/catch/0edzp74e70cr2od', {
body:body
});

 });


podioBuyers.buyersMatching();

app.listen(8000,()=>{

  console.log("running")
});