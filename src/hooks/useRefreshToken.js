import axios from "../api/axios";
import useAuth from "./useAuth";
import { AUTH_ACTION_TYPES } from "../reducers/auth";

const REFRESH_URL = "/auth/jwt/refresh";

function useRefreshToken() {
  const { state, dispatch } = useAuth();

  const refresh = async () => {
    try {
      const data = { refresh: state.refresh };
      const response = await axios.post(REFRESH_URL, data, {
        withCredentials: true,
      });
      dispatch({
        type: AUTH_ACTION_TYPES.REFRESH_TOKEN_SUCCESS,
        payload: response.data,
      });
      return response.data.access;
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAIL,
      });
    }
  };
  return refresh;
}

export default useRefreshToken;
