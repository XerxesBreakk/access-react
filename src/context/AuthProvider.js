import { createContext,useReducer } from "react";
import { authReducer,AUTH_ACTION_TYPES } from '../reducers/auth'

export const AuthContext = createContext({});

const authInitialState = {
    access: "",
    refresh: "",
    is_authenticated: false,
    user: null,
  };
const useAuthReducer = () => {
    const [state, dispatch] = useReducer(authReducer,authInitialState );
  
    const login_success = (data) =>
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        payload: data,
      });
  
      const refresh_token = (data) =>
      dispatch({
        type: AUTH_ACTION_TYPES.REFRESH_TOKEN_SUCCESS,
        payload: data,
      });

      const user_loaded_success = (data) =>
      dispatch({
        type: AUTH_ACTION_TYPES.USER_LOADED_SUCCESS,
        payload: data,
      });
    
      const login_fail = () =>
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAIL,
      });
    return { state, dispatch, login_success,login_fail,user_loaded_success };
  };


const AuthProvider = ({ children }) => {
    const{ state,dispatch, login_success,login_fail,user_loaded_success }=useAuthReducer();

    return (
        <AuthContext.Provider value={{ state,dispatch, login_success,login_fail,user_loaded_success }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
