export const login = userObj => {
  return {
    type: "LOG_IN",
    payload: userObj
  };
};

export const changeAvatar = avatar => {
  return {
    type: "CHANGE_AVATAR",
    payload: avatar
  };
};

export const loadLoginStatus = status => {
  return {
    type: "LOAD_STATUS",
    payload: status
  };
};

export const loadUser = user => {
  return {
    type: "LOAD_USER",
    payload: user
  };
};

export const changeMusicState = state => {
  return {
    type: "CHANGE_MUSIC_STATE",
    payload: state
  };
};

export const loadToken = token => {
  return {
    type: "LOAD_TOKEN",
    payload: token
  };
};

export const updateValidated = status => {
  return {
    type: "UPDATE_VALIDATION_STATUS",
    payload: status
  };
};

export const updateTimer = time => {
  return {
    type: "UPDATE_TIMER",
    payload: time
  };
};

export const updateAvatar = avatar => {
  return {
    type: "UPDATE_AVATAR",
    payload: avatar
  };
};
