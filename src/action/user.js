import * as ActionTypes from "./type";

export const login = (profile, id) => (dispatch) => {
  if (profile && id) {
    dispatch({
      type: ActionTypes.LOG_IN,
      profile,
      id,
    });
  }
};

export const register = (values, history) => (dispatch) => {
  dispatch({
    type: ActionTypes.REGISTER,
    payload: values,
  });
  history.push("/login");
};


export const updateProfile = (profile) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_PROFILE,
    payload: profile,
  });
};

export const updateLinkedProfile = (profile) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_LINK_PROFILE,
    payload: profile,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: ActionTypes.LOG_OUT,
  });
};
