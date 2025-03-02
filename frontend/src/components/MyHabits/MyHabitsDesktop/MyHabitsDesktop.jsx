import React from "react";
import styled from "styled-components";
import CreateTracking from "./CreateTracking";
import TrackingDashboard from "./Dashboard";

const GridContainer = styled.div`
  display: grid;
  min-height: 100vh;
  // grid-template-areas:
  //   "nav"
  //   "main";
  // grid-template-columns: 15% 85%;
  // grid-template-rows: 1fr;
  background-color: #111111;
  color: white;
`;
const NavContainer = styled.div`
  grid-area: "nav";
  padding-top: 10px;
  padding-left: 26px;
  background-color: #000000; //#e3e3e3;
`;
const MainContainer = styled.div`
  // grid-area: "main";
  padding-top: 10px;
  padding-right: 26px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 100px;
`;

const MyHabitsDesktop = () => {
  return (
    <TrackingDashboard />

    // <GridContainer>
    //   <TrackingDashboard />
    //   <MainContainer>
    //     {/* <CreateTracking /> */}
    //     <TrackingDashboard />
    //   </MainContainer>
    // </GridContainer>
  );
};

export default MyHabitsDesktop;
