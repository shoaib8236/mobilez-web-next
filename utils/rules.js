export const passwordRule = [
  {
    required: true,
    message: "Please enter password!",
  },
  { min: 6, message: "please enter at least 6 digit password!" },
];
export const required = [
  {
    required: true,
    message: "This field is required!",
  },
];
export const newPasswordRule = [
  {
    required: true,
    message: "Please enter new password!",
  },
  { min: 8, message: "please enter at least 8 digit password!" },
];
export const confirmPasswordRule = (validatePassword) => [
  {
    required: true,
    message: "Please enter confirm password!",
  },
  { min: 8, message: "please enter at least 8 digit password!" },
  { validator: validatePassword },
];
export const emailRule = [
  {
    required: true,
    message: "Please enter your email!",
  },
  {
    pattern: new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    ),
    message: "Please enter a valid email!",
  },
];

export const percentageRule = [
  { required: true, message: "This field is required" },
  {
    pattern: new RegExp(/^(100|[1-9]?[0-9])$/),
    message: "Percentage should not be less then 0 or greater than 100",
  },
];
export const stringRule = [
  { required: true, message: "This field is required" },
  {
    pattern: new RegExp(/.*[^ ].*/),
    message: "Field should not be empty!", 
  },
];
export const numberRule = [
  { required: true, message: "This field is required" },
  {
    pattern: new RegExp(/^[0-9]*$/),
    message: "Field accept only numbers",
  },
];

export const requiredRule = [
  { required: true, message: "This field is required" },
];

export const alphaNumericWithSpacesRule = [
  { required: true, message: "This field is required" },
  {
    pattern: /^[a-zA-Z0-9\s]+$/,
    message: "Special characters are not allowed",
  },
];

export const acceptFormRule = [
  {
    validator: (_, value) =>
      value
        ? Promise.resolve()
        : Promise.reject(new Error("Should accept agreement")),
  },
];

export const shouldBeConfirmnRule = [
  {
    validator: (_, value) =>
      value === "CONFIRM"
        ? Promise.resolve()
        : Promise.reject(new Error("Invalid input")),
  },
];

export const linksOnly = [
  // { required: false, message: "This field is required" },
  {
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/,
    message: "This field contains only links",
  },
];
