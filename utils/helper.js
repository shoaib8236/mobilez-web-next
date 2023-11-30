import moment from "moment/moment";

export const getImage = (endPoint) => {
  if (endPoint) {
    return `https://www.mobilezmarket.com/images/${endPoint}`;
  } else return "";
};

export const getFormattedDate = (date, frmt) => {
  if (frmt) {
    return moment(date).format(frmt);
  } else {
    return moment(date).format("DD MMM YYYY");
  }
};

export const logout = () => {
  localStorage.removeItem(`@token`);
  localStorage.removeItem(`@user`);
  localStorage.removeItem(`@phone`);
  window.location.reload();
};

export const removeStorageItemByKey = (key) => {
  localStorage.removeItem(`@${key}`);
};
