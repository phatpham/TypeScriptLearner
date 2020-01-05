const userReducer = (
  state = {
    avatar: "goblin",
    password: "",
    progress: "",
    user_id: "",
    username: ""
  },
  action
) => {
  switch (action.type) {
    case "LOAD_USER":
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;
