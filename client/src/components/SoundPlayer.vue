<template>
  <div class="contentcontainer">
    <table class="soundui">
      <tr class="songartrow">
        <td>
          <img class="songart" id="songart" v-bind:src="currentSong.art" alt="songart">
        </td>
      </tr>
      <tr class="songdetails">
        <td>
          <div>{{ currentSong.name }} - {{ currentSong.artist.name }}</div>
          <div>{{ currentSong.album.name }}</div>
        </td>
      </tr>
      <tr class="audiocontrols">
        <td>
          <audio controls id="audiocontrols">
            <source v-bind:src="currentSong.link" type="audio/mp3">
            Your browser does not support the audio element.
          </audio>
        </td>
      </tr>
      <tr class="songnavigation">
        <td>
          <!-- TODO: fix buttons -->
          <button class="loopBtn"><img class="loop" id="left" src="../assets/icons/loop-true.svg"></button>
        </td>
        <td>
          <button class="muteBtn"><img class="mute" id="right" src="../assets/icons/mute-volume-svgrepo-com.svg"></button>
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
        <div class="navigationtemplate">
          <div id="left"><button id="backBtnArtist"><img width="25" height="25" src="../assets/icons/backbutton.png" alt="backbutton"> Back</button></div>
          <h2>{{ currentArtist.name }}</h2>
          <div id="right"><button id="currentBtnArtist" width="50" height="25"></button></div>
        </div>
        <img id="artistart" v-bind:src="currentArtist.art" alt="artist art" />
        <p>{{ currentArtist.info }}</p>
        <h3>Albums</h3>
        <div v-for="album in currentArtist.albums" v-bind:key="album.id" @click="setCurrentInNewTab(key, 'album', 'Album')">
          <h4 id="emphasis">{{ album.name }} ({{ album.year }})</h4>
        </div>
      </div>
      <div v-if="currentTab === 'Album'">
        <div class="navigationtemplate">
          <div id="left"><button id="backBtnAlbum"><img width="25" height="25" src="../assets/icons/backbutton.png" alt="backbutton"> Back</button></div>
          <h2>{{ currentAlbum.name }}</h2>
          <div id="right"><button id="currentBtnAlbum" width="auto" height="auto"></button></div>
        </div>
        <img id="albumart" v-bind:src="currentAlbum.art" alt="album art" />
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
import { nextTick } from 'vue'
import { getDocumentFromId, getLastUserSound } from '@/services/sounddata.js'

