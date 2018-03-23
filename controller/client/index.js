import {render} from 'react-dom';
import {createElement} from 'react';
import App from '../containers/app';

render(createElement(App), document.querySelector('#app-container'));
