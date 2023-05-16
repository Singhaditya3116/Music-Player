const image = document.querySelector("img");
const musicName = document.querySelector("#music-name");
const singerName = document.querySelector("#singer-name");
const currentTimeEl = document.getElementById("current-time");
const songDurationEl = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
var currentSongCount=0;

const songs = [
  {
    name:"jacinto-1",
    songTitle:"Electric Chill Machine",
    artist:"Bala Subramanian"
  },
  {
    name:"jacinto-2",
    songTitle:"Seven Nation Army",
    artist:"Bala Subramanian"
  },
  {
    name:"jacinto-3",
    songTitle:"Good Night,Disco Queen",
    artist:"Bala Subramanian"
  },
  {
    name:"metric-1",
    songTitle:"Front row",
    artist:"Bala Subramanian"
  }
]

var isPlaying = false;  //Song is Playing or Not
//Play Music
function playMusic()
{
  isPlaying=true;
  playBtn.classList.remove("bx-play");
  playBtn.classList.add("bx-pause");
  playBtn.setAttribute("title","Pause");
  // songDuration.textContent = (music.duration)/60;
  music.play();
}

//Pause Music
function pauseMusic()
{
  isPlaying=false;
  playBtn.classList.remove("bx-pause");
  playBtn.classList.add("bx-play");
  playBtn.setAttribute("title","Play");
  music.pause();
}

//Function to play pause Songs
function audioPlayPause()
{
  if(isPlaying)
    pauseMusic();
  else
    playMusic();
}

//Update Dom with the Song
function loadSong(song)
{
  musicName.textContent = song.songTitle;
  singerName.textContent = song.artist;
  image.src = `img/${song.name}.jpg`
  music.src = `music/${song.name}.mp3`
}

//Switch to Next Song
function playNextSong()
{
  currentSongCount = (currentSongCount + 1)%songs.length;
  loadSong(songs[currentSongCount]);
  playMusic();
}

//Switch to previous Song
function playPreviousSong()
{
  if(currentSongCount === 0)
    currentSongCount = songs.length - 1;
  else
    currentSongCount = (currentSongCount - 1)%songs.length;

  loadSong(songs[currentSongCount]);
  playMusic();
}

//Update Progress Bar and time
function updateProgressBar(e)
{
    const {currentTime,duration} = e.srcElement;
    //console.log(currentTime,duration);

    //Update Progress Bar Width
    const progressPercentage = (currentTime/duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    //Update current and duration in DOM
    const currentMinute = Math.floor(currentTime/60);
    let currentSeconds = Math.floor(currentTime%60);

    if(currentSeconds <10)
    {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinute}:${currentSeconds}`;

    const durationMinute = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration%60);
    if(durationSeconds <10)
    {
      durationSeconds = `0${durationSeconds}`;
    }
    
    //If duration Second is there then only update to avoid NaN.
    if(durationSeconds)
    {
      songDurationEl.textContent = `${durationMinute}:${durationSeconds}`;
    }
}

//Change Time of Song and width of progressBar
function setProgressBar(e)
{
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const clickedPercentage = (clickX/width) * 100;

  const {duration} = music;
  const widthPercentage = clickedPercentage * (duration/60);
  
  const actualTime = (widthPercentage/100)*60;
  music.currentTime = Math.floor(actualTime);
  currentTimeEl.style.width = `${clickedPercentage}%`;
  console.log("run")
}

//Onload Select First Song
loadSong(songs[0]);

//Event Listeners
playBtn.addEventListener("click", audioPlayPause);
nextBtn.addEventListener("click",playNextSong);
prevBtn.addEventListener("click",playPreviousSong);
music.addEventListener("timeupdate",updateProgressBar); 
progressBar.addEventListener("click",setProgressBar);
music.addEventListener("ended",playNextSong);

