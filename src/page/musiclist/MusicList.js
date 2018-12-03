import React, { Component } from 'react';
import MusicListItem from '../musiclistitem/MusicListItem';

class MusicList extends Component {
  render () {
    let listEle = null;
    listEle = this.props.musicList.map((item) => {
      return <MusicListItem 
                focus={item === this.props.currentMusicItem}
                key={item.id} 
                musicItem={item}
              >{ item.title }</MusicListItem>
    })
    return (
      <div className="MusicList">
        <ul>
          {listEle}
        </ul>
      </div>
    )
  }
}

export default MusicList;