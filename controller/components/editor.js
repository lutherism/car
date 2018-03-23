import React, {Component} from 'react';
import AceEditor from 'react-ace';
import request from 'request';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {v: ''};
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    fetch('/eval', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scriptToRun: this.state.v})
    });
  }
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div>
        <AceEditor
          value={this.state.v}
          onChange={v => this.setState({v})}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
        />
        </div>
        <button onClick={this.onSubmit}>{'Run'}</button>
      </form>
    );
  }
}
