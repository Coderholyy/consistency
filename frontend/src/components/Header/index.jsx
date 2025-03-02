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
  // padding: 10px 20px;
  align-items: center;
  background-color: white;
`;

const HeaderLeftItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
  // font-weight: bold;
  color: rgb(1, 53, 164); // rgb(14, 15, 15);
  &:has(img) {
    flex: 0;
  }
  img {
    padding: 8px;
    // height: 30px;
    // width: 30px;
  }
`;
const HeaderItem = styled.div`
  flex: 2;
  display: flex;
  gap: 16px;
  justify-content: center;
  :last-child {
    padding: 0;
  }
  font-size: 22px;
`;

const HeaderNavItem = styled.div`
  text-decoration: none;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? 600 : 500)};
  // color: black;
  color: ${(props) => (props.active ? "rgb(1, 53, 164)" : "black")};
  :hover {
    cursor: pointer;
    color: #174fc8;
  }
`;

const HeaderRightItem = styled.div`
  flex: 0.5;
  display: flex;
  justify-content: flex-end;
  &:has(img) {
    flex: 0;
  }
`;

const SignoutButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 2px;
  padding: 10px 12px 10px 12px;
  :hover {
    cursor: pointer;
    font-weight: 500;
  }
`;

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
      <HeaderLeftItem>
        <img src={Logo} height={"40px"} width={"40px"} />
      </HeaderLeftItem>
      <HeaderLeftItem>Consistency</HeaderLeftItem>
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
