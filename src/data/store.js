import { createStore } from 'redux';
import onErrorResumeNext from 'on-error-resume-next';
import reducer from './reducer';

export default function store() {
  const initialStore = onErrorResumeNext(() => JSON.parse(window.sessionStorage.getItem('redux')));
  const store = createStore(reducer, initialStore || {});

  store.subscribe(() => {
    const state = store.getState();

    window.sessionStorage.setItem(
      'redux',
      JSON.stringify(state)
    );
  });

  return store;
}
