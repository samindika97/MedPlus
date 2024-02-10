exports.success = (response, data, message) => {
  return response.status(200).json({
    code: 200,
    data: data,
    message: message || "Retrieved successfully",
    status: true,
  });
};

exports.frontError = (response, error) => {
  return response.status(300).json({
    code: 300,
    data: "none",
    message: error,
    status: false,
  });
};

exports.error = (response, error) => {
  return response.status(400).json({
    code: 400,
    message: error,
    status: false,
  });
};

exports.forbidden = (response) => {
  return response.status(403).json({
    code: 403,
    message: "You do not have access permission!",
    status: false,
  });
};

exports.unauthorized = (response, message) => {
  return response.status(401).json({
    code: 401,
    message: message ? message : "Authorization required",
    status: false,
  });
};

exports.tokenExpired = (response) => {
  return response.status(406).json({
    code: 406,
    errors: "Token expired!",
    status: false,
  });
};

exports.serverError = (response) => {
  return response.status(500).json({
    code: 500,
    data: "",
    errors: "Server Error",
    status: false,
  });
};
