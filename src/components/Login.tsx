import * as React from "react";
import styled from "styled-components";
import Auth from "../auth/Auth";

interface LogInProps {
  auth: Auth;
}

const LoginPrompt = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: lightgrey;
  padding: 1em 3em;
  border-radius: 5px;

  h1 {
    font-size: 1.2em;
    margin: 1em;
    font-weight: bold;
  }

  button {
    margin: 1em;
    cursor: pointer;
    font-size: 1em;
    padding: 0.5em;
  }
`;

export function LogIn(props: LogInProps) {
  const onLogin = () => {
    props.auth.login();
  };

  return (
    <LoginPrompt>
      <h1> Welcome to Slack Chat</h1>
      <h2>Please log in</h2>

      <button onClick={onLogin}>
        Log in
      </button>
    </LoginPrompt>
  );
}
