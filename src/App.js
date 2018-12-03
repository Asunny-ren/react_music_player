import React, { Component } from 'react';
import Header from './components/header/Header';
import Player from './page/player/Player';
import { MUSIC_LIST } from './components/musiclist/MusicList';
import MusicList from './page/musiclist/MusicList';
import { BrowserRouter, Route} from 'react-router-dom';
import Pubsub from 'pubsub-js';
// import $ from 'jquery';
// import 'jPlayer';

const $ = window.$;

class App extends Component { 
  constructor (props) { 
    super(props);

    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  }

  playMusic = (musicItem) => {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play');

    this.setState({
      currentMusicItem: musicItem
    })
  }

  playNext = (type = "next") => {
    let index = this.findMusicIndex(this.state.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if(type === "next") {
      newIndex = (index + 1) % musicListLength;
    }else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }

    this.playMusic(this.state.musicList[newIndex]);
  }

  findMusicIndex = (musicItem) => {
    return this.state.musicList.indexOf(musicItem);
  }

  componentDidMount () {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });
    // this.playMusic(this.state.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem);
    })

    Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
      this.playNext('prev');
      
    })

    Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
      this.playNext();
    })

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      })
    })
  }

  componentWillUnmount () {
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended);
  }
  // React.cloneElement(this.props.children, this.state)
  // {this.props.children}
  // <MusicList 
  //   currentMusicItem={this.state.currentMusicItem}
  //   musicList={this.state.musicList}
  // />
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="">
              <Header />
              <Route exact path="/" render={ () =><Player currentMusicItem={this.state.currentMusicItem}></Player> } ></Route>
              <Route path="/list" render={ () =><MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}></MusicList> } ></Route>
          </div>
      </BrowserRouter>
      </div>
    );
  }
}

// class Root extends Component {
//   render () {
//     return (
//       <BrowserRouter>
//         <div className="App">
//             <Header />
//             <Route exact path="/" component={Player}></Route>
//             <Route path="/list" component={MusicList}></Route>
//         </div>
//       </BrowserRouter>
//     )
//   }
// }

export default App;
