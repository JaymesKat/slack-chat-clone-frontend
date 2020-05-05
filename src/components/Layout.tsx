import React from "react";
import styled from "styled-components";
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent';

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 10% 75% 1fr;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
`;

export default function Layout() {
  return (
    <LayoutContainer>
        <Sidebar/>
        <MainContent/>
    </LayoutContainer>
  );
}
