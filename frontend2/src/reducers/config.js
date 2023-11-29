import actionTypes from "../constants/actionTypes";

const initialState = {
  activeTab: 0,
  previewMode: 0,
  htmlData: null, // 초기 상태에서 htmlData 선언
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.index,
      };
    case actionTypes.CHANGE_PREVIEW_MODE:
      return {
        ...state,
        previewMode: action.mode,
      };
    case actionTypes.RECEIVE_HTML_FROM_SERVER:
      return {
        ...state,
        htmlData: action.payload, // 서버로부터 받은 HTML 데이터를 저장
      };
    case actionTypes.FETCH_HTML_TO_SERVER:
      return {
        ...state,
        
      }
    default:
      return state;
  }
}
