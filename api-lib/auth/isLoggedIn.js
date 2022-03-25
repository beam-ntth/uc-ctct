
export async function isLoggedInRedirect(req, res, next) {
  if (req.user) {
    console.log("User: " + req.user + " is logged in.");
    next();
  } else {
    res.send('/index')
  }
}