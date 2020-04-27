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
  
    var subpy = require('child_process').spawn('python', ['./main.py']);
  
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

  subpy.on('exit', (code) => {
    console.log(`python child process exited with code ${code}`);
    console.log('Attempting to start backup python child process...')

    if (process.platform == 'win32'){
      var backup_subpy = require('child_process').spawn('python', ['./resources/app/main.py']);
    }
    if (process.platform == 'darwin'){
      var backup_subpy = require('child_process').spawn('python3', ['../Resources/app/main.py'], {stdio: [process.stdin, process.stdout, process.stderr]});
      //var backup_subpy = require('child_process').spawn('pwd', {stdio: [process.stdin, process.stdout, process.stderr]});
    }

    backup_subpy.on('exit', (code) => {
      console.log(`backup python child process exited with code ${code}`);
    });
  });

  // fire!
  startUp();
  Http.open("GET", "http://localhost:5000");
  Http.send();
  
  Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
  }
 

});

