const songs = [
  {
    id: 1,
    name: "Song 1",
    artist: "Artist 1",
    img: "assets/covers/1.jpg",
    genre: "Pop",
    source: "assets/songs/1.mp3",
    Playlists: [],
  },
  {
    id: 2,
    name: "Song 2",
    artist: "Artist 2",
    img: "assets/covers/2.jpg",
    genre: "Rock",
    source: "assets/songs/2.mp3",
    Playlists: [],
  },
  {
    id: 3,
    name: "Song 3",
    artist: "Artist 3",
    img: "assets/covers/3.jpg",
    genre: "Hip Hop",
    source: "assets/songs/3.mp3",
    Playlists: [],
  },
  // Add more songs as needed
];

let currentSongIndex = 0;

const checkbox = document.getElementById("themeToggle");
const themeName = document.querySelector(".theme-name");
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    document.body.classList.add("dark-theme");
    themeName.textContent = "Dark";
  } else {
    document.body.classList.remove("dark-theme");
    themeName.textContent = "Light";
  }
});

const genreSelector = document.getElementById("genre");
const songsContainer = document.getElementById("songs-container");

function showSongs() {
  const selectedgenre = genreSelector.value;

  songsContainer.innerHTML = "";

  songs.forEach((song) => {
    if (selectedgenre === "all" || song.genre === selectedgenre) {
      const songElement = document.createElement("div");
      songElement.classList.add("song");
      songElement.textContent = song.name;
      songElement.addEventListener("click", () => renderCurrentSong(song));

      songsContainer.appendChild(songElement);
    }
  });
}

genreSelector.addEventListener("change", showSongs);

showSongs();

function renderCurrentSong(song) {
  const artistImage = document.getElementById("image");
  const songTitle = document.getElementById("song-title");
  const songartist = document.getElementById("artist-name");
  const audio = document.querySelector("audio");

  artistImage.src = song.img;
  songTitle.textContent = song.name;
  songartist.textContent = song.artist;
  audio.src = song.source;

  currentSongIndex = songs.indexOf(song);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong(songs[currentSongIndex]);
}

function previousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong(songs[currentSongIndex]);
}

document.getElementById("next-button").addEventListener("click", nextSong);
document
  .getElementById("previous-button")
  .addEventListener("click", previousSong);

const createplaylistbutton = document.getElementById("createplaylist");
const playListNameinput = document.getElementById("playlistInput");
const playlistsContainer = document.getElementById("playlist-container");
const allPlaylist = document.getElementById("names-of-list");
const songsList = document.getElementById("names-of-song");
createplaylistbutton.addEventListener("click", createplaylist);
const addToPlaylistBtn = document.getElementById("addplaylist-btn");

let playlists = [];

let selectedPlaylist = "";

function createplaylist(event) {
  event.preventDefault();
  const playlistName = playListNameinput.value.trim();
  if (playlistName) {
    const existingPlaylist = playlists.find(
      (playlist) => playlist.name === playlistName
    );

    if (existingPlaylist) {
      alert(
        "Playlist with the same name already exists. Please choose a different name."
      );
      return;
    }

    const newPlaylist = {
      name: playlistName,
      songs: [], // Initialize with an empty array of songs
    };

    playlists.push(newPlaylist);
    renderPlaylist(playlists);

    songsList.innerHTML = "";
    allPlaylist.addEventListener("click", (event) => {
      const NamePlaylist = event.target.textContent;
      selectedPlaylist = NamePlaylist;
      songsList.innerHTML = "";
      songs.forEach((song) => {
        if (song.Playlists.includes(NamePlaylist)) {
          const currentPlaylistdiv = document.createElement("div");
          currentPlaylistdiv.classList.add("song");
          currentPlaylistdiv.textContent = song.name;
          songsList.appendChild(currentPlaylistdiv);
        }
      });
    });

    playListNameinput.value = "";
  }
}

function renderPlaylist(playlists) {
  allPlaylist.innerHTML = "";
  playlists.forEach((playlist) => {
    const playlistdiv = document.createElement("div");
    playlistdiv.classList.add("song");
    playlistdiv.textContent = playlist.name;
    selectedPlaylist = "";
    allPlaylist.appendChild(playlistdiv);
  });
}

addToPlaylistBtn.addEventListener("click", addToPlaylist);

function addToPlaylist() {
  const selectedPlaylist1 = selectedPlaylist;

  const currentSong = songs[currentSongIndex];
  if (selectedPlaylist1 === "") {
    alert("please choose the playlist");
  } else {
    if (!currentSong.Playlists.includes(selectedPlaylist1)) {
      currentSong.Playlists.push(selectedPlaylist1);

      const currentPlaylistdiv = document.createElement("div");
      currentPlaylistdiv.classList.add("song");
      currentPlaylistdiv.textContent = currentSong.name;
      songsList.appendChild(currentPlaylistdiv);
    } else {
      alert("song is already in the playlist");
    }
  }
}

const searchInput = document.getElementById("searchinput");
const searchSongBtn = document.getElementById("searchsong-btn");
const refreshBtn = document.getElementById("refresh-btn");

searchSongBtn.addEventListener("click", searchSong);
refreshBtn.addEventListener("click", () => {
  showSongs();
});

function searchSong(event) {
  event.preventDefault();
  const searchedSong = searchInput.value.trim();
  const selectedGenre = genreSelector.value;

  // Filter songs based on selected genre
  const genreFilteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);
  // Find the song with the searched name within the filtered songs
  const foundSong = genreFilteredSongs.find(
    (song) => song.name.toLowerCase() === searchedSong.toLowerCase()
  );

  songsContainer.innerHTML = "";

  if (foundSong) {
    // Song found
    const foundSongDiv = document.createElement("div");
    foundSongDiv.classList.add("song");
    foundSongDiv.textContent = foundSong.name;
    songsContainer.appendChild(foundSongDiv);
  } else {
    // No song found
    alert("No song found");
    showSongs(); // Assuming this function will display all songs or handle the UI appropriately
  }
}
