import React from "react";
import styled from "styled-components";

import {eColors} from "types";

const StyledSmall = styled.small`
  color: ${props => props.color};
  font-size: 12px;
`;

const Small = ({label, color}: {label: string, color: eColors}) => <StyledSmall color={color}>{label}</StyledSmall>;

export default Small;
