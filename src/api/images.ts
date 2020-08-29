const apiId = "owj92eb2sj";

export const getS3UploadUrl = async (fileName: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev/imageUrl/${fileName}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const postImageUpload = async (uploadUrl: string, file: string) => {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });
};
