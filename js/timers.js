let timeStart; //variable to hold joining queue time
let timeStartCalc; //variable to hold joining queue time for calculatin average (in miliseconds)
let timeStop; //variable to hold time when customer receives the order
let timePaid; //variable to hold time when customer piad for order
let timePaidCalc; //variable to hold time when customer piad for order for average calculation
let timeStopCalc; //variable to hold time when customer receives the order for average calculation
let diffValue; //variable for difference between two times
let start1 = document.getElementById("start1");
let paid1 = document.getElementById("paid1");
let stop1 = document.getElementById("stop1");
let totalTime = document.getElementById("totalTime");
let undo = document.getElementById("undo");
let diffTotal = document.getElementById("diffTotal");
let diffService = document.getElementById("diffService");
txtStart = document.getElementById("start");
txtPaid = document.getElementById("paid");
txtStop = document.getElementById("stop");

//listening for click on start button => customer joining the queue
start1.addEventListener('click', function () {
  startTimer();
  timeStartCalc = moment().format();
  timeStart = moment(timeStartCalc).format('hh:mm:ss');
  txtStart.value = timeStart;
  //disable icon which starts joining queue time and then make available stop and undo icons
  start1.classList.add("icon-disabled");
  stop1.classList.remove("icon-disabled");
  undo.classList.remove("icon-disabled");
});

paid1.addEventListener('click', function () {
  //if we just measuring service time, timer is not running and we need to start it
  if (!running) {
    startTimer();
    diffValue = 0;
    start1.classList.add("icon-disabled");
    paid1.classList.add("icon-disabled");
    stop1.classList.remove("icon-disabled");
    undo.classList.remove("icon-disabled");
  }
  //if timer is already running just manage which icon is visible
  paid1.classList.add("icon-disabled");
  timePaidCalc = moment().format();
  timePaid = moment(timePaidCalc).format('hh:mm:ss');
  txtPaid.value = timePaid;

});

stop1.addEventListener('click', function () {
  pauseTimer();
  timeStopCalc = moment().format();
  timeStop = moment(timeStopCalc).format('hh:mm:ss');
  txtStop.value = timeStop;

  if (diffValue == 0) {
    diffValue = Math.round(new Date(timeStopCalc) - new Date(timePaidCalc));
    diffTotal.value = diffValue;
    // calculate differeence for service service
    diffValue = Math.round(new Date(timeStopCalc) - new Date(timePaidCalc));
    diffService.value = diffValue;
  } else {
    // calculate differeence for total service time
    diffValue = Math.round(new Date(timeStopCalc) - new Date(timeStartCalc));
    diffTotal.value = diffValue;
    // calculate differeence for service service
    diffValue = Math.round(new Date(timeStopCalc) - new Date(timePaidCalc));
    diffService.value = diffValue;
  }
  stop1.classList.add("icon-disabled");
});

undo.addEventListener('click', function () {
  resetTimer();
  timeStop = moment().format('00:00:00', 'hh:mm:ss');
  timePaid = moment().format('00:00:00', 'hh:mm:ss');
  timeStart = moment().format('00:00:00', 'hh:mm:ss');
  diffValue = moment().format('00:00:00', 'hh:mm:ss');
  diffService.value = 0;
  diffTotal.value = 0;
  txtStop.value = timeStop;
  txtPaid.value = timePaid;
  txtStart.value = timeStart;
  totalTime.value = "00:00:00";
  start1.classList.remove("icon-disabled");
  paid1.classList.remove("icon-disabled");
  undo.classList.add("icon-disabled");
});


//time start, pause and stop functions
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let paused = 0;
let running = 0;

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   

    paused = 0;
    running = 1;
  }
}

function pauseTimer() {
  if (!difference) {
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
  } else {
    // if the timer was already paused, when they click pause again, start the timer again
    startTimer();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  totalTime.value = minutes + ':' + seconds + ':' + milliseconds;
  // totalTime.value = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
}