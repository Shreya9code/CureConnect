import jwt from "jsonwebtoken";

//doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const {dtoken}=req.headers
    if(!dtoken){
        return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    //verify token
    console.log("Token Before Verification:", dtoken);
    console.log("JWT Secret at Verification:", process.env.JWT_SECRET);
    const decodedBefore = jwt.decode(dtoken, { complete: true });
    console.log("Decoded Token Before Verification:", decodedBefore);
    
    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded.id;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};
export default authDoctor;