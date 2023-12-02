import { createStore } from 'redux';

function reducer(state, action) {
  const newState = { ...state };
  if (state === undefined) {
    return {
      user: {
        name: '',
        email: '',
        id: '',
        roll: '',
        bno: '',
      },
    };
  }
  if (action.type === 'LOGIN') {
    console.log('action.payload 데이터 확인', action.payload);
    newState.user = action.payload;
  }
  if (action.type === 'LOGOUT') {
    newState.user = {
      name: '',
      email: '',
      id: '',
      roll: '',
      bno: '',
    };
  }
  return newState;
}

const store = createStore(reducer);
export default store;
