let contacts = document.getElementById('contacts');
let phoneframe = document.getElementById('phoneframe');
let home = document.getElementById('home');
let homepage = document.getElementById('homepage');
let fullHomepage = document.getElementById('fullHomepage');
let showAlarm = document.getElementById('showAlarm');
let try2 = document.getElementById('try');
let musicApp = document.getElementById('musicApp');
let cameraApp = document.getElementById('cameraApp');
let galleryApp = document.getElementById('galleryApp');
let homeTime = document.getElementById('homeTime');
let time = document.getElementById("time");
let date, hours, minutes, seconds, amPm;


// Hide other pages on load
musicApp.style.display = "none";
cameraApp.style.display = "none";
galleryApp.style.display = "none";






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
    try2.style.display = "none";
    showAlarm.style.display = "block";
}));

home.addEventListener("click", (()=>{
    try2.style.display = "block"
    showAlarm.style.display = "none";
    cameraApp.style.display = "none"
    video.style.display ="none"
}));





// camera
let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let cameraIcon = document.getElementById('cameraIcon');
let shutterButton = document.getElementById('shutterButton');
let picsTaken = document.getElementById('picsTaken');
shutterButton.style.display = "none";

let images = JSON.parse(localStorage.getItem('images')) || [];

cameraIcon.addEventListener('click', (async()=>{
  try2.style.display = "none";
  cameraApp.style.display = "block";
  video.style.display ="block"
  let snap = await navigator.mediaDevices.getUserMedia({audio:false, video:true})
  video.srcObject = snap;
  shutterButton.style.display = "block";
  picsTaken.style.backgroundImage = `url(${images[images.length - 1]})`;
}))

shutterButton.addEventListener("click", (()=>{
  canvas.getContext("2d").drawImage(video, 0,0, canvas.width, canvas.height);
  canvas.style.display = "none";
  let imageLink = canvas.toDataURL('image/jpg');
  images.push(imageLink);
  localStorage.setItem('images', JSON.stringify(images));
  picsTaken.style.backgroundImage = `url(${images[images.length - 1]})`;
}))

function displayImages() {
  for (let i = 0; i < images.length; i++) {
    let img = document.createElement('img');
    img.src = images[i];
    picsTaken.appendChild(img);
  }
}




// Gallery App
let lastImageContainer = document.querySelector('.last-image-container');
let galleryContainer = document.querySelector('.gallery-container');

galleryIcon.addEventListener('click', () => {
  try2.style.display = "none";
  galleryApp.style.display = "block";
  displayImages();
});

function displayImages() {
  let images = JSON.parse(localStorage.getItem('images')) || [];
  lastImageContainer.style.backgroundImage = `url(${images[images.length - 1]})`;
  galleryContainer.innerHTML = '';
  for (let i = 0; i < images.length; i++) {
    let item = document.createElement('div');
    item.classList.add('gallery-item');
    item.style.backgroundImage = `url(${images[i]})`;
    item.addEventListener('click', () => {
      // do something when the image is clicked
    });
    galleryContainer.appendChild(item);
  }
}








// music player
let musicIcon = document.getElementById("musicIcon");
musicIcon.addEventListener("click", ()=>{
  try2.style.display = "none";
  musicApp.style.display = "block";
})

// Get references to the HTML elements

let songArt = document.getElementById("songArt");

let audioPlayer = document.getElementById("audioPlayer");
let playButton = document.getElementById("playButton");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let progress = document.getElementById("progress");
let progressBar = document.getElementById("progressBar");
let volumeSlider = document.getElementById("volumeSlider");
let muteButton = document.getElementById("muteButton");


// Define an array of audio tracks
let tracks = [
  {
    art: "https://i1.sndcdn.com/artworks-IBKIlYMdHb6oJNNm-lno2PA-t500x500.jpg",
    song: "./audio/Burna_Boy_-_Alarm_Clock.mp3",
    artist: "Burnaboy",
    title: "Alarm Clock"
  },
  {
    art: "https://trendybeatz.com/images/ODUMODUBLVCK-Declan-Rice-Artwork.jpg",
    song: "./audio/ODUMODUBLVCK-Declan-Rice.mp3",
    artist: "ODUMODUBLVCK",
    title: "Declan Rice"
  },
  {
    art: "https://westsidemusicblog.net/wp-content/uploads/2023/04/pic_down1681741843148-464x464.jpg",
    song: "./audio/Davido-No-Competition-feat.Asake-[TrendyBeatz.com].mp3",
    artist: "Davido ft Asake",
    title: "No Competition"
  },

];

// Set the current track to the first track in the array
let currentTrack = 0;

// Function to play the current track
function playTrack() {
  songArt.innerHTML = `<img id="trackImage" src="${tracks[currentTrack].art}"/>`

  // Set the audio source to the current track and play it
  audioPlayer.src = tracks[currentTrack].song;
  audioPlayer.play();
  // Change the play button icon to a pause icon
  playButton.innerHTML = "<i class='icofont-pause'></i>";
}

// Function to pause the current track
function pauseTrack() {
  // Pause the audio and change the play button icon to a play icon
  audioPlayer.pause();
  playButton.innerHTML = "<i class='icofont-play'></i>";
}

// Function to play the previous track
function prevTrack() {
  // Decrement the current track index
  currentTrack--;
  // If we've reached the beginning of the array, wrap around to the end
  if (currentTrack < 0) {
    currentTrack = tracks.length - 1;
  }
  // Play the new current track
  playTrack();
}

// Function to play the next track
function nextTrack() {
  // Increment the current track index
  currentTrack++;
  // If we've reached the end of the array, wrap around to the beginning
  if (currentTrack >= tracks.length) {
    currentTrack = 0;
  }
  // Play the new current track
  playTrack();
}

// Function to update the progress bar as the track plays
function updateProgress() {
  // Calculate the percentage of the track that has played
  let percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  // Set the width of the progress bar to the percentage
  progress.style.width = percent + "%";
}

// Function to set the volume based on the value of the volume slider
function setVolume() {
  audioPlayer.volume = volumeSlider.value;
}

// Function to mute or unmute the audio based on the current volume level
function muteVolume() {
  if (audioPlayer.volume > 0) {
    // If the volume is currently non-zero, mute the audio and change the mute button icon to an sound icon
    audioPlayer.volume = 0;
    muteButton.innerHTML = "<i class='icofont-volume-mute'></i>";
  } else {
    // If the volume is currently zero, unmute the audio and change the mute button icon to a volume up icon
    audioPlayer.volume = volumeSlider.value;
    muteButton.innerHTML = "<i class='icofont-volume-up'></i>";
  }
}

// Add event listeners to the buttons and audio player to handle user interactions
playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

prevButton.addEventListener("click", prevTrack);

nextButton.addEventListener("click", nextTrack);

audioPlayer.addEventListener("timeupdate", updateProgress);

progressBar.addEventListener("click", (e) => {
  // Calculate the percentage of the progress bar that was clicked
  let percent = e.offsetX / progressBar.offsetWidth;
  // Set the current time of the audio to the corresponding time in the track
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

volumeSlider.addEventListener("input", setVolume);

muteButton.addEventListener("click", muteVolume);




























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

