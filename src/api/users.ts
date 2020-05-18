const apiId = "jh1yx4w8z9";

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/users/profile`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const createUserProfile = async (name: string, username: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/users/profile`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        username,
      }),
    }
  );
  const data = await response.json();
  return data;
};
