const getUser = () => {
  let user = localStorage.getItem("current_user");
  if (user && user !== "undefined") {
    return JSON.parse(user);
  }
  return null;
};

const getChannel = () => {
  let channel = localStorage.getItem("selected_channel");
  if (channel && channel !== "undefined") {
    return JSON.parse(channel);
  }
  return null;
};

export const initialChannel = getChannel()
  ? getChannel()
  : null;

export const initialUser = getUser()
  ? getUser()
  : null;
