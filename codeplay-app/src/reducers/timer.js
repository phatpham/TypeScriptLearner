const timerReducer = (state = { minutes: 0, seconds: 0 }, action) => {
  switch (action.type) {
    case "UPDATE_TIMER":
      return action.payload;

    default:
      return state;
  }
};
export default timerReducer;
