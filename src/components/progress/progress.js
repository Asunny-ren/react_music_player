import React, {Component} from 'react';
import './progress.styl';

class Progress extends Component {
  static defaultProps = {
    barColor: '#ff0000'
  }

  changeProgress = e => {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }

  render () {
    return (
      <div 
        className="component-progress row"
        onClick={this.changeProgress}
        ref="progressBar" 
        >
        <div 
          className="progress"
          style={{width: `${this.props.progress}%`, background: `${this.props.barColor}`}}
          ></div>
      </div>
    )
  }
}

export default Progress;
