<template>
  <div class="contentcontainer">
    <table class="soundui">
      <tr class="songart">
        <td>
          <img src="{{ album.link }}" alt="songart">
        </td>
      </tr>
      <tr class="songdetails">
        <td>
          <div>{{ currentSong.name }} - {{ currentSong.artist.name }}</div>
          <div>{{ currentSong.album.name }}</div>
        </td>
      </tr>
      <tr class="songnavigation">
        <td>
          <audio controls>
            <source src="{{ currentSong.link }}" type="audio/mp3">
            Your browser does not support the audio element.
          </audio>
        </td>
      </tr>
    </table>
    <div class="tabcontainer">
      <div id="menu">
        <button v-for="tab in tabs" v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]" @click="navigateToTab(tab)">
          {{ tab }}
        </button>
      </div>
      <div v-if="currentTab === 'Artist'">
        <div class="navigationTemplate">
          <div id="left"><button id="backartist"><img width="50" height="50" src="../assets/backbutton.png" alt="backbutton"> Back</button></div>
          <h2>{{ currentArtist.name }}</h2>
          <div id="right"><button id="currentartist"></button></div>
        </div>
        <img width="250" height="250" src="{{ currentArtist.art }}" alt="artist art" />
        <p>{{ currentArtist.info }}</p>
        <h3>Albums</h3>
        <div v-for="album in currentArtist.albums" v-bind:key="album.id" @click="setCurrentInNewTab(key, 'album', 'Album')">
          <h4 id="emphasis">{{ album.name }} ({{ album.year }})</h4>
        </div>
      </div>
      <div v-if="currentTab === 'Album'">
        <div class="navigationTemplate">
          <div id="left"><button id="backalbum"><img width="50" height="50" src="../assets/backbutton.png" alt="backbutton"> Back</button></div>
          <h2>{{ currentAlbum.name }}</h2>
          <div id="right"><button id="currentalbum"></button></div>
        </div>
        <img width="250" height="250" src="{{ currentAlbum.art }}" alt="album art" />
        <h4 id="emphasis" @click="setCurrentInNewTab(currentAlbum.artist.id, 'album', 'Album')">{{ currentAlbum.artist.name }} ({{ currentAlbum.year }})</h4>
        <h4>{{ currentAlbum.trackcount }} Songs - {{ currentAlbum.tracklength }}</h4>
        <table class="tracklist">
          <tr v-for="song in currentAlbum.songs" v-bind:key="song.id" v-bind:class="[{ even: song.tracklisting % 2 === 0}, { odd: song.tracklisting % 2 !== 0 }]" @click="setCurrentSong(song.id)">
            <td class="count">{{ song.tracklisting }}</td>
            <td class="title">{{ song.name }}</td>
            <td class="length">{{ song.length }}</td>
          </tr>
        </table>
      </div>
      <div v-if="currentTab === 'Info'">
        <h2>{{ currentSong.name }}</h2>
        <h4>Artist: {{ currentSong.artist.name }}</h4>
        <h4>Album: {{ currentSong.album.name }}({{ currentSong.album.year }})</h4>
        <p>{{ currentSong.info }}</p>
      </div>
      <div v-if="currentTab === 'Map'">
        <h2>MAP GO HERE</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { getDocumentFromId } from '@/services/sounddata'

