
const apiId = "jh1yx4w8z9";

export const fetchChannels = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const fetchUserChannels = async (userId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/channels`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const fetchDMChannels = async (userId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/directmessages`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const createNewChannel = async (channelName: string, userId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: channelName,
        createdBy: userId,
      }),
    }
  );
  return await response.json();
};
