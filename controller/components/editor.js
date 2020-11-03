import React, {Component} from 'react';
import AceEditor from 'react-ace/dist/react-ace.min';
import request from 'request';
import Switch from 'antd/lib/switch';
import StreamViewer from './stream-viewer';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const INIT_CONTENT = `/* Write robot commands funder a main function, run them
* ROBOT COMMANDS
    left, right, straight, threePointTurn, testAction,
  fast, slow, speed, square, turn, init, stop, forward, reverse, wait
*
* EXAMPLE
    function main(robot) {
        return rc.threePointTurn()(robot)
            .then(() => rc.forward()(robot))
            .then(() => rc.wait(500))
            .then(() => rc.stop()(robot))
    }
*
*/

function main(robot) {
    // Enter commands here
}`;

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {v: INIT_CONTENT};
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
  postActionHandler(opts) {
    return () => {
      fetch(`/action/${opts.action}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(opts)
      });
    }
  }
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div style={{display: 'inline-block'}}>
          <StreamViewer />
        </div>
        <div style={{display: 'inline-block'}}>
          <div>
            <Switch />
            <span>
              {'Simulation Mode'}
            </span>
          </div>
          <div>
            <AceEditor
              value={this.state.v}
              onChange={v => this.setState({v})}
              name="UNIQUE_ID_OF_DIV"
              mode="javascript"
              theme="monokai"
              editorProps={{$blockScrolling: true}}
              enableBasicAutocompletion={true}
              enableLiveAutocompletion={true}
              enableSnippets={true}
            />
          </div>
        </div>
        <button onClick={this.onSubmit}>{'Run'}</button>
        <div>
          <div style={{
            display: 'inline-block',
            margin: 16,
            padding: 16,
            border: '1px solid'
          }}>
            <label style={{marginBottom: 16}}>
              {'Steer'}
            </label>
            <div>
              <button onClick={this.postActionHandler({
                action: 'left', wait: 500, stopAfter: true
              })}>{'<'}</button>
              <button onClick={this.postActionHandler({
                action: 'straight', wait: 500, stopAfter: true
              })}>{'|'}</button>
              <button onClick={this.postActionHandler({
                action: 'right', wait: 500, stopAfter: true
              })}>{'>'}</button>
            </div>
          </div>
          <div style={{
            display: 'inline-block',
            margin: 16,
            padding: 16,
            border: '1px solid'
          }}>
            <label style={{marginBottom: 16}}>
              {'Motor Direction'}
              </label>
            <div>
              <button onClick={this.postActionHandler({
                action: 'forward', wait: 500, stopAfter: true
              })}>{'/\\'}</button>
              <button onClick={this.postActionHandler({
                action: 'stop'
              })}>{'X'}</button>
              <button onClick={this.postActionHandler({
                action: 'reverse', wait: 500, stopAfter: true
              })}>{'\\/'}</button>
            </div>
          </div>
          <div>
            <label>{'Motor Speed'}</label>
            <div>
              <button onClick={this.postActionHandler({
                action: 'fast', wait: 500
              })}>{'fast'}</button>
              <button onClick={this.postActionHandler({
                action: 'slow', wait: 500
              })}>{'slow'}</button>
            </div>
          </div>
          <div>
            <label>{'Special'}</label>
            <div>
              <button onClick={this.postActionHandler({
                action: 'init', wait: 500,
              })}>{'Init'}</button>
              <button onClick={this.postActionHandler({
                action: 'threePointTurn', wait: 500,
              })}>{'Three Point turn'}</button>
              <button onClick={this.postActionHandler({
                action: 'square', wait: 500,
              })}>{'Square'}</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
