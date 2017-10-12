class Jukebox {
	constructor(){
    this.source = "";
    this.playList = [];
    this.audioElement = document.createElement('audio');

	}
	playSong(){
		this.audioElement.load;
		this.audioElement.play();
	}
	pauseSong(){
		this.audioElement.pause();
	}
	loadSong(){
		this.audioElement.setAttribute('src', 'songs/Anitek.mp3');

	}

}




let myJuke = new Jukebox();

let play = document.getElementById('play');
let pause = document.getElementById('pause');
let load = document.getElementById('load');

load.addEventListener('click', function(){

	myJuke.loadSong();
	document.body.style.background = 'red';

});

play.addEventListener('click', function(){

	myJuke.playSong();

});

pause.addEventListener('click', function(){

	myJuke.pauseSong();
});