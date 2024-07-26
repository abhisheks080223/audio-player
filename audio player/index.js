let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = new Audio(); 

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    { img: 'images/stay.png', name: 'Stay', artist: 'The Kid LAROI, Justin Bieber', music: 'music/stay.mp3' },
    { img: 'images/fallingdown.jpg', name: 'Falling Down', artist: 'Wid Cards', music: 'music/fallingdown.mp3' },
    { img: 'images/faded.png', name: 'Faded', artist: 'Alan Walker', music: 'music/Faded.mp3' },
    { img: 'images/ratherbe.jpg', name: 'Rather Be', artist: 'Clean Bandit', music: 'music/Rather Be.mp3' }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = '0123456789abcdef';
    let color1 = '#' + Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join('');
    let color2 = '#' + Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join('');
    document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < music_list.length - 1 && !isRandom) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom) {
        track_index = Math.floor(Math.random() * music_list.length);
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = track_index > 0 ? track_index - 1 : music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    curr_track.currentTime = curr_track.duration * (seek_slider.value / 100);
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    if (!isNaN(curr_track.duration)) {
        let seekPosition = (curr_track.currentTime / curr_track.duration) * 100;
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime % 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration % 60);

        curr_time.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')}`;
        total_duration.textContent = `${String(durationMinutes).padStart(2, '0')}:${String(durationSeconds).padStart(2, '0')}`;
    }
}

function setPlaybackSpeed() {
    let speed = document.getElementById('playback-speed').value;
    curr_track.playbackRate = parseFloat(speed);
}

function toggleTheme() {
    let themeIcon = document.getElementById('theme-icon');
    document.body.classList.toggle('dark-theme');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
}


