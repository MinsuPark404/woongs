// isAuthenticated.js
function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  } else {
    return res.status(401).send('Unauthorized: No session available');
  }
}

module.exports = isAuthenticated;
