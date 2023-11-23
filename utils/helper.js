export const getImage = (endPoint) => {
  if (endPoint) {
    return `https://www.mobilezmarket.com/images/${endPoint}`;
  } else return "";
};
