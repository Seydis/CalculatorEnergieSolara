var url = 'http://localhost:3000/message/';

function getTest() {
//   fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
//        .then(function (response) {
//            // Trasform server response to get the dogs
//            response.json().then(function (dogs) {
//                log(dogs);
//            });
// });


fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
.then(
 function(response) {
   if (response.status !== 200) {
     console.log('Looks like there was a problem. Status Code: ' +
       response.status);
     return;
   }

   // Examine the text in the response
   response.json().then(function(data) {
     console.log(data);

     // var months = document.getElementById('mpc').getElementsByTagName('input');
     // //console.log(months[1]);
     // for (var i = 0; i < data.length; i++) {
     //   var temp = data[i];
     //   var kWh = temp["kWh"];
     //   months[i].value = Number(kWh);
     // }
   });
 }
)
.catch(function(err) {
 console.log('Fetch Error: ', err);
});


}

function postMessage() {
 // console.log(json);

  var name = document.getElementById('contact_form').getElementsByTagName('input');
  var message = document.getElementById('contact_form').getElementsByTagName('textarea')
  //console.log(message[0]);
  let postObject = {
    name: name[0].value,
    email: name[1].value,
    text: message[0].value
  }
   console.log(postObject);
   console.log(JSON.stringify(postObject));
  fetch(url, {
       method: 'post',
       headers: {
           "Content-type": "application/json"
       },
       body: JSON.stringify(postObject)
   }).then(function () {
       // Get the new dogs list
       console.log('am executat');
       // Reset Form
       //resetForm();
   })
   .catch(function(err) {
    console.log('Fetch Error: ', err);
  });

}

function getMessages() {

}
