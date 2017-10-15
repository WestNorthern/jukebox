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
    playbox.setAttribute('style', 'margin: 0 auto; text-align: center; background: #4ABDAC; padding: 20px; border: 3px solid #F7B733; font-family: "Josefin Sans"');

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
		next.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px; position: relative;');
		playbox.appendChild(next);
		next.addEventListener('click', () => { this.nextSong() });
		// End Next Button

		// End of Buttons

		// Song Timer

		let songTimer = document.createElement('div');
		songTimer.textContent = "0 / 0";
		songTimer.setAttribute('id', 'songTimer');
		songTimer.setAttribute('class', 'display');
		songTimer.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; margin-top: 15px; padding: 5px; background: #FC4A1A; border-radius: 5px; margin-bottom: 25px; position: relative;');
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

    let timerBars = document.createElement('div');
		timerBars.setAttribute('id', 'timerBars');
		timerBars.setAttribute('style', 'width: 200px; position: relative; margin: 0 auto;');
		playbox.appendChild(timerBars);


    let timePlayed = document.createElement('div');
    timePlayed.setAttribute('id', 'timePlayed');
    timePlayed.setAttribute('style', 'width: 0%; height: 10px; background: limegreen; position: absolute; left: 0; top: -20px; z-index: 2;')
    timerBars.appendChild(timePlayed);

    let timeLeft = document.createElement('div');
    timeLeft.setAttribute('id', 'timeLeft');
    timeLeft.setAttribute('style', 'width: 100%; height: 10px; background: ghostwhite; position: absolute; left: 0; top: -20px; z-index: 1;')
    timerBars.appendChild(timeLeft);

    this.audioElement.addEventListener('timeupdate', function(){
    	let completedPercentage = (this.currentTime / this.duration) * 100;

    	document.getElementById('timePlayed').setAttribute('style', `width: ${completedPercentage}%; height: 10px; background: limegreen; position: absolute; left: 0; top: -20px; z-index: 2;`);
    
    });
    

		// Display Songs
		
		let displaySongs = document.createElement('div');
		displaySongs.textContent = "---";
		displaySongs.setAttribute('id', 'displaySongs');
		displaySongs.setAttribute('class', 'display');
		displaySongs.setAttribute('style', 'width: 300px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; padding: 5px; background: #FC4A1A; border-radius: 5px; position: relative;');
		playbox.appendChild(displaySongs);

		

    

		// Display Artist

		let displayArtist = document.createElement('div');
		displayArtist.textContent = "---";
		displayArtist.setAttribute('id', 'displayArtist');
		displayArtist.setAttribute('class', 'display');
		displayArtist.setAttribute('style', 'width: 500px; height: 30px; font-size: 1.3em; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 5px auto; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(displayArtist);

		// Shuffle Button
    let shufflePlaylist = document.createElement('div');
		shufflePlaylist.innerText = "Shuffle";
		shufflePlaylist.setAttribute('id', 'shufflePlaylist');
		shufflePlaylist.setAttribute('class', 'controls');
		shufflePlaylist.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(shufflePlaylist);
		shufflePlaylist.addEventListener('click', () => { this.shufflePlaylist() });
		// End Random Button

		// Display Album Cover

		let displayAlbumCover = document.createElement('img');
		displayAlbumCover.textContent = "---";
		displayAlbumCover.setAttribute('id', 'displayAlbumCover');
		displayAlbumCover.setAttribute('class', 'display');
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width: 200px; height: 200px; padding: 10px; border: 2px solid #F7B733; background: ghostwhite;');
		playbox.appendChild(displayAlbumCover);

		// Random Button
    let randomSong = document.createElement('div');
		randomSong.innerText = "Random";
		randomSong.setAttribute('id', 'randomSong');
		randomSong.setAttribute('class', 'controls');
		randomSong.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: inline; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
		playbox.appendChild(randomSong);
		randomSong.addEventListener('click', () => { this.randomSong() });
		// End Random Button

		// Load Custom Playlist
    let addPlaylist = document.createElement('div');
		addPlaylist.innerText = "Load Custom Playlist";
		addPlaylist.setAttribute('id', 'addPlaylist');
		addPlaylist.setAttribute('class', 'controls');
		addPlaylist.setAttribute('style', 'width: 200px; height: 30px; font-size: 1.3em; display: block; border: 2px solid #F7B733; line-height: 30px; text-align: center; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px; margin: 0 auto;');
		playbox.appendChild(addPlaylist);
		addPlaylist.addEventListener('click', () => { this.addPlaylist(customList.plist) });
		// End Random Button


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

	} // End of constructor

	playSong(){
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
			let lastSong = '---';
			let nextSong = '---';
			if (this.playlist[(this.songNo - 1)] == undefined){
				lastSong = '---'
			}
			else {
				lastSong =  this.playlist[this.songNo - 1].songTitle;
			}
			if (this.playlist[(this.songNo + 1)] == undefined){
				nextSong = '---'
			}
			else {
				nextSong =  this.playlist[this.songNo + 1].songTitle;
			}
		let display = `${lastSong} || <span style="font-weight: bold; color: #88D317;">${this.playlist[this.songNo].songTitle}</span> || ${nextSong}`;
		displaySongs.innerHTML = display;
	}

	displayArtist(){
			let lastArtist = '---';
			let nextArtist = '---';
			if (this.playlist[(this.songNo - 1)] == undefined){
				lastArtist = '---'
			}
			else {
				lastArtist =  this.playlist[this.songNo - 1].artist;
			}
			if (this.playlist[(this.songNo + 1)] == undefined){
				nextArtist = '---'
			}
			else {
				nextArtist =  this.playlist[this.songNo + 1].artist;
			}
		let display = `${lastArtist} || <span style="font-weight: bold; color: #88D317;">${this.playlist[this.songNo].artist}</span> || ${nextArtist}`;
		displayArtist.innerHTML = display;
	}

	displayAlbumCover(){
		
		displayAlbumCover.setAttribute('src', `${this.playlist[this.songNo].analBumCover}`);
		displayAlbumCover.setAttribute('style', 'width: 200px; height: 200px; padding: 10px; border: 2px solid #F7B733; background: ghostwhite;');
	}

	addPlaylist(newPlaylist){
		this.playlist = [];
		this.playlist = newPlaylist;
		this.current = this.playlist[0].url;
		this.loadSong();
	}
	randomSong(){

		this.songNo = Math.floor(Math.random() * (this.playlist.length - 1));
		this.current = this.playlist[this.songNo].url;
		this.loadSong();
		this.playSong();
	}
	shufflePlaylist(){
		for (let i = this.playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
    }

    this.current = this.playlist[0].url;
		this.loadSong();
		this.playSong();

	}
	
} // End of Jukebox Class

