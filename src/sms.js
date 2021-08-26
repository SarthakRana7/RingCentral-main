
module.exports = {


sendSMS:(req,platform,res)=>{

let data=req.body;
console.log(data.to);

platform.post('/account/~/extension/~/sms', {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: data.to }
    ],
    text: data.content
  }).then(response => {
    console.log('SMS sent: ', response.json())
    res.json(response.json());
  }).catch(e => {
  	 console.error(e.apiResponse._json);
  	
   let rsJS=e.apiResponse._json || {"message":"Undefined request"};
    res.json(rsJS);
  })

}
};