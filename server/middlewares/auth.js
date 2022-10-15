export function checkAuth(req, res, next) {
  console.log("In the auth token");
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}
