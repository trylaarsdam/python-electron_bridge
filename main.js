const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();

var mainWindow = null;


app.on('window-all-closed', function() {
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

app.on('ready', function() {
  // call python?
  var subpy = require('child_process').spawn('python', ['./hello.py']);
  //var subpy = require('child_process').spawn('./dist/hello.exe');
  var rq = require('request-promise');
  var mainAddr = 'http://localhost:5000';

  var openWindow = function(){
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {nodeIntegration: true}});
    //mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.loadURL('http://localhost:5000');
    mainWindow.on('closed', function() {
      mainWindow = null;
      subpy.kill('SIGINT');
    });

    
  };

  var startUp = function(){
    rq(mainAddr)
      .then(function(htmlString){
        console.log('server started!');
        openWindow();
      })
      .catch(function(err){
        console.log('waiting for the server start...');
        startUp();
      });
  };

  
  // fire!
  startUp();
  Http.open("GET", "http://localhost:5000");
  Http.send();
  
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
  }
 

});
