let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;

document.getElementById('start-button').addEventListener('click', startStopwatch);
document.getElementById('pause-button').addEventListener('click', pauseStopwatch);
document.getElementById('reset-button').addEventListener('click', resetStopwatch);
document.getElementById('lap-button').addEventListener('click', lapTime);

function startStopwatch() {
    if (intervalId) return; // Prevent starting if already running
    startTime = new Date().getTime() - currentTime; // Adjust for paused time
    intervalId = setInterval(updateStopwatch, 1000);
    document.getElementById('start-button').disabled = true;
    document.getElementById('pause-button').disabled = false;
    document.getElementById('reset-button').disabled = false;
    document.getElementById('lap-button').disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    intervalId = null; // Reset intervalId to indicate paused state
    document.getElementById('pause-button').disabled = true;
    document.getElementById('start-button').disabled = false;
}

function resetStopwatch() {
    clearInterval(intervalId);
    intervalId = null;
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('lap-list').innerHTML = '';
    document.getElementById('pause-button').disabled = true;
    document.getElementById('reset-button').disabled = true;
    document.getElementById('lap-button').disabled = true;
    document.getElementById('start-button').disabled = false;
}

function lapTime() {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapList = document.getElementById('lap-list');
    const lapListItem = document.createElement('li');
    lapListItem.innerHTML = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapListItem);
}

function updateStopwatch() {
    currentTime = new Date().getTime() - startTime;
    const timeParts = formatTime(currentTime).split(':');
    document.getElementById('hours').innerHTML = timeParts[0];
    document.getElementById('minutes').innerHTML = timeParts[1];
    document.getElementById('seconds').innerHTML = timeParts[2];
}

function formatTime(time) {
    const hours = Math.floor((time / 3600000) % 24);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return [padZero(hours), padZero(minutes), padZero(seconds)].join(':');
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}
