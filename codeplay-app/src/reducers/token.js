const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "LOAD_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

export default tokenReducer;
