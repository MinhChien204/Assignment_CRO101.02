const initialState = {
  profileData: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SAVE_PROFILE':
          return {
              ...state,
              profileData: action.payload,
          };
      default:
          return state;
  }
};

export default profileReducer;