export const formatDate = (timestamp) => {
  return new Date(timestamp?.replace(" ", "T")).toLocaleString();
};
