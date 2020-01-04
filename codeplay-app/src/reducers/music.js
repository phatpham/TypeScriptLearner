const musicReducer = (state = true, action) => {
  switch (action.type) {
    case "CHANGE_MUSIC_STATE":
      return !action.payload;
    default:
      return state;
  }
};
export default musicReducer;
