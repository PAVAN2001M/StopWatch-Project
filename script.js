const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millsecondsLabel = document.getElementById('millseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('laplist');

let minutes = 0;
let seconds = 0;
let millseconds = 0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;  // Enable pause when timer is running
}

function stopTimer() {
    clearInterval(interval);
    startButton.disabled = false;  // Allow starting again after stop
    pauseButton.disabled = true;   // Disable pause after stop
    addToLapList()
}

function pauseTimer() {
    clearInterval(interval);       // Pauses the timer
    startButton.disabled = false;  // Allow resuming
    pauseButton.disabled = true;   // Disable pause once paused
}

function resetTimer() {
    clearInterval(interval);       // Stop the timer
    minutes = 0;
    seconds = 0;
    millseconds = 0;
    displayTimer();                // Reset display to 00:00:00
    startButton.disabled = false;  // Allow starting again
    pauseButton.disabled = true;   // Disable pause until timer starts
}

function updateTimer() {
    millseconds++;
    if (millseconds == 100) {
        millseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer() {
    millsecondsLabel.textContent = padTime(millseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}
function addToLapList(){
    const lapTime=`${padTime(minutes)}:${padTime(seconds)}:${padTime(millseconds)}`;
    const listItem=document.createElement('li');
    listItem.innerHTML=`<span>Lap ${lapList.childElementCount+1}:</span>${lapTime}`;
    lapList.appendChild(listItem);
}