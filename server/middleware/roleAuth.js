const isAdmin = (req, res, next) => {
  if (req.body.token.isAdmin) {
    res.status(403).json({
      success: 'true',
      message: 'Access Denied! The privilege has been given to only admin',
    });
  }
  return next();
};
export default isAdmin;
