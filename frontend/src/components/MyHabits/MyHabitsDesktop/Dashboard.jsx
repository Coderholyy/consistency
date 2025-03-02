import React, { useState, useEffect } from "react";
import LogTracking from "./LogTracking";
import { useUserId } from "hooks/useUserId";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  gap: 16px;
  color: black;
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

const TrackingDashboard = () => {
  const userId = useUserId();
  const [trackings, setTrackings] = useState([]);
  // type switch TODO to be global state based on
  const type = "habit";
  useEffect(() => {
    fetchTrackings();
  }, []);

  const fetchTrackings = async () => {
    try {
      const response = await fetch(`/trackings/${userId}/${type}`);
      const data = await response.json();
      setTrackings(data?.data);
    } catch (error) {
      console.error("Error fetching trackings:", error);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4 mt-0">Tracking Dashboard</h3>
      <GridContainer>
        {trackings.length > 0 ? (
          trackings.map((tracking, index) => (
            <TrackingGridItem key={tracking.id}>
              <h2 className="text-lg font-semibold">{tracking.title}</h2>
              <p className="text-sm text-gray-600">
                Frequency: {tracking.frequency}
              </p>
              <p className="text-sm text-gray-600">Type: {tracking.type}</p>

              <LogTracking
                title={tracking.title}
                trackingId={tracking.id}
                type={tracking.type}
                key={index}
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

export default TrackingDashboard;
