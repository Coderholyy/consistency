import React, { useState, useEffect } from "react";
import LogTracking from "../MyHabits/MyHabitsDesktop/LogTracking";
import { useUserId } from "hooks/useUserId";
import styled from "styled-components";
import CreateTracking from "../MyHabits/MyHabitsDesktop/CreateTracking";
import { apiFetch } from "api";
// import AddBoxIcon from "@mui/icons-material/AddBox";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  gap: 16px;
  color: black;
`;

const FlexHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const TrackingGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  // padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.2s ease-in-out;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Tracking = () => {
  const userId = useUserId();
  const [trackings, setTrackings] = useState([]);
  // type switch TODO to be global state based on
  const type = "habit";
  useEffect(() => {
    fetchTrackings();
  }, []);

  const fetchTrackings = async () => {
    try {
      const data = await apiFetch(`/trackings/${userId}/${type}`);
      setTrackings(data?.data);
    } catch (error) {
      console.error("Error fetching trackings:", error);
    }
  };

  return (
    <div className="p-6">
      <FlexHeader>
        <h4 className="text-2xl font-bold mb-4 mt-0">My Trackings</h4>
        <CreateTracking />
      </FlexHeader>
      <GridContainer>
        {trackings?.length > 0 ? (
          trackings.map((tracking, index) => (
            <TrackingGridItem key={tracking.id}>
              <h5 className="text-lg font-semibold">{tracking.title}</h5>
              <p className="text-sm text-gray-600">
                Frequency: {tracking.frequency}
              </p>
              <p className="text-sm text-gray-600">Type: {tracking.type}</p>

              <LogTracking
                title={tracking.title}
                trackingId={tracking.id}
                type={tracking.type}
                key={index}
                isHistory={true}
              />
            </TrackingGridItem>
          ))
        ) : (
          <p>No trackings found.</p>
        )}
      </GridContainer>
    </div>
  );
};

export default Tracking;
