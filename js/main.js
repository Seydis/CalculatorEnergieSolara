/*jslint browser:true */
"use strict";

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

function calculateEnergy(){
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
