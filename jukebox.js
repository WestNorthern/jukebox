class Jukebox {
	constructor(playlist){
    this.playlist = playlist;

    this.current = this.playlist[0];
    
    this.audioElement = document.createElement('audio');
    this.loadSong();

	}
	playSong(){
		this.audioElement.load;
		this.audioElement.play();
	}
	pauseSong(){
		this.audioElement.pause();
	}
	loadSong(){
		this.audioElement.setAttribute('src', this.current);

	}

}

let songArray = ['songs/Anitek.mp3', 'songs/CigBrek.mp3', 
								'songs/Craze.mp3', 'songs/Math.mp3', 
								'songs/Rose.mp3', 'songs/Ski.mp3',
								'songs/Stay.mp3', 'songs/Tonton.mp3', 
								'songs/Wasaru.mp3'];


let myJuke = new Jukebox(songArray);

let play = document.getElementById('play');
let pause = document.getElementById('pause');
let stop = document.getElementById('stop');

stop.addEventListener('click', function(){

	myJuke.loadSong();
	document.body.style.background = 'red';

});

play.addEventListener('click', function(){

	myJuke.playSong();

});

pause.addEventListener('click', function(){

	myJuke.pauseSong();
});