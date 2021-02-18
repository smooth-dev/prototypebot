var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/', function(req, res, next) {
  let city = req.body.queryResult.parameters["geo-city"];
  let test = req.body.queryResult.intent["displayName"];
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID=0ed0839d26e395af50e382032d65017c`;
  let url2 = `https://mboum.com/api/v1/co/collections/?list=day_gainers&start=1&apikey=demo`;
  let url3 = `http://localhost:8080/account`;
    


if(test=="GetMonSolde")
{
  // axios.get(url).then(aRes => {
  //   let conditions = aRes.data.weather[0].main;
  //   let temp = aRes.data.main.temp;

  //   let textResponse = `In ${city}, it is ${temp} degrees Kelvin and ${conditions}`;
  //   res.send(createTextResponse(textResponse));

  // }).catch(err => {
  //   console.log(err);
  // })
  axios.get(url3).then(aRes => {
    let conditions = aRes.data[0].solde;

    let textResponse = `votre solde est : ${conditions} $`;
    res.send(createTextResponse(textResponse));

  }).catch(err => {
    console.log(err);
  })
}


if(test=="getStocks")
{
   axios.get(url2).then(aRes => {
      var tab=['\n'];
for (var i = 0; i < 4; i++) {
    tab.push(aRes.data.quotes[i]["shortName"]+`\n`+`\r`);
}
  //  let tempi = aRes.data.quotes[0]["quoteSourceName"];
    let textResponse = `The trending stocks are : ${tab}`;
    res.send(createTextResponse(textResponse));

  }).catch(err => {
    console.log(err);
  })
}


if(test=="investInStocks")
{
    let stock = req.body.queryResult.parameters["account"];
      let amount = req.body.queryResult.parameters["unit-currency"]["amount"];
    let url4 = `http://localhost:8080/account/invest/${amount}`;
    
   axios.get(url4).then(aRes => {
let solde=aRes.data.solde;
  //  let tempi = aRes.data.quotes[0]["quoteSourceName"];
    let textResponse = `You invested   ${amount} $ at  ${stock} \n  with a book Value of 38.225 \n  your new balance is : ${solde} $ `;
    res.send(createTextResponse(textResponse));

  }).catch(err => {
    console.log(err);
  })
}

});

function createTextResponse(textResponse){
  let response = {
    "fulfillmentText": textResponse,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],
    "source": "example.com",
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": "this is a simple response"
              }
            }
          ]
        }
      },
      "facebook": {
        "text": "Hello, Facebook!"
      },
      "slack": {
        "text": "This is a text response for Slack."
      }
    }
  }
  return response;
}

module.exports = router;