export default {
  data() {
    return {
      currentTab: 'Artist',
      tabs: [
        'Artist',
        'Album',
        'Info',
        'Map'
      ],
      songHistory: [],
      albumHistory: [],
      artistHistory: [],
      currentSong: {
        name: '',
        id: '',
        info: '',
        link: '',
        artist: {
          name: '',
          id: ''
        },
        album: {
          name: '',
          id: '',
          year: ''
        }
      },
      currentAlbum: {
        name: '',
        year: '',
        id: '',
        art: '',
        songs: [{
          name: '',
          id: '',
          length: '',
          tracklisting: ''
        }],
        tracklength: '',
        trackcount: '',
        artist: {
          name: '',
          id: ''
        }
      },
      currentArtist: {
        name: '',
        id: '',
        info: '',
        art: '',
        albums: [{
          name: '',
          id: '',
          year: ''
        }]
      }
    }
  },
  computed: {
    currentTabComponent() {
      return this.tabComponents[this.currentTab]
    },
  },
  methods: {
    navigateToTab(tab) {
      this.currentTab = tab
    },
    // this function is used to change tabs while also updating the current artist and/or album.
    setCurrentInNewTab(id, type, tab) {
      if(!id || !type || !tab) { return }

      [type].forEach(async (ele) => {
        (ele === 'artist') ? await this.setCurrentArtist(id, true) : await this.setCurrentAlbum(id, true)
        this.navigateToTab(tab)
      })
    },
    // this function is used to set the current song and set the album and artist associated
    async setCurrentSong(id) {
      // set variable to hold the song document contents, return with no data if song cannot be found
      let songData = await getDocumentFromId(id, 'sounds')
      if(songData === null) {
        return
      }
      // set variable to hold the album document contents, return with no data if album cannot be found
      let albumData = await getDocumentFromId(songData.album, 'albums')
      if(albumData === null) {
        return
      }
      // set variable to hold the artist document contents, return with no data if artist cannot be found
      let artistData = await getDocumentFromId(songData.artist, 'artists')
      if(artistData === null) {
        return
      }

      // update currentSong by add currentSong to songHistory, ensuring that currentSong is not equal to songData,
      // and set currentSong to songData
      if(this.currentSong.id !== songData.id) {
        this.songHistory.unshift(this.currentSong.id)
        this.currentSong = {
          name: songData.name,
          id: songData.id,
          info: songData.info,
          link: songData.link,
          artist: {
            name: artistData.name,
            id: artistData.id
          },
          album: {
            name: albumData.name,
            id: albumData.id,
            year: albumData.year
          }
        }
      }

      // update currentAlbum if Album is not current tab, by adding currentAlbum to albumHistory, 
      // ensuring that currentAlbum is not equal to songData, and set currentAlbum to albumData
      if(this.currentTab !== 'Album' && this.currentAlbum.id !== albumData.id) {
        await this.setCurrentAlbum(this.currentAlbum.id, true)
      }

      // update currentArtist if Artist is not current tab, by adding currentArtist to artistHistory, 
      // ensuring that currentArtist is not equal to songData, and set currentArtist to artistData
      if(this.currentTab !== 'Artist' && this.currentArtist.id !== artistData.id) {
        await this.setCurrentArtist(this.currentArtist.id, true)
      }
    },

    // this function is used to create a currentAlbum object from album document content
    async createCurrentAlbumFromData(data) {
      // obtain usable song data to create an album song list object
      let songsArray = []
      data.songs.forEach(async (ele, index) => {
        const songData = await getDocumentFromId(ele, 'sounds')
        if(songData !== null) {
          songsArray.push({name: songData.name, id: ele, length: songData.length, tracklisting: index})
        }
      })

      // TODO: remove comment
      console.log('songArray timemap ', songsArray.map((ele) => ele.length))

      // obtain artist name
      const artistData =  await getDocumentFromId(data.artist, 'artists')

      return {
        name: data.name,
        year: data.year,
        id: data.id,
        art: data.art,
        songs: songsArray.sort((a, b) => {a.tracklisting - b.tracklisting}),
        tracklength: this.addTimeStrings(songsArray.map((ele) => ele.length)),
        trackcount: songsArray.length,
        artist: {
          name: artistData?.name,
          id: data.artist
        }
      }
    },
    // this function is used to set the currentAlbum if album is not currently currentAlbum
    async setCurrentAlbum(id, push) {
      if(!push && this.albumHistory.length <= 0) { return } // safety check
      // if push is true, set newAlbumId to arguement, else pop first element from albumHistory to use as id
      const newAlbumId = (push) ? id : this.albumHistory.shift()
      let albumData = await getDocumentFromId(newAlbumId, 'albums')

      // only update currentAlbum if currentAlbum is different from albumData
      if(albumData !== null && albumData.id !== this.currentAlbum.id) {
        if(push) { this.albumHistory.unshift(newAlbumId) } // only push new history if push is true
        this.currentAlbum = this.createCurrentAlbumFromData(albumData)
      }
    },

    // this function is used to create a currentArtist object from  artist document content
    createCurrentArtistFromData(data) {
      // obtian usable album data to create an album list
      let albumArray = []
      data.albums.forEach(async (ele) => {
        const albumData = await getDocumentFromId(ele, 'albums')
        if(albumData !== null) {
          albumArray.push({name: albumData.name, id: ele, year: albumData.year})
        }
      })

      return {
        name: data.name,
        id: data.id,
        info: data.info,
        art: data.art,
        albums: albumArray.sort((a, b) => a.year - b.year)
      }
    },
    // this function is used to set the currentArtist if the artist is not currently currentArtist
    async setCurrentArtist(id, push) {
      if(!push && this.artistHistory.length <= 0) { return } // safety check
      // if push is true, set newArtistId to arguement, else pop first element from artistHistory to use as id
      const newArtistId = (push) ? id : this.artistHistory.shift()
      let artistData = await getDocumentFromId(newArtistId, 'artists')

      // only update currentArtist if currentArtist is different from artistData
      if(artistData !== null && artistData.id !== this.currentArtist.id) {
        if(push) { this.artistHistory.unshift(newArtistId) } // only push new history if push is true
        this.currentArtist = this.createCurrentArtistFromData(artistData)
      }
    },

    addTimeStrings() {
      let time = { hours: 0, minutes: 0, seconds: 0 }
      const args = Array.from(arguments)
      // iterate through args to get each timestring
      args.forEach((ele) => {
        // get minutes and seconds as seperate ints
        const timeSplit = ele.split(':')
        const min = parseInt(timeSplit[0])
        const sec = parseInt(timeSplit[1])

        time.seconds += sec
        time.minutes += min

        time.minutes +=  Math.floor(time.seconds / 60)
        time.seconds %= 60 

        time.hours +=  Math.floor(time.minutes / 60)
        time.minutes %= 60
      })

      let returnString = (time.hours <= 0) ? '' : (time.hours > 1) ? `${time.hours} hours` : `${time.hours} hour`
      returnString += (time.minutes > 1) ? ` ${time.minutes} minutes` : ` ${time.minutes} minute`
      returnString += (time.seconds > 1) ? ` ${time.seconds} seconds` : ` ${time.seconds} second`

      return returnString
    },

    // this function is used to set the correct backlinks and currentSongLinks
    updateNavigationLinks() {
      // get html button elements and give them types: [0] - tab name, [1] - link type
      const navigationLinks = [
        {
          btn: document.getElementById('backartist'),
          type: ['artist', 'back']
        },
        {
          btn: document.getElementById('backalbum'),
          type: ['album', 'back']
        },
        {
          btn: document.getElementById('currentartist'),
          type: ['artist', 'current']
        },
        {
          btn: document.getElementById('currentalbum'),
          type: ['album', 'current']
        }
      ]
      
      // iterate through navigation links
      navigationLinks.forEach((ele) => {
        // get relevent history and currentSong album/artist reference and current album/artist
        const history = (ele.type[0] === 'artist') ? this.artistHistory : this.albumHistory
        const currentSongRef = (ele.type[0] === 'artist') ? this.currentSong.artist : this.currentSong.album
        const currentTabRef = (ele.type[0] === 'artist') ? this.currentArtist : this.currentAlbum

        // switch based on link type
        switch(ele.type[1]) {
          case 'back':
            if(history.length > 0) {
              ele.btn.disabled = false
              ele.btn.removeEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(null, false) : await this.setCurrentAlbum(null, false)
              })
              ele.btn.addEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(null, false) : await this.setCurrentAlbum(null, false)
              })
            } else {
              ele.btn.disabled = true
              ele.btn.removeEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(null, false) : await this.setCurrentAlbum(null, false)
              })
            }
            break
          case 'current':
            if(currentSongRef.id !== currentTabRef.id) {
              ele.btn.disabled = false
              ele.btn.hidden = false
              ele.btn.value = `View ${this.currentSong.name}\'s Album`
              ele.btn.removeEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(currentSongRef.id, true) : await this.setCurrentAlbum(currentSongRef.id, true)
              })
              ele.btn.addEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(currentSongRef.id, true) : await this.setCurrentAlbum(currentSongRef.id, true)
              })
            } else {
              ele.btn.disabled = true
              ele.btn.hidden = true
              ele.btn.removeEventListener('click', async () => {
                (ele.type[0] === 'artist') ? await this.setCurrentArtist(currentSongRef.id, true) : await this.setCurrentAlbum(currentSongRef.id, true)
              })
            }
            break
          default:
            break
        }
      })      
    }
  },
  watch: {
    currentTab: () => {
      // update navigation links 
      updateNavigationLinks()
    },
    currentSong: () => {
      console.log('pre Song Details', this.currentSong)
      
      // update navigation links 
      updateNavigationLinks()
      
      console.log('post Song Details', this.currentSong)
    },
    currentAlbum: () => {
      console.log('pre Album Details', this.currentAlbum)
      
      // update navigation links 
      updateNavigationLinks()
      
      console.log('post Album Details', this.currentAlbum)
    },
    currentArtist: () => {
      console.log('pre Artist Details', this.currentArtist)
      
      // update navigation links 
      updateNavigationLinks()
      
      console.log('post Artist Details', this.currentArtist)
    },

  },
}

