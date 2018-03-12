import AppComponent from '../components/app';
import createStore from '../store';

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
