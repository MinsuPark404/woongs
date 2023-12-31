const actionTypes = {
  // 기존 액션 타입들
  CHANGE_ACTIVE_TAB: 'CONFIG/CHANGE_ACTIVE_TAB',
  CHANGE_PREVIEW_MODE: 'CONFIG/CHANGE_PREVIEW_MODE',
  SET_SELECTED_BLOCK: 'LAYOUT/SET_SELECTED_BLOCK',
  PUSH_BLOCK: 'LAYOUT/PUSH_BLOCK',
  CHANGE_BLOCK_DATA: 'LAYOUT/CHANGE_BLOCK_DATA',
  REORDER_LAYOUT: 'LAYOUT/REORDER_LAYOUT',
  DELETE_BLOCK: 'LAYOUT/DELETE_BLOCK',
  CHANGE_DOCUMENT_ID: 'LAYOUT/CHANGE_DOCUMENT_ID',

  // 추가할 새 액션 타입
  SEND_HTML_TO_SERVER: 'CONFIG/SEND_HTML_TO_SERVER',
  FETCH_HTML_FROM_SERVER: 'CONFIG/FETCH_HTML_TO_SERVER',
  RECEIVE_HTML_FROM_SERVER: 'CONFIG/RECEIVE_HTML_FROM_SERVER'
};

export default actionTypes;
