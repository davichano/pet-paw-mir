export const getTitleHeader = (pathname) => {
  switch (pathname) {
    case "/post/map":
      return "locatePet";

    default:
      return pathname;
  }
};
