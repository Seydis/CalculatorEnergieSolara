/*jslint browser:true */
"use strict";

 var url = 'http://localhost:3000/year/';

function addMonths(elementId) {
  var annualUseKw = 0;
  var dailyUseKw = 0;
  var x = 0;

  var months = document.getElementById(elementId).getElementsByTagName('input');

  for (var i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUseKw += x;
  }

  dailyUseKw = annualUseKw / 365;
  //console.log(dailyUseKw);
  return dailyUseKw;
}

function sunHours() {
  var hoursOfSunshine;
  var userZone = document.forms.solarForm.zone.selectedIndex;
  userZone += 1; //offset for userZone to match the zones in the UI

  switch (userZone) {
    case 1:
      hoursOfSunshine = 6;
      break;
    case 2:
      hoursOfSunshine = 5.5;
      break;
    case 3:
      hoursOfSunshine = 5;
      break;
    case 4:
      hoursOfSunshine = 4.5;
      break;
    case 5:
      hoursOfSunshine = 4.2;
      break;
    case 6:
      hoursOfSunshine = 3.5;
      break;
    default:
      hoursOfSunshine = 0;
      break;
  }

  return hoursOfSunshine;
}

function calculatePanel() {
  var userPanelChoice = document.forms.solarForm.panel.selectedIndex;
  var panelOptions =  document.forms.solarForm.panel.options;
  var selectedPanelPower = panelOptions[userPanelChoice].value;
  var selectedPanelName = panelOptions[userPanelChoice].text;

  var selectedPanel = {};
  selectedPanel['name'] = selectedPanelName;
  selectedPanel['power'] = selectedPanelPower;

  return selectedPanel;
}

function calculateEnergy() {
  var dailyUseKw = addMonths('mpc');
  var sunHoursPerDay = sunHours();
  //console.log(sunHoursPerDay);

  var minKwNeeded = dailyUseKw/sunHoursPerDay;

  var adjustedKwNeeded = minKwNeeded * 1.25;
  //adjusted for back-up in case of multiple cloudy days
  var adjustedWattNeeded = adjustedKwNeeded * 1000;

  var panelInfo = calculatePanel();
  var panelOutput = panelInfo['power'];
  var panelName = panelInfo['name'];

  var panelsNeeded = Math.ceil(adjustedWattNeeded / panelOutput);
  //rounded up for readability
  //console.log(panelsNeeded);

  var feedback = "";
  feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + "kWh, you will need to purchase "+ panelsNeeded +" " + panelName +" solar panels";
  feedback += "<h2>Additional Details </h2>";
  feedback += "<p>Your average daily electricity consumptions: " + Math.round(dailyUseKw) + " kWh per day. </p>";
  feedback += "<p>Realistic watts needed per hour: " + sunHoursPerDay +" watts/hour.</p>";
  feedback += "<p>The " + panelName + " panel you've selected generates about " + panelOutput +" watts per hour. </p>";

  document.getElementById('feedback').innerHTML = feedback;
}

/**
 * NETWORK CALLS
 */

 function getSolarData() {
   fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        //console.log(data);

        var months = document.getElementById('mpc').getElementsByTagName('input');
        //console.log(months[1]);
        for (var i = 0; i < data.length; i++) {
          var temp = data[i];
          var kWh = temp["kWh"];
          months[i].value = Number(kWh);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error: ', err);
  });

 }

 // function deleteSolarData() {
 //   var months = document.getElementById('mpc').getElementsByTagName('input');
 //   for (var i = 1; i <= months.length; i++) {
 //       fetch(url + String(i), {
 //        method: 'delete',
 //        headers: {
 //          "Content-type": "application/json"
 //        },
 //        body: ''
 //      })
 //      .then(function (data) {
 //        console.log('Request succeeded with JSON response', data);
 //      })
 //      .catch(function (error) {
 //        console.log('Request failed', error);
 //      });
 //   }
 // }

function updateMonth(id, kwHToPut) {
  let monthName;
  switch (id) {
    case 1:
      monthName = 'January'
      break;
    case 2:
      monthName = 'February'
      break;
    case 3:
      monthName = 'March'
      break;
    case 4:
      monthName = 'April'
      break;
    case 5:
      monthName = 'May'
      break;
    case 6:
        monthName = 'June'
        break;
    case 7:
      monthName = 'July'
      break;
    case 8:
      monthName = 'August'
      break;
    case 9:
      monthName = 'September'
     break;
   case 10:
      monthName = 'October'
     break;
    case 11:
      monthName = 'November'
      break;
   case 12:
      monthName = 'December'
      break;
    default:
      monthName = ""
  }

  const putObject = {
    name: monthName,
    kWh: kwHToPut
  }

  //console.log(putObject);

  fetch(`http://localhost:3000/year/${id}`, {
       method: 'PUT',
       headers: {
           "Content-type": "application/json"
       },
       body: JSON.stringify(putObject)
   }).then(function (data) {
        console.log('Request succeeded with JSON response', data);
});
}

 function putSolarData() {

   var months = document.getElementById('mpc').getElementsByTagName('input');
   console.log(months.length);
   var putObject;
   for (var i = 0; i < months.length; i++) {
     updateMonth(i+1, Number(months[i].value));
   }
 }

/**
 * Calls on loading the page
 */

 getSolarData();
