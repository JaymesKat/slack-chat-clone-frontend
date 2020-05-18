import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreContext } from "../store/store";
import { Button } from "./ImagePostPreview";
import { createNewChannel } from "../api/channels";

interface Props {
  exitCallback: () => void;
}

export const Container = styled.div`
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

export const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.5em;
`;

export const ButtonClose = styled.button`
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

export function CreateChannel(props: Props) {
  const { user } = React.useContext(StoreContext);
  const [channelName, setChannelName] = React.useState("");
  const [creating, setCreating] = React.useState(false);

  const createChannel = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setCreating(true);
    await createNewChannel(channelName, user.id);
    setCreating(false)
    props.exitCallback();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  return (
    <Container>
      <ExitButtonContainer>
        <ButtonClose onClick={props.exitCallback}>
          <FontAwesomeIcon style={{ display: "block" }} icon='times-circle' />
          esc
        </ButtonClose>
      </ExitButtonContainer>
      <h1>Create channel</h1>
      <Form onSubmit={(e) => createChannel(e)}>
        <label htmlFor='channelName'>Name</label>
        <input
          name='channelName'
          id='channelName'
          placeholder='eg code-reviews'
          onChange={onChange}
        />
        <Button onClick={props.exitCallback}>Cancel</Button>
        <Button type='submit'>
        {creating && <FontAwesomeIcon icon='spinner' pulse />}
          {creating && "Creating..."}
          {!creating && "Create"}
        </Button>
      </Form>
    </Container>
  );
}
