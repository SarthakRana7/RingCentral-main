const PodioJS = require('podio-js').api;
const dotenv = require('dotenv');
const request = require("request")
var striptags = require('striptags');
const axios = require('axios');
var MatchedBuyersID="";



var podio = new PodioJS({
    authType: 'password',
    clientId: 'project-report',
    clientSecret: '5yno0NT9JePp7CsuU4cWFZdcsW4IiJF490bjk9sVfLXn9D4owp1dW6ngkuH3RpBC'
  });
module.exports = {


buyersMatching:(req,res)=>{
  //var
  try{
podio.authenticateWithCredentials(process.env.PodioUser, process.env.PodioPassword, function() {

  pullBuyersDetails(0)

//   var bodyData={
//   "limit": 100
// };

// podio.request('POST', '/item/app/18339401/filter/44015234/', bodyData).then( function(responseData) {
//   console.log("responseData",responseData)
//   // do something with the data  
// }).catch(function(err) {
//   console.log("err",err)

//   })

// podio.request('GET', '/tasks').then(function(responseData) {
//   console.log("CID",process.env.PodioClientId)
//    console.data("responseData",responseData)
// });

})
}
catch(e){console.log("error",e)}

// request({
//   uri:"https://workflow-automation.podio.com/podiofeed.php?c=8191&a=104754&f=5549",
// method:"GET"
// }, function (err, resp, body) {

//                          console.log("body",err,body);


//                       });

 }
};

//buyersMatching();

