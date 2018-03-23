import AppComponent from '../components/app';
import createStore from '../store';
import React from 'react';

function createProps() {
  return {
    store: createStore()
  };
}

export {createProps};

export default function() {
  return (
    <AppComponent {...createProps()} />
  );
}