class Playlist{
	constructor(){
		this.plist = [];
		this.displayBox = document.createElement('div');
  	this.displayBox.innerHTML = "<h1 style='color: ghostwhite; text-align: center;'>All Songs</h1>";
    document.body.appendChild(this.displayBox);
    this.displayBox.setAttribute('style', 'width: 45%; margin: 5px; text-align: left; background: #4ABDAC; padding: 20px; border: 3px solid #F7B733; font-family: "Josefin Sans"; float: left;');
    this.displayBox.setAttribute('id', 'songBox');
	}
	addSong(song){
		this.plist.push(song);
	}
	addSongs(songs){
		for (var i = 0; i < songs.length; i++) {
			this.plist.push(songs[i]);
		}
	}
	removeSong(songNum){
		let removedSong = this.plist[songNum];
		console.log(removedSong);
		this.plist.splice(songNum, 1);
		return removedSong;
	}
	shufflePlaylist(){
		for (let i = this.plist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.plist[i], this.plist[j]] = [this.plist[j], this.plist[i]];
    }
  }
  addToOther(input){
  	console.log('It has been clicked.');
  	console.log(input);
  	let removedSong = this.plist[input];
		console.log(removedSong);
		customList.addSong(removedSong);
		this.plist.splice(input, 1);
		this.displayPlaylist();
		customList.displayPlaylist();
  	
  }
  displayPlaylist(){

  	let songBox = document.getElementById('songBox');
		songBox.innerHTML = "<h1 style='color: ghostwhite; text-align: center;'>All Songs</h1>";

    let displaySongs = [];
    
    for (var i = 0; i < this.plist.length; i++) {
    	displaySongs[i] = document.createElement('div');
    	displaySongs[i].innerHTML = `${this.plist[i].songTitle} by ${this.plist[i].artist} <span id="song${i}" style="float: right; color: salmon;" onclick="displayTest.addToOther(${i})">Add</span>`;
    	displaySongs[i].setAttribute('style', 'width: auto; height: 30px; font-size: 1.1em; display:block; border: 2px solid #F7B733; line-height: 30px; text-align: left; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
    	this.displayBox.appendChild(displaySongs[i]);
    }
  }
} // End of Playlist Class

