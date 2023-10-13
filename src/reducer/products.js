import * as ActionTypes from "../action/type";

const initialState = {
  items: [],
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SAVE_PARTNER_PRODUCTS:
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

export default productsReducer;