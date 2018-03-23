import Routes from './routes';
import React, {Component} from 'react';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Routes />
      </Provider>
    );
  }
}
