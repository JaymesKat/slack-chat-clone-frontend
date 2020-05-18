import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StoreContext } from "../store/store";
import { AuthContext } from "../context/authContext";

const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  background-color: white;
  width: calc(100vw - 220px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;

  strong {
    font-weight: bold;
  }
`;

const Title = styled.div`
  h3 {
    font-weight: 900;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
  i {
    margin-right: 0.5rem;
    color: darkgrey;
  }
`;

const Input = styled.input`
  border: 1px solid darkgrey;
  padding: 0.5rem;
  border-radius: 5px;
  outline: none;
  &::placeholder {
    font-size: 1rem;
  }
  &:hover,
  &:active,
  &:focus {
    border: 1px solid DimGray;
  }
`;

export function MainContentHeader() {
  const { selectedChannel } = React.useContext(StoreContext);
  const logout = React.useContext(AuthContext);
  return (
    <Container>
      {selectedChannel && selectedChannel.Memberships && (
        <>
          <Title>
            <div>
              <h3>&#35;{selectedChannel.name}</h3>
            </div>
            <div>
              <FontAwesomeIcon icon='user' pull='left' />
              {`${selectedChannel.Memberships.length || 0} member${
                selectedChannel.Memberships.length > 1 ? "s" : ""
              }`}
            </div>
          </Title>
          <div>
            <Input type='text' placeholder='search' />
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon='sign-out-alt'
              pull='right'
              color='dimgrey'
              size='2x'
              title='Log out'
              onClick={logout}
            />
          </div>
        </>
      )}
      {!selectedChannel && (<p>Click <strong><FontAwesomeIcon icon='plus' /> Add Channel</strong> in the sidebar to browse available channels</p>)}
    </Container>
  );
}
