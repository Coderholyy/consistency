import { useSelector } from "react-redux";

export const useUserId = () => {
  return useSelector((state) => state.user?.loggedInUser?.id || null);
};
