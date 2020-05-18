import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../libs/socketClient";
import { StoreContext } from "../store/store";
import { getS3UploadUrl, postImageUpload } from "../api/images"
export interface Image {
  file: any;
  previewUrl: string;
}

interface Props {
  exitCallback: () => void;
  image: Image;
  message: string;
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 10;
  padding: 2rem;
  color: black;
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.5em;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

const Form = styled.form`
  max-width: 700px;
  label {
    font-weight: bolder;
    display: block;
    margin: 1rem 0;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
  }
`;

export const ImagePreview = styled.div`
  text-align: center;
  margin: 10px 5px;
  height: 200px;
  width: 200px;
  border-radius: 10px;
  border-left: 1px solid dimgrey;
  border-right: 1px solid dimgrey;
  border-top: 5px solid dimgrey;
  border-bottom: 5px solid dimgrey;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled.button`
  margin: 1em;
  border: none;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

export function ImagePostPreview({ exitCallback, image, message }: Props) {

  const ws: any = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket("wss://8yl2t66wok.execute-api.us-east-1.amazonaws.com/dev");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  const [inputMessage, setInputMessage] = React.useState(message || "");
  const [loading, setisLoading] = React.useState(false);

  const { selectedChannel, user } = React.useContext(StoreContext);

  const postMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();

    setisLoading(true);
    const fileName = image.file.name;
    const uploadUrl = await getUploadUrl(fileName);
    await uploadImage(uploadUrl, image.file);

    sendMessage(ws.current, user.id, selectedChannel.id, inputMessage || 'Image', fileName);

    setisLoading(false);
    exitCallback();
  };

  const getUploadUrl = async (fileName: string): Promise<any> => {
    const data = await getS3UploadUrl(fileName);
    return data.url
  };

  const uploadImage = async (uploadUrl: string, file: string): Promise<any> => {
    await postImageUpload(uploadUrl, file);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <Container>
      <ExitButtonContainer>
        <ButtonClose onClick={exitCallback}>
          <FontAwesomeIcon style={{ display: "block" }} icon='times-circle' />
          esc
        </ButtonClose>
      </ExitButtonContainer>

      <h1>Upload photo</h1>
      <Form onSubmit={(e) => postMessage(e)}>
        <label htmlFor='message'>Message</label>
        <input
          name='message'
          id='message'
          placeholder='Add message'
          onChange={onChange}
          value={inputMessage}
        />
        {image && (
          <ImagePreview>
            <img src={image.previewUrl} alt='Preview' />
          </ImagePreview>
        )}

        <Button onClick={exitCallback}>Cancel</Button>
        <Button type='submit' disabled={loading}>
          {loading && <FontAwesomeIcon icon='spinner' pulse />}
          {loading && "Posting..."}
          {!loading && "Post"}
        </Button>
      </Form>
    </Container>
  );
}
