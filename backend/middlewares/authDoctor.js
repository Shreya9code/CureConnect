import jwt from "jsonwebtoken";

//doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    /*const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }
    const dtoken= authHeader.split(" ")[1];
    if(!dtoken){
        return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }*/
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }
    //verify token
    console.log("Token Before Verification:", token);
    console.log("JWT Secret at Verification:", process.env.JWT_SECRET);
    const decodedBefore = jwt.decode(token, { complete: true });
    console.log("Decoded Token Before Verification:", decodedBefore);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token After Verification:", decoded);
    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }
    req.docId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};
export default authDoctor;
