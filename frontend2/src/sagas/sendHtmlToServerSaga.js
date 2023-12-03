// sagas/sendHtmlToServerSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import actionTypes from '../constants/actionTypes';

function* sendHtmlToServerSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5000', { url_html: action.html });
    console.log('success', response.data);
    // 성공 액션 디스패치 가능
    // alert 창 띄우기
    window.alert('배포되었습니다.');

  } catch (error) {
    console.log(action.html)
    console.error('Error sending HTML', error);
    // 실패 액션 디스패치 가능
  }
}


export default function* watchSendHtmlToServer() {
  yield takeEvery(actionTypes.SEND_HTML_TO_SERVER, sendHtmlToServerSaga);
}
