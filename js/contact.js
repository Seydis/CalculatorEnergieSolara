var url = 'http://localhost:3000/message/';

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
