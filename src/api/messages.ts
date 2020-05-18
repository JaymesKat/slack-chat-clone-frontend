const apiId = "jh1yx4w8z9";

export const fetchMessages = async (channelId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels/${channelId}/messages`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const editMessage = async (
  channelId: string,
  messageId: string,
  message: string
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels/${channelId}/messages/${messageId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
      }),
    }
  );
  return await response.json();
};

export const deleteMessage = async (channelId: string, messageId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels/${channelId}/messages/${messageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};
