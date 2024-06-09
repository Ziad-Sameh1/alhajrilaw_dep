const jwt = require("jsonwebtoken");

const verifyAccessLogin = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ msg: "No Authorization Header" });

    if (token.startsWith("Bearer "))
      token = token.slice(7, token.length).trimLeft();

    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (!isVerified) return res.status(403).json({ msg: "Access Denied" });
    req.user = isVerified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const verifyAdminLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ msg: "No Token Provided" });
    }
    const isVerified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    if (!isVerified) return res.status(403).json({ msg: "Access Denied" });
    req.user = isVerified;
    next();
  } catch (err) {
    res.clearCookie("token");
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const verifyUserLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No Token Provided" });
    }

    const isVerified = jwt.verify(token, process.env.USER_JWT_SECRET);

    req.user = isVerified;
    console.log(`Logged In User Email: ${req.user.email}`);
    next();
  } catch (err) {
    res.clearCookie("token");

    if (err.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.status(401).json({ msg: "Token Expired" });
    } else if (err.name === "JsonWebTokenError") {
      console.log("Invalid token");
      return res.status(403).json({ msg: "Access Denied" });
    } else {
      console.log(err);
      return res.status(400).json({ error: err.message });
    }
  }
};

const verifyUserOrAdminLogin = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "No Token Provided" });
    }

    try {
      // Try to verify user token
      const userVerified = jwt.verify(token, process.env.USER_JWT_SECRET);
      req.user = userVerified;
      console.log(`Logged In User Email: ${req.user.email}`);
      return next();
    } catch (userErr) {
      if (userErr.name === "TokenExpiredError") {
        console.log("User token expired");
        res.clearCookie("token");
        return res.status(401).json({ msg: "Token Expired" });
      } else if (userErr.name === "JsonWebTokenError") {
        console.log("Invalid user token");
        // Proceed to check admin token
      } else {
        console.log(userErr);
        return res.status(400).json({ error: userErr.message });
      }
    }

    try {
      // Try to verify admin token
      const adminVerified = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
      req.user = adminVerified;
      console.log(`Logged In Admin Email: ${req.user.email}`);
      return next();
    } catch (adminErr) {
      if (adminErr.name === "TokenExpiredError") {
        console.log("Admin token expired");
        res.clearCookie("token");
        return res.status(401).json({ msg: "Token Expired" });
      } else if (adminErr.name === "JsonWebTokenError") {
        console.log("Invalid admin token");
        return res.status(403).json({ msg: "Access Denied" });
      } else {
        console.log(adminErr);
        return res.status(400).json({ error: adminErr.message });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports = verifyUserLogin;

module.exports = {
  verifyAccessLogin,
  verifyAdminLogin,
  verifyUserLogin,
  verifyUserOrAdminLogin
};
