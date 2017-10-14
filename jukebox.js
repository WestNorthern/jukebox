class Jukebox {
	constructor(playlist){
    this.playlist = playlist;
    this.songNo = 0;
    this.current = this.playlist[this.songNo].url;

    // Create audio element
		this.audioElement = document.createElement('audio');
		this.loadSong();

    // Create Div to hold and style jukebox contents

    let playbox = document.createElement('div');
    document.body.appendChild(playbox);
    playbox.setAttribute('style', 'margin: 0 auto; text-align: center; background: #4ABDAC; padding: 20px; border: 3px solid #F7B733;');

    // Create buttons list

    // Back Button
    let back = document.createElement('div');
		back.textContent = "⇦";
		back.setAttribute('id', 'back');
		back.setAttribute('class', 'controls');
		back.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(back);
		back.addEventListener('click', () => { this.previousSong() });
		// End Back Button


		// Stop Button
    let stop = document.createElement('div');
		stop.innerHTML = "<b>&#x23f5</b>";
		stop.setAttribute('id', 'stop');
		stop.setAttribute('class', 'controls');
		stop.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(stop);
		stop.addEventListener('click', () => { this.loadSong(); });
		// End Stop Button

		// Play Button
    let play = document.createElement('div');
		play.innerHTML = "<b>&#9655</b>"
		play.setAttribute('id', 'play');
		play.setAttribute('class', 'controls');
		play.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(play);
		play.addEventListener('click', () => { this.playSong() });
		// End Play Button

		// Pause Button
    let pause = document.createElement('div');
		pause.innerHTML = "<b>&#8545;</b>";
		pause.setAttribute('id', 'play');
		play.setAttribute('class', 'controls');
		pause.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(pause);
		pause.addEventListener('click', () => { this.pauseSong() });
		// End Pause Button


		// Next Button
    let next = document.createElement('div');
		next.textContent = "⇨";
		next.setAttribute('id', 'next');
		next.setAttribute('class', 'controls');
		next.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(next);
		next.addEventListener('click', () => { this.nextSong() });
		// End Next Button


		// End of Buttons

		// Song Timer

		let songTimer = document.createElement('div');
		songTimer.textContent = "0 / 0";
		songTimer.setAttribute('id', 'songTimer');
		songTimer.setAttribute('class', 'display');
		songTimer.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; margin-top: 15px; padding: 5px; background: #FC4A1A; border-radius: 5px; margin-bottom: 60px; position: relative;');
		playbox.appendChild(songTimer);
    this.audioElement.addEventListener('timeupdate', function(){
    	let currentMin = Math.floor(this.currentTime / 60).toString();
    	let currentSec = Math.floor(this.currentTime - Math.floor(this.currentTime / 60) * 60).toString();

    	let durationMin = Math.floor(this.duration / 60).toString();
    	let durationSec = Math.floor(this.duration - Math.floor(this.duration / 60) * 60).toString();


    	if (currentSec.length < 2){
    		currentSec = `0${currentSec}`;
    	}

    	if (durationSec.length < 2){
    		durationSec = `0${durationSec}`;
    	}

    	document.getElementById('songTimer').innerHTML = `${currentMin}:${currentSec} // ${durationMin}:${durationSec}`;

    });
    // Time Bars

    // width percentage = currentTime/Total time for current, inverted for left

    let timePlayed = document.createElement('div');
    timePlayed.setAttribute('id', 'timePlayed');
    timePlayed.setAttribute('style', 'width: 0%; height: 10px; background: limegreen; position: absolute; left: 0; top: 120%; z-index: 2;')
    songTimer.appendChild(timePlayed);

    let timeLeft = document.createElement('div');
    timeLeft.setAttribute('id', 'timeLeft');
    timeLeft.setAttribute('style', 'width: 100%; height: 10px; background: ghostwhite; position: absolute; left: 0; top: 120%; z-index: 1;')
    songTimer.appendChild(timeLeft);

		// Display Songs
		
		let displaySongs = document.createElement('div');
		displaySongs.textContent = "---";
		displaySongs.setAttribute('id', 'displaySongs');
		displaySongs.setAttribute('class', 'display');
		displaySongs.setAttribute('style', 'width: 300px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(displaySongs);

		// Display Artist

		let displayArtist = document.createElement('div');
		displayArtist.textContent = "---";
		displayArtist.setAttribute('id', 'displayArtist');
		displayArtist.setAttribute('class', 'display');
		displayArtist.setAttribute('style', 'width: 500px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(displayArtist);

		// Display Album Cover

		let displayAlbumCover = document.createElement('img');
		displayAlbumCover.textContent = "---";
		displayAlbumCover.setAttribute('id', 'displayAlbumCover');
		displayAlbumCover.setAttribute('class', 'display');
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width: 200px; height: 200px; padding: 10px; border: 2px solid #F7B733; background: ghostwhite;');
		playbox.appendChild(displayAlbumCover);


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
		let display = `${lastSong} || <span style="font-weight: bold; color: #88D317;">${this.playlist[this.songNo].songTitle}</span> || ${this.playlist[(this.songNo + 1) % this.playlist.length].songTitle}`;
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
		let display = `${lastArtist} ||   <span style="font-weight: bold; color: #88D317;">${this.playlist[this.songNo].artist}</span>   || ${this.playlist[(this.songNo + 1) % this.playlist.length].artist}`;
		displayArtist.innerHTML = display;
	}

	displayAlbumCover(){
		
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width: 200px; height: 200px; padding: 10px; border: 2px solid #F7B733; background: ghostwhite;');
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


