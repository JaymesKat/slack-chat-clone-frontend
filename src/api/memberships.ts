const apiId = "jh1yx4w8z9";

export const createNewMembership = async (
  channelId: string,
  userId: string
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/channels/${userId}/join`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        channelId,
        userId,
      }),
    }
  );
  return await response.json();
};
