var url = 'http://localhost:3000/message/';

function postMessage() {
  var json = { "message": [
    { "id": 1, "name": "", "email": "", "text": "" }
  ]};

 // console.log(json);

  var message = document.getElementById('contact_form').getElementsByTagName('input');
  console.log(message[0]);
  json["message"].name = message[0];
  json["message"].email = message[1];
  json["message"].text = message[2];
  // for (var i = 0; i < message.length; i++) {
  //   //console.log(json['year'][i].name);
  //   json['mess'][i].kWh = Number(months[i].value);
  //   //var kWh = temp["kWh"];
  //   //months[i].value = Number(kWh);
  //}

  console.log('JSON to post' + json);

  fetch(url, {
   method: 'post',
   headers: {
     "Content-type": "application/json"
   },
   body: ''
 })
 .then(json)
 .then(function (data) {
   console.log('Request succeeded with JSON response', data);
 })
 .catch(function (error) {
   console.log('Request failed', error);
 });
}
