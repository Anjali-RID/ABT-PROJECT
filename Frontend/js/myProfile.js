document.addEventListener("DOMContentLoaded", function () {
    // Sample data for different playlists
    const playlists = {
        "watch-history": [
            { album: "Album Name", song: "Song 1", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 2", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 1", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 2", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 1", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 2", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 1", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Album Name", song: "Song 2", artist: "Anjali Bhardwaj", info: "Other info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
        ],
        "playlist-1": [
            { album: "Playlist 1", song: "Track 1", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 2", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 1", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 2", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 1", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 2", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 1", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Playlist 1", song: "Track 2", artist: "Anjali Bhardwaj", info: "Playlist info.", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
        ],
        "most-played": [
            { album: "Most Played", song: "Hit 1", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 2", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 1", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 2", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 1", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 2", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 1", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
            { album: "Most Played", song: "Hit 2", artist: "Anjali Bhardwaj", info: "Most Played Songs", img: "/ABT-PROJECT/Frontend/Assets/image/slider.PNG" },
        ]
    };

    // Get song list container
    const songListContainer = document.querySelector(".song-list");

    // Function to generate songs dynamically
    function generateSongs(playlist) {
        songListContainer.innerHTML = ""; // Clear old songs
        playlist.forEach(song => {
            const songDiv = document.createElement("div");
            songDiv.classList.add("song");

            songDiv.innerHTML = `
                <div class="song-img">
                    <img src="${song.img}" alt="Album Cover">
                </div>
                <div class="song-info">
                    <strong>${song.album}</strong> - ${song.song} || ${song.artist} || ${song.info}
                </div>
            `;

            songListContainer.appendChild(songDiv);
        });
    }

    // Load "Watch History" by default
    generateSongs(playlists["watch-history"]);

    // Playlist tab switching
    const playlistTabs = document.querySelectorAll(".playlist-section div");

    playlistTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            playlistTabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            // Load selected playlist
            const selectedPlaylist = this.classList.contains("Watch-history") ? "watch-history"
                : this.classList.contains("Playlist") ? "playlist-1"
                : "most-played";

            generateSongs(playlists[selectedPlaylist]);
        });
    });
});

// navbar.js
document.addEventListener("DOMContentLoaded", function () {
    fetch("/ABT-PROJECT/Frontend/components/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});

