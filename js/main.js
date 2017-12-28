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

var hoursOfSunshine;
var userZone = document.forms.solarForm.zone.selectedIndex;
userZone += 1; //offset for userZone to match the zones in the UI

switch userZone {
  case 1:
    hoursOfSunshine = 6;
    break;
  case 2:
    hoursOfSunshine = 5.5;
    break;
  case 3:
}

var dailyUseKw = addMonths('mpc');
