let initialState = {
  token: null,
  loading: false,
  user: {
    notifications: 0
  },
  cart: []
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.edit } };
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        user: action.data
      });
    case 'UPDATE_CART':
      return Object.assign({}, state, {
        cart: action.data
      });
    case 'SET_TOKEN':
      return Object.assign({}, state, {
        token: action.data
      });
    case 'DECREASE_NOTIFICATION':
      return {
        ...state,
        user: { ...state.user, notifications: state.user.notifications - 1 }
      };
    case 'INCREASE_NOTIFICATION':
      return { ...state, notifications: state.user.notifications + 1 };
    case 'CLEAR_NOTIFICATION':
      return { ...state, notifications: 0 };
    default:
      return state;
  }
};

export default userReducer;
