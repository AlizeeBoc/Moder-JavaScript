export const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };