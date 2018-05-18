import { createStore } from 'redux';
import onErrorResumeNext from 'on-error-resume-next';
import reducer from './reducer';

export default function store() {
  let initialStore;

  if (process.env.NODE_ENV !== 'production') {
    initialStore = onErrorResumeNext(() => JSON.parse(window.sessionStorage.getItem('redux')));
  }

  const store = createStore(reducer, initialStore);

  if (process.env.NODE_ENV !== 'production') {
    store.subscribe(() => {
      const state = store.getState();

      window.sessionStorage.setItem(
        'redux',
        JSON.stringify(state)
      );
    });
  }

  return store;
}
