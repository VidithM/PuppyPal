/*
 * Entry point for the watch app
 */
import * as document from "document";

import { HeartRateSensor } from "heart-rate";

import { vibration } from "haptics";

import { me as appbit } from "appbit";

import { peerSocket } from "messaging";
import * as messaging from "messaging";

let num = 0
let positiveMessage = ["You got this!", "Focus on breathing", "Keep calm"]

let demo = document.getElementById("demotext");
let buttonyes = document.getElementById("button-yes");
let buttonno = document.getElementById("button-no");
let line = document.getElementById("line");
buttonyes.style.visibility = "hidden"; 
buttonno.style.visibility = "hidden"; 
line.style.visibility = "hidden";
var animbutton = document.getElementById("buttonanim");

let myRect1 = document.getElementById("button-yes");

myRect1.addEventListener("click", (evt) => {
  animbutton.animate("enable");
  setTimeout(() => {console.log("click");
  sendMessage("512-567-3341");
  buttonyes.style.visibility = "hidden"; 
  buttonno.style.visibility = "hidden"; 
  line.style.visibility = "visible"
  demo.text = "Contacting therapist"
  demo.text = positiveMessage[num + 1]; 
}, 1000);
  
});

let myRect2 = document.getElementById("button-no");

myRect2.addEventListener("click", (evt) => {
  animbutton.animate("enable");
  setTimeout(() => {console.log("click");
  sendMessage("512-567-3341");
  buttonyes.style.visibility = "hidden"; 
  buttonno.style.visibility = "hidden"; 
  line.style.visibility = "visible"
  demo.text = positiveMessage[0]
}, 1000);

});


function sendMessage(data) {
  const data = data

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to companion app as a message
    messaging.peerSocket.send(data);
  }
}



if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     messaging.peerSocket.addEventListener("open", (evt) => {
     sendMessage(hrm.heartRate);
     });
     if(hrm.heartRate >92){
       vibration.start("ring");
       console.log("vibrate");
       demo.text = "Are you good?"
       buttonyes.style.visibility = "visible"; 
       buttonno.style.visibility = "visible"; 
     }

   });
   hrm.start();
  
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}

