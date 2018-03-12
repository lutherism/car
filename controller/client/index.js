import {render} from 'react-dom';
import App from './containers/app';
import document from 'global/document';

render(<App />, document.querySelector('#aoo-container'));
