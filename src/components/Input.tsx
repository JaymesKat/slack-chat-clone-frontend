import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../libs/socketClient";
import { StoreContext } from "../store/store";
import { ImagePostPreview, Image } from "./ImagePostPreview";

const SubmitButton = styled.button`
  display: flex;
  align-self: flex-end;
  outline: none;
  background-color: transparent;
  border: none;
  border-left: 3px solid darkgrey;
  padding: 1rem;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
  margin: 0px;
  width: 55px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  border: 3px solid darkgrey;
  outline: none;
  &:hover,
  &:active,
  &:focus {
    border: 3px solid dimgrey;
    & + ${SubmitButton} {
      border-left: 3px solid dimgrey;
    }
  }
  font-size: 1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 10px;
  width: calc(100vw - 15%);

  .fileInput {
    display: none;
  }
`;

const InputStyle = styled.input`
  border: none;
  outline: none;
  padding: 1rem;
  width: calc(100% - 36px);
`;

const OptionsPanelStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #ebedea;
  padding: 0.2em 1em;
  height: 20px;
  border: none;

  svg {
    color: dimgrey;
    transform: rotate(-45deg);
    font-size: 0.9em;
    cursor: pointer;
  }
`;

export function InputMessage() {
  const [isModalOpen, setModal] = React.useState(false);

  const { selectedChannel, user } = React.useContext(StoreContext);
  const ws: any = React.useRef(null);

  React.useEffect(() => {
    ws.current = new WebSocket(
      "wss://xx9p3scloj.execute-api.us-east-1.amazonaws.com/dev"
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  const [inputValue, setInputValue] = React.useState("");
  const [image, setImage] = React.useState({
    file: "",
    previewUrl: "",
  } as Image);

  const imgUploadRef = React.createRef<HTMLInputElement>();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onClickUploadIcon = () => {
    (imgUploadRef as any).current.click();
  };

  const onImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = (e.target as any).files[0];

    reader.onloadend = () => {
      setImage({
        file,
        previewUrl: reader.result as string,
      } as Image);
      setModal(true);
    };

    reader.readAsDataURL(file);
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>): any => {
    e.preventDefault();
    sendMessage(ws.current, user.id, selectedChannel.id, inputValue, "");
    setInputValue("");
    (e.target as any).reset();
  };
  return (
    <>
      {isModalOpen ? (
        <ImagePostPreview
          image={image}
          message={inputValue}
          exitCallback={() => setModal(false)}
        />
      ) : null}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitMessage(e)}
      >
        <InputWrapper>
          <InputStyle
            name="message"
            onChange={onChangeInput}
            type="text"
            placeholder="Enter message and tap enter"
          />
          <OptionsPanelStyle>
            <FontAwesomeIcon
              icon="paperclip"
              title="Upload image"
              onClick={onClickUploadIcon}
            />
          </OptionsPanelStyle>

          <input
            className="fileInput"
            type="file"
            onChange={(e) => onImageLoad(e)}
            ref={imgUploadRef}
          />
        </InputWrapper>
      </form>
    </>
  );
}
