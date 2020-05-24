export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loginCode: action.loginCode,
        errorMessage: action.errorMessage,
        isReady: true,
      };
    case "LOGOUT":
      return {
        ...state,
        loginCode: action.loginCode,
        loginError: action.loginError,
      };
    case "SIGN_UP":
      return {
        ...state,
        loginCode: action.loginCode,
        errorMessage: action.errorMessage,
      };

    case "PASSWORD_RESET":
      return {
        ...state,
        ResetMessage: action.ResetMessage,
      };

    case "GET_PROFILE":
      return {
        ...state,
        userProfile: action.profile,
      };

    case "GET_PROFILE_ERROR":
      return {
        ...state,

        userProfile: action.profile,
      };

    default:
      return state;
  }
};
