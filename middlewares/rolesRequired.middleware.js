const { unauthorizedResponse } = require('generic-response');

const rolesRequired = (rolesArray) => async (req, res, next) => {
  const { user } = req;

  if (!rolesArray.includes(user.role)) {
    const response = unauthorizedResponse('Access denied. Insufficient permissions.');
    return res.status(response.status.code).json(response);
  }

  next();
};

module.exports = rolesRequired;
