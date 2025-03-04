import { logoutUser } from "components/User/UserSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import Profile from "../../assets/profile.png";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f4f8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderLogoItem = styled.h2`
  flex: 0;
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
  margin: 0;
  img {
    padding: 8px;
    // height: 30px;
    // width: 30px;
  }
`;

const HeaderBrandItem = styled.h2`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
`;
const HeaderItem = styled.div`
  flex: 1;
  display: flex;
  // gap: 16px;
  justify-content: space-around;
  :last-child {
    padding: 0;
  }
  font-size: 22px;
`;

const HeaderNavItem = styled.div`
  text-decoration: none;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 600 : 500)};
  color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--text-light)"};
  :hover {
    cursor: pointer;
    color: var(--primary-color);
  }
`;

const HeaderRightItem = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: flex-end;
  &:has(img) {
    flex: 0;
  }
  &:has(button) {
    justify-content: center;
  }
`;

const SignoutButton = styled.button`
  // background-color: white;
  border: none;
  // border-radius: 2px;
  padding: 10px 12px 10px 12px;
  color: var(--text-light)
  :hover {
    cursor: pointer;
    font-weight: 500;
  }
`;

// export const StyledNavItem = styled(NavLink)`
//   padding: 10px 15px;
//   color: var(--text-light);
//   font-size: 16px;
//   text-decoration: none;
//   transition: color 0.3s ease-in-out;

//   &.active {
//     color: var(--primary-color); /* Highlight active link */
//     font-weight: bold;
//   }

//   &:hover {
//     color: var(--primary-color);
//   }
// `;

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <HeaderContainer>
      <HeaderLogoItem>
        <img src={Logo} height={"40px"} width={"40px"} />
      </HeaderLogoItem>
      <HeaderBrandItem>Consistency</HeaderBrandItem>
      {loggedInUser && (
        <HeaderItem>
          <HeaderNavItem
            onClick={() => history.push("/")}
            active={location.pathname === "/"}
          >
            Dashboard
          </HeaderNavItem>
          <HeaderNavItem
            onClick={() => history.push("/goals")}
            active={location.pathname === "/goals"}
          >
            Goals
          </HeaderNavItem>
          <HeaderNavItem
            onClick={() => history.push("/tracking")}
            active={location.pathname === "/tracking"}
          >
            My Trackings
          </HeaderNavItem>
          {/* <HeaderNavItem href="/habits">Habit Tracking</HeaderNavItem>
        <HeaderNavItem href="/diet">Diet Tracking</HeaderNavItem>
        <HeaderNavItem href="/money">Money Tracking</HeaderNavItem> */}
        </HeaderItem>
      )}
      <HeaderRightItem>
        {loggedInUser ? `Hi ${loggedInUser.firstname}` : null}
      </HeaderRightItem>
      <HeaderRightItem>
        <img
          src={Profile}
          height={"30px"}
          width={"30px"}
          hidden={!loggedInUser}
        />
      </HeaderRightItem>
      <HeaderRightItem>
        {loggedInUser && (
          <SignoutButton onClick={() => handleLogout()}>Sign Out</SignoutButton>
        )}
      </HeaderRightItem>
    </HeaderContainer>
  );
};

export default Header;
