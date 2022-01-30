/*
 * Entry point for the watch app
 */
import * as document from "document";

import { HeartRateSensor } from "heart-rate";

import { vibration } from "haptics";

import { me as appbit } from "appbit";

import * as fs from "fs";

import { peerSocket } from "messaging";
import * as messaging from "messaging";

let demo = document.getElementById("demotext");
let buttonyes = document.getElementById("button-yes");
let buttonno = document.getElementById("button-no");
buttonyes.style.visibility = "hidden"; 
buttonno.style.visibility = "hidden"; 

let myRect1 = document.getElementById("button-yes");

myRect1.addEventListener("click", (evt) => {
  console.log("click");
  sendMessage();
  buttonyes.style.visibility = "hidden"; 
  buttonno.style.visibility = "hidden"; 
  demo.text = "You got this!"
});

let myRect2 = document.getElementById("button-no");

myRect2.addEventListener("click", (evt) => {
  console.log("click");
  buttonyes.style.visibility = "hidden"; 
  buttonno.style.visibility = "hidden"; 
  demo.text = "You got this!"
});


function sendMessage(data) {
  // Sample data
  const data = data

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}



if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.start();
   hrm.onreading = function() {
   // Peek the current sensor values
   console.log("Current heart rate: " + hrm.heartRate);
   messaging.peerSocket.addEventListener("open", (evt) => {
   sendMessage({
       status : "heart_rate",
       data : hrm.heartRate
   });
});
}
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}

