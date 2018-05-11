const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow

app.on('ready', function() {
	var mainWindow = new BrowserWindow({
		height: 600,
		width: 400,
		frame: false
	});
	mainWindow.loadURL("file://" + __dirname + "/index.html");
});

