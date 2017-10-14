class Jukebox {
	constructor(playlist){
    this.playlist = playlist;
    this.songNo = 0;
    this.current = this.playlist[this.songNo].url;

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

		// End of Buttons

		// Song Timer

		let songTimer = document.createElement('div');
		songTimer.textContent = "0 / 0";
		songTimer.setAttribute('id', 'songTimer');
		document.body.appendChild(songTimer);

		// Display Songs
		
		let displaySongs = document.createElement('div');
		displaySongs.textContent = "---";
		displaySongs.setAttribute('id', 'displaySongs');
		document.body.appendChild(displaySongs);

		// Display Artist

		let displayArtist = document.createElement('div');
		displayArtist.textContent = "---";
		displayArtist.setAttribute('id', 'displayArtist');
		document.body.appendChild(displayArtist);

		// Display Album Cover

		let displayAlbumCover = document.createElement('img');
		displayAlbumCover.textContent = "---";
		displayAlbumCover.setAttribute('id', 'displayAlbumCover');
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width: 200px; height: 200px;');
		document.body.appendChild(displayAlbumCover);


    this.audioElement = document.createElement('audio');
    this.audioElement.setAttribute('ontimeupdate', "document.getElementById('songTimer').innerHTML = Math.floor(this.currentTime) + ' : ' + Math.floor(this.duration);");
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
		// this.audioElement.load();
		this.audioElement.play();
		this.displaySongs();
		this.displayArtist();
		this.displayAlbumCover();
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
  		this.current = this.playlist[this.songNo].url;
  		this.loadSong();
  		this.playSong();
    }
    else{
	    this.songNo++;
			this.current = this.playlist[this.songNo].url;
			this.audioElement.setAttribute('src', this.current);
			this.loadSong();
			this.playSong();
		}

	}

	previousSong(){
		if (this.songNo === 0){
			this.songNo = this.playlist.length - 1;
			this.current = this.playlist[this.songNo].url;
			this.loadSong();
			this.playSong();
			console.log(this.songNo);
		}
		else{
			--this.songNo;
			this.current = this.playlist[this.songNo].url;
			this.audioElement.setAttribute('src', this.current);
			this.audioElement.load();
			this.playSong();
		}

	}

	displaySongs(){
			let lastSong = '---'
			if (this.playlist[(this.songNo - 1)] == undefined){
				lastSong = '---'
			}
			else {
				lastSong =  this.playlist[this.songNo - 1].songTitle;
			}
		let display = `${lastSong} || <strong>${this.playlist[this.songNo].songTitle}</strong> || ${this.playlist[(this.songNo + 1) % this.playlist.length].songTitle}`;
		displaySongs.innerHTML = display;
	}

	displayArtist(){
			let lastArtist = '---'
			if (this.playlist[(this.songNo - 1)] == undefined){
				lastArtist = '---'
			}
			else {
				lastArtist =  this.playlist[this.songNo - 1].artist;
			}
		let display = `${lastArtist} || <strong>${this.playlist[this.songNo].artist}</strong> || ${this.playlist[(this.songNo + 1) % this.playlist.length].artist}`;
		displayArtist.innerHTML = display;
	}

	displayAlbumCover(){
		
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width:200px; height:200px;');
	}

	addPlaylist(newPlaylist){
		this.playlist = [];
		this.playlist = newPlaylist;
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

let newArray = ['songs/Before.mp3', 'songs/Igor.mp3', 
								'songs/Lipstick.mp3', 'songs/Still.mp3', 
								'songs/Survive.mp3', 'songs/Nostalgia.mp3',
								'songs/IbnHiz.mp3', 'songs/Shiver.mp3'];

let objectSongs = [{songTitle: 'Before',
									  artist: 'Smoggy Bear',
									  analBumCover: 'albumCovers/andrew.jpg',
									  url: 'songs/Before.mp3'},

									  {songTitle: 'Igor',
									  artist: 'Baz Amataz',
									  analBumCover: 'albumCovers/black.jpg',
									  url: 'songs/Igor.mp3'},

									  {songTitle: 'Lipstick',
									  artist: 'Quizmistress',
									  analBumCover: 'albumCovers/candles.jpg',
									  url: 'songs/Lipstick.mp3'},

									  {songTitle: 'Still',
									  artist: 'Moog',
									  analBumCover: 'albumCovers/cat.jpg',
									  url: 'songs/Still.mp3'},

									  {songTitle: 'Survive',
									  artist: 'Frill 5 and the Gib-Dogs',
									  analBumCover: 'albumCovers/catclipse.jpg',
									  url: 'songs/Survive.mp3'},

									  {songTitle: 'Anitek',
									  artist: 'The Dope One',
									  analBumCover: 'albumCovers/copper.jpg',
									  url: 'songs/Anitek.mp3'},

									  {songTitle: 'Cig Brek',
									  artist: 'Mullet Man',
									  analBumCover: 'albumCovers/crane.jpg',
									  url: 'songs/Craze.mp3'},

									  {songTitle: 'Math',
									  artist: 'Juniper Toprock',
									  analBumCover: 'albumCovers/donut.jpg',
									  url: 'songs/Math.mp3'},

									  {songTitle: 'Rose',
									  artist: 'Slack Bage',
									  analBumCover: 'albumCovers/drugs.jpg',
									  url: 'songs/Rose.mp3'},

									  {songTitle: 'Ski',
									  artist: 'Donkeyteeth',
									  analBumCover: 'albumCovers/fireworks.jpg',
									  url: 'songs/Ski.mp3'},

									  {songTitle: 'Stay',
									  artist: 'Jo Smith and the Smithtones',
									  analBumCover: 'albumCovers/hackin.jpg',
									  url: 'songs/Stay.mp3'},

									  {songTitle: 'Tonton',
									  artist: 'OJ Simpson',
									  analBumCover: 'albumCovers/kermit.jpg',
									  url: 'songs/Tonton.mp3'},

									  {songTitle: 'Wasaru',
									  artist: 'Random Three Words',
									  analBumCover: 'albumCovers/liberty.jpg',
									  url: 'songs/Wasaru.mp3'},

									  {songTitle: 'Snoof',
									  artist: 'Ring Bear',
									  analBumCover: 'albumCovers/lilly.jpg',
									  url: 'songs/Snoof.mp3'},

									  {songTitle: 'Boof',
									  artist: 'Legen',
									  analBumCover: 'albumCovers/rain.jpg',
									  url: 'songs/Boof.mp3'},

									  {songTitle: 'Madix',
									  artist: 'Dairy',
									  analBumCover: 'albumCovers/red.jpg',
									  url: 'songs/Madix.mp3'},
									  ];



let myJuke = new Jukebox(objectSongs);

// myJuke.addPlaylist(newArray);


