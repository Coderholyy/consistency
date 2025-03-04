import React, { useState, useEffect } from "react";
import LogTracking from "./LogTracking";
import { useUserId } from "hooks/useUserId";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
  font-size: 0.8rem;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TrackingDashboard = () => {
  const userId = useUserId();
  const [trackings, setTrackings] = useState([]);
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
      <h4 className="text-2xl font-bold mb-4 mt-0">Tracking Dashboard</h4>
      {trackings.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <TableHeader>Title</TableHeader>
              <TableHeader>Frequency</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {trackings.map((tracking, index) => (
              <TableRow key={tracking.id}>
                <TableCell>{tracking.title}</TableCell>
                <TableCell>{tracking.frequency}</TableCell>
                <TableCell>{tracking.type}</TableCell>
                <TableCell>
                  <LogTracking
                    title={tracking.title}
                    trackingId={tracking.id}
                    type={tracking.type}
                    key={index}
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No trackings found.</p>
      )}
    </div>
  );
};

export default TrackingDashboard;
