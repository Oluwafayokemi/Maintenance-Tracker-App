/* eslint-disable class-methods-use-this */
const idCheck = (req, res, next) => {

  const requestid = parseInt(req.params.id, 10);
  if (Number.isNaN(requestid)) {
    return res.status(400).json({
      status: 400,
      success: 'false',
      message: 'Request id is not a string',
    });
  }
  return next();
};

export default idCheck;
