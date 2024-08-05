const hoursinput = document.getElementById('hours'); 
const minutesinput = document.getElementById('minutes'); 
const secondsinput = document.getElementById('seconds'); 
const countdisplay = document.getElementById('countdisplay');
const startbtn = document.getElementById('start')
const resetbtn = document.getElementById('reset')
let countdoanId;
let remainingtime = 0;
let isRuning = false;
function intialcountdown() {
    const hours = parseInt(hoursinput.value) || 0;
    const minutes = parseInt(minutesinput.value) || 0;
    const seconds = parseInt(secondsinput.value) || 0;
    
    remainingtime = (hours * 3600) + (minutes * 60) + seconds;
}
function updatecountdown() {
    const hours = Math.floor(remainingtime / 3600);
    const minutes = Math.floor((remainingtime % 3600) / 60);
    const seconds = Math.floor(remainingtime % 60);

    countdisplay.innerHTML = `${String(hours).padStart(2,'0')} : ${String(minutes).padStart(2,'0')} : ${String(seconds).padStart(2,'0')}`;

    if (remainingtime <= 0) {
        countdisplay.innerHTML = `Countdown is over`;
        clearInterval(countdoanId);
        isRuning = false;      
    }
} 
function countdown(){
    if (remainingtime > 0) {   
        remainingtime--;
        updatecountdown();
    }            
}

startbtn.addEventListener('click', () => {
    if (!isRuning) {
        if (remainingtime === 0) {
            intialcountdown();
        }                
        countdoanId = setInterval(countdown,1000)
        updatecountdown()
        isRuning = true
        startbtn.textContent = `stop`
    }else{
        clearInterval(countdoanId);
        isRuning = false;
        startbtn.textContent = `start`
    }
})
resetbtn.addEventListener('click', () => {
    remainingtime = 0;
    clearInterval(countdoanId);
    startbtn.textContent = `start`;
    isRuning = false;
    countdisplay.innerHTML = `00 : 00 : 00`
})