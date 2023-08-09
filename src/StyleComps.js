import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const AddIconBtn = styled(AddIcon)`
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    padding: 1px;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

export const RemoveIconBtn = styled(RemoveIcon)`
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    padding: 1px;
    border: 1px solid black;
    border-radius: 8px;
  }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.color || '#000'};

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;
