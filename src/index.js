import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './data/store';

const store = createStore();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
document.getElementById('root'));

registerServiceWorker();
