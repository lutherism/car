import Routes from './routes';
import React from 'react';
import {Provider} from 'react-redux';

export default class App {
  render() {
    return (
      <Provider store={this.props.store}>
        <Routes />
      </Provider>
    )
  }
}