class Custom{
	constructor(){
		this.plist = [];
		this.displayBox = document.createElement('div');
  	this.displayBox.innerHTML = "<h1 style='text-align: center; color: ghostwhite;'>Custom Playlist</h1>";
    document.body.appendChild(this.displayBox);
    this.displayBox.setAttribute('style', 'width: 45%; margin: 5px; text-align: left; background: #4ABDAC; padding: 20px; border: 3px solid #F7B733; font-family: "Josefin Sans"; float: left;');
    this.displayBox.setAttribute('id', 'customBox');
	}
	addSong(song){
		this.plist.push(song);
	}
	addSongs(songs){
		for (var i = 0; i < songs.length; i++) {
			this.plist.push(songs[i]);
		}
	}
	removeSong(songNum){
		let removedSong = this.plist[songNum];
		console.log(removedSong);
		this.plist.splice(songNum, 1);
		return removedSong;
	}
	shufflePlaylist(){
		for (let i = this.plist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.plist[i], this.plist[j]] = [this.plist[j], this.plist[i]];
    }
  }
  addToOther(input){
  	console.log('It has been clicked.');
  	console.log(input);
  	let removedSong = this.plist[input];
		console.log(removedSong);
		displayTest.addSong(removedSong);
		this.plist.splice(input, 1);
		this.displayPlaylist();
		displayTest.displayPlaylist();
  }
  displayPlaylist(){
  	let customBox = document.getElementById('customBox');
		customBox.innerHTML = "<h1 style='color: ghostwhite; text-align: center;'>Custom Playlist</h1>";

    let displaySongs = [];
    
    for (var i = 0; i < this.plist.length; i++) {
    	displaySongs[i] = document.createElement('div');
    	displaySongs[i].innerHTML = `${this.plist[i].songTitle} by ${this.plist[i].artist} <span id="song${i}" style="float: right; color: salmon;" onclick="customList.addToOther(${i})">Remove</span>`;
    	displaySongs[i].setAttribute('style', 'width: auto; height: 30px; font-size: 1.1em; display:block; border: 2px solid #F7B733; line-height: 30px; text-align: left; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
    	this.displayBox.appendChild(displaySongs[i]);
    }
  }
} // End of Custom Class


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


// class allSongs extends Playlist{
// 	constructor(){
// 		super();
// 		super.addSongs();
// 		super.plist;
// 	}
// 	addToOther(input){
//   	console.log('It has been clicked.');
//   	console.log(input);
//   }
//   displayPlaylist(){

//   	let displayBox = document.createElement('div');
//   	displayBox.innerHTML = "<h1 style='text-align: center;'>All Songs</h1>";
//     document.body.appendChild(displayBox);
//     displayBox.setAttribute('style', 'width: 43%; margin: 10px; text-align: left; background: #4ABDAC; padding: 20px; border: 3px solid #F7B733; font-family: "Josefin Sans"');

//     let displaySongs = [];
    
//     for (var i = 0; i < this.plist.length; i++) {
//     	displaySongs[i] = document.createElement('div');
//     	displaySongs[i].innerHTML = `${this.plist[i].songTitle} by ${this.plist[i].artist} <span id="song${i}" style="float: right; color: salmon;" onclick="displayTest.addToOther(${i})">Add</span>`;
//     	displaySongs[i].setAttribute('style', 'width: auto; height: 30px; font-size: 1.1em; display:block; border: 2px solid #F7B733; line-height: 30px; text-align: left; color: ghostwhite; margin: 10px; padding: 5px; background: #FC4A1A; border-radius: 5px;');
//     	displayBox.appendChild(displaySongs[i]);
//     }
//   }



let myJuke = new Jukebox(objectSongs);


let displayTest = new Playlist();
let customList = new Custom();

displayTest.addSongs(objectSongs);
displayTest.displayPlaylist();

customList.displayPlaylist();


// myJuke.addPlaylist(newArray);


