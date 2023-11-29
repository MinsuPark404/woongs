import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import actionTypes from '../constants/actionTypes';

function* fetchHtmlFromServerSaga() {
  try {
    const res = yield call(axios.get, 'http://localhost:5000');
    console.log('Fetch success', res.data);
   
  } catch (error) {
    console.error('Error fetching HTML', error);
    
  }
}

export default function* watchFetchHtmlFromServer() {
  yield takeEvery(actionTypes.FETCH_HTML_FROM_SERVER, fetchHtmlFromServerSaga);
}
