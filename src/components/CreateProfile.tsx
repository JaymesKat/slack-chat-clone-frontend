import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ImagePostPreview";
import { createUserProfile } from "../api/users";

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

export function CreateProfile(props: Props) {
  const [name, setName] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [creatingProfile, setCreatingProfile] = React.useState(false);
  const history = useHistory();
  const createProfile = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    setCreatingProfile(true);
    const userProfile = await createUserProfile(name, userName);
    localStorage.setItem("current_user", JSON.stringify(userProfile));
    setCreatingProfile(false);
    props.exitCallback()
  };

  return (
    <Container>
      <h1>Welcome: Complete user profile</h1>
      <Form onSubmit={(e) => createProfile(e)}>
        <label htmlFor='name'>Full Name</label>
        <input
          name='name'
          id='name'
          placeholder='Enter here..'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          id='username'
          placeholder='Username to be displayed with chat messages'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button
          type='submit'
          disabled={
            name.trim() === "" || userName.trim() === "" || creatingProfile
          }
        >
          {creatingProfile && <FontAwesomeIcon icon='spinner' pulse />}
          {creatingProfile && "Creating profile..."}
          {!creatingProfile && "Create Profile"}
        </Button>
      </Form>
    </Container>
  );
}
