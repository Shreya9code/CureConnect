import jwt from "jsonwebtoken";

const authAmbulance = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.driverId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authAmbulance;
