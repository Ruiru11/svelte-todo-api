const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegistrationData(userData) {
  let errors = {};
  userData.email = !isEmpty(userData.email) ? userData.email : "";
  userData.email = !isEmpty(userData.email) ? userData.email : "";
  userData.password = !isEmpty(userData.password) ? userData.password : "";
  userData.passwordConfirm = !isEmpty(userData.passwordConfirm)
    ? userData.passwordConfirm
    : "";
  if (Validator.isEmpty(userData.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(userData.email)) {
    errors.email = "Email is not valid";
  }

  if (Validator.isEmpty(userData.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(userData.passwordConfirm)) {
    errors.passwordConfirm = "Password confirm is reuired";
  }

  if (!Validator.isLength(userData.password, { min: 5, max: 10 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(userData.password, userData.passwordConfirm)) {
    errors.passwordConfirm = "Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