</script>
<style scoped>
#contentContainer {
  display: flex;
  flex-direction: row;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccffdd;
  cursor: pointer;
  background: #ccffdd;
  margin-bottom: -1px;
  margin-right: -1px;
}
#menu button.active {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccffdd;
  background: #20eec5;
  margin-bottom: -1px;
  margin-right: -1px;
}

.navigationTemplate {
  display: flex;
  flex-direction: row;
}
.navigationTemplate h2 {
  flex: 5;
  text-align: center;
}
.navigationTemplate div {
  flex: 2;
}
.navigationTemplate div button {
  border: 1px solid #ccffdd;
  background: #20eec5;
  cursor: pointer;

}
*.navigationTemplate div button:disabled {
  border: 1px solid #c7c7c7;
  background: #c7c7c7;
  color: #5a5959;
  opacity: 1;
}
.navigationTemplate div#left,
table.tracklist tr.track td.title {
  text-align: left;
}
.navigationTemplate div#right,
table.tracklist tr.track td.length {
  text-align: right;
}

table.tracklist tr.track td.count {
  width: 5%;
  text-align: center;
}
table.tracklist tr.track td.title {
  width: 85%;
}
table.tracklist tr.track td.length {
  width: 10%;
}

table.tracklist {
  border-collapse: collapse;
}

table.tracklist tr,
table.tracklist tr.even,
table.tracklist tr.odd {
  border: 3px solid rgb(32, 32, 32);
  padding: 3px;
}

table.tracklist tr.even {
  background: #20eec5;
  color: black;
}
table.tracklist tr.odd {
  background: #ffffff;
  color: black;
}

h4#emphasis {
  border-bottom: 2px solid black;
  color: black;
  transition: all 0.3s ease;
  padding: 0px 3px 0px 2px;
}
h4#emphasis:hover {
  font-weight: bold;
  font-style: italic;
  border-bottom: 2px solid #20eec5;
  text-shadow: 1px 1px 1px black;
  color: #20eec5;
  padding: 0px 2px 0px 3px;
}
</style>