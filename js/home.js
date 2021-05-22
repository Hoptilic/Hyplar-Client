// const app = require('electron').remote;
// const { shell } = require('electron')
// const request = require('request');

const { machineIdSync } = require('node-machine-id');
const os = require('os');
hwid = machineIdSync();
launchButton = document.querySelector('.launch-button');
launchText = document.querySelector('.launch-text');
launchSubText = document.querySelector('.launch-subtext');
launchState = 'ready';
const path = require('path');
const process = require('process');
const fs = require('fs');
const exec = require('child_process').exec;

let isCracked = true;
let usrCheck = true;
let remMe = false;
let includeSnapshots = false;
let includeBeta = false;
let includeAlpha = false;
let mcVersList;
let releases;
let hideLauncher = true;
let vList = [];
let tvl = false;
let mcIsOn = false;

function OfflineOrOnline() {
    if ( isCracked == true ) {
        isCracked = false;
        document.getElementById('checkbox-inp').classList.add('offline-check');
    } else {
        isCracked = true;
        document.getElementById('checkbox-inp').classList.remove('offline-check');
    }
}

let memMB = document.getElementById("settings-memory").value;
if (memMB < 1024) memMB = 1024;

function setLaunchState(state) {
	if (state === 'no_access') {
		launchText.innerHTML = 'No Access';
		launchSubText.innerHTML = 'Cannot Launch';
		launchButton.src = 'images/launch/no_auth.png';
	} else if (state === 'ready' && os.platform() === "win32") {
		launchText.innerHTML = 'Launch 1.8.9';
		launchSubText.innerHTML = 'Anticheat Protected';
		launchButton.src = 'images/launch/ready.png';
	} else if (state === 'ready' && os.platform() !== "win32") {
		launchText.innerHTML = 'Launch 1.8.9';
		launchSubText.innerHTML = 'Anticheat Unavailable';
		launchButton.src = 'images/launch/ready.png';
	} else if (state === 'authenticating') {
		launchText.innerHTML = 'Authenticating';
		launchSubText.innerHTML = 'Please wait';
		launchButton.src = 'images/launch/loading.png';
	} else if (state === 'connecting') {
		launchText.innerHTML = 'Connecting';
		launchSubText.innerHTML = 'Please wait';
		launchButton.src = 'images/launch/loading.png';
	} else if (state === 'launching') {
		launchText.innerHTML = 'Launching';
		launchSubText.innerHTML = 'Please wait';
		launchButton.src = 'images/launch/loading.png';
	} else if (state === 'banned') {
		launchText.innerHTML = 'Banned';
		launchSubText.innerHTML = reason;
		launchButton.src = 'images/launch/no_auth.png';
	} else {
		launchText.innerHTML = 'Error';
		launchSubText.innerHTML = 'Try relaunching';
		launchButton.src = 'images/launch/no_auth.png';
	}
	
	launchState = state;
}

function isRunning(pid) {
	try {
		process.kill(pid, 0);
		return true;
	} catch(e) {
		return false;
	}
}

// launchButton.addEventListener('click', launchClient);
// launchText.addEventListener('click', launchClient);
// launchSubText.addEventListener('click', launchClient);


let heap = 2048;
let allowed = false;
let banned = false;
let reason

memorySlider = document.querySelector('#settings-memory');

memorySlider.max = os.totalmem / 1024 / 1024

memorySlider.value = heap;

request.post({
	url: 'https://api.hyplar.ml/meta',
	headers: {
		'Content-Type': 'application/json',
		'User-Agent': 'Hyplar Meta Launcher'
	},
	body: JSON.stringify({
		token: "fuckshitbitch"
	})
}, function(error, response, body) {
	body = JSON.parse(body);
	console.log(body.news_title)
	// Populate the news section
	document.querySelector('.blog-title').innerHTML = body.news_title;
	document.querySelector('.blog-content').innerHTML = body.news_post.replace(/(?:\r\n|\r|\n)/g, '<br>');
	document.querySelector('.blog-author').innerHTML = 'Posted by ' + body.news_author;
	document.querySelector('.blog-author-skin').src = 'http://crafatar.com/renders/head/' + body.news_authoruuid + '?size=32&overlay';
	document.querySelector('.version-holder').innerHTML = body.version_number;

	if (body.banned) reason = body.ban_reason;

	if (body.can_launch) {
		setLaunchState('ready');
		allowed = true;
	} else {
		setLaunchState('no_access');
		allowed = false;
	}

	if (body.banned) {
		banned = true;
		setLaunchState("banned")
	}else {
		banned = false;
	}
	
});

// document.querySelector('.blog-read-button').addEventListener('click', function() {
// 	shell.openExternal('https://foldclient.com/news/latest');
// });