const userUpdate = (req, res, next) => {
  if (!req.body.status) {
    res.status(400).json({
      status: 'fail',
      message: 'bad request! sorry, can not edit anymore',
    });
  }
  return next();
};

export default userUpdate;
