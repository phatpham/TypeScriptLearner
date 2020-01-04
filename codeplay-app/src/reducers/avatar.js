const avatarReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_AVATAR":
      return action.payload;

    default:
      return state;
  }
};
export default avatarReducer;
