
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
  window.location.href = window.location.origin + '/'
};

export const removeStorageItemByKey = (key) => {
  localStorage.removeItem(`@${key}`);
};


export const numberWithCommas = (x)=> {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });