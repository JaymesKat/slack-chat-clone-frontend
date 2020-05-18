const createWSClient = () => {
  return new WebSocket(
    "wss://8yl2t66wok.execute-api.us-east-1.amazonaws.com/dev"
  );
}

export const sendMessage = (wsClient: WebSocket,
  userId: string,
  channelId: string,
  message: string,
  image: string
): void => {

  const data = {
    userId,
    channelId,
    message,
    image,
  };

  if (!image) {
    delete data.image;
  }

  let socketClient = wsClient;
  // wsClient.onclose = () => {
  //   socketClient = createWSClient();
  // }
  const payload = JSON.stringify({
    action: "sendMessage",
    data,
  });
    
  socketClient.send(payload);
};

