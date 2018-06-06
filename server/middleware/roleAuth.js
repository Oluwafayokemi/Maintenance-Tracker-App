const isAdmin = (req, res, next) => {
  if (!req.body.token.isadmin) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied, only admin can make this request'
    });
  }
  return next();
};
export default isAdmin;