const jwt = require("jsonwebtoken");

export const jwtSignature = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    "secrets"
  );
};

export const jwtVerify = (token) => {
  try {
    return jwt.verify(token, "secrets", (err, decoded) => {
      if (err) {
        return {
          error: err.username,
          message: `${err.message} not valid`,
        };
      } else {
        return decoded.data;
      }
    });
  } catch (err) {
    return {
      error: err.username,
      message: err.message,
    };
  }
};