async function pullBuyersDetails(offset){
  var propertyinfo={"item_id":"1844071021",
"County":"Washington",
"Cityname":"Mulloy [Washington]",
"Buyertype":"Fix and Flip,Rental Property/ Buy & Hold",
"Multi_Family_Houses":"Multi Family (Duplex, Triplex, Fourplex)",
"Commercial_Property_Choices":"Hotel/Motel",
"Land_Choices":"Commercial",
"Townhouses":"Townhouses in General - Any Location",
"Condos":"Condos in General - Any Location",
"Property_Type":"Single Family, Land, Multi Family",
"Special_Selections":"1 Million Dollar Houses and Up"
};
 var PCounty=propertyinfo.County;
 var PCity=propertyinfo.Cityname;
 var  Pbuyer=propertyinfo.Buyertype;
 var Pmulti=propertyinfo.Multi_Family_Houses;
 var CommercialProperty=propertyinfo.Commercial_Property_Choices;
 var Landchoices=propertyinfo.Land_Choices;
 var Townhouses=propertyinfo.Townhouses;
 var Condos=propertyinfo.Condos;
 var Property_type=propertyinfo.Property_Type;
 var Specialsel=propertyinfo.Special_Selections;
 var pid=propertyinfo.item_id;

 var bodyData={
  "limit": 100,
  "offset":offset
};

podio.request('POST','/item/app/18339401/filter/44015234/', bodyData).then( function(responseData) {
   var cond=responseData.filtered;
  console.log(offset,"-",cond,"responseData",responseData.items.length)
  var js =JSON.stringify(responseData.items);
  // console.log(js);
// console.log(responseData.items);
 if(offset<cond)pullBuyersDetails(offset+100)
 {
  // do something with the data  
if(responseData.items.length!=""){
for(var i=0;i<responseData.items.length;i++){
var MatchedCriteria="";
var CountyMatch="False";
var Citymatch="False";
var BuerType="False";
var PropertyTypeMacth="";
var buyerarray="";
var Specialtag="";
  let buyerid=responseData.items[i].app_item_id;
  let field = responseData.items[i].fields
  for(let j =0 ; j < field.length; j++)
  {
// console.log(field[j].label);
    if(field[j].label=='County'){
      var county=field[j].values;
      for(let a=0;a<county.length;a++){
        var countyname=county[a].value;
        var BCounty=countyname.text;
        //County Match
        if(PCounty==BCounty){
        CountyMatch="True";
        var appitem=responseData.items[i].app_item_id;
        buyerarray=appitem;
      }
        // console.log("Success",PCounty,"-",BCounty);
      }
   
  }
  if(field[j].label=='Cities of Interest'){
    // console.log("Success",JSON.stringify(field[j]));
   var city=field[j].values;
   for(let a=0;a<city.length;a++){
     var cityname=city[a].value;
     var BCity=cityname.title;
    //  console.log(BCity);
     //City Match
     if(PCity==BCity){
     Citymatch="True";
     var appitem=responseData.items[i].app_item_id;
     buyerarray=appitem;
    }
     // console.log("Success",PCounty,"-",BCounty);
   }

}
if(field[j].label=='Buyer Type'){
  // console.log("Success",JSON.stringify(field[j]));
 var buyertype=field[j].values;
 for(let a=0;a<buyertype.length;a++){
   var buyertypename=buyertype[a].value;
   var Btype=buyertypename.text;
    // console.log(Btype);
   //Buyer type Match
   if(Pbuyer.includes(Btype)){
   BuerType="True";
   var appitem=responseData.items[i].app_item_id;
   buyerarray=appitem;
  }
 }
} 

  if(Pmulti!="" && field[j].label=='Multi Family Houses'){
   var multi1=field[j].values;

   for(let a=0;a<multi1.length;a++){
     var multi2=multi1[a].value;
     var multi=multi2.text;
     //Buyer type Match
     if(Pmulti==multi)
     {
      PropertyTypeMacth="True";
      console.log("Success Multi");
      var appitem=responseData.items[i].app_item_id;
      buyerarray=appitem;
     }
   }
  }
  
    if(PropertyTypeMacth==""&& CommercialProperty!="" )
    { 
      if(field[j].label=='Commercial Property Choices'){
      var comm=field[j].values;
      for(let a=0;a<comm.length;a++){
       var comm2=comm[a].value;
       var BComm=comm2.text;
       if(BComm==CommercialProperty){
       PropertyTypeMacth="True";
       console.log("Success Commercial");
       var appitem=responseData.items[i].app_item_id;
        buyerarray=appitem;
       }
      }
   }
  }
   if(PropertyTypeMacth==""&& Landchoices!="")
    {
      if(field[j].label=='Land Choices'){
      var land=field[j].values;
      for(let a=0;a<land.length;a++){
       var land2=land[a].value;
       var BLand=land2.text;
       if(BLand==Landchoices){
       PropertyTypeMacth="True";
       console.log("Success Land");
       var appitem=responseData.items[i].app_item_id;
        buyerarray=appitem;
       }
      }
    }
   }

   if(PropertyTypeMacth==""&& Townhouses!="")
   {
     if(field[j].label=='Townhouses'){
     var town=field[j].values;
     for(let a=0;a<town.length;a++){
      var town2=town[a].value;
      var Btown=town2.text;
      if(Btown==Townhouses){
      PropertyTypeMacth="True";
      console.log("Success Town");
      var appitem=responseData.items[i].app_item_id;
      buyerarray=appitem;
      }
     }
   }
  }
  if(PropertyTypeMacth==""&& Condos!="")
  {    
    if(field[j].label=='Condos'){
    var condo=field[j].values;
    for(let a=0;a<condo.length;a++){
     var condo2=condo[a].value;
     var Bcondo=condo2.text;
     if(Bcondo==Condos){
     PropertyTypeMacth="True";
     console.log("Success Condos");
     var appitem=responseData.items[i].app_item_id;
     buyerarray=appitem;
      // console.log("Success",PropertyTypeMacth);
     }
    }
  }
 }

 if(PropertyTypeMacth==""&& field[j].label=='Interested in Single Family Houses'&&Property_type.includes("Single Family"))
 {
   var interested=field[j].values;
   for(let a=0;a<interested.length;a++){
    var interested2=interested[a].value;
    var Binterested=interested2.text;
    if(Binterested!=""){
    PropertyTypeMacth="True";
    console.log("Success single family")
    var appitem=responseData.items[i].app_item_id;
    buyerarray=appitem;
    }
   }
 }
 
 if(field[j].label=='Special Selections')
 {
   var Special=field[j].values;
   for(let a=0;a<Special.length;a++){
    var Special2=Special[a].value;
    var BSpecial=Special2.text;
    if(BSpecial==Specialsel){
      Specialtag="True";
    var appitem=responseData.items[i].app_item_id;
    buyerarray=appitem;
    }
   }
 }

 if ((Property_type.includes("Land") && Landchoices=="") || (Property_type.includes("Multi Family") && Pmulti=="")|| (Property_type.includes("Condo") && Condos=="")|| (Property_type.includes("Town House")  && Townhouses=="")|| (Property_type.includes("Commercial") && CommercialProperty=="")){
  if((Property_type.includes("Land")&& field[j].label=='Land Choices')){
      var land3=field[j].values;
      for(let a=0;a<land3.length;a++){
       var land4=land3[a].value;
       var BLand4=land4.text;
       if(BLand4!=""){
       PropertyTypeMacth="True";
       var appitem=responseData.items[i].app_item_id;
        buyerarray=appitem;
  }
   }
  }
  else if(field[j].label=='Multi Family Houses' && Property_type.includes("Multi Family")){
   var multi3=field[j].values;
   for(let a=0;a<multi3.length;a++){
     var multi4=multi3[a].value;
     var Bmulti5=multi4.text;
     //Buyer type Match
     if(Bmulti5!="")
     {
      PropertyTypeMacth="True";
      var appitem=responseData.items[i].app_item_id;
      buyerarray=appitem;
     }
   }
  }

  else if(field[j].label=='Condos' && Property_type.includes("Condo")){
    var condo3=field[j].values;
    for(let a=0;a<condo3.length;a++){
     var condo4=condo3[a].value;
     var Bcondo1=condo4.text;
     if(Bcondo1!=""){
     PropertyTypeMacth="True";
     var appitem=responseData.items[i].app_item_id;
     buyerarray=appitem;
      // console.log("Success",PropertyTypeMacth);
     }
    }
  }

  else if(field[j].label=='Townhouses' && Property_type.includes("Town House")){
    var town3=field[j].values;
    for(let a=0;a<town3.length;a++){
     var town4=town3[a].value;
     var Btown5=town4.text;
     if(Btown5!=""){
     PropertyTypeMacth="True";
     var appitem=responseData.items[i].app_item_id;
     buyerarray=appitem;
     }
    }
  }

  else if(field[j].label=='Commercial Property Choices' &&  Property_type.includes("Commercial")){
    var comm3=field[j].values;
    for(let a=0;a<comm3.length;a++){
     var comm4=comm3[a].value;
     var BComm5=comm4.text;
     if(BComm5!=""){
     PropertyTypeMacth="True";
     var appitem=responseData.items[i].app_item_id;
      buyerarray=appitem;
     }
    }
  }
  }
  }
// match tags here
if(PropertyTypeMacth=="True"&& Citymatch=="True"&& CountyMatch=="True" && BuerType=="True"){
  MatchedCriteria="County/ City/Buyer Type/ Types of Property,";
}
if(Citymatch=="True"&& CountyMatch=="True" ){
  MatchedCriteria=MatchedCriteria.concat("County/ City,");
}
if( BuerType=="True"&& PropertyTypeMacth=="True"&&Specialtag=="True"){
  MatchedCriteria=MatchedCriteria.concat("Buyer Type/ Special Selections/ Property Type,");
}
if( CountyMatch=="True"&& BuerType=="True"&&Specialtag=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/Buyer Type/ Special Selections,");
}
if( CountyMatch=="True"&& BuerType=="True"&&Specialtag=="True"&& PropertyTypeMacth=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/Buyer Type/ Special Selections / Property Type,");
}
if( CountyMatch=="True"&& Citymatch=="True"&&Specialtag=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/ City/ Special Selections ( buyer has NO buyer types filled out= Match),");
}
if( CountyMatch=="True"&& Citymatch=="True"&&Specialtag=="True"&& PropertyTypeMacth=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/ City/ Special Selections/ Property Type ( buyer has NO buyer types filled out= Match),");
}
if( CountyMatch=="True"&& BuerType=="True"&&Citymatch=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/City/Buyer Type( buyer has NO Special Selections filled out= Match),");
}
if( CountyMatch=="True"&& BuerType=="True"&&Citymatch=="True"&& PropertyTypeMacth=="True"){
  MatchedCriteria=MatchedCriteria.concat("County/City/Buyer Type/ Property Type ( buyer has NO Special Selections filled out= Match),");
}
if( Specialtag=="True"&& BuerType=="True"&&Citymatch=="True"){
  MatchedCriteria=MatchedCriteria.concat("City/ Special Selections/ Buyer Type ( buyer has NO county picked= match),");
}
if( Specialtag=="True"&&Citymatch=="True"){
  MatchedCriteria=MatchedCriteria.concat("City/ Special Selections ( buyer has NO County or buyer type picked= Match),");
}
if( Specialtag=="True"&&Citymatch=="True"&&PropertyTypeMacth=="True"){
  MatchedCriteria=MatchedCriteria.concat("City/ Special Selections/ Property Type ( buyer has NO County or buyer type picked= Match),");
}
if(BuerType=="True"&&Citymatch=="True"){
  MatchedCriteria=MatchedCriteria.concat("City/ Buyer Type ( buyer has NO county or Special Selections picked= Match),");
}
if(BuerType=="True"&&Citymatch=="True"&&PropertyTypeMacth=="True"){
  MatchedCriteria=MatchedCriteria.concat("City/ Buyer Type/ Property type ( buyer has NO county or Special Selections picked= Match),");
}
if(MatchedCriteria.charAt(MatchedCriteria.length-1)==',')
{
  MatchedCriteria=MatchedCriteria.substring(0, MatchedCriteria.length - 1);
}
console.log("City:",Citymatch);
console.log("County:",CountyMatch);
console.log("Buyer type:",BuerType);
console.log("Special selectoin:",Specialtag);
console.log("Property:",PropertyTypeMacth);
console.log(MatchedCriteria);
console.log(buyerarray);
// Post data
const postdata =   axios({
  url:" https://workflow-automation.podio.com/catch/7677qhdzz99lkd6",
  method:"POST",
  data:{"MatchedCriteria":MatchedCriteria,"buyerarray":buyerarray,"pid":pid},
})
}
}
 }


}).catch(function(err) {
  console.log("err",err);
  })
}