const electron = require('electron');
const app = electron.app;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();
const stopBtn = document.getElementById('stopBtn');
console.log("render.js ran");
console.log(stopBtn);

function buttonClicked(buttonID){
  console.log("button clicked (running from render.js)")
  let Http = new XMLHttpRequest();
  Http.open("GET", "http://localhost:5000/" + buttonID + "/buttonClicked");
  Http.send();
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
    //buttonID.innerHTML = Http.responseText;
    let _el = document.getElementById(buttonID);
    _el.innerHTML = String(Http.responseText);
  }
};

function renderTest() {
    return "string from render test";
}
