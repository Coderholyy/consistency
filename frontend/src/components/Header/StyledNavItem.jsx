import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavItem = styled(NavLink)`
  padding: 10px 15px;
  color: var(--text-light);
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &.active {
    color: var(--primary-color); /* Highlight active link */
    font-weight: bold;
  }

  &:hover {
    color: var(--primary-color);
  }
`;
