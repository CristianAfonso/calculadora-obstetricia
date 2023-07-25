const {useTranslation}  = require('react-i18next');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');   
const path = require('path');
const url = require('url');
const {t} = useTranslation();
let mainWindow;
 
function createWindow() {
    const startUrl = process.env.ELECTRON_START_URL || url({        
        pathname: path.join(__dirname, '../index.html'),        
        protocol: 'file:',        slashes: true,    
    });
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        },
        show: true,
        icon: './public/images/lasuma.png',
        title: t('service')
    });
 
    mainWindow.loadURL(startUrl);
 
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
app.on('ready', createWindow);