const app = require('electron').remote;
const { shell } = require('electron')
const request = require('request');
const log = require('electron-log');

// EXIT BUTTON //
document.querySelector('.close-button').addEventListener('click', function() {
  app.getCurrentWindow().close();
});

// MINIMIZE BUTTON //
document.querySelector('.minimize-button').addEventListener('click', function() {
  app.getCurrentWindow().minimize();
});

// SETTINGS TAB //
document.querySelector('.settings-tab').addEventListener('click', function() {
  document.querySelector('.settings-page').style.visibility = 'visible';
  document.querySelector('.home-page').style.visibility = 'hidden';
});

// HOME TAB //
document.querySelector('.home-tab').addEventListener('click', function() {
  document.querySelector('.home-page').style.visibility = 'visible';
  document.querySelector('.settings-page').style.visibility = 'hidden';
});

// STORE TAB //
document.querySelector('.store-tab').addEventListener('click', function() {
  shell.openExternal('https://lunar.gg/client/store/emotes');
});