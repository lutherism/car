import React, {Component} from 'react';

export default class StreamViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {n: 1};
    this.updateFrame = this.updateFrame.bind(this);
  }
  updateFrame() {
    this.setState({n: this.state.n+1});
  }
  render() {
    return (
      <div style={{position: 'relative', width: '640px',
        height: '480px', display: 'table'}}>
        <img src={`/stream/${this.state.n}`} key={this.state.n} onLoad={this.updateFrame}/>
        {this.state.n > 1 ?
          <img
            style={{position: 'absolute', left: 0}} key={this.state.n - 1}
            src={`/stream/${this.state.n - 1}`} /> : null}
        {this.state.n > 2 ?
          <img
            style={{position: 'absolute', left: 0}} key={this.state.n - 2}
            src={`/stream/${this.state.n - 2}`} /> : null}
      </div>
    )
  }
}
