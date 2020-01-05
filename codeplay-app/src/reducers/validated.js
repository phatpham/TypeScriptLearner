const validatedReducer = (state = false, action) => {
  switch (action.type) {
    case "UPDATE_VALIDATION_STATUS":
      return action.payload;
    default:
      return state;
  }
};
export default validatedReducer;
