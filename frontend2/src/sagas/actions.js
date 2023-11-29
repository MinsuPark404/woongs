// actions.js

import actionTypes from '../constants/actionTypes';
export const receiveHtml = (htmlData) => ({
    type: actionTypes.RECEIVE_HTML_FROM_SERVER, // 새로운 액션 타입
    payload: htmlData
});

export const sendHtmlToServer = (html) => ({
    type: actionTypes.SEND_HTML_TO_SERVER,
    html
});
export const fetchHtmlFromServer = () => ({
    type: actionTypes.FETCH_HTML_FROM_SERVER,

});