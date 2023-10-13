import * as ActionTypes from "../action/type";

const initialState = {
  loggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        ...state,
        loggedIn: true,
        id: action.id,
        profile: action.profile,
      };

    case ActionTypes.REGISTER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
      };
    case ActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ActionTypes.UPDATE_LINK_PROFILE:
      return {
        ...state,
        linkedProfile: action.payload,
      };
    case ActionTypes.LOG_OUT:
      return {
        loggedIn: false,
      };
    default: {
      return state;
    }
  }
}

export default userReducer;