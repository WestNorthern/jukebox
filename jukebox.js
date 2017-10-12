class Jukebox {
	constructor(playlist){
    this.playlist = playlist;
    this.songNo = 0;
    this.current = this.playlist[this.songNo];

    // Create buttons list

    // Play Button
    let play = document.createElement('div');
		play.textContent = "Play";
		play.setAttribute('id', 'play');
		document.body.appendChild(play);
		play.addEventListener('click', () => { this.playSong() });
		// End Play Button

		// Pause Button
    let pause = document.createElement('div');
		pause.textContent = "Pause";
		pause.setAttribute('id', 'play');
		document.body.appendChild(pause);
		pause.addEventListener('click', () => { this.pauseSong() });
		// End Pause Button


		// Stop Button
    let stop = document.createElement('div');
		stop.textContent = "Stop";
		stop.setAttribute('id', 'stop');
		document.body.appendChild(stop);
		stop.addEventListener('click', () => { this.loadSong(); });
		// End Stop Button



		// Next Button
    let next = document.createElement('div');
		next.textContent = "Next";
		next.setAttribute('id', 'next');
		document.body.appendChild(next);
		next.addEventListener('click', () => { this.nextSong() });
		// End Next Button


		// Back Button
    let back = document.createElement('div');
		back.textContent = "Back";
		back.setAttribute('id', 'back');
		document.body.appendChild(back);
		back.addEventListener('click', () => { this.previousSong() });
		// End Back Button

    
    this.audioElement = document.createElement('audio');
    this.loadSong();


    // Goes to next song (requires ES 6 arrow function)


    this.audioElement.addEventListener('ended', () => {
    	console.log(this);
    	if (this.songNo === this.playlist.length - 1){
    		this.playlist = playlist;
    		this.songNo = 0;
    		this.current = this.playlist[this.songNo];
    
    		this.audioElement = document.createElement('audio');
    		this.loadSong();
    	}
    	else{
    		this.nextSong();
    	}

    });

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

	nextSong(){
		if (this.songNo === (this.playlist.length - 1)){
  		this.songNo = 0;
  		this.current = this.playlist[this.songNo];
  		this.audioElement.load;
  		this.playSong();
    }
    else{
	    this.songNo++;
			this.current = this.playlist[this.songNo];
			this.audioElement.setAttribute('src', this.current);
			this.audioElement.load;
			this.playSong();
		}

	}

	previousSong(){
		if (this.songNo === 0){
			this.songNo = this.playlist.length - 1;
			this.audioElement.load;
			this.playSong;
			console.log(this.songNo);
		}
		else{
			--this.songNo;
			this.current = this.playlist[this.songNo];
			this.audioElement.setAttribute('src', this.current);
			this.audioElement.load;
			this.playSong();
		}


	}
	

}

class Playlist{
	constructor(){
		this.plist = [];
	}
	addSong(song){
		this.plist.push(song);
	}
	addSongs(songs){
		for (var i = 0; i < songs.length; i++) {
			this.plist.push(songs[i]);
		}
	}
	removeSong(){

	}
}



let songArray = ['songs/Anitek.mp3', 'songs/CigBrek.mp3', 
								'songs/Craze.mp3', 'songs/Math.mp3', 
								'songs/Rose.mp3', 'songs/Ski.mp3',
								'songs/Stay.mp3', 'songs/Tonton.mp3', 
								'songs/Wasaru.mp3'];


let myJuke = new Jukebox(songArray);


