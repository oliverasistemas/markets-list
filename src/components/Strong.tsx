import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-weight: bold;
  text-transform: uppercase;
`;

const Strong = ({label}: {label: string}) => <Container>{label}</Container>;

export default Strong;
