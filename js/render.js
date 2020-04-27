const electron = require('electron');
const app = electron.app;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();
const stopBtn = document.getElementById('stopBtn');
console.log("render.js ran");
console.log(stopBtn);

function buttonClicked(buttonID){
  console.log("button clicked (running from render.js)")
  Http.open("GET", "http://localhost:5000/buttonClicked/buttonClicked");
  Http.send();
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    //buttonID.innerHTML = Http.responseText;
    el = document.getElementById(buttonID)
    el.innerHTML = String(Http.responseText);
  }
  
};

function renderTest() {
    return "string from render test";
}