export default {
  name: 'SoundPlayer',
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
        id: null,
        info: '',
        link: '',
        art: '',
        artist: {
          name: '',
          id: null
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
        id: null,
        art: '',
        songs: [{
          name: '',
          id: null,
          length: '',
          tracklisting: ''
        }],
        tracklength: '',
        trackcount: '',
        artist: {
          name: '',
          id: null
        }
      },
      currentArtist: {
        name: '',
        id: null,
        info: '',
        art: '',
        albums: [{
          name: '',
          id: null,
          year: ''
        }]
      },
      lastSoundId: null
    }
  },
  async mounted() {
    await nextTick()

    if(!this.currentSong.id) {
      this.lastSoundId = await getLastUserSound()
      await this.setCurrentSong(this.lastSoundId)
    }
  },
  computed: {
    currentTabComponent() {
      return this.tabs[this.currentTab]
    },
    // this method is used to track the states for the tab navigation buttons
    navigationLinkStates() {
      return {
        backBtnArtistState: this.artistHistory.length > 0,
        backBtnAlbumState: this.albumHistory.length > 0,
        currentBtnArtistState: this.currentSong.artist?.id !== this.currentArtist?.id,
        currentBtnAlbumState: this.currentSong.album?.id !== this.currentAlbum?.id,
      }
    },
    // this method is used to track the values of the history arrays
    historyView() {
      return {
        songHist: this.songHistory,
        albumHist: this.albumHistory,
        artistHist: this.artistHistory
      }
    }
  },
  watch: {
    navigationLinkStates: {
      handler(newVal) {
        this.updateNavigationLinks(newVal)
      },
      deep: true,
      immediate: true
    },
    // Watch any other relevant data properties to trigger updates
    currentTab() {
      this.updateNavigationLinks(this.navigationLinkStates)
    },
    currentSong() {
      this.updateNavigationLinks(this.navigationLinkStates)
    },
    currentAlbum() {
      this.updateNavigationLinks(this.navigationLinkStates)
    },
    currentArtist() {
      this.updateNavigationLinks(this.navigationLinkStates)
    },
    historyView: {
      handler(newVal) {
        this.printHist(newVal)
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    printHist(hist) {
      console.log('songHist: ',hist.songHist)
      console.log('albumHist: ',hist.albumHist)
      console.log('artistHist: ',hist.artistHist)
    },
    // this function is used to set the correct backlinks and currentSongLinks
    updateNavigationLinks(states) {
      // get html button elements, enables status, labels and actions associated with navigating in the vue component
      const navigationLinks = [
        {
          btn: document.getElementById('backBtnArtist'),
          enabled: states.backBtnArtistState,
          action: async () => await this.setCurrentArtist(null, false)
        },
        {
          btn: document.getElementById('backBtnAlbum'),
          enabled: states.backBtnAlbumState,
          action: async () => await this.setCurrentAlbum(null, false)
        },
        {
          btn: document.getElementById('currentBtnArtist'),
          enabled: states.currentBtnArtistState,
          hidden: states.currentBtnArtistState,
          action: async () => await this.setCurrentArtist(this.currentSong.artist.id, true),
          label: `View ${this.currentSong.name}'s Artist`

        },
        {
          btn: document.getElementById('currentBtnAlbum'),
          enabled: states.currentBtnAlbumState,
          hidden: states.currentBtnAlbumState,
          action: async () => await this.setCurrentAlbum(this.currentSong.album.id, true),
          label: `View ${this.currentSong.name}'s Album`
        }
      ]
      
      // iterate through navigation links
      navigationLinks.forEach((ele, index) => {
        if (!ele.btn) {
          console.error(`Element ${ele} index[${index}] not found`);
          return;
        }

        console.log('success on navLink index ', index)

        // set the button disabled boolean with the status updated via computed.
        // this is also used to set the hidden status
        ele.btn.disabled = !ele.enabled
        ele.btn.hidden = ele.hidden || false
        // if the button is enabled, value and onclick action
        ele.btn.value = (ele.enabled) ? ele.label : ''
        ele.btn.onclick = (ele.enabled) ? ele.action : null
      })
    },
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
      if(!id) {
        console.error(`setCurrentSong Error - id is ${id}`)
        return
      }

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
          art: albumData.art,
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

      // update currentAlbum if Album is not current tab, unless currentAlbum has not been set, by adding currentAlbum to albumHistory, 
      // ensuring that currentAlbum is not equal to songData, and set currentAlbum to albumData
      if((!this.currentAlbum.id) || (this.currentTab !== 'Album' && this.currentAlbum.id !== albumData.id)) {
        await this.setCurrentAlbum(albumData.id, true)
      }

      // update currentArtist if Artist is not current tab unless currentArtist has not been set, by adding currentArtist to artistHistory, 
      // ensuring that currentArtist is not equal to songData, and set currentArtist to artistData
      if((!this.currentArtist.id) || (this.currentTab !== 'Artist' && this.currentArtist.id !== artistData.id)) {
        await this.setCurrentArtist(artistData.id, true)
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
      console.log('songArray: ', songsArray)
      const timestap = songsArray.map((ele) => {return ele.length})
      console.log('songArray timemap ', timestap)

      // obtain artist name
      let artistData =  await getDocumentFromId(data.artist, 'artists')

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
      // if(!push && this.albumHistory.length <= 0) { push = true } // safety check

      // if push is true, set newAlbumId to arguement, else pop first element from albumHistory to use as id
      const newAlbumId = (push) ? id : this.albumHistory.shift()

      let albumData = await getDocumentFromId(newAlbumId, 'albums')

      // only update currentAlbum if currentAlbum is different from albumData
      if((albumData !== null) && (albumData.id !== this.currentAlbum.id)) {
        if(push) { this.albumHistory.unshift(newAlbumId) } // only push new history if push is true
        this.currentAlbum = this.createCurrentAlbumFromData(albumData)
        console.log('currentAlbum: ', this.currentAlbum)
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
      // if(!push && this.artistHistory.length <= 0) { push = true } // safety check

      // if push is true, set newArtistId to arguement, else pop first element from artistHistory to use as id
      const newArtistId = (push) ? id : this.artistHistory.shift()

      let artistData = await getDocumentFromId(newArtistId, 'artists')

      // only update currentArtist if currentArtist is different from artistData
      if((artistData !== null) && (artistData.id !== this.currentArtist.id)) {
        if(push) { this.artistHistory.unshift(newArtistId) } // only push new history if push is true
        this.currentArtist = this.createCurrentArtistFromData(artistData)
        console.log('currentArtist: ', this.currentArtist)
      }
    },

    addTimeStrings() {
      let time = { hours: 0, minutes: 0, seconds: 0 }
      const args = Array.from(arguments)      
      // iterate through args to get each timestring
      args.forEach((ele) => {
        // get minutes and seconds as seperate ints
        const timeSplit = ele[0].split(':')
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
    }
  }
}

</script>
<style scoped>
.contentcontainer {
  display: flex;
  flex-direction: row;
}

.contentcontainer table.soundui {
  margin: 6%;
  flex: 4;
}

.contentcontainer table.soundui tr.songartrow,
.contentcontainer table.soundui tr.songdetails,
.contentcontainer table.soundui tr.songnavigation {
  width: 100%;
}

.contentcontainer table.soundui tr.songartrow,
.contentcontainer table.soundui tr.songdetails {
  margin: 0 0 4% 0;
}

.contentcontainer table.soundui tr.songartrow {
  padding: 1%;
  border: 1px solid #ccffdd;
  border-radius: 3px;
}
.contentcontainer table.soundui tr.songartrow td img.songart {
  max-height: 55%;
  aspect-ratio: 1;
}

.contentcontainer table.soundui tr.songdetails {
  max-height: 15%;
}
.contentcontainer table.soundui tr.songdetails td {
  text-align: center;
  vertical-align: middle;
}
.contentcontainer table.soundui tr.audiocontrols,
.contentcontainer table.soundui tr.songnavigation {
  max-height: 15%;
  margin: 0;
  text-align: center;
  vertical-align: middle;
}

.contentcontainer div.tabcontainer {
  padding: 1ch 2ch;
  margin-right: 1ch;
  flex: 6;
  background-color: white;
  border: 1px double black;
  color: black;
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

.navigationtemplate {
  display: flex;
  flex-direction: row;
}
.navigationtemplate h2 {
  flex: 5;
  text-align: center;
}
.navigationtemplate div {
  flex: 2;
}
.navigationtemplate div button {
  border: 1px solid #ccffdd;
  background: #20eec5;
  cursor: pointer;

}
*.navigationtemplate div button:disabled {
  border: 1px solid #c7c7c7;
  background: #c7c7c7;
  color: #5a5959;
  opacity: 1;
}
.navigationtemplate div#left,
table.tracklist tr.track td.title {
  text-align: left;
}
.navigationtemplate div#right,
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