import { createContext, useContext, useEffect, useReducer } from 'react';
import authService from '../services/authService';

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      
      const storedAuth = await authService.getStoredUser();
      
      if (storedAuth) {
        // Don't verify with server on app start - just use stored data
        // This prevents hanging if server is unreachable
        dispatch({
          type: actionTypes.SET_USER,
          payload: {
            user: storedAuth.user,
            token: storedAuth.token,
          },
        });
      } else {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      dispatch({ type: actionTypes.CLEAR_ERROR });

      const response = await authService.login(credentials);

      if (response.success) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            user: response.user,
            token: response.token,
          },
        });
        return { success: true, message: response.message };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.message,
      });
      return { success: false, message: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      dispatch({ type: actionTypes.CLEAR_ERROR });

      const response = await authService.register(userData);

      if (response.success) {
        dispatch({
          type: actionTypes.REGISTER_SUCCESS,
          payload: {
            user: response.user,
            token: response.token,
          },
        });
        return { success: true, message: response.message };
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.message,
      });
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: actionTypes.LOGOUT });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
