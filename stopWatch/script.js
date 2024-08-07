const display = document.querySelector('.display');
timerid = null;
startTime = 0;
elapsedTime = 0;
isRuning = false;

function start() {
    if (!isRuning) {
        startTime = Date.now() - elapsedTime;
        timerid = setInterval(update, 10);
        isRuning = true;
    }
}
function stop() {
    if (isRuning) {
        elapsedTime = Date.now() - startTime;
        clearInterval(timerid);
        isRuning = false;
        
    }     
}
function reset() {
    clearInterval(timerid);
    isRuning = false;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = `00:00:00:00`
}
function update() {
    elapsedTime = Date.now() - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2,0);
    minutes = String(minutes).padStart(2,0);
    seconds = String(seconds).padStart(2,0);
    miliseconds = String(miliseconds).padStart(2,0);
    display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
console.log(currentTime);