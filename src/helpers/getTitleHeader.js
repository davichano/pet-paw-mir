export const getTitleHeader = (pathname) => {
  switch (pathname) {
    case "/post/map":
      return "locatePet";
    case "/chats":
      return "myMessage";
    default:
      return pathname;
  }
};

