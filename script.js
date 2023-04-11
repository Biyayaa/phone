let contacts = document.getElementById('contacts');
let phoneframe = document.getElementById('phoneframe');
let home = document.getElementById('home');
let homepage = document.getElementById('homepage');
let fullHomepage = document.getElementById('fullHomepage');
let showAlarm = document.getElementById('showAlarm');
let try2 = document.getElementById('try');
let homeTime = document.getElementById('homeTime');






// phone time
function updateTime() {
  date = new Date();
  seconds = date.getSeconds();
  hours = date.getHours();
  minutes = date.getMinutes();

  amPm = hours >= 12 ? "PM" : "AM"; // check if it's AM or PM
  hours = hours % 12 || 12; // convert to 12-hour format

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let currentTime = hours + ":" + minutes + ":" + seconds + " " + amPm;
  time.innerHTML = currentTime;


  homeTime.innerHTML = hours + ":" + minutes;
}
setInterval(updateTime, 1000);




showAlarm.style.backgroundColor = "blue";


contacts.addEventListener("click", (()=>{
    // console.log("contacts");
    try2.style.display = "none";
    showAlarm.style.display = "block";
    // fullHomepage.style.backgroundColor = 'blue';

}));

home.addEventListener("click", (()=>{
    try2.style.display = "block"
    showAlarm.style.display = "none";
    // console.log("contacts");
    // phoneframe.style.backgroundColor = 'red';
}));


let cameraApp = document.getElementById('cameraApp');

// cameraApp.style.backgroundColor = 'red';
// cameraApp.style.display = 'none';



// camera
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let cameraIcon = document.getElementById('cameraIcon');


cameraIcon.addEventListener('click', (async()=>{
  try2.style.display = "none";
  showAlarm.style.display = "none";
  cameraApp.style.display = "block";
  video.style.display ="block"
  let snap = await navigator.mediaDevices.getUserMedia({audio:false, video:true})
  video.srcObject = snap;
}))

let shutterButton = document.getElementById('shutterButton')
shutterButton.addEventListener("click", (()=>{
  canvas.getContext("2d").drawImage(video, 0,0, canvas.width, canvas.height);
  let imageLink = canvas.toDataURL('image/jpg');
  console.log(imageLink);

}))





let time = document.getElementById("time");
let date, hours, minutes, seconds, amPm;









// alarm
let hourss = document.getElementById("hourss");
let minutess = document.getElementById("minutess");
let secondss = document.getElementById("secondss");
let amPms = document.getElementById("amPms");
let alarmTimeout;
let audio = document.getElementById("audio");
let alarmInfo = document.getElementById("alarmInfo");

// let snoozeAlarm = document.getElementById("snoozeAlarm");
let stopAlarm = document.getElementById("stopAlarm");

alarmInfo.style.display = "";

activeAlarm.style.display = "none";


for(let index=1; index < 13; index++){
  if (index < 10) {
    hourss.innerHTML += "<option>"+"0"+index+"</option>";
  }
  else{
    hourss.innerHTML += "<option>" + index +"</option>"
  }
}

for(let index=0; index < 60; index++){
  if (index < 10) {
    minutess.innerHTML += "<option>"+"0"+index+"</option>";
  }
  else{
    minutess.innerHTML += "<option>" + index +"</option>"
  }
}


function alarmSet() {
  alarmInfo.innerHTML =
    "Alarm set for " +
    hourss.value +
    ":" +
    minutess.value +
    amPms.value;

  alarmInfo.style.display = "block";
}

let ring = document.getElementById("ring");
secondss.style.display = "none"


let startTime = 32;
audio.currentTime = startTime;

function checkAlarm() {
  if (
    hours == hourss.value &&
    minutes == minutess.value &&
    seconds == secondss.value &&
    amPm == amPms.value
  ) {
    activeAlarm.style.display = "block";
    ring.innerHTML = "alarm is ringing";
    audio.play();
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(function () {
      audio.pause();
      ring.innerHTML = "Alarm off";
      alarmInfo.style.display = "none";
      activeAlarm.style.display = "none";
    }, 60000);
  }
}
setInterval(checkAlarm, 1000);

function stop() {
  activeAlarm.style.display = "none";
  audio.pause();
  alarmInfo.style.display = "none";
}

