// sagas/index.js
import { all } from 'redux-saga/effects';
import watchSendHtmlToServer from './sendHtmlToServerSaga';
import fetchHtmlFromServerSaga from './fetchHtmlFromServerSaga'

export default function* rootSaga() {
  yield all([
    watchSendHtmlToServer(),
    fetchHtmlFromServerSaga()
    // 다른 사가들...
  ]);
}
