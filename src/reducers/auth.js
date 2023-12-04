export const AUTH_ACTION_TYPES = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  USER_LOADED_SUCCESS: "USER_LOADED_SUCCESS",
  USER_LOADED_FAIL: "USER_LOADED_FAIL",
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
  LOGOUT: "LOGOUT",
};

export const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_ACTION_TYPES.REFRESH_TOKEN_SUCCESS:
    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
      const tokens = structuredClone(state);
      tokens.access = payload.access;
      tokens.refresh = payload.refresh;
      tokens.is_authenticated= true;
      return tokens

    case AUTH_ACTION_TYPES.USER_LOADED_SUCCESS:
      const user = structuredClone(state);
      user.user =payload;
      return user

    case AUTH_ACTION_TYPES.LOGOUT:
    case AUTH_ACTION_TYPES.USER_LOADED_FAIL:
    case AUTH_ACTION_TYPES.LOGIN_FAIL:
      return {
        ...state,
        access: '',
        refresh: '',
        is_authenticated: false,
        user: null
      }
    default:
      return state
  }
};
