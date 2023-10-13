import * as ActionTypes from "../action/type";

const initialState = {
  items: [],
};

function parntersReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_PARTNERS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default parntersReducer;