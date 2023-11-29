import moment from "moment/moment";

export const getImage = (endPoint) => {
  if (endPoint) {
    return `https://www.mobilezmarket.com/images/${endPoint}`;
  } else return "";
};

export const getFormattedDate = (date, form) => {
  if (form) {
    return moment(date).format(form);
  } else {
    return moment(date).format("DD MMM YYYY");
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.reload()
};